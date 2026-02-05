import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors() // @Cors

  app.enableVersioning({ 
    type: VersioningType.URI
  }) // @Versioning

  const config = new DocumentBuilder() // @Swagger @Functional
  .setTitle("Jaydee White's Portfolio API Doc")
  .setDescription("API Documentation")
  .setVersion("1.0")
  .addBearerAuth() // For Eventual Auth @Work
  .build()

  const document = SwaggerModule.createDocument(app, config) // @Swagger @Functional
  SwaggerModule.setup("/api-docs", app, document)

  await app.listen(process.env.PORT ?? 3000); // @Functional

}
bootstrap();

// Notes
// @Functional - Where something is so that be app as a whole is functional 
// @Work - Things to work on when I get the chance
// Npm installs so far - @nestjs/swagger, @nestjs/common, dotenv, @nestjs/config