import { Exclude } from 'class-transformer';

export class ClientEntity {
  name: string;
  email_address: string;
  open_to_partnership: boolean;
  api_key: string;
  role: string;
  email_verified: boolean;

  @Exclude()
  password: string;

  constructor(partial: Partial<ClientEntity>) {
    Object.assign(this, partial);
  }
}
