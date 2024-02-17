import { $loc, $text } from '../pw/by';
import { step, click, expectVisible, innerText, Cmd } from '../pw/cmd';
import { fn } from '../pw/common';

const dom = {
  nav: fn($loc('.shop-menu')),
  cart: fn($loc(`.shop-menu a[href='/view_cart']`)),
  deleteAccount: fn($loc(`.shop-menu a[href='/delete_account']`)),
  loggedInAs: (uname: string) => fn($text(`Logged in as ${uname}`)),
};

export const goToCart = step('Go to Cart Page', dom.cart(click()));

export const deleteAccount = step('Delete Account', dom.deleteAccount(click()));

export const expectToBeLoggedInAs = (o: { name: string }) =>
  step(
    //
    `Expect to be logged in as ${o.name}`,
    dom.loggedInAs(o.name)(expectVisible()),
  );

export const readNavsInnerTextForFun = (f: (_: string) => Cmd) => dom.nav(innerText(f));
