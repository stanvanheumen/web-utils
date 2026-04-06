/**
 * Returns a new `Date` set to the last day of the month at `23:59:59.999` in
 * local time, without mutating the original.
 *
 * @param date - The date to derive the end of month from
 * @returns A new `Date` at the last day of the same local month
 *
 * @example
 * ```ts
 * dateEndOfMonth(new Date('2024-06-15T14:30:00'));
 * // → 2024-06-30T23:59:59.999 (local time)
 * ```
 */
export function endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}
