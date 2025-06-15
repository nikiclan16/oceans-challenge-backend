import { pool } from '../utils/db';

interface OrderProductInput {
  productId: number;
}

export const createOrder = async (products: OrderProductInput[]) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const productIds = products.map(p => p.productId);
    const productRows = await client.query(
      'SELECT id, price FROM products WHERE id = ANY($1::int[])',
      [productIds]
    );

    const total = productRows.rows.reduce((sum, prod) => sum + Number(prod.price), 0);

    const orderInsert = await client.query(
      'INSERT INTO orders (total) VALUES ($1) RETURNING *',
      [total]
    );

    const orderId = orderInsert.rows[0].id;

    for (const p of productIds) {
      await client.query(
        'INSERT INTO order_products (order_id, product_id) VALUES ($1, $2)',
        [orderId, p]
      );
    }

    await client.query('COMMIT');
    return orderInsert.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const getAllOrders = async () => {
  const result = await pool.query(`
    SELECT 
      o.id AS order_id,
      o.created_at,
      o.total,
      json_agg(json_build_object('id', p.id, 'name', p.name, 'price', p.price)) AS products
    FROM orders o
    JOIN order_products op ON op.order_id = o.id
    JOIN products p ON p.id = op.product_id
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `);
  return result.rows;
};

export const deleteOrder = async (orderId: number) => {
  await pool.query('DELETE FROM order_products WHERE order_id = $1', [orderId]);
  const res = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [orderId]);
  return res.rows[0];
};