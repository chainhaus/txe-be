import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Event } from 'src/event/event.model';
import { Ticket } from 'src/ticket/ticket.model';
import { Client } from 'src/client/client.model';

@Table
export class Order extends Model {
  @ForeignKey(() => Event)
  @Column
  event_id: number;

  @BelongsTo(() => Event)
  event: Event;

  @ForeignKey(() => Ticket)
  @Column
  ticket_id: number;

  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @ForeignKey(() => Client)
  @Column
  customer_id: number;

  @BelongsTo(() => Client)
  customer: Client;

  @Column
  amount_paid: number;

  @Column
  fee_to_txe: number;

  @Column({ defaultValue: true })
  valid: boolean;
}
