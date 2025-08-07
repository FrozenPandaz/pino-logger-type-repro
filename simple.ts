import * as pino from 'pino';

// This should work but fails in pino >= 9.7.0
const logger = pino();
const baseLogger: pino.BaseLogger = logger;

// Error: Property 'child' does not exist on type 'BaseLogger'
const child = baseLogger.child({ test: true });