import { Module } from '@nestjs/common';
import { ImageLoadingService } from './image-loading.service';
import { ImageLoadingController } from './image-loading.controller';

@Module({
  controllers: [ImageLoadingController],
  providers: [ImageLoadingService],
})
export class ImageLoadingModule {}
