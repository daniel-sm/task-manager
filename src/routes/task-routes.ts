import { Router } from 'express'
import {
	createTaskController,
	getAllTasksController,
} from '../controllers/tasks-controllers'
import { authMiddleware } from '../middlewares/auth'

const tasksRouter = Router()

tasksRouter.post('/create', createTaskController)
tasksRouter.get('/get-all', authMiddleware, getAllTasksController)

export { tasksRouter }
