import type { z } from 'zod'
import type { Request, Response, NextFunction } from 'express'

// biome-ignore lint/suspicious/noExplicitAny: to avoid zod error
export function bodyValidator(schema: z.ZodObject<any, any>) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.safeParse(req.body)

		if (validation.success) {
			next()
		} else {
			res.json({
				error: validation.error.issues.map(
					issue => `${issue.path.join('.')}: ${issue.message}`,
				),
			})
		}
	}
}
