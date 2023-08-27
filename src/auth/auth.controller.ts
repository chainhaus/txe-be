import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SigninDto,
  ForgotPasswordDto,
  SignupDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { Public } from './auth.decorator';
import { ClientService } from '../client/client.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private clientService: ClientService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() payload: SigninDto) {
    return this.authService.signIn(payload.email, payload.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  forgotPassword(@Body() payload: ForgotPasswordDto) {
    return this.authService.forgotPassword(payload.email);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() payload: SignupDto) {
    if (payload.password !== payload.confirm_password) {
      throw new BadRequestException(
        'Confirm password should match with Password',
      );
    }
    return this.clientService.create(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() payload: ResetPasswordDto) {
    if (payload.password !== payload.confirm_password) {
      throw new BadRequestException(
        'Confirm password should match with Password',
      );
    }

    const user = await this.clientService.findByEmail(payload.email);

    return this.clientService.update(user.id, payload);
  }
}
