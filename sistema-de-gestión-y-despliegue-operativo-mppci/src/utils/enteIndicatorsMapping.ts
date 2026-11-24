import * as XLSX from 'xlsx';
import { SCIC_INDICATORS_DATA, ScicIndicator } from '../data/scicIndicators';
import { EnteInfo } from '../types';

/**
 * Mapeo oficial entre ID / Siglas del Ente y el nombre registrado en la Matriz SCIC de 267 Indicadores
 */
export const ENTE_ID_TO_SCIC_NAME: Record<string, string> = {
  // Televisión
  'VTV': 'C.A. Venezolana de Televisión (C.A.V.T.V)',
  'TELESUR_VEN': 'La Nueva Televisión del Sur Venezuela, C.A.',
  'TELESUR': 'La Nueva Televisión del Sur (TELESUR)',
  'TVES': 'Fundación Televisora Venezolana Social (TVES)',
  'AVILA_TV': 'Fundación Ávila TV',
  'VILLA_CINE': 'Fundación La Villa del Cine',
  'AMAZONIA_FILMS': 'Fundación Amazonia Films',
  'AVN': 'Agencia Venezolana de Noticias, C.A. (AVN, C.A)',

  // Radio
  'RNV': 'Radio Nacional de Venezuela, C.A. (RNV)',
  'YVKE': 'Radio Mundial, C.A. (YVKE)',
  'YVKE_ZULIA': 'Radio Zulia, C.A.',
  'YVKE_MARGARITA': 'Radio Margarita, C.A.',
  'YVKE_ANDES': 'Radio Los Andes, C.A.',
  'LRDS': 'La Radio del Sur, C.A. (LRDS)',
  'FRM': 'Fundación Radio Miraflores (FRM)',

  // Plataformas y Regulación
  'REDTV': 'Red Tv, C.A. (REDTV)',
  'CONATEL': 'CONATEL',

  // Despachos y Viceministerios Centrales
  'VM_GESTION_COM': 'Viceministerio de Gestión Comunicacional',
  'VM_PLANIF_ESTRAT': 'Viceministerio de Planificación y Estrategia Comunicacional',
  'VM_COM_INFO': 'Viceministerio de Comunicación e Información'
};

const STORAGE_KEY_PREFIX = 'SGDO_CUSTOM_CHECKLIST_ENTE_';

/**
 * Obtiene los indicadores oficiales asignados por defecto a un Ente Adscrito en la matriz SCIC
 */
export function getDefaultIndicatorsForEnte(enteIdOrName: string): ScicIndicator[] {
  if (!enteIdOrName) return [];

  const scicName = ENTE_ID_TO_SCIC_NAME[enteIdOrName];
  if (scicName) {
    return SCIC_INDICATORS_DATA.filter(i => i.ente === scicName);
  }

  // Búsqueda flexible por texto parcial
  const needle = enteIdOrName.toLowerCase().trim();
  const matched = SCIC_INDICATORS_DATA.filter(i => {
    const e = i.ente.toLowerCase();
    return e.includes(needle) || needle.includes(e);
  });

  if (matched.length > 0) return matched;

  // Fallback si es ente rector central (muestra los de viceministerios)
  if (enteIdOrName === 'MPPCI_CENTRAL' || enteIdOrName === 'VSCC') {
    return SCIC_INDICATORS_DATA.filter(i => i.eje.includes('4') || i.ente.includes('Viceministerio'));
  }

  return [];
}

/**
 * Obtiene los IDs de indicadores personalizados guardados en almacenamiento local para un Ente
 */
export function getCustomEnteIndicatorIds(enteId: string): string[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${enteId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error leyendo checklist personalizado de ente:', e);
  }
  return null;
}

/**
 * Guarda la lista de IDs de indicadores activos para un Ente
 */
