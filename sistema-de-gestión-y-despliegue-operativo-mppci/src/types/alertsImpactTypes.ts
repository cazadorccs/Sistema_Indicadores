import { RACIRole } from '../types';

export type ImpactTriggerCode = 
  | 'TRG_DA01_VIRAL'
  | 'TRG_TRMD_TIMEOUT'
  | 'TRG_ID09_SENT'
  | 'TRG_RTV01_TDA'
  | 'TRG_RTV09_SAT'
  | 'TRG_TMR_ESCALA'
  | 'TRG_STR01_LIVE'
  | 'TRG_RED_ENG'
  | 'TRG_TV08_PASE_LOW';

export type ImpactTriggerCategory = 
  | 'OPINION_REPUTACION'
  | 'INFRAESTRUCTURA_CRITICA'
  | 'TRAFICO_OPORTUNIDAD';

export type ImpactAlertSeverity = 
  | 'CRITICO'
  | 'ALTO'
  | 'OPORTUNIDAD'
  | 'TACTICO';

export type IncidentStatus = 
  | 'ACTIVA'
  | 'EN_GESTION'
  | 'RESUELTA';

export type AlertChannel = 
  | 'PUSH_WEB'
  | 'TELEGRAM'
  | 'SMS'
  | 'EMAIL';

export interface ImpactAlertIncident {
  id: string;
  triggerCode: ImpactTriggerCode;
  categoria: ImpactTriggerCategory;
  severidad: ImpactAlertSeverity;
  titulo: string;
  descripcion: string;
  indicadorCodigo: string;
  valorActual: number | string;
  umbralDisparo: string;
  enteResponsable: string;
  destinatariosRaci: RACIRole[];
  canalesNotificados: AlertChannel[];
  timestampDisparo: string;
  timestampResolucion?: string;
  estado: IncidentStatus;
  accionRequerida: string;
  ackPor?: string;
  ackTimestamp?: string;
  escalado: boolean;
}

export interface TriggerEvaluationMetrics {
  da01IncrementoPorcentajeHora?: number;
  trmdMinutosSinRespuesta?: number;
  id09SentimientoPositivoPorcentaje?: number;
  rtv01OperatividadTdaNacionalPorcentaje?: number;
  rtv09MicrocortesBandaKu?: number;
  tmrHorasSinSolucion?: number;
  str01PcvIncrementoVsHistoricoPorcentaje?: number;
  redEngTasaEngagementPorcentaje?: number;
  tv08PasesRegionCrisisPorTurno?: number;
  zonaCrisisNombre?: string;
  eventoOficialNombre?: string;
  nodoTdaAfectado?: string;
}

export interface TriggerRuleDefinition {
  codigo: ImpactTriggerCode;
  categoria: ImpactTriggerCategory;
  nombre: string;
  indicador: string;
  severidadDefault: ImpactAlertSeverity;
  condicionTexto: string;
  canalesDefault: AlertChannel[];
  destinatariosDefault: RACIRole[];
  enteAfectadoDefault: string;
  accionSugerida: string;
}

