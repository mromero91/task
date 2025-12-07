import { Routes } from '@nestjs/core';
import { TaskModule } from '../modules/task.module';

export const taskRoutes: Routes = [
  {
    path: 'tasks',
    module: TaskModule,
  },
];
