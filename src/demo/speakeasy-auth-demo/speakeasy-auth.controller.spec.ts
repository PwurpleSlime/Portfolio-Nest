import { Test, TestingModule } from '@nestjs/testing';
import { SpeakeasyAuthController } from './speakeasy-auth.controller';
import { SpeakeasyAuthService } from './speakeasy-auth.service';

describe('SpeakeasyAuthController', () => {
  let controller: SpeakeasyAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeakeasyAuthController],
      providers: [SpeakeasyAuthService],
    }).compile();

    controller = module.get<SpeakeasyAuthController>(SpeakeasyAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
