# MINISTERIO DEL PODER POPULAR PARA LA COMUNICACIÓN E INFORMACIÓN (MPPCI)
## SISTEMA DE INTELIGENCIA COMUNICACIONAL Y GESTIÓN ESTRATÉGICA
### MANUAL METODOLÓGICO: BASES DE CÁLCULO, VARIABLES DE CONTROL Y MATRIZ DE GOBERNANZA RACI

---

## 1. INTRODUCCIÓN Y ALCANCE METODOLÓGICO

El presente documento constituye la norma técnica y metodológica oficial para la captura, procesamiento, validación, cálculo compuesto y auditoría de los indicadores de gestión operativa y estratégica del **Ministerio del Poder Popular para la Comunicación e Información (MPPCI)** y sus Entes Adscritos, agrupados en el **Sistema Nacional de Medios Públicos (SNMP)**.

### 1.1 Objetivos del Sistema
1. **Unificación de Criterios**: Establecer una metodología cuantitativa estandarizada para medir la cobertura, operatividad, impacto y resiliencia de la comunicación pública en Venezuela.
2. **Monitoreo en Tiempo Cuasi-Real**: Permitir la toma de decisiones informadas ante contingencias operativas, emergencias nacionales y campañas de desinformación.
3. **Gobernanza y Trazabilidad Inmutable**: Garantizar la integridad de los datos mediante validaciones en tres niveles de rigor y sellado criptográfico determinista con responsabilidades asignadas según el estándar internacional RACI.

### 1.2 Marco Normativo y Estándares de Referencia
* **Constitución de la República Bolivariana de Venezuela (CRBV)**: Artículos 57 (libertad de expresión y pensamiento), 58 (derecho a la información oportuna, veraz e imparcial) y 108 (función social de los medios de comunicación y las TIC).
* **Ley de Responsabilidad Social en Radio, Televisión y Medios Electrónicos (Ley RESORTE)**: Monitoreo de franjas horarias, cuotas de producción nacional y protección de niñas, niños y adolescentes.
* **Ley Orgánica de Telecomunicaciones (LOTEL)**: Regulación del espectro radioeléctrico, normas de radiodifusión sonora y televisión abierta.
* **UNESCO – Indicadores de Desarrollo Mediático (MDI)**: Evaluación de pluralidad, diversidad, servicio público e infraestructura de comunicación.
* **Unión Internacional de Telecomunicaciones (UIT) – ICT Development Index (IDI)**: Medición de conectividad universal, acceso a internet (THAI) y penetración de banda ancha (TPBAM).
* **Marco de Sendai para la Reducción del Riesgo de Desastres (UNDRR)**: Prioridad 1 y 4 sobre alertas tempranas y comunicación multirriesgo.
* **Criterios SMART / OCDE**: Indicadores Específicos (*Specific*), Medibles (*Measurable*), Alcanzables (*Achievable*), Relevantes (*Relevant*) y con Límite Temporal (*Time-bound*).

---

## 2. VARIABLES DE CONTROL DEL SISTEMA

Las **Variables de Control** representan la ficha de identificación legal, técnica y temporal indispensable para registrar cualquier reporte dentro del sistema. Actúan como cabecera obligatoria y garantizan la validez jurídica de la información capturada.

| Variable de Control | Tipo de Dato | Formato / Rango | Descripción y Propósito |
| :--- | :--- | :--- | :--- |
| `fechaReporte` | Cadena (Fecha) | `AAAA-MM-DD` | Fecha exacta en la que se genera o finaliza la captura del reporte. |
| `semanaEpidemiologica` | Numérico Entero | `1 a 53` | Semana epidemiológica/calendario estandarizada (corte anual internacional adoptado para emergencias y seguimiento semanal continuo). |
| `responsableEnte` | Texto | `3 a 120 caracteres` | Nombre completo del funcionario titular que certifica la captura de los datos primarios. |
| `cedulaIdentidad` | Texto RegEx | `^(V\|E)-\d{6,9}$` | Cédula de identidad del funcionario con prefijo oficial venezolano (`V-` para venezolanos, `E-` para extranjeros). |
| `enteAdscrito` | Alfanumérico / Sigla | Catálogo institucional | Sigla oficial del medio u organismo adscrito (VTV, RNV, YVKE, Correo del Orinoco, REDTV, CONATEL, Vive TV, Telesur, Ávila TV, etc.). |
| `regionLocalidad` | Texto | Entidad Federal / Municipio | Ámbito geográfico de cobertura o ubicación de la sede del declarante. |
| `telefono` | Texto RegEx | Formato telefónico nacional | Teléfono móvil/directo del responsable para notificaciones de emergencia y doble factor de autenticación. |
| `correo` | Texto Email | `usuario@ente.gob.ve` | Buzón institucional oficial del declarante para recepción de acuses y alertas automáticas. |
| `periodoDesde` | Cadena (Fecha) | `AAAA-MM-DD` | Inicio formal del ciclo semanal evaluado (Lunes 00:00:00). |
| `periodoHasta` | Cadena (Fecha) | `AAAA-MM-DD` | Cierre formal del ciclo semanal evaluado (Domingo 23:59:59). |

