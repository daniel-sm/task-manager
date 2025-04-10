import { prisma } from '../database/client'

export async function getUsersService() {
	const users = await prisma.user.findMany()

	return users
}
