import pino from 'pino';

// This reproduces the breaking change in pino logger types
// that affects FastifyBaseLogger compatibility

// Create a pino logger instance
const logger = pino();

// This interface mimics what FastifyBaseLogger expects
interface CustomBaseLogger extends pino.BaseLogger {
  child(bindings: pino.Bindings, options?: pino.ChildLoggerOptions): CustomBaseLogger;
}

// Test function that expects a BaseLogger
function useLogger(log: pino.BaseLogger) {
  log.info('Test message');
  
  // This should work but might fail with recent pino versions
  const childLogger = log.child({ component: 'test' });
  childLogger.info('Child logger message');
  
  return childLogger;
}

// Test function that expects our custom interface
function useCustomLogger(log: CustomBaseLogger) {
  log.info('Custom logger message');
  
  // This should return CustomBaseLogger type
  const childLogger = log.child({ component: 'custom' });
  childLogger.info('Custom child logger message');
  
  return childLogger;
}

// Test cases
console.log('Testing pino logger compatibility...');

// Test 1: Basic pino logger
useLogger(logger);

// Test 2: Try to cast pino logger to custom interface
// This might fail with type errors in newer pino versions
try {
  const customLogger = logger as CustomBaseLogger;
  useCustomLogger(customLogger);
} catch (error) {
  console.error('Error with custom logger:', error);
}

// Test 3: Check child logger return type compatibility
const child = logger.child({ service: 'test' });
useLogger(child);

console.log('Tests completed');