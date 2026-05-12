import { Injectable } from '@nestjs/common';
import { supabase } from './supabase-client';

@Injectable()
export class SupabaseTestService {
  
  async insertItem(data: any) {
    const { data: result, error } = await supabase
      .from('items')
      .insert([data]);

    if (error) throw error;

    return result;
  }

  async getItems() {
    const { data, error } = await supabase
      .from('items')
      .select('*');

    if (error) throw error;

    return data;
  }

  async callEdgeFunction(payload: any) {
    const { data, error } = await supabase.functions.invoke(
      'my-function', // your Supabase Edge Function name
      {
        body: payload,
      }
    );

    if (error) throw error;

    return data;
  }
}
