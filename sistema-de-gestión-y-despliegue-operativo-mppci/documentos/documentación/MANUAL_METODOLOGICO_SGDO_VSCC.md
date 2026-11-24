# SISTEMA DE GESTIÓN Y DESPLIEGUE OPERATIVO (SGDO - VSCC)
## SISTEMA DE INTELIGENCIA COMUNICACIONAL Y GESTIÓN ESTRATÉGICA
### MANUAL METODOLÓGICO Y NORMA TÉCNICA OFICIAL
**Bases de Cálculo, Variables de Control, Check List por Ente, Modos de Contingencia y Matriz de Gobernanza RACI**

---

## 1. INTRODUCCIÓN Y ALCANCE METODOLÓGICO
El presente documento constituye la norma técnica y metodológica oficial y de obligatorio cumplimiento para la captura, procesamiento, validación matemática, cálculo compuesto, auditoría y certificación de los indicadores de gestión operativa y estratégica de la **Vicepresidencia Sectorial de Comunicación y Cultura (VSCC)**, el **Ministerio del Poder Popular para la Comunicación e Información (MPPCI)** y sus **veinte (20) Entes Adscritos**, agrupados en el **Sistema Centralizado de Información Comunicacional (SCIC)**.

### 1.1 Objetivos Estratégicos del Sistema
1. **Unificación Universal de Criterios:** Metodología cuantitativa estandarizada para medir cobertura territorial, operatividad técnica, impacto digital y resiliencia comunicacional.
2. **Monitoreo en Tiempo Cuasi-Real y Gestión Situacional:** Toma de decisiones informadas de la Alta Dirección ante contingencias, alertas climáticas y operaciones de desinformación.
3. **Trazabilidad Criptográfica Inmutable:** Tres niveles de rigor de validación matemática y sellado criptográfico determinista SHA-256 (`MPPCI-AUTH-XXXXXX-YYYYYY`).
4. **Gobernanza RACI:** Delimitación formal de responsabilidades en la cadena de mando (*Responsible, Accountable, Consulted, Informed*).
5. **Check List Dinámico y Personalizable:** Flexibilidad para activar indicadores coyunturales del catálogo general de 267 indicadores para cada ente adscrito.

### 1.2 Marco Normativo y Estándares
* **Constitución de la República Bolivariana de Venezuela (CRBV):** Artículos 57, 58 y 108.
* **Ley RESORTE:** Franjas horarias (Todo Usuario, Supervisado, Adulto), producción nacional y Fondo RESORTE.
* **Ley Orgánica de Telecomunicaciones (LOTEL):** Administración soberana del espectro radioeléctrico.
* **UNESCO (MDI):** Indicadores de pluralidad y desarrollo de medios públicos.
* **UIT (IDI):** Acceso universal a internet en hogares (THAI) y penetración de banda ancha móvil (TPBAM).
* **Marco de Sendai (UNDRR):** Alertas tempranas y comunicación multirriesgo.

---

## 2. VARIABLES DE CONTROL DEL SISTEMA
Ficha técnica obligatoria de cada reporte semanal:

| Variable de Control | Tipo de Dato | Formato / Rango | Descripción y Propósito Oficial |
| :--- | :--- | :--- | :--- |
| `fechaReporte` | Cadena (Fecha) | AAAA-MM-DD | Fecha de generación o finalización de la captura del reporte. |
| `semanaEpidemiologica` | Numérico Entero | 1 a 53 | Semana epidemiológica/calendario estandarizada. |
| `responsableEnte` | Texto | 3 a 120 caracteres | Funcionario titular que certifica los datos primarios. |
| `cedulaIdentidad` | Texto RegEx | `^(V\|E)-\d{6,9}$` | Cédula de identidad oficial (V- venezolanos, E- extranjeros). |
| `enteAdscrito` | Alfanumérico | Catálogo 20 Entes | Identificador institucional normalizado del organismo. |
| `cargoResponsable` | Texto | 3 a 100 caracteres | Cargo formal del declarante dentro de la estructura institucional. |
| `telefonoContacto` | Texto RegEx | `^04\d{9}$` | Número móvil para verificación y doble factor de autenticación. |
| `correo` | Texto Email | `usuario@ente.gob.ve` | Buzón oficial para recepción de acuses y alertas automáticas. |
| `periodoDesde` | Cadena (Fecha) | AAAA-MM-DD | Inicio formal del ciclo evaluado (Lunes 00:00:00). |
| `periodoHasta` | Cadena (Fecha) | AAAA-MM-DD | Cierre formal del ciclo semanal evaluado (Domingo 23:59:59). |

