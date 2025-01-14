const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername, saveUser } = require('../models/userModel');
const { AUTHENTICATION } = require('../constants/app-constants');
const logger = require('../utils/logger');

const signup = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: AUTHENTICATION.ERROR_MESSAGES.USERNAME_PASSWORD_REQUIRED });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ error: AUTHENTICATION.ERROR_MESSAGES.USERNAME_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };

    await saveUser(newUser);
    res.status(201).json({ message: AUTHENTICATION.SUCCESS_MESSAGES.USER_REGISTERED_SUCCESSFULLY });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    if (!user) {
        return res.status(401).json({ error: AUTHENTICATION.ERROR_MESSAGES.INVALID_USERNAME_PASSWORD });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        logger.error(AUTHENTICATION.ERROR_MESSAGES.INVALID_USERNAME_PASSWORD);
        return res.status(401).json({ error: AUTHENTICATION.ERROR_MESSAGES.INVALID_USERNAME_PASSWORD });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    logger.info(`${username} ${AUTHENTICATION.SUCCESS_MESSAGES.LOGIN_SUCCESSFUL}`);
    res.status(200).json({ token, message: AUTHENTICATION.SUCCESS_MESSAGES.LOGIN_SUCCESSFUL });
};

module.exports = { signup, login };
