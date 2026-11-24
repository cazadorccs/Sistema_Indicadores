import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../documentos');

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function scanDirectory(dir, relativePath = '') {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const rel = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(scanDirectory(fullPath, rel));
    } else {
      if (entry.name === '.gitkeep') continue;
      const stats = fs.statSync(fullPath);
      results.push({
        name: entry.name,
        path: rel.replace(/\\/g, '/'),
        size: formatBytes(stats.size),
        rawSize: stats.size,
        ext: path.extname(entry.name).toLowerCase(),
        modified: stats.mtime.toISOString().split('T')[0]
      });
    }
  }
  return results;
}

console.log('='.repeat(70));
console.log('  MPPCI - REPOSITORIO DE DOCUMENTOS E INSUMOS ESTRATÉGICOS');
console.log('='.repeat(70));
console.log(`Directorio monitoreado: ${DOCS_DIR}\n`);

const files = scanDirectory(DOCS_DIR);

if (files.length === 0) {
  console.log('ℹ️  No hay documentos nuevos cargados aún.');
  console.log('   Puedes colocar tus archivos en la carpeta "documentos/"');
  console.log('   o en cualquiera de sus subcarpetas:');
  console.log('   - documentos/normativas_y_lineamientos/');
  console.log('   - documentos/indicadores_y_metodologias/');
  console.log('   - documentos/cartografia_y_cobertura/');
  console.log('   - documentos/reportes_y_datos/\n');
} else {
  console.log(`✅ Documentos encontrados (${files.length}):\n`);
  files.forEach((f, idx) => {
    console.log(`  [${idx + 1}] ${f.path}`);
    console.log(`      Tamaño: ${f.size} | Tipo: ${f.ext || 'sin extensión'} | Modificado: ${f.modified}`);
  });
  console.log('\nListo para análisis e integración.');
}
console.log('='.repeat(70));
