import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { userParamsSchema } from '../schemas/user-schemas'
import {
  deleteUserService,
  getUserByIdService,
  getUsersService,
} from '../services/user-services'

export async function getUsersController(req: Request, res: Response) {
  try {
    const users = await getUsersService()

    res.json({ users })
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getUserByIdController(req: Request, res: Response) {
  try {
    const { params } = userParamsSchema.parse({
      params: req.params,
    })
    const { userId } = params

    const user = await getUserByIdService(userId)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.json({ user })
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json({ error: e.errors })
      return
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const { params } = userParamsSchema.parse({
      params: req.params,
    })
    const { userId } = params

    const deletedUser = await deleteUserService(userId)

    res.json({ user: deletedUser })
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json({ error: e.errors })
      return
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}
