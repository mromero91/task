import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { UserEntity } from './infrastructure/entities/user.entity';
import { TaskEntity } from './infrastructure/entities/task.entity';
import { AuthModule } from './presentation/modules/auth.module';
import { TaskModule } from './presentation/modules/task.module';
import { routes } from './presentation/routes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserEntity, TaskEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    TaskModule,
    RouterModule.register(routes),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
