import express, { Express, Request, Response } from "express"
import { pool } from "db"

const app: Express = express()

app.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})

export default app
