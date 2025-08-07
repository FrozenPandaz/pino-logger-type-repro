import * as pino from 'pino';

// This demonstrates the breaking change in pino BaseLogger types

// Before: This worked in pino <= 9.6.0
// After: This breaks in pino >= 9.7.0

interface ExtendedLogger extends pino.BaseLogger {
  child(bindings: pino.Bindings, options?: pino.ChildLoggerOptions): ExtendedLogger;
}

// Test the type compatibility
const logger = pino();

// This should work - logger should be assignable to BaseLogger
const baseLogger: pino.BaseLogger = logger;

// This is where the breaking change occurs:
// The child method is not available on BaseLogger type in newer versions
const childLogger = baseLogger.child({ component: 'test' });

console.log('Type test completed');