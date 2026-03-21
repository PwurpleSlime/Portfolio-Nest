import { Controller, Get, Version } from '@nestjs/common';
import { ChaosCodingChallengeService } from './chaos-coding-challenge.service';
import { Public } from '../../auth/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('chaos-coding-challenge')
@ApiTags("Chaos Coding Challenge", "Challenge")
export class ChaosCodingChallengeController {
  constructor(private readonly chaosCodingChallengeService: ChaosCodingChallengeService) {}

  @Public()
  @Version('1')
  @Get()
  goToGame(){
    return this.chaosCodingChallengeService.loadHTMLPage()
  }
}
