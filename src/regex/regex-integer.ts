/**
 * Matches a valid integer with an optional leading `-` sign.
 * Rejects leading zeros (except for `0` itself) and decimal values.
 *
 * @example
 * ```ts
 * REGEX_INTEGER.test('0');    // true
 * REGEX_INTEGER.test('42');   // true
 * REGEX_INTEGER.test('-7');   // true
 * REGEX_INTEGER.test('+3');   // false
 * REGEX_INTEGER.test('3.14'); // false (decimal)
 * REGEX_INTEGER.test('007');  // false (leading zero)
 * REGEX_INTEGER.test('');     // false
 * ```
 */
export const REGEX_INTEGER = /^-?(0|[1-9]\d*)$/;
