/**
 * Matches a valid URL.
 *
 * - Supports `http`, `https`, `ftp`, and protocol-relative (`//`) URLs
 * - Optional BasicAuth (`user:pass@`)
 * - Validates public IP addresses - excludes private and reserved ranges
 *   (loopback `127.x`, private `10.x`, `192.168.x`, `172.16–31.x`, link-local `169.254.x`)
 * - Supports Unicode hostnames (`\u00a1–\uffff`)
 * - Optional port number
 * - Optional path, query string, and fragment
 *
 * @example
 * ```ts
 * REGEX_URL.test('https://example.com');            // true
 * REGEX_URL.test('http://user:pass@example.com');   // true
 * REGEX_URL.test('https://example.com:8080/path');  // true
 * REGEX_URL.test('//example.com');                  // true
 * REGEX_URL.test('ftp://files.example.com');        // true
 * REGEX_URL.test('http://192.168.1.1');             // false (private IP)
 * REGEX_URL.test('not a url');                      // false
 * ```
 */
export const REGEX_URL = new RegExp(
    '^' +
    // protocol (optional - short syntax // is still required)
    '(?:(?:(?:https?|ftp):)?\\/\\/)' +
    // user:pass BasicAuth (optional)
    '(?:\\S+(?::\\S*)?@)?' +
    '(?:' +
    // IP address exclusion - private & local networks
    '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
    '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
    '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
    // IP address dotted notation octets
    // excludes loopback (0.0.0.0), reserved space (>= 224.0.0.0),
    // and network/broadcast addresses (first & last IP of each class)
    '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
    '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
    '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
    // host & domain names (Unicode supported)
    '(?:' +
    '(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?' +
    '[a-z0-9\\u00a1-\\uffff]\\.' +
    ')+' +
    // TLD (2+ chars, may end with dot)
    '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
    ')' +
    // port number (optional)
    '(?::\\d{2,5})?' +
    // resource path (optional)
    '(?:[/?#]\\S*)?' +
    '$',
    'i'
);
