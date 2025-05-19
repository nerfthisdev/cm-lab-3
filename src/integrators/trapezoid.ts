import { rungeRule } from "./utils";

export function trapezoidMethod(
  f: (x: number) => number,
  a: number,
  b: number,
  epsilon: number,
): { result: number; n: number; iterations: string[] } {
  let n = 4;
  const k = 2;
  const iterations: string[] = [];

  const calc = (n: number) => {
    const h = (b - a) / n;
    let sum = (f(a) + f(b)) / 2;
    for (let i = 1; i < n; i++) {
      sum += f(a + i * h);
    }
    return h * sum;
  };

  let I1 = calc(n);
  let I2 = calc(n * 2);
  let r = rungeRule(I1, I2, k);

  iterations.push(`n = ${n}, I = ${I1.toFixed(6)}`);
  iterations.push(
    `n = ${n * 2}, I = ${I2.toFixed(6)}, R = ${r.toExponential(2)}`,
  );

  while (r > epsilon) {
    n *= 2;
    I1 = I2;
    I2 = calc(n * 2);
    r = rungeRule(I1, I2, k);
    iterations.push(
      `n = ${n}, I = ${I2.toFixed(6)}, R = ${r.toExponential(2)}`,
    );
  }

  return { result: I2, n: n * 2, iterations };
}
