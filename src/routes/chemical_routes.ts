import express, { Request, Response, IRouter } from 'express'
import { QueryResult } from 'pg'
import ChemicalsTable from "controllers/tables/ChemicalsTable"

const router: IRouter = express.Router()

// get all chemicals
router.get('/', async (req: Request, res: Response) => {
  try {
    const chemicals: QueryResult = await ChemicalsTable.getAll()
    res.json(chemicals.rows)
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// get a single chemical
router.get('/:chemicalName', async (req: Request, res: Response) => {
  try {
    // req params have chemical names with '+' separating words i.e Serenade+Opti
    // removing '+' from the req params
    const splitParamArray: string[] = req.params.chemicalName.split('+')
    // join the array elements
    const chemicalName: string = splitParamArray.join(' ')
    // execute the query
    const chemical: QueryResult = await ChemicalsTable.getOne(chemicalName)
    if (chemical.rows[0]) {
      // return the query result
      res.json(chemical.rows[0])
    } else {
      res.status(404).json({ message: 'Chemical not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// create a chemical
router.post('/', async (req: Request, res: Response) => {
  try {
    // check for duplicates
    const duplicateCheck: QueryResult = await ChemicalsTable.getOne(req.body.chemicalName)
    if (!duplicateCheck.rows[0]) {
      // convert the request body values to an array
      const chemicalArray: (string | number)[] = [req.body.chemicalName, req.body.targetedPest, req.body.chemicalRate]
      // execute the query
      const chemical: QueryResult = await ChemicalsTable.createOne(chemicalArray)
      // return the created chemical
      res.status(201).json(chemical.rows[0])
    } else {
      res.status(400).json({ message: 'Chemical already exists' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// update a chemical
router.put('/:chemicalName', async (req: Request, res: Response) => {
  try {
    // req params have chemical names with '+' separating words i.e Serenade+Opti
    // removing '+' from the req params
    const splitParamArray: string[] = req.params.chemicalName.split('+')
    // join the array elements
    const chemicalName: string = splitParamArray.join(' ')
    // execute the query, check if chemical exists
    const chemical: QueryResult = await ChemicalsTable.getOne(chemicalName)
    if (chemical.rows[0]) {
      // prepare the updateArray
      const updateArray: [string, string, string, number] = [
        chemicalName,
        req.body.chemicalName || chemical.rows[0].chemical_name,
        req.body.targetedPest || chemical.rows[0].targeted_pest,
        req.body.chemicalRate || chemical.rows[0].chemical_rate 
      ]
      // update the record
      const updatedChemical: QueryResult = await ChemicalsTable.updateOne(...updateArray)
      // return the updated record
      res.status(201).json({ row: updatedChemical.rows[0], message: 'Chemical updated' })
    } else {
      res.status(404).json({ message: 'Chemical not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// delete a chemical
router.delete('/:chemicalName', async (req: Request, res: Response) => {
  try {
    // req params have chemical names with '+' separating words i.e Serenade+Opti
    // removing '+' from the req params
    const splitParamArray: string[] = req.params.chemicalName.split('+')
    // join the array elements
    const chemicalName: string = splitParamArray.join(' ')
    // execute the query, check if chemical exists
    const chemical: QueryResult = await ChemicalsTable.getOne(chemicalName)
    if (chemical.rows[0]) {
      // execute the query
      await ChemicalsTable.deleteOne(chemicalName)
      // return deleted message
      res.json({ message: 'Chemical deleted' })
    } else {
      res.status(404).json({ message: 'Chemical not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

export default router