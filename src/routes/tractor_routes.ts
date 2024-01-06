import TractorsTable from 'controllers/tables/TractorsTable'
import express, { Request, Response, IRouter } from 'express'
import { QueryResult } from 'pg'

const router: IRouter = express.Router()

// get all tractors
router.get('/', async (req: Request, res: Response) => {
  try {
    const tractors: QueryResult = await TractorsTable.getAll()
    res.json(tractors.rows)
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// get a tractor
router.get('/:assetID', async (req: Request, res: Response) => {
  try {
    // execute the query
    const tractor: QueryResult = await TractorsTable.getOne(req.params.assetID)
    if (tractor.rows[0]) {
      // return the query result
      res.json(tractor.rows[0])
    } else {
      res.status(404).json({ message: 'Tractor not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// create a new tractor
router.post('/', async (req: Request, res: Response) => {
  try {
    // check for duplicates
    const duplicateCheck: QueryResult = await TractorsTable.getOne(req.body.assetID)
    if (!duplicateCheck.rows[0]) {
      // prep the tractor array
      const tractorArray: [string, string, string, string, number] = [
        req.body.assetID,
        req.body.trackingDevice,
        req.body.gear,
        req.body.range,
        req.body.equipmentID
      ]
      // execute the query
      const tractor: QueryResult = await TractorsTable.createOne(tractorArray)
      // return the created tractor
      res.status(201).json(tractor.rows[0])
    } else {
      res.status(404).json({ message: 'Tractor not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// update a tractor
router.put('/:assetID', async (req: Request, res: Response) => {
  try {
    // execute the query
    const tractor: QueryResult = await TractorsTable.getOne(req.params.assetID)
    if (tractor.rows[0]) {
      // prep the update array
      const updateArray: [string, string, string, string, string, number] = [
        req.params.assetID,
        req.body.assetID || tractor.rows[0].asset_id,
        req.body.trackingDevice || tractor.rows[0].tracking_device,
        req.body.gear || tractor.rows[0].gear,
        req.body.range || tractor.rows[0].range,
        req.body.equipmentID || tractor.rows[0].equipment_id,
      ]
      // update the record
      const updatedTractor: QueryResult = await TractorsTable.updateOne(...updateArray)
      // return the updated record
      res.status(201).json({ row: updatedTractor.rows[0], message: 'Tractor updated' })
    } else {
      res.status(404).json({ message: 'Tractor not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// delete a tractor
router.delete('/:assetID', async (req: Request, res: Response) => {
  try {
    // execute the query
    const tractor: QueryResult = await TractorsTable.getOne(req.params.assetID)
    if (tractor.rows[0]) {
      // execute the query
      await TractorsTable.deleteOne(req.params.assetID)
      // return delete message
      res.json({ message: 'Tractor deleted' })
    } else {
      res.status(404).json({ message: 'Tractor not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

export default router