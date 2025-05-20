import { formatNumberLatex, rungeRule } from "./utils";

export function simpsonMethod(
  f: (x: number) => number,
  a: number,
  b: number,
  epsilon: number,
): { result: number; n: number; iterations: string[] } {
  let n = 4;
  const k = 4;
  const iterations: string[] = [];

  const calc = (n: number) => {
    if (n % 2 !== 0) n++;
    const h = (b - a) / n;
    let sum = f(a) + f(b);
    for (let i = 1; i < n; i++) {
      const coef = i % 2 === 0 ? 2 : 4;
      sum += coef * f(a + i * h);
    }
    return (h / 3) * sum;
  };

  let I1 = calc(n);
  let I2 = calc(n * 2);
  let r = rungeRule(I1, I2, k);

  iterations.push(`1.\\quad n = ${n},\\quad I = ${formatNumberLatex(I1)}`);
  iterations.push(
    `2.\\quad n = ${n * 2},\\quad I = ${formatNumberLatex(I2)},\\quad R = ${formatNumberLatex(r)}`,
  );
  while (r > epsilon) {
    n *= 2;
    I1 = I2;
    I2 = calc(n * 2);
    r = rungeRule(I1, I2, k);
    iterations.push(
      `${iterations.length + 1}.\\quad n = ${n},\\quad I = ${formatNumberLatex(I2)},\\quad R = ${formatNumberLatex(r)}`,
    );
    if (n > 1000000) {
      break;
    }
  }

  return { result: I2, n: n * 2, iterations };
}
