import { $dataQa, $role } from '../pw/by';
import { custom, expectVisible, fill, stepSeqq } from '../pw/cmd';
import { fn } from '../pw/common';

const dom = {
  sentinel: fn($role('heading', { name: 'Payment' })),
  nameOnCard: fn($dataQa('name-on-card')),
  cardNumber: fn($dataQa('card-number')),
  cvc: fn($dataQa('cvc')),
  expiryMonth: fn($dataQa('expiry-month')),
  expiryYear: fn($dataQa('expiry-year')),
};

export const enterPaymentDetails = (o: {
  firstname: string;
  lastname: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}) =>
  stepSeqq(
    'Enter Payment Details',
    dom.sentinel(expectVisible()),
    dom.nameOnCard(fill(`${o.firstname} ${o.lastname}`)),
    dom.cardNumber(fill(o.cardNumber)),
    dom.cvc(fill(o.cvc)),
    dom.expiryMonth(fill(o.expiryMonth)),
    dom.expiryYear(fill(o.expiryYear)),
  );

export const submitWithSuccess = stepSeqq(
  'Submit Payment with Success (using Puppeteer :D)',
  custom(async ({ page }) => {
    const btn = await page.getByText('Pay and Confirm Order').elementHandle();
    if (btn == null) throw new Error('Pay and Confirm Order was invisible');
    const text = await page.locator('css=#success_message').elementHandle();
    if (text == null) throw new Error('Pay and Confirm Order was invisible');
    await Promise.all([btn.click(), text.waitForElementState('visible')]);
  }),
);
