import { Test, TestingModule } from '@nestjs/testing';
import { SpeakeasyAuthService } from './speakeasy-auth.service';

describe('SpeakeasyAuthService', () => {
  let service: SpeakeasyAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeakeasyAuthService],
    }).compile();

    service = module.get<SpeakeasyAuthService>(SpeakeasyAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
