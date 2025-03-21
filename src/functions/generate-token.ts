import { sign } from 'jsonwebtoken'
import { env } from '../config/env'
import type { User } from '../database/users'

export function generateToken(user: User) {
	return sign(user.email, env.SECRET_KEY, { expiresIn: '1h' })
}
