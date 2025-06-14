import { pool } from '../utils/db';

export const createUser = async (username: string, passwordHash: string, role: string) => {
  const result = await pool.query(
    'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
    [username, passwordHash, role]
  );
  return result.rows[0];
};

export const findUserByUsername = async (username: string) => {
  const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return res.rows[0];
};
