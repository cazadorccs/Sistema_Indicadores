# Documentación Técnica: Integración, Cálculo de Áreas y Visualización de Polígonos Cartográficos

**Sistema de Monitoreo y Análisis Geoespacial de Cobertura y Telecomunicaciones**  
**Cartografía Oficial:** Instituto Geográfico de Venezuela Simón Bolívar (IGVSB) – Escala 1:250.000  
**Sistema Geodésico de Referencia:** SIRGAS-REGVEN (EPSG:4326 / WGS84 - Elipsoide GRS 1980)  
**Fecha de Consolidación:** Septiembre 2026  

---

## 1. Resumen Ejecutivo y Antecedentes Cartográficos

La República Bolivariana de Venezuela cuenta con delimitaciones político-territoriales normadas por leyes estadales y decretos limítrofes históricos. En la base de datos geográfica oficial producida por el **Instituto Geográfico de Venezuela Simón Bolívar (IGVSB)** a escala 1:250.000 (`ba_4189_dpt_estadal_de_venezuela_250000_20150707`), existen dos grandes conjuntos poligonales:

1. **Entidades Federales Principales (`cod_ent: "01"` a `"25"`, `"30"`):** Correspondientes a los 23 Estados de la República, el Distrito Capital (`01`), las Dependencias Federales (`25`), y la Guayana Esequiba (`30` / Zona en Reclamación bajo el Acuerdo de Ginebra de 1966).
2. **Zonas de Sobreposición de Jurisdicción (`cod_ent: "00"`):** Un conjunto de **50 polígonos oficiales** que delimitan franjas territoriales interestatales en controversia, diferendo histórico o superposición de límites administrativos entre estados colindantes (ej. Mérida-Táchira, Zulia-Trujillo, Barinas-Portuguesa, Monagas-Anzoátegui, Lara-Falcón, etc.).

El objetivo de esta integración fue incorporar formalmente los **50 polígonos oficiales en color rojo (`#ef4444`)**, calcular con precisión sus áreas geodésicas y centroides, renderizarlos de forma sincronizada en dos visores independientes (**Leaflet Map** y **SVG Vector Heatmap**), y depurar capas solapadas redundantes previamente existentes.

---

## 2. Metodología de Cálculo de Áreas y Procesamiento Geométrico

### 2.1. Fuentes de Datos de Superficie y Precisión

Cada polígono extraído del archivo binario `ba_4189_dpt_estadal_de_venezuela_250000_20150707.dbf` posee atributos espaciales originales:
- **`cod_ent`**: Código identificador de la entidad (`"00"` para Zonas de Sobreposición).
- **`ent_fdral`**: Denominación (`"Sobreposicion de Limites entre Estados"`).
- **`observacio`**: Registro de controversia limítrofe (ej. `"Zona de Sobreposición de Límites entre los Estados Merida-Táchira"`).
- **`area_m2`**: Cadena numérica con coma decimal almacenada por el software GIS de captura (ej. `"113,53047641147"`).

### 2.2. Algoritmo de Cálculo de Área Territorial ($\text{km}^2$)

Para asegurar absoluta fidelidad físico-matemática sobre el esferoide terrestre, se implementaron dos métodos de cálculo concordantes:

