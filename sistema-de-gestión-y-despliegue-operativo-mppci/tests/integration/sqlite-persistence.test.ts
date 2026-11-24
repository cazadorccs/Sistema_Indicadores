import { test, describe, before } from 'node:test';
import assert from 'node:assert';
import { db, initDatabaseSchema } from '../../backend/db/database';
import { SqliteStore } from '../../backend/db/sqliteStore';
import { DashboardsService } from '../../backend/services/dashboardsService';

describe('Suites de Integración: Persistencia Soberana SQLite e Idempotencia', () => {

  before(() => {
    initDatabaseSchema();
  });

  test('La base de datos SQLite opera en modo WAL y foreign_keys activo', () => {
    const journalMode = db.prepare('PRAGMA journal_mode;').get() as { journal_mode: string };
    const foreignKeys = db.prepare('PRAGMA foreign_keys;').get() as { foreign_keys: number };

    assert.strictEqual(journalMode.journal_mode.toLowerCase(), 'wal', 'El modo de journaling debe ser WAL');
    assert.strictEqual(foreignKeys.foreign_keys, 1, 'Las claves foráneas deben estar activadas');
  });

  test('El estado CentralStore se carga, se modifica y persiste en SQLite', () => {
    const store = SqliteStore.getCentralStore();
    assert.ok(store.cLevel, 'El CentralStore debe contener la sección cLevel');
    assert.ok(store.noc, 'El CentralStore debe contener la sección noc');

    // Modificar un valor y guardarlo
    store.cLevel.resumenEjecutivo.semanaEpidemiologica = 40;
    SqliteStore.saveCentralStore(store);

    // Recuperar directamente desde SQLite
    const row = db.prepare('SELECT value FROM system_state WHERE key = ?').get('central_store_state') as { value: string };
    assert.ok(row, 'El registro central_store_state debe existir en SQLite');
    const parsed = JSON.parse(row.value);
    assert.strictEqual(parsed.cLevel.resumenEjecutivo.semanaEpidemiologica, 40, 'El valor modificado debe persistir en SQLite');
  });

  test('Idempotencia Matemática: No se permite duplicar capturas del mismo Ente en la misma Semana', () => {
    const timestamp = Date.now();
    const capturaData = {
      semana: 35,
      ano: 2026,
      enteId: `REDTV_TEST_${timestamp}`,
      usuarioId: 'USR-005',
      idempotencyKey: `2026-W35-REDTV-${timestamp}`,
      auditHash: 'aabbcc112233',
      payload: { test: true },
      indicadores: [
        { codigo: 'RTV-001', valor: 98.5, variables: { A: 1 }, estatus: 'OPTIMO' }
      ]
    };

    // Primera inserción: debe ser exitosa
    const res1 = SqliteStore.saveCapturaSemanal(capturaData);
    assert.strictEqual(res1.success, true);
    assert.strictEqual(res1.duplicado, undefined);

    // Segunda inserción con los mismos datos: debe activar idempotencia sin romper el flujo
    const res2 = SqliteStore.saveCapturaSemanal(capturaData);
    assert.strictEqual(res2.success, true);
    assert.strictEqual(res2.duplicado, true, 'Debe marcarse como duplicado reconocido');
  });

  test('Refrendo Ministerial y sellos criptográficos se almacenan inmutablemente en SQLite con Merkle Root', () => {
    const refrendoRes = DashboardsService.refrendoMinisterial({
      ministroNombre: 'Miguel Ángel Pérez',
      cedula: 'V-11029384',
      cargo: 'Ministro del Poder Popular para la Comunicación e Información',
      observaciones: 'Prueba de integración ministerial inmutable'
    });

    assert.strictEqual(refrendoRes.success, true);
    assert.ok(refrendoRes.sello.selloId.startsWith('MPPCI-AUTH-'));
    assert.strictEqual(refrendoRes.sello.hashCompletoSha256.length, 64);
    assert.ok(refrendoRes.sello.merkleRoot, 'Debe incluir la raíz Merkle calculada');

    // Verificar en SQLite
    const row = db.prepare('SELECT * FROM sellos_criptograficos WHERE selloId = ?').get(refrendoRes.sello.selloId) as any;
    assert.ok(row, 'El sello debe existir en la tabla sellos_criptograficos de SQLite');
    assert.strictEqual(row.ministro, 'Miguel Ángel Pérez');
  });
});
