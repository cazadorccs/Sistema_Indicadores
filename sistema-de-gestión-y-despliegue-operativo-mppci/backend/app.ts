import express from 'express';
import { healthRouter } from './routes/health.routes';
import { intelligenceRouter } from './routes/intelligence.routes';
import { alertsRouter } from './routes/alerts.routes';
import { dashboardsRouter } from './routes/dashboards.routes';
import { capturaRouter } from './routes/captura.routes';
import { authRouter } from './routes/auth.routes';

export const app = express();

// Middlewares estándar y cabeceras de seguridad soberanas
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(), geolocation=()');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');

  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Montaje de rutas modularizadas bajo /api y /api/v1
app.use('/api', healthRouter);
app.use('/api', authRouter);
app.use('/api', intelligenceRouter);
app.use('/api', alertsRouter);
app.use('/api', dashboardsRouter);
app.use('/api', capturaRouter);

// Compatibilidad formal /api/v1
app.use('/api/v1', healthRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', intelligenceRouter);
app.use('/api/v1', alertsRouter);
app.use('/api/v1', dashboardsRouter);
app.use('/api/v1', capturaRouter);