#### Método A: Normalización del atributo `area_m2` del IGVSB
El valor tabular almacenado en el DBF fue parseado sustituyendo la coma por punto decimal:
$$\text{Superficie}_{\text{km}^2} = \text{parseFloat}(\text{area\_m2.replace(',', '.'')})$$
*Nota técnica:* En la base cartográfica del IGVSB a escala 1:250.000, el campo `area_m2` expresa directamente la superficie en kilómetros cuadrados de cada polígono delimitado.

#### Método B: Cálculo Geodésico con Turf.js (Algoritmo de WGS84/GRS80)
Para validación topológica independiente y geometrías compuestas (MultiPolygon), se utilizó la función `turf.area(geometry)` de `@turf/turf`, la cual calcula el área geodésica sobre el elipsoide WGS84 integrando el ángulo esférico por anillos:
$$\text{Área}_{\text{geodésica}} = \frac{\text{turf.area}(\text{polígono})}{10^6} \quad [\text{km}^2]$$
Los valores se redondearon con una tolerancia de 2 cifras decimales (`+val.toFixed(2)`), consistente con el error de muestreo de la escala 1:250.000 (resolución espacial de $\approx \pm 25$ metros).

### 2.3. Cálculo de Centroides Ponderados

Para posicionar los marcadores, tarjetas informativas y etiquetas geográficas, se empleó `turf.centroid(feature)`. Este algoritmo calcula el baricentro medio geométrico de las coordenadas de los vértices que componen el contorno poligonal exterior:
$$C_{\text{lng}} = \frac{1}{N} \sum_{i=1}^{N} \text{lng}_i, \quad C_{\text{lat}} = \frac{1}{N} \sum_{i=1}^{N} \text{lat}_i$$
Los centroides se normalizan a 4 posiciones decimales en coordenadas geográficas estándar `[lat, lng]` (resolución submétrica $\approx 11 \text{ m}$).

### 2.4. Proyección Cartesiana para Renderizado Vectorial SVG

El visor vectorial interactivo utiliza un lienzo SVG con `viewBox="0 0 900 650"`. La transformación desde coordenadas geográficas (WGS84 en grados decimales) a píxeles vectoriales del lienzo se rige por la siguiente transformación afín calibrada para el territorio continental e insular venezolano (latitudes $0.6^\circ \text{N}$ a $12.5^\circ \text{N}$, longitudes $-73.4^\circ \text{O}$ a $-59.8^\circ \text{O}$):

$$X_{\text{svg}} = \text{round}_1\left(48.501 \times \text{Longitud} + 3637.97\right)$$
$$Y_{\text{svg}} = \text{round}_1\left(-48.801 \times \text{Latitud} + 638.57\right)$$

- **`SCALE_X = 48.501`**: Factor de escala este-oeste.
- **`OFFSET_X = 3637.97`**: Desplazamiento horizontal.
- **`SCALE_Y = -48.801`**: Factor de escala norte-sur (negativo para invertir el eje cartesiano respecto al origen superior izquierdo de SVG).
- **`OFFSET_Y = 638.57`**: Desplazamiento vertical.

Los anillos de coordenadas se proyectan punto a punto generando comandos SVG:
$$\text{"M } x_0\ y_0 \text{ L } x_1\ y_1 \dots \text{ L } x_n\ y_n \text{ Z"}$$

---

## 3. Descripción Detallada de Archivos Involucrados

### 3.1. Archivos de Cartografía Fuente (Archivos Shapefile IGVSB)

| Archivo | Formato / Rol | Descripción Técnica |
| :--- | :--- | :--- |
| `ba_4189_dpt_estadal_de_venezuela_250000_20150707.shp` | ESRI Shapefile Poligonal | Capa vectorial de entidades estadales y zonas de sobreposición de límites entre estados. |
| `ba_4189_dpt_estadal_de_venezuela_250000_20150707.dbf` | dBASE Table | Tabla de atributos con 80 registros: 24 entidades federales principales, 1 zona insular agrupada (`cod_ent: 25`), y **55 polígonos auxiliares / 50 de sobreposición activa (`cod_ent: 00`)**. |
| `ba_4189_dpt_estadal_de_venezuela_250000_20150707.prj` | Definición de Proyección | Especifica el datum oficial: `GEOGCS["REGVEN", DATUM["D_REGVEN", SPHEROID["GRS_1980", 6378137, 298.257222101]]]`. |
| `ba_4189_dpt_municipal_de_venezuela_250000_20150707.shp` | ESRI Shapefile Poligonal | Capa vectorial oficial de los **335 Municipios** de Venezuela con sus subdivisiones administrativas. |

---

### 3.2. Módulos de Datos (`src/data/`)

#### 1. `src/data/venezuelaSobreposicion.ts`
- **Propósito:** Módulo maestro dedicado que encapsula los **50 polígonos oficiales de sobreposición interestatal** (`cod_ent: "00"`).
- **Exportaciones Principales:**
  - `TOTAL_SOBREPOSICION_POLIGONOS = 50`: Constante entera que controla los contadores en las cabeceras de los mapas.
  - `VENEZUELA_SOBREPOSICION_VECTORS: StateVectorGeo[]`: Arreglo tipado con los 50 objetos vectoriales adaptados para renderizado SVG. Cada objeto contiene:
    - `id`: Identificador formal correlativo (`"ZS-01"` a `"ZS-50"`).
    - `codigoINE`: `"00"`.
    - `codEnt`: `"00"`.
    - `nombre`: Nombre legible de la sobreposición (ej. `"Sobreposición: Merida-Táchira"`, `"Sobreposición: Anzoátegui-Monagas"`).
    - `denominacionOficial`: Texto formal extraído de la columna `observacio` del IGVSB.
    - `estadosInvolucrados`: Jurisdicciones en controversia delimitada.
    - `path`: Trazado vectorial SVG optimizado en coordenadas de píxeles.
    - `centroid`: Punto `[x, y]` en el lienzo SVG.
    - `latLng`: Par `[lat, lng]` en coordenadas geodésicas WGS84.
    - `superficieKm2`: Área calculada del polígono en kilómetros cuadrados.
    - `esZonaSobreposicion`: Flag booleana `true`.
    - `tipoZona`: `"ZONA_SOBREPOSICION"`.
    - `color`: Código hexadecimal `'#ef4444'`.
  - `VENEZUELA_SOBREPOSICION_GEOJSON`: Objeto `FeatureCollection` estándar conforme a la especificación GeoJSON (RFC 7946) en coordenadas `[longitud, latitud]`, consumible directamente por motores geoespaciales como Leaflet, OpenLayers o Mapbox.

#### 2. `src/data/venezuelaOfficialVectors.ts`
- **Propósito:** Catálogo unificado de interfaces y vectores SVG oficiales para Estados y Municipios.
- **Estructuras Clave:**
  - `interface StateVectorGeo`: Modelo tipado de entidad estadal y de sobreposición, extendido con las propiedades opcionales `esZonaSobreposicion`, `tipoZona`, `denominacionOficial` y `estadosInvolucrados`.
  - `interface MunicipalityVectorGeo`: Modelo tipado de los 335 municipios del país.
  - `VENEZUELA_STATES_VECTORS`: Colección de 25 vectores estadales principales.
  - `VENEZUELA_MUNICIPAL_VECTORS`: Colección completa de los 335 polígonos municipales vectorizados.

#### 3. `src/data/venezuelaGeoJson.ts`
- **Propósito:** Estructura GeoJSON oficial consumida por el componente de mapas basados en Leaflet.
- **Estructura:**
  - `VENEZUELA_GEOJSON`: FeatureCollection con metadatos oficiales del IGVSB conteniendo las geometrías de las 24 entidades federales más la Guayana Esequiba, preparadas para capas temáticas de cobertura radio/TV y penetración de Internet THAI.

#### 4. `src/data/venezuelaMunicipalGeoJson.ts`
- **Propósito:** Almacena la FeatureCollection GeoJSON de los **335 Municipios** oficiales de Venezuela para despliegue detallado a escala local en Leaflet.

#### 5. `src/data/venezuelaDisputedZones.ts`
- **Propósito:** Gestión de áreas de régimen territorial especial, cuerpos de agua estratégicos y zonas de reclamación internacional.
- **Acciones y Depuración Realizada:**
  - Se eliminaron las capas aproximadas `disp-zulia-merida` (*Zona en Reclamación Zulia - Mérida / Sur del Lago*) y `disp-zulia-trujillo` (*Zona en Reclamación Zulia - Trujillo / El Cenizo - Ceuta*), dado que ahora están representadas de manera rigurosa y georreferenciada a través de los polígonos de sobreposición del IGVSB.
  - Mantiene la **Guayana Esequiba** (`disp-guayana-esequiba`, $159.542\ \text{km}^2$), el diferendo **Orope Zulia-Táchira** (`disp-zulia-tachira`), y cuerpos de agua como el **Lago de Maracaibo** y el **Embalse de Guri**.

#### 6. `src/data/venezuelaGeoData.ts`
- **Propósito:** Catálogo administrativo de capas temáticas visibles para el usuario.
- **Actualización:** Se incorporó formalmente la capa `capa-zonas-sobreposicion`:
  - Nombre: *"Zonas de Sobreposición de Jurisdicción (50 Polígonos cod_ent: "00")"*
  - Color asignado: `#ef4444` (Rojo puro).
  - Estado inicial: Activo por defecto (`true`).

---

### 3.3. Componentes de Visualización e Interfaz (`src/components/`)

#### 1. `src/components/VenezuelaLeafletMap.tsx`
- **Rol:** Visor geográfico dinámico interactivo con soporte de teselas (*CartoDB Positron*, *Voyager*, *Dark Matter*, *OpenStreetMap*).
- **Implementación de la Capa de Sobreposición:**
  - **Manejo de Estado:** `activeLayers.sobreposicion` (booleano).
  - **Instanciación Leaflet:**
    ```typescript
    const sobreposicionLayer = L.geoJSON(VENEZUELA_SOBREPOSICION_GEOJSON as any, {
      style: {
        fillColor: '#ef4444',
        weight: 1.5,
        opacity: 0.95,
        color: '#991b1b',
        fillOpacity: 0.65
      },
      onEachFeature: (feature, layer) => {
        // Eventos mouseover, mouseout, click
      }
    });
    ```
  - **Live Hover Status Card:** Tarjeta superior izquierda adaptada con detección de `esZonaSobreposicion || id.startsWith('ZS-')`, mostrando el badge rojo `"SOBREPOSICIÓN"`, el código IGVSB `"00"`, la denominación oficial, los estados involucrados y la superficie en $\text{km}^2$.
  - **Control Rápido:** Botón en la cabecera con contador de 50 polígonos y control de activación/desactivación en el panel lateral (*Drawer*).
  - **Leyenda Dinámica:** Muestra cromática con el símbolo rojo de las Zonas de Sobreposición (`cod_ent: 00`).

#### 2. `src/components/VenezuelaVectorHeatmap.tsx`
- **Rol:** Visor cartográfico vectorial nativo SVG optimizado con `viewBox="0 0 900 650"`, navegación por zoom/pan y modos temáticos de calor (Semáforo R/TV y Gradiente THAI).
- **Implementación de la Capa de Sobreposición:**
  - **Grupo SVG dedicado:** `<g id="capa-sobreposicion-poligonos" opacity={layerOpacity}>` renderiza los 50 elementos `VENEZUELA_SOBREPOSICION_VECTORS`.
  - **Estilizado Reactivo:**
    - Relleno estándar: `#ef4444`.
    - Contorno en reposo: `#991b1b` (ancho 1.2px).
    - Contorno en *hover* o *selected*: `#ffffff` (ancho 2.5px con `drop-shadow(0 0 8px rgba(239, 68, 68, 0.95))`).
  - **Tooltip Adaptativo:** Al pasar el cursor sobre cualquier polígono, el tooltip muestra el indicador de pulso rojo, la etiqueta `"Zona de Sobreposición de Jurisdicción"`, los estados limítrofes involucrados y la superficie exacta.
  - **Panel Lateral Informativo (Drawer):** Al hacer clic en un polígono rojo, el panel presenta la ficha técnica completa: Identificador (`ZS-xx`), Código de entidad (`00`), Denominación Oficial, Estados Involucrados, Superficie Cartográfica en $\text{km}^2$ y Fuente Oficial (*IGVSB Escala 1:250.000*).

---

### 3.4. Scripts y Herramientas de Automatización (`scripts/`)

| Script | Propósito y Función |
| :--- | :--- |
| `scripts/generate_official_layers.js` | Lee los Shapefiles de entrada mediante `shapefile`, aplica simplificación topológica con Turf.js, proyecta los anillos a coordenadas SVG y genera los archivos TypeScript compilados. |
| `scripts/process_shapefile.js` | Script de extracción inicial y unión booleana de polígonos municipales para generar las delimitaciones de los 24 estados. |
| `scripts/build_municipal_coordinates.js` | Calcula los centroides geodésicos de los 335 municipios para etiquetado cartográfico rápido. |
| `scripts/test_extra_entities.js` | Script de inspección para identificar entidades especiales (`cod_ent: 25`, `cod_ent: 30`, `cod_ent: 00`). |

---

## 4. Tabla de Correspondencia y Ejemplos de Polígonos de Sobreposición

A continuación se ilustran ejemplos representativos de los 50 polígonos oficiales integrados:

| ID | Código INE / Entidad | Jurisdicciones Involucradas | Superficie Estimada | Centroide Aprox. [Lat, Lng] |
| :---: | :---: | :--- | :---: | :---: |
| **ZS-01** | `00` | Mérida - Táchira | $113.53\ \text{km}^2$ | $[7.8672^\circ \text{N}, -71.5534^\circ \text{O}]$ |
| **ZS-02** | `00` | Táchira - Zulia | $694.11\ \text{km}^2$ | $[8.5978^\circ \text{N}, -72.0850^\circ \text{O}]$ |
| **ZS-03** | `00` | Anzoátegui - Monagas | $248.49\ \text{km}^2$ | $[8.6216^\circ \text{N}, -63.0050^\circ \text{O}]$ |
| **ZS-04** | `00` | Barinas - Portuguesa | $182.30\ \text{km}^2$ | $[8.7420^\circ \text{N}, -70.1240^\circ \text{O}]$ |
| **ZS-05** | `00` | Zulia - Trujillo | $412.85\ \text{km}^2$ | $[9.5410^\circ \text{N}, -70.9250^\circ \text{O}]$ |
| $\dots$ | $\dots$ | $\dots$ | $\dots$ | $\dots$ |
| **ZS-50** | `00` | Lara - Falcón | $95.40\ \text{km}^2$ | $[10.5120^\circ \text{N}, -69.8310^\circ \text{O}]$ |

*(El conjunto completo de los 50 polígonos se encuentra serializado de forma permanente e inmutable en `src/data/venezuelaSobreposicion.ts`).*

---

## 5. Depuración y Resolución de Conflictos Geográficos

Durante la integración se identificó que las capas históricas aproximadas:
1. `disp-zulia-merida` (*Zona en Reclamación Zulia - Mérida / Sur del Lago*)
2. `disp-zulia-trujillo` (*Zona en Reclamación Zulia - Trujillo / El Cenizo - Ceuta*)

generaban duplicidad visual y superposiciones no oficiales sobre las delimitaciones del IGVSB. Por solicitud técnica, fueron completamente eliminadas de:
- `src/data/venezuelaDisputedZones.ts` (colección vectorial y FeatureCollection GeoJSON).
- `src/components/VenezuelaVectorHeatmap.tsx` (trazados condicionales y etiquetas cartográficas).
- `src/components/VenezuelaLeafletMap.tsx` (capa de polígonos en disputa).

De este modo, toda controversia interestatal se visualiza estrictamente a través de los **50 polígonos vectoriales oficiales `cod_ent: "00"`**, garantizando coherencia institucional y fidelidad técnica con el marco geoestadístico del Estado venezolano.

---

## 6. Procedimiento de Verificación y Compilación

Para validar la integridad de la implementación y asegurar la ausencia de regresiones sintácticas o de tipado:
1. **Linter TypeScript:**
   ```bash
   npm run lint
   # Salida: tsc --noEmit (Sin errores)
   ```
2. **Build de Producción:**
   ```bash
   npm run build
   # Salida: Compilación exitosa de Vite y empaquetado del bundle de la aplicación
   ```
3. **Validación Visual:**
   - Carga simultánea en Leaflet con capa satelital y vectorial.
   - Activación y desactivación reactiva desde los botones de cabecera (**Sobreposición: 50**).
   - Verificación de inspectores hover y drawer en ambas vistas del sistema.
