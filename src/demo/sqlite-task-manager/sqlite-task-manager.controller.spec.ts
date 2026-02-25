import { Test, TestingModule } from '@nestjs/testing';
import { SqliteTaskManagerController } from './sqlite-task-manager.controller';
import { SqliteTaskManagerService } from './sqlite-task-manager.service';

describe('SqliteTaskManagerController', () => {
  let controller: SqliteTaskManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SqliteTaskManagerController],
      providers: [SqliteTaskManagerService],
    }).compile();

    controller = module.get<SqliteTaskManagerController>(SqliteTaskManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
