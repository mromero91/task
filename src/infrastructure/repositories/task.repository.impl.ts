import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../domain/entities/task';
import { User } from '../../domain/entities/user';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { TaskEntity } from '../entities/task.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly typeOrmRepository: Repository<TaskEntity>,
  ) {}

  private toDomain(entity: TaskEntity): Task {
    return new Task(
      entity.id,
      entity.title,
      entity.description,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
      this.mapUserEntityToDomain(entity.createdBy),
      entity.modifiedBy ? this.mapUserEntityToDomain(entity.modifiedBy) : null,
    );
  }

  private mapUserEntityToDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.passwordHash,
      entity.role,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
      entity.deletedAt,
    );
  }

  private toPersistence(task: Task): TaskEntity {
    const entity = new TaskEntity();
    if (task.id) entity.id = task.id;
    entity.title = task.title;
    entity.description = task.description;
    entity.createdAt = task.createdAt;
    entity.updatedAt = task.updatedAt;
    entity.deletedAt = task.deletedAt;

    if (task.createdBy) {
      const userEntity = new UserEntity();
      userEntity.id = task.createdBy.id!;
      entity.createdBy = userEntity;
    }

    if (task.modifiedBy) {
      const userEntity = new UserEntity();
      userEntity.id = task.modifiedBy.id!;
      entity.modifiedBy = userEntity;
    }

    return entity;
  }

  async save(task: Task): Promise<Task> {
    const entity = this.toPersistence(task);
    const savedEntity = await this.typeOrmRepository.save(entity);
    const reloaded = await this.typeOrmRepository.findOne({
      where: { id: savedEntity.id },
      relations: ['createdBy', 'modifiedBy'],
    });
    return this.toDomain(reloaded!);
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const entities = await this.typeOrmRepository.find({
      where: { createdBy: { id: userId } },
      relations: ['createdBy', 'modifiedBy'],
    });
    return entities.map((e) => this.toDomain(e));
  }

  async findById(id: string): Promise<Task | null> {
    const entity = await this.typeOrmRepository.findOne({
      where: { id },
      relations: ['createdBy', 'modifiedBy'],
    });
    return entity ? this.toDomain(entity) : null;
  }
}
