import { 
  OFFICIAL_TRIGGER_DEFINITIONS, 
  ImpactAlertIncident, 
  TriggerEvaluationMetrics 
} from '../../src/types/alertsImpactTypes';

let impactIncidentsStore: ImpactAlertIncident[] = [
  {
    id: 'INC-2026-TRG-01',
    triggerCode: 'TRG_DA01_VIRAL',
    categoria: 'OPINION_REPUTACION',
    severidad: 'ALTO',
    titulo: 'Crecimiento Inusual de Menciones Tóxicas en Eje Central',
    descripcion: 'Disparo del indicador DA-01 (+28.4% en 45 min) asociado a matriz de desinformación sobre el Sistema Eléctrico Nacional.',
    indicadorCodigo: 'DA-01',
    valorActual: '+28.4% / hora',
    umbralDisparo: '> 20% / hora',
    enteResponsable: 'Sala Situacional y Ciberdefensa',
    destinatariosRaci: ['VICEMINISTRO', 'DIRECTOR_OPERACIONES'],
    canalesNotificados: ['PUSH_WEB', 'TELEGRAM'],
    timestampDisparo: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    estado: 'ACTIVA',
    accionRequerida: 'Activar célula de análisis de sentimiento y alistar piezas de respuesta inmediata.',
    escalado: false
  },
  {
    id: 'INC-2026-TRG-02',
    triggerCode: 'TRG_RTV01_TDA',
    categoria: 'INFRAESTRUCTURA_CRITICA',
    severidad: 'CRITICO',
    titulo: 'Falla de Respaldo Eléctrico en Estación TDA Mecores (Lara)',
    descripcion: 'Operatividad TDA zonal cae a 92.4% por corte comercial prolongado y retraso en arranque de motogenerador.',
    indicadorCodigo: 'RTV-001',
    valorActual: '92.4%',
    umbralDisparo: '< 95.0%',
    enteResponsable: 'REDTV',
    destinatariosRaci: ['DIRECTOR_OPERACIONES', 'VICEMINISTRO'],
    canalesNotificados: ['SMS', 'PUSH_WEB', 'TELEGRAM'],
    timestampDisparo: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    estado: 'EN_GESTION',
    accionRequerida: 'Despachar cuadrillas técnicas con apoyo de CORPOELEC y conmutar a redundancia.',
    ackPor: 'Ing. Carlos Mendoza (REDTV NOC)',
    ackTimestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    escalado: true
  }
];

export function getImpactIncidents(filters?: { estado?: string; categoria?: string; severidad?: string }) {
  let filtered = [...impactIncidentsStore];
  if (filters?.estado) filtered = filtered.filter(i => i.estado === filters.estado);
  if (filters?.categoria) filtered = filtered.filter(i => i.categoria === filters.categoria);
  if (filters?.severidad) filtered = filtered.filter(i => i.severidad === filters.severidad);

  return {
    success: true,
    total: filtered.length,
    activas: impactIncidentsStore.filter(i => i.estado === 'ACTIVA').length,
    enGestion: impactIncidentsStore.filter(i => i.estado === 'EN_GESTION').length,
    resueltas: impactIncidentsStore.filter(i => i.estado === 'RESUELTA').length,
    incidents: filtered
  };
}

