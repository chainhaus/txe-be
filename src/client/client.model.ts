import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';

@Table({ timestamps: true })
export class Client extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  name: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  email_address: string;

  @Column({ defaultValue: 'client' })
  role: string;

  @Column
  open_to_partnership: boolean;

  @Column
  api_key: string;

  @Column({ defaultValue: true })
  email_verified: boolean;

  @Column({ defaultValue: true })
  enabled: boolean;
}
