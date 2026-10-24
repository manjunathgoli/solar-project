import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './db/database.js';
import { createApp } from './app.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../');
dotenv.config({ path: path.join(rootDir, '.env') });

const port = Number(process.env.PORT || 5000);
createApp(db).listen(port, () => console.log(JSON.stringify({ level: 'info', message: `SunNova API listening on ${port}` })));