### 2.1 Ciclo de Captura y Regla del Corte Semanal (Corte Lunes 10:00 AM)
1. **Período de Medición**: De lunes a domingo.
2. **Ventana de Carga**: Los datos deben cargarse de forma consolidada entre el domingo por la tarde y el **lunes a las 10:00 AM**.
3. **Corte Irrevocable de Carga**: Toda carga enviada posterior al lunes a las 10:00 AM es catalogada automáticamente como **Extemporánea (`esCargaTardia = true`)**.
4. **Disparo de Alertas de Incumplimiento**: El motor de reglas emite de forma automática alertas de severidad ALTA vía Telegram y Correo Institucional al responsable del ente y remite copia al Viceministerio correspondiente y a la Dirección General de Seguimiento.

### 2.2 Motor de Validación en Tres Niveles de Rigor
El sistema aplica consecutivamente tres niveles de validación matemática y lógica antes de aceptar la persistencia de un reporte:

```
[Datos Capturados]
        │
        ▼
┌────────────────────────────────────────────────────────┐
│  NIVEL 1: INTEGRIDAD DE ENTRADA                        │
│  - Campos obligatorios presentes                       │
│  - Formato de Cédula (V-/E-XXXXXXXX)                   │
│  - Semana Epidemiológica en rango [1 - 53]             │
│  - Porcentajes dentro de escala [0% - 100%]            │
└───────────────────────┬────────────────────────────────┘
                        │ (Pasa validación)
                        ▼
┌────────────────────────────────────────────────────────┐
│  NIVEL 2: CONSISTENCIA LÓGICA Y CUADRE INTERNO         │
│  - Ejemplares Distribuidos <= Tiraje Total Físico      │
│  - Distribución en Zonas Afectadas <= Distribuidos     │
│  - Suma Matriz Vulnerabilidad == Nómina Total del Ente │
│  - Equipos Operativos <= Inventario Total Registrado   │
│  - Horas Producción Propia <= Horas Transmisión Totales│
└───────────────────────┬────────────────────────────────┘
                        │ (Pasa validación)
                        ▼
┌────────────────────────────────────────────────────────┐
│  NIVEL 3: VALIDACIÓN CRUZADA INTER-MÓDULO (Cross-Check)│
│  - Señal de TV/Radio vs Telemetría REDTV (Δ <= 35%)    │
│  - Alcance Digital Orgánico <= Población con Internet  │
│  - Transmisores Declarados vs Capacidad Censada Eje 4  │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
[Sellado Criptográfico SHA-256 e Incorporación al Tablero Maestro]
```

---

## 3. BASES DE CÁLCULO POR EJE TEMÁTICO

---

### EJE 1: MEDIOS PÚBLICOS (OPERATIVA Y DIFUSIÓN)
Comprende la operatividad de los medios impresos, radiales, televisivos, portales web y plataformas de redes sociales del Estado venezolano.

#### 1.A Medios Impresos (Códigos `IMP-001` al `IMP-017`)
* **IMP-001 (Ejemplares Impresos y Distribuidos)**: Volumen físico de periódicos efectivamente entregados en puntos de distribución y comunidades.
* **IMP-002 (Tiraje Total)**: Volumen total de periódicos salidos de rotativa.
* **IMP-003 (Ejemplares en Zonas Afectadas)**: Unidades distribuidas en zonas con declaratoria de contingencia o vulnerabilidad.
* **IMP-004 (Porcentaje de Cobertura Territorial de Municipios)**:
  $$\% Cobertura_{Municipios} = \left( \frac{\text{Municipios con distribución activa}}{335} \right) \times 100$$
