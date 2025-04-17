import z from 'zod'

export const userParamsSchema = z.object({
  params: z.object({
    userId: z.coerce.number(),
  }),
})

export const userUpdateSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
})

export const updatePasswordSchema = z.object({
  body: z.object({
    password: z.string(),
  }),
})
