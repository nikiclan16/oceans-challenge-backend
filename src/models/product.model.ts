import { pool } from '../utils/db';

export const getAllProducts = async () => {
  const result = await pool.query('SELECT * FROM products ORDER BY id');
  return result.rows;
};

export const createProduct = async (name: string, price: number) => {
  const result = await pool.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price]
  );
  return result.rows[0];
};
