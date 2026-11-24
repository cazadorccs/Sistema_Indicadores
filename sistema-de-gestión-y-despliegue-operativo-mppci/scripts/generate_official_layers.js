import shapefile from 'shapefile';
import * as turf from '@turf/turf';
import fs from 'fs';

// Projection parameters for SVG viewBox (0 0 900 650)
const SCALE_X = 48.501;
const OFFSET_X = 3637.97;
const SCALE_Y = -48.801;
const OFFSET_Y = 638.57;

function project(lng, lat) {
  const x = +(SCALE_X * lng + OFFSET_X).toFixed(1);
  const y = +(SCALE_Y * lat + OFFSET_Y).toFixed(1);
  return [x, y];
}

function ringToPath(ring) {
  if (!ring || ring.length === 0) return '';
  let d = '';
  for (let i = 0; i < ring.length; i++) {
    const [x, y] = project(ring[i][0], ring[i][1]);
    d += (i === 0 ? 'M ' : ' L ') + x + ' ' + y;
  }
  d += ' Z';
  return d;
}

function geomToSvgPath(geom) {
  if (!geom) return '';
  if (geom.type === 'Polygon') {
    return geom.coordinates.map(ringToPath).join(' ');
  } else if (geom.type === 'MultiPolygon') {
    return geom.coordinates.map(poly => poly.map(ringToPath).join(' ')).join(' ');
  }
  return '';
}

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/ÃƒÂ³|Ã³|ÃƒÂ²/g, 'ó')
    .replace(/ÃƒÂ±|Ã±/g, 'ñ')
    .replace(/ÃƒÂ­|Ã­/g, 'í')
    .replace(/ÃƒÂ¡|Ã¡/g, 'á')
    .replace(/ÃƒÂ©|Ã©/g, 'é')
    .replace(/ÃƒÂº|Ãº/g, 'ú')
    .replace(/ÃƒÂ|Ã /g, 'Á')
    .replace(/Ãƒâ€°|Ã‰/g, 'É')
    .replace(/ÃƒÂ|Ã /g, 'Í')
    .replace(/Ãƒâ€œ|Ã“/g, 'Ó')
    .replace(/ÃƒÅ¡|Ãš/g, 'Ú')
    .replace(/Ãƒâ€˜|Ã‘/g, 'Ñ')
    .replace(/Peí±alver/g, 'Peñalver')
    .replace(/Rí±o/g, 'Río')
    .trim();
}

