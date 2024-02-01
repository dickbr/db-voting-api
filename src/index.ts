import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { CacheRepository } from './database';
import { ErrorHandlerMiddleware } from 'middlewares/errors/error-handler.middleware';
import * as Sentry from '@sentry/node';
import { dataSource } from '@database/postgres/datasource';

async function initializeApp() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  app.useGlobalFilters(new ErrorHandlerMiddleware())

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health-check', method: RequestMethod.GET }]
  })

  return app;
}


async function initializeCache() {
  CacheRepository.connect({
    host: process.env.REDIS_HOST as string,
    port: process.env.REDIS_PORT as string,
  })
}

function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENV,
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    tracesSampleRate: 0.0
  })
}

async function bootstrap() {
  const app = await initializeApp();
  await initializeCache();
  initSentry()

  await app.listen(Number(process.env.PORT));
  console.log(`@db-software/vote-api started on port ${process.env.PORT}`)
}

bootstrap();


