import { Router } from 'express'
import type { Request, Response } from 'express'

const router = Router()

router.post('/auth/register', (req: Request, res: Response) => {
	res.send('register')
})

export { router }
