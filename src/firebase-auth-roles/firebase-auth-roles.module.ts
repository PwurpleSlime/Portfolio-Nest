import { Module } from '@nestjs/common';
import { FirebaseAuthRolesService } from './firebase-auth-roles.service';
import { FirebaseAuthRolesController } from './firebase-auth-roles.controller';
import { FirebaseAdminModule } from 'src/auth/firebase/firebase-admin.module';

@Module({
  imports: [FirebaseAdminModule],
  controllers: [FirebaseAuthRolesController],
  providers: [FirebaseAuthRolesService],
})
export class FirebaseAuthRolesModule {}
