import { Router } from 'express'
import { bodyValidator } from './middlewares'
import { registerSchema } from './schemas'
import { registerController } from './controllers'

const router = Router()

router.post('/auth/register', bodyValidator(registerSchema), registerController)

export { router }
