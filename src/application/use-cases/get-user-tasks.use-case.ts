import { Injectable, Inject } from '@nestjs/common';
import { Task } from '../../domain/entities/task';
import type { TaskRepository } from '../../domain/repositories/task.repository';

@Injectable()
export class GetUserTasksUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(userId: string): Promise<Task[]> {
    return this.taskRepository.findByUserId(userId);
  }
}
