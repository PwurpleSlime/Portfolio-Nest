import { Controller, Get, Version } from '@nestjs/common';
import { ChaosCodingChallengeService } from './chaos-coding-challenge.service';
import { Public } from 'src/auth/public.decorator';

@Controller('chaos-coding-challenge')
export class ChaosCodingChallengeController {
  constructor(private readonly chaosCodingChallengeService: ChaosCodingChallengeService) {}

  @Public()
  @Version('1')
  @Get()
  goToGame(){
    return this.chaosCodingChallengeService.loadHTMLPage()
  }
}
