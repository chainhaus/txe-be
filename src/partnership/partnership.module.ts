import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PartnershipService } from './partnership.service';
import { PartnershipController } from './partnership.controller';
import { Partnership } from './partnership.model';

@Module({
  imports: [SequelizeModule.forFeature([Partnership])],
  controllers: [PartnershipController],
  providers: [PartnershipService],
})
export class PartnershipModule {}
