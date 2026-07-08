import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors() // @Cors

  app.enableVersioning({ 
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1'
  }) // @Versioning

  const config = new DocumentBuilder() // @Swagger @Functional
  .setTitle("Jaydee White's Portfolio API Doc")
  .setDescription("API Documentation")
  .setVersion("1.0")
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header'
  }, 'access-token') 
  .build()

  // const document = SwaggerModule.createDocument(app, config) // @Swagger @Functional
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true
  });
  SwaggerModule.setup('/api-docs', app, document, {
    customSiteTitle: 'Portfolio API Docs',
    swaggerOptions: {
      url: '/api-docs-json', 
      docExpansion: 'All',
      persistAuthorization: false,
      tagsSorter: 'alpha',
      operationsSorter: (a, b) => {
        const order = { get: 1, post: 2, put: 3, patch: 4, delete: 5 }

        return order[a.get('method')] - order[b.get('method')]
      },
    },
    customCssUrl: 'https://unpkg.com/swagger-ui-dist/swagger-ui.css',
    customJs: [
      'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js',
    ],
  });
  await app.listen(process.env.PORT ?? 3000); // @Functional

}
bootstrap();

// Notes
// @Functional - Where something is so that be app as a whole is functional 
// @Work - Things to work on when I get the chance
// Npm installs so far - @nestjs/swagger, @nestjs/common, dotenv, @nestjs/config, express(for the redirect), speakeasy, uuid, node-json-db, firebase, firebase-admin, @clerk/backend, better-sqlite3, @nestjs/mongoose mongoose, @nestjs/serve-static, @nestjs/schedule,  @supabase/supabase-js