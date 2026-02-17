import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "dotenv/config"
import { ConfigModule } from '@nestjs/config'; // Needed for @dotenv
import { RedirectMiddleware } from './redirect/redirect.middleware';
import { SpeakeasyAuthModule } from './speakeasy-auth/speakeasy-auth.module';
import { ImageLoadingModule } from './image-loading/image-loading.module';
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
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectMiddleware)
      .forRoutes('*')
  }
}
