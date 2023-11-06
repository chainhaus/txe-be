import { Transform } from 'class-transformer';
export class EventEntity {
  title: string;

  @Transform(({ value }) => new Date(value).getTime())
  date: string;

  @Transform(({ value }) => new Date(value).getTime())
  start_time: string;

  @Transform(({ value }) => new Date(value).getTime())
  end_time: string;
  location: string;
  enabled: boolean;
  private: boolean;

  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: string;

  @Transform(({ value }) => new Date(value).getTime())
  createdAt: string;

  constructor(partial: Partial<EventEntity>) {
    Object.assign(this, partial);
  }
}
