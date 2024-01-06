import request from 'supertest'
import Tractor from '../src/models/tractors'

const baseURL: string = 'http://localhost:3000'

const newTractor: Tractor = {
  assetID: 'T80',
  trackingDevice: 'B99999',
  gear: '4th',
  range: '1',
  equipmentID: 3,
}

describe('Tractors tests', () => {

  test('GET /tractors should get all tractors', async () => {
    const res = await request(baseURL).get('/tractors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  test('GET /tractors/:asset_id should selected tractor', async () => {
    const res = await request(baseURL).get('/tractors/T5')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.asset_id).toBe('T5')
  })

  test('GET /tractors/:non-existant_asset_id should return a tractor not found', async () => {
    const res = await request(baseURL).get('/tractors/T99')
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Tractor not found')
  })

  test('POST /tractors should create a new tractor', async () => {
    const res = await request(baseURL).post('/tractors').send(newTractor)
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.asset_id).toBe('T80')
  })

  test('POST /tractors should return a duplicate error', async () => {
    const res = await request(baseURL).post('/tractors').send(newTractor)
    expect(res.status).toBe(400)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Tractor already exists')
  })

  test('PUT /tractors/:asset_id should update the selected tractor', async () => {
    const res = await request(baseURL).put('/tractors/T80').send({ equipmentID: 2 })
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.row.asset_id).toBe('T80')
    expect(res.body.row.equipment_id).toBe(2)
    expect(res.body.message).toBe('Tractor updated')
  })

  test('PUT /tractors/:non-existant_asset_id should return a tractor not found', async () => {
    const res = await request(baseURL).put('/tractors/T99').send({ equipmentID: 2 })
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Tractor not found')
  })

  test('DELETE /tractors/:asset_id should delete the selected tractor', async () => {
    const res = await request(baseURL).delete('/tractors/T80')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Tractor deleted')
  })

  test('DELETE /tractors/:non-existant_asset_id should return a tractor not found', async () => {
    const res = await request(baseURL).delete('/tractors/T99')
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Tractor not found')
  })
})