/**
 * Configuración General del Sistema (SGDO-VSCC)
 * Parámetros globales y banderas de funcionalidades (Feature Flags).
 */

export interface SystemConfiguration {
  institucion: {
    enteRector: string;
    siglas: string;
    sistema: string;
    version: string;
  };
  geoViewer: {
    /**
     * Habilitar o deshabilitar la visualización del Motor Vectorial SVG Puro (VenezuelaVectorHeatmap.tsx)
     * Cuando está en false, el componente y su código se mantienen 100% intactos en el proyecto,
     * pero su botón y renderizado quedan desactivados en el visor del mapa interactivo.
     */
    enableVectorHeatmap: boolean;
    /** Habilitar visualización en matriz tabular de los 335 municipios */
    enableGridMatrix: boolean;
    /** Proveedor de teselas cartográficas por defecto */
    defaultTileProvider: 'CARTO_VOYAGER' | 'OSM' | 'ESRI_STREET' | 'ESRI_SATELLITE';
    /** Opacidad inicial de las capas de polígonos (0.0 a 1.0) */
    defaultLayerOpacity: number;
  };
  seguridad: {
    exigir2FA: boolean;
    tiempoSesionMinutos: number;
  };
  simulacion: {
    /**
     * Habilitar o deshabilitar los Estados Simulables en el Boletín Ejecutivo (Sandbox).
     * Cuando está en true, se muestran los conmutadores de prueba (A Tiempo, Extemporáneo, Crítico < 70%).
     * Cuando está en false, se opera en Modo Producción Estricto mostrando únicamente los datos consolidados reales.
     */
    enableEstadosSimulables: boolean;
  };
}

export const SYSTEM_CONFIG: SystemConfiguration = {
  institucion: {
    enteRector: 'Vicepresidencia Sectorial de Comunicación y Cultura',
    siglas: 'VSCC',
    sistema: 'SGDO-VSCC',
    version: '2.6.0'
  },
  geoViewer: {
    enableVectorHeatmap: false, // DESACTIVADO: Se oculta la vista SVG sin eliminar su archivo ni su lógica
    enableGridMatrix: true,
    defaultTileProvider: 'OSM', // OpenStreetMap Estándar
    defaultLayerOpacity: 0.85
  },
  seguridad: {
    exigir2FA: true,
    tiempoSesionMinutos: 60
  },
  simulacion: {
    enableEstadosSimulables: true // Por defecto habilitado para demostración y auditoría
  }
};

const STORAGE_KEY = 'sgdo_vscc_system_config';

/**
 * Carga la configuración del sistema persistida en localStorage o retorna los valores predeterminados.
 */
export function getStoredSystemConfig(): SystemConfiguration {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...SYSTEM_CONFIG,
          ...parsed,
          institucion: { ...SYSTEM_CONFIG.institucion, ...(parsed.institucion || {}) },
          geoViewer: { ...SYSTEM_CONFIG.geoViewer, ...(parsed.geoViewer || {}) },
          seguridad: { ...SYSTEM_CONFIG.seguridad, ...(parsed.seguridad || {}) },
          simulacion: { ...SYSTEM_CONFIG.simulacion, ...(parsed.simulacion || {}) },
        };
      }
    }
  } catch (e) {
    console.warn('Error al leer la configuración del sistema de localStorage:', e);
  }
  return SYSTEM_CONFIG;
}

/**
 * Guarda los cambios de configuración del sistema en el almacenamiento local.
 */
export function saveStoredSystemConfig(config: SystemConfiguration): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
  } catch (e) {
    console.error('Error al guardar la configuración del sistema en localStorage:', e);
  }
}

/**
 * Restablece la configuración del sistema a los valores por defecto del archivo de configuración.
 */
export function resetStoredSystemConfig(): SystemConfiguration {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error('Error al restablecer la configuración del sistema:', e);
  }
  return SYSTEM_CONFIG;
}
