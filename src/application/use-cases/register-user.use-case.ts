import { Injectable, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user';
import { Role } from '../../domain/enums/role.enum';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterUserDto } from '../../presentation/dtos/register-user.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: RegisterUserDto): Promise<Omit<User, 'passwordHash'>> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const newUser = new User(
      undefined,
      dto.name,
      dto.email,
      passwordHash,
      Role.USER,
      true,
      new Date(),
      new Date(),
      null,
    );

    const savedUser = await this.userRepository.save(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...result } = savedUser;
    return result;
  }
}
