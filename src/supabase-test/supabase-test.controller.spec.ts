import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseTestController } from './supabase-test.controller';
import { SupabaseTestService } from './supabase-test.service';

describe('SupabaseTestController', () => {
  let controller: SupabaseTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupabaseTestController],
      providers: [SupabaseTestService],
    }).compile();

    controller = module.get<SupabaseTestController>(SupabaseTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
