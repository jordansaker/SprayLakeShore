import request from "supertest"
import Block from "../src/models/blocks"

let blockObject: Block = {
  blockName: 'Test',
  blockSize: 20,
  farm: 'Main'
}

const baseURL: string = 'http://localhost:3000'

describe('Blocks tests', () => { 

  test('GET /blocks should get list of all blocks', async () => { 
    const res = await request(baseURL).get('/blocks')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body[0].block_name).toBe('L1A')
   })
  
  test('GET /blocks/:block_name should get info of selected block', async () => { 
    const res = await request(baseURL).get('/blocks/LA')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.block_name).toBe('L1A')
  })

  test('GET /blocks/:non-existing_block_name should return block not found', async () => { 
    const res = await request(baseURL).get('/blocks/Old')
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Block not found')
  })

  test('PUT /blocks/:block_name should update size of selected block', async () => {
    const res = await request(baseURL).put('/blocks/LA').send({ block_size: 50 }) 
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.block_name).toBe('LA')
    expect(res.body.message).toBe('Block size updated')
  })

  test('PUT /blocks/:non-existing_block_name should return block not found', async () => { 
    const res = await request(baseURL).put('/blocks/Old').send({ block_size: 50 })
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Block not found')
  })

  test('PUT /blocks/zones/:block_name should update the fencing polygon of selected block', async () => { 
    const res = await request(baseURL).put('/blocks/zones/LA').send({ block_size: 50 })
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.block_name).toBe('LA')
    expect(res.body.message).toBe('Block zone updated')
  })

  test('PUT /blocks/zones/:non-existing_block_name should return block not found', async () => { 
    const res = await request(baseURL).put('/blocks/zones/Old').send({ block_size: 50 })
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Block not found')
  })

  test('POST /blocks should create a new block', async () => { 
    const res = await request(baseURL).post('/blocks').send(blockObject)
    expect(res.status).toBe(201)
    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.block_name).toBe('Test')
  })

  test('POST /blocks should return block duplicate error', async () => { 
    const res = await request(baseURL).post('/blocks').send(blockObject)
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Block already exists')
  })

  test('DELETE /blocks/:block_name should delete the selected block', async () => { 
    const res = await request(baseURL).delete('/blocks/Test')
    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Block deleted')
  })

  test('DELETE /blocks/:non-existing_block_name should return block not found', async () => { 
    const res = await request(baseURL).delete('/blocks/Old')
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Block not found')
  })
})