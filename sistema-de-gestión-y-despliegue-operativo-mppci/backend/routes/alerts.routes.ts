import { Router } from 'express';
import { 
  getImpactIncidents, 
  evaluarTriggersAlgoritmicos, 
  ackIncident, 
  resolveIncident, 
  testDispatchTrigger 
} from '../services/alertsService';

export const alertsRouter = Router();

alertsRouter.get('/alerts/active-incidents', (req, res) => {
  const { estado, categoria, severidad } = req.query as Record<string, string>;
  const result = getImpactIncidents({ estado, categoria, severidad });
  res.json(result);
});

alertsRouter.post('/alerts/evaluate-triggers', (req, res) => {
  try {
    const metrics = req.body || {};
    const result = evaluarTriggersAlgoritmicos(metrics);
    res.json({
      success: true,
      ...result
    });
  } catch (error: any) {
    console.error('Error al evaluar triggers algorítmicos:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

alertsRouter.post('/alerts/ack', (req, res) => {
  const { incidentId, ackPor } = req.body;
  const incident = ackIncident(incidentId, ackPor);

  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incidente no encontrado' });
  }

  res.json({
    success: true,
    message: `Incidente ${incidentId} reconocido (ACK) por ${incident.ackPor}.`,
    incident
  });
});

alertsRouter.post('/alerts/resolve', (req, res) => {
  const { incidentId, resueltoPor, notasResolucion } = req.body;
  const incident = resolveIncident(incidentId, resueltoPor, notasResolucion);

  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incidente no encontrado' });
  }

  res.json({
    success: true,
    message: `Incidente ${incidentId} marcado como RESUELTO.`,
    incident
  });
});

alertsRouter.post('/alerts/test-dispatch', (req, res) => {
  const { triggerCode } = req.body;
  const result = testDispatchTrigger(triggerCode);

  if (!result) {
    return res.status(400).json({
      success: false,
      message: `Código de trigger desconocido: ${triggerCode}.`
    });
  }

  res.json({
    success: true,
    message: `Prueba de trigger ${triggerCode} despachada a canales [${result.rule.canalesDefault.join(', ')}] para roles [${result.rule.destinatariosDefault.join(', ')}]`,
    incident: result.incident
  });
});
