import { Routes } from '@nestjs/core';
import { userRoutes } from './user.routes';
import { taskRoutes } from './task.routes';

export const routes: Routes = [...userRoutes, ...taskRoutes];
