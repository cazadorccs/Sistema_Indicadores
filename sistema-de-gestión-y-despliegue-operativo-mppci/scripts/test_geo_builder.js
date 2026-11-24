import shapefile from 'shapefile';
import * as turf from '@turf/turf';

async function run() {
  const estadalSource = await shapefile.open(
    'ba_4189_dpt_estadal_de_venezuela_250000_20150707.shp',
    'ba_4189_dpt_estadal_de_venezuela_250000_20150707.dbf'
  );
  
  let estadalCount = 0;
  while (true) {
    const res = await estadalSource.read();
    if (res.done) break;
    estadalCount++;
  }
  console.log('Estadal count:', estadalCount);
  
  const muniSource = await shapefile.open(
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.shp',
    'ba_4189_dpt_municipal_de_venezuela_250000_20150707.dbf'
  );
  
  let muniCount = 0;
  while (true) {
    const res = await muniSource.read();
    if (res.done) break;
    muniCount++;
  }
  console.log('Municipal count:', muniCount);
}
run();
