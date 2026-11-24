// Types for EJE 3: GESTIÓN DE COMUNICACIONES (Documento Oficial MPPCI)
// 3.A GESTIÓN DE NARRATIVA Y MONITOREO DE MEDIOS

export interface Eje3MonitoreoOpinionRow {
  indicador: string;
  codigo: string; // MON-001 al MON-008
  valor: number;
  observaciones: string;
}

export interface Eje3DesgloseAlertaRow {
  tematica: string;
  numAlertas: number;
  porcentajeTotal: number;
  accionesContrarrestacion: string;
}

export interface Eje3ContenidoEscritoRow {
  indicador: string;
  codigo: string; // GES-001 al GES-008
  valor: number;
  observaciones: string;
}

export interface Eje3VoceriasPortavocesRow {
  indicador: string;
  codigo: string; // GES-009 al GES-013
  valor: number;
  observaciones: string;
}

export interface Eje3SentimientoPosicionamientoRow {
  indicador: string;
  codigo: string; // GES-014 al GES-018
  valor: number; // Porcentaje o cantidad
  varSemanaAnteriorPorc: number;
}

export interface Eje3VulnerabilidadTalentoRow {
  ente: string;
  totalPersonal: number;
  nivelRojo: number; // x3
  nivelAmarillo: number; // x1
  nivelVerde: number; // x0
  porEvaluar: number;
  sinClasificar: number;
}

export interface Eje3ArticulacionAlianzaRow {
  institucion: string;
  tipoAlianza: string;
  numAccionesConjuntas: number;
  resultados: string;
  observaciones: string;
}

export interface Eje3CooperacionInternacionalRow {
  donanteOrganismo: string;
  montoComprometidoUsd: number;
  montoEjecutadoUsd: number;
  porcEjecucion: number; // Calculado
  sector: string;
}

export interface Eje3NarrativaMonitoreoData {
  monitoreoMedios: Eje3MonitoreoOpinionRow[];
  desgloseAlertas: Eje3DesgloseAlertaRow[];
  contenidoEscrito: Eje3ContenidoEscritoRow[];
  voceriasPortavoces: Eje3VoceriasPortavocesRow[];
  sentimientoPosicionamiento: Eje3SentimientoPosicionamientoRow[];
  vulnerabilidadTalento: Eje3VulnerabilidadTalentoRow[];
  articulacionAlianzas: Eje3ArticulacionAlianzaRow[];
  cooperacionInternacional: Eje3CooperacionInternacionalRow[];
}

export interface Eje3InstrumentoData {
  narrativaMonitoreo: Eje3NarrativaMonitoreoData;
}
