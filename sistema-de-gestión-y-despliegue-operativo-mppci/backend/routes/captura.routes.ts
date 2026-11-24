import { Router } from 'express';
import { SqliteStore } from '../db/sqliteStore';
import crypto from 'node:crypto';

export const capturaRouter = Router();

/**
 * Guarda una captura semanal en SQLite garantizando idempotencia matemática
 */
capturaRouter.post('/captura/guardar', (req, res) => {
  try {
    const { semana, ano = 2026, enteId, usuarioId, payload, indicadores } = req.body;

    if (!semana || !enteId || !usuarioId) {
      return res.status(400).json({
        success: false,
        error: 'Los campos semana, enteId y usuarioId son estrictamente obligatorios.'
      });
    }

    const idempotencyKey = `${ano}-W${String(semana).padStart(2, '0')}-${enteId}`;
    const auditHash = crypto.createHash('sha256').update(JSON.stringify(payload || {})).digest('hex');

    const result = SqliteStore.saveCapturaSemanal({
      semana: Number(semana),
      ano: Number(ano),
      enteId,
      usuarioId,
      idempotencyKey,
      auditHash,
      payload: payload || {},
      indicadores: indicadores || []
    });

    res.json(result);
  } catch (error: any) {
    console.error('Error al guardar captura semanal:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
