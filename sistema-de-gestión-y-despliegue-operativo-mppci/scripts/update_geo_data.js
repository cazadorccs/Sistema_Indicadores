import fs from 'fs';
import { projectToSvg } from './process_shapefile.js';

const vectors = JSON.parse(fs.readFileSync('scripts/extracted_vectors.json', 'utf-8'));

// Format nodes with exact projected SVG coordinates
const nodes = [
  {
    id: 'NOD-01',
    nombre: 'Estación Mecedores TDA/FM',
    tipo: 'TORRE_TDA',
    latLng: [10.5312, -66.9189],
    radioKm: 65,
    radioSvg: 32,
    potencia: 98.4,
    operativo: true,
    estado: 'Distrito Capital / Miranda',
    municipios: ['Libertador', 'Chacao', 'Sucre', 'Baruta', 'El Hatillo', 'Vargas']
  },
  {
    id: 'NOD-02',
    nombre: 'Torre Cerro Cochino (Zulia)',
    tipo: 'TORRE_TDA',
    latLng: [10.6558, -71.6375],
    radioKm: 85,
    radioSvg: 42,
    potencia: 94.6,
    operativo: true,
    estado: 'Zulia',
    municipios: ['Maracaibo', 'San Francisco', 'Cabimas', 'Lagunillas', 'Mara']
  },
  {
    id: 'NOD-03',
    nombre: 'Torre Cerro Copey Bárbula',
    tipo: 'TORRE_TDA',
    latLng: [10.2312, -68.0044],
    radioKm: 55,
    radioSvg: 28,
    potencia: 89.2,
    operativo: true,
    estado: 'Carabobo',
    municipios: ['Valencia', 'Naguanagua', 'San Diego', 'Guacara']
  },
  {
    id: 'NOD-04',
    nombre: 'Torre Cerro Manzano (Lara)',
    tipo: 'TORRE_TDA',
    latLng: [10.0678, -69.3474],
    radioKm: 70,
    radioSvg: 35,
    potencia: 96.3,
    operativo: true,
    estado: 'Lara / Yaracuy',
    municipios: ['Iribarren', 'Palavecino', 'Crespo', 'Jiménez']
  },
  {
    id: 'NOD-05',
    nombre: 'Torre Cerro Negro (Monagas)',
    tipo: 'TORRE_TDA',
    latLng: [9.7456, -63.1789],
    radioKm: 60,
    radioSvg: 30,
    potencia: 93.8,
    operativo: true,
    estado: 'Monagas',
    municipios: ['Maturín', 'Ezequiel Zamora', 'Punceres', 'Caripe']
  },
  {
    id: 'NOD-06',
    nombre: 'Torre Paramillo (Táchira)',
    tipo: 'TORRE_TDA',
    latLng: [7.7669, -72.2250],
    radioKm: 50,
    radioSvg: 26,
    potencia: 84.1,
    operativo: true,
    estado: 'Táchira',
    municipios: ['San Cristóbal', 'Cárdenas', 'Torbes', 'Guásimos']
  },
  {
    id: 'NOD-07',
    nombre: 'Telepuerto Satelital Banda Ku Caroní',
    tipo: 'TELEPUERTO_KU',
    latLng: [8.3500, -62.7000],
    radioKm: 120,
    radioSvg: 58,
    potencia: 91.8,
    operativo: true,
    estado: 'Bolívar',
    municipios: ['Caroní', 'Angostura del Orinoco', 'Piar']
  },
  {
    id: 'NOD-08',
    nombre: 'Estación Satelital Puerto Ayacucho',
    tipo: 'TELEPUERTO_KU',
    latLng: [5.6600, -67.6200],
    radioKm: 90,
    radioSvg: 45,
    potencia: 75.2,
    operativo: true,
    estado: 'Amazonas',
    municipios: ['Atures', 'Autana']
  }
].map(n => ({
  ...n,
  coordenadasSvg: projectToSvg(n.latLng[1], n.latLng[0])
}));

const headerContent = `// Datos Cartográficos Vectoriales Oficiales - República Bolivariana de Venezuela
// Basado en el estándar del Instituto Geográfico de Venezuela Simón Bolívar (IGVSB)
// Capa oficial: ba_4189_dpt_municipal_de_venezuela_250000_20150707 (Sistema Geodésico SIRGAS-REGVEN)

export interface StateVectorGeo {
  id: string;
  codigoINE: string;
  nombre: string;
  capital: string;
  region: string;
  path: string; // Exact SVG path vector from official IGVSB shapefile
  centroid: [number, number]; // [x, y] in viewBox (0 0 900 650)
  latLng: [number, number]; // [lat, lng]
  poblacion: number;
  totalMunicipios: number;
  coberturaPromedioRTV: number;
  penetracionInternetPromedio: number;
  estatus: 'OPTIMO' | 'ESTABLE' | 'VULNERABLE' | 'CRITICO';
}

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
  nombreServicio: 'IDEGEO - Cartografía Oficial 1:250.000 (Marco Geoestadístico)',
  urlServicio: 'https://igvsb.gob.ve/servicio/7',
  proveedor: 'Instituto Geográfico de Venezuela Simón Bolívar (IGVSB)',
  sistemaReferencia: 'SIRGAS-REGVEN / EPSG:4326 (WGS84) - EPSG:4189',
  formatoExportacion: 'ESRI Shapefile / GeoJSON Oficial',
  capasDisponibles: [
    {
      id: 'capa-limites-estados',
      nombre: 'Límites Político-Territoriales Estadales (24 Entidades + Territorio Esequibo)',
      descripcion: 'Vectores cartográficos de primer orden del Marco Geoestadístico Nacional IGVSB',
      tipo: 'POLIGONO',
      activoPorDefecto: true,
      color: '#3b82f6'
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
      color: '#06b6d4'
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
      id: 'capa-malla-geodesica',
      nombre: 'Malla Geodésica SIRGAS-REGVEN & Cuadrícula INE',
      descripcion: 'Coordenadas geodésicas y red de control geodésico pasivo y activo del IGVSB',
      tipo: 'LINEA',
      activoPorDefecto: false,
      color: '#94a3b8'
    }
  ]
};

// Accurate Venezuelan federal entities vector paths for viewBox 0 0 900 650
// Extracted with mathematical fidelity from official IGVSB shapefile
export const VENEZUELA_STATES_VECTORS: StateVectorGeo[] = ${JSON.stringify(vectors, null, 2)};

export interface VectorCoverageNode {
  id: string;
  nombre: string;
  tipo: 'TORRE_TDA' | 'TELEPUERTO_KU' | 'REPETIDORA_FM' | 'NODO_FIBRA';
  coordenadasSvg: [number, number];
  latLng: [number, number];
  radioKm: number;
  radioSvg: number;
  potencia: number;
  operativo: boolean;
  estado: string;
  municipios: string[];
}

export const VECTOR_COVERAGE_NODES: VectorCoverageNode[] = ${JSON.stringify(nodes, null, 2)};
`;

fs.writeFileSync('src/data/venezuelaGeoData.ts', headerContent, 'utf-8');
console.log('Successfully wrote src/data/venezuelaGeoData.ts');
