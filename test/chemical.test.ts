import request from 'supertest'
import Chemical from '../src/models/chemicals'

const baseURL: string = 'http://localhost:3000'

const newChemical: Chemical = {
  chemicalName: 'Bulldock',
  chemicalRate: 25,
  targetedPest: 'FSB'
}

describe('Chemical tests', () => { 

  test('GET /chemicals should get all the stored chemicals', async () => { 
    const res = await request(baseURL).get('/chemicals')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
   })

  test('GET /chemicals/:chemical_name should get the stored named chemical', async () => { 
    const res = await request(baseURL).get('/chemicals/Serenade+Opti')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.chemical_name).toBe('Serenade Opti')
  })

  test('GET /chemicals/:non-existant_chemical_name should return a chemical not found', async () => { 
    const res = await request(baseURL).get('/chemicals/Nordox+750WG+Copper+Fungicide')
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Chemical not found')
  })
  
  test('POST /chemicals should create a new chemical', async () => { 
    const res = await request(baseURL).post('/chemicals').send(newChemical)
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.chemical_name).toBe('Bulldock')
  })

  test('POST /chemicals should return a duplicate error', async () => { 
    const res = await request(baseURL).post('/chemicals').send(newChemical)
    expect(res.status).toBe(400)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Chemical already exists')
  })

  test('PUT /chemicals/:chemical_name should update any columns of the selected chemical', async () => { 
    const res = await request(baseURL).put('/chemicals/Bulldock').send({ chemicalRate: 50 })
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.chemical_rate).toBe(50)
    expect(res.body.chemical_name).toBe('Bulldock')
  })

  test('PUT /chemicals/:non-existant_chemical_name should return a chemical not found', async () => { 
    const res = await request(baseURL).put('/chemicals/Nordox+750WG+Copper+Fungicide').send({ chemicalRate: 50 })
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Chemical not found')
  })

  test('DELETE /chemicals/:chemical_name should delete the selected chemical', async () => { 
    const res = await request(baseURL).delete('/chemicals/Bulldock')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Chemical deleted')
  })

  test('DELETE /chemicals/:non-existant_chemical_name should return a chemical not found', async () => { 
    const res = await request(baseURL).delete('/chemicals/Nordox+750WG+Copper+Fungicide')
    expect(res.status).toBe(404)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.message).toBe('Chemical not found')
  })
})