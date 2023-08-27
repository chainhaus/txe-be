import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../client/client.service';
import { MailService } from '../mail/mail.service';
import { SigninEntity } from './entities/signin.entity';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signIn(email: string, password: string): Promise<SigninEntity> {
    const user = await this.clientService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      email_address: user.email_address,
      role: user.role,
    };

    return new SigninEntity({
      ...user,
      token: await this.jwtService.signAsync(payload),
    });
  }

  async forgotPassword(email: string) {
    const user = await this.clientService.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const payload = {
      email_address: user.email_address,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return await this.mailService.sendForgotPassword(
      user.email_address,
      user.name,
      token,
    );
  }
}
