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
tasksRouter.get('/read', getAllTasksController)
tasksRouter.put('/update/:taskId', updateTaskController)
tasksRouter.delete('/delete/:taskId', deleteTaskController)

export { tasksRouter }
