import { Controller, Get, Version } from '@nestjs/common';
import { ImageLoadingService } from './image-loading.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('image-loading')
@ApiTags("Image Loader", "Demo")
export class ImageLoadingController {
  constructor(private readonly imageLoadingService: ImageLoadingService) {}
  
  @Version('1')
  @Public()
  @Get('useMemory')
  async getInput() {
    return await this.imageLoadingService.loadHTMLPage()
  }
}
