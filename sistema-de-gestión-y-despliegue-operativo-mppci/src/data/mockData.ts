import { 
  EnteInfo, 
  CriticalTowerStatus, 
  OpinionMatrixAlert, 
  TalentVulnerabilityRow, 
  MunicipalityData, 
  FullWeeklyReport, 
  AuditLog,
  AutoNotification
} from '../types';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';
import { INITIAL_EJE2_DATA } from './mockEje2Data';
import { INITIAL_EJE3_DATA } from './mockEje3Data';
import { INITIAL_EJE4_DATA } from './mockEje4Data';

export const ENTES_MIPCCI: EnteInfo[] = [
  {
    id: 'TVES',
    nombre: 'Fundación Televisora Venezolana Social (TVES)',
    siglas: 'TVES',
    ejePrincipal: 'EJE_1',
    tipo: 'TELEVISION',
    director: 'Lic. Winston Vallenilla / Dir. Producción',
    cedula: 'V-11928374',
    email: 'gerencia.operaciones@tves.gob.ve',
    telegram: '@tves_operaciones',
    region: 'Distrito Capital - Boleíta',
    nominaTotal: 420
  },
  {
    id: 'AVILA_TV',
    nombre: 'Fundación Ávila TV',
    siglas: 'Avila Tvé',
    ejePrincipal: 'EJE_1',
    tipo: 'TELEVISION',
    director: 'Lic. Andrea Pacheco / Dir. General',
    cedula: 'V-17849201',
    email: 'operaciones@avilatv.gob.ve',
    telegram: '@avilatv_canal',
    region: 'Distrito Capital - Av. Urdaneta',
    nominaTotal: 260
  },
  {
    id: 'VTV',
    nombre: 'C.A. Venezolana de Televisión',
    siglas: 'C.A.V.T.V',
    ejePrincipal: 'EJE_1',
    tipo: 'TELEVISION',
    director: 'Lic. Gabriel Morales / Coord. Operativa',
    cedula: 'V-14829301',
    email: 'operaciones@vtv.gob.ve',
    telegram: '@vtv_canal8_ops',
    region: 'Distrito Capital - Los Ruices',
    nominaTotal: 850
  },
  {
    id: 'TELESUR',
    nombre: 'La Nueva Televisión del Sur (TELESUR)',
    siglas: 'TELESUR',
    ejePrincipal: 'EJE_1',
    tipo: 'TELEVISION',
    director: 'Lic. Patricia Villegas / Presidencia',
    cedula: 'E-84920194',
    email: 'coordinacion@telesurtv.net',
    telegram: '@telesur_central',
    region: 'Distrito Capital - Telepuerto Satelital',
    nominaTotal: 650
  },
  {
    id: 'TELESUR_VEN',
    nombre: 'La Nueva Televisión del Sur Venezuela, C.A.',
    siglas: 'TELESUR VENEZUELA',
    ejePrincipal: 'EJE_1',
    tipo: 'TELEVISION',
    director: 'Lic. Rodrigo Gómez / Dir. Operaciones Nacional',
    cedula: 'V-13928104',
    email: 'operaciones.venezuela@telesurtv.net',
    telegram: '@telesur_ven_ops',
    region: 'Distrito Capital - Boleíta Norte',
    nominaTotal: 310
  },
  {
    id: 'YVKE',
    nombre: 'Radio Mundial, C.A. (YVKE)',
    siglas: 'YVKE Radio Mundial',
    ejePrincipal: 'EJE_1',
    tipo: 'RADIO',
    director: 'Lic. Alejandro Silva / Dir. General',
    cedula: 'V-15789201',
    email: 'operaciones@radiomundial.com.ve',
    telegram: '@yvke_central',
    region: 'Distrito Capital - Urb. Las Mercedes',
    nominaTotal: 290
  },
  {
    id: 'YVKE_ZULIA',
    nombre: 'Radio Zulia, C.A.',
    siglas: 'YVKE Radio Mundial Zulia',
    ejePrincipal: 'EJE_1',
    tipo: 'RADIO',
    director: 'Lic. Nerio Fuenmayor / Dir. Emisora',
    cedula: 'V-12984019',
    email: 'zulia@radiomundial.com.ve',
    telegram: '@yvke_zulia_ops',
    region: 'Zulia - Maracaibo (AM 1070 / FM 102.1)',
    nominaTotal: 75
  },
  {
    id: 'YVKE_MARGARITA',
    nombre: 'Radio Margarita, C.A.',
    siglas: 'YVKE Radio Mundial Margarita',
    ejePrincipal: 'EJE_1',
    tipo: 'RADIO',
    director: 'Lic. Yarisma Rodríguez / Dir. Emisora',
    cedula: 'V-16029384',
    email: 'margarita@radiomundial.com.ve',
    telegram: '@yvke_margarita_ops',
    region: 'Nueva Esparta - Porlamar (AM 1020 / FM 92.9)',
    nominaTotal: 65
  },
  {
    id: 'YVKE_ANDES',
    nombre: 'Radio Los Andes, C.A.',
    siglas: 'YVKE Radio Mundial Los Andes',
    ejePrincipal: 'EJE_1',
    tipo: 'RADIO',
    director: 'Lic. José Gregorio Zambrano / Dir. Emisora',
    cedula: 'V-14902817',
    email: 'losandes@radiomundial.com.ve',
    telegram: '@yvke_andes_ops',
    region: 'Mérida / Táchira / Trujillo (AM 1040 / FM 106.3)',
    nominaTotal: 80
  },
  {
    id: 'RNV',
    nombre: 'Radio Nacional de Venezuela, C.A.',
    siglas: 'RNV',
    ejePrincipal: 'EJE_1',
    tipo: 'RADIO',
    director: 'Lic. Isbemar Jiménez / Presidencia',
    cedula: 'V-13094821',
    email: 'direccion@rnv.gob.ve',
    telegram: '@rnv_informativo',
    region: 'Distrito Capital - Chapellín (Red Nacional AM/FM)',
    nominaTotal: 380
  },
  {
    id: 'AVN',
    nombre: 'Agencia Venezolana de Noticias, C.A.',
    siglas: 'AVN, C.A',
    ejePrincipal: 'EJE_1',
    tipo: 'DIGITAL',
    director: 'Lic. Pedro Ibáñez / Director Editorial',
    cedula: 'V-16892011',
    email: 'redaccion@avn.info.ve',
    telegram: '@avn_noticias_ops',
    region: 'Distrito Capital - Torre MPPCI',
    nominaTotal: 210
  },
  {
    id: 'LRDS',
    nombre: 'La Radio del Sur, C.A.',
    siglas: 'LRDS',
    ejePrincipal: 'EJE_1',
    tipo: 'RADIO',
    director: 'Lic. Nieves Valdez / Presidencia',
    cedula: 'V-14782019',
    email: 'operaciones@laradiodelsur.com.ve',
    telegram: '@laradiodelsur_ops',
    region: 'Distrito Capital - Torre Phelps Plaza Venezuela',
    nominaTotal: 195
  },
  {
    id: 'FRM',
    nombre: 'Fundación Radio Miraflores',
    siglas: 'FRM',
    ejePrincipal: 'EJE_1',
    tipo: 'RADIO',
    director: 'Lic. Wilmer Salazar / Dir. General',
    cedula: 'V-13894720',
    email: 'sala.situacional@radiomiraflores.gob.ve',
    telegram: '@radiomiraflores_ops',
    region: 'Distrito Capital - Palacio de Miraflores (95.9 FM)',
    nominaTotal: 150
  },
  {
    id: 'CONATEL',
    nombre: 'Comisión Nacional de Telecomunicaciones',
    siglas: 'CONATEL',
    ejePrincipal: 'EJE_2',
    tipo: 'REGULADOR',
    director: 'G/D Jorge Márquez Monsalve',
    cedula: 'V-10492819',
    email: 'regulacion@conatel.gob.ve',
    telegram: '@conatel_sala_situacional',
    region: 'Distrito Capital - Las Mercedes',
    nominaTotal: 620
  },
  {
    id: 'COVETEL',
    nombre: 'Corporación Venezolana de Telecomunicaciones S.A.',
    siglas: 'COVETEL',
    ejePrincipal: 'EJE_2',
    tipo: 'TELECOMUNICACIONES',
    director: 'Ing. Arnaldo Silva / Gerencia General',
    cedula: 'V-13491820',
    email: 'operaciones@covetel.gob.ve',
    telegram: '@covetel_telecom_ops',
    region: 'Distrito Capital - Los Ruices',
    nominaTotal: 340
  },
  {
    id: 'REDTV',
    nombre: 'Red de Transmisiones de Venezuela, C.A.',
    siglas: 'REDTV',
    ejePrincipal: 'EJE_2',
    tipo: 'TELECOMUNICACIONES',
    director: 'Ing. Carlos Mendoza',
    cedula: 'V-12495810',
    email: 'operaciones@redtv.gob.ve',
    telegram: '@redtv_tecnica_alerta',
    region: 'Nacional - Mecedores / Telepuerto',
    nominaTotal: 490
  },
  {
    id: 'SAINGO',
    nombre: 'Servicio Autónomo Imprenta Nacional y Gaceta Oficial',
    siglas: 'SAINGO',
    ejePrincipal: 'EJE_3',
    tipo: 'IMPRESO',
    director: 'Dra. Carmen Salazar',
    cedula: 'V-14209183',
    email: 'gaceta@imprentanacional.gob.ve',
    telegram: '@saingo_gaceta_oficial',
    region: 'Distrito Capital - Centro',
    nominaTotal: 180
  },
  {
    id: 'CORREO_ORINOCO',
    nombre: 'Fundación Correo del Orinoco',
    siglas: 'Correo del Orinoco',
    ejePrincipal: 'EJE_3',
    tipo: 'IMPRESO',
    director: 'Lic. Manuel Azuaje',
    cedula: 'V-13847291',
    email: 'redaccion@correodelorinoco.gob.ve',
    telegram: '@correo_orinoco_ops',
    region: 'Distrito Capital - Altagracia',
    nominaTotal: 140
  },
  {
    id: 'CEAM',
    nombre: 'Complejo Editorial Alfredo Maneiro',
    siglas: 'CEAM',
    ejePrincipal: 'EJE_3',
    tipo: 'EDITORIAL',
    director: 'Lic. Hugo Cabezas / Presidencia',
    cedula: 'V-11928401',
    email: 'operaciones@ceam.gob.ve',
    telegram: '@ceam_editorial_ops',
    region: 'Distrito Capital - La Yaguara',
    nominaTotal: 310
  },
  {
    id: 'CEBAC',
    nombre: 'Complejo Editorial Batalla de Carabobo S.A.',
    siglas: 'CEBAC S.A.',
    ejePrincipal: 'EJE_3',
    tipo: 'EDITORIAL',
    director: 'Cnel. Rafael Contreras / Gerencia General',
    cedula: 'V-12849102',
    email: 'contacto@cebac.gob.ve',
    telegram: '@cebac_carabobo_ops',
    region: 'Carabobo - Valencia',
    nominaTotal: 190
  },
  {
    id: 'AVP',
    nombre: 'Agencia Venezolana de Publicidad, S.A.',
    siglas: 'AVP',
    ejePrincipal: 'EJE_3',
    tipo: 'PUBLICIDAD_EVENTOS',
    director: 'Lic. Mariana Gómez / Estrategia Publicitaria',
    cedula: 'V-15829104',
    email: 'campanas@avp.gob.ve',
    telegram: '@avp_publicidad_ops',
    region: 'Distrito Capital - Torre MPPCI',
    nominaTotal: 120
  },
  {
    id: 'VILLA_CINE',
    nombre: 'Fundación La Villa del Cine',
    siglas: 'FVC',
    ejePrincipal: 'EJE_3',
    tipo: 'CULTURA_CINE',
    director: 'Lic. José Romero',
    cedula: 'V-15892019',
    email: 'produccion@villadelcine.gob.ve',
    telegram: '@villadelcine_ops',
    region: 'Miranda - Guarenas',
    nominaTotal: 165
  },
  {
    id: 'AMAZONIA_FILMS',
    nombre: 'Fundación Amazonia Films',
    siglas: 'FDNCAF',
    ejePrincipal: 'EJE_3',
    tipo: 'CULTURA_CINE',
    director: 'Lic. Yulimar Rojas / Presidencia',
    cedula: 'V-16920184',
    email: 'distribucion@amazoniafilms.gob.ve',
    telegram: '@amazonia_films_ops',
    region: 'Distrito Capital - Los Ruices',
    nominaTotal: 95
  },
  {
    id: 'FPNP',
    nombre: 'Fundación Premio Nacional de Periodismo',
    siglas: 'FPNP',
    ejePrincipal: 'EJE_3',
    tipo: 'PUBLICIDAD_EVENTOS',
    director: 'Lic. Mercedes Salazar / Secretaría Ejecutiva',
    cedula: 'V-10294819',
    email: 'jurado@premionacionalperiodismo.gob.ve',
    telegram: '@fpnp_secretaria',
    region: 'Distrito Capital - Torre MPPCI',
    nominaTotal: 40
  },
  {
    id: 'POLIEDRO_CARACAS',
    nombre: 'Fundación Poliedro de Caracas',
    siglas: 'FPC',
    ejePrincipal: 'EJE_3',
    tipo: 'PUBLICIDAD_EVENTOS',
    director: 'Antonio Álvarez / Presidencia',
    cedula: 'V-13920184',
    email: 'eventos@poliedrodecaracas.gob.ve',
    telegram: '@poliedro_caracas_ops',
    region: 'Distrito Capital - La Rinconada',
    nominaTotal: 220
  },
  {
    id: 'VM_COM_INFO',
    nombre: 'Viceministerio de Comunicación e Información',
    siglas: 'VCI',
    ejePrincipal: 'EJE_4',
    tipo: 'CENTRAL',
    director: 'Viceministro/a de Comunicación e Información',
    cedula: 'V-12049182',
    email: 'despacho.vci@minci.gob.ve',
    telegram: '@vci_despacho_oficial',
    region: 'Distrito Capital - Torre MPPCI Piso 9',
    nominaTotal: 110
  },
  {
    id: 'VM_GESTION_COM',
    nombre: 'Viceministerio de Gestión Comunicacional',
    siglas: 'VGC',
    ejePrincipal: 'EJE_4',
    tipo: 'CENTRAL',
    director: 'Viceministro/a de Gestión Comunicacional',
    cedula: 'V-11849201',
    email: 'gestion.comunicacional@minci.gob.ve',
    telegram: '@vgc_despacho_oficial',
    region: 'Distrito Capital - Torre MPPCI Piso 8',
    nominaTotal: 135
  },
  {
    id: 'VM_PLANIF_ESTRAT',
    nombre: 'Viceministerio de Planificación y Estrategia Comunicacional',
    siglas: 'VPEC',
    ejePrincipal: 'EJE_4',
    tipo: 'CENTRAL',
    director: 'Viceministro/a de Planificación Estratégica',
    cedula: 'V-13920194',
    email: 'planificacion.estrategica@minci.gob.ve',
    telegram: '@vpec_planificacion',
    region: 'Distrito Capital - Torre MPPCI Piso 7',
    nominaTotal: 90
  },
  {
    id: 'VM_SOPORTE_PLATAFORMA',
    nombre: 'Viceministerio de Soporte de Plataforma Comunicacional',
    siglas: 'VSPC',
    ejePrincipal: 'EJE_4',
    tipo: 'CENTRAL',
    director: 'Viceministro/a de Soporte de Plataforma Comunicacional',
    cedula: 'V-14029184',
    email: 'soporte.plataforma@minci.gob.ve',
    telegram: '@vspc_tecnologia',
    region: 'Distrito Capital - Torre MPPCI Piso 6',
    nominaTotal: 85
  },
  {
    id: 'MIPCCI_CENTRAL',
    nombre: 'Sede Central - Despacho del Ministro MPPCI',
    siglas: 'MPPCI Central',
    ejePrincipal: 'EJE_4',
    tipo: 'CENTRAL',
    director: 'Despacho Ministerial / Dirección General',
    cedula: 'V-11849201',
    email: 'vpscc.informacion.indicadores@gmail.com',
    telegram: '@mppci_sala_estrategica',
    region: 'Distrito Capital - Torre MPPCI Esq. El Chorro',
    nominaTotal: 510
  }
];

