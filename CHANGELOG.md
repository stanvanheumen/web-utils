# Changelog

## [1.0.0] - 2026-04-06

Initial release.

**Array Utilities**
- `arrayChunk` - split an array into fixed-size chunks
- `arrayGroupBy` - group array items by a field into a keyed record
- `arrayMap` - convert an array into a keyed record
- `arrayRemove` - return a new array with an element removed by index
- `arraySort` - sort an array by one or more typed criteria
- `arrayToggle` - add or remove an item based on presence

**String Utilities**
- `stringIsEmail` - validate an email address
- `stringIsUrl` - validate a URL, rejecting private IP ranges
- `stringSlugify` - convert a string to a URL-friendly slug

**File Utilities**
- `blobToFile` - convert a `Blob` to a `File` with a name and optional metadata

**Regex Constants**
- `REGEX_EMAIL`, `REGEX_URL`, `REGEX_INTEGER` - pre-compiled regex patterns for direct use
