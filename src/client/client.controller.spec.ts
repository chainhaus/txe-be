import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

describe('UsersController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
    }).compile();

    controller = module.get<ClientController>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
