import React, { useState } from 'react';
import { 
  Settings, 
  X, 
  Check, 
  RotateCcw, 
  Copy, 
  FileCode, 
  Sliders, 
  Map, 
  ShieldCheck, 
  Building2, 
  Layers, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Info, 
  Cpu, 
  Lock
} from 'lucide-react';
import { 
  SystemConfiguration, 
  SYSTEM_CONFIG, 
  saveStoredSystemConfig, 
  resetStoredSystemConfig 
} from '../config/systemConfig';

interface SystemConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SystemConfiguration;
  onUpdateConfig: (newConfig: SystemConfiguration) => void;
}

export const SystemConfigModal: React.FC<SystemConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig
}) => {
  const [activeTab, setActiveTab] = useState<'PANEL' | 'CODE'>('PANEL');
  const [tempConfig, setTempConfig] = useState<SystemConfiguration>(config);
  const [copiedCode, setCopiedCode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync internal state when opened or updated
  React.useEffect(() => {
    if (isOpen) {
      setTempConfig(config);
      setSaveSuccess(false);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleToggleVectorHeatmap = () => {
    setTempConfig(prev => ({
      ...prev,
      geoViewer: {
        ...prev.geoViewer,
        enableVectorHeatmap: !prev.geoViewer.enableVectorHeatmap
      }
    }));
  };

  const handleToggleGridMatrix = () => {
    setTempConfig(prev => ({
      ...prev,
      geoViewer: {
        ...prev.geoViewer,
        enableGridMatrix: !prev.geoViewer.enableGridMatrix
      }
    }));
  };

  const handleTileProviderChange = (provider: SystemConfiguration['geoViewer']['defaultTileProvider']) => {
    setTempConfig(prev => ({
      ...prev,
      geoViewer: {
        ...prev.geoViewer,
        defaultTileProvider: provider
      }
    }));
  };

  const handleOpacityChange = (opacity: number) => {
    setTempConfig(prev => ({
      ...prev,
      geoViewer: {
        ...prev.geoViewer,
        defaultLayerOpacity: opacity
      }
    }));
  };

  const handleToggle2FA = () => {
    setTempConfig(prev => ({
      ...prev,
      seguridad: {
        ...prev.seguridad,
        exigir2FA: !prev.seguridad.exigir2FA
      }
    }));
  };

  const handleToggleEstadosSimulables = () => {
    setTempConfig(prev => ({
      ...prev,
      simulacion: {
        ...prev.simulacion,
        enableEstadosSimulables: !prev.simulacion?.enableEstadosSimulables
      }
    }));
  };

  const handleSave = () => {
    saveStoredSystemConfig(tempConfig);
    onUpdateConfig(tempConfig);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    const defaultConfig = resetStoredSystemConfig();
    setTempConfig(defaultConfig);
    onUpdateConfig(defaultConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const codeSnippet = `/**
 * Configuración General del Sistema (SGDO-VSCC)
 * Ubicación: src/config/systemConfig.ts
 */
export const SYSTEM_CONFIG = {
  institucion: {
    enteRector: '${tempConfig.institucion.enteRector}',
    siglas: '${tempConfig.institucion.siglas}',
    sistema: '${tempConfig.institucion.sistema}',
    version: '${tempConfig.institucion.version}'
  },
  geoViewer: {
    // Motor Vectorial SVG Puro (VenezuelaVectorHeatmap.tsx)
    enableVectorHeatmap: ${tempConfig.geoViewer.enableVectorHeatmap},
    // Matriz Tabular 335 Municipios
    enableGridMatrix: ${tempConfig.geoViewer.enableGridMatrix},
    // Proveedor de Teselas Cartográficas
    defaultTileProvider: '${tempConfig.geoViewer.defaultTileProvider}',
    // Opacidad de Capas
    defaultLayerOpacity: ${tempConfig.geoViewer.defaultLayerOpacity}
  },
  seguridad: {
    exigir2FA: ${tempConfig.seguridad.exigir2FA},
    tiempoSesionMinutos: ${tempConfig.seguridad.tiempoSesionMinutos}
  },
  simulacion: {
    // Habilitar o Deshabilitar Estados Simulables (Sandbox vs Modo Producción)
    enableEstadosSimulables: ${tempConfig.simulacion?.enableEstadosSimulables ?? true}
  }
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-sm">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold font-['Space_Grotesk'] tracking-tight">
                  Configuración General del Sistema
                </h2>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono border border-blue-400/30 font-semibold">
                  SGDO-VSCC v2.6.0
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-400/30">
                  Super Administrador
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Panel Central de Control, Banderas Globales (*Feature Flags*) y Gobernanza
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('PANEL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'PANEL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Panel de Control & Feature Flags</span>
            </button>

            <button
              onClick={() => setActiveTab('CODE')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'CODE'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Visor del Archivo Central (systemConfig.ts)</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
            Ruta: <span className="text-slate-700 font-semibold">src/config/systemConfig.ts</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50">
          
          {activeTab === 'PANEL' ? (
            <>
              {/* Card 1: Visualizadores Cartográficos & Motor Geoespacial */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Map className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Módulo Cartográfico y Visores Geográficos (GeoViewer)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Control de componentes visuales en el Mapa Interactivo de Cobertura Efectiva Municipal
                    </p>
                  </div>
                </div>

                {/* Feature Flag: VenezuelaVectorHeatmap */}
                <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-slate-900">
                        Motor Vectorial SVG Puro (VenezuelaVectorHeatmap.tsx)
                      </span>
                      {tempConfig.geoViewer.enableVectorHeatmap ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>Visible</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center space-x-1">
                          <EyeOff className="w-3 h-3" />
                          <span>Desactivado (Oculto)</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Lienzo ultraligero proyectado por transformaciones afines en SVG nativo, ideal para informes de bajo consumo y presentaciones ejecutivas.
                    </p>
                    <div className="flex items-center space-x-1.5 text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200/60 mt-1">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        <strong>Preservación inmutable:</strong> Al desactivarse, el archivo, sus algoritmos matemáticos y sus polígonos IGVSB se mantienen 100% íntegros e intactos en el código. Solo se oculta su botón selector en el visor del mapa.
                      </span>
                    </div>
                  </div>

                  {/* Switch Toggle */}
                  <button
                    onClick={handleToggleVectorHeatmap}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      tempConfig.geoViewer.enableVectorHeatmap ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                    title={tempConfig.geoViewer.enableVectorHeatmap ? 'Clic para Desactivar' : 'Clic para Activar'}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        tempConfig.geoViewer.enableVectorHeatmap ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Feature Flag: Grid Matrix */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-slate-900">
                        Matriz Tabular de los 335 Municipios (Vista Cuadrícula)
                      </span>
                      {tempConfig.geoViewer.enableGridMatrix ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Activa
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold">
                          Desactivada
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">
                      Permite conmutar al modo matriz para listar, filtrar y auditar los 335 municipios del país por código INE y estado.
                    </p>
                  </div>

                  {/* Switch Toggle */}
                  <button
                    onClick={handleToggleGridMatrix}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      tempConfig.geoViewer.enableGridMatrix ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        tempConfig.geoViewer.enableGridMatrix ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Cartographic Base Layer Provider & Opacity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Proveedor de Capa Base Cartográfica Inicial
                    </label>
                    <select
                      value={tempConfig.geoViewer.defaultTileProvider}
                      onChange={(e) => handleTileProviderChange(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-lg text-xs text-slate-800 p-2.5 focus:border-blue-600 focus:outline-none shadow-2xs cursor-pointer font-medium"
                    >
                      <option value="CARTO_VOYAGER">Carto Voyager (Predeterminado - Nítido Institucional)</option>
                      <option value="OSM">OpenStreetMap Estándar</option>
                      <option value="ESRI_STREET">Esri Calles y Relieve Físico</option>
                      <option value="ESRI_SATELLITE">Esri Imagen Satelital HD</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Opacidad Inicial de Capas Poligonales
                      </label>
                      <span className="text-xs font-mono font-bold text-blue-600">
                        {Math.round(tempConfig.geoViewer.defaultLayerOpacity * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={tempConfig.geoViewer.defaultLayerOpacity}
                      onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>10% (Translúcido)</span>
                      <span>85% (Recomendado)</span>
                      <span>100% (Opaco)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Gobernanza y Rectoría Institucional */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Rectoría Institucional y Gobernanza
                    </h3>
                    <p className="text-xs text-slate-500">
                      Identidad jerárquica y parametrización de cabecera ministerial
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Ente Rector</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">{tempConfig.institucion.enteRector}</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Siglas Oficiales</div>
                    <div className="text-xs font-bold text-blue-700 mt-1 font-mono">{tempConfig.institucion.siglas}</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Versión del Sistema</div>
                    <div className="text-xs font-bold text-slate-800 mt-1 font-mono">{tempConfig.institucion.version}</div>
                  </div>
                </div>
              </div>

              {/* Card 3: Criterios de Seguridad y Sesión */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Seguridad y Criterios de Autenticación
                    </h3>
                    <p className="text-xs text-slate-500">
                      Políticas de control de acceso según estándar de seguridad gubernamental
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-lg border border-slate-200 bg-slate-50/70">
                  <div>
                    <div className="text-xs font-bold text-slate-800">Exigir Doble Factor de Autenticación (2FA / OTP)</div>
                    <div className="text-[11px] text-slate-500">Obligatorio para roles con facultades de Aprobación o Firma Ministerial</div>
                  </div>
                  <button
                    onClick={handleToggle2FA}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      tempConfig.seguridad.exigir2FA ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        tempConfig.seguridad.exigir2FA ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Card 4: Modo Simulación y Sandbox (Estados Simulables) */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Modo Simulación y Sandbox (Estados Simulables)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Control de interruptores de prueba en el Boletín Ejecutivo para verificar cortes y alertas
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-slate-900">
                        Habilitar Estados Simulables en Boletín Ejecutivo
                      </span>
                      {tempConfig.simulacion?.enableEstadosSimulables ? (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                          Sandbox Activo
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Modo Producción Estricto
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Cuando está activo, el Boletín Ejecutivo muestra botones para alternar escenarios de prueba (A Tiempo, Extemporáneo y Crítico &lt; 70%) en VTV, REDTV y el Viceministerio.
                    </p>
                    <div className="text-[11px] text-slate-500 bg-slate-100 p-2 rounded-lg mt-1">
                      <strong>Modo Producción:</strong> Al desactivar esta opción, se ocultan los conmutadores de simulación y el Boletín Ejecutivo reflejará estrictamente los datos consolidados reales del sistema.
                    </div>
                  </div>

                  {/* Switch Toggle */}
                  <button
                    onClick={handleToggleEstadosSimulables}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      tempConfig.simulacion?.enableEstadosSimulables ? 'bg-indigo-600' : 'bg-slate-300'
                    }`}
                    title={tempConfig.simulacion?.enableEstadosSimulables ? 'Clic para Desactivar Modo Simulación' : 'Clic para Activar Modo Simulación'}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        tempConfig.simulacion?.enableEstadosSimulables ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Tab 2: Visor del Código Fuente Exacto */
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-xl p-4 text-slate-200 font-mono text-xs overflow-x-auto shadow-inner relative border border-slate-800">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <span className="text-[11px] text-slate-300 ml-2 font-mono">src/config/systemConfig.ts</span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <pre className="text-slate-300 leading-relaxed font-mono whitespace-pre">
                  {codeSnippet}
                </pre>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-900 space-y-1">
                <div className="font-bold flex items-center space-x-1.5">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>¿Cómo funciona la arquitectura de este archivo?</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  El archivo <code className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded font-mono">systemConfig.ts</code> centraliza todas las banderas operativas de la plataforma. Cualquier cambio guardado en este modal se sincroniza en caliente en la memoria del navegador y se refleja al instante en el mapa interactivo y en los módulos del sistema.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 text-slate-600 hover:text-slate-900 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Restablecer los valores por defecto del archivo original"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Valores Predeterminados</span>
          </button>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancelar / Cerrar
            </button>

            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>¡Configuración Aplicada!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Guardar y Aplicar Cambios</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
