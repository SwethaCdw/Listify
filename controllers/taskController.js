const path = require('path');
const { readJsonFile, writeJsonFile } = require('../utils/fileOperations');
const { TASKS } = require('../constants/app-constants');
const { sortTasks, filterTasks, paginateTasks, findTaskById } = require('../utils/taskUtils');
const logger = require('../utils/logger');

const TASKS_FILE = path.join(__dirname, '../data/tasks.json');

// Create a new task
const createTask = async (req, res) => {
    try {
        const username = req.user.username;
        const { title, description, priority, dueDate, comments } = req.body;

        if (!title || !description || !priority || !dueDate) {
            return res.status(400).json({ error: TASKS.ERROR_MESSAGES.REQUIRED_FIELDS_MISSING });
        }

        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            priority,
            dueDate,
            comments,
            createdAt: new Date().toISOString(),
        };

        const tasks = await readJsonFile(TASKS_FILE);
        tasks[username] = tasks[username] || [];
        tasks[username].push(newTask);

        await writeJsonFile(TASKS_FILE, tasks);

        res.status(201).json({ message: TASKS.SUCCESS_MESSAGES.TASK_CREATED, task: newTask });
    } catch (error) {
        logger.error(`Error creating task: ${error.message}`);
        res.status(500).json({ error: TASKS.ERROR_MESSAGES.TASK_CREATION_FAILED });
    }
};

// Get all tasks (or) filter tasks based on query
const getTasks = async (req, res) => {
    try {
        const { title, priority, dueDate, sortBy, sortOrder = TASKS.SORT_ASC, page = 1, limit = 10 } = req.query;
        const username = req.user.username;

        const tasks = await readJsonFile(TASKS_FILE);
        let userTasks = tasks[username];

        if (!userTasks) {
            return res.status(404).json({ error: TASKS.ERROR_MESSAGES.NO_TASK });
        }

        // Apply filters
        userTasks = filterTasks(userTasks, { title, priority, dueDate });

        // Sorting logic
        if (sortBy) {
            const sortFunctions = {
                title: (a, b) => a.title.localeCompare(b.title),
                priority: (a, b) => TASKS.PRIORITY_LEVELS.indexOf(a.priority) - TASKS.PRIORITY_LEVELS.indexOf(b.priority),
                dueDate: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
            };
            userTasks = sortTasks(userTasks, sortBy, sortOrder, sortFunctions);
        }

        // Pagination
        const { paginatedTasks, totalTasks, totalPages } = paginateTasks(userTasks, page, limit);

        if (!paginatedTasks.length) {
            return res.status(404).json({ error: TASKS.ERROR_MESSAGES.TASK_FILTER_NOT_FOUND });
        }

        res.status(200).json({
            tasks: paginatedTasks,
            pagination: { totalTasks, totalPages, currentPage: page, limit },
        });
    } catch (error) {
        logger.error(`Error getting task: ${error.message}`);
        res.status(500).json({ error: TASKS.ERROR_MESSAGES.UNEXPECTED_ERROR });
    }
};

// Get task by ID
const getTaskById = async (req, res) => {
    try {
        const username = req.user.username;
        const { taskId } = req.params;

        if (!taskId) return res.status(400).json({ error: TASKS.ERROR_MESSAGES.TASK_ID_REQUIRED });

        const { userTasks, taskIndex } = await findTaskById(username, taskId, TASKS_FILE);

        res.status(200).json({ task: userTasks[taskIndex] });
    } catch (error) {
        if (error.message === TASKS.ERROR_MESSAGES.TASK_NOT_FOUND) {
            return res.status(404).json({ error: error.message });
        }
        logger.error(`Error fetching task: ${error.message}`);
        res.status(500).json({ error: TASKS.ERROR_MESSAGES.UNEXPECTED_ERROR });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const username = req.user.username;
        const { taskId } = req.params;
        const { title, description, priority, dueDate, comments } = req.body;

        if (!title || !description || !priority || !dueDate) {
            return res.status(400).json({ error: TASKS.ERROR_MESSAGES.REQUIRED_FIELDS_MISSING });
        }

        const { tasks, userTasks, taskIndex } = await findTaskById(username, taskId, TASKS_FILE);

        const updatedTask = {
            ...userTasks[taskIndex],
            title,
            description,
            priority,
            dueDate,
            comments,
            updatedAt: new Date().toISOString(),
        };
        userTasks[taskIndex] = updatedTask;
        await writeJsonFile(TASKS_FILE, tasks);

        res.status(200).json({ message: TASKS.SUCCESS_MESSAGES.TASK_UPDATED, task: updatedTask });
    } catch (error) {
        logger.error(`Error updating task: ${error.message}`);
        res.status(500).json({ error: TASKS.ERROR_MESSAGES.TASK_UPDATE_FAILED });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const username = req.user.username;
        const { taskId } = req.params;

        const { tasks, userTasks, taskIndex } = await findTaskById(username, taskId, TASKS_FILE);

        userTasks.splice(taskIndex, 1);
        await writeJsonFile(TASKS_FILE, tasks);

        res.status(200).json({ message: TASKS.SUCCESS_MESSAGES.TASK_DELETED });
    } catch (error) {
        logger.error(`Error deleting task: ${error.message}`);
        res.status(500).json({ error: TASKS.ERROR_MESSAGES.TASK_DELETION_FAILED });
    }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
