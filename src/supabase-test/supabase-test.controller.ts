import { Controller, Get, Post, Body } from '@nestjs/common';
import { SupabaseTestService } from './supabase-test.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';

@ApiTags('supabase-test')
@Controller('supabase-test')
export class SupabaseTestController {
  constructor(private readonly supabaseTestService: SupabaseTestService) {}

  @Roles('owner')
  @ApiBearerAuth('access-token')
  @Post('items')
  @ApiOperation({ summary: 'Insert an item into Supabase' })
  @ApiResponse({ status: 201, description: 'Item inserted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({})
  async insertItem(@Body() data: any) {
    return this.supabaseTestService.insertItem(data);
  }

  @Public()
  @Get('items')
  @ApiOperation({ summary: 'Get all items from Supabase' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully' })
  async getItems() {
    return this.supabaseTestService.getItems();
  }

  @Public()
  @Post('edge-function')
  @ApiOperation({ summary: 'Call a Supabase Edge Function' })
  @ApiResponse({ status: 200, description: 'Edge function called successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async callEdgeFunction(@Body() payload: any) {
    return this.supabaseTestService.callEdgeFunction(payload);
  }
}
