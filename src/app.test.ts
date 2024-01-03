import app from "app"
import request from 'supertest'
import { jest } from '@jest/globals'
import { pool } from 'db'


// Get users from database

describe('App Tests', () => {
  describe('get users', () => { 
    test('should return all records from the users table', async () => {
      const res = await request(app).get('/users/')
      expect(res.status).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
    })
   })
}) 
