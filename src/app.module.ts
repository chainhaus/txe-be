import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Client } from './client/client.model';
import { Event } from './event/event.model';
import { Order } from './order/order.model';
import { Partnership } from './partnership/partnership.model';
import { Ticket } from './ticket/ticket.model';

import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './client/client.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { PartnershipModule } from './partnership/partnership.module';
import { OrderModule } from './order/order.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          host: configService.get('HOST'),
          port: +configService.get('PORT'),
          username: configService.get('USERNAME'),
          password: configService.get('PASSWORD'),
          database: configService.get('DATABASE'),
          omitNull: true,
          models: [Client, Event, Order, Partnership, Ticket],
        };
      },
    }),
    MailModule,
    AuthModule,
    UsersModule,
    EventModule,
    TicketModule,
    PartnershipModule,
    OrderModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
