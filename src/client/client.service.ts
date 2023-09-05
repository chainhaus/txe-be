import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { saltOrRounds } from '../config';
import { Client } from './client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { OrderItem } from 'sequelize';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client) private clientModel: typeof Client) {}

  async create(createUserDto: CreateClientDto): Promise<Client> {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
    }

    try {
      const client = await this.clientModel.create({
        name: createUserDto.name,
        email_address: createUserDto.email_address,
        password: createUserDto.password,
        open_to_partnership: createUserDto.open_to_partnership,
        api_key: createUserDto.api_key,
        role: createUserDto.role,
        email_verified: createUserDto.email_verified,
      });
      return client.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async findAll(
    query = {},
    order: OrderItem[] = [['id', 'DESC']],
  ): Promise<Client[]> {
    try {
      const clients = await this.clientModel.findAll({
        ...query,
        order,
      });
      return clients.map((item) => item.dataValues);
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async findOne(id: number): Promise<Client> {
    try {
      const client = await this.clientModel.findOne({ where: { id } });
      return client.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateClientDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltOrRounds,
      );
    }

    try {
      const client = await this.clientModel.findOne({ where: { id } });
      await client.set(updateUserDto);
      await client.save();
      return client.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async remove(id: number): Promise<Client> {
    try {
      const client = await this.clientModel.findOne({ where: { id } });
      await client.destroy();
      return client.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async findByEmail(email_address: string): Promise<Client> {
    try {
      const client = await this.clientModel.findOne({
        where: { email_address },
      });

      return client.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }
}
