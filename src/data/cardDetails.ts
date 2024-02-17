import { Faker } from '@faker-js/faker';
import * as ZCD from './zeroCareDay';

export type CardDetails = {
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
};

export const rnd = (f: Faker): CardDetails => {
  const d = f.date.future({
    years: 4,
  });
  return {
    cardNumber: f.finance.creditCardNumber(),
    cvc: f.finance.creditCardCVV(),
    expiryMonth: ZCD.monthNumPadded(d),
    expiryYear: ZCD.year(d),
  };
};
