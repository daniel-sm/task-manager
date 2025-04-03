import { hash, verify } from 'argon2'
import { sign } from 'jsonwebtoken'
import { env } from '../config/env'
import { prisma } from '../database/client'

interface User {
	name: string
	email: string
	password: string
}

interface Login {
	email: string
	password: string
}

export async function registerService(user: User) {
	const userAlreadyExists = await prisma.user.findFirst({
		where: { email: user.email },
	})

	if (userAlreadyExists) return null

	const hashedPassword = await hash(user.password)

	const { id } = await prisma.user.create({
		data: {
			name: user.name,
			email: user.email,
			password: hashedPassword,
		},
	})

	return id
}

export async function loginService(login: Login) {
	const user = await prisma.user.findFirst({
		where: { email: login.email },
	})

	if (!user) return null

	const isPasswordCorrect = await verify(user.password, login.password)

	if (!isPasswordCorrect) return null

	const token = sign({ id: user.id }, env.SECRET_KEY, { expiresIn: '20m' })

	return token
}
