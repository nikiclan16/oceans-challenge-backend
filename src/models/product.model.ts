import { pool } from "../utils/db";

export const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM products ORDER BY id");
  return result.rows;
};

export const createProduct = async (name: string, price: number) => {
  const result = await pool.query(
    "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
    [name, price]
  );
  return result.rows[0];
};

export const verifyProduct = async (name: string) => {
  const result = await pool.query("SELECT * FROM products WHERE name = $1", [
    name,
  ]);
  return result;
};

export const editProduct = async (id: number, name: string, price: number) => {
  const result = await pool.query(
    "UPDATE products SET name=$2, price=$3 WHERE id=$1 RETURNING *",
    [id, name, price]
  );
  return result.rows[0];
};

export const deleteProduct = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const getPaginatedProducts = async (limit: number, offset: number) => {
  const products = await pool.query(
    "SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  const count = await pool.query("SELECT COUNT(*) FROM products");
  return {
    data: products.rows,
    total: parseInt(count.rows[0].count),
  };
};
