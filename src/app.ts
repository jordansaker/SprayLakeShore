import express, { Express, Request, Response } from "express"
import { pool } from "db"
import userRouter from 'routes/user_routes'

const app: Express = express()

// middleware
app.use(express.json())

// routes
app.use('/users', userRouter)



export default app