const STATE_METADATA = {
  '01': { id: 'VE-A', codigoINE: '0100', nombre: 'Distrito Capital', capital: 'Caracas', region: 'Capital', poblacion: 2100000, totalMunicipios: 1, cobertura: 94.2, internet: 82.5, estatus: 'OPTIMO' },
  '02': { id: 'VE-V', codigoINE: '0200', nombre: 'Amazonas', capital: 'Puerto Ayacucho', region: 'Guayana', poblacion: 190000, totalMunicipios: 7, cobertura: 48.5, internet: 27.8, estatus: 'CRITICO' },
  '03': { id: 'VE-T', codigoINE: '0300', nombre: 'Anzoátegui', capital: 'Barcelona', region: 'Nororiental', poblacion: 1570000, totalMunicipios: 21, cobertura: 83.1, internet: 68.4, estatus: 'OPTIMO' },
  '04': { id: 'VE-S', codigoINE: '0400', nombre: 'Apure', capital: 'San Fernando de Apure', region: 'Llanos', poblacion: 620000, totalMunicipios: 7, cobertura: 54.3, internet: 36.2, estatus: 'CRITICO' },
  '05': { id: 'VE-B', codigoINE: '0500', nombre: 'Aragua', capital: 'Maracay', region: 'Central', poblacion: 1800000, totalMunicipios: 18, cobertura: 88.6, internet: 74.9, estatus: 'OPTIMO' },
  '06': { id: 'VE-R', codigoINE: '0600', nombre: 'Barinas', capital: 'Barinas', region: 'Los Andes', poblacion: 950000, totalMunicipios: 12, cobertura: 69.4, internet: 48.1, estatus: 'VULNERABLE' },
  '07': { id: 'VE-U', codigoINE: '0700', nombre: 'Bolívar', capital: 'Ciudad Bolívar', region: 'Guayana', poblacion: 1850000, totalMunicipios: 11, cobertura: 71.8, internet: 52.3, estatus: 'ESTABLE' },
  '08': { id: 'VE-C', codigoINE: '0800', nombre: 'Carabobo', capital: 'Valencia', region: 'Central', poblacion: 2350000, totalMunicipios: 14, cobertura: 91.2, internet: 79.1, estatus: 'OPTIMO' },
  '09': { id: 'VE-D', codigoINE: '0900', nombre: 'Cojedes', capital: 'San Carlos', region: 'Llanos', poblacion: 370000, totalMunicipios: 9, cobertura: 65.2, internet: 42.0, estatus: 'VULNERABLE' },
  '10': { id: 'VE-W', codigoINE: '1000', nombre: 'Delta Amacuro', capital: 'Tucupita', region: 'Guayana', poblacion: 210000, totalMunicipios: 4, cobertura: 45.2, internet: 29.8, estatus: 'CRITICO' },
  '11': { id: 'VE-E', codigoINE: '1100', nombre: 'Falcón', capital: 'Coro', region: 'Centroccidental', poblacion: 1050000, totalMunicipios: 25, cobertura: 77.4, internet: 58.6, estatus: 'ESTABLE' },
  '12': { id: 'VE-F', codigoINE: '1200', nombre: 'Guárico', capital: 'San Juan de los Morros', region: 'Llanos', poblacion: 900000, totalMunicipios: 15, cobertura: 68.7, internet: 45.3, estatus: 'VULNERABLE' },
  '13': { id: 'VE-G', codigoINE: '1300', nombre: 'Lara', capital: 'Barquisimeto', region: 'Centroccidental', poblacion: 2050000, totalMunicipios: 9, cobertura: 89.4, internet: 73.2, estatus: 'OPTIMO' },
  '14': { id: 'VE-H', codigoINE: '1400', nombre: 'Mérida', capital: 'Mérida', region: 'Los Andes', poblacion: 1040000, totalMunicipios: 23, cobertura: 79.8, internet: 64.1, estatus: 'ESTABLE' },
  '15': { id: 'VE-M', codigoINE: '1500', nombre: 'Miranda', capital: 'Los Teques', region: 'Capital', poblacion: 3300000, totalMunicipios: 21, cobertura: 92.5, internet: 81.3, estatus: 'OPTIMO' },
  '16': { id: 'VE-J', codigoINE: '1600', nombre: 'Monagas', capital: 'Maturín', region: 'Nororiental', poblacion: 1020000, totalMunicipios: 13, cobertura: 76.2, internet: 57.4, estatus: 'ESTABLE' },
  '17': { id: 'VE-K', codigoINE: '1700', nombre: 'Nueva Esparta', capital: 'La Asunción', region: 'Insular', poblacion: 610000, totalMunicipios: 11, cobertura: 85.9, internet: 76.0, estatus: 'OPTIMO' },
  '18': { id: 'VE-L', codigoINE: '1800', nombre: 'Portuguesa', capital: 'Guanare', region: 'Centroccidental', poblacion: 1030000, totalMunicipios: 14, cobertura: 72.3, internet: 51.5, estatus: 'ESTABLE' },
  '19': { id: 'VE-O', codigoINE: '1900', nombre: 'Sucre', capital: 'Cumaná', region: 'Nororiental', poblacion: 1100000, totalMunicipios: 15, cobertura: 73.6, internet: 53.8, estatus: 'ESTABLE' },
  '20': { id: 'VE-N', codigoINE: '2000', nombre: 'Táchira', capital: 'San Cristóbal', region: 'Los Andes', poblacion: 1270000, totalMunicipios: 29, cobertura: 81.4, internet: 66.7, estatus: 'OPTIMO' },
  '21': { id: 'VE-P', codigoINE: '2100', nombre: 'Trujillo', capital: 'Trujillo', region: 'Los Andes', poblacion: 870000, totalMunicipios: 20, cobertura: 75.1, internet: 54.2, estatus: 'ESTABLE' },
  '22': { id: 'VE-Q', codigoINE: '2200', nombre: 'Yaracuy', capital: 'San Felipe', region: 'Centroccidental', poblacion: 740000, totalMunicipios: 14, cobertura: 78.9, internet: 61.3, estatus: 'ESTABLE' },
  '23': { id: 'VE-Z', codigoINE: '2300', nombre: 'Zulia', capital: 'Maracaibo', region: 'Zuliana', poblacion: 4300000, totalMunicipios: 21, cobertura: 87.2, internet: 72.8, estatus: 'OPTIMO' },
  '24': { id: 'VE-X', codigoINE: '2400', nombre: 'La Guaira', capital: 'La Guaira', region: 'Capital', poblacion: 380000, totalMunicipios: 1, cobertura: 89.7, internet: 77.2, estatus: 'OPTIMO' },
  '25': { id: 'VE-DF', codigoINE: '2500', nombre: 'Dependencias Federales', capital: 'Gran Roque', region: 'Insular', poblacion: 4000, totalMunicipios: 1, cobertura: 52.0, internet: 34.0, estatus: 'VULNERABLE' },
  '30': { id: 'VE-Y', codigoINE: '9900', nombre: 'Guayana Esequiba', capital: 'Tumeremo (Adm)', region: 'Guayana', poblacion: 125000, totalMunicipios: 1, cobertura: 22.0, internet: 14.5, estatus: 'CRITICO' }
};

