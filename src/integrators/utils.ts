export function rungeRule(I1: number, I2: number, k: number): number {
  return Math.abs(I2 - I1) / (Math.pow(2, k) - 1);
}