export const CRITICAL_TOWERS: CriticalTowerStatus[] = [
  {
    id: 'TOW-CCS-01',
    nombre: 'Estación Mecedores (Caracas)',
    ubicacion: 'Waraira Repano, Distrito Capital',
    estado: 'Distrito Capital',
    coordenadas: [10.5312, -66.9189],
    potenciaActual: 98.4,
    temperatura: 22.4,
    operatividadSenal: 99.1,
    fallaDetectada: false,
    transmisorTDA: 'OPERATIVO',
    enlaceMicroondas: 'OPERATIVO',
    plantaElectrica: 'OPERATIVO',
    poblacionBeneficiada: 4200000,
    municipiosCubiertos: ['Libertador', 'Chacao', 'Sucre', 'Baruta', 'El Hatillo', 'Vargas'],
    ultimaRevision: '2026-09-02 05:30 AM'
  },
  {
    id: 'TOW-ZUL-01',
    nombre: 'Torre Maracaibo (Zulia)',
    ubicacion: 'Cerro Cochino / La Concepción, Zulia',
    estado: 'Zulia',
    coordenadas: [10.6558, -71.6375],
    potenciaActual: 92.1,
    temperatura: 36.8,
    operatividadSenal: 94.6,
    fallaDetectada: false,
    transmisorTDA: 'OPERATIVO',
    enlaceMicroondas: 'OPERATIVO',
    plantaElectrica: 'OPERATIVO',
    poblacionBeneficiada: 2800000,
    municipiosCubiertos: ['Maracaibo', 'San Francisco', 'Cabimas', 'Lagunillas', 'Mara'],
    ultimaRevision: '2026-09-02 04:15 AM'
  },
  {
    id: 'TOW-CAR-01',
    nombre: 'Torre Valencia (Carabobo)',
    ubicacion: 'Cerro Copey / Bárbula, Carabobo',
    estado: 'Carabobo',
    coordenadas: [10.2312, -68.0044],
    potenciaActual: 88.5,
    temperatura: 29.1,
    operatividadSenal: 89.2,
    fallaDetectada: false,
    transmisorTDA: 'OPERATIVO',
    enlaceMicroondas: 'OPERATIVO',
    plantaElectrica: 'OPERATIVO',
    poblacionBeneficiada: 1900000,
    municipiosCubiertos: ['Valencia', 'Naguanagua', 'San Diego', 'Guacara', 'Los Guayos'],
    ultimaRevision: '2026-09-02 06:00 AM'
  },
  {
    id: 'TOW-CAR-02',
    nombre: 'Torre Puerto Cabello (Carabobo)',
    ubicacion: 'Cerro Santa Lucía, Puerto Cabello',
    estado: 'Carabobo',
    coordenadas: [10.4729, -68.0125],
    potenciaActual: 74.2,
    temperatura: 33.2,
    operatividadSenal: 76.5,
    fallaDetectada: true,
    tipoFalla: 'Fluctuación de voltaje en transmisor auxiliar TDA',
    transmisorTDA: 'ALERTA',
    enlaceMicroondas: 'OPERATIVO',
    plantaElectrica: 'EN_USO',
    poblacionBeneficiada: 450000,
    municipiosCubiertos: ['Puerto Cabello', 'Juan José Mora', 'Morón'],
    ultimaRevision: '2026-09-02 06:10 AM'
  },
  {
    id: 'TOW-LAR-01',
    nombre: 'Torre Barquisimeto (Lara)',
    ubicacion: 'Cerro Manzano, Lara',
    estado: 'Lara',
    coordenadas: [10.0678, -69.3474],
    potenciaActual: 95.0,
    temperatura: 27.5,
    operatividadSenal: 96.3,
    fallaDetectada: false,
    transmisorTDA: 'OPERATIVO',
    enlaceMicroondas: 'OPERATIVO',
    plantaElectrica: 'OPERATIVO',
    poblacionBeneficiada: 1600000,
    municipiosCubiertos: ['Iribarren', 'Palavecino', 'Crespo', 'Jiménez'],
    ultimaRevision: '2026-09-02 03:45 AM'
  },
  {
    id: 'TOW-MON-01',
    nombre: 'Torre Maturín (Monagas)',
    ubicacion: 'Cerro Negro, Monagas',
    estado: 'Monagas',
    coordenadas: [9.7456, -63.1789],
    potenciaActual: 91.3,
    temperatura: 31.0,
    operatividadSenal: 93.8,
    fallaDetectada: false,
    transmisorTDA: 'OPERATIVO',
    enlaceMicroondas: 'OPERATIVO',
    plantaElectrica: 'OPERATIVO',
    poblacionBeneficiada: 850000,
    municipiosCubiertos: ['Maturín', 'Ezequiel Zamora', 'Punceres', 'Caripe'],
    ultimaRevision: '2026-09-02 02:20 AM'
  },
  {
    id: 'TOW-TAC-01',
    nombre: 'Torre San Cristóbal (Táchira)',
    ubicacion: 'Cerro El Torbes / Paramillo, Táchira',
    estado: 'Táchira',
    coordenadas: [7.7669, -72.2250],
    potenciaActual: 82.4,
    temperatura: 21.0,
    operatividadSenal: 84.1,
    fallaDetectada: false,
    transmisorTDA: 'OPERATIVO',
    enlaceMicroondas: 'ALERTA',
    plantaElectrica: 'OPERATIVO',
    poblacionBeneficiada: 980000,
    municipiosCubiertos: ['San Cristóbal', 'Cárdenas', 'Torbes', 'Guásimos', 'Bolívar'],
    ultimaRevision: '2026-09-02 05:15 AM'
  }
];

