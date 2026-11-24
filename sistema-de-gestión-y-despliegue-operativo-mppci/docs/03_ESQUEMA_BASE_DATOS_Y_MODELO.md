# Esquema de Base de Datos y Modelo Relacional
## Sistema de Gestión y Despliegue Operativo (SGDO-VSCC)
**Documento:** `03_ESQUEMA_BASE_DATOS_Y_MODELO.md`  
**Motor:** SQLite 3 (Modo Soberano / Local-First con WAL habilitado)  
**Conformidad:** Principio I (Idempotencia) y Principio II (Criptografía) de la Guía Maestra  

---

## 1. Diagrama Entidad-Relación (ERD)

```mermaid
erDiagram
    USUARIOS ||--o{ REGISTROS_CAPTURA : "registra"
    USUARIOS ||--o{ AUDITORIA_LOGS : "genera"
    ENTES ||--o{ REGISTROS_CAPTURA : "emite"
    ENTES ||--o{ USUARIOS : "adscribe"
    REGISTROS_CAPTURA ||--|{ VALORES_INDICADOR : "contiene"
    CORTES_SEMANALES ||--o{ REGISTROS_CAPTURA : "consolida"
    CORTES_SEMANALES ||--|| SELLOS_CRIPTOGRAFICOS : "refrenda"

    USUARIOS {
        string id PK "USR-001..."
        string cedula UK "V-12345678"
        string nombre
        string apellido
        string email UK
        string ente_id FK
        string rol_sistema "SUPER_ADMIN, MINISTRO..."
        string rol_raci "R, A, C, I"
        string password_hash
        boolean activo
        datetime created_at
    }

    ENTES {
        string id PK "REDTV, VTV, CONATEL..."
        string sigla
        string nombre_completo
        string eje_adscripcion "EJE_1, EJE_2, EJE_3, EJE_4"
        boolean activo
    }

    CORTES_SEMANALES {
        integer id PK
        integer semana "Semana 1..52"
        integer ano "2026"
        string estado "ABIERTO, CERRADO, REFRENDADO"
        datetime fecha_inicio
        datetime fecha_cierre
    }

    REGISTROS_CAPTURA {
        string id PK "CAP-2026-W35-REDTV"
        integer corte_id FK
        string ente_id FK
        string usuario_id FK
        string idempotency_key UK "W35-2026-REDTV"
        datetime created_at
        datetime updated_at
        string audit_hash
    }

    VALORES_INDICADOR {
        integer id PK
        string captura_id FK
        string codigo_indicador "IAAE, TECP, RAD-001..."
        real valor_calculado
        text variables_json "{NE: 42, NT: 50}"
        string estatus_evaluacion "OPTIMO, ALERTA, CRITICO"
    }

    SELLOS_CRIPTOGRAFICOS {
        string id PK "SELLO-SHA256-..."
        integer corte_id FK UK
        string ministro_id FK
        string sha256_hash UK
        string merkle_root
        text payload_resumen_json
        datetime timestamp_firma
    }
```

---

## 2. Definición DDL en SQL (SQLite con Idempotencia)

```sql
-- Habilitar claves foráneas e integridad referencial
PRAGMA foreign_keys = ON;

-- 1. Tabla de Entes Adscritos
CREATE TABLE IF NOT EXISTS entes (
    id TEXT PRIMARY KEY,
    sigla TEXT NOT NULL UNIQUE,
    nombre_completo TEXT NOT NULL,
    eje_adscripcion TEXT NOT NULL CHECK(eje_adscripcion IN ('EJE_1', 'EJE_2', 'EJE_3', 'EJE_4')),
    activo INTEGER NOT NULL DEFAULT 1
);

-- 2. Tabla de Usuarios y Perfiles
CREATE TABLE IF NOT EXISTS usuarios (
    id TEXT PRIMARY KEY,
    cedula TEXT NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    ente_id TEXT NOT NULL REFERENCES entes(id),
    rol_sistema TEXT NOT NULL,
    rol_raci TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    activo INTEGER NOT NULL DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Cortes Semanales
CREATE TABLE IF NOT EXISTS cortes_semanales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    semana INTEGER NOT NULL CHECK(semana BETWEEN 1 AND 53),
    ano INTEGER NOT NULL CHECK(ano >= 2026),
    estado TEXT NOT NULL DEFAULT 'ABIERTO' CHECK(estado IN ('ABIERTO', 'CERRADO', 'REFRENDADO')),
    fecha_cierre DATETIME,
    UNIQUE(semana, ano) -- Garantiza un único corte por semana oficial
);

-- 4. Tabla de Registros de Captura (Con Idempotencia Matemática)
CREATE TABLE IF NOT EXISTS registros_captura (
    id TEXT PRIMARY KEY,
    corte_id INTEGER NOT NULL REFERENCES cortes_semanales(id),
    ente_id TEXT NOT NULL REFERENCES entes(id),
    usuario_id TEXT NOT NULL REFERENCES usuarios(id),
    idempotency_key TEXT NOT NULL UNIQUE, -- Formato: YYYY-Www-ENTE
    audit_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(corte_id, ente_id) -- Impide duplicación de reporte para el mismo ente en la misma semana
);

-- 5. Tabla de Indicadores Capturados
CREATE TABLE IF NOT EXISTS valores_indicador (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    captura_id TEXT NOT NULL REFERENCES registros_captura(id) ON DELETE CASCADE,
    codigo_indicador TEXT NOT NULL,
    valor_calculado REAL NOT NULL,
    variables_json TEXT NOT NULL,
    estatus_evaluacion TEXT NOT NULL CHECK(estatus_evaluacion IN ('OPTIMO', 'ALERTA', 'CRITICO')),
    UNIQUE(captura_id, codigo_indicador) -- Cada indicador se reporta una sola vez por captura
);

-- 6. Cadena Inmutable de Sellos Criptográficos (C-Level)
CREATE TABLE IF NOT EXISTS sellos_criptograficos (
    id TEXT PRIMARY KEY,
    corte_id INTEGER NOT NULL UNIQUE REFERENCES cortes_semanales(id),
    ministro_id TEXT NOT NULL REFERENCES usuarios(id),
    sha256_hash TEXT NOT NULL UNIQUE,
    merkle_root TEXT NOT NULL,
    payload_resumen_json TEXT NOT NULL,
    timestamp_firma DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices de aceleración de consultas
CREATE INDEX IF NOT EXISTS idx_captura_ente ON registros_captura(ente_id);
CREATE INDEX IF NOT EXISTS idx_captura_corte ON registros_captura(corte_id);
CREATE INDEX IF NOT EXISTS idx_valores_codigo ON valores_indicador(codigo_indicador);
```
