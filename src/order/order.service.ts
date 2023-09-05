import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.model';
import { Ticket } from 'src/ticket/ticket.model';
import { Client } from 'src/client/client.model';
import { Event } from 'src/event/event.model';
@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const data = await this.orderModel.create({
        event_id: createOrderDto.event_id,
        ticket_id: createOrderDto.ticket_id,
        customer_id: createOrderDto.customer_id,
        amount_paid: createOrderDto.amount_paid,
        fee_to_txe: createOrderDto.fee_to_txe,
      });
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async findAll(query = {}) {
    try {
      const datas = await this.orderModel.findAll({
        ...query,
        order: [['id', 'DESC']],
        include: [
          { model: Event },
          { model: Ticket },
          { model: Client, attributes: { exclude: ['password'] } },
        ],
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

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      const data = await this.orderModel.findOne({ where: { id } });
      await data.set(updateOrderDto);
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