* **Fórmula de Eficiencia de Distribución**:
  $$\text{Eficiencia Distribución (\%)} = \left( \frac{\text{IMP-001}}{\text{IMP-002}} \right) \times 100$$
* **Variación Semanal ($\Delta\%$ Semana Anterior)**:
  $$\Delta\% = \left( \frac{\text{Valor Semana Actual} - \text{Valor Semana Anterior}}{\text{Valor Semana Anterior}} \right) \times 100$$

#### 1.B Radiodifusión Pública (Códigos `RAD-001` al `RAD-018`)
* **RAD-001 (Horas de Transmisión Semanal)**: Horas efectivas al aire de la señal matriz y repetidoras (máximo teórico: $24 \text{ h/día} \times 7 \text{ días} = 168 \text{ horas/semana}$ por circuito).
* **RAD-002 (Porcentaje de Operatividad de Señal)**:
  $$\text{Operatividad Radio (\%)} = \left( 1 - \frac{\text{RAD-018 (Tiempo de Caída en Minutos)}}{10.080 \text{ minutos totales semanales}} \right) \times 100$$
* **RAD-007 (Horas de Programación Propia)**: Horas de contenido original producido por el medio. Condición de balance: $\text{RAD-007} \le \text{RAD-001}$.
* **Operatividad de Transmisores de Radio**:
  $$\% Transmisores_{Radio} = \left( \frac{\text{RAD-014 (Operativos)}}{\text{Transmisores Totales}} \right) \times 100$$

#### 1.C Televisión Pública (Códigos `TV-001` al `TV-019`)
* **TV-001 (Horas de Transmisión)**: Total de horas de emisión en parrilla semanal ($168 \text{ h}$ en transmisiones 24/7).
* **TV-002 (Operatividad de Señal TV %)**: Disponibilidad técnica de transmisión matriz hacia el sistema nacional de distribución.
* **TV-004 (Señal TDA Operativa %)**: Disponibilidad técnica del múltiplex de televisión digital abierta.
* **Disponibilidad de Unidades Móviles y Cámaras**:
  $$\text{Disponibilidad Equipos (\%)} = \left( \frac{\text{Equipos Operativos (Cámaras, Móviles, Edición)}}{\text{Inventario Total de Equipos}} \right) \times 100$$

#### 1.D Portales Digitales Web (Códigos `WEB-001` al `WEB-018`)
* **WEB-001 (Visitas al Portal Web)**: Sesiones totales registradas durante la semana epidemiológica.
* **WEB-002 (Usuarios Únicos)**: Visitantes individuales no duplicados identificados mediante telemetría IP/Cookies.
* **WEB-005 (Tasa de Rebote %)**: Porcentaje de usuarios que abandonan el portal habiendo visualizado únicamente una página.
* **WEB-007 (Páginas Vistas por Sesión)**:
  $$\text{Profundidad de Lectura} = \frac{\text{Páginas Vistas Totales}}{\text{Sesiones Totales}}$$

#### 1.E Redes Sociales y Plataformas Interactivas (Facebook, Instagram, TikTok, X, YouTube, Telegram)
* **Tasa de Crecimiento de Audiencia**:
  $$\% Crecimiento = \left( \frac{\text{Nuevos Seguidores en la Semana}}{\text{Seguidores Totales al Inicio del Período}} \right) \times 100$$
* **Tasa de Engagement Individual de Canal ($EE_{Canal}\%$)**:
  $$EE_{Canal} = \left( \frac{\text{Interacciones Totales (Likes + Shares + Comentarios + Guardados)}}{\text{Vistas / Reproducciones Logradas}} \right) \times 100$$

---

### EJE 2: PLATAFORMAS DE COMUNICACIONES (INFRAESTRUCTURA Y REGULACIÓN)

#### 2.A Empresa de Telecomunicaciones del Estado (REDTV)
* **RTV-001 (Operatividad Nacional TDA %)**:
  $$\% TDA_{Operativa} = \left( \frac{\text{Estaciones TDA Transmitiendo Activas}}{\text{Estaciones TDA Instaladas}} \right) \times 100$$
* **RTV-006 (Potencia y Disponibilidad Banda Ku Satelital %)**: Medición de telepuerto central de la potencia de subida y estabilidad del enlace con satélites geoestacionarios de cobertura soberana.
* **Disponibilidad de Torres Críticas de Transmisión**:
  Indicador de estatus cuali-cuantitativo que audita las torres estratégicas de Zulia, Caracas (Waraira Repano/Mecedores), Carabobo, Lara, Monagas y Táchira.

