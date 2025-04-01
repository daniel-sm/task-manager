import { Router } from 'express'
import { createTaskController } from '../controllers/tasks-controllers'

const tasksRouter = Router()

tasksRouter.post('/create', createTaskController)

export { tasksRouter }
