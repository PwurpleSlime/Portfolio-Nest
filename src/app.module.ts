import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connect4Module } from './connect4/connect4.module';

@Module({
  imports: [Connect4Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
