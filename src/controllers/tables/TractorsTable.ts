import { pool } from "db"
import { QueryResult } from "pg"


// ---------- TRACTORS TABLE CONTROLLER ----------- //
const TractorsTable = {
  getOne: async (assetID: string): Promise<QueryResult> => {
    return pool.query('SELECT * FROM tractors WHERE asset_id=$1', [assetID])
  },
  getAll:  async (): Promise<QueryResult> => {
    return pool.query('SELECT * FROM tractors')
  },
  updateOne: async (updateTractor: string, assetID: string, trackingDevice: string, gear: string, range: string, equipmentID: number ): Promise<QueryResult> => {
    return pool.query('UPDATE tractors SET asset_id=$2, tracking_device=$3, gear=$4, range=$5, equipment_id=$6  WHERE asset_id=$1 RETURNING *', [updateTractor, assetID, trackingDevice, gear, range, equipmentID])
  },
  createOne: async (tractorArray: (string | number)[]): Promise<QueryResult> => {
    return pool.query('INSERT INTO tractors(asset_id, tracking_device, gear, range, equipment_id) values ($1, $2, $3, $4, $5) RETURNING *', [...tractorArray])
  },
  deleteOne: async (assetID: string): Promise<QueryResult> => {
    return pool.query('DELETE FROM tractors WHERE asset_id=$1', [assetID])
  }
}

export default TractorsTable