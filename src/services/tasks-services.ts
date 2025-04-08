import { prisma } from '../database/client'

interface CreateTask {
	title: string
	description?: string
	dueDate?: Date
	userId: number
}

interface UpdateTask {
	id: number
	title?: string
	description?: string
	dueDate?: Date
}

export async function createTaskService(task: CreateTask) {
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

export async function getAllTasksService(userId: string) {
	const tasks = await prisma.task.findMany({
		where: {
			userId: Number(userId),
		},
	})

	return tasks
}

export async function updateTaskService(task: UpdateTask) {
	const data: {
		title?: string
		description?: string
		dueDate?: Date
	} = {}

	if (task.title) {
		data.title = task.title
	}
	if (task.description) {
		data.description = task.description
	}
	if (task.dueDate) {
		data.dueDate = task.dueDate
	}

	const updatedTask = await prisma.task.update({
		where: { id: task.id },
		data,
	})

	return updatedTask
}
