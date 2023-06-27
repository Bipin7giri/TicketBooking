import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ticket Booking System')
    .setDescription('Ticket Booking System')
    .setVersion('1.0')
    .build();
  // adding initial admin and roles if db is empty

  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  SwaggerModule.setup('/api', app, document);
  console.log(process.env.PORT);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
