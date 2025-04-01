import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { createSchema } from '../schemas/task-schemas'
import { createTaskService } from '../services/tasks-services'

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
