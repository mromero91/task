import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmRepository: Repository<UserEntity>,
  ) {}

  private toDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.passwordHash,
      userEntity.role,
      userEntity.status,
      userEntity.createdAt,
      userEntity.updatedAt,
      userEntity.deletedAt,
    );
  }

  private toPersistence(user: User): UserEntity {
    const entity = new UserEntity();
    if (user.id) entity.id = user.id;
    entity.name = user.name;
    entity.email = user.email;
    entity.passwordHash = user.passwordHash;
    entity.role = user.role;
    entity.status = user.status;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    entity.deletedAt = user.deletedAt;
    return entity;
  }

  async save(user: User): Promise<User> {
    const entity = this.toPersistence(user);
    const savedEntity = await this.typeOrmRepository.save(entity);
    return this.toDomain(savedEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.typeOrmRepository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.typeOrmRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }
}
