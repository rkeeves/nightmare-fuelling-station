import { Faker } from '@faker-js/faker';
import * as ZCD from './zeroCareDay';

export type Account = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly title: string;
  readonly birth_day: string;
  readonly birth_month: string;
  readonly birth_year: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly company: string;
  readonly address1: string;
  readonly address2: string;
  readonly country: string;
  readonly state: string;
  readonly city: string;
  readonly zipcode: string;
  readonly mobile_number: string;
};

const countries = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];

export const rnd = (f: Faker): Account => {
  const dob = f.date.birthdate({ min: 18, mode: 'age' });
  const firstname = f.person.firstName();
  const lastname = f.person.lastName();
  return {
    name: f.internet.userName({ firstName: firstname, lastName: lastname }),
    email: f.internet.email({ firstName: firstname, lastName: lastname }),
    password: f.internet.password(),
    title: f.helpers.arrayElement(['Mr.', 'Mrs.']),
    birth_day: ZCD.dayNum(dob),
    birth_month: ZCD.monthName(dob),
    birth_year: ZCD.year(dob),
    firstname,
    lastname,
    company: f.company.name(),
    address1: f.location.streetAddress(),
    address2: f.location.streetAddress(),
    country: f.helpers.arrayElement(countries),
    state: f.location.state(),
    city: f.location.city(),
    zipcode: f.location.zipCode(),
    mobile_number: f.phone.number(),
  };
};
