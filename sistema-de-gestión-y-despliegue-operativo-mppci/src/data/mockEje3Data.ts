import { Eje3InstrumentoData } from '../types/eje3Types';

export const INITIAL_EJE3_DATA: Eje3InstrumentoData = {
  narrativaMonitoreo: {
    // Monitoreo de Medios y Matrices de Opinión (MON-001 al MON-008)
    // Regla: Indicador primero, luego Código
    monitoreoMedios: [
      {
        indicador: 'Alertas de Matrices Procesadas (Rumores/Noticias Falsas)',
        codigo: 'MON-001',
        valor: 48,
        observaciones: '42 neutralizadas de forma inmediata en las primeras 4 horas'
      },
      {
        indicador: 'Informes de Narrativa Emitidos',
        codigo: 'MON-002',
        valor: 14,
        observaciones: 'Reportes diarios matutinos y vespertinos a Sala Situacional'
      },
      {
        indicador: 'Reportes de Primeras Planas (Nacional)',
        codigo: 'MON-003',
        valor: 21,
        observaciones: 'Cobertura de 15 diarios de circulación nacional y regional'
      },
      {
        indicador: 'Reportes de Primeras Planas (Regional)',
        codigo: 'MON-004',
        valor: 35,
        observaciones: 'Monitoreo de prensa estadal en 18 entidades federales'
      },
      {
        indicador: 'Reportes de Primeras Planas (Internacional)',
        codigo: 'MON-005',
        valor: 28,
        observaciones: 'Seguimiento a agencias internacionales (EFE, Reuters, AP, RT, Xinhua)'
      },
      {
        indicador: 'Resúmenes de Vocerías Oficiales',
        codigo: 'MON-006',
        valor: 18,
        observaciones: 'Síntesis ejecutiva de alocuciones presidenciales y ministeriales'
      },
      {
        indicador: 'Narrativas y contranarrativas desarrolladas',
        codigo: 'MON-007',
        valor: 32,
        observaciones: 'Matrices positivas y argumentarios de defensa desplegados'
      },
      {
        indicador: 'Alertas diarias promedio procesadas',
        codigo: 'MON-008',
        valor: 6.8,
        observaciones: 'Promedio calculado sobre 7 días continuos de monitoreo'
      }
    ],

    // Desglose de Alertas por Temática
    desgloseAlertas: [
      {
        tematica: 'Desinformación sobre sismo',
        numAlertas: 8,
        porcentajeTotal: 16.7,
        accionesContrarrestacion: 'Despliegue de comunicados técnicos de FUNVISIS y vocería de Protección Civil'
      },
      {
        tematica: 'Rumores de seguridad',
        numAlertas: 12,
        porcentajeTotal: 25.0,
        accionesContrarrestacion: 'Reportes oficiales con cuerpos de seguridad y testimonios en territorio'
      },
      {
        tematica: 'Desinformación sobre servicios',
        numAlertas: 10,
        porcentajeTotal: 20.8,
        accionesContrarrestacion: 'Transmisión de avances de restitución de agua/luz en vivo por VTV y redes'
      },
      {
        tematica: 'Fake news de salud',
        numAlertas: 6,
        porcentajeTotal: 12.5,
        accionesContrarrestacion: 'Boletín epidemiológico extraordinario y vocería médica acreditada'
      },
      {
        tematica: 'Información falsa institucional',
        numAlertas: 7,
        porcentajeTotal: 14.6,
        accionesContrarrestacion: 'Aclaratorias directas por cuentas verificadas y gaceta oficial'
      },
      {
        tematica: 'Desinformación internacional',
        numAlertas: 3,
        porcentajeTotal: 6.3,
        accionesContrarrestacion: 'Comunicados de Cancillería y posicionamiento de Telesur / agencias'
      },
      {
        tematica: 'Otras temáticas',
        numAlertas: 2,
        porcentajeTotal: 4.1,
        accionesContrarrestacion: 'Monitoreo preventivo y seguimiento comunitario'
      }
    ],

    // Producción de Contenido Escrito (GES-001 al GES-008)
    contenidoEscrito: [
      {
        indicador: 'Notas de prensa producidas',
        codigo: 'GES-001',
        valor: 385,
        observaciones: 'Generación continua en salas de redacción AVN, MinCI y entes'
      },
      {
        indicador: 'Artículos web publicados',
        codigo: 'GES-002',
        valor: 420,
        observaciones: 'Publicados en portales institucionales (VTV, AVN, Correo del Orinoco)'
      },
      {
        indicador: 'Publicaciones en red de microblogging',
        codigo: 'GES-003',
        valor: 1850,
        observaciones: 'X / Twitter oficial: mensajes con balance, citas textuales e infografías'
      },
      {
        indicador: 'Publicaciones en plataformas de hilos de texto',
        codigo: 'GES-004',
        valor: 310,
        observaciones: 'Threads / Telegram / WhatsApp Canales con resúmenes explicativos'
      },
      {
        indicador: 'Boletines informativos',
        codigo: 'GES-005',
        valor: 24,
        observaciones: 'Boletines especiales en formato digital distribuidos a listas de difusión'
      },
      {
        indicador: 'Material de comunicación institucional',
        codigo: 'GES-006',
        valor: 156,
        observaciones: 'Infografías, fichas de datos, manuales de vocería y dossiers'
      },
      {
        indicador: 'Comunicados oficiales',
        codigo: 'GES-007',
        valor: 18,
        observaciones: 'Publicaciones de carácter oficial vinculadas a medidas ejecutivas'
      },
      {
        indicador: 'Discursos / intervenciones documentadas',
        codigo: 'GES-008',
        valor: 32,
        observaciones: 'Transcripción, cotejo y archivo audiovisual de alocuciones'
      }
    ],

    // Gestión de Vocerías y Portavoces (GES-009 al GES-013)
    voceriasPortavoces: [
      {
        indicador: 'Vocerías oficiales coordinadas',
        codigo: 'GES-009',
        valor: 45,
        observaciones: 'Intervenciones en medios televisivos, radiales y transmisiones de mando'
      },
      {
        indicador: 'Ruedas de prensa realizadas',
        codigo: 'GES-010',
        valor: 14,
        observaciones: 'Convocatorias a medios públicos, privados e internacionales con sala de preguntas'
      },
      {
        indicador: 'Entrevistas a voceros coordinadas',
        codigo: 'GES-011',
        valor: 68,
        observaciones: 'Pautas concedidas en espacios informativos de alta sintonía'
      },
      {
        indicador: 'Material de apoyo para voceros',
        codigo: 'GES-012',
        valor: 52,
        observaciones: 'Argumentarios, minutas Q&A y guías temáticas entregadas a voceros'
      },
      {
        indicador: 'Capacitaciones a voceros realizadas',
        codigo: 'GES-013',
        valor: 8,
        observaciones: 'Talleres de oratoria de crisis, encuadre de mensajes y manejo ante cámaras'
      }
    ],

    // Análisis de Sentimiento y Posicionamiento (GES-014 al GES-018)
    sentimientoPosicionamiento: [
      {
        indicador: 'Índice de sentimiento positivo en medios',
        codigo: 'GES-014',
        valor: 68.5,
        varSemanaAnteriorPorc: 3.2
      },
      {
        indicador: 'Índice de sentimiento neutral',
        codigo: 'GES-015',
        valor: 21.0,
        varSemanaAnteriorPorc: -1.5
      },
      {
        indicador: 'Índice de sentimiento negativo',
        codigo: 'GES-016',
        valor: 10.5,
        varSemanaAnteriorPorc: -1.7
      },
      {
        indicador: 'Posicionamiento de agenda institucional',
        codigo: 'GES-017',
        valor: 74.2,
        varSemanaAnteriorPorc: 4.5
      },
      {
        indicador: 'Menciones en medios internacionales',
        codigo: 'GES-018',
        valor: 1240,
        varSemanaAnteriorPorc: 8.6
      }
    ],

    // Matriz de Vulnerabilidad del Talento Humano
    vulnerabilidadTalento: [
      { ente: 'TEVES', totalPersonal: 420, nivelRojo: 12, nivelAmarillo: 45, nivelVerde: 340, porEvaluar: 15, sinClasificar: 8 },
      { ente: 'Ávila TV', totalPersonal: 180, nivelRojo: 6, nivelAmarillo: 24, nivelVerde: 140, porEvaluar: 7, sinClasificar: 3 },
      { ente: 'SAINGO', totalPersonal: 310, nivelRojo: 4, nivelAmarillo: 28, nivelVerde: 265, porEvaluar: 10, sinClasificar: 3 },
      { ente: 'Radio del Sur', totalPersonal: 125, nivelRojo: 5, nivelAmarillo: 18, nivelVerde: 95, porEvaluar: 5, sinClasificar: 2 },
      { ente: 'Correo del Orinoco', totalPersonal: 160, nivelRojo: 7, nivelAmarillo: 22, nivelVerde: 122, porEvaluar: 6, sinClasificar: 3 },
      { ente: 'VTV', totalPersonal: 1450, nivelRojo: 48, nivelAmarillo: 185, nivelVerde: 1150, porEvaluar: 45, sinClasificar: 22 },
      { ente: 'RNV', totalPersonal: 580, nivelRojo: 18, nivelAmarillo: 75, nivelVerde: 455, porEvaluar: 22, sinClasificar: 10 },
      { ente: 'YVKE Mundial', totalPersonal: 210, nivelRojo: 8, nivelAmarillo: 32, nivelVerde: 158, porEvaluar: 8, sinClasificar: 4 },
      { ente: 'REDTV', totalPersonal: 390, nivelRojo: 15, nivelAmarillo: 52, nivelVerde: 305, porEvaluar: 12, sinClasificar: 6 },
      { ente: 'CONATEL', totalPersonal: 620, nivelRojo: 14, nivelAmarillo: 68, nivelVerde: 510, porEvaluar: 20, sinClasificar: 8 },
      { ente: 'MIPPCI Central', totalPersonal: 850, nivelRojo: 28, nivelAmarillo: 110, nivelVerde: 670, porEvaluar: 30, sinClasificar: 12 },
      { ente: 'Otros', totalPersonal: 240, nivelRojo: 6, nivelAmarillo: 35, nivelVerde: 185, porEvaluar: 10, sinClasificar: 4 }
    ],

    // Articulación Interinstitucional
    articulacionAlianzas: [
      {
        institucion: 'OCHA',
        tipoAlianza: 'Coordinación',
        numAccionesConjuntas: 14,
        resultados: 'Mecanismo de flujo de datos humanitarios y validación de alertas comunitarias',
        observaciones: 'Reunión bilateral semanal de coordinación activa'
      },
      {
        institucion: 'UNDRR',
        tipoAlianza: 'Técnica',
        numAccionesConjuntas: 8,
        resultados: 'Aplicación de protocolos Marco de Sendai en contenidos informativos de contingencia',
        observaciones: 'Talleres conjuntos de reducción de riesgo'
      },
      {
        institucion: 'PNUD',
        tipoAlianza: 'Desarrollo',
        numAccionesConjuntas: 6,
        resultados: 'Indicadores de resiliencia comunitaria y comunicación para el desarrollo',
        observaciones: 'Asistencia técnica en tableros de visualización'
      },
      {
        institucion: 'UNICEF',
        tipoAlianza: 'Protección',
        numAccionesConjuntas: 11,
        resultados: 'Campañas de protección a la niñez, lactancia y regreso seguro a clases',
        observaciones: 'Piezas multimedia conjuntas para radio y TV'
      },
      {
        institucion: 'WFP/FAO',
        tipoAlianza: 'Alimentación',
        numAccionesConjuntas: 9,
        resultados: 'Difusión de programas de soberanía alimentaria y comités CLAP',
        observaciones: 'Cobertura en medios comunitarios e impresos'
      },
      {
        institucion: 'OPS/OMS',
        tipoAlianza: 'Salud',
        numAccionesConjuntas: 15,
        resultados: 'Campañas de vacunación, prevención de epidemias y vocería médica',
        observaciones: 'Validación técnica previa de contenidos de salud'
      },
      {
        institucion: 'ACNUR/OIM',
        tipoAlianza: 'Protección',
        numAccionesConjuntas: 5,
        resultados: 'Plataforma comunicacional sobre plan Vuelta a la Patria',
        observaciones: 'Seguimiento a movilidad humana y reunificación'
      },
      {
        institucion: 'Gobierno Nacional',
        tipoAlianza: 'Política',
        numAccionesConjuntas: 42,
        resultados: 'Alineación de 33 ministerios a la narrativa central y cadenas conjuntas',
        observaciones: 'Consejo de Vicepresidentes y Sala Situacional Central'
      },
      {
        institucion: 'Gobiernos Regionales',
        tipoAlianza: 'Operativa',
        numAccionesConjuntas: 28,
        resultados: 'Despliegue informativo articulado con las 23 gobernaciones',
        observaciones: 'Interconexión de salas de prensa regionales'
      },
      {
        institucion: 'Alcaldías',
        tipoAlianza: 'Territorial',
        numAccionesConjuntas: 34,
        resultados: 'Cobertura en los 335 municipios para difusión hiperlocal',
        observaciones: 'Distribución capilar de boletines y perifoneo'
      },
      {
        institucion: 'Medios Privados',
        tipoAlianza: 'Comunicación',
        numAccionesConjuntas: 16,
        resultados: 'Cadena de retransmisión obligatoria y pautas informativas concertadas',
        observaciones: 'Mesa de diálogo permanente con directores de medios'
      },
      {
        institucion: 'Organizaciones Comunitarias',
        tipoAlianza: 'Participación',
        numAccionesConjuntas: 38,
        resultados: 'Red de comunicadores populares y medios comunitarios alternativos',
        observaciones: 'Replicación capilar en WhatsApp y emisoras comunitarias'
      }
    ],

    // Gestión de Cooperación Internacional
    cooperacionInternacional: [
      {
        donanteOrganismo: 'CERF',
        montoComprometidoUsd: 1500000,
        montoEjecutadoUsd: 1125000,
        porcEjecucion: 75.0,
        sector: 'Comunicaciones de Emergencia & Alertas'
      },
      {
        donanteOrganismo: 'Flash Appeal',
        montoComprometidoUsd: 800000,
        montoEjecutadoUsd: 640000,
        porcEjecucion: 80.0,
        sector: 'Respuesta Rápida & Equipamiento Móvil'
      },
      {
        donanteOrganismo: 'Banco Mundial',
        montoComprometidoUsd: 2200000,
        montoEjecutadoUsd: 1430000,
        porcEjecucion: 65.0,
        sector: 'Infraestructura Tecnológica Digital'
      },
      {
        donanteOrganismo: 'BID',
        montoComprometidoUsd: 1800000,
        montoEjecutadoUsd: 1260000,
        porcEjecucion: 70.0,
        sector: 'Modernización del Espectro Radioeléctrico'
      },
      {
        donanteOrganismo: 'CAF',
        montoComprometidoUsd: 3100000,
        montoEjecutadoUsd: 2480000,
        porcEjecucion: 80.0,
        sector: 'Red Dorsal Satelital & Torres Críticas'
      },
      {
        donanteOrganismo: 'Unión Europea',
        montoComprometidoUsd: 950000,
        montoEjecutadoUsd: 684000,
        porcEjecucion: 72.0,
        sector: 'Formación de Periodistas & Alfabetización Mediática'
      },
      {
        donanteOrganismo: 'Gobiernos Bilaterales',
        montoComprometidoUsd: 4500000,
        montoEjecutadoUsd: 3825000,
        porcEjecucion: 85.0,
        sector: 'Equipamiento de Transmisión & Red TDA'
      }
    ]
  }
};
