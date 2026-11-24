export * from './types/eje2Types';
export * from './types/eje3Types';
export * from './types/eje4Types';
export * from './types/dashboardsTypes';
export * from './data/scicIndicators';
import { Eje2InstrumentoData } from './types/eje2Types';
import { Eje3InstrumentoData } from './types/eje3Types';
import { Eje4InstrumentoData } from './types/eje4Types';

export type IndicatorModule = 
  | 'DASHBOARD'
  | 'DASHBOARD_CIBERDEFENSA'
  | 'DASHBOARD_NOC'
  | 'DASHBOARD_DIGITAL'
  | 'DASHBOARD_OPERATIVIDAD'
  | 'DASHBOARD_EXECUTIVE_CLEVEL'
  | 'CAPTURA'
  | 'CAPTURA_SCIC_ENTE'
  | 'CAPTURA_CONTROL'
  | 'CAPTURA_EJE_1'
  | 'CAPTURA_EJE_2'
  | 'CAPTURA_EJE_3'
  | 'CAPTURA_EJE_4'
  | 'EJE_1_MEDIOS'
  | 'EJE_2_PLATAFORMAS'
  | 'EJE_3_GESTION'
  | 'EJE_4_MIPCCI'
  | 'CATALOGO_SCIC'
  | 'CHECKLIST_ENTES'
  | 'ALERTAS_NOTIFICACIONES'
  | 'AUDITORIA_RACI'
  | 'GESTION_USUARIOS'
  | 'ESTANDARES'
  | 'LOGIN';

export type RACIRole = 
  | 'DIRECTOR_OPERACIONES'  // R - Responsible (Captura y reporta)
  | 'VICEMINISTRO'          // A - Accountable / C - Consulted (Revisa y aprueba)
  | 'MAXIMA_AUTORIDAD'      // I - Informed / Decision Maker (Ministro / Sala Situacional)
  | 'AUDITOR_CONTRALOR';    // Auditoría y Control de Integridad

export type ReportStatus = 'BORRADOR' | 'EN_REVISION' | 'APROBADO' | 'OBSERVADO' | 'CORREGIDO';

export type SeverityLevel = 'CRITICO' | 'ALTO' | 'MEDIO' | 'OPTIMO';

export interface ControlVariables {
  fechaReporte: string;
  semanaEpidemiologica: number;
  responsableEnte: string;
  cedulaIdentidad: string;
  enteAdscrito: string;
  regionLocalidad: string;
  telefono: string;
  correo: string;
  periodoDesde: string;
  periodoHasta: string;
}

export interface EnteInfo {
  id: string;
  nombre: string;
  siglas: string;
  ejePrincipal: 'EJE_1' | 'EJE_2' | 'EJE_3' | 'EJE_4';
  tipo: 'TELEVISION' | 'RADIO' | 'IMPRESO' | 'DIGITAL' | 'TELECOMUNICACIONES' | 'REGULADOR' | 'CULTURA_CINE' | 'CENTRAL' | 'EDITORIAL' | 'PUBLICIDAD_EVENTOS';
  director: string;
  cedula: string;
  email: string;
  telegram: string;
  region: string;
  nominaTotal: number;
}

export interface IndicatorData {
  codigo: string; // e.g. "IMP-001", "RAD-001", "TV-001", "WEB-001", "RED-001", "MON-001", "CON-001", "RTV-001", "GES-001", "CAM-001"
  nombre: string;
  definicion: string;
  formulaCalculo: string;
  fuenteDatos: string;
  eje: 'EJE_1' | 'EJE_2' | 'EJE_3' | 'EJE_4';
  categoria: string;
  frecuencia: 'Diaria' | 'Semanal' | 'Mensual';
  unidad: string;
  meta: number;
  valorLogrado: number;
  varSemanaAnterior: number;
  observaciones?: string;
}

export interface ImpresoRowProduccion {
  codigo: string;
  indicador: string;
  frecuencia: string;
  metaSemanal: number;
  logrado: number;
  varSemanaAnterior: number;
}

export interface ImpresoRowEditorial {
  codigo: string;
  indicador: string;
  frecuencia: string;
  logrado: number;
  observaciones: string;
}

export interface ImpresoRowDistribucion {
  codigo: string;
  indicador: string;
  valor: number;
  totalRef?: number;
  unidad: string;
}

