import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './presentation/controllers/app.controller';
import { GetGreetingUseCase } from './application/use-cases/get-greeting.use-case';
import { GreetingRepositoryImpl } from './infrastructure/repositories/greeting.repository.impl';

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
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    GetGreetingUseCase,
    {
      provide: 'GreetingRepository',
      useClass: GreetingRepositoryImpl,
    },
  ],
})
export class AppModule {}
