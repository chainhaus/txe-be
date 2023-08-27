import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Client } from 'src/client/client.model';

@Table
export class Partnership extends Model {
  @ForeignKey(() => Client)
  @Column
  requested_by_client_id: string;

  @ForeignKey(() => Client)
  @Column
  requested_of_client_id: Date;

  @Column
  rev_share_pct: number;

  @Column({ defaultValue: true })
  authorized: boolean;

}
