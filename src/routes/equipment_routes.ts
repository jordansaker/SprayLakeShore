import express, { Request, Response, IRouter } from 'express'
import EquipmentsTable from 'controllers/tables/EquipmentsTable'
import { QueryResult } from 'pg'

const router: IRouter = express.Router()

// get all spray equipments
router.get('/', async (req: Request, res: Response) => {
  try {
    const equipments: QueryResult = await EquipmentsTable.getAll()
    res.json(equipments.rows)
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// get a single spray equipment
router.get('/:sprayEquipment', async (req: Request, res: Response) => {
  try {
    // execute the query
    const equipment: QueryResult = await EquipmentsTable.getOne(req.params.sprayEquipment)
    if (equipment.rows[0]) {
      // return the query result
      res.json(equipment.rows[0])
    } else {
      res.status(404).json({ message: 'Equipment not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// create a new spray equipment
router.post('/', async (req: Request, res: Response) => {
  try {
    // check for duplicates
    const duplicateCheck: QueryResult = await EquipmentsTable.getOne(req.body.sprayEquipment)
    if (!duplicateCheck.rows[0]) {
      // execute the query
      const equipment: QueryResult = await EquipmentsTable.createOne(req.body.sprayEquipment)
      // return the query result
      res.status(201).json(equipment)
    } else {
      res.status(400).json({ message: 'Spray equipment already exists' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// update a spray equipment
router.put('/:sprayEquipment', async (req: Request, res: Response) => {
  try {
    // execute the query
    const checkEquipment: QueryResult = await EquipmentsTable.getOne(req.params.sprayEquipment)
    if (checkEquipment.rows[0]) {
      // update the record
      const updatedEquipment: QueryResult = await EquipmentsTable.updateOne(req.params.sprayEquipment, req.body.sprayEquipment || checkEquipment.rows[0].spray_equipment)
      // return the updated record
      res.status(201).json({ row: updatedEquipment.rows[0], message: 'Spray equipment updated' })
    } else {
      res.status(404).json({ message: 'Equipment not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// delete a spray equipment
router.delete('/:sprayEquipment', async (req: Request, res: Response) => {
  try {
    // execute the query
    const checkEquipment: QueryResult = await EquipmentsTable.getOne(req.params.sprayEquipment)
    if (checkEquipment.rows[0]) {
      // delete the record
      const deleteEquipment: QueryResult = await EquipmentsTable.deleteOne(req.params.sprayEquipment)
      // return the deleted message
      res.json({ message: 'Spray equipment deleted' })
    } else {
      res.status(404).json({ message: 'Equipment not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

export default router