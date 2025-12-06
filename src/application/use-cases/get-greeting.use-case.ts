import { Inject, Injectable } from '@nestjs/common';
import type { GreetingRepository } from '../../domain/repositories/greeting.repository';
import { type Request } from 'express';

@Injectable()
export class GetGreetingUseCase {
  constructor(
    @Inject('GreetingRepository')
    private readonly greetingRepository: GreetingRepository,
  ) {}

  async execute(request: Request): Promise<string> {
    const greeting = await this.greetingRepository.getGreeting(request);
    return greeting.message;
  }
}
