import { prisma } from '../database/client'

interface Task {
	title: string
	description?: string
	dueDate?: Date
	userId: number
}

export async function createTaskService(task: Task) {
	const createdTask = await prisma.task.create({
		data: {
			title: task.title,
			description: task.description,
			dueDate: task.dueDate,
			userId: task.userId,
		},
	})

	return createdTask
}

export async function getAllTasksService(id: string) {
	const tasks = await prisma.task.findMany({
		where: {
			userId: Number(id),
		},
	})

	return tasks
}
