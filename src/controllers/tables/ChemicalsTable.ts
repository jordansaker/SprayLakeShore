import { pool } from "db"
import { QueryResult } from "pg"


// ---------- CHEMICALS TABLE CONTROLLER ----------- //
const ChemicalsTable = {
  getOne: async (chemicalName: string): Promise<QueryResult> => {
    return pool.query('SELECT * FROM chemicals WHERE chemical_name=$1', [chemicalName])
  },
  getAll:  async (): Promise<QueryResult> => {
    return pool.query('SELECT * FROM chemicals')
  },
  updateOne: async (updateChemcial: string, chemicalName: string, targetedPest: string, chemicalRate: number ): Promise<QueryResult> => {
    return pool.query('UPDATE chemicals SET chemical_name=$2, targeted_pest=$3, chemical_rate=$4  WHERE chemical_name=$1 RETURNING *', [updateChemcial, chemicalName, targetedPest, chemicalRate])
  },
  createOne: async (chemicalArray: [string, string, number]): Promise<QueryResult> => {
    return pool.query('INSERT INTO chemicals(chemical_name, targeted_pest, chemical_rate) values ($1, $2, $3) RETURNING *', [...chemicalArray])
  },
  deleteOne: async (chemicalName: string): Promise<QueryResult> => {
    return pool.query('DELETE FROM chemicals WHERE chemical_name=$1', [chemicalName])
  }
}

export default ChemicalsTable