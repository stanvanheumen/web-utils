/**
 * Clamps a number between a minimum and maximum value (inclusive).
 *
 * @param value - The number to clamp
 * @param min - The lower bound
 * @param max - The upper bound
 * @returns `min` if `value < min`, `max` if `value > max`, otherwise `value`
 *
 * @example
 * ```ts
 * clamp(5, 0, 10);  // → 5
 * clamp(-1, 0, 10); // → 0
 * clamp(11, 0, 10); // → 10
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
