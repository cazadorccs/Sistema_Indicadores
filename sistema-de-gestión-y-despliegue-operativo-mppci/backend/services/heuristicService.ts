export interface ParametrosDiagnostico {
  semana?: number;
  kpis?: {
    iec?: number;
    irt?: number;
    icd?: number;
    ee?: number;
    ibs?: number;
    trmd?: number;
    iaae?: number;
    ivi?: number;
  };
  torresAfectadas?: number;
  alertasActivas?: number;
  municipiosCriticos?: number;
}

export function generarDiagnosticoEstrategicoSoberano(params: ParametrosDiagnostico) {
  const semana = params.semana || 35;
  const iec = params.kpis?.iec ?? 84.2;
  const irt = params.kpis?.irt ?? 96.1;
  const icd = params.kpis?.icd ?? 72.8;
  const ee = params.kpis?.ee ?? 8.7;
  const ibs = params.kpis?.ibs ?? 34.5;
  const trmd = params.kpis?.trmd ?? 42;
  const iaae = params.kpis?.iaae ?? 91.0;
  const ivi = params.kpis?.ivi ?? 0.180;
  const torres = params.torresAfectadas ?? 1;
  const alertas = params.alertasActivas ?? 2;
  const municipios = params.municipiosCriticos ?? 3;

  // Evaluación algorítmica de semáforo
  let semaforo: 'VERDE' | 'AMARILLO' | 'ROJO' = 'VERDE';
  if (iec < 60 || irt < 90 || ivi > 0.35) {
    semaforo = 'ROJO';
  } else if (iec < 75 || irt < 95 || torres > 2 || alertas > 3) {
    semaforo = 'AMARILLO';
  }

  // Generación de diagnóstico contextual determinista
  let estadoGeneral = '';
  if (semaforo === 'VERDE') {
    estadoGeneral = `El Sistema Nacional de Comunicación y Cultura registra un desempeño sobresaliente en la Semana Epidemiológica N° ${semana}. El Índice de Efectividad Comunicacional (IEC: ${iec.toFixed(1)}%) supera la meta rectora (75%), respaldado por una sólida Resiliencia Técnica de Transmisión (IRT: ${irt.toFixed(1)}%) y un Índice de Alineación Editorial (IAAE) del ${iaae.toFixed(1)}%.`;
  } else if (semaforo === 'AMARILLO') {
    estadoGeneral = `En la Semana Epidemiológica N° ${semana}, el despliegue comunicacional se mantiene en rango de atención preventiva. El IEC se ubica en ${iec.toFixed(1)}%, condicionado por ${torres} estación(es) de transmisión con contingencia activa y ${alertas} matriz(ces) de desinformación bajo monitoreo continuo.`;
  } else {
    estadoGeneral = `ALERTA ESTRATÉGICA MINISTERIAL: La Semana Epidemiológica N° ${semana} presenta desviaciones operativas críticas con un IEC de ${iec.toFixed(1)}%. Se requiere intervención directa e inmediata de la Rectoría para subsanar contingencias de transmisión y contener vectores de desinformación masivos.`;
  }

  // Recomendaciones según variables analizadas
  const recomendaciones: string[] = [];

  if (irt < 95 || torres > 0) {
    recomendaciones.push(`Instruir a REDTV la ejecución prioritaria del protocolo de soporte eléctrico y reposición de combustible en las ${torres} torres con reporte de contingencia.`);
  } else {
    recomendaciones.push('Mantener el plan de mantenimiento preventivo y redundancia de telepuerto satelital Banda Ku en toda la cadena TDA.');
  }

  if (ee < 8.0) {
    recomendaciones.push('Reorientar la producción digital hacia cápsulas audiovisuales cortas (Reels/TikTok/Shorts) para elevar la tasa de engagement ciudadano (EE).');
  } else {
    recomendaciones.push(`Consolidar la estrategia de distribución multicanal con enfoque transmedia, aprovechando la favorable tasa de interacción comunitaria (EE: ${ee.toFixed(1)}%).`);
  }

  if (trmd > 50 || alertas > 1) {
    recomendaciones.push(`Optimizar la velocidad de neutralización de la Sala Situacional (TRMD actual: ${trmd} min) mediante la activación inmediata de vocerías institucionales y pases satelitales en vivo.`);
  } else {
    recomendaciones.push(`Sostener el tiempo de respuesta célere ante matrices mediáticas adversas (TRMD: ${trmd} min), garantizando el dominio del relato informativo en radio y TV.`);
  }

  if (municipios > 0) {
    recomendaciones.push(`Intensificar la distribución de medios impresos y perifoneo comunitario en los ${municipios} municipios con vulnerabilidad geográfica identificados en el Eje 4.`);
  }

  // Prioridad inmediata
  let prioridadInmediata = '';
  if (torres > 0) {
    prioridadInmediata = 'Aprobar contingencia logística y técnica para estabilizar el suministro eléctrico en nodos críticos de transmisión.';
  } else if (alertas > 2) {
    prioridadInmediata = 'Convocar sala situacional conjunta para emisión de cadena nacional de desmentido y vocería técnica.';
  } else {
    prioridadInmediata = 'Validar el cierre del corte semanal y autorizar la publicación del Boletín Oficial Consolidado.';
  }

  return {
    success: true,
    source: 'motor-heuristico-soberano-vscc',
    diagnosticoGeneral: estadoGeneral,
    recomendacionesEstrategicas: recomendaciones,
    semaforoGestion: semaforo,
    prioridadInmediata,
    timestamp: new Date().toISOString()
  };
}

