/**
 * Returns a new array with the item added if it was absent, or removed if it was present.
 *
 * Presence is determined by the `compare` function, which defaults to strict
 * equality (`===`). Provide a custom comparator to match objects by a specific
 * field or any other criteria.
 *
 * The original array is never mutated.
 *
 * @param items - The source array
 * @param item - The item to add or remove
 * @param compare - Function to determine equality (default: `(a, b) => a === b`)
 * @returns A new array with the item toggled
 *
 * @example
 * ```ts
 * // Primitives (default comparator)
 * toggleArray([1, 2, 3], 2);
 * // [1, 3]  (removed)
 *
 * toggleArray([1, 3], 2);
 * // [1, 3, 2]  (added)
 *
 * // Objects - compare by id
 * const selected = [{ id: 1, name: 'Alice' }];
 *
 * toggleArray(selected, { id: 2, name: 'Bob' }, (a, b) => a.id === b.id);
 * // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]  (added)
 *
 * toggleArray(selected, { id: 1, name: 'Alice' }, (a, b) => a.id === b.id);
 * // []  (removed)
 * ```
 */
export function toggleArray<T>(
    items: readonly T[],
    item: T,
    compare: (a: T, b: T) => boolean = (a, b) => a === b,
): T[] {
    return items.some(i => compare(i, item))
        ? items.filter(i => !compare(i, item))
        : [...items, item];
}