export const OPINION_MATRIX_ALERTS: OpinionMatrixAlert[] = [
  {
    id: 'ALT-2026-089',
    codigo: 'MON-001',
    titulo: 'Desinformación sobre Enjambre Sísmico en la Costa Central',
    tematica: 'DESINFORMACION_SISMO',
    origen: 'TikTok / Cadenas de WhatsApp',
    amenazaFraseViral: '"Mega terremoto inminente en la Falla de San Sebastián ocultado por autoridades"',
    fechaHora: '2026-09-01 22:45',
    nivelRiesgo: 'CRITICO',
    impactoEstimadoVistas: 420000,
    estado: 'EN_ANALISIS',
    accionesContrarrestacion: 'Despliegue de micros explicativos con FUNVISIS y vocería técnica en VTV y RNV',
    voceriaAsignada: 'Presidente de FUNVISIS / Viceministro de Gestión de Riesgo',
    narrativaOficialSugerida: 'Explicación del monitoreo sismológico en tiempo real: los sismos no se pueden predecir; llamado a la calma y a seguir canales oficiales @Funvisis y MPPCI.'
  },
  {
    id: 'ALT-2026-090',
    codigo: 'MON-001',
    titulo: 'Rumores sobre Supuesto Corte General de Servicio Eléctrico Nacional',
    tematica: 'DESINFORMACION_SERVICIOS',
    origen: 'X (Twitter) / Grupos de Telegram',
    amenazaFraseViral: '"Apagón nacional programado de 72 horas a partir de medianoche"',
    fechaHora: '2026-09-02 03:15',
    nivelRiesgo: 'ALTO',
    impactoEstimadoVistas: 180000,
    estado: 'CONTRARRESTADA',
    accionesContrarrestacion: 'Boletín de CORPOELEC difundido por AVN, VTV y Sistema RNV desmintiendo la información',
    voceriaAsignada: 'Ministro de Energía Eléctrica / Sala Situacional MPPCI',
    narrativaOficialSugerida: 'El Sistema Eléctrico Nacional opera con total normalidad bajo supervisión técnica contínua. Rechazo rotundo a campañas de zozobra.'
  },
  {
    id: 'ALT-2026-091',
    codigo: 'MON-001',
    titulo: 'Fake News sobre Contaminación en Red de Distribución de Agua en Carabobo',
    tematica: 'FAKE_NEWS_SALUD',
    origen: 'Instagram / WhatsApp',
    amenazaFraseViral: '"Alerta biológica por agua no tratada en el embalse Pao-Cachinche"',
    fechaHora: '2026-09-01 18:20',
    nivelRiesgo: 'MEDIO',
    impactoEstimadoVistas: 95000,
    estado: 'NEUTRALIZADA',
    accionesContrarrestacion: 'Transmisión de pases en vivo desde plantas potabilizadoras en Hidrocentro por TeleAragua y VTV',
    voceriaAsignada: 'Autoridad Única de Aguas Carabobo',
    narrativaOficialSugerida: 'Parámetros físico-químicos y bacteriológicos certificados al 100% de potabilidad según normas sanitarias del Ministerio de Salud.'
  },
  {
    id: 'ALT-2026-092',
    codigo: 'MON-001',
    titulo: 'Desinformación sobre Restricción de Telecomunicaciones y Bloqueo de Redes',
    tematica: 'INSTITUCIONAL',
    origen: 'X (Twitter) / Portales Digitales',
    amenazaFraseViral: '"CONATEL emitirá providencia administrativa para restringir ancho de banda"',
    fechaHora: '2026-08-31 14:00',
    nivelRiesgo: 'MEDIO',
    impactoEstimadoVistas: 110000,
    estado: 'CONTRARRESTADA',
    accionesContrarrestacion: 'Aclaratoria oficial de CONATEL ratificando garantía de conectividad y despliegue de fibra óptica',
    voceriaAsignada: 'Dirección General de CONATEL',
    narrativaOficialSugerida: 'Venezuela avanza en el plan nacional de soberanía de telecomunicaciones y expansión de 5G y fibra óptica en los 335 municipios.'
  }
];

