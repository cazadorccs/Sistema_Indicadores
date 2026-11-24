# PLAN MAESTRO DE IMPLEMENTACIÓN: SISTEMA DE 5 TABLEROS ESPECIALIZADOS INTERCONECTADOS
### Ministerio del Poder Popular para la Comunicación e Información (MPPCI)
**Vicepresidencia Sectorial de Comunicación y Cultura (VSCC)**

---

## 1. ARQUITECTURA DE DATOS CENTRALIZADA (CENTRAL DATA HUB)

Para garantizar la interoperabilidad, trazabilidad y consistencia matemática entre los cinco (5) tableros, el sistema implementa una **Base de Datos Centralizada** sobre un modelo relacional normalizado con soporte de telemetría de series de tiempo (*time-series*).

```
                                 FUENTES DE CAPTURA PRIMARIA (ROL 'R')
         [Formularios Eje 1: Medios] [Telemetría REDTV/CONATEL: Eje 2] [Monitoreo/Redes: Eje 3] [Despachos: Eje 4]
                                                    │
                                                    ▼
                               ┌────────────────────────────────────────┐
                               │  MOTOR DE INGESTIÓN Y VALIDACIÓN (API) │
                               │   - Niveles 1, 2 y 3 de Validación     │
                               │   - Hash Inmutable SHA-256             │
                               └────────────────────┬───────────────────┘
                                                    │
                                                    ▼
                              ┌───────────────────────────────────────────┐
                              │     BASE DE DATOS CENTRALIZADA (SQL)      │
                              │  - Tablas Maestras de Indicadores         │
                              │  - Telemetría en Tiempo Real              │
                              │  - Almacén de Matrices y Sentimiento      │
                              │  - Registro Histórico Semanal             │
                              └─────────────────────┬─────────────────────┘
                                                    │
                    ┌───────────────────────────────┴──────────────────────────────┐
                    │                                                              │
                    ▼                                                              ▼
    ┌───────────────────────────────┐                             ┌─────────────────────────────────┐
    │  SERVICIOS DE CÁLCULO Y AGG   │                             │  CONTROL DE ACCESO Y SEGURIDAD  │
    │  - Motor IEC / IRT / EE / ICD │                             │   - Matriz de Gobernanza RACI   │
    │  - Algoritmos NLP Sentimiento │                             │   - Autenticación 2FA & RBAC    │
    └───────────────┬───────────────┘                             └────────────────┬────────────────┘
                    │                                                              │
                    └───────────────────────────────┬──────────────────────────────┘
                                                    │
               ┌────────────────────────────────────┼────────────────────────────────────┐
               ▼                                    ▼                                    ▼
       [NIVEL OPERATIVO]                    [NIVEL TÁCTICO]                    [NIVEL ESTRATÉGICO]
 ┌──────────────────────────┐         ┌──────────────────────────┐         ┌──────────────────────────┐
 │ 2. Tablero NOC / Infra   │         │ 1. Tablero Sala / Ciber  │         │ 5. Tablero C-Level /     │
 │ 4. Tablero Medios & Pauta│         │ 3. Tablero Digital/Trans │         │    Presidencia SinglePane│
 └──────────────────────────┘         └──────────────────────────┘         └──────────────────────────┘
```

### 1.1 Modelo Entidad-Relación Central
* **`registro_control_cabecera`**: Identificación legal de la carga (`semanaEpidemiologica`, `fechaReporte`, `enteAdscrito`, `responsableEnte`, `cedula`, `hashSha256`, `estadoRaci`).
* **`telemetria_transmision`**: Mediciones segundo a segundo y horarias de REDTV/CONATEL (`frecuencia`, `potenciaKu`, `disponibilidadMaster`, `mttr_minutos`, `estado_id`, `municipio_id`).
* **`ciberdefensa_matrices`**: Detección de amenazas virales (`codigo_da01`, `severidad`, `origen`, `impacto_vistas`, `volumen_menciones`, `tasa_neutralizacion`, `tiempo_respuesta_trmd`).
* **`produccion_contenidos_eje1`**: Inventario diario de piezas generadas clasificado por la tipología oficial de contenidos.
* **`audiencia_streaming_redes`**: Métricas de interacción social (`reach`, `engagement_ee`, `pico_concurrencia_pcv`, `watch_time`).
* **`macro_kpis_consolidados`**: Pre-cálculo de los 8 macroindicadores directivos para garantizar tiempos de respuesta `< 120 ms` en la vista C-Level.

