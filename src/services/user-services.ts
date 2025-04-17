import { prisma } from '../database/client'

interface UpdateUser {
  id: number
  name: string
}

export async function getUsersService() {
  const users = await prisma.user.findMany()

  return users
}

export async function getUserByIdService(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  return user
}

export async function updateUserService(user: UpdateUser) {
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: user.name,
    },
  })

  return updatedUser
}

export async function deleteUserService(userId: number) {
  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  })

  return deletedUser
}
