import { Test, TestingModule } from '@nestjs/testing';
import { ImageLoadingController } from './image-loading.controller';
import { ImageLoadingService } from './image-loading.service';

describe('ImageLoadingController', () => {
  let controller: ImageLoadingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageLoadingController],
      providers: [ImageLoadingService],
    }).compile();

    controller = module.get<ImageLoadingController>(ImageLoadingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