### 2.1 Ciclo de Captura y Regla del Corte Semanal
* **Período de Medición:** Lunes a domingo.
* **Ventana de Carga:** Domingo por la tarde al **lunes a las 10:00 AM**.
* **Corte Irrevocable:** Cargas posteriores a las 10:00 AM se clasifican como **Extemporáneas** (`esCargaTardia = true`).
* **Alertas de Incumplimiento:** Notificación automática de severidad ALTA vía Telegram y Correo SMTP a la Sala Situacional y al Despacho del Viceministerio.

### 2.2 Motor de Validación en Tres Niveles
1. **Nivel 1 (Integridad de Entrada):** Campos requeridos, formato de cédula, semana (1 a 53) y porcentajes entre 0% y 100%.
2. **Nivel 2 (Consistencia Lógica y Cuadre Interno):** Ejemplares distribuidos <= tiraje total; suma IVI == nómina auditada; horas propias <= horas totales de transmisión.
3. **Nivel 3 (Validación Cruzada Inter-Módulo):** Señal TV/Radio declarada vs. telemetría REDTV (Delta <= 35%); alcance digital orgánico <= población con internet; transmisores censados en Eje 4.

---

## 3. BASES DE CÁLCULO POR EJE TEMÁTICO (FÓRMULAS OFICIALES)

### EJE 1: MEDIOS PÚBLICOS (OPERATIVA Y DIFUSIÓN)
* **Medios Impresos (IMP-001 al IMP-017):**
  $$\text{Eficiencia de Distribución (\%)} = \left(\frac{\text{Ejemplares Distribuidos}}{\text{Tiraje Total}}\right) \times 100$$
  $$\text{Variación Semanal (\%)} = \left(\frac{\text{Ejemplares Actuales} - \text{Ejemplares Semana Anterior}}{\text{Ejemplares Semana Anterior}}\right) \times 100$$
* **Radiodifusión Pública (RAD-001 al RAD-018):**
  $$\text{Operatividad de Señal (\%)} = \left(\frac{\text{Horas Efectivas al Aire}}{168 \times N_{\text{Emisoras}}}\right) \times 100$$
  $$\text{Operatividad de Transmisores (\%)} = \left(\frac{\text{Transmisores Activos}}{\text{Transmisores Instalados}}\right) \times 100$$
* **Televisión Pública (TV-001 al TV-019):**
  $$\text{Operatividad TDA (\%)} = \left(\frac{\text{Horas al Aire TDA}}{168}\right) \times 100$$
  $$\text{Disponibilidad Unidades Móviles (\%)} = \left(\frac{\text{Móviles Operativas}}{\text{Móviles Totales}}\right) \times 100$$
* **Portales Web (WEB-001 al WEB-018):**
  $$\text{Tasa de Rebote (\%)} = \left(\frac{\text{Sesiones de Una Sola Página}}{\text{Total Sesiones}}\right) \times 100$$
  $$\text{Páginas Vistas por Sesión} = \frac{\text{Total Páginas Vistas}}{\text{Total Sesiones}}$$
* **Redes Sociales (RED-001 al RED-025):**
  $$TCA (\%) = \left(\frac{\text{Seguidores Actuales} - \text{Seguidores Previos}}{\text{Seguidores Previos}}\right) \times 100$$
  $$TE (\%) = \left(\frac{\text{Likes + Shares + Comentarios + Guardados}}{\text{Alcance / Vistas}}\right) \times 100$$

