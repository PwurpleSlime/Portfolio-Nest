import { Controller, Get, Version } from '@nestjs/common';
import { ImageLoadingService } from './image-loading.service';

@Controller('image-loading')
export class ImageLoadingController {
  constructor(private readonly imageLoadingService: ImageLoadingService) {}
  
  @Version('1')
  @Get('')
  async getInput() {
    return await this.imageLoadingService.loadHTMLPage()
  }
}
