import z from 'zod'

export const registerSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z.string(),
	}),
})
