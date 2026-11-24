// Script to extract official IGVSB Venezuelan states & municipalities from uploaded shapefile
import shapefile from 'shapefile';
import * as turf from '@turf/turf';
import fs from 'fs';

// State metadata mapping
const STATE_META = {
  '01': { id: 'VE-A', codigoINE: '0100', nombre: 'Distrito Capital', capital: 'Caracas', region: 'Capital', poblacion: 2100000, totalMunicipios: 1, coberturaPromedioRTV: 98.2, penetracionInternetPromedio: 92.5, estatus: 'OPTIMO' },
  '02': { id: 'VE-V', codigoINE: '0200', nombre: 'Amazonas', capital: 'Puerto Ayacucho', region: 'Guayana', poblacion: 190000, totalMunicipios: 7, coberturaPromedioRTV: 48.5, penetracionInternetPromedio: 34.2, estatus: 'CRITICO' },
  '03': { id: 'VE-T', codigoINE: '0300', nombre: 'Anzoátegui', capital: 'Barcelona', region: 'Nororiental', poblacion: 1650000, totalMunicipios: 21, coberturaPromedioRTV: 82.4, penetracionInternetPromedio: 68.7, estatus: 'ESTABLE' },
  '04': { id: 'VE-S', codigoINE: '0400', nombre: 'Apure', capital: 'San Fernando de Apure', region: 'Los Llanos', poblacion: 620000, totalMunicipios: 7, coberturaPromedioRTV: 52.1, penetracionInternetPromedio: 41.5, estatus: 'CRITICO' },
  '05': { id: 'VE-B', codigoINE: '0500', nombre: 'Aragua', capital: 'Maracay', region: 'Central', poblacion: 1850000, totalMunicipios: 18, coberturaPromedioRTV: 91.2, penetracionInternetPromedio: 84.1, estatus: 'OPTIMO' },
  '06': { id: 'VE-R', codigoINE: '0600', nombre: 'Barinas', capital: 'Barinas', region: 'Los Andes', poblacion: 970000, totalMunicipios: 12, coberturaPromedioRTV: 69.8, penetracionInternetPromedio: 53.6, estatus: 'VULNERABLE' },
  '07': { id: 'VE-U', codigoINE: '0700', nombre: 'Bolívar', capital: 'Ciudad Bolívar', region: 'Guayana', poblacion: 1820000, totalMunicipios: 11, coberturaPromedioRTV: 74.3, penetracionInternetPromedio: 61.2, estatus: 'ESTABLE' },
  '08': { id: 'VE-C', codigoINE: '0800', nombre: 'Carabobo', capital: 'Valencia', region: 'Central', poblacion: 2600000, totalMunicipios: 14, coberturaPromedioRTV: 94.6, penetracionInternetPromedio: 88.3, estatus: 'OPTIMO' },
  '09': { id: 'VE-D', codigoINE: '0900', nombre: 'Cojedes', capital: 'San Carlos', region: 'Central', poblacion: 370000, totalMunicipios: 9, coberturaPromedioRTV: 71.5, penetracionInternetPromedio: 58.2, estatus: 'ESTABLE' },
  '10': { id: 'VE-W', codigoINE: '1000', nombre: 'Delta Amacuro', capital: 'Tucupita', region: 'Guayana', poblacion: 210000, totalMunicipios: 4, coberturaPromedioRTV: 45.2, penetracionInternetPromedio: 29.8, estatus: 'CRITICO' },
  '11': { id: 'VE-E', codigoINE: '1100', nombre: 'Falcón', capital: 'Coro', region: 'Centroccidental', poblacion: 1080000, totalMunicipios: 25, coberturaPromedioRTV: 78.9, penetracionInternetPromedio: 64.7, estatus: 'ESTABLE' },
  '12': { id: 'VE-F', codigoINE: '1200', nombre: 'Guárico', capital: 'San Juan de los Morros', region: 'Los Llanos', poblacion: 950000, totalMunicipios: 15, coberturaPromedioRTV: 66.4, penetracionInternetPromedio: 49.3, estatus: 'VULNERABLE' },
  '13': { id: 'VE-G', codigoINE: '1300', nombre: 'Lara', capital: 'Barquisimeto', region: 'Centroccidental', poblacion: 2050000, totalMunicipios: 9, coberturaPromedioRTV: 88.7, penetracionInternetPromedio: 76.5, estatus: 'OPTIMO' },
  '14': { id: 'VE-H', codigoINE: '1400', nombre: 'Mérida', capital: 'Mérida', region: 'Los Andes', poblacion: 1040000, totalMunicipios: 23, coberturaPromedioRTV: 79.2, penetracionInternetPromedio: 66.8, estatus: 'ESTABLE' },
  '15': { id: 'VE-M', codigoINE: '1500', nombre: 'Miranda', capital: 'Los Teques', region: 'Capital', poblacion: 3200000, totalMunicipios: 21, coberturaPromedioRTV: 93.5, penetracionInternetPromedio: 81.4, estatus: 'OPTIMO' },
  '16': { id: 'VE-J', codigoINE: '1600', nombre: 'Monagas', capital: 'Maturín', region: 'Nororiental', poblacion: 1020000, totalMunicipios: 13, coberturaPromedioRTV: 77.1, penetracionInternetPromedio: 62.9, estatus: 'ESTABLE' },
  '17': { id: 'VE-K', codigoINE: '1700', nombre: 'Nueva Esparta', capital: 'La Asunción', region: 'Insular', poblacion: 615000, totalMunicipios: 11, coberturaPromedioRTV: 89.3, penetracionInternetPromedio: 85.0, estatus: 'OPTIMO' },
  '18': { id: 'VE-L', codigoINE: '1800', nombre: 'Portuguesa', capital: 'Guanare', region: 'Centroccidental', poblacion: 1030000, totalMunicipios: 14, coberturaPromedioRTV: 72.8, penetracionInternetPromedio: 56.4, estatus: 'ESTABLE' },
  '19': { id: 'VE-O', codigoINE: '1900', nombre: 'Sucre', capital: 'Cumaná', region: 'Nororiental', poblacion: 1090000, totalMunicipios: 15, coberturaPromedioRTV: 68.3, penetracionInternetPromedio: 51.7, estatus: 'VULNERABLE' },
  '20': { id: 'VE-N', codigoINE: '2000', nombre: 'Táchira', capital: 'San Cristóbal', region: 'Los Andes', poblacion: 1270000, totalMunicipios: 29, coberturaPromedioRTV: 81.6, penetracionInternetPromedio: 70.3, estatus: 'ESTABLE' },
  '21': { id: 'VE-P', codigoINE: '2100', nombre: 'Trujillo', capital: 'Trujillo', region: 'Los Andes', poblacion: 890000, totalMunicipios: 20, coberturaPromedioRTV: 70.4, penetracionInternetPromedio: 54.1, estatus: 'ESTABLE' },
  '22': { id: 'VE-Q', codigoINE: '2200', nombre: 'Yaracuy', capital: 'San Felipe', region: 'Centroccidental', poblacion: 740000, totalMunicipios: 14, coberturaPromedioRTV: 80.5, penetracionInternetPromedio: 67.2, estatus: 'ESTABLE' },
  '23': { id: 'VE-Z', codigoINE: '2300', nombre: 'Zulia', capital: 'Maracaibo', region: 'Occidental', poblacion: 4300000, totalMunicipios: 21, coberturaPromedioRTV: 86.4, penetracionInternetPromedio: 75.9, estatus: 'OPTIMO' },
  '24': { id: 'VE-X', codigoINE: '2400', nombre: 'La Guaira', capital: 'La Guaira', region: 'Capital', poblacion: 385000, totalMunicipios: 1, coberturaPromedioRTV: 91.8, penetracionInternetPromedio: 79.6, estatus: 'OPTIMO' },
  'ES': { id: 'VE-Y', codigoINE: '9900', nombre: 'Guayana Esequiba', capital: 'Tumeremo (Adm)', region: 'Guayana', poblacion: 125000, totalMunicipios: 1, coberturaPromedioRTV: 31.4, penetracionInternetPromedio: 18.2, estatus: 'CRITICO' }
};

