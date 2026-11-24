import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  FileText, 
  Sparkles, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Layers, 
  MessageSquare, 
  Globe2, 
  TrendingDown, 
  TrendingUp,
  FileSpreadsheet,
  Handshake,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { 
  OpinionMatrixAlert, 
  TalentVulnerabilityRow, 
  CalculatedMasterKPIs,
  FullWeeklyReport,
  RACIRole,
  UserAccount
} from '../types';
import { FormularioNarrativaMonitoreo } from './FormularioNarrativaMonitoreo';

interface ModuleGestionComProps {
  opinionAlerts: OpinionMatrixAlert[];
  vulnerabilityRows: TalentVulnerabilityRow[];
  kpis: CalculatedMasterKPIs;
  onOpenCounterNarrative: (alert: OpinionMatrixAlert) => void;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onNavigateToCapture?: () => void;
}

export const ModuleGestionCom: React.FC<ModuleGestionComProps> = ({
  opinionAlerts = [],
  vulnerabilityRows = [],
  kpis,
  onOpenCounterNarrative,
  report,
  onSaveReport,
  currentUser,
  currentRole,
  onNavigateToCapture
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'FORMULARIO_3A' | 'MONITOREO' | 'TALENTO_IVI' | 'VOCERIAS'
  >('FORMULARIO_3A');

  const totalPersonal = vulnerabilityRows.reduce((acc, r) => acc + r.totalPersonal, 0);
  const totalRojo = vulnerabilityRows.reduce((acc, r) => acc + r.nivelRojo, 0);
  const totalAmarillo = vulnerabilityRows.reduce((acc, r) => acc + r.nivelAmarillo, 0);
  const totalVerde = vulnerabilityRows.reduce((acc, r) => acc + r.nivelVerde, 0);
  const totalPorEvaluar = vulnerabilityRows.reduce((acc, r) => acc + r.porEvaluar, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">
              EJE FUNDAMENTAL N° 3
            </span>
            <span className="text-xs text-slate-400">Inteligencia Narrativa & Capital Humano</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1 font-['Space_Grotesk']">
            Gestión de Comunicaciones & Matrices de Opinión
          </h1>
          <p className="text-xs text-slate-300">
            3.A Gestión de Narrativa y Monitoreo de Medios (MON-001..008, GES-001..018, Alianzas, Cooperación e IVI).
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Índice de Vulnerabilidad (IVI)</span>
            <span className="text-xl font-bold text-purple-400 font-mono">{kpis.ivi}</span>
          </div>
          <div className="h-8 w-[1px] bg-slate-800"></div>
          <div>
            <span className="text-slate-400 block text-[10px]">Alertas Activas</span>
            <span className="text-xl font-bold text-red-400 font-mono">
              {opinionAlerts.filter(a => a.estado !== 'NEUTRALIZADA').length}
            </span>
          </div>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'FORMULARIO_3A', label: 'Formulario 3.A Narrativa y Monitoreo (Instrumento MPPCI)', icon: FileSpreadsheet, highlight: true },
          { id: 'MONITOREO', label: 'Dashboard Monitoreo & Desinformación (MON)', icon: ShieldAlert },
          { id: 'TALENTO_IVI', label: 'Dashboard Talento Humano & Semáforo (IVI)', icon: Users },
          { id: 'VOCERIAS', label: 'Dashboard Vocerías & Contenidos (GES)', icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/20'
                  : tab.highlight
                  ? 'text-purple-300 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 0: FORMULARIO OFICIAL 3.A */}
      {activeSubTab === 'FORMULARIO_3A' && (
        <FormularioNarrativaMonitoreo
          report={report}
          onSaveReport={onSaveReport}
          currentUser={currentUser}
          currentRole={currentRole}
        />
      )}

      {/* TAB 1: MONITOREO DE MATRICES */}
      {activeSubTab === 'MONITOREO' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono">MON-001 y MON-002</span>
              <div className="text-xl font-bold text-white">48 Alertas Procesadas</div>
              <p className="text-xs text-slate-400">14 informes de narrativa y balance de matrices viralizadas</p>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono">MON-003 a MON-005</span>
              <div className="text-xl font-bold text-amber-400">84 Primeras Planas</div>
              <p className="text-xs text-slate-400">Monitoreo de prensa nacional (21), regional (35) e internacional (28)</p>
            </div>
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-mono">MON-007</span>
              <div className="text-xl font-bold text-emerald-400">32 Contranarrativas</div>
              <p className="text-xs text-slate-400">Estrategias de neutralización de rumores activadas</p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Alertas Activas de Desinformación & Neutralización</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(opinionAlerts || []).map(alert => (
                <div key={alert.id} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          alert.nivelRiesgo === 'CRITICO' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          alert.nivelRiesgo === 'ALTO' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {alert.nivelRiesgo}
                        </span>
                        <span className="text-xs text-slate-400">{alert.origen}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1.5">{alert.titulo}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300">
                      {alert.reproduccionesEstimadas ? `${(alert.reproduccionesEstimadas / 1000).toFixed(0)}k imp.` : ''}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">{alert.descripcion}</p>

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Ente asignado: <strong className="text-slate-200">{alert.enteResponsable}</strong></span>
                    <button
                      onClick={() => onOpenCounterNarrative(alert)}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ver Contranarrativa</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TALENTO IVI */}
      {activeSubTab === 'TALENTO_IVI' && (
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-white">Semáforo de Talento Humano por Ente Adscrito</h3>
                <p className="text-xs text-slate-400">
                  Cálculo del Índice de Vulnerabilidad Institucional (IVI) ponderado: (Rojo×3 + Amarillo×1 + Verde×0) / Total Nómina.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total Nómina Consolidada</span>
                <span className="text-2xl font-bold text-white font-mono">{totalPersonal.toLocaleString()}</span>
              </div>
            </div>

            {/* Metric Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-red-500/30">
                <span className="text-red-400 block">Nivel Rojo (Ponderación 3)</span>
                <span className="text-lg font-bold text-red-400 font-mono">{totalRojo} ({((totalRojo / (totalPersonal || 1)) * 100).toFixed(1)}%)</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-amber-500/30">
                <span className="text-amber-400 block">Nivel Amarillo (Ponderación 1)</span>
                <span className="text-lg font-bold text-amber-400 font-mono">{totalAmarillo} ({((totalAmarillo / (totalPersonal || 1)) * 100).toFixed(1)}%)</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-emerald-500/30">
                <span className="text-emerald-400 block">Nivel Verde (Ponderación 0)</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">{totalVerde} ({((totalVerde / (totalPersonal || 1)) * 100).toFixed(1)}%)</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Por Evaluar</span>
                <span className="text-lg font-bold text-slate-300 font-mono">{totalPorEvaluar}</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto pt-3">
              <table className="w-full text-left text-xs border border-slate-800 rounded-xl">
                <thead className="bg-slate-950 text-slate-400">
                  <tr>
                    <th className="p-3">Ente Adscrito</th>
                    <th className="p-3">Total Nómina</th>
                    <th className="p-3 text-red-400">Rojo (Alto Riesgo)</th>
                    <th className="p-3 text-amber-400">Amarillo (Medio)</th>
                    <th className="p-3 text-emerald-400">Verde (Bajo)</th>
                    <th className="p-3">Por Evaluar</th>
                    <th className="p-3 text-purple-400">IVI Específico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {(vulnerabilityRows || []).map(row => {
                    const rowIvi = Number(((row.nivelRojo * 3 + row.nivelAmarillo * 1) / (row.totalPersonal || 1)).toFixed(3));
                    return (
                      <tr key={row.ente} className="hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-white">{row.ente}</td>
                        <td className="p-3 font-mono">{row.totalPersonal}</td>
                        <td className="p-3 font-mono text-red-400 font-semibold">{row.nivelRojo}</td>
                        <td className="p-3 font-mono text-amber-400 font-semibold">{row.nivelAmarillo}</td>
                        <td className="p-3 font-mono text-emerald-400 font-semibold">{row.nivelVerde}</td>
                        <td className="p-3 font-mono text-slate-400">{row.porEvaluar}</td>
                        <td className="p-3 font-mono font-bold text-purple-300">{rowIvi}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VOCERIAS */}
      {activeSubTab === 'VOCERIAS' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono">GES-001 a GES-008</span>
            <h3 className="text-sm font-bold text-white">Notas & Artículos Escritos</h3>
            <div className="text-2xl font-bold text-amber-400 font-mono">1,420 Notas</div>
            <p className="text-xs text-slate-400">Redacción centralizada MinCI, AVN y salas de redacción.</p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono">GES-009 a GES-013</span>
            <h3 className="text-sm font-bold text-white">Vocerías & Ruedas de Prensa</h3>
            <div className="text-2xl font-bold text-blue-400 font-mono">45 Vocerías / 14 Ruedas</div>
            <p className="text-xs text-slate-400">Coordinación de voceros ministeriales y balance de gestión.</p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-mono">GES-014 a GES-018</span>
            <h3 className="text-sm font-bold text-white">Balance de Sentimiento</h3>
            <div className="text-2xl font-bold text-emerald-400 font-mono">68.5% Positivo</div>
            <p className="text-xs text-slate-400">21% Neutro | 10.5% Crítico en medios monitoreados.</p>
          </div>
        </div>
      )}
    </div>
  );
};
