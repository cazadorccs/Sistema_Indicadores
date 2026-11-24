import React, { useState, useMemo, useEffect } from 'react';
import {
  Building2,
  Search,
  Filter,
  CheckSquare,
  Square,
  PlusCircle,
  MinusCircle,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Check,
  ChevronDown,
  Info,
  Sliders,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { SCIC_INDICATORS_DATA, ScicIndicator } from '../data/scicIndicators';
import { ENTES_MIPCCI } from '../data/mockData';
import {
  ENTE_ID_TO_SCIC_NAME,
  getDefaultIndicatorsForEnte,
  getIndicatorsForEnte,
  saveEnteCustomIndicatorIds,
  resetEnteCustomIndicatorIds,
  toggleEnteIndicator,
  getCustomEnteIndicatorIds
} from '../utils/enteIndicatorsMapping';
import { IndicatorModule } from '../types';

interface EnteChecklistManagerProps {
  onNavigateToCapture?: (enteId: string) => void;
  onNavigateToCatalog?: () => void;
  initialEnteId?: string;
}

export const EnteChecklistManager: React.FC<EnteChecklistManagerProps> = ({
  onNavigateToCapture,
  onNavigateToCatalog,
  initialEnteId
}) => {
  // Lista de entes con soporte SCIC
  const availableEntes = useMemo(() => {
    const validIds = Object.keys(ENTE_ID_TO_SCIC_NAME);
    return ENTES_MIPCCI.filter(e => validIds.includes(e.id));
  }, []);

  // Ente seleccionado
  const [selectedEnteId, setSelectedEnteId] = useState<string>(() => {
    if (initialEnteId && availableEntes.some(e => e.id === initialEnteId)) {
      return initialEnteId;
    }
    return availableEntes[0]?.id || 'VTV';
  });

  const [enteDropdownOpen, setEnteDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estados de filtro
  const [viewTab, setViewTab] = useState<'NO_MARCADOS' | 'MARCADOS' | 'TODOS'>('NO_MARCADOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEje, setSelectedEje] = useState<string>('TODOS');
  const [selectedFrecuencia, setSelectedFrecuencia] = useState<string>('TODAS');

  // Estado local sincronizado de IDs activos para el ente seleccionado
  const [activeIndicatorIds, setActiveIndicatorIds] = useState<string[]>(() => {
    const current = getIndicatorsForEnte(selectedEnteId);
    return current.map(i => i.id);
  });

  // Actualizar IDs cuando cambia el Ente seleccionado
  useEffect(() => {
    const current = getIndicatorsForEnte(selectedEnteId);
    setActiveIndicatorIds(current.map(i => i.id));
  }, [selectedEnteId]);

  // Ente actual
  const currentEnte = useMemo(() => {
    return availableEntes.find(e => e.id === selectedEnteId) || availableEntes[0];
  }, [selectedEnteId, availableEntes]);

  // Indicadores asignados por defecto según la matriz oficial SCIC
  const defaultIndicators = useMemo(() => {
    return getDefaultIndicatorsForEnte(selectedEnteId);
  }, [selectedEnteId]);

  const defaultIdsSet = useMemo(() => {
    return new Set(defaultIndicators.map(i => i.id));
  }, [defaultIndicators]);

  // Indicadores activos actuales en forma de Set
  const activeIdsSet = useMemo(() => {
    return new Set(activeIndicatorIds);
  }, [activeIndicatorIds]);

  // Indicadores que han sido agregados adicionalmente (no estaban en el default)
  const additionalAddedCount = useMemo(() => {
    return activeIndicatorIds.filter(id => !defaultIdsSet.has(id)).length;
  }, [activeIndicatorIds, defaultIdsSet]);

  // Indicadores por defecto que fueron desactivados
  const defaultRemovedCount = useMemo(() => {
    return defaultIndicators.filter(i => !activeIdsSet.has(i.id)).length;
  }, [defaultIndicators, activeIdsSet]);

  const isCustomized = additionalAddedCount > 0 || defaultRemovedCount > 0;

  // Filtrado de indicadores según pestaña y filtros
  const filteredIndicators = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return SCIC_INDICATORS_DATA.filter(ind => {
      const isMarked = activeIdsSet.has(ind.id);

      // Filtro por pestaña
      if (viewTab === 'NO_MARCADOS' && isMarked) return false;
      if (viewTab === 'MARCADOS' && !isMarked) return false;

      // Filtro por Eje
      if (selectedEje !== 'TODOS' && ind.eje !== selectedEje) return false;

      // Filtro por Frecuencia
      if (selectedFrecuencia !== 'TODAS' && ind.frecuencia !== selectedFrecuencia) return false;

      // Filtro por texto
      if (q) {
        const match =
          ind.codigo.toLowerCase().includes(q) ||
          ind.nombre.toLowerCase().includes(q) ||
          ind.descripcion.toLowerCase().includes(q) ||
          ind.formula.toLowerCase().includes(q) ||
          ind.ente.toLowerCase().includes(q) ||
          ind.dimension.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [viewTab, activeIdsSet, selectedEje, selectedFrecuencia, searchQuery]);

  // Listas únicas de ejes para el selector
  const ejesList = useMemo(() => {
    return Array.from(new Set(SCIC_INDICATORS_DATA.map(i => i.eje))).filter(Boolean).sort();
  }, []);

  // Función para activar / desactivar un indicador
  const handleToggle = (indicator: ScicIndicator) => {
    const newIds = toggleEnteIndicator(selectedEnteId, indicator.id);
    setActiveIndicatorIds(newIds);

    const isNowActive = newIds.includes(indicator.id);
    setToastMessage(
      isNowActive
        ? `Indicador ${indicator.codigo} activado para ${currentEnte.siglas}`
        : `Indicador ${indicator.codigo} desactivado para ${currentEnte.siglas}`
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Activar todos los indicadores visibles en la búsqueda
  const handleActivateAllVisible = () => {
    const visibleIds = filteredIndicators.map(i => i.id);
    const combined = Array.from(new Set([...activeIndicatorIds, ...visibleIds]));
    saveEnteCustomIndicatorIds(selectedEnteId, combined);
    setActiveIndicatorIds(combined);
    setToastMessage(`Se activaron ${visibleIds.length} indicadores para ${currentEnte.siglas}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Desactivar todos los indicadores visibles
  const handleDeactivateAllVisible = () => {
    const visibleIdsSet = new Set(filteredIndicators.map(i => i.id));
    const remaining = activeIndicatorIds.filter(id => !visibleIdsSet.has(id));
    saveEnteCustomIndicatorIds(selectedEnteId, remaining);
    setActiveIndicatorIds(remaining);
    setToastMessage(`Se desactivaron los indicadores seleccionados para ${currentEnte.siglas}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Restablecer al checklist oficial por defecto
  const handleResetToDefault = () => {
    resetEnteCustomIndicatorIds(selectedEnteId);
    const defaults = getDefaultIndicatorsForEnte(selectedEnteId);
    setActiveIndicatorIds(defaults.map(i => i.id));
    setToastMessage(`Checklist de ${currentEnte.siglas} restablecido a su matriz oficial SCIC`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-5 p-4 lg:p-6 bg-slate-50 min-h-screen">
      {/* Toast flotante */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 border border-emerald-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 text-xs animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. CABECERA INSTITUCIONAL */}
      <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                Parametrización Dinámica SCIC
              </span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs text-slate-500 font-mono">267 Indicadores Disponibles</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-blue-600" />
              <span>Gestión de Checklist de Indicadores por Ente</span>
            </h1>
            <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
              Active o desactive los indicadores requeridos para el corte semanal de cada Ente Adscrito. Permite que un ente reporte en un checklist específico, incorporando indicadores adicionales de otros ejes que no tenía asignados por defecto.
            </p>
          </div>

          {/* Selector de Ente */}
          <div className="relative shrink-0">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Seleccionar Ente Adscrito:
            </label>
            <button
              type="button"
              onClick={() => setEnteDropdownOpen(!enteDropdownOpen)}
              className="w-full sm:w-72 bg-slate-900 text-white px-3.5 py-2.5 rounded-xl border border-slate-700 flex items-center justify-between shadow-sm hover:bg-slate-800 transition-colors text-left"
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="truncate">
                  <div className="font-bold text-xs truncate">{currentEnte.siglas}</div>
                  <div className="text-[10px] text-slate-400 truncate">{currentEnte.nombre}</div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            </button>

            {/* Menú desplegable de Entes */}
            {enteDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 max-h-80 overflow-y-auto">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Entes del Sistema Nacional de Medios Públicos
                </div>
                {availableEntes.map(ente => (
                  <button
                    key={ente.id}
                    type="button"
                    onClick={() => {
                      setSelectedEnteId(ente.id);
                      setEnteDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-50 transition-colors ${
                      ente.id === selectedEnteId ? 'bg-blue-50/80 font-bold text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-semibold text-slate-900">{ente.siglas}</div>
                      <div className="text-[10px] text-slate-500 truncate">{ente.nombre}</div>
                    </div>
                    {ente.id === selectedEnteId && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2. TARJETA RESUMEN DEL ENTE SELECCIONADO */}
        <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-inner flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="font-bold text-base text-amber-400">{currentEnte.siglas}</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300 font-medium">{currentEnte.nombre}</span>
              <span className="px-2 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300 border border-slate-700">
                {currentEnte.tipo}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-3 flex-wrap">
              <span>Director / Responsable: <strong className="text-slate-200">{currentEnte.director}</strong></span>
              <span>•</span>
              <span>Sede: <strong className="text-slate-200">{currentEnte.region}</strong></span>
            </div>
          </div>

          {/* Estadísticas de Checklist */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/80 text-center min-w-[90px]">
              <div className="text-base font-black text-emerald-400">{activeIndicatorIds.length}</div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Activos</div>
            </div>
            <div className="bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/80 text-center min-w-[90px]">
              <div className="text-base font-black text-amber-400">{SCIC_INDICATORS_DATA.length - activeIndicatorIds.length}</div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">No Marcados</div>
            </div>
            {isCustomized ? (
              <button
                type="button"
                onClick={handleResetToDefault}
                className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Volver a los indicadores oficiales asignados a este ente"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restablecer</span>
              </button>
            ) : (
              <div className="px-2.5 py-1.5 bg-slate-800 text-slate-400 rounded-lg border border-slate-700 text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Matriz Estándar</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. BARRA DE HERRAMIENTAS Y PESTAÑAS DE VISTA */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
        {/* Pestañas de Vista */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setViewTab('NO_MARCADOS')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewTab === 'NO_MARCADOS'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>No Marcados (Disponibles para Activar)</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                viewTab === 'NO_MARCADOS' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-200 text-slate-700'
              }`}>
                {SCIC_INDICATORS_DATA.length - activeIndicatorIds.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewTab('MARCADOS')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewTab === 'MARCADOS'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Marcados en Checklist</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                viewTab === 'MARCADOS' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {activeIndicatorIds.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewTab('TODOS')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewTab === 'TODOS'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todos (Catálogo 267)</span>
            </button>
          </div>

          {/* Acciones en bloque */}
          <div className="flex items-center space-x-2">
            {viewTab === 'NO_MARCADOS' && filteredIndicators.length > 0 && (
              <button
                type="button"
                onClick={handleActivateAllVisible}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Activar Todos los Visibles ({filteredIndicators.length})</span>
              </button>
            )}

            {viewTab === 'MARCADOS' && filteredIndicators.length > 0 && (
              <button
                type="button"
                onClick={handleDeactivateAllVisible}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MinusCircle className="w-3.5 h-3.5" />
                <span>Desactivar Visibles</span>
              </button>
            )}

            {onNavigateToCatalog && (
              <button
                type="button"
                onClick={onNavigateToCatalog}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Explorar los 267 indicadores del catálogo maestro"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Catálogo Maestro (267)</span>
              </button>
            )}

            {onNavigateToCapture && (
              <button
                type="button"
                onClick={() => onNavigateToCapture(selectedEnteId)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                <span>Ir a Planilla de Captura</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Buscador y Filtros Secundarios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Búsqueda por texto */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código, nombre, dimensión o fórmula..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filtro por Eje */}
          <div>
            <select
              value={selectedEje}
              onChange={(e) => setSelectedEje(e.target.value)}
              aria-label="Filtrar por Eje SCIC"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="TODOS">Todos los Ejes SCIC</option>
              {ejesList.map(eje => (
                <option key={eje} value={eje}>{eje}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Frecuencia */}
          <div>
            <select
              value={selectedFrecuencia}
              onChange={(e) => setSelectedFrecuencia(e.target.value)}
              aria-label="Filtrar por Frecuencia"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="TODAS">Todas las Frecuencias</option>
              <option value="Semanal">Semanal (Corte Lunes 10 AM)</option>
              <option value="Diaria">Diaria</option>
              <option value="Mensual">Mensual</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. LISTADO DE INDICADORES EN CHECKLIST */}
      <div className="space-y-3">
        {filteredIndicators.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No se encontraron indicadores</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {viewTab === 'NO_MARCADOS'
                ? `Todos los indicadores coincidentes ya están marcados en el checklist de ${currentEnte.siglas}.`
                : 'Ajuste los filtros de búsqueda o cambie de pestaña.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5">
            {filteredIndicators.map((ind) => {
              const isMarked = activeIdsSet.has(ind.id);
              const isOriginalDefault = defaultIdsSet.has(ind.id);

              return (
                <div
                  key={ind.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs ${
                    isMarked
                      ? 'bg-white border-blue-200 ring-1 ring-blue-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-3.5">
                    {/* Checkbox grande */}
                    <button
                      type="button"
                      onClick={() => handleToggle(ind)}
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-colors shrink-0 ${
                        isMarked
                          ? 'bg-blue-600 text-white'
                          : 'border-2 border-slate-300 hover:border-blue-500 text-transparent'
                      }`}
                      title={isMarked ? 'Desmarcar de este Ente' : 'Marcar para este Ente'}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>

                    <div className="space-y-1">
                      {/* Cabecera del Indicador */}
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-800 border border-slate-200">
                          {ind.codigo}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{ind.nombre}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700">
                          {ind.eje}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          ind.frecuencia === 'Semanal'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : ind.frecuencia === 'Diaria'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {ind.frecuencia}
                        </span>

                        {isMarked && !isOriginalDefault && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>Activado Adicionalmente</span>
                          </span>
                        )}

                        {isMarked && isOriginalDefault && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600">
                            Matriz Oficial
                          </span>
                        )}
                      </div>

                      {/* Descripción */}
                      <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
                        {ind.descripcion}
                      </p>

                      {/* Detalles: Fórmula y Ente de Origen */}
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 flex-wrap pt-0.5">
                        <span>Dimensión: <strong className="text-slate-700">{ind.dimension}</strong></span>
                        <span>•</span>
                        <span>Fórmula: <code className="font-mono text-[10px] bg-slate-50 px-1 py-0.5 rounded text-slate-800 border border-slate-200">{ind.formula}</code></span>
                        <span>•</span>
                        <span className="italic text-slate-400">Origen Matriz Base: {ind.ente}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botón de Acción Directa */}
                  <div className="shrink-0 flex items-center space-x-2 pt-2 md:pt-0">
                    <button
                      type="button"
                      onClick={() => handleToggle(ind)}
                      className={`w-full md:w-auto px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                        isMarked
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isMarked ? (
                        <>
                          <MinusCircle className="w-3.5 h-3.5" />
                          <span>Desactivar</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Activar para {currentEnte.siglas}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
