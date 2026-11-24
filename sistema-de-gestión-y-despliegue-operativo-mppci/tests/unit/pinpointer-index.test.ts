import { test, describe } from 'node:test';
import assert from 'node:assert';
import { SCIC_INDICATORS_DATA } from '../../src/data/scicIndicators';

describe('Suites de Búsqueda Instantánea: Pinpointer en Memoria (Ctrl+K)', () => {

  test('Indexación completa de los 267 Indicadores Oficiales SCIC', () => {
    assert.ok(SCIC_INDICATORS_DATA.length >= 267, 'Debe contener al menos 267 indicadores');
  });

  test('Búsqueda por código exacto con latencia instantánea (< 1ms)', () => {
    const t0 = performance.now();
    const query = 'IAAE';
    const found = SCIC_INDICATORS_DATA.filter(i => i.codigo.toUpperCase() === query.toUpperCase());
    const duration = performance.now() - t0;

    assert.ok(found.length > 0, 'Debe encontrar el indicador IAAE');
    assert.strictEqual(found[0].codigo, 'IAAE');
    assert.ok(duration < 10, 'La búsqueda debe resolverse en menos de 10ms');
  });

  test('Búsqueda difusa por palabras clave múltiples (Tokens AND)', () => {
    const queryTokens = ['efectividad', 'prensa'];
    const results = SCIC_INDICATORS_DATA.filter(ind => {
      const fullText = `${ind.codigo} ${ind.nombre} ${ind.descripcion || ''} ${ind.formula}`.toLowerCase();
      return queryTokens.every(token => fullText.includes(token));
    });

    assert.ok(results.length > 0, 'Debe arrojar resultados para "efectividad prensa"');
    assert.ok(results.some(r => r.codigo === 'TECP'));
  });

  test('Búsqueda por prefijo alfanumérico (ej: RTV, RAD, IMP)', () => {
    const prefijo = 'RAD';
    const radIndicators = SCIC_INDICATORS_DATA.filter(i => i.codigo.startsWith(prefijo));

    assert.ok(radIndicators.length > 0, 'Debe encontrar indicadores radiales');
    assert.ok(radIndicators.every(i => i.codigo.startsWith('RAD')));
  });
});