export function saveEnteCustomIndicatorIds(enteId: string, indicatorIds: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${enteId}`, JSON.stringify(indicatorIds));
    window.dispatchEvent(new CustomEvent('sgdo-checklist-updated', { detail: { enteId, indicatorIds } }));
  } catch (e) {
    console.error('Error guardando checklist personalizado de ente:', e);
  }
}

/**
 * Restablece el checklist de un Ente a sus indicadores oficiales predeterminados
 */
export function resetEnteCustomIndicatorIds(enteId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${enteId}`);
    window.dispatchEvent(new CustomEvent('sgdo-checklist-updated', { detail: { enteId } }));
  } catch (e) {
    console.error('Error restableciendo checklist de ente:', e);
  }
}

/**
 * Conmuta (activa o desactiva) un indicador para un Ente determinado
 */
export function toggleEnteIndicator(enteId: string, indicatorId: string): string[] {
  const currentIndicators = getIndicatorsForEnte(enteId);
  const currentIds = currentIndicators.map(i => i.id);
  const exists = currentIds.includes(indicatorId);

  let newIds: string[];
  if (exists) {
    newIds = currentIds.filter(id => id !== indicatorId);
  } else {
    newIds = [...currentIds, indicatorId];
  }

  saveEnteCustomIndicatorIds(enteId, newIds);
  return newIds;
}

/**
 * Comprueba si un indicador específico está actualmente marcado/activo para un Ente
 */
export function isIndicatorMarkedForEnte(enteId: string, indicatorId: string): boolean {
  const currentIndicators = getIndicatorsForEnte(enteId);
  return currentIndicators.some(i => i.id === indicatorId);
}

/**
 * Obtiene los indicadores que NO están marcados para un Ente (disponibles para activar)
 */
export function getUnmarkedIndicatorsForEnte(enteId: string): ScicIndicator[] {
  const markedIndicators = getIndicatorsForEnte(enteId);
  const markedIds = new Set(markedIndicators.map(i => i.id));
  return SCIC_INDICATORS_DATA.filter(i => !markedIds.has(i.id));
}

/**
 * Obtiene los indicadores oficiales o activos asignados a un Ente Adscrito
 * Si existe un checklist personalizado para el Ente, lo utiliza; si no, recurre a los predeterminados.
 */
export function getIndicatorsForEnte(enteIdOrName: string): ScicIndicator[] {
  if (!enteIdOrName) return [];

  const customIds = getCustomEnteIndicatorIds(enteIdOrName);
  if (customIds !== null) {
    return SCIC_INDICATORS_DATA.filter(i => customIds.includes(i.id));
  }

  return getDefaultIndicatorsForEnte(enteIdOrName);
}

/**
 * Resumen de indicadores del Ente por frecuencia
 */
export interface EnteIndicatorsStats {
  total: number;
  semanales: number;
  diarias: number;
  mensuales: number;
  otras: number;
}

export function getEnteIndicatorsStats(enteIdOrName: string): EnteIndicatorsStats {
  const indicators = getIndicatorsForEnte(enteIdOrName);
  return {
    total: indicators.length,
    semanales: indicators.filter(i => i.frecuencia === 'Semanal').length,
    diarias: indicators.filter(i => i.frecuencia === 'Diaria').length,
    mensuales: indicators.filter(i => i.frecuencia === 'Mensual').length,
    otras: indicators.filter(i => !['Semanal', 'Diaria', 'Mensual'].includes(i.frecuencia)).length
  };
}

/**
 * Desglosa las variables primarias requeridas de un indicador a partir de su texto
 */
export interface IndicatorParsedVariable {
  key: string;
  label: string;
}

