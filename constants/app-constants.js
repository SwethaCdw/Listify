module.exports = {
    ERROR_MESSAGES: {
        AUTH_REQUIRED: 'Authentication required.',
        INVALID_SORT_CRITERIA: 'Invalid sort criteria.',
        TASK_ID_REQUIRED: 'Task ID is required.',
        TASK_NOT_FOUND: 'Task not found.',
        TASK_CREATION_FAILED: 'An error occurred while creating the task.',
        TASK_UPDATE_FAILED: 'An error occurred while updating the task.',
        TASK_DELETION_FAILED: 'An error occurred while deleting the task.',
        INVALID_OR_EXPIRED_TOKEN: 'Invalid or expired token.',
        TASK_FILTER_NOT_FOUND: 'No tasks found matching the filter criteria.',
        REQUIRED_FIELDS_MISSING: 'All fields are required.',
        UNEXPECTED_ERROR: 'An unexpected error occurred.',
    },
    JWT_ERROR: 'JsonWebTokenError',

    SUCCESS_MESSAGES: {
        TASK_CREATED: 'Task created successfully.',
        TASK_UPDATED: 'Task updated successfully.',
        TASK_DELETED: 'Task deleted successfully.',
        TASK_FETCHED: 'Task fetched successfully.',
        TASKS_FETCHED: 'Tasks fetched successfully.',
    },

    PRIORITY_LEVELS: ['Low', 'Medium', 'High'],
    
};