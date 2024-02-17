import { Role } from './role';

export type ByAltText = Readonly<{
  tag: 'ByAltText';
  text: string | RegExp;
  options?: {
    exact?: boolean;
  };
}>;

export const $altText = (
  text: string | RegExp,
  options?: {
    exact?: boolean;
  },
): ByAltText => (options ? { tag: 'ByAltText', text, options } : { tag: 'ByAltText', text });

export type ByLabel = Readonly<{
  tag: 'ByLabel';
  text: string | RegExp;
  options?: {
    exact?: boolean;
  };
}>;

export const $label = (
  text: string | RegExp,
  options?: {
    exact?: boolean;
  },
): ByLabel => (options ? { tag: 'ByLabel', text, options } : { tag: 'ByLabel', text });

export type ByPlaceholder = Readonly<{
  tag: 'ByPlaceholder';
  text: string | RegExp;
  options?: {
    exact?: boolean;
  };
}>;

export const $placeholder = (
  text: string | RegExp,
  options?: {
    exact?: boolean;
  },
): ByPlaceholder => (options ? { tag: 'ByPlaceholder', text, options } : { tag: 'ByPlaceholder', text });

export type ByRole = Readonly<{
  tag: 'ByRole';
  role: Role;
  options?: {
    checked?: boolean;
    disabled?: boolean;
    exact?: boolean;
    expanded?: boolean;
    includeHidden?: boolean;
    level?: number;
    name?: string | RegExp;
    pressed?: boolean;
    selected?: boolean;
  };
}>;

export const $role = (
  role: Role,
  options?: {
    checked?: boolean;
    disabled?: boolean;
    exact?: boolean;
    expanded?: boolean;
    includeHidden?: boolean;
    level?: number;
    name?: string | RegExp;
    pressed?: boolean;
    selected?: boolean;
  },
): ByRole => (options ? { tag: 'ByRole', role, options } : { tag: 'ByRole', role });

export type ByText = Readonly<{
  tag: 'ByText';
  text: string | RegExp;
  options?: {
    exact?: boolean;
  };
}>;

export const $text = (
  text: string | RegExp,
  options?: {
    exact?: boolean;
  },
): ByText => (options ? { tag: 'ByText', text, options } : { tag: 'ByText', text });

export type ByTitle = Readonly<{
  tag: 'ByTitle';
  text: string | RegExp;
  options?: {
    exact?: boolean;
  };
}>;

export const $title = (
  text: string | RegExp,
  options?: {
    exact?: boolean;
  },
): ByTitle => (options ? { tag: 'ByTitle', text, options } : { tag: 'ByTitle', text });

export type ByLocator = Readonly<{
  tag: 'ByLocator';
  selector: string;
  options?: {
    hasNotText?: string | RegExp;
    hasText?: string | RegExp;
  };
}>;

export const $loc = (
  selector: string,
  options?: {
    hasNotText?: string | RegExp;
    hasText?: string | RegExp;
  },
): ByLocator => (options ? { tag: 'ByLocator', selector, options } : { tag: 'ByLocator', selector });

export type ByNth = Readonly<{
  tag: 'ByNth';
  n: number;
  by: By;
}>;

export const $nth = (by: By, n: number): ByNth => ({ tag: 'ByNth', n, by });

export type By = ByAltText | ByLabel | ByLocator | ByPlaceholder | ByRole | ByText | ByTitle | ByNth;

export const $dataQa = (x: string) => $loc(`css=*[data-qa='${x}']`);
