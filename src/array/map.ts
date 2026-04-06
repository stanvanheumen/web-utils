/**
 * Converts an array of objects into a map (dictionary) using a specified key.
 *
 * @template T - The object type
 * @template K - The key of the object to index by
 *
 * @param items - The array of items to convert
 * @param key - The key in the resulting map
 *
 * @returns A readonly record where each key is derived from the specified field
 *          and each value is the corresponding item
 *
 * @example
 * ```ts
 * const users = [
 *   { id: "1", name: "Alice" },
 *   { id: "2", name: "Bob" }
 * ];
 *
 * const map = mapArray(users, "id");
 *
 * // {
 * //   "1": { id: "1", name: "Alice" },
 * //   "2": { id: "2", name: "Bob" }
 * // }
 * ```
 *
 * @remarks
 * - Keys are coerced to strings using `String(...)`
 * - Later items with the same key will overwrite earlier ones
 * - Falsy items (null/undefined) are skipped
 */
export function mapArray<
    T extends Record<string, unknown>,
    K extends keyof T
>(
    items: readonly T[],
    key: K
): Readonly<Record<string, T>> {
    const map: Record<string, T> = Object.create(null);
    for (const item of items) {
        if (item) {
            map[String(item[key])] = item;
        }
    }
    return map;
}
