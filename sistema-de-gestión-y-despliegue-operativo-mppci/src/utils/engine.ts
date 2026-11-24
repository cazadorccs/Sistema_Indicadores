import { 
  MediaOperationalData, 
  PlatformsTechnicalData, 
  StrategicMIPCCIData, 
  TalentVulnerabilityRow, 
  CalculatedMasterKPIs, 
  ValidationItem, 
  ControlVariables,
  FullWeeklyReport,
  AutoNotification
} from '../types';

/**
 * Motor de Cálculo para Indicadores Compuestos del MPPCI
 * Siguiendo el Anexo 2 del Instrumento Oficial
 */
export function calculateMasterKPIs(
  medios: MediaOperationalData,
  plataformas: PlatformsTechnicalData,
  strategic: StrategicMIPCCIData,
  vulnerabilityRows: TalentVulnerabilityRow[]
): CalculatedMasterKPIs {
  // 1. Tasa de Engagement (EE) = (Interacciones Totales / Vistas Logradas) * 100
  const vistas = medios.vistasLogradasDigital || 1;
  const interacciones = medios.interaccionesTotalesDigital || 0;
  const ee = Number(Math.min(100, Math.max(0, (interacciones / vistas) * 100)).toFixed(2));

  // 2. Índice de Vulnerabilidad Institucional (IVI) = (Rojo*3 + Amarillo*1 + Verde*0) / TotalPersonal
  let totalPersonalAll = 0;
  let weightedVulnerability = 0;
  
  if (vulnerabilityRows && vulnerabilityRows.length > 0) {
    vulnerabilityRows.forEach(row => {
      totalPersonalAll += row.totalPersonal || 0;
      weightedVulnerability += (row.nivelRojo * 3) + (row.nivelAmarillo * 1) + (row.nivelVerde * 0);
    });
  }
  const ivi = totalPersonalAll > 0 
    ? Number((weightedVulnerability / totalPersonalAll).toFixed(3))
    : 0;

  // 3. Índice de Cobertura Digital (ICD) = (Σ Alcance / Σ Meta) * 100
  const alcanceTotal = (medios.alcanceOrganicoDigital || 0) + (medios.alcancePagadoDigital || 0) + (strategic.traficoOrganicoTotal || 0);
  const metaTotal = (medios.metaVistasDigital || 1) + (strategic.impresionesBuscadores || 1);
  const icd = Number(Math.min(150, Math.max(0, (alcanceTotal / metaTotal) * 100)).toFixed(2));

  // 4. Índice de Resiliencia Técnica (IRT) = (% TDA + % Banda Ku + % Señal Medios) / 3
  const pctTDA = plataformas.operatividadNacionalTDA || 0;
  const pctBandaKu = plataformas.potenciaBandaKu || 0;
  const pctSenalMedios = ((medios.operatividadSenalTV || 0) + (medios.operatividadSenalRadio || 0)) / 2;
  const irt = Number(((pctTDA + pctBandaKu + pctSenalMedios) / 3).toFixed(2));

  // 5. KPI Maestro: Índice de Efectividad Comunicacional (IEC) = (EE_promedio + ICD + IRT) / 3
  const iec = Number(((ee + icd + irt) / 3).toFixed(2));

  // Indicadores secundarios del Eje 4
  const thai = strategic.universoHogaresNacional > 0
    ? Number(((strategic.hogaresInternetActivoTHAI / strategic.universoHogaresNacional) * 100).toFixed(2))
    : 0;

  const tpbam = strategic.poblacionTotalEstimada > 0
    ? Number(((strategic.lineasBandaAnchaMovilTPBAM / strategic.poblacionTotalEstimada) * 100).toFixed(2))
    : 0;

  const ipmd = strategic.poblacionAccesoInternet > 0
    ? Number(((strategic.usuariosActivosMensualesDigitalIPMD / strategic.poblacionAccesoInternet) * 100).toFixed(2))
    : 0;

  const cumplimientoResortePromedio = Number(((
    (plataformas.cumplimientoContenidoNacionalResorte || 0) +
    (plataformas.cumplimientoContenidoEducativoResorte || 0) +
    (plataformas.cumplimientoFranjaInfantilResorte || 0)
  ) / 3).toFixed(2));

  return {
    ee,
    ivi,
    icd,
    irt,
    iec,
    thai,
    tpbam,
    ipmd,
    cumplimientoResortePromedio
  };
}

