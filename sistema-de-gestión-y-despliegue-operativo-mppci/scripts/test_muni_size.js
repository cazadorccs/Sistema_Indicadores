import shapefile from 'shapefile';
import * as turf from '@turf/turf';

async function test() {
  const source = await shapefile.open(
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.shp',
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.dbf'
  );

  const features = [];
  while (true) {
    const res = await source.read();
    if (res.done) break;
    const p = res.value.properties;
    let codEnt = p.cod_ent;
    let codMun = p.cod_mun;
    const rawMuni = p.municipio || '';
    if (p.id_0 === 349 || rawMuni.includes('alver')) {
      codEnt = '03';
      codMun = '03';
    }
    if (codEnt === '00' || !codMun || rawMuni.includes('Sobreposici') || rawMuni.includes('Jurisdicci')) {
      continue;
    }
    const simplified = turf.simplify(res.value, { tolerance: 0.006, highQuality: true });
    features.push(simplified);
  }
  const geojson = { type: 'FeatureCollection', features };
  const str = JSON.stringify(geojson);
  console.log('Total municipalities:', features.length);
  console.log('GeoJSON size in KB:', (str.length / 1024).toFixed(1));
}
test();
