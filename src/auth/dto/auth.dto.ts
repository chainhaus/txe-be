import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateClientDto } from 'src/client/dto/create-client.dto';
export class SigninDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class SignupDto extends CreateClientDto {
  @IsNotEmpty()
  readonly confirm_password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  readonly email: string;
}

export class ResetPasswordDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly confirm_password: string;
}
