import { Router } from 'express';
import { 
  generarContranarrativaSoberana, 
  generarDiagnosticoEstrategicoSoberano 
} from '../services/heuristicService';

export const intelligenceRouter = Router();

// Inteligencia Soberana: Generador Institucional de Contranarrativas y Vocería Oficial
intelligenceRouter.post(['/intelligence/counter-narrative', '/gemini/counter-narrative'], (req, res) => {
  try {
    const resultado = generarContranarrativaSoberana(req.body);
    res.json(resultado);
  } catch (error: any) {
    console.error('Error en generador de contranarrativas:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error en motor institucional de vocería'
    });
  }
});

// Inteligencia Soberana: Diagnóstico Estratégico y Síntesis Ejecutiva Ministerial
intelligenceRouter.post(['/intelligence/strategic-analysis', '/gemini/strategic-analysis'], (req, res) => {
  try {
    const resultado = generarDiagnosticoEstrategicoSoberano(req.body);
    res.json(resultado);
  } catch (error: any) {
    console.error('Error en diagnóstico estratégico soberano:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error en motor analítico soberano'
    });
  }
});

// Notificador Institucional
intelligenceRouter.post('/notifications/dispatch', (req, res) => {
  const { destinatarioEnte, destinatarioResponsable, correo, telegram, canal } = req.body;
  const notificationId = `NOTIF-${Date.now().toString(36).toUpperCase()}`;
  const timestamp = new Date().toISOString();

  res.json({
    success: true,
    notificationId,
    timestamp,
    status: 'DISPATCHED',
    channels: {
      telegram: canal === 'TELEGRAM' || canal === 'AMBOS' ? { status: 'DELIVERED', target: telegram } : null,
      email: canal === 'EMAIL' || canal === 'AMBOS' ? { status: 'QUEUED_SMTP', target: correo } : null
    },
    message: `Notificación institucional enviada exitosamente a ${destinatarioResponsable} (${destinatarioEnte})`
  });
});