export function generarContranarrativaSoberana(params: {
  titulo?: string;
  tematica?: string;
  amenazaFraseViral?: string;
  origen?: string;
  impactoVistas?: number;
  ente?: string;
}) {
  const { 
    titulo = 'Alerta de Desinformación', 
    tematica = 'GENERAL', 
    origen = 'redes sociales', 
    impactoVistas = 150000, 
    ente = 'Sistema Nacional de Medios Públicos' 
  } = params;

  // Determinar vocero más idóneo por temática y ente
  let voceroSugerido = 'Dirección General de Medios y Vocería Especializada';
  if (tematica.toUpperCase().includes('ELECTR') || ente.toUpperCase().includes('REDTV')) {
    voceroSugerido = 'Presidencia de REDTV / Gerencia de Operaciones Técnicas';
  } else if (tematica.toUpperCase().includes('TELECOM') || ente.toUpperCase().includes('CONATEL')) {
    voceroSugerido = 'Director General de CONATEL / Sala de Fiscalización';
  } else if (tematica.toUpperCase().includes('MINISTER') || tematica.toUpperCase().includes('ESTRAT')) {
    voceroSugerido = 'Viceministerio de Comunicación e Información / Despacho del Ministro';
  }

  const nivelAlerta: 'CRITICO' | 'ALTO' | 'MEDIO' = impactoVistas > 300000 ? 'CRITICO' : impactoVistas > 100000 ? 'ALTO' : 'MEDIO';

  return {
    success: true,
    source: 'motor-institucional-soberano-mppci',
    narrativaOficial: `COMUNICADO OFICIAL DE LA REPÚBLICA BOLIVARIANA DE VENEZUELA: En relación a falsas matrices y rumores no verificados que circulan a través de ${origen} sobre "${titulo}", la Vicepresidencia Sectorial de Comunicación y Cultura (VSCC) y el ${ente} desmienten de manera categórica tales aseveraciones. Todos los sistemas operativos, técnicos y de servicio público operan con absoluta normalidad y apego a la ley. Se exhorta al pueblo venezolano a no replicar contenidos anónimos de desestabilización y a consultar exclusivamente los partes oficiales emitidos por el Sistema Bolivariano de Comunicación e Información (SiBCI).`,
    lineasDiscursivas: [
      'Garantía plena y verificable de la continuidad operativa de los servicios del Estado.',
      'Denuncia activa del carácter malicioso y coordinado del rumor como parte de operaciones psicológicas.',
      'Difusión de testimonios y reportes en sitio por parte del personal técnico y comunidades organizadas.',
      'Llamado cívico a la serenidad y verificación a través de los medios públicos (VTV, RNV, YVKE, AVN).'
    ],
    voceriaRecomendada: voceroSugerido,
    canalesDespliegue: [
      'VTV (Avance Informativo y Noticiero Estelar)',
      'Circuito Radial Nacional (RNV / YVKE Mundial)',
      'Agencia Venezolana de Noticias (AVN - Cable Urgente)',
      'Canales Oficiales Telegram y WhatsApp de la VSCC',
      'Despliegue en Redes Sociales con etiqueta oficial'
    ],
    nivelAlertaSugerido: nivelAlerta
  };
}
