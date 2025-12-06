import { Greeting } from '../entities/greeting';
import { type Request } from 'express';

export interface GreetingRepository {
  getGreeting(request: Request): Promise<Greeting>;
}
