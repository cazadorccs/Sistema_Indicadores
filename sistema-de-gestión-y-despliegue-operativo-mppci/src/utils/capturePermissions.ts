import { UserAccount, IndicatorModule, EnteInfo } from '../types';

export type CaptureModuleKey = 'SCIC_ENTE' | 'CONTROL' | 'EJE_1' | 'EJE_2' | 'EJE_3' | 'EJE_4';

export interface CaptureModuleMeta {
  key: CaptureModuleKey;
  indicatorModule: IndicatorModule;
  titulo: string;
  nombreCorto: string;
  codigoOficial: string;
  descripcion: string;
  responsablesCarga: string;
  icono: string; // lucide icon identifier
  colorTema: string; // e.g. 'blue', 'emerald', 'indigo', 'rose', 'amber'
  badgeTexto: string;
}

export const CAPTURE_MODULES_CONFIG: CaptureModuleMeta[] = [
  {
    key: 'SCIC_ENTE',
    indicatorModule: 'CAPTURA',
    titulo: 'Planilla Parametrizada por Ente (SCIC)',
    nombreCorto: 'Planilla por Ente SCIC',
    codigoOficial: 'SCIC-267-ENTE',
    descripcion: 'Formulario semanal parametrizado exactamente con los 267 indicadores oficiales asignados a cada Ente Adscrito bajo rectoría VSCC.',
    responsablesCarga: 'Directores de Operaciones y Salas Técnicas de los 20 Entes Adscritos',
    icono: 'Building2',
    colorTema: 'emerald',
    badgeTexto: '267 Indicadores'
  },
  {
    key: 'CONTROL',
    indicatorModule: 'CAPTURA_CONTROL',
    titulo: 'Variables de Control',
    nombreCorto: 'Variables de Control',
    codigoOficial: 'VAR-CTRL',
    descripcion: 'Metadatos institucionales, corte epidemiológico, ente adscrito, responsable formal y período semanal.',
    responsablesCarga: 'Directores de Operaciones y Salas Operativas de cada Ente Adscrito',
    icono: 'Calendar',
    colorTema: 'blue',
    badgeTexto: 'Obligatorio'
  },
  {
    key: 'EJE_1',
    indicatorModule: 'CAPTURA_EJE_1',
    titulo: 'EJE 1: Medios de Comunicación (Instrumento)',
    nombreCorto: 'EJE 1: Medios (Instrumento)',
    codigoOficial: 'EJE1-MEDIOS',
    descripcion: 'Levantamiento estandarizado 1.A Impresos, 1.B Radios, 1.C Audiovisuales, 1.D Digitales, 1.E Redes Sociales y 1.F Anexo Compuestos.',
    responsablesCarga: 'Salas de Producción y Redacción de Medios de Comunicación del Estado (VTV, RNV, AVN, TVES, AVILA TV, TELESUR, YVKE, FRM, CORREO DEL ORINOCO, SAINGO, VILLA DEL CINE)',
    icono: 'Tv',
    colorTema: 'emerald',
    badgeTexto: '1.A a 1.F'
  },
  {
    key: 'EJE_2',
    indicatorModule: 'CAPTURA_EJE_2',
    titulo: 'Eje 2: Plataformas & Espectro',
    nombreCorto: 'Eje 2: Plataformas & Espectro',
    codigoOficial: 'EJE2-PLATAFORMAS',
    descripcion: 'Infraestructura de transmisión TDA/Satelital, potencia en banda Ku, estaciones operativas (REDTV) y fiscalización de espectro/concesiones (CONATEL).',
    responsablesCarga: 'Gerencia General Técnica de REDTV y Sala Situacional Regulatoria de CONATEL',
    icono: 'Radio',
    colorTema: 'indigo',
    badgeTexto: 'REDTV / CONATEL'
  },
  {
    key: 'EJE_3',
    indicatorModule: 'CAPTURA_EJE_3',
    titulo: 'Eje 3: Gestión de Comunicaciones',
    nombreCorto: 'Eje 3: Gestión de Comunicaciones',
    codigoOficial: 'EJE3-COMUNICACIONES',
    descripcion: '3.A Gestión de Narrativa y Monitoreo de Medios (MON-001..008, GES-001..018, Alianzas, Cooperación e IVI).',
    responsablesCarga: 'Dirección General de Inteligencia Comunicacional, Sala Situacional Ministerial y Enlaces de Talento Humano',
    icono: 'ShieldAlert',
    colorTema: 'purple',
    badgeTexto: '3.A Oficial'
  },
  {
    key: 'EJE_4',
    indicatorModule: 'CAPTURA_EJE_4',
    titulo: 'Eje 4: Gestión Estratégica',
    nombreCorto: 'Eje 4: Gestión Estratégica',
    codigoOficial: 'EJE4-ESTRATEGIA',
    descripcion: 'Despliegue comunicacional en los 335 municipios, posicionamiento SEO editorial de portales gubernamentales y soberanía tecnológica SNMP.',
    responsablesCarga: 'Dirección General de Planificación Estratégica MPPCI y Regulación Territorial CONATEL',
    icono: 'Globe',
    colorTema: 'amber',
    badgeTexto: '335 Municipios'
  }
];

