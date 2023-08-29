import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateClientDto {
  readonly name: string;

  @IsEmail()
  readonly email_address: string;

  @IsNotEmpty()
  password: string;

  readonly open_to_partnership: string;
  api_key: string;
  readonly role: string;
  readonly email_verified: boolean;
}
