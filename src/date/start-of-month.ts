/**
 * Returns a new `Date` set to the first day of the month at midnight
 * (`00:00:00.000`) in local time, without mutating the original.
 *
 * @param date - The date to derive the start of month from
 * @returns A new `Date` at the first day of the same local month
 *
 * @example
 * ```ts
 * dateStartOfMonth(new Date('2024-06-15T14:30:00'));
 * // → 2024-06-01T00:00:00.000 (local time)
 * ```
 */
export function startOfMonth(date: Date): Date {
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
}
