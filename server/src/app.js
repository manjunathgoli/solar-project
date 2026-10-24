import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { db } from './db/database.js';
import { createRouter } from './routes/api.js';
import { errorHandler, notFound } from './middleware/errors.js';

export function createApp(database) {
  const app = express();
  const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': ["'self'", 'data:', 'https://images.unsplash.com'],
      },
    },
  }));
  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json({ limit: '32kb' }));
  app.use(morgan((tokens, req, res) => JSON.stringify({
    method: tokens.method(req, res),
    path: tokens.url(req, res),
    status: Number(tokens.status(req, res)),
    responseTimeMs: Number(tokens['response-time'](req, res)),
    contentLength: tokens.res(req, res, 'content-length'),
  })));
  app.use('/api', createRouter(database));
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

export default createApp(db);
