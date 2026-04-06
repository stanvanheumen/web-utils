/**
 * Returns a new `Date` set to the end of the day (`23:59:59.999`) in local
 * time, without mutating the original.
 *
 * @param date - The date to derive the end of day from
 * @returns A new `Date` at `23:59:59.999` of the same local day
 *
 * @example
 * ```ts
 * dateEndOfDay(new Date('2024-06-15T08:00:00'));
 * // → 2024-06-15T23:59:59.999 (local time)
 * ```
 */
export function endOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}
