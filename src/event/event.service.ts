import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.model';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event) private eventModel: typeof Event) {}

  async create(createEventDto: CreateEventDto) {
    try {
      const data = await this.eventModel.create({
        title: createEventDto.title,
        date: createEventDto.date,
        location: createEventDto.location,
        start_time: createEventDto.start_time,
        end_time: createEventDto.end_time,
        enabled: createEventDto.enabled,
        private: createEventDto.private,
      });
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async findAll(query = {}) {
    try {
      const datas = await this.eventModel.findAll({
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
      const data = await this.eventModel.findOne({ where: { id } });
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      const data = await this.eventModel.findOne({ where: { id } });
      await data.set(updateEventDto);
      await data.save();
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async remove(id: number) {
    try {
      const data = await this.eventModel.findOne({ where: { id } });
      await data.destroy();
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }
}
