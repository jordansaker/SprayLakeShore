import express, { Request, Response, IRouter } from "express"
import { User } from "models/user"
import bcrypt from 'bcrypt'
import UsersTable from "controllers/tables/UsersTable"
import { QueryResult } from "pg"

const router: IRouter = express.Router()
const saltRounds: number = 10

interface ReturnObject {
  record: object[],
  message: string
}

// -------------------------------------- //
// ------------ ENDPOINTS --------------- //

// get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users: QueryResult = await UsersTable.getAll()
    res.json(users.rows)
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// get a single user
router.get('/:username', async (req: Request, res: Response) => {
  try {
    // execute the query
    const existingUser: QueryResult = await UsersTable.getOne(req.params.username)
    if (existingUser.rows[0]) {
      const username: string = req.params.username
      const user: QueryResult = await UsersTable.getOne(username)
      // return the query result
      res.json(user.rows[0])
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// create new user
router.post('/', async (req: Request, res: Response) => {
  try {
    // update the userObject
    // extract the values from the JSON object
    // password left blank and will be set using the password reset link endpoint
    let userObject: User = { ...req.body }
    let userArray: string[] = [userObject.username, userObject.email, userObject.user_role, '']
    // execute the query
    const user: QueryResult = await UsersTable.createOne(userArray)
    // return the query result
    const createdUser: Omit<User, "password"> = {
      ...user.rows[0]
    }
    res.status(201).json(createdUser)
  } catch (err: any) {
    
  }
})

// delete user
router.delete('/:username', async (req: Request, res: Response) => {
  try {
    // execute the query
    const existingUser: QueryResult = await UsersTable.getOne(req.params.username)
    if (existingUser.rows[0]) {
      const deleteUser: QueryResult = await UsersTable.deleteOne(req.params.username)
      // return the password update msg
      res.json({ message: 'User deleted' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})


// reset the user's password
router.post('/:username', async (req: Request, res: Response) => {
  try {
    // execute the query
    const existingUser: QueryResult = await UsersTable.getOne(req.params.username)
    if (existingUser.rows[0]) {
      // hash the new password
      const newHashedPassword: string = await bcrypt.hash(req.body.password, saltRounds)
      // execute the query
      const user: QueryResult = await UsersTable.updatePassword(newHashedPassword, req.params.username)
      // return the password update msg
      const updatedUserRecord: ReturnObject = {
        record: [user.rows[0]],
        message: 'Password updated'
      }
      res.status(201).json(updatedUserRecord)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// TODO: request password reset (check readme resources for link)


// update user role
router.post('/role/:username', async (req: Request, res: Response) => {
  try {
    // execute the query
    const existingUser: QueryResult = await UsersTable.getOne(req.params.username)
    if (existingUser.rows[0]) {
      const role: string = req.body.user_role
      const username: string = req.params.username
      // execute the query
      const user: QueryResult = await UsersTable.updateRole(role, username)
      // return the role update msg
      const updatedUserRecord: ReturnObject = {
        record: [user.rows[0]],
        message: `Role updated to ${req.body.user_role}`
      }
      res.status(201).json(updatedUserRecord)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

export default router
