import { $text } from '../pw/by';
import { click, expectVisible, stepSeqq } from '../pw/cmd';
import { fn } from '../pw/common';

const dom = {
  sentinel: fn($text('ACCOUNT CREATED!')),
  continue: fn($text('Continue')),
};

export const expectThenContinue = stepSeqq(
  'See Account Created Screen and Continue',
  dom.sentinel(expectVisible()),
  dom.continue(click()),
);