---

## 2. MATRIZ DE GOBERNANZA RACI Y PERMISOLOGÍA DE ACCESO

Conforme al marco normativo del MPPCI y la matriz de gobernanza del sistema, el acceso a los tableros se estructura de acuerdo a la metodología internacional **RACI**:
* **R (Responsible - Responsable)**: Carga, alimenta y monitorea la operatividad en tiempo de ejecución.
* **A (Accountable - Aprobador)**: Valida la veracidad, autoriza contranarrativas y aprueba el informe oficial con firma electrónica.
* **C (Consulted - Consultado)**: Soporte técnico especializado, peritaje legal y análisis de inteligencia.
* **I (Informed - Informado)**: Consumo gerencial y directivo para toma de decisiones y directrices supremas.

| N° | Tablero Especializado | Nivel | Responsable (R) | Aprobador (A) | Consultado (C) | Informado (I) | Privilegios en el Sistema |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **5** | **Ejecutivo de Alto Nivel (C-Level / Presidencia)** | Estratégico / Decisión | Director General de Seguimiento y Control de Gestión; Asesor Senior de Inteligencia | Ministro(a) del Poder Popular para la Comunicación e Información | Consejo de Viceministros (Medios, Planificación, Plataformas, Gestión) | Presidente de la República; Vicepresidente Ejecutivo de la República | **R**: Cierre semanal y consolidación.<br>**A**: Firma de Estado y despacho de directrices.<br>**I**: Cuadro de Mando Integral Unificado. |
| **1** | **Sala Situacional y Ciberdefensa** | Táctico / Contingencia | Director General de Monitoreo y Análisis de Medios; Operadores de Ciberinteligencia | Viceministro(a) de Planificación y Estrategia Comunicacional | Dirección de Ciberseguridad; DGCIM; Asesoría Jurídica | Ministro(a) MPPCI; Sala Situacional Presidencial; Voceros Oficiales | **R**: Carga de matrices y respuesta.<br>**A**: Aprobación de contranarrativas.<br>**I**: Lectura ejecutiva en vivo. |
| **2** | **NOC e Infraestructura Técnica** | Operativo / Telemetría | Gerente General de Operaciones de REDTV; Gerente de Fiscalización de CONATEL; Jefes Técnicos VTV/RNV | Presidente de REDTV; Director General de CONATEL; Viceministro(a) de Soporte de Plataformas | Cuadrillas Técnicas de Campo; CORPOELEC; CANTV | Ministro(a) MPPCI; Viceministro(a) de Gestión; Sala Presidencial | **R**: Registro de fallas y MTTR.<br>**A**: Dictamen de disponibilidad de red.<br>**I**: Semáforo de conectividad territorial. |
| **3** | **Analítica Digital y Audiencias** | Táctico / Audiencias | Directores Generales de Medios Digitales (VTV, Telesur, RNV, AVN); Community Managers Master | Viceministro(a) de Comunicación e Información (Medios) | Especialistas Big Data; Desarrolladores Web; Agencias de Contenido | Ministro(a) MPPCI; Presidentes de Entes Públicos; Directores de Pauta | **R**: Integración de APIs e ingreso de alcance.<br>**A**: Acreditación de engagement.<br>**I**: Consulta de Share of Voice y ROI. |
| **4** | **Operatividad de Medios y Despliegue** | Operativo / Cobertura | Jefes de Redacción; Gerentes de Producción de TV/Radio; Coordinadores de Corresponsalías | Viceministro(a) de Comunicación e Información | Prensa Presidencial; Dirección de Logística de Cobertura | Ministro(a) MPPCI; Viceministerio de Gestión; Sala Situacional | **R**: Declaración de pases y piezas producidas.<br>**A**: Certificación de alineación editorial (IAAE).<br>**I**: Reporte de productividad diaria. |

---

## 3. ESPECIFICACIÓN TÉCNICA DE LOS CINCO (5) TABLEROS

### Tablero 5: Dashboard Ejecutivo de Alto Nivel (C-Level / Presidencia)
* **Objetivo**: *Single Pane of Glass* de mando táctico-estratégico con los **8 Macroindicadores Críticos** para el Despacho Ministerial y la Presidencia de la República.

#### Los 8 Macroindicadores del Tablero C-Level:
1. **Índice de Efectividad Comunicacional (IEC)**:
   $$IEC = (0.35 \times EE) + (0.35 \times ICD) + (0.30 \times IRT)$$
   *Estado de salud global del despliegue comunicacional del Estado.*