export function parseIndicatorVariables(indicator: ScicIndicator): IndicatorParsedVariable[] {
  const vars: IndicatorParsedVariable[] = [];
  const text = indicator.variables || '';

  // Detectar formato "KEY: Descripción. KEY2: Descripción2"
  const regex = /([A-Za-z0-9_]+)\s*:\s*([^.]+)(?:\.|$)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const key = match[1].trim();
    const label = match[2].trim();
    if (key && !vars.some(v => v.key === key)) {
      vars.push({ key, label });
    }
  }

  if (vars.length > 0) return vars;

  // Si no se detectaron con regex de dos puntos, extraer tokens de la fórmula
  const formulaWords = indicator.formula.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];
  formulaWords.forEach(w => {
    if (!['Math', 'min', 'max', 'round'].includes(w) && !vars.some(v => v.key === w)) {
      vars.push({ key: w, label: `Variable ${w}` });
    }
  });

  if (vars.length > 0) return vars;

  // Fallback estándar
  return [
    { key: 'V1', label: 'Valor Numerador / Reportado' },
    { key: 'V2', label: 'Meta o Total de Referencia' }
  ];
}

/**
 * Genera y descarga un archivo Excel (.xlsx) oficial parametrizado exclusivamente para un Ente
 */
export function downloadEnteExcelTemplate(
  ente: EnteInfo,
  indicators: ScicIndicator[],
  semana: number
) {
  const wb = XLSX.utils.book_new();

  // 1. Hoja de Indicadores Parametrizados
  const rowsIndicadores = indicators.map(ind => ({
    'Código Oficial': ind.codigo,
    'Nombre del Indicador': ind.nombre,
    'Frecuencia Exigida': ind.frecuencia,
    'Eje SCIC': ind.eje,
    'Dimensión': ind.dimension,
    'Fórmula Oficial': ind.formula,
    'Variables Requeridas': ind.variables,
    'Meta Semanal Planificada': '',
    'Valor Logrado / Capturado': '',
    'Unidad': (ind as any).unidad || 'Unidades',
    'Observaciones Técnicas': ''
  }));

  const wsIndicadores = XLSX.utils.json_to_sheet(rowsIndicadores);
  wsIndicadores['!cols'] = [
    { wch: 14 }, // Código
    { wch: 38 }, // Nombre
    { wch: 16 }, // Frecuencia
    { wch: 12 }, // Eje
    { wch: 22 }, // Dimensión
    { wch: 24 }, // Fórmula
    { wch: 45 }, // Variables
    { wch: 18 }, // Meta
    { wch: 20 }, // Logrado
    { wch: 12 }, // Unidad
    { wch: 40 }  // Observaciones
  ];

  XLSX.utils.book_append_sheet(wb, wsIndicadores, 'Indicadores_SCIC');

  // 2. Hoja de Variables de Control
  const rowsControl = [
    { 'Parámetro': 'Ente Adscrito', 'Valor': ente.nombre, 'Código Ente': ente.id },
    { 'Parámetro': 'Siglas Institucionales', 'Valor': ente.siglas, 'Código Ente': ente.id },
    { 'Parámetro': 'Semana Epidemiológica', 'Valor': semana, 'Código Ente': '' },
    { 'Parámetro': 'Responsable de Carga', 'Valor': ente.director, 'Código Ente': '' },
    { 'Parámetro': 'Cédula de Identidad', 'Valor': ente.cedula, 'Código Ente': '' },
    { 'Parámetro': 'Correo Electrónico', 'Valor': ente.email, 'Código Ente': '' },
    { 'Parámetro': 'Región / Sede', 'Valor': ente.region, 'Código Ente': '' },
    { 'Parámetro': 'Normativa Aplicable', 'Valor': 'SCIC • Vicepresidencia Sectorial de Comunicación y Cultura (VSCC)', 'Código Ente': '' },
    { 'Parámetro': 'Corte Semanal Obligatorio', 'Valor': 'Domingo a Sábado (Entrega Lunes 10:00 AM)', 'Código Ente': '' }
  ];

  const wsControl = XLSX.utils.json_to_sheet(rowsControl);
  wsControl['!cols'] = [
    { wch: 28 },
    { wch: 45 },
    { wch: 16 }
  ];

  XLSX.utils.book_append_sheet(wb, wsControl, 'Variables_Control');

  // 3. Descargar archivo
  const fileName = `PLANTILLA_SCIC_${ente.siglas.replace(/[^A-Za-z0-9_-]/g, '_')}_SEM${semana}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