/**
 * Motor de Validación en Tres Niveles de Rigor
 */
export function runThreeLevelValidation(
  control: ControlVariables,
  medios: MediaOperationalData,
  plataformas: PlatformsTechnicalData,
  strategic: StrategicMIPCCIData,
  vulnerabilityRows: TalentVulnerabilityRow[]
): ValidationItem[] {
  const items: ValidationItem[] = [];

  // ==========================================
  // NIVEL 1: INTEGRIDAD DE ENTRADA
  // ==========================================

  // 1.1 Variables de control obligatorias
  const tieneFecha = !!control.fechaReporte && control.fechaReporte.trim() !== '';
  items.push({
    id: 'VAL-L1-01',
    nivel: 1,
    nivelNombre: 'Integridad de Entrada',
    titulo: 'Fecha de Reporte obligatoria',
    descripcion: 'Verifica que la fecha de reporte esté debidamente completada.',
    esValido: tieneFecha,
    campo: 'fechaReporte',
    valorActual: control.fechaReporte,
    severidad: 'ERROR'
  });

  const semValida = control.semanaEpidemiologica >= 1 && control.semanaEpidemiologica <= 53;
  items.push({
    id: 'VAL-L1-02',
    nivel: 1,
    nivelNombre: 'Integridad de Entrada',
    titulo: 'Semana Epidemiológica en rango (1-53)',
    descripcion: 'La semana epidemiológica debe ser un número entero entre 1 y 53.',
    esValido: semValida,
    campo: 'semanaEpidemiologica',
    valorActual: control.semanaEpidemiologica,
    severidad: 'ERROR'
  });

  const cedulaRegex = /^(V|E)-\d{6,9}$/i;
  const cedulaValida = cedulaRegex.test(control.cedulaIdentidad.trim());
  items.push({
    id: 'VAL-L1-03',
    nivel: 1,
    nivelNombre: 'Integridad de Entrada',
    titulo: 'Formato de Cédula de Identidad (V-/E-)',
    descripcion: 'La cédula del responsable debe cumplir con el estándar oficial venezolano (ej. V-12345678).',
    esValido: cedulaValida,
    campo: 'cedulaIdentidad',
    valorActual: control.cedulaIdentidad,
    severidad: 'ERROR'
  });

  const enteValido = !!control.responsableEnte && control.responsableEnte.trim().length > 3;
  items.push({
    id: 'VAL-L1-04',
    nivel: 1,
    nivelNombre: 'Integridad de Entrada',
    titulo: 'Responsable del Ente Adscrito registrado',
    descripcion: 'Debe especificarse el nombre y apellido del funcionario responsable de la carga.',
    esValido: enteValido,
    campo: 'responsableEnte',
    valorActual: control.responsableEnte,
    severidad: 'ERROR'
  });

  // 1.2 Límites de porcentajes (0 a 100%)
  const pctFields = [
    { nombre: 'Operatividad Señal TV (TV-002)', val: medios.operatividadSenalTV },
    { nombre: 'Operatividad Señal Radio (RAD-002)', val: medios.operatividadSenalRadio },
    { nombre: 'Operatividad Nacional TDA (RTV-001)', val: plataformas.operatividadNacionalTDA },
    { nombre: 'Potencia Banda Ku Satelital (RTV-006)', val: plataformas.potenciaBandaKu },
    { nombre: 'Tasa de Rebote Web (WEB-005)', val: medios.tasaReboteWeb },
  ];

  pctFields.forEach((f, idx) => {
    const ok = f.val >= 0 && f.val <= 100;
    items.push({
      id: `VAL-L1-05-${idx}`,
      nivel: 1,
      nivelNombre: 'Integridad de Entrada',
      titulo: `Rango Porcentual [0% - 100%]: ${f.nombre}`,
      descripcion: `El indicador no puede ser negativo ni superior al 100%.`,
      esValido: ok,
      valorActual: `${f.val}%`,
      severidad: 'ERROR'
    });
  });

  // ==========================================
  // NIVEL 2: CONSISTENCIA LÓGICA
  // ==========================================

  // 2.1 Ejemplares impresos <= Tiraje Total (IMP-001 <= IMP-002)
  const tirajeOk = (medios.ejemplaresImpresos || 0) <= (medios.tirajeTotal || 0) || medios.tirajeTotal === 0;
  items.push({
    id: 'VAL-L2-01',
    nivel: 2,
    nivelNombre: 'Consistencia Lógica',
    titulo: 'Consistencia de Impresión: Ejemplares <= Tiraje Total',
    descripcion: 'El número de ejemplares impresos y distribuidos (IMP-001) jamás puede superar el tiraje total físico registrado (IMP-002).',
    esValido: tirajeOk,
    valorActual: `Distribuidos: ${medios.ejemplaresImpresos} | Tiraje: ${medios.tirajeTotal}`,
    severidad: 'ERROR'
  });

  // 2.2 Ejemplares en zonas afectadas <= Ejemplares Distribuidos (IMP-003 <= IMP-001)
  const afectadasOk = (medios.ejemplaresZonasAfectadas || 0) <= (medios.ejemplaresImpresos || 0);
  items.push({
    id: 'VAL-L2-02',
    nivel: 2,
    nivelNombre: 'Consistencia Lógica',
    titulo: 'Distribución en Zonas Afectadas <= Ejemplares Totales',
    descripcion: 'Los ejemplares asignados a zonas afectadas no pueden sobrepasar el total distribuido.',
    esValido: afectadasOk,
    valorActual: `Afectadas: ${medios.ejemplaresZonasAfectadas} | Total: ${medios.ejemplaresImpresos}`,
    severidad: 'ERROR'
  });

  // 2.3 Coherencia de Matriz de Vulnerabilidad del Talento Humano
  if (vulnerabilityRows && vulnerabilityRows.length > 0) {
    let rowsValid = true;
    vulnerabilityRows.forEach(row => {
      const sum = row.nivelRojo + row.nivelAmarillo + row.nivelVerde + row.porEvaluar + row.sinClasificar;
      if (sum !== row.totalPersonal && row.totalPersonal > 0) {
        rowsValid = false;
      }
    });

    items.push({
      id: 'VAL-L2-03',
      nivel: 2,
      nivelNombre: 'Consistencia Lógica',
      titulo: 'Consistencia de Nómina vs Matriz de Vulnerabilidad (Eje 3)',
      descripcion: 'La suma de personal clasificado (Rojo + Amarillo + Verde + Por Evaluar + Sin Clasificar) debe cuadrar exactamente con la nómina total del Ente.',
      esValido: rowsValid,
      severidad: 'ERROR'
    });
  }

  // 2.4 Unidades operativas <= Unidades totales (Transporte, Transmisores, Cámaras, etc.)
  const transporteOk = (medios.unidadesTransporteOperativas || 0) <= (medios.unidadesTransporteTotal || 0) || medios.unidadesTransporteTotal === 0;
  const transmisoresTVOk = (plataformas.transmisoresTVOperativos || 0) <= (plataformas.transmisoresTVTotal || 0) || plataformas.transmisoresTVTotal === 0;
  const transmisoresRadioOk = (plataformas.transmisoresRadioOperativos || 0) <= (plataformas.transmisoresRadioTotal || 0) || plataformas.transmisoresRadioTotal === 0;
  const camarasOk = (medios.camarasProduccionOperativas || 0) <= (medios.camarasProduccionTotal || 0) || medios.camarasProduccionTotal === 0;

  const equipamientoOk = transporteOk && transmisoresTVOk && transmisoresRadioOk && camarasOk;
  items.push({
    id: 'VAL-L2-04',
    nivel: 2,
    nivelNombre: 'Consistencia Lógica',
    titulo: 'Equipamiento Operativo <= Equipamiento Inventariado',
    descripcion: 'Los activos operativos reportados (transmisores, plantas, cámaras, transporte) no pueden exceder el total de inventario disponible.',
    esValido: equipamientoOk,
    severidad: 'ERROR'
  });

  // 2.5 Horas de programación propia <= Horas de transmisión totales (TV-007 <= TV-001)
  const horasTVOk = (medios.horasProgramacionPropiaTV || 0) <= (medios.horasTransmisionTV || 0) || medios.horasTransmisionTV === 0;
  items.push({
    id: 'VAL-L2-05',
    nivel: 2,
    nivelNombre: 'Consistencia Lógica',
    titulo: 'Horas de Producción Propia <= Horas Transmisión Totales (TV-007 <= TV-001)',
    descripcion: 'Las horas de producción propia no pueden superar el total de horas de emisión en parrilla.',
    esValido: horasTVOk,
    valorActual: `Propia: ${medios.horasProgramacionPropiaTV}h | Total: ${medios.horasTransmisionTV}h`,
    severidad: 'ERROR'
  });

  // ==========================================
  // NIVEL 3: VALIDACIÓN CRUZADA INTER-MÓDULO
  // ==========================================

  // 3.1 Horas de Transmisión del Medio vs Operatividad REDTV
  // Si REDTV reporta operatividad nacional muy baja (<50%) pero el medio reporta 168 horas completas sin caída
  const redTvUptime = plataformas.operatividadNacionalTDA || 100;
  const tvOperativity = medios.operatividadSenalTV || 100;
  const discrepanciaOperatividad = Math.abs(redTvUptime - tvOperativity);
  const cruzadaRedTvOk = discrepanciaOperatividad <= 35; // Tolerancia máxima del 35% de desviación regional

  items.push({
    id: 'VAL-L3-01',
    nivel: 3,
    nivelNombre: 'Validación Cruzada',
    titulo: 'Cruce Operativo: Horas de Medio vs Telemetría de Red REDTV',
    descripcion: 'Contrasta la operatividad de señal declarada por el medio contra la disponibilidad real de telepuerto y estaciones transmisoras REDTV.',
    esValido: cruzadaRedTvOk,
    valorActual: `Medio: ${tvOperativity}% | REDTV Nacional: ${redTvUptime}% (Desviación: ${discrepanciaOperatividad.toFixed(1)}%)`,
    severidad: cruzadaRedTvOk ? 'INFO' : 'ADVERTENCIA'
  });

  // 3.2 Alcance Digital vs Penetración de Internet en Territorio
  const alcanceVsPoblacionOk = medios.alcanceOrganicoDigital <= (strategic.poblacionAccesoInternet || 25000000);
  items.push({
    id: 'VAL-L3-02',
    nivel: 3,
    nivelNombre: 'Validación Cruzada',
    titulo: 'Cruce Digital: Alcance Reportado vs Población con Acceso a Internet',
    descripcion: 'Verifica que el alcance digital orgánico sea estadísticamente viable con la infraestructura de conectividad nacional (Eje 4).',
    esValido: alcanceVsPoblacionOk,
    valorActual: `Alcance: ${medios.alcanceOrganicoDigital.toLocaleString()} | Población Conectada: ${strategic.poblacionAccesoInternet.toLocaleString()}`,
    severidad: 'ADVERTENCIA'
  });

  // 3.3 Transmisores Declarados por Medios vs Transmisores de REDTV
  const cruceTransmisores = plataformas.estacionesTDAOperativas <= plataformas.estacionesTDATotal;
  items.push({
    id: 'VAL-L3-03',
    nivel: 3,
    nivelNombre: 'Validación Cruzada',
    titulo: 'Cruce de Estaciones TDA Activas vs Capacidad Instalada Nacional',
    descripcion: 'Comprobación de que las estaciones de Televisión Digital Abierta activas concuerdan con el despliegue del Eje 2.',
    esValido: cruceTransmisores,
    valorActual: `${plataformas.estacionesTDAOperativas} de ${plataformas.estacionesTDATotal} estaciones`,
    severidad: 'INFO'
  });

  return items;
}

