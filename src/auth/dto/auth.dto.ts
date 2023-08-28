import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
export class SigninDto {
  @IsEmail()
  readonly email_address: string;

  @IsNotEmpty()
  readonly password: string;
}

export class SignupDto extends CreateClientDto {
  @IsNotEmpty()
  readonly confirm_password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  readonly email_address: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly confirm_password: string;
}
