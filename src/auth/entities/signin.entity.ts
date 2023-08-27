import { ClientEntity } from 'src/client/entities/client.entity';

export class SigninEntity extends ClientEntity {
  token: string;

  constructor(partial: Partial<SigninEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
