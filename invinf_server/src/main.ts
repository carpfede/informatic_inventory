import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import passport = require('passport');
import * as mongoose from 'mongoose';
import { DB_PROVIDER } from './common/constants/constants';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Inventario Informatico')
    .setDescription('Api para gestion de inventario informatico')
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header')
    .build();

    
  app.useGlobalFilters(new HttpExceptionFilter());

  mongoose.connect(DB_PROVIDER, { useNewUrlParser: true });
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
