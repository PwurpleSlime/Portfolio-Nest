import { Module } from '@nestjs/common';
import { Connect4Service } from './connect4.service';
import { Connect4Controller } from './connect4.controller';

@Module({
  controllers: [Connect4Controller],
  providers: [Connect4Service],
})
export class Connect4Module {}
