import { test, describe } from 'node:test';
import assert from 'node:assert';
import { 
  OfflineDraft, 
  saveOfflineDraft, 
  getPendingDrafts, 
  deleteOfflineDraft 
} from '../../src/utils/offlineStore';

describe('Suites de Resiliencia: Almacenamiento Local de Borradores (Offline-First)', () => {

  const borradorTest: OfflineDraft = {
    id: 'DRAFT-2026-W35-REDTV-OFFLINE',
    semana: 35,
    ano: 2026,
    enteId: 'REDTV',
    usuarioId: 'USR-005',
    payload: {
      operatividadTdaNacional: 96.5,
      enlaceSatelitalKu: 99.8
    },
    indicadores: [
      { codigo: 'RTV-001', valor: 96.5, variables: { A: 1 }, estatus: 'OPTIMO' }
    ],
    timestamp: new Date().toISOString(),
    status: 'PENDIENTE'
  };

  test('Guardado y recuperación de borrador offline en memoria/fallback', async () => {
    await saveOfflineDraft(borradorTest);
    const drafts = await getPendingDrafts();

    assert.ok(drafts.length > 0, 'Debe existir al menos un borrador pendiente');
    const recuperado = drafts.find(d => d.id === borradorTest.id);
    assert.ok(recuperado, 'El borrador guardado debe ser recuperable');
    assert.strictEqual(recuperado.enteId, 'REDTV');
    assert.strictEqual(recuperado.semana, 35);
    assert.strictEqual(recuperado.status, 'PENDIENTE');
  });

  test('Eliminación o despacho de borrador sincronizado', async () => {
    await deleteOfflineDraft(borradorTest.id);
    const drafts = await getPendingDrafts();
    const existe = drafts.some(d => d.id === borradorTest.id);

    assert.strictEqual(existe, false, 'El borrador despachado debe eliminarse de la cola pendiente');
  });
});
