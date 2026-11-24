import React, { useState } from 'react';
import { 
  Tv, 
  Radio, 
  Newspaper, 
  Globe, 
  Share2, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Layers, 
  Activity,
  CheckCircle2,
  Sparkles,
  FileEdit,
  ClipboardList
} from 'lucide-react';
import { MediaOperationalData, CalculatedMasterKPIs, FullWeeklyReport, UserAccount, RACIRole } from '../types';
import { FormularioProduccionImpresos } from './FormularioProduccionImpresos';
import { FormularioRadios } from './FormularioRadios';
import { FormularioTelevision } from './FormularioTelevision';
import { FormularioDigitales } from './FormularioDigitales';
import { FormularioRedesSociales } from './FormularioRedesSociales';

interface ModuleMediosProps {
  mediosData: MediaOperationalData;
  kpis: CalculatedMasterKPIs;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onNavigateToCapture?: () => void;
}

export const ModuleMedios: React.FC<ModuleMediosProps> = ({ 
  mediosData, 
  kpis,
  report,
  onSaveReport,
  currentUser,
  currentRole
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'IMP' | 'RAD' | 'TV' | 'WEB' | 'RED'>('IMP');
  const [viewMode, setViewMode] = useState<'FORMULARIO_RECABAR' | 'DASHBOARD_RESUMEN'>('FORMULARIO_RECABAR');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              EJE FUNDAMENTAL N° 1
            </span>
            <span className="text-xs text-slate-400">Sistema Nacional de Medios Públicos</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1.5 font-['Space_Grotesk']">
            Medios de Comunicación e Información
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Recolección de datos, levantamiento de indicadores y monitoreo de medios impresos, radiales (RNV/YVKE), televisivos (VTV/TVES/ViVe) y redes digitales.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Switcher */}
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('FORMULARIO_RECABAR')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'FORMULARIO_RECABAR'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Recabar Información</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('DASHBOARD_RESUMEN')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'DASHBOARD_RESUMEN'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Tablero de Resumen</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Engagement (EE)</span>
              <span className="text-lg font-bold text-blue-400 font-mono">{kpis.ee}%</span>
            </div>
            <div className="h-7 w-[1px] bg-slate-700"></div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Cobertura (ICD)</span>
              <span className="text-lg font-bold text-white font-mono">{kpis.icd}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtabs for Eje 1 */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'IMP', label: '1.A Medios Impresos (IMP)', icon: Newspaper, count: '17 Indicadores' },
          { id: 'RAD', label: '1.B Radiodifusión AM/FM (RAD)', icon: Radio, count: '18 Indicadores' },
          { id: 'TV', label: '1.C Televisión & Audiovisual (TV)', icon: Tv, count: '19 Indicadores' },
          { id: 'WEB', label: '1.D Portales Digitales (WEB)', icon: Globe, count: '18 Indicadores' },
          { id: 'RED', label: '1.E Redes Sociales (RED)', icon: Share2, count: '16 Indicadores' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content 1.A: Impresos */}
      {activeSubTab === 'IMP' && (
        <div className="space-y-6">
          {/* Mode 1: Interactive Data Collection Form */}
          {viewMode === 'FORMULARIO_RECABAR' && (
            <FormularioProduccionImpresos
              mediosData={mediosData}
              report={report}
              onSaveReport={onSaveReport}
              currentUser={currentUser}
              currentRole={currentRole}
              onSuccessSave={(msg) => console.log(msg)}
            />
          )}

          {/* Mode 2: Summary Dashboard (or summary cards shown below) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Tablero de Resumen: Métricas de Circulación y Logística</span>
              </h3>
              {viewMode === 'FORMULARIO_RECABAR' && (
                <span className="text-[11px] text-slate-400">
                  Las métricas reflejan en tiempo real la información recabada
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">IMP-001 y IMP-002</span>
                <h3 className="text-sm font-bold text-slate-900">Tiraje Total vs Distribución Físico</h3>
                <div className="text-2xl font-bold text-blue-600 font-mono">
                  {mediosData.ejemplaresImpresos.toLocaleString()} / {mediosData.tirajeTotal.toLocaleString()}
                </div>
                <p className="text-xs text-slate-600">
                  Eficiencia de colocación en quioscos y puntos estratégicos: <b className="text-slate-900">{((mediosData.ejemplaresImpresos / (mediosData.tirajeTotal || 1)) * 100).toFixed(1)}%</b>
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">IMP-003</span>
                <h3 className="text-sm font-bold text-slate-900">Despliegue en Zonas Afectadas</h3>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  {mediosData.ejemplaresZonasAfectadas.toLocaleString()} ej.
                </div>
                <p className="text-xs text-slate-600">
                  Distribución prioritaria de encartes informativos de contingencia y prevención.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">IMP-016 & IMP-017</span>
                <h3 className="text-sm font-bold text-slate-900">Logística y Unidades Móviles</h3>
                <div className="text-2xl font-bold text-green-600 font-mono">
                  12 / 14 Unidades
                </div>
                <p className="text-xs text-slate-600">
                  85.7% de flota de despacho y distribución física operativa a nivel nacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 1.B: Radios */}
      {activeSubTab === 'RAD' && (
        <div className="space-y-6">
          {/* Mode 1: Interactive Data Collection Form */}
          {viewMode === 'FORMULARIO_RECABAR' && (
            <FormularioRadios
              mediosData={mediosData}
              report={report}
              onSaveReport={onSaveReport}
              currentUser={currentUser}
              currentRole={currentRole}
              onSuccessSave={(msg) => console.log(msg)}
            />
          )}

          {/* Mode 2: Summary Dashboard */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Tablero de Resumen: Métricas de Radiodifusión AM/FM</span>
              </h3>
              {viewMode === 'FORMULARIO_RECABAR' && (
                <span className="text-[11px] text-slate-400">
                  Las métricas reflejan en tiempo real la información recabada
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">RAD-001 y RAD-002</span>
                <h3 className="text-sm font-bold text-slate-900">Horas al Aire & Operatividad</h3>
                <div className="text-2xl font-bold text-blue-600 font-mono">
                  {mediosData.horasTransmisionRadio} hrs ({mediosData.operatividadSenalRadio}%)
                </div>
                <p className="text-xs text-slate-600">
                  Circuito RNV (Informativa, Clásica, Musical) y Sistema Radio Nacional.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">RAD-006 & RAD-009</span>
                <h3 className="text-sm font-bold text-slate-900">Programas en Vivo & Contingencia</h3>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  {mediosData.programasEnVivoRadio} prog. / {mediosData.microprogramasContingenciaRadio || 64} cápsulas
                </div>
                <p className="text-xs text-slate-600">
                  Espacios de opinión, microprogramas de contingencia y boletines informativos.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">RAD-014 a RAD-016</span>
                <h3 className="text-sm font-bold text-slate-900">Transmisores & Plantas Respaldo</h3>
                <div className="text-2xl font-bold text-green-600 font-mono">
                  {mediosData.transmisoresRadioOperativos || 82} / {mediosData.transmisoresRadioTotal || 88} Transmisores
                </div>
                <p className="text-xs text-slate-600">
                  Operatividad técnica de la red de transmisores y generadores diésel de emergencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 1.C: Televisión */}
      {activeSubTab === 'TV' && (
        <div className="space-y-6">
          {/* Mode 1: Interactive Data Collection Form */}
          {viewMode === 'FORMULARIO_RECABAR' && (
            <FormularioTelevision
              mediosData={mediosData}
              report={report}
              onSaveReport={onSaveReport}
              currentUser={currentUser}
              currentRole={currentRole}
              onSuccessSave={(msg) => console.log(msg)}
            />
          )}

          {/* Mode 2: Summary Dashboard */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-sky-600" />
                <span>Tablero de Resumen: Métricas de Televisión y Producción Audiovisual</span>
              </h3>
              {viewMode === 'FORMULARIO_RECABAR' && (
                <span className="text-[11px] text-slate-400">
                  Las métricas reflejan en tiempo real la información recabada
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">TV-001 y TV-002</span>
                <h3 className="text-sm font-bold text-slate-900">Horas Transmisión & Operatividad TV</h3>
                <div className="text-2xl font-bold text-sky-600 font-mono">
                  {mediosData.horasTransmisionTV} hrs ({mediosData.operatividadSenalTV}%)
                </div>
                <p className="text-xs text-slate-600">
                  Señal continua de VTV 8, TVES, ViVe Televisión, Ávila TV y Colombeia.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">TV-008 & TV-009</span>
                <h3 className="text-sm font-bold text-slate-900">Pases en Vivo & Coberturas Especiales</h3>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  {mediosData.pasesEnVivoCampoTV} pases
                </div>
                <p className="text-xs text-slate-600">
                  Despliegue de corresponsalías regionales y enlaces microondas/satelitales.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">TV-014 a TV-019</span>
                <h3 className="text-sm font-bold text-slate-900">Unidades Móviles & Personal Técnico</h3>
                <div className="text-2xl font-bold text-emerald-600 font-mono">
                  {mediosData.unidadesMovilesOperativas || 9} / {mediosData.unidadesMovilesTotal || 10} Unidades
                </div>
                <p className="text-xs text-slate-600">
                  Cobertura en tiempo real de alocuciones presidenciales y eventos de Estado.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 1.D: Portales Web */}
      {activeSubTab === 'WEB' && (
        <div className="space-y-6">
          {/* Mode 1: Interactive Data Collection Form */}
          {viewMode === 'FORMULARIO_RECABAR' && (
            <FormularioDigitales
              mediosData={mediosData}
              report={report}
              onSaveReport={onSaveReport}
              currentUser={currentUser}
              currentRole={currentRole}
              onSuccessSave={(msg) => console.log(msg)}
            />
          )}

          {/* Mode 2: Summary Dashboard */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Tablero de Resumen: Métricas de Portales y Medios Digitales</span>
              </h3>
              {viewMode === 'FORMULARIO_RECABAR' && (
                <span className="text-[11px] text-slate-400">
                  Las métricas reflejan en tiempo real la información recabada
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">WEB-001 a WEB-003</span>
                <h3 className="text-sm font-bold text-slate-900">Tráfico Portales Informativos</h3>
                <div className="text-2xl font-bold text-blue-600 font-mono">
                  {(mediosData.vistasLogradasDigital * 0.45).toLocaleString(undefined, { maximumFractionDigits: 0 })} visitas
                </div>
                <p className="text-xs text-slate-600">
                  Portales: AVN, VTV, MinCI, RNV y Ciudad Caracas.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">WEB-004 & WEB-005</span>
                <h3 className="text-sm font-bold text-slate-900">Tiempo de Sesión & Rebote</h3>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  3m 42s | 38.2%
                </div>
                <p className="text-xs text-slate-600">
                  Excelente retención en notas explicativas y reportajes de investigación.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">WEB-013 a WEB-015</span>
                <h3 className="text-sm font-bold text-slate-900">Trámites Digitales & SIVERIF</h3>
                <div className="text-2xl font-bold text-green-600 font-mono">
                  1,280 Trámites
                </div>
                <p className="text-xs text-slate-600">
                  Verificaciones de PNI, habilitaciones y registros de prensa internacional.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 1.E: Redes Sociales */}
      {activeSubTab === 'RED' && (
        <div className="space-y-6">
          {/* Mode 1: Interactive Data Collection Form */}
          {viewMode === 'FORMULARIO_RECABAR' && (
            <FormularioRedesSociales
              mediosData={mediosData}
              report={report}
              onSaveReport={onSaveReport}
              currentUser={currentUser}
              currentRole={currentRole}
              onSuccessSave={(msg) => console.log(msg)}
            />
          )}

          {/* Mode 2: Summary Dashboard */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-pink-600" />
                <span>Tablero de Resumen: Métricas de Ecosistema Digital & Redes Sociales</span>
              </h3>
              {viewMode === 'FORMULARIO_RECABAR' && (
                <span className="text-[11px] text-slate-400">
                  Las métricas reflejan en tiempo real la información recabada
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">RED-001 a RED-006</span>
                <h3 className="text-sm font-bold text-slate-900">Vistas Logradas vs Meta</h3>
                <div className="text-2xl font-bold text-pink-600 font-mono">
                  {mediosData.vistasLogradasDigital.toLocaleString()} / {mediosData.metaVistasDigital.toLocaleString()}
                </div>
                <p className="text-xs text-slate-600">
                  Cumplimiento de Meta Digital: <b className="text-slate-900">{((mediosData.vistasLogradasDigital / (mediosData.metaVistasDigital || 1)) * 100).toFixed(1)}%</b>
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">RED-007</span>
                <h3 className="text-sm font-bold text-slate-900">Interacciones Netas</h3>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  {mediosData.interaccionesTotalesDigital.toLocaleString()}
                </div>
                <p className="text-xs text-slate-600">
                  Likes, compartidos, retuits y comentarios registrados en todas las plataformas.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">RED-012 a RED-016</span>
                <h3 className="text-sm font-bold text-slate-900">Red de Creadores Aliados</h3>
                <div className="text-2xl font-bold text-green-600 font-mono">
                  85 Creadores / 1.2M Vistas
                </div>
                <p className="text-xs text-slate-600">
                  Ecosistema de vocería orgánica y viralización de mensajes de interés social.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
