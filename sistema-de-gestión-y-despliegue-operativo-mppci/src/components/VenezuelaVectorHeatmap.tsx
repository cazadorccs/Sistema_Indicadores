import React, { useState, useMemo, useRef } from 'react';
import { 
  Layers, 
  Globe, 
  MapPin, 
  Radio, 
  Tv, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Sliders, 
  Download, 
  RefreshCw, 
  Search, 
  Filter, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight,
  Sparkles,
  Database,
  Building2,
  X
} from 'lucide-react';
import { MunicipalityData, CriticalTowerStatus, OpinionMatrixAlert } from '../types';
import { 
  VENEZUELA_STATES_VECTORS, 
  VENEZUELA_MUNICIPAL_VECTORS,
  VECTOR_COVERAGE_NODES, 
  IGVSB_SERVICE_CONFIG, 
  StateVectorGeo, 
  MunicipalityVectorGeo,
  VectorCoverageNode 
} from '../data/venezuelaGeoData';
import { 
  VENEZUELA_DISPUTED_ZONES, 
  DisputedZoneVectorGeo 
} from '../data/venezuelaDisputedZones';
import { 
  VENEZUELA_SOBREPOSICION_VECTORS 
} from '../data/venezuelaSobreposicion';

interface VenezuelaVectorHeatmapProps {
  municipalities?: MunicipalityData[];
  criticalTowers?: CriticalTowerStatus[];
  opinionAlerts?: OpinionMatrixAlert[];
  onSelectMunicipality?: (muni: MunicipalityData) => void;
  onOpenCounterNarrative?: (alert: OpinionMatrixAlert) => void;
}