export const TALENT_VULNERABILITY_DATA: TalentVulnerabilityRow[] = [
  { ente: 'TEVES', totalPersonal: 420, nivelRojo: 22, nivelAmarillo: 65, nivelVerde: 310, porEvaluar: 15, sinClasificar: 8, iviCalculado: 0.312 },
  { ente: 'Ávila TV', totalPersonal: 195, nivelRojo: 12, nivelAmarillo: 38, nivelVerde: 135, porEvaluar: 6, sinClasificar: 4, iviCalculado: 0.379 },
  { ente: 'SAINGO', totalPersonal: 180, nivelRojo: 8, nivelAmarillo: 28, nivelVerde: 138, porEvaluar: 4, sinClasificar: 2, iviCalculado: 0.289 },
  { ente: 'Radio del Sur', totalPersonal: 160, nivelRojo: 9, nivelAmarillo: 31, nivelVerde: 112, porEvaluar: 5, sinClasificar: 3, iviCalculado: 0.363 },
  { ente: 'Correo del Orinoco', totalPersonal: 140, nivelRojo: 6, nivelAmarillo: 24, nivelVerde: 104, porEvaluar: 4, sinClasificar: 2, iviCalculado: 0.300 },
  { ente: 'VTV', totalPersonal: 850, nivelRojo: 35, nivelAmarillo: 110, nivelVerde: 660, porEvaluar: 30, sinClasificar: 15, iviCalculado: 0.253 },
  { ente: 'RNV', totalPersonal: 380, nivelRojo: 18, nivelAmarillo: 58, nivelVerde: 284, porEvaluar: 12, sinClasificar: 8, iviCalculado: 0.295 },
  { ente: 'YVKE Mundial', totalPersonal: 290, nivelRojo: 14, nivelAmarillo: 42, nivelVerde: 218, porEvaluar: 10, sinClasificar: 6, iviCalculado: 0.290 },
  { ente: 'REDTV', totalPersonal: 490, nivelRojo: 28, nivelAmarillo: 75, nivelVerde: 360, porEvaluar: 18, sinClasificar: 9, iviCalculado: 0.324 },
  { ente: 'CONATEL', totalPersonal: 620, nivelRojo: 20, nivelAmarillo: 85, nivelVerde: 495, porEvaluar: 12, sinClasificar: 8, iviCalculado: 0.234 },
  { ente: 'MIPCCI Central', totalPersonal: 510, nivelRojo: 19, nivelAmarillo: 72, nivelVerde: 395, porEvaluar: 16, sinClasificar: 8, iviCalculado: 0.253 }
];

