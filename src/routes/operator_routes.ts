import express, { Request, Response, IRouter } from "express"
import OperatorsTable from "controllers/tables/OperatorsTable"
import { QueryResult } from "pg"

const router: IRouter = express.Router()

// get all operators
router.get('/', async (req: Request, res: Response) => {
  try {
    const operators: QueryResult = await OperatorsTable.getAll()
    res.json(operators.rows)
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// get a single operator
router.get('/:lastName/:firstName', async (req: Request, res: Response) => {
  try {
    // OperatorsTable method getOne() requires fullName
    const fullName: string = req.params.firstName.concat(' ', req.params.lastName)
    // execute the query
    const operator: QueryResult = await OperatorsTable.getOne(fullName)
    if (operator.rows[0]) {
      // return the result
      res.json(operator.rows[0])
    } else {
      res.status(404).json({ message: 'Operator not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// create new operator
router.post('/', async (req: Request, res: Response) => {
  try {
    // get fullName from req body
    const fullName: string = req.body.firstName.concat(' ', req.params.lastName)
    // check for duplicates
    const duplicateCheck: QueryResult = await OperatorsTable.getOne(fullName)
    if (!duplicateCheck.rows[0]) {
      // prep the operatorArray
      const operatorArray: string[] = [
        req.body.firstName,
        req.body.lastName,
        req.body.chemCert,
        req.body.profileURL || ' '
      ]
      // execute the query
      const operator: QueryResult = await OperatorsTable.createOne(operatorArray)
      // return the created operator
      res.status(201).json(operator.rows[0])
    } else {
      res.status(400).json({ message: 'Operator already exists' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// update an operator
router.put('/:lastName/:firstName', async (req: Request, res: Response) => {
  try {
    // get fullName from req body
    const fullName: string = req.body.firstName.concat(' ', req.params.lastName)
    // execute the query, check if operator exists
    const operator: QueryResult = await OperatorsTable.getOne(fullName)
    if (operator.rows[0]) {
      // prepare the update array
      const updateArray: [string, string, boolean, string, string] = [
        req.body.firstName || operator.rows[0].first_name,
        req.body.lastName || operator.rows[0].last_name,
        req.body.chemCert || operator.rows[0].chem_cert,
        req.body.profileURL || operator.rows[0].profile_url,
        fullName
      ]
      // update the record
      const updatedOperator: QueryResult = await OperatorsTable.updateOne(...updateArray)
      // return the updated record
      res.status(201).json({ row: updatedOperator.rows[0], message: 'Operator updated' })
    } else {
      res.status(404).json({ message: 'Operator not found' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

// delete an operator
router.delete('/:lastName/:firstName', async (req: Request, res: Response) => {
  try {
    // get fullName from req body
    const fullName: string = req.body.firstName.concat(' ', req.params.lastName)
    // execute the query, check if operator exists
    const operator: QueryResult = await OperatorsTable.getOne(fullName)
    if (operator.rows[0]) {
      // execute the query
      await OperatorsTable.deleteOne(fullName)
      // return deleted message
      res.json({ message: 'Operator deleted' })
    }
  } catch (err: any) {
    res.status(500).send({ error: err.message })
  }
})

export default router