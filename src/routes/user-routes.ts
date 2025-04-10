import { Router } from 'express'
import {
  deleteUserController,
  getUserByIdController,
  getUsersController,
} from '../controllers/user-controllers'

const userRouter = Router()

userRouter.get('/read', getUsersController)
userRouter.get('/read/:userId', getUserByIdController)
userRouter.delete('/delete/:userId', deleteUserController)

export { userRouter }
