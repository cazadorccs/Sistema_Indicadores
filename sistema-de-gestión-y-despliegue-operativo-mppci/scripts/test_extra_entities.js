import shapefile from 'shapefile';
import * as turf from '@turf/turf';

async function test() {
  const source = await shapefile.open(
    'ba_4189_dpt_estadal_de_venezuela_250000_20150707.shp',
    'ba_4189_dpt_estadal_de_venezuela_250000_20150707.dbf'
  );
  
  let esequibo = null;
  const depFedPolys = [];
  while (true) {
    const res = await source.read();
    if (res.done) break;
    const p = res.value.properties;
    if (p.cod_ent === '30' || (p.entidad || '').includes('Esequiba') || (p.ent_fdral || '').includes('ESEQUIBO')) {
      esequibo = res.value;
    }
    if (p.cod_ent === '25') {
      depFedPolys.push(res.value);
    }
  }
  console.log('Esequibo found:', !!esequibo);
  console.log('Dep Fed islands count:', depFedPolys.length);
}
test();
