const express = require('express');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for creating a new task and to get all tasks
router.get('/tasks',authenticate, getTasks);
router.post('/tasks',authenticate, createTask);
router.get('/tasks/:taskId',authenticate, getTaskById);
router.put('/tasks/:taskId', authenticate, updateTask);
router.delete('/tasks/:taskId',authenticate, deleteTask);

module.exports = router;
