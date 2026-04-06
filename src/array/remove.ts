/**
 * Returns a new array with the element at the given index removed.
 *
 * Supports negative indices: `-1` removes the last element, `-2` the second-to-last, etc.
 * The original array is never mutated.
 *
 * @param items - The source array
 * @param index - The index of the element to remove (negative indices count from the end)
 * @returns A new array with the element at `index` removed
 *
 * @throws {Error} If `index` is out of bounds
 *
 * @example
 * ```ts
 * removeFromArray(['a', 'b', 'c'], 1);
 * // ['a', 'c']
 *
 * removeFromArray(['a', 'b', 'c'], -1);
 * // ['a', 'b']
 *
 * removeFromArray(['a', 'b', 'c'], 0);
 * // ['b', 'c']
 * ```
 */
export function removeFromArray<T>(items: readonly T[], index: number): T[] {
    const i = index < 0 ? items.length + index : index;

    if (i < 0 || i >= items.length) {
        throw new Error(`index ${index} is out of bounds for array of length ${items.length}`);
    }

    return [...items.slice(0, i), ...items.slice(i + 1)];
}
