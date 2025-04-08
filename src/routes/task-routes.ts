import { Router } from 'express'
import {
	createTaskController,
	deleteTaskController,
	getAllTasksController,
	updateTaskController,
} from '../controllers/tasks-controllers'
import { authMiddleware } from '../middlewares/auth'

const tasksRouter = Router()

tasksRouter.post('/create', createTaskController)
tasksRouter.get('/read', authMiddleware, getAllTasksController)
tasksRouter.put('/update/:taskId', authMiddleware, updateTaskController)
tasksRouter.delete('/delete/:taskId', authMiddleware, deleteTaskController)

export { tasksRouter }
