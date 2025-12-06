import { Controller, Get, Req } from '@nestjs/common';
import { GetGreetingUseCase } from '../../application/use-cases/get-greeting.use-case';
import { type Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly getGreetingUseCase: GetGreetingUseCase) {}

  @Get()
  async getHello(@Req() request: Request): Promise<string> {
    return this.getGreetingUseCase.execute(request);
  }
}
