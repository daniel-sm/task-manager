import { prisma } from '../database/client'

export async function getUsersService() {
	const users = await prisma.user.findMany()

	return users
}

export async function deleteUserService(userId: number) {
	const deletedUser = await prisma.user.delete({
		where: {
			id: userId,
		},
	})

	return deletedUser
}
