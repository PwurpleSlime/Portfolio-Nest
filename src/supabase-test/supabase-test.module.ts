import { Module } from '@nestjs/common';
import { SupabaseTestService } from './supabase-test.service';
import { SupabaseTestController } from './supabase-test.controller';

@Module({
  controllers: [SupabaseTestController],
  providers: [SupabaseTestService],
})
export class SupabaseTestModule {}
