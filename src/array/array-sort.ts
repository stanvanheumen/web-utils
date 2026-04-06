/**
 * The direction to sort by.
 */
export type SortDirection = 'asc' | 'desc';

/**
 * A value type that can be compared for ordering.
 */
type Comparable = string | number | boolean | Date;

/**
 * Extracts the keys of `T` whose values extend {@link Comparable}.
 */
type ComparableKeys<T> = {
    [K in keyof T]: T[K] extends Comparable ? K : never;
}[keyof T];

/**
 * A single sort rule applied by {@link arraySort}.
 */
export interface SortCriteria<T> {
    /** The field to sort by. Must hold a {@link Comparable} value. */
    key: ComparableKeys<T>;
    /**
     * The sort direction.
     * @default 'asc'
     */
    direction?: SortDirection;
}

/**
 * Returns a new array sorted by one or more criteria, in order of priority.
 *
 * When multiple criteria are provided, the next criterion is used as a
 * tiebreaker when the previous one results in equal values.
 *
 * - Strings are compared with `localeCompare`
 * - Numbers are compared numerically
 * - Booleans are compared as `false < true`
 * - Dates are compared by their time value
 *
 * The original array is never mutated.
 *
 * @param items - The array to sort
 * @param criteria - A single sort rule or an array of rules (applied in order)
 * @returns A new sorted array
 *
 * @example
 * ```ts
 * const users = [
 *   { name: 'Charlie', age: 32 },
 *   { name: 'Alice',   age: 25 },
 *   { name: 'Bob',     age: 28 },
 * ];
 *
 * // Single criterion
 * arraySort(users, { key: 'name' });
 * // [Alice, Bob, Charlie]
 *
 * arraySort(users, { key: 'age', direction: 'desc' });
 * // [Charlie, Bob, Alice]
 *
 * // Multiple criteria - sort by role asc, then name asc as tiebreaker
 * const people = [
 *   { name: 'Charlie', role: 'user'  },
 *   { name: 'Alice',   role: 'admin' },
 *   { name: 'Bob',     role: 'user'  },
 * ];
 *
 * arraySort(people, [{ key: 'role' }, { key: 'name' }]);
 * // [Alice (admin), Bob (user), Charlie (user)]
 * ```
 */
export function arraySort<T>(
    items: readonly T[],
    criteria: SortCriteria<T> | SortCriteria<T>[],
): T[] {
    const rules = Array.isArray(criteria) ? criteria : [criteria];

    return [...items].sort((a, b) => {
        for (const { key, direction = 'asc' } of rules) {
            const result = compareValues(
                a[key] as Comparable,
                b[key] as Comparable,
                direction,
            );
            if (result !== 0) return result;
        }
        return 0;
    });
}

function compareValues(a: Comparable, b: Comparable, direction: SortDirection): number {
    if (a === b) return 0;

    const order = direction === 'asc' ? 1 : -1;

    if (a instanceof Date && b instanceof Date) {
        return (a.getTime() - b.getTime()) * order;
    }

    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b) * order;
    }

    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return (Number(a) - Number(b)) * order;
    }

    return (a < b ? -1 : 1) * order;
}
