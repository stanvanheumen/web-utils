import {REGEX_URL} from '../regex/regex-url';

/**
 * Returns `true` if the given string is a valid URL.
 *
 * Supports `http`, `https`, `ftp`, and protocol-relative (`//`) URLs.
 * Rejects private and reserved IP ranges (`10.x`, `127.x`, `192.168.x`, etc.).
 *
 * Note: bare hostnames without a protocol (e.g. `example.com`) are not
 * considered valid - a protocol or `//` prefix is required.
 *
 * @param value - The string to test
 * @returns `true` if `value` is a valid URL, `false` otherwise
 *
 * @example
 * ```ts
 * stringIsUrl('https://example.com');           // true
 * stringIsUrl('//example.com/path?q=1');        // true
 * stringIsUrl('ftp://files.example.com');       // true
 * stringIsUrl('http://192.168.1.1');            // false (private IP)
 * stringIsUrl('example.com');                   // false (no protocol)
 * stringIsUrl('not a url');                     // false
 * ```
 */
export function stringIsUrl(value: string): boolean {
    return REGEX_URL.test(value);
}
