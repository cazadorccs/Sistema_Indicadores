// Datos Cartográficos Vectoriales Oficiales - República Bolivariana de Venezuela
// Basado en el estándar del Instituto Geográfico de Venezuela Simón Bolívar (IGVSB)
// Capas oficiales:
// - Estadal: ba_4189_dpt_estadal_de_venezuela_250000_20150707 (Sistema Geodésico SIRGAS-REGVEN)
// - Municipal: ba_4189_dpt_municipal_de_venezuela_250000_20150707 (335 Municipios Oficiales)

export {
  VENEZUELA_STATES_VECTORS,
  VENEZUELA_MUNICIPAL_VECTORS,
  type StateVectorGeo,
  type MunicipalityVectorGeo
} from './venezuelaOfficialVectors';

export {
  VENEZUELA_DISPUTED_ZONES,
  VENEZUELA_DISPUTED_GEOJSON,
  type DisputedZoneVectorGeo
} from './venezuelaDisputedZones';

export interface IGVSBServiceMetadata {
  nombreServicio: string;
  urlServicio: string;
  proveedor: string;
  sistemaReferencia: string; // SIRGAS-REGVEN (EPSG:4326 / EPSG:4189)
  formatoExportacion: string;
  capasDisponibles: {
    id: string;
    nombre: string;
    descripcion: string;
    tipo: 'POLIGONO' | 'LINEA' | 'PUNTO' | 'RASTER';
    activoPorDefecto: boolean;
    color: string;
  }[];
}

export const IGVSB_SERVICE_CONFIG: IGVSBServiceMetadata = {
  nombreServicio: 'IDEGEO - Cartografía Oficial 1:250.000 (Marco Geoestadístico Nacional)',
  urlServicio: 'https://igvsb.gob.ve/servicio/7',
  proveedor: 'Instituto Geográfico de Venezuela Simón Bolívar (IGVSB)',
  sistemaReferencia: 'SIRGAS-REGVEN / EPSG:4326 (WGS84) - EPSG:4189',
  formatoExportacion: 'ESRI Shapefile / GeoJSON Oficial',
  capasDisponibles: [
    {
      id: 'capa-limites-estados',
      nombre: 'Límites Político-Territoriales Estadales (24 Entidades + Esequibo + Dep. Fed.)',
      descripcion: 'Vectores cartográficos estadales de primer orden del Marco Geoestadístico Nacional IGVSB',
      tipo: 'POLIGONO',
      activoPorDefecto: true,
      color: '#3b82f6'
    },
    {
      id: 'capa-zonas-sobreposicion',
      nombre: 'Zonas de Sobreposición de Jurisdicción (50 Polígonos cod_ent: "00")',
      descripcion: 'Áreas de sobreposición territorial interestatal identificadas oficialmente con código cod_ent: "00" en el Shapefile IGVSB 1:250.000',
      tipo: 'POLIGONO',
      activoPorDefecto: true,
      color: '#ef4444'
    },
    {
      id: 'capa-limites-municipios',
      nombre: 'Límites Político-Territoriales Municipales (335 Municipios)',
      descripcion: 'Subdivisión política municipal oficial con georreferenciación completa y métricas',
      tipo: 'POLIGONO',
      activoPorDefecto: true,
      color: '#06b6d4'
    },
    {
      id: 'capa-cobertura-rtv',
      nombre: 'Mapa de Calor Coroplético: Cobertura R/TV & TDA',
      descripcion: 'Gradiente cromático de penetración y disponibilidad técnica de señales abiertas',
      tipo: 'POLIGONO',
      activoPorDefecto: true,
      color: '#10b981'
    },
    {
      id: 'capa-nodos-redtv',
      nombre: 'Infraestructura de Nodos y Torres REDTV / Banda Ku',
      descripcion: 'Puntos vectoriales georreferenciados de telemetría y radio de cobertura satelital/TDA',
      tipo: 'PUNTO',
      activoPorDefecto: true,
      color: '#6366f1'
    },
    {
      id: 'capa-penetracion-net',
      nombre: 'Penetración Banda Ancha Móvil e Internet Hogares (THAI)',
      descripcion: 'Polígonos de densidad de conectividad y líneas activas en territorio',
      tipo: 'POLIGONO',
      activoPorDefecto: false,
      color: '#0ea5e9'
    },
    {
      id: 'capa-alertas-tempranas',
      nombre: 'Alertas Tempranas & Matrices de Opinión Georreferenciadas',
      descripcion: 'Eventos de desinformación y alertas críticas situacionales activas',
      tipo: 'PUNTO',
      activoPorDefecto: true,
      color: '#ef4444'
    },
    {
      id: 'capa-medios-comunitarios',
      nombre: 'Despliegue de Medios Alternativos y Comunitarios (MAC)',
      descripcion: 'Emisoras comunitarias, colectivos comunicacionales y corresponsalías populares',
      tipo: 'PUNTO',
      activoPorDefecto: false,
      color: '#f59e0b'
    },
    {
      id: 'capa-zonas-reclamacion',
      nombre: 'Estado Guayana Esequiba (159.542 km²)',
      descripcion: 'Demarcación cartográfica oficial del Estado Guayana Esequiba (Ley Orgánica para la Defensa de la Guayana Esequiba, 159.542 km²)',
      tipo: 'POLIGONO',
      activoPorDefecto: true,
      color: '#0284c7'
    },
    {
      id: 'capa-malla-geodesica',
      nombre: 'Malla Geodésica SIRGAS-REGVEN & Cuadrícula INE',
      descripcion: 'Coordenadas geodésicas y red de control geodésico pasivo y activo del IGVSB',
      tipo: 'LINEA',
      activoPorDefecto: false,
      color: '#94a3b8'
    }
  ]
};

