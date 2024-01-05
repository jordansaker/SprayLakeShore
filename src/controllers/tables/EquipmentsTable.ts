import { pool } from "db"
import { QueryResult } from "pg"


// ---------- EQUIPMENTS TABLE CONTROLLER ----------- //
const EquipmentsTable = {
  getOne: async (sprayEquipment: string): Promise<QueryResult> => {
    return pool.query('SELECT * FROM spray_equipments WHERE spray_equipment=$1', [sprayEquipment])
  },
  getAll:  async (): Promise<QueryResult> => {
    return pool.query('SELECT * FROM spray_equipments')
  },
  updateOne: async (updateEquipment: string, sprayEquipment: string ): Promise<QueryResult> => {
    return pool.query('UPDATE spray_equipments SET spray_equipment=$2 WHERE spray_equipment=$1 RETURNING *', [updateEquipment, sprayEquipment])
  },
  createOne: async (sprayEquipment: string): Promise<QueryResult> => {
    return pool.query('INSERT INTO spray_equipments(spray_equipment) values ($1) RETURNING *', [sprayEquipment])
  },
  deleteOne: async (sprayEquipment: string): Promise<QueryResult> => {
    return pool.query('DELETE FROM spray_equipments WHERE spray_equipment=$1', [sprayEquipment])
  }
}

export default EquipmentsTable