import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { apiEnvSchema, parseEnv } from '@mono/env';
import { AppModule } from './app.module';

async function bootstrap() {
  const env = parseEnv(apiEnvSchema, process.env);
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: env.CORS_ORIGINS });
  await app.listen(env.PORT);
  console.log(`API listening on http://localhost:${env.PORT}`);
}
bootstrap();
