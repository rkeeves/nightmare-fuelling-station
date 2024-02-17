import { $dataQa, $text } from '../pw/by';
import { stepSeqq, fill, click, expectVisible } from '../pw/cmd';
import { fn } from '../pw/common';

const dom = {
  sentinel: fn($text('New User Signup!')),
  name: fn($dataQa('signup-name')),
  email: fn($dataQa('signup-email')),
  singup: fn($dataQa('signup-button')),
};

export const fillAndSignup = (o: { name: string; email: string }) =>
  stepSeqq(
    'Fill New User Signup Form and Signup',
    dom.sentinel(expectVisible()),
    dom.name(fill(o.name)),
    dom.email(fill(o.email)),
    dom.singup(click()),
  );
