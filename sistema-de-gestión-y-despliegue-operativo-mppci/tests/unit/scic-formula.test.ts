import { test, describe } from 'node:test';
import assert from 'node:assert';
import { evaluateScicFormula } from '../../src/utils/scicFormulaEngine';

describe('Suites de Pruebas Unitarias: Motor de Fórmulas Matemáticas SCIC', () => {

  test('IAAE: Índice de Audiencia y Alcance Efectivo (NE / NT) * 100', () => {
    const res = evaluateScicFormula('IAAE', { NE: 40, NT: 50 });
    assert.ok(res, 'Debe retornar un resultado válido');
    assert.strictEqual(res.codigo, 'IAAE');
    assert.strictEqual(res.resultado, 80);
    assert.strictEqual(res.estatus, 'OPTIMO');
  });

  test('IAAE: Manejo seguro ante división por cero (NT = 0)', () => {
    const res = evaluateScicFormula('IAAE', { NE: 25, NT: 0 });
    assert.ok(res, 'Debe retornar un resultado');
    assert.strictEqual(res.resultado, 0, 'Ante NT=0 el resultado debe ser 0 sin lanzar excepción');
    assert.strictEqual(res.estatus, 'CRITICO');
  });

  test('TECP: Tasa de Efectividad en Cobertura de Prensa (MA / MC) * 100', () => {
    const res = evaluateScicFormula('TECP', { MA: 300, MC: 335 });
    assert.ok(res);
    const expected = (300 / 335) * 100;
    assert.strictEqual(Math.round(res.resultado * 100) / 100, Math.round(expected * 100) / 100);
    assert.strictEqual(res.estatus, 'OPTIMO');
  });

  test('RCVE: Rendimiento de Cobertura de Voz del Estado (EE / ES) * 100', () => {
    const res = evaluateScicFormula('RCVE', { EE: 15, ES: 30 });
    assert.ok(res);
    assert.strictEqual(res.resultado, 50);
    assert.strictEqual(res.estatus, 'CRITICO', '50% debe activar estatus crítico');
  });

  test('ODNP: Oportunidad y Desviación Noticiosa de Prensa Math.max(0, T_dif - T_rec)', () => {
    const resPositive = evaluateScicFormula('ODNP', { T_dif: 120, T_rec: 80 });
    assert.ok(resPositive);
    assert.strictEqual(resPositive.resultado, 40);

    const resNegative = evaluateScicFormula('ODNP', { T_dif: 50, T_rec: 100 });
    assert.ok(resNegative);
    assert.strictEqual(resNegative.resultado, 0, 'No debe arrojar valores negativos');
  });

  test('Código de indicador no existente retorna null', () => {
    const res = evaluateScicFormula('CODIGO_INEXISTENTE_XYZ', { X: 10 });
    assert.strictEqual(res, null, 'Un código no registrado debe retornar null');
  });
});
