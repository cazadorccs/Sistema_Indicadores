# Catálogo y Diccionario de Datos del Sistema
## Sistema de Gestión y Despliegue Operativo (SGDO-VSCC)
**Documento:** `04_DICCIONARIO_DE_DATOS.md`  
**Referencia:** Catálogo SCIC (267 Indicadores Oficiales) y Tableros Especializados  

---

## 1. Macro-Indicadores Presidenciales (C-Level Executive)

| Código | Nombre del Indicador | Fórmula de Cálculo | Rango Óptimo | Unidad |
| :--- | :--- | :--- | :--- | :--- |
| **IEC** | Índice de Efectividad Comunicacional | Ponderado de alcance en Medios, Redes y Portales | >= 80.0 | % |
| **IRT** | Índice de Rendimiento de Transmisión | Promedio de operatividad TDA + Satelital + FM | >= 95.0 | % |
| **ICD** | Índice de Capacidad de Despliegue | Cobertura en los 335 Municipios del país | >= 70.0 | % |
| **EE** | Eficiencia Editorial | Balance de pases en vivo vs programados | >= 85.0 | % |
| **IBS** | Índice de Blindaje Situacional | Alertas tempranas resueltas antes de 2 horas | >= 90.0 | % |
| **TRMD** | Tasa de Respuesta a Matrices de Desinformación | Tiempo promedio de neutralización | < 45 | Minutos |
| **IAAE** | Índice de Audiencia y Alcance Efectivo | `(NE / NT) * 100` | >= 75.0 | % |
| **IVI** | Índice de Vulnerabilidad Informativa | `(1 - (RT / RM)) * 100` | < 25.0 | % |

---

## 2. Variables de Control Estándar en la Captura Semanal

| Campo | Tipo de Dato | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `semanaEpidemiologica` | Entero (1..53) | Sí | Semana del calendario oficial epidemiológico / administrativo. |
| `fechaReporte` | Fecha ISO-8601 | Sí | Fecha de emisión formal del corte semanal. |
| `enteAdscrito` | Texto (Enum) | Sí | Sigla oficial del Ente emisor (VTV, REDTV, CONATEL, etc.). |
| `responsableCarga` | Texto | Sí | Nombre y cargo del funcionario que valida la captura técnica. |
| `estadoCorte` | Enum | Sí | `BORRADOR`, `CONSOLIDADO`, `REFRENDADO`. |
| `idempotencyKey` | Hash / UUID | Sí | Token único para evitar sobreescritura accidental. |

---

## 3. Catálogo de Fórmulas SCIC Representativas

| Código | Denominación Técnica | Variables Involucradas | Algoritmo de Evaluación |
| :--- | :--- | :--- | :--- |
| **IAAE** | Alcance de Emisiones | `NE`: Emisiones efectivas<br>`NT`: Emisiones totales programadas | `(NE / NT) * 100` |
| **TECP** | Cobertura de Prensa | `MA`: Municipios alcanzados<br>`MC`: Municipios censados | `(MA / MC) * 100` |
| **RCVE** | Cobertura de Voz del Estado | `EE`: Estaciones operativas<br>`ES`: Estaciones asignadas | `(EE / ES) * 100` |
| **CAFM** | Cobertura Espectral FM | `FI`: Frecuencias inspeccionadas<br>`FT`: Frecuencias totales | `(FI / FT) * 100` |
| **ODNP** | Desviación Noticiosa de Prensa | `T_dif`: Tiempo de difusión<br>`T_rec`: Tiempo de recepción | `Math.max(0, T_dif - T_rec)` |
| **CPMS** | Cumplimiento en Redes | `CS`: Contenidos subidos<br>`CT`: Contenidos planificados | `(CS / CT) * 100` |
