/**
 * Parses a value into a `Date`, returning `null` if the value cannot be
 * interpreted as a valid date.
 *
 * Accepted input forms:
 * - **`null` / `undefined`** - returns `null`
 * - **`Date`** - returned as-is if valid, otherwise `null`
 * - **`number`** - treated as a Unix millisecond timestamp
 * - **ISO datetime** - `YYYY-MM-DDTHH:mm:ss` with optional fractional seconds
 *   (`.sss`) and optional timezone (`Z` or `±HH:mm`); when no timezone is
 *   present the value is treated as UTC
 * - **ISO date** (`YYYY-MM-DD`) - parsed as local midnight to avoid timezone-offset surprises
 * - **any other string** - returns `null`
 *
 * @param value - The value to parse
 * @returns A valid `Date` or `null` if parsing fails
 *
 * @example
 * ```ts
 * dateParse('2024-06-15');                        // Date (local midnight)
 * dateParse('2024-06-15T12:00:00');               // Date (UTC, no tz → Z appended)
 * dateParse('2024-06-15T12:00:00Z');              // Date (UTC)
 * dateParse('2024-06-15T12:00:00.000Z');          // Date (UTC with ms)
 * dateParse('2024-06-15T12:00:00+02:00');         // Date (with tz offset)
 * dateParse(1718449200000);                       // Date from timestamp
 * dateParse(new Date('2024-06-15'));              // Date (passed through)
 * dateParse('June 15 2024');                     // null
 * dateParse(null);                                // null
 * dateParse(undefined);                           // null
 * ```
 */
export function parseDate(value: string | number | Date | null | undefined): Date | null {
    if (value === null || value === undefined) {
        return null;
    }

    if (value instanceof Date) {
        return createDate(value);
    }

    if (typeof value === 'number') {
        return createDate(new Date(value));
    }

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(value)) {
        const normalized = /Z|[+-]\d{2}:\d{2}$/.test(value) ? value : `${value}Z`;
        return createDate(new Date(normalized));
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [y, m, d] = value.split('-');
        const year = Number(y);
        const month = Number(m) - 1;
        const day = Number(d);
        const date = new Date(year, month, day);
        if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
            return null;
        }
        return date;
    }

    return null;
}

function createDate(date: Date): Date | null {
    return isNaN(date.getTime()) ? null : date;
}
