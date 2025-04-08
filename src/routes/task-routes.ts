import { Router } from 'express'
import {
	createTaskController,
	getAllTasksController,
	updateTaskController,
} from '../controllers/tasks-controllers'
import { authMiddleware } from '../middlewares/auth'

const tasksRouter = Router()

tasksRouter.post('/create', createTaskController)
tasksRouter.get('/read', authMiddleware, getAllTasksController)
tasksRouter.put('/update/:taskId', authMiddleware, updateTaskController)

export { tasksRouter }
