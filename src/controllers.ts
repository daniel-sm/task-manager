import { hash, verify } from 'argon2'
import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { prisma } from './database/client'
import { generateToken } from './functions/generate-token'
import { loginSchema, registerSchema } from './schemas'

export async function registerController(req: Request, res: Response) {
	try {
		const { body } = registerSchema.parse({ body: req.body })
		const { name, email, password } = body

		const userAlreadyExists = await prisma.user.findFirst({
			where: { email },
		})

		if (userAlreadyExists) {
			res.status(400).json({ message: 'User already exists' })
			return
		}

		const hashedPassword = await hash(password)

		const { id } = await prisma.user.create({
			data: { name, email, password: hashedPassword },
		})

		res.json({ id })
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

		const user = await prisma.user.findFirst({
			where: { email },
		})

		if (!user) {
			res.status(400).json({ message: 'User not found' })
			return
		}

		const isPasswordCorrect = await verify(user.password, password)

		if (!isPasswordCorrect) {
			res.json({ message: 'Wrong password' })
			return
		}

		const token = generateToken(user)

		res.json({ token })
	} catch (e) {
		if (e instanceof ZodError) {
			res.status(400).json({ error: e.errors })
			return
		}
		res.status(500).json({ message: 'Internal server error' })
	}
}