// Reference centers for dispute and border resolution
const STATE_CENTERS = {
  '01': [10.48, -66.90],
  '02': [3.40, -65.50],
  '03': [9.00, -64.40],
  '04': [7.00, -69.00],
  '05': [10.00, -67.10],
  '06': [8.20, -70.20],
  '07': [6.00, -63.50],
  '08': [10.15, -68.00],
  '09': [9.30, -68.40],
  '10': [8.80, -61.50],
  '11': [11.10, -69.80],
  '12': [8.90, -66.50],
  '13': [10.10, -69.60],
  '14': [8.60, -71.20],
  '15': [10.30, -66.50],
  '16': [9.60, -63.10],
  '17': [10.98, -64.00],
  '18': [9.10, -69.20],
  '19': [10.45, -63.30],
  '20': [7.90, -72.10],
  '21': [9.45, -70.50],
  '22': [10.30, -68.80],
  '23': [10.00, -71.80],
  '24': [10.55, -66.90],
  'ES': [5.00, -59.50]
};

function dist(c1, c2) {
  return Math.hypot(c1[0] - c2[0], c1[1] - c2[1]);
}

export function resolveStateCode(p, geom) {
  if (p.entidad === 'TERRITORIO ESEQUIBO' || (!p.cod_ent && !p.ent_fdral)) return 'ES';

  const ent = (p.ent_fdral || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  const mun = (p.municipio || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

  // Fix known clerical error in IGVSB dbf: Peñalver had cod_ent '02' instead of '03'
  // Municipio Fernando de Peñalver (Puerto Píritu) belongs exclusively to Estado Anzoátegui
  if (mun.includes('PENALVER') || mun.includes('PIRITU')) return '03';

  // Check standard states (excluding dispute / border overlap slivers)
  const isDispute = ent.includes('SOBREPOSICION') || ent.includes('SIN JURISDICCION') || ent.includes('ENTRE LOS ESTADOS') || p.cod_ent === '00';

  if (!isDispute) {
    if (ent.includes('DISTRITO CAPITAL')) return '01';
    if (ent.includes('AMAZONAS')) return '02';
    if (ent.includes('ANZOATEGUI')) return '03';
    if (ent.includes('APURE')) return '04';
    if (ent.includes('ARAGUA')) return '05';
    if (ent.includes('BARINAS')) return '06';
    if (ent.includes('MIRANDA')) return '15'; // Put Miranda before Bolivar because 'ESTADO BOLIVARIANO MIRANDA' contains 'BOLIVAR'
    if (ent.includes('BOLIVAR')) return '07';
    if (ent.includes('CARABOBO')) return '08';
    if (ent.includes('COJEDES')) return '09';
    if (ent.includes('DELTA AMACURO')) return '10';
    if (ent.includes('FALCON')) return '11';
    if (ent.includes('GUARICO')) return '12';
    if (ent.includes('LARA')) return '13';
    if (ent.includes('MERIDA')) return '14';
    if (ent.includes('MONAGAS')) return '16';
    if (ent.includes('NUEVA ESPARTA')) return '17';
    if (ent.includes('PORTUGUESA')) return '18';
    if (ent.includes('SUCRE')) return '19';
    if (ent.includes('TACHIRA')) return '20';
    if (ent.includes('TRUJILLO')) return '21';
    if (ent.includes('YARACUY')) return '22';
    if (ent.includes('ZULIA')) return '23';
    if (ent.includes('VARGAS') || ent.includes('GUAIRA')) return '24';
  }

  // Handle dispute and border sliver zones by matching candidate states and picking the closest centroid
  let pt = [10.0, -66.0];
  try {
    const c = turf.centroid({ type: 'Feature', geometry: geom, properties: p }).geometry.coordinates;
    pt = [c[1], c[0]]; // [lat, lng]
  } catch (e) {}

  const candidates = [];
  if (ent.includes('ANZOATEGUI')) candidates.push('03');
  if (ent.includes('GUARICO')) candidates.push('12');
  if (ent.includes('FALCON')) candidates.push('11');
  if (ent.includes('LARA')) candidates.push('13');
  if (ent.includes('YARACUY')) candidates.push('22');
  if (ent.includes('ZULIA')) candidates.push('23');
  if (ent.includes('PORTUGUESA')) candidates.push('18');
  if (ent.includes('TRUJILLO')) candidates.push('21');
  if (ent.includes('MONAGAS')) candidates.push('16');
  if (ent.includes('SUCRE')) candidates.push('19');
  if (ent.includes('ARAGUA')) candidates.push('05');
  if (ent.includes('CARABOBO')) candidates.push('08');
  if (ent.includes('BARINAS')) candidates.push('06');
  if (ent.includes('MERIDA')) candidates.push('14');
  if (ent.includes('TACHIRA')) candidates.push('20');
  if (ent.includes('COJEDES')) candidates.push('09');

  if (candidates.length > 0) {
    candidates.sort((a, b) => dist(pt, STATE_CENTERS[a]) - dist(pt, STATE_CENTERS[b]));
    return candidates[0];
  }

  // General fallback: pick geographically nearest state
  let closest = '12';
  let minD = Infinity;
  for (const [code, center] of Object.entries(STATE_CENTERS)) {
    const d = dist(pt, center);
    if (d < minD) {
      minD = d;
      closest = code;
    }
  }
  return closest;
}

// SVG projection function: maps [lng, lat] to [0 0 900 650]
export function projectToSvg(lng, lat) {
  const x = +(450 + (lng - (-65.73)) * 48.5).toFixed(1);
  const y = +(43.2 + (12.20 - lat) * 48.8).toFixed(1);
  return [x, y];
}

// Convert GeoJSON geometry to SVG Path string
export function geomToSvgPath(geom) {
  if (!geom || !geom.coordinates) return '';
  const coords = geom.coordinates;
  
  if (geom.type === 'Polygon') {
    return coords.map(ring => {
      return ring.map((pt, idx) => {
        const [x, y] = projectToSvg(pt[0], pt[1]);
        return (idx === 0 ? 'M ' : 'L ') + x + ' ' + y;
      }).join(' ') + ' Z';
    }).join(' ');
  } else if (geom.type === 'MultiPolygon') {
    return coords.map(polygon => {
      return polygon.map(ring => {
        return ring.map((pt, idx) => {
          const [x, y] = projectToSvg(pt[0], pt[1]);
          return (idx === 0 ? 'M ' : 'L ') + x + ' ' + y;
        }).join(' ') + ' Z';
      }).join(' ');
    }).join(' ');
  }
  return '';
}

async function process() {
  console.log('Reading shapefile...');
  const source = await shapefile.open(
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.shp',
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.dbf'
  );

  const stateGroups = {};
  for (const k in STATE_META) stateGroups[k] = [];

  const municipalitiesList = [];

  while (true) {
    const res = await source.read();
    if (res.done) break;
    const p = res.value.properties;
    const geom = res.value.geometry;
    if (!geom) continue;

    let cod = resolveStateCode(p, geom);

    // Simplify polygon slightly (tolerance 0.003 degrees ~ 300m)
    const simp = turf.simplify(res.value, { tolerance: 0.003, highQuality: true });
    if (stateGroups[cod]) {
      stateGroups[cod].push(simp);
    }

    // Centroid of municipality
    try {
      const muniCentroid = turf.centroid(simp);
      municipalitiesList.push({
        id: p.id_0 || p.cod_mun,
        cod_ent: cod,
        cod_mun: p.cod_mun,
        municipio: p.municipio,
        cap_mun: p.cap_mun,
        center: muniCentroid.geometry.coordinates // [lng, lat]
      });
    } catch (e) {}
  }

  console.log('Shapefile loaded. Total municipalities:', municipalitiesList.length);

  // Union each state into a single geometry
  const stateFeatures = [];
  const stateVectorGeoList = [];

  for (const cod in stateGroups) {
    const meta = STATE_META[cod];
    const feats = stateGroups[cod];
    if (!feats || feats.length === 0) continue;

    let unioned;
    if (feats.length === 1) {
      unioned = feats[0];
    } else {
      try {
        unioned = turf.union(turf.featureCollection(feats));
      } catch (err) {
        console.warn(`Union fallback for state ${cod} (${meta.nombre}):`, err.message);
        const allPolys = [];
        for (const f of feats) {
          if (f.geometry.type === 'Polygon') allPolys.push(f.geometry.coordinates);
          else if (f.geometry.type === 'MultiPolygon') allPolys.push(...f.geometry.coordinates);
        }
        unioned = turf.multiPolygon(allPolys);
      }
    }

    // Ensure coordinates rounded to 4 decimals (11 meters precision)
    const truncated = turf.truncate(unioned, { precision: 4, coordinates: 2 });
    const centroid = turf.centroid(truncated);
    const centerLngLat = centroid.geometry.coordinates; // [lng, lat]
    const centerLatLng = [+(centerLngLat[1].toFixed(4)), +(centerLngLat[0].toFixed(4))]; // [lat, lng]
    const svgCentroid = projectToSvg(centerLngLat[0], centerLngLat[1]);
    const svgPath = geomToSvgPath(truncated.geometry);

    // 1. GeoJSON feature for Leaflet
    stateFeatures.push({
      type: 'Feature',
      id: meta.id,
      properties: {
        id: meta.id,
        codigoINE: meta.codigoINE,
        nombre: meta.nombre,
        capital: meta.capital,
        region: meta.region,
        poblacion: meta.poblacion,
        totalMunicipios: meta.totalMunicipios,
        coberturaPromedioRTV: meta.coberturaPromedioRTV,
        penetracionInternetPromedio: meta.penetracionInternetPromedio,
        estatus: meta.estatus,
        center: centerLatLng
      },
      geometry: truncated.geometry
    });

    // 2. Vector Geo for SVG Heatmap
    stateVectorGeoList.push({
      id: meta.id,
      codigoINE: meta.codigoINE,
      nombre: meta.nombre,
      capital: meta.capital,
      region: meta.region,
      path: svgPath,
      centroid: svgCentroid,
      latLng: centerLatLng,
      poblacion: meta.poblacion,
      totalMunicipios: meta.totalMunicipios,
      coberturaPromedioRTV: meta.coberturaPromedioRTV,
      penetracionInternetPromedio: meta.penetracionInternetPromedio,
      estatus: meta.estatus
    });

    console.log(`Processed ${meta.id} - ${meta.nombre}: Path len ${svgPath.length}`);
  }

  // Write files
  // 1. Save GeoJSON
  const geoJsonData = {
    type: 'FeatureCollection',
    metadata: {
      nombre: 'Límites Político-Territoriales Estadales Oficiales de Venezuela',
      fuente: 'IGVSB - Capa Cartográfica Oficial 1:250.000 ba_4189_dpt_municipal',
      crs: 'EPSG:4326 - SIRGAS-REGVEN (WGS84)',
      fecha: '2026-09-11'
    },
    features: stateFeatures
  };

  const geoJsonTsContent = `// Archivo GeoJSON Oficial y Estandarizado para Leaflet
// República Bolivariana de Venezuela - Sistema Geodésico SIRGAS-REGVEN (EPSG:4326 / WGS84)
// Cartografía oficial extraída de la capa IGVSB 1:250.000 (ba_4189_dpt_municipal_de_venezuela_250000_20150707)

export interface VenezuelaStateFeature {
  type: "Feature";
  id: string;
  properties: {
    id: string;
    codigoINE: string;
    nombre: string;
    capital: string;
    region: string;
    poblacion: number;
    totalMunicipios: number;
    coberturaPromedioRTV: number;
    penetracionInternetPromedio: number;
    estatus: 'OPTIMO' | 'ESTABLE' | 'VULNERABLE' | 'CRITICO';
    center: [number, number]; // [lat, lng]
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: any;
  };
}

export interface VenezuelaGeoJsonObject {
  type: "FeatureCollection";
  metadata: {
    nombre: string;
    fuente: string;
    crs: string;
    fecha: string;
  };
  features: VenezuelaStateFeature[];
}

export const VENEZUELA_GEOJSON: VenezuelaGeoJsonObject = ${JSON.stringify(geoJsonData, null, 2)};
`;

  fs.writeFileSync('src/data/venezuelaGeoJson.ts', geoJsonTsContent, 'utf-8');
  console.log('Successfully wrote src/data/venezuelaGeoJson.ts');

  // Save generated vectors to a helper JSON so we can safely update venezuelaGeoData.ts
  fs.writeFileSync('scripts/extracted_vectors.json', JSON.stringify(stateVectorGeoList, null, 2), 'utf-8');
  console.log('Saved extracted_vectors.json');
}

process().catch(console.error);
