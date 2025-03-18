import { Router } from 'express'
import { loginController, registerController } from './controllers'

const router = Router()

router.post('/auth/register', registerController)
router.post('/auth/login', loginController)

export { router }
