import { Test, TestingModule } from '@nestjs/testing';
import { ChaosCodingChallengeController } from './chaos-coding-challenge.controller';
import { ChaosCodingChallengeService } from './chaos-coding-challenge.service';

describe('ChaosCodingChallengeController', () => {
  let controller: ChaosCodingChallengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaosCodingChallengeController],
      providers: [ChaosCodingChallengeService],
    }).compile();

    controller = module.get<ChaosCodingChallengeController>(ChaosCodingChallengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