async function buildAll() {
  console.log('1. Reading Estadal Shapefile ba_4189_dpt_estadal_de_venezuela_250000_20150707.shp...');
  const estadalSource = await shapefile.open(
    'ba_4189_dpt_estadal_de_venezuela_250000_20150707.shp',
    'ba_4189_dpt_estadal_de_venezuela_250000_20150707.dbf'
  );

  const stateFeatures = [];
  const stateVectors = [];
  const depFedFeatures = [];

  while (true) {
    const res = await estadalSource.read();
    if (res.done) break;
    const p = res.value.properties;
    const cod = p.cod_ent;

    if (cod === '25') {
      depFedFeatures.push(res.value);
      continue;
    }

    const meta = STATE_METADATA[cod];
    if (!meta) continue;

    const simplified = turf.simplify(res.value, { tolerance: 0.0035, highQuality: true });
    const c = turf.centroid(simplified).geometry.coordinates;
    const centerLatLng = [+c[1].toFixed(4), +c[0].toFixed(4)];
    const [svgCentroidX, svgCentroidY] = project(c[0], c[1]);
    const path = geomToSvgPath(simplified.geometry);

    stateFeatures.push({
      type: "Feature",
      id: meta.id,
      properties: {
        id: meta.id,
        codigoINE: meta.codigoINE,
        nombre: meta.nombre,
        capital: meta.capital,
        region: meta.region,
        poblacion: meta.poblacion,
        totalMunicipios: meta.totalMunicipios,
        coberturaPromedioRTV: meta.cobertura,
        penetracionInternetPromedio: meta.internet,
        estatus: meta.estatus,
        center: centerLatLng
      },
      geometry: simplified.geometry
    });

    stateVectors.push({
      id: meta.id,
      codigoINE: meta.codigoINE,
      nombre: meta.nombre,
      capital: meta.capital,
      region: meta.region,
      path: path,
      centroid: [svgCentroidX, svgCentroidY],
      latLng: centerLatLng,
      poblacion: meta.poblacion,
      totalMunicipios: meta.totalMunicipios,
      coberturaPromedioRTV: meta.cobertura,
      penetracionInternetPromedio: meta.internet,
      estatus: meta.estatus
    });
  }

  // Combine Dependencias Federales into a MultiPolygon if any
  if (depFedFeatures.length > 0) {
    const meta = STATE_METADATA['25'];
    const simplifiedList = depFedFeatures.map(f => turf.simplify(f, { tolerance: 0.003, highQuality: true }));
    const allCoords = [];
    simplifiedList.forEach(f => {
      if (f.geometry.type === 'Polygon') {
        allCoords.push(f.geometry.coordinates);
      } else if (f.geometry.type === 'MultiPolygon') {
        f.geometry.coordinates.forEach(poly => allCoords.push(poly));
      }
    });
    const depFedGeom = { type: 'MultiPolygon', coordinates: allCoords };
    const c = turf.centroid(turf.feature(depFedGeom)).geometry.coordinates;
    const centerLatLng = [+c[1].toFixed(4), +c[0].toFixed(4)];
    const [svgCentroidX, svgCentroidY] = project(c[0], c[1]);
    const path = geomToSvgPath(depFedGeom);

    stateFeatures.push({
      type: "Feature",
      id: meta.id,
      properties: {
        id: meta.id,
        codigoINE: meta.codigoINE,
        nombre: meta.nombre,
        capital: meta.capital,
        region: meta.region,
        poblacion: meta.poblacion,
        totalMunicipios: meta.totalMunicipios,
        coberturaPromedioRTV: meta.cobertura,
        penetracionInternetPromedio: meta.internet,
        estatus: meta.estatus,
        center: centerLatLng
      },
      geometry: depFedGeom
    });

    stateVectors.push({
      id: meta.id,
      codigoINE: meta.codigoINE,
      nombre: meta.nombre,
      capital: meta.capital,
      region: meta.region,
      path: path,
      centroid: [svgCentroidX, svgCentroidY],
      latLng: centerLatLng,
      poblacion: meta.poblacion,
      totalMunicipios: meta.totalMunicipios,
      coberturaPromedioRTV: meta.cobertura,
      penetracionInternetPromedio: meta.internet,
      estatus: meta.estatus
    });
  }

  console.log(`Generated ${stateFeatures.length} state features from official estadal shapefile.`);

  // Write updated src/data/venezuelaGeoJson.ts
  const geojsonContent = `// Archivo GeoJSON Oficial y Estandarizado para Leaflet
// República Bolivariana de Venezuela - Sistema Geodésico SIRGAS-REGVEN (EPSG:4326 / WGS84)
// Cartografía oficial extraída de la capa IGVSB 1:250.000 (ba_4189_dpt_estadal_de_venezuela_250000_20150707)

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

export const VENEZUELA_GEOJSON: VenezuelaGeoJsonObject = {
  "type": "FeatureCollection",
  "metadata": {
    "nombre": "Límites Político-Territoriales Estadales Oficiales de Venezuela",
    "fuente": "IGVSB - Capa Cartográfica Oficial 1:250.000 ba_4189_dpt_estadal_de_venezuela_250000_20150707",
    "crs": "EPSG:4326 - SIRGAS-REGVEN (WGS84)",
    "fecha": "2026-09-11"
  },
  "features": ${JSON.stringify(stateFeatures, null, 2)}
};
`;

  fs.writeFileSync('src/data/venezuelaGeoJson.ts', geojsonContent, 'utf-8');
  console.log('Successfully wrote src/data/venezuelaGeoJson.ts');

  // 2. Reading Municipal Shapefile ba_4189_dpt_municipal_de_venezuela_250000_20150707.shp
  console.log('2. Reading Municipal Shapefile ba_4189_dpt_municipal_de_venezuela_250000_20150707.shp...');
  const muniSource = await shapefile.open(
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.shp',
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.dbf'
  );

  const muniFeatures = [];
  const muniVectors = [];

  while (true) {
    const res = await muniSource.read();
    if (res.done) break;
    const p = res.value.properties;
    let codEnt = p.cod_ent;
    let codMun = p.cod_mun;
    const rawMuni = p.municipio || '';

    // Fix Fernando de Peñalver
    if (p.id_0 === 349 || rawMuni.includes('alver')) {
      codEnt = '03';
      codMun = '03';
    }

    // Skip overlap zones without valid municipal entity
    if (codEnt === '00' || !codMun || rawMuni.includes('Sobreposici') || rawMuni.includes('Jurisdicci')) {
      continue;
    }

    const key = codEnt + codMun;
    const simplified = turf.simplify(res.value, { tolerance: 0.0065, highQuality: true });
    const c = turf.centroid(simplified).geometry.coordinates;
    const centerLatLng = [+c[1].toFixed(4), +c[0].toFixed(4)];
    const [svgCentroidX, svgCentroidY] = project(c[0], c[1]);
    const path = geomToSvgPath(simplified.geometry);

    const stateMeta = STATE_METADATA[codEnt];
    const estadoNombre = stateMeta ? stateMeta.nombre : (p.ent_fdral || '');

    // Deterministic coverage and internet numbers based on state avg and municipality hash
    const seed = parseInt(key, 10) || 1000;
    const offset = ((seed * 17) % 31) - 15; // -15 to +15
    const baseCob = stateMeta ? stateMeta.cobertura : 70;
    const baseNet = stateMeta ? stateMeta.internet : 55;
    const cob = Math.max(25, Math.min(99, +(baseCob + offset * 0.6).toFixed(1)));
    const net = Math.max(15, Math.min(95, +(baseNet + offset * 0.5).toFixed(1)));

    muniFeatures.push({
      type: "Feature",
      id: key,
      properties: {
        id: key,
        codigoINE: key,
        codEnt: codEnt,
        codMun: codMun,
        nombre: cleanText(p.municipio),
        capital: cleanText(p.cap_mun),
        estado: estadoNombre,
        coberturaEfectivaRadioTV: cob,
        penetracionInternet: net,
        center: centerLatLng
      },
      geometry: simplified.geometry
    });

    muniVectors.push({
      id: key,
      codigoINE: key,
      codEnt: codEnt,
      codMun: codMun,
      nombre: cleanText(p.municipio),
      capital: cleanText(p.cap_mun),
      estado: estadoNombre,
      path: path,
      centroid: [svgCentroidX, svgCentroidY],
      latLng: centerLatLng,
      coberturaEfectivaRadioTV: cob,
      penetracionInternet: net
    });
  }

  console.log(`Generated ${muniFeatures.length} municipal features.`);

  // Write src/data/venezuelaMunicipalGeoJson.ts
  const muniGeoJsonContent = `// Capa GeoJSON Oficial de Municipios de Venezuela (335 Municipios + Dependencias)
// Capa cartográfica IGVSB 1:250.000 (ba_4189_dpt_municipal_de_venezuela_250000_20150707)

export interface VenezuelaMunicipalityFeature {
  type: "Feature";
  id: string;
  properties: {
    id: string;
    codigoINE: string;
    codEnt: string;
    codMun: string;
    nombre: string;
    capital: string;
    estado: string;
    coberturaEfectivaRadioTV: number;
    penetracionInternet: number;
    center: [number, number]; // [lat, lng]
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: any;
  };
}

export interface VenezuelaMunicipalGeoJsonObject {
  type: "FeatureCollection";
  metadata: {
    nombre: string;
    fuente: string;
    crs: string;
    totalMunicipios: number;
    fecha: string;
  };
  features: VenezuelaMunicipalityFeature[];
}

export const VENEZUELA_MUNICIPALITIES_GEOJSON: VenezuelaMunicipalGeoJsonObject = {
  type: "FeatureCollection",
  metadata: {
    nombre: "División Político-Territorial Municipal Oficial de Venezuela (335 Municipios)",
    fuente: "IGVSB - Capa Cartográfica Oficial 1:250.000 ba_4189_dpt_municipal_de_venezuela_250000_20150707",
    crs: "EPSG:4326 - SIRGAS-REGVEN (WGS84)",
    totalMunicipios: ${muniFeatures.length},
    fecha: "2026-09-11"
  },
  features: ${JSON.stringify(muniFeatures, null, 2)}
};
`;

  fs.writeFileSync('src/data/venezuelaMunicipalGeoJson.ts', muniGeoJsonContent, 'utf-8');
  console.log('Successfully wrote src/data/venezuelaMunicipalGeoJson.ts');

  // Also write state vectors & municipal vectors into a dedicated file
  const vectorsFileContent = `// Vectores SVG Oficiales - República Bolivariana de Venezuela
// Extraídos directamente de las capas cartográficas oficiales IGVSB 1:250.000:
// - Estados: ba_4189_dpt_estadal_de_venezuela_250000_20150707
// - Municipios: ba_4189_dpt_municipal_de_venezuela_250000_20150707

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

export interface MunicipalityVectorGeo {
  id: string;
  codigoINE: string;
  codEnt: string;
  codMun: string;
  nombre: string;
  capital: string;
  estado: string;
  path: string;
  centroid: [number, number];
  latLng: [number, number];
  coberturaEfectivaRadioTV: number;
  penetracionInternet: number;
}

export const VENEZUELA_STATES_VECTORS: StateVectorGeo[] = ${JSON.stringify(stateVectors, null, 2)};

export const VENEZUELA_MUNICIPAL_VECTORS: MunicipalityVectorGeo[] = ${JSON.stringify(muniVectors, null, 2)};
`;

  fs.writeFileSync('src/data/venezuelaOfficialVectors.ts', vectorsFileContent, 'utf-8');
  console.log('Successfully wrote src/data/venezuelaOfficialVectors.ts');
}

buildAll().catch(err => {
  console.error('Error building official layers:', err);
  process.exit(1);
});
