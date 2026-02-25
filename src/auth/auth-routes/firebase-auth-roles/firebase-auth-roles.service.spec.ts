import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseAuthRolesService } from './firebase-auth-roles.service';

describe('FirebaseAuthRolesService', () => {
  let service: FirebaseAuthRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseAuthRolesService],
    }).compile();

    service = module.get<FirebaseAuthRolesService>(FirebaseAuthRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
