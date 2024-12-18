import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // ? Need more than one specific origin?
    // TODO: origin: ['http://localhost:3000', 'http://localhost:3001'],
    // ! origin: ['http://localhost:3000', 'http://localhost:3001'], NOTE: dont do ( origin:['*', ...] )
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen( env.BACK_PORT ?? 3333);
}
bootstrap();
