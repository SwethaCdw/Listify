module.exports = {
    AUTHENTICATION:{
        ERROR_MESSAGES: {
            USERNAME_PASSWORD_REQUIRED: 'Username and password are required',
            USERNAME_ALREADY_EXISTS: 'Username already exists',
            INVALID_USERNAME_PASSWORD: 'Invalid username or password'

        },
        SUCCESS_MESSAGES: {
            USER_REGISTERED_SUCCESSFULLY: 'User registered successfully',
            LOGIN_SUCCESSFUL: 'Logged in successfully'
        }
    },
    TASKS: {
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
            NO_TASK: 'No tasks for this user'
        },
        JWT_ERROR: 'JsonWebTokenError',
        SORT_ASC: 'asc',
        SORT_DESC: 'desc',
        SUCCESS_MESSAGES: {
            TASK_CREATED: 'Task created successfully.',
            TASK_UPDATED: 'Task updated successfully.',
            TASK_DELETED: 'Task deleted successfully.',
            TASK_FETCHED: 'Task fetched successfully.',
            TASKS_FETCHED: 'Tasks fetched successfully.',
        },
        PRIORITY_LEVELS: ['Low', 'Medium', 'High'],
    },
    SERVER_RUNNING_ON: 'Server is running on http://localhost:',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    INVALID_TOKEN: 'Invalid or expired token',
    USER_AUTHENTICATED: 'User authenticated: ',
    ERROR_AUTHENTICATING: 'Error authenticating user: ',
    BEARER: 'Bearer '
    
};