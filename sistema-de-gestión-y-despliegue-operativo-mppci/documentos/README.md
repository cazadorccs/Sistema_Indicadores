# Repositorio de Documentos e Insumos Estratégicos (MPPCI)

Este directorio está diseñado para centralizar y organizar todos los documentos técnicos, normativos, metodológicos y operativos que servirán como **insumos para el análisis e integración de nuevas características al sistema**.

---

## 📁 Estructura del Directorio

Puedes depositar tus documentos en la raíz de `documentos/` o clasificarlos en cualquiera de las siguientes subcarpetas temáticas:

| Subcarpeta | Descripción y Tipo de Documentos |
| :--- | :--- |
| **`normativas_y_lineamientos/`** | Gacetas Oficiales, directrices ministeriales, métodos de gobernanza (ej. Matriz RACI), manuales de procedimientos y decretos. |
| **`indicadores_y_metodologias/`** | Fichas técnicas de KPIs, fórmulas de cálculo, variables de control, ponderaciones del THAI/TIC y modelos estadísticos. |
| **`cartografia_y_cobertura/`** | Fichas técnicas de torres de transmisión (REDTV, Cantv, Movilnet), espectro radioeléctrico, shapefiles adicionales o datos georreferenciados. |
| **`reportes_y_datos/`** | Informes situacionales de despliegue, matrices de opinión pública, minutas de salas situacionales, tablas Excel/CSV de campo. |

---

## 📄 Formatos Soportados

Puedes colocar archivos en los siguientes formatos:
* **Texto y Código:** `.md`, `.txt`, `.json`, `.csv`, `.xml`
* **Documentos Ofimáticos:** `.pdf`, `.docx`, `.doc`, `.xlsx`, `.xls`
* **Datos Geoespaciales:** `.geojson`, `.kml`, `.shp` (junto con sus `.dbf`, `.shx`, `.prj`)

---

## 🔄 Flujo de Trabajo para Integrar Nuevas Características

Cada vez que agregues un documento en este directorio:

1. **Notificación:** Indícame el nombre o la temática del documento que cargaste (ej. *"Cargué el documento de metodología de indicadores en `indicadores_y_metodologias/`"*).
2. **Extracción y Diagnóstico:** Analizaré el contenido completo del documento para extraer:
   - Nuevas variables, métricas o fórmulas de cálculo.
   - Entidades, roles o flujos operativos que deban reflejarse en la UI.
   - Puntos de integración con los modelos de TypeScript existentes (`src/types/index.ts`).
3. **Propuesta de Arquitectura:** Te presentaré un plan claro de qué componentes, endpoints o visualizaciones se crearán o modificarán.
4. **Implementación y Despliegue:** Crearemos el código, las vistas interactivas o los módulos analíticos en el sistema y los validaremos en tiempo real.

---

> [!TIP]
> Puedes verificar en cualquier momento el estado de los documentos cargados ejecutando en la consola:
> ```bash
> node scripts/scan_documentos.js
> ```
