import { Routes } from '@nestjs/core';
import { userRoutes } from './user.routes';

export const routes: Routes = [...userRoutes];