export interface RadioRowAlcance {
  codigo: string;
  indicador: string;
  frecuencia: string;
  metaSemanal: number;
  logrado: number;
  varSemanaAnterior: number;
}

export interface RadioRowProduccion {
  codigo: string;
  indicador: string;
  frecuencia: string;
  logrado: number;
  observaciones: string;
}

export interface RadioRowTematico {
  tematica: string;
  numProgramas: number;
  horasTransmision: number;
  audienciaEstimada: number;
}

export interface RadioRowInfraestructura {
  codigo: string;
  indicador: string;
  valor: number;
  totalRef?: number;
  unidad?: string;
  observaciones: string;
}

export interface TVRowAlcance {
  codigo: string;
  indicador: string;
  frecuencia: string;
  metaSemanal: number;
  logrado: number;
  varSemanaAnterior: number;
}

export interface TVRowProduccion {
  codigo: string;
  indicador: string;
  frecuencia: string;
  logrado: number;
  observaciones: string;
}

export interface TVRowDesgloseProduccion {
  tipoContenido: string;
  numPiezas: number;
  duracionTotalHoras: number;
  porcentajeParrilla: number;
}

export interface TVRowLogistica {
  codigo: string;
  indicador: string;
  valor: number;
  totalRef?: number;
  observaciones: string;
}

export interface DigitalRowPortales {
  codigo: string;
  indicador: string;
  frecuencia: string;
  metaSemanal: number;
  logrado: number;
  varSemanaAnterior: number;
}

export interface DigitalRowTematico {
  categoria: string;
  articulosPublicados: number;
  visitasGeneradas: number;
  tiempoPromedioMin: number;
}

export interface DigitalRowSuscripciones {
  codigo: string;
  indicador: string;
  valor: number;
  observaciones: string;
}

export interface DigitalRowTramites {
  codigo: string;
  indicador: string;
  valor: number;
  totalRef?: number;
  unidad?: string;
  observaciones: string;
}

export interface RedesRowKpisCanales {
  plataforma: string;
  metaSemanalVistas: number;
  vistasLogradas: number;
  varSemanaAnterior: number;
  interaccionesTotales: number;
  impresionesNetas: number;
  tasaEngagement: number; // EE % = (interacciones / vistas) * 100
}

export interface RedesRowAlcanceAudiencia {
  plataforma: string;
  seguidoresTotales: number;
  nuevosSeguidores: number;
  crecimientoPorc: number;
  alcanceOrganico: number;
  alcancePagado: number;
}

export interface RedesRowProduccionTactica {
  codigo: string;
  tipoContenido: string;
  unidades: number;
  observaciones: string;
}

export interface RedesRowEntrevista {
  tipoEntrevistado: string;
  numEntrevistas: number;
  plataformaPrincipal: string;
  alcanceEstimado: number;
}

export interface RedesRowCreadores {
  codigo: string;
  indicador: string;
  valor: number;
  observaciones: string;
}

export interface RedesRowCanalActivo {
  canalCuenta: string;
  plataforma: string;
  seguidores: number;
  crecimientoPorc: number;
  contenidoDestacado: string;
}

export interface RedesRowEngagementContenido {
  tipoContenido: string;
  publicaciones: number;
  interacciones: number;
  comentarios: number;
  compartidos: number;
  guardados: number;
  eePromedio: number;
}

export interface Eje1InstrumentoData {
  impresos: {
    produccion: ImpresoRowProduccion[];
    editorial: ImpresoRowEditorial[];
    distribucion: ImpresoRowDistribucion[];
  };
  radios: {
    alcance: RadioRowAlcance[];
    produccion: RadioRowProduccion[];
    desgloseTematico: RadioRowTematico[];
    infraestructura: RadioRowInfraestructura[];
  };
  audiovisuales: {
    alcance: TVRowAlcance[];
    produccion: TVRowProduccion[];
    desgloseProduccion: TVRowDesgloseProduccion[];
    logistica: TVRowLogistica[];
  };
  digitales: {
    portales: DigitalRowPortales[];
    contenidoTematico: DigitalRowTematico[];
    suscripciones: DigitalRowSuscripciones[];
    tramitesServicios: DigitalRowTramites[];
  };
  redesSociales: {
    kpisCanales: RedesRowKpisCanales[];
    alcanceAudiencia: RedesRowAlcanceAudiencia[];
    produccionTactica: RedesRowProduccionTactica[];
    entrevistas: RedesRowEntrevista[];
    creadoresAliados: RedesRowCreadores[];
    canalesActivos: RedesRowCanalActivo[];
    engagementPorContenido: RedesRowEngagementContenido[];
  };
}

