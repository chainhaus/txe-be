import { Exclude } from 'class-transformer';

export class ClientEntity {
  name: string;
  email_address: string;
  open_to_partnership: string;
  api_key: string;
  role: string;
  email_verified: boolean;

  @Exclude()
  password: string;

  constructor(partial: Partial<ClientEntity>) {
    Object.assign(this, partial);
  }
}
