// Test how version overrides affect Fastify's BaseLogger compatibility
import { FastifyBaseLogger } from 'fastify';

// Test if pino logger is compatible with Fastify's BaseLogger
declare const logger: any;
const fastifyLogger: FastifyBaseLogger = logger;

// These should work but may fail with version mismatches
fastifyLogger.error('test error');
fastifyLogger.info('test info');
const child = fastifyLogger.child({ component: 'test' });