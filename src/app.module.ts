import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "dotenv/config"
import { ConfigModule } from '@nestjs/config'; // Needed for @dotenv
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env'
    })
  ], // @dotenv
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
