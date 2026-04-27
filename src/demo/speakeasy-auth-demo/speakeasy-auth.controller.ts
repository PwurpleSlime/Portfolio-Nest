import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { SpeakeasyAuthService } from './speakeasy-auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { authDTO } from './dto/auth.dto';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';

@Controller('speakeasy-auth')
@ApiTags("Speakeasy Auth", "Demo")
export class SpeakeasyAuthController {
  constructor(private readonly speakeasyAuthService: SpeakeasyAuthService) {}

  @Get('register')
  @Roles('owner')
  @Version('1')
  @ApiResponse({})
  async registerUser(){
    return await this.speakeasyAuthService.registerUser()
  }

  @Post('verify')
  @Roles('owner')
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
  @Roles('owner')
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
