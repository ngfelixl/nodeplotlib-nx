import { Test, TestingModule } from '@nestjs/testing';
import { PagesGateway } from './pages.gateway';

describe('PagesGateway', () => {
  let gateway: PagesGateway;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagesGateway],
    }).compile();
    gateway = module.get<PagesGateway>(PagesGateway);
  });
  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