export const MUNICIPALITIES_DATA: MunicipalityData[] = [
  // Distrito Capital (1)
  { codigoINE: '0101', nombre: 'Libertador', estado: 'Distrito Capital', region: 'Capital', poblacion: 2100000, hogares: 540000, coberturaEfectivaRadioTV: 98.5, penetracionInternet: 88.2, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 18, torreTransmisionCercana: 'Estación Mecedores', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  
  // Miranda (selected key municipalities)
  { codigoINE: '1501', nombre: 'Sucre (Petare)', estado: 'Miranda', region: 'Capital', poblacion: 720000, hogares: 175000, coberturaEfectivaRadioTV: 95.2, penetracionInternet: 81.0, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 8, torreTransmisionCercana: 'Estación Mecedores', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '1502', nombre: 'Baruta', estado: 'Miranda', region: 'Capital', poblacion: 340000, hogares: 92000, coberturaEfectivaRadioTV: 97.8, penetracionInternet: 92.4, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 3, torreTransmisionCercana: 'Estación Mecedores', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '1503', nombre: 'Guaicaipuro (Los Teques)', estado: 'Miranda', region: 'Capital', poblacion: 310000, hogares: 78000, coberturaEfectivaRadioTV: 91.0, penetracionInternet: 74.5, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 6, torreTransmisionCercana: 'Estación Mecedores', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '1504', nombre: 'Plaza (Guarenas)', estado: 'Miranda', region: 'Capital', poblacion: 240000, hogares: 59000, coberturaEfectivaRadioTV: 89.4, penetracionInternet: 73.1, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 4, torreTransmisionCercana: 'Estación Mecedores', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '1505', nombre: 'Zamora (Guatire)', estado: 'Miranda', region: 'Capital', poblacion: 215000, hogares: 52000, coberturaEfectivaRadioTV: 88.0, penetracionInternet: 71.8, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 3, torreTransmisionCercana: 'Estación Mecedores', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },

  // Zulia
  { codigoINE: '2101', nombre: 'Maracaibo', estado: 'Zulia', region: 'Occidental', poblacion: 1650000, hogares: 390000, coberturaEfectivaRadioTV: 94.6, penetracionInternet: 79.4, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 12, torreTransmisionCercana: 'Torre Maracaibo', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '2102', nombre: 'San Francisco', estado: 'Zulia', region: 'Occidental', poblacion: 510000, hogares: 120000, coberturaEfectivaRadioTV: 93.0, penetracionInternet: 76.2, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 5, torreTransmisionCercana: 'Torre Maracaibo', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '2103', nombre: 'Cabimas', estado: 'Zulia', region: 'Occidental', poblacion: 320000, hogares: 78000, coberturaEfectivaRadioTV: 88.2, penetracionInternet: 68.5, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 4, torreTransmisionCercana: 'Torre Maracaibo', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '2104', nombre: 'Guajira (Sinamaica)', estado: 'Zulia', region: 'Occidental', poblacion: 85000, hogares: 16000, coberturaEfectivaRadioTV: 68.0, penetracionInternet: 41.2, estatusSenal: 'VULNERABLE', mediosComunitariosActivos: 2, torreTransmisionCercana: 'Torre Maracaibo', tdaDisponible: false, bandaKuDisponible: true, alertasActivas: 1 },
  { codigoINE: '2105', nombre: 'Machiques de Perijá', estado: 'Zulia', region: 'Occidental', poblacion: 145000, hogares: 31000, coberturaEfectivaRadioTV: 72.4, penetracionInternet: 49.0, estatusSenal: 'VULNERABLE', mediosComunitariosActivos: 3, torreTransmisionCercana: 'Torre Maracaibo', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },

  // Carabobo
  { codigoINE: '0701', nombre: 'Valencia', estado: 'Carabobo', region: 'Central', poblacion: 920000, hogares: 230000, coberturaEfectivaRadioTV: 92.4, penetracionInternet: 82.5, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 9, torreTransmisionCercana: 'Torre Valencia', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '0702', nombre: 'Puerto Cabello', estado: 'Carabobo', region: 'Central', poblacion: 230000, hogares: 56000, coberturaEfectivaRadioTV: 76.5, penetracionInternet: 66.8, estatusSenal: 'VULNERABLE', mediosComunitariosActivos: 4, torreTransmisionCercana: 'Torre Puerto Cabello', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 1 },
  { codigoINE: '0703', nombre: 'Guacara', estado: 'Carabobo', region: 'Central', poblacion: 210000, hogares: 49000, coberturaEfectivaRadioTV: 89.1, penetracionInternet: 73.4, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 3, torreTransmisionCercana: 'Torre Valencia', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '0704', nombre: 'Naguanagua', estado: 'Carabobo', region: 'Central', poblacion: 185000, hogares: 47000, coberturaEfectivaRadioTV: 94.0, penetracionInternet: 86.0, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 2, torreTransmisionCercana: 'Torre Valencia', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },

  // Lara
  { codigoINE: '1301', nombre: 'Iribarren (Barquisimeto)', estado: 'Lara', region: 'Centroccidental', poblacion: 1150000, hogares: 280000, coberturaEfectivaRadioTV: 96.3, penetracionInternet: 80.2, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 11, torreTransmisionCercana: 'Torre Barquisimeto', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '1302', nombre: 'Palavecino (Cabudare)', estado: 'Lara', region: 'Centroccidental', poblacion: 210000, hogares: 54000, coberturaEfectivaRadioTV: 95.0, penetracionInternet: 84.1, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 3, torreTransmisionCercana: 'Torre Barquisimeto', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '1303', nombre: 'Torres (Carora)', estado: 'Lara', region: 'Centroccidental', poblacion: 215000, hogares: 48000, coberturaEfectivaRadioTV: 81.2, penetracionInternet: 58.7, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 5, torreTransmisionCercana: 'Torre Barquisimeto', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },

  // Táchira
  { codigoINE: '2001', nombre: 'San Cristóbal', estado: 'Táchira', region: 'Andina', poblacion: 320000, hogares: 82000, coberturaEfectivaRadioTV: 84.1, penetracionInternet: 75.0, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 6, torreTransmisionCercana: 'Torre San Cristóbal', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '2002', nombre: 'Bolívar (San Antonio)', estado: 'Táchira', region: 'Andina', poblacion: 78000, hogares: 19000, coberturaEfectivaRadioTV: 79.0, penetracionInternet: 68.0, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 2, torreTransmisionCercana: 'Torre San Cristóbal', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '2003', nombre: 'Uribante (Pregonero)', estado: 'Táchira', region: 'Andina', poblacion: 24000, hogares: 5200, coberturaEfectivaRadioTV: 61.5, penetracionInternet: 39.4, estatusSenal: 'CRITICO', mediosComunitariosActivos: 1, torreTransmisionCercana: 'Torre San Cristóbal', tdaDisponible: false, bandaKuDisponible: true, alertasActivas: 1 },

  // Monagas
  { codigoINE: '1601', nombre: 'Maturín', estado: 'Monagas', region: 'Nororiental', poblacion: 580000, hogares: 140000, coberturaEfectivaRadioTV: 93.8, penetracionInternet: 72.6, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 7, torreTransmisionCercana: 'Torre Maturín', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '1602', nombre: 'Caripe', estado: 'Monagas', region: 'Nororiental', poblacion: 42000, hogares: 9800, coberturaEfectivaRadioTV: 74.0, penetracionInternet: 48.2, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 2, torreTransmisionCercana: 'Torre Maturín', tdaDisponible: false, bandaKuDisponible: true, alertasActivas: 0 },

  // Anzoátegui
  { codigoINE: '0201', nombre: 'Simón Bolívar (Barcelona)', estado: 'Anzoátegui', region: 'Nororiental', poblacion: 490000, hogares: 120000, coberturaEfectivaRadioTV: 91.5, penetracionInternet: 77.0, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 6, torreTransmisionCercana: 'Torre Maturín / Pto La Cruz', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '0202', nombre: 'Sotillo (Puerto La Cruz)', estado: 'Anzoátegui', region: 'Nororiental', poblacion: 310000, hogares: 78000, coberturaEfectivaRadioTV: 94.0, penetracionInternet: 81.2, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 4, torreTransmisionCercana: 'Pto La Cruz', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },

  // Bolívar
  { codigoINE: '0601', nombre: 'Angostura del Orinoco (Cd Bolívar)', estado: 'Bolívar', region: 'Guayana', poblacion: 440000, hogares: 105000, coberturaEfectivaRadioTV: 86.4, penetracionInternet: 67.2, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 5, torreTransmisionCercana: 'Torre Ciudad Bolívar', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '0602', nombre: 'Caroní (Ciudad Guayana)', estado: 'Bolívar', region: 'Guayana', poblacion: 920000, hogares: 220000, coberturaEfectivaRadioTV: 91.8, penetracionInternet: 79.5, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 8, torreTransmisionCercana: 'Torre San Félix', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '0603', nombre: 'Gran Sabana (Santa Elena)', estado: 'Bolívar', region: 'Guayana', poblacion: 45000, hogares: 9400, coberturaEfectivaRadioTV: 58.0, penetracionInternet: 34.0, estatusSenal: 'CRITICO', mediosComunitariosActivos: 1, torreTransmisionCercana: 'Telepuerto Ku Satelital', tdaDisponible: false, bandaKuDisponible: true, alertasActivas: 1 },

  // Falcón
  { codigoINE: '1101', nombre: 'Miranda (Coro)', estado: 'Falcón', region: 'Occidental', poblacion: 250000, hogares: 61000, coberturaEfectivaRadioTV: 88.6, penetracionInternet: 71.0, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 4, torreTransmisionCercana: 'Torre Coro', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '1102', nombre: 'Carirubana (Punto Fijo)', estado: 'Falcón', region: 'Occidental', poblacion: 320000, hogares: 79000, coberturaEfectivaRadioTV: 90.1, penetracionInternet: 75.4, estatusSenal: 'ESTABLE', mediosComunitariosActivos: 5, torreTransmisionCercana: 'Torre Punto Fijo', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },

  // Nueva Esparta
  { codigoINE: '1701', nombre: 'Mariño (Porlamar)', estado: 'Nueva Esparta', region: 'Insular', poblacion: 135000, hogares: 36000, coberturaEfectivaRadioTV: 92.0, penetracionInternet: 83.5, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 3, torreTransmisionCercana: 'Torre San Juan', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 },
  { codigoINE: '1702', nombre: 'Maneiro (Pampatar)', estado: 'Nueva Esparta', region: 'Insular', poblacion: 62000, hogares: 18000, coberturaEfectivaRadioTV: 95.0, penetracionInternet: 89.0, estatusSenal: 'OPTIMO', mediosComunitariosActivos: 1, torreTransmisionCercana: 'Torre San Juan', tdaDisponible: true, bandaKuDisponible: true, alertasActivas: 0 }
];

export const INITIAL_REPORT_DATA: FullWeeklyReport = (() => {
  const control = {
    fechaReporte: '2026-09-11',
    semanaEpidemiologica: 36,
    responsableEnte: 'Lic. Gabriel Morales / Sala Operativa VTV',
    cedulaIdentidad: 'V-14829301',
    enteAdscrito: 'VTV',
    regionLocalidad: 'Caracas, Venezuela - Distrito Capital',
    telefono: '0212-2345678',
    correo: 'operaciones@vtv.gob.ve',
    periodoDesde: '2026-09-06',
    periodoHasta: '2026-09-12'
  };

  const mediosData = {
    // Impresos
    ejemplaresImpresos: 45000,
    tirajeTotal: 50000,
    ejemplaresZonasAfectadas: 8500,
    coberturaMunicipiosImpresos: 210,
    suplementosEspeciales: 4,
    notasPrensaImpresas: 120,
    articulosOpinion: 35,
    entrevistasImpresas: 28,
    contenidoSismoImpreso: 14,
    puntosDistribucionActivos: 340,
    rutasAfectadas: 2,
    personalDistribucion: 85,
    unidadesTransporteTotal: 25,
    unidadesTransporteOperativas: 22,

    // Radios
    horasTransmisionRadio: 168,
    operatividadSenalRadio: 96.5,
    coberturaMunicipiosRadio: 285,
    audienciaRatingRadio: 8.4,
    senalZonasAfectadasRadio: 92.0,
    programasEnVivoRadio: 45,
    horasProgramacionPropiaRadio: 110,
    boletinesRadio: 140,
    microprogramasContingenciaRadio: 30,
    transmisoresRadioTotal: 48,
    transmisoresRadioOperativos: 44,
    potenciaTransmisionRadio: 94.0,
    plantasEmergenciaRadioTotal: 30,
    plantasEmergenciaRadioOperativas: 28,
    tiempoCaidaRadioMin: 45,

    // Televisión
    horasTransmisionTV: 168,
    operatividadSenalTV: 98.2,
    coberturaNacionalTV: 94.0,
    senalTDAOperativaTV: 92.5,
    canalesSatelitalesActivosTV: 14,
    programasProducidosTV: 38,
    horasProgramacionPropiaTV: 112,
    pasesEnVivoCampoTV: 64,
    coberturasEspecialesTV: 18,
    unidadesMovilesTotal: 12,
    unidadesMovilesOperativas: 10,
    camarasProduccionTotal: 45,
    camarasProduccionOperativas: 40,
    equiposEdicionTotal: 28,
    equiposEdicionOperativos: 26,
    plantasEmergenciaTVTotal: 14,
    plantasEmergenciaTVOperativas: 13,
    personalTecnicoTV: 145,
    personalCampoTV: 68,

    // Medios Digitales (Cifras Reales Viceministerio de Planificación y Estrategia Comunicacional)
    visitasPortalWeb: 20884,
    usuariosUnicosWeb: 8715,
    paginasVistasWeb: 48920,
    tiempoPromedioSesionMin: 2.45,
    tasaReboteWeb: 40.17,
    contenidosPublicadosWeb: 248,
    multimediaPublicadoWeb: 32,
    boletinesSuscritosWeb: 85000,
    usuariosRegistradosWeb: 340000,
    notificacionesPushWeb: 45,
    nuevosSuscriptoresSemanaWeb: 1420,
    tramitesDigitalesTotal: 15,
    tramitesDigitalesDisponibles: 14,
    solicitudesSIVERIF: 180,
    registrosPNI: 65,
    tasaRespuestaSolicitudes: 94.2,

    // Redes Sociales (Cifras Reales Declaradas Viceministerio de Planificación y Estrategia)
    metaVistasDigital: 5430000,
    vistasLogradasDigital: 5201197,
    interaccionesTotalesDigital: 182917,
    impresionesNetasDigital: 5201197,
    alcanceOrganicoDigital: 539400,
    alcancePagadoDigital: 4661797,
    seguidoresTotalesDigital: 1280445,
    nuevosSeguidoresDigital: 5234,
    contenidoTotalPublicadoRedes: 32,
    formatoVideoReelsTikTok: 28,
    formatoEstaticoFlyers: 4,
    radialDigitalizadoRedes: 6,
    pasesEnVivoRedes: 8,
    creadoresActivosRedes: 24,
    vistasRedesAliadas: 1840000,
    articulacionMediosPrivados: 18,
    hashtagsMonitorizados: 15
  };

  const plataformasData = {
    operatividadNacionalTDA: 93.4,
    metaTDA: 95.0,
    serviciosTVActivosTDA: 22,
    serviciosTVTotalTDA: 24,
    serviciosRadioActivosTDA: 16,
    serviciosRadioTotalTDA: 18,
    estacionesTDAOperativas: 28,
    estacionesTDATotal: 30,
    coberturaGeograficaTDA: 82.5,
    
    potenciaBandaKu: 96.0,
    canalesSatelitalesReactivados: 18,
    canalesSatelitalesTotal: 22,
    canalesSatelitalesOperativos: 20,
    disponibilidadEnlaceSatelital: 99.2,
    tiempoCaidaSatelitalMin: 15,

    transmisoresTVTotal: 85,
    transmisoresTVOperativos: 79,
    transmisoresRadioTotal: 120,
    transmisoresRadioOperativos: 112,
    enlacesMicroondasTotal: 65,
    enlacesMicroondasOperativos: 62,
    plantasRespaldoTotal: 48,
    plantasRespaldoOperativas: 45,
    capacidadTransmisionDisponible: 94.8,

    reportesPrimerasPlanasRegulatorias: 35,
    concesionesOtorgadas: 12,
    habilitacionesProcesadas: 28,
    homologacionesEquipos: 44,
    inspeccionesTecnicas: 62,
    multasSancionesAplicadas: 4,
    estacionesMonitoreoEspectroTotal: 18,
    estacionesMonitoreoEspectroOperativas: 17,
    espectroRadioelectricoMonitoreado: 91.5,
    interferenciasDetectadas: 6,
    operadoresIrregulares: 3,
    mediosMonitoreadosCuotasResorte: 140,
    cumplimientoContenidoNacionalResorte: 94.0,
    cumplimientoContenidoEducativoResorte: 88.5,
    cumplimientoFranjaInfantilResorte: 92.0,
    caidasServicioReportadas: 5,
    ciberataquesDetectados: 2,
    resolucionIncidentesPorcentaje: 92.0
  };

  const strategicData = {
    comunicadosOficialesEmitidos: 48,
    piezasTelefoniaMovilCanalesPresidencia: 125,
    tendenciasViralesDesestabilizadoras: 8,

    traficoOrganicoTotal: 3400000,
    impresionesBuscadores: 15000000,
    clicsBuscadores: 2100000,
    ctrOrganico: 14.0,
    tasaConversionSuscriptores: 4.8,

    trabajadoresSNMPCapacitados: 320,
    pniFormadosMarcoEtico: 180,
    totalNominaSNMP: 4800,
    mediosComunitariosMACGeorreferenciados: 245,
    solicitudesComunalesInfraestructura: 42,
    vocerosComunitariosCapacitados3_0: 890,

    hogaresInternetActivoTHAI: 4950000,
    universoHogaresNacional: 7200000,
    lineasBandaAnchaMovilTPBAM: 21500000,
    poblacionTotalEstimada: 28500000,
    usuariosActivosMensualesDigitalIPMD: 18200000,
    poblacionAccesoInternet: 22000000
  };

  const vulnerabilityRows = TALENT_VULNERABILITY_DATA;
  const kpisCalculados = calculateMasterKPIs(mediosData, plataformasData, strategicData, vulnerabilityRows);
  const validaciones = runThreeLevelValidation(control, mediosData, plataformasData, strategicData, vulnerabilityRows);
  const hashIntegridad = generateIntegrityHash('MPPCI-REP-2026-W35-VTV', '2026-09-01T09:30:00Z', kpisCalculados);

  return {
    id: 'MPPCI-REP-2026-W35-VTV',
    codigoReporte: 'MPPCI-REP-2026-W35-VTV',
    control,
    status: 'APROBADO',
    raci: {
      capturador: {
        nombre: 'Lic. Gabriel Morales',
        cedula: 'V-14829301',
        cargo: 'Director General de Operaciones VTV',
        fecha: '2026-09-01 08:45 AM'
      },
      viceministroRevisor: {
        nombre: 'Viceministerio de Comunicación e Información',
        cargo: 'Viceministro de Comunicación e Información',
        aprobado: true,
        fecha: '2026-09-01 10:15 AM',
        notas: 'Reporte validado y consistente con telemetría nacional REDTV y matrices de opinión.'
      },
      maximaAutoridadEnterada: {
        nombre: 'Despacho del Ministro MPPCI',
        visto: true,
        fecha: '2026-09-01 11:30 AM'
      }
    },
    mediosData,
    eje2Data: INITIAL_EJE2_DATA,
    eje3Data: INITIAL_EJE3_DATA,
    eje4Data: INITIAL_EJE4_DATA,
    plataformasData,
    strategicData,
    vulnerabilityRows,
    opinionAlerts: OPINION_MATRIX_ALERTS,
    kpisCalculados,
    validaciones,
    esCargaTardia: false,
    hashIntegridad,
    fechaCreacion: '2026-09-01T08:45:00Z',
    fechaUltimaModificacion: '2026-09-01T10:15:00Z'
  };
})();

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-09-01 08:45:12',
    usuario: 'Lic. Gabriel Morales',
    cedula: 'V-14829301',
    rol: 'DIRECTOR_OPERACIONES',
    ente: 'VTV',
    accion: 'CREAR_REPORTE',
    indicadorCodigo: 'GENERAL',
    descripcion: 'Captura y guardado de Instrumento Semanal - Semana Epidemiológica N° 36',
    hashTrazabilidad: 'MPPCI-AUTH-7E4A8B9C-K9L2',
    ip: '190.202.44.12'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-09-11 08:46:05',
    usuario: 'Sistema Validador MPPCI',
    cedula: 'SYSTEM-DAEMON',
    rol: 'AUDITOR_CONTRALOR',
    ente: 'VTV',
    accion: 'EJECUTAR_VALIDACION',
    indicadorCodigo: 'VAL-ALL',
    descripcion: 'Ejecución exitosa de validación en 3 niveles de rigor (Integridad, Lógica y Cruzada)',
    hashTrazabilidad: 'MPPCI-AUTH-8B12FD33-M10B',
    ip: '127.0.0.1'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-09-11 10:15:20',
    usuario: 'Viceministro de Comunicación e Información',
    cedula: 'V-11849201',
    rol: 'VICEMINISTRO',
    ente: 'MIPCCI Central',
    accion: 'APROBAR_REPORTE',
    indicadorCodigo: 'MPPCI-REP-2026-W36-VTV',
    descripcion: 'Aprobación formal de reporte semanal con firma electrónica institucional (Semana 36)',
    hashTrazabilidad: 'MPPCI-AUTH-90DF44AA-Z88P',
    ip: '190.202.10.88'
  },
  {
    id: 'AUD-004',
    timestamp: '2026-09-01 22:48:30',
    usuario: 'Sala Situacional de Monitoreo',
    cedula: 'V-17890123',
    rol: 'DIRECTOR_OPERACIONES',
    ente: 'AVN',
    accion: 'EMITIR_ALERTA',
    indicadorCodigo: 'MON-001',
    descripcion: 'Registro de matriz de desinformación ALT-2026-089 (Falsa alarma sísmica)',
    hashTrazabilidad: 'MPPCI-AUTH-32BC88EE-Q44R',
    ip: '190.202.14.33'
  },
  {
    id: 'AUD-005',
    timestamp: '2026-09-02 06:10:00',
    usuario: 'Sensor Telemetría REDTV',
    cedula: 'IOT-TELEMETRY',
    rol: 'AUDITOR_CONTRALOR',
    ente: 'REDTV',
    accion: 'DESPACHAR_NOTIFICACION',
    indicadorCodigo: 'RTV-006',
    descripcion: 'Despacho de alerta por fluctuación en Torre Puerto Cabello a Dirección Técnica',
    hashTrazabilidad: 'MPPCI-AUTH-44FE11CC-U91T',
    ip: '10.10.0.4'
  }
];

