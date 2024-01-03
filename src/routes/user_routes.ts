import express, { Express, Request, Response, IRouter } from "express"
import { UserRole, User } from "models/user"
import bcrypt from 'bcrypt'
import { pool } from "db"
import { QueryResult } from "pg"

const router: IRouter = express.Router()
const saltRounds: number = 10

// get all employees
router.get('/', async (req: Request, res: Response) => {
  try {
    const users: QueryResult = await pool.query('SELECT * FROM users')
    res.json(users.rows)
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

export default router