2. **Índice de Resiliencia Técnica Nacional (IRT)**:
   $$IRT = \frac{\% TDA_{Operativa} + \% Satélite_{BandaKu} + \% Señal_{Master}}{3}$$
   *Garantía de operatividad del espectro y señales abiertas.*
3. **Índice de Cobertura Digital y Penetración (ICD / IPMD)**:
   $$ICD = \left( \frac{\text{Alcance Digital Acumulado}}{\text{Meta de Audiencia Nacional}} \right) \times 100$$
4. **Tasa de Engagement Efectivo (EE / RED-ENG)**:
   Razón de interacciones activas ciudadanas sobre visualizaciones brutas en redes del Estado.
5. **Índice de Balance de Sentimiento Neto (IBS)**:
   $$IBS = \% Sentimiento_{Positivo} - \% Sentimiento_{Hostil}$$
6. **Tasa de Respuesta a Matrices de Desinformación (TRMD / TNC)**:
   Tiempo promedio en minutos y % de matrices hostiles neutralizadas con contranarrativa antes de 120 minutos.
7. **Índice de Alineación con la Agenda Estratégica (IAAE)**:
   Porcentaje de adherencia de la parrilla informativa del SNMP a las líneas matrices de gobierno.
8. **Índice de Vulnerabilidad Institucional y Operativa (IVI)**:
   $$IVI = \frac{(Personal_{Rojo} \times 3) + (Personal_{Amarillo} \times 1) + (Personal_{Verde} \times 0)}{TotalPersonal}$$
   *Nivel de riesgo operativo del talento humano esencial en zonas de contingencia.*

---

### Tablero 1: Dashboard de Sala Situacional y Ciberdefensa (Control de Entorno)
* **Objetivo**: Neutralización de operaciones psicológicas, detección temprana de noticias falsas y control de la hegemonía comunicacional en tiempo cuasi-real.
* **Componentes y Visualizaciones**:
  1. **Termómetro de Amenazas (Heatmap Georreferenciado)**: Despliegue sobre mapa vectorial nacional de matrices clasificadas por severidad (`CRÍTICO`, `ALTO`, `MEDIO`, `BAJO`) con base en el indicador `[DA-01]` y correlacionado con densidad demográfica.
  2. **Curva Dinámica de Neutralización (Line Chart con doble eje Y)**: Representa el volumen de propagación viral de la matriz hostil (eje izquierdo) versus el Tiempo Promedio de Respuesta Institucional `[TRMD]` y la Tasa de Neutralización Comunicacional (eje derecho).
  3. **Share of Voice Institucional (Donut Chart)**: Participación proporcional del relato oficial frente a la narrativa adversa `[V1.1]`.
  4. **Barra de Sentimiento NLP (Stacked Bar Chart)**: Clasificación de Procesamiento de Lenguaje Natural del sentimiento digital `[ID-09]` en *Favorable (+)*, *Informativo/Neutro (=)* y *Hostil (-)*.
* **Acción Inmediata**: Botón de disparo para invocar el motor de **Contranarrativas con Inteligencia Artificial (Gemini)** y derivar líneas discursivas a salas de prensa.

---

### Tablero 2: Dashboard de Centro de Operaciones de Red (NOC) e Infraestructura
* **Objetivo**: Supervisión en tiempo real de la resiliencia física de telecomunicaciones, telepuerto satelital, repetidoras y fiscalización del espectro.
* **Componentes y Visualizaciones**:
  1. **Mapa Topológico de Transmisión (Choropleth & Node Geo-Map)**: Monitor del *% de Operatividad Nacional TDA* `[RTV-001]` y *N° de Servicios de TV activos* `[RTV-002]` por estado y municipio, coloreando nodos en verde, amarillo o rojo.
  2. **Monitores de Estabilidad de Master y Satélite (Radial Gauge Charts)**:
     - Disponibilidad de Enlace Satelital Banda Ku `[RTV-009]` (Meta: $\ge 99.5\%$).
     - Eficiencia de Modulación de Señal `[EFM]` y Nivel de Ruido/Interferencia `[CON-004]`.
  3. **Línea de Tiempo de Recuperación de Red (Gantt / Timeline Chart)**: Medición del *Mean Time to Recovery (MTTR)* `[TMR]` para fiscalizar la rapidez de cuadrillas técnicas ante caídas de torres críticas (Waraira Repano, Zulia, Puerto Cabello, etc.).
  4. **Matriz de Resiliencia Energética**: Estado de plantas motogeneradoras y respaldo de baterías en estaciones de transmisión.

---

### Tablero 3: Dashboard de Analítica de Ecosistema Digital y Audiencias Transmedia
* **Objetivo**: Auditoría del impacto real de la inversión en canales digitales, tráfico web y transmisiones en directo del SNMP.
* **Componentes y Visualizaciones**:
  1. **Embudo de Conversión de Audiencia (Funnel Chart)**:
     - Etapa 1: *Audiencia Bruta Estimada / Reach Total* `[V1.4]`.
     - Etapa 2: *Visitas y Sesiones Únicas a Portales Web* `[WEB-001] / [WEB-002]`.
     - Etapa 3: *Consumo Profundo de Contenido* (Páginas vistas `[WEB-007]` y tiempo en sitio).
     - Etapa 4: *Acción / Engagement Cívico* (Descargas, suscripciones y comentarios).
  2. **Matriz de Crecimiento y Rendimiento Viral (Scatter Plot 4 Cuadrantes)**:
     - Eje X: *Índice de Crecimiento de Seguidores* ($\Delta\%$ nuevos usuarios).
     - Eje Y: *Tasa de Engagement Efectivo* `[RED-ENG]` ($EE = \frac{\text{Interacciones}}{\text{Vistas}} \times 100$).
     - Burbujas: Cada ente adscrito (VTV, Telesur, RNV, Alba Ciudad, Vive TV, etc.), donde el radio indica el volumen de impresiones brutas.
  3. **Monitor de Concurrencia en Vivo (Live Area Chart con WebSocket)**:
     - Seguimiento en tiempo real del *Pico de Concurrencia (PCV)* `[STR-001]` en YouTube, Twitch, Facebook Live y streaming web soberano.
     - Indicador continuo de *Tiempo Total de Visualización (Horas)*.

---

### Tablero 4: Dashboard de Operatividad de Medios y Despliegue Informativo
* **Objetivo**: Control estricto de la productividad periodística, despliegue territorial de reporteros y alineación con la agenda país.
* **Componentes y Visualizaciones**:
  1. **Radar de Pases en Vivo y Cobertura (Radar Chart Multi-Eje)**: Cruce de *Pases en vivo desde campo* `[TV-008]` y *Programas en vivo producidos* `[RAD-006]` clasificados por las 8 Regiones Estratégicas de Desarrollo Integral (REDI) y tipo de evento (Comunal, Presidencial, Contingencia, Internacional).
  2. **Alineación con la Agenda Estratégica (Bullet Chart / Target Bar)**: Medición del *Índice de Alineación con la Agenda Estratégica (IAAE)*, comparando la cuota obligatoria de pauta nacional versus la producción efectiva emitida en cada medio.
  3. **Muro de Producción Diaria (KPI Tiles Diferenciados)** con tipificación formal del Eje 1 (ver Sección 4).

---

## 4. TIPIFICACIÓN DE CONTENIDOS DEL EJE 1 (MURO DE PRODUCCIÓN)

En cumplimiento de las especificaciones metodológicas del **Eje 1 (Gestión de Contenidos y Producción)**, el *Muro de Producción* tipifica y desglosa las piezas generadas en cuatro (4) grandes familias técnicas:

| Familia de Contenido | Tipología Específica | Código SCIC | Unidad de Medida | Formato de Registro | Meta Diaria Promedio |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **1. Contenido Escrito** | Notas de Prensa Publicadas | `IMP-006` / `WEB-003` | Nota | Texto con titular y cuerpo | 120 por circuito |
| | Artículos de Opinión / Web | `WEB-004` | Artículo | Análisis de fondo | 25 por circuito |
| | Comunicados Oficiales MPPCI | `EST-001` | Comunicado | Documento oficial PDF/Web | Por coyuntura |
| | Reportajes Especiales | `IMP-007` | Reportaje | Investigación periodística | 8 semanales |
| **2. Contenido Sonoro** | Micros Radiales Informativos | `RAD-008` | Micro (30"-60") | Audio MP3 / Master | 45 por emisora |
| | Programas en Vivo Producidos | `RAD-006` | Horas de emisión | Parrilla en vivo | 18 horas/día |
| | Avances y Flashes Noticiosos | `RAD-009` | Cápsula sonora | Boletín de 2 minutos | Cada 60 minutos |
| | Podcasts Temáticos | `RAD-015` | Episodio | Distribución streaming | 3 semanales |
| **3. Contenido Audiovisual** | Pases en Vivo desde Campo | `TV-008` | Pase satelital/IP | Transmisión remota en vivo | 35 diarios |
| | Cápsulas / Reportes de TV | `TV-009` | Pieza editada | Video con grafismo | 50 diarios |
| | Ediciones de Noticieros | `TV-001` | Emisión | Transmisión matriz | 3 diarias (VTV/TVES) |
| | Documentales / Seriados | `TV-015` | Capítulo | Formato largo de 30-60 min | 2 semanales |
| **4. Contenido Digital / Gráfico** | Infografías y Datos Explicativos | `RED-008` | Arte gráfico | Formato vertical/horizontal | 20 diarias |
| | Carruseles Educativos (Insta/FB)| `RED-009` | Carrusel multislide| Pieza pedagógica | 15 diarias |
| | Videos Cortos (TikTok/Reels) | `RED-010` | Video vertical | Formato $< 90$ segundos | 40 diarios |
| | Hilos de Microblogging (X/Threads)|`RED-011` | Hilo / Post | Secuencia de mensajes | 60 diarios |

---

## 5. PLAN DE IMPLEMENTACIÓN POR FASES (CRONOGRAMA GANTT)

```
Semanas:                 01  02  03  04  05  06  07  08  09  10
Fase 1: Data Hub & API   ██████
Fase 2: NOC & Medios         ██████
Fase 3: Ciberdefensa & RRSS      ██████
Fase 4: Tablero C-Level & AI         ██████
Fase 5: Auditoría & Rollout              ██████
```

* **Fase 1**: Arquitectura Centralizada de Datos e Ingestión API (Semanas 1 y 2).
* **Fase 2**: Implementación de Tableros Operativos (NOC y Medios) (Semanas 3 y 4).
* **Fase 3**: Implementación de Tableros Tácticos (Sala Situacional y Ecosistema Digital) (Semanas 5 y 6).
* **Fase 4**: Implementación del Dashboard Ejecutivo C-Level y Motor de Síntesis IA (Semanas 7 y 8).
* **Fase 5**: Pruebas de Integración RACI, Auditoría de Seguridad y Puesta en Marcha (Semanas 9 y 10).

---

## 6. ESTADO DE EJECUCIÓN Y CERTIFICACIÓN EN PRODUCCIÓN

> [!NOTE]
> **Estado del Despliegue:** 100% COMPLETADO Y OPERATIVO EN SERVIDOR LOCAL Y PRODUCCIÓN.

| Componente Técnico / Módulo | Archivo Fuente | Estado | Protocolo / Endpoint Activo |
| :--- | :--- | :---: | :--- |
| **Definición de Tipos TypeScript** | `src/types/dashboardsTypes.ts` | **Completado** | Exportación integral en `src/types.ts` |
| **Data Hub Central & Ingesta** | `server.ts` | **Completado** | `POST /api/dashboards/sync` con recálculo dinámico |
| **Tablero 1: Ciberdefensa** | `src/components/dashboards/CiberdefensaDashboard.tsx` | **Completado** | `POST /api/dashboards/ciberdefensa/amenaza`, `neutralizar`, `aprobar-contranarrativa` |
| **Tablero 2: NOC & Infraestructura** | `src/components/dashboards/NocInfraestructuraDashboard.tsx` | **Completado** | `POST /api/dashboards/noc/incidencia` (Torres y MTTR) |
| **Tablero 3: Audiencias Digitales** | `src/components/dashboards/AudienciasDigitalDashboard.tsx` | **Completado** | `GET /api/dashboards/audiencias-digital` (Reach y Streaming) |
| **Tablero 4: Operatividad de Medios**| `src/components/dashboards/OperatividadMediosDashboard.tsx`| **Completado** | `POST /api/dashboards/medios/registrar-produccion` (Muro Eje 1) |
| **Tablero 5: Ejecutivo C-Level** | `src/components/dashboards/ExecutiveSinglePaneDashboard.tsx`| **Completado** | `POST /api/dashboards/c-level/refrendo-ministerial` (SHA-256) |
| **Sello Criptográfico Inmutable** | Algoritmo SHA-256 Determinado | **Completado** | `MPPCI-AUTH-[HASH8]-[TIMESTAMP36]` verificado y auditable |
| **Gobernanza RACI Integrada** | `src/components/Navbar.tsx` & `src/App.tsx` | **Completado** | Control estricto por roles `R`, `A`, `C`, `I` y menú desplegable |

