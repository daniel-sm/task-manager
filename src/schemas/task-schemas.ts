import z from 'zod'

export const createSchema = z.object({
	body: z.object({
		title: z.string(),
		description: z.string().optional(),
		dueDate: z.date().optional(),
		userId: z.number(),
	}),
})
