import { db } from './database';
import { ImpactAlertIncident } from '../../src/types/alertsImpactTypes';
import { INITIAL_USERS } from '../../src/data/usersData';
import { PasswordCryptoService } from '../services/passwordService';
import { UserAccount, EnrollmentStatus } from '../../src/types';

// =========================================================================
// DATOS SEMILLA POR DEFECTO PARA CENTRAL STORE
// =========================================================================
export const DEFAULT_CENTRAL_STORE = {
  ciberdefensa: {
    resumen: {
      amenazasActivas: 4,
      amenazasCriticas: 1,
      tasaNeutralizacionGlobal: 83.3,
      tiempoPromedioRespuestaMinutos: 42,
      balanceSentimientoNeto: 34.5
    },
    amenazas: [
      {
        id: 'AMZ-2026-001',
        codigo: 'DA-01',
        titulo: 'Falsa alerta de colapso en el sistema interconectado nacional',
        tematica: 'SERVICIOS_PUBLICOS',
        nivelRiesgo: 'CRITICO',
        origenPlataforma: 'WHATSAPP',
        impactoEstimadoVistas: 385000,
        volumenMenciones: 14200,
        estadoAfectado: 'Zulia',
        municipioAfectado: 'Maracaibo',
        coordenadas: [10.6544, -71.6296],
        estadoNeutralizacion: 'CONTRANARRATIVA_EN_DESPLIEGUE',
        horaDeteccion: '06:15 AM',
        tiempoRespuestaMinutos: 38,
        contranarrativaActiva: 'Desmentido CORPOELEC con video técnico de operatividad en estaciones y transmisión en cadena RNV/VTV.'
      },
      {
        id: 'AMZ-2026-002',
        codigo: 'DA-01',
        titulo: 'Manipulación con deepfake sobre vocería económica oficial',
        tematica: 'ECONOMIA',
        nivelRiesgo: 'ALTO',
        origenPlataforma: 'TIKTOK',
        impactoEstimadoVistas: 240000,
        volumenMenciones: 8900,
        estadoAfectado: 'Distrito Capital',
        municipioAfectado: 'Libertador',
        coordenadas: [10.4806, -66.9036],
        estadoNeutralizacion: 'EN_ANALISIS',
        horaDeteccion: '07:40 AM',
        tiempoRespuestaMinutos: 45
      },
      {
        id: 'AMZ-2026-003',
        codigo: 'DA-01',
        titulo: 'Rumor coordinado sobre desabastecimiento de insumos en el eje central',
        tematica: 'POLITICA',
        nivelRiesgo: 'MEDIO',
        origenPlataforma: 'X',
        impactoEstimadoVistas: 120000,
        volumenMenciones: 4500,
        estadoAfectado: 'Carabobo',
        municipioAfectado: 'Valencia',
        coordenadas: [10.1620, -68.0077],
        estadoNeutralizacion: 'NEUTRALIZADA',
        horaDeteccion: '05:30 AM',
        tiempoRespuestaMinutos: 32,
        contranarrativaActiva: 'Pase en vivo de VTV desde centros de acopio y cadena de distribución regional.'
      },
      {
        id: 'AMZ-2026-004',
        codigo: 'DA-01',
        titulo: 'Campaña contra el sistema de protección social en Táchira',
        tematica: 'GEO_ESTRATEGICA',
        nivelRiesgo: 'MEDIO',
        origenPlataforma: 'TELEGRAM',
        impactoEstimadoVistas: 95000,
        volumenMenciones: 3100,
        estadoAfectado: 'Táchira',
        municipioAfectado: 'San Cristóbal',
        coordenadas: [7.7669, -72.2250],
        estadoNeutralizacion: 'CONTRANARRATIVA_EN_DESPLIEGUE',
        horaDeteccion: '08:05 AM',
        tiempoRespuestaMinutos: 52
      }
    ],
    curvaNeutralizacion: [
      { minutoRelativo: 0, volumenMatrizAdversa: 1000, tasaRespuestaInstitucional: 5, despliegueContranarrativa: 0 },
      { minutoRelativo: 15, volumenMatrizAdversa: 4500, tasaRespuestaInstitucional: 20, despliegueContranarrativa: 15 },
      { minutoRelativo: 30, volumenMatrizAdversa: 9800, tasaRespuestaInstitucional: 55, despliegueContranarrativa: 45 },
      { minutoRelativo: 45, volumenMatrizAdversa: 8200, tasaRespuestaInstitucional: 80, despliegueContranarrativa: 78 },
      { minutoRelativo: 60, volumenMatrizAdversa: 5100, tasaRespuestaInstitucional: 92, despliegueContranarrativa: 88 },
      { minutoRelativo: 90, volumenMatrizAdversa: 2100, tasaRespuestaInstitucional: 98, despliegueContranarrativa: 95 }
    ],
    sentimientoNLP: {
      mencionesTotales: 345000,
      porcentajePositivo: 58.5,
      porcentajeNeutro: 17.5,
      porcentajeNegativo: 24.0,
      indiceBalanceSentimientoNeto: 34.5,
      shareOfVoice: {
        oficialSNMP: 62.4,
        mediosIndependientes: 18.2,
        narrativaAdversa: 19.4
      }
    }
  },
  noc: {
    resumen: {
      operatividadNacionalTDA: 94.8,
      totalServiciosTvActivos: 184,
      disponibilidadSatelitalGlobal: 99.7,
      mttrPromedioHoras: 1.8,
      estacionesConAlerta: 2
    },
    nodos: [
      {
        id: 'EST-CCS-01',
        estacionNombre: 'Torre Matriz Waraira Repano (Mecedores)',
        estado: 'Distrito Capital',
        municipio: 'Libertador',
        coordenadas: [10.5317, -66.9036],
        operatividadTDA: 99.8,
        serviciosTvActivos: 22,
        serviciosRadioActivos: 14,
        potenciaKuSatelital: 99.9,
        fallaDetectada: false,
        estatusEnergia: 'CORPOELEC_STABLE',
        ultimaTelemetria: 'Hace 45 seg'
      },
      {
        id: 'EST-ZUL-01',
        estacionNombre: 'Torre Maracaibo - La Paz',
        estado: 'Zulia',
        municipio: 'Maracaibo',
        coordenadas: [10.6544, -71.6296],
        operatividadTDA: 88.5,
        serviciosTvActivos: 16,
        serviciosRadioActivos: 10,
        potenciaKuSatelital: 97.2,
        fallaDetectada: true,
        estatusEnergia: 'PLANTA_ELECTRICA_ACTIVA',
        ultimaTelemetria: 'Hace 1 min'
      },
      {
        id: 'EST-CAR-01',
        estacionNombre: 'Torre Puerto Cabello (Fortín Solano)',
        estado: 'Carabobo',
        municipio: 'Puerto Cabello',
        coordenadas: [10.4631, -68.0125],
        operatividadTDA: 78.0,
        serviciosTvActivos: 12,
        serviciosRadioActivos: 8,
        potenciaKuSatelital: 95.0,
        fallaDetectada: true,
        estatusEnergia: 'UPS_CRITICO',
        ultimaTelemetria: 'Hace 30 seg'
      },
      {
        id: 'EST-ANZ-01',
        estacionNombre: 'Estación Cerro El Morro',
        estado: 'Anzoátegui',
        municipio: 'Diego Bautista Urbaneja',
        coordenadas: [10.2016, -64.6933],
        operatividadTDA: 98.4,
        serviciosTvActivos: 18,
        serviciosRadioActivos: 12,
        potenciaKuSatelital: 99.1,
        fallaDetectada: false,
        estatusEnergia: 'CORPOELEC_STABLE',
        ultimaTelemetria: 'Hace 2 min'
      },
      {
        id: 'EST-LAR-01',
        estacionNombre: 'Torre Barquisimeto - El Manzano',
        estado: 'Lara',
        municipio: 'Iribarren',
        coordenadas: [10.0200, -69.3300],
        operatividadTDA: 96.5,
        serviciosTvActivos: 18,
        serviciosRadioActivos: 11,
        potenciaKuSatelital: 98.9,
        fallaDetectada: false,
        estatusEnergia: 'CORPOELEC_STABLE',
        ultimaTelemetria: 'Hace 1 min'
      }
    ],
    estabilidadMaster: {
      disponibilidadSatelitalKu: 99.7,
      eficienciaModulacionSenal: 98.2,
      nivelRuidoDb: 1.4,
      potenciaEmisionKw: 45.8,
      temperaturaTransmisorC: 32.4
    },
    timelineMTTR: [
      {
        id: 'INC-2026-441',
        estacion: 'Torre Puerto Cabello',
        estado: 'Carabobo',
        horaFalla: '04:15 AM',
        horaRecuperacion: '06:05 AM',
        mttrMinutos: 110,
        tipoFalla: 'ENERGIA',
        cuadrillaAsignada: 'Cuadrilla REDTV Eje Centro-Costero',
        estatus: 'RESUELTO'
      },
      {
        id: 'INC-2026-442',
        estacion: 'Torre Maracaibo - La Paz',
        estado: 'Zulia',
        horaFalla: '07:20 AM',
        mttrMinutos: 85,
        tipoFalla: 'EQUIPO_TRANSMISOR',
        cuadrillaAsignada: 'Cuadrilla Especializada REDTV Occidente',
        estatus: 'EN_ATENCION'
      }
    ]
  },
  digital: {
    resumen: {
      audienciaBrutaTotalReach: 14850000,
      visitasTotalesWeb: 2840000,
      engagementPromedioEcosistema: 9.4,
      picoMaximoConcurrenciaStreaming: 48600
    },
    funnelAudiencia: [
      { etapa: 'REACH_BRUTO', nombre: '1. Alcance Bruto Estimado (Reach)', volumen: 14850000, tasaConversionEtapaAnterior: 100, indicadorFuente: 'V1.4' },
      { etapa: 'VISITAS_PORTAL', nombre: '2. Sesiones y Visitas Únicas Web', volumen: 2840000, tasaConversionEtapaAnterior: 19.1, indicadorFuente: 'WEB-001 / WEB-002' },
      { etapa: 'LECTURA_PROFUNDA', nombre: '3. Consumo Profundo (>2 páginas / >3 min)', volumen: 1420000, tasaConversionEtapaAnterior: 50.0, indicadorFuente: 'WEB-007' },
      { etapa: 'ENGAGEMENT_ACTIVO', nombre: '4. Interacción Ciudadana Activa', volumen: 426000, tasaConversionEtapaAnterior: 30.0, indicadorFuente: 'RED-ENG' }
    ],
    matrizViralEntes: [
      { enteId: 'VTV', enteSiglas: 'VTV', tasaEngagement: 11.2, crecimientoSeguidoresPct: 4.8, impresionesTotales: 6200000, posteosSemanales: 420, categoriaRendimiento: 'ALTO_ENG_ALTO_CREC' },
      { enteId: 'TELESUR', enteSiglas: 'TELESUR', tasaEngagement: 12.8, crecimientoSeguidoresPct: 6.2, impresionesTotales: 5800000, posteosSemanales: 380, categoriaRendimiento: 'ALTO_ENG_ALTO_CREC' },
      { enteId: 'RNV', enteSiglas: 'RNV', tasaEngagement: 8.5, crecimientoSeguidoresPct: 2.9, impresionesTotales: 1900000, posteosSemanales: 290, categoriaRendimiento: 'ALTO_ENG_BAJO_CREC' },
      { enteId: 'CORREO_ORINOCO', enteSiglas: 'CORREO DEL ORINOCO', tasaEngagement: 7.2, crecimientoSeguidoresPct: 3.1, impresionesTotales: 850000, posteosSemanales: 140, categoriaRendimiento: 'BAJO_ENG_BAJO_CREC' },
      { enteId: 'AVN', enteSiglas: 'AVN', tasaEngagement: 8.9, crecimientoSeguidoresPct: 5.1, impresionesTotales: 1450000, posteosSemanales: 310, categoriaRendimiento: 'ALTO_ENG_ALTO_CREC' }
    ],
    concurrenciaEnVivo: [
      { timestamp: '08:00', picoConcurrenciaPCV: 12500, horasVisualizacionAcumuladas: 6250, canalPlataforma: 'YOUTUBE', transmisionTitulo: 'Pauta Matutina Noticiero VTV' },
      { timestamp: '08:30', picoConcurrenciaPCV: 24800, horasVisualizacionAcumuladas: 18600, canalPlataforma: 'PORTAL_SOBERANO', transmisionTitulo: 'Conferencia de Prensa Presidencial' },
      { timestamp: '09:00', picoConcurrenciaPCV: 48600, horasVisualizacionAcumuladas: 42500, canalPlataforma: 'YOUTUBE', transmisionTitulo: 'Transmisión Conjunta SNMP' },
      { timestamp: '09:30', picoConcurrenciaPCV: 39200, horasVisualizacionAcumuladas: 58100, canalPlataforma: 'FACEBOOK', transmisionTitulo: 'Transmisión Conjunta SNMP' },
      { timestamp: '10:00', picoConcurrenciaPCV: 28400, horasVisualizacionAcumuladas: 71200, canalPlataforma: 'TWITCH', transmisionTitulo: 'Análisis Político en Directo' }
    ]
  },
  medios: {
    resumen: {
      totalPiezasProducidasHoy: 468,
      pasesEnVivoHoy: 44,
      indiceAlineacionGlobalIAAE: 92.4,
      coberturaRegionesActivas: 8
    },
    radarPasesPorRegion: [
      { region: 'CENTRAL', pasesCampoTv: 14, programasRadioEnVivo: 18, contingenciasCubiertas: 4, despliegueComunal: 12 },
      { region: 'OCCIDENTAL', pasesCampoTv: 8, programasRadioEnVivo: 12, contingenciasCubiertas: 3, despliegueComunal: 9 },
      { region: 'LOS_ANDES', pasesCampoTv: 6, programasRadioEnVivo: 10, contingenciasCubiertas: 2, despliegueComunal: 8 },
      { region: 'LLANOS', pasesCampoTv: 5, programasRadioEnVivo: 9, contingenciasCubiertas: 1, despliegueComunal: 11 },
      { region: 'ORIENTAL', pasesCampoTv: 7, programasRadioEnVivo: 11, contingenciasCubiertas: 2, despliegueComunal: 10 },
      { region: 'GUAYANA', pasesCampoTv: 4, programasRadioEnVivo: 8, contingenciasCubiertas: 1, despliegueComunal: 7 },
      { region: 'INSULAR', pasesCampoTv: 3, programasRadioEnVivo: 5, contingenciasCubiertas: 1, despliegueComunal: 4 },
      { region: 'ZULIANA', pasesCampoTv: 7, programasRadioEnVivo: 12, contingenciasCubiertas: 3, despliegueComunal: 9 }
    ],
    alineacionMedios: [
      { enteSiglas: 'VTV', tipoMedio: 'TV', cuotaObligatoriaPauta: 90, cumplimientoEfectivoIAAE: 95.2, desviacionPct: 5.2, estatusAlineacion: 'CONFORME' },
      { enteSiglas: 'RNV', tipoMedio: 'RADIO', cuotaObligatoriaPauta: 90, cumplimientoEfectivoIAAE: 93.8, desviacionPct: 3.8, estatusAlineacion: 'CONFORME' },
      { enteSiglas: 'TELESUR', tipoMedio: 'TV', cuotaObligatoriaPauta: 85, cumplimientoEfectivoIAAE: 88.4, desviacionPct: 3.4, estatusAlineacion: 'CONFORME' },
      { enteSiglas: 'CORREO DEL ORINOCO', tipoMedio: 'IMPRESO', cuotaObligatoriaPauta: 85, cumplimientoEfectivoIAAE: 89.1, desviacionPct: 4.1, estatusAlineacion: 'CONFORME' },
      { enteSiglas: 'YVKE MUNDIAL', tipoMedio: 'RADIO', cuotaObligatoriaPauta: 85, cumplimientoEfectivoIAAE: 82.0, desviacionPct: -3.0, estatusAlineacion: 'OBSERVADO' },
      { enteSiglas: 'AVN', tipoMedio: 'DIGITAL', cuotaObligatoriaPauta: 90, cumplimientoEfectivoIAAE: 94.6, desviacionPct: 4.6, estatusAlineacion: 'CONFORME' }
    ],
    muroProduccion: [
      { id: 'PROD-01', familia: 'ESCRITO', tipo: 'ESCRITO_NOTAS_PRENSA', etiqueta: 'Notas de Prensa Publicadas', codigoScic: 'IMP-006 / WEB-003', cantidadDia: 138, metaDia: 120, unidad: 'Notas', enteEmisor: 'AVN / Correo / VTV' },
      { id: 'PROD-02', familia: 'ESCRITO', tipo: 'ESCRITO_ARTICULOS_OPINION', etiqueta: 'Artículos de Análisis y Web', codigoScic: 'WEB-004', cantidadDia: 28, metaDia: 25, unidad: 'Artículos', enteEmisor: 'Portales SNMP' },
      { id: 'PROD-03', familia: 'ESCRITO', tipo: 'ESCRITO_COMUNICADOS_OFICIALES', etiqueta: 'Comunicados Oficiales MPPCI', codigoScic: 'EST-001', cantidadDia: 6, metaDia: 4, unidad: 'Comunicados', enteEmisor: 'Despacho Ministerial' },
      { id: 'PROD-04', familia: 'SONORO', tipo: 'SONORO_MICROS_RADIALES', etiqueta: 'Micros Radiales Informativos', codigoScic: 'RAD-008', cantidadDia: 52, metaDia: 45, unidad: 'Micros (30"-60")', enteEmisor: 'RNV / YVKE Mundial' },
      { id: 'PROD-05', familia: 'SONORO', tipo: 'SONORO_PROGRAMAS_EN_VIVO', etiqueta: 'Horas de Radio en Vivo', codigoScic: 'RAD-006', cantidadDia: 36, metaDia: 36, unidad: 'Horas', enteEmisor: 'Circuito Radial del Estado' },
      { id: 'PROD-06', familia: 'AUDIOVISUAL', tipo: 'AUDIOVISUAL_PASES_EN_VIVO', etiqueta: 'Pases Satelitales/IP en Vivo', codigoScic: 'TV-008', cantidadDia: 44, metaDia: 35, unidad: 'Pases', enteEmisor: 'VTV / TVES' },
      { id: 'PROD-07', familia: 'AUDIOVISUAL', tipo: 'AUDIOVISUAL_CAPSULAS', etiqueta: 'Cápsulas y Reportes Editados', codigoScic: 'TV-009', cantidadDia: 62, metaDia: 50, unidad: 'Piezas', enteEmisor: 'Red de Corresponsales' },
      { id: 'PROD-08', familia: 'DIGITAL_GRAFICO', tipo: 'DIGITAL_INFOGRAFIAS', etiqueta: 'Infografías y Artes Gráficos', codigoScic: 'RED-008', cantidadDia: 26, metaDia: 20, unidad: 'Infografías', enteEmisor: 'Dirección General Estrategia' },
      { id: 'PROD-09', familia: 'DIGITAL_GRAFICO', tipo: 'DIGITAL_VIDEOS_CORTOS', etiqueta: 'Videos Cortos (TikTok/Reels)', codigoScic: 'RED-010', cantidadDia: 48, metaDia: 40, unidad: 'Videos <90s', enteEmisor: 'Equipos Transmedia' },
      { id: 'PROD-10', familia: 'DIGITAL_GRAFICO', tipo: 'DIGITAL_HILOS_MICROBLOGGING', etiqueta: 'Hilos y Cobertura en Vivo X', codigoScic: 'RED-011', cantidadDia: 74, metaDia: 60, unidad: 'Hilos', enteEmisor: 'Salas de Redes' }
    ]
  },
  cLevel: {
    resumenEjecutivo: {
      fechaCorte: new Date().toLocaleDateString('es-VE'),
      semanaEpidemiologica: 35,
      estadoGeneralSemaforo: 'VERDE',
      sintesisIA: 'El Sistema Nacional de Medios Públicos mantiene supremacía comunicacional y alta resiliencia técnica (IRT: 96.1%). El Índice de Efectividad Comunicacional (IEC) alcanza 84.2%, superando la meta semanal. Se mantiene contingencia bajo control en el telepuerto y transmisión de Occidente, con rápido tiempo de neutralización ante matrices de desinformación.',
      recomendacionPrioritaria: 'Mantener apoyo de combustible a la Torre Puerto Cabello y sostener el ritmo de publicaciones cortas para maximizar el engagement digital.',
      selloOficialSha256: null,
      refrendadoPor: null
    },
    macroIndicadores: [
      { id: 'MACRO-01', codigo: 'IEC', nombre: 'Índice de Efectividad Comunicacional (KPI Maestro)', descripcionCorta: 'Consolidado ponderado de Engagement (35%), Cobertura Digital (35%) y Resiliencia Técnica (30%)', valor: 84.2, unidad: '%', meta: 75.0, deltaSemanaAnterior: 3.4, semaforo: 'VERDE', responsableArea: 'Despacho del Ministro y Viceministerios' },
      { id: 'MACRO-02', codigo: 'IRT', nombre: 'Índice de Resiliencia Técnica Nacional', descripcionCorta: 'Disponibilidad combinada TDA, enlace Banda Ku y operatividad master', valor: 96.1, unidad: '%', meta: 95.0, deltaSemanaAnterior: 0.8, semaforo: 'VERDE', responsableArea: 'REDTV y Soporte de Plataforma' },
      { id: 'MACRO-03', codigo: 'ICD', nombre: 'Índice de Cobertura Digital y Penetración', descripcionCorta: 'Población alcanzada a través de medios digitales y plataformas públicas', valor: 72.8, unidad: '%', meta: 70.0, deltaSemanaAnterior: 2.1, semaforo: 'VERDE', responsableArea: 'Dirección General de Medios Digitales' },
      { id: 'MACRO-04', codigo: 'EE', nombre: 'Tasa de Engagement Efectivo Ecosistema', descripcionCorta: 'Razón de interacciones ciudadanas sobre visualizaciones brutas en redes', valor: 8.7, unidad: '%', meta: 7.5, deltaSemanaAnterior: 0.9, semaforo: 'VERDE', responsableArea: 'Viceministerio de Planificación y Estrategia' },
      { id: 'MACRO-05', codigo: 'IBS', nombre: 'Índice de Balance de Sentimiento Neto', descripcionCorta: 'Diferencia neta entre sentimiento favorable y sentimiento hostil en el entorno digital', valor: 34.5, unidad: 'pts', meta: 20.0, deltaSemanaAnterior: 5.2, semaforo: 'VERDE', responsableArea: 'Sala Situacional y Ciberdefensa' },
      { id: 'MACRO-06', codigo: 'TRMD', nombre: 'Tiempo Promedio de Respuesta a Desinformación', descripcionCorta: 'Velocidad en minutos para detectar, producir y emitir contranarrativa oficial', valor: 42, unidad: 'min', meta: 60, deltaSemanaAnterior: -12, semaforo: 'VERDE', responsableArea: 'Dirección General de Monitoreo' },
      { id: 'MACRO-07', codigo: 'IAAE', nombre: 'Índice de Alineación con la Agenda Estratégica', descripcionCorta: 'Cumplimiento de las cuotas editoriales de los medios respecto a la pauta nacional', valor: 91.0, unidad: '%', meta: 85.0, deltaSemanaAnterior: 1.5, semaforo: 'VERDE', responsableArea: 'Viceministerio de Comunicación e Información' },
      { id: 'MACRO-08', codigo: 'IVI', nombre: 'Índice de Vulnerabilidad Institucional y RRHH', descripcionCorta: 'Exposición a riesgo del personal técnico y operativo en zonas críticas', valor: 0.180, unidad: 'indice', meta: 0.300, deltaSemanaAnterior: -0.02, semaforo: 'VERDE', responsableArea: 'Viceministerio de Gestión Comunicacional' }
    ],
    alertasDirectasPresidencia: [
      { id: 'ALR-PRES-01', severidad: 'ALTO', titulo: 'Falla de Respaldo Energético en Torre Puerto Cabello', descripcion: 'Operando con UPS al 40%. Cuadrilla técnica de REDTV en sitio en coordinación con CORPOELEC.', ente: 'REDTV', fecha: 'Hoy, 07:15 AM', accionRequerida: 'Monitoreo de restitución de carga antes de las 12:00 PM.' },
      { id: 'ALR-PRES-02', severidad: 'MEDIO', titulo: 'Matriz Desinformativa sobre Sistema Eléctrico Neutralizada', descripcion: 'Desmentido audiovisual en cadena nacional con 385.000 impactos superados por el relato oficial.', ente: 'Sala Situacional MPPCI', fecha: 'Hoy, 06:50 AM', accionRequerida: 'Mantener pases informativos en noticiero estelar.' }
    ]
  },
  sellosCriptograficos: []
};

