import { test } from '../fixture/test';
import { Page } from '@playwright/test';
import { By } from './by';
export type Test = typeof test;

export type GoTo = Readonly<{
  tag: 'GoTo';
  url: string;
  options?: {
    referer?: string;
    timeout?: number;
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
  };
}>;

export const goTo = (
  url: string,
  options?: {
    referer?: string;
    timeout?: number;
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
  },
): GoTo => (options ? { tag: 'GoTo', url, options } : { tag: 'GoTo', url });

export type Click = Readonly<{
  tag: 'Click';
  by: By;
  options?: {
    button?: 'left' | 'right' | 'middle';
    clickCount?: number;
    delay?: number;
    force?: boolean;
    modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
    noWaitAfter?: boolean;
    position?: {
      x: number;
      y: number;
    };
    timeout?: number;
    trial?: boolean;
  };
}>;

export const click =
  (options?: {
    button?: 'left' | 'right' | 'middle';
    clickCount?: number;
    delay?: number;
    force?: boolean;
    modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
    noWaitAfter?: boolean;
    position?: {
      x: number;
      y: number;
    };
    timeout?: number;
    trial?: boolean;
  }) =>
  (by: By): Click =>
    options ? { tag: 'Click', by, options } : { tag: 'Click', by };

export type Fill = Readonly<{
  tag: 'Fill';
  by: By;
  value: string;
  options?: {
    force?: boolean;
    noWaitAfter?: boolean;
    timeout?: number;
  };
}>;

export const fill =
  (
    value: string,
    options?: {
      force?: boolean;
      noWaitAfter?: boolean;
      timeout?: number;
    },
  ) =>
  (by: By): Fill =>
    options ? { tag: 'Fill', by, value, options } : { tag: 'Fill', value, by };

export type Check = Readonly<{
  tag: 'Check';
  by: By;
  options?: {
    force?: boolean;
    noWaitAfter?: boolean;
    position?: {
      x: number;
      y: number;
    };
    timeout?: number;
    trial?: boolean;
  };
}>;

export const check =
  (options?: {
    force?: boolean;
    noWaitAfter?: boolean;
    position?: {
      x: number;
      y: number;
    };
    timeout?: number;
    trial?: boolean;
  }) =>
  (by: By): Check =>
    options ? { tag: 'Check', by, options } : { tag: 'Check', by };

export type Uncheck = Readonly<{
  tag: 'Uncheck';
  by: By;
  options?: {
    force?: boolean;
    noWaitAfter?: boolean;
    position?: {
      x: number;
      y: number;
    };
    timeout?: number;
    trial?: boolean;
  };
}>;

export const uncheck =
  (options?: {
    force?: boolean;
    noWaitAfter?: boolean;
    position?: {
      x: number;
      y: number;
    };
    timeout?: number;
    trial?: boolean;
  }) =>
  (by: By): Uncheck =>
    options ? { tag: 'Uncheck', by, options } : { tag: 'Uncheck', by };

export type Clear = Readonly<{
  tag: 'Clear';
  by: By;
  options?: {
    force?: boolean;
    noWaitAfter?: boolean;
    timeout?: number;
  };
}>;

export const clear =
  (options?: { force?: boolean; noWaitAfter?: boolean; timeout?: number }) =>
  (by: By): Clear =>
    options ? { tag: 'Clear', by, options } : { tag: 'Clear', by };

export type ExpectVisible = Readonly<{
  tag: 'ExpectVisible';
  by: By;
  options?: {
    timeout?: number;
    visible?: boolean;
  };
}>;

export const expectVisible =
  (options?: { timeout?: number; visible?: boolean }) =>
  (by: By): ExpectVisible =>
    options ? { tag: 'ExpectVisible', by, options } : { tag: 'ExpectVisible', by };

export type ExpectText = Readonly<{
  tag: 'ExpectText';
  by: By;
  expected: string | RegExp | ReadonlyArray<string | RegExp>;
  options?: {
    ignoreCase?: boolean;
    timeout?: number;
    useInnerText?: boolean;
  };
}>;

export const expectText =
  (
    expected: string | RegExp | ReadonlyArray<string | RegExp>,
    options?: {
      ignoreCase?: boolean;
      timeout?: number;
      useInnerText?: boolean;
    },
  ) =>
  (by: By): ExpectText =>
    options ? { tag: 'ExpectText', by, expected, options } : { tag: 'ExpectText', by, expected };

