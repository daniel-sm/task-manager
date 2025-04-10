import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import { loginSchema, registerSchema } from '../schemas/auth-schemas'
import { loginService, registerService } from '../services/auth-services'

export async function registerController(req: Request, res: Response) {
  try {
    const { body } = registerSchema.parse({ body: req.body })
    const { name, email, password } = body

    const id = await registerService({
      name,
      email,
      password,
    })

    if (!id) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    res.json({ id })
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json({ error: e.errors })
      return
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { body } = loginSchema.parse({ body: req.body })
    const { email, password } = body

    const token = await loginService({
      email,
      password,
    })

    if (!token) {
      res.status(400).json({ message: 'Invalid email or password' })
      return
    }

    res.json({ token })
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).json({ error: e.errors })
      return
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}
