import {REGEX_EMAIL} from '../regex/email';

/**
 * Returns `true` if the given string is a valid email address.
 *
 * Validates the most common email formats, including quoted local parts
 * (e.g. `name@example.com`) and IP address domains
 * (e.g. `user@[192.168.1.1]`). Does not cover the full RFC 5322 specification,
 * but reliably handles real-world email addresses.
 *
 * @param value - The string to test
 * @returns `true` if `value` is a valid email address, `false` otherwise
 *
 * @example
 * ```ts
 * isEmail('user@example.com');      // true
 * isEmail('user+tag@sub.domain.io') // true
 * isEmail('not-an-email');          // false
 * isEmail('@missing-local.com');    // false
 * isEmail('missing-at-sign.com');   // false
 * ```
 */
export function isEmail(value: string): boolean {
    return REGEX_EMAIL.test(value);
}
