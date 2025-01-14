const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/fileOperations');

const USERS_FILE = path.join(__dirname, '../data/users.json');

const findUserByUsername = async (username) => {
    const users = await readJsonFile(USERS_FILE);
    return users.find(user => user.username === username);
};

const saveUser = async (user) => {
    const users = await readJsonFile(USERS_FILE);
    users.push(user);
    await writeJsonFile(USERS_FILE, users);
};

module.exports = { findUserByUsername, saveUser };
