import express from 'express'
import { router } from './routes'
import { env } from './config/env'

const app = express()
const port = env.PORT

app.use(express.json())

app.use('/api', router)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
