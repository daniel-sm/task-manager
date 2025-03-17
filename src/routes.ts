import { Router } from 'express'
import { registerController } from './controllers'

const router = Router()

router.post('/auth/register', registerController)

export { router }
