import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from './ticket.model';

@Module({
  imports: [SequelizeModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