export type Hover = Readonly<{
  tag: 'Hover';
  by: By;
  options?: {
    force?: boolean;
    modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
    noWaitAfter?: boolean;
    position?: {
      x: number;

      y: number;
    };
    timeout?: number;
    trial?: boolean;
  };
}>;

export const hover =
  (options?: {
    force?: boolean;
    modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
    noWaitAfter?: boolean;
    position?: {
      x: number;

      y: number;
    };
    timeout?: number;
    trial?: boolean;
  }) =>
  (by: By): Hover =>
    options ? { tag: 'Hover', by, options } : { tag: 'Hover', by };

export type SelectByLabel = Readonly<{
  tag: 'SelectByLabel';
  by: By;
  label: string;
  options?: {
    force?: boolean;
    noWaitAfter?: boolean;
    timeout?: number;
  };
}>;

export const selectByLabel =
  (
    label: string,
    options?: {
      force?: boolean;
      noWaitAfter?: boolean;
      timeout?: number;
    },
  ) =>
  (by: By): SelectByLabel =>
    options ? { tag: 'SelectByLabel', label, by, options } : { tag: 'SelectByLabel', label, by };

export type SelectByValue = Readonly<{
  tag: 'SelectByValue';
  by: By;
  value: string;
  options?: {
    force?: boolean;
    noWaitAfter?: boolean;
    timeout?: number;
  };
}>;

export const selectByValue =
  (
    value: string,
    options?: {
      force?: boolean;
      noWaitAfter?: boolean;
      timeout?: number;
    },
  ) =>
  (by: By): SelectByValue =>
    options ? { tag: 'SelectByValue', value, by, options } : { tag: 'SelectByValue', value, by };

export type SelectByIndex = Readonly<{
  tag: 'SelectByIndex';
  by: By;
  index: number;
  options?: {
    force?: boolean;
    noWaitAfter?: boolean;
    timeout?: number;
  };
}>;

export const selectByIndex =
  (
    index: number,
    options?: {
      force?: boolean;
      noWaitAfter?: boolean;
      timeout?: number;
    },
  ) =>
  (by: By): SelectByIndex =>
    options ? { tag: 'SelectByIndex', index, by, options } : { tag: 'SelectByIndex', index, by };

export type Seq = Readonly<{
  tag: 'Seq';
  cmds: Cmd[];
}>;

export const seq = (cmds: Cmd[]): Seq => ({ tag: 'Seq', cmds });

export const seqq = (...cmds: Cmd[]): Seq => ({ tag: 'Seq', cmds });

export type Step = Readonly<{
  tag: 'Step';
  name: string;
  cmd: Cmd;
}>;

export const step = (name: string, cmd: Cmd): Step => ({ tag: 'Step', name, cmd });

export const stepSeq = (name: string, cmds: Cmd[]): Step => ({ tag: 'Step', name, cmd: seq(cmds) });

export const stepSeqq = (name: string, ...cmds: Cmd[]): Step => ({ tag: 'Step', name, cmd: seq(cmds) });

export type Custom = Readonly<{
  tag: 'Custom';
  f: (o: { nick: string; page: Page; test: Test }) => Promise<void>;
}>;

export const custom = (f: (o: { nick: string; page: Page; test: Test }) => Promise<void>): Custom => ({
  tag: 'Custom',
  f,
});

export type InnerText = Readonly<{
  tag: 'InnerText';
  by: By;
  f: (_: string) => Cmd;
}>;

export const innerText =
  (f: (_: string) => Cmd) =>
  (by: By): InnerText => ({
    tag: 'InnerText',
    by,
    f,
  });

export type Log = Readonly<{
  tag: 'Log';
  text: string;
}>;

export const log = (text: string): Log => ({
  tag: 'Log',
  text,
});

export type Cmd =
  | GoTo
  | Click
  | ExpectText
  | ExpectVisible
  | Fill
  | Check
  | Uncheck
  | Clear
  | Hover
  | SelectByLabel
  | SelectByValue
  | SelectByIndex
  | Seq
  | Step
  | Custom
  | InnerText
  | Log;
