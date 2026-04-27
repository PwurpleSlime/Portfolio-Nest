import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TFA } from './auth/decorators/tfa.decorator';
import { Roles } from './auth/decorators/roles/roles.decorator';
import { Clerk } from './auth/decorators/clerk.decorator';
import { getHTMLPage } from './utility/getHTMLpage';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //HTML PAGES ---
  @Public()
  @Version('2')
  @Get()
  async getHello() {
    return await getHTMLPage('loadingScreen.html')
  }
  @Public()
  @Version('2')
  @Get('/aboutMe')
  async getAboutMe() {
    return await getHTMLPage('aboutMe.html')
  }
  @Public()
  @Get('/aiPictionary')
  async getPictionary() {
    return await getHTMLPage('aiPictionary.html')
  }
  @Public()
  @Get('/testSRCPath') 
  async getTestSRCPath() {
    return await getHTMLPage('testImageSRCPath.html')
  }
  // END HTML PAGES -----

  @Public()
  @Version('2')
  @Get('/helloWorld')
  getHelloWorld() {
    return this.appService.getHello()
  }

  // Auth Test -----
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
  // Auth Test End -----
}
