const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { ERROR_MESSAGES } = require('../constants/app-constants');
const logger = require('../utils/logger');

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: ERROR_MESSAGES.AUTH_REQUIRED });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; 
        logger.info(`User authenticated: ${decoded.username}`);
        next(); 
    } catch (error) {
        if (error.name === JWT_SECRET) {
            logger.error('Invalid or expired token');
            return res.status(401).json({ error: ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN });
        }
        logger.error(`Error authenticating user: ${error.message}`);
        res.status(500).json({ error: ERROR_MESSAGES.UNEXPECTED_ERROR });
    }
};

module.exports = authenticate;