### EJE 2: PLATAFORMAS DE COMUNICACIONES (INFRAESTRUCTURA Y REGULACIÓN)
* **REDTV:**
  $$RTV\text{-}001 (\text{Operatividad TDA \%}) = \left(\frac{\text{Estaciones TDA Activas}}{\text{Estaciones TDA Instaladas}}\right) \times 100$$
  $$\text{Disponibilidad Torres Críticas (\%)} = \left(\frac{\text{Torres Operativas}}{6}\right) \times 100$$
* **CONATEL:**
  $$\text{Cumplimiento Ley RESORTE (\%)} = \left(\frac{\text{Inspecciones Conformes}}{\text{Total Inspecciones}}\right) \times 100$$
  $$\text{Eficiencia SIGESTEL (\%)} = \left(\frac{\text{Trámites Cerrados a Tiempo}}{\text{Total Solicitudes}}\right) \times 100$$

### EJE 3: GESTIÓN DE COMUNICACIONES (NARRATIVA, OPINIÓN Y TALENTO)
* **Gestión de Narrativa:**
  $$\text{Tasa de Neutralización (\%)} = \left(\frac{\text{Matrices Neutralizadas}}{\text{Total Matrices Detectadas}}\right) \times 100$$
  $$IBS = \left(\frac{\text{Menciones Favorables} - \text{Menciones Desfavorables}}{\text{Total Menciones}}\right) \times 100$$
* **Índice de Vulnerabilidad Institucional del Talento Humano (IVI):**
  $$IVI = \frac{(N_{\text{Rojo}} \times 3) + (N_{\text{Amarillo}} \times 1) + (N_{\text{Verde}} \times 0)}{\text{Nómina Total Auditada}}$$
  * Escala: `0.00 <= IVI < 0.50` (Verde / Óptimo); `0.50 <= IVI < 1.20` (Amarillo / Preventivo); `IVI >= 1.20` (Rojo / Contingencia de RRHH).

### EJE 4: GESTIÓN DE VICEMINISTERIOS (DESPACHOS Y MACROINDICADORES)
* **SEO Editorial:** $CTR (\%) = (\text{Clics Orgánicos} / \text{Impresiones Buscadores}) \times 100$
* **Aprovechamiento Audiovisual:** $TAA (\%) = (\text{Horas Emitidas} / \text{Horas Brutas Grabadas}) \times 100$
* **Cobertura Territorial:** $ICT (\%) = (\text{Municipios con Señal Pública} / 335) \times 100$
* **Hogares con Internet:** $THAI (\%) = (\text{Hogares Conectados} / \text{Total Hogares}) \times 100$
* **Banda Ancha Móvil:** $TPBAM (\%) = (\text{Líneas Móviles 4G/5G} / \text{Población Total}) \times 100$

---

## 4. SISTEMA DE KPIS SINTÉTICOS Y EL KPI MAESTRO (IEC)
* **Tasa de Engagement Ponderada (TEP / EE):** $((\text{Interacciones Ponderadas}) / \text{Alcance Total}) \times 100$
* **Índice de Cobertura Digital (ICD):** $\min(100.0, (\text{Alcance Real} / \text{Meta Institucional}) \times 100)$
* **Índice de Resiliencia Técnica (IRT):** $(\%\text{TDA} + \%\text{Banda Ku} + \%\text{Señal Medios}) / 3$
* **KPI Maestro (IEC):**
  $$IEC = \frac{TEP + ICD + IRT}{3}$$

### Umbrales de Rendimiento y Disparo Automático:
* **Verde ($\ge 85.0\%$):** Desempeño óptimo. Metas alcanzadas y alta estabilidad de las señales.
* **Amarillo ($70.0\% \le IEC < 85.0\%$):** Operación aceptable con áreas de optimización.
* **Rojo ($IEC < 70.0\%$):** Alerta Crítica Institucional. Disparo automático de alertas vía Telegram/SMTP al Despacho del Ministro y consignación obligatoria de Plan de Regularización Técnica en menos de 24 horas.

---