export interface VectorCoverageNode {
  id: string;
  nombre: string;
  estado: string;
  municipio?: string;
  tipo: 'TELEPUERTO_KU' | 'REPETIDOR_TDA' | 'ESTACION_BASE';
  frecuencia: string;
  radioKm: number;
  radioSvg: number;
  coordenadasSvg: [number, number]; // [x, y]
  latLng: [number, number]; // [lat, lng]
  operativo: boolean;
  potenciaKw?: number;
}

export const VECTOR_COVERAGE_NODES: VectorCoverageNode[] = [
  {
    id: 'node-bamari',
    nombre: 'Telepuerto Principal Bamari (Banda Ku)',
    estado: 'Guárico',
    municipio: 'Julián Mellado',
    tipo: 'TELEPUERTO_KU',
    frecuencia: '11.7 - 14.5 GHz',
    radioKm: 180,
    radioSvg: 58,
    coordenadasSvg: [386, 215],
    latLng: [9.28, -67.04],
    operativo: true,
    potenciaKw: 15.0
  },
  {
    id: 'node-camatagua',
    nombre: 'Telepuerto Respaldo Camatagua',
    estado: 'Aragua',
    municipio: 'Camatagua',
    tipo: 'TELEPUERTO_KU',
    frecuencia: '11.7 - 12.2 GHz',
    radioKm: 140,
    radioSvg: 48,
    coordenadasSvg: [395, 178],
    latLng: [9.83, -66.86],
    operativo: true,
    potenciaKw: 10.0
  },
  {
    id: 'node-waraira',
    nombre: 'Nodo Matriz Waraira Repano (Ávila TDA)',
    estado: 'Distrito Capital',
    municipio: 'Libertador',
    tipo: 'REPETIDOR_TDA',
    frecuencia: 'Canales 22-25 UHF',
    radioKm: 85,
    radioSvg: 32,
    coordenadasSvg: [392, 126],
    latLng: [10.53, -66.90],
    operativo: true,
    potenciaKw: 5.0
  },
  {
    id: 'node-terepaima',
    nombre: 'Nodo Regional Cerro Terepaima',
    estado: 'Lara',
    municipio: 'Palavecino',
    tipo: 'REPETIDOR_TDA',
    frecuencia: 'Canal 23 UHF',
    radioKm: 75,
    radioSvg: 28,
    coordenadasSvg: [278, 149],
    latLng: [10.03, -69.27],
    operativo: true,
    potenciaKw: 4.5
  },
  {
    id: 'node-macondo',
    nombre: 'Nodo Central Cerro Macondo',
    estado: 'Carabobo',
    municipio: 'Naguanagua',
    tipo: 'REPETIDOR_TDA',
    frecuencia: 'Canal 24 UHF',
    radioKm: 70,
    radioSvg: 26,
    coordenadasSvg: [338, 145],
    latLng: [10.15, -68.02],
    operativo: true,
    potenciaKw: 4.0
  },
  {
    id: 'node-manzano',
    nombre: 'Estación Base Cerro El Manzano',
    estado: 'Zulia',
    municipio: 'Maracaibo',
    tipo: 'REPETIDOR_TDA',
    frecuencia: 'Canal 22 UHF',
    radioKm: 90,
    radioSvg: 34,
    coordenadasSvg: [142, 124],
    latLng: [10.65, -71.65],
    operativo: true,
    potenciaKw: 5.0
  },
  {
    id: 'node-santa-ana',
    nombre: 'Nodo Cerro Santa Ana (Paraguaná)',
    estado: 'Falcón',
    municipio: 'Falcón',
    tipo: 'REPETIDOR_TDA',
    frecuencia: 'Canal 23 UHF',
    radioKm: 65,
    radioSvg: 24,
    coordenadasSvg: [251, 62],
    latLng: [11.82, -69.95],
    operativo: true,
    potenciaKw: 3.5
  },
  {
    id: 'node-copey',
    nombre: 'Nodo Insular Cerro El Copey',
    estado: 'Nueva Esparta',
    municipio: 'Arismendi',
    tipo: 'REPETIDOR_TDA',
    frecuencia: 'Canal 25 UHF',
    radioKm: 60,
    radioSvg: 22,
    coordenadasSvg: [533, 102],
    latLng: [11.00, -63.90],
    operativo: true,
    potenciaKw: 3.0
  },
  {
    id: 'node-boqueron',
    nombre: 'Nodo Nororiental Cerro Boquerón',
    estado: 'Monagas',
    municipio: 'Maturín',
    tipo: 'ESTACION_BASE',
    frecuencia: 'Canal 22 UHF',
    radioKm: 70,
    radioSvg: 26,
    coordenadasSvg: [578, 169],
    latLng: [9.75, -63.18],
    operativo: true,
    potenciaKw: 4.0
  },
  {
    id: 'node-zamuro',
    nombre: 'Nodo Guayana Cerro El Zamuro',
    estado: 'Bolívar',
    municipio: 'Angostura del Orinoco',
    tipo: 'REPETIDOR_TDA',
    frecuencia: 'Canal 24 UHF',
    radioKm: 95,
    radioSvg: 35,
    coordenadasSvg: [558, 240],
    latLng: [8.12, -63.55],
    operativo: true,
    potenciaKw: 5.0
  },
  {
    id: 'node-tachira',
    nombre: 'Nodo Andino Cerro La Cruz',
    estado: 'Táchira',
    municipio: 'San Cristóbal',
    tipo: 'REPETIDOR_TDA',
    frecuencia: 'Canal 23 UHF',
    radioKm: 65,
    radioSvg: 24,
    coordenadasSvg: [142, 260],
    latLng: [7.77, -72.22],
    operativo: true,
    potenciaKw: 3.5
  },
  {
    id: 'node-amazonas',
    nombre: 'Nodo Fronterizo Cerro La Culebra',
    estado: 'Amazonas',
    municipio: 'Atures',
    tipo: 'ESTACION_BASE',
    frecuencia: 'Canal 21 UHF / Ku',
    radioKm: 80,
    radioSvg: 30,
    coordenadasSvg: [362, 368],
    latLng: [5.66, -67.62],
    operativo: false,
    potenciaKw: 2.5
  }
];
