import { $dataQa, $label, $text } from '../pw/by';
import { check, expectVisible, fill, selectByLabel, stepSeqq } from '../pw/cmd';
import { fn } from '../pw/common';

const dom = {
  sentinel: fn($text('ENTER ACCOUNT INFORMATION')),
  name: fn($dataQa('name')),
  email: fn($dataQa('email')),
  password: fn($dataQa('password')),
  days: fn($dataQa('days')),
  months: fn($dataQa('months')),
  years: fn($dataQa('years')),
  signupNewsLetter: fn($label('Sign up for our newsletter!')),
  receiveSpecialOffers: fn($dataQa('Receive special offers from our partners!')),
};

export const fillAccountInformation = (o: {
  title: string;
  password: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
}) =>
  stepSeqq(
    `Fill 'Enter Account Information' Form`,
    check()($label(o.title)),
    dom.sentinel(expectVisible()),
    dom.password(fill(o.password)),
    dom.days(selectByLabel(o.birth_day)),
    dom.months(selectByLabel(o.birth_month)),
    dom.years(selectByLabel(o.birth_year)),
  );
