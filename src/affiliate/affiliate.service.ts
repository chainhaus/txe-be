import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';
import { Affiliate } from './affiliate.model';
import { Client } from 'src/client/client.model';

@Injectable()
export class AffiliateService {
  constructor(
    @InjectModel(Affiliate) private affiliateModel: typeof Affiliate,
  ) {}

  async create(createDto: CreateAffiliateDto) {
    try {
      const data = await this.affiliateModel.create({
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
      const datas = await this.affiliateModel.findAll({
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
      const data = await this.affiliateModel.findOne({ where: { id } });
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async update(id: number, updateDto: UpdateAffiliateDto) {
    try {
      const data = await this.affiliateModel.findOne({ where: { id } });
      await data.set(updateDto);
      await data.save();
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }

  async remove(id: number) {
    try {
      const data = await this.affiliateModel.findOne({ where: { id } });
      await data.destroy();
      return data.dataValues;
    } catch (error) {
      throw new BadRequestException(error.original.message || error.message);
    }
  }
}