export const INITIAL_NOTIFICATIONS: AutoNotification[] = [
  {
    id: 'NOTIF-2026-001',
    timestamp: '2026-09-11 10:05:00',
    fechaEmision: '2026-09-11 10:05:00',
    tipo: 'RETRASO_CARGA_LUNES',
    severidad: 'MEDIA',
    destinatarioEnte: 'TVES',
    destinatarioResponsable: 'Lic. Winston Vallenilla',
    correo: 'gerencia.operaciones@tves.gob.ve',
    telegram: '@tves_operaciones',
    asunto: '⚠️ AVISO: Vencimiento de Límite de Carga Semanal - Lunes 10:00 AM',
    mensaje: 'Se le recuerda que el corte de domingo a sábado debe registrarse los lunes a las 10:00 AM. TVES mantiene estatus pendiente para la Semana Epidemiológica N° 36.',
    estadoEnvio: 'ENVIADO',
    canal: 'AMBOS',
    canales: ['TELEGRAM', 'EMAIL'],
    leido: true
  },
  {
    id: 'NOTIF-2026-002',
    timestamp: '2026-09-11 22:50:00',
    fechaEmision: '2026-09-11 22:50:00',
    tipo: 'ALERTA_CRISIS_MATRIZ',
    severidad: 'CRITICA',
    destinatarioEnte: 'MIPCCI Central',
    destinatarioResponsable: 'Sala Estratégica Viceministerio',
    correo: 'vpscc.informacion.indicadores@gmail.com',
    telegram: '@mppci_sala_estrategica',
    asunto: '🚨 ALERTA CRÍTICA: Matriz de Desinformación Sísmica detectada en Redes (420k vistas)',
    mensaje: 'Se activó alerta temprana MON-001 con nivel de riesgo CRÍTICO. Se requiere contranarrativa inmediata con vocería de FUNVISIS.',
    estadoEnvio: 'ENVIADO',
    canal: 'AMBOS',
    canales: ['TELEGRAM', 'EMAIL'],
    leido: false
  },
  {
    id: 'NOTIF-2026-003',
    timestamp: '2026-09-11 06:12:00',
    fechaEmision: '2026-09-11 06:12:00',
    tipo: 'FALLA_INFRAESTRUCTURA_REDTV',
    severidad: 'ALTA',
    destinatarioEnte: 'REDTV',
    destinatarioResponsable: 'Ing. Carlos Mendoza',
    correo: 'operaciones@redtv.gob.ve',
    telegram: '@redtv_tecnica_alerta',
    asunto: '⚡ ALERTA TÉCNICA: Torre Puerto Cabello operando con Planta de Emergencia',
    mensaje: 'La Torre Puerto Cabello reportó caída de potencia al 74.2% y switch a planta eléctrica auxiliar. Estaciones de Morón y Puerto Cabello en monitoreo reforzado.',
    estadoEnvio: 'ENVIADO',
    canal: 'TELEGRAM',
    canales: ['TELEGRAM'],
    leido: false
  }
];

