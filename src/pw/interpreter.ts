import { Page, Locator } from '@playwright/test';
import { By } from './by';
import { Cmd, Test } from './cmd';

const $ = (x: By, page: Page): Locator => {
  switch (x.tag) {
    case 'ByTitle':
      return page.getByTitle(x.text, x.options);
    case 'ByLocator':
      return page.locator(x.selector, x.options);
    case 'ByAltText':
      return page.getByAltText(x.text, x.options);
    case 'ByLabel':
      return page.getByLabel(x.text, x.options);
    case 'ByPlaceholder':
      return page.getByPlaceholder(x.text, x.options);
    case 'ByRole':
      return page.getByRole(x.role, x.options);
    case 'ByText':
      return page.getByText(x.text, x.options);
    case 'ByNth':
      return $(x.by, page).nth(x.n);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const absurd = (_: never): never => {
  throw new Error("Didn't expect to get here");
};

export const interpreter = (nick: string, page: Page, t: Test) => {
  const f = async (x: Cmd): Promise<void> => {
    switch (x.tag) {
      case 'GoTo':
        await page.goto(x.url, x.options);
        return;
      case 'Click':
        return await $(x.by, page).click(x.options);
      case 'Custom': {
        await x.f({ nick, page, test: t });
        return;
      }
      case 'ExpectVisible':
        return await t.expect($(x.by, page)).toBeVisible(x.options);
      case 'ExpectText':
        return await t.expect($(x.by, page)).toHaveText(x.expected, x.options);
      case 'Fill':
        return await $(x.by, page).fill(x.value, x.options);
      case 'Check':
        return await $(x.by, page).check(x.options);
      case 'Uncheck':
        return await $(x.by, page).uncheck(x.options);
      case 'Clear':
        return await $(x.by, page).clear(x.options);
      case 'Hover':
        return await $(x.by, page).hover(x.options);
      case 'SelectByLabel':
        await $(x.by, page).selectOption({ label: x.label }, x.options);
        return;
      case 'SelectByValue':
        await $(x.by, page).selectOption({ value: x.value }, x.options);
        return;
      case 'SelectByIndex':
        await $(x.by, page).selectOption({ index: x.index }, x.options);
        return;
      case 'Seq': {
        for (const cmd of x.cmds) {
          await f(cmd);
        }
        return;
      }
      case 'Step': {
        return t.step(`${nick}, ${x.name}`, () => f(x.cmd));
      }
      case 'InnerText': {
        const txt = await $(x.by, page).innerText();
        return await f(x.f(txt));
      }
      case 'Log': {
        console.log(x.text);
        return;
      }
      default:
        return absurd(x);
    }
  };
  return f;
};
