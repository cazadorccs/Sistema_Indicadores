import shapefile from 'shapefile';
import * as turf from '@turf/turf';
import fs from 'fs';

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

async function run() {
  const source = await shapefile.open(
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.shp',
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.dbf'
  );

  const coordsMap = {};

  while (true) {
    const res = await source.read();
    if (res.done) break;
    const p = res.value.properties;
    const geom = res.value.geometry;
    if (!geom) continue;

    let codEnt = p.cod_ent;
    let codMun = p.cod_mun;
    const rawMuni = p.municipio || '';

    // Fix Fernando de Peñalver (Puerto Píritu, Anzoátegui)
    if (p.id_0 === 349 || rawMuni.includes('alver')) {
      codEnt = '03';
      codMun = '03';
    }

    // Skip overlap zones without valid municipal entity
    if (codEnt === '00' || !codMun || rawMuni.includes('Sobreposici') || rawMuni.includes('Jurisdicci')) {
      continue;
    }

    const key = codEnt + codMun;
    const c = turf.centroid(res.value).geometry.coordinates;

    coordsMap[key] = {
      name: cleanText(p.municipio),
      capital: cleanText(p.cap_mun),
      lat: +c[1].toFixed(4),
      lng: +c[0].toFixed(4),
      codEnt: codEnt,
      codMun: codMun
    };
  }

  const fileContent = `export interface MunicipalCoordInfo {
  name: string;
  capital: string;
  lat: number;
  lng: number;
  codEnt: string;
  codMun: string;
}

export const VENEZUELA_MUNICIPAL_COORDS: Record<string, MunicipalCoordInfo> = ${JSON.stringify(coordsMap, null, 2)};
`;

  fs.writeFileSync('src/data/venezuelaMunicipalCoordinates.ts', fileContent, 'utf-8');
  console.log('Successfully wrote src/data/venezuelaMunicipalCoordinates.ts with', Object.keys(coordsMap).length, 'municipalities.');
}

run();
