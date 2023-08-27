import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Client extends Model {
  @Column
  name: string;

  @Column
  password: string;

  @Column
  email_address: string;

  @Column({ defaultValue: 'client' })
  role: string;

  @Column
  open_to_partnership: string;

  @Column
  api_key: string;

  @Column({ defaultValue: true })
  email_verified: boolean;
}
