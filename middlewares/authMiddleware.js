const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { ERROR_MESSAGES } = require('../constants/app-constants');

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: ERROR_MESSAGES.AUTH_REQUIRED });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; 
        next(); 
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN });
        }
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: error });
    }
};

module.exports = authenticate;
