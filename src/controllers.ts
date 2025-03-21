import { hash, verify } from 'argon2'
import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { type User, users } from './database/users'
import { loginSchema, registerSchema } from './schemas'

export async function registerController(req: Request, res: Response) {
	try {
		const { body } = registerSchema.parse({ body: req.body })
		const { email, password } = body

		const userAlreadyExists = users.some(user => user.email === email)
		if (userAlreadyExists) {
			res.status(400).json({ message: 'User already exists' })
			return
		}

		const hashedPassword = await hash(password)

		const user: User = { email, password: hashedPassword }
		users.push(user)

		res.json({
			message: 'User created',
		})
	} catch (e) {
		if (e instanceof ZodError) {
			res.status(400).json({ error: e.errors })
			return
		}
		res.status(500).json({ message: 'Internal server error' })
	}
}

export async function loginController(req: Request, res: Response) {
	try {
		const { body } = loginSchema.parse({ body: req.body })
		const { email, password } = body

		const user = users.find(user => user.email === email)

		if (!user) {
			res.status(400).json({ message: 'User not found' })
			return
		}

		const isPasswordCorrect = await verify(user.password, password)

		if (!isPasswordCorrect) {
			res.json({ message: 'Wrong password' })
			return
		}

		res.json({ message: 'Logged in' })
	} catch (e) {
		if (e instanceof ZodError) {
			res.status(400).json({ error: e.errors })
			return
		}
		res.status(500).json({ message: 'Internal server error' })
	}
}
