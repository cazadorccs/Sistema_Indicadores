import React, { useState, useMemo } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  TrendingUp,
  Search,
  Filter,
  Layers,
  ChevronRight,
  ExternalLink,
  Calculator,
  Building2,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import { SCIC_INDICATORS_DATA, ScicIndicator } from '../data/scicIndicators';

interface FrequencyComplianceBoardProps {
  onNavigateToCatalog?: () => void;
  onNavigateToCapture?: () => void;
}

type FrequencyTab = 'Diaria' | 'Semanal' | 'Mensual' | 'Estrategica';

export const FrequencyComplianceBoard: React.FC<FrequencyComplianceBoardProps> = ({
  onNavigateToCatalog,
  onNavigateToCapture
}) => {
  const [activeTab, setActiveTab] = useState<FrequencyTab>('Diaria');
  const [selectedEje, setSelectedEje] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Grouped indicators
  const indicatorsByTab = useMemo(() => {
    switch (activeTab) {
      case 'Diaria':
        return SCIC_INDICATORS_DATA.filter(i => i.frecuencia === 'Diaria');
      case 'Semanal':
        return SCIC_INDICATORS_DATA.filter(i => i.frecuencia === 'Semanal');
      case 'Mensual':
        return SCIC_INDICATORS_DATA.filter(i => i.frecuencia === 'Mensual');
      case 'Estrategica':
        return SCIC_INDICATORS_DATA.filter(i => !['Diaria', 'Semanal', 'Mensual'].includes(i.frecuencia));
    }
  }, [activeTab]);

  // Filtered by Eje and Search
  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return indicatorsByTab.filter(i => {
      const matchEje = selectedEje === 'TODOS' || i.eje === selectedEje;
      const matchSearch =
        !q ||
        i.codigo.toLowerCase().includes(q) ||
        i.nombre.toLowerCase().includes(q) ||
        i.ente.toLowerCase().includes(q);
      return matchEje && matchSearch;
    });
  }, [indicatorsByTab, selectedEje, searchQuery]);

  // Statistics for active tab
  const tabStats = useMemo(() => {
    const total = indicatorsByTab.length;
    const entesObligados = new Set(indicatorsByTab.map(i => i.ente)).size;
    // Simulated realistic compliance rate per frequency
    let cumplimientoPromedio = 88.5;
    if (activeTab === 'Diaria') cumplimientoPromedio = 94.2;
    else if (activeTab === 'Semanal') cumplimientoPromedio = 91.8;
    else if (activeTab === 'Mensual') cumplimientoPromedio = 87.4;
    else cumplimientoPromedio = 82.0;

    const optimos = Math.round(total * (cumplimientoPromedio / 100));
    const alertas = Math.round(total * 0.08);
    const criticos = Math.max(0, total - optimos - alertas);

    return { total, entesObligados, cumplimientoPromedio, optimos, alertas, criticos };
  }, [indicatorsByTab, activeTab]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-6">
      {/* Title & Tabs Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <Clock className="w-4 h-4" />
            </span>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 font-['Space_Grotesk']">
              Tablero de Cumplimiento por Frecuencia SCIC
            </h3>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">
              Oficial MPPCI
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Supervisión periódica de metas operativas por ciclos de reporte: <b>100 Diarios</b>, <b>90 Semanales</b> y <b>51 Mensuales</b>.
          </p>
        </div>

        {/* Frequency Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold gap-1 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('Diaria')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'Diaria'
                ? 'bg-white text-emerald-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Diario</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-800 rounded font-mono">100</span>
          </button>

          <button
            onClick={() => setActiveTab('Semanal')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'Semanal'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Semanal</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-blue-50 text-blue-800 rounded font-mono">90</span>
          </button>

          <button
            onClick={() => setActiveTab('Mensual')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'Mensual'
                ? 'bg-white text-purple-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Mensual</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-purple-50 text-purple-800 rounded font-mono">51</span>
          </button>

          <button
            onClick={() => setActiveTab('Estrategica')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'Estrategica'
                ? 'bg-white text-amber-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Estratégico</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-amber-50 text-amber-800 rounded font-mono">26</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview for Selected Frequency */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total and compliance */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-500">
            Cumplimiento {activeTab}
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1 flex items-baseline gap-1.5">
            <span>{tabStats.cumplimientoPromedio}%</span>
            <span className="text-[10px] text-emerald-600 font-sans font-semibold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> Meta lograda
            </span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${tabStats.cumplimientoPromedio}%` }}
            />
          </div>
        </div>

        {/* Card 2: Entes Obligados */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-500">
            Entes Responsables
          </div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1">
            {tabStats.entesObligados} entes
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Obligados a consignar corte {activeTab.toLowerCase()}
          </p>
        </div>

        {/* Card 3: Indicadores Activos */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-500">
            Métricas Monitoreadas
          </div>
          <div className="text-2xl font-bold font-mono text-purple-600 mt-1">
            {tabStats.total} KPIs
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Formulación técnica registrada en SCIC
          </p>
        </div>

        {/* Card 4: Semáforo del Ciclo */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-500">
            Semáforo de Estado
          </div>
          <div className="flex items-center space-x-3 mt-2 text-xs">
            <div className="flex items-center gap-1 font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{tabStats.optimos} Óptimos</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-amber-700">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>{tabStats.alertas} Alerta</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            {tabStats.criticos} críticos en riesgo de desfase
          </p>
        </div>
      </div>

      {/* Filter and Search Bar for Current Tab */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Buscar en ciclo ${activeTab.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={selectedEje}
            onChange={(e) => setSelectedEje(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="TODOS">Todos los Ejes (1 al 4)</option>
            <option value="Eje 1">Eje 1: Medios</option>
            <option value="Eje 2">Eje 2: Plataformas</option>
            <option value="Eje 3">Eje 3: Gestión</option>
            <option value="Eje 4">Eje 4: MIPCCI Central</option>
          </select>

          {onNavigateToCatalog && (
            <button
              onClick={onNavigateToCatalog}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-blue-200"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ver en Catálogo Maestro</span>
            </button>
          )}
        </div>
      </div>

      {/* List of Indicators in Selected Frequency */}
      <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
        {filteredList.slice(0, 15).map((ind, idx) => {
          // Dynamic simulated values based on index
          const baseScore = 80 + ((idx * 7) % 20);
          const isOptimo = baseScore >= 80;
          const isAlerta = baseScore >= 65 && baseScore < 80;

          return (
            <div
              key={ind.id}
              className="p-3 bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 max-w-lg">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold px-2 py-0.2 bg-blue-100 text-blue-800 rounded">
                    {ind.codigo}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/70 px-1.5 py-0.2 rounded">
                    {ind.eje}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate">
                    {ind.ente}
                  </span>
                </div>
                <div className="font-semibold text-slate-900 text-xs">
                  {ind.nombre}
                </div>
                <div className="text-[11px] text-slate-500 font-mono text-[10.5px]">
                  Fórmula: <span className="text-slate-700">{ind.formula}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 sm:self-center">
                <div className="text-right">
                  <div className="text-xs font-bold font-mono text-slate-900">
                    {baseScore}%
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      isOptimo
                        ? 'bg-emerald-100 text-emerald-800'
                        : isAlerta
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {isOptimo ? 'ÓPTIMO' : isAlerta ? 'EN ALERTA' : 'CRÍTICO'}
                  </span>
                </div>

                <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isOptimo ? 'bg-emerald-500' : isAlerta ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${baseScore}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredList.length > 15 && (
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-500">
            Mostrando 15 de <b>{filteredList.length}</b> indicadores del ciclo {activeTab.toLowerCase()}. Consulta el Catálogo Maestro para ver el detalle de los 267 indicadores.
          </p>
        </div>
      )}
    </div>
  );
};
