import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TFA } from './auth/decorators/tfa.decorator';
import { Roles } from './auth/decorators/roles/roles.decorator';
import { Clerk } from './auth/decorators/clerk.decorator';

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
  @TFA()
  @Version('1')
  @ApiBearerAuth('access-token')
  @Get('/test2FA')
  async testTFA() {
    return this.appService.getHello()
  }
  @Roles('admin')
  @Version('1')
  @ApiBearerAuth('access-token')
  @Get('/testFirebaseAdmin')
  testFirebase() {
    return this.appService.getHello()
  }
  @Clerk()
  @Version('1')
  @ApiBearerAuth('access-token')
  @Get('/testClerk')
  testClerk() {
    return this.appService.getHello()
  }
}
