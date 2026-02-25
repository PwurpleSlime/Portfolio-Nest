import { Test, TestingModule } from '@nestjs/testing';
import { SqliteTaskManagerService } from './sqlite-task-manager.service';

describe('SqliteTaskManagerService', () => {
  let service: SqliteTaskManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqliteTaskManagerService],
    }).compile();

    service = module.get<SqliteTaskManagerService>(SqliteTaskManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
