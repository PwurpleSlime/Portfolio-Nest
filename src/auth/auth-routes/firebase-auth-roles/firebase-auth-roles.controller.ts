import { Body, Controller, Get, Param, Post, Req, Version } from '@nestjs/common';
import { FirebaseAuthRolesService } from './firebase-auth-roles.service';
import { TFA } from 'src/auth/decorators/tfa.decorator';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';

@Controller(['firebase-auth-roles', 'firebase-auth-role'])
export class FirebaseAuthRolesController {
  constructor(private readonly firebaseAuthRolesService: FirebaseAuthRolesService) {}

  @Post('/designateRoleOwner/:uid')
  @TFA()
  @ApiBearerAuth('access-token')
  @Version('1')
  @ApiBody({
    schema: {
      example: {
        "roles": ["owner"]
      }
    }
  })
  @ApiParam({ name: 'uid', type: 'string', description: 'User ID' })
  designateRoleOwner(
    @Param('uid') uid:string,
    @Body('roles') roles: string[],
    @Req() req,
  ) {
    return this.firebaseAuthRolesService.designateRoleOwner(uid, roles)
  }



  @Post('/designateRoleAdmin/:uid')
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @Version('1')
  @ApiBody({
    schema: {
      example: {
        "roles": ["user"]
      }
    }
  })
  @ApiParam({ name: 'uid', type: 'string', description: 'User ID' })
  designateRoleAdmin(
    @Param('uid') uid:string,
    @Body('roles') roles: string[],
    @Req() req,
  ) {
    return this.firebaseAuthRolesService.designateRoleAdmin(uid, roles)
  }
}
