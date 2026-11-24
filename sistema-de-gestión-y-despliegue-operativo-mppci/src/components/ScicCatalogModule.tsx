import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  BookOpen,
  Layers,
  Clock,
  Building2,
  Calculator,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  X,
  FileSpreadsheet,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Info,
  CheckSquare
} from 'lucide-react';
import { SCIC_INDICATORS_DATA, ScicIndicator } from '../data/scicIndicators';

interface ScicCatalogModuleProps {
  onNavigateToChecklist?: () => void;
}

export const ScicCatalogModule: React.FC<ScicCatalogModuleProps> = ({ onNavigateToChecklist }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEje, setSelectedEje] = useState<string>('TODOS');
  const [selectedEnte, setSelectedEnte] = useState<string>('TODOS');
  const [selectedFrecuencia, setSelectedFrecuencia] = useState<string>('TODAS');
  const [selectedDimension, setSelectedDimension] = useState<string>('TODAS');
  const [selectedIndicator, setSelectedIndicator] = useState<ScicIndicator | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Extract unique filters
  const ejesList = useMemo(() => {
    return Array.from(new Set(SCIC_INDICATORS_DATA.map(i => i.eje))).filter(Boolean).sort();
  }, []);

  const entesList = useMemo(() => {
    return Array.from(new Set(SCIC_INDICATORS_DATA.map(i => i.ente))).filter(Boolean).sort();
  }, []);

  const frecuenciasList = useMemo(() => {
    return Array.from(new Set(SCIC_INDICATORS_DATA.map(i => i.frecuencia))).filter(Boolean).sort();
  }, []);

  const dimensionesList = useMemo(() => {
    return Array.from(new Set(SCIC_INDICATORS_DATA.map(i => i.dimension))).filter(Boolean).sort();
  }, []);

  // Filter indicators
  const filteredIndicators = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return SCIC_INDICATORS_DATA.filter(ind => {
      const matchSearch =
        !q ||
        ind.codigo.toLowerCase().includes(q) ||
        ind.nombre.toLowerCase().includes(q) ||
        ind.descripcion.toLowerCase().includes(q) ||
        ind.formula.toLowerCase().includes(q) ||
        ind.variables.toLowerCase().includes(q) ||
        ind.ente.toLowerCase().includes(q);

      const matchEje = selectedEje === 'TODOS' || ind.eje === selectedEje;
      const matchEnte = selectedEnte === 'TODOS' || ind.ente === selectedEnte;
      const matchFrecuencia = selectedFrecuencia === 'TODAS' || ind.frecuencia === selectedFrecuencia;
      const matchDimension = selectedDimension === 'TODAS' || ind.dimension === selectedDimension;

      return matchSearch && matchEje && matchEnte && matchFrecuencia && matchDimension;
    });
  }, [searchTerm, selectedEje, selectedEnte, selectedFrecuencia, selectedDimension]);

  // Statistics
  const stats = useMemo(() => {
    const total = SCIC_INDICATORS_DATA.length;
    const eje1 = SCIC_INDICATORS_DATA.filter(i => i.eje.includes('1')).length;
    const eje2 = SCIC_INDICATORS_DATA.filter(i => i.eje.includes('2')).length;
    const eje3 = SCIC_INDICATORS_DATA.filter(i => i.eje.includes('3')).length;
    const eje4 = SCIC_INDICATORS_DATA.filter(i => i.eje.includes('4')).length;
    const diarias = SCIC_INDICATORS_DATA.filter(i => i.frecuencia === 'Diaria').length;
    const semanales = SCIC_INDICATORS_DATA.filter(i => i.frecuencia === 'Semanal').length;
    const mensuales = SCIC_INDICATORS_DATA.filter(i => i.frecuencia === 'Mensual').length;
    return { total, eje1, eje2, eje3, eje4, diarias, semanales, mensuales };
  }, []);

  const handleCopyFormula = (formula: string, code: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredIndicators, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Catalogo_SCIC_Indicadores_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getFrecuenciaBadge = (frec: string) => {
    switch (frec) {
      case 'Diaria':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Semanal':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Mensual':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Trimestral':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getEjeBadge = (eje: string) => {
    if (eje.includes('1')) return 'bg-sky-50 text-sky-700 border-sky-200';
    if (eje.includes('2')) return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    if (eje.includes('3')) return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-xs font-semibold backdrop-blur-md">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Matriz Consolidada Oficial SCIC &bull; Rectoría VSCC / MPPCI 2026 (267 Indicadores Sincronizados)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] tracking-tight">
              Catálogo Maestro de Indicadores SCIC
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Repositorio normativo de <b>267 indicadores exactos</b> de gestión y despliegue operativo, sincronizados con la Matriz Consolidada oficial. Incluye fórmulas matemáticas oficiales, variables primarias de medición y frecuencias de captura para los 4 Ejes y 29 Entes adscritos bajo la rectoría de la Vicepresidencia Sectorial de Comunicación y Cultura (VSCC).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onNavigateToChecklist && (
              <button
                onClick={onNavigateToChecklist}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
                title="Configurar y activar indicadores específicos por Ente Adscrito"
              >
                <CheckSquare className="w-4 h-4 text-white" />
                <span>Checklist por Ente</span>
              </button>
            )}
            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-md shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Selección ({filteredIndicators.length})</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total SCIC</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">{stats.total}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-sky-400 uppercase font-semibold">Eje 1: Medios</div>
            <div className="text-xl font-bold font-mono text-sky-300 mt-0.5">{stats.eje1}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-indigo-400 uppercase font-semibold">Eje 2: Plataformas</div>
            <div className="text-xl font-bold font-mono text-indigo-300 mt-0.5">{stats.eje2}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-rose-400 uppercase font-semibold">Eje 3: Gestión</div>
            <div className="text-xl font-bold font-mono text-rose-300 mt-0.5">{stats.eje3}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-amber-400 uppercase font-semibold">Eje 4: Central</div>
            <div className="text-xl font-bold font-mono text-amber-300 mt-0.5">{stats.eje4}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-emerald-400 uppercase font-semibold">Frec. Diaria</div>
            <div className="text-xl font-bold font-mono text-emerald-300 mt-0.5">{stats.diarias}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-blue-400 uppercase font-semibold">Frec. Semanal</div>
            <div className="text-xl font-bold font-mono text-blue-300 mt-0.5">{stats.semanales}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-[10px] text-purple-400 uppercase font-semibold">Frec. Mensual</div>
            <div className="text-xl font-bold font-mono text-purple-300 mt-0.5">{stats.mensuales}</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por código (ej. IAAE), nombre, fórmula, variables o ente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5 shrink-0">
            <span className="font-semibold text-slate-800 font-mono">{filteredIndicators.length}</span>
            <span>de</span>
            <span className="font-semibold text-slate-800 font-mono">{SCIC_INDICATORS_DATA.length}</span>
            <span>indicadores activos</span>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Eje Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Eje Estratégico:</label>
            <select
              value={selectedEje}
              onChange={(e) => setSelectedEje(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="TODOS">Todos los Ejes (4)</option>
              {ejesList.map(eje => (
                <option key={eje} value={eje}>{eje}</option>
              ))}
            </select>
          </div>

          {/* Ente Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ente / Viceministerio:</label>
            <select
              value={selectedEnte}
              onChange={(e) => setSelectedEnte(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer truncate"
            >
              <option value="TODOS">Todos los Entes ({entesList.length})</option>
              {entesList.map(ente => (
                <option key={ente} value={ente}>{ente}</option>
              ))}
            </select>
          </div>

          {/* Frecuencia Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Frecuencia de Captura:</label>
            <select
              value={selectedFrecuencia}
              onChange={(e) => setSelectedFrecuencia(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="TODAS">Todas las Frecuencias</option>
              {frecuenciasList.map(frec => (
                <option key={frec} value={frec}>{frec}</option>
              ))}
            </select>
          </div>

          {/* Dimension Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Dimensión / Bloque:</label>
            <select
              value={selectedDimension}
              onChange={(e) => setSelectedDimension(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer truncate"
            >
              <option value="TODAS">Todas las Dimensiones ({dimensionesList.length})</option>
              {dimensionesList.map(dim => (
                <option key={dim} value={dim}>{dim}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIndicators.map((ind) => (
          <div
            key={ind.id}
            onClick={() => setSelectedIndicator(ind)}
            className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              {/* Badges bar */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                  {ind.codigo}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getEjeBadge(ind.eje)}`}>
                    {ind.eje}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getFrecuenciaBadge(ind.frecuencia)}`}>
                    {ind.frecuencia}
                  </span>
                </div>
              </div>

              {/* Title & Dimension */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {ind.nombre}
                </h3>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{ind.ente}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                {ind.descripcion}
              </p>
            </div>

            {/* Formula Block */}
            <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-semibold flex items-center gap-1">
                  <Calculator className="w-3 h-3 text-blue-600" />
                  <span>Fórmula Oficial:</span>
                </span>
                <span className="text-[9px] text-blue-600 group-hover:underline">Ver detalle &rarr;</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 font-mono text-[11px] text-slate-800 break-all">
                {ind.formula}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIndicators.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Info className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No se encontraron indicadores</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Prueba ajustando los términos de búsqueda o restableciendo los filtros de Eje, Ente o Frecuencia.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedEje('TODOS');
              setSelectedEnte('TODOS');
              setSelectedFrecuencia('TODAS');
              setSelectedDimension('TODAS');
            }}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all cursor-pointer"
          >
            Restablecer Filtros
          </button>
        </div>
      )}

      {/* Modal Detail View */}
      {selectedIndicator && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-blue-600 text-white rounded-md shadow-xs">
                    {selectedIndicator.codigo}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getEjeBadge(selectedIndicator.eje)}`}>
                    {selectedIndicator.eje}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getFrecuenciaBadge(selectedIndicator.frecuencia)}`}>
                    {selectedIndicator.frecuencia}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] leading-tight">
                  {selectedIndicator.nombre}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedIndicator.ente} &bull; {selectedIndicator.dimension}
                </p>
              </div>

              <button
                onClick={() => setSelectedIndicator(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Description */}
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Descripción del Indicador:</h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedIndicator.descripcion}
                </p>
              </div>

              {/* Variables */}
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Variables de Medición Primarias:</h4>
                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-blue-900 font-mono text-[11px] leading-relaxed">
                  {selectedIndicator.variables}
                </div>
              </div>

              {/* Formula with Copy Button */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Calculator className="w-3.5 h-3.5 text-blue-600" />
                    <span>Fórmula de Cálculo Matemática:</span>
                  </h4>
                  <button
                    onClick={() => handleCopyFormula(selectedIndicator.formula, selectedIndicator.codigo)}
                    className="text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    {copiedCode === selectedIndicator.codigo ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copiada</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar Fórmula</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs shadow-inner">
                  {selectedIndicator.formula}
                </div>
              </div>

              {/* Metadata details */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Periodicidad</span>
                  <span className="font-semibold text-slate-800">{selectedIndicator.frecuencia}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Dimensión</span>
                  <span className="font-semibold text-slate-800">{selectedIndicator.dimension}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setSelectedIndicator(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
