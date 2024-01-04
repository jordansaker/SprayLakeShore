import request from 'supertest'
import { jest } from '@jest/globals'
import { User, UserRole } from "models/user"

const baseURL: string = 'http://localhost:3000'
// Objefcts used in tests

let userObject: User = {
  username: 'lakeshore_spray',
  email: 'spray@lsavo.com.au',
  userRole: 'spray',
  password: 'sprayPass'
}

let updatedPassword: string = 'NewPass123'
let updatedRole: UserRole = 'manager'
let resetPasswordEmail: string = 'jordan.saker@ymail.com'

describe('Users tests', () => {

    test('GET /users should return all records from the users table URL', async () => {
      const res = await request(baseURL).get('/users')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
    })

    test('GET /users/user_id should return the selected user lakeshore_dev', async () => {
      const res = await request(baseURL).get('/users/lakeshore_dev')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.username).toBe('lakeshore_dev')
     })

    test('GET /users/non-existing_user_id should return user not found', async () => {
      const res = await request(baseURL).get('/users/lakeshore')
      expect(res.status).toBe(404)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toBe('User not found')
    })
    
    test('POST /users/user_id should update user password', async () => {
      const res = await request(baseURL).post('/users/lakeshore_dev').send({ password: updatedPassword })
      expect(res.body.message).toBe('Password updated')
    })

    test('POST /users/non-existing_user_id should return user not found', async () => {
      const res = await request(baseURL).post('/users/lakeshore').send({ password: updatedPassword })
      expect(res.body.message).toBe('User not found')
    })

    test('POST /users/role/user_id should update user role',async () => {
      const res = await request(baseURL).post('/users/role/lakeshore_supervisor').send({ userRole: updatedRole })
      expect(res.body.message).toBe('Role updated to manager')
    })

    test('POST /users/role/non-existing_user_id should return user not found',async () => {
      const res = await request(baseURL).post('/users/role/lakeshore').send({ userRole: updatedRole })
      expect(res.body.message).toBe('User not found')
    })

    test('POST /users should create new user and return user JSON without password', async () => {
      type ReturnNewUser = Omit<User, "password">
      const newUser: ReturnNewUser = {
        username: userObject.username,
        email: userObject.email,
        userRole: userObject.userRole
      }

      const res = await request(baseURL).post('/users/').send(userObject)
      expect(res.status).toBe(201)
      expect(res.body).toStrictEqual(newUser)
    })

    test('DELETE /user/user_id should delete the specified user', async () => { 
      const res = await request(baseURL).delete('/users/lakeshore_spray')
      expect(res.body.message).toBe('User deleted')
     })

     test('DELETE /user/non-existing_user_id should return user not found', async () => { 
      const res = await request(baseURL).delete('/users/lake')
      expect(res.body.message).toBe('User not found')
     })

    test('POST /users/reset/lakeshore_dev should reset user password', async () => {
      const res = await request(baseURL).post('/users/reset/lakeshore_dev').send({ email: resetPasswordEmail })
      expect(res.body.message).toBe('A link to reset your password has been sent to your email')
    })
})

