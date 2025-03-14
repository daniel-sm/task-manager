import { Router } from 'express'
import type { Request, Response } from 'express'
import { bodyValidator } from './middlewares'
import { registerSchema } from './schemas'

const router = Router()

router.post(
	'/auth/register',
	bodyValidator(registerSchema),
	(req: Request, res: Response) => {
		res.send('register')
	},
)

export { router }
