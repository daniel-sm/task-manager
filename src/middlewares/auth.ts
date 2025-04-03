import type { NextFunction, Request, Response } from 'express'
import { type JwtPayload, verify } from 'jsonwebtoken'
import { env } from '../config/env'

interface AuthenticatedRequest extends Request {
	token: string | JwtPayload
}

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const token = req.headers.authorization
		if (!token) {
			res.status(401).json({ message: 'Unauthorized' })
			return
		}

		const decoded = verify(token, env.SECRET_KEY)
		;(req as AuthenticatedRequest).token = decoded

		next()
	} catch (e) {
		res.status(401).json({ message: 'Unauthorized' })
	}
}
