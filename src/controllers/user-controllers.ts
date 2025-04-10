import type { Request, Response } from 'express'
import { getUsersService } from '../services/user-services'

export async function getUsersController(req: Request, res: Response) {
	try {
		const users = await getUsersService()

		res.json({ users })
	} catch (e) {
		res.status(500).json({ message: 'Internal server error' })
	}
}
