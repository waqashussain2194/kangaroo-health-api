import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({ origin: 'http://localhost:3001' }));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Kangaroo Health API')
    .setDescription('Helps in testing kangaroo APIs')
    .setVersion('1.0')
    .addTag('Endpoints')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
