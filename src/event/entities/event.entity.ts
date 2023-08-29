export class EventEntity {
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  Location: string;
  enabled: boolean;
  private: boolean;

  constructor(partial: Partial<EventEntity>) {
    Object.assign(this, partial);
  }
}
