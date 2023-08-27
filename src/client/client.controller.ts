import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createUserDto: CreateClientDto) {
    return this.clientService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const users = await this.clientService.findAll();
    return users.map((user) => new ClientEntity(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ClientEntity(await this.clientService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateClientDto) {
    return this.clientService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
