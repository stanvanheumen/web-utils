# @stanvanheumen/web-utils

[![npm version](https://img.shields.io/npm/v/@stanvanheumen/web-utils?style=flat-square&color=cb3837&logo=npm)](https://www.npmjs.com/package/@stanvanheumen/web-utils)
[![npm downloads](https://img.shields.io/npm/dm/@stanvanheumen/web-utils?style=flat-square&color=cb3837&logo=npm)](https://www.npmjs.com/package/@stanvanheumen/web-utils)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@stanvanheumen/web-utils?style=flat-square&label=minzipped&color=2563eb)](https://bundlephobia.com/package/@stanvanheumen/web-utils)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/node/v/@stanvanheumen/web-utils?style=flat-square&logo=node.js&logoColor=white&color=339933)](https://nodejs.org/)
[![license](https://img.shields.io/github/license/stanvanheumen/web-utils?style=flat-square&color=22c55e)](https://github.com/stanvanheumen/web-utils/blob/main/LICENSE)

A lightweight, zero-dependency utility library for web development. Provides type-safe helpers for arrays, strings, files, and common regex patterns - fully tree-shakeable with ESM and CommonJS support.

## Installation

```bash
npm install @stanvanheumen/web-utils
```

## Usage

```typescript
import { arrayGroupBy, stringIsEmail, blobToFile } from '@stanvanheumen/web-utils';
```

CommonJS is also supported:

```javascript
const { arrayGroupBy, stringIsEmail, blobToFile } = require('@stanvanheumen/web-utils');
```

---

## Environment Support

| Function          | Browser | Node.js |
|-------------------|:-------:|:-------:|
| `arrayChunk`      | ✓       | ✓       |
| `arrayGroupBy`    | ✓       | ✓       |
| `arrayMap`        | ✓       | ✓       |
| `arrayRemove`     | ✓       | ✓       |
| `arraySort`       | ✓       | ✓       |
| `arrayToggle`     | ✓       | ✓       |
| `stringIsEmail`   | ✓       | ✓       |
| `stringIsUrl`     | ✓       | ✓       |
| `stringSlugify`   | ✓       | ✓       |
| `blobToFile`      | ✓       | ✗ ¹     |
| Regex constants   | ✓       | ✓       |

> ¹ `blobToFile` relies on the [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) Web API, which is not available in Node.js.

---

## Table of Contents

- [Array Utilities](#array-utilities)
  - [arrayChunk](#arraychunkitems-size)
  - [arrayGroupBy](#arraygroupbyitems-key)
  - [arrayMap](#arraymapitems-key)
  - [arrayRemove](#arrayremoveitems-index)
  - [arraySort](#arraysortitems-criteria)
  - [arrayToggle](#arraytoggleitems-item-compare)
- [String Utilities](#string-utilities)
  - [stringIsEmail](#stringisemailvalue)
  - [stringIsUrl](#stringisurlvalue)
  - [stringSlugify](#stringslugifyvalue)
- [File Utilities](#file-utilities)
  - [blobToFile](#blobtofileblob-name-options)
- [Regex Constants](#regex-constants)

---

## API Reference

### Array Utilities

#### `arrayChunk(items, size)`

Splits an array into chunks of the specified size. The last chunk may be smaller than `size`.

```typescript
arrayChunk([1, 2, 3, 4, 5], 2);
// → [[1, 2], [3, 4], [5]]
```

Throws if `size` is less than 1.

---

#### `arrayGroupBy(items, key)`

Groups array items by a field, returning a record that maps each key to all matching items.

```typescript
const users = [
    { role: 'admin', name: 'Alice' },
    { role: 'user',  name: 'Bob' },
    { role: 'admin', name: 'Carol' },
];

arrayGroupBy(users, 'role');
// → { admin: [{ role: 'admin', name: 'Alice' }, { role: 'admin', name: 'Carol' }], user: [...] }
```

---

#### `arrayMap(items, key)`

Converts an array into a keyed record. When multiple items share the same key, the last one wins.

```typescript
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

arrayMap(users, 'id');
// → { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' } }
```

---

#### `arrayRemove(items, index)`

Returns a new array with the element at the given index removed. Supports negative indices (`-1` removes the last element).

```typescript
arrayRemove(['a', 'b', 'c'], 1);  // → ['a', 'c']
arrayRemove(['a', 'b', 'c'], -1); // → ['a', 'b']
```

Throws if the index is out of bounds. Never mutates the original array.

---

#### `arraySort(items, criteria)`

Sorts an array by one or more criteria. Supports `string`, `number`, `boolean`, and `Date` values. Multiple criteria act as tiebreakers applied in order.

```typescript
import type { SortCriteria } from '@stanvanheumen/web-utils';

arraySort(users, { key: 'name' });
arraySort(users, [{ key: 'role' }, { key: 'name', direction: 'desc' }]);
```

`SortCriteria<T>` shape:

| Field       | Type                     | Default |
|-------------|--------------------------|---------|
| `key`       | `keyof T`                | -       |
| `direction` | `'asc'` or `'desc'`      | `'asc'` |

---

#### `arrayToggle(items, item, compare?)`

Adds an item if it is absent, or removes it if it is already present. Accepts an optional custom comparator.

```typescript
arrayToggle([1, 2, 3], 2); // → [1, 3]
arrayToggle([1, 3],    2); // → [1, 3, 2]

// Custom comparator
arrayToggle(users, { id: 1, name: 'Alice' }, (a, b) => a.id === b.id);
```

---

### String Utilities

#### `stringIsEmail(value)`

Returns `true` if `value` is a valid email address. Supports quoted local parts and IP address domains.

```typescript
stringIsEmail('user@example.com'); // → true
stringIsEmail('not-an-email');     // → false
```

---

#### `stringIsUrl(value)`

Returns `true` if `value` is a valid URL. Accepts `http`, `https`, `ftp`, and protocol-relative (`//`) URLs. Rejects private and reserved IP ranges.

```typescript
stringIsUrl('https://example.com/path?q=1'); // → true
stringIsUrl('http://192.168.1.1');           // → false (private IP)
stringIsUrl('example.com');                  // → false (no protocol)
```

---

#### `stringSlugify(value)`

Converts a string into a URL-friendly slug. Normalises accented characters, lowercases, and replaces separators with hyphens. Passes `null` and `undefined` through unchanged.

```typescript
stringSlugify('Hello, World!'); // → 'hello-world'
stringSlugify('Ångström Units'); // → 'angstrom-units'
stringSlugify(null);            // → null
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
