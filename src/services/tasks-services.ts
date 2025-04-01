import { prisma } from '../database/client'

interface Task {
	title: string
	description?: string
	dueDate?: Date
	userId: number
}

export async function createTaskService(task: Task) {
	const createdTask = prisma.task.create({
		data: {
			title: task.title,
			description: task.description,
			dueDate: task.dueDate,
			userId: task.userId,
		},
	})

	return createdTask
}
