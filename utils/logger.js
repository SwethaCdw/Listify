const { createLogger, format, transports } = require('winston');
const path = require('path');

// Define the logging levels and colors
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const logger = createLogger({
    levels,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error',
        }), 
        new transports.File({
            filename: path.join(__dirname, '../logs/combined.log'),
        }),
    ],
});

module.exports = logger;
