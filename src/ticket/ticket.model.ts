import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Event } from 'src/event/event.model';

@Table
export class Ticket extends Model {
  @ForeignKey(() => Event)
  @Column
  event_id: number;

  @Column
  name: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column({ defaultValue: true })
  enabled: boolean;
}
