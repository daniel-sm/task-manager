import type { NextFunction, Request, Response } from 'express'
import { type JwtPayload, verify } from 'jsonwebtoken'
import { env } from '../config/env'

interface DecodedToken {
	id: string
}

export interface AuthenticatedRequest extends Request {
	user: DecodedToken
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

		const decoded = verify(token, env.SECRET_KEY) as DecodedToken
		;(req as AuthenticatedRequest).user = decoded

		next()
	} catch (e) {
		res.status(401).json({ message: 'Unauthorized' })
	}
}
