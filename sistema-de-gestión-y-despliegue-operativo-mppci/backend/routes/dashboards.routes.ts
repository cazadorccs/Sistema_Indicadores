import { Router } from 'express';
import { DashboardsService } from '../services/dashboardsService';

export const dashboardsRouter = Router();

// Sincronización Central
dashboardsRouter.post('/dashboards/sync', (req, res) => {
  try {
    const { report, criticalTowers, opinionAlerts } = req.body;
    if (!report) {
      return res.status(400).json({ success: false, error: 'Reporte requerido para sincronización' });
    }
    const result = DashboardsService.syncDashboards(report, criticalTowers, opinionAlerts);
    res.json(result);
  } catch (error: any) {
    console.error('Error en sync de dashboards:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Ciberdefensa
dashboardsRouter.get('/dashboards/ciberdefensa', (req, res) => {
  res.json(DashboardsService.getCiberdefensa());
});

dashboardsRouter.post('/dashboards/ciberdefensa/amenaza', (req, res) => {
  const amenaza = DashboardsService.registrarAmenaza(req.body);
  res.json({
    success: true,
    amenaza,
    mensaje: `Amenaza ${amenaza.id} registrada por Sala de Monitoreo (Rol R).`
  });
});

dashboardsRouter.post('/dashboards/ciberdefensa/aprobar-contranarrativa', (req, res) => {
  const { amenazaId, contranarrativa, aprobadorNombre, cargo } = req.body;
  const result = DashboardsService.aprobarContranarrativa(amenazaId, contranarrativa, aprobadorNombre, cargo);
  if (!result) {
    return res.status(404).json({ success: false, error: 'Amenaza no encontrada' });
  }
  res.json(result);
});

dashboardsRouter.post('/dashboards/ciberdefensa/neutralizar', (req, res) => {
  const { amenazaId } = req.body;
  const result = DashboardsService.neutralizarAmenaza(amenazaId);
  res.json(result);
});

// NOC
dashboardsRouter.get('/dashboards/noc', (req, res) => {
  res.json(DashboardsService.getNoc());
});

dashboardsRouter.post('/dashboards/noc/incidencia', (req, res) => {
  const result = DashboardsService.reportarIncidenciaNoc(req.body);
  res.json(result);
});

// Digital
dashboardsRouter.get('/dashboards/digital', (req, res) => {
  res.json(DashboardsService.getDigital());
});

// Medios
dashboardsRouter.get('/dashboards/medios', (req, res) => {
  res.json(DashboardsService.getMedios());
});

dashboardsRouter.post('/dashboards/medios/registrar-produccion', (req, res) => {
  const { tipo, cantidad, enteEmisor } = req.body;
  const result = DashboardsService.registrarProduccionMedios(tipo, cantidad, enteEmisor);
  res.json({
    success: true,
    item: result.item,
    totalHoy: result.totalHoy,
    mensaje: `Producción de ${result.item?.etiqueta || tipo} actualizada exitosamente.`
  });
});

// C-Level
dashboardsRouter.get('/dashboards/c-level', (req, res) => {
  res.json(DashboardsService.getCLevel());
});

dashboardsRouter.post('/dashboards/c-level/refrendo-ministerial', (req, res) => {
  const result = DashboardsService.refrendoMinisterial(req.body);
  res.json(result);
});

dashboardsRouter.get('/dashboards/c-level/sellos-historicos', (req, res) => {
  res.json(DashboardsService.getSellosHistoricos());
});
