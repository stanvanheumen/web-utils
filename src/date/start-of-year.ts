/**
 * Returns a new `Date` set to the first day of the year at midnight
 * (`00:00:00.000`) in local time, without mutating the original.
 *
 * @param date - The date to derive the start of year from
 * @returns A new `Date` at January 1st of the same local year
 *
 * @example
 * ```ts
 * dateStartOfYear(new Date('2024-06-15T14:30:00'));
 * // → 2024-01-01T00:00:00.000 (local time)
 * ```
 */
export function startOfYear(date: Date): Date {
    return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
}
