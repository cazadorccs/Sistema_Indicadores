import { RACIRole, SeverityLevel } from '../types';

// ==========================================
// 1. DASHBOARD DE SALA SITUACIONAL Y CIBERDEFENSA
// ==========================================

export interface AmenazaViralDA01 {
  id: string;
  codigo: 'DA-01';
  titulo: string;
  tematica: 'POLITICA' | 'SERVICIOS_PUBLICOS' | 'ECONOMIA' | 'GEO_ESTRATEGICA' | 'SEGURIDAD';
  nivelRiesgo: 'BAJO' | 'MEDIO' | 'ALTO' | 'CRITICO';
  origenPlataforma: 'X' | 'TIKTOK' | 'WHATSAPP' | 'TELEGRAM' | 'FACEBOOK' | 'YOUTUBE' | 'WEB_EXTERNA';
  impactoEstimadoVistas: number;
  volumenMenciones: number;
  estadoAfectado: string;
  municipioAfectado?: string;
  coordenadas?: [number, number];
  estadoNeutralizacion: 'DETECTADA' | 'EN_ANALISIS' | 'CONTRANARRATIVA_EN_DESPLIEGUE' | 'NEUTRALIZADA';
  horaDeteccion: string;
  tiempoRespuestaMinutos: number; // TRMD
  contranarrativaActiva?: string;
}

export interface CurvaNeutralizacionPunto {
  minutoRelativo: number;
  volumenMatrizAdversa: number;
  tasaRespuestaInstitucional: number; // TRMD %
  despliegueContranarrativa: number;
}

export interface SentimientoDigitalNLP {
  mencionesTotales: number; // V1.1
  porcentajePositivo: number; // ID-09
  porcentajeNeutro: number;
  porcentajeNegativo: number;
  indiceBalanceSentimientoNeto: number; // IBS: Positivo - Negativo
  shareOfVoice: {
    oficialSNMP: number;
    mediosIndependientes: number;
    narrativaAdversa: number;
  };
}

export interface CiberdefensaDashboardData {
  resumen: {
    amenazasActivas: number;
    amenazasCriticas: number;
    tasaNeutralizacionGlobal: number; // %
    tiempoPromedioRespuestaMinutos: number; // TRMD promedio
    balanceSentimientoNeto: number; // IBS
  };
  amenazas: AmenazaViralDA01[];
  curvaNeutralizacion: CurvaNeutralizacionPunto[];
  sentimientoNLP: SentimientoDigitalNLP;
}

// ==========================================
// 2. DASHBOARD DE CENTRO DE OPERACIONES DE RED (NOC)
// ==========================================

export interface NodoTransmisionGeo {
  id: string;
  estacionNombre: string;
  estado: string;
  municipio: string;
  coordenadas: [number, number];
  operatividadTDA: number; // RTV-001 %
  serviciosTvActivos: number; // RTV-002
  serviciosRadioActivos: number;
  potenciaKuSatelital: number; // RTV-006 %
  fallaDetectada: boolean;
  estatusEnergia: 'CORPOELEC_STABLE' | 'PLANTA_ELECTRICA_ACTIVA' | 'UPS_CRITICO' | 'FALLA_TOTAL';
  ultimaTelemetria: string;
}

export interface MonitorEstabilidadMaster {
  disponibilidadSatelitalKu: number; // RTV-009 %
  eficienciaModulacionSenal: number; // EFM %
  nivelRuidoDb: number; // CON-004
  potenciaEmisionKw: number;
  temperaturaTransmisorC: number;
}

export interface RegistroRecuperacionMTTR {
  id: string;
  estacion: string;
  estado: string;
  horaFalla: string;
  horaRecuperacion?: string;
  mttrMinutos: number; // TMR
  tipoFalla: 'ENERGIA' | 'ENLACE_SATELITAL' | 'EQUIPO_TRANSMISOR' | 'FIBRA_OPTICA';
  cuadrillaAsignada: string;
  estatus: 'EN_ATENCION' | 'EN_ESPERA_REPUESTO' | 'RESUELTO';
}

export interface NocInfraestructuraDashboardData {
  resumen: {
    operatividadNacionalTDA: number; // RTV-001 %
    totalServiciosTvActivos: number; // RTV-002
    disponibilidadSatelitalGlobal: number; // RTV-009 %
    mttrPromedioHoras: number; // TMR
    estacionesConAlerta: number;
  };
  nodos: NodoTransmisionGeo[];
  estabilidadMaster: MonitorEstabilidadMaster;
  timelineMTTR: RegistroRecuperacionMTTR[];
}

// ==========================================
// 3. DASHBOARD DE ANALÍTICA DIGITAL Y AUDIENCIAS
// ==========================================

export interface FunnelAudienciaEtapa {
  etapa: 'REACH_BRUTO' | 'VISITAS_PORTAL' | 'LECTURA_PROFUNDA' | 'ENGAGEMENT_ACTIVO';
  nombre: string;
  volumen: number;
  tasaConversionEtapaAnterior: number; // %
  indicadorFuente: string; // V1.4, WEB-001, WEB-007, etc.
}

export interface RendimientoViralEnte {
  enteId: string;
  enteSiglas: string;
  tasaEngagement: number; // RED-ENG %
  crecimientoSeguidoresPct: number; // Índice de Crecimiento
  impresionesTotales: number;
  posteosSemanales: number;
  categoriaRendimiento: 'ALTO_ENG_ALTO_CREC' | 'ALTO_ENG_BAJO_CREC' | 'BAJO_ENG_ALTO_CREC' | 'BAJO_ENG_BAJO_CREC';
}

