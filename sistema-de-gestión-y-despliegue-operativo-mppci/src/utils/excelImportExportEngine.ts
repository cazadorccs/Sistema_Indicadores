import * as XLSX from 'xlsx';
import { 
  FullWeeklyReport, 
  MediaOperationalData, 
  PlatformsTechnicalData, 
  StrategicMIPCCIData,
  ControlVariables,
  Eje1InstrumentoData
} from '../types';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from './engine';
import { SCIC_INDICATORS_DATA } from '../data/scicIndicators';

export interface IndicatorMappingDef {
  codigo: string;
  indicador: string;
  eje: string;
  frecuencia: 'Diaria' | 'Semanal' | 'Mensual';
  unidad: string;
  targetGroup: 'MEDIOS' | 'PLATAFORMAS' | 'ESTRATEGICO' | 'SCIC';
  targetField: string;
  isPercentage?: boolean;
}

/**
 * Catálogo Maestro de Mapeo Operativo (Código Oficial -> Clave de Estado en el Reporte)
 */
export const MASTER_INDICATOR_MAPPINGS: IndicatorMappingDef[] = [
  // --- 1.A MEDIOS IMPRESOS ---
  { codigo: 'IMP-001', indicador: 'Ejemplares impresos y distribuidos', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Ejemplares', targetGroup: 'MEDIOS', targetField: 'ejemplaresImpresos' },
  { codigo: 'IMP-002', indicador: 'Tiraje total (unidades físicas)', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Unidades', targetGroup: 'MEDIOS', targetField: 'tirajeTotal' },
  { codigo: 'IMP-003', indicador: 'Ejemplares en zonas afectadas', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Ejemplares', targetGroup: 'MEDIOS', targetField: 'ejemplaresZonasAfectadas' },
  { codigo: 'IMP-004', indicador: 'Porcentaje de cobertura territorial (municipios)', eje: 'Eje 1: Impresos', frecuencia: 'Semanal', unidad: '%', targetGroup: 'MEDIOS', targetField: 'coberturaMunicipiosImpresos', isPercentage: true },
  { codigo: 'IMP-005', indicador: 'Número de suplementos especiales (contingencia)', eje: 'Eje 1: Impresos', frecuencia: 'Semanal', unidad: 'Unidades', targetGroup: 'MEDIOS', targetField: 'suplementosEspeciales' },
  { codigo: 'IMP-006', indicador: 'Notas de prensa publicadas', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Notas', targetGroup: 'MEDIOS', targetField: 'notasPrensaImpresas' },
  { codigo: 'IMP-007', indicador: 'Artículos de opinión / análisis', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Artículos', targetGroup: 'MEDIOS', targetField: 'articulosOpinion' },
  { codigo: 'IMP-008', indicador: 'Entrevistas impresas realizadas', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Entrevistas', targetGroup: 'MEDIOS', targetField: 'entrevistasImpresas' },
  { codigo: 'IMP-009', indicador: 'Contenidos impresos especiales de contingencia', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Publicaciones', targetGroup: 'MEDIOS', targetField: 'contenidoSismoImpreso' },
  { codigo: 'IMP-013', indicador: 'Puntos de distribución activos', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Puntos', targetGroup: 'MEDIOS', targetField: 'puntosDistribucionActivos' },
  { codigo: 'IMP-015', indicador: 'Rutas de distribución afectadas', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Rutas', targetGroup: 'MEDIOS', targetField: 'rutasAfectadas' },
  { codigo: 'IMP-016', indicador: 'Personal operativo de distribución desplegado', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Personas', targetGroup: 'MEDIOS', targetField: 'personalDistribucion' },
  { codigo: 'IMP-017', indicador: 'Unidades de transporte operativas', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Vehículos', targetGroup: 'MEDIOS', targetField: 'unidadesTransporteOperativas' },

  // --- 1.B MEDIOS RADIALES ---
  { codigo: 'RAD-001', indicador: 'Horas de transmisión radial semanales', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Horas', targetGroup: 'MEDIOS', targetField: 'horasTransmisionRadio' },
  { codigo: 'RAD-002', indicador: 'Operatividad de señal de transmisión radial', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: '%', targetGroup: 'MEDIOS', targetField: 'operatividadSenalRadio', isPercentage: true },
  { codigo: 'RAD-003', indicador: 'Municipios cubiertos por señal radial', eje: 'Eje 1: Radios', frecuencia: 'Semanal', unidad: 'Municipios', targetGroup: 'MEDIOS', targetField: 'coberturaMunicipiosRadio' },
  { codigo: 'RAD-004', indicador: 'Rating estimado de audiencia radial', eje: 'Eje 1: Radios', frecuencia: 'Semanal', unidad: 'Puntos Rating', targetGroup: 'MEDIOS', targetField: 'audienciaRatingRadio' },
  { codigo: 'RAD-005', indicador: 'Señal radial en zonas prioritarias / afectadas', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: '%', targetGroup: 'MEDIOS', targetField: 'senalZonasAfectadasRadio', isPercentage: true },
  { codigo: 'RAD-006', indicador: 'Programas en vivo transmitidos en radio', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Programas', targetGroup: 'MEDIOS', targetField: 'programasEnVivoRadio' },
  { codigo: 'RAD-007', indicador: 'Horas de programación propia en radio', eje: 'Eje 1: Radios', frecuencia: 'Semanal', unidad: 'Horas', targetGroup: 'MEDIOS', targetField: 'horasProgramacionPropiaRadio' },
  { codigo: 'RAD-008', indicador: 'Boletines informativos emitidos', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Boletines', targetGroup: 'MEDIOS', targetField: 'boletinesRadio' },
  { codigo: 'RAD-009', indicador: 'Microprogramas de contingencia / orientación', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Micros', targetGroup: 'MEDIOS', targetField: 'microprogramasContingenciaRadio' },
  { codigo: 'RAD-014', indicador: 'Transmisores de radio operativos', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Equipos', targetGroup: 'MEDIOS', targetField: 'transmisoresRadioOperativos' },
  { codigo: 'RAD-015', indicador: 'Potencia promedio de transmisión radial', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: '%', targetGroup: 'MEDIOS', targetField: 'potenciaTransmisionRadio', isPercentage: true },
  { codigo: 'RAD-016', indicador: 'Plantas eléctricas de radio operativas', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Plantas', targetGroup: 'MEDIOS', targetField: 'plantasEmergenciaRadioOperativas' },
  { codigo: 'RAD-018', indicador: 'Tiempo acumulado de caída de señal radial', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Minutos', targetGroup: 'MEDIOS', targetField: 'tiempoCaidaRadioMin' },

  // --- 1.C TELEVISIÓN ABIERTA Y POR SUSCRIPCIÓN ---
  { codigo: 'TV-001', indicador: 'Horas de transmisión televisiva semanales', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Horas', targetGroup: 'MEDIOS', targetField: 'horasTransmisionTV' },
  { codigo: 'TV-002', indicador: 'Operatividad de señal abierta de TV', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: '%', targetGroup: 'MEDIOS', targetField: 'operatividadSenalTV', isPercentage: true },
  { codigo: 'TV-003', indicador: 'Cobertura nacional de televisión', eje: 'Eje 1: Televisión', frecuencia: 'Semanal', unidad: '%', targetGroup: 'MEDIOS', targetField: 'coberturaNacionalTV', isPercentage: true },
  { codigo: 'TV-004', indicador: 'Señal TDA operativa de televisión', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: '%', targetGroup: 'MEDIOS', targetField: 'senalTDAOperativaTV', isPercentage: true },
  { codigo: 'TV-005', indicador: 'Canales satelitales activos en grilla', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Canales', targetGroup: 'MEDIOS', targetField: 'canalesSatelitalesActivosTV' },
  { codigo: 'TV-006', indicador: 'Programas producidos en televisión', eje: 'Eje 1: Televisión', frecuencia: 'Semanal', unidad: 'Programas', targetGroup: 'MEDIOS', targetField: 'programasProducidosTV' },
  { codigo: 'TV-007', indicador: 'Horas de programación propia en TV', eje: 'Eje 1: Televisión', frecuencia: 'Semanal', unidad: 'Horas', targetGroup: 'MEDIOS', targetField: 'horasProgramacionPropiaTV' },
  { codigo: 'TV-008', indicador: 'Pases en vivo desde campo realizados', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Pases', targetGroup: 'MEDIOS', targetField: 'pasesEnVivoCampoTV' },
  { codigo: 'TV-009', indicador: 'Coberturas especiales y pautas de TV', eje: 'Eje 1: Televisión', frecuencia: 'Semanal', unidad: 'Coberturas', targetGroup: 'MEDIOS', targetField: 'coberturasEspecialesTV' },
  { codigo: 'TV-014', indicador: 'Unidades móviles de TV operativas', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Unidades', targetGroup: 'MEDIOS', targetField: 'unidadesMovilesOperativas' },
  { codigo: 'TV-015', indicador: 'Cámaras de producción operativas', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Cámaras', targetGroup: 'MEDIOS', targetField: 'camarasProduccionOperativas' },
  { codigo: 'TV-016', indicador: 'Islas de edición operativas', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Islas', targetGroup: 'MEDIOS', targetField: 'equiposEdicionOperativos' },
  { codigo: 'TV-017', indicador: 'Plantas eléctricas de respaldo TV operativas', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Plantas', targetGroup: 'MEDIOS', targetField: 'plantasEmergenciaTVOperativas' },
  { codigo: 'TV-018', indicador: 'Personal técnico de televisión desplegado', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Personas', targetGroup: 'MEDIOS', targetField: 'personalTecnicoTV' },
  { codigo: 'TV-019', indicador: 'Personal de campo y reportería desplegado', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Personas', targetGroup: 'MEDIOS', targetField: 'personalCampoTV' },

  // --- 1.D MEDIOS DIGITALES ---
  { codigo: 'WEB-001', indicador: 'Visitas totales a portales web públicos', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Visitas', targetGroup: 'MEDIOS', targetField: 'visitasPortalWeb' },
  { codigo: 'WEB-002', indicador: 'Usuarios únicos en portales web', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: 'Usuarios', targetGroup: 'MEDIOS', targetField: 'usuariosUnicosWeb' },
  { codigo: 'WEB-003', indicador: 'Páginas vistas en portales web', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Páginas', targetGroup: 'MEDIOS', targetField: 'paginasVistasWeb' },
  { codigo: 'WEB-004', indicador: 'Tiempo promedio de sesión en web', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: 'Minutos', targetGroup: 'MEDIOS', targetField: 'tiempoPromedioSesionMin' },
  { codigo: 'WEB-005', indicador: 'Tasa de rebote en portales web', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: '%', targetGroup: 'MEDIOS', targetField: 'tasaReboteWeb', isPercentage: true },
  { codigo: 'WEB-006', indicador: 'Contenidos publicados en portales web', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Artículos', targetGroup: 'MEDIOS', targetField: 'contenidosPublicadosWeb' },
  { codigo: 'WEB-007', indicador: 'Piezas multimedia publicadas en web', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Piezas', targetGroup: 'MEDIOS', targetField: 'multimediaPublicadoWeb' },
  { codigo: 'WEB-008', indicador: 'Boletines suscritos / suscriptores newsletter', eje: 'Eje 1: Digitales', frecuencia: 'Mensual', unidad: 'Suscriptores', targetGroup: 'MEDIOS', targetField: 'boletinesSuscritosWeb' },
  { codigo: 'WEB-009', indicador: 'Usuarios registrados en plataformas digitales', eje: 'Eje 1: Digitales', frecuencia: 'Mensual', unidad: 'Registros', targetGroup: 'MEDIOS', targetField: 'usuariosRegistradosWeb' },
  { codigo: 'WEB-010', indicador: 'Notificaciones push emitidas', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Notificaciones', targetGroup: 'MEDIOS', targetField: 'notificacionesPushWeb' },
  { codigo: 'WEB-012', indicador: 'Nuevos suscriptores en la semana', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: 'Suscriptores', targetGroup: 'MEDIOS', targetField: 'nuevosSuscriptoresSemanaWeb' },
  { codigo: 'WEB-013', indicador: 'Trámites digitales disponibles al público', eje: 'Eje 1: Digitales', frecuencia: 'Mensual', unidad: 'Trámites', targetGroup: 'MEDIOS', targetField: 'tramitesDigitalesDisponibles' },
  { codigo: 'WEB-014', indicador: 'Solicitudes atendidas por SIVERIF', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: 'Solicitudes', targetGroup: 'MEDIOS', targetField: 'solicitudesSIVERIF' },
  { codigo: 'WEB-015', indicador: 'Registros PNI gestionados en línea', eje: 'Eje 1: Digitales', frecuencia: 'Mensual', unidad: 'Registros', targetGroup: 'MEDIOS', targetField: 'registrosPNI' },
  { codigo: 'WEB-018', indicador: 'Tasa de respuesta a solicitudes digitales', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: '%', targetGroup: 'MEDIOS', targetField: 'tasaRespuestaSolicitudes', isPercentage: true },

  // --- 1.E REDES SOCIALES ---
  { codigo: 'RED-001', indicador: 'Contenido total publicado en redes sociales', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Publicaciones', targetGroup: 'MEDIOS', targetField: 'contenidoTotalPublicadoRedes' },
  { codigo: 'RED-002', indicador: 'Videos cortos / Reels / TikTok publicados', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Videos', targetGroup: 'MEDIOS', targetField: 'formatoVideoReelsTikTok' },
  { codigo: 'RED-004', indicador: 'Flyers e infografías publicados en redes', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Diseños', targetGroup: 'MEDIOS', targetField: 'formatoEstaticoFlyers' },
  { codigo: 'RED-005', indicador: 'Audios y podcasts digitalizados para redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Audios', targetGroup: 'MEDIOS', targetField: 'radialDigitalizadoRedes' },
  { codigo: 'RED-006', indicador: 'Transmisiones en vivo multiplataforma', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Transmisiones', targetGroup: 'MEDIOS', targetField: 'pasesEnVivoRedes' },
  { codigo: 'RED-012', indicador: 'Creadores y activadores digitales activos', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Activadores', targetGroup: 'MEDIOS', targetField: 'creadoresActivosRedes' },
  { codigo: 'RED-013', indicador: 'Vistas acumuladas en redes aliadas', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Vistas', targetGroup: 'MEDIOS', targetField: 'vistasRedesAliadas' },
  { codigo: 'RED-014', indicador: 'Articulación y republicación en medios', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Impactos', targetGroup: 'MEDIOS', targetField: 'articulacionMediosPrivados' },
  { codigo: 'RED-016', indicador: 'Hashtags y tendencias monitorizadas', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Hashtags', targetGroup: 'MEDIOS', targetField: 'hashtagsMonitorizados' },
  { codigo: 'RED-017', indicador: 'Meta semanal de vistas digitales', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Vistas', targetGroup: 'MEDIOS', targetField: 'metaVistasDigital' },
  { codigo: 'RED-018', indicador: 'Vistas totales logradas en redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Vistas', targetGroup: 'MEDIOS', targetField: 'vistasLogradasDigital' },
  { codigo: 'RED-019', indicador: 'Interacciones totales en redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Interacciones', targetGroup: 'MEDIOS', targetField: 'interaccionesTotalesDigital' },
  { codigo: 'RED-020', indicador: 'Impresiones netas en redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Impresiones', targetGroup: 'MEDIOS', targetField: 'impresionesNetasDigital' },
  { codigo: 'RED-021', indicador: 'Alcance orgánico en redes sociales', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Cuentas', targetGroup: 'MEDIOS', targetField: 'alcanceOrganicoDigital' },
  { codigo: 'RED-022', indicador: 'Alcance publicitario / pagado en redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Cuentas', targetGroup: 'MEDIOS', targetField: 'alcancePagadoDigital' },
  { codigo: 'RED-023', indicador: 'Seguidores totales consolidados', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Seguidores', targetGroup: 'MEDIOS', targetField: 'seguidoresTotalesDigital' },
  { codigo: 'RED-024', indicador: 'Nuevos seguidores ganados en la semana', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Seguidores', targetGroup: 'MEDIOS', targetField: 'nuevosSeguidoresDigital' },

  // --- EJE 2: PLATAFORMAS TÉCNICAS (REDTV & CONATEL) ---
  { codigo: 'RTV-001', indicador: 'Operatividad Nacional de señal TDA', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: '%', targetGroup: 'PLATAFORMAS', targetField: 'operatividadNacionalTDA', isPercentage: true },
  { codigo: 'RTV-002', indicador: 'N° de Servicios de TV activos en TDA', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Servicios', targetGroup: 'PLATAFORMAS', targetField: 'serviciosTVActivosTDA' },
  { codigo: 'RTV-003', indicador: 'N° de Servicios de Radio activos en TDA', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Servicios', targetGroup: 'PLATAFORMAS', targetField: 'serviciosRadioActivosTDA' },
  { codigo: 'RTV-004', indicador: 'Estaciones TDA operativas a nivel nacional', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Estaciones', targetGroup: 'PLATAFORMAS', targetField: 'estacionesTDAOperativas' },
  { codigo: 'RTV-005', indicador: 'Cobertura geográfica nacional TDA', eje: 'Eje 2: REDTV', frecuencia: 'Semanal', unidad: '%', targetGroup: 'PLATAFORMAS', targetField: 'coberturaGeograficaTDA', isPercentage: true },
  { codigo: 'RTV-006', indicador: 'Potencia de transmisión Banda Ku (Satelital)', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: '%', targetGroup: 'PLATAFORMAS', targetField: 'potenciaBandaKu', isPercentage: true },
  { codigo: 'RTV-007', indicador: 'Canales satelitales reactivados', eje: 'Eje 2: REDTV', frecuencia: 'Mensual', unidad: 'Canales', targetGroup: 'PLATAFORMAS', targetField: 'canalesSatelitalesReactivados' },
  { codigo: 'RTV-008', indicador: 'Canales satelitales totales operativos', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Canales', targetGroup: 'PLATAFORMAS', targetField: 'canalesSatelitalesTotal' },
  { codigo: 'RTV-009', indicador: 'Disponibilidad de enlace satelital', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: '%', targetGroup: 'PLATAFORMAS', targetField: 'disponibilidadEnlaceSatelital', isPercentage: true },
  { codigo: 'RTV-010', indicador: 'Tiempo de caída de señal satelital en minutos', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Minutos', targetGroup: 'PLATAFORMAS', targetField: 'tiempoCaidaSatelitalMin' },
  { codigo: 'RTV-011', indicador: 'Transmisores de televisión operativos REDTV', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Transmisores', targetGroup: 'PLATAFORMAS', targetField: 'transmisoresTVOperativos' },
  { codigo: 'RTV-012', indicador: 'Transmisores de radio operativos REDTV', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Transmisores', targetGroup: 'PLATAFORMAS', targetField: 'transmisoresRadioOperativos' },
  { codigo: 'RTV-013', indicador: 'Enlaces microondas operativos REDTV', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Enlaces', targetGroup: 'PLATAFORMAS', targetField: 'enlacesMicroondasOperativos' },
  { codigo: 'RTV-014', indicador: 'Plantas eléctricas de respaldo operativas REDTV', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Plantas', targetGroup: 'PLATAFORMAS', targetField: 'plantasRespaldoOperativas' },
  { codigo: 'RTV-015', indicador: 'Capacidad de transmisión disponible', eje: 'Eje 2: REDTV', frecuencia: 'Semanal', unidad: '%', targetGroup: 'PLATAFORMAS', targetField: 'capacidadTransmisionDisponible', isPercentage: true },

  // --- CONATEL ---
  { codigo: 'CON-001', indicador: 'Reportes de primeras planas regulatorias', eje: 'Eje 2: CONATEL', frecuencia: 'Diaria', unidad: 'Reportes', targetGroup: 'PLATAFORMAS', targetField: 'reportesPrimerasPlanasRegulatorias' },
  { codigo: 'CON-002', indicador: 'Concesiones otorgadas', eje: 'Eje 2: CONATEL', frecuencia: 'Mensual', unidad: 'Concesiones', targetGroup: 'PLATAFORMAS', targetField: 'concesionesOtorgadas' },
  { codigo: 'CON-003', indicador: 'Habilitaciones administrativas procesadas', eje: 'Eje 2: CONATEL', frecuencia: 'Mensual', unidad: 'Habilitaciones', targetGroup: 'PLATAFORMAS', targetField: 'habilitacionesProcesadas' },
  { codigo: 'CON-004', indicador: 'Homologaciones de equipos de telecomunicaciones', eje: 'Eje 2: CONATEL', frecuencia: 'Mensual', unidad: 'Equipos', targetGroup: 'PLATAFORMAS', targetField: 'homologacionesEquipos' },
  { codigo: 'CON-005', indicador: 'Inspecciones técnicas y regulatorias ejecutadas', eje: 'Eje 2: CONATEL', frecuencia: 'Semanal', unidad: 'Inspecciones', targetGroup: 'PLATAFORMAS', targetField: 'inspeccionesTecnicas' },
  { codigo: 'CON-006', indicador: 'Sanciones y multas aplicadas', eje: 'Eje 2: CONATEL', frecuencia: 'Mensual', unidad: 'Sanciones', targetGroup: 'PLATAFORMAS', targetField: 'multasSancionesAplicadas' },
  { codigo: 'CON-009', indicador: 'Estaciones de monitoreo de espectro operativas', eje: 'Eje 2: CONATEL', frecuencia: 'Diaria', unidad: 'Estaciones', targetGroup: 'PLATAFORMAS', targetField: 'estacionesMonitoreoEspectroOperativas' },
  { codigo: 'CON-010', indicador: 'Espectro radioeléctrico monitoreado', eje: 'Eje 2: CONATEL', frecuencia: 'Semanal', unidad: '%', targetGroup: 'PLATAFORMAS', targetField: 'espectroRadioelectricoMonitoreado', isPercentage: true },
  { codigo: 'CON-011', indicador: 'Interferencias detectadas y atendidas', eje: 'Eje 2: CONATEL', frecuencia: 'Semanal', unidad: 'Casos', targetGroup: 'PLATAFORMAS', targetField: 'interferenciasDetectadas' },
  { codigo: 'CON-012', indicador: 'Operadores irregulares identificados', eje: 'Eje 2: CONATEL', frecuencia: 'Semanal', unidad: 'Operadores', targetGroup: 'PLATAFORMAS', targetField: 'operadoresIrregulares' },
  { codigo: 'CON-014', indicador: 'Medios monitoreados bajo Ley Resorte', eje: 'Eje 2: CONATEL', frecuencia: 'Semanal', unidad: 'Medios', targetGroup: 'PLATAFORMAS', targetField: 'mediosMonitoreadosCuotasResorte' },
  { codigo: 'CON-015', indicador: 'Cumplimiento de cuota de producción nacional', eje: 'Eje 2: CONATEL', frecuencia: 'Semanal', unidad: '%', targetGroup: 'PLATAFORMAS', targetField: 'cumplimientoContenidoNacionalResorte', isPercentage: true },
  { codigo: 'CON-016', indicador: 'Cumplimiento de cuota de contenido educativo', eje: 'Eje 2: CONATEL', frecuencia: 'Semanal', unidad: '%', targetGroup: 'PLATAFORMAS', targetField: 'cumplimientoContenidoEducativoResorte', isPercentage: true },
  { codigo: 'CON-017', indicador: 'Cumplimiento de franja infantil y juvenil', eje: 'Eje 2: CONATEL', frecuencia: 'Semanal', unidad: '%', targetGroup: 'PLATAFORMAS', targetField: 'cumplimientoFranjaInfantilResorte', isPercentage: true },

  // --- EJE 4: GESTIÓN ESTRATÉGICA ---
  { codigo: 'EST-001', indicador: 'Comunicados oficiales y notas de prensa emitidos', eje: 'Eje 4: Viceministerios', frecuencia: 'Diaria', unidad: 'Comunicados', targetGroup: 'ESTRATEGICO', targetField: 'comunicadosOficialesEmitidos' },
  { codigo: 'EST-002', indicador: 'Piezas de difusión móvil canales Presidencia', eje: 'Eje 4: Viceministerios', frecuencia: 'Diaria', unidad: 'Piezas', targetGroup: 'ESTRATEGICO', targetField: 'piezasTelefoniaMovilCanalesPresidencia' },
  { codigo: 'EST-003', indicador: 'Tendencias virales desestabilizadoras neutralizadas', eje: 'Eje 4: Viceministerios', frecuencia: 'Diaria', unidad: 'Tendencias', targetGroup: 'ESTRATEGICO', targetField: 'tendenciasViralesDesestabilizadoras' },
  { codigo: 'EST-004', indicador: 'Tráfico orgánico total a portales oficiales', eje: 'Eje 4: SEO y Tráfico', frecuencia: 'Semanal', unidad: 'Visitas', targetGroup: 'ESTRATEGICO', targetField: 'traficoOrganicoTotal' },
  { codigo: 'EST-005', indicador: 'Impresiones en motores de búsqueda', eje: 'Eje 4: SEO y Tráfico', frecuencia: 'Semanal', unidad: 'Impresiones', targetGroup: 'ESTRATEGICO', targetField: 'impresionesBuscadores' },
  { codigo: 'EST-006', indicador: 'Clics obtenidos en motores de búsqueda', eje: 'Eje 4: SEO y Tráfico', frecuencia: 'Semanal', unidad: 'Clics', targetGroup: 'ESTRATEGICO', targetField: 'clicsBuscadores' },
  { codigo: 'EST-007', indicador: 'CTR Orgánico (Click-Through Rate)', eje: 'Eje 4: SEO y Tráfico', frecuencia: 'Semanal', unidad: '%', targetGroup: 'ESTRATEGICO', targetField: 'ctrOrganico', isPercentage: true },
  { codigo: 'EST-008', indicador: 'Tasa de conversión de suscriptores', eje: 'Eje 4: SEO y Tráfico', frecuencia: 'Semanal', unidad: '%', targetGroup: 'ESTRATEGICO', targetField: 'tasaConversionSuscriptores', isPercentage: true },
  { codigo: 'EST-009', indicador: 'Trabajadores del SNMP capacitados en la semana', eje: 'Eje 4: Formación', frecuencia: 'Semanal', unidad: 'Personas', targetGroup: 'ESTRATEGICO', targetField: 'trabajadoresSNMPCapacitados' },
  { codigo: 'EST-010', indicador: 'Productores PNI formados bajo marco ético', eje: 'Eje 4: Formación', frecuencia: 'Semanal', unidad: 'Productores', targetGroup: 'ESTRATEGICO', targetField: 'pniFormadosMarcoEtico' },
  { codigo: 'EST-011', indicador: 'Medios comunitarios georreferenciados (MAC)', eje: 'Eje 4: Poder Popular', frecuencia: 'Mensual', unidad: 'Medios', targetGroup: 'ESTRATEGICO', targetField: 'mediosComunitariosMACGeorreferenciados' },
  { codigo: 'EST-012', indicador: 'Solicitudes comunales de infraestructura técnica', eje: 'Eje 4: Poder Popular', frecuencia: 'Mensual', unidad: 'Solicitudes', targetGroup: 'ESTRATEGICO', targetField: 'solicitudesComunalesInfraestructura' },
  { codigo: 'EST-013', indicador: 'Voceros comunitarios capacitados en comunicación 3.0', eje: 'Eje 4: Poder Popular', frecuencia: 'Semanal', unidad: 'Voceros', targetGroup: 'ESTRATEGICO', targetField: 'vocerosComunitariosCapacitados3_0' },
  { codigo: 'EST-014', indicador: 'Hogares con internet activo (THAI)', eje: 'Eje 4: Cobertura', frecuencia: 'Mensual', unidad: 'Hogares', targetGroup: 'ESTRATEGICO', targetField: 'hogaresInternetActivoTHAI' },
  { codigo: 'EST-015', indicador: 'Líneas de banda ancha móvil activas (TPBAM)', eje: 'Eje 4: Cobertura', frecuencia: 'Mensual', unidad: 'Líneas', targetGroup: 'ESTRATEGICO', targetField: 'lineasBandaAnchaMovilTPBAM' },
  { codigo: 'EST-016', indicador: 'Usuarios activos mensuales en portales digitales (IPMD)', eje: 'Eje 4: Cobertura', frecuencia: 'Mensual', unidad: 'Usuarios', targetGroup: 'ESTRATEGICO', targetField: 'usuariosActivosMensualesDigitalIPMD' }
];

export interface ParsedIndicatorRow {
  codigo: string;
  indicador: string;
  eje: string;
  frecuencia: string;
  unidad: string;
  meta: number;
  valor: number;
  observaciones: string;
  targetGroup: string;
  targetField: string;
  status: 'MAPPEADO' | 'NO_MAPPEADO' | 'ADVERTENCIA';
  mensaje?: string;
}

export interface ParsedImportResult {
  fileName: string;
  fileSize: number;
  totalRows: number;
  mappedCount: number;
  unmappedCount: number;
  items: ParsedIndicatorRow[];
  controlVariables?: Partial<ControlVariables>;
  warnings: string[];
}

/**
 * Genera el libro Excel de plantilla oficial para recolección de datos
 */
export function buildExcelTemplateWorkbook(currentReport?: FullWeeklyReport): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();

  // Hoja 1: Indicadores Operativos
  const rows = MASTER_INDICATOR_MAPPINGS.map(def => {
    let currentVal: number | string = '';
    let currentMeta: number | string = '';

    if (currentReport) {
      if (def.targetGroup === 'MEDIOS') {
        currentVal = (currentReport.mediosData as any)[def.targetField] ?? '';
      } else if (def.targetGroup === 'PLATAFORMAS') {
        currentVal = (currentReport.plataformasData as any)[def.targetField] ?? '';
      } else if (def.targetGroup === 'ESTRATEGICO') {
        currentVal = (currentReport.strategicData as any)[def.targetField] ?? '';
      }
    }

    return {
      'Código': def.codigo,
      'Indicador': def.indicador,
      'Eje / Subsistema': def.eje,
      'Frecuencia': def.frecuencia,
      'Unidad de Medida': def.unidad,
      'Meta Semanal': currentMeta,
      'Valor Logrado / Reportado': currentVal,
      'Observaciones': ''
    };
  });

  const wsIndicadores = XLSX.utils.json_to_sheet(rows);

  // Auto-width para las columnas
  wsIndicadores['!cols'] = [
    { wch: 12 }, // Código
    { wch: 48 }, // Indicador
    { wch: 24 }, // Eje
    { wch: 14 }, // Frecuencia
    { wch: 16 }, // Unidad
    { wch: 16 }, // Meta Semanal
    { wch: 22 }, // Valor Logrado
    { wch: 36 }  // Observaciones
  ];

  XLSX.utils.book_append_sheet(wb, wsIndicadores, 'Indicadores_Operativos');

  // Hoja 2: Variables de Control
  const controlData = [
    { 'Parámetro': 'Ente Adscrito (Siglas Oficiales)', 'Valor': currentReport?.control.enteAdscrito || 'VTV', 'Instrucción': 'Coloque el ID o Siglas oficiales (ej. VTV, TVES, RNV, YVKE, REDTV, CONATEL)' },
    { 'Parámetro': 'Semana Epidemiológica', 'Valor': currentReport?.control.semanaEpidemiologica || 36, 'Instrucción': 'Número entero de 1 a 53' },
    { 'Parámetro': 'Fecha de Reporte (AAAA-MM-DD)', 'Valor': currentReport?.control.fechaReporte || new Date().toISOString().split('T')[0], 'Instrucción': 'Formato YYYY-MM-DD' },
    { 'Parámetro': 'Periodo Desde (AAAA-MM-DD)', 'Valor': currentReport?.control.periodoDesde || '2026-09-06', 'Instrucción': 'Fecha inicio de la semana' },
    { 'Parámetro': 'Periodo Hasta (AAAA-MM-DD)', 'Valor': currentReport?.control.periodoHasta || '2026-09-12', 'Instrucción': 'Fecha cierre de la semana' },
    { 'Parámetro': 'Responsable del Ente', 'Valor': currentReport?.control.responsableEnte || 'Director / Coordinador Operativo', 'Instrucción': 'Nombre y apellido del funcionario' },
    { 'Parámetro': 'Cédula de Identidad', 'Valor': currentReport?.control.cedulaIdentidad || 'V-12345678', 'Instrucción': 'Formato V-######## o E-########' },
    { 'Parámetro': 'Correo Electrónico Institucional', 'Valor': currentReport?.control.correo || 'operaciones@ente.gob.ve', 'Instrucción': 'Correo oficial con dominio gob.ve' },
    { 'Parámetro': 'Región / Localidad', 'Valor': currentReport?.control.regionLocalidad || 'Caracas, Distrito Capital', 'Instrucción': 'Sede operativa del reporte' }
  ];

  const wsControl = XLSX.utils.json_to_sheet(controlData);
  wsControl['!cols'] = [{ wch: 32 }, { wch: 30 }, { wch: 55 }];
  XLSX.utils.book_append_sheet(wb, wsControl, 'Variables_Control');

  // Hoja 3: Instrucciones
  const instruccData = [
    { 'Paso': 1, 'Instrucción': 'Diligencie la columna "Valor Logrado / Reportado" con los datos numéricos reales de la semana.' },
    { 'Paso': 2, 'Instrucción': 'Puede completar la columna "Meta Semanal" si su ente maneja metas operativas proyectadas.' },
    { 'Paso': 3, 'Instrucción': 'No altere la columna "Código" ni "Indicador" para permitir la correlación automática con el motor de cálculo.' },
    { 'Paso': 4, 'Instrucción': 'Para valores porcentuales, ingrese el número (ejemplo: 98.5 para 98.5%). No es obligatorio incluir el símbolo %.' },
    { 'Paso': 5, 'Instrucción': 'Guarde el archivo como .xlsx o .csv y súbalo al módulo "Carga Masiva Excel" del sistema.' }
  ];
  const wsInstrucc = XLSX.utils.json_to_sheet(instruccData);
  wsInstrucc['!cols'] = [{ wch: 8 }, { wch: 85 }];
  XLSX.utils.book_append_sheet(wb, wsInstrucc, 'Instrucciones_Uso');

  return wb;
}

/**
 * Descarga directamente la plantilla en el navegador del usuario (.xlsx o .csv)
 */
export function downloadExcelTemplate(format: 'xlsx' | 'csv' = 'xlsx', currentReport?: FullWeeklyReport): void {
  const wb = buildExcelTemplateWorkbook(currentReport);
  const fileName = `Plantilla_Carga_Indicadores_MPPCI_${new Date().toISOString().split('T')[0]}.${format}`;

  if (format === 'csv') {
    const ws = wb.Sheets['Indicadores_Operativos'];
    const csvContent = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  } else {
    XLSX.writeFile(wb, fileName);
  }
}

/**
 * Función auxiliar para limpiar y parsear números tolerante a formatos venezolanos / latinoamericanos
 * (ej: 150.000 -> 150000, 98,5% -> 98.5, etc.)
 */
function parseFlexibleNumber(raw: any): number {
  if (typeof raw === 'number') return isNaN(raw) ? 0 : raw;
  if (!raw) return 0;

  let str = String(raw).trim();
  str = str.replace(/%/g, '').trim();

  // Si tiene puntos y comas (ej: 1.250,50)
  if (str.includes('.') && str.includes(',')) {
    str = str.replace(/\./g, '').replace(',', '.');
  } 
  // Si sólo tiene coma y 1 o 2 decimales (ej: 98,5 o 98,54)
  else if (str.includes(',') && !str.includes('.')) {
    str = str.replace(',', '.');
  }

  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}

/**
 * Parsea un archivo Excel (.xlsx, .xls) o CSV cargado por el usuario
 */
export async function parseUploadedExcelFile(file: File): Promise<ParsedImportResult> {
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: 'array' });

  // Buscar la hoja de indicadores
  const sheetName = wb.SheetNames.find(s => 
    s.toLowerCase().includes('indicador') || 
    s.toLowerCase().includes('operativ') || 
    s.toLowerCase().includes('data')
  ) || wb.SheetNames[0];

  const ws = wb.Sheets[sheetName];
  const rawRows: any[] = XLSX.utils.sheet_to_json(ws, { defval: '' });

  // Mapear filas
  const items: ParsedIndicatorRow[] = [];
  const warnings: string[] = [];

  rawRows.forEach((row, index) => {
    // Buscar la columna código
    const rawCodigo = String(
      row['Código'] || 
      row['Codigo'] || 
      row['CODIGO'] || 
      row['codigo'] || 
      row['Code'] || 
      row['ID'] || 
      ''
    ).trim().toUpperCase();

    // Buscar la columna indicador
    const rawIndicador = String(
      row['Indicador'] || 
      row['INDICADOR'] || 
      row['indicador'] || 
      row['Nombre'] || 
      row['Descripcion'] || 
      ''
    ).trim();

    // Si la fila está vacía, saltar
    if (!rawCodigo && !rawIndicador) return;

    // Buscar valor logrado
    const rawValor = 
      row['Valor Logrado / Reportado'] !== undefined ? row['Valor Logrado / Reportado'] :
      row['Valor Logrado'] !== undefined ? row['Valor Logrado'] :
      row['Logrado'] !== undefined ? row['Logrado'] :
      row['Valor'] !== undefined ? row['Valor'] :
      row['Resultado'] !== undefined ? row['Resultado'] :
      row['Cantidad'] !== undefined ? row['Cantidad'] : '';

    const valor = parseFlexibleNumber(rawValor);

    // Buscar meta
    const rawMeta = 
      row['Meta Semanal'] !== undefined ? row['Meta Semanal'] :
      row['Meta'] !== undefined ? row['Meta'] :
      row['Proyeccion'] !== undefined ? row['Proyeccion'] : '';

    const meta = parseFlexibleNumber(rawMeta);

    // Observaciones
    const observaciones = String(
      row['Observaciones'] || 
      row['OBSERVACIONES'] || 
      row['Notas'] || 
      row['Detalles'] || 
      ''
    ).trim();

    // Tratar de mapear con el catálogo maestro
    const matchedDef = MASTER_INDICATOR_MAPPINGS.find(m => 
      m.codigo === rawCodigo || 
      (rawCodigo && m.codigo.includes(rawCodigo))
    );

    if (matchedDef) {
      items.push({
        codigo: matchedDef.codigo,
        indicador: matchedDef.indicador,
        eje: matchedDef.eje,
        frecuencia: matchedDef.frecuencia,
        unidad: matchedDef.unidad,
        meta,
        valor,
        observaciones,
        targetGroup: matchedDef.targetGroup,
        targetField: matchedDef.targetField,
        status: 'MAPPEADO'
      });
    } else {
      // Buscar en el catálogo SCIC ampliado
      const scicMatch = SCIC_INDICATORS_DATA.find(s => 
        s.codigo.toUpperCase() === rawCodigo || 
        s.id.toUpperCase() === rawCodigo
      );

      if (scicMatch) {
        items.push({
          codigo: scicMatch.codigo,
          indicador: scicMatch.nombre,
          eje: scicMatch.eje,
          frecuencia: scicMatch.frecuencia,
          unidad: 'Índice / %',
          meta,
          valor,
          observaciones,
          targetGroup: 'SCIC',
          targetField: scicMatch.codigo,
          status: 'MAPPEADO'
        });
      } else {
        items.push({
          codigo: rawCodigo || `ROW-${index + 1}`,
          indicador: rawIndicador || 'Indicador sin catálogo',
          eje: 'Personalizado',
          frecuencia: 'Semanal',
          unidad: 'U',
          meta,
          valor,
          observaciones,
          targetGroup: 'SCIC',
          targetField: rawCodigo,
          status: 'NO_MAPPEADO',
          mensaje: 'Código no identificado en el catálogo maestro SCIC/MPPCI'
        });
        warnings.push(`Fila ${index + 2}: Código "${rawCodigo}" no reconocido en el catálogo maestro.`);
      }
    }
  });

  // Leer posibles variables de control de la segunda hoja
  let controlVariables: Partial<ControlVariables> | undefined = undefined;
  const controlSheetName = wb.SheetNames.find(s => 
    s.toLowerCase().includes('control') || 
    s.toLowerCase().includes('variable')
  );

  if (controlSheetName) {
    const wsCtrl = wb.Sheets[controlSheetName];
    const ctrlRows: any[] = XLSX.utils.sheet_to_json(wsCtrl, { defval: '' });
    const ctrlMap: Record<string, string> = {};

    ctrlRows.forEach(r => {
      const p = String(r['Parámetro'] || r['Parametro'] || r['Campo'] || '').toLowerCase();
      const v = String(r['Valor'] || r['Dato'] || '').trim();
      if (p.includes('ente')) ctrlMap.ente = v;
      if (p.includes('semana')) ctrlMap.semana = v;
      if (p.includes('fecha')) ctrlMap.fecha = v;
      if (p.includes('responsable')) ctrlMap.responsable = v;
      if (p.includes('cedula') || p.includes('cédula')) ctrlMap.cedula = v;
      if (p.includes('correo') || p.includes('email')) ctrlMap.correo = v;
      if (p.includes('desde')) ctrlMap.desde = v;
      if (p.includes('hasta')) ctrlMap.hasta = v;
      if (p.includes('region') || p.includes('región')) ctrlMap.region = v;
    });

    controlVariables = {
      enteAdscrito: ctrlMap.ente,
      semanaEpidemiologica: ctrlMap.semana ? parseInt(ctrlMap.semana, 10) || 36 : undefined,
      fechaReporte: ctrlMap.fecha,
      responsableEnte: ctrlMap.responsable,
      cedulaIdentidad: ctrlMap.cedula,
      correo: ctrlMap.correo,
      periodoDesde: ctrlMap.desde,
      periodoHasta: ctrlMap.hasta,
      regionLocalidad: ctrlMap.region
    };
  }

  const mappedCount = items.filter(i => i.status === 'MAPPEADO').length;
  const unmappedCount = items.filter(i => i.status !== 'MAPPEADO').length;

  return {
    fileName: file.name,
    fileSize: file.size,
    totalRows: items.length,
    mappedCount,
    unmappedCount,
    items,
    controlVariables,
    warnings
  };
}

/**
 * Aplica los datos parseados del Excel al reporte activo del sistema
 */
export function applyParsedDataToReport(
  currentReport: FullWeeklyReport,
  parsed: ParsedImportResult
): FullWeeklyReport {
  const updatedMedios: MediaOperationalData = { ...currentReport.mediosData };
  const updatedPlataformas: PlatformsTechnicalData = { ...currentReport.plataformasData };
  const updatedStrategic: StrategicMIPCCIData = { ...currentReport.strategicData };

  // Copia de eje1Data para sincronizar tablas
  const updatedEje1: Eje1InstrumentoData = currentReport.eje1Data 
    ? JSON.parse(JSON.stringify(currentReport.eje1Data))
    : undefined;

  parsed.items.forEach(item => {
    if (item.status !== 'MAPPEADO') return;

    if (item.targetGroup === 'MEDIOS') {
      (updatedMedios as any)[item.targetField] = item.valor;

      // Sincronizar en eje1Data si aplica
      if (updatedEje1) {
        // Impresos producción
        const impProd = updatedEje1.impresos.produccion.find(p => p.codigo === item.codigo);
        if (impProd) {
          impProd.logrado = item.valor;
          if (item.meta) impProd.metaSemanal = item.meta;
        }

        // Impresos editorial
        const impEd = updatedEje1.impresos.editorial.find(e => e.codigo === item.codigo);
        if (impEd) {
          impEd.logrado = item.valor;
          if (item.observaciones) impEd.observaciones = item.observaciones;
        }

        // Radios alcance
        const radAlc = updatedEje1.radios.alcance.find(r => r.codigo === item.codigo);
        if (radAlc) {
          radAlc.logrado = item.valor;
          if (item.meta) radAlc.metaSemanal = item.meta;
        }

        // TV alcance
        const tvAlc = updatedEje1.audiovisuales.alcance.find(t => t.codigo === item.codigo);
        if (tvAlc) {
          tvAlc.logrado = item.valor;
          if (item.meta) tvAlc.metaSemanal = item.meta;
        }

        // TV producción
        const tvProd = updatedEje1.audiovisuales.produccion.find(t => t.codigo === item.codigo);
        if (tvProd) {
          tvProd.logrado = item.valor;
        }

        // Digitales portales
        const digPort = updatedEje1.digitales.portales.find(d => d.codigo === item.codigo);
        if (digPort) {
          digPort.logrado = item.valor;
          if (item.meta) digPort.metaSemanal = item.meta;
        }
      }
    } else if (item.targetGroup === 'PLATAFORMAS') {
      (updatedPlataformas as any)[item.targetField] = item.valor;
    } else if (item.targetGroup === 'ESTRATEGICO') {
      (updatedStrategic as any)[item.targetField] = item.valor;
    }
  });

  // Variables de control si fueron provistas en el archivo
  const updatedControl: ControlVariables = {
    ...currentReport.control,
    ...(parsed.controlVariables?.enteAdscrito ? { enteAdscrito: parsed.controlVariables.enteAdscrito } : {}),
    ...(parsed.controlVariables?.semanaEpidemiologica ? { semanaEpidemiologica: parsed.controlVariables.semanaEpidemiologica } : {}),
    ...(parsed.controlVariables?.fechaReporte ? { fechaReporte: parsed.controlVariables.fechaReporte } : {}),
    ...(parsed.controlVariables?.responsableEnte ? { responsableEnte: parsed.controlVariables.responsableEnte } : {}),
    ...(parsed.controlVariables?.cedulaIdentidad ? { cedulaIdentidad: parsed.controlVariables.cedulaIdentidad } : {}),
    ...(parsed.controlVariables?.correo ? { correo: parsed.controlVariables.correo } : {})
  };

  // Recalcular KPIs maestros y validaciones
  const kpisCalculados = calculateMasterKPIs(
    updatedMedios, 
    updatedPlataformas, 
    updatedStrategic, 
    currentReport.vulnerabilityRows || []
  );

  const validaciones = runThreeLevelValidation(
    updatedControl, 
    updatedMedios, 
    updatedPlataformas, 
    updatedStrategic, 
    currentReport.vulnerabilityRows || []
  );

  const hashIntegridad = generateIntegrityHash(
    currentReport.codigoReporte || 'MPPCI-EXCEL-IMPORT',
    new Date().toISOString(),
    kpisCalculados
  );

  return {
    ...currentReport,
    id: `MPPCI-REP-XLS-${Date.now().toString(36).toUpperCase()}`,
    control: updatedControl,
    mediosData: updatedMedios,
    plataformasData: updatedPlataformas,
    strategicData: updatedStrategic,
    eje1Data: updatedEje1 || currentReport.eje1Data,
    kpisCalculados,
    validaciones,
    hashIntegridad,
    status: 'BORRADOR',
    fechaUltimaModificacion: new Date().toISOString()
  };
}
