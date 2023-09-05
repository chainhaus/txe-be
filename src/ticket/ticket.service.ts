import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './ticket.model';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket) private orderModel: typeof Ticket) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      const data = await this.orderModel.create({
        event_id: createTicketDto.event_id,
        name: createTicketDto.name,
        price: createTicketDto.price,
        enabled: createTicketDto.enabled,
      });
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async findAll(query) {
    try {
      const datas = await this.orderModel.findAll({
        ...query,
        order: [['id', 'DESC']],
      });
      return datas.map((item) => item.dataValues);
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.orderModel.findOne({ where: { id } });
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    try {
      const data = await this.orderModel.findOne({ where: { id } });
      await data.set(updateTicketDto);
      await data.save();
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async remove(id: number) {
    try {
      const data = await this.orderModel.findOne({ where: { id } });
      await data.destroy();
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }
}
