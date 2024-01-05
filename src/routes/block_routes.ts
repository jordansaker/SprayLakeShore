import express, { Request, Response, IRouter } from "express"
import { QueryResult } from "pg"
import BlocksTable from "controllers/tables/BlocksTable"
import Block from "models/blocks";


const router: IRouter = express.Router()

// -------------------------------------- //
// ------------ ENDPOINTS --------------- //

// get all blocks
router.get('/', async (req: Request, res: Response) => {
  try {
    // execute the query
    const blocks: QueryResult = await BlocksTable.getAll()
    // return the result
    res.json(blocks.rows)
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// get a single block
router.get('/:blockName', async (req: Request, res: Response) => {
  try {
    // execute the query
    const block: QueryResult = await BlocksTable.getOne(req.params.blockName)
    if (block.rows[0]) {
      // return the query result
      res.json(block.rows[0])
    } else {
      res.status(404).json({ message: 'Block not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// create new block
router.post('/', async (req: Request, res: Response) => {
  try {
    // check for duplicates
    const duplicateCheck: QueryResult = await BlocksTable.getOne(req.body.blockName)
    if (!duplicateCheck.rows[0]) {
      // extract the values from the JSON object
      let blockArray: string[] = Object.values(req.body)
      // execute the query
      const block: QueryResult = await BlocksTable.createOne(blockArray)
      // return the new block
      const createdBlock: Block = {
        blockName: block.rows[0].block_name,
        blockSize: block.rows[0].block_size,
        farm: block.rows[0].farm
      }
      res.status(201).json(createdBlock)
    } else {
      res.status(400).json({ message: 'Block already exists' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// update block
router.put('/:blockName', async (req: Request, res: Response) => {
  try {
    // execute the query
    const block: QueryResult = await BlocksTable.getOne(req.params.blockName)
    if (block.rows[0]) {
      // prepare the updateArray
      const updateArray: [string, string, number, string] = [
        req.params.blockName,
        req.body.blockName || block.rows[0].block_name, 
        req.body.blockSize || block.rows[0].block_size, 
        req.body.farm || block.rows[0].farm
      ]
      // execute the update
      const blockUpdate: QueryResult = await BlocksTable.updateOne(...updateArray)
      // return the result
      res.status(201).json({ row: blockUpdate.rows[0], message: 'Block updated'})
    } else {
      res.status(404).json({ message: 'Block not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// update block geometry
router.put('/zones/:blockName', async (req: Request, res: Response) => {
  try {
    // execute the query
    const block: QueryResult = await BlocksTable.getOne(req.params.blockName)
    if (block.rows[0]) {
      // prepare the updateArray
      const updateArray: [string, any] = [
        req.params.blockName,
        req.body.fencing
      ]
      // execute the update
      const blockUpdate: QueryResult = await BlocksTable.updateGeom(...updateArray)
      // return the result
      res.status(201).json({ row: blockUpdate.rows[0], message: 'Block zone updated'})
    } else {
      res.status(404).json({ message: 'Block not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// delete the block
router.delete('/:blockName', async (req: Request, res: Response) => {
  try {
    // execute the query
    const block: QueryResult = await BlocksTable.getOne(req.params.blockName)
    if (block.rows[0]) {
      // delete the block
      await BlocksTable.deleteOne(req.params.blockName)
      // return block deleted message
      res.json({ message: 'Block deleted' })
    } else {
      res.status(404).json({ message: 'Block not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

export default router
