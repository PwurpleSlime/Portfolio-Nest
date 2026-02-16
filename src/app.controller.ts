import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @Get()
  async getHello() {
    return await this.appService.getHTMLOpenPage();
  }
  @Version('2')
  @Get('/helloWorld')
  getHelloWorld() {
    return this.appService.getHello()
  }
  
}
