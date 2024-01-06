import request from 'supertest'
import Operator from '../src/models/operators'

const baseURL: string = 'http://localhost:3000'

const newOperator: Operator = {
  firstName: 'Test',
  middleName: 'T',
  lastName: 'Operator',
  chemCert: true
}

describe('Operator tests', () => {

  test('GET /operators should get all operators', async () => {
    const res = await request(baseURL).get('/operators')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  test('GET /operators/:last_name/:middle_name/:first_name should get all operators', async () => {
    const res = await request(baseURL).get('/operators/Saker/J/Jordan')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.last_name).toBe('Saker')
    expect(res.body.first_name).toBe('Jordan')
  })

  test('GET /operators/:non-existant_last_name/:middle_name/:first_name should return operator not found', async () => {
    const res = await request(baseURL).get('/operators/Sa/M/Jordan')
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Operator not found')
  })

  test('POST /operators should create new operator profile', async () => {
    const res = await request(baseURL).post('/operators').send(newOperator)
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.last_name).toBe('Operator')
    expect(res.body.first_name).toBe('Test')
  })

  test('POST /operators should return duplicate error', async () => {
    const res = await request(baseURL).post('/operators').send(newOperator)
    expect(res.status).toBe(400)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Operator already exists')
  })

  test('PUT /operators/:last_name/:middle_name/:first_name should update operator profile', async () => {
    const res = await request(baseURL).put('/operators/Operator/T/Test').send({ chemCert: false })
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.row.last_name).toBe('Operator')
    expect(res.body.row.first_name).toBe('Test')
    expect(res.body.row.middle_name).toBe('T')
    expect(res.body.row.chem_cert).toBe(false)
    expect(res.body.message).toBe('Operator updated')
  })

  test('PUT /operators/:non-existant_last_name/:middle_name/:first_name should return operator not found', async () => {
    const res = await request(baseURL).put('/operators/Sa/M/Jordan').send({ chemCert: false })
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Operator not found')
  })

  test('DELETE /operators/:last_name/:middle_name/:first_name should delete operator profile', async () => {
    const res = await request(baseURL).delete('/operators/Operator/T/Test')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Operator deleted')
  })

  test('DELETE /operators/:non-existant_last_name/:middle_name/:first_name should return operator not found', async () => {
    const res = await request(baseURL).delete('/operators/Sa/M/Jordan')
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Operator not found')
  })
})