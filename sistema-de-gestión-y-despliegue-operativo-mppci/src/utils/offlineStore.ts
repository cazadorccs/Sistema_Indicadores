/**
 * Gestor de Persistencia y Borradores Desconectados (IndexedDB)
 * SGDO-VSCC — Principio I: Resiliencia Offline-First
 */

export interface OfflineDraft {
  id: string;
  semana: number;
  ano: number;
  enteId: string;
  usuarioId: string;
  payload: any;
  indicadores?: any[];
  timestamp: string;
  status: 'PENDIENTE' | 'SINCRONIZADO' | 'FALLIDO';
}

const DB_NAME = 'sgdo_offline_db';
const DB_VERSION = 1;
const STORE_NAME = 'capturas_pendientes';

// Almacenamiento fallback para pruebas o entornos sin IndexedDB
const memoryFallback = new Map<string, OfflineDraft>();

function isIndexedDBAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
}

export function openOfflineDB(): Promise<IDBDatabase | null> {
  if (!isIndexedDBAvailable()) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result as IDBDatabase;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: any) => {
      resolve(event.target.result);
    };

    request.onerror = (event: any) => {
      console.warn('[OfflineStore] Error al abrir IndexedDB:', event.target.error);
      resolve(null);
    };
  });
}

/**
 * Guarda un borrador de captura en almacenamiento local offline (IndexedDB)
 */
export async function saveOfflineDraft(draft: OfflineDraft): Promise<void> {
  const db = await openOfflineDB();

  if (!db) {
    memoryFallback.set(draft.id, draft);
    try {
      if (typeof localStorage !== 'undefined') {
        const existing = JSON.parse(localStorage.getItem('sgdo_offline_drafts') || '[]');
        const updated = existing.filter((d: any) => d.id !== draft.id).concat(draft);
        localStorage.setItem('sgdo_offline_drafts', JSON.stringify(updated));
      }
    } catch {}
    return;
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(draft);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Obtiene la lista de capturas pendientes por sincronizar
 */
export async function getPendingDrafts(): Promise<OfflineDraft[]> {
  const db = await openOfflineDB();

  if (!db) {
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('sgdo_offline_drafts') || '[]');
        return stored.filter((d: any) => d.status === 'PENDIENTE');
      } catch {}
    }
    return Array.from(memoryFallback.values()).filter(d => d.status === 'PENDIENTE');
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();

    req.onsuccess = () => {
      const all = req.result as OfflineDraft[];
      resolve(all.filter(d => d.status === 'PENDIENTE'));
    };
    req.onerror = () => reject(req.error);
  });
}

/**
 * Elimina o marca como sincronizado un borrador
 */
export async function deleteOfflineDraft(id: string): Promise<void> {
  const db = await openOfflineDB();

  if (!db) {
    memoryFallback.delete(id);
    if (typeof localStorage !== 'undefined') {
      try {
        const existing = JSON.parse(localStorage.getItem('sgdo_offline_drafts') || '[]');
        localStorage.setItem('sgdo_offline_drafts', JSON.stringify(existing.filter((d: any) => d.id !== id)));
      } catch {}
    }
    return;
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/**
 * Sincroniza automáticamente los borradores locales con el backend
 */
export async function syncOfflineDraftsWithBackend(): Promise<{ synced: number; errors: number }> {
  const pending = await getPendingDrafts();
  let synced = 0;
  let errors = 0;

  for (const draft of pending) {
    try {
      const response = await fetch('/api/v1/captura/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sgdo_auth_token') || ''}`
        },
        body: JSON.stringify({
          semana: draft.semana,
          ano: draft.ano,
          enteId: draft.enteId,
          usuarioId: draft.usuarioId,
          payload: draft.payload,
          indicadores: draft.indicadores
        })
      });

      if (response.ok) {
        await deleteOfflineDraft(draft.id);
        synced++;
      } else {
        errors++;
      }
    } catch {
      errors++;
      break; // Detener intento si la red sigue caída
    }
  }

  return { synced, errors };
}
