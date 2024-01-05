import express, { Express } from "express"
import userRouter from 'routes/user_routes'
import blockRouter from 'routes/block_routes'
import equipmentRouter from 'routes/equipment_routes'
import chemicalRouter from 'routes/chemical_routes'
import operatorRouter from 'routes/operator_routes'
import tractorRouter from 'routes/tractor_routes'

const app: Express = express()

// middleware
app.use(express.json())

// routes
app.use('/users', userRouter)
app.use('/blocks', blockRouter)
app.use('/equipments', equipmentRouter)
app.use('/chemicals', chemicalRouter)
app.use('/operators', operatorRouter)
app.use('/tractors', tractorRouter)



export default app
