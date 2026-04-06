/**
 * Rounds a number to the specified number of decimal places.
 *
 * @param value - The number to round
 * @param decimals - The number of decimal places (default: `0`)
 * @returns The rounded number
 *
 * @example
 * ```ts
 * round(3.14159);    // → 3
 * round(3.14159, 2); // → 3.14
 * round(3.14159, 4); // → 3.1416
 * round(1.005, 2);   // → 1.01
 * ```
 */
export function round(value: number, decimals: number = 0): number {
    const factor = 10 ** decimals;
    return Math.round((value + Number.EPSILON) * factor) / factor;
}
