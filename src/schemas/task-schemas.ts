import z from 'zod'

export const createSchema = z.object({
	body: z.object({
		title: z.string(),
		description: z.string().optional(),
		dueDate: z.date().optional(),
		userId: z.number(),
	}),
})

export const updateSchema = z.object({
	params: z.object({
		taskId: z.coerce.number(),
	}),
	body: z
		.object({
			title: z.string().optional(),
			description: z.string().optional(),
			dueDate: z.date().optional(),
		})
		.partial()
		.refine(data => Object.keys(data).length > 0, 'Empty object'),
})
