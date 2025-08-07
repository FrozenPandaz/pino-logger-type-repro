# Pino BaseLogger Breaking Change Reproduction

Demonstrates breaking change in pino v9.8.0 where logging methods were removed from `BaseLogger` interface.

## Issue

In pino v9.8.0, the logging methods (`error`, `info`, `warn`, etc.) were removed from the `BaseLogger` type definition, breaking libraries that extend `BaseLogger`.

## Reproduction

```bash
npm install
npm run reproduce
```

## Results

**✅ With pino@9.7.0:** Works correctly
**❌ With pino@9.8.0:** TypeScript errors:
```
Property 'error' does not exist on type 'FastifyBaseLogger'.
Property 'info' does not exist on type 'FastifyBaseLogger'.
```

## Impact

This breaks **Fastify's FastifyBaseLogger** which extends `pino.BaseLogger`:

```typescript
export interface FastifyBaseLogger extends pino.BaseLogger {
  child(bindings: Bindings, options?: ChildLoggerOptions): FastifyBaseLogger;
}
```

When using version overrides (common in monorepos), projects upgrading to pino 9.8.0 get TypeScript errors because expected logging methods are missing from the BaseLogger interface.

## Test Different Versions

Change the pino version in `package.json` and `overrides` section, then run:
```bash
npm install && npm run reproduce
```