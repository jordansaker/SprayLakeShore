import express, { Express } from "express"
import userRouter from 'routes/user_routes'
import blockRouter from 'routes/block_routes'
import equipmentRouter from 'routes/equipment_routes'

const app: Express = express()

// middleware
app.use(express.json())

// routes
app.use('/users', userRouter)
app.use('/blocks', blockRouter)
app.use('/equipments', equipmentRouter)



export default app
