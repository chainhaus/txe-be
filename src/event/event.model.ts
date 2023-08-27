import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Event extends Model {
  @Column
  title: string;

  @Column
  Date: Date;

  @Column
  start_time: Date;

  @Column
  end_time: Date;

  @Column
  Location: string;

  @Column({ defaultValue: true })
  enabled: boolean;

  @Column({ defaultValue: true })
  private: boolean;
}
