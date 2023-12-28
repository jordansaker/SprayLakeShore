import app from 'app'
import { db } from "db"

const port: String | Number = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
  db.runMigrations()
})