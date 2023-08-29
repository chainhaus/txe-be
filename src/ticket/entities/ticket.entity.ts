export class TicketEntity {
  name: string;
  price: number;
  enabled: boolean;

  constructor(partial: Partial<TicketEntity>) {
    Object.assign(this, partial);
  }
}