#### 2.B Comisión Nacional de Telecomunicaciones (CONATEL)
* **CON-001 al CON-008 (Monitoreo de Espectro)**: Detección y fiscalización de señales e interferencias radioeléctricas.
* **Cumplimiento de Ley RESORTE por Sujetos Regulados**:
  $$\% Cumplimiento_{RESORTE} = \left( \frac{\sum \text{Criterios Aprobados}}{\text{Total Criterios Evaluados}} \right) \times 100$$
  *Criterios auditados*: Clasificación de contenidos, Protección a niños, niñas y adolescentes, Obligaciones tributarias (Fondo RESORTE), Control estricto de franjas horarias (Todo Usuario de 07:00 a 19:00).
* **Eficiencia en Trámites SIGESTEL**:
  $$\text{Tasa de Tramitación (\%)} = \left( \frac{\text{Solicitudes Procesadas}}{\text{Solicitudes Recibidas}} \right) \times 100$$

---

### EJE 3: GESTIÓN DE COMUNICACIONES (NARRATIVA, OPINIÓN Y TALENTO)

#### 3.A Gestión de Narrativa y Monitoreo de Medios
* **MON-001 (Alertas de Matrices de Desinformación Procesadas)**: Detección de operaciones psicológicas, rumores y noticias falsas en redes y mensajería digital.
* **Tasa de Neutralización Comunicacional**:
  $$\text{Tasa Neutralización (\%)} = \left( \frac{\text{Matrices con Contranarrativa Difundida y Desactivadas}}{\text{Total Matrices Detectadas de Riesgo Crítico}} \right) \times 100$$
* **Índice de Balance de Sentimiento Neto (IBS)**:
  $$IBS = \% Positivo - \% Hostil$$
  *(Un valor de IBS positivo refleja hegemonía y posicionamiento favorable del discurso oficial; un valor negativo exige la emisión inmediata de directrices tácticas de contranarrativa).*

#### 3.B Índice de Vulnerabilidad Institucional del Talento Humano (IVI)
Evalúa el riesgo del personal operativo de los entes públicos en función de condiciones médicas, riesgos en zonas de contingencia, transporte y condiciones sociolaborales.

* **Ponderadores Oficiales por Nivel de Riesgo**:
  * **Nivel Rojo (Alto Riesgo / Afectación Severa)**: Ponderador = **3**
  * **Nivel Amarillo (Riesgo Moderado / Afectación Parcial)**: Ponderador = **1**
  * **Nivel Verde (Condiciones Óptimas / Sin Riesgo)**: Ponderador = **0**
* **Fórmula Matemática del IVI**:
  $$IVI = \frac{(Personal_{Rojo} \times 3) + (Personal_{Amarillo} \times 1) + (Personal_{Verde} \times 0)}{TotalPersonal}$$
* **Escala de Interpretación de Criticidad**:
  * $0.000 \le IVI < 0.300$: **Bajo Riesgo / Operatividad Óptima** (Verde).
  * $0.300 \le IVI < 0.700$: **Riesgo Moderado / Atención Preventiva** (Amarillo).
  * $IVI \ge 0.700$: **Alerta Crítica Institucional / Activación de Contingencia de RRHH** (Rojo).

---

### EJE 4: GESTIÓN DE VICEMINISTERIOS (DESPACHOS Y MACROINDICADORES)

El Eje 4 consolida las competencias de los despachos ministeriales y viceministerios:

#### 4.1 Despacho de Comunicación e Información
* **Monitoreo de Tendencias Virales Desestabilizadoras**: Detección categorizada por medio (Video, Audio, Texto, WhatsApp, TikTok, X, etc.) con tipificación de amenaza e impacto estimado de audiencia.
* **Métricas de SEO Editorial y Analítica Web Orgánica**:
  * **CTR Orgánico (Click-Through Rate %)**:
    $$CTR = \left( \frac{\text{Clics Obtenidos}}{\text{Impresiones en Buscadores (Google, Bing)}} \right) \times 100$$
  * **Tasa de Conversión de Suscriptores (%)**:
    $$TCS = \left( \frac{\text{Nuevos Suscriptores Registrados}}{\text{Tráfico Orgánico Total}} \right) \times 100$$

