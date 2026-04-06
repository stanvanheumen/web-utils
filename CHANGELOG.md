# Changelog

## [1.0.1] - 2026-04-06

**Number Utilities**
- `clamp` - clamp a number between a minimum and maximum value
- `round` - round a number to a given number of decimal places

**Date Utilities**
- `parseDate` - parse a string, number, or Date into a valid `Date`, returning `null` on failure; supports ISO 8601 datetime (with optional fractional seconds and timezone offset), ISO date (local midnight), and Unix millisecond timestamps
- `startOfDay` - return a new `Date` set to midnight (`00:00:00.000`) in local time
- `endOfDay` - return a new `Date` set to `23:59:59.999` in local time
- `startOfMonth` - return a new `Date` set to the first day of the month at midnight in local time
- `endOfMonth` - return a new `Date` set to the last day of the month at `23:59:59.999` in local time
- `startOfYear` - return a new `Date` set to January 1st at midnight in local time
- `endOfYear` - return a new `Date` set to December 31st at `23:59:59.999` in local time

## [1.0.0] - 2026-04-06

Initial release.

**Array Utilities**
- `chunkArray` - split an array into fixed-size chunks
- `groupByArray` - group array items by a field into a keyed record
- `mapArray` - convert an array into a keyed record
- `removeFromArray` - return a new array with an element removed by index
- `sortArray` - sort an array by one or more typed criteria
- `toggleArray` - add or remove an item based on presence

**String Utilities**
- `isEmail` - validate an email address
- `isUrl` - validate a URL, rejecting private IP ranges
- `slugify` - convert a string to a URL-friendly slug

**File Utilities**
- `blobToFile` - convert a `Blob` to a `File` with a name and optional metadata

**Regex Constants**
- `REGEX_EMAIL`, `REGEX_URL`, `REGEX_INTEGER` - pre-compiled regex patterns for direct use
