import { $loc, $text } from '../pw/by';
import { expectVisible, goTo, stepSeqq, stepSeq, hover, click } from '../pw/cmd';
import { fn } from '../pw/common';

const dom = {
  sentinel: fn($loc('css=#slider-carousel')),
  overlayTriggerBtn: (id: number) => fn($loc(`.features_items .productinfo a[data-product-id='${id}']`)),
  overlayAddToCartBtn: (id: number) => fn($loc(`.features_items .product-overlay a[data-product-id='${id}']`)),
  dialogContinueShopping: fn($text('Continue Shopping')),
};

export const visit = stepSeqq(
  //
  'Navigate to the website',
  goTo('/'),
  dom.sentinel(expectVisible()),
);

export const addItemToCart = (id: number) =>
  stepSeqq(
    `Add item ${id} to cart`,
    dom.overlayTriggerBtn(id)(hover()),
    dom.overlayAddToCartBtn(id)(click()),
    dom.dialogContinueShopping(click()),
  );

export const addItemsToCart = (ids: number[]) =>
  stepSeq(
    `Add items ${ids.join(',')} to cart`,
    ids.map((id) => addItemToCart(id)),
  );
