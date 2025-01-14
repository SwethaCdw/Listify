class Task {
    constructor(taskId, title, description, priority, dueDate, comments) {
        this.id = taskId; // Unique task ID
        this.title = title; // Task title
        this.description = description;  // Task description
        this.priority = priority; // Task priority
        this.dueDate = dueDate; // Task due date
        this.comments = comments; // Task comments
        this.createdAt = new Date().toISOString(); // Creation timestamp
        this.updatedAt = new Date().toISOString(); // Last update timestamp
    }
}

module.exports = Task;
