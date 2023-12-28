import { db } from "db"
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
  // res.send('Express + Typescript Server + Postgres')
})

const port: String | Number = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  db.runMigrations()
})