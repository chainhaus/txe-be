import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
  Request,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';
import {
  SigninDto,
  ForgotPasswordDto,
  SignupDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { Public } from './auth.decorator';
import { ClientService } from '../client/client.service';
import { saltOrRounds } from 'src/config';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private clientService: ClientService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() payload: SigninDto) {
    return this.authService.signIn(payload.email_address, payload.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  forgotPassword(@Body() payload: ForgotPasswordDto) {
    return this.authService.forgotPassword(payload.email_address);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() payload: SignupDto) {
    if (payload.password !== payload.confirm_password) {
      throw new BadRequestException(
        'Confirm password should match with Password',
      );
    }

    const token = uuidv4();
    const hashedToken = await bcrypt.hash(token, saltOrRounds);
    payload.api_key = hashedToken;

    return this.clientService.create(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() payload: ResetPasswordDto, @Request() request) {
    if (payload.password !== payload.confirm_password) {
      throw new BadRequestException(
        'Confirm password should match with Password',
      );
    }

    const user = await this.clientService.findByEmail(
      request.user.email_address,
    );

    return this.clientService.update(user.id, payload);
  }
}
