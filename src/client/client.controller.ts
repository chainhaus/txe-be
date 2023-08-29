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
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { saltOrRounds } from 'src/config';
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
    return new ClientEntity(await this.clientService.findOne(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateClientDto) {
    return this.clientService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }

  @Post('generate-key/:id')
  async generateKey(@Param('id') id: string) {
    const token = uuidv4();
    const hashedToken = await bcrypt.hash(token, saltOrRounds);
    return this.clientService.update(+id, { api_key: hashedToken });
  }
}
