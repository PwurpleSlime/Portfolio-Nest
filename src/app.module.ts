import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "dotenv/config"
import { ConfigModule } from '@nestjs/config'; // Needed for @dotenv
import { RedirectMiddleware } from './redirect/redirect.middleware';
import { SpeakeasyAuthModule } from './demo/speakeasy-auth-demo/speakeasy-auth.module';
import { ImageLoadingModule } from './demo/image-loading-demo/image-loading.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ChaosCodingChallengeModule } from './challenge/chaos-coding-challenge/chaos-coding-challenge.module';
import { FirebaseAdminProvider } from './auth/firebase/firebase-admin.module';
import { FirebaseAuthRolesModule } from './auth/auth-routes/firebase-auth-roles/firebase-auth-roles.module';
import { ClerkModule } from './auth/auth-routes/clerk/clerk.module';
import { SqliteTaskManagerModule } from './demo/sqlite-task-manager/sqlite-task-manager.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'
// import { MongoDbModule } from './demo/mongo-db/mongo-db.module';
// import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    // MongooseModule.forRoot(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_COLLECTION ?? 'test'}?authSource=admin`),
    ConfigModule.forRoot({  // @dotenv
      isGlobal: true,
      envFilePath: 'env'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public'
    }),
    SpeakeasyAuthModule,
    ImageLoadingModule,
    ChaosCodingChallengeModule,
    FirebaseAuthRolesModule,
    ClerkModule,
    SqliteTaskManagerModule,
    // MongoDbModule,
  ],
  controllers: [
    // RedirectController,
    AppController
  ],
  providers: [
    AppService,
    FirebaseAdminProvider,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectMiddleware)
      .exclude('/public/(.*)')
      .forRoutes('*')
  }
}