// =========================================================================
// REPOSITORIO PERSISTENTE EN SQLITE
// =========================================================================
export class SqliteStore {
  private static storeCache: any = null;

  /**
   * Obtiene el estado consolidado de CentralStore desde SQLite.
   * Si no existe en la base de datos, lo inicializa con los valores semilla.
   */
  static getCentralStore(): any {
    if (this.storeCache) {
      return this.storeCache;
    }

    const row = db.prepare('SELECT value FROM system_state WHERE key = ?').get('central_store_state') as { value: string } | undefined;

    if (row && row.value) {
      try {
        this.storeCache = JSON.parse(row.value);
        // También cargar sellos desde la tabla de sellos dedicada para integridad relacional
        this.storeCache.sellosCriptograficos = this.getSellosCriptograficos();
        return this.storeCache;
      } catch (err) {
        console.error('[SQLiteStore] Error al parsear system_state, regenerando default:', err);
      }
    }

    // Inicializar por primera vez
    this.storeCache = JSON.parse(JSON.stringify(DEFAULT_CENTRAL_STORE));
    this.saveCentralStore(this.storeCache);
    return this.storeCache;
  }

  /**
   * Guarda de forma atómica el CentralStore en SQLite
   */
  static saveCentralStore(store: any): void {
    this.storeCache = store;
    const jsonStr = JSON.stringify(store);
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO system_state (key, value, updated_at) 
      VALUES ('central_store_state', ?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `);
    stmt.run(jsonStr, now);
  }

  /**
   * Registra un nuevo sello criptográfico en la tabla inmutable SQLite
   */
  static addSelloCriptografico(sello: any): void {
    const stmt = db.prepare(`
      INSERT INTO sellos_criptograficos (
        selloId, hashCompletoSha256, timestamp, semanaEpidemiologica,
        ministro, cedula, cargo, observaciones, estado, kpisSellados, merkleRoot
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      sello.selloId,
      sello.hashCompletoSha256,
      sello.timestamp,
      sello.semanaEpidemiologica,
      sello.ministro,
      sello.cedula,
      sello.cargo,
      sello.observaciones,
      sello.estado,
      JSON.stringify(sello.kpisSellados || {}),
      sello.merkleRoot || null
    );

    // Actualizar cache en memoria
    const store = this.getCentralStore();
    store.sellosCriptograficos.unshift(sello);
    store.cLevel.resumenEjecutivo.selloOficialSha256 = sello.selloId;
    store.cLevel.resumenEjecutivo.refrendadoPor = sello.ministro;
    this.saveCentralStore(store);
  }

  /**
   * Obtiene la lista histórica de sellos criptográficos
   */
  static getSellosCriptograficos(): any[] {
    const rows = db.prepare(`
      SELECT * FROM sellos_criptograficos ORDER BY timestamp DESC
    `).all() as any[];

    return rows.map(r => ({
      ...r,
      kpisSellados: r.kpisSellados ? JSON.parse(r.kpisSellados) : {}
    }));
  }

  /**
   * Guarda un registro de captura semanal garantizando idempotencia matemática
   */
  static saveCapturaSemanal(params: {
    semana: number;
    ano: number;
    enteId: string;
    usuarioId: string;
    idempotencyKey: string;
    auditHash: string;
    payload: any;
    indicadores?: Array<{ codigo: string; valor: number; variables: any; estatus: string }>;
  }): { success: boolean; message: string; id: string; duplicado?: boolean } {
    const { semana, ano, enteId, usuarioId, idempotencyKey, auditHash, payload, indicadores } = params;

    // 1. Asegurar o crear el corte semanal
    let corte = db.prepare('SELECT id FROM cortes_semanales WHERE semana = ? AND ano = ?').get(semana, ano) as { id: number } | undefined;
    if (!corte) {
      const insCorte = db.prepare('INSERT INTO cortes_semanales (semana, ano, estado) VALUES (?, ?, ?)');
      const info = insCorte.run(semana, ano, 'ABIERTO');
      corte = { id: Number(info.lastInsertRowid) };
    }

    const capturaId = `CAP-${ano}-W${String(semana).padStart(2, '0')}-${enteId}`;
    const payloadJson = JSON.stringify(payload);

    try {
      const stmtCaptura = db.prepare(`
        INSERT INTO registros_captura (id, corte_id, ente_id, usuario_id, idempotency_key, audit_hash, payload_json)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      stmtCaptura.run(capturaId, corte.id, enteId, usuarioId, idempotencyKey, auditHash, payloadJson);

      // Guardar indicadores desglosados si vienen provistos
      if (indicadores && indicadores.length > 0) {
        const stmtInd = db.prepare(`
          INSERT INTO valores_indicador (captura_id, codigo_indicador, valor_calculado, variables_json, estatus_evaluacion)
          VALUES (?, ?, ?, ?, ?)
        `);
        for (const ind of indicadores) {
          stmtInd.run(capturaId, ind.codigo, ind.valor, JSON.stringify(ind.variables || {}), ind.estatus);
        }
      }

      return {
        success: true,
        message: `Captura ${capturaId} registrada exitosamente bajo corte N° ${semana}/${ano}.`,
        id: capturaId
      };
    } catch (err: any) {
      // Manejo de idempotencia matemática
      if (err.message && err.message.includes('UNIQUE constraint failed')) {
        return {
          success: true,
          duplicado: true,
          message: `Idempotencia activada: La captura para ${enteId} en semana ${semana}/${ano} ya se encuentra registrada inmutablemente.`,
          id: capturaId
        };
      }
      throw err;
    }
  }

  // =========================================================================
  // GESTIÓN SOBERANA DE USUARIOS, FORMALIZACIÓN Y CREDENCIALES
  // =========================================================================

  /**
   * Inicializa la tabla de usuarios institucionales con datos semilla si está vacía
   */
  static seedUsuariosIfEmpty(): void {
    const countRow = db.prepare('SELECT COUNT(*) as cnt FROM usuarios_institucionales').get() as { cnt: number };
    if (countRow.cnt > 0) return;

    const stmt = db.prepare(`
      INSERT INTO usuarios_institucionales (
        id, cedula, nombre, apellido, email, telefono, telegram, ente_adscrito,
        cargo, dependencia, rol_sistema, raci_role, estado, nivel_acceso, permisos_modulos,
        estatus_enrolamiento, password_hash, password_salt, bound_device_id, bound_device_nombre,
        foto_perfil_url, fecha_enrolamiento, ultimo_acceso, avatar_bg
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const u of INITIAL_USERS) {
      let enrolamiento: EnrollmentStatus = 'PRECARGADO';
      let passHash: string | null = null;
      let passSalt: string | null = null;
      let deviceId: string | null = null;
      let deviceNombre: string | null = null;
      let fechaEnr: string | null = null;

      // Administrador principal precargado como ENROLADO por defecto
      if (u.rolSistema === 'SUPER_ADMIN') {
        enrolamiento = 'ENROLADO';
        const hashed = PasswordCryptoService.hashPassword('admin123');
        passHash = hashed.hash;
        passSalt = hashed.salt;
        deviceId = 'DEV-SYSADMIN-DEFAULT-01';
        deviceNombre = 'Estación Central DGTI (Linux)';
        fechaEnr = '2026-01-15 08:00:00';
      } else if (u.rolSistema === 'MINISTRO') {
        enrolamiento = 'ENROLADO';
        const hashed = PasswordCryptoService.hashPassword('mppci2026');
        passHash = hashed.hash;
        passSalt = hashed.salt;
        deviceId = 'DEV-MINISTRO-DESPACHO-01';
        deviceNombre = 'Terminal Móvil Despacho';
        fechaEnr = '2026-02-01 09:30:00';
      }

      stmt.run(
        u.id,
        u.cedula,
        u.nombre,
        u.apellido,
        u.email,
        u.telefono,
        u.telegram || null,
        u.enteAdscrito,
        u.cargo,
        u.dependencia,
        u.rolSistema,
        u.raciRole,
        u.estado,
        u.nivelAcceso,
        JSON.stringify(u.permisosModulos),
        enrolamiento,
        passHash,
        passSalt,
        deviceId,
        deviceNombre,
        null,
        fechaEnr,
        u.ultimoAcceso,
        u.avatarBg || null
      );
    }
  }

  /**
   * Obtiene todos los usuarios institucionales con estatus de enrolamiento
   */
  static getUsuarios(): any[] {
    this.seedUsuariosIfEmpty();
    const rows = db.prepare('SELECT * FROM usuarios_institucionales ORDER BY id ASC').all() as any[];
    return rows.map(r => ({
      ...r,
      permisosModulos: JSON.parse(r.permisos_modulos || '[]'),
      estatusEnrolamiento: r.estatus_enrolamiento,
      boundDeviceId: r.bound_device_id,
      boundDeviceNombre: r.bound_device_nombre,
      fotoPerfilUrl: r.foto_perfil_url,
      fechaEnrolamiento: r.fecha_enrolamiento,
      ultimoAcceso: r.ultimo_acceso,
      intentosFallidos: r.intentos_fallidos,
      avatarBg: r.avatar_bg
    }));
  }

  /**
   * Busca un usuario por cédula, email o ID
   */
  static getUsuarioByIdentifier(term: string): any | null {
    this.seedUsuariosIfEmpty();
    const clean = term.trim().toLowerCase();
    const cleanDigits = clean.replace(/\D/g, '');

    const users = db.prepare('SELECT * FROM usuarios_institucionales').all() as any[];
    const found = users.find(u => {
      const uDigits = u.cedula.replace(/\D/g, '');
      if (cleanDigits && uDigits === cleanDigits) return true;
      if (u.cedula.toLowerCase() === clean || u.cedula.toLowerCase() === `v-${clean}`) return true;
      if (u.email.toLowerCase() === clean) return true;
      if (u.id.toLowerCase() === clean) return true;
      if (`${u.nombre} ${u.apellido}`.toLowerCase().includes(clean)) return true;
      return false;
    });

    if (!found) return null;

    return {
      ...found,
      permisosModulos: JSON.parse(found.permisos_modulos || '[]'),
      estatusEnrolamiento: found.estatus_enrolamiento,
      boundDeviceId: found.bound_device_id,
      boundDeviceNombre: found.bound_device_nombre,
      fotoPerfilUrl: found.foto_perfil_url,
      fechaEnrolamiento: found.fecha_enrolamiento,
      ultimoAcceso: found.ultimo_acceso,
      intentosFallidos: found.intentos_fallidos,
      avatarBg: found.avatar_bg
    };
  }

  /**
   * Formalización inicial multi-dispositivo de un usuario precargado
   */
  static formalizeUsuario(params: {
    userId: string;
    password: string;
    fotoPerfilUrl: string;
    boundDeviceId: string;
    boundDeviceNombre?: string;
  }): { success: boolean; message: string; user?: any } {
    this.seedUsuariosIfEmpty();
    const { userId, password, fotoPerfilUrl, boundDeviceId, boundDeviceNombre } = params;

    const user = db.prepare('SELECT * FROM usuarios_institucionales WHERE id = ?').get(userId) as any;
    if (!user) {
      return { success: false, message: 'Funcionario no encontrado para formalización.' };
    }

    const { hash, salt } = PasswordCryptoService.hashPassword(password);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    db.prepare(`
      UPDATE usuarios_institucionales
      SET 
        estatus_enrolamiento = 'ENROLADO',
        password_hash = ?,
        password_salt = ?,
        bound_device_id = ?,
        bound_device_nombre = ?,
        foto_perfil_url = ?,
        fecha_enrolamiento = ?,
        intentos_fallidos = 0,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(hash, salt, boundDeviceId, boundDeviceNombre || 'Dispositivo Institucional', fotoPerfilUrl, now, userId);

    return {
      success: true,
      message: `Formalización completada exitosamente. Dispositivo ${boundDeviceId} vinculado.`,
      user: this.getUsuarioByIdentifier(userId)
    };
  }

  /**
   * Paso 1 de Recuperación: verificación de identidad con cédula y datos de nómina (email o teléfono)
   */
  static requestPasswordRecovery(cedula: string, emailOrPhone: string, serverSecret: string): {
    success: boolean;
    message: string;
    recoveryCode?: string;
    recoveryToken?: string;
    exp?: number;
  } {
    this.seedUsuariosIfEmpty();
    const cleanCed = cedula.trim().toLowerCase();
    const cleanDigits = cleanCed.replace(/\D/g, '');
    const cleanContact = emailOrPhone.trim().toLowerCase();

    const users = db.prepare('SELECT * FROM usuarios_institucionales').all() as any[];
    const user = users.find(u => {
      const uDigits = u.cedula.replace(/\D/g, '');
      return (cleanDigits && uDigits === cleanDigits) || u.cedula.toLowerCase() === cleanCed;
    });

    if (!user) {
      return { success: false, message: 'Cédula no encontrada en el registro de nómina.' };
    }

    // Verificar coincidencia con correo o teléfono institucional registrado
    const emailMatch = user.email.toLowerCase() === cleanContact;
    const phoneClean = user.telefono.replace(/\D/g, '');
    const inputPhoneClean = cleanContact.replace(/\D/g, '');
    const phoneMatch = phoneClean && inputPhoneClean && phoneClean.includes(inputPhoneClean);

    if (!emailMatch && !phoneMatch) {
      return {
        success: false,
        message: 'Los datos de contacto provistos no coinciden con el registro oficial de este funcionario.'
      };
    }

    const recoveryCode = PasswordCryptoService.generateRecoveryOTP();
    const { token, exp } = PasswordCryptoService.generateRecoveryToken(user.cedula, serverSecret, 15);

    db.prepare(`
      UPDATE usuarios_institucionales
      SET recovery_code = ?, recovery_token_exp = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(recoveryCode, exp, user.id);

    return {
      success: true,
      message: `Código de verificación emitido exitosamente. Válido por 15 minutos.`,
      recoveryCode, // En producción se envía por SMS/Email soberano
      recoveryToken: token,
      exp
    };
  }

  /**
   * Paso 2 de Recuperación: validación de token/código OTP y reasignación de contraseña institucional
   */
  static resetPasswordWithRecovery(params: {
    cedula: string;
    recoveryCode: string;
    newPassword: string;
    recoveryToken: string;
    serverSecret: string;
  }): { success: boolean; message: string } {
    this.seedUsuariosIfEmpty();
    const { cedula, recoveryCode, newPassword, recoveryToken, serverSecret } = params;

    const tokenVerification = PasswordCryptoService.verifyRecoveryToken(recoveryToken, serverSecret);
    if (!tokenVerification.valid) {
      return { success: false, message: tokenVerification.error || 'Token inválido o expirado.' };
    }

    const cleanCed = cedula.trim().toLowerCase();
    const cleanDigits = cleanCed.replace(/\D/g, '');

    const users = db.prepare('SELECT * FROM usuarios_institucionales').all() as any[];
    const user = users.find(u => {
      const uDigits = u.cedula.replace(/\D/g, '');
      return (cleanDigits && uDigits === cleanDigits) || u.cedula.toLowerCase() === cleanCed;
    });

    if (!user) {
      return { success: false, message: 'Funcionario no encontrado.' };
    }

    if (!user.recovery_code || user.recovery_code !== recoveryCode.trim()) {
      return { success: false, message: 'El código de seguridad ingresado es incorrecto.' };
    }

    if (!user.recovery_token_exp || Date.now() > user.recovery_token_exp) {
      return { success: false, message: 'El código de recuperación ha expirado.' };
    }

    const { hash, salt } = PasswordCryptoService.hashPassword(newPassword);

    db.prepare(`
      UPDATE usuarios_institucionales
      SET 
        password_hash = ?,
        password_salt = ?,
        recovery_code = NULL,
        recovery_token_exp = NULL,
        estado = CASE WHEN estado = 'BLOQUEADO' THEN 'ACTIVO' ELSE estado END,
        intentos_fallidos = 0,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(hash, salt, user.id);

    return {
      success: true,
      message: 'Contraseña institucional reasignada exitosamente con hashing scrypt. Puede iniciar sesión.'
    };
  }

  /**
   * Panel Administrativo: Asignación manual de contraseña por directores/administradores
   */
  static adminSetPassword(userId: string, newPassword: string): { success: boolean; message: string } {
    this.seedUsuariosIfEmpty();
    const user = db.prepare('SELECT id, nombre, apellido FROM usuarios_institucionales WHERE id = ?').get(userId) as any;
    if (!user) {
      return { success: false, message: 'Funcionario no encontrado.' };
    }

    const { hash, salt } = PasswordCryptoService.hashPassword(newPassword);

    db.prepare(`
      UPDATE usuarios_institucionales
      SET 
        password_hash = ?,
        password_salt = ?,
        intentos_fallidos = 0,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(hash, salt, userId);

    return {
      success: true,
      message: `Contraseña actualizada para ${user.nombre} ${user.apellido}.`
    };
  }

  /**
   * Panel Administrativo: Restablecimiento de funcionario a estatus PRECARGADO para forzar enrolamiento inicial
   */
  static adminResetToPrecargado(userId: string): { success: boolean; message: string } {
    this.seedUsuariosIfEmpty();
    const user = db.prepare('SELECT id, nombre, apellido FROM usuarios_institucionales WHERE id = ?').get(userId) as any;
    if (!user) {
      return { success: false, message: 'Funcionario no encontrado.' };
    }

    db.prepare(`
      UPDATE usuarios_institucionales
      SET 
        estatus_enrolamiento = 'PRECARGADO',
        password_hash = NULL,
        password_salt = NULL,
        bound_device_id = NULL,
        bound_device_nombre = NULL,
        foto_perfil_url = NULL,
        fecha_enrolamiento = NULL,
        intentos_fallidos = 0,
        updated_at = datetime('now')
      WHERE id = ?
    `).run(userId);

    return {
      success: true,
      message: `Funcionario ${user.nombre} ${user.apellido} restablecido al estatus PRECARGADO. Se forzará la formalización de dispositivo y foto en su próximo ingreso.`
    };
  }
}
