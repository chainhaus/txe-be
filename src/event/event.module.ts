import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event } from './event.model';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
