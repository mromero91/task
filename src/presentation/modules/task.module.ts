import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from '../controllers/task.controller';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { GetUserTasksUseCase } from '../../application/use-cases/get-user-tasks.use-case';
import { TaskRepositoryImpl } from '../../infrastructure/repositories/task.repository.impl';
import { TaskEntity } from '../../infrastructure/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [
    CreateTaskUseCase,
    GetUserTasksUseCase,
    {
      provide: 'TaskRepository',
      useClass: TaskRepositoryImpl,
    },
  ],
})
export class TaskModule {}
