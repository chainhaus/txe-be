import { Stripe } from './stripe';

describe('Stripe', () => {
  it('should be defined', () => {
    expect(new Stripe()).toBeDefined();
  });
});
