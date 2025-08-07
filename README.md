# Pino BaseLogger.child() Method Missing

Minimal reproduction showing `child()` method is missing from `pino.BaseLogger` type definition.

## Issue

In pino >= 9.7.0, the `child()` method is no longer available on the `BaseLogger` type, causing TypeScript errors.

## Reproduction

```bash
npm install
npm run reproduce
```

**Error:**
```
simple.ts(7,32): error TS2339: Property 'child' does not exist on type 'BaseLogger'.
```

## Impact

This breaks libraries that extend `BaseLogger` and expect the `child()` method to be available, such as Fastify's `FastifyBaseLogger`.