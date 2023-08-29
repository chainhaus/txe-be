import { IsNotEmpty } from 'class-validator';
export class CreateTicketDto {
  @IsNotEmpty()
  event_id: number;

  @IsNotEmpty()
  name: string;

  price: number;

  enabled: boolean;
}
