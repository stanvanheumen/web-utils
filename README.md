# @stanvanheumen/web-utils

[![npm version](https://img.shields.io/npm/v/@stanvanheumen/web-utils?style=flat-square&color=cb3837&logo=npm)](https://www.npmjs.com/package/@stanvanheumen/web-utils)
[![npm downloads](https://img.shields.io/npm/dm/@stanvanheumen/web-utils?style=flat-square&color=cb3837&logo=npm)](https://www.npmjs.com/package/@stanvanheumen/web-utils)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@stanvanheumen/web-utils?style=flat-square&label=minzipped&color=2563eb)](https://bundlephobia.com/package/@stanvanheumen/web-utils)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/node/v/@stanvanheumen/web-utils?style=flat-square&logo=node.js&logoColor=white&color=339933)](https://nodejs.org/)
[![license](https://img.shields.io/github/license/stanvanheumen/web-utils?style=flat-square&color=22c55e)](https://github.com/stanvanheumen/web-utils/blob/main/LICENSE)

A lightweight, zero-dependency utility library for web development. Provides type-safe helpers for arrays, strings, numbers, dates, files, and common regex patterns - fully tree-shakeable with ESM and CommonJS support.

## Installation

```bash
npm install @stanvanheumen/web-utils
```

## Usage

```typescript
import { groupByArray, isEmail, blobToFile } from '@stanvanheumen/web-utils';
```

CommonJS is also supported:

```javascript
const { groupByArray, isEmail, blobToFile } = require('@stanvanheumen/web-utils');
```

---

## Environment Support

| Function          | Browser | Node.js |
|-------------------|:-------:|:-------:|
| `clamp`           | ✓       | ✓       |
| `round`           | ✓       | ✓       |
| `chunkArray`      | ✓       | ✓       |
| `groupByArray`    | ✓       | ✓       |
| `mapArray`        | ✓       | ✓       |
| `removeFromArray` | ✓       | ✓       |
| `sortArray`       | ✓       | ✓       |
| `toggleArray`     | ✓       | ✓       |
| `isEmail`         | ✓       | ✓       |
| `isUrl`           | ✓       | ✓       |
| `slugify`         | ✓       | ✓       |
| `parseDate`       | ✓       | ✓       |
| `startOfDay`      | ✓       | ✓       |
| `endOfDay`        | ✓       | ✓       |
| `startOfMonth`    | ✓       | ✓       |
| `endOfMonth`      | ✓       | ✓       |
| `startOfYear`     | ✓       | ✓       |
| `endOfYear`       | ✓       | ✓       |
| `blobToFile`      | ✓       | ✗ ¹     |
| Regex constants   | ✓       | ✓       |

> ¹ `blobToFile` relies on the [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) Web API, which is not available in Node.js.

---

## Table of Contents

- [Number Utilities](#number-utilities)
  - [clamp](#clampvalue-min-max)
  - [round](#roundvalue-decimals)
- [Array Utilities](#array-utilities)
  - [chunkArray](#chunkarrayitems-size)
  - [groupByArray](#groupbyarrayitems-key)
  - [mapArray](#maparrayitems-key)
  - [removeFromArray](#removefromarrayitems-index)
  - [sortArray](#sortarrayitems-criteria)
  - [toggleArray](#togglearrayitems-item-compare)
- [String Utilities](#string-utilities)
  - [isEmail](#isemailvalue)
  - [isUrl](#isurlvalue)
  - [slugify](#slugifyvalue)
- [Date Utilities](#date-utilities)
  - [parseDate](#parsedatevalue)
  - [startOfDay](#startofday)
  - [endOfDay](#endofday)
  - [startOfMonth](#startofmonth)
  - [endOfMonth](#endofmonth)
  - [startOfYear](#startofyear)
  - [endOfYear](#endofyear)
- [File Utilities](#file-utilities)
  - [blobToFile](#blobtofileblob-name-options)
- [Regex Constants](#regex-constants)

---

## API Reference

### Number Utilities

#### `clamp(value, min, max)`

Clamps a number between `min` and `max` (inclusive).

```typescript
clamp(5, 0, 10);  // → 5
clamp(-1, 0, 10); // → 0
clamp(11, 0, 10); // → 10
```

#### `round(value, decimals?)`

Rounds a number to the specified number of decimal places. Defaults to `0` (integer rounding).

```typescript
round(3.14159);    // → 3
round(3.14159, 2); // → 3.14
round(3.14159, 4); // → 3.1416
round(1.005, 2);   // → 1.01
```

---

### Array Utilities

#### `chunkArray(items, size)`

Splits an array into chunks of the specified size. The last chunk may be smaller than `size`.

```typescript
chunkArray([1, 2, 3, 4, 5], 2);
// → [[1, 2], [3, 4], [5]]
```

Throws if `size` is less than 1.

---

#### `groupByArray(items, key)`

Groups array items by a field, returning a record that maps each key to all matching items.

```typescript
const users = [
    { role: 'admin', name: 'Alice' },
    { role: 'user',  name: 'Bob' },
    { role: 'admin', name: 'Carol' },
];

groupByArray(users, 'role');
// → { admin: [{ role: 'admin', name: 'Alice' }, { role: 'admin', name: 'Carol' }], user: [...] }
```

---

#### `mapArray(items, key)`

Converts an array into a keyed record. When multiple items share the same key, the last one wins.

```typescript
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

mapArray(users, 'id');
// → { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' } }
```

---

#### `removeFromArray(items, index)`

Returns a new array with the element at the given index removed. Supports negative indices (`-1` removes the last element).

```typescript
removeFromArray(['a', 'b', 'c'], 1);  // → ['a', 'c']
removeFromArray(['a', 'b', 'c'], -1); // → ['a', 'b']
```

Throws if the index is out of bounds. Never mutates the original array.

---

#### `sortArray(items, criteria)`

Sorts an array by one or more criteria. Supports `string`, `number`, `boolean`, and `Date` values. Multiple criteria act as tiebreakers applied in order.

```typescript
import type { SortCriteria } from '@stanvanheumen/web-utils';

sortArray(users, { key: 'name' });
sortArray(users, [{ key: 'role' }, { key: 'name', direction: 'desc' }]);
```

`SortCriteria<T>` shape:

| Field       | Type                     | Default |
|-------------|--------------------------|---------|
| `key`       | `keyof T`                | -       |
| `direction` | `'asc'` or `'desc'`      | `'asc'` |

---

#### `toggleArray(items, item, compare?)`

Adds an item if it is absent, or removes it if it is already present. Accepts an optional custom comparator.

```typescript
toggleArray([1, 2, 3], 2); // → [1, 3]
toggleArray([1, 3],    2); // → [1, 3, 2]

// Custom comparator
toggleArray(users, { id: 1, name: 'Alice' }, (a, b) => a.id === b.id);
```

---

### String Utilities

#### `isEmail(value)`

Returns `true` if `value` is a valid email address. Supports quoted local parts and IP address domains.

```typescript
isEmail('user@example.com'); // → true
isEmail('not-an-email');     // → false
```

---

#### `isUrl(value)`

Returns `true` if `value` is a valid URL. Accepts `http`, `https`, `ftp`, and protocol-relative (`//`) URLs. Rejects private and reserved IP ranges.

```typescript
isUrl('https://example.com/path?q=1'); // → true
isUrl('http://192.168.1.1');           // → false (private IP)
isUrl('example.com');                  // → false (no protocol)
```

---

#### `slugify(value)`

Converts a string into a URL-friendly slug. Normalises accented characters, lowercases, and replaces separators with hyphens. Passes `null` and `undefined` through unchanged.

```typescript
slugify('Hello, World!'); // → 'hello-world'
slugify('Ångström Units'); // → 'angstrom-units'
slugify(null);            // → null
```

---

### Date Utilities

#### `parseDate(value)`

Parses a value into a `Date`, returning `null` if the value cannot be interpreted as a valid date. Accepts `null` and `undefined` (both return `null`), `Date` objects, Unix millisecond timestamps, and ISO 8601 strings.

Supported string formats:

| Format                        | Example                        | Timezone        |
|-------------------------------|--------------------------------|-----------------|
| `YYYY-MM-DD`                  | `2024-06-15`                   | Local midnight  |
| `YYYY-MM-DDTHH:mm:ss`         | `2024-06-15T12:00:00`          | Treated as UTC  |
| `YYYY-MM-DDTHH:mm:ssZ`        | `2024-06-15T12:00:00Z`         | UTC             |
| `YYYY-MM-DDTHH:mm:ss.sss`     | `2024-06-15T12:00:00.000`      | Treated as UTC  |
| `YYYY-MM-DDTHH:mm:ss.sssZ`    | `2024-06-15T12:00:00.000Z`     | UTC             |
| `YYYY-MM-DDTHH:mm:ss±HH:mm`   | `2024-06-15T12:00:00+02:00`    | Offset applied  |

Any other string returns `null`.

```typescript
parseDate('2024-06-15');                     // → Date (local midnight)
parseDate('2024-06-15T12:00:00Z');           // → Date (UTC noon)
parseDate('2024-06-15T12:00:00.000+02:00'); // → Date (with offset)
parseDate(1718449200000);                    // → Date from timestamp
parseDate('2024-99-99');                     // → null (invalid calendar date)
parseDate('June 15 2024');                   // → null (unrecognised format)
parseDate(null);                             // → null
```

#### `startOfDay(date)`

Returns a new `Date` set to midnight (`00:00:00.000`) in local time. Does not mutate the original.

```typescript
startOfDay(new Date('2024-06-15T14:30:00')); // → 2024-06-15T00:00:00.000
```

---

#### `endOfDay(date)`

Returns a new `Date` set to `23:59:59.999` in local time. Does not mutate the original.

```typescript
endOfDay(new Date('2024-06-15T08:00:00')); // → 2024-06-15T23:59:59.999
```

---

#### `startOfMonth(date)`

Returns a new `Date` set to the first day of the month at midnight in local time. Does not mutate the original.

```typescript
startOfMonth(new Date('2024-06-15T14:30:00')); // → 2024-06-01T00:00:00.000
```

---

#### `endOfMonth(date)`

Returns a new `Date` set to the last day of the month at `23:59:59.999` in local time. Does not mutate the original.

```typescript
endOfMonth(new Date('2024-06-15T14:30:00')); // → 2024-06-30T23:59:59.999
endOfMonth(new Date('2024-02-10T00:00:00')); // → 2024-02-29T23:59:59.999 (leap year)
```

---

#### `startOfYear(date)`

Returns a new `Date` set to January 1st at midnight in local time. Does not mutate the original.

```typescript
startOfYear(new Date('2024-06-15T14:30:00')); // → 2024-01-01T00:00:00.000
```

---

#### `endOfYear(date)`

Returns a new `Date` set to December 31st at `23:59:59.999` in local time. Does not mutate the original.

```typescript
endOfYear(new Date('2024-06-15T14:30:00')); // → 2024-12-31T23:59:59.999
```

---

### File Utilities

#### `blobToFile(blob, name, options?)`

Converts a `Blob` into a `File` with the given filename and optional metadata.

```typescript
const file1 = blobToFile(blob, 'photo.jpg');
const file2 = blobToFile(blob, 'photo.jpg', { type: 'image/jpeg', lastModified: Date.now() });
```

`BlobToFileOptions`:

| Field          | Type     | Default          |
|----------------|----------|------------------|
| `type`         | `string` | `blob.type` or `''` |
| `lastModified` | `number` | `Date.now()`        |

---

### Regex Constants

Pre-compiled regex patterns exported for direct use.

| Export          | Matches                                         |
|-----------------|-------------------------------------------------|
| `REGEX_EMAIL`   | Valid email addresses                           |
| `REGEX_URL`     | Valid URLs (rejects private IP ranges)          |
| `REGEX_INTEGER` | Integer strings - no leading zeros, no decimals |

```typescript
import { REGEX_EMAIL, REGEX_URL, REGEX_INTEGER } from '@stanvanheumen/web-utils';

REGEX_EMAIL.test('user@example.com'); // → true
REGEX_INTEGER.test('042');            // → false (leading zero)
```

---

## License

[MIT](https://github.com/stanvanheumen/web-utils/blob/main/LICENSE) © [Stan van Heumen](https://github.com/stanvanheumen)
