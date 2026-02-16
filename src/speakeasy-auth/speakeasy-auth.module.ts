import { Module } from '@nestjs/common';
import { SpeakeasyAuthService } from './speakeasy-auth.service';
import { SpeakeasyAuthController } from './speakeasy-auth.controller';

@Module({
  controllers: [SpeakeasyAuthController],
  providers: [SpeakeasyAuthService],
})
export class SpeakeasyAuthModule {}
