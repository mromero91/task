import { Injectable } from '@nestjs/common';
import { Greeting } from '../../domain/entities/greeting';
import { GreetingRepository } from '../../domain/repositories/greeting.repository';
import { type Request } from 'express';

@Injectable()
export class GreetingRepositoryImpl implements GreetingRepository {
  getGreeting(request: Request): Promise<Greeting> {
    const ip = (request.headers['x-forwarded-for'] ||
      request.socket.remoteAddress) as string;
    return Promise.resolve(new Greeting(`Hello World! ${ip}`));
  }
}
