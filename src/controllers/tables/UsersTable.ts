import { pool } from "db"
import { QueryResult } from "pg"


// ---------- USERS TABLE CONTROLLER ----------- //
const UsersTable = {
  getOne: async (username: string): Promise<QueryResult> => {
    return pool.query('SELECT username, email, user_role FROM users WHERE username=$1', [username])
  },
  getAll:  async (): Promise<QueryResult> => {
    return pool.query('SELECT username, email, user_role FROM users')
  },
  updatePassword: async (password: string, username: string): Promise<QueryResult> => {
    return pool.query('UPDATE users SET password=$1 WHERE username=$2 RETURNING username, email, user_role', [password, username])
  },
  updateRole: async (role: string, username: string): Promise<QueryResult> => {
    return pool.query('UPDATE users SET user_role=$1 WHERE username=$2 RETURNING username, email, user_role', [role, username])
  },
  createOne: async (userArray: string[]): Promise<QueryResult> => {
    return pool.query('INSERT INTO users(username, email, user_role, password) values ($1, $2, $3, $4) RETURNING username, email, user_role', [...userArray])
  },
  deleteOne: async (username: string): Promise<QueryResult> => {
    return pool.query('DELETE FROM users WHERE username=$1', [username])
  }
}

export default UsersTable