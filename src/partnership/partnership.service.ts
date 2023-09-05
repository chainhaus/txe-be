import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePartnershipDto } from './dto/create-partnership.dto';
import { UpdatePartnershipDto } from './dto/update-partnership.dto';
import { Partnership } from './partnership.model';
import { Client } from 'src/client/client.model';

@Injectable()
export class PartnershipService {
  constructor(
    @InjectModel(Partnership) private partnerShipModel: typeof Partnership,
  ) {}

  async create(createDto: CreatePartnershipDto) {
    try {
      const data = await this.partnerShipModel.create({
        requested_by_client_id: createDto.requested_by_client_id,
        requested_of_client_id: createDto.requested_of_client_id,
        rev_share_pct: createDto.rev_share_pct,
        authorized: createDto.authorized,
      });
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async findAll(query = {}) {
    try {
      const datas = await this.partnerShipModel.findAll({
        ...query,
        order: [['id', 'DESC']],
        include: [
          {
            model: Client,
            attributes: { exclude: ['password'] },
            as: 'requested_by_client',
          },
          {
            model: Client,
            attributes: { exclude: ['password'] },
            as: 'requested_of_client',
          },
        ],
      });
      return datas.map((item) => item.dataValues);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.partnerShipModel.findOne({ where: { id } });
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async update(id: number, updateDto: UpdatePartnershipDto) {
    try {
      const data = await this.partnerShipModel.findOne({ where: { id } });
      await data.set(updateDto);
      await data.save();
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async remove(id: number) {
    try {
      const data = await this.partnerShipModel.findOne({ where: { id } });
      await data.destroy();
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }
}