## 5. GESTIÓN DINÁMICA DE CHECKLIST POR ENTE (CHECK LIST OPERATIVO)
* **Vista Dedicada por Ente (`CHECKLIST_ENTES`):** Permite explorar y activar indicadores que inicialmente no estaban asignados a un organismo.
* **Pestañas:** *'No Marcados (Disponibles para Activar)'*, *'Marcados en Checklist'* y *'Todos (Catálogo 267)'*.
* **Persistencia:** Almacenamiento independiente por ente (`SGDO_CUSTOM_CHECKLIST_ENTE_{enteId}`).
* **Sincronización:** Evento global reactivo `sgdo-checklist-updated` e integración directa con la planilla de carga semanal (`EnteCaptureModule`).

---

## 6. SUBSISTEMA DE ESTADOS SIMULABLES Y CONTINGENCIA
* **Modos de Simulación:** Normal, Contingencia Eléctrica (Plan SEN), Contingencia Climática / Ambiental y Conmoción / Alerta Máxima.
* **Gobernanza:** Activación y desactivación centralizada desde Configuración General (`allowSimulationModes`).

---

## 7. EMISIÓN DEL BOLETÍN EJECUTIVO DE ALTA DIRECCIÓN
* **Formato Oficial:** Descargable en PDF insertado en la plantilla institucional (`Plantilla.pdf`).
* **Encabezado Inmutable:** *"Vicepresidencia Sectorial de Comunicación y Cultura • SGDO-VSCC • Código Único: MPPCI-AUTH-XXXXXX-YYYYYY"*.
* **Directrices Estratégicas Editables:** Campo editable en pantalla para que el operador o Viceministro ajuste las prioridades de despacho antes de la emisión del documento.

---

## 8. MATRIZ RACI Y GOBERNANZA MINISTERIAL
* **R (Responsible):** Operador técnico o estadístico que carga la información primaria.
* **A (Accountable):** Viceministro(a) rector(a) del área o Director General de Ente Regulador. Único refrendador oficial.
* **C (Consulted):** Consultoría Jurídica, Seguridad de Redes, Auditoría Interna e INPSASEL.
* **I (Informed):** Ministro(a) MPPCI, Vicepresidencia Sectorial de Comunicación y Cultura y Presidencia de la República.
* **Sello Inmutable:** Hash determinista SHA-256 (`MPPCI-AUTH-[HASH8]-[SALT8]`).
* **Ciclo de Estados:** Borrador $\to$ En Revisión $\to$ Aprobado / Observado $\to$ Corregido.

---

## 9. CATÁLOGO DE LOS 20 ENTES ADSCRITOS Y 267 INDICADORES SCIC
1. **VTV** - Venezolana de Televisión C.A.
2. **TVES** - Corporación Venezolana de Telecomunicaciones
3. **VIVE** - ViVe Televisión (Visión Venezuela)
4. **AVILA** - Fundación Ávila TV
5. **TELESUR** - Nueva Televisión del Sur
6. **RNV** - Radio Nacional de Venezuela
7. **YVKE** - YVKE Mundial Radio
8. **MIRAFLORES** - Radio Miraflores (La Voz de la Verdad)
9. **SUR** - Radio del Sur
10. **CORREO** - Fundación Correo del Orinoco
11. **CIUDAD_CCS** - Fundación Ciudad Caracas (Ciudad CCS)
12. **AVN** - Agencia Venezolana de Noticias
13. **REDTV** - Empresa de Telecomunicaciones del Estado
14. **CONATEL** - Comisión Nacional de Telecomunicaciones
15. **CANTV** - Compañía Anónima Nacional Teléfonos de Venezuela
16. **MOVILNET** - Telecomunicaciones Movilnet C.A.
17. **CEBAC** - Centro de Comunicación y Batería Comunicacional
18. **CNDIS** - Centro Nacional del Disco
19. **ABAE** - Agencia Bolivariana para Actividades Espaciales
20. **MAC** - Dirección General de Medios Comunitarios y Alternativos

---

## 10. REFRENDO Y FIRMA OFICIAL
**SAHIB ALEXANDER FRANCO VILLANUEVA**  
Director General de la Oficina de Tecnología de la Comunicación y la Información  
Ministerio del Poder Popular para la Comunicación e Información (MPPCI)  
Vicepresidencia Sectorial de Comunicación y Cultura (VSCC)  
*Gaceta Oficial de la República Bolivariana de Venezuela N° 43.333 de fecha 11/03/2026*
