import express, { Express, Request, Response } from "express"
import { pool } from "db"
import userRouter from 'routes/user_routes'
import blockRouter from 'routes/block_routes'

const app: Express = express()

// middleware
app.use(express.json())

// routes
app.use('/users', userRouter)
app.use('/blocks',blockRouter)



export default app
