import { Eje1InstrumentoData } from '../types';

export const INITIAL_EJE1_DATA: Eje1InstrumentoData = {
  // 1.A MEDIOS IMPRESOS
  impresos: {
    produccion: [
      {
        codigo: 'IMP-001',
        indicador: 'Ejemplares impresos y distribuidos',
        frecuencia: 'Diaria',
        metaSemanal: 150000,
        logrado: 148500,
        varSemanaAnterior: 3.2
      },
      {
        codigo: 'IMP-002',
        indicador: 'Tiraje total (unidades físicas)',
        frecuencia: 'Diaria',
        metaSemanal: 160000,
        logrado: 158000,
        varSemanaAnterior: 2.5
      },
      {
        codigo: 'IMP-003',
        indicador: 'Ejemplares distribuidos en zonas afectadas',
        frecuencia: 'Diaria',
        metaSemanal: 45000,
        logrado: 44200,
        varSemanaAnterior: 8.4
      },
      {
        codigo: 'IMP-004',
        indicador: 'Porcentaje de cobertura territorial (municipios)',
        frecuencia: 'Semanal',
        metaSemanal: 80,
        logrado: 78.5,
        varSemanaAnterior: 1.8
      },
      {
        codigo: 'IMP-005',
        indicador: 'Número de suplementos especiales (contingencia)',
        frecuencia: 'Semanal',
        metaSemanal: 4,
        logrado: 4,
        varSemanaAnterior: 0.0
      }
    ],
    editorial: [
      {
        codigo: 'IMP-006',
        indicador: 'Notas de prensa publicadas',
        frecuencia: 'Diaria',
        logrado: 142,
        observaciones: 'Despliegue prioritario en primera plana y cuerpo central'
      },
      {
        codigo: 'IMP-007',
        indicador: 'Artículos de opinión / análisis',
        frecuencia: 'Diaria',
        logrado: 38,
        observaciones: 'Columnas de especialistas, economistas e historiadores'
      },
      {
        codigo: 'IMP-008',
        indicador: 'Entrevistas publicadas',
        frecuencia: 'Diaria',
        logrado: 24,
        observaciones: 'Vocerías comunitarias y autoridades de protección civil'
      },
      {
        codigo: 'IMP-009',
        indicador: 'Contenido sobre contingencia sísmica',
        frecuencia: 'Diaria',
        logrado: 31,
        observaciones: 'Guías preventivas de evacuación y líneas de emergencia Funvisis'
      },
      {
        codigo: 'IMP-010',
        indicador: 'Contenido de interés público / comunitario',
        frecuencia: 'Diaria',
        logrado: 65,
        observaciones: 'Servicios públicos, jornadas de salud y distribución CLAP'
      },
      {
        codigo: 'IMP-011',
        indicador: 'Infografías y material visual impreso',
        frecuencia: 'Semanal',
        logrado: 18,
        observaciones: 'Mapas de rutas seguras e infografías pedagógicas'
      },
      {
        codigo: 'IMP-012',
        indicador: 'Espacios publicitarios institucionales',
        frecuencia: 'Semanal',
        logrado: 22,
        observaciones: 'Campañas de prevención y números de atención ciudadana'
      }
    ],
    distribucion: [
      {
        codigo: 'IMP-013',
        indicador: 'Puntos de distribución activos',
        valor: 480,
        unidad: 'Número'
      },
      {
        codigo: 'IMP-014',
        indicador: 'Municipios con cobertura física',
        valor: 263,
        totalRef: 335,
        unidad: '%'
      },
      {
        codigo: 'IMP-015',
        indicador: 'Rutas de distribución afectadas',
        valor: 6,
        unidad: 'Número'
      },
      {
        codigo: 'IMP-016',
        indicador: 'Personal de distribución desplegado',
        valor: 185,
        unidad: 'Número'
      },
      {
        codigo: 'IMP-017',
        indicador: 'Unidades de transporte operativas',
        valor: 38,
        totalRef: 42,
        unidad: '%'
      }
    ]
  },

  // 1.B RADIOS, EMISORAS AM Y FM
  radios: {
    alcance: [
      {
        codigo: 'RAD-001',
        indicador: 'Horas de transmisión totales',
        frecuencia: 'Diaria',
        metaSemanal: 168,
        logrado: 166.5,
        varSemanaAnterior: 0.5
      },
      {
        codigo: 'RAD-002',
        indicador: '% de operatividad de señal',
        frecuencia: 'Diaria',
        metaSemanal: 98.0,
        logrado: 97.4,
        varSemanaAnterior: 1.2
      },
      {
        codigo: 'RAD-003',
        indicador: 'Cobertura geográfica (municipios)',
        frecuencia: 'Semanal',
        metaSemanal: 310,
        logrado: 304,
        varSemanaAnterior: 2.0
      },
      {
        codigo: 'RAD-004',
        indicador: 'Audiencia estimada (rating)',
        frecuencia: 'Semanal',
        metaSemanal: 42.0,
        logrado: 44.8,
        varSemanaAnterior: 4.6
      },
      {
        codigo: 'RAD-005',
        indicador: '% de señal disponible en zonas afectadas',
        frecuencia: 'Diaria',
        metaSemanal: 95.0,
        logrado: 93.8,
        varSemanaAnterior: 3.1
      }
    ],
    produccion: [
      {
        codigo: 'RAD-006',
        indicador: 'Programas en vivo producidos',
        frecuencia: 'Diaria',
        logrado: 48,
        observaciones: 'Cobertura continua en circuitos AM/FM y streaming'
      },
      {
        codigo: 'RAD-007',
        indicador: 'Horas de programación propia',
        frecuencia: 'Semanal',
        logrado: 118,
        observaciones: 'Producción nacional independiente y contenidos propios'
      },
      {
        codigo: 'RAD-008',
        indicador: 'Boletines informativos emitidos',
        frecuencia: 'Diaria',
        logrado: 96,
        observaciones: 'Resumen cada 30 minutos con reportes de corresponsales'
      },
      {
        codigo: 'RAD-009',
        indicador: 'Microprogramas de contingencia',
        frecuencia: 'Diaria',
        logrado: 64,
        observaciones: 'Cápsulas de 60 segundos sobre medidas preventivas'
      },
      {
        codigo: 'RAD-010',
        indicador: 'Entrevistas realizadas',
        frecuencia: 'Diaria',
        logrado: 36,
        observaciones: 'Voceros ministeriales, comunales y científicos'
      },
      {
        codigo: 'RAD-011',
        indicador: 'Reportes en vivo desde campo',
        frecuencia: 'Diaria',
        logrado: 82,
        observaciones: 'Unidades móviles desplegadas en estados priorizados'
      },
      {
        codigo: 'RAD-012',
        indicador: 'Contenido digitalizado para redes',
        frecuencia: 'Diaria',
        logrado: 115,
        observaciones: 'Cortes en audio para Telegram, X y podcasts en Spotify'
      },
      {
        codigo: 'RAD-013',
        indicador: 'Espacios participativos / comunitarios',
        frecuencia: 'Semanal',
        logrado: 28,
        observaciones: 'Micrófono abierto con comités de comunicación popular'
      }
    ],
    desgloseTematico: [
      {
        tematica: 'Informativo/Noticias',
        numProgramas: 24,
        horasTransmision: 48.0,
        audienciaEstimada: 1250000
      },
      {
        tematica: 'Contingencia Sísmica',
        numProgramas: 12,
        horasTransmision: 18.5,
        audienciaEstimada: 980000
      },
      {
        tematica: 'Salud y Bienestar',
        numProgramas: 8,
        horasTransmision: 12.0,
        audienciaEstimada: 540000
      },
      {
        tematica: 'Cultural/Educativo',
        numProgramas: 14,
        horasTransmision: 28.0,
        audienciaEstimada: 620000
      },
      {
        tematica: 'Comunitario/Participativo',
        numProgramas: 16,
        horasTransmision: 24.0,
        audienciaEstimada: 710000
      },
      {
        tematica: 'Deportivo',
        numProgramas: 6,
        horasTransmision: 12.0,
        audienciaEstimada: 430000
      },
      {
        tematica: 'Musical/Entretenimiento',
        numProgramas: 18,
        horasTransmision: 24.0,
        audienciaEstimada: 850000
      }
    ],
    infraestructura: [
      {
        codigo: 'RAD-014',
        indicador: 'Transmisores operativos',
        valor: 82,
        totalRef: 88,
        unidad: '%',
        observaciones: '6 transmisores en mantenimiento preventivo de válvulas'
      },
      {
        codigo: 'RAD-015',
        indicador: '% de potencia de transmisión',
        valor: 94.5,
        unidad: '%',
        observaciones: 'Potencia nominal estable en repetidores principales'
      },
      {
        codigo: 'RAD-016',
        indicador: 'Plantas de emergencia operativas',
        valor: 74,
        totalRef: 76,
        unidad: '%',
        observaciones: 'Autonomía de combustible diésel de 72 horas continuas'
      },
      {
        codigo: 'RAD-017',
        indicador: 'Estaciones remotas afectadas',
        valor: 3,
        observaciones: 'Estaciones en Táchira y Mérida con suministro intermitente'
      },
      {
        codigo: 'RAD-018',
        indicador: 'Tiempo promedio de caída de señal (min)',
        valor: 14.2,
        observaciones: 'Resuelto mediante transferencia automática a generador'
      }
    ]
  },

  // 1.C MEDIOS AUDIOVISUALES
  audiovisuales: {
    alcance: [
      {
        codigo: 'TV-001',
        indicador: 'Horas de transmisión totales',
        frecuencia: 'Diaria',
        metaSemanal: 168,
        logrado: 168,
        varSemanaAnterior: 0.0
      },
      {
        codigo: 'TV-002',
        indicador: '% de operatividad de señal',
        frecuencia: 'Diaria',
        metaSemanal: 99.0,
        logrado: 98.6,
        varSemanaAnterior: 0.8
      },
      {
        codigo: 'TV-003',
        indicador: 'Cobertura nacional (%)',
        frecuencia: 'Semanal',
        metaSemanal: 92.0,
        logrado: 91.2,
        varSemanaAnterior: 1.5
      },
      {
        codigo: 'TV-004',
        indicador: '% de señal TDA operativa',
        frecuencia: 'Diaria',
        metaSemanal: 94.0,
        logrado: 93.5,
        varSemanaAnterior: 2.1
      },
      {
        codigo: 'TV-005',
        indicador: 'Canales satelitales activos',
        frecuencia: 'Diaria',
        metaSemanal: 8,
        logrado: 8,
        varSemanaAnterior: 0.0
      }
    ],
    produccion: [
      {
        codigo: 'TV-006',
        indicador: 'Programas producidos',
        frecuencia: 'Semanal',
        logrado: 42,
        observaciones: 'Parrilla informativa, magazines matutinos y opinión'
      },
      {
        codigo: 'TV-007',
        indicador: 'Horas de programación propia',
        frecuencia: 'Semanal',
        logrado: 126,
        observaciones: '75% de la parrilla total de transmisión semanal'
      },
      {
        codigo: 'TV-008',
        indicador: 'Pases en vivo desde campo',
        frecuencia: 'Diaria',
        logrado: 68,
        observaciones: 'Despliegue con mochilas LiveU y enlaces satelitales DSNG'
      },
      {
        codigo: 'TV-009',
        indicador: 'Coberturas especiales',
        frecuencia: 'Diaria',
        logrado: 19,
        observaciones: 'Transmisiones presidenciales, diplomáticas y comunitarias'
      },
      {
        codigo: 'TV-010',
        indicador: 'Reportajes especiales',
        frecuencia: 'Semanal',
        logrado: 14,
        observaciones: 'Investigaciones de impacto económico y social'
      },
      {
        codigo: 'TV-011',
        indicador: 'Contenido de contingencia',
        frecuencia: 'Diaria',
        logrado: 26,
        observaciones: 'Micros de cultura sísmica y autoprotección ciudadana'
      },
      {
        codigo: 'TV-012',
        indicador: 'Espacios de coproducción',
        frecuencia: 'Semanal',
        logrado: 8,
        observaciones: 'Alianzas con Villa del Cine, TVES y TELESUR'
      },
      {
        codigo: 'TV-013',
        indicador: 'Material de archivo catalogado',
        frecuencia: 'Semanal',
        logrado: 154,
        observaciones: 'Digitalización patrimonial en formato broadcast HD'
      }
    ],
    desgloseProduccion: [
      {
        tipoContenido: 'Informativo/Noticiero',
        numPiezas: 35,
        duracionTotalHoras: 52.5,
        porcentajeParrilla: 31.2
      },
      {
        tipoContenido: 'Documental/Reportaje',
        numPiezas: 12,
        duracionTotalHoras: 18.0,
        porcentajeParrilla: 10.7
      },
      {
        tipoContenido: 'Cobertura de Contingencia',
        numPiezas: 18,
        duracionTotalHoras: 14.5,
        porcentajeParrilla: 8.6
      },
      {
        tipoContenido: 'Cultural/Educativo',
        numPiezas: 22,
        duracionTotalHoras: 33.0,
        porcentajeParrilla: 19.6
      },
      {
        tipoContenido: 'Entretenimiento',
        numPiezas: 15,
        duracionTotalHoras: 22.5,
        porcentajeParrilla: 13.4
      },
      {
        tipoContenido: 'Campaña Institucional',
        numPiezas: 28,
        duracionTotalHoras: 12.0,
        porcentajeParrilla: 7.1
      },
      {
        tipoContenido: 'Comunitario/Alternativo',
        numPiezas: 16,
        duracionTotalHoras: 15.5,
        porcentajeParrilla: 9.2
      }
    ],
    logistica: [
      {
        codigo: 'TV-014',
        indicador: 'Unidades móviles de producción operativas',
        valor: 9,
        totalRef: 10,
        observaciones: '8 unidades HD operativas + 1 unidad DSNG satelital'
      },
      {
        codigo: 'TV-015',
        indicador: 'Cámaras de producción disponibles',
        valor: 48,
        totalRef: 52,
        observaciones: 'Cámaras de estudio 4K y kits portátiles ENG'
      },
      {
        codigo: 'TV-016',
        indicador: 'Equipos de edición operativos',
        valor: 24,
        totalRef: 26,
        observaciones: 'Suites de edición no lineal conectadas a SAN'
      },
      {
        codigo: 'TV-017',
        indicador: 'Plantas de emergencia',
        valor: 8,
        totalRef: 8,
        observaciones: '100% de redundancia eléctrica operativa en sede central'
      },
      {
        codigo: 'TV-018',
        indicador: 'Personal técnico disponible',
        valor: 215,
        totalRef: 230,
        observaciones: 'Camarógrafos, operadores de máster, sonidistas y directores'
      },
      {
        codigo: 'TV-019',
        indicador: 'Personal en campo (producción)',
        valor: 84,
        observaciones: 'Periodistas, reporteros gráficos y productores'
      }
    ]
  },

  // 1.D MEDIOS DIGITALES
  digitales: {
    portales: [
      {
        codigo: 'WEB-001',
        indicador: 'Visitas totales al portal web',
        frecuencia: 'Diaria',
        metaSemanal: 1200000,
        logrado: 1340000,
        varSemanaAnterior: 11.6
      },
      {
        codigo: 'WEB-002',
        indicador: 'Usuarios únicos (visitantes)',
        frecuencia: 'Diaria',
        metaSemanal: 650000,
        logrado: 710000,
        varSemanaAnterior: 9.2
      },
      {
        codigo: 'WEB-003',
        indicador: 'Páginas vistas',
        frecuencia: 'Diaria',
        metaSemanal: 3500000,
        logrado: 3820000,
        varSemanaAnterior: 9.1
      },
      {
        codigo: 'WEB-004',
        indicador: 'Tiempo promedio de sesión (min)',
        frecuencia: 'Diaria',
        metaSemanal: 3.5,
        logrado: 3.8,
        varSemanaAnterior: 8.5
      },
      {
        codigo: 'WEB-005',
        indicador: 'Tasa de rebote (%)',
        frecuencia: 'Diaria',
        metaSemanal: 45.0,
        logrado: 42.1,
        varSemanaAnterior: -6.4
      },
      {
        codigo: 'WEB-006',
        indicador: 'Contenidos publicados (artículos)',
        frecuencia: 'Diaria',
        metaSemanal: 450,
        logrado: 485,
        varSemanaAnterior: 7.7
      },
      {
        codigo: 'WEB-007',
        indicador: 'Contenido multimedia publicado',
        frecuencia: 'Diaria',
        metaSemanal: 180,
        logrado: 210,
        varSemanaAnterior: 16.6
      }
    ],
    contenidoTematico: [
      {
        categoria: 'Noticias Generales',
        articulosPublicados: 165,
        visitasGeneradas: 580000,
        tiempoPromedioMin: 3.4
      },
      {
        categoria: 'Contingencia Sísmica',
        articulosPublicados: 48,
        visitasGeneradas: 290000,
        tiempoPromedioMin: 4.8
      },
      {
        categoria: 'Institucional/MPPCI',
        articulosPublicados: 72,
        visitasGeneradas: 185000,
        tiempoPromedioMin: 2.9
      },
      {
        categoria: 'Cultura y Comunidad',
        articulosPublicados: 64,
        visitasGeneradas: 140000,
        tiempoPromedioMin: 3.6
      },
      {
        categoria: 'Salud y Bienestar',
        articulosPublicados: 42,
        visitasGeneradas: 95000,
        tiempoPromedioMin: 4.1
      },
      {
        categoria: 'Educativo/Formativo',
        articulosPublicados: 38,
        visitasGeneradas: 110000,
        tiempoPromedioMin: 4.5
      },
      {
        categoria: 'Multimedia/Galerías',
        articulosPublicados: 56,
        visitasGeneradas: 240000,
        tiempoPromedioMin: 3.2
      }
    ],
    suscripciones: [
      {
        codigo: 'WEB-008',
        indicador: 'Boletines suscritos',
        valor: 45200,
        observaciones: 'Base activa con tasa de apertura del 28.4%'
      },
      {
        codigo: 'WEB-009',
        indicador: 'Usuarios registrados',
        valor: 89400,
        observaciones: 'Usuarios verificados en plataforma de servicios'
      },
      {
        codigo: 'WEB-010',
        indicador: 'Notificaciones push enviadas',
        valor: 1420000,
        observaciones: 'Alertas informativas prioritarias y de última hora'
      },
      {
        codigo: 'WEB-011',
        indicador: 'Clics en boletines informativos',
        valor: 34800,
        observaciones: 'Tráfico derivado hacia portal web principal'
      },
      {
        codigo: 'WEB-012',
        indicador: 'Nuevos suscriptores (semana)',
        valor: 1850,
        observaciones: 'Crecimiento semanal neto del 4.2%'
      }
    ],
    tramitesServicios: [
      {
        codigo: 'WEB-013',
        indicador: 'Trámites digitales disponibles',
        valor: 12,
        totalRef: 12,
        observaciones: '100% de ventanilla única digital disponible 24/7'
      },
      {
        codigo: 'WEB-014',
        indicador: 'Solicitudes de acreditación (SIVERIF)',
        valor: 84,
        observaciones: 'Periodistas y medios internacionales acreditados'
      },
      {
        codigo: 'WEB-015',
        indicador: 'Registros PNI (productores independientes)',
        valor: 36,
        observaciones: 'Certificaciones emitidas con firma electrónica'
      },
      {
        codigo: 'WEB-016',
        indicador: 'Visas/permisos tramitados',
        valor: 22,
        observaciones: 'En articulación con Cancillería y SAIME'
      },
      {
        codigo: 'WEB-017',
        indicador: 'Solicitudes de acceso a la información',
        valor: 45,
        observaciones: 'Atención a solicitudes ciudadanas y de investigadores'
      },
      {
        codigo: 'WEB-018',
        indicador: 'Tasa de respuesta a solicitudes',
        valor: 96.5,
        unidad: '%',
        observaciones: 'Tiempo promedio de atención menor a 48 horas'
      }
    ]
  },

  // 1.E REDES SOCIALES
  redesSociales: {
    kpisCanales: [
      {
        plataforma: 'Facebook',
        metaSemanalVistas: 450000,
        vistasLogradas: 485000,
        varSemanaAnterior: 7.7,
        interaccionesTotales: 34200,
        impresionesNetas: 620000,
        tasaEngagement: 7.05
      },
      {
        plataforma: 'Instagram',
        metaSemanalVistas: 650000,
        vistasLogradas: 720000,
        varSemanaAnterior: 10.7,
        interaccionesTotales: 68400,
        impresionesNetas: 950000,
        tasaEngagement: 9.50
      },
      {
        plataforma: 'TikTok',
        metaSemanalVistas: 900000,
        vistasLogradas: 1120000,
        varSemanaAnterior: 24.4,
        interaccionesTotales: 135000,
        impresionesNetas: 1450000,
        tasaEngagement: 12.05
      },
      {
        plataforma: 'X (Twitter)',
        metaSemanalVistas: 550000,
        vistasLogradas: 580000,
        varSemanaAnterior: 5.4,
        interaccionesTotales: 49300,
        impresionesNetas: 820000,
        tasaEngagement: 8.50
      },
      {
        plataforma: 'YouTube',
        metaSemanalVistas: 350000,
        vistasLogradas: 390000,
        varSemanaAnterior: 11.4,
        interaccionesTotales: 29250,
        impresionesNetas: 510000,
        tasaEngagement: 7.50
      },
      {
        plataforma: 'Threads',
        metaSemanalVistas: 120000,
        vistasLogradas: 135000,
        varSemanaAnterior: 12.5,
        interaccionesTotales: 9450,
        impresionesNetas: 175000,
        tasaEngagement: 7.00
      },
      {
        plataforma: 'WhatsApp / Telegram',
        metaSemanalVistas: 280000,
        vistasLogradas: 310000,
        varSemanaAnterior: 10.7,
        interaccionesTotales: 27900,
        impresionesNetas: 380000,
        tasaEngagement: 9.00
      }
    ],
    alcanceAudiencia: [
      {
        plataforma: 'Facebook',
        seguidoresTotales: 850000,
        nuevosSeguidores: 4200,
        crecimientoPorc: 0.5,
        alcanceOrganico: 390000,
        alcancePagado: 95000
      },
      {
        plataforma: 'Instagram',
        seguidoresTotales: 1200000,
        nuevosSeguidores: 14500,
        crecimientoPorc: 1.2,
        alcanceOrganico: 580000,
        alcancePagado: 140000
      },
      {
        plataforma: 'TikTok',
        seguidoresTotales: 980000,
        nuevosSeguidores: 28400,
        crecimientoPorc: 2.9,
        alcanceOrganico: 950000,
        alcancePagado: 170000
      },
      {
        plataforma: 'X (Twitter)',
        seguidoresTotales: 1450000,
        nuevosSeguidores: 8200,
        crecimientoPorc: 0.6,
        alcanceOrganico: 510000,
        alcancePagado: 70000
      },
      {
        plataforma: 'YouTube',
        seguidoresTotales: 420000,
        nuevosSeguidores: 5600,
        crecimientoPorc: 1.3,
        alcanceOrganico: 340000,
        alcancePagado: 50000
      },
      {
        plataforma: 'Threads',
        seguidoresTotales: 110000,
        nuevosSeguidores: 3800,
        crecimientoPorc: 3.5,
        alcanceOrganico: 115000,
        alcancePagado: 20000
      },
      {
        plataforma: 'WhatsApp / Telegram',
        seguidoresTotales: 340000,
        nuevosSeguidores: 12100,
        crecimientoPorc: 3.6,
        alcanceOrganico: 310000,
        alcancePagado: 0
      }
    ],
    produccionTactica: [
      {
        codigo: 'RED-001',
        tipoContenido: 'Contenido total publicado',
        unidades: 845,
        observaciones: 'Volumen total consolidado en todas las cuentas oficiales'
      },
      {
        codigo: 'RED-002',
        tipoContenido: 'Formato video (Reels/TikTok/Shorts)',
        unidades: 260,
        observaciones: 'Formatos verticales optimizados para alta retención'
      },
      {
        codigo: 'RED-003',
        tipoContenido: 'Formato publicación (imagen/texto)',
        unidades: 310,
        observaciones: 'Notas de prensa y comunicados con artes gráficos'
      },
      {
        codigo: 'RED-004',
        tipoContenido: 'Formato estático (Infografías, flyers, carruseles)',
        unidades: 140,
        observaciones: 'Carruseles educativos sobre contingencia y servicios'
      },
      {
        codigo: 'RED-005',
        tipoContenido: 'Contenido radial digitalizado',
        unidades: 65,
        observaciones: 'Cortes en onda sonora de programas de RNV y YVKE'
      },
      {
        codigo: 'RED-006',
        tipoContenido: 'Pases en vivo',
        unidades: 38,
        observaciones: 'Transmisiones en vivo por YouTube, TikTok y X'
      },
      {
        codigo: 'RED-007',
        tipoContenido: 'Producción propia',
        unidades: 620,
        observaciones: '73.3% generado internamente por equipos del SNMP'
      },
      {
        codigo: 'RED-008',
        tipoContenido: 'Cobertura en campamentos transitorios',
        unidades: 24,
        observaciones: 'Monitoreo humanitario y atención médica integral'
      },
      {
        codigo: 'RED-009',
        tipoContenido: 'Cobertura en operaciones de rescate',
        unidades: 18,
        observaciones: 'Despliegue conjunto con FANB y Protección Civil'
      },
      {
        codigo: 'RED-010',
        tipoContenido: 'Piezas pautadas (Ley Resorte)',
        unidades: 42,
        observaciones: 'Difusión de mensajes cívicos y prevención de desastres'
      },
      {
        codigo: 'RED-011',
        tipoContenido: 'Investigaciones especiales',
        unidades: 12,
        observaciones: 'Verificación de hechos y combate a la desinformación'
      }
    ],
    entrevistas: [
      {
        tipoEntrevistado: 'Sobrevivientes',
        numEntrevistas: 14,
        plataformaPrincipal: 'TikTok / Instagram',
        alcanceEstimado: 420000
      },
      {
        tipoEntrevistado: 'Autoridades/Militares',
        numEntrevistas: 26,
        plataformaPrincipal: 'YouTube / X',
        alcanceEstimado: 890000
      },
      {
        tipoEntrevistado: 'Especialistas/Psicólogos',
        numEntrevistas: 18,
        plataformaPrincipal: 'Instagram / WhatsApp',
        alcanceEstimado: 340000
      },
      {
        tipoEntrevistado: 'Ingenieros/Estructuristas',
        numEntrevistas: 12,
        plataformaPrincipal: 'YouTube / X',
        alcanceEstimado: 280000
      },
      {
        tipoEntrevistado: 'Geólogos/Sismólogos',
        numEntrevistas: 15,
        plataformaPrincipal: 'YouTube / Podcasts',
        alcanceEstimado: 510000
      },
      {
        tipoEntrevistado: 'Epidemiólogos/Salud',
        numEntrevistas: 16,
        plataformaPrincipal: 'Instagram / TikTok',
        alcanceEstimado: 460000
      },
      {
        tipoEntrevistado: 'Voceros Comunitarios',
        numEntrevistas: 32,
        plataformaPrincipal: 'Facebook / Telegram',
        alcanceEstimado: 630000
      }
    ],
    creadoresAliados: [
      {
        codigo: 'RED-012',
        indicador: 'Creadores activos',
        valor: 45,
        observaciones: 'Influencers y comunicadores digitales en red articulada'
      },
      {
        codigo: 'RED-013',
        indicador: 'Vistas generadas por difusión en redes aliadas',
        valor: 1850000,
        observaciones: 'Multiplicación orgánica mediante co-publicaciones'
      },
      {
        codigo: 'RED-014',
        indicador: 'Articulación con medios privados',
        valor: 16,
        observaciones: 'Compartición de feeds de video institucional limpio'
      },
      {
        codigo: 'RED-015',
        indicador: 'Campañas colaborativas',
        valor: 8,
        observaciones: 'Campañas #PrevencionEsVida y #VenezuelaUnida'
      },
      {
        codigo: 'RED-016',
        indicador: 'Hashtags monitorizados',
        valor: 34,
        observaciones: 'Monitoreo de tendencias y detección de matrices falsas'
      }
    ],
    canalesActivos: [
      {
        canalCuenta: '@Mippcivzla',
        plataforma: 'X (Twitter)',
        seguidores: 1450000,
        crecimientoPorc: 0.6,
        contenidoDestacado: 'Minuto a minuto de medidas gubernamentales'
      },
      {
        canalCuenta: '@MippciOficial',
        plataforma: 'Instagram',
        seguidores: 1200000,
        crecimientoPorc: 1.2,
        contenidoDestacado: 'Reels explicativos y carruseles de prevención'
      },
      {
        canalCuenta: '@MippciTik',
        plataforma: 'TikTok',
        seguidores: 980000,
        crecimientoPorc: 2.9,
        contenidoDestacado: 'Videos virales de recomendaciones ciudadanas'
      },
      {
        canalCuenta: 'MIPPCI Canal Oficial',
        plataforma: 'YouTube',
        seguidores: 420000,
        crecimientoPorc: 1.3,
        contenidoDestacado: 'Transmisiones en vivo HD y ruedas de prensa'
      },
      {
        canalCuenta: 'MIPPCI Informa',
        plataforma: 'Telegram',
        seguidores: 340000,
        crecimientoPorc: 3.6,
        contenidoDestacado: 'Alertas en tiempo real y descarga de infografías'
      }
    ],
    engagementPorContenido: [
      {
        tipoContenido: 'Video Corto',
        publicaciones: 260,
        interacciones: 185000,
        comentarios: 18400,
        compartidos: 32500,
        guardados: 24100,
        eePromedio: 12.8
      },
      {
        tipoContenido: 'Video Largo',
        publicaciones: 45,
        interacciones: 32000,
        comentarios: 3800,
        compartidos: 5900,
        guardados: 4200,
        eePromedio: 8.2
      },
      {
        tipoContenido: 'Imagen/Foto',
        publicaciones: 220,
        interacciones: 48000,
        comentarios: 5200,
        compartidos: 8100,
        guardados: 6900,
        eePromedio: 6.9
      },
      {
        tipoContenido: 'Infografía',
        publicaciones: 90,
        interacciones: 39000,
        comentarios: 4100,
        compartidos: 14200,
        guardados: 16800,
        eePromedio: 9.8
      },
      {
        tipoContenido: 'Carrusel',
        publicaciones: 50,
        interacciones: 28500,
        comentarios: 3600,
        compartidos: 7400,
        guardados: 11200,
        eePromedio: 10.4
      },
      {
        tipoContenido: 'Enlace/Artículo',
        publicaciones: 140,
        interacciones: 14200,
        comentarios: 1800,
        compartidos: 3900,
        guardados: 1500,
        eePromedio: 4.8
      },
      {
        tipoContenido: 'Encuesta/Interacción',
        publicaciones: 40,
        interacciones: 35000,
        comentarios: 6800,
        compartidos: 2100,
        guardados: 950,
        eePromedio: 14.5
      }
    ]
  }
};