#### 4.2 Despacho de Gestión Comunicacional
* **Tasa de Capacitación Tecnológica del SNMP ($TC_{SNMP}$)**:
  $$TC_{SNMP} = \left( \frac{V_1 (\text{Trabajadores SNMP capacitados en streaming, IA y formatos cortos})}{V_3 (\text{Total Nómina Operativa del SNMP - Dato Maestro: } 1.250)} \right) \times 100$$
* **Despliegue Popular Transmedia ($DPT$)**:
  $$DPT = \left( \frac{V_1 (\text{Facilitadores Comunitarios Capacitados en Formatos 3.0 e IA})}{V_2 (\text{Total Voceros Registrados en Comunas: } 1.480)} \right) \times 100$$

#### 4.3 Viceministerio de Planificación y Estrategia Comunicacional
* **Métricas de Contenido Audiovisual**:
  * **Lead Time Audiovisual**: Horas promedio transcurridas desde el acaecimiento de un hecho noticioso hasta la publicación definitiva del producto audiovisual.
  * **Tasa de Aprovechamiento Audiovisual ($TA\%$)**:
    $$TA\% = \left( \frac{\text{Horas / Minutos de Material Efectivamente Publicado}}{\text{Horas / Minutos Totales Grabados en Rodaje}} \right) \times 100$$
* **Producción de Contenido Escrito**:
  * Notas de prensa y artículos web.
  * Publicaciones en redes de microblogging (X, Threads, etc.).
  * Publicaciones en plataformas de hilos de texto.
* **Gestión de Narrativa y Monitoreo de Medios (Tabla Oficial)**:
  * N° de Alertas de Matrices Procesadas (Rumores/Noticias Falsas).
  * Informes de Narrativa Emitidos.
  * Reportes de Primeras Planas (Nacional, Regional e Internacional).
  * Resúmenes de Vocerías Oficiales.
  * Narrativas y contranarrativas elaboradas.

#### 4.4 Viceministerio de Soporte de Plataforma Comunicacional (Macroindicadores Nacionales)
Integra los indicadores de acceso y cobertura con base en los Datos Maestros del país:

1. **Índice de Cobertura Territorial de Medios Públicos y Privados ($ICTM$)**:
   $$ICTM = \left( \frac{V_1 (\text{Superficie Cobertura Medios Públicos km}^2) + V_2 (\text{Superficie Medios Privados/Comunitarios km}^2)}{V_3 (\text{Extensión Territorial Total de Venezuela: } 916.445\text{ km}^2)} \right) \times 100$$

2. **Tasa de Hogares con Acceso a Internet ($THAI$)**:
   $$THAI = \left( \frac{V_1 (\text{Hogares con Internet Activo: Fijo o Móvil})}{V_2 (\text{Universo Total de Hogares Nacional - Dato Maestro: } 7.850.000)} \right) \times 100$$

3. **Tasa de Penetración de Banda Ancha Móvil ($TPBAM$)**:
   $$TPBAM = \left( \frac{V_1 (\text{Líneas de Telefonía Móvil con Plan de Datos Activo})}{V_2 (\text{Población Total Estimada - Dato Maestro INE: } 29.200.000)} \right) \times 100$$

4. **Índice de Penetración de Medios Digitales ($IPMD$)**:
   $$IPMD = \left( \frac{V_1 (\text{Usuarios Únicos Activos Mensuales MAU en Plataformas Públicas})}{V_2 (\text{Población con Acceso a Internet en el País - Dato Maestro: } 20.400.000)} \right) \times 100$$

---

## 4. SISTEMA DE KPIS SINTÉTICOS Y EL KPI MAESTRO (IEC)

Para resumir la gestión global en una única escala ponderada de alto nivel ejecutivo, el motor de cálculo consolida cuatro indicadores sintéticos y el **Índice de Efectividad Comunicacional (IEC)**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   KPIS SINTÉTICOS DE ENTRADA                          │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. Tasa de Engagement (EE)     │ (Interacciones / Vistas) * 100        │
│ 2. Cobertura Digital (ICD)     │ (Alcance Total / Meta Total) * 100    │
│ 3. Resiliencia Técnica (IRT)   │ (%TDA + %Banda Ku + %Señal Medios)/3  │
└────────────────────────────────┴───────────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│             KPI MAESTRO DE INTELIGENCIA COMUNICACIONAL                 │
│                                                                        │
│        ÍNDICE DE EFECTIVIDAD COMUNICACIONAL (IEC):                     │
│                                                                        │
│                      (EE + ICD + IRT)                                  │
│               IEC = ───────────────────                                │
│                              3                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Fórmulas Detalladas de los KPIs Sintéticos

