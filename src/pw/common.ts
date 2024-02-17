export const fn =
  <A>(x: A) =>
  <B>(f: (_: A) => B) =>
    f(x);
