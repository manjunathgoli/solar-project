import 'dotenv/config';
import { db } from './database.js';
console.log(`Seed complete. Products: ${db.prepare('SELECT COUNT(*) AS n FROM products').get().n}`);
