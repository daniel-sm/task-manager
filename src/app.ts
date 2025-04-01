import express from 'express'
import { env } from './config/env'
import { authRouter } from './routes/auth-routes'
import { tasksRouter } from './routes/task-routes'

const app = express()
const port = env.PORT

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/tasks', tasksRouter)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
