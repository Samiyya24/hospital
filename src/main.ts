import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  try {
    const PORT = process.env.PORT || 3333;

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api')

     const config = new DocumentBuilder()
       .setTitle("myTicket Project")
       .setDescription("myTicket REST API")
       .setVersion("1.0")
       .addTag("NESTJS")
       .addTag("swagger")
       .addTag("Validation")
       .addTag("Sequelize")
       .build();

     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup("api/docs", app, document);
     
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
