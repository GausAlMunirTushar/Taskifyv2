const express = require('express');
const { 
    createTask,
    deleteTaskById,
    updateTaskStatus,
    getTaskByStatus,
    getTaskStatusCount,
} = require('../controllers/taskController');

const authVerify = require('../middlewares/authVerify');

const taskRoutes = express.Router();

// create a task
taskRoutes.post('/tasks', authVerify, createTask)

// update task by status
taskRoutes.get('/tasks/:status', authVerify, getTaskByStatus)

// update task by status
taskRoutes.get('/tasks/status-count', authVerify, getTaskStatusCount)

// update task status
taskRoutes.put('/tasks/:id/:status', authVerify, updateTaskStatus)

// delete a task by Id
taskRoutes.delete('/tasks/:id', authVerify, deleteTaskById)


module.exports = taskRoutes;