import { Test, TestingModule } from '@nestjs/testing';
import { ChaosCodingChallengeService } from './chaos-coding-challenge.service';

describe('ChaosCodingChallengeService', () => {
  let service: ChaosCodingChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChaosCodingChallengeService],
    }).compile();

    service = module.get<ChaosCodingChallengeService>(ChaosCodingChallengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
