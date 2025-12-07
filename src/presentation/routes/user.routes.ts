import { Routes } from '@nestjs/core';
import { AuthModule } from '../modules/auth.module';

export const userRoutes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
];
