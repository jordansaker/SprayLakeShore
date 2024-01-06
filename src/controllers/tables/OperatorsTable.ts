import { pool } from "db"
import { QueryResult } from "pg"


// ---------- OPERATORS TABLE CONTROLLER ----------- //
const OperatorsTable = {
  getOne: async (fullName: string): Promise<QueryResult> => {
    return pool.query('SELECT * FROM operators WHERE CONCAT_WS(\' \', "first_name", "middle_name", "last_name") = $1', [fullName])
  },
  getAll:  async (): Promise<QueryResult> => {
    return pool.query('SELECT * FROM operators')
  },
  updateOne: async (firstName: string, middleName: string, lastName: string, chemCert: boolean, profileURL: string, fullName: string): Promise<QueryResult> => {
    return pool.query('UPDATE operators SET first_name=$1, middle_name=$2, last_name=$3, chem_cert=$4, profile_url=$5  WHERE CONCAT_WS(\' \', "first_name", "middle_name", "last_name") = $6 RETURNING *', [firstName, middleName, lastName, chemCert, profileURL, fullName])
  },
  createOne: async (operatorArray: string[]): Promise<QueryResult> => {
    return pool.query('INSERT INTO operators(first_name, middle_name, last_name, chem_cert, profile_url) values ($1, $2, $3, $4, $5) RETURNING *', [...operatorArray])
  },
  deleteOne: async (fullName: string): Promise<QueryResult> => {
    return pool.query('DELETE FROM operators WHERE CONCAT_WS(\' \', "first_name", "middle_name", "last_name") = $1', [fullName])
  }
}

export default OperatorsTable