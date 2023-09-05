import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateCustomer, CreateInvoice } from './dto/stripe.dto';

@Injectable()
export class StripeService {
  stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_KEY, {
      typescript: true,
      apiVersion: '2023-08-16',
    });
  }
  async createCustomer(data: CreateCustomer) {
    try {
      const res = await this.stripe.customers.create(data);
      return res;
    } catch (err) {
      throw new BadRequestException(err.message || '');
    }
  }

  async createInvoice(data: CreateInvoice) {
    try {
      const res = await this.stripe.invoices.create(data);
      return res;
    } catch (err) {
      throw new BadRequestException(err.message || '');
    }
  }
}
