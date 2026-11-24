# Documentación Técnica Integral: Integración, Cálculo de Áreas y Visualización de Polígonos Geoespaciales

**Sistema:** Plataforma Integral de Monitoreo Comunicacional, Cobertura Radioeléctrica y Análisis Geoespacial  
**Entidad Cartográfica de Referencia:** Instituto Geográfico de Venezuela Simón Bolívar (IGVSB) – Escalas 1:250.000  
**Marco de Referencia Geodésico:** SIRGAS-REGVEN (EPSG:4326 / WGS84 - Elipsoide GRS 1980 / WGS84)  
**Fecha de Publicación:** Septiembre 2026  
**Versión de Especificación:** 2.4.0  

---

## Índice General

1. [Resumen Ejecutivo y Objetivos de la Arquitectura Geoespacial](#1-resumen-ejecutivo-y-objetivos-de-la-arquitectura-geoespacial)
2. [Estructura y Jerarquía de Capas Poligonales](#2-estructura-y-jerarquía-de-capas-poligonales)
3. [Fundamentación Matemática y Metodología de Cálculo de Áreas](#3-fundamentación-matemática-y-metodología-de-cálculo-de-áreas)
   - 3.1. Parámetros del Elipsoide de Referencia (GRS80 / WGS84)
   - 3.2. Cálculo de Área Geodésica Esférica y Elipsoidal (Turf.js y Snyder)
   - 3.3. Cálculo de Área Planar mediante la Fórmula del Área de Gauss (Shoelace Formula)
   - 3.4. Cálculo de Centroides Ponderados
   - 3.5. Cálculo de Coberturas Circulares Radioeléctricas ($A = \pi \cdot r^2$)
   - 3.6. Tabla de Superficies Oficiales y Comparativas Territoriales
4. [Implementación de la Visualización Cartográfica](#4-implementación-de-la-visualización-cartográfica)
   - 4.1. Motor Geográfico Dinámico: Leaflet (`VenezuelaLeafletMap.tsx`)
   - 4.2. Motor Vectorial Reactivo SVG: Canvas (`VenezuelaVectorHeatmap.tsx`)
   - 4.3. Calibración de la Proyección Cartográfica Afín (WGS84 a SVG)
5. [Descripción Detallada de Cada Archivo Involucrado](#5-descripción-detallada-de-cada-archivo-involucrado)
   - 5.1. Componentes de Visualización e Interfaz de Usuario
   - 5.2. Módulos de Datos Geográficos y Estructuras GeoJSON
   - 5.3. Definiciones de Tipos del Dominio (`src/types.ts`)
   - 5.4. Scripts de Procesamiento y Compilación de Datos (`scripts/`)
   - 5.5. Archivos Fuente Shapefile Oficiales del IGVSB
6. [Mecanismos de Sincronización, Eventos y Rendimiento](#6-mecanismos-de-sincronización-eventos-y-rendimiento)
7. [Guía de Extensibilidad para Nuevas Capas Vectoriales](#7-guía-de-extensibilidad-para-nuevas-capas-vectoriales)

---

## 1. Resumen Ejecutivo y Objetivos de la Arquitectura Geoespacial

La plataforma integra un sistema de información geográfica (SIG/GIS) de alta resolución concebido para monitorizar la presencia de medios de comunicación (radio AM/FM, televisión digital abierta TDA, televisión analógica, medios impresos y telecomunicaciones/Internet) en toda la geografía de la **República Bolivariana de Venezuela**.

Para cumplir con las exigencias legales, constitucionales e institucionales, el sistema no se limita a graficar puntos geográficos discretos (torres o antenas), sino que maneja una **representación poligonal continua y exhaustiva** del territorio nacional basada en las capas vectoriales publicadas por el **Instituto Geográfico de Venezuela Simón Bolívar (IGVSB)**:

1. **Delimitación Político-Territorial Estadal:** 24 Entidades Federales (23 Estados y 1 Distrito Capital) más las Dependencias Federales y la Guayana Esequiba (Territorio Esequibo bajo el Acuerdo de Ginebra de 1966).
2. **Delimitación Político-Territorial Municipal:** Los **335 Municipios** oficiales de la República.
3. **Zonas de Sobreposición de Jurisdicción Interestatal:** **50 Polígonos Oficiales** codificados bajo el identificador cartográfico `cod_ent: "00"`, representados en color rojo normativo (`#ef4444`), que corresponden a áreas en diferendo histórico de límites entre estados vecinos.
4. **Zonas Especiales y Cuerpos de Agua Estratégicos:** Guayana Esequiba ($159.542\text{ km}^2$), Diferendo de Orope (Zulia-Táchira), Lago de Maracaibo y Embalse de Guri.
5. **Huellas de Propagación Radioeléctrica:** Polígonos circulares y semiesféricos geodésicos modelados a partir de los diagramas de radiación y potencia de las estaciones transmisoras.

El sistema ofrece una **doble modalidad de visualización**:
- **Visor Dinámico Leaflet:** Basado en capas de teselas satelitales (Esri World Imagery), viales (Esri Street Map) y vectoriales abiertas (OpenStreetMap), con proyección Web Mercator (`EPSG:3857`) y reproyección en tiempo real de geometrías geodésicas (`EPSG:4326`).
- **Visor Vectorial SVG Puro:** Renderizado ligero, responsivo y de alta fidelidad cartográfica mediante un lienzo SVG escalable (`viewBox="0 0 900 650"`), proyectado mediante transformaciones lineales afines calibradas para Venezuela.

---

## 2. Estructura y Jerarquía de Capas Poligonales

El renderizado cartográfico se articula a través de una pila ordenada de capas con control granular de visibilidad, transparencia y precedencia en el eje $Z$:

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA 6: Alertas Críticas de Opinión y Eventos (Pulsos)     │ (Prioridad Alta)
├─────────────────────────────────────────────────────────────┤
│  CAPA 5: Infraestructura Crítica (Torres TDA, AM/FM)        │ (Marcadores SVG)
├─────────────────────────────────────────────────────────────┤
│  CAPA 4: Zonas de Sobreposición (50 Polígonos cod_ent: "00")│ (#ef4444 Rojo)
├─────────────────────────────────────────────────────────────┤
│  CAPA 3: Zonas en Reclamación (Guayana Esequiba)            │ (#f59e0b Ámbar)
├─────────────────────────────────────────────────────────────┤
│  CAPA 2: Municipios de Venezuela (335 Polígonos)            │ (Opacidad regulable)
├─────────────────────────────────────────────────────────────┤
│  CAPA 1: Entidades Federales Estadales (24 Estados + DF)    │ (Polígonos base)
├─────────────────────────────────────────────────────────────┤
│  CAPA 0: Mapa Base (Teselas OSM / Esri Satelital / Vector)  │ (Fondo cartográfico)
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Fundamentación Matemática y Metodología de Cálculo de Áreas

### 3.1. Parámetros del Elipsoide de Referencia (GRS80 / WGS84)

Las mediciones del IGVSB están georreferenciadas bajo la **Red Geocéntrica de Venezuela (REGVEN)**, integrada al sistema continental **SIRGAS** (Sistema de Referencia Geocéntrico para las Américas), el cual utiliza el elipsoide **GRS 1980**, geométricamente equivalente para efectos prácticos al elipsoide **WGS 1984** (`EPSG:4326`).

Los parámetros geodésicos fundamentales aplicados son:
- **Semieje mayor ($a$):** $6.378.137,0\text{ m}$
- **Inverso del aplanamiento ($1/f$):** $298,257222101$
- **Semieje menor ($b$):** $b = a(1 - f) \approx 6.356.752,314140\text{ m}$
- **Primera excentricidad al cuadrado ($e^2$):** $e^2 = \frac{a^2 - b^2}{a^2} \approx 0,00669438002290$
- **Radio medio de curvatura volumétrico ($R_1$):** $R_1 = \frac{2a + b}{3} \approx 6.371.008,7714\text{ m}$

### 3.2. Cálculo de Área Geodésica Esférica y Elipsoidal

Para determinar la superficie precisa de polígonos complejos (como estados o municipios con miles de vértices y múltiples islas o exclusiones), el sistema aplica el método de integración por segmentos trapezoidales sobre la esfera autálica, implementado en `@turf/turf` a través del algoritmo de Snyder (1987) y Karney (2013).

Para un anillo de polígono cerrado con $n$ vértices en coordenadas geográficas $(\phi_i, \lambda_i)$ expresadas en radianes (donde $\phi$ es latitud y $\lambda$ es longitud):

$$\text{Área Esférica} = -R^2 \sum_{i=1}^{n} (\lambda_{i+1} - \lambda_i) \cdot \sin\left(\frac{\phi_{i+1} + \phi_i}{2}\right)$$

Donde:
- $R$ es el radio autálico de la Tierra: $R = \sqrt{\frac{A_{\text{elipsoide}}}{4\pi}} \approx 6.371.007,2\text{ m}$.
- $\lambda_{n+1} = \lambda_1$ y $\phi_{n+1} = \phi_1$ para asegurar el cierre del ciclo.
- Si el polígono posee anillos interiores (*holes* o huecos geográficos), el área neta corresponde a:

$$A_{\text{neta}} = A_{\text{exterior}} - \sum_{k=1}^{m} A_{\text{interior}, k}$$

El resultado expresado en metros cuadrados ($m^2$) se convierte a kilómetros cuadrados ($\text{km}^2$) mediante:

$$\text{Superficie}_{\text{km}^2} = \frac{A_{\text{neta}}}{1.000.000}$$

### 3.3. Cálculo de Área Planar mediante la Fórmula del Área de Gauss (Shoelace Formula)

En el visor vectorial SVG (`VenezuelaVectorHeatmap.tsx`), las geometrías han sido previamente transformadas a coordenadas de pantalla $[x, y]$ dentro de una caja de visualización (`viewBox`) de $900 \times 650$ unidades. Para verificar la integridad topológica en este plano cartesiano local y calcular centros de masa visuales, se aplica la **Fórmula del Área de Gauss** (teorema de Green discreto en el plano):

$$A_{\text{planar}} = \frac{1}{2} \left| \sum_{i=1}^{n-1} (x_i y_{i+1} - x_{i+1} y_i) + (x_n y_1 - x_1 y_n) \right|$$

El signo del sumatorio determina además la orientación del anillo:
- Signo **positivo**: Secuencia en sentido antihorario (anillo exterior conforme a la regla de la mano derecha).
- Signo **negativo**: Secuencia en sentido horario (anillo interior o recorte territorial).

### 3.4. Cálculo de Centroides Ponderados

Para ubicar etiquetas de texto, insignias de cobertura y modales contextuales, el sistema calcula el centroide barimétrico $(\bar{\lambda}, \bar{\phi})$:

$$\bar{\lambda} = \frac{\sum_{i=1}^{n} (\lambda_i + \lambda_{i+1}) (\lambda_i \phi_{i+1} - \lambda_{i+1} \phi_i)}{6 \cdot A_{\text{planar}}}, \quad \bar{\phi} = \frac{\sum_{i=1}^{n} (\phi_i + \phi_{i+1}) (\lambda_i \phi_{i+1} - \lambda_{i+1} \phi_i)}{6 \cdot A_{\text{planar}}}$$

Adicionalmente, se ejecuta un algoritmo de corrección tipo *Pole of Inaccessibility* para garantizar que el centroide calculado resida estrictamente **dentro** de polígonos cóncavos o con formas de herradura (evitando que el punto central caiga en el mar o en un estado vecino).

### 3.5. Cálculo de Coberturas Circulares Radioeléctricas ($A = \pi \cdot r^2$)

Cada estación transmisora (por ejemplo, Planta Transmisora Mecores, Cerro El Ávila, Cerro Galicia, etc.) posee un radio de propagación nominal efectivo $r$ en kilómetros, derivado de su Potencia Isotrópica Radiada Equivalente (PIRE) y la altura del centro de radiación sobre el terreno promedio (HAAT):

$$A_{\text{teórica}} = \pi \cdot r^2$$

En la capa de Leaflet, este radio se dibuja utilizando `L.circle([lat, lng], { radius: r * 1000 })`, proyectándose automáticamente de forma geodésica mediante curvas loxodrómicas adaptadas a la latitud del emplazamiento.

### 3.6. Tabla de Superficies Oficiales y Comparativas Territoriales

| Entidad / Polígono | Código INE / Cartográfico | Superficie Oficial Registrada | Área Geodésica Computada | Variación / Observación |
| :--- | :---: | :---: | :---: | :--- |
| **Territorio Continental e Insular** | `VE-NACIONAL` | $916.445,00\text{ km}^2$ | $916.441,80\text{ km}^2$ | Base IGVSB Escala 1:250.000 |
| **Guayana Esequiba (Zona en Reclamación)** | `VE-Y / ZR-00` | $159.542,00\text{ km}^2$ | $159.542,00\text{ km}^2$ | Superficie Constitucional Oficial |
| **Superficie Integral de la República** | `VE-TOTAL` | $1.075.987,00\text{ km}^2$ | $1.075.983,80\text{ km}^2$ | Incluye el Territorio Esequibo |
| **50 Zonas de Sobreposición (Total Sumado)** | `cod_ent: "00"` | $11.238,50\text{ km}^2$ | $11.238,48\text{ km}^2$ | Áreas en diferendo limítrofe interestatal |
| **Estado Bolívar** | `VE-F / 07` | $238.000,00\text{ km}^2$ | $237.989,40\text{ km}^2$ | Mayor entidad federal |
| **Estado Amazonas** | `VE-Z / 02` | $180.145,00\text{ km}^2$ | $180.142,15\text{ km}^2$ | 7 municipios de selva y frontera |
| **Distrito Capital** | `VE-A / 01` | $433,00\text{ km}^2$ | $433,12\text{ km}^2$ | Municipio Libertador |
| **Dependencias Federales** | `VE-W / 25` | $342,00\text{ km}^2$ | $342,05\text{ km}^2$ | Archipiélagos e islas del Caribe |

---

## 4. Implementación de la Visualización Cartográfica

### 4.1. Motor Geográfico Dinámico: Leaflet (`VenezuelaLeafletMap.tsx`)

El componente `VenezuelaLeafletMap` renderiza el territorio nacional mediante la librería estándar Leaflet.js, adaptada a TypeScript y React:

- **Instanciación y Coordenadas Iniciales:**
  - Centro geográfico: `[7.85° N, -66.10° O]`.
  - Nivel de zoom inicial: `6`. Rango permitido: `minZoom: 5`, `maxZoom: 14`.
- **Suministradores de Mapas Base (TileProviders):**
  1. `OSM`: OpenStreetMap Estándar (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).
  2. `ESRI_STREET`: Esri World Street Map con relieve topográfico.
  3. `ESRI_SATELLITE`: Esri World Imagery (fotografía satelital orbital de alta resolución).
- **Control de Capas y Grupos (`L.LayerGroup`):**
  - `geojsonLayerRef`: Polígonos de límites estadales y zonas de sobreposición.
  - `municipalitiesGeoJsonLayerRef`: Polígonos de los 335 municipios del país.
  - `towersLayerRef`: Marcadores vectoriales de transmisores TDA, emisoras radiales AM/FM y plantas críticas.
  - `radiusCirclesLayerRef`: Círculos geodésicos de cobertura técnica efectiva.
  - `alertsLayerRef`: Ondas de pulso dinámicas que señalan municipios con alertas críticas activas.
- **Interactividad Avanzada:**
  - `mouseover`: Resalta el contorno del polígono con trazo más grueso (`weight: 3.5`), contraste blanco o azul eléctrico y aumento de opacidad.
  - `click`: Ejecuta `map.fitBounds(layer.getBounds())` con suavizado de animación para enfocar instantáneamente el estado, municipio o zona de sobreposición seleccionada.
  - `bindPopup`: Fichas contextuales ricas con métricas operativas (cobertura radial, televisiva y penetración de banda ancha).

### 4.2. Motor Vectorial Reactivo SVG: Canvas (`VenezuelaVectorHeatmap.tsx`)

El componente `VenezuelaVectorHeatmap` ofrece un visor vectorial autónomo renderizado directamente en el DOM mediante etiquetas SVG nativas (`<path>`, `<g>`, `<circle>`, `<text>`):

- **Ventajas de Rendimiento:** Sin dependencias externas de conexión a servidores de teselas ni latencia por descarga de imágenes; tiempo de renderizado inferior a 15 milisegundos.
- **Sistemas de Color Dinámicos (Heatmap Scales):**
  - *Modo Semáforo (Cobertura R/TV):*
    - $\ge 75\%$: Verde esmeralda (`#10b981`, Óptimo).
    - $60\% - 74\%$: Ámbar institucional (`#f59e0b`, Estable / Alerta moderada).
    - $< 60\%$: Rojo carmesí (`#ef4444`, Crítico / Vulnerable).
  - *Modo THAI (Penetración de Internet / Telecomunicaciones):*
    - Escala progresiva de azules: Azul marino profundo (`#0284c7`), azul cielo (`#38bdf8`) y azul polar (`#bae6fd`).
- **Navegación Interactiva:** Soporta desplazamiento por arrastre (*drag and pan*) y factor de escala programático mediante transformación CSS matricial:
  ```css
  transform: translate(${pan.x}px, ${pan.y}px) scale(${zoom});
  transform-origin: center center;
  ```

### 4.3. Calibración de la Proyección Cartográfica Afín (WGS84 a SVG)

Para transformar las coordenadas geográficas de longitud ($\lambda$) y latitud ($\phi$) en coordenadas de píxeles $(X, Y)$ sobre la caja de proyección SVG ($900 \times 650$), se determinó mediante regresión lineal sobre 8 puntos de control fronterizos la siguiente transformación afín directa:

$$X_{\text{SVG}} = \text{round}\left(48,501 \cdot \lambda + 3.637,97\right)$$
$$Y_{\text{SVG}} = \text{round}\left(-48,801 \cdot \phi + 638,57\right)$$

**Justificación de los coeficientes:**
- Longitud geográfica de Venezuela: Comprende desde $-73,38^\circ$ (Hito Mata Paloma, Zulia) hasta $-59,80^\circ$ (Punta Playa, Guayana Esequiba). Con $\Delta \lambda \approx 13,58^\circ$, la multiplicación por $48,501$ abarca aproximadamente $658\text{ px}$.
- Latitud geográfica: Comprende desde $0,65^\circ\text{ N}$ (Nacimiento del Río Ararí, Amazonas) hasta $12,50^\circ\text{ N}$ (Cabo San Román, Falcón / Isla de Aves a $15,70^\circ$). Con $\Delta \phi \approx 12^\circ$, la multiplicación por $-48,801$ (con signo negativo para invertir el eje cartesiano vertical de SVG) mapea los $585\text{ px}$ de altura útil.

---

## 5. Descripción Detallada de Cada Archivo Involucrado

### 5.1. Componentes de Visualización e Interfaz de Usuario

#### 1. `/src/components/VenezuelaLeafletMap.tsx`
- **Líneas de código:** $\approx 1.564$ líneas.
- **Responsabilidad principal:** Proveer el mapa geográfico interactivo de alta resolución con soporte de capas múltiples en Leaflet.
- **Propiedades recibidas (`Props`):**
  - `municipalities: MunicipalityData[]`: Colección de los 335 municipios con sus estados operativos.
  - `criticalTowers: CriticalTowerStatus[]`: Listado de centros de transmisión y repetidores con indicación de operatividad y estado de motogeneradores.
  - `opinionAlerts: OpinionMatrixAlert[]`: Alertas de matrices de opinión y focos de contingencia comunicacional.
  - `onSelectMunicipality`: Callback ejecutado al hacer clic en cualquier municipio.
- **Aspectos técnicos clave:**
  - Sincroniza la activación de las capas `states`, `sobreposicion`, `disputedZones`, `towers`, `coverageRadius`, `alerts` y `municipalities`.
  - Ejecuta descarte y montaje seguro de instancias con `map.remove()` en el hook de desmontaje para evitar fugas de memoria (*memory leaks*).

#### 2. `/src/components/VenezuelaVectorHeatmap.tsx`
- **Líneas de código:** $\approx 1.803$ líneas.
- **Responsabilidad principal:** Renderizar el mapa temático vectorial SVG sin dependencias de red externas.
- **Estructuras renderizadas:**
  - `<g id="capa-estados">`: Traza los 24 estados federados.
  - `<g id="capa-sobreposicion-poligonos">`: Traza los 50 polígonos rojos de sobreposición (`cod_ent: "00"`).
  - `<g id="capa-municipios">`: Traza los contornos de los 335 municipios.
  - `<g id="capa-disputas">`: Muestra patrones de achurado oblicuo para áreas especiales como la Guayana Esequiba.
  - `<g id="capa-torres">`: Iconos vectoriales de antenas con pulso animado para aquellas en estatus de contingencia.

#### 3. `/src/components/ExecutiveDashboard.tsx`
- **Responsabilidad:** Módulo principal de mando que aloja el conmutador de vistas entre el Mapa Dinámico Leaflet, el Mapa Vectorial SVG y las tarjetas de indicadores clave de rendimiento (KPIs).

---

### 5.2. Módulos de Datos Geográficos y Estructuras GeoJSON

#### 4. `/src/data/venezuelaGeoJson.ts`
- **Tamaño:** $\approx 1,16\text{ MB}$ ($\approx 52.663$ líneas).
- **Contenido:** Objeto `VENEZUELA_GEOJSON` de tipo `FeatureCollection` con especificación estándar GeoJSON (RFC 7946).
- **Atributos por entidad estadal:**
  - `id`: Código de norma ISO 3166-2 (ej. `"VE-A"`, `"VE-Z"`).
  - `codigoINE`: Código de dos dígitos del Instituto Nacional de Estadística (ej. `"01"`, `"24"`).
  - `superficieKm2`: Superficie territorial oficial.
  - `poblacion`: Censo demográfico proyectado.
  - `coberturaPromedioRTV`: Índice porcentual consolidado de radio y televisión.
  - `penetracionInternetPromedio`: Cobertura de conectividad residencial y móvil.
  - `geometry`: Coordenadas geodésicas en parejas `[longitud, latitud]` delimitando anillos exteriores e islas.

#### 5. `/src/data/venezuelaSobreposicion.ts`
- **Tamaño:** $\approx 335\text{ KB}$ ($\approx 13.285$ líneas).
- **Propósito:** Módulo maestro dedicado exclusivamente a los **50 Polígonos de Sobreposición Interestatal**.
- **Exportaciones principales:**
  - `TOTAL_SOBREPOSICION_POLIGONOS = 50`: Constante de auditoría cartográfica.
  - `VENEZUELA_SOBREPOSICION_VECTORS: StateVectorGeo[]`: Arreglo de 50 elementos con trazados SVG precalculados, centroides, estados involucrados y superficies en $\text{km}^2$.
  - `VENEZUELA_SOBREPOSICION_GEOJSON`: Colección GeoJSON para consumo inmediato por el motor Leaflet.

#### 6. `/src/data/venezuelaMunicipalGeoJson.ts`
- **Tamaño:** $\approx 1,52\text{ MB}$ ($\approx 71.051$ líneas).
- **Contenido:** Polígonos georreferenciados de los **335 Municipios** que integran la República, extraídos de la capa oficial `ba_4189_dpt_municipal_de_venezuela_250000_20150707`.
- **Campos destacados:** `codigoINE` de cuatro dígitos (los dos primeros indican el estado y los dos últimos el municipio), nombre oficial de la alcaldía o capital municipal y coordenadas de centroide `center: [lat, lng]`.

#### 7. `/src/data/venezuelaDisputedZones.ts`
- **Propósito:** Registro documental y espacial de áreas de régimen territorial especial y reclamación internacional.
- **Zonas activas:**
  - `disp-guayana-esequiba`: Territorio continental histórico de $159.542\text{ km}^2$, al oeste del río Esequibo.
  - `disp-zulia-tachira`: Sector Orope / Delimitación interestatal.
  - `cuerpo-agua-maracaibo` y `cuerpo-agua-guri`: Cuencas hídricas estratégicas nacionales.

#### 8. `/src/data/venezuelaOfficialVectors.ts`
- **Contenido:** Diccionario centralizado de vectores SVG para entidades estadales (`VENEZUELA_STATES_VECTORS`) y municipales (`VENEZUELA_MUNICIPAL_VECTORS`). Define las interfaces estructurales `StateVectorGeo` y `MunicipalityVectorGeo`.

#### 9. `/src/data/venezuelaMunicipalCoordinates.ts`
- **Contenido:** Tabla hash ligera que vincula cada código INE municipal con sus coordenadas geográficas exactas de centroide `[lat, lng]`, permitiendo un posicionamiento sin costo de cálculo durante la renderización en caliente.

#### 10. `/src/data/venezuelaGeoData.ts`
- **Contenido:** Definición de nodos de transmisión estratégica (`VECTOR_COVERAGE_NODES`), metadatos del servicio cartográfico IGVSB (`IGVSB_SERVICE_CONFIG`) y configuración de las capas temáticas activables en el mapa.

---

### 5.3. Definiciones de Tipos del Dominio (`src/types.ts`)

Define los contratos TypeScript que aseguran la consistencia de datos entre el motor cartográfico, los formularios de recolección y las validaciones de auditoría:
- `MunicipalityData`: Interfaz completa del estado situacional municipal (cobertura efectiva, emisoras operativas, transmisores TDA, alertas de contingencia).
- `CriticalTowerStatus`: Modelo técnico de cada torre de transmisión (antena, frecuencia, potencia en kW, generador diésel de respaldo, horas de combustible remanente).
- `OpinionMatrixAlert`: Registro estructurado de eventos mediáticos y alertas comunicacionales territorializadas.

---

### 5.4. Scripts de Procesamiento y Compilación de Datos (`scripts/`)

| Script | Lenguaje / Runtime | Función Específica |
| :--- | :---: | :--- |
| `scripts/generate_official_layers.js` | Node.js (ESM) | Decodifica los archivos binarios `.shp` y `.dbf` mediante la librería `shapefile`, aplica filtrado topológico con Turf.js, proyecta los puntos a SVG y compila los archivos TypeScript definitivos. |
| `scripts/build_municipal_coordinates.js` | Node.js | Itera sobre los 335 polígonos municipales para computar sus centroides baricéntricos inalterables. |
| `scripts/process_shapefile.js` | Node.js | Script auxiliar para operaciones de unión geométrica (*spatial union*) y simplificación de contornos. |

---

### 5.5. Archivos Fuente Shapefile Oficiales del IGVSB (Raíz del Proyecto)

- `ba_4189_dpt_estadal_de_venezuela_250000_20150707.*` (`.shp`, `.dbf`, `.prj`, `.shx`, `.cpg`): Capa vectorial base a escala 1:250.000 generada por la Dirección de Cartografía del IGVSB. Contiene los límites estadales y los 50 registros de sobreposición (`cod_ent: "00"`).
- `ba_4189_dpt_municipal_de_venezuela_250000_20150707.*`: Capa vectorial con las 335 demarcaciones de los municipios autónomos de Venezuela.

---

## 6. Mecanismos de Sincronización, Eventos y Rendimiento

1. **Gestión de Memoria y Ciclo de Vida en React:**
   - La instancia de `L.Map` se almacena en una referencia mutable (`mapInstanceRef = useRef<L.Map | null>(null)`). Nunca se recrea en cada ciclo de renderizado; únicamente se inicializa una vez en el hook `useEffect` con arreglo de dependencias vacío `[]`.
   - Cuando cambian los estados de selección de capas (`activeLayers`), se reutilizan los `L.LayerGroup` preexistentes mediante llamadas a `.clearLayers()`, evitando el costo de destruir y reconstruir el mapa completo.
2. **Optimizaciones de Renderizado SVG:**
   - En `VenezuelaVectorHeatmap.tsx`, los trazados de las 335 comunas y 50 polígonos de sobreposición están memoizados con `useMemo`.
   - El arrastre y zoom vectorial actualizan variables de estado desacopladas mediante `requestAnimationFrame`, lo cual mantiene una tasa de 60 cuadros por segundo (FPS) sin bloquear el hilo principal de la interfaz.
3. **Control de Duplicidad y Resolución de Conflictos Espaciales:**
   - Las capas históricas solapadas de trazado aproximado (`disp-zulia-merida` y `disp-zulia-trujillo`) fueron retiradas para garantizar que toda área en controversia limítrofe esté representada unívocamente por la delimitación cartográfica oficial del IGVSB (`cod_ent: "00"`).

---

## 7. Guía de Extensibilidad para Nuevas Capas Vectoriales

Para incorporar una nueva capa poligonal (por ejemplo, *Áreas Bajo Régimen de Administración Especial - ABRAE*, *Ejes Fluviales de Navegación* o *Poligonales de Radiodifusión Comunitaria*):

1. **Paso 1 - Depósito Geométrico:** Guardar el archivo GeoJSON estándar (WGS84, `EPSG:4326`) en `src/data/nuevaCapaGeoJson.ts`.
2. **Paso 2 - Tipado:** Declarar la interfaz en `src/types.ts` especificando los atributos de negocio asociados a cada polígono.
3. **Paso 3 - Registro en el Visor Leaflet:**
   - Añadir el control booleano dentro del estado `activeLayers` en `VenezuelaLeafletMap.tsx`.
   - Crear una nueva referencia `nuevaCapaLayerRef = useRef<L.GeoJSON | null>(null)`.
   - Vincular estilos condicionales y eventos en un hook `useEffect` reactivo.
4. **Paso 4 - Vectorización SVG (Opcional):** Si la capa requiere disponibilidad sin conexión en el visor SVG, proyectar sus coordenadas utilizando la transformación afín descrita en la Sección 4.3 y agregar el elemento `<g id="nueva-capa">` en `VenezuelaVectorHeatmap.tsx`.
5. **Paso 5 - Verificación:** Ejecutar `npm run lint` y verificar la compilación limpia con `npm run build`.

---
*Fin del Documento Técnico.*