export interface MediaOperationalData {
  // Impresos (IMP-001 to IMP-017)
  ejemplaresImpresos: number; // IMP-001
  tirajeTotal: number; // IMP-002
  ejemplaresZonasAfectadas: number; // IMP-003
  coberturaMunicipiosImpresos: number; // IMP-004
  suplementosEspeciales: number; // IMP-005
  notasPrensaImpresas: number; // IMP-006
  articulosOpinion: number; // IMP-007
  entrevistasImpresas: number; // IMP-008
  contenidoSismoImpreso: number; // IMP-009
  puntosDistribucionActivos: number; // IMP-013
  rutasAfectadas: number; // IMP-015
  personalDistribucion: number; // IMP-016
  unidadesTransporteTotal: number;
  unidadesTransporteOperativas: number; // IMP-017

  // Radios (RAD-001 to RAD-018)
  horasTransmisionRadio: number; // RAD-001
  operatividadSenalRadio: number; // RAD-002 (%)
  coberturaMunicipiosRadio: number; // RAD-003
  audienciaRatingRadio: number; // RAD-004
  senalZonasAfectadasRadio: number; // RAD-005 (%)
  programasEnVivoRadio: number; // RAD-006
  horasProgramacionPropiaRadio: number; // RAD-007
  boletinesRadio: number; // RAD-008
  microprogramasContingenciaRadio: number; // RAD-009
  transmisoresRadioTotal: number;
  transmisoresRadioOperativos: number; // RAD-014
  potenciaTransmisionRadio: number; // RAD-015 (%)
  plantasEmergenciaRadioTotal: number;
  plantasEmergenciaRadioOperativas: number; // RAD-016
  tiempoCaidaRadioMin: number; // RAD-018

  // Television (TV-001 to TV-019)
  horasTransmisionTV: number; // TV-001
  operatividadSenalTV: number; // TV-002 (%)
  coberturaNacionalTV: number; // TV-003 (%)
  senalTDAOperativaTV: number; // TV-004 (%)
  canalesSatelitalesActivosTV: number; // TV-005
  programasProducidosTV: number; // TV-006
  horasProgramacionPropiaTV: number; // TV-007
  pasesEnVivoCampoTV: number; // TV-008
  coberturasEspecialesTV: number; // TV-009
  unidadesMovilesTotal: number;
  unidadesMovilesOperativas: number; // TV-014
  camarasProduccionTotal: number;
  camarasProduccionOperativas: number; // TV-015
  equiposEdicionTotal: number;
  equiposEdicionOperativos: number; // TV-016
  plantasEmergenciaTVTotal: number;
  plantasEmergenciaTVOperativas: number; // TV-017
  personalTecnicoTV: number; // TV-018
  personalCampoTV: number; // TV-019

  // Medios Digitales (WEB-001 to WEB-018)
  visitasPortalWeb: number; // WEB-001
  usuariosUnicosWeb: number; // WEB-002
  paginasVistasWeb: number; // WEB-003
  tiempoPromedioSesionMin: number; // WEB-004
  tasaReboteWeb: number; // WEB-005 (%)
  contenidosPublicadosWeb: number; // WEB-006
  multimediaPublicadoWeb: number; // WEB-007
  boletinesSuscritosWeb: number; // WEB-008
  usuariosRegistradosWeb: number; // WEB-009
  notificacionesPushWeb: number; // WEB-010
  nuevosSuscriptoresSemanaWeb: number; // WEB-012
  tramitesDigitalesTotal: number;
  tramitesDigitalesDisponibles: number; // WEB-013
  solicitudesSIVERIF: number; // WEB-014
  registrosPNI: number; // WEB-015
  tasaRespuestaSolicitudes: number; // WEB-018 (%)

