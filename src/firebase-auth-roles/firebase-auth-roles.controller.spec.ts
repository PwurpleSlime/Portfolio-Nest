import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthRolesController } from './firebase-auth-roles.controller';
import { FirebaseAuthRolesService } from './firebase-auth-roles.service';

describe('FirebaseAuthRolesController', () => {
  let controller: FirebaseAuthRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirebaseAuthRolesController],
      providers: [FirebaseAuthRolesService],
    }).compile();

    controller = module.get<FirebaseAuthRolesController>(FirebaseAuthRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
