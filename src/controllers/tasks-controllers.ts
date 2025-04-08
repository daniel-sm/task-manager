import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import type { AuthenticatedRequest } from '../middlewares/auth'
import { createSchema, updateSchema } from '../schemas/task-schemas'
import {
	createTaskService,
	getAllTasksService,
	updateTaskService,
} from '../services/tasks-services'

export async function createTaskController(req: Request, res: Response) {
	try {
		const { body } = createSchema.parse({ body: req.body })
		const { title, description, dueDate, userId } = body

		const task = await createTaskService({
			title,
			description,
			dueDate,
			userId,
		})

		res.status(201).json({ task })
	} catch (e) {
		if (e instanceof ZodError) {
			res.status(400).json({ error: e.errors })
			return
		}
		res.status(500).json({ message: 'Internal server error' })
	}
}

export async function getAllTasksController(req: Request, res: Response) {
	const { id } = (req as AuthenticatedRequest).user

	try {
		const tasks = await getAllTasksService(id)

		res.json({ tasks })
	} catch (e) {
		res.status(500).json({ message: 'Internal server error' })
	}
}

export async function updateTaskController(req: Request, res: Response) {
	try {
		const { params, body } = updateSchema.parse({
			params: req.params,
			body: req.body,
		})
		const { taskId } = params
		const { title, description, dueDate } = body

		const updatedTask = await updateTaskService({
			id: taskId,
			title,
			description,
			dueDate,
		})

		res.json({ task: updatedTask })
	} catch (e) {
		if (e instanceof ZodError) {
			res.status(400).json({ error: e.errors })
			return
		}
		res.status(500).json({ message: 'Internal server error' })
	}
}
