import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // ? Need more than one specific origin?
    // TODO: origin: ['http://localhost:3000', 'http://localhost:3001'],
    // ! origin: ['http://localhost:3000', 'http://localhost:3001'], NOTE: dont do ( origin:['*', ...] )
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const config = new DocumentBuilder()
    .setTitle('Nest_Next API')
    .setDescription('This is a simple API for Nest_Next project')
    .setVersion('1.0')
    .addTag('NestJs')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.BACK_PORT ?? 3333);
}
bootstrap();
