const { TASKS } = require('../constants/app-constants');
const { readJsonFile } = require('../utils/fileOperations');
/**
 * Filters a list of tasks based on the provided criteria
 * @param {*} tasks  The list of tasks to filter
 * @param {*} { title, priority, dueDate } -  An object containing filter criteria
 * @returns A filtered array of tasks matching the given criteria
 */
const filterTasks = (tasks, { title, priority, dueDate }) => {
    if (title) tasks = tasks.filter(task => task.title.toLowerCase().includes(title.toLowerCase()));
    if (priority) tasks = tasks.filter(task => task.priority.toLowerCase() === priority.toLowerCase());
    if (dueDate) tasks = tasks.filter(task => task.dueDate === dueDate);
    return tasks;
};

/**
 * Sorts a list of tasks based on the specified criteria and order
 * @param {*} tasks The list of tasks to sort
 * @param {*} sortBy The field to sort the tasks
 * @param {*} sortOrder The sort order, either "asc" or "desc"
 * @param {*} sortFunctions sort functionalities
 * @returns A sorted array of tasks based on the given criteria
 */
const sortTasks = (tasks, sortBy, sortOrder, sortFunctions) => {
    if (!sortFunctions[sortBy]) {
        throw new Error('Invalid sort criteria');
    }
    return tasks.sort((task1, task2) => {
        const result = sortFunctions[sortBy](task1, task2);
        return sortOrder.toLowerCase() === TASKS.SORT_DESC ? -result : result;
    });
};

/**
 * Paginates a list of tasks based on the current page and limit per page
 * @param {*} tasks The list of tasks to paginate
 * @param {*} page The current page number
 * @param {*} limit The maximum number of tasks per page
 * @returns pagination details
 */
const paginateTasks = (tasks, page, limit) => {
    const totalTasks = tasks.length;
    const totalPages = Math.ceil(totalTasks / limit);
    const paginatedTasks = tasks.slice((page - 1) * limit, page * limit);
    return { paginatedTasks, totalTasks, totalPages };
};

/**
 * Finds a task by ID for a given user.
 *
 * @param {string} username - The username of the user whose tasks are being searched
 * @param {string} taskId - The ID of the task 
 * @param {string} filePath - The path to the tasks
 *
 * @returns - An object containing the user's task details
 */
const findTaskById = async (username, taskId, filePath) => {
    const tasks = await readJsonFile(filePath);
    const userTasks = tasks[username];

    if (!userTasks) {
        throw new Error(TASKS.ERROR_MESSAGES.TASK_NOT_FOUND);
    }

    const taskIndex = userTasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        throw new Error(TASKS.ERROR_MESSAGES.TASK_NOT_FOUND);
    }

    return { tasks, userTasks, taskIndex };
};


module.exports = { filterTasks, sortTasks, paginateTasks, findTaskById}