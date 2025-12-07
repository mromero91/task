import { Injectable, Inject } from '@nestjs/common';
import { Task } from '../../domain/entities/task';
import { User } from '../../domain/entities/user';
import type { TaskRepository } from '../../domain/repositories/task.repository';
import { CreateTaskDto } from '../../presentation/dtos/create-task.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = new Task(
      undefined,
      dto.title,
      dto.description,
      new Date(),
      new Date(),
      null,
      user,
      user,
    );

    return this.taskRepository.save(task);
  }
}
