/**
 * Matches a valid email address, including quoted local parts
 * (e.g. `name@example.com`) and IP address domains
 * (e.g. `user@[192.168.1.1]`).
 *
 * @example
 * ```ts
 * REGEX_EMAIL.test('user@example.com');       // true
 * REGEX_EMAIL.test('user@[192.168.1.1]');     // true
 * REGEX_EMAIL.test('"user name"@example.com') // true
 * REGEX_EMAIL.test('not-an-email');           // false
 * ```
 */
export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
