import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Layers,
  Globe,
  MapPin,
  Radio,
  Tv,
  ShieldAlert,
  Sliders,
  Download,
  Search,
  Filter,
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
  X,
  Satellite,
  Compass,
  Map as MapIcon,
  Sun,
  Moon,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { MunicipalityData, CriticalTowerStatus, OpinionMatrixAlert } from '../types';
import { VENEZUELA_GEOJSON, VenezuelaStateFeature } from '../data/venezuelaGeoJson';
import { VENEZUELA_SOBREPOSICION_GEOJSON, TOTAL_SOBREPOSICION_POLIGONOS } from '../data/venezuelaSobreposicion';
import { VENEZUELA_MUNICIPALITIES_GEOJSON, VenezuelaMunicipalityFeature } from '../data/venezuelaMunicipalGeoJson';
import { VECTOR_COVERAGE_NODES, VectorCoverageNode } from '../data/venezuelaGeoData';
import { VENEZUELA_DISPUTED_GEOJSON } from '../data/venezuelaDisputedZones';
import { VENEZUELA_MUNICIPAL_COORDS } from '../data/venezuelaMunicipalCoordinates';
import { VenezuelaVectorHeatmap } from './VenezuelaVectorHeatmap';
import { SYSTEM_CONFIG, SystemConfiguration } from '../config/systemConfig';

interface VenezuelaLeafletMapProps {
  municipalities: MunicipalityData[];
  criticalTowers: CriticalTowerStatus[];
  opinionAlerts: OpinionMatrixAlert[];
  onSelectMunicipality?: (muni: MunicipalityData) => void;
  onOpenCounterNarrative?: (alert: OpinionMatrixAlert) => void;
  systemConfig?: SystemConfiguration;
}

type TileProvider = 'CARTO_VOYAGER' | 'OSM' | 'ESRI_STREET' | 'ESRI_SATELLITE';

const TILE_PROVIDERS: Record<TileProvider, { name: string; url: string; attribution: string; icon: string; subdomains?: string; maxZoom?: number }> = {
  CARTO_VOYAGER: {
    name: 'Carto Voyager (Recomendado)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>',
    icon: 'Compass',
    subdomains: 'abcd',
    maxZoom: 19
  },
  OSM: {
    name: 'OpenStreetMap Estándar',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
    icon: 'Map',
    subdomains: 'abc', // Corregido: 'd' no existe en DNS de OSM (evita 25% de cuadros fallidos)
    maxZoom: 19
  },
  ESRI_STREET: {
    name: 'Esri Calles y Relieve',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, METI, TomTom',
    icon: 'Sun',
    maxZoom: 18
  },
  ESRI_SATELLITE: {
    name: 'Esri Satelital (Órbita)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    icon: 'Satellite',
    maxZoom: 18
  }
};


