const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { TASKS, BEARER, USER_AUTHENTICATED, ERROR_AUTHENTICATING, INVALID_TOKEN } = require('../constants/app-constants');
const logger = require('../utils/logger');

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith(BEARER)) {
            return res.status(401).json({ error: TASKS.ERROR_MESSAGES.AUTH_REQUIRED });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; 
        logger.info(`${USER_AUTHENTICATED} ${decoded.username}`);
        next(); 
    } catch (error) {
        if (error.name === JWT_SECRET) {
            logger.error(INVALID_TOKEN);
            return res.status(401).json({ error: TASKS.ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN });
        }
        logger.error(`${ERROR_AUTHENTICATING} ${error.message}`);
        res.status(500).json({ error: TASKS.ERROR_MESSAGES.UNEXPECTED_ERROR });
    }
};

module.exports = authenticate;
