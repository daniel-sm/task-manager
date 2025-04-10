import { Router } from 'express'
import {
	deleteUserController,
	getUsersController,
} from '../controllers/user-controllers'

const userRouter = Router()

userRouter.get('/read', getUsersController)
userRouter.delete('/delete/:userId', deleteUserController)

export { userRouter }