export const INTERNATIONAL_STANDARDS_MAPPING = [
  {
    marco: 'MDIs (Media Development Indicators)',
    organismo: 'UNESCO',
    aplicacion: 'Evaluación integral del ecosistema mediático, pluralidad, formación y libertad de expresión',
    indicadoresRelacionados: 'IMP-001 a 017, RAD-001 a 018, TV-001 a 019, Formación SNMP',
    alineacionMPPCI: 'Garantía de medios comunitarios (MAC), producción nacional independiente (PNI) y diversidad de lenguajes.'
  },
  {
    marco: 'IDI (ICT Development Index)',
    organismo: 'UIT (Unión Internacional de Telecomunicaciones)',
    aplicacion: 'Conectividad universal, acceso a banda ancha, infraestructura satelital y penetración digital',
    indicadoresRelacionados: 'THAI (Hogares), TPBAM (Banda Ancha), IPMD (Medios Digitales), RTV-006 (Banda Ku)',
    alineacionMPPCI: 'Monitoreo de penetración en los 335 municipios y soberanía satelital.'
  },
  {
    marco: 'ROAM-X Principles',
    organismo: 'UNESCO',
    aplicacion: 'Universalidad de Internet: Derechos, Apertura, Accesibilidad y Participación Multiactor',
    indicadoresRelacionados: 'WEB-001 a 018, RED-001 a 016, Formación 3.0 Popular',
    alineacionMPPCI: 'Acceso igualitario a contenidos digitales públicos y soberanía de datos.'
  },
  {
    marco: 'Marco de Sendai 2015-2030',
    organismo: 'UNDRR (Oficina de la ONU para la Reducción del Riesgo de Desastres)',
    aplicacion: 'Reducción del riesgo de desastres, sistemas de alerta temprana comunicacional y resiliencia de infraestructura',
    indicadoresRelacionados: 'MON-001 a 008, RTV-001 a 015, Torres Críticas, IRT (Resiliencia)',
    alineacionMPPCI: 'Monitoreo de matrices de desinformación en eventos sísmicos/climáticos y protección de telepuertos.'
  },
  {
    marco: 'Manual Esfera (Sphere Standards)',
    organismo: 'Sphere Project',
    aplicacion: 'Estándares humanitarios mínimos en campamentos transitorios y comunicación en emergencias',
    indicadoresRelacionados: 'CAM-001 a 006, Despliegue Audiovisual en Campamentos',
    alineacionMPPCI: 'Cobertura digna, comunicación comunitaria y apoyo psicosocial en situaciones de contingencia.'
  },
  {
    marco: 'Ley RESORTE (Responsabilidad Social)',
    organismo: 'CONATEL / MPPCI',
    aplicacion: 'Marco legal venezolano de franjas horarias, protección al menor, contenido educativo y fondo de responsabilidad',
    indicadoresRelacionados: 'CON-014 a 018, RED-010, TV-012',
    alineacionMPPCI: 'Cumplimiento estricto de cuotas de producción nacional, infantil y cultural.'
  },
  {
    marco: 'SMART Criteria',
    organismo: 'OECD',
    aplicacion: 'Criterios de calidad para indicadores: Específicos, Medibles, Alcanzables, Relevantes y Temporales',
    indicadoresRelacionados: 'Todos los códigos técnicos IMP, RAD, TV, WEB, RED, MON, CON, RTV, GES, CAM',
    alineacionMPPCI: 'Frecuencias semanales con corte estricto dom-sáb y validaciones cruzadas matemáticas.'
  }
];
