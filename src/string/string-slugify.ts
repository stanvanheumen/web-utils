/**
 * Converts a string into a URL-friendly slug.
 *
 * - Normalizes accented characters (e.g. `é` → `e`)
 * - Converts to lowercase
 * - Replaces spaces and separators with `-`
 * - Removes any remaining non-alphanumeric characters
 * - Collapses multiple consecutive dashes into one
 * - Trims leading and trailing dashes
 *
 * @param value - The string to slugify
 * @returns A URL-safe slug
 *
 * @example
 * ```ts
 * stringSlugify('Hello World');
 * // 'hello-world'
 *
 * stringSlugify('  Héllo & Wörld!  ');
 * // 'hello-world'
 *
 * stringSlugify('What is a slug?');
 * // 'what-is-a-slug'
 * ```
 */
export function stringSlugify(value: string): string;
export function stringSlugify(value: null): null;
export function stringSlugify(value: undefined): undefined;
export function stringSlugify(value: string | null | undefined): string | null | undefined {
    if (value === null || value === undefined) {
        return value;
    }

    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9\s_-]/g, '')
        .trim()
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