  // Redes Sociales (RED-001 to RED-016)
  metaVistasDigital: number;
  vistasLogradasDigital: number;
  interaccionesTotalesDigital: number;
  impresionesNetasDigital: number;
  alcanceOrganicoDigital: number;
  alcancePagadoDigital: number;
  seguidoresTotalesDigital: number;
  nuevosSeguidoresDigital: number;
  contenidoTotalPublicadoRedes: number; // RED-001
  formatoVideoReelsTikTok: number; // RED-002
  formatoEstaticoFlyers: number; // RED-004
  radialDigitalizadoRedes: number; // RED-005
  pasesEnVivoRedes: number; // RED-006
  creadoresActivosRedes: number; // RED-012
  vistasRedesAliadas: number; // RED-013
  articulacionMediosPrivados: number; // RED-014
  hashtagsMonitorizados: number; // RED-016
}

export interface PlatformsTechnicalData {
  // REDTV Operatividad
  operatividadNacionalTDA: number; // RTV-001 (%)
  metaTDA: number;
  serviciosTVActivosTDA: number; // RTV-002
  serviciosTVTotalTDA: number;
  serviciosRadioActivosTDA: number; // RTV-003
  serviciosRadioTotalTDA: number;
  estacionesTDAOperativas: number; // RTV-004
  estacionesTDATotal: number;
  coberturaGeograficaTDA: number; // RTV-005 (%)
  
  // Banda Satelital Ku
  potenciaBandaKu: number; // RTV-006 (%)
  canalesSatelitalesReactivados: number; // RTV-007
  canalesSatelitalesTotal: number; // RTV-008
  canalesSatelitalesOperativos: number;
  disponibilidadEnlaceSatelital: number; // RTV-009 (%)
  tiempoCaidaSatelitalMin: number; // RTV-010

  // Infraestructura de Transmisores y Microondas
  transmisoresTVTotal: number;
  transmisoresTVOperativos: number; // RTV-011
  transmisoresRadioTotal: number;
  transmisoresRadioOperativos: number; // RTV-012
  enlacesMicroondasTotal: number;
  enlacesMicroondasOperativos: number; // RTV-013
  plantasRespaldoTotal: number;
  plantasRespaldoOperativas: number; // RTV-014
  capacidadTransmisionDisponible: number; // RTV-015 (%)

  // CONATEL Regulación & Monitoreo
  reportesPrimerasPlanasRegulatorias: number; // CON-001
  concesionesOtorgadas: number; // CON-002
  habilitacionesProcesadas: number; // CON-003
  homologacionesEquipos: number; // CON-004
  inspeccionesTecnicas: number; // CON-005
  multasSancionesAplicadas: number; // CON-006
  estacionesMonitoreoEspectroTotal: number;
  estacionesMonitoreoEspectroOperativas: number; // CON-009
  espectroRadioelectricoMonitoreado: number; // CON-010 (%)
  interferenciasDetectadas: number; // CON-011
  operadoresIrregulares: number; // CON-012
  mediosMonitoreadosCuotasResorte: number; // CON-014
  cumplimientoContenidoNacionalResorte: number; // CON-015 (%)
  cumplimientoContenidoEducativoResorte: number; // CON-016 (%)
  cumplimientoFranjaInfantilResorte: number; // CON-017 (%)
  caidasServicioReportadas: number;
  ciberataquesDetectados: number;
  resolucionIncidentesPorcentaje: number;
}

export interface CriticalTowerStatus {
  id: string;
  nombre: string;
  ubicacion: string;
  estado: string;
  coordenadas: [number, number];
  potenciaActual: number; // %
  temperatura: number; // C
  operatividadSenal: number; // %
  fallaDetectada: boolean;
  tipoFalla?: string;
  transmisorTDA: 'OPERATIVO' | 'ALERTA' | 'CRITICO';
  enlaceMicroondas: 'OPERATIVO' | 'ALERTA' | 'CRITICO';
  plantaElectrica: 'OPERATIVO' | 'EN_USO' | 'FALLA';
  poblacionBeneficiada: number;
  municipiosCubiertos: string[];
  ultimaRevision: string;
}

export interface OpinionMatrixAlert {
  id: string;
  codigo: string; // MON-001
  titulo: string;
  tematica: 'DESINFORMACION_SISMO' | 'RUMORES_SEGURIDAD' | 'DESINFORMACION_SERVICIOS' | 'FAKE_NEWS_SALUD' | 'INSTITUCIONAL' | 'INTERNACIONAL';
  origen: string; // X, TikTok, WhatsApp, etc.
  amenazaFraseViral: string;
  fechaHora: string;
  nivelRiesgo: 'CRITICO' | 'ALTO' | 'MEDIO';
  impactoEstimadoVistas: number;
  estado: 'DETECTADA' | 'EN_ANALISIS' | 'CONTRARRESTADA' | 'NEUTRALIZADA';
  accionesContrarrestacion: string;
  voceriaAsignada?: string;
  narrativaOficialSugerida?: string;
}

