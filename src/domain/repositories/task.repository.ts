import { Task } from '../entities/task';

export interface TaskRepository {
  save(task: Task): Promise<Task>;
  findByUserId(userId: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
}
