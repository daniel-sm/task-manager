import { Router } from 'express'
import { getUsersController } from '../controllers/user-controllers'

const userRouter = Router()

userRouter.get('/read', getUsersController)

export { userRouter }
