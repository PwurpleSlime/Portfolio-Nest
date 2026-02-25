import { Module } from '@nestjs/common';
import { SqliteTaskManagerService } from './sqlite-task-manager.service';
import { SqliteTaskManagerController } from './sqlite-task-manager.controller';

@Module({
  controllers: [SqliteTaskManagerController],
  providers: [SqliteTaskManagerService],
})
export class SqliteTaskManagerModule {}
