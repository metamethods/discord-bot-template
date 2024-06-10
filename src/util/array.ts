/**
 * Calculates the sum of all numbers in an array.
 * @param array - The array of numbers.
 * @returns The sum of all numbers in the array.
 */
export function sum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0);
}
