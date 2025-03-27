import z from 'zod'

export const registerSchema = z.object({
	body: z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string(),
	}),
})

export const loginSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z.string(),
	}),
})
