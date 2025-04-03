import express from 'express'
import { env } from './config/env'
import { authMiddleware } from './middlewares/auth'
import { authRouter } from './routes/auth-routes'
import { tasksRouter } from './routes/task-routes'

const app = express()
const port = env.PORT

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/tasks', authMiddleware, tasksRouter)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
