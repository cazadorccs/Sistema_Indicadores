// Types for EJE 4: GESTIÓN DE VICEMINISTERIOS (Documento Oficial MPPCI - GESTIÓN MIPCCI)
// Instrumento de Captura de Datos de Gestión y Despliegue Operativo Comunicacional

// ============================================================================
// 1. DESPACHO DE COMUNICACIÓN E INFORMACIÓN
// ============================================================================

export interface Eje4TelefoniaMovilRow {
  tipoComunicacion: string;
  cantidad: number;
}

export interface Eje4TendenciaViralRow {
  origen: string;
  categoria: 'MEDIOS_DIGITALES' | 'REDES_SOCIALES';
  cantidadDetectado: number;
  amenazaPalabraFraseViral: string;
  fechaHora: string;
}

export interface Eje4SeoEditorialData {
  traficoOrganicoTotal: number; // 1. Tráfico Orgánico Total (Google, Bing, Yahoo)
  impresionesBuscadores: number; // 2.a Impresiones (cuántas veces aparece)
  clicsBuscadores: number; // 2.b Clics (tráfico real captado)
  rendimientoVisitasEspontaneas: number; // 3. Rendimiento (visitas espontáneas por recomendación)
  ctrOrganico: number; // 4. CTR Orgánico (Click-Through Rate %)
  tasaConversionSuscriptores: number; // 5. Tasa de conversión de suscriptores (%)
}

export interface Eje4DespachoComunicacionInformacionData {
  comunicadosOficialesNotasPrensaEmitidos: number;
  difusionMovilPresidencia: Eje4TelefoniaMovilRow[];
  tendenciasViralesDesestabilizadoras: Eje4TendenciaViralRow[];
  seoEditorial: Eje4SeoEditorialData;
}

// ============================================================================
// 2. DESPACHO DE GESTIÓN COMUNICACIONAL
// ============================================================================

export interface Eje4GestionComunicacionalRow {
  nombreIndicador: string;
  codigoVariable: string;
  variable: string;
  valorCapturado: number;
  unidad: string;
  esDatoMaestro?: boolean;
}

export interface Eje4DespachoGestionComunicacionalData {
  formacionAdaptacionTecnologica: Eje4GestionComunicacionalRow[];
  soberaniaTecnologicaTerritorio: Eje4GestionComunicacionalRow[];
  formacionPopularTransmedia: Eje4GestionComunicacionalRow[];
}

// ============================================================================
// 3. VICEMINISTERIO DE PLANIFICACIÓN Y ESTRATEGIA COMUNICACIONAL
// ============================================================================

export interface Eje4EcosistemaDigitalRow {
  plataforma: string;
  metaSemanalVistas: number;
  vistasLogradas: number;
  varPorcSemanaAnterior: number;
  interaccionesTotales: number;
  impresionesNetas: number;
  engagementRateEE?: number; // (interacciones / vistas) * 100
}

export interface Eje4ProduccionGeneralData {
  totalContenidoPublicado: number;
  contenidoFormatoVideo: number;
  contenidoFormatoPublicacion: number;
  contenidoFormatoRadial: number;
  contenidoProduccionPropia: number;
}

export interface Eje4FormatoDespliegueRow {
  tipoContenido: string;
  cantidadUnidades: number;
}

export interface Eje4ContenidoAudiovisualRow {
  categoria: string;
  cantidadUnidades: number;
}

export interface Eje4KpiAudiovisualRow {
  indicador: string;
  descripcion: string;
  valorCapturado: number;
  unidad: string;
}

export interface Eje4EntrevistaRow {
  categoria: string;
  cantidad: number;
}

export interface Eje4RedCreadoresData {
  numCreadoresActivos: number;
  vistasDifusionRedesAliadas: number;
  articulacionMediosPrivados: number;
  articulacionMediosInternacionales: number;
}

export interface Eje4NarrativaPlanificacionRow {
  concepto: string;
  cantidadUnidades: number;
}