#### 1. Tasa de Engagement Ponderada ($EE$)
Mide la capacidad de conexión e impacto del mensaje público en la ciudadanía en entornos digitales:
$$EE = \min\left(100, \; \frac{\text{Interacciones Totales}}{\text{Vistas Totales Logradas}} \times 100\right)$$

#### 2. Índice de Cobertura Digital ($ICD$)
Mide el porcentaje de cumplimiento del alcance real frente a las metas de visibilidad fijadas por el Ministerio:
$$ICD = \min\left(150, \; \frac{\text{Alcance Orgánico} + \text{Alcance Pagado} + \text{Tráfico Orgánico Web}}{\text{Meta Vistas Digitales} + \text{Impresiones en Buscadores Web}} \times 100\right)$$

#### 3. Índice de Resiliencia Técnica ($IRT$)
Refleja la robustez y operatividad de la infraestructura de telecomunicaciones frente a fallas eléctricas o contingencias:
$$IRT = \frac{\% TDA + \% Banda Ku + \left( \frac{\% Operatividad TV + \% Operatividad Radio}{2} \right)}{3}$$

#### 4. KPI Maestro: Índice de Efectividad Comunicacional ($IEC$)
Promedio aritmético balanceado de los tres pilares de gestión comunicacional (Interacción, Alcance y Soporte Técnico):
$$IEC = \frac{EE + ICD + IRT}{3}$$

### 4.2 Umbrales de Rendimiento y Disparo Automático de Alertas
* **IEC $\ge$ 85.0% (Nivel Verde / Óptimo)**: Desempeño estratégico sobresaliente. Metas alcanzadas y alta estabilidad técnica.
* **70.0% $\le$ IEC < 85.0% (Nivel Amarillo / Aceptable)**: Operación normal con áreas de optimización en distribución o retención.
* **IEC < 70.0% (Nivel Rojo / CRÍTICO)**:
  * **Alerta Automática Inmediata**: Notificación de máxima severidad remitida por canales cifrados (Telegram/Email) a la Sala Situacional y al Ministro.
  * **Exigencia de Plan de Regularización**: Obligatoriedad de adjuntar un plan de contingencia técnico-editorial en un plazo no mayor a 24 horas.

---

## 5. EL MÉTODO RACI Y LA GOBERNANZA MINISTERIAL

El sistema MPPCI adopta la metodología internacional **RACI** para definir de manera inequívoca las responsabilidades en cada etapa del ciclo de vida de los datos, erradicando la ambigüedad y garantizando la rendición de cuentas pública.

