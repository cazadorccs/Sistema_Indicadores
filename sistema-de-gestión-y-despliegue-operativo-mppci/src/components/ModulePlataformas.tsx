import React, { useState } from 'react';
import { 
  Radio, 
  Tv, 
  Server, 
  ShieldCheck, 
  Cpu, 
  Wifi, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Sliders, 
  Layers,
  FileEdit,
  Satellite,
  Gauge
} from 'lucide-react';
import { PlatformsTechnicalData, CriticalTowerStatus, CalculatedMasterKPIs, FullWeeklyReport, UserAccount, RACIRole } from '../types';
import { FormularioRedTV } from './FormularioRedTV';
import { FormularioConatel } from './FormularioConatel';

interface ModulePlataformasProps {
  plataformasData: PlatformsTechnicalData;
  criticalTowers: CriticalTowerStatus[];
  kpis: CalculatedMasterKPIs;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onNavigateToCapture?: () => void;
}

export const ModulePlataformas: React.FC<ModulePlataformasProps> = ({
  plataformasData,
  criticalTowers = [],
  kpis,
  report,
  onSaveReport,
  currentUser,
  currentRole,
  onNavigateToCapture
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'REDTV' | 'TOWERS' | 'CONATEL' | 'FORM_REDTV' | 'FORM_CONATEL'>('REDTV');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
              EJE FUNDAMENTAL N° 2
            </span>
            <span className="text-xs text-slate-400">REDTV & CONATEL</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1 font-['Space_Grotesk']">
            Plataformas de Comunicaciones & Infraestructura
          </h1>
          <p className="text-xs text-slate-300">
            Telemetría de la Red de Televisión Digital Abierta (TDA), telepuerto satelital Banda Ku y regulación CONATEL.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Resiliencia Técnica (IRT)</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">{kpis.irt}%</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800"></div>
          <div>
            <span className="text-slate-400 block text-[10px]">Ley RESORTE Promedio</span>
            <span className="text-xl font-bold text-amber-400 font-mono">{kpis.cumplimientoResortePromedio}%</span>
          </div>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'REDTV', label: 'Dashboard 2.A: REDTV', icon: Radio },
          { id: 'TOWERS', label: 'Torres Críticas (7 Estaciones)', icon: Server },
          { id: 'CONATEL', label: 'Dashboard 2.B: CONATEL', icon: ShieldCheck },
          { id: 'FORM_REDTV', label: 'Formulario Oficial 2.A REDTV', icon: Satellite },
          { id: 'FORM_CONATEL', label: 'Formulario Oficial 2.B CONATEL', icon: Gauge },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: REDTV */}
      {activeSubTab === 'REDTV' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono">RTV-001 a RTV-005</span>
            <h3 className="text-sm font-bold text-white">Operatividad TDA Nacional</h3>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {plataformasData.operatividadNacionalTDA}%
            </div>
            <p className="text-xs text-slate-400">
              {plataformasData.estacionesTDAOperativas} de {plataformasData.estacionesTDATotal} estaciones TDA operativas transmitiendo en estándar ISDB-Tb.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono">RTV-006 a RTV-010</span>
            <h3 className="text-sm font-bold text-white">Telepuerto & Banda Ku</h3>
            <div className="text-2xl font-bold text-blue-400 font-mono">
              {plataformasData.potenciaBandaKu}% Potencia
            </div>
            <p className="text-xs text-slate-400">
              {plataformasData.canalesSatelitalesOperativos} de {plataformasData.canalesSatelitalesTotal} canales satelitales enlazados con telepuerto nacional.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono">RTV-011 a RTV-015</span>
            <h3 className="text-sm font-bold text-white">Capacidad y Microondas</h3>
            <div className="text-2xl font-bold text-amber-400 font-mono">
              {plataformasData.capacidadDisponible}% Disponible
            </div>
            <p className="text-xs text-slate-400">
              38 enlaces microondas y plantas de generación diésel en standby operativo.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: CRITICAL TOWERS */}
      {activeSubTab === 'TOWERS' && (
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-300">Monitoreo de telemetría en tiempo real de nodos de transmisión neurálgicos</span>
            <span className="text-amber-400 font-semibold font-mono">7 Estaciones Estratégicas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(criticalTowers || []).map(tower => (
              <div 
                key={tower.id}
                className={`p-4 rounded-2xl border transition-all ${
                  tower.fallaDetectada 
                    ? 'bg-red-950/20 border-red-500/50' 
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono">{tower.id}</span>
                    <h4 className="text-sm font-bold text-white">{tower.nombre}</h4>
                    <p className="text-xs text-slate-400">{tower.ubicacion}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold font-mono text-emerald-400">{tower.operatividadSenal}%</span>
                    <span className="text-[10px] text-slate-400 block">{tower.temperaturaSala}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Potencia Transmisión</span>
                    <span className="font-semibold text-slate-200">{tower.potenciaActual}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Transmisor TDA</span>
                    <span className={`font-semibold ${tower.transmisorTDA === 'OPERATIVO' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {tower.transmisorTDA}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Enlace Microondas</span>
                    <span className="font-semibold text-slate-200">{tower.enlaceMicroondas}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Planta Eléctrica</span>
                    <span className={`font-semibold ${tower.plantaElectrica === 'OPERATIVO' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {tower.plantaElectrica}
                    </span>
                  </div>
                </div>

                {tower.fallaDetectada && (
                  <div className="mt-3 p-2 bg-red-900/30 text-red-200 border border-red-500/30 rounded-lg text-xs flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-400" />
                    <span>{tower.tipoFalla}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONATEL */}
      {activeSubTab === 'CONATEL' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono">CON-001 a CON-006</span>
            <h3 className="text-sm font-bold text-white">Actos Regulatorios y Concesiones</h3>
            <div className="text-2xl font-bold text-amber-400 font-mono">
              {plataformasData.concesionesOtorgadas} Concesiones
            </div>
            <p className="text-xs text-slate-400">
              {plataformasData.habilitacionesAdministrativas} habilitaciones administrativas y {plataformasData.inspeccionesTecnicas} inspecciones técnicas ejecutadas.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono">CON-009 a CON-012</span>
            <h3 className="text-sm font-bold text-white">Monitoreo del Espectro Radioeléctrico</h3>
            <div className="text-2xl font-bold text-emerald-400 font-mono">
              {plataformasData.espectroRadioelectricoMonitoreado}% Cobertura
            </div>
            <p className="text-xs text-slate-400">
              18 estaciones de monitoreo continuo. {plataformasData.interferenciasDetectadas} interferencias detectadas y resueltas.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono">CON-014 a CON-017</span>
            <h3 className="text-sm font-bold text-white">Cumplimiento Ley RESORTE</h3>
            <div className="text-2xl font-bold text-blue-400 font-mono">
              {plataformasData.cumplimientoContenidoNacionalResorte}% PNI
            </div>
            <p className="text-xs text-slate-400">
              {plataformasData.cumplimientoFranjaInfantilResorte}% en franja infantil protegida y {plataformasData.cumplimientoEducativoResorte}% en programación educativa.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: FORMULARIO OFICIAL 2.A REDTV */}
      {activeSubTab === 'FORM_REDTV' && (
        <div className="animate-in fade-in duration-200">
          <FormularioRedTV
            report={report}
            onSaveReport={onSaveReport}
            currentUser={currentUser}
            currentRole={currentRole}
          />
        </div>
      )}

      {/* TAB 5: FORMULARIO OFICIAL 2.B CONATEL */}
      {activeSubTab === 'FORM_CONATEL' && (
        <div className="animate-in fade-in duration-200">
          <FormularioConatel
            report={report}
            onSaveReport={onSaveReport}
            currentUser={currentUser}
            currentRole={currentRole}
          />
        </div>
      )}
    </div>
  );
};
