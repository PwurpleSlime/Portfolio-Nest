import { Module } from '@nestjs/common';
import { FirebaseAuthRolesService } from './firebase-auth-roles.service';
import { FirebaseAuthRolesController } from './firebase-auth-roles.controller';

@Module({
  controllers: [FirebaseAuthRolesController],
  providers: [FirebaseAuthRolesService],
})
export class FirebaseAuthRolesModule {}
