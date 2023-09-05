import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Client } from 'src/client/client.model';

@Table
export class Partnership extends Model {
  @ForeignKey(() => Client)
  @Column
  requested_by_client_id: number;

  @BelongsTo(() => Client, 'requested_by_client_id')
  requested_by_client: Client;

  @ForeignKey(() => Client)
  @Column
  requested_of_client_id: number;

  @BelongsTo(() => Client, 'requested_of_client_id')
  requested_of_client: Client;

  @Column
  rev_share_pct: number;

  @Column({ defaultValue: true })
  authorized: boolean;
}
