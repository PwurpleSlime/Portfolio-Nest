import { Test, TestingModule } from '@nestjs/testing';
import { MongoDbController } from './mongo-db.controller';
import { MongoDbService } from './mongo-db.service';

describe('MongoDbController', () => {
  let controller: MongoDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoDbController],
      providers: [MongoDbService],
    }).compile();

    controller = module.get<MongoDbController>(MongoDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
