import z from 'zod'

export const userParamsSchema = z.object({
	params: z.object({
		userId: z.coerce.number(),
	}),
})
