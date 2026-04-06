/**
 * Groups an array of objects into a record keyed by the values of a specified field.
 *
 * Unlike {@link arrayMap}, which keeps only one item per key, `arrayGroupBy`
 * collects all items with the same key into an array.
 *
 * @template T - The object type; the field at `K` must be a `string` or `number`
 * @template K - The key to group by
 *
 * @param items - The array to group
 * @param key - The field to group by
 * @returns A record mapping each key value to an array of matching items
 *
 * @example
 * ```ts
 * const users = [
 *   { role: 'admin', name: 'Alice' },
 *   { role: 'user',  name: 'Bob'   },
 *   { role: 'user',  name: 'Carol' },
 * ];
 *
 * arrayGroupBy(users, 'role');
 * // {
 * //   admin: [{ role: 'admin', name: 'Alice' }],
 * //   user:  [{ role: 'user', name: 'Bob' }, { role: 'user', name: 'Carol' }],
 * // }
 * ```
 */
export function arrayGroupBy<
    T extends Record<K, string | number>,
    K extends keyof T
>(
    items: readonly T[],
    key: K
): Readonly<Record<`${T[K]}`, T[]>> {
    const groups: Record<string, T[]> = Object.create(null);

    for (const item of items) {
        const groupKey = String(item[key]);
        (groups[groupKey] ??= []).push(item);
    }

    return groups as Readonly<Record<`${T[K]}`, T[]>>;
}