### 5.1 Definición de Roles en el Sistema MPPCI

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            MATRIZ DE ROLES RACI                             │
├─────────┬────────────────────────────┬──────────────────────────────────────┤
│ ROL     │ SIGNIFICADO                │ APLICACIÓN EN EL ECOSISTEMA MPPCI    │
├─────────┼────────────────────────────┼──────────────────────────────────────┤
│    R    │ Responsible (Responsable)  │ Director de Operaciones / Jefe de    │
│         │ El que ejecuta y carga     │ Sala Técnica del Ente Adscrito.      │
├─────────┼────────────────────────────┼──────────────────────────────────────┤
│    A    │ Accountable (Aprobador)    │ Viceministro rector del área o       │
│         │ El que aprueba y responde  │ Director General de Ente Regulador.  │
├─────────┼────────────────────────────┼──────────────────────────────────────┤
│    C    │ Consulted (Consultado)     │ Auditoría Interna, Consultoría       │
│         │ El experto de apoyo técnico│ Jurídica, Seguridad de Redes.        │
├─────────┼────────────────────────────┼──────────────────────────────────────┤
│    I    │ Informed (Informado)       │ Ministro(a) MPPCI y Sala Situacional │
│         │ El que toma decisiones     │ de la Presidencia de la República.   │
└─────────┴────────────────────────────┴──────────────────────────────────────┘
```

#### 1. R – Responsible (Responsable / Capturador Operativo)
* **Quién es**: Directores de Operaciones, Jefes de Redacción, Directores Técnicos de Transmisión o Coordinadores Estadísticos designados de cada organismo.
* **Deberes**:
  * Recopilar los datos primarios de bitácoras, telemetría y sistemas de tráfico.
  * Realizar la carga en el formulario oficial antes del corte semanal (Lunes 10:00 AM).
  * Resolver de inmediato cualquier inconsistencia señalada por los Niveles 1 y 2 de validación.

#### 2. A – Accountable (Aprobador / Garante Institucional)
* **Quién es**: Viceministros(as) del área rectora (Gestión Comunicacional, Medios, Planificación Estratégica, Plataformas), Director General de CONATEL o Presidente de REDTV.
* **Regla de Oro RACI**: **Existe únicamente UN funcionario con rol 'A' por reporte o indicador**.
* **Deberes**:
  * Revisar la consistencia sustantiva y el alineamiento político-estratégico del informe.
  * Emitir el dictamen formal: **APROBADO** o remitir observaciones para corrección (**OBSERVADO**).
  * Refrendar con firma electrónica ministerial el reporte definitivo.

#### 3. C – Consulted (Consultado / Soporte Experto)
* **Quién es**: Dirección de Consultoría Jurídica, Gerencia Técnica de Telecomunicaciones, Dirección de Ciberseguridad, Médicos de Salud Laboral (INPSASEL) y Auditoría Contralora.
* **Deberes**:
  * Proveer peritajes técnicos cuando se presenten discrepancias en Nivel 3 (Validación Cruzada).
  * Validar casos de fuerza mayor o afectación severa de infraestructura crítica.

#### 4. I – Informed (Informado / Destinatario Estratégico)
* **Quién es**: Ministro(a) del Poder Popular para la Comunicación e Información, Sala Situacional del Despacho de la Presidencia de la República y Directores Generales de Línea.
* **Deberes**:
  * Consumir tableros ejecutivos consolidados en tiempo real.
  * Recibir alertas automáticas de contingencia (IEC < 70% o fallas de torres críticas).
  * Utilizar la información para orientar la línea discursiva nacional y la asignación de recursos extraordinarios.

---

### 5.2 Matriz RACI Cruzada por Indicador e Instrumento Oficial

| Código / Componente | Descripción del Área | R (Responsible) | A (Accountable) | C (Consulted) | I (Informed) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **IMP-001 / 017** | Medios Impresos (Correo del Orinoco) | Director Editorial / Gerente de Planta | Viceministro(a) de Comunicación e Información | Dirección de Logística e Insumos | Ministro / Sala Situacional |
| **RAD-001 / 018** | Radiodifusión Pública (RNV, YVKE, etc.) | Director General de la Emisora | Viceministro(a) de Comunicación e Información | Gerencia Técnica REDTV | Ministro / Sala Situacional |
| **TV-001 / 019** | Televisión Pública (VTV, TVES, etc.) | Vicepresidente de Operaciones / Emisión | Viceministro(a) de Comunicación e Información | Gerencia de Operaciones REDTV | Ministro / Sala Situacional |
| **WEB / RED** | Portales Web y Redes Sociales | Director General de Medios Digitales | Viceministro(a) de Planificación y Estrategia | Unidad de Ciberseguridad | Ministro / Vocerías Oficiales |
| **RTV-001 / 015** | Plataformas REDTV (TDA y Satelital Ku) | Gerente General de Operaciones REDTV | Presidente de REDTV | Dirección de Telecomunicaciones | Ministro / CONATEL |
| **CON-001 / 025** | Regulación y Espectro (CONATEL) | Gerente de Fiscalización y Monitoreo | Director General de CONATEL | Consultoría Jurídica CONATEL | Ministro / Presidencia de la República |
| **MON-001 / 008** | Monitoreo de Medios y Narrativas | Director General de Monitoreo y Análisis | Viceministro(a) de Planificación y Estrategia | Sala Situacional MPPCI | Ministro / Voceros Oficiales |
| **IVI (Talento)** | Vulnerabilidad del Talento Humano | Director General de Gestión Humana | Viceministro(a) de Gestión Comunicacional | Servicio Médico / INPSASEL | Ministro |
| **EJE 4 (4.1)** | Despacho Comunicación e Información | Director de Despacho | Viceministro(a) de Comunicación e Información | Sala Situacional Presidencial | Ministro |
| **EJE 4 (4.2)** | Despacho Gestión Comunicacional | Director de Formación y Comunas | Viceministro(a) de Gestión Comunicacional | Red de Medios Comunitarios (MAC) | Ministro |
| **EJE 4 (4.3)** | Planificación y Estrategia | Director General de Estrategia | Viceministro(a) de Planificación y Estrategia | Agencias de Contenido Aliadas | Ministro |
| **EJE 4 (4.4)** | Soporte de Plataforma Comunicacional | Director de Infraestructura y Redes | Viceministro(a) de Soporte de Plataformas | CONATEL / CANTV | Ministro |

---

### 5.3 Trazabilidad Criptográfica Inmutable (Hash Determinista)

Para impedir la manipulación de cifras a posteriori o la repudiación de firmas, cada informe semanal procesado genera un **Hash Criptográfico Determinista** derivado del payload canónico:

$$\text{Payload} = \text{IdReporte} \,\|\, \text{Timestamp} \,\|\, IEC \,\|\, EE \,\|\, IRT \,\|\, ICD \,\|\, IVI$$

El sistema procesa la cadena mediante algoritmo de dispersión determinista y genera un identificador oficial con la siguiente nomenclatura:

$$\mathbf{MPPCI\text{-}AUTH\text{-}[HEXADECIMAL\text{-}8\text{-}DÍGITOS]\text{-}[TIMESTAMP\text{-}BASE36]}$$

*Ejemplo de Hash Oficial*: `MPPCI-AUTH-7FA3B9C1-LN9A8F`

Este hash se estampa en la base de datos de auditoría, se visualiza en la ficha técnica del reporte y se incorpora como sello de agua en los comprobantes y actas oficiales de refrendo ministerial.

---

### 5.4 Flujo de Estados del Reporte Semanal

```
  ┌──────────────┐
  │   BORRADOR   │ ◄── Carga inicial por el funcionario 'R'
  └──────┬───────┘
         │ Enviar a Revisión (Lunes antes de 10:00 AM)
         ▼
  ┌──────────────┐
  │ EN REVISIÓN  │ ◄── Evaluación del funcionario 'A' (Viceministro)
  └───┬──────┬───┘
      │      │
      │      └──────────────────────────┐
      │ Aprobación y Firma               │ Observación / Rechazo
      ▼                                  ▼
