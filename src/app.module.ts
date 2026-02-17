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
@Module({
  imports: [
    ConfigModule.forRoot({  // @dotenv
      isGlobal: true,
      envFilePath: 'env'
    }),
    SpeakeasyAuthModule,
    ImageLoadingModule,
  ],
  controllers: [
    // RedirectController,
    AppController
  ],
  providers: [
    AppService,
    Reflector,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectMiddleware)
      .forRoutes('*')
  }
}
