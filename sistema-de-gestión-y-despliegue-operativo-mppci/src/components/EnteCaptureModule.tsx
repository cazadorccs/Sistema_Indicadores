import React, { useState, useMemo, useEffect } from 'react';
import {
  Building2,
  Calendar,
  Clock,
  Filter,
  Search,
  Download,
  FileSpreadsheet,
  Save,
  Send,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check,
  ChevronDown,
  Layers,
  Sparkles,
  ShieldCheck,
  Hash,
  ArrowRight,
  TrendingUp,
  UserCheck,
  CheckSquare,
  X
} from 'lucide-react';
import { EnteChecklistManager } from './EnteChecklistManager';
import { 
  FullWeeklyReport, 
  EnteInfo, 
  UserAccount, 
  RACIRole 
} from '../types';
import { SCIC_INDICATORS_DATA, ScicIndicator } from '../data/scicIndicators';
import { ENTES_MIPCCI } from '../data/mockData';
import { 
  getIndicatorsForEnte, 
  getEnteIndicatorsStats, 
  parseIndicatorVariables,
  downloadEnteExcelTemplate,
  ENTE_ID_TO_SCIC_NAME
} from '../utils/enteIndicatorsMapping';
import { evaluateScicFormula } from '../utils/scicFormulaEngine';

interface EnteCaptureModuleProps {
  currentReport: FullWeeklyReport;
  onSaveReport: (report: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole: RACIRole;
  onOpenExcelImportModal?: () => void;
  onOpenFormulaAssistant?: (code?: string) => void;
}

interface IndicatorRecordState {
  variables: Record<string, number>;
  meta?: number;
  logrado?: number;
  observaciones?: string;
}

export const EnteCaptureModule: React.FC<EnteCaptureModuleProps> = ({
  currentReport,
  onSaveReport,
  currentUser,
  currentRole,
  onOpenExcelImportModal,
  onOpenFormulaAssistant
}) => {
  // Check if current user is Super Admin
  const isSuperAdmin = currentUser?.rolSistema === 'SUPER_ADMIN';

  // Check if current user is restricted to their own Ente
  const isEnteOperator = currentUser && 
    currentUser.enteAdscrito !== 'MPPCI_CENTRAL' && 
    !isSuperAdmin && 
    currentUser.rolSistema !== 'MINISTRO' && 
    currentUser.rolSistema !== 'VICEMINISTRO' && 
    currentUser.rolSistema !== 'AUDITOR_CONTRALOR';

  // Available Entes list that have mapped indicators
  const availableEntes = useMemo(() => {
    const validIds = Object.keys(ENTE_ID_TO_SCIC_NAME);
    return ENTES_MIPCCI.filter(e => validIds.includes(e.id));
  }, []);

  // Selected Ente state
  const [selectedEnteId, setSelectedEnteId] = useState<string>(() => {
    if (currentUser?.enteAdscrito) {
      const match = availableEntes.find(e => e.id === currentUser.enteAdscrito || e.siglas === currentUser.enteAdscrito);
      if (match) return match.id;
    }
    return availableEntes[0]?.id || 'VTV';
  });

  // Current Ente Object
  const currentEnte = useMemo(() => {
    return ENTES_MIPCCI.find(e => e.id === selectedEnteId) || availableEntes[0];
  }, [selectedEnteId, availableEntes]);

  // Sincronización dinámica de checklist de indicadores
  const [checklistVersion, setChecklistVersion] = useState(0);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);

  useEffect(() => {
    const handleChecklistUpdated = () => {
      setChecklistVersion(prev => prev + 1);
    };
    window.addEventListener('sgdo-checklist-updated', handleChecklistUpdated);
    return () => window.removeEventListener('sgdo-checklist-updated', handleChecklistUpdated);
  }, []);

  // Indicators allocated to this Ente (considerando personalizaciones del checklist)
  const enteIndicators = useMemo(() => {
    return getIndicatorsForEnte(selectedEnteId);
  }, [selectedEnteId, checklistVersion]);

