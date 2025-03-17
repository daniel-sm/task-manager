import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { registerSchema } from './schemas'
import { type User, users } from './database/users'

export function registerController(req: Request, res: Response) {
	try {
		const { body } = registerSchema.parse(req.body)
		const { email, password } = body

		const userAlreadyExists = users.some(user => user.email === email)
		if (!userAlreadyExists) {
			res.status(400).json({ message: 'User already exists' })
			return
		}

		const user: User = { email, password }
		users.push(user)
		res.json(user)
	} catch (e) {
		if (e instanceof ZodError) {
			res.status(400).json({ error: e.errors })
		}
	}
}
