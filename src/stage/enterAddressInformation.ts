import { $dataQa, $text } from '../pw/by';
import { click, expectVisible, fill, selectByValue, stepSeqq } from '../pw/cmd';
import { fn } from '../pw/common';

const dom = {
  sentinel: fn($text('ADDRESS INFORMATION')),
  firstname: fn($dataQa('first_name')),
  lastname: fn($dataQa('last_name')),
  company: fn($dataQa('company')),
  address: fn($dataQa('address')),
  address2: fn($dataQa('address2')),
  country: fn($dataQa('country')),
  state: fn($dataQa('state')),
  city: fn($dataQa('city')),
  zipcode: fn($dataQa('zipcode')),
  mobilenumber: fn($dataQa('mobile_number')),
  createAccount: fn($text('Create Account')),
};

export const fillAddressInformationAndCreateAccount = (o: {
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile_number: string;
}) =>
  stepSeqq(
    `Fill 'Address Information' Form and Create Account`,
    dom.sentinel(expectVisible()),
    dom.firstname(fill(o.firstname)),
    dom.lastname(fill(o.lastname)),
    dom.company(fill(o.company)),
    dom.address(fill(o.address1)),
    dom.address2(fill(o.address2)),
    dom.country(selectByValue(o.country)),
    dom.state(fill(o.state)),
    dom.city(fill(o.city)),
    dom.zipcode(fill(o.zipcode)),
    dom.mobilenumber(fill(o.mobile_number)),
    dom.createAccount(click()),
  );
