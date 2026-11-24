import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Building2, 
  BarChart3, 
  Radio, 
  Tv, 
  ShieldCheck, 
  FileText, 
  Layers,
  Sparkles
} from 'lucide-react';
import { SCIC_INDICATORS_DATA, ScicIndicator } from '../data/scicIndicators';
import { IndicatorModule } from '../types';

export interface SearchItem {
  id: string;
  tipo: 'INDICADOR' | 'ENTE' | 'TABLERO' | 'MODULO';
  titulo: string;
  subtitulo: string;
  codigo?: string;
  moduloDestino: IndicatorModule;
  icono: any;
  categoriaColor: string;
  tags: string[];
}

interface PinpointerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (module: IndicatorModule, extraParams?: { indicadorCodigo?: string; enteId?: string }) => void;
}

export const PinpointerModal: React.FC<PinpointerModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Construcción del índice instantáneo en memoria
  const searchableIndex: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [];

    // Tableros Especializados
    items.push(
      {
        id: 'tab-clevel',
        tipo: 'TABLERO',
        titulo: 'Tablero C-Level Presidencial',
        subtitulo: '8 Macro-indicadores ejecutivos, diagnóstico con IA y refrendo ministerial SHA-256',
        codigo: 'C-LEVEL',
        moduloDestino: 'DASHBOARD_EXECUTIVE_CLEVEL',
        icono: BarChart3,
        categoriaColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
        tags: ['presidencia', 'ministro', 'resumen', 'macro', 'iec', 'irt', 'icd', 'ee', 'sello']
      },
      {
        id: 'tab-ciberdefensa',
        tipo: 'TABLERO',
        titulo: 'Sala Situacional y Ciberdefensa',
        subtitulo: 'Monitoreo de matrices de opinión, guerra híbrida y contranarrativas [DA-01]',
        codigo: 'CIBERDEFENSA',
        moduloDestino: 'DASHBOARD_CIBERDEFENSA',
        icono: ShieldCheck,
        categoriaColor: 'bg-rose-500/10 text-rose-700 border-rose-200',
        tags: ['amenazas', 'matrices', 'desinformacion', 'da-01', 'contranarrativa', 'sentimiento']
      },
      {
        id: 'tab-noc',
        tipo: 'TABLERO',
        titulo: 'NOC Telecomunicaciones e Infraestructura',
        subtitulo: 'Telemetría TDA, 6 Torres Críticas, enlace satelital Ku y MTTR',
        codigo: 'NOC-REDTV',
        moduloDestino: 'DASHBOARD_NOC',
        icono: Radio,
        categoriaColor: 'bg-blue-500/10 text-blue-700 border-blue-200',
        tags: ['redtv', 'tda', 'torres', 'banda ku', 'satelital', 'mttr', 'telemetria']
      },
      {
        id: 'tab-digital',
        tipo: 'TABLERO',
        titulo: 'Analítica Digital y Audiencias Transmedia',
        subtitulo: 'Funnel de conversión, alcance bruto, engagement y streaming concurrente',
        codigo: 'DIGITAL',
        moduloDestino: 'DASHBOARD_DIGITAL',
        icono: Layers,
        categoriaColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-200',
        tags: ['redes', 'streaming', 'youtube', 'tiktok', 'funnel', 'reach', 'engagement']
      },
      {
        id: 'tab-medios',
        tipo: 'TABLERO',
        titulo: 'Operatividad de Medios y Muro de Producción',
        subtitulo: 'Pases satelitales en vivo, notas de prensa y cuotas editoriales SNMP',
        codigo: 'MEDIOS-EJE1',
        moduloDestino: 'DASHBOARD_OPERATIVIDAD',
        icono: Tv,
        categoriaColor: 'bg-amber-500/10 text-amber-700 border-amber-200',
        tags: ['vtv', 'tves', 'rnv', 'correo', 'avn', 'pases en vivo', 'iaae', 'produccion']
      }
    );

    // Módulos Operativos Principales
    items.push(
      {
        id: 'mod-catalogo-scic',
        tipo: 'MODULO',
        titulo: 'Catálogo SCIC Oficial (267 Indicadores)',
        subtitulo: 'Fichas técnicas, fórmulas matemáticas, variables y ponderaciones del THAI/TIC',
        codigo: 'SCIC-267',
        moduloDestino: 'CATALOGO_SCIC',
        icono: FileText,
        categoriaColor: 'bg-violet-500/10 text-violet-700 border-violet-200',
        tags: ['catalogo', 'scic', 'formulas', 'fichas', 'metodologia', '267']
      },
      {
        id: 'mod-captura-ente',
        tipo: 'MODULO',
        titulo: 'Planilla de Captura Parametrizada por Ente',
        subtitulo: 'Formulario semanal oficial para directores de operaciones y salas de entes',
        codigo: 'CAPTURA',
        moduloDestino: 'CAPTURA',
        icono: Building2,
        categoriaColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200',
        tags: ['carga', 'formulario', 'captura', 'semanal', 'reporte', 'planilla']
      },
      {
        id: 'mod-checklists',
        tipo: 'MODULO',
        titulo: 'Gestión de Checklists por Ente Adscrito',
        subtitulo: 'Matriz dinámica de activación de indicadores por institución',
        codigo: 'CHECKLISTS',
        moduloDestino: 'CHECKLIST_ENTES',
        icono: Layers,
        categoriaColor: 'bg-teal-500/10 text-teal-700 border-teal-200',
        tags: ['checklist', 'personalizar', 'matriz', 'entes', 'asignacion']
      },
      {
        id: 'mod-auditoria-raci',
        tipo: 'MODULO',
        titulo: 'Auditoría Forense RACI y Trazabilidad',
        subtitulo: 'Log inmutable de firmas SHA-256, estados R, A, C, I y no-repudio',
        codigo: 'RACI-AUDIT',
        moduloDestino: 'AUDITORIA_RACI',
        icono: ShieldCheck,
        categoriaColor: 'bg-slate-500/10 text-slate-700 border-slate-200',
        tags: ['auditoria', 'raci', 'hashes', 'sha256', 'trazabilidad', 'firmas']
      }
    );

    // Entes Adscritos Clave
    const entes = [
      { id: 'REDTV', nombre: 'REDTV - Red de Transmisiones de Venezuela', eje: 'EJE_2_PLATAFORMAS' },
      { id: 'CONATEL', nombre: 'CONATEL - Telecomunicaciones y Espectro', eje: 'EJE_2_PLATAFORMAS' },
      { id: 'VTV', nombre: 'VTV - Venezolana de Televisión (Canal 8)', eje: 'EJE_1_MEDIOS' },
      { id: 'RNV', nombre: 'RNV - Radio Nacional de Venezuela', eje: 'EJE_1_MEDIOS' },
      { id: 'YVKE', nombre: 'YVKE Mundial - Circuito Radial', eje: 'EJE_1_MEDIOS' },
      { id: 'TELESUR', nombre: 'TELESUR - Señal Informativa Multiestatal', eje: 'EJE_1_MEDIOS' },
      { id: 'AVN', nombre: 'AVN - Agencia Venezolana de Noticias', eje: 'EJE_1_MEDIOS' },
      { id: 'CORREO_ORINOCO', nombre: 'Correo del Orinoco - Prensa Escrita', eje: 'EJE_1_MEDIOS' },
      { id: 'DGMIR', nombre: 'DGMIR - Monitoreo Informativo y Redes', eje: 'EJE_3_GESTION' }
    ];

    entes.forEach(ente => {
      items.push({
        id: `ente-${ente.id.toLowerCase()}`,
        tipo: 'ENTE',
        titulo: ente.nombre,
        subtitulo: `Ente rector adscrito • Gestión de indicadores y despliegue operativo`,
        codigo: ente.id,
        moduloDestino: ente.eje as IndicatorModule,
        icono: Building2,
        categoriaColor: 'bg-cyan-500/10 text-cyan-700 border-cyan-200',
        tags: ['ente', ente.id.toLowerCase(), ente.nombre.toLowerCase()]
      });
    });

    // Indicadores SCIC (267 Indicadores indexados en memoria)
    SCIC_INDICATORS_DATA.forEach(ind => {
      items.push({
        id: `ind-${ind.codigo.toLowerCase()}`,
        tipo: 'INDICADOR',
        titulo: `${ind.codigo} — ${ind.nombre}`,
        subtitulo: `Fórmula: ${ind.formula} • Dimensión: ${ind.dimension} • Frecuencia: ${ind.frecuencia}`,
        codigo: ind.codigo,
        moduloDestino: 'CATALOGO_SCIC',
        icono: Sparkles,
        categoriaColor: 'bg-purple-500/10 text-purple-700 border-purple-200',
        tags: [
          ind.codigo.toLowerCase(),
          ind.nombre.toLowerCase(),
          ind.formula.toLowerCase(),
          ind.dimension.toLowerCase(),
          ind.frecuencia.toLowerCase(),
          ind.ente.toLowerCase()
        ]
      });
    });

    return items;
  }, []);

  // 2. Filtrado instantáneo por prefijo y palabras clave (< 1ms)
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Si la consulta está vacía, mostrar tableros y módulos principales
      return searchableIndex.filter(i => i.tipo === 'TABLERO' || i.tipo === 'MODULO').slice(0, 8);
    }

    const tokens = q.split(/\s+/).filter(Boolean);

    return searchableIndex
      .filter(item => {
        const fullSearchable = `${item.codigo || ''} ${item.titulo} ${item.subtitulo} ${item.tags.join(' ')}`.toLowerCase();
        return tokens.every(token => fullSearchable.includes(token));
      })
      .slice(0, 15);
  }, [searchableIndex, query]);

  // Manejo de foco automático al abrir
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Manejo de teclado (Navegación con flechas, Enter y Escape)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredResults[selectedIndex];
      if (selected) {
        handleSelectItem(selected);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleSelectItem = (item: SearchItem) => {
    onNavigate(item.moduloDestino, {
      indicadorCodigo: item.tipo === 'INDICADOR' ? item.codigo : undefined,
      enteId: item.tipo === 'ENTE' ? item.codigo : undefined
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="pinpointer-modal-title"
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-slate-800 dark:text-slate-100"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <h2 id="pinpointer-modal-title" className="sr-only">
          Buscador instantáneo Pinpointer de indicadores SCIC, tableros y entes
        </h2>

        {/* Barra de Búsqueda Spotlight */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3 bg-slate-50/70 dark:bg-slate-950/50">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={filteredResults.length > 0}
            aria-controls="pinpointer-results-list"
            aria-label="Buscar entre 267 indicadores SCIC, tableros, entes o módulos"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Buscar entre 267 indicadores SCIC, tableros, entes o módulos (Ctrl+K)..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium outline-hidden text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Limpiar término de búsqueda"
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            ESC para salir
          </span>
        </div>

        {/* Lista de Resultados Instantáneos */}
        <div id="pinpointer-results-list" role="listbox" aria-label="Resultados de búsqueda" className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400 dark:text-slate-500">
              No se encontraron coincidencias para "{query}".
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const Icon = item.icono;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors duration-100 ${
                    isSelected 
                      ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 shadow-xs' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0 pr-3">
                    <div className={`p-2 rounded-lg border ${item.categoriaColor} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.titulo}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 ${item.categoriaColor}`}>
                          {item.tipo}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.subtitulo}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-blue-600 dark:text-blue-400 translate-x-0.5' : 'text-slate-300 dark:text-slate-600'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Guía de Navegación */}
        <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navegar</span>
            <span>↵ Abrir</span>
            <span>ESC Cerrar</span>
          </div>
          <div className="font-mono text-[10px] text-blue-600 dark:text-blue-400">
            Pinpointer Soberano • 267 Indicadores SCIC
          </div>
        </div>
      </div>
    </div>
  );
};