export const OFFICIAL_TRIGGER_DEFINITIONS: TriggerRuleDefinition[] = [
  {
    codigo: 'TRG_DA01_VIRAL',
    categoria: 'OPINION_REPUTACION',
    nombre: 'Crecimiento Exponencial de Matriz Desestabilizadora',
    indicador: 'DA-01',
    severidadDefault: 'ALTO',
    condicionTexto: 'Incremento de menciones adversas > 20% en menos de 1 hora',
    canalesDefault: ['PUSH_WEB', 'TELEGRAM'],
    destinatariosDefault: ['VICEMINISTRO', 'DIRECTOR_OPERACIONES'],
    enteAfectadoDefault: 'Sala Situacional y Ciberdefensa',
    accionSugerida: 'Activar célula de análisis de sentimiento y alistar piezas de respuesta inmediata.'
  },
  {
    codigo: 'TRG_TRMD_TIMEOUT',
    categoria: 'OPINION_REPUTACION',
    nombre: 'Tiempo Límite de Respuesta a Desinformación Excedido',
    indicador: 'TRMD',
    severidadDefault: 'CRITICO',
    condicionTexto: 'Tiempo de respuesta sin vocería supera 120 minutos (2 horas)',
    canalesDefault: ['SMS', 'PUSH_WEB', 'TELEGRAM'],
    destinatariosDefault: ['MAXIMA_AUTORIDAD', 'VICEMINISTRO'],
    enteAfectadoDefault: 'Despacho Ministerial / Dirección General de Medios',
    accionSugerida: 'Escalamiento urgente a la Máxima Autoridad para autorizar vocería técnica obligatoria.'
  },
  {
    codigo: 'TRG_ID09_SENT',
    categoria: 'OPINION_REPUTACION',
    nombre: 'Caída Crítica de Sentimiento Digital en Evento Oficial',
    indicador: 'ID-09',
    severidadDefault: 'ALTO',
    condicionTexto: 'Sentimiento favorable cae por debajo de 30% en transmisión oficial',
    canalesDefault: ['TELEGRAM', 'PUSH_WEB'],
    destinatariosDefault: ['VICEMINISTRO', 'DIRECTOR_OPERACIONES'],
    enteAfectadoDefault: 'Dirección General de Medios Digitales',
    accionSugerida: 'Desplegar contranarrativa en microblogging y transmisiones streaming.'
  },
  {
    codigo: 'TRG_RTV01_TDA',
    categoria: 'INFRAESTRUCTURA_CRITICA',
    nombre: 'Caída de Operatividad TDA o Nodo Regional Crítico',
    indicador: 'RTV-001',
    severidadDefault: 'CRITICO',
    condicionTexto: 'Operatividad TDA < 95% o pérdida total de un nodo estratégico',
    canalesDefault: ['SMS', 'PUSH_WEB', 'TELEGRAM'],
    destinatariosDefault: ['DIRECTOR_OPERACIONES', 'VICEMINISTRO'],
    enteAfectadoDefault: 'REDTV',
    accionSugerida: 'Despachar cuadrillas técnicas con apoyo de CORPOELEC y conmutar a redundancia.'
  },
  {
    codigo: 'TRG_RTV09_SAT',
    categoria: 'INFRAESTRUCTURA_CRITICA',
    nombre: 'Interrupción o Micro-Cortes en Banda Ku (Señal Matriz)',
    indicador: 'RTV-009',
    severidadDefault: 'CRITICO',
    condicionTexto: 'Pérdida de potencia o micro-cortes reiterados en enlace satelital matriz',
    canalesDefault: ['TELEGRAM', 'PUSH_WEB', 'EMAIL'],
    destinatariosDefault: ['DIRECTOR_OPERACIONES', 'VICEMINISTRO'],
    enteAfectadoDefault: 'VTV / TELESUR / REDTV',
    accionSugerida: 'Conmutar a telepuerto secundario o enlace fibra óptica de contingencia.'
  },
  {
    codigo: 'TRG_TMR_ESCALA',
    categoria: 'INFRAESTRUCTURA_CRITICA',
    nombre: 'Tiempo Medio de Recuperación Excedido (> 4 Horas)',
    indicador: 'TMR',
    severidadDefault: 'ALTO',
    condicionTexto: 'Incidencia técnica no resuelta supera 4 horas sin solución',
    canalesDefault: ['EMAIL', 'PUSH_WEB'],
    destinatariosDefault: ['VICEMINISTRO', 'AUDITOR_CONTRALOR'],
    enteAfectadoDefault: 'Dirección General de Operaciones Técnicas',
    accionSugerida: 'Elevar ticket a la alta gerencia y convocar comité de contingencia.'
  },
  {
    codigo: 'TRG_STR01_LIVE',
    categoria: 'TRAFICO_OPORTUNIDAD',
    nombre: 'Pico de Concurrencia Sobresaliente en Live (> +50%)',
    indicador: 'STR-001',
    severidadDefault: 'OPORTUNIDAD',
    condicionTexto: 'Pico de concurrencia supera promedio 30 días en más de 50%',
    canalesDefault: ['PUSH_WEB', 'TELEGRAM'],
    destinatariosDefault: ['VICEMINISTRO', 'DIRECTOR_OPERACIONES'],
    enteAfectadoDefault: 'Dirección de Medios Digitales / Salas de Transmisión',
    accionSugerida: 'Extender cobertura en vivo y generar cápsulas de republicación inmediata.'
  },
  {
    codigo: 'TRG_RED_ENG',
    categoria: 'TRAFICO_OPORTUNIDAD',
    nombre: 'Alta Tracción y Viralidad de Campaña Institucional',
    indicador: 'RED-ENG',
    severidadDefault: 'OPORTUNIDAD',
    condicionTexto: 'Tasa de engagement institucional supera el umbral de viralidad (> 12%)',
    canalesDefault: ['TELEGRAM', 'PUSH_WEB'],
    destinatariosDefault: ['DIRECTOR_OPERACIONES', 'VICEMINISTRO'],
    enteAfectadoDefault: 'Sistema Nacional de Medios Públicos (SiBCI)',
    accionSugerida: 'Autorizar republicación cruzada en todas las cuentas oficiales del Estado.'
  },
  {
    codigo: 'TRG_TV08_PASE_LOW',
    categoria: 'TRAFICO_OPORTUNIDAD',
    nombre: 'Déficit de Pases en Vivo desde Zonas de Crisis',
    indicador: 'TV-008',
    severidadDefault: 'TACTICO',
    condicionTexto: 'Menos de 2 pases por turno desde territorio en contingencia climática',
    canalesDefault: ['PUSH_WEB', 'EMAIL'],
    destinatariosDefault: ['VICEMINISTRO', 'DIRECTOR_OPERACIONES'],
    enteAfectadoDefault: 'Servicios Informativos VTV / RNV / Corresponsales',
    accionSugerida: 'Instruir despliegue forzado de equipos de prensa y unidades móviles al territorio.'
  }
];