┌──────────────┐                  ┌──────────────┐
│   APROBADO   │                  │  OBSERVADO   │ ◄── Notificación a 'R'
└──────────────┘                  └──────┬───────┘
  (Sella Hash e                          │ Corrección y reenvío
   incorpora al Tablero)                 ▼
                                  ┌──────────────┐
                                  │  CORREGIDO   │ ──► Regresa a 'A'
                                  └──────────────┘
```

---

## 6. SÍNTESIS DE CÓDIGOS DE INDICADORES

| Prefijo | Dominio Metodológico | Rango Típico | Ente / Dependencia Primaria |
| :--- | :--- | :--- | :--- |
| **IMP-** | Prensa y Medios Impresos | 001 – 017 | Correo del Orinoco / Editorial MPPCI |
| **RAD-** | Radiodifusión Sonora (AM/FM) | 001 – 018 | RNV / YVKE Mundial / Radio del Sur |
| **TV-** | Televisión Abierta y Satelital | 001 – 019 | VTV / TVES / ViVe TV / Telesur |
| **WEB-** | Portales Web y Plataformas Digitales | 001 – 018 | Medios Digitales MPPCI / AVN |
| **RED-** | Redes Sociales y Microblogging | 001 – 015 | Direcciones de Estrategia Digital |
| **RTV-** | Red de Transmisiones (TDA / Satélite) | 001 – 015 | REDTV |
| **CON-** | Espectro y Regulación Telecom | 001 – 025 | CONATEL |
| **MON-** | Monitoreo y Detección de Desinformación | 001 – 008 | Sala de Análisis Situacional |
| **GES-** | Gestión de Narrativa y Portavoces | 001 – 018 | Viceministerio de Planificación |
| **IVI** | Vulnerabilidad de Recursos Humanos | Índice (0 a 3) | Gestión Humana / Viceministerio de Gestión |
| **EJE 4** | Viceministerios y Despachos | V1, V2, V3 | Despachos Ministeriales MPPCI |

---

*Documento técnico metodológico validado para su estricta aplicación en todos los módulos de captura, validación, cálculo de telemetría y auditoría del MPPCI.*
