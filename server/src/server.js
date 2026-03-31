import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { initDb } from './db.js';
import requestsRouter from './routes/requests.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

// Security
app.use(helmet({ contentSecurityPolicy: isProd ? undefined : false }));
app.use(cors({
  origin: isProd ? false : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests' }
});
app.use('/api/', limiter);

// Logging
app.use(morgan(isProd ? 'combined' : 'dev'));

// Body parsing
app.use(express.json({ limit: '32kb' }));

// API routes
app.get('/api/health', (_, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});
app.use('/api/requests', requestsRouter);

// Serve static client in production
if (isProd) {
  const clientPath = path.join(__dirname, '..', '..', 'client', 'dist');
  app.use(express.static(clientPath));
  app.get('*', (_, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
