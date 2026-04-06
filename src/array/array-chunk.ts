/**
 * Splits an array into chunks of a given size.
 *
 * The last chunk may be smaller than `size` if the array length
 * is not evenly divisible.
 *
 * @param items - The array to split
 * @param size - The maximum length of each chunk (must be >= 1)
 * @returns An array of chunks
 *
 * @throws {Error} If `size` is less than 1
 *
 * @example
 * ```ts
 * arrayChunk([1, 2, 3, 4, 5], 2);
 * // [[1, 2], [3, 4], [5]]
 *
 * arrayChunk(['a', 'b', 'c', 'd'], 4);
 * // [['a', 'b', 'c', 'd']]
 *
 * arrayChunk([], 3);
 * // []
 * ```
 */
export function arrayChunk<T>(items: readonly T[], size: number): T[][] {
    if (size < 1) {
        throw new Error(`size must be >= 1, got ${size}`);
    }

    const chunks: T[][] = [];

    for (let i = 0; i < items.length; i += size) {
        chunks.push(items.slice(i, i + size) as T[]);
    }

    return chunks;
}
