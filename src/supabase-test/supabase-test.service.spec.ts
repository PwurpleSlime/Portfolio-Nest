import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseTestService } from './supabase-test.service';

describe('SupabaseTestService', () => {
  let service: SupabaseTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupabaseTestService],
    }).compile();

    service = module.get<SupabaseTestService>(SupabaseTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
