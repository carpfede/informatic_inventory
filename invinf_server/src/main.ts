import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import passport = require('passport');
import * as mongoose from 'mongoose';
import { DB_PROVIDER } from './common/constants/constants';
import * as session from 'express-session';
import { DispatchError } from './common/middlewares/dispatchError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Inventario Informatico')
    .setDescription('Api para gestion de inventario informatico')
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header')
    .build();
  app.use(session({
    secret: 'secret-key',
    name: 'sess-tutorial',
    resave: false,
    saveUninitialized: false
  }))
  app.useGlobalFilters(new DispatchError());
  app.use(passport.initialize());
  app.use(passport.session());
  mongoose.connect(DB_PROVIDER, { useNewUrlParser: true });
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
