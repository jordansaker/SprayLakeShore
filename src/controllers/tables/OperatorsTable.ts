import { pool } from "db"
import { QueryResult } from "pg"


// ---------- OPERATORS TABLE CONTROLLER ----------- //
const OperatorsTable = {
  getOne: async (fullName: string): Promise<QueryResult> => {
    return pool.query('SELECT * FROM operators WHERE CONCAT_WS(\' \', "first_name", "last_name") = $1', [fullName])
  },
  getAll:  async (): Promise<QueryResult> => {
    return pool.query('SELECT * FROM operators')
  },
  updateOne: async (firstName: string, lastName: string, chemCert: boolean, profileURL: string, fullName: string): Promise<QueryResult> => {
    return pool.query('UPDATE operators SET first_name=$1, last_name=$2, chem_cert=$3, profile_url=$3  WHERE WHERE CONCAT_WS(\' \', "first_name", "last_name") = $5 RETURNING *', [firstName, lastName, chemCert, profileURL, fullName])
  },
  createOne: async (operatorArray: string[]): Promise<QueryResult> => {
    return pool.query('INSERT INTO operators(first_name, last_name, chem_cert, profile_url) values ($1, $2, $3, $4) RETURNING *', [...operatorArray])
  },
  deleteOne: async (fullName: string): Promise<QueryResult> => {
    return pool.query('DELETE FROM operators CONCAT_WS(\' \', "first_name", "last_name") = $1', [fullName])
  }
}

export default OperatorsTable