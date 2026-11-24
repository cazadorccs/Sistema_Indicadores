# Arquitectura y Estructura del Sistema SGDO-VSCC
## Sistema de Gestión y Despliegue Operativo (Vicepresidencia Sectorial de Comunicación y Cultura / MIPPCI)
**Archivo Maestro:** `ARCHITECTURE.md`  
**Propósito:** Especificación de referencia técnica integral, Modelo C4, mapa de componentes, modelo entidad-relación (ERD), máquina de estados y diagramas de secuencia para guiar el desarrollo continuo (*vibe coding*) sin mezclar responsabilidades ni romper dependencias.

---

## 1. Arquitectura y Estructura (El Panorama General)

### 1.1 Diagrama de Arquitectura de Alto Nivel (Modelo C4 - Nivel 2: Contenedores)
Este diagrama delimita con precisión las responsabilidades de cada contenedor lógico, garantizando que la interfaz cliente no asuma lógica de negocio crítica ni el backend dependa de servicios externos fuera de la infraestructura soberana.

```mermaid
flowchart TD
    subgraph Actores["Actores y Roles Institucionales"]
        UserMinistro["Ministro / Máxima Autoridad<br/>(Firma C-Level, Síntesis IA)"]
        UserDirector["Directores de Operaciones<br/>(Supervisión, Asignación Claves)"]
        UserSala["Salas Operativas de Ente<br/>(Captura Semanal: VTV, RNV, REDTV)"]
        UserAuditor["Auditor Contralor<br/>(Verificación Merkle, Anti-repudio)"]
    end

    subgraph FronteraFrontend["Contenedor Frontend: SPA Resiliente (Cliente Web / Móvil)"]
        UI["Interfaz de Usuario React 19 + Tailwind v4<br/>(Diseño Soberano, WCAG 2.2 AA)"]
        SW["Service Worker PWA (sw.js)<br/>(CacheFirst: Estáticos | NetworkFirst: APIs)"]
        IDB[("Almacén Offline IndexedDB<br/>(sgdo_offline_db / Borradores Locales)")]
        Spotlight["Buscador en Memoria Pinpointer (Ctrl+K)<br/>(Indexación de 267 Indicadores SCIC)"]
        PhotoCap["Módulo de Captura Fotográfica<br/>(WebRTC Cámara Viva | capture='user' | Galería)"]

        UI <--> SW
        UI <--> IDB
        UI <--> Spotlight
        UI <--> PhotoCap
    end

    subgraph FronteraBackend["Contenedor Backend: Núcleo Modular Soberano (Node.js v22 + Express)"]
        App["backend/app.ts<br/>(Orquestador HTTP Express)"]
        MiddlewareAuth["authMiddleware.ts<br/>(Validación Token Bearer HMAC + RBAC)"]
        
        subgraph RutasAPI["Rutas Modularizadas (/api y /api/v1)"]
            R_Auth["auth.routes.ts<br/>(Login, Formalize, Recovery, Admin)"]
            R_Cap["captura.routes.ts<br/>(Ingesta Semanal Idempotente)"]
            R_Dash["dashboards.routes.ts<br/>(5 Tableros Especializados + Sync)"]
            R_Alerts["alerts.routes.ts<br/>(Gestión de Amenazas e Incidentes)"]
            R_Health["health.routes.ts<br/>(Telemetría y Estado de WAL)"]
        end

        subgraph ServiciosSoberanos["Servicios de Lógica de Negocio y Criptografía"]
            S_Token["tokenService.ts<br/>(Tokens HMAC-SHA256 con Clave Secreta)"]
            S_Pass["passwordService.ts<br/>(scrypt RFC 7914 + OTP + bound_device_id)"]
            S_Merkle["merkleService.ts<br/>(Árboles Merkle RFC 6962: 0x00 / 0x01)"]
            S_Dash["dashboardsService.ts<br/>(Consolidación C-Level, NOC, Digital)"]
            S_Alerts["alertsService.ts<br/>(Heurística DA-01 y Mitigación)"]
        end

        App --> MiddlewareAuth
        MiddlewareAuth --> RutasAPI
        R_Auth --> S_Token
        R_Auth --> S_Pass
        R_Auth --> S_Merkle
        R_Cap --> S_Merkle
        R_Dash --> S_Dash
        R_Alerts --> S_Alerts
    end

    subgraph FronteraPersistencia["Capa de Persistencia Soberana On-Premise"]
        DB[("Base de Datos SQLite Local<br/>(DatabaseSync, WAL Mode, Foreign Keys)<br/>backend/data/sgdo_soberano.db")]
        KeyFile[("Almacén Seguro de Clave<br/>backend/data/server_key.secret")]
        SqlStore["sqliteStore.ts<br/>(Repositorio Atómico con Idempotencia)"]

        RutasAPI --> SqlStore
        ServiciosSoberanos --> SqlStore
        SqlStore <--> DB
        S_Token <--> KeyFile
        S_Pass <--> KeyFile
    end

    %% Conexiones entre Contenedores
    UserMinistro --> UI
    UserDirector --> UI
    UserSala --> UI
    UserAuditor --> UI

    SW -- "HTTP / REST (Online)" --> App
    IDB -. "Sincronización Diferida al Reconectar" .-> App
```

---

### 1.2 Diagrama de Componentes y Dependencias Internas (Dependency Graph)
Este mapa visualiza qué archivo importa a cuál en el árbol del proyecto, evitando referencias circulares y facilitando la depuración rápida (*vibe coding*).

```mermaid
graph TD
    subgraph FrontendTree["Árbol de Componentes Frontend (src/)"]
        IndexHtml["index.html"] --> MainTsx["src/main.tsx"]
        MainTsx --> AppTsx["src/App.tsx"]

        subgraph NucleoApp["Vistas Principales y Conmutador de Módulos"]
            AppTsx --> LoginMod["components/LoginModule.tsx"]
            AppTsx --> ExecDash["components/ExecutiveDashboard.tsx"]
            AppTsx --> DataCap["components/DataCaptureModule.tsx"]
            AppTsx --> UserPanel["components/UserManagementPanel.tsx"]
            AppTsx --> ScicCat["components/ScicCatalogModule.tsx"]
            AppTsx --> AuditView["components/AuditRaciTracker.tsx"]
            AppTsx --> AlertsView["components/AlertsNotificationCenter.tsx"]
        end

        subgraph ModalesTransversales["Modales de Apoyo y Seguridad"]
            AppTsx --> Pinpointer["components/PinpointerModal.tsx"]
            AppTsx --> BoletinModal["components/BoletinEjecutivoModal.tsx"]
            AppTsx --> AIBriefModal["components/AIStrategicBriefModal.tsx"]
            LoginMod --> FormModal["components/FormalizationModal.tsx"]
            LoginMod --> RecovModal["components/PasswordRecoveryModal.tsx"]
            FormModal --> PhotoModal["components/PhotoCaptureModal.tsx"]
        end

        subgraph UtilidadesCliente["Utilidades y Almacenamiento Local"]
            AppTsx --> OfflineStore["utils/offlineStore.ts (IndexedDB)"]
            Pinpointer --> ScicData["data/scicIndicators.ts"]
            LoginMod --> UsersData["data/usersData.ts"]
            UserPanel --> UsersData
            ExecDash --> MockData["data/mockData.ts"]
        end

        subgraph Tipos["Definiciones TypeScript"]
            AppTsx --> Types["types.ts"]
            LoginMod --> Types
            UserPanel --> Types
            OfflineStore --> Types
        end
    end

    subgraph BackendTree["Árbol de Módulos Backend (backend/)"]
        ServerTs["server.ts"] --> BackendApp["backend/app.ts"]

        subgraph Middlewares["Capa de Enrutamiento y Filtros"]
            BackendApp --> AuthMid["backend/middleware/authMiddleware.ts"]
            BackendApp --> R_AuthBackend["backend/routes/auth.routes.ts"]
            BackendApp --> R_CapBackend["backend/routes/captura.routes.ts"]
            BackendApp --> R_DashBackend["backend/routes/dashboards.routes.ts"]
            BackendApp --> R_AlertsBackend["backend/routes/alerts.routes.ts"]
            BackendApp --> R_HealthBackend["backend/routes/health.routes.ts"]
        end

        subgraph ServiciosBackend["Servicios Especializados"]
            R_AuthBackend --> PassServ["backend/services/passwordService.ts"]
            R_AuthBackend --> TokenServ["backend/services/tokenService.ts"]
            R_AuthBackend --> MerkleServ["backend/services/merkleService.ts"]
            R_CapBackend --> MerkleServ
            R_DashBackend --> DashServ["backend/services/dashboardsService.ts"]
            R_AlertsBackend --> AlertsServ["backend/services/alertsService.ts"]
        end

        subgraph PersistenciaBackend["Motor de Persistencia SQLite"]
            R_AuthBackend --> Store["backend/db/sqliteStore.ts"]
            R_CapBackend --> Store
            R_DashBackend --> Store
            R_AlertsBackend --> Store
            Store --> DbCon["backend/db/database.ts"]
        end
    end

    %% Enlace Frontend-Backend
    AppTsx -. "Llamadas fetch('/api/...')" .-> BackendApp
```

---

## 2. Datos y Persistencia (La Base del Sistema)

### 2.1 Diagrama Entidad-Relación (ERD) / Esquema de Base de Datos SQLite
Modelo relacional implementado en `backend/db/database.ts` y gobernado por `backend/db/sqliteStore.ts`. Utiliza **SQLite WAL** con restricciones de idempotencia matemática (`UNIQUE`) e integridad referencial forzada.

```mermaid
erDiagram
    usuarios_institucionales {
        TEXT id PK "Identificador único (USR-001)"
        TEXT cedula UK "Cédula de identidad (V-13537582)"
        TEXT nombre "Nombres del funcionario"
        TEXT apellido "Apellidos del funcionario"
        TEXT email "Correo institucional oficial"
        TEXT telefono "Teléfono de contacto / nómina"
        TEXT telegram "Usuario de Telegram"
        TEXT ente_adscrito "Ente adscrito (VTV, RNV, REDTV)"
        TEXT cargo "Cargo oficial en nómina"
        TEXT dependencia "Dependencia o despacho"
        TEXT rol_sistema "Rol SGDO (SUPER_ADMIN, MINISTRO)"
        TEXT raci_role "Rol RACI (A, R, C, I)"
        TEXT estado "ACTIVO, SUSPENDIDO, BLOQUEADO"
        TEXT nivel_acceso "LECTURA, CAPTURA_EDICION, TOTAL"
        TEXT permisos_modulos "JSON Array de módulos autorizados"
        TEXT estatus_enrolamiento "PRECARGADO, ENROLADO, BLOQUEADO"
        TEXT password_hash "scrypt derived key en hex (64B)"
        TEXT password_salt "Sal criptográfica aleatoria (16B)"
        TEXT bound_device_id "Huella digital del dispositivo"
        TEXT bound_device_nombre "Nombre amigable del equipo"
        TEXT foto_perfil_url "Data URL base64 o ruta fotográfica"
        TEXT recovery_code "Código numérico OTP de 6 dígitos"
        INTEGER recovery_token_exp "Marca de tiempo de expiración"
        TEXT fecha_enrolamiento "Fecha de formalización oficial"
        TEXT ultimo_acceso "Fecha y hora de última sesión"
        INTEGER intentos_fallidos "Contador de accesos fallidos"
        TEXT created_at "Marca de tiempo de inserción"
        TEXT updated_at "Marca de tiempo de última actualización"
    }

    cortes_semanales {
        INTEGER id PK "Autoincremental identificador de corte"
        INTEGER semana "Semana Epidemiológica (1 a 53)"
        INTEGER ano "Año calendario oficial (>= 2026)"
        TEXT estado "ABIERTO, CERRADO, REFRENDADO"
        TEXT fecha_cierre "Marca de tiempo de cierre formal"
        TEXT created_at "Creación del corte oficial"
    }

    registros_captura {
        TEXT id PK "ID Compuesto: CAP-YYYY-WSS-ENTE"
        INTEGER corte_id FK "Referencia a cortes_semanales(id)"
        TEXT ente_id "Siglas del ente informante"
        TEXT usuario_id "Usuario responsable de la captura"
        TEXT idempotency_key UK "Llave criptográfica de idempotencia"
        TEXT audit_hash "Hash SHA-256 de los datos de planilla"
        TEXT payload_json "Estructura completa de captura en JSON"
        TEXT created_at "Fecha y hora de radicación"
        TEXT updated_at "Fecha y hora de actualización"
    }

    valores_indicador {
        INTEGER id PK "Autoincremental de medición"
        TEXT captura_id FK "Referencia a registros_captura(id)"
        TEXT codigo_indicador "Código oficial SCIC (ej: TECP, IAAE)"
        REAL valor_calculado "Valor matemático del indicador"
        TEXT variables_json "Valores de entrada de la fórmula en JSON"
        TEXT estatus_evaluacion "OPTIMO, ALERTA, CRITICO"
    }

    sellos_criptograficos {
        TEXT selloId PK "ID de sello ministerial (SELLO-YYYY-WSS)"
        TEXT hashCompletoSha256 UK "Hash de integridad de datos sellados"
        TEXT timestamp "Fecha y hora del acto de refrendo"
        INTEGER semanaEpidemiologica "Semana sellada por el Ministro"
        TEXT ministro "Nombre de la Máxima Autoridad firmante"
        TEXT cedula "Cédula del refrendante"
        TEXT cargo "Cargo ministerial oficial"
        TEXT observaciones "Dictamen y consideraciones finales"
        TEXT estado "CONFORME, OBSERVADO"
        TEXT kpisSellados "Instantánea JSON de Macro-KPIs sellados"
        TEXT merkleRoot "Raíz del Árbol de Merkle RFC 6962"
        TEXT created_at "Marca de tiempo inmutable"
    }

    impact_incidents {
        TEXT id PK "Identificador único de incidente"
        TEXT triggerCode "Código de alerta (ej: DA-01, NOC-02)"
        TEXT categoria "INFRAESTRUCTURA, CIBERDEFENSA, EDITORIAL"
        TEXT severidad "CRITICA, ALTA, MEDIA, BAJA"
        TEXT titulo "Resumen de la contingencia"
        TEXT descripcion "Detalle técnico del incidente"
        TEXT indicadorCodigo "Indicador afectado"
        TEXT enteResponsable "Ente a cargo de la resolución"
        TEXT timestampDisparo "Marca de tiempo de disparo"
        TEXT estado "ACTIVO, EN_PROCESO, NEUTRALIZADO"
    }

    system_state {
        TEXT key PK "Clave global (ej: central_store)"
        TEXT value "Copia JSON del estado en memoria"
        TEXT updated_at "Última sincronización persistente"
    }

    %% Relaciones entre Entidades
    cortes_semanales ||--o{ registros_captura : "agrupa capturas semanales"
    registros_captura ||--|{ valores_indicador : "desglosa indicadores calculados"
    usuarios_institucionales ||--o{ registros_captura : "radica captura oficial"
    cortes_semanales ||--o| sellos_criptograficos : "inmuta mediante sello ministerial"
```

---

## 3. Comportamiento y Flujo (Cómo Funciona la Aplicación)

### 3.1 Diagrama de Flujo y Máquina de Estados de Navegación de Usuario
Este diagrama define la navegación de pantallas y las transiciones de acceso según el estado del funcionario y sus privilegios RBAC.

```mermaid
stateDiagram-v2
    [*] --> PantallaLogin : Acceso a la Plataforma

    state PantallaLogin {
        [*] --> FormularioCredenciales
        FormularioCredenciales --> ValidandoCredenciales : Envío de Cédula + Contraseña
        ValidandoCredenciales --> FormularioCredenciales : Error 401 / Contraseña Inválida
        FormularioCredenciales --> ModalRecuperacion : Clic "¿Olvidó su contraseña?"
    }

    state ModalRecuperacion {
        [*] --> Paso1_VerificacionNomina : Ingresa Cédula + Correo/Teléfono
        Paso1_VerificacionNomina --> Paso2_ReasignacionClave : Coincidencia Exitosa (Emite OTP + Token HMAC)
        Paso2_ReasignacionClave --> PantallaLogin : Contraseña Reasignada con scrypt
    }

    PantallaLogin --> EvaluarEstadoUsuario : Credenciales Válidas

    state EvaluarEstadoUsuario <<choice>>
    EvaluarEstadoUsuario --> ModalFormalizacion : Estatus == 'PRECARGADO'
    EvaluarEstadoUsuario --> ValidarDispositivo : Estatus == 'ENROLADO'
    EvaluarEstadoUsuario --> PantallaBloqueado : Estatus == 'BLOQUEADO'

    state ModalFormalizacion {
        [*] --> Paso1_CapturaFoto : Cámara Web / Móvil / Archivo
        Paso1_CapturaFoto --> Paso2_ClavePersonal : Define Clave Institucional
        Paso2_ClavePersonal --> Paso3_VincularEquipo : Asocia bound_device_id
        Paso3_VincularEquipo --> DashboardAutorizado : Estatus pasa a 'ENROLADO'
    }

    state ValidarDispositivo {
        [*] --> ComprobarBoundDeviceId
        ComprobarBoundDeviceId --> DashboardAutorizado : Dispositivo Habitual Coincide
        ComprobarBoundDeviceId --> DashboardAutorizado : Dispositivo Nuevo (Registra Alerta en Auditoría)
    }

    state DashboardAutorizado {
        [*] --> EvaluacionRBAC

        state EvaluacionRBAC <<choice>>
        EvaluacionRBAC --> VistaSuperAdmin : Rol == 'SUPER_ADMIN'
        EvaluacionRBAC --> VistaMinistro : Rol == 'MINISTRO' (C-Level)
        EvaluacionRBAC --> VistaOperativa : Rol == 'SALA_OPERATIVA_ENTE'
        EvaluacionRBAC --> VistaAuditor : Rol == 'AUDITOR_CONTRALOR'

        state VistaSuperAdmin {
            GestionUsuarios : Gestión de Usuarios y Credenciales
            SimuladorVistas : Simulación de Perspectiva por Funcionario
            ConfigGlobal : Configuración del Sistema
        }

        state VistaMinistro {
            TableroCLevel : Tablero C-Level Presidencial (Macro-8)
            SintesisIA : Síntesis Estratégica Asistida por IA
            FirmaDigital : Refrendo Ministerial con Árbol de Merkle
        }

        state VistaOperativa {
            CapturaSemanal : Planilla de Ingesta (Idempotencia)
            ChecklistDinamico : Validación Cruzada SCIC
            IndexedDBDrafts : Modo Fuera de Línea (Borradores)
        }

        state VistaAuditor {
            TrazabilidadMerkle : Verificador Forense de Inclusión
            LogsInmutables : Bitácora de Accesos y Firmas SHA-256
        }
    }

    DashboardAutorizado --> PinpointerSpotlight : Atajo Teclado (Ctrl+K)
    PinpointerSpotlight --> DashboardAutorizado : Navegación Instantánea a Indicador/Módulo
    DashboardAutorizado --> PantallaLogin : Cerrar Sesión (handleLogout)
```

---

### 3.2 Diagramas de Secuencia de Procesos Críticos

#### 3.2.1 Secuencia: Autenticación y Formalización Inicial Multi-Dispositivo
Muestra la verificación con `scrypt`, toma de foto, generación de `bound_device_id` y emisión de token.

```mermaid
sequenceDiagram
    autonumber
    actor Funcionario as Funcionario Institucional
    participant UI as LoginModule / FormalizationModal
    participant SW as Service Worker (sw.js)
    participant AuthAPI as backend/routes/auth.routes.ts
    participant PassSvc as passwordService.ts (scrypt)
    participant TokenSvc as tokenService.ts (HMAC-SHA256)
    participant SQLite as sqliteStore.ts / DatabaseSync

    Funcionario->>UI: Ingresa Cédula y Clave Oficial
    UI->>SW: POST /api/v1/auth/login { identifier, password, boundDeviceId }
    SW->>AuthAPI: Reenvía petición a API
    AuthAPI->>SQLite: getUsuarioByIdentifier(term)
    SQLite-->>AuthAPI: Retorna registro (estatus_enrolamiento: 'PRECARGADO')
    AuthAPI->>AuthAPI: Valida contraseña de contingencia oficial
    AuthAPI->>TokenSvc: generateToken(payload)
    TokenSvc-->>AuthAPI: Retorna token temporal de sesión
    AuthAPI-->>UI: { success: true, requiresFormalization: true, user }

    Note over Funcionario,UI: Apertura de Modal de Formalización Obligatoria
    Funcionario->>UI: Toma fotografía (WebRTC Cámara en Vivo / Archivo)
    Funcionario->>UI: Ingresa nueva contraseña personal
    UI->>UI: Genera / recupera bound_device_id en localStorage
    Funcionario->>UI: Clic en "Finalizar Formalización y Acceder"

    UI->>AuthAPI: POST /api/v1/auth/formalize { userId, password, fotoPerfilUrl, boundDeviceId }
    AuthAPI->>PassSvc: hashPassword(password)
    Note over PassSvc: Genera sal criptográfica (16B) y deriva clave scrypt (64B)
    PassSvc-->>AuthAPI: { hash, salt }
    AuthAPI->>SQLite: formalizeUsuario({ hash, salt, boundDeviceId, fotoPerfilUrl })
    SQLite-->>AuthAPI: Usuario actualizado a estatus 'ENROLADO'
    AuthAPI->>TokenSvc: generateToken(payloadFormalizado)
    TokenSvc-->>AuthAPI: Token definitivo firmado HMAC-SHA256
    AuthAPI-->>UI: { success: true, user, token }
    UI->>UI: Almacena token y autoriza acceso a los tableros
```

---

#### 3.2.2 Secuencia: Autoservicio de Recuperación de Contraseña (Sin Soporte Técnico)
Flujo en dos pasos con verificación de datos de nómina, código OTP y reasignación criptográfica.

```mermaid
sequenceDiagram
    autonumber
    actor Funcionario as Funcionario Olvidó Clave
    participant UI as PasswordRecoveryModal.tsx
    participant AuthAPI as backend/routes/auth.routes.ts
    participant PassSvc as passwordService.ts
    participant SQLite as sqliteStore.ts / SQLite DB

    %% Paso 1
    Funcionario->>UI: Ingresa Cédula y Correo/Teléfono institucional
    UI->>AuthAPI: POST /api/v1/auth/recovery/request { cedula, emailOrPhone }
    AuthAPI->>SQLite: requestPasswordRecovery(cedula, emailOrPhone)
    SQLite->>SQLite: Compara datos con registro oficial de nómina
    SQLite->>PassSvc: generateRecoveryOTP()
    PassSvc-->>SQLite: Retorna OTP de 6 dígitos numéricos
    SQLite->>PassSvc: generateRecoveryToken(cedula, SERVER_SECRET, 15 min)
    PassSvc-->>SQLite: Retorna token HMAC con expiración
    SQLite->>SQLite: Guarda recovery_code y recovery_token_exp en SQLite
    SQLite-->>AuthAPI: { recoveryCode, recoveryToken, exp }
    AuthAPI-->>UI: { success: true, recoveryCode, recoveryToken, exp }
    Note over UI: Muestra código OTP y avanza al Paso 2

    %% Paso 2
    Funcionario->>UI: Ingresa código OTP (6 dígitos) + Nueva Contraseña
    UI->>AuthAPI: POST /api/v1/auth/recovery/reset { cedula, recoveryCode, newPassword, recoveryToken }
    AuthAPI->>SQLite: resetPasswordWithRecovery(...)
    SQLite->>PassSvc: verifyRecoveryToken(recoveryToken, SERVER_SECRET)
    PassSvc-->>SQLite: Token válido (firma verificada timingSafeEqual)
    SQLite->>SQLite: Comprueba que recoveryCode coincida y no haya expirado
    SQLite->>PassSvc: hashPassword(newPassword)
    PassSvc-->>SQLite: { hash, salt } nuevos con scrypt
    SQLite->>SQLite: Actualiza password_hash, limpia OTP y desbloquea usuario
    SQLite-->>AuthAPI: { success: true, message: 'Contraseña reasignada' }
    AuthAPI-->>UI: { success: true }
    UI->>Funcionario: Notifica éxito y redirige a inicio de sesión
```

---

#### 3.2.3 Secuencia: Captura Semanal Idempotente y Refrendo Ministerial con Árbol de Merkle RFC 6962
Demuestra la prevención de duplicados, cálculo de la raíz Merkle con separación de dominios (`0x00`/`0x01`) y persistencia inmutable del sello ministerial.

```mermaid
sequenceDiagram
    autonumber
    actor Operador as Sala Operativa de Ente (VTV)
    actor Ministro as Ministro / Máxima Autoridad
    participant UI as DataCapture / ExecutiveDashboard
    participant CapAPI as backend/routes/captura.routes.ts
    participant MerkleSvc as backend/services/merkleService.ts
    participant SQLite as backend/db/sqliteStore.ts
    participant DB as SQLite DB (sgdo_soberano.db)

    %% Captura Semanal
    Operador->>UI: Completa planilla e ingresa cifras semanales
    UI->>UI: Genera idempotencyKey única (UUIDv4) y auditHash SHA-256
    UI->>CapAPI: POST /api/v1/captura/guardar { semana, ano, enteId, idempotencyKey, payload }
    CapAPI->>SQLite: saveCapturaSemanal(...)
    SQLite->>DB: INSERT INTO registros_captura (corte_id, ente_id, ...)
    alt Es primer intento de la semana
        DB-->>SQLite: Inserción confirmada (RowID creado)
        SQLite-->>CapAPI: { success: true, id: 'CAP-2026-W35-VTV' }
        CapAPI-->>UI: 200 OK: Captura registrada exitosamente
    else Reintento accidental o colisión de red
        DB-->>SQLite: Error UNIQUE(corte_id, ente_id) violado
        SQLite-->>CapAPI: { success: true, duplicado: true, id: 'CAP-2026-W35-VTV' }
        CapAPI-->>UI: 200 OK: Idempotencia activada (No se duplica registro)
    end

    %% Proceso de Refrendo Ministerial
    Ministro->>UI: Revisa Macro-KPIs consolidados de la semana
    Ministro->>UI: Clic en "Refrendar y Sellar Ministerialmente"
    UI->>CapAPI: POST /api/v1/cortes/35/refrendar { ministro, cedula, observaciones }
    CapAPI->>SQLite: getCapturasPorSemana(35, 2026)
    SQLite-->>CapAPI: Lista de payloads y hashes de todos los entes reportados
    
    CapAPI->>MerkleSvc: buildTree(hashesEntes)
    Note over MerkleSvc: Separación de Dominios RFC 6962:<br/>Hojas: SHA256(0x00 + data)<br/>Nodos: SHA256(0x01 + left + right)
    MerkleSvc-->>CapAPI: merkleRoot oficial del Árbol de Merkle

    CapAPI->>SQLite: saveSelloCriptografico({ semana: 35, merkleRoot, ministro, hashCompletoSha256 })
    SQLite->>DB: INSERT INTO sellos_criptograficos (...)
    DB-->>SQLite: Registro inmutable confirmado
    SQLite-->>CapAPI: Sello guardado exitosamente
    CapAPI-->>UI: Retorna Sello Criptográfico Oficial con Merkle Root
    UI->>Ministro: Visualización de Sello SHA-256 y Certificado de No-Repudio
```

---

## 4. Matriz de Integración en el Flujo de Trabajo (*Vibe Coding Best Practices*)

Para mantener la integridad estructural del SGDO-VSCC, todo agente de IA o ingeniero debe consultar esta matriz antes de implementar o refactorizar código:

| Etapa del Desarrollo | Diagrama de Referencia Obligatoria | Objetivo Crítico de Verificación |
| :--- | :--- | :--- |
| **Antes de Empezar (Prompting & Diseño)** | **Arquitectura C4 (1.1) + ERD (2.1)** | Garantizar que el nuevo requerimiento respete la separación de capas (Frontend/Backend/SQLite) y utilice las columnas relacionales existentes sin inventar campos no persistidos. |
| **Diseño de Pantallas e Interacción** | **Flujo de Navegación (3.1) + Secuencia (3.2)** | Evitar estados rotos, pantallas huérfanas o rutas no protegidas por el middleware RBAC. |
| **Depuración y Refactorización** | **Componentes y Dependencias (1.2)** | Identificar qué componentes se verán afectados por un cambio antes de modificar funciones compartidas (`types.ts`, `sqliteStore.ts`, `passwordService.ts`). |
| **Validación de Calidad** | **Puertas Automatizadas (`npm run quality-gate`)** | Verificar en un solo paso: Tipado estricto (`tsc --noEmit`), suites de pruebas (43 tests en 11 suites), integridad de base de datos SQLite y corpus documental. |

> [!IMPORTANT]
> Cada vez que se incorpore un nuevo módulo, tabla relacional o servicio en el SGDO-VSCC, este archivo `ARCHITECTURE.md` **debe ser actualizado de manera sincronizada**, garantizando que el diseño y el código fuente permanezcan en perfecta correspondencia.