export interface Eje4ContenidoEscritoPlanificacionData {
  notasPrensaArticulosWeb: number;
  publicacionesMicroblogging: number;
  publicacionesHilosTexto: number;
}

export interface Eje4TrendingTopicRow {
  posicion: number;
  tema: string;
  alcanceMenciones?: number;
  sentimiento?: 'POSITIVO' | 'NEUTRO' | 'HOSTIL';
}

export interface Eje4PlanificacionEstrategiaData {
  ecosistemaDigital: Eje4EcosistemaDigitalRow[];
  produccionGeneral: Eje4ProduccionGeneralData;
  formatosDespliegue: Eje4FormatoDespliegueRow[];
  tiposAudiovisual: Eje4ContenidoAudiovisualRow[];
  kpisAudiovisual: Eje4KpiAudiovisualRow[];
  investigacionesEspecialesCantidad: number;
  desgloseEntrevistas: Eje4EntrevistaRow[];
  redCreadores: Eje4RedCreadoresData;
  gestionNarrativaMonitoreo: Eje4NarrativaPlanificacionRow[];
  contenidoEscrito: Eje4ContenidoEscritoPlanificacionData;
  trendingTopics: Eje4TrendingTopicRow[];
}

// ============================================================================
// 4. VICEMINISTERIO DE SOPORTE DE PLATAFORMA COMUNICACIONAL
// ============================================================================

export interface Eje4CoberturaInfraestructuraRow {
  indicador: string;
  codigoVariable: string;
  variable: string;
  valorCapturado: number;
  unidad: string;
  observaciones: string;
  esDatoMaestro?: boolean;
}

export interface Eje4CoberturaTerritorialRow {
  indicador: string;
  codigoVariable: string;
  variable: string;
  valorCapturado: number;
  unidad: string;
  observaciones: string;
  esDatoMaestro?: boolean;
}

export interface Eje4PenetracionDigitalRow {
  indicador: string;
  codigoVariable: string;
  variable: string;
  valorCapturado: number;
  unidad: string;
  observaciones: string;
  esDatoMaestro?: boolean;
}

export type EstatusCumplimientoResorte = 'CUMPLE_TOTALMENTE' | 'CUMPLE_PARCIALMENTE' | 'INCUMPLE';

export interface Eje4CriterioCumplimientoResorte {
  criterio: string; // 'Clasificación de Contenido' | 'Protección al Menor' | 'Obligaciones Financieras' | 'Control de Franjas Horarias'
  estado: EstatusCumplimientoResorte;
  observaciones: string;
}

export interface Eje4SujetoCumplimientoResorte {
  sujetoRegulado: string; // 'Prestadores de servicios' | 'Productores nacionales' | 'Anunciantes' | 'Radio' | 'Televisión' | 'Medios Electrónicos'
  cantidadMedida: number;
  criterios: Eje4CriterioCumplimientoResorte[];
}

export interface Eje4SoportePlataformaData {
  mediosComunitariosTransmisores: Eje4CoberturaInfraestructuraRow[];
  coberturaTerritorialIctm: Eje4CoberturaTerritorialRow[];
  hogaresInternetThai: Eje4PenetracionDigitalRow[];
  bandaAnchaMovilTpbam: Eje4PenetracionDigitalRow[];
  mediosDigitalesIpmd: Eje4PenetracionDigitalRow[];
  cumplimientoLeyResorte: Eje4SujetoCumplimientoResorte[];
}

// ============================================================================
// MASTER DATA CONTAINER FOR EJE 4
// ============================================================================

export interface Eje4ViceministeriosData {
  despachoComunicacionInformacion: Eje4DespachoComunicacionInformacionData;
  despachoGestionComunicacional: Eje4DespachoGestionComunicacionalData;
  planificacionEstrategia: Eje4PlanificacionEstrategiaData;
  soportePlataforma: Eje4SoportePlataformaData;
}

export interface Eje4InstrumentoData {
  viceministerios: Eje4ViceministeriosData;
}
