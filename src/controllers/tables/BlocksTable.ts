import { pool } from "db"
import { QueryResult } from "pg"


// ---------- USERS TABLE CONTROLLER ----------- //
const BlocksTable = {
  getOne: async (blockName: string): Promise<QueryResult> => {
    return pool.query('SELECT * FROM blocks WHERE block_name=$1', [blockName])
  },
  getAll:  async (): Promise<QueryResult> => {
    return pool.query('SELECT * FROM blocks')
  },
  updateOne: async (updateBlock: string, blockName: string, blockSize: number, farm: string ): Promise<QueryResult> => {
    return pool.query('UPDATE blocks SET block_name=$2, block_size=$3, farm=$4 WHERE block_name=$1 RETURNING *', [updateBlock, blockName, blockSize, farm])
  },
  updateGeom: async (updateBlock: string, fencing: any ): Promise<QueryResult> => {
    return pool.query('UPDATE blocks SET fencing=$2 WHERE block_name=$1 RETURNING *', [updateBlock, fencing])
  },
  createOne: async (blockArray: string[]): Promise<QueryResult> => {
    return pool.query('INSERT INTO blocks(block_name, block_size, farm) values ($1, $2, $3) RETURNING *', [...blockArray])
  },
  deleteOne: async (blockName: string): Promise<QueryResult> => {
    return pool.query('DELETE FROM blocks WHERE block_name=$1', [blockName])
  }
}

export default BlocksTable