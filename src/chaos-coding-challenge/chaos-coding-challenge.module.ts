import { Module } from '@nestjs/common';
import { ChaosCodingChallengeService } from './chaos-coding-challenge.service';
import { ChaosCodingChallengeController } from './chaos-coding-challenge.controller';

@Module({
  controllers: [ChaosCodingChallengeController],
  providers: [ChaosCodingChallengeService],
})
export class ChaosCodingChallengeModule {}
