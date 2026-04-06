/**
 * Returns a new `Date` set to the last day of the year at `23:59:59.999` in
 * local time, without mutating the original.
 *
 * @param date - The date to derive the end of year from
 * @returns A new `Date` at December 31st of the same local year
 *
 * @example
 * ```ts
 * dateEndOfYear(new Date('2024-06-15T14:30:00'));
 * // → 2024-12-31T23:59:59.999 (local time)
 * ```
 */
export function endOfYear(date: Date): Date {
    return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
}