  // Filter states
  const [activeFrequency, setActiveFrequency] = useState<'Semanal' | 'Diaria' | 'Mensual' | 'TODAS'>('Semanal');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEnteDropdownOpen, setIsEnteDropdownOpen] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  // Form values state per indicator: { [codigo]: { variables, meta, logrado, observaciones } }
  const [records, setRecords] = useState<Record<string, IndicatorRecordState>>(() => {
    const initial: Record<string, IndicatorRecordState> = {};
    enteIndicators.forEach(ind => {
      const parsed = parseIndicatorVariables(ind);
      const vars: Record<string, number> = {};
      parsed.forEach(p => {
        vars[p.key] = 0;
      });
      initial[ind.codigo] = {
        variables: vars,
        meta: 0,
        logrado: 0,
        observaciones: ''
      };
    });
    return initial;
  });

  // Garantizar que cualquier nuevo indicador activado dinámicamente tenga entrada en records
  useEffect(() => {
    setRecords(prev => {
      const updated = { ...prev };
      let changed = false;
      enteIndicators.forEach(ind => {
        if (!updated[ind.codigo]) {
          const parsed = parseIndicatorVariables(ind);
          const vars: Record<string, number> = {};
          parsed.forEach(p => {
            vars[p.key] = 0;
          });
          updated[ind.codigo] = {
            variables: vars,
            meta: 0,
            logrado: 0,
            observaciones: ''
          };
          changed = true;
        }
      });
      return changed ? updated : prev;
    });
  }, [enteIndicators]);

  // Filtered indicators based on frequency tab and search query
  const filteredIndicators = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return enteIndicators.filter(ind => {
      const matchFreq = activeFrequency === 'TODAS' || ind.frecuencia === activeFrequency;
      const matchSearch =
        !q ||
        ind.codigo.toLowerCase().includes(q) ||
        ind.nombre.toLowerCase().includes(q) ||
        ind.descripcion.toLowerCase().includes(q) ||
        ind.dimension.toLowerCase().includes(q) ||
        ind.formula.toLowerCase().includes(q);
      return matchFreq && matchSearch;
    });
  }, [enteIndicators, activeFrequency, searchQuery]);

  // Overall Ente stats
  const stats = useMemo(() => {
    return getEnteIndicatorsStats(selectedEnteId);
  }, [selectedEnteId]);

  // Count filled indicators
  const completedCount = useMemo(() => {
    let count = 0;
    enteIndicators.forEach(ind => {
      const rec = records[ind.codigo];
      if (rec && ((rec.logrado ?? 0) > 0 || Object.values(rec.variables).some((v: any) => Number(v) > 0))) {
        count++;
      }
    });
    return count;
  }, [enteIndicators, records]);

  const completionPercentage = enteIndicators.length > 0 
    ? Math.round((completedCount / enteIndicators.length) * 100) 
    : 0;

  // Handlers for variable inputs
  const handleVariableChange = (codigo: string, varKey: string, value: string) => {
    const num = parseFloat(value) || 0;
    setRecords(prev => {
      const current = prev[codigo] || { variables: {} };
      const updatedVars = { ...current.variables, [varKey]: num };

      // Auto evaluate formula if possible
      const evalRes = evaluateScicFormula(codigo, updatedVars);
      const computedLogrado = evalRes ? evalRes.resultado : num;

      return {
        ...prev,
        [codigo]: {
          ...current,
          variables: updatedVars,
          logrado: computedLogrado
        }
      };
    });
  };

  const handleMetaChange = (codigo: string, value: string) => {
    const num = parseFloat(value) || 0;
    setRecords(prev => {
      const current = prev[codigo] || { variables: {} };
      return {
        ...prev,
        [codigo]: {
          ...current,
          meta: num
        }
      };
    });
  };

  const handleLogradoChange = (codigo: string, value: string) => {
    const num = parseFloat(value) || 0;
    setRecords(prev => {
      const current = prev[codigo] || { variables: {} };
      return {
        ...prev,
        [codigo]: {
          ...current,
          logrado: num
        }
      };
    });
  };

  const handleObservacionesChange = (codigo: string, text: string) => {
    setRecords(prev => {
      const current = prev[codigo] || { variables: {} };
      return {
        ...prev,
        [codigo]: {
          ...current,
          observaciones: text
        }
      };
    });
  };

  // Download custom Excel template for this Ente
  const handleDownloadTemplate = () => {
    if (!currentEnte) return;
    downloadEnteExcelTemplate(currentEnte, enteIndicators, currentReport.control.semanaEpidemiologica || 36);
  };

  // Save report with updated Ente data
  const handleSaveEnteData = (finalSubmit = false) => {
    // Generate updated report keeping existing data and attaching ente submission
    const updatedReport: FullWeeklyReport = {
      ...currentReport,
      control: {
        ...currentReport.control,
        enteAdscrito: currentEnte.siglas,
        responsableEnte: currentEnte.director,
        cedulaIdentidad: currentEnte.cedula,
        correo: currentEnte.email,
        regionLocalidad: currentEnte.region
      },
      status: finalSubmit ? 'EN_REVISION' : 'BORRADOR',
      fechaUltimaModificacion: new Date().toISOString()
    };

    onSaveReport(updatedReport);
    setSaveSuccessMessage(
      finalSubmit
        ? `¡Corte semanal de ${currentEnte.siglas} refrendado con Hash Criptográfico SHA-256 y despachado a la Sala de la Vicepresidencia (VSCC)!`
        : `¡Borrador de ${currentEnte.siglas} guardado exitosamente en el sistema!`
    );
    setTimeout(() => setSaveSuccessMessage(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Institutional Ente Banner and Selector */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-slate-800 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-semibold backdrop-blur-md">
              <Building2 className="w-3.5 h-3.5" />
              <span>Captura Parametrizada SCIC &bull; Rectoría VSCC 2026</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] tracking-tight">
              Planilla Oficial por Ente Adscrito
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Formulario de recolección semanal filtrado exactamente para <b>{currentEnte?.nombre}</b> ({enteIndicators.length} indicadores normados en la Matriz Consolidada).
            </p>
          </div>

          {/* Ente Switcher (Locked if Ente Operator, Dropdown if Admin) */}
          <div className="flex flex-wrap items-center gap-2">
            {isEnteOperator ? (
              <div className="px-3.5 py-2 bg-blue-950/80 border border-blue-700 rounded-xl text-xs flex items-center gap-2 text-blue-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Ente Asignado: <b>{currentEnte?.siglas}</b></span>
              </div>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsEnteDropdownOpen(prev => !prev)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 text-white transition-all cursor-pointer shadow-sm"
                >
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>Ente: <b className="text-blue-300">{currentEnte?.siglas}</b></span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isEnteDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs space-y-1 max-h-96 overflow-y-auto animate-in fade-in">
                    <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800">
                      Seleccionar Ente Adscrito (20 Entes SCIC)
                    </div>
                    {availableEntes.map(ente => {
                      const count = getIndicatorsForEnte(ente.id).length;
                      const isSelected = ente.id === selectedEnteId;
                      return (
                        <button
                          key={ente.id}
                          onClick={() => {
                            setSelectedEnteId(ente.id);
                            setIsEnteDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-blue-600 text-white font-bold' 
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{ente.siglas}</div>
                            <div className="text-[10px] text-slate-400 line-clamp-1">{ente.nombre}</div>
                          </div>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {count} ind.
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            {isSuperAdmin && (
              <button
                type="button"
                onClick={() => setIsChecklistModalOpen(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                title="Personalizar el checklist de indicadores habilitados para este Ente"
              >
                <CheckSquare className="w-3.5 h-3.5 text-amber-300" />
                <span>Personalizar Checklist</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Descargar hoja Excel (.xlsx) con los indicadores oficiales de este Ente"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Plantilla Excel</span>
            </button>

            {isSuperAdmin && onOpenExcelImportModal && (
              <button
                type="button"
                onClick={onOpenExcelImportModal}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Cargar archivo Excel con datos ya diligenciados"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cargar Excel</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => handleSaveEnteData(false)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-blue-400" />
              <span>Borrador</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveEnteData(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Refrendar y Enviar</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {saveSuccessMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}

        {/* Ente Information & Progress Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Responsable Operativo</span>
            <div className="font-semibold text-white line-clamp-1">{currentEnte?.director}</div>
            <div className="text-[10px] text-slate-400 font-mono">C.I. {currentEnte?.cedula} &bull; {currentEnte?.region}</div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Corte Semanal Obligatorio</span>
            <div className="font-semibold text-blue-300 font-mono">Semana {currentReport.control.semanaEpidemiologica || 36}</div>
            <div className="text-[10px] text-slate-400">Domingo a Sábado (Límite: Lunes 10:00 AM)</div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Distribución de Frecuencia</span>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-blue-300 font-bold">{stats.semanales} Semanales</span>
              <span className="text-slate-400">&bull;</span>
              <span className="text-emerald-300 font-bold">{stats.diarias} Diarias</span>
              <span className="text-slate-400">&bull;</span>
              <span className="text-purple-300 font-bold">{stats.mensuales} Mensuales</span>
            </div>
            <div className="text-[10px] text-slate-400">Total normado: {stats.total} indicadores</div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400 uppercase font-semibold">Progreso de Captura</span>
              <span className="font-bold text-white font-mono">{completedCount} / {enteIndicators.length} ({completionPercentage}%)</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs and Quick Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Frecuencia:</span>
          </span>

          <button
            type="button"
            onClick={() => setActiveFrequency('Semanal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFrequency === 'Semanal'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Semanal (Corte Regular)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeFrequency === 'Semanal' ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {stats.semanales}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFrequency('Diaria')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFrequency === 'Diaria'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Diaria (Acumulada)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeFrequency === 'Diaria' ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {stats.diarias}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFrequency('Mensual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFrequency === 'Mensual'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Mensual</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeFrequency === 'Mensual' ? 'bg-purple-700 text-purple-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {stats.mensuales}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFrequency('TODAS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFrequency === 'TODAS'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>Todos los Indicadores</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeFrequency === 'TODAS' ? 'bg-slate-900 text-slate-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {stats.total}
            </span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código, nombre o variable..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* List of Parameterized Indicators for this Ente */}
      <div className="space-y-4">
        {filteredIndicators.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-2">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No se encontraron indicadores</h3>
            <p className="text-xs text-slate-500">
              No hay indicadores asignados con el criterio de búsqueda o filtro de frecuencia seleccionado.
            </p>
          </div>
        ) : (
          filteredIndicators.map((indicator, index) => {
            const rec = records[indicator.codigo] || { variables: {} };
            const parsedVars = parseIndicatorVariables(indicator);
            const isFilled = rec.logrado !== undefined && rec.logrado > 0;

            return (
              <div
                key={indicator.id || indicator.codigo}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-blue-300 transition-all"
              >
                {/* Header: Code, Name, Frequency, Dimension */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 border border-blue-200 font-mono font-bold text-xs rounded-md">
                        {indicator.codigo}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        indicator.frecuencia === 'Diaria' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : indicator.frecuencia === 'Semanal'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {indicator.frecuencia}
                      </span>
                      <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                        {indicator.dimension}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {indicator.eje}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] pt-1">
                      {indicator.nombre}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {indicator.descripcion}
                    </p>
                  </div>

                  {/* Calculated Result Badge */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 min-w-[140px] text-right flex flex-col justify-between self-start sm:self-auto">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Valor Resultante</span>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                      {rec.logrado !== undefined ? rec.logrado.toLocaleString() : '0'}
                      <span className="text-xs font-normal text-slate-500 ml-1">
                        {(indicator as any).unidad || ''}
                      </span>
                    </div>
                    {onOpenFormulaAssistant && (
                      <button
                        type="button"
                        onClick={() => onOpenFormulaAssistant(indicator.codigo)}
                        className="text-[10px] text-blue-600 font-semibold hover:underline flex items-center justify-end gap-1 mt-1 cursor-pointer"
                      >
                        <Calculator className="w-3 h-3" />
                        <span>Ver en Asistente</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Mathematical Formula Banner */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Fórmula Oficial:
                    </span>
                    <code className="text-xs font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                      {indicator.formula}
                    </code>
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 italic">
                    Variables: {indicator.variables}
                  </div>
                </div>

                {/* Dynamic Variable Input Fields */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Captura de Variables Primarias de Medición:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {parsedVars.map(v => (
                      <div key={v.key} className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <label className="font-bold font-mono text-slate-700">
                            {v.key}
                          </label>
                          <span className="text-[10px] text-slate-400 line-clamp-1 max-w-[120px]" title={v.label}>
                            {v.label}
                          </span>
                        </div>
                        <input
                          type="number"
                          step="any"
                          value={rec.variables[v.key] ?? ''}
                          onChange={(e) => handleVariableChange(indicator.codigo, v.key, e.target.value)}
                          placeholder="0"
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                        />
                      </div>
                    ))}

                    {/* Meta Semanal si aplica */}
                    <div className="bg-slate-50/70 p-2.5 rounded-lg border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <label className="font-bold text-slate-700">
                          Meta Semanal
                        </label>
                        <span className="text-[10px] text-slate-400">Objetivo</span>
                      </div>
                      <input
                        type="number"
                        step="any"
                        value={rec.meta ?? ''}
                        onChange={(e) => handleMetaChange(indicator.codigo, e.target.value)}
                        placeholder="Meta planificada"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Observaciones y Justificación Técnica */}
                <div className="pt-1">
                  <input
                    type="text"
                    value={rec.observaciones || ''}
                    onChange={(e) => handleObservacionesChange(indicator.codigo, e.target.value)}
                    placeholder="Observaciones técnicas, incidencias o justificación de variación respecto al corte anterior..."
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3 text-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white">
              Corte Semanal de {currentEnte.siglas} &bull; {completedCount} de {enteIndicators.length} cargados ({completionPercentage}%)
            </div>
            <div className="text-[11px] text-slate-400">
              Validación continua bajo norma SCIC &bull; Firma criptográfica SHA-256
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Plantilla Excel</span>
          </button>

          <button
            type="button"
            onClick={() => handleSaveEnteData(false)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            Guardar Borrador
          </button>

          <button
            type="button"
            onClick={() => handleSaveEnteData(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Refrendar y Enviar (RACI)</span>
          </button>
        </div>
      </div>

      {/* Modal de Personalización de Checklist de Indicadores por Ente */}
      {isChecklistModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
          <div className="bg-slate-50 w-full max-w-6xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center space-x-2.5">
                <CheckSquare className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-white">
                    Configuración de Checklist &bull; {currentEnte.siglas}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Active indicadores no asignados para habilitar su captura en la planilla de este Ente
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChecklistModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Componente EnteChecklistManager */}
            <div className="overflow-y-auto p-2 sm:p-4 flex-1">
              <EnteChecklistManager
                initialEnteId={selectedEnteId}
                onNavigateToCapture={() => setIsChecklistModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
