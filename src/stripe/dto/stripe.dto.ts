import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateCustomer {
  @IsEmail()
  readonly email: string;
}

export class CreateInvoice {
  @IsNotEmpty()
  readonly customer: string;
}
