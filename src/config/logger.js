import { createLogger, format as _format, transports as _transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: _format.combine(
        _format.colorize(),
        _format.simple()
    ),
    transports: [
        new _transports.Console(),
        new _transports.File({ filename: 'combined.log' })
    ],
});

// Create named exports
export const info = logger.info.bind(logger);
export const error = logger.error.bind(logger);
export default logger;
