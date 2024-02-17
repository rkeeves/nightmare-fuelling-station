import { interpreter } from '../src/pw/interpreter';
import { log, seqq } from '../src/pw/cmd';
import { test } from '../src/fixture/test';
import { Account, CardDetails } from '../src/data';
import {
  Home,
  Nav,
  Cart,
  Signup,
  EnterAccountInformation,
  EnterAddressInformation,
  AccountCreated,
  Checkout,
  Payment,
  AccountDeleted,
} from '../src/stage';
import { faker } from '@faker-js/faker';

test('Test Case 14: Place Order: Register while Checkout, nightmare fuel allowed, any percent', async ({ page }) => {
  const seed = faker.seed();
  const refDate = faker.defaultRefDate();
  console.log(`You can reproduce me by setting faker's seed and refDate like below:`);
  console.log(`faker.seed(${seed});`);
  console.log(`faker.setDefaultRefDate(new Date('${refDate.toUTCString()}'));`);
  const account = Account.rnd(faker);
  const card = CardDetails.rnd(faker);
  const user = interpreter(account.firstname, page, test);
  await user(
    seqq(
      Home.visit,
      Home.addItemsToCart([1, 4, 8]),
      Nav.goToCart,
      Cart.proceedToCheckout,
      Cart.registerLoginAccount,
      Signup.fillAndSignup(account),
      EnterAccountInformation.fillAccountInformation(account),
      EnterAddressInformation.fillAddressInformationAndCreateAccount(account),
      AccountCreated.expectThenContinue,
      Nav.expectToBeLoggedInAs(account),
      Nav.goToCart,
      Cart.proceedToCheckout,
      Checkout.expectToBeLoaded,
      Checkout.expectDeliveryAddress(account),
      Checkout.fillComment(faker.lorem.sentence()),
      Checkout.expectItemQuantities([
        { id: 1, qty: 1 },
        { id: 4, qty: 1 },
        { id: 8, qty: 1 },
      ]),
      Checkout.placeOrder,
      Payment.enterPaymentDetails({ ...account, ...card }),
      Payment.submitWithSuccess,
      Nav.deleteAccount,
      AccountDeleted.expectThenContinue,
      // I did this last step to demonstrate unsafe reading
      Nav.readNavsInnerTextForFun((s) =>
        seqq(
          //
          log('I read from the nav the following'),
          log(s),
        ),
      ),
    ),
  );
});
