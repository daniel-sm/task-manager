import { Router } from 'express'
import {
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updatePasswordController,
  updateUserController,
} from '../controllers/user-controllers'

const userRouter = Router()

userRouter.get('/read', getUsersController)
userRouter.get('/read/:userId', getUserByIdController)
userRouter.put('/update/:userId', updateUserController)
userRouter.delete('/delete/:userId', deleteUserController)
userRouter.put('/update/password/:userId', updatePasswordController)

export { userRouter }