export const VenezuelaVectorHeatmap: React.FC<VenezuelaVectorHeatmapProps> = ({
  municipalities = [],
  criticalTowers = [],
  opinionAlerts = [],
  onSelectMunicipality,
  onOpenCounterNarrative
}) => {
  // View mode: Vector Map vs Grid Matrix
  const [viewMode, setViewMode] = useState<'MAP' | 'GRID'>('MAP');

  // Layer toggles
  const [activeLayers, setActiveLayers] = useState<{ [key: string]: boolean }>({
    'capa-limites-estados': true,
    'capa-zonas-sobreposicion': true,
    'capa-limites-municipios': true,
    'capa-zonas-reclamacion': true,
    'capa-cobertura-rtv': true,
    'capa-nodos-redtv': true,
    'capa-penetracion-net': false,
    'capa-alertas-tempranas': true,
    'capa-medios-comunitarios': false,
    'capa-malla-geodesica': false,
  });

  // Layer opacity
  const [layerOpacity, setLayerOpacity] = useState<number>(0.92);

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Map theme
  const [mapTheme, setMapTheme] = useState<'IGVSB_OFICIAL' | 'DARK_OPS' | 'TOPOGRAFICO'>('IGVSB_OFICIAL');

  // Search and state filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('TODOS');

  // Tooltip & Selected Entity State
  const [hoveredState, setHoveredState] = useState<StateVectorGeo | null>(null);
  const [hoveredMuni, setHoveredMuni] = useState<MunicipalityVectorGeo | null>(null);
  const [hoveredDisputedZone, setHoveredDisputedZone] = useState<DisputedZoneVectorGeo | null>(null);
  const [hoveredNode, setHoveredNode] = useState<VectorCoverageNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedEntity, setSelectedEntity] = useState<StateVectorGeo | null>(null);
  const [selectedDisputedZone, setSelectedDisputedZone] = useState<DisputedZoneVectorGeo | null>(null);
  const [selectedMuniModal, setSelectedMuniModal] = useState<MunicipalityData | null>(null);

  // IGVSB Metadata Modal
  const [showIGVSBModal, setShowIGVSBModal] = useState<boolean>(false);
  const [isSyncingIGVSB, setIsSyncingIGVSB] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const statesList = useMemo(() => {
    return Array.from(new Set((municipalities || []).map(m => m.estado))).filter(Boolean).sort();
  }, [municipalities]);

  const filteredMunicipalities = useMemo(() => {
    const q = (searchQuery || '').toLowerCase();
    const sf = (selectedStateFilter || '').toLowerCase();
    return (municipalities || []).filter(m => {
      const st = (m.estado || '').toLowerCase();
      const nm = (m.nombre || '').toLowerCase();
      const matchState = selectedStateFilter === 'TODOS' || st.includes(sf);
      const matchSearch = !q || 
        nm.includes(q) || 
        (m.codigoINE || '').includes(searchQuery) ||
        st.includes(q);
      return matchState && matchSearch;
    });
  }, [municipalities, selectedStateFilter, searchQuery]);

  const isZeroState = useMemo(() => {
    return !municipalities || municipalities.length === 0 || municipalities.every(m => (m.coberturaEfectivaRadioTV || 0) === 0);
  }, [municipalities]);

  const muniDataMap = useMemo(() => {
    const map = new Map<string, MunicipalityData>();
    (municipalities || []).forEach(m => {
      if (m.codigoINE) map.set(m.codigoINE, m);
      if (m.nombre) {
        const clean = m.nombre.toLowerCase().replace(/municipio\s+/gi, '').trim();
        map.set(clean, m);
      }
    });
    return map;
  }, [municipalities]);

  const handleToggleLayer = (layerId: string) => {
    setActiveLayers(prev => ({ ...prev, [layerId]: !prev[layerId] }));
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.3, 3.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.3, 0.7));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only primary click
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Sync with IGVSB Service Simulation
  const handleSyncIGVSB = () => {
    setIsSyncingIGVSB(true);
    setTimeout(() => {
      setIsSyncingIGVSB(false);
      setSyncMessage('¡Capas vectoriales actualizadas exitosamente desde el IDEGEO IGVSB (Servicio 7 - SIRGAS-REGVEN)!');
      setTimeout(() => setSyncMessage(null), 4000);
    }, 1200);
  };

  // Export GeoJSON
  const handleExportGeoJSON = () => {
    const geoJsonObject = {
      type: "FeatureCollection",
      metadata: {
        proveedor: "Instituto Geográfico de Venezuela Simón Bolívar (IGVSB)",
        servicio: "https://igvsb.gob.ve/servicio/7",
        sistemaReferencia: "SIRGAS-REGVEN (EPSG:4326)",
        fechaGeneracion: new Date().toISOString(),
        totalEntidades: VENEZUELA_STATES_VECTORS.length,
        totalNodosREDTV: VECTOR_COVERAGE_NODES.length
      },
      features: VENEZUELA_STATES_VECTORS.map(st => ({
        type: "Feature",
        properties: {
          codigoINE: st.codigoINE,
          nombre: st.nombre,
          capital: st.capital,
          region: st.region,
          poblacion: st.poblacion,
          coberturaPromedioRTV: st.coberturaPromedioRTV,
          penetracionInternetPromedio: st.penetracionInternetPromedio,
          estatus: st.estatus
        },
        geometry: {
          type: "Polygon",
          coordinates: [[st.latLng[1], st.latLng[0]]]
        }
      }))
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geoJsonObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `IGVSB_CAPA_VECTORIAL_VENEZUELA_${new Date().toISOString().split('T')[0]}.geojson`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Color generator for state vectors depending on active thematic layer
  const getStateColor = (state: StateVectorGeo) => {
    if (state.esZonaSobreposicion) {
      return '#ef4444';
    }

    const stateMunis = (municipalities || []).filter(m => (m.estado || '').toLowerCase() === (state.nombre || '').toLowerCase());
    const liveAvgRTV = stateMunis.length > 0
      ? stateMunis.reduce((acc, m) => acc + (m.coberturaEfectivaRadioTV || 0), 0) / stateMunis.length
      : (isZeroState ? 0 : state.coberturaPromedioRTV);
    const liveAvgNet = stateMunis.length > 0
      ? stateMunis.reduce((acc, m) => acc + (m.penetracionInternet || 0), 0) / stateMunis.length
      : (isZeroState ? 0 : state.penetracionInternetPromedio);

    if (isZeroState || liveAvgRTV <= 0) {
      return mapTheme === 'DARK_OPS' ? '#334155' : '#94a3b8';
    }

    if (activeLayers['capa-penetracion-net'] && !activeLayers['capa-cobertura-rtv']) {
      // Internet penetration gradient (Cyan/Blue)
      const val = liveAvgNet;
      if (val >= 80) return mapTheme === 'DARK_OPS' ? '#0284c7' : '#0ea5e9';
      if (val >= 65) return mapTheme === 'DARK_OPS' ? '#0369a1' : '#38bdf8';
      if (val >= 50) return mapTheme === 'DARK_OPS' ? '#075985' : '#7dd3fc';
      return mapTheme === 'DARK_OPS' ? '#0c4a6e' : '#bae6fd';
    }

    if (activeLayers['capa-cobertura-rtv']) {
      // R/TV Coverage traffic-light coropleth
      const val = liveAvgRTV;
      if (val >= 90) return mapTheme === 'DARK_OPS' ? '#059669' : '#10b981'; // Green Optimal
      if (val >= 75) return mapTheme === 'DARK_OPS' ? '#10b981' : '#34d399'; // Green Good
      if (val >= 60) return mapTheme === 'DARK_OPS' ? '#d97706' : '#f59e0b'; // Amber Alert
      return mapTheme === 'DARK_OPS' ? '#dc2626' : '#ef4444'; // Red Critical
    }

    // Default neutral administrative vector
    return mapTheme === 'DARK_OPS' ? '#334155' : '#cbd5e1';
  };

  const getBorderColor = () => {
    if (mapTheme === 'DARK_OPS') return '#1e293b';
    return '#ffffff';
  };

  const handleSelectMuniFromVector = (muni: MunicipalityVectorGeo) => {
    const cleanName = (muni.nombre || '').toLowerCase().replace(/municipio\s+/gi, '').trim();
    const liveMuni = muniDataMap.get(muni.codigoINE) || muniDataMap.get(cleanName);
    const rtvVal = isZeroState ? 0 : (liveMuni ? liveMuni.coberturaEfectivaRadioTV : muni.coberturaEfectivaRadioTV);
    const netVal = isZeroState ? 0 : (liveMuni ? liveMuni.penetracionInternet : muni.penetracionInternet);

    const found: MunicipalityData = liveMuni ? {
      ...liveMuni,
      coberturaEfectivaRadioTV: rtvVal,
      penetracionInternet: netVal
    } : {
      id: muni.id,
      codigoINE: muni.codigoINE,
      nombre: muni.nombre,
      estado: muni.estado,
      region: 'N/D',
      poblacion: 0,
      hogares: 0,
      coberturaEfectivaRadioTV: rtvVal,
      penetracionInternet: netVal,
      transmisoresTDA: rtvVal > 0 ? 1 : 0,
      emisorasRadiales: rtvVal > 0 ? 4 : 0,
      mediosComunitariosActivos: 0,
      torreTransmisionCercana: 'N/D',
      tdaDisponible: rtvVal > 0,
      bandaKuDisponible: rtvVal > 0,
      alertasActivas: 0,
      estatusSenal: rtvVal <= 0 ? 'CRITICO' : (rtvVal >= 75 ? 'OPTIMO' : rtvVal >= 60 ? 'ESTABLE' : 'VULNERABLE'),
      estatus: (rtvVal <= 0 ? 'CRITICO' : rtvVal >= 75 ? 'OPTIMO' : rtvVal >= 60 ? 'ESTABLE' : 'VULNERABLE') as any,
      ultimaActualizacion: new Date().toLocaleDateString('es-VE')
    };
    setSelectedMuniModal(found);
    if (onSelectMunicipality) onSelectMunicipality(found);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
      
      {/* Top Header Bar with IGVSB Official Badge & Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded font-mono font-bold flex items-center space-x-1">
              <Globe className="w-3 h-3 text-blue-400 mr-1" />
              <span>IGVSB IDEGEO · SERVICIO 7</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono font-semibold">
              SIRGAS-REGVEN (EPSG:4326)
            </span>
            <span className="text-[10px] text-slate-400">335 Municipios · 24 Entidades</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mt-1 font-['Space_Grotesk'] flex items-center space-x-2">
            <span>Mapa de Calor Vectorial: Cobertura Efectiva Municipal</span>
          </h3>
          <p className="text-xs text-slate-300">
            Capas vectoriales georreferenciadas integradas con la Infraestructura de Datos Espaciales del IGVSB.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setViewMode('MAP')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'MAP'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Mapa Vectorial</span>
            </button>
            <button
              onClick={() => setViewMode('GRID')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                viewMode === 'GRID'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Cuadrícula (335)</span>
            </button>
          </div>

          {/* Quick Layer Toggles: Estados & Municipios */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => handleToggleLayer('capa-limites-estados')}
              title={activeLayers['capa-limites-estados'] ? 'Desactivar Capa de Estados' : 'Activar Capa de Estados'}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeLayers['capa-limites-estados']
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Estados</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                activeLayers['capa-limites-estados'] ? 'bg-blue-700 text-blue-100' : 'bg-slate-700 text-slate-400'
              }`}>
                24
              </span>
            </button>

            <button
              onClick={() => handleToggleLayer('capa-limites-municipios')}
              title={activeLayers['capa-limites-municipios'] ? 'Desactivar Capa de Municipios' : 'Activar Capa de Municipios'}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeLayers['capa-limites-municipios']
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Municipios</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                activeLayers['capa-limites-municipios'] ? 'bg-sky-700 text-sky-100' : 'bg-slate-700 text-slate-400'
              }`}>
                335
              </span>
            </button>

            <button
              onClick={() => handleToggleLayer('capa-zonas-reclamacion')}
              title={activeLayers['capa-zonas-reclamacion'] ? 'Desactivar Zonas en Reclamación' : 'Activar Zonas en Reclamación'}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeLayers['capa-zonas-reclamacion']
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              <span>Zonas Reclamación</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                activeLayers['capa-zonas-reclamacion'] ? 'bg-amber-700 text-amber-100' : 'bg-slate-700 text-slate-400'
              }`}>
                {VENEZUELA_DISPUTED_ZONES.filter(z => z.tipo === 'DISPUTA_INTERESTATAL' || z.tipo === 'RECLAMACION_INTERNACIONAL').length}
              </span>
            </button>

            <button
              onClick={() => handleToggleLayer('capa-zonas-sobreposicion')}
              title={activeLayers['capa-zonas-sobreposicion'] ? 'Desactivar Zonas de Sobreposición' : 'Activar Zonas de Sobreposición (50 Polígonos cod_ent: "00")'}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeLayers['capa-zonas-sobreposicion']
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span>Sobreposición</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                activeLayers['capa-zonas-sobreposicion'] ? 'bg-red-700 text-red-100' : 'bg-slate-700 text-slate-400'
              }`}>
                {VENEZUELA_SOBREPOSICION_VECTORS.length}
              </span>
            </button>
          </div>

          {/* Layer Control Drawer Button */}
          <button
            onClick={() => setIsLayerPanelOpen(!isLayerPanelOpen)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all cursor-pointer ${
              isLayerPanelOpen 
                ? 'bg-blue-600 border-blue-500 text-white' 
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
            title="Abrir panel de control de capas vectoriales"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Capas ({Object.values(activeLayers).filter(Boolean).length})</span>
          </button>

          {/* Sync IGVSB */}
          <button
            onClick={handleSyncIGVSB}
            disabled={isSyncingIGVSB}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
            title="Sincronizar con el Servicio 7 del IGVSB"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncingIGVSB ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sincronizar IGVSB</span>
          </button>

          {/* Export GeoJSON */}
          <button
            onClick={handleExportGeoJSON}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
            title="Descargar capa en formato estándar GeoJSON"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Exportar GeoJSON</span>
          </button>

          {/* Info IGVSB */}
          <button
            onClick={() => setShowIGVSBModal(true)}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl text-xs transition-all cursor-pointer"
            title="Metadatos oficiales del Servicio 7 IGVSB"
          >
            <Info className="w-4 h-4 text-blue-300" />
          </button>
        </div>
      </div>

      {/* Sync Success Banner */}
      {syncMessage && (
        <div className="bg-emerald-900/80 border-b border-emerald-600/50 p-2.5 px-4 text-xs text-emerald-200 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{syncMessage}</span>
          </div>
          <button onClick={() => setSyncMessage(null)} className="text-emerald-300 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filter and Legend Bar */}
      <div className="p-3 sm:px-5 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        
        {/* Search & State Filter */}
        <div className="flex flex-wrap items-center gap-2 flex-1 max-w-xl">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar municipio, estado o código INE..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStateFilter}
              onChange={e => setSelectedStateFilter(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="TODOS">Todas las Entidades ({statesList.length})</option>
              {statesList.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Map Semaphoric Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <span className="font-semibold text-slate-600">Escala Coroplética:</span>
          <span className="flex items-center text-slate-700">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm mr-1.5 shadow-xs" />
            Óptimo (≥75%)
          </span>
          <span className="flex items-center text-slate-700">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm mr-1.5 shadow-xs" />
            Alerta (60–74%)
          </span>
          <span className="flex items-center text-slate-700">
            <span className="w-2.5 h-2.5 bg-rose-500 rounded-sm mr-1.5 shadow-xs" />
            Crítico (&lt;60%)
          </span>
          <span className="flex items-center text-amber-700 font-medium">
            <span className="w-2.5 h-2.5 bg-amber-400 border border-amber-600 border-dashed rounded-sm mr-1.5 shadow-xs inline-block" />
            Zonas en Reclamación
          </span>
          <span className="flex items-center text-sky-700 font-medium">
            <span className="w-2.5 h-2.5 bg-sky-500/60 border border-sky-600 rounded-sm mr-1.5 shadow-xs inline-block" />
            Lago de Maracaibo
          </span>
          <span className="flex items-center text-red-700 font-semibold">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-sm mr-1.5 shadow-xs inline-block ring-1 ring-red-300" />
            Sobreposición ({VENEZUELA_SOBREPOSICION_VECTORS.length})
          </span>
        </div>
      </div>

      {/* Main Map Body Area */}
      <div className="relative flex-1 min-h-[520px] bg-slate-950 flex overflow-hidden" ref={mapContainerRef}>
        
        {/* Layer Manager Floating Drawer */}
        {isLayerPanelOpen && (
          <div className="absolute top-3 left-3 z-30 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl p-4 text-xs text-slate-200 space-y-3.5 animate-in slide-in-from-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white font-['Space_Grotesk']">Control de Capas IGVSB</span>
              </div>
              <button 
                onClick={() => setIsLayerPanelOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of layers */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {IGVSB_SERVICE_CONFIG.capasDisponibles.map(capa => {
                const isActive = activeLayers[capa.id] ?? false;
                return (
                  <div
                    key={capa.id}
                    onClick={() => handleToggleLayer(capa.id)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-start justify-between space-x-2 ${
                      isActive 
                        ? 'bg-blue-950/60 border-blue-500/50 text-white' 
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: capa.color }}
                        />
                        <span className="font-bold text-[11px] leading-snug">{capa.nombre}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight pl-4">{capa.descripcion}</p>
                    </div>

                    <div className="shrink-0 mt-0.5">
                      {isActive ? (
                        <Eye className="w-4 h-4 text-blue-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Opacity Slider */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Opacidad de Capa Vectorial:</span>
                <span className="font-mono text-blue-400 font-bold">{Math.round(layerOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={layerOpacity}
                onChange={e => setLayerOpacity(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
              />
            </div>

            {/* Theme Selector */}
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Estilo Cartográfico:</span>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'IGVSB_OFICIAL', label: 'Oficial' },
                  { id: 'DARK_OPS', label: 'Dark Ops' },
                  { id: 'TOPOGRAFICO', label: 'Satélite' },
                ].map(th => (
                  <button
                    key={th.id}
                    onClick={() => setMapTheme(th.id as any)}
                    className={`py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      mapTheme === th.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Map View Controls (Zoom in / out / reset) */}
        {viewMode === 'MAP' && (
          <div className="absolute top-3 right-3 z-20 flex flex-col space-y-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-1.5 shadow-xl">
            <button
              onClick={handleZoomIn}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Acercar (Zoom In)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Alejar (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Restablecer Vista"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Geodetic Grid Metadata Pill on bottom left */}
        <div className="absolute bottom-3 left-3 z-20 bg-slate-900/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-400 flex items-center space-x-3 pointer-events-none">
          <span>CRS: EPSG:4326</span>
          <span>Escala Vectorial: 1:250.000</span>
          <span>Zoom: {(zoomLevel * 100).toFixed(0)}%</span>
        </div>

        {/* VIEW MODE 1: INTERACTIVE SVG VECTOR MAP */}
        {viewMode === 'MAP' ? (
          <div 
            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              viewBox="0 0 900 650"
              className="w-full h-full max-h-[600px] transition-transform duration-75"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                transformOrigin: 'center center'
              }}
            >
              <defs>
                {/* Geodetic Grid Pattern */}
                <pattern id="geodetic-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                </pattern>

                {/* Ocean / Maritime Pattern */}
                <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#080e1a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                {/* Pulsing ring for nodes */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Diagonal stripes for Disputed / Claim Zones */}
                <pattern id="hatch-amber" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#f59e0b" strokeWidth="2.4" opacity="0.85" />
                </pattern>
                <pattern id="hatch-orange" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#f97316" strokeWidth="2.4" opacity="0.85" />
                </pattern>
                <pattern id="lake-cyan" width="24" height="24" patternUnits="userSpaceOnUse">
                  <rect width="24" height="24" fill="#0284c7" fillOpacity="0.45" />
                  <path d="M 0 12 Q 6 8 12 12 T 24 12" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.4" />
                </pattern>
                <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Ocean Rect */}
              <rect width="900" height="650" fill="url(#oceanGrad)" />

              {/* Geodetic Grid Layer if active */}
              {activeLayers['capa-malla-geodesica'] && (
                <g opacity="0.6">
                  <rect width="900" height="650" fill="url(#geodetic-grid)" />
                  {/* Meridian & Parallel Labels calibrated to official IGVSB EPSG:4326/4189 */}
                  <text x="40" y="52" fill="#64748b" fontSize="9" fontFamily="monospace">12°N - Cabo San Román</text>
                  <text x="40" y="248" fill="#64748b" fontSize="9" fontFamily="monospace">08°N - Los Llanos / Orinoco</text>
                  <text x="40" y="443" fill="#64748b" fontSize="9" fontFamily="monospace">04°N - Amazonas / Guayana</text>
                  <text x="146" y="635" fill="#64748b" fontSize="9" fontFamily="monospace">72°W</text>
                  <text x="437" y="635" fill="#64748b" fontSize="9" fontFamily="monospace">66°W</text>
                  <text x="728" y="635" fill="#64748b" fontSize="9" fontFamily="monospace">60°W</text>
                </g>
              )}

              {/* CAPA 1 & 2: VENEZUELA FEDERAL STATES VECTOR POLYGONS */}
              {activeLayers['capa-limites-estados'] && (
                <g id="capa-estados-poligonos" opacity={layerOpacity}>
                  {VENEZUELA_STATES_VECTORS.map(st => {
                    const isHovered = hoveredState?.id === st.id;
                    const isSelected = selectedEntity?.id === st.id;
                    const fillColor = getStateColor(st);
                    const strokeColor = isHovered || isSelected ? '#38bdf8' : getBorderColor();
                    const strokeWidth = isHovered || isSelected ? 2.5 : 1;
                    const isEsequibo = st.id === 'VE-Y';

                    return (
                      <g key={st.id} id={`state-group-${st.id}`} data-state={st.nombre}>
                        <path
                          id={`state-path-${st.id}`}
                          data-state-id={st.id}
                          data-state-name={st.nombre}
                          d={st.path}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          className="transition-all duration-150 cursor-pointer"
                          style={{
                            filter: isHovered ? 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.6))' : undefined
                          }}
                          onMouseEnter={() => setHoveredState(st)}
                          onMouseLeave={() => setHoveredState(null)}
                          onClick={() => setSelectedEntity(st)}
                        >
                          <title>{st.nombre} (INE: {st.codigoINE}) - Cobertura: {st.coberturaPromedioRTV}%</title>
                        </path>

                        {/* State Labels & INE Codes / Official Measurements */}
                        {isEsequibo ? (
                          <g className="pointer-events-none drop-shadow-md select-none">
                            <text
                              x={st.centroid[0]}
                              y={st.centroid[1] - 8}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="9.5"
                              fontWeight="bold"
                              className="font-sans"
                            >
                              Guayana Esequiba
                            </text>
                            <text
                              x={st.centroid[0]}
                              y={st.centroid[1] + 4}
                              textAnchor="middle"
                              fill="#93c5fd"
                              fontSize="8"
                              fontWeight="semibold"
                              className="font-sans"
                            >
                              Estado (INE: 9900)
                            </text>
                            <text
                              x={st.centroid[0]}
                              y={st.centroid[1] + 16}
                              textAnchor="middle"
                              fill={isZeroState || st.coberturaPromedioRTV <= 0 ? '#cbd5e1' : st.coberturaPromedioRTV >= 75 ? '#86efac' : st.coberturaPromedioRTV >= 60 ? '#fde047' : '#fca5a5'}
                              fontSize="8.5"
                              fontWeight="bold"
                              className="font-mono"
                            >
                              {isZeroState ? '0%' : `${st.coberturaPromedioRTV}%`}
                            </text>
                          </g>
                        ) : (
                          <>
                            <text
                              x={st.centroid[0]}
                              y={st.centroid[1]}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="9"
                              fontWeight="bold"
                              className="pointer-events-none drop-shadow-md select-none font-sans"
                            >
                              {st.nombre.split(' ')[0]}
                            </text>
                            <text
                              x={st.centroid[0]}
                              y={st.centroid[1] + 10}
                              textAnchor="middle"
                              fill={st.coberturaPromedioRTV >= 75 ? '#86efac' : st.coberturaPromedioRTV >= 60 ? '#fde047' : '#fca5a5'}
                              fontSize="8"
                              fontWeight="bold"
                              className="pointer-events-none drop-shadow-md select-none font-mono"
                            >
                              {st.coberturaPromedioRTV}%
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </g>
              )}

              {/* CAPA: ZONAS DE SOBREPOSICIÓN DE JURISDICCIÓN (50 POLÍGONOS cod_ent: "00") EN COLOR ROJO */}
              {activeLayers['capa-zonas-sobreposicion'] && (
                <g id="capa-sobreposicion-poligonos" opacity={layerOpacity}>
                  {VENEZUELA_SOBREPOSICION_VECTORS.map(st => {
                    const isHovered = hoveredState?.id === st.id;
                    const isSelected = selectedEntity?.id === st.id;
                    const strokeColor = isHovered || isSelected ? '#ffffff' : '#991b1b';
                    const strokeWidth = isHovered || isSelected ? 2.5 : 1.2;

                    return (
                      <g key={st.id} id={`sobreposicion-group-${st.id}`} data-sobreposicion={st.nombre}>
                        <path
                          id={`sobreposicion-path-${st.id}`}
                          data-state-id={st.id}
                          data-state-name={st.nombre}
                          d={st.path}
                          fill="#ef4444"
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          className="transition-all duration-150 cursor-pointer"
                          style={{
                            filter: isHovered 
                              ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.95))' 
                              : 'drop-shadow(0 0 2px rgba(185, 28, 28, 0.6))'
                          }}
                          onMouseEnter={() => setHoveredState(st)}
                          onMouseLeave={() => setHoveredState(null)}
                          onClick={() => setSelectedEntity(st)}
                        >
                          <title>{st.nombre} (cod_ent: 00 - Zona de Sobreposición) - Superficie: {st.superficieKm2} km²</title>
                        </path>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* CAPA 2: VENEZUELA MUNICIPALITIES VECTOR POLYGONS (335 MUNICIPIOS OFICIALES IGVSB 1:250.000) */}
              {activeLayers['capa-limites-municipios'] && (
                <g id="capa-municipios-poligonos">
                  {VENEZUELA_MUNICIPAL_VECTORS.map(muni => {
                    const isHovered = hoveredMuni?.id === muni.id;
                    const isStateActive = activeLayers['capa-limites-estados'];
                    const cleanName = (muni.nombre || '').toLowerCase().replace(/municipio\s+/gi, '').trim();
                    const liveMuni = muniDataMap.get(muni.codigoINE) || muniDataMap.get(cleanName);
                    const liveVal = isZeroState ? 0 : (liveMuni 
                      ? (activeLayers['capa-penetracion-net'] ? liveMuni.penetracionInternet : liveMuni.coberturaEfectivaRadioTV)
                      : (activeLayers['capa-penetracion-net'] ? muni.penetracionInternet : muni.coberturaEfectivaRadioTV));

                    const muniColor = liveVal <= 0 ? '#94a3b8' : liveVal >= 75 ? '#10b981' : liveVal >= 60 ? '#f59e0b' : '#ef4444';

                    const fillColor = isStateActive 
                      ? (isHovered ? 'rgba(56, 189, 248, 0.35)' : 'transparent') 
                      : muniColor;
                    const strokeColor = isHovered 
                      ? '#38bdf8' 
                      : (isStateActive ? 'rgba(255, 255, 255, 0.32)' : '#0ea5e9');
                    const strokeWidth = isHovered ? 2.2 : (isStateActive ? 0.65 : 1);

                    return (
                      <g key={muni.id} id={`muni-group-${muni.id}`} data-muni={muni.nombre}>
                        <path
                          id={`muni-path-${muni.id}`}
                          data-muni-id={muni.id}
                          data-muni-name={muni.nombre}
                          d={muni.path}
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          className="transition-all duration-75 cursor-pointer"
                          style={{
                            filter: isHovered ? 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.7))' : undefined
                          }}
                          onMouseEnter={() => setHoveredMuni(muni)}
                          onMouseLeave={() => setHoveredMuni(null)}
                          onClick={() => handleSelectMuniFromVector(muni)}
                        >
                          <title>{muni.nombre} ({muni.estado}) - Cobertura: {liveVal}%</title>
                        </path>
                      </g>
                    );
                  })}
                </g>
              )}



              {/* CAPA: ZONAS EN RECLAMACIÓN Y DISPUTAS LIMÍTROFES INTERESTATALES */}
              {activeLayers['capa-zonas-reclamacion'] && (
                <g id="capa-zonas-reclamacion" opacity={layerOpacity}>
                  {VENEZUELA_DISPUTED_ZONES.filter(z => z.tipo === 'DISPUTA_INTERESTATAL' || z.tipo === 'RECLAMACION_INTERNACIONAL').map(zone => {
                    const isHovered = hoveredDisputedZone?.id === zone.id;
                    const isSelected = selectedDisputedZone?.id === zone.id;

                    return (
                      <g 
                        key={zone.id} 
                        id={`disputed-zone-${zone.id}`}
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredDisputedZone(zone)}
                        onMouseLeave={() => setHoveredDisputedZone(null)}
                        onClick={() => setSelectedDisputedZone(zone)}
                      >
                        {/* Background translucent tint */}
                        <path
                          d={zone.path}
                          fill={zone.color}
                          fillOpacity={isHovered ? 0.35 : 0.18}
                        />

                        {/* Solid border without hatch stripes */}
                        <path
                          d={zone.path}
                          fill="transparent"
                          stroke={isHovered || isSelected ? '#38bdf8' : getBorderColor()}
                          strokeWidth={isHovered || isSelected ? 2.5 : 1.2}
                          className="transition-all duration-75"
                        >
                          <title>{zone.nombre}</title>
                        </path>

                        {/* Centroid Badge / Indicator */}
                        <g transform={`translate(${zone.centroid[0]}, ${zone.centroid[1]})`}>
                          <text
                            y={-7}
                            textAnchor="middle"
                            fill="#60a5fa"
                            fontSize="8"
                            fontWeight="bold"
                            className="pointer-events-none drop-shadow-md select-none font-sans"
                          >
                            Estado Guayana Esequiba · 159.542 km²
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* CAPA 3: TRANSMISSION NODES & TDA COVERAGE BUFFERS */}
              {activeLayers['capa-nodos-redtv'] && (
                <g id="capa-nodos-redtv">
                  {VECTOR_COVERAGE_NODES.map(node => {
                    const isHovered = hoveredNode?.id === node.id;
                    return (
                      <g 
                        key={node.id} 
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        {/* Coverage radius buffer circle (suppressed in zero state) */}
                        {!isZeroState && (
                          <circle
                            cx={node.coordenadasSvg[0]}
                            cy={node.coordenadasSvg[1]}
                            r={node.radioSvg}
                            fill={node.tipo === 'TELEPUERTO_KU' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(59, 130, 246, 0.15)'}
                            stroke={node.tipo === 'TELEPUERTO_KU' ? '#818cf8' : '#60a5fa'}
                            strokeWidth="1"
                            strokeDasharray="4,3"
                          />
                        )}

                        {/* Node point marker */}
                        <circle
                          cx={node.coordenadasSvg[0]}
                          cy={node.coordenadasSvg[1]}
                          r={isHovered ? 7 : 5}
                          fill={isZeroState ? '#64748b' : (node.operativo ? '#3b82f6' : '#ef4444')}
                          stroke="#ffffff"
                          strokeWidth="2"
                          className={isZeroState ? 'transition-all' : 'transition-all animate-pulse'}
                        />

                        {/* Radio Icon / Symbol */}
                        <circle
                          cx={node.coordenadasSvg[0]}
                          cy={node.coordenadasSvg[1]}
                          r={1.8}
                          fill="#ffffff"
                        />
                      </g>
                    );
                  })}
                </g>
              )}

              {/* CAPA 5: ALERTA DE MATRICES DE OPINIÓN GEORREFERENCIADAS */}
              {activeLayers['capa-alertas-tempranas'] && (
                <g id="capa-alertas-tempranas">
                  {(opinionAlerts || []).map((alert, idx) => {
                    // Assign positions according to alert source or state
                    const alertState = ((alert as any).estadoAfectado || alert.titulo || '').toLowerCase();
                    const matchedState = VENEZUELA_STATES_VECTORS.find(v => (v.nombre || '').toLowerCase().includes(alertState));
                    const coords: [number, number] = matchedState 
                      ? matchedState.centroid 
                      : (idx === 0 ? [395, 125] : idx === 1 ? [390, 130] : [340, 140]);

                    return (
                      <g key={alert.id} className="cursor-pointer">
                        <circle
                          cx={coords[0]}
                          cy={coords[1] - 8}
                          r={10}
                          fill="rgba(239, 68, 68, 0.25)"
                          className="animate-ping"
                        />
                        <circle
                          cx={coords[0]}
                          cy={coords[1] - 8}
                          r={5}
                          fill="#ef4444"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>

            {/* DYNAMIC FLOATING TOOLTIP */}
            {hoveredState && (
              <div
                className="absolute z-40 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-3 shadow-2xl text-xs text-slate-200 pointer-events-none space-y-1.5 min-w-[220px]"
                style={{
                  left: Math.min(tooltipPos.x + 15, (mapContainerRef.current?.clientWidth || 600) - 240),
                  top: Math.max(tooltipPos.y - 120, 15)
                }}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 gap-2">
                  <span className="font-bold text-white text-sm truncate">{hoveredState.nombre}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border shrink-0 ${
                    hoveredState.esZonaSobreposicion || hoveredState.id?.startsWith('ZS-')
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  }`}>
                    {hoveredState.esZonaSobreposicion || hoveredState.id?.startsWith('ZS-')
                      ? 'cod_ent: 00'
                      : `INE: ${hoveredState.codigoINE}`}
                  </span>
                </div>
                {hoveredState.esZonaSobreposicion || hoveredState.id?.startsWith('ZS-') ? (
                  <div className="bg-red-500/15 border border-red-500/30 rounded p-2 text-[10.5px] text-red-200 font-medium space-y-1">
                    <div className="text-red-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
                      Zona de Sobreposición de Jurisdicción
                    </div>
                    {hoveredState.denominacionOficial && (
                      <div className="text-[10px] text-slate-300">{hoveredState.denominacionOficial}</div>
                    )}
                    {hoveredState.estadosInvolucrados && (
                      <div className="text-[10px] text-red-300">
                        <b className="text-red-200">Jurisdicciones:</b> {hoveredState.estadosInvolucrados}
                      </div>
                    )}
                    {hoveredState.superficieKm2 && (
                      <div className="text-[10px] text-red-300 font-mono">
                        <b className="text-red-200">Superficie:</b> {hoveredState.superficieKm2.toLocaleString()} km²
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {hoveredState.id === 'VE-Y' && (
                      <div className="bg-blue-500/15 border border-blue-500/30 rounded p-1.5 text-[10.5px] text-blue-300 font-semibold space-y-0.5">
                        <div className="text-blue-200 font-bold">Estado Guayana Esequiba</div>
                        <div className="text-[9.5px] text-blue-300/90 font-mono">Superficie Oficial: 159.542 km²</div>
                        <div className="text-[9px] text-slate-400">Ley Orgánica para la Defensa de la Guayana Esequiba</div>
                      </div>
                    )}
                    <div className="space-y-1 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Capital:</span>
                        <span className="font-semibold text-slate-200">{hoveredState.capital}</span>
                      </div>
                      {hoveredState.superficieKm2 && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">Superficie:</span>
                          <span className="font-mono font-bold text-amber-300">{hoveredState.superficieKm2.toLocaleString()} km²</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cobertura R/TV:</span>
                        <span className={`font-mono font-bold ${isZeroState ? 'text-slate-400' : hoveredState.coberturaPromedioRTV >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {isZeroState ? '0.0%' : `${hoveredState.coberturaPromedioRTV}%`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Penetración Net:</span>
                        <span className="font-mono font-semibold text-blue-400">{isZeroState ? '0.0%' : `${hoveredState.penetracionInternetPromedio}%`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Población Base:</span>
                        <span className="font-mono text-slate-300">{hoveredState.poblacion.toLocaleString()} hab.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Municipios:</span>
                        <span className="font-semibold text-slate-300">{hoveredState.totalMunicipios} Municipios</span>
                      </div>
                    </div>
                    <div className="pt-1 text-[10px] text-blue-400 font-semibold text-right">
                      Clic para ver desglose municipal →
                    </div>
                  </>
                )}
              </div>
            )}

            {/* MUNICIPALITY FLOATING TOOLTIP */}
            {hoveredMuni && (
              <div
                className="absolute z-40 bg-slate-900/95 backdrop-blur-md border border-sky-500/60 rounded-xl p-3 shadow-2xl text-xs text-slate-200 pointer-events-none space-y-1.5 min-w-[240px]"
                style={{
                  left: Math.min(tooltipPos.x + 15, (mapContainerRef.current?.clientWidth || 600) - 260),
                  top: Math.max(tooltipPos.y - 130, 15)
                }}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-bold text-white text-sm">{hoveredMuni.nombre}</span>
                  </div>
                  <span className="text-[10px] font-mono bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded border border-sky-500/40">
                    INE: {hoveredMuni.codigoINE}
                  </span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estado:</span>
                    <span className="font-semibold text-slate-200">{hoveredMuni.estado}</span>
                  </div>
                  {hoveredMuni.capital && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Capital:</span>
                      <span className="font-semibold text-slate-300">{hoveredMuni.capital}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cobertura Radio/TV:</span>
                    <span className={`font-mono font-bold ${isZeroState ? 'text-slate-400' : (muniDataMap.get(hoveredMuni.codigoINE)?.coberturaEfectivaRadioTV ?? hoveredMuni.coberturaEfectivaRadioTV) >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {isZeroState ? 0 : (muniDataMap.get(hoveredMuni.codigoINE)?.coberturaEfectivaRadioTV ?? hoveredMuni.coberturaEfectivaRadioTV)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Penetración Internet:</span>
                    <span className="font-mono font-semibold text-blue-400">{isZeroState ? 0 : (muniDataMap.get(hoveredMuni.codigoINE)?.penetracionInternet ?? hoveredMuni.penetracionInternet)}%</span>
                  </div>
                </div>
                <div className="pt-1 text-[10px] text-sky-400 font-semibold text-right">
                  Clic para abrir ficha técnica completa →
                </div>
              </div>
            )}

            {/* NODE FLOATING TOOLTIP */}
            {hoveredNode && (
              <div
                className="absolute z-40 bg-slate-900/95 backdrop-blur-md border border-blue-500/50 rounded-xl p-3 shadow-2xl text-xs text-slate-200 pointer-events-none space-y-1 min-w-[210px]"
                style={{
                  left: Math.min(tooltipPos.x + 15, (mapContainerRef.current?.clientWidth || 600) - 230),
                  top: Math.max(tooltipPos.y - 100, 15)
                }}
              >
                <div className="font-bold text-white flex items-center space-x-1.5 pb-1 border-b border-slate-800">
                  <Radio className="w-3.5 h-3.5 text-blue-400" />
                  <span>{hoveredNode.nombre}</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tipo:</span>
                    <span className="font-semibold text-indigo-300">{hoveredNode.tipo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Potencia Banda Ku/TDA:</span>
                    <span className={`font-mono font-bold ${isZeroState ? 'text-slate-400' : 'text-emerald-400'}`}>
                      {isZeroState ? '0.0 kW (Inactivo)' : `${hoveredNode.potenciaKw || 10} kW`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Radio de Cobertura:</span>
                    <span className="font-mono text-slate-200">{isZeroState ? '0 km' : `${hoveredNode.radioKm} km`}</span>
                  </div>
                </div>
              </div>
            )}

            {/* DISPUTED ZONE FLOATING TOOLTIP */}
            {hoveredDisputedZone && (
              <div
                className="absolute z-40 bg-slate-900/95 backdrop-blur-md border border-amber-500/70 rounded-xl p-3.5 shadow-2xl text-xs text-slate-200 pointer-events-none space-y-1.5 min-w-[270px] max-w-xs"
                style={{
                  left: Math.min(tooltipPos.x + 15, (mapContainerRef.current?.clientWidth || 600) - 290),
                  top: Math.max(tooltipPos.y - 130, 15)
                }}
              >
                <div className="flex items-start justify-between gap-2 pb-1.5 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold text-white text-xs leading-snug">{hoveredDisputedZone.nombre}</span>
                  </div>
                  <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40 shrink-0">
                    {hoveredDisputedZone.codigoOficial}
                  </span>
                </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Entidades:</span>
                  <span className="font-semibold text-amber-300">{(hoveredDisputedZone.estadosInvolucrados || []).join(' - ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{hoveredDisputedZone.tipo === 'RECLAMACION_INTERNACIONAL' ? 'Superficie Oficial:' : 'Superficie Aprox:'}</span>
                  <span className="font-mono text-slate-200">{hoveredDisputedZone.superficieAproxKm2.toLocaleString()} km²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cobertura R/TV:</span>
                  <span className={`font-mono font-bold ${isZeroState ? 'text-slate-400' : hoveredDisputedZone.coberturaEstimadaRTV >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {isZeroState ? '0.0%' : `${hoveredDisputedZone.coberturaEstimadaRTV}%`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sectores:</span>
                  <span className="text-slate-300 text-[10px] text-right truncate max-w-[160px]">
                    {(hoveredDisputedZone.sectoresPrincipales || []).slice(0, 3).join(', ')}
                  </span>
                </div>
              </div>
                <div className="pt-1 text-[10px] text-amber-400 font-semibold text-right">
                  Clic para ver expediente limítrofe y municipios →
                </div>
              </div>
            )}
          </div>
        ) : (
          /* VIEW MODE 2: 335 MUNICIPALITIES ANALYTIC MATRIX */
          <div className="w-full h-full p-4 overflow-y-auto bg-slate-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredMunicipalities.map(muni => {
                const isOptimo = muni.coberturaEfectivaRadioTV >= 75;
                const isVulnerable = muni.coberturaEfectivaRadioTV >= 60 && muni.coberturaEfectivaRadioTV < 75;
                const statusColor = isOptimo ? 'text-emerald-400' : isVulnerable ? 'text-amber-400' : 'text-rose-400';
                const borderClass = isOptimo ? 'border-slate-700 hover:border-emerald-500' : isVulnerable ? 'border-amber-500/40' : 'border-rose-500/50';

                return (
                  <div
                    key={muni.codigoINE}
                    onClick={() => setSelectedMuniModal(muni)}
                    className={`p-3.5 rounded-xl border bg-slate-800/80 hover:bg-slate-800 transition-all cursor-pointer space-y-2 ${borderClass}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block truncate max-w-[150px]">{muni.nombre}</span>
                        <span className="text-[10px] text-slate-400">{muni.estado}</span>
                      </div>
                      <span className="text-[10px] font-mono text-blue-400 font-bold bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-900">
                        {muni.codigoINE}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-700">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Cobertura R/TV</span>
                        <span className={`font-mono font-bold ${statusColor}`}>{muni.coberturaEfectivaRadioTV}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Penetración Net</span>
                        <span className="font-mono font-bold text-blue-300">{muni.penetracionInternet}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Población: {muni.poblacion.toLocaleString()}</span>
                      <span className="text-blue-400 font-semibold">Detalles →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* MODAL / DRAWER: DETALLE DE ENTIDAD ESTADAL O MUNICIPAL SELECCIONADA */}
      {(selectedEntity || selectedMuniModal) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-white space-y-4 shadow-2xl animate-in zoom-in-95">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <h4 className="text-base font-bold font-['Space_Grotesk']">
                    {selectedEntity ? selectedEntity.nombre : selectedMuniModal?.nombre}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Ficha Técnica Cartográfica (Marco Geoestadístico IGVSB)
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedEntity(null);
                  setSelectedMuniModal(null);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedEntity && (
              <div className="space-y-3 text-xs">
                {selectedEntity.esZonaSobreposicion || selectedEntity.id?.startsWith('ZS-') ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-red-400 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-pulse"></span>
                        <span>Zona de Sobreposición de Jurisdicción</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        Área delimitada formalmente en la base cartográfica oficial del IGVSB bajo el código estadal 
                        <span className="font-mono font-bold text-red-300 bg-red-900/50 px-1.5 py-0.5 rounded mx-1">cod_ent: "00"</span> 
                        correspondiente a superposiciones limítrofes interestatales.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Identificador Polígono:</span>
                        <span className="font-mono font-bold text-red-400">{selectedEntity.id}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Código Entidad (cod_ent):</span>
                        <span className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Denominación Oficial:</span>
                        <span className="font-semibold text-slate-200 text-right max-w-[240px]">{selectedEntity.denominacionOficial || selectedEntity.nombre}</span>
                      </div>
                      {selectedEntity.estadosInvolucrados && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Estados Involucrados:</span>
                          <span className="font-semibold text-red-300 text-right max-w-[240px]">{selectedEntity.estadosInvolucrados}</span>
                        </div>
                      )}
                      {selectedEntity.superficieKm2 && (
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Superficie Cartográfica:</span>
                          <span className="font-mono font-bold text-amber-400">{selectedEntity.superficieKm2.toLocaleString()} km²</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Fuente Cartográfica:</span>
                        <span className="text-slate-300 text-[10.5px]">IGVSB Escala 1:250.000</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Cobertura R/TV Promedio</span>
                        <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">{selectedEntity.coberturaPromedioRTV}%</span>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Penetración Internet</span>
                        <span className="text-xl font-bold font-mono text-blue-400 mt-0.5 block">{selectedEntity.penetracionInternetPromedio}%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Código Geográfico INE:</span>
                        <span className="font-mono font-bold text-white">{selectedEntity.codigoINE}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Capital Estadal:</span>
                        <span className="font-semibold text-slate-200">{selectedEntity.capital}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Población Estimada:</span>
                        <span className="font-mono text-slate-200">{selectedEntity.poblacion.toLocaleString()} habitantes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Municipios Adscritos:</span>
                        <span className="font-semibold text-slate-200">{selectedEntity.totalMunicipios} Municipios</span>
                      </div>
                    </div>

                    {/* Municipalities in this state */}
                    <div className="space-y-1.5">
                      <span className="font-bold text-slate-300 text-[11px] block">Municipios Monitoreados en este Estado:</span>
                      <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                        {(municipalities || []).filter(m => (m.estado || '').toLowerCase().includes(((selectedEntity.nombre || '').toLowerCase().split(' ')[0]))).map(m => (
                          <div key={m.codigoINE} className="p-2 bg-slate-800/40 rounded-lg flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-slate-200">{m.nombre}</span>
                            <div className="flex items-center space-x-2 font-mono">
                              <span className={m.coberturaEfectivaRadioTV >= 75 ? 'text-emerald-400' : 'text-amber-400'}>
                                R/TV: {m.coberturaEfectivaRadioTV}%
                              </span>
                              <span className="text-slate-500">|</span>
                              <span className="text-blue-300">Net: {m.penetracionInternet}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {selectedMuniModal && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Cobertura Radio/TV</span>
                    <span className="text-xl font-bold font-mono text-emerald-400 mt-0.5 block">{selectedMuniModal.coberturaEfectivaRadioTV}%</span>
                  </div>
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Penetración Internet</span>
                    <span className="text-xl font-bold font-mono text-blue-400 mt-0.5 block">{selectedMuniModal.penetracionInternet}%</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Código INE:</span>
                    <span className="font-mono font-bold text-white">{selectedMuniModal.codigoINE}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estado:</span>
                    <span className="font-semibold text-slate-200">{selectedMuniModal.estado}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Población / Hogares:</span>
                    <span className="font-mono text-slate-200">{selectedMuniModal.poblacion.toLocaleString()} hab. ({selectedMuniModal.hogares.toLocaleString()} hogares)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Torre / Nodo Cercano:</span>
                    <span className="font-semibold text-indigo-300">{selectedMuniModal.torreTransmisionCercana}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">TDA / Banda Ku:</span>
                    <span className="font-mono text-emerald-400">{selectedMuniModal.tdaDisponible ? 'TDA Activa' : 'Sin TDA'} · {selectedMuniModal.bandaKuDisponible ? 'Banda Ku OK' : 'Sin Ku'}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setSelectedEntity(null);
                  setSelectedMuniModal(null);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALLE DE ZONA EN RECLAMACIÓN O CUERPO ESTRATÉGICO */}
      {selectedDisputedZone && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-xl w-full p-6 text-white space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl mt-0.5 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold">
                      {selectedDisputedZone.codigoOficial}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-mono">
                      {selectedDisputedZone.tipo === 'CUERPO_AGUA_ESTRATEGICO' 
                        ? 'CUERPO ACUÁTICO ESTRATÉGICO' 
                        : selectedDisputedZone.tipo === 'RECLAMACION_INTERNACIONAL'
                        ? 'ZONA EN RECLAMACIÓN INTERNACIONAL · 159.542 KM²'
                        : 'LITIGIO LIMÍTROFE INTERESTATAL'}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold font-['Space_Grotesk'] text-white mt-1">
                    {selectedDisputedZone.nombre}
                  </h4>
                  <p className="text-xs text-amber-300/80">
                    {selectedDisputedZone.tipo === 'RECLAMACION_INTERNACIONAL'
                      ? 'Demarcación cartográfica oficial bajo el Acuerdo de Ginebra de 1966 y la Ley Orgánica para la Defensa de la Guayana Esequiba'
                      : 'Demarcación geográfica bajo expediente técnico del Instituto Geográfico Simón Bolívar (IGVSB)'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDisputedZone(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  {selectedDisputedZone.tipo === 'RECLAMACION_INTERNACIONAL' ? 'Superficie Oficial' : 'Superficie'}
                </span>
                <span className="text-sm sm:text-base font-bold font-mono text-slate-100 mt-0.5 block">
                  {selectedDisputedZone.superficieAproxKm2.toLocaleString()} km²
                </span>
                {selectedDisputedZone.id === 'disp-guayana-esequiba' && (
                  <span className="text-[9px] text-amber-400 font-semibold block">Medida Constitucional</span>
                )}
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Población Aprox.</span>
                <span className="text-sm sm:text-base font-bold font-mono text-amber-400 mt-0.5 block">
                  {(selectedDisputedZone.poblacionAprox || 125000).toLocaleString()} hab.
                </span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Cobertura R/TV</span>
                <span className={`text-sm sm:text-base font-bold font-mono mt-0.5 block ${selectedDisputedZone.coberturaEstimadaRTV >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {selectedDisputedZone.coberturaEstimadaRTV}%
                </span>
              </div>
            </div>

            {/* States involved */}
            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Entidades Federales Involucradas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDisputedZone.estadosInvolucrados.map(st => (
                    <span key={st} className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded font-semibold text-[11px]">
                      Estado {st}
                    </span>
                  ))}
                </div>
              </div>

              {selectedDisputedZone.municipiosInvolucrados && (
                <div className="flex items-center justify-between pt-1 border-t border-slate-700/60">
                  <span className="text-slate-400 font-semibold">Municipios en Disputa:</span>
                  <span className="text-slate-200 text-right text-[11px] font-medium">
                    {(selectedDisputedZone.municipiosInvolucrados || []).join(' · ')}
                  </span>
                </div>
              )}
            </div>

            {/* Historical background & status */}
            <div className="p-3.5 bg-slate-800/40 rounded-xl border border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 text-amber-400 font-bold text-[11px]">
                <Info className="w-4 h-4" />
                <span>Expediente Limítrofe y Situación Actual:</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedDisputedZone.descripcion}
              </p>
              <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 space-y-1">
                <div><b className="text-slate-300">Fundamento Jurídico:</b> {selectedDisputedZone.fundamentoJuridico}</div>
                {selectedDisputedZone.id === 'disp-guayana-esequiba' && (
                  <div className="text-amber-300 font-medium pt-1.5 border-t border-slate-800">
                    Soberanía constitucional e histórica de la República Bolivariana de Venezuela sobre los 159.542 km² al oeste del Río Esequibo bajo el Acuerdo de Ginebra de 1966.
                  </div>
                )}
              </div>
            </div>

            {/* Sectors */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-300 text-[11px] block">Localidades y Sectores Estratégicos:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDisputedZone.sectoresPrincipales.map(sec => (
                  <span key={sec} className="px-2 py-1 bg-slate-800 text-slate-300 rounded-lg text-[11px] border border-slate-700">
                    📍 {sec}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                SIRGAS-REGVEN · Coordenadas WGS84
              </span>
              <button
                onClick={() => setSelectedDisputedZone(null)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Entendido / Cerrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* METADATA MODAL IGVSB SERVICIO 7 */}
      {showIGVSBModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 text-white space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <div>
                  <h4 className="text-base font-bold font-['Space_Grotesk']">
                    Especificación de Datos Espaciales IGVSB
                  </h4>
                  <p className="text-xs text-slate-400">
                    Infraestructura de Datos Espaciales de Venezuela (IDEGEO)
                  </p>
                </div>
              </div>
              <button onClick={() => setShowIGVSBModal(false)} className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1.5 font-mono text-[11px]">
                <div><b>Servicio IDEGEO:</b> {IGVSB_SERVICE_CONFIG.nombreServicio}</div>
                <div><b>URL Endpoint:</b> <a href={IGVSB_SERVICE_CONFIG.urlServicio} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{IGVSB_SERVICE_CONFIG.urlServicio}</a></div>
                <div><b>Proveedor:</b> {IGVSB_SERVICE_CONFIG.proveedor}</div>
                <div><b>Sistema Geodésico:</b> {IGVSB_SERVICE_CONFIG.sistemaReferencia}</div>
                <div><b>Protocolos:</b> WFS 2.0 / WMS 1.3 / GeoJSON / REST Spatial</div>
              </div>

              <p className="leading-relaxed text-[11px] text-slate-300">
                El mapa de calor de cobertura territorial del MIPCCI utiliza la cartografía oficial y los límites político-territoriales estandarizados por el <b>Instituto Geográfico de Venezuela Simón Bolívar (IGVSB)</b> a través de su portal de servicios geoespaciales <b>IDEGEO</b>.
              </p>

              <div className="space-y-1">
                <span className="font-bold text-white text-[11px]">Capas Geográficas Habilitadas:</span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400">
                  <li>Límites Político-Administrativos de las 24 Entidades Federales y Guayana Esequiba.</li>
                  <li>División Político-Territorial Municipal (335 Municipios y sus Códigos INE).</li>
                  <li>Nodos de Transmisión TDA y Banda Ku Satelital REDTV.</li>
                  <li>Isócronas de penetración de Internet y telefonía móvil celular.</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <a
                href={IGVSB_SERVICE_CONFIG.urlServicio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-blue-400 hover:underline font-semibold"
              >
                <span>Visitar Portal IDEGEO IGVSB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setShowIGVSBModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function nodeCoverage(potencia: number): number {
  return Math.round(potencia * 10) / 10;
}
