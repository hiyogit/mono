import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  // 모든 createZodDto DTO를 전역으로 검증
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}
