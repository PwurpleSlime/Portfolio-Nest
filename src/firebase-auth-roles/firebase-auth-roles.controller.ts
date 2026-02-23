import { Controller, Get, Version } from '@nestjs/common';
import { FirebaseAuthRolesService } from './firebase-auth-roles.service';
import { TFA } from 'src/auth/decorators/tfa.decorator';

@Controller(['firebase-auth-roles', 'firebase-auth-role'])
export class FirebaseAuthRolesController {
  constructor(private readonly firebaseAuthRolesService: FirebaseAuthRolesService) {}

  @Get('/declareRole')
  @TFA()
  @Version('1')
  
  grantRole() {
    return this.firebaseAuthRolesService.designateRole()
  }
}
