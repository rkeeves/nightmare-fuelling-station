# Nightmare Fuelling Station

This is a place where you can tank up your coding locomotive with the [finest nightmare fuel](https://en.m.wikipedia.org/wiki/File:Inside_Penguin_Mouth.jpg) for our upcoming long trip into Unmaintainabilistan.

## What the?

Playwrigth + TS.

Code is going to interact with [the automation exercise webpage](https://automationexercise.com/test_cases).

Goals are:
- have less code in the test,
- increase composability a tiny bit.
- implementation does not matter, it is just an experiment (I used the most straightforward naivest way).

## How to run?

You are an adult, you can do what you want, but...

```shell
npm install
npx playwright test --trace on
```
> I give exactly 0 flops about ads or flakyness in this repo.
>
> I wrote 2-3 years ago whole repos about working with ajaxy nonsense. This repo is only about making page objects less noisy and a bit more composable.

This will run a headed chromium and record a trace.

By default the html reporter is also used, so you can just:

```shell
npx playwright show-report
```

This will serve the report from localhost.

Stupid thing will do sort of like [Test Case 14](https://automationexercise.com/test_cases)...

My main goal was not Test Case 14, but rather to experiment a bit.

Btw, I use `faker` and print out the seed, so you can repro the randomized data.

## Why the?


```
Page objects simplify authoring by creating a higher-level API which suits your application and simplify maintenance by capturing element selectors in one place and create reusable code to avoid repetition.
```

That statement above, in my opinion, is copium.

A Page Object is just random cr.p on a stick, just like [most patterns](https://www.martinfowler.com/eaaCatalog/activeRecord.html).

Page Objects have a lot of ceremony, people regularly go overboard so you have to [essentially use a DI context to inject them](https://playwright.dev/docs/test-fixtures), they call eachother in non-straightforward ways... It is spaghetti.

Here's one for you with TS decorators:

```typescript
class NewUserSignup {
  private readonly sentinel: Locator;
  private readonly name: Locator;
  private readonly email: Locator;
  private readonly signup: Locator;
  
  constructor(private readonly page: Page) {
    this.sentinel = page.getByText('New User Signup!');
    this.sentinel = page.getByText(`css=*[data-qa='signup-name']`);
    this.sentinel = page.getByText(`css=*[data-qa='signup-email']`);
    this.sentinel = page.getByText(`css=*[data-qa='signup-button']`);
  }

  @step('Fill New User Signup Form and Signup')
  async fillAndSignup(o: { name: string; email: string }) {
    await expect(this.sentinel).toBeVisible();
    await this.name.fill(o.name);
    await this.email.fill(o.email);
    await this.signup.click();
  }
}
```

Imo that thing above is just spaghetti or line-noise.

There's no real good solution, or at least I don't know about one. _(serenity is also a bloat fest, cucumber is just regex bs with handwavy state management, but [I'm completely locked into this box of thinking due to these tools](https://youtu.be/g7gPegf76Mw?t=38))_

So I keep experimenting to this day...

One none solution is to... treat spaghetti as spaghetti explicitly.

I want to be able to arbitrarily throw around spaghetti.

Here's a version, which allows you to throw around spaghetti however you want:

```typescript
// signup.ts
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

// test.spec.ts
import * as Signup from './singup.ts'

test('asd', async ({ page }) => {
  const userDo = interpreter('The Hero', page, test);
  await userDo(
    seqq(
      Signup.fillAndSignup({ name: 'Ann', email: 'a@b.c'}),
      // ...
    )
  );
});
```

You can separate spaghettis:

```typescript
// FoodPage.ts
const someComplicatedThing = (data: SeriousBusiness) =>
  stepSeqq(
    'Serious Business person does complicated thing',
    FoodTable.lookup(data.someOfIt),
    ...
  )

// FoodTable.ts
const someThing = (someOfIt: SomeOfThatBusiness) =>
  stepSeqq(
    'Serious Buiness person orders some of that juicy business object',
    Doodad.play(someOfIt.name),
    PaginatedTable.lookup(someOfIt.fancyStuff)
  )

// PaginatedTable.ts
const lookup = (fancyStuff: FancyStuff) =>
  stepSeqq(
    'Serious Buiness person acts responsibly with the doodad',
    someLocator(hover()),
    otherThingy(fill(fancyStuff.text)),
    andThisThingToo(click({ delay: 200 }))
  )
```

But you can also merge spaghettis:

```typescript
const someComplicatedThing = (data: SeriousBusiness) =>
  stepSeqq(
    'Serious Business person does complicated thing',
    stepSeqq(
      'Serious Buiness person orders some of that juicy business object',
      Doodad.play(data.someOfIt.name),
      stepSeqq(
        'Serious Buiness person acts responsibly with the doodad',
        someLocator(hover()),
        otherThingy(fill(data.someOfIt.fancyStuff.text)),
        andThisThingToo(click({ delay: 200 }))
      )
    ),
    ...
  )
```

One other thing is that in 99% of spaghettis you can get away by __NOT using values from the DOM__.

But... what about that 1%?

You can create spaghetti from unsafe values coming from the DOM:

```typescript
const dom = {
  sentinel: fn($text('Get your coupon!')),
  gimme: fn($text('Give me!')),
  couponCode: fn($dataTest('get-code')),
  enterCouponCode : fn($dataTest('enter-code')),
  submit : fn($dataTest('submit-code')),
};

const readAndEnterCouponCode = seqq(
  dom.sentinel(expectVisible()),
  dom.gimme(click()),
  dom.couponCode(innerText((theCodeReadFromUI) =>
    // This spaghetti is getting some junk text from DOM
    seqq(
      dom.enterCouponCode(fill(theCodeReadFromUI))
      dom.submit(click())
    )
  ))
)
```

And also... because you are defining a constructor for a data structure:

Your spaghetti is synchronous (impl does the async, you are only defining the data structure).

About the implementation...

I'm not happy with the recursive interpreter implementation. I did it to keep it simple. There are better solutions _(We are essentially a `Reader` who reads from environment, and we do async things which are challenging `Task`s, and our code `Either` succeeds or fails.)_

Yep this thing is bad, but Page Objects are also bad and the screenplay whatever pattern is also bad.

So I keep experimenting.

## If interpreter s.cks so much then why derp with passive data?

Well... apart from `Custom`, all other members `Cmd`s are passive data.

If you were able to express all terminal and nonterminals purely by data, then that would enable you to:
- decouple from breaking changes in Playwright
- use other libs (maybe straight Puppeteer without wrapper, or Selenium, or even raw CDP)
- transform the tree freely
- do statistics over your codebase (how many percent of your terminals are `Click`s, how regularly you have `Expect`s, you'd just traverse the trees with something which does not fire side-effects just collects usage data)
- skip logging, add before/after waits etc.

I don't want to lie:
- There are a lot of problems with these kind of approaches too,
- but declarative style has some really interesting pros, in my opinion,
- bubut... my impl is still just cr.p on stick...
