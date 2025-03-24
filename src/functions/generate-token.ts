import { sign } from 'jsonwebtoken'
import { env } from '../config/env'
import type { User } from '../database/users'

export function generateToken(user: User) {
	return sign({ email: user.email }, env.SECRET_KEY, { expiresIn: '20m' })
}
