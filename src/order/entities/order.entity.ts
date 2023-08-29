export class OrderEntity {
  event_id: number;
  ticket_id: number;
  customer_id: number;
  amount_paid: number;
  fee_to_txe: number;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
