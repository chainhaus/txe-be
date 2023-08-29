import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  event_id: number;

  @IsNotEmpty()
  ticket_id: number;

  @IsNotEmpty()
  customer_id: number;

  amount_paid: number;
  fee_to_txe: number;

  valid: boolean;
}
