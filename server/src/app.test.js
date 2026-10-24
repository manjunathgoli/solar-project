import { afterEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createDatabase } from './db/database.js';
import { createApp } from './app.js';

let database;
afterEach(() => { if (database?.open) database.close(); });
function app() {
  database = createDatabase(':memory:');
  return createApp(database);
}
describe('API', () => {
  it('lists seeded products with pagination', async () => {
    const response = await request(app()).get('/api/products?limit=2');
    expect(response.status).toBe(200);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.total).toBeGreaterThanOrEqual(16);
  });
  it('validates and stores a quote', async () => {
    const response = await request(app()).post('/api/quotes').send({
      propertyType: 'Residential', monthlyBill: 5000, roofType: 'Concrete', roofArea: 80,
      location: 'Pune', name: 'Asha Rao', email: 'asha@example.com', phone: '+919876543210',
    });
    expect(response.status).toBe(201);
    expect(response.body.reference).toMatch(/^SNQ-/);
  });
  it('validates chat input before any OpenAI call', async () => {
    const response = await request(app()).post('/api/chat').send({ messages: [{ role: 'user', content: 'x'.repeat(1001) }] });
    expect(response.status).toBe(400);
  });
  it('decrements stock transactionally and aggregates duplicate cart lines', async () => {
    const server = app();
    const stockBefore = database.prepare('SELECT stock FROM products WHERE id=1').get().stock;
    const details = { name: 'Test Customer', email: 'test@example.com', phone: '+919876543210', address: '12 Solar Road', city: 'Pune', state: 'Maharashtra', pincode: '411001' };
    const order = await request(server).post('/api/orders').send({ ...details, items: [{ productId: 1, quantity: 1 }, { productId: 1, quantity: 1 }] });
    expect(order.status).toBe(201);
    expect(database.prepare('SELECT stock FROM products WHERE id=1').get().stock).toBe(stockBefore - 2);
    expect(database.prepare('SELECT COUNT(*) AS count FROM order_items WHERE order_id=?').get(order.body.id).count).toBe(1);

    const rejected = await request(server).post('/api/orders').send({ ...details, items: [{ productId: 1, quantity: 20 }, { productId: 1, quantity: 20 }] });
    expect(rejected.status).toBe(409);
    expect(database.prepare('SELECT stock FROM products WHERE id=1').get().stock).toBe(stockBefore - 2);
    expect(database.prepare('SELECT COUNT(*) AS count FROM orders').get().count).toBe(1);
  });
});