export const VenezuelaLeafletMap: React.FC<VenezuelaLeafletMapProps> = ({
  municipalities = [],
  criticalTowers = [],
  opinionAlerts = [],
  onSelectMunicipality,
  onOpenCounterNarrative,
  systemConfig: propSystemConfig
}) => {
  const activeConfig = propSystemConfig || SYSTEM_CONFIG;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  
  // Layer groups refs
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);
  const municipalitiesGeoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const disputedZonesLayerRef = useRef<L.GeoJSON | null>(null);
  const towersLayerRef = useRef<L.LayerGroup | null>(null);
  const alertsLayerRef = useRef<L.LayerGroup | null>(null);
  const municipalitiesLayerRef = useRef<L.LayerGroup | null>(null);
  const radiusCirclesLayerRef = useRef<L.LayerGroup | null>(null);

  // States
  const [selectedTile, setSelectedTile] = useState<TileProvider>(activeConfig.geoViewer.defaultTileProvider);
  const [viewMode, setViewMode] = useState<'LEAFLET' | 'VECTOR' | 'GRID'>('LEAFLET');
  const [showLayerPanel, setShowLayerPanel] = useState<boolean>(false);
  const [layerOpacity, setLayerOpacity] = useState<number>(activeConfig.geoViewer.defaultLayerOpacity);

  // Synchronize when activeConfig tile provider changes
  useEffect(() => {
    if (activeConfig.geoViewer?.defaultTileProvider) {
      setSelectedTile(activeConfig.geoViewer.defaultTileProvider);
    }
  }, [activeConfig.geoViewer?.defaultTileProvider]);

  // Synchronize when activeConfig layer opacity changes
  useEffect(() => {
    if (typeof activeConfig.geoViewer?.defaultLayerOpacity === 'number') {
      setLayerOpacity(activeConfig.geoViewer.defaultLayerOpacity);
    }
  }, [activeConfig.geoViewer?.defaultLayerOpacity]);

  // Maximize / Fullscreen state
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  // Invalidate Leaflet map size on maximize/restore transitions
  useEffect(() => {
    if (mapInstanceRef.current) {
      const timer1 = setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 60);
      const timer2 = setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 260);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isMaximized]);

  // Escape key listener to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMaximized) {
        setIsMaximized(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMaximized]);

  // Layer toggles
  const [activeLayers, setActiveLayers] = useState<{
    states: boolean;
    sobreposicion: boolean;
    disputedZones: boolean;
    towers: boolean;
    coverageRadius: boolean;
    alerts: boolean;
    municipalities: boolean;
    networkHeatmap: boolean;
  }>({
    states: true,
    sobreposicion: true,
    disputedZones: true,
    towers: true,
    coverageRadius: true,
    alerts: true,
    municipalities: true,
    networkHeatmap: false
  });

  // Selection state
  const [hoveredState, setHoveredState] = useState<VenezuelaStateFeature['properties'] | null>(null);
  const [selectedState, setSelectedState] = useState<VenezuelaStateFeature['properties'] | null>(null);
  const [selectedMuniModal, setSelectedMuniModal] = useState<MunicipalityData | null>(null);

  // Filter / Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('TODOS');

  // List of states
  const statesList = useMemo(() => {
    return Array.from(new Set((municipalities || []).map(m => m.estado))).filter(Boolean).sort();
  }, [municipalities]);

  // Filtered municipalities
  const filteredMunicipalities = useMemo(() => {
    const q = (searchQuery || '').toLowerCase();
    return (municipalities || []).filter(m => {
      const name = (m.nombre || '').toLowerCase();
      const st = (m.estado || '').toLowerCase();
      const matchSearch =
        name.includes(q) ||
        (m.codigoINE || '').includes(searchQuery) ||
        st.includes(q);
      const matchState = selectedStateFilter === 'TODOS' || m.estado === selectedStateFilter;
      return matchSearch && matchState;
    });
  }, [municipalities, searchQuery, selectedStateFilter]);

  // Check if system is reset to zero
  const isZeroState = useMemo(() => {
    return !municipalities || municipalities.length === 0 || municipalities.every(m => (m.coberturaEfectivaRadioTV || 0) === 0);
  }, [municipalities]);

  // Quick lookup dictionary for municipality data
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

  // Color logic for coverage
  const getFeatureColor = (val: number, isInternet = false) => {
    if (val <= 0) return '#94a3b8'; // Neutral Slate 400 - Sin señal operativa / Puesto a 0
    if (isInternet) {
      if (val >= 80) return '#0284c7';
      if (val >= 60) return '#0ea5e9';
      if (val >= 45) return '#38bdf8';
      return '#bae6fd';
    }
    // Radio & TV
    if (val >= 75) return '#10b981'; // Óptimo
    if (val >= 60) return '#f59e0b'; // Alerta
    return '#ef4444'; // Crítico
  };

  // Helper to create tile layers with optimized subdomains and buffer
  const createTileLayer = (provider: TileProvider) => {
    const tileConf = TILE_PROVIDERS[provider];
    return L.tileLayer(tileConf.url, {
      attribution: tileConf.attribution,
      maxZoom: tileConf.maxZoom || 18,
      subdomains: tileConf.subdomains || 'abc',
      crossOrigin: true,
      keepBuffer: 6,
      updateWhenIdle: false,
      updateWhenZooming: true
    });
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Venezuela center: ~ 7.85 N, -66.1 W, zoom 6
    const map = L.map(mapContainerRef.current, {
      center: [7.85, -66.1],
      zoom: 6,
      minZoom: 5,
      maxZoom: 14,
      zoomControl: false, // We'll add custom positioned zoom buttons
      attributionControl: false
    });

    // Add scale control in bottom-left
    L.control.scale({ position: 'bottomleft', metric: true, imperial: false }).addTo(map);

    // Initial Tile Layer
    const tileLayer = createTileLayer(selectedTile).addTo(map);
    tileLayerRef.current = tileLayer;

    // Create Layer Groups
    const towersGroup = L.layerGroup().addTo(map);
    const radiusGroup = L.layerGroup().addTo(map);
    const alertsGroup = L.layerGroup().addTo(map);
    const muniGroup = L.layerGroup().addTo(map);

    towersLayerRef.current = towersGroup;
    radiusCirclesLayerRef.current = radiusGroup;
    alertsLayerRef.current = alertsGroup;
    municipalitiesLayerRef.current = muniGroup;

    mapInstanceRef.current = map;

    // Recalculate dimensions once layout settles to guarantee complete mosaic loading
    const timer1 = setTimeout(() => {
      map.invalidateSize();
    }, 150);
    const timer2 = setTimeout(() => {
      map.invalidateSize();
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update base tile layer on theme switch
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const newTileLayer = createTileLayer(selectedTile).addTo(map);

    // Keep tiles beneath vector layers
    newTileLayer.bringToBack();
    tileLayerRef.current = newTileLayer;

    // Ensure tiles render cleanly
    map.invalidateSize();
  }, [selectedTile]);

  // Handle window resizing and viewMode transitions to ensure full mosaic coverage
  useEffect(() => {
    if (viewMode === 'LEAFLET' && mapInstanceRef.current) {
      const timer = setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  useEffect(() => {
    const handleResize = () => {
      mapInstanceRef.current?.invalidateSize();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render / Update GeoJSON State Boundaries Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (geojsonLayerRef.current) {
      map.removeLayer(geojsonLayerRef.current);
      geojsonLayerRef.current = null;
    }

    if (!activeLayers.states) return;

    const featuresToRender = activeLayers.sobreposicion
      ? [...VENEZUELA_GEOJSON.features, ...VENEZUELA_SOBREPOSICION_GEOJSON.features]
      : VENEZUELA_GEOJSON.features;

    const geoLayer = L.geoJSON({
      type: "FeatureCollection",
      features: featuresToRender
    } as any, {
      style: (feature) => {
        const props = feature?.properties as VenezuelaStateFeature['properties'];
        const isSobreposicion = props?.esZonaSobreposicion || props?.id?.startsWith('ZS-') || props?.codigoINE === '00';

        if (isSobreposicion) {
          return {
            fillColor: isZeroState ? '#94a3b8' : '#ef4444',
            weight: 2,
            opacity: 1,
            color: isZeroState ? '#64748b' : '#b91c1c',
            dashArray: '',
            fillOpacity: isZeroState ? 0.35 : 0.85
          };
        }

        const stateMunis = (municipalities || []).filter(m => {
          const mState = (m.estado || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const fState = (props.nombre || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return mState === fState || mState.includes(fState) || fState.includes(mState);
        });

        const stateAvgRTV = isZeroState
          ? 0
          : stateMunis.length > 0
          ? stateMunis.reduce((sum, m) => sum + (m.coberturaEfectivaRadioTV || 0), 0) / stateMunis.length
          : props.coberturaPromedioRTV;

        const stateAvgNet = isZeroState
          ? 0
          : stateMunis.length > 0
          ? stateMunis.reduce((sum, m) => sum + (m.penetracionInternet || 0), 0) / stateMunis.length
          : props.penetracionInternetPromedio;

        const val = activeLayers.networkHeatmap ? stateAvgNet : stateAvgRTV;
        const fillColor = getFeatureColor(val, activeLayers.networkHeatmap);

        return {
          fillColor: fillColor,
          weight: 2,
          opacity: 0.95,
          color: selectedTile === 'ESRI_SATELLITE' ? '#ffffff' : '#1e293b',
          dashArray: '',
          fillOpacity: activeLayers.municipalities ? (layerOpacity * 0.42) : layerOpacity
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties as VenezuelaStateFeature['properties'];
        const isSobreposicion = props.esZonaSobreposicion || props.id?.startsWith('ZS-') || props.codigoINE === '00';
        const isEsequibo = props.id === 'VE-Y';

        const stateMunis = (municipalities || []).filter(m => {
          const mState = (m.estado || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const fState = (props.nombre || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          return mState === fState || mState.includes(fState) || fState.includes(mState);
        });

        const stateAvgRTV = isZeroState
          ? 0
          : stateMunis.length > 0
          ? stateMunis.reduce((sum, m) => sum + (m.coberturaEfectivaRadioTV || 0), 0) / stateMunis.length
          : props.coberturaPromedioRTV;

        const stateAvgNet = isZeroState
          ? 0
          : stateMunis.length > 0
          ? stateMunis.reduce((sum, m) => sum + (m.penetracionInternet || 0), 0) / stateMunis.length
          : props.penetracionInternetPromedio;

        layer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 3.5,
              color: isSobreposicion ? '#ffffff' : '#3b82f6',
              fillColor: isSobreposicion ? '#dc2626' : undefined,
              dashArray: '',
              fillOpacity: Math.min(1, layerOpacity + 0.15)
            });
            target.bringToFront();
            setHoveredState({
              ...props,
              coberturaPromedioRTV: Number(stateAvgRTV.toFixed(1)),
              penetracionInternetPromedio: Number(stateAvgNet.toFixed(1)),
              estatus: stateAvgRTV <= 0 ? 'CRITICO' : (stateAvgRTV >= 75 ? 'OPTIMO' : stateAvgRTV >= 60 ? 'ESTABLE' : stateAvgRTV >= 40 ? 'VULNERABLE' : 'CRITICO')
            });
          },
          mouseout: (e) => {
            geoLayer.resetStyle(e.target);
            setHoveredState(null);
          },
          click: (e) => {
            const target = e.target;
            map.fitBounds(target.getBounds(), { padding: [40, 40], maxZoom: isSobreposicion ? 10 : 8 });
            setSelectedState({
              ...props,
              coberturaPromedioRTV: Number(stateAvgRTV.toFixed(1)),
              penetracionInternetPromedio: Number(stateAvgNet.toFixed(1)),
              estatus: stateAvgRTV <= 0 ? 'CRITICO' : (stateAvgRTV >= 75 ? 'OPTIMO' : stateAvgRTV >= 60 ? 'ESTABLE' : stateAvgRTV >= 40 ? 'VULNERABLE' : 'CRITICO')
            });
            if (!isSobreposicion) {
              setSelectedStateFilter(props.nombre);
            }
          }
        });

        // Rich popup tooltip
        const statusBadge =
          isSobreposicion
            ? '<span style="background:#ef4444;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">ZONA DE SOBREPOSICIÓN</span>'
            : stateAvgRTV <= 0
            ? '<span style="background:#64748b;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">SIN REGISTRO (0%)</span>'
            : stateAvgRTV >= 75
            ? '<span style="background:#10b981;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">ÓPTIMO</span>'
            : stateAvgRTV >= 60
            ? '<span style="background:#0284c7;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">ESTABLE</span>'
            : stateAvgRTV >= 40
            ? '<span style="background:#f59e0b;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">ALERTA</span>'
            : '<span style="background:#ef4444;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">CRÍTICO</span>';

        const popupContent = isSobreposicion ? `
          <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:240px;padding:2px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <strong style="font-size:13px;color:#991b1b;">${props.nombre}</strong>
              ${statusBadge}
            </div>
            <div style="background:#fef2f2;border:1px solid #fecaca;color:#991b1b;border-radius:6px;padding:6px 8px;font-size:10.5px;font-weight:600;margin-bottom:8px;line-height:1.4;">
              <div style="color:#b91c1c;font-size:11px;font-weight:bold;margin-bottom:3px;">Código Cartográfico: cod_ent: "00"</div>
              <div style="font-size:10px;color:#7f1d1d;margin-bottom:4px;">${props.denominacionOficial || props.nombre}</div>
              ${props.estadosInvolucrados ? `<div><b>Estados en controversia:</b> ${props.estadosInvolucrados}</div>` : ''}
              <div><b>Superficie registrada:</b> ${props.superficieKm2 ? props.superficieKm2.toLocaleString() : 'N/A'} km²</div>
            </div>
            <div style="font-size:10px;color:#94a3b8;text-align:right;">IGVSB 1:250.000 &bull; 50 Polígonos de Sobreposición</div>
          </div>
        ` : `
          <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:220px;padding:2px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <strong style="font-size:13px;color:#0f172a;">${props.nombre}</strong>
              ${statusBadge}
            </div>
            <div style="font-size:11px;color:#64748b;margin-bottom:8px;">Capital: <b>${props.capital || 'Tumeremo (Adm)'}</b> | Región: <b>${props.region || 'Guayana'}</b></div>
            ${isEsequibo ? `
              <div style="background:#eff6ff;border:1px solid #bfdbfe;color:#1e40af;border-radius:6px;padding:5px 8px;font-size:10px;font-weight:600;margin-bottom:8px;line-height:1.4;">
                <div><b>Superficie Oficial Constitucional:</b> 159.542 km²</div>
                <div style="font-size:9.5px;color:#2563eb;">Ley Orgánica para la Defensa de la Guayana Esequiba</div>
              </div>
            ` : ''}
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:6px;margin-bottom:8px;">
              ${props.superficieKm2 ? `
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;">
                  <span>Superficie:</span>
                  <b style="color:#b45309;font-family:monospace;">${props.superficieKm2.toLocaleString()} km²</b>
                </div>
              ` : ''}
              <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;">
                <span>Cobertura R/TV:</span>
                <b style="color:#0f172a;font-family:monospace;">${stateAvgRTV.toFixed(1)}%</b>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;">
                <span>Penetración Internet:</span>
                <b style="color:#0284c7;font-family:monospace;">${stateAvgNet.toFixed(1)}%</b>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:11px;">
                <span>Población Estadal:</span>
                <b style="color:#0f172a;font-family:monospace;">${(props.poblacion / 1000000).toFixed(2)}M hab.</b>
              </div>
            </div>
            <div style="font-size:10px;color:#94a3b8;text-align:right;">INE: ${props.codigoINE} &bull; Clic para acercar</div>
          </div>
        `;
        layer.bindPopup(popupContent);
      }
    }).addTo(map);

    geojsonLayerRef.current = geoLayer;
  }, [activeLayers.states, activeLayers.sobreposicion, activeLayers.municipalities, activeLayers.networkHeatmap, layerOpacity, selectedTile, municipalities, isZeroState]);

  // Render / Update Municipalities Vector Polygons Layer (335 Municipios)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (municipalitiesGeoJsonLayerRef.current) {
      map.removeLayer(municipalitiesGeoJsonLayerRef.current);
      municipalitiesGeoJsonLayerRef.current = null;
    }

    if (!activeLayers.municipalities) return;

    const muniGeoLayer = L.geoJSON(VENEZUELA_MUNICIPALITIES_GEOJSON as any, {
      style: (feature) => {
        const props = feature?.properties as VenezuelaMunicipalityFeature['properties'];
        const cleanPropsName = (props.nombre || '').toLowerCase().replace(/municipio\s+/gi, '').trim();
        const liveMuni = muniDataMap.get(props.codigoINE) || muniDataMap.get(cleanPropsName);
        const rtvVal = isZeroState ? 0 : (liveMuni ? liveMuni.coberturaEfectivaRadioTV : props.coberturaEfectivaRadioTV);
        const netVal = isZeroState ? 0 : (liveMuni ? liveMuni.penetracionInternet : props.penetracionInternet);
        const val = activeLayers.networkHeatmap ? netVal : rtvVal;
        const fillColor = getFeatureColor(val, activeLayers.networkHeatmap);

        return {
          fillColor: fillColor,
          weight: 1.2,
          opacity: 0.85,
          color: selectedTile === 'ESRI_SATELLITE' ? '#38bdf8' : '#0284c7',
          dashArray: '',
          fillOpacity: activeLayers.states ? 0.32 : Math.min(0.9, layerOpacity)
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties as VenezuelaMunicipalityFeature['properties'];
        const cleanPropsName = (props.nombre || '').toLowerCase().replace(/municipio\s+/gi, '').trim();
        const liveMuni = muniDataMap.get(props.codigoINE) || muniDataMap.get(cleanPropsName);
        const rtvVal = isZeroState ? 0 : (liveMuni ? liveMuni.coberturaEfectivaRadioTV : props.coberturaEfectivaRadioTV);
        const netVal = isZeroState ? 0 : (liveMuni ? liveMuni.penetracionInternet : props.penetracionInternet);

        layer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 2.8,
              color: '#f59e0b',
              fillOpacity: Math.min(1, layerOpacity + 0.25)
            });
            target.bringToFront();
          },
          mouseout: (e) => {
            muniGeoLayer.resetStyle(e.target);
          },
          click: (e) => {
            const target = e.target;
            map.fitBounds(target.getBounds(), { padding: [50, 50], maxZoom: 10 });

            const found: MunicipalityData = liveMuni ? {
              ...liveMuni,
              coberturaEfectivaRadioTV: rtvVal,
              penetracionInternet: netVal
            } : {
              codigoINE: props.codigoINE,
              nombre: props.nombre,
              estado: props.estado,
              region: 'N/D',
              poblacion: 0,
              hogares: 0,
              coberturaEfectivaRadioTV: rtvVal,
              penetracionInternet: netVal,
              estatusSenal: rtvVal <= 0 ? 'CRITICO' : (rtvVal >= 75 ? 'OPTIMO' : rtvVal >= 60 ? 'ESTABLE' : 'VULNERABLE'),
              mediosComunitariosActivos: 0,
              torreTransmisionCercana: 'N/D',
              tdaDisponible: rtvVal > 0,
              bandaKuDisponible: rtvVal > 0,
              alertasActivas: 0
            };
            setSelectedMuniModal(found);
            if (onSelectMunicipality) onSelectMunicipality(found);
          }
        });

        // Rich tooltip
        const statusBadge =
          rtvVal <= 0
            ? '<span style="background:#64748b;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">SIN SEÑAL (0%)</span>'
            : rtvVal >= 75
            ? '<span style="background:#10b981;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">ÓPTIMO</span>'
            : rtvVal >= 60
            ? '<span style="background:#0284c7;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">ESTABLE</span>'
            : rtvVal >= 40
            ? '<span style="background:#f59e0b;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">ALERTA</span>'
            : '<span style="background:#ef4444;color:white;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:bold;">CRÍTICO</span>';

        const tooltipContent = `
          <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:190px;padding:3px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
              <strong style="font-size:12px;color:#0f172a;">${props.nombre}</strong>
              ${statusBadge}
            </div>
            <div style="font-size:10px;color:#64748b;margin-bottom:6px;">
              ${props.capital ? 'Capital: <b>' + props.capital + '</b><br/>' : ''}Estado: <b>${props.estado}</b> (INE: ${props.codigoINE})
            </div>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:5px;font-size:10px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:2px;">
                <span>Cobertura R/TV:</span>
                <b style="color:#0f172a;font-family:monospace;">${rtvVal}%</b>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span>Penetración Internet:</span>
                <b style="color:#0284c7;font-family:monospace;">${netVal}%</b>
              </div>
            </div>
            <div style="font-size:9px;color:#94a3b8;margin-top:4px;text-align:right;">Clic para inspeccionar ficha</div>
          </div>
        `;

        layer.bindTooltip(tooltipContent, {
          sticky: true,
          direction: 'auto',
          opacity: 0.98
        });
      }
    }).addTo(map);

    municipalitiesGeoJsonLayerRef.current = muniGeoLayer;
  }, [activeLayers.municipalities, activeLayers.states, activeLayers.networkHeatmap, layerOpacity, selectedTile, municipalities, muniDataMap, isZeroState, onSelectMunicipality]);

  // Render / Update Disputed Zones Layer (Zulia-Mérida, Zulia-Trujillo, Zulia-Táchira, etc. & Lago de Maracaibo)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (disputedZonesLayerRef.current) {
      map.removeLayer(disputedZonesLayerRef.current);
      disputedZonesLayerRef.current = null;
    }

    if (!activeLayers.disputedZones) return;

    const disputedLayer = L.geoJSON(VENEZUELA_DISPUTED_GEOJSON as any, {
      style: (feature) => {
        const props = feature?.properties || {};
        const isWater = props.tipo === 'CUERPO_AGUA_ESTRATEGICO';
        const isEsequibo = props.id === 'disp-guayana-esequiba' || props.tipo === 'RECLAMACION_INTERNACIONAL';
        const featureVal = isZeroState ? 0 : (props.coberturaRTV ?? 22.0);
        const featureColor = isZeroState
          ? (selectedTile === 'ESRI_SATELLITE' ? '#475569' : '#94a3b8')
          : getFeatureColor(featureVal, activeLayers.networkHeatmap);

        return {
          fillColor: featureColor,
          weight: 2,
          opacity: 0.95,
          color: selectedTile === 'ESRI_SATELLITE' ? '#ffffff' : '#1e293b',
          dashArray: '', // Sin franjas
          fillOpacity: activeLayers.municipalities ? (layerOpacity * 0.42) : layerOpacity
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties || {};
        const isWater = props.tipo === 'CUERPO_AGUA_ESTRATEGICO';
        const isEsequibo = props.id === 'disp-guayana-esequiba' || props.tipo === 'RECLAMACION_INTERNACIONAL';

        layer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 3,
              color: '#38bdf8',
              fillOpacity: 0.75
            });
            target.bringToFront();
          },
          mouseout: (e) => {
            disputedLayer.resetStyle(e.target);
          },
          click: (e) => {
            const target = e.target;
            map.fitBounds(target.getBounds(), { padding: [40, 40], maxZoom: 10 });
          }
        });

        const popupHtml = `
          <div style="font-family:system-ui,-apple-system,sans-serif;min-width:270px;padding:4px;color:#0f172a;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;padding-bottom:6px;border-bottom:1px solid #e2e8f0;">
              <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#0284c7;"></span>
              <div>
                <b style="font-size:12px;color:#0f172a;display:block;">${props.nombre}</b>
                <span style="font-size:10px;color:#64748b;font-family:monospace;">${props.codigoOficial || ''}</span>
              </div>
            </div>
            ${isEsequibo ? `
              <div style="background:#eff6ff;border:1px solid #bfdbfe;color:#1e40af;border-radius:6px;padding:6px;margin-bottom:8px;font-size:10.5px;font-weight:600;">
                <div style="color:#1e3a8a;font-size:11px;font-weight:bold;">SUPERFICIE OFICIAL CONSTITUCIONAL: 159.542 km²</div>
                <div style="font-size:9.5px;color:#2563eb;margin-top:2px;">Ley Orgánica para la Defensa de la Guayana Esequiba</div>
              </div>
            ` : ''}
            <div style="font-size:11px;line-height:1.5;color:#334155;margin-bottom:8px;">
              <div style="margin-bottom:4px;"><strong style="color:#0f172a;">Entidades:</strong> ${props.estados || 'Jurisdicción Soberana'}</div>
              <div style="margin-bottom:4px;"><strong style="color:#0f172a;">Sectores Clave:</strong> ${props.sectores || 'N/D'}</div>
              <div style="margin-bottom:4px;"><strong style="color:#0f172a;">Fundamento:</strong> ${props.fundamento || 'Expediente IGVSB'}</div>
              <div style="display:flex;justify-content:space-between;background:#f8fafc;padding:6px 8px;border-radius:6px;margin-top:6px;border:1px solid #e2e8f0;">
                <div>
                  <span style="font-size:10px;color:#64748b;display:block;">Cobertura R/TV</span>
                  <b style="color:${isZeroState ? '#64748b' : '#10b981'};font-size:12px;font-family:monospace;">${isZeroState ? '0.0%' : `${props.coberturaRTV}%`}</b>
                </div>
                <div>
                  <span style="font-size:10px;color:#64748b;display:block;">Penetración Net</span>
                  <b style="color:${isZeroState ? '#64748b' : '#0284c7'};font-size:12px;font-family:monospace;">${isZeroState ? '0.0%' : `${props.penetracionNet}%`}</b>
                </div>
                <div>
                  <span style="font-size:10px;color:#64748b;display:block;">Medida Oficial</span>
                  <b style="color:#0284c7;font-size:12px;font-family:monospace;">${(props.superficieKm2 || 0).toLocaleString()} km²</b>
                </div>
              </div>
            </div>
            <div style="font-size:10px;color:#0284c7;font-weight:600;text-align:right;">
              Entidad Federal Oficial · Medida Constitucional 159.542 km²
            </div>
          </div>
        `;

        layer.bindPopup(popupHtml, { maxWidth: 320 });
        layer.bindTooltip(`<b>${props.nombre}</b><br/><span style="font-size:10px;color:#64748b;">Superficie Oficial: 159.542 km²</span>`, {
          sticky: true,
          opacity: 0.95
        });
      }
    }).addTo(map);

    disputedZonesLayerRef.current = disputedLayer;
  }, [activeLayers.disputedZones, selectedTile, isZeroState]);

  // Render / Update Towers & Coverage Radii
  useEffect(() => {
    if (!towersLayerRef.current || !radiusCirclesLayerRef.current) return;
    const towersGroup = towersLayerRef.current;
    const radiusGroup = radiusCirclesLayerRef.current;

    towersGroup.clearLayers();
    radiusGroup.clearLayers();

    if (!activeLayers.towers) return;

    VECTOR_COVERAGE_NODES.forEach((node) => {
      // 1. Coverage circle in real meters (suppressed in zero state)
      if (activeLayers.coverageRadius && !isZeroState) {
        const circle = L.circle(node.latLng, {
          radius: node.radioKm * 1000,
          color: node.tipo === 'TELEPUERTO_KU' ? '#8b5cf6' : '#2563eb',
          weight: 1.5,
          fillColor: node.tipo === 'TELEPUERTO_KU' ? '#a78bfa' : '#3b82f6',
          fillOpacity: 0.12,
          dashArray: '4, 4'
        });
        circle.bindTooltip(`Radio de Cobertura: ${node.radioKm} km (${node.nombre})`, {
          sticky: true
        });
        radiusGroup.addLayer(circle);
      }

      // 2. Custom DivIcon Marker for the tower
      const towerOperativo = isZeroState ? false : node.operativo;
      const markerColor = isZeroState ? '#64748b' : (node.operativo ? '#2563eb' : '#ef4444');
      const markerGlow = isZeroState ? 'rgba(100, 116, 139, 0.4)' : 'rgba(37, 99, 235, 0.5)';

      const iconHtml = `
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${markerColor};
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px ${markerGlow};
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          cursor: pointer;
        ">
          📡
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-tower-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(node.latLng, { icon: customIcon });

      marker.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:220px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <span style="font-size:16px;">📡</span>
            <strong style="font-size:13px;color:#0f172a;">${node.nombre}</strong>
          </div>
          <div style="font-size:11px;color:#64748b;margin-bottom:8px;">Tipo: <b>${node.tipo}</b> | Estado: <b>${node.estado}</b></div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:6px;margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;">
              <span>Potencia de Salida:</span>
              <b style="color:${isZeroState ? '#64748b' : '#2563eb'};font-family:monospace;">${isZeroState ? '0.0' : node.potenciaKw} kW</b>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;">
              <span>Radio Efectivo:</span>
              <b style="color:#0f172a;font-family:monospace;">${isZeroState ? '0' : node.radioKm} km</b>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;">
              <span>Estado Operativo:</span>
              <b style="color:${isZeroState ? '#64748b' : (towerOperativo ? '#10b981' : '#ef4444')};">${isZeroState ? 'INACTIVO (Puesto a 0)' : (towerOperativo ? 'OPERATIVO' : 'FALLA')}</b>
            </div>
          </div>
          <div style="font-size:10px;color:#64748b;">
            Municipio sede: <b>${node.municipio}</b>
          </div>
        </div>
      `);

      towersGroup.addLayer(marker);
    });
  }, [activeLayers.towers, activeLayers.coverageRadius, isZeroState]);

  // Render / Update Opinion & Disinformation Alerts
  useEffect(() => {
    if (!alertsLayerRef.current) return;
    const alertsGroup = alertsLayerRef.current;
    alertsGroup.clearLayers();

    if (!activeLayers.alerts) return;

    opinionAlerts.forEach((alert) => {
      // Determine affected state from alert title/context safely
      const alertTitle = (alert.titulo || '').toLowerCase();
      const rawLocation = (alert as any).estadoAfectado || '';
      const searchLoc = rawLocation.toLowerCase();

      // Find approximate coordinates based on state or keywords in title
      const matchingState = VENEZUELA_GEOJSON.features.find(f => {
        const stateName = (f.properties?.nombre || '').toLowerCase();
        if (searchLoc && (stateName.includes(searchLoc) || searchLoc.includes(stateName))) {
          return true;
        }
        return alertTitle.includes(stateName) || (f.properties?.capital && alertTitle.includes(f.properties.capital.toLowerCase()));
      });

      const latLng: [number, number] = matchingState ? matchingState.properties.center : [10.4806, -66.9036];

      const alertIconHtml = `
        <div style="
          position: relative;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <div style="
            position: absolute;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #ef4444;
            opacity: 0.35;
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            position: relative;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #dc2626;
            border: 2px solid #ffffff;
            box-shadow: 0 0 10px rgba(220, 38, 38, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 11px;
            font-weight: bold;
          ">
            ⚠️
          </div>
        </div>
      `;

      const alertIcon = L.divIcon({
        html: alertIconHtml,
        className: 'custom-alert-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(latLng, { icon: alertIcon });

      const affectedStateLabel = matchingState?.properties?.nombre || (alert as any).estadoAfectado || 'Nacional';
      const fakeNarrative = alert.amenazaFraseViral || (alert as any).narrativaFalsaDetectada || '';
      const estimatedReach = alert.impactoEstimadoVistas || (alert as any).alcanceEstimadoPersonas || 0;
      const alertCategory = (alert.tematica || '').replace(/_/g, ' ') || 'DESINFORMACIÓN';

      marker.bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif;min-width:240px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
            <span style="background:#ef4444;color:white;font-size:10px;font-weight:bold;padding:2px 6px;border-radius:4px;">
              ${alert.nivelRiesgo || 'CRÍTICO'}
            </span>
            <span style="font-size:11px;color:#64748b;">${alertCategory}</span>
          </div>
          <strong style="font-size:13px;color:#0f172a;display:block;margin-bottom:4px;">${alert.titulo}</strong>
          <p style="font-size:11px;color:#475569;margin-bottom:8px;line-height:1.4;">${fakeNarrative}</p>
          <div style="font-size:11px;color:#64748b;margin-bottom:8px;">
            Área: <b>${affectedStateLabel}</b> | Alcance: <b style="color:#ef4444;">${estimatedReach.toLocaleString()} usuarios</b>
          </div>
          <button
            id="btn-alert-action-${alert.id}"
            style="
              width: 100%;
              background: #2563eb;
              color: white;
              border: none;
              padding: 6px 10px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 600;
              cursor: pointer;
            "
          >
            ⚡ Desplegar Contranarrativa IA
          </button>
        </div>
      `);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-alert-action-${alert.id}`);
        if (btn && onOpenCounterNarrative) {
          btn.onclick = () => {
            onOpenCounterNarrative(alert);
            marker.closePopup();
          };
        }
      });

      alertsGroup.addLayer(marker);
    });
  }, [activeLayers.alerts, opinionAlerts, onOpenCounterNarrative]);

  // Render Municipalities Markers
  useEffect(() => {
    if (!municipalitiesLayerRef.current) return;
    const muniGroup = municipalitiesLayerRef.current;
    muniGroup.clearLayers();

    if (!activeLayers.municipalities) return;

    // Show dots for municipalities with official georeferenced coordinates from shapefile
    municipalities.forEach((muni) => {
      let lat: number | null = null;
      let lng: number | null = null;

      // 1. Exact match by INE Code (e.g. "0101", "1105")
      const exact = VENEZUELA_MUNICIPAL_COORDS[muni.codigoINE];
      if (exact) {
        lat = exact.lat;
        lng = exact.lng;
      } else {
        // 2. Search by clean municipality name
        const cleanName = (muni.nombre || '').toLowerCase().replace(/municipio\s+/gi, '').trim();
        const found = Object.values(VENEZUELA_MUNICIPAL_COORDS).find(c => {
          const cName = (c.name || '').toLowerCase().replace(/municipio\s+/gi, '').trim();
          return cName.includes(cleanName) || cleanName.includes(cName);
        });
        if (found) {
          lat = found.lat;
          lng = found.lng;
        }
      }

      // 3. Fallback to state center if needed
      if (lat === null || lng === null) {
        const muniEstado = (muni.estado || '').toLowerCase();
        const stateFeature = VENEZUELA_GEOJSON.features.find(f => {
          const featName = (f.properties?.nombre || '').toLowerCase();
          return featName.includes(muniEstado) || muniEstado.includes(featName);
        });

        if (!stateFeature) return;

        const hash = parseInt(muni.codigoINE, 10) || 1000;
        const angle = (hash % 360) * (Math.PI / 180);
        const dist = 0.12 + ((hash % 15) * 0.03);
        lat = stateFeature.properties.center[0] + Math.sin(angle) * dist;
        lng = stateFeature.properties.center[1] + Math.cos(angle) * dist;
      }

      const isZero = isZeroState || muni.coberturaEfectivaRadioTV <= 0;
      const isOptimo = muni.coberturaEfectivaRadioTV >= 75;
      const isAlerta = muni.coberturaEfectivaRadioTV >= 60 && muni.coberturaEfectivaRadioTV < 75;
      const color = isZero ? '#94a3b8' : isOptimo ? '#10b981' : isAlerta ? '#f59e0b' : '#ef4444';

      const circleMarker = L.circleMarker([lat, lng], {
        radius: isZero ? 3.5 : 5,
        fillColor: color,
        color: '#ffffff',
        weight: 1,
        opacity: isZero ? 0.7 : 1,
        fillOpacity: isZero ? 0.5 : 0.9
      });

      circleMarker.bindTooltip(`${muni.nombre} (${isZero ? 0 : muni.coberturaEfectivaRadioTV}%)`, {
        direction: 'top',
        offset: [0, -5]
      });

      circleMarker.on('click', () => {
        setSelectedMuniModal(muni);
        if (onSelectMunicipality) onSelectMunicipality(muni);
      });

      muniGroup.addLayer(circleMarker);
    });
  }, [activeLayers.municipalities, municipalities, onSelectMunicipality, isZeroState]);

  // Reset to Venezuela center
  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([7.85, -66.1], 6, { duration: 1.2 });
      setSelectedState(null);
      setSelectedStateFilter('TODOS');
      setSearchQuery('');
    }
  };

  // Zoom in / out
  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  // Download GeoJSON
  const handleDownloadGeoJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(VENEZUELA_GEOJSON, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `venezuela_igvsb_sirgas_regven_${new Date().toISOString().slice(0, 10)}.geojson`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className={`bg-white relative flex flex-col overflow-hidden transition-all duration-300 ${
      isMaximized 
        ? 'fixed inset-0 z-[9999] h-screen w-screen rounded-none shadow-2xl' 
        : 'rounded-xl border border-slate-200 shadow-sm'
    }`}>
      {/* Header bar */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 bg-blue-600 text-white rounded-lg shadow-sm">
              <Globe className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-700 font-['Space_Grotesk']">
                  Mapa Interactivo de Venezuela: Cobertura Efectiva Municipal
                </h3>
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-bold rounded">
                  Leaflet.js + IGVSB (EPSG:4326)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Cartografía oficial georreferenciada &bull; 24 Entidades Federales, Estado Guayana Esequiba y 335 Municipios
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Tile Selector */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setSelectedTile('CARTO_VOYAGER')}
              title="Carto Voyager (Mapa institucional nítido de alta velocidad)"
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-all ${
                selectedTile === 'CARTO_VOYAGER' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span className="hidden sm:inline">Carto</span>
            </button>
            <button
              onClick={() => setSelectedTile('OSM')}
              title="OpenStreetMap Estándar"
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-all ${
                selectedTile === 'OSM' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3 h-3" />
              <span className="hidden sm:inline">OSM</span>
            </button>
            <button
              onClick={() => setSelectedTile('ESRI_STREET')}
              title="Esri Calles y Relieve"
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-all ${
                selectedTile === 'ESRI_STREET' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span className="hidden sm:inline">Relieve</span>
            </button>
            <button
              onClick={() => setSelectedTile('ESRI_SATELLITE')}
              title="Vista Satelital"
              className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-all ${
                selectedTile === 'ESRI_SATELLITE' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Satellite className="w-3 h-3" />
              <span className="hidden sm:inline">Satélite</span>
            </button>
          </div>

          {/* Quick Layer Toggles: Estados & Municipios */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setActiveLayers(prev => ({ ...prev, states: !prev.states }))}
              title={activeLayers.states ? 'Desactivar Capa de Estados' : 'Activar Capa de Estados'}
              className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-semibold transition-all ${
                activeLayers.states 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Estados</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                activeLayers.states ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-500'
              }`}>
                24
              </span>
            </button>

            <button
              onClick={() => setActiveLayers(prev => ({ ...prev, municipalities: !prev.municipalities }))}
              title={activeLayers.municipalities ? 'Desactivar Capa de Municipios' : 'Activar Capa de Municipios'}
              className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-semibold transition-all ${
                activeLayers.municipalities 
                  ? 'bg-sky-600 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Municipios</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                activeLayers.municipalities ? 'bg-sky-700 text-sky-100' : 'bg-slate-100 text-slate-500'
              }`}>
                335
              </span>
            </button>

            <button
              onClick={() => setActiveLayers(prev => ({ ...prev, sobreposicion: !prev.sobreposicion }))}
              title={activeLayers.sobreposicion ? 'Desactivar Zonas de Sobreposición' : 'Activar Zonas de Sobreposición (50 Polígonos cod_ent: 00)'}
              className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-semibold transition-all ${
                activeLayers.sobreposicion 
                  ? 'bg-red-600 text-white shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 ring-1 ring-white"></span>
              <span>Sobreposición</span>
              <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                activeLayers.sobreposicion ? 'bg-red-700 text-red-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {TOTAL_SOBREPOSICION_POLIGONOS}
              </span>
            </button>
          </div>

          {/* Toggle Layers Panel */}
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showLayerPanel
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Capas</span>
          </button>

          {/* View Mode (Map vs Vector vs Grid) */}
          <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setViewMode('LEAFLET')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                viewMode === 'LEAFLET' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mapa Leaflet
            </button>
            {activeConfig.geoViewer.enableVectorHeatmap && (
              <button
                onClick={() => setViewMode('VECTOR')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  viewMode === 'VECTOR' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Vectores Oficiales SVG
              </button>
            )}
            {activeConfig.geoViewer.enableGridMatrix && (
              <button
                onClick={() => setViewMode('GRID')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  viewMode === 'GRID' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Matriz 335
              </button>
            )}
          </div>

          {/* GeoJSON Export */}
          <button
            onClick={handleDownloadGeoJSON}
            title="Descargar GeoJSON Oficial"
            className="p-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-lg transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Botón Maximizar / Restaurar Pantalla Completa */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? 'Restaurar tamaño normal (Esc)' : 'Maximizar Mapa a Pantalla Completa'}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isMaximized
                ? 'bg-blue-600 border-blue-600 text-white shadow-xs hover:bg-blue-700'
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-medium">{isMaximized ? 'Restaurar' : 'Maximizar'}</span>
          </button>
        </div>
      </div>

      {/* Main Map Container */}
      <div className={`relative w-full bg-slate-100 overflow-hidden ${
        isMaximized ? 'flex-1 h-full min-h-[500px]' : 'h-[520px]'
      }`}>
        {/* Leaflet Map & Overlays Container (always preserved in DOM) */}
        <div className={`w-full h-full relative ${viewMode === 'LEAFLET' ? 'block' : 'hidden'}`}>
          {/* The Actual Leaflet Map Canvas */}
          <div ref={mapContainerRef} className="w-full h-full z-0" />

            {/* Custom On-Map Floating Navigation Controls */}
            <div className="absolute top-4 right-4 z-[400] flex flex-col space-y-1.5 bg-white/90 backdrop-blur-xs p-1 rounded-lg border border-slate-200/80 shadow-md">
              <button
                onClick={handleZoomIn}
                title="Acercar (Zoom +)"
                className="p-1.5 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-all cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                title="Alejar (Zoom -)"
                className="p-1.5 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-all cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="border-t border-slate-200 my-0.5" />
              <button
                onClick={handleResetView}
                title="Centrar Venezuela Completa"
                className="p-1.5 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="border-t border-slate-200 my-0.5" />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                title={isMaximized ? 'Restaurar tamaño normal (Esc)' : 'Maximizar Mapa a Pantalla Completa'}
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  isMaximized ? 'bg-blue-600 text-white shadow-xs hover:bg-blue-700' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Live Hover Status Card (Top Left) */}
            {hoveredState && (
              <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-xl shadow-lg max-w-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <span className="text-xs font-bold text-slate-900 truncate">{hoveredState.nombre}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                      hoveredState.esZonaSobreposicion || hoveredState.id?.startsWith('ZS-')
                        ? 'bg-red-600 text-white shadow-xs'
                        : isZeroState || (hoveredState.coberturaPromedioRTV || 0) <= 0
                        ? 'bg-slate-100 text-slate-700 border border-slate-300'
                        : hoveredState.estatus === 'OPTIMO'
                        ? 'bg-green-100 text-green-700'
                        : hoveredState.estatus === 'ESTABLE'
                        ? 'bg-blue-100 text-blue-700'
                        : hoveredState.estatus === 'VULNERABLE'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {hoveredState.esZonaSobreposicion || hoveredState.id?.startsWith('ZS-')
                      ? 'SOBREPOSICIÓN'
                      : isZeroState || (hoveredState.coberturaPromedioRTV || 0) <= 0
                      ? 'SIN REGISTRO (0%)'
                      : hoveredState.estatus}
                  </span>
                </div>
                {hoveredState.esZonaSobreposicion || hoveredState.id?.startsWith('ZS-') ? (
                  <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-[10px] text-red-950 font-medium leading-tight space-y-1">
                    <div className="font-bold text-red-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                      <span>Código IGVSB: cod_ent "00"</span>
                    </div>
                    <div className="text-[9.5px] text-red-800 font-semibold">{hoveredState.denominacionOficial || hoveredState.nombre}</div>
                    {hoveredState.estadosInvolucrados && (
                      <div className="text-red-700"><b>Estados:</b> {hoveredState.estadosInvolucrados}</div>
                    )}
                    {hoveredState.superficieKm2 && (
                      <div className="font-mono text-red-900"><b>Superficie:</b> {hoveredState.superficieKm2.toLocaleString()} km²</div>
                    )}
                  </div>
                ) : (
                  <>
                    {hoveredState.id === 'VE-Y' && (
                      <div className="mb-2 p-1.5 bg-blue-50 border border-blue-200 rounded text-[10px] text-blue-900 font-medium leading-tight">
                        <span className="font-bold block text-blue-950">Superficie Oficial: 159.542 km²</span>
                        <span className="text-[9px] text-blue-700">Ley Orgánica para la Defensa de la Guayana Esequiba</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                      <div>
                        Cobertura R/TV: <b className="font-mono text-slate-900">{hoveredState.coberturaPromedioRTV}%</b>
                      </div>
                      <div>
                        Internet THAI: <b className="font-mono text-blue-600">{hoveredState.penetracionInternetPromedio}%</b>
                      </div>
                      <div>
                        Capital: <b className="text-slate-800">{hoveredState.capital}</b>
                      </div>
                      <div>
                        Municipios: <b className="text-slate-800">{hoveredState.totalMunicipios}</b>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Quick Legend at bottom right */}
            <div className="absolute bottom-4 right-4 z-[400] bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-lg p-2.5 shadow-md text-[10px] flex flex-col space-y-1.5">
              <div className="font-bold text-slate-700 uppercase tracking-wider text-[9px]">
                {activeLayers.networkHeatmap ? 'Gradiente THAI Internet' : 'Semáforo R/TV & TDA'}
              </div>
              <div className="flex items-center space-x-3 text-slate-600 flex-wrap gap-y-1">
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1 shadow-xs" /> ≥75% Óptimo
                </span>
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1 shadow-xs" /> 60-74% Alerta
                </span>
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-1 shadow-xs" /> &lt;60% Crítico
                </span>
                <span className="flex items-center font-semibold text-red-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 mr-1 shadow-xs ring-1 ring-red-400" /> Sobreposición (cod_ent: 00)
                </span>
              </div>
            </div>

            {/* Sliding Layers & Telemetry Management Drawer */}
            {showLayerPanel && (
              <div className="absolute top-0 right-0 bottom-0 w-80 bg-white/98 backdrop-blur-md border-l border-slate-200 z-[500] shadow-2xl p-4 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Capas de Información GIS
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowLayerPanel(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Opacity Slider */}
                <div className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-semibold text-slate-700">Opacidad Polígonos:</span>
                    <span className="font-mono text-blue-600 font-bold">{Math.round(layerOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1"
                    step="0.05"
                    value={layerOpacity}
                    onChange={(e) => setLayerOpacity(parseFloat(e.target.value))}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Layer Toggles */}
                <div className="space-y-2 flex-1 text-xs">
                  {/* States GeoJSON */}
                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      <div>
                        <span className="font-semibold text-slate-800 block">Capa de Estados (24 + Esequibo)</span>
                        <span className="text-[10px] text-slate-500">Límites y coropletas estadales oficiales</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeLayers.states}
                      onChange={(e) => setActiveLayers({ ...activeLayers, states: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  {/* Zonas de Sobreposición GeoJSON */}
                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-red-200 bg-red-50/40 hover:bg-red-50 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                      <div>
                        <span className="font-semibold text-red-900 block">Zonas de Sobreposición (50)</span>
                        <span className="text-[10px] text-red-700">Polígonos oficiales cod_ent: "00" en color rojo</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeLayers.sobreposicion}
                      onChange={(e) => setActiveLayers({ ...activeLayers, sobreposicion: e.target.checked })}
                      className="rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  {/* Municipalities Polygons GeoJSON */}
                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                      <div>
                        <span className="font-semibold text-slate-800 block">Capa de Municipios (335)</span>
                        <span className="text-[10px] text-slate-500">Subdivisiones oficiales IGVSB 1:250.000</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeLayers.municipalities}
                      onChange={(e) => setActiveLayers({ ...activeLayers, municipalities: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  {/* Disputed & Claim Zones GeoJSON */}
                  <label className="flex items-center justify-between p-2.5 rounded-lg border border-blue-200 bg-blue-50/40 hover:bg-blue-50 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                      <div>
                        <span className="font-semibold text-blue-900 block">Estado Guayana Esequiba</span>
                        <span className="text-[10px] text-blue-700">Demarcación constitucional oficial (159.542 km²)</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeLayers.disputedZones}
                      onChange={(e) => setActiveLayers({ ...activeLayers, disputedZones: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  {/* Mode: Heatmap toggle */}
                  <label className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                      <span className="font-medium text-slate-700">Modo: Penetración Internet</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeLayers.networkHeatmap}
                      onChange={(e) => setActiveLayers({ ...activeLayers, networkHeatmap: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                  </label>

                  {/* Towers */}
                  <label className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <span className="font-medium text-slate-700">Torres y Nodos REDTV</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeLayers.towers}
                      onChange={(e) => setActiveLayers({ ...activeLayers, towers: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                  </label>

                  {/* Coverage Radius */}
                  <label className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                      <span className="font-medium text-slate-700">Radios de Cobertura (Km)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeLayers.coverageRadius}
                      onChange={(e) => setActiveLayers({ ...activeLayers, coverageRadius: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                  </label>

                  {/* Opinion Alerts */}
                  <label className="flex items-center justify-between p-2 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="font-medium text-slate-700">Alertas y Fake News (Pulsantes)</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={activeLayers.alerts}
                      onChange={(e) => setActiveLayers({ ...activeLayers, alerts: e.target.checked })}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                  </label>
                </div>

                {/* Metadata IGVSB */}
                <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
                  <div><b>Sistema Geodésico:</b> SIRGAS-REGVEN (EPSG:4326)</div>
                  <div><b>Servidor Cartográfico:</b> IDEGEO Servicio 7</div>
                  <div><b>Biblioteca del Mapa:</b> Leaflet v1.9.4 Interactive</div>
                </div>
              </div>
            )}
        </div>

        {activeConfig.geoViewer.enableVectorHeatmap && viewMode === 'VECTOR' && (
          /* SVG Official Vector Heatmap View with 100% IGVSB Shapefile paths */
          <div className="w-full h-full overflow-y-auto">
            <VenezuelaVectorHeatmap
              municipalities={municipalities}
              criticalTowers={criticalTowers}
              opinionAlerts={opinionAlerts}
              onSelectMunicipality={onSelectMunicipality}
              onOpenCounterNarrative={onOpenCounterNarrative}
            />
          </div>
        )}

        {viewMode === 'GRID' && (
          /* Grid Matrix View of 335 Municipalities */
          <div className="p-4 h-full flex flex-col overflow-hidden bg-slate-50">
            {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar municipio, código INE o estado..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-2xs"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedStateFilter}
                  onChange={(e) => setSelectedStateFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600 shadow-2xs cursor-pointer"
                >
                  <option value="TODOS">Todos los Estados ({statesList.length})</option>
                  {statesList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Municipality Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto pt-3 flex-1 pr-1">
              {filteredMunicipalities.map((muni) => {
                const isOptimo = muni.coberturaEfectivaRadioTV >= 75;
                const isAlerta = muni.coberturaEfectivaRadioTV >= 60 && muni.coberturaEfectivaRadioTV < 75;
                const statusColor = isOptimo ? 'text-green-600' : isAlerta ? 'text-yellow-600' : 'text-red-600';
                const dotBg = isOptimo ? 'bg-green-500' : isAlerta ? 'bg-yellow-500' : 'bg-red-500';

                return (
                  <div
                    key={muni.codigoINE}
                    onClick={() => setSelectedMuniModal(muni)}
                    className="p-3 rounded-lg border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer space-y-1.5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className={`w-2 h-2 rounded-full ${dotBg}`} />
                        <span className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                          {muni.nombre}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{muni.codigoINE}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{muni.estado} &bull; {muni.region}</div>
                    <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>
                        R/TV: <b className={`font-mono ${statusColor}`}>{muni.coberturaEfectivaRadioTV}%</b>
                      </span>
                      <span>
                        Net: <b className="font-mono text-slate-700">{muni.penetracionInternet}%</b>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Municipality Details Modal */}
      {selectedMuniModal && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                  <Building2 className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedMuniModal.nombre}</h3>
                  <p className="text-xs text-slate-500">
                    Estado {selectedMuniModal.estado} &bull; Código INE: {selectedMuniModal.codigoINE}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMuniModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Cobertura R/TV</div>
                  <div
                    className={`text-lg font-bold font-mono mt-0.5 ${
                      selectedMuniModal.coberturaEfectivaRadioTV >= 75
                        ? 'text-green-600'
                        : selectedMuniModal.coberturaEfectivaRadioTV >= 60
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {selectedMuniModal.coberturaEfectivaRadioTV}%
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Internet Hogares</div>
                  <div className="text-lg font-bold font-mono text-blue-600 mt-0.5">
                    {selectedMuniModal.penetracionInternet}%
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Población</div>
                  <div className="text-lg font-bold font-mono text-slate-800 mt-0.5">
                    {(selectedMuniModal.poblacion / 1000).toFixed(1)}k
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Medios Activos</div>
                  <div className="text-lg font-bold font-mono text-indigo-600 mt-0.5">
                    {selectedMuniModal.mediosComunitariosActivos}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Torre de Transmisión Enlazada:</span>
                  <span className="font-semibold text-slate-800">{selectedMuniModal.torreTransmisionCercana}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Señal TDA Digital:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedMuniModal.tdaDisponible ? '✅ Disponible' : '❌ No Disponible'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Banda Ku Satelital:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedMuniModal.bandaKuDisponible ? '✅ Disponible' : '❌ No Disponible'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Alertas de Opinión Activas:</span>
                  <span className={`font-semibold ${selectedMuniModal.alertasActivas > 0 ? 'text-red-600' : 'text-slate-700'}`}>
                    {selectedMuniModal.alertasActivas} alertas
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedMuniModal(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold"
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
