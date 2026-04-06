# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build        # Bundle with tsup (ESM + CJS + .d.ts + sourcemaps)
npm run typecheck    # Type-check without emitting files
```

There is no test runner or linter configured.

Publishing runs `typecheck` + `build` automatically via `prepublishOnly`.

## Architecture

`@stanvanheumen/web-utils` is a zero-dependency, tree-shakeable TypeScript utility library targeting web development. It exports from a single barrel (`src/index.ts`) and is built into dual ESM/CJS formats via tsup.

**Module categories:**
- `src/array/` - non-mutating array helpers (chunkAray, groupByArray, mapArray, removeFromArray, sortArray, toggleArray)
- `src/number/` - number helpers (clamp)
- `src/string/` - validation and transformation (isEmail, isUrl, slugify)
- `src/date/` - date parsing (dateParse)
- `src/regex/` - pre-compiled regex constants (email, url, integer)
- `src/file/` - browser-only helpers (blobToFile)

Each utility lives in its own file. Functions are pure and non-mutating.

**TypeScript config** enforces `strict`, `exactOptionalPropertyTypes`, and `noUncheckedIndexedAccess` - be precise with optional properties and array access. `verbatimModuleSyntax` is on, so use `import type` for type-only imports.

**Adding a new utility:**
1. Create `src/<category>/<kebab-name>.ts`
2. Export it from `src/index.ts`
3. Document browser vs. Node.js compatibility if relevant (see README environment matrix)
