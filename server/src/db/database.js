import Database from 'better-sqlite3';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seedDatabase } from './seed-data.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = process.env.SOLAR_DATA_DIR
  || (process.env.VERCEL ? path.join(os.tmpdir(), 'sunnova-solar') : path.resolve(here, '../../data'));
fs.mkdirSync(dataDir, { recursive: true });

export function createDatabase(file = path.join(dataDir, 'solar.db')) {
  const db = new Database(file);
  db.pragma('foreign_keys = ON');
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL,
      description TEXT NOT NULL, price INTEGER NOT NULL, rating REAL NOT NULL,
      stock INTEGER NOT NULL, image TEXT NOT NULL, wattage TEXT,
      efficiency TEXT, warranty TEXT, specs TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name TEXT NOT NULL,
      email TEXT NOT NULL, phone TEXT NOT NULL, address TEXT NOT NULL,
      city TEXT NOT NULL, state TEXT NOT NULL, pincode TEXT NOT NULL,
      subtotal INTEGER NOT NULL, gst INTEGER NOT NULL, total INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'Confirmed', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT, order_id INTEGER NOT NULL REFERENCES orders(id),
      product_id INTEGER NOT NULL REFERENCES products(id), quantity INTEGER NOT NULL,
      unit_price INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT, property_type TEXT NOT NULL, monthly_bill INTEGER NOT NULL,
      roof_type TEXT NOT NULL, roof_area REAL NOT NULL, location TEXT NOT NULL,
      name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, notes TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'New', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL,
      subject TEXT NOT NULL, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY, title TEXT NOT NULL, location TEXT NOT NULL,
      capacity REAL NOT NULL, type TEXT NOT NULL, image TEXT NOT NULL, description TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS blog (
      id INTEGER PRIMARY KEY, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL,
      excerpt TEXT NOT NULL, content TEXT NOT NULL, category TEXT NOT NULL,
      image TEXT NOT NULL, published_at TEXT NOT NULL, read_time TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY, category TEXT NOT NULL, question TEXT NOT NULL, answer TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY, name TEXT NOT NULL, location TEXT NOT NULL,
      quote TEXT NOT NULL, rating INTEGER NOT NULL, system TEXT NOT NULL
    );
  `);
  seedDatabase(db);
  return db;
}

export const db = createDatabase();