// Medios tradicionales, impresos, audiovisuales y de cultura autorizados para cargar Eje 1
const MEDIA_ENTES = new Set([
  'VTV',
  'RNV',
  'AVN',
  'TVES',
  'AVILA_TV',
  'TELESUR',
  'TELESUR_VEN',
  'YVKE',
  'FRM',
  'CORREO_ORINOCO',
  'SAINGO',
  'VILLA_CINE',
  'MPPCI_CENTRAL',
  'VSCC'
]);

/**
 * Evaluates whether a given UserAccount is authorized to see and load data in a specific Capture Module
 */
export function isUserAuthorizedForCaptureModule(
  user: UserAccount | null | undefined,
  moduleKey: CaptureModuleKey
): boolean {
  if (!user) return false;

  // Global Administrative Leadership has full access to load/audit all modules
  if (
    user.rolSistema === 'SUPER_ADMIN' ||
    user.rolSistema === 'MINISTRO' ||
    user.rolSistema === 'VICEMINISTRO' ||
    user.rolSistema === 'DIRECTOR_GENERAL'
  ) {
    return true;
  }

  // Users with Read-Only profile cannot capture/load data directly
  if (user.nivelAcceso === 'LECTURA') {
    return false;
  }

  const userEnte = user.enteAdscrito;

  switch (moduleKey) {
    case 'SCIC_ENTE':
      // Todos los usuarios con permiso de captura tienen acceso a la planilla parametrizada de su Ente
      return true;

    case 'CONTROL':
      // Any user with permission to capture weekly reports needs to verify/fill their control variables
      return user.permisosModulos.includes('CAPTURA') || user.permisosModulos.includes('CAPTURA_CONTROL');

    case 'EJE_1':
      // Must be a media ente OR explicitly granted EJE_1_MEDIOS
      // Pure telecom operators like REDTV and CONATEL do not fill Eje 1 (Media content/newspapers/tv production)
      if (userEnte === 'REDTV' || userEnte === 'CONATEL') {
        return false;
      }
      return (
        MEDIA_ENTES.has(userEnte) &&
        (user.permisosModulos.includes('CAPTURA') || 
         user.permisosModulos.includes('EJE_1_MEDIOS') || 
         user.permisosModulos.includes('CAPTURA_EJE_1'))
      );

    case 'EJE_2':
      // ONLY technical platforms entes: REDTV, CONATEL or Central Directorate
      if (userEnte === 'REDTV' || userEnte === 'CONATEL' || userEnte === 'MPPCI_CENTRAL' || userEnte === 'VSCC') {
        return (
          user.permisosModulos.includes('CAPTURA') || 
          user.permisosModulos.includes('EJE_2_PLATAFORMAS') ||
          user.permisosModulos.includes('CAPTURA_EJE_2')
        );
      }
      return false;

    case 'EJE_3':
      // Intelligence & Vulnerability is handled by Central Ministry, Situation Room, or strategic entes with talent vulnerability reporting (SAINGO, VILLA_CINE, VTV)
      if (userEnte === 'REDTV' || userEnte === 'CONATEL' || userEnte === 'YVKE' || userEnte === 'FRM') {
        return false; // Telecoms or standard radio stations do not manage national opinion matrices or IVI
      }
      return (
        user.permisosModulos.includes('EJE_3_GESTION') ||
        user.permisosModulos.includes('CAPTURA_EJE_3') ||
        userEnte === 'MPPCI_CENTRAL' ||
        userEnte === 'VSCC' ||
        userEnte === 'SAINGO' ||
        userEnte === 'VILLA_CINE'
      );

    case 'EJE_4':
      // Strategic ministerial management & 335 Municipalities: Central MPPCI, VSCC and CONATEL (for telecommunications territorial deployment)
      if (userEnte === 'MPPCI_CENTRAL' || userEnte === 'VSCC' || userEnte === 'CONATEL') {
        return (
          user.permisosModulos.includes('EJE_4_MIPCCI') ||
          user.permisosModulos.includes('CAPTURA_EJE_4') ||
          user.permisosModulos.includes('CAPTURA')
        );
      }
      return false;

    default:
      return false;
  }
}

/**
 * Returns the list of Capture Modules authorized for the specified user
 */
export function getAuthorizedCaptureModules(
  user: UserAccount | null | undefined
): CaptureModuleMeta[] {
  if (!user) return [];
  return CAPTURE_MODULES_CONFIG.filter(mod => isUserAuthorizedForCaptureModule(user, mod.key));
}

/**
 * Returns the default initial capture module for the given user based on their entity and permissions
 */
export function getDefaultCaptureModuleForUser(
  user: UserAccount | null | undefined
): CaptureModuleKey {
  if (!user) return 'CONTROL';

  const authorized = getAuthorizedCaptureModules(user);
  if (authorized.length === 0) return 'CONTROL';

  // If user is from REDTV, default to EJE_2
  if (user.enteAdscrito === 'REDTV') {
    return 'EJE_2';
  }

  // If user is from CONATEL, default to EJE_2 or EJE_4
  if (user.enteAdscrito === 'CONATEL') {
    return 'EJE_2';
  }

  // If user is from a media entity, default to EJE_1
  if (MEDIA_ENTES.has(user.enteAdscrito) && user.enteAdscrito !== 'MPPCI_CENTRAL' && user.enteAdscrito !== 'VSCC') {
    return 'EJE_1';
  }

  // Default to first authorized or CONTROL
  return authorized[0].key;
}
