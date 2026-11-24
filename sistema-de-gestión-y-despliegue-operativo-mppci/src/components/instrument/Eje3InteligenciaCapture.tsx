import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  Info,
  Radio,
  Eye,
  Handshake,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { 
  TalentVulnerabilityRow, 
  OpinionMatrixAlert, 
  ControlVariables, 
  UserAccount, 
  FullWeeklyReport, 
  RACIRole 
} from '../../types';
import { FormularioNarrativaMonitoreo } from '../FormularioNarrativaMonitoreo';

interface Eje3InteligenciaCaptureProps {
  vulnerabilityRows: TalentVulnerabilityRow[];
  onChangeVulnerabilityRows: (rows: TalentVulnerabilityRow[]) => void;
  opinionAlerts: OpinionMatrixAlert[];
  onChangeOpinionAlerts?: (alerts: OpinionMatrixAlert[]) => void;
  control: ControlVariables;
  currentUser?: UserAccount | null;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentRole?: RACIRole;
}

export const Eje3InteligenciaCapture: React.FC<Eje3InteligenciaCaptureProps> = ({
  vulnerabilityRows,
  onChangeVulnerabilityRows,
  opinionAlerts,
  onChangeOpinionAlerts,
  control,
  currentUser,
  report,
  onSaveReport,
  currentRole
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'FORMULARIO_COMPLETO' | 'VISTA_RAPIDA_TALENTO' | 'VISTA_RAPIDA_ALERTAS'>(
    'FORMULARIO_COMPLETO'
  );

  // Handle cell edit in vulnerability table (legacy quick editor)
  const handleVulnerabilityChange = (
    index: number,
    field: keyof TalentVulnerabilityRow,
    value: string
  ) => {
    const num = parseInt(value) || 0;
    const updated = [...vulnerabilityRows];
    const currentRow = { ...updated[index], [field]: num };

    // Auto-calculate "porEvaluar"
    const evaluated = (currentRow.nivelRojo || 0) + (currentRow.nivelAmarillo || 0) + (currentRow.nivelVerde || 0);
    currentRow.porEvaluar = Math.max(0, currentRow.totalPersonal - evaluated);

    updated[index] = currentRow;
    onChangeVulnerabilityRows(updated);
  };

  // Live calculation of Global IVI
  const totalPersonalAll = vulnerabilityRows.reduce((acc, r) => acc + r.totalPersonal, 0) || 1;
  const weightedRiskSum = vulnerabilityRows.reduce(
    (acc, r) => acc + ((r.nivelRojo * 3) + (r.nivelAmarillo * 1)),
    0
  );
  const globalIVI = ((weightedRiskSum / (totalPersonalAll * 3)) * 100).toFixed(1);
  const globalIVINum = parseFloat(globalIVI);

  const getRiskBadge = (ivi: number) => {
    if (ivi >= 45) return { label: 'RIESGO CRÍTICO', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    if (ivi >= 30) return { label: 'RIESGO ALTO', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    if (ivi >= 15) return { label: 'RIESGO MODERADO', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    return { label: 'NIVEL ÓPTIMO', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  };

  const riskBadge = getRiskBadge(globalIVINum);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Card for Eje 3 with Switcher */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                  EJE 3 • GESTIÓN DE COMUNICACIONES
                </span>
                <span className="text-xs text-slate-500 font-medium">DOCUMENTO OFICIAL MPPCI</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                3.A Gestión de Narrativa y Monitoreo de Medios
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-500 font-medium">IVI Ponderado:</span>
            <span className="font-bold font-mono text-sm text-slate-900">{globalIVI}%</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${riskBadge.color}`}>
              {riskBadge.label}
            </span>
          </div>
        </div>

        {/* Navigation Selector for Eje 3 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveMainTab('FORMULARIO_COMPLETO')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMainTab === 'FORMULARIO_COMPLETO'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Formulario Oficial Completo (3.A Narrativa y Monitoreo)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('VISTA_RAPIDA_TALENTO')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMainTab === 'VISTA_RAPIDA_TALENTO'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Resumen Talento Humano (IVI)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('VISTA_RAPIDA_ALERTAS')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMainTab === 'VISTA_RAPIDA_ALERTAS'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Alertas de Guerra Cognitiva</span>
          </button>
        </div>
      </div>

      {/* Main Form Render */}
      {activeMainTab === 'FORMULARIO_COMPLETO' && (
        <FormularioNarrativaMonitoreo
          report={report}
          onSaveReport={onSaveReport}
          currentUser={currentUser}
          currentRole={currentRole}
        />
      )}

      {/* Legacy Quick View: Talento Humano (IVI) */}
      {activeMainTab === 'VISTA_RAPIDA_TALENTO' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Carga Semanal de Personal por Ente y Semáforo de Riesgo
              </h3>
              <p className="text-xs text-slate-500">
                Ponderación oficial: <b>Nivel Rojo (x3)</b>, <b>Nivel Amarillo (x1)</b>, <b>Nivel Verde (x0)</b>.
              </p>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Fórmula: IVI = [(Rojo×3 + Amarillo×1) / (Nómina×3)] × 100
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-semibold">
                <tr>
                  <th className="p-3">Ente Adscrito</th>
                  <th className="p-3">Total Nómina</th>
                  <th className="p-3 text-red-600">Nivel Rojo (x3)</th>
                  <th className="p-3 text-amber-600">Nivel Amarillo (x1)</th>
                  <th className="p-3 text-emerald-600">Nivel Verde (x0)</th>
                  <th className="p-3 text-slate-500">Por Evaluar</th>
                  <th className="p-3 text-slate-700">IVI Ente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {vulnerabilityRows.map((row, index) => {
                  const maxRiskPoints = (row.totalPersonal * 3) || 1;
                  const currentRiskPoints = (row.nivelRojo * 3) + (row.nivelAmarillo * 1);
                  const rowIVI = ((currentRiskPoints / maxRiskPoints) * 100).toFixed(1);

                  return (
                    <tr key={row.ente} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-bold text-slate-900 font-sans">{row.ente}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={row.totalPersonal}
                          onChange={(e) => handleVulnerabilityChange(index, 'totalPersonal', e.target.value)}
                          className="w-20 px-2 py-1 bg-white border border-slate-300 rounded font-bold text-slate-900 focus:ring-1 focus:ring-rose-500"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={row.nivelRojo}
                          onChange={(e) => handleVulnerabilityChange(index, 'nivelRojo', e.target.value)}
                          className="w-20 px-2 py-1 bg-rose-50 border border-rose-300 rounded font-bold text-rose-700 focus:ring-1 focus:ring-rose-500"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={row.nivelAmarillo}
                          onChange={(e) => handleVulnerabilityChange(index, 'nivelAmarillo', e.target.value)}
                          className="w-20 px-2 py-1 bg-amber-50 border border-amber-300 rounded font-bold text-amber-700 focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={row.nivelVerde}
                          onChange={(e) => handleVulnerabilityChange(index, 'nivelVerde', e.target.value)}
                          className="w-20 px-2 py-1 bg-emerald-50 border border-emerald-300 rounded font-bold text-emerald-700 focus:ring-1 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="p-3 text-slate-500">
                        {row.porEvaluar}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                          parseFloat(rowIVI) >= 40 
                            ? 'bg-rose-100 text-rose-800' 
                            : parseFloat(rowIVI) >= 25 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {rowIVI}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Criterio Ministerial para Clasificación de Personal:
            </div>
            <p className="text-[11px] text-slate-500">
              • <b>Nivel Rojo</b>: Voceros ancla, directivos bajo asedio de sanciones internacionales, operadores en zonas fronterizas con hostigamiento.<br/>
              • <b>Nivel Amarillo</b>: Personal técnico con requerimientos logísticos especiales o riesgo de deserción laboral.<br/>
              • <b>Nivel Verde</b>: Personal con estabilidad integral, condiciones logísticas plenamente cubiertas y baja exposición a guerra jurídica.
            </p>
          </div>
        </div>
      )}

      {/* Legacy Quick View: Matrices de Desinformación */}
      {activeMainTab === 'VISTA_RAPIDA_ALERTAS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Matrices de Opinión Pública y Campañas Negativas Detectadas
              </h3>
              <p className="text-xs text-slate-500">
                Monitoreo en tiempo real de guerra cognitiva y vectores narrativos contra el Estado.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {opinionAlerts.length} Alertas Activas
            </span>
          </div>

          <div className="space-y-3">
            {opinionAlerts.map((alert) => (
              <div 
                key={alert.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        alert.severidad === 'CRITICA' 
                          ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {alert.severidad}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        {alert.id} • {alert.tema}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {alert.matrizNarrativa}
                    </h4>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-rose-700 font-mono">
                      Virulencia: {alert.nivelVirulenciaPorc}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500">Canal de Origen:</span>{' '}
                    <span className="font-semibold text-slate-800">{alert.canalOrigen}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Tiempo Detección:</span>{' '}
                    <span className="font-semibold text-slate-800">{alert.tiempoDeteccionHoras} horas</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Ente Asignado:</span>{' '}
                    <span className="font-bold text-blue-700">{alert.enteAsignado}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-indigo-700">Vector de Contra-Narrativa Sugerido:</span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    {alert.contraNarrativaSugerida}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
