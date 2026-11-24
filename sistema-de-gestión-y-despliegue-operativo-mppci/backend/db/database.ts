import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const DB_DIR = path.join(process.cwd(), 'backend', 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'sgdo_soberano.db');

export const db = new DatabaseSync(DB_PATH);

// Configuración de alto rendimiento y robustez soberana
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA synchronous = NORMAL;');

// ==========================================
// ESQUEMA RELACIONAL Y TABLAS DE PERSISTENCIA
// ==========================================
export function initDatabaseSchema() {
  db.exec(`
    -- 1. Tabla de Estado Global del Sistema (Key-Value)
    CREATE TABLE IF NOT EXISTS system_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- 2. Tabla de Cortes Semanales Oficiales
    CREATE TABLE IF NOT EXISTS cortes_semanales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      semana INTEGER NOT NULL CHECK(semana BETWEEN 1 AND 53),
      ano INTEGER NOT NULL CHECK(ano >= 2026),
      estado TEXT NOT NULL DEFAULT 'ABIERTO' CHECK(estado IN ('ABIERTO', 'CERRADO', 'REFRENDADO')),
      fecha_cierre TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(semana, ano)
    );

    -- 3. Tabla de Registros de Captura (Con Idempotencia Matemática)
    CREATE TABLE IF NOT EXISTS registros_captura (
      id TEXT PRIMARY KEY,
      corte_id INTEGER NOT NULL REFERENCES cortes_semanales(id),
      ente_id TEXT NOT NULL,
      usuario_id TEXT NOT NULL,
      idempotency_key TEXT NOT NULL UNIQUE,
      audit_hash TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      UNIQUE(corte_id, ente_id)
    );

    -- 4. Tabla de Indicadores Capturados
    CREATE TABLE IF NOT EXISTS valores_indicador (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      captura_id TEXT NOT NULL REFERENCES registros_captura(id) ON DELETE CASCADE,
      codigo_indicador TEXT NOT NULL,
      valor_calculado REAL NOT NULL,
      variables_json TEXT NOT NULL,
      estatus_evaluacion TEXT NOT NULL CHECK(estatus_evaluacion IN ('OPTIMO', 'ALERTA', 'CRITICO')),
      UNIQUE(captura_id, codigo_indicador)
    );

    -- 5. Cadena Inmutable de Sellos Criptográficos (C-Level)
    CREATE TABLE IF NOT EXISTS sellos_criptograficos (
      selloId TEXT PRIMARY KEY,
      hashCompletoSha256 TEXT NOT NULL UNIQUE,
      timestamp TEXT NOT NULL,
      semanaEpidemiologica INTEGER NOT NULL,
      ministro TEXT NOT NULL,
      cedula TEXT NOT NULL,
      cargo TEXT NOT NULL,
      observaciones TEXT,
      estado TEXT NOT NULL,
      kpisSellados TEXT NOT NULL,
      merkleRoot TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- 6. Alertas e Incidentes de Impacto
    CREATE TABLE IF NOT EXISTS impact_incidents (
      id TEXT PRIMARY KEY,
      triggerCode TEXT NOT NULL,
      categoria TEXT NOT NULL,
      severidad TEXT NOT NULL,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      indicadorCodigo TEXT,
      valorActual TEXT,
      umbralDisparo TEXT,
      enteResponsable TEXT,
      destinatariosRaci TEXT,
      canalesNotificados TEXT,
      timestampDisparo TEXT NOT NULL,
      estado TEXT NOT NULL,
      accionRequerida TEXT,
      ackPor TEXT,
      ackTimestamp TEXT,
      timestampResolucion TEXT,
      escalado INTEGER NOT NULL DEFAULT 0
    );

    -- 7. Usuarios Institucionales, Formalización Multi-Dispositivo y Credenciales
    CREATE TABLE IF NOT EXISTS usuarios_institucionales (
      id TEXT PRIMARY KEY,
      cedula TEXT NOT NULL UNIQUE,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      email TEXT NOT NULL,
      telefono TEXT NOT NULL,
      telegram TEXT,
      ente_adscrito TEXT NOT NULL,
      cargo TEXT NOT NULL,
      dependencia TEXT NOT NULL,
      rol_sistema TEXT NOT NULL,
      raci_role TEXT NOT NULL,
      estado TEXT NOT NULL DEFAULT 'ACTIVO',
      nivel_acceso TEXT NOT NULL,
      permisos_modulos TEXT NOT NULL,
      estatus_enrolamiento TEXT NOT NULL DEFAULT 'PRECARGADO' CHECK(estatus_enrolamiento IN ('PRECARGADO', 'ENROLADO', 'BLOQUEADO')),
      password_hash TEXT,
      password_salt TEXT,
      bound_device_id TEXT,
      bound_device_nombre TEXT,
      foto_perfil_url TEXT,
      recovery_code TEXT,
      recovery_token_exp INTEGER,
      fecha_enrolamiento TEXT,
      ultimo_acceso TEXT,
      intentos_fallidos INTEGER DEFAULT 0,
      avatar_bg TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Índices para optimizar lecturas concurrentes
    CREATE INDEX IF NOT EXISTS idx_captura_ente ON registros_captura(ente_id);
    CREATE INDEX IF NOT EXISTS idx_captura_corte ON registros_captura(corte_id);
    CREATE INDEX IF NOT EXISTS idx_valores_cod ON valores_indicador(codigo_indicador);
    CREATE INDEX IF NOT EXISTS idx_incident_estado ON impact_incidents(estado);
    CREATE INDEX IF NOT EXISTS idx_usr_cedula ON usuarios_institucionales(cedula);
    CREATE INDEX IF NOT EXISTS idx_usr_enrolamiento ON usuarios_institucionales(estatus_enrolamiento);
  `);
}

// Inicializar esquema al importar
initDatabaseSchema();
