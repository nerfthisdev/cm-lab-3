export function rungeRule(I1: number, I2: number, k: number): number {
  return Math.abs(I2 - I1) / (Math.pow(2, k) - 1);
}

export function isFiniteInterval(a: number, b: number): boolean {
  return isFinite(a) && isFinite(b) && a <= b;
}

export function formatNumberLatex(value: number): string {
  if (value === 0) return "0";
  const absVal = Math.abs(value);
  if (absVal < 1e-11 || absVal >= 1e11) {
    const exponent = Math.floor(Math.log10(absVal));
    const mantissa = (value / Math.pow(10, exponent)).toFixed(3);
    return `${mantissa} \\cdot 10^{${exponent}}`;
  } else {
    return value.toFixed(6);
  }
}