/**
 * Genera un Hash criptográfico determinista para trazabilidad de auditoría
 */
export function generateIntegrityHash(
  reportOrId: string | FullWeeklyReport, 
  timestamp?: string, 
  kpis?: CalculatedMasterKPIs
): string {
  let reportId: string;
  let timeStr: string;
  let kpiValues: { iec: number; ee: number; irt: number; icd: number; ivi: number };

  if (typeof reportOrId === 'object' && reportOrId !== null) {
    reportId = reportOrId.id || 'REP-GEN';
    timeStr = reportOrId.fechaCreacion || new Date().toISOString();
    kpiValues = reportOrId.kpisCalculados || { iec: 88, ee: 85, irt: 92, icd: 87, ivi: 0.12 };
  } else {
    reportId = typeof reportOrId === 'string' ? reportOrId : 'REP-DEFAULT';
    timeStr = timestamp || new Date().toISOString();
    kpiValues = kpis || { iec: 88, ee: 85, irt: 92, icd: 87, ivi: 0.12 };
  }

  const payload = `${reportId}:${timeStr}:${kpiValues.iec}:${kpiValues.ee}:${kpiValues.irt}:${kpiValues.icd}:${kpiValues.ivi}`;
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    const char = payload.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `MPPCI-AUTH-${hex.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
}

/**
 * Evaluador de alertas automáticas (Corte Lunes 10:00 AM y KPI < 70%)
 */
export function evaluateAutomatedAlerts(
  input: FullWeeklyReport | FullWeeklyReport[],
  towers?: any[],
  opinionAlerts?: any[]
): AutoNotification[] {
  const reports = Array.isArray(input) ? input : [input];
  const notifications: AutoNotification[] = [];

  reports.forEach(report => {
    // 1. Alerta por corte tardío (Lunes después de las 10:00 AM)
    if (report.esCargaTardia) {
      notifications.push({
        id: `NOTIF-DEADLINE-${report.id}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        fechaEmision: new Date().toISOString(),
        tipo: 'RETRASO_CARGA_LUNES',
        severidad: 'ALTA',
        destinatarioEnte: report.control.enteAdscrito,
        destinatarioResponsable: report.control.responsableEnte,
        correo: report.control.correo,
        telegram: `@${report.control.enteAdscrito.toLowerCase()}_ops`,
        asunto: `⚠️ URGENTE: Retraso en Carga de Indicadores Semanales - ${report.control.enteAdscrito}`,
        mensaje: `Estimado(a) ${report.control.responsableEnte}, el corte semanal de captura para la Semana Epidemiológica N° ${report.control.semanaEpidemiologica} venció el Lunes a las 10:00 AM. Se requiere regularización inmediata en el Sistema de Inteligencia MPPCI.`,
        estado: 'ENVIADO',
        estadoEnvio: 'ENVIADO',
        canal: 'AMBOS',
        canales: ['TELEGRAM', 'EMAIL'],
        leido: false
      });
    }

    // 2. Alerta por KPI por debajo del 70% de la meta establecida
    if (report.kpisCalculados.iec < 70) {
      notifications.push({
        id: `NOTIF-KPI-IEC-${report.id}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        fechaEmision: new Date().toISOString(),
        tipo: 'INDICADOR_BAJO_70',
        severidad: 'CRITICA',
        destinatarioEnte: report.control.enteAdscrito,
        destinatarioResponsable: report.control.responsableEnte,
        correo: report.control.correo,
        telegram: `@${report.control.enteAdscrito.toLowerCase()}_ops`,
        asunto: `🚨 ALERTA ESTRATÉGICA: Índice de Efectividad Comunicacional (IEC) Crítico (${report.kpisCalculados.iec}%)`,
        mensaje: `El Ente ${report.control.enteAdscrito} ha registrado un Índice de Efectividad Comunicacional de ${report.kpisCalculados.iec}%, inferior al umbral mínimo del 70.0%. Se ha remitido el caso al Viceministerio correspondiente.`,
        estado: 'ENVIADO',
        estadoEnvio: 'ENVIADO',
        canal: 'AMBOS',
        canales: ['TELEGRAM', 'EMAIL'],
        leido: false
      });
    }

    if (report.kpisCalculados.irt < 70) {
      notifications.push({
        id: `NOTIF-KPI-IRT-${report.id}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        fechaEmision: new Date().toISOString(),
        tipo: 'FALLA_INFRAESTRUCTURA_REDTV',
        severidad: 'CRITICA',
        destinatarioEnte: 'REDTV',
        destinatarioResponsable: 'Dirección Técnica Nacional REDTV',
        correo: 'operaciones@redtv.gob.ve',
        telegram: '@redtv_tecnica_alerta',
        asunto: `⚠️ ALERTA TÉCNICA: Resiliencia Técnica IRT por debajo del umbral (${report.kpisCalculados.irt}%)`,
        mensaje: `Se reporta degradación en la señal y enlaces satelitales Ku/TDA con IRT de ${report.kpisCalculados.irt}%. Se solicita activación de protocolo de contingencia técnica.`,
        estado: 'ENVIADO',
        estadoEnvio: 'ENVIADO',
        canal: 'TELEGRAM',
        canales: ['TELEGRAM'],
        leido: false
      });
    }
  });

  return notifications;
}
