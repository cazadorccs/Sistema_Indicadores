import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    system: 'Sistema de Inteligencia de Datos MPPCI (SGDO-VSCC)',
    version: '3.5.0-2026',
    motorInteligencia: 'Soberano / Heurístico Local',
    persistencia: 'SQLite Soberano (WAL Mode)'
  });
});
