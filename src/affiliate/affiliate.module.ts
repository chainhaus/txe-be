import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AffiliateService } from './affiliate.service';
import { AffiliateController } from './affiliate.controller';
import { Affiliate } from './affiliate.model';

@Module({
  imports: [SequelizeModule.forFeature([Affiliate])],
  controllers: [AffiliateController],
  providers: [AffiliateService],
})
export class AffiliateModule {}
