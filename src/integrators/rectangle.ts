import { formatNumberLatex, rungeRule } from "./utils";

export type Method = "left" | "right" | "middle";

export function rectangleMethod(
  f: (x: number) => number,
  a: number,
  b: number,
  epsilon: number,
  type: Method,
): { result: number; n: number; iterations: string[] } {
  let n = 4;
  const k = 2;
  const iterations: string[] = [];

  const calc = (n: number) => {
    const h = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      let x = 0;
      switch (type) {
        case "left":
          x = a + i * h;
          break;
        case "right":
          x = a + (i + 1) * h;
          break;
        case "middle":
          x = a + (i + 0.5) * h;
          break;
      }
      sum += f(x);
    }
    return h * sum;
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
