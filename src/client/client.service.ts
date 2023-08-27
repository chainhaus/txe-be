import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { saltOrRounds } from '../config';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private userModel: typeof Client) {}

  async create(createUserDto: CreateClientDto): Promise<Client> {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
    }
    const client = await this.userModel.create({
      name: createUserDto.name,
      email_address: createUserDto.email_address,
      password: createUserDto.password,
      open_to_partnership: createUserDto.open_to_partnership,
      api_key: createUserDto.api_key,
      role: createUserDto.role,
      email_verified: createUserDto.email_verified,
    });
    return client;
  }

  async findAll(): Promise<Client[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.userModel.findOne({ where: { id } });
    return client;
  }

  async update(id: number, updateUserDto: UpdateClientDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
    }

    const client = await this.findOne(id);
    client.set(updateUserDto);

    return client;
  }

  async remove(id: number): Promise<Client> {
    const client = await this.findOne(id);
    await client.destroy();
    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.userModel.findOne({ where: { email } });
    return client;
  }
}