export interface ConcurrenciaLiveStreamingPunto {
  timestamp: string;
  picoConcurrenciaPCV: number; // STR-001 usuarios simultáneos
  horasVisualizacionAcumuladas: number;
  canalPlataforma: 'YOUTUBE' | 'TWITCH' | 'FACEBOOK' | 'PORTAL_SOBERANO';
  transmisionTitulo: string;
}

export interface AudienciasDigitalDashboardData {
  resumen: {
    audienciaBrutaTotalReach: number; // V1.4
    visitasTotalesWeb: number; // WEB-001
    engagementPromedioEcosistema: number; // RED-ENG
    picoMaximoConcurrenciaStreaming: number; // STR-001
  };
  funnelAudiencia: FunnelAudienciaEtapa[];
  matrizViralEntes: RendimientoViralEnte[];
  concurrenciaEnVivo: ConcurrenciaLiveStreamingPunto[];
}

// ==========================================
// 4. DASHBOARD DE OPERATIVIDAD DE MEDIOS Y DESPLIEGUE
// ==========================================

export interface RadarPasesEnVivoRegion {
  region: 'CENTRAL' | 'OCCIDENTAL' | 'LOS_ANDES' | 'LLANOS' | 'ORIENTAL' | 'GUAYANA' | 'INSULAR' | 'ZULIANA';
  pasesCampoTv: number; // TV-008
  programasRadioEnVivo: number; // RAD-006
  contingenciasCubiertas: number;
  despliegueComunal: number;
}

export interface AlineacionEstrategicaMedio {
  enteSiglas: string;
  tipoMedio: 'TV' | 'RADIO' | 'IMPRESO' | 'DIGITAL';
  cuotaObligatoriaPauta: number; // % meta
  cumplimientoEfectivoIAAE: number; // % logrado
  desviacionPct: number;
  estatusAlineacion: 'CONFORME' | 'OBSERVADO' | 'DEFICITARIO';
}

export type TipoContenidoEje1 = 
  | 'ESCRITO_NOTAS_PRENSA'
  | 'ESCRITO_ARTICULOS_OPINION'
  | 'ESCRITO_COMUNICADOS_OFICIALES'
  | 'ESCRITO_REPORTAJES'
  | 'SONORO_MICROS_RADIALES'
  | 'SONORO_PROGRAMAS_EN_VIVO'
  | 'SONORO_AVANCES_FLASH'
  | 'SONORO_PODCASTS'
  | 'AUDIOVISUAL_PASES_EN_VIVO'
  | 'AUDIOVISUAL_CAPSULAS'
  | 'AUDIOVISUAL_NOTICIEROS'
  | 'AUDIOVISUAL_DOCUMENTALES'
  | 'DIGITAL_INFOGRAFIAS'
  | 'DIGITAL_CARRUSELES'
  | 'DIGITAL_VIDEOS_CORTOS'
  | 'DIGITAL_HILOS_MICROBLOGGING';

export interface MuroProduccionItem {
  id: string;
  familia: 'ESCRITO' | 'SONORO' | 'AUDIOVISUAL' | 'DIGITAL_GRAFICO';
  tipo: TipoContenidoEje1;
  etiqueta: string;
  codigoScic: string;
  cantidadDia: number;
  metaDia: number;
  unidad: string;
  enteEmisor: string;
}

export interface OperatividadMediosDashboardData {
  resumen: {
    totalPiezasProducidasHoy: number;
    pasesEnVivoHoy: number;
    indiceAlineacionGlobalIAAE: number; // %
    coberturaRegionesActivas: number; // de 8
  };
  radarPasesPorRegion: RadarPasesEnVivoRegion[];
  alineacionMedios: AlineacionEstrategicaMedio[];
  muroProduccion: MuroProduccionItem[];
}

// ==========================================
// 5. DASHBOARD EJECUTIVO DE ALTO NIVEL (C-LEVEL / PRESIDENCIA)
// ==========================================

export interface MacroIndicadorCLevel {
  id: string;
  codigo: 'IEC' | 'IRT' | 'ICD' | 'EE' | 'IBS' | 'TRMD' | 'IAAE' | 'IVI';
  nombre: string;
  descripcionCorta: string;
  valor: number;
  unidad: '%' | 'pts' | 'min' | 'indice';
  meta: number;
  deltaSemanaAnterior: number;
  semaforo: 'VERDE' | 'AMARILLO' | 'ROJO';
  responsableArea: string;
}

export interface ExecutiveCLevelDashboardData {
  resumenEjecutivo: {
    fechaCorte: string;
    semanaEpidemiologica: number;
    estadoGeneralSemaforo: 'VERDE' | 'AMARILLO' | 'ROJO';
    sintesisIA: string;
    recomendacionPrioritaria: string;
  };
  macroIndicadores: MacroIndicadorCLevel[];
  alertasDirectasPresidencia: {
    id: string;
    severidad: SeverityLevel;
    titulo: string;
    descripcion: string;
    ente: string;
    fecha: string;
    accionRequerida: string;
  }[];
}

// ==========================================
// GOBERNANZA RACI PARA TABLEROS ESPECIALIZADOS
// ==========================================

export interface TableroRaciConfig {
  modulo: string;
  titulo: string;
  subtitulo: string;
  nivel: 'OPERATIVO' | 'TACTICO' | 'ESTRATEGICO';
  rolesAutorizadosLectura: RACIRole[];
  rolesAutorizadosEscritura: RACIRole[];
  responsableR: string;
  aprobadorA: string;
  consultadoC: string;
  informadoI: string;
}
