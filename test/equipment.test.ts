import request from "supertest"

const baseURL: string = 'http://localhost:3000'

describe('Equipment tests', () => { 

  test('GET /equipments should get all spray equipments', async () => { 
    const res = await request(baseURL).get('/equipments')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
   })
  
  test('GET /equipments/:srpay_equipment should get the selected spray equipment S2', async () => { 
    const res = await request(baseURL).get('/equipments/S2')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.spray_equipment).toBe('S2')
  })

  test('GET /equipments/:non-existent_srpay_equipment should return spray equipment not found', async () => { 
    const res = await request(baseURL).get('/equipments/S200')
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Spray equipment not found')
  })

  test('POST /equipments should create a new spray equipment S15', async () => { 
    const res = await request(baseURL).post('/equipments').send({ sprayEquipment: 'S15' })
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.spray_equipment).toBe('S15')
  })

  test('POST /equipments should return a duplicate error', async () => { 
    const res = await request(baseURL).post('/equipments').send({ sprayEquipment: 'S15' })
    expect(res.status).toBe(400)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Spray equipment already exists')
  })

  test('PUT /equipments/:spray_equipment should update the selected spray equipment S15 to S16', async () => { 
    const res = await request(baseURL).put('/equipments/S15').send({ sprayEquipment: 'S16' })
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.row.spray_equipment).toBe('S16')
    expect(res.body.message).toBe('Spray equipment updated')
  })

  test('PUT /equipments/:non-existing_user_id should return equipment not found', async () => {
    const res = await request(baseURL).put('/equipments/S23').send({ sprayEquipment: 'S16' })
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Spray equipment not found')
  })

  test('DELETE /equipments/:spray_equipment should delete the selected spray equipment S16', async () => { 
    const res = await request(baseURL).delete('/equipments/S16')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Spray equipment deleted')
  })

  test('DELETE /equipments/:non-existing_user_id should return equipment not found', async () => {
    const res = await request(baseURL).delete('/equipments/S23')
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Spray equipment not found')
  })
 })
