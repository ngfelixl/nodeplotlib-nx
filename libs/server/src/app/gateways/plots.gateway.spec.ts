import { Test, TestingModule } from '@nestjs/testing';
import { PlotsGateway } from './plots.gateway';

describe('PlotsGateway', () => {
  let gateway: PlotsGateway;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlotsGateway],
    }).compile();
    gateway = module.get<PlotsGateway>(PlotsGateway);
  });
  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
