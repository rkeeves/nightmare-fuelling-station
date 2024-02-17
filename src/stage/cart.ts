import { $role, $text } from '../pw/by';
import { click, step } from '../pw/cmd';
import { fn } from '../pw/common';

const dom = {
  sentinel: fn($text('Shopping Cart')),
  proceedToCheckoutButton: fn($text('Proceed To Checkout')),
  checkoutRegisterLoginBtn: fn($role('link', { name: 'Register / Login', exact: true })),
};

export const proceedToCheckout = step('Proceed To Checkout', dom.proceedToCheckoutButton(click()));

export const registerLoginAccount = step('Register / Login account', dom.checkoutRegisterLoginBtn(click()));