export interface TalentVulnerabilityRow {
  ente: string;
  totalPersonal: number;
  nivelRojo: number; // Alto riesgo / vulnerabilidad
  nivelAmarillo: number; // Riesgo moderado
  nivelVerde: number; // Sin riesgo / condiciones óptimas
  porEvaluar: number;
  sinClasificar: number;
  iviCalculado: number; // (Rojo*3 + Amarillo*1 + Verde*0) / TotalPersonal
}

export interface StrategicMIPCCIData {
  // Despacho Viceministerios & Transmedia
  comunicadosOficialesEmitidos: number;
  piezasTelefoniaMovilCanalesPresidencia: number;
  tendenciasViralesDesestabilizadoras: number;

  // SEO Editorial
  traficoOrganicoTotal: number;
  impresionesBuscadores: number;
  clicsBuscadores: number;
  ctrOrganico: number; // %
  tasaConversionSuscriptores: number; // %

  // Formación y Soberanía Tecnológica
  trabajadoresSNMPCapacitados: number; // V1
  pniFormadosMarcoEtico: number; // V2
  totalNominaSNMP: number; // V3 (Dato Maestro)
  mediosComunitariosMACGeorreferenciados: number;
  solicitudesComunalesInfraestructura: number;
  vocerosComunitariosCapacitados3_0: number;

  // Acceso y Cobertura Nacional
  hogaresInternetActivoTHAI: number;
  universoHogaresNacional: number; // Dato Maestro
  lineasBandaAnchaMovilTPBAM: number;
  poblacionTotalEstimada: number; // Dato Maestro
  usuariosActivosMensualesDigitalIPMD: number;
  poblacionAccesoInternet: number; // Dato Maestro
}

export interface MunicipalityData {
  codigoINE: string;
  nombre: string;
  estado: string;
  region: string;
  poblacion: number;
  hogares: number;
  coberturaEfectivaRadioTV: number; // %
  penetracionInternet: number; // %
  estatusSenal: 'OPTIMO' | 'ESTABLE' | 'VULNERABLE' | 'CRITICO';
  mediosComunitariosActivos: number;
  torreTransmisionCercana: string;
  tdaDisponible: boolean;
  bandaKuDisponible: boolean;
  alertasActivas: number;
}

export interface CalculatedMasterKPIs {
  // 1. Tasa de Engagement (EE) = (Interacciones Totales / Vistas Logradas) * 100
  ee: number;
  
  // 2. Índice de Vulnerabilidad Institucional (IVI) = (Rojo*3 + Amarillo*1 + Verde*0) / TotalPersonal
  ivi: number;
  
  // 3. Índice de Cobertura Digital (ICD) = (Sum Alcance / Sum Meta) * 100
  icd: number;
  
  // 4. Índice de Resiliencia Técnica (IRT) = (% TDA + % Banda Ku + % Señal Medios) / 3
  irt: number;
  
  // 5. KPI Maestro: Índice de Efectividad Comunicacional (IEC) = (EE_promedio + ICD + IRT) / 3
  iec: number;
  
  // Secondary compound metrics
  thai: number; // Tasa Hogares con Acceso a Internet
  tpbam: number; // Tasa Penetración Banda Ancha Móvil
  ipmd: number; // Índice Penetración Medios Digitales
  cumplimientoResortePromedio: number;
}

export interface ValidationItem {
  id: string;
  nivel: 1 | 2 | 3;
  nivelNombre: 'Integridad de Entrada' | 'Consistencia Lógica' | 'Validación Cruzada';
  titulo: string;
  descripcion: string;
  esValido: boolean;
  campo?: string;
  valorActual?: any;
  valorEsperado?: any;
  severidad: 'ERROR' | 'ADVERTENCIA' | 'INFO';
}

