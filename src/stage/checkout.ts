import { $loc, $nth, $text } from '../pw/by';
import { click, expectText, expectVisible, fill, step, stepSeq, stepSeqq } from '../pw/cmd';
import { fn } from '../pw/common';

const dom = {
  sentinel: fn($text('Checkout')),
  deliveryAddress: {
    titleFirstNameLastName: fn($loc('#address_delivery .address_firstname.address_lastname')),
    company: fn($nth($loc('#address_delivery .address_address1.address_address2'), 0)),
    address: fn($nth($loc('#address_delivery .address_address1.address_address2'), 1)),
    address2: fn($nth($loc('#address_delivery .address_address1.address_address2'), 2)),
    cityStateZipcode: fn($loc('#address_delivery .address_city.address_state_name.address_postcode')),
    country: fn($loc('#address_delivery .address_country_name')),
    mobileNumber: fn($loc('#address_delivery .address_phone')),
  },
  reviewYourOrder: {
    itemQuantiyById: (id: number) => fn($loc(`#product-${id} .cart_quantity`)),
  },
  comment: fn($loc('textarea[name="message"]')),
  placeOrder: fn($text('Place Order')),
};

export const expectToBeLoaded = step('Checkout must be visible', dom.sentinel(expectVisible()));

export const expectDeliveryAddress = (o: {
  name: string;
  email: string;
  title: string;
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
    'Expect Delivery address',
    dom.deliveryAddress.titleFirstNameLastName(expectText(`${o.title} ${o.firstname} ${o.lastname}`)),
    dom.deliveryAddress.company(expectText(o.company)),
    dom.deliveryAddress.address(expectText(o.address1)),
    dom.deliveryAddress.address2(expectText(o.address2)),
    dom.deliveryAddress.cityStateZipcode(expectText(`${o.city} ${o.state} ${o.zipcode}`)),
    dom.deliveryAddress.country(expectText(o.country)),
    dom.deliveryAddress.mobileNumber(expectText(o.mobile_number)),
  );

export const expectItemQuantity = (x: { id: number; qty: number }) =>
  stepSeqq(
    //
    `Expect ${x.qty} pieces of item ${x.id}`,
    dom.reviewYourOrder.itemQuantiyById(x.id)(expectText(`${x.qty}`)),
  );

export const expectItemQuantities = (xs: { id: number; qty: number }[]) =>
  stepSeq(`Expect item quantities`, xs.map(expectItemQuantity));

export const fillComment = (message: string) => step('Fill comment', dom.comment(fill(message)));

export const placeOrder = step('Place order', dom.placeOrder(click()));
