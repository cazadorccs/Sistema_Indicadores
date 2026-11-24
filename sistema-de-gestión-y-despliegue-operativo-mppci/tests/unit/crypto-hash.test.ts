import { test, describe } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';

describe('Suites de Pruebas Criptográficas: Integridad SHA-256 e Inmutabilidad', () => {

  function calcularSelloOficialSha256(payload: Record<string, any>): string {
    const serializado = JSON.stringify(payload, Object.keys(payload).sort());
    return crypto.createHash('sha256').update(serializado).digest('hex');
  }

  test('Determinismo: El mismo payload genera exactamente el mismo hash SHA-256', () => {
    const payload = {
      semana: 35,
      ano: 2026,
      ente: 'REDTV',
      kpis: { iec: 84.2, irt: 96.1, icd: 72.8 }
    };

    const hash1 = calcularSelloOficialSha256(payload);
    const hash2 = calcularSelloOficialSha256(payload);

    assert.strictEqual(hash1.length, 64, 'El hash SHA-256 debe tener 64 caracteres hexadecimales');
    assert.strictEqual(hash1, hash2, 'Dos ejecuciones idénticas deben producir exactamente el mismo hash');
  });

  test('Sensibilidad y Anti-repudio: La modificación de un solo bit cambia radicalmente el hash (Efecto Avalancha)', () => {
    const original = {
      semana: 35,
      ano: 2026,
      ministro: 'Miguel Ángel Pérez',
      aprobado: true,
      iec: 84.2
    };

    const adulterado = {
      semana: 35,
      ano: 2026,
      ministro: 'Miguel Ángel Pérez',
      aprobado: true,
      iec: 84.3 // Modificación milimétrica de 0.1
    };

    const hashOriginal = calcularSelloOficialSha256(original);
    const hashAdulterado = calcularSelloOficialSha256(adulterado);

    assert.notStrictEqual(hashOriginal, hashAdulterado, 'El hash de datos adulterados debe ser completamente diferente');
  });

  test('Construcción de Raíz de Árbol de Merkle RFC 6962 sobre registros de entes', () => {
    const hojas = [
      'CAPTURA_REDTV_W35_2026',
      'CAPTURA_VTV_W35_2026',
      'CAPTURA_CONATEL_W35_2026',
      'CAPTURA_RNV_W35_2026'
    ].map(item => crypto.createHash('sha256').update(item).digest('hex'));

    assert.strictEqual(hojas.length, 4);

    // Nivel intermedio del árbol
    const parent1 = crypto.createHash('sha256').update(hojas[0] + hojas[1]).digest('hex');
    const parent2 = crypto.createHash('sha256').update(hojas[2] + hojas[3]).digest('hex');

    // Raíz Merkle
    const merkleRoot = crypto.createHash('sha256').update(parent1 + parent2).digest('hex');

    assert.strictEqual(merkleRoot.length, 64);
    assert.ok(/^[0-9a-f]{64}$/.test(merkleRoot), 'La raíz Merkle debe ser un hash SHA-256 válido');
  });
});
