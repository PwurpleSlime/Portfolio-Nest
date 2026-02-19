import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  // @ApiBearerAuth('access-token')
  @Version('1')
  @Get()
  async getHello() {
    return await this.appService.getHTMLOpenPage();
  }
  @Public()
  @Version('2')
  @Get('/helloWorld')
  getHelloWorld() {
    return this.appService.getHello()
  }
  
}
