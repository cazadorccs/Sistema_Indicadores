import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, '..', 'documentos', 'datos_ejemplo');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Generando archivo Excel de prueba en:', targetDir);

// 1. Catálogo completo de indicadores de prueba
const indicadores = [
  // TELEVISIÓN (VTV)
  { codigo: 'TV-001', indicador: 'Horas de transmisión televisiva semanales', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Horas', meta: 168, logrado: 168, obs: 'Emisión continua 24/7 sin cortes' },
  { codigo: 'TV-002', indicador: 'Operatividad de señal abierta de TV', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: '%', meta: 99.0, logrado: 99.4, obs: 'Excelente sincronización de transmisores máster' },
  { codigo: 'TV-003', indicador: 'Cobertura nacional de televisión', eje: 'Eje 1: Televisión', frecuencia: 'Semanal', unidad: '%', meta: 92.0, logrado: 93.5, obs: 'Cobertura efectiva en 23 estados y Dto. Capital' },
  { codigo: 'TV-004', indicador: 'Señal TDA operativa de televisión', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: '%', meta: 95.0, logrado: 94.8, obs: '22 nodos TDA operativos a nivel nacional' },
  { codigo: 'TV-005', indicador: 'Canales satelitales activos en grilla', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Canales', meta: 14, logrado: 14, obs: 'Mux satelital público en Banda Ku completo' },
  { codigo: 'TV-006', indicador: 'Programas producidos en televisión', eje: 'Eje 1: Televisión', frecuencia: 'Semanal', unidad: 'Programas', meta: 40, logrado: 42, obs: 'Estreno de 2 nuevos programas informativos' },
  { codigo: 'TV-007', indicador: 'Horas de programación propia en TV', eje: 'Eje 1: Televisión', frecuencia: 'Semanal', unidad: 'Horas', meta: 110, logrado: 115, obs: 'Superó la meta de producción interna' },
  { codigo: 'TV-008', indicador: 'Pases en vivo desde campo realizados', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Pases', meta: 60, logrado: 68, obs: 'Despliegue extraordinario en jornadas de gobierno' },
  { codigo: 'TV-009', indicador: 'Coberturas especiales y pautas de TV', eje: 'Eje 1: Televisión', frecuencia: 'Semanal', unidad: 'Coberturas', meta: 15, logrado: 18, obs: 'Transmisiones presidenciales y ministeriales' },
  { codigo: 'TV-014', indicador: 'Unidades móviles de TV operativas', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Unidades', meta: 12, logrado: 11, obs: '1 unidad en mantenimiento preventivo de generador' },
  { codigo: 'TV-015', indicador: 'Cámaras de producción operativas', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Cámaras', meta: 45, logrado: 42, obs: 'Ópticas y baterías operativas en 93%' },
  { codigo: 'TV-016', indicador: 'Islas de edición operativas', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Islas', meta: 28, logrado: 26, obs: 'Estaciones de edición no lineal 4K operativas' },
  { codigo: 'TV-017', indicador: 'Plantas eléctricas de respaldo TV operativas', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Plantas', meta: 14, logrado: 13, obs: 'Respaldo con autonomía diésel de 72 horas' },
  { codigo: 'TV-018', indicador: 'Personal técnico de televisión desplegado', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Personas', meta: 140, logrado: 145, obs: 'Operadores de máster, camarógrafos y técnicos' },
  { codigo: 'TV-019', indicador: 'Personal de campo y reportería desplegado', eje: 'Eje 1: Televisión', frecuencia: 'Diaria', unidad: 'Personas', meta: 65, logrado: 70, obs: 'Periodistas y camarógrafos en campo' },

  // RADIOS PÚBLICAS
  { codigo: 'RAD-001', indicador: 'Horas de transmisión radial semanales', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Horas', meta: 168, logrado: 168, obs: 'Transmisión 24 horas ininterrumpida' },
  { codigo: 'RAD-002', indicador: 'Operatividad de señal de transmisión radial', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: '%', meta: 98.0, logrado: 98.2, obs: 'Operatividad estable en circuitos AM/FM' },
  { codigo: 'RAD-003', indicador: 'Municipios cubiertos por señal radial', eje: 'Eje 1: Radios', frecuencia: 'Semanal', unidad: 'Municipios', meta: 280, logrado: 290, obs: 'Alcance territorial consolidado' },
  { codigo: 'RAD-004', indicador: 'Rating estimado de audiencia radial', eje: 'Eje 1: Radios', frecuencia: 'Semanal', unidad: 'Puntos', meta: 8.0, logrado: 8.7, obs: 'Pico en franja informativa matutina' },
  { codigo: 'RAD-005', indicador: 'Señal radial en zonas prioritarias / afectadas', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: '%', meta: 90.0, logrado: 93.5, obs: 'Cobertura en ejes fronterizos y llanos' },
  { codigo: 'RAD-006', indicador: 'Programas en vivo transmitidos en radio', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Programas', meta: 40, logrado: 46, obs: 'Espacios de opinión y participación popular' },
  { codigo: 'RAD-007', indicador: 'Horas de programación propia en radio', eje: 'Eje 1: Radios', frecuencia: 'Semanal', unidad: 'Horas', meta: 105, logrado: 112, obs: 'Contenido propio con talento nacional' },
  { codigo: 'RAD-008', indicador: 'Boletines informativos emitidos', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Boletines', meta: 130, logrado: 145, obs: 'Emisión cada 30 minutos' },
  { codigo: 'RAD-009', indicador: 'Microprogramas de contingencia / orientación', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Micros', meta: 25, logrado: 32, obs: 'Campañas preventivas y de concientización' },
  { codigo: 'RAD-014', indicador: 'Transmisores de radio operativos', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Equipos', meta: 45, logrado: 44, obs: '1 transmisor en mantenimiento en Zulia' },
  { codigo: 'RAD-015', indicador: 'Potencia promedio de transmisión radial', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: '%', meta: 92.0, logrado: 95.0, obs: 'Niveles óptimos de modulación y potencia' },
  { codigo: 'RAD-016', indicador: 'Plantas eléctricas de radio operativas', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Plantas', meta: 30, logrado: 29, obs: 'Revisión técnica periódica efectuada' },
  { codigo: 'RAD-018', indicador: 'Tiempo acumulado de caída de señal radial', eje: 'Eje 1: Radios', frecuencia: 'Diaria', unidad: 'Minutos', meta: 30, logrado: 15, obs: 'Rápida conmutación ante fallas eléctricas' },

  // MEDIOS DIGITALES
  { codigo: 'WEB-001', indicador: 'Visitas totales a portales web públicos', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Visitas', meta: 1500000, logrado: 1720000, obs: 'Alto tráfico en cobertura de noticias' },
  { codigo: 'WEB-002', indicador: 'Usuarios únicos en portales web', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: 'Usuarios', meta: 800000, logrado: 895000, obs: 'Crecimiento de audiencia internacional' },
  { codigo: 'WEB-003', indicador: 'Páginas vistas en portales web', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Páginas', meta: 3800000, logrado: 4150000, obs: 'Promedio de 4.6 páginas por usuario' },
  { codigo: 'WEB-004', indicador: 'Tiempo promedio de sesión en web', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: 'Minutos', meta: 3.5, logrado: 4.1, obs: 'Mayor retención en artículos de fondo' },
  { codigo: 'WEB-005', indicador: 'Tasa de rebote en portales web', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: '%', meta: 42.0, logrado: 36.8, obs: 'Disminución positiva de la tasa de rebote' },
  { codigo: 'WEB-006', indicador: 'Contenidos publicados en portales web', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Artículos', meta: 600, logrado: 695, obs: 'Actualización en tiempo real 24/7' },
  { codigo: 'WEB-007', indicador: 'Piezas multimedia publicadas en web', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Piezas', meta: 200, logrado: 248, obs: 'Galerías, videos e infografías interactivas' },
  { codigo: 'WEB-008', indicador: 'Boletines suscritos / suscriptores newsletter', eje: 'Eje 1: Digitales', frecuencia: 'Mensual', unidad: 'Suscriptores', meta: 80000, logrado: 87500, obs: 'Crecimiento de suscriptores al resumen diario' },
  { codigo: 'WEB-009', indicador: 'Usuarios registrados en plataformas digitales', eje: 'Eje 1: Digitales', frecuencia: 'Mensual', unidad: 'Registros', meta: 300000, logrado: 342000, obs: 'Usuarios en plataforma OTT y comentarios' },
  { codigo: 'WEB-010', indicador: 'Notificaciones push emitidas', eje: 'Eje 1: Digitales', frecuencia: 'Diaria', unidad: 'Notificaciones', meta: 40, logrado: 48, obs: 'Alertas de noticias de última hora' },
  { codigo: 'WEB-012', indicador: 'Nuevos suscriptores en la semana', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: 'Suscriptores', meta: 5000, logrado: 6450, obs: 'Impulso desde campañas de redes sociales' },
  { codigo: 'WEB-013', indicador: 'Trámites digitales disponibles al público', eje: 'Eje 1: Digitales', frecuencia: 'Mensual', unidad: 'Trámites', meta: 15, logrado: 15, obs: '100% de trámites en línea operativos' },
  { codigo: 'WEB-014', indicador: 'Solicitudes atendidas por SIVERIF', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: 'Solicitudes', meta: 150, logrado: 185, obs: 'Verificación de fuentes y usuarios' },
  { codigo: 'WEB-015', indicador: 'Registros PNI gestionados en línea', eje: 'Eje 1: Digitales', frecuencia: 'Mensual', unidad: 'Registros', meta: 50, logrado: 68, obs: 'Atención a Productores Nacionales Independientes' },
  { codigo: 'WEB-018', indicador: 'Tasa de respuesta a solicitudes digitales', eje: 'Eje 1: Digitales', frecuencia: 'Semanal', unidad: '%', meta: 90.0, logrado: 95.4, obs: 'Respuesta en menos de 24 horas' },

  // REDES SOCIALES
  { codigo: 'RED-001', indicador: 'Contenido total publicado en redes sociales', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Publicaciones', meta: 1200, logrado: 1460, obs: 'Multiplataforma X, Instagram, TikTok, Facebook' },
  { codigo: 'RED-002', indicador: 'Videos cortos / Reels / TikTok publicados', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Videos', meta: 400, logrado: 495, obs: 'Formato vertical optimizado para móviles' },
  { codigo: 'RED-004', indicador: 'Flyers e infografías publicados en redes', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Diseños', meta: 300, logrado: 335, obs: 'Material gráfico de alta resolución' },
  { codigo: 'RED-005', indicador: 'Audios y podcasts digitalizados para redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Audios', meta: 90, logrado: 115, obs: 'Episodios y cápsulas en canales de audio' },
  { codigo: 'RED-006', indicador: 'Transmisiones en vivo multiplataforma', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Transmisiones', meta: 70, logrado: 88, obs: 'Streaming simultáneo en 4 redes sociales' },
  { codigo: 'RED-012', indicador: 'Creadores y activadores digitales activos', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Activadores', meta: 50, logrado: 65, obs: 'Red de activadores en todo el territorio' },
  { codigo: 'RED-013', indicador: 'Vistas acumuladas en redes aliadas', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Vistas', meta: 2000000, logrado: 2540000, obs: 'Articulación con movimientos sociales' },
  { codigo: 'RED-014', indicador: 'Articulación y republicación en medios', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Impactos', meta: 15, logrado: 20, obs: 'Rebote de piezas en portales aliados' },
  { codigo: 'RED-016', indicador: 'Hashtags y tendencias monitorizadas', eje: 'Eje 1: Redes', frecuencia: 'Diaria', unidad: 'Hashtags', meta: 35, logrado: 44, obs: 'Monitoreo de posicionamiento orgánico' },
  { codigo: 'RED-017', indicador: 'Meta semanal de vistas digitales', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Vistas', meta: 10000000, logrado: 10000000, obs: 'Objetivo semanal fijado por Sala Situacional' },
  { codigo: 'RED-018', indicador: 'Vistas totales logradas en redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Vistas', meta: 10000000, logrado: 12450000, obs: '124.5% de cumplimiento de meta' },
  { codigo: 'RED-019', indicador: 'Interacciones totales en redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Interacciones', meta: 900000, logrado: 1120000, obs: 'Comentarios, compartidos y me gusta' },
  { codigo: 'RED-020', indicador: 'Impresiones netas en redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Impresiones', meta: 20000000, logrado: 23500000, obs: 'Alcance bruto total' },
  { codigo: 'RED-021', indicador: 'Alcance orgánico en redes sociales', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Cuentas', meta: 8000000, logrado: 9450000, obs: '80% del impacto generado de forma orgánica' },
  { codigo: 'RED-022', indicador: 'Alcance publicitario / pagado en redes', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Cuentas', meta: 3000000, logrado: 3650000, obs: 'Campañas institucionales segmentadas' },
  { codigo: 'RED-023', indicador: 'Seguidores totales consolidados', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Seguidores', meta: 4000000, logrado: 4235000, obs: 'Comunidad digital en expansión' },
  { codigo: 'RED-024', indicador: 'Nuevos seguidores ganados en la semana', eje: 'Eje 1: Redes', frecuencia: 'Semanal', unidad: 'Seguidores', meta: 40000, logrado: 51200, obs: 'Tasa de crecimiento semanal positiva' },

  // PLATAFORMAS REDTV & CONATEL
  { codigo: 'RTV-001', indicador: 'Operatividad Nacional de señal TDA', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: '%', meta: 95.0, logrado: 96.5, obs: 'Mux 1 y Mux 2 estables' },
  { codigo: 'RTV-002', indicador: 'N° de Servicios de TV activos en TDA', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Servicios', meta: 20, logrado: 22, obs: '22 canales transmitiendo en HD y SD' },
  { codigo: 'RTV-003', indicador: 'N° de Servicios de Radio activos en TDA', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Servicios', meta: 16, logrado: 16, obs: '16 radios públicas con audio digital TDA' },
  { codigo: 'RTV-004', indicador: 'Estaciones TDA operativas a nivel nacional', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Estaciones', meta: 28, logrado: 28, obs: 'Estaciones principales sin incidencias' },
  { codigo: 'RTV-005', indicador: 'Cobertura geográfica nacional TDA', eje: 'Eje 2: REDTV', frecuencia: 'Semanal', unidad: '%', meta: 80.0, logrado: 84.5, obs: 'Cobertura en principales capitales y ejes' },
  { codigo: 'RTV-006', indicador: 'Potencia de transmisión Banda Ku (Satelital)', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: '%', meta: 95.0, logrado: 97.2, obs: 'Enlace ascendente óptimo' },
  { codigo: 'RTV-007', indicador: 'Canales satelitales reactivados', eje: 'Eje 2: REDTV', frecuencia: 'Mensual', unidad: 'Canales', meta: 15, logrado: 18, obs: 'Reactivación de señales regionales' },
  { codigo: 'RTV-008', indicador: 'Canales satelitales totales operativos', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Canales', meta: 20, logrado: 20, obs: 'Totalidad de señales en telepuerto' },
  { codigo: 'RTV-009', indicador: 'Disponibilidad de enlace satelital', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: '%', meta: 99.0, logrado: 99.6, obs: 'Disponibilidad conforme a SLA satelital' },
  { codigo: 'RTV-010', indicador: 'Tiempo de caída de señal satelital en minutos', eje: 'Eje 2: REDTV', frecuencia: 'Diaria', unidad: 'Minutos', meta: 30, logrado: 12, obs: 'Afectación mínima por lluvia atenuada' },

  // MEDIOS IMPRESOS
  { codigo: 'IMP-001', indicador: 'Ejemplares impresos y distribuidos', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Ejemplares', meta: 50000, logrado: 48500, obs: 'Distribución nacional en quioscos y puntos' },
  { codigo: 'IMP-002', indicador: 'Tiraje total (unidades físicas)', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Unidades', meta: 55000, logrado: 52000, obs: 'Rotativa operando al 95%' },
  { codigo: 'IMP-003', indicador: 'Ejemplares en zonas afectadas', eje: 'Eje 1: Impresos', frecuencia: 'Diaria', unidad: 'Ejemplares', meta: 8000, logrado: 8900, obs: 'Refuerzo en zonas priorizadas' },
  { codigo: 'IMP-004', indicador: 'Porcentaje de cobertura territorial (municipios)', eje: 'Eje 1: Impresos', frecuencia: 'Semanal', unidad: '%', meta: 75.0, logrado: 78.0, obs: 'Presencia en 245 municipios' },
  { codigo: 'IMP-005', indicador: 'Número de suplementos especiales (contingencia)', eje: 'Eje 1: Impresos', frecuencia: 'Semanal', unidad: 'Unidades', meta: 3, logrado: 4, obs: 'Edición conmemorativa y balance' }
];

// Construir filas para la hoja de Indicadores
const rowsIndicadores = indicadores.map(i => ({
  'Código': i.codigo,
  'Indicador': i.indicador,
  'Eje / Subsistema': i.eje,
  'Frecuencia': i.frecuencia,
  'Unidad de Medida': i.unidad,
  'Meta Semanal': i.meta,
  'Valor Logrado / Reportado': i.logrado,
  'Observaciones': i.obs
}));

// Hoja 2: Variables de Control Institucional
const rowsControl = [
  { 'Parámetro': 'Ente Adscrito (Siglas Oficiales)', 'Valor': 'VTV', 'Instrucción': 'C.A. Venezolana de Televisión (VTV)' },
  { 'Parámetro': 'Semana Epidemiológica', 'Valor': 36, 'Instrucción': 'Semana Epidemiológica en curso (1-53)' },
  { 'Parámetro': 'Fecha de Reporte (AAAA-MM-DD)', 'Valor': '2026-09-18', 'Instrucción': 'Fecha de cierre de la semana evaluada' },
  { 'Parámetro': 'Periodo Desde (AAAA-MM-DD)', 'Valor': '2026-09-13', 'Instrucción': 'Inicio del ciclo operativo semanal' },
  { 'Parámetro': 'Periodo Hasta (AAAA-MM-DD)', 'Valor': '2026-09-19', 'Instrucción': 'Cierre del ciclo operativo semanal' },
  { 'Parámetro': 'Responsable del Ente', 'Valor': 'Lic. Gabriel Morales', 'Instrucción': 'Coordinación Operativa de Gestión VTV' },
  { 'Parámetro': 'Cédula de Identidad', 'Valor': 'V-14829301', 'Instrucción': 'Identificación oficial del responsable' },
  { 'Parámetro': 'Correo Electrónico Institucional', 'Valor': 'operaciones@vtv.gob.ve', 'Instrucción': 'Correo para validación criptográfica' },
  { 'Parámetro': 'Región / Localidad', 'Valor': 'Caracas, Distrito Capital - Los Ruices', 'Instrucción': 'Sede técnica de transmisión' }
];

// Hoja 3: Instrucciones
const rowsInstrucciones = [
  { 'Paso': 1, 'Instrucción': 'Este archivo contiene datos de prueba preparados para Venezolana de Televisión (VTV) - Semana 36.' },
  { 'Paso': 2, 'Instrucción': 'Para realizar la prueba, vaya al Dashboard o al módulo de Captura y presione el botón "Poner a Cero" para vaciar el sistema.' },
  { 'Paso': 3, 'Instrucción': 'A continuación, abra el modal "Carga Masiva Excel", arrastre o seleccione este archivo (.xlsx) y revise la previsualización interactiva.' },
  { 'Paso': 4, 'Instrucción': 'Presione "Aplicar y Cargar al Sistema" para observar cómo se pueblan automáticamente los indicadores y se recalculan los KPIs (EE, IRT, ICD, IEC).' }
];

// Crear Workbook
const wb = XLSX.utils.book_new();

const wsIndicadores = XLSX.utils.json_to_sheet(rowsIndicadores);
wsIndicadores['!cols'] = [
  { wch: 12 }, // Código
  { wch: 48 }, // Indicador
  { wch: 22 }, // Eje
  { wch: 14 }, // Frecuencia
  { wch: 16 }, // Unidad
  { wch: 16 }, // Meta Semanal
  { wch: 24 }, // Valor Logrado
  { wch: 45 }  // Observaciones
];
XLSX.utils.book_append_sheet(wb, wsIndicadores, 'Indicadores_Operativos');

const wsControl = XLSX.utils.json_to_sheet(rowsControl);
wsControl['!cols'] = [{ wch: 34 }, { wch: 30 }, { wch: 55 }];
XLSX.utils.book_append_sheet(wb, wsControl, 'Variables_Control');

const wsInstrucc = XLSX.utils.json_to_sheet(rowsInstrucciones);
wsInstrucc['!cols'] = [{ wch: 8 }, { wch: 90 }];
XLSX.utils.book_append_sheet(wb, wsInstrucc, 'Instrucciones_Uso');

// Guardar archivo Excel .xlsx
const xlsxPath = path.join(targetDir, 'Carga_Prueba_Semanal_VTV_2026.xlsx');
XLSX.writeFile(wb, xlsxPath);
console.log('✓ Archivo Excel generado con éxito:', xlsxPath);

// Guardar también versión CSV para máxima flexibilidad
const csvContent = XLSX.utils.sheet_to_csv(wsIndicadores);
const csvPath = path.join(targetDir, 'Carga_Prueba_Semanal_VTV_2026.csv');
fs.writeFileSync(csvPath, csvContent, 'utf-8');
console.log('✓ Archivo CSV generado con éxito:', csvPath);

// Crear archivo README informativo en la carpeta
const readmeContent = `# Datos de Ejemplo para Carga Masiva Automatizada

Esta carpeta contiene archivos de prueba listos para ser cargados mediante el módulo **Carga Masiva Excel** del Sistema de Gestión y Despliegue Operativo del MPPCI:

1. **\`Carga_Prueba_Semanal_VTV_2026.xlsx\`**:
   - Libro de Microsoft Excel (.xlsx) estructurado con hojas:
     - \`Indicadores_Operativos\`: 60+ indicadores cuantitativos de VTV (Televisión, Redes, Digitales, Radios, TDA).
     - \`Variables_Control\`: Metadatos institucionales (Ente: VTV, Semana: 36, Responsable, Cédula).
     - \`Instrucciones_Uso\`: Guía rápida para el operador.

2. **\`Carga_Prueba_Semanal_VTV_2026.csv\`**:
   - Versión en texto plano delimitado por comas (.csv) de los indicadores operativos.

---

### Procedimiento de Prueba Recomendado:
1. En la aplicación web (Dashboard o Captura), haga clic en el botón **"Poner a Cero"** y confirme para dejar la planilla en blanco (0%).
2. Haga clic en **"Carga Masiva Excel"** (o **"Carga Excel"** en la barra superior).
3. Seleccione o arrastre el archivo \`Carga_Prueba_Semanal_VTV_2026.xlsx\` ubicado en esta carpeta.
4. Inspeccione la tabla interactiva de previsualización que muestra los indicadores mapeados y sus valores.
5. Presione **"Aplicar y Cargar al Sistema"**.
6. Observe cómo el Dashboard y los formularios se pueblan automáticamente y se recalculan los índices de efectividad (EE, IRT, ICD, IEC) en tiempo real.
`;

fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent, 'utf-8');
console.log('✓ README de instrucciones generado en:', path.join(targetDir, 'README.md'));
