import express, { Express, Request, Response } from "express"
import db from "db"

const app: Express = express()
const port: String | Number = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Express + Typescript Server + Postgres')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  db.runMigrations()
})