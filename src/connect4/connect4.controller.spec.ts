import { Test, TestingModule } from '@nestjs/testing';
import { Connect4Controller } from './connect4.controller';
import { Connect4Service } from './connect4.service';

describe('Connect4Controller', () => {
  let controller: Connect4Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Connect4Controller],
      providers: [Connect4Service],
    }).compile();

    controller = module.get<Connect4Controller>(Connect4Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