export function evaluarTriggersAlgoritmicos(metrics: TriggerEvaluationMetrics) {
  const newIncidents: ImpactAlertIncident[] = [];
  const escalatedIncidents: ImpactAlertIncident[] = [];
  const now = new Date();
  const ESCALATION_MS = 15 * 60 * 1000;

  OFFICIAL_TRIGGER_DEFINITIONS.forEach(rule => {
    let fired = false;
    let valorActualStr = '';
    let descripcionExtra = '';

    switch (rule.codigo) {
      case 'TRG_DA01_VIRAL':
        if (metrics.da01IncrementoPorcentajeHora !== undefined && metrics.da01IncrementoPorcentajeHora > 20) {
          fired = true;
          valorActualStr = `+${metrics.da01IncrementoPorcentajeHora.toFixed(1)}% / hora`;
          descripcionExtra = 'Detección de viralización anómala de narrativa de confrontación en redes sociales.';
        }
        break;

      case 'TRG_TRMD_TIMEOUT':
        if (metrics.trmdMinutosSinRespuesta !== undefined && metrics.trmdMinutosSinRespuesta > 120) {
          fired = true;
          valorActualStr = `${metrics.trmdMinutosSinRespuesta} min (${(metrics.trmdMinutosSinRespuesta / 60).toFixed(1)} h)`;
          descripcionExtra = 'Se ha superado el tiempo máximo normativo de 2 horas sin emisión de vocería técnica.';
        }
        break;

      case 'TRG_ID09_SENT':
        if (metrics.id09SentimientoPositivoPorcentaje !== undefined && metrics.id09SentimientoPositivoPorcentaje < 30) {
          fired = true;
          valorActualStr = `${metrics.id09SentimientoPositivoPorcentaje.toFixed(1)}% favorable`;
          descripcionExtra = `El sentimiento digital favorable en evento ${metrics.eventoOficialNombre || 'oficial'} cayó por debajo del 30%.`;
        }
        break;

      case 'TRG_RTV01_TDA':
        if (metrics.rtv01OperatividadTdaNacionalPorcentaje !== undefined && metrics.rtv01OperatividadTdaNacionalPorcentaje < 95) {
          fired = true;
          valorActualStr = `${metrics.rtv01OperatividadTdaNacionalPorcentaje.toFixed(1)}%`;
          descripcionExtra = `Caída de operatividad nacional TDA o indisponibilidad en estación ${metrics.nodoTdaAfectado || 'regional'}.`;
        }
        break;

      case 'TRG_RTV09_SAT':
        if (metrics.rtv09MicrocortesBandaKu !== undefined && metrics.rtv09MicrocortesBandaKu > 3) {
          fired = true;
          valorActualStr = `${metrics.rtv09MicrocortesBandaKu} micro-cortes registrados`;
          descripcionExtra = 'Inestabilidad persistente en portadora satelital de subida / bajada Banda Ku.';
        }
        break;

      case 'TRG_TMR_ESCALA':
        if (metrics.tmrHorasSinSolucion !== undefined && metrics.tmrHorasSinSolucion > 4) {
          fired = true;
          valorActualStr = `${metrics.tmrHorasSinSolucion.toFixed(1)} horas continuas`;
          descripcionExtra = 'Incidencia mayor de transmisión o planta externa sin restablecimiento en 4 horas.';
        }
        break;

      case 'TRG_STR01_LIVE':
        if (metrics.str01PcvIncrementoVsHistoricoPorcentaje !== undefined && metrics.str01PcvIncrementoVsHistoricoPorcentaje > 50) {
          fired = true;
          valorActualStr = `+${metrics.str01PcvIncrementoVsHistoricoPorcentaje.toFixed(1)}% vs promedio 30d`;
          descripcionExtra = 'Pico excepcional de concurrencia en transmisión streaming. Oportunidad de capitalización mediática.';
        }
        break;

      case 'TRG_RED_ENG':
        if (metrics.redEngTasaEngagementPorcentaje !== undefined && metrics.redEngTasaEngagementPorcentaje > 12) {
          fired = true;
          valorActualStr = `${metrics.redEngTasaEngagementPorcentaje.toFixed(1)}% engagement`;
          descripcionExtra = 'Contenido institucional supera barrera de viralidad orgánica positiva.';
        }
        break;

      case 'TRG_TV08_PASE_LOW':
        if (metrics.tv08PasesRegionCrisisPorTurno !== undefined && metrics.tv08PasesRegionCrisisPorTurno < 2) {
          fired = true;
          valorActualStr = `${metrics.tv08PasesRegionCrisisPorTurno} pases en turno`;
          descripcionExtra = `Déficit de despliegue informativo en zona de contingencia (${metrics.zonaCrisisNombre || 'Región Priorizada'}).`;
        }
        break;
    }

    if (fired) {
      const existing = impactIncidentsStore.find(
        inc => inc.triggerCode === rule.codigo && inc.estado !== 'RESUELTA'
      );

      if (existing) {
        const timeSinceDisparo = now.getTime() - new Date(existing.timestampDisparo).getTime();
        if (!existing.ackPor && timeSinceDisparo > ESCALATION_MS && !existing.escalado) {
          existing.escalado = true;
          escalatedIncidents.push(existing);
        }
        existing.valorActual = valorActualStr;
      } else {
        const nuevoIncidente: ImpactAlertIncident = {
          id: `INC-${now.getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
          triggerCode: rule.codigo,
          categoria: rule.categoria,
          severidad: rule.severidadDefault,
          titulo: rule.nombre,
          descripcion: descripcionExtra || rule.condicionTexto,
          indicadorCodigo: rule.indicador,
          valorActual: valorActualStr,
          umbralDisparo: rule.condicionTexto,
          enteResponsable: rule.enteAfectadoDefault,
          destinatariosRaci: rule.destinatariosDefault,
          canalesNotificados: rule.canalesDefault,
          timestampDisparo: now.toISOString(),
          estado: 'ACTIVA',
          accionRequerida: rule.accionSugerida,
          escalado: false
        };

        impactIncidentsStore.unshift(nuevoIncidente);
        newIncidents.push(nuevoIncidente);
      }
    }
  });

  return {
    newIncidents,
    escalatedIncidents,
    evaluatedAt: now.toISOString(),
    totalIncidentesActivos: impactIncidentsStore.filter(i => i.estado !== 'RESUELTA').length
  };
}

export function ackIncident(incidentId: string, ackPor?: string) {
  const incident = impactIncidentsStore.find(i => i.id === incidentId);
  if (!incident) return null;

  incident.estado = 'EN_GESTION';
  incident.ackPor = ackPor || 'Operador de Guardia VSCC';
  incident.ackTimestamp = new Date().toISOString();
  return incident;
}

export function resolveIncident(incidentId: string, resueltoPor?: string, notasResolucion?: string) {
  const incident = impactIncidentsStore.find(i => i.id === incidentId);
  if (!incident) return null;

  incident.estado = 'RESUELTA';
  incident.timestampResolucion = new Date().toISOString();
  if (notasResolucion) {
    incident.descripcion += ` | Resuelto: ${notasResolucion}`;
  }
  return incident;
}

export function testDispatchTrigger(triggerCode: string) {
  const rule = OFFICIAL_TRIGGER_DEFINITIONS.find(r => r.codigo === triggerCode);
  if (!rule) return null;

  const testIncident: ImpactAlertIncident = {
    id: `TEST-${Date.now().toString(36).toUpperCase()}`,
    triggerCode: rule.codigo,
    categoria: rule.categoria,
    severidad: rule.severidadDefault,
    titulo: `[PRUEBA DISPACHO] ${rule.nombre}`,
    descripcion: `Prueba controlada de envío multicanal: ${rule.condicionTexto}`,
    indicadorCodigo: rule.indicador,
    valorActual: 'VALOR_SIMULADO',
    umbralDisparo: rule.condicionTexto,
    enteResponsable: rule.enteAfectadoDefault,
    destinatariosRaci: rule.destinatariosDefault,
    canalesNotificados: rule.canalesDefault,
    timestampDisparo: new Date().toISOString(),
    estado: 'ACTIVA',
    accionRequerida: rule.accionSugerida,
    escalado: false
  };

  impactIncidentsStore.unshift(testIncident);
  return { rule, incident: testIncident };
}
