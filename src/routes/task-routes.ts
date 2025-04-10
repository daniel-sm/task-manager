import { Router } from 'express'
import {
	createTaskController,
	deleteTaskController,
	getTasksController,
	updateTaskController,
} from '../controllers/tasks-controllers'

const tasksRouter = Router()

tasksRouter.post('/create', createTaskController)
tasksRouter.get('/read', getTasksController)
tasksRouter.put('/update/:taskId', updateTaskController)
tasksRouter.delete('/delete/:taskId', deleteTaskController)

export { tasksRouter }
