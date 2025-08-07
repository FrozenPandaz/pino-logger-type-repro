# Pino Logger Type Breaking Change Reproduction

This repository demonstrates a breaking change in pino logger types that affects libraries expecting `BaseLogger` compatibility.

## Issue Description

Recent versions of pino have introduced changes to the logger type definitions that break compatibility with interfaces that extend `pino.BaseLogger`, particularly affecting the `child()` method return type.

## Reproduction Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Test with older pino version (works):
   ```bash
   npm run test-old
   ```

3. Test with newer pino version (fails):
   ```bash
   npm run test-new
   ```

## Expected Behavior

The `child()` method on `pino.BaseLogger` should return a type that's compatible with `BaseLogger` interface, allowing libraries to extend it properly.

## Actual Behavior

The `child()` method return type has changed in a way that breaks type compatibility for interfaces that extend `BaseLogger`.

## Environment

- TypeScript: ^5.0.0
- Node.js: 18+
- Pino versions tested:
  - Working: 9.6.0
  - Broken: 9.7.0, 9.8.0

## Impact

This affects any library that:
1. Extends `pino.BaseLogger` 
2. Overrides the `child()` method to return their own logger type
3. Expects type compatibility between parent and child loggers

Notable affected projects:
- Fastify (FastifyBaseLogger interface)
- Other frameworks using pino with custom logger interfaces