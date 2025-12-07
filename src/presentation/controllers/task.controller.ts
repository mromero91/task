import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { GetUserTasksUseCase } from '../../application/use-cases/get-user-tasks.use-case';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../../domain/entities/user';

interface RequestWithUser {
  user: User;
}

@Controller()
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getUserTasksUseCase: GetUserTasksUseCase,
  ) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: RequestWithUser,
  ) {
    const user = req.user;
    return this.createTaskUseCase.execute(createTaskDto, user);
  }

  @Get()
  async findAll(@Request() req: RequestWithUser) {
    const user = req.user;
    return this.getUserTasksUseCase.execute(user.id!);
  }
}