export interface FullWeeklyReport {
  id: string;
  codigoReporte: string; // e.g. MPPCI-REP-2026-W35-VTV
  control: ControlVariables;
  status: ReportStatus;
  raci: {
    capturador: { nombre: string; cedula: string; cargo: string; fecha: string };
    viceministroRevisor?: { nombre: string; cargo: string; aprobado: boolean; fecha?: string; notas?: string };
    maximaAutoridadEnterada?: { nombre: string; visto: boolean; fecha?: string };
  };
  mediosData: MediaOperationalData;
  eje1Data?: Eje1InstrumentoData;
  eje2Data?: Eje2InstrumentoData;
  eje3Data?: Eje3InstrumentoData;
  eje4Data?: Eje4InstrumentoData;
  plataformasData: PlatformsTechnicalData;
  strategicData: StrategicMIPCCIData;
  vulnerabilityRows: TalentVulnerabilityRow[];
  opinionAlerts: OpinionMatrixAlert[];
  kpisCalculados: CalculatedMasterKPIs;
  validaciones: ValidationItem[];
  esCargaTardia: boolean; // Si fue enviado despues del Lunes 10:00 AM
  hashIntegridad: string;
  fechaCreacion: string;
  fechaUltimaModificacion: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  usuario: string;
  cedula?: string;
  rol: RACIRole;
  ente?: string;
  accion: string;
  modulo?: string;
  indicadorCodigo?: string;
  detalles?: string;
  descripcion?: string;
  hash?: string;
  hashTrazabilidad?: string;
  ip: string;
}

export type AuditLogEntry = AuditLog;

export interface AutoNotification {
  id: string;
  timestamp?: string;
  fechaEmision?: string;
  tipo: string;
  severidad?: 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA';
  destinatarioEnte: string;
  destinatarioResponsable: string;
  correo?: string;
  telegram?: string;
  asunto: string;
  mensaje: string;
  estado?: string;
  estadoEnvio?: 'ENVIADO' | 'PENDIENTE' | 'FALLIDO';
  canal?: 'TELEGRAM' | 'EMAIL' | 'AMBOS';
  canales?: string[];
  leido?: boolean;
}

export type AutomatedAlertNotification = AutoNotification;

export type SystemRole = 
  | 'SUPER_ADMIN'
  | 'MINISTRO'
  | 'VICEMINISTRO'
  | 'DIRECTOR_GENERAL'
  | 'SALA_OPERATIVA_ENTE'
  | 'ANALISTA_ESTADISTICA'
  | 'AUDITOR_CONTRALOR';

export type UserStatus = 'ACTIVO' | 'INACTIVO' | 'SUSPENDIDO' | 'BLOQUEADO';

export type EnrollmentStatus = 'PRECARGADO' | 'ENROLADO' | 'BLOQUEADO';

export type AccessLevel = 'LECTURA' | 'CAPTURA_EDICION' | 'APROBACION_FIRMA' | 'ADMIN_TOTAL';

export interface UserAccount {
  id: string;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  telefono: string;
  telegram?: string;
  enteAdscrito: string; // ID / Siglas del Ente (VTV, RNV, REDTV, MPPCI Central, etc.)
  cargo: string;
  dependencia: string;
  rolSistema: SystemRole;
  raciRole: RACIRole;
  estado: UserStatus;
  nivelAcceso: AccessLevel;
  permisosModulos: IndicatorModule[];
  dobleFactorAuth: boolean;
  ultimoAcceso: string;
  fechaCreacion: string;
  intentosFallidos: number;
  avatarBg?: string;
  // Formalización Multi-Dispositivo y Seguridad Criptográfica
  estatusEnrolamiento?: EnrollmentStatus;
  fotoPerfilUrl?: string;
  boundDeviceId?: string;
  boundDeviceNombre?: string;
  fechaEnrolamiento?: string;
  passwordHash?: string;
  passwordSalt?: string;
}

export interface RoleDefinition {
  id: SystemRole;
  nombre: string;
  siglas: string;
  descripcion: string;
  categoria: 'ESTRATEGICO' | 'OPERATIVO' | 'REVISION' | 'FISCALIZACION' | 'SISTEMA';
  raciEquivalente: RACIRole;
  nivelSeguridad: 'ALTO' | 'CRITICO' | 'MEDIO' | 'ESTANDAR';
  permisosDefault: IndicatorModule[];
  capacidades: string[];
  usuariosCount: number;
  colorBadge: string;
}


