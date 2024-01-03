import express, { Express, Request, Response } from "express"
import { pool } from "db"
import userRouter from 'routes/user_routes'

const app: Express = express()

app.use('/users', userRouter)



export default app
