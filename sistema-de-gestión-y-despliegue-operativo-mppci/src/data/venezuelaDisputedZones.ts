// Datos Cartográficos Oficiales - Zonas en Reclamación y Disputas Limítrofes Interestatales
// República Bolivariana de Venezuela
// Basado en el Marco Geoestadístico del Instituto Geográfico de Venezuela Simón Bolívar (IGVSB)
// y expedientes limítrofes ante la Asamblea Nacional y Comisiones de Delimitación Territorial

export interface DisputedZoneVectorGeo {
  id: string;
  nombre: string;
  codigoOficial: string;
  tipo: 'DISPUTA_INTERESTATAL' | 'RECLAMACION_INTERNACIONAL' | 'CUERPO_AGUA_ESTRATEGICO';
  estadosInvolucrados: string[];
  municipiosAfectados: string[];
  sectoresPrincipales: string[];
  descripcion: string;
  fundamentoJuridico: string;
  superficieAproxKm2: number;
  path: string; // SVG path en viewBox 0 0 900 650
  centroid: [number, number]; // [x, y]
  latLng: [number, number]; // [lat, lng]
  coberturaEstimadaRTV: number;
  penetracionInternet: number;
  poblacionAprox?: number;
  color: string;
  patron: 'hatch-amber' | 'hatch-orange' | 'hatch-red' | 'lake-cyan';
}

import { VENEZUELA_GEOJSON } from './venezuelaGeoJson';
import { VENEZUELA_STATES_VECTORS } from './venezuelaOfficialVectors';

// Referencias a los vectores y geometrías oficiales del Esequibo
const esequiboVector = VENEZUELA_STATES_VECTORS.find(s => s.id === 'VE-Y');
const esequiboGeo = VENEZUELA_GEOJSON.features.find((f: any) => f.id === 'VE-Y');

export const VENEZUELA_DISPUTED_ZONES: DisputedZoneVectorGeo[] = [
  {
    id: 'disp-guayana-esequiba',
    nombre: 'Estado Guayana Esequiba',
    codigoOficial: 'EDO-GUAYANA-ESEQUIBA-24',
    tipo: 'RECLAMACION_INTERNACIONAL',
    estadosInvolucrados: ['Estado Guayana Esequiba', 'República Bolivariana de Venezuela'],
    municipiosAfectados: [
      'Municipio Guayana Esequiba',
      'Tumeremo (Sede Administrativa Provisional)',
      'San Martín de Turumbang',
      'Fachada Atlántica Continental Esequiba'
    ],
    sectoresPrincipales: [
      'Punta Playa (Hito 1)',
      'Río Esequibo (Margen Occidental)',
      'Río Cuyuní',
      'Río Mazaruni',
      'Río Venamo',
      'Serranía de Imataca',
      'Sabana de Rupununi',
      'Sierra Pacaraima',
      'Sierra Acarai'
    ],
    descripcion: 'Entidad federal de la República Bolivariana de Venezuela con una superficie oficial y constitucional de exactamente 159.542 km², comprendido al oeste del curso del Río Esequibo. Sujeto de pleno derecho al Acuerdo de Ginebra del 17 de febrero de 1966 y a la Ley Orgánica para la Defensa de la Guayana Esequiba.',
    fundamentoJuridico: 'Acuerdo de Ginebra del 17 de febrero de 1966 (Tratado Internacional ONU N° 8410), nulidad absoluta del Laudo Arbitral de París de 1899 y Ley Orgánica para la Defensa de la Guayana Esequiba (G.O. Extraordinaria N° 6.798 del 3 de abril de 2024). Medida Oficial: 159.542 km².',
    superficieAproxKm2: 159542,
    path: esequiboVector?.path || '',
    centroid: [757.7, 413.9],
    latLng: [5.20, -59.50],
    coberturaEstimadaRTV: 22.0,
    penetracionInternet: 14.5,
    poblacionAprox: 125000,
    color: '#0284c7',
    patron: 'lake-cyan'
  }
];

// FeatureCollection GeoJSON para renderizado en Leaflet
export const VENEZUELA_DISPUTED_GEOJSON: any = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "disp-guayana-esequiba",
      properties: {
        id: "disp-guayana-esequiba",
        nombre: "Estado Guayana Esequiba",
        codigoOficial: "EDO-GUAYANA-ESEQUIBA-24",
        tipo: "RECLAMACION_INTERNACIONAL",
        estados: "Estado Guayana Esequiba · Soberanía Nacional",
        superficieKm2: 159542,
        coberturaRTV: 22.0,
        penetracionNet: 14.5,
        sectores: "Punta Playa (Hito 1), Margen Oeste del Río Esequibo, Cuenca del Cuyuní, Mazaruni, Rupununi, Sierra Pacaraima, Sierra Acarai",
        fundamento: "Acuerdo de Ginebra del 17 de febrero de 1966 (Tratado ONU N° 8410) y Ley Orgánica para la Defensa de la Guayana Esequiba (Superficie Oficial: 159.542 km²)",
        color: "#0284c7"
      },
      geometry: esequiboGeo ? esequiboGeo.geometry : {
        type: "Polygon",
        coordinates: []
      }
    }
  ]
};
