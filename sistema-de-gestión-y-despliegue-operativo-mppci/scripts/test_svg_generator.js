import shapefile from 'shapefile';
import * as turf from '@turf/turf';

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

async function run() {
  const source = await shapefile.open(
    'ba_4189_dpt_estadal_de_venezuela_250000_20150707.shp',
    'ba_4189_dpt_estadal_de_venezuela_250000_20150707.dbf'
  );

  const results = [];
  while (true) {
    const res = await source.read();
    if (res.done) break;
    const p = res.value.properties;
    const cod = p.cod_ent;
    if (['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'].includes(cod)) {
      const simplified = turf.simplify(res.value, { tolerance: 0.003, highQuality: true });
      const path = geomToSvgPath(simplified.geometry);
      const c = turf.centroid(simplified).geometry.coordinates;
      const [svgX, svgY] = project(c[0], c[1]);
      results.push({
        cod,
        name: p.entidad || p.ent_fdral,
        pathLen: path.length,
        svgCentroid: [svgX, svgY],
        latLng: [+c[1].toFixed(4), +c[0].toFixed(4)]
      });
    }
  }
  console.table(results);
}
run();
