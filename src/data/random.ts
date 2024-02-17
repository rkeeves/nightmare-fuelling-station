export const rndNat = (exclusiveUpperBound: number) => (Math.random() * exclusiveUpperBound) | 0;

export const rndChoice = <A>(x: A, xs: A[]): A => xs[rndNat(xs.length)] ?? x;
