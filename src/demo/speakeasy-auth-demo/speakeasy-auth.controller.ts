import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { SpeakeasyAuthService } from './speakeasy-auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { authDTO } from './dto/auth.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('speakeasy-auth')
export class SpeakeasyAuthController {
  constructor(private readonly speakeasyAuthService: SpeakeasyAuthService) {}

  @Get('register')
  @Public()
  @Version('1')
  @ApiResponse({})
  async registerUser(){
    return await this.speakeasyAuthService.registerUser()
  }

  @Post('verify')
  @Public()
  @ApiBody({
    type: authDTO,
    examples: {default: {
      summary: "Verification Default",
      value: {"token": "415618", "userId":"0eb2362c-fd0f-4499-8954-7f83eff5ff32"}
    }}
  })
  @Version('1')
  async verifiyUser(@Body() authDTO: authDTO){
    return await this.speakeasyAuthService.verifyUser(authDTO)
  }

  @Post('validate')
  @Public()
  @ApiBody({
    type: authDTO,
    examples: {default: {
      summary: "Validation Default",
      value: {"token": "415618", "userId":"0eb2362c-fd0f-4499-8954-7f83eff5ff32"}
    }}
  })
  @Version('1')
  async validateUser(@Body() authDTO: authDTO){
    return await this.speakeasyAuthService.validateUser(authDTO)
  }
}
