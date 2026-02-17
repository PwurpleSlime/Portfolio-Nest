import { Test, TestingModule } from '@nestjs/testing';
import { ImageLoadingService } from './image-loading.service';

describe('ImageLoadingService', () => {
  let service: ImageLoadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageLoadingService],
    }).compile();

    service = module.get<ImageLoadingService>(ImageLoadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
