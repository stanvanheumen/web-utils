/**
 * Returns a new `Date` set to the start of the day (midnight) in local time,
 * without mutating the original.
 *
 * @param date - The date to derive the start of day from
 * @returns A new `Date` at `00:00:00.000` of the same local day
 *
 * @example
 * ```ts
 * dateStartOfDay(new Date('2024-06-15T14:30:00'));
 * // → 2024-06-15T00:00:00.000 (local time)
 * ```
 */
export function startOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}
