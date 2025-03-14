import type { Request, Response } from 'express'
import { type User, users } from './database/users'

export function registerController(req: Request, res: Response) {
	console.log(users)
	console.log(req.body)

	const { email, password } = req.body

	const userAlreadyExists = users.some(user => user.email === email)

	if (userAlreadyExists) {
		res.status(400).json({
			message: 'User already exists',
		})
	} else {
		const user: User = {
			email,
			password,
		}

		users.push(user)
		res.json(user)
	}
}
