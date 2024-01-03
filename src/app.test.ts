import app from "app"
import request from 'supertest'
import { jest } from '@jest/globals'
import { pool } from 'db'
import { User, UserRole } from "models/user"

// Objefcts used in tests

let userObject: User = {
  username: 'lakeshore_spray',
  email: 'spray@lsavo.com.au',
  user_role: 'spray',
  password: 'sprayPass'
}

let updatedPassword: string = 'NewPass123'
let updatedRole: UserRole = 'manager'
let resetPasswordEmail: string = 'jordan.saker@ymail.com'

// Get users from database

describe('App Tests', () => {
  describe('Users tests', () => {

    test('should return all records from the users table URL (/users/)', async () => {
      const res = await request(app).get('/users/')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body[0].username).toBe('lakeshore_dev')
    })

    test('should return the selected user lakeshore_dev URL (/users/user_id)', async () => {
      const res = await request(app).get('/users/lakeshore_dev')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.username).toBe('lakeshore_dev')
     })
    
    test('should update user password URL (/users/$user_id)', async () => {
      const res = await request(app).put('/users/lakeshore_dev').send({ password: updatedPassword })
      expect(res.body.message).toBe('Password updated')
    })

    test('should update user role',async () => {
      const res = await request(app).put('/users/lakeshore_supervisor').send({ user_role: updatedRole })
      expect(res.body.message).toBe('Role updated to manager')
    })

    test('should create new user and return user JSON without password', async () => {
      type ReturnNewUser = Omit<User, "password">
      const newUser: ReturnNewUser = {
        username: userObject.username,
        email: userObject.email,
        user_role: userObject.user_role
      }

      const res = await request(app).post('/users/').send(userObject)
      expect(res.status).toBe(201)
      expect(res.body).toBe(newUser)
    })

    test('should reset user password', async () => {
      const res = await request(app).post('/users/reset/lakeshore_dev').send({ email: resetPasswordEmail })
      expect(res.body.message).toBe('A link to reset your password has been sent to your email')
    })

   })
}) 
