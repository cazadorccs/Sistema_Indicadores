import { Eje4InstrumentoData } from '../types/eje4Types';

export const INITIAL_EJE4_DATA: Eje4InstrumentoData = {
  viceministerios: {
    // ========================================================================
    // 1. DESPACHO DE COMUNICACIÓN E INFORMACIÓN
    // ========================================================================
    despachoComunicacionInformacion: {
      comunicadosOficialesNotasPrensaEmitidos: 85,
      difusionMovilPresidencia: [
        { tipoComunicacion: 'Reportes de emergencia e inspección', cantidad: 14 },
        { tipoComunicacion: 'Comunicados Oficiales', cantidad: 22 },
        { tipoComunicacion: 'Balances institucionales y de gestión', cantidad: 18 },
        { tipoComunicacion: 'Mensajes sociales y salutaciones', cantidad: 35 },
        { tipoComunicacion: 'Convocatorias y movilizaciones', cantidad: 12 },
        { tipoComunicacion: 'Alianzas económicas y sectoriales', cantidad: 9 },
        { tipoComunicacion: 'Otros', cantidad: 6 }
      ],
      tendenciasViralesDesestabilizadoras: [
        {
          origen: '1. Medios de texto: Blogs, portales de noticias y libros electrónicos',
          categoria: 'MEDIOS_DIGITALES',
          cantidadDetectado: 4,
          amenazaPalabraFraseViral: 'Manipulación de cifras macroeconómicas y desabastecimiento artificial',
          fechaHora: '2026-09-18 09:30'
        },
        {
          origen: '2. Medios de video: Plataformas de streaming y clips cortos',
          categoria: 'MEDIOS_DIGITALES',
          cantidadDetectado: 7,
          amenazaPalabraFraseViral: 'Videos sacados de contexto sobre fallas eléctricas en el interior',
          fechaHora: '2026-09-18 14:15'
        },
        {
          origen: '3. Medios de audio: Pódcasts y aplicaciones de música',
          categoria: 'MEDIOS_DIGITALES',
          cantidadDetectado: 2,
          amenazaPalabraFraseViral: 'Especulación sobre acuerdos energéticos bilaterales',
          fechaHora: '2026-09-17 18:00'
        },
        {
          origen: '4. Medios visuales: Galerías de fotos e infografías',
          categoria: 'MEDIOS_DIGITALES',
          cantidadDetectado: 5,
          amenazaPalabraFraseViral: 'Infografías apócrifas con logotipos ministeriales falsificados',
          fechaHora: '2026-09-19 11:20'
        },
        {
          origen: '5. Medios interactivos: Videojuegos y páginas web con encuestas',
          categoria: 'MEDIOS_DIGITALES',
          cantidadDetectado: 1,
          amenazaPalabraFraseViral: 'Sondeos sesgados con bots orientados a generar zozobra cambiaria',
          fechaHora: '2026-09-19 16:40'
        },
        {
          origen: '6. Facebook',
          categoria: 'REDES_SOCIALES',
          cantidadDetectado: 8,
          amenazaPalabraFraseViral: 'Campaña coordinada sobre suspensión de subsidios sociales',
          fechaHora: '2026-09-18 08:00'
        },
        {
          origen: '7. WhatsApp',
          categoria: 'REDES_SOCIALES',
          cantidadDetectado: 19,
          amenazaPalabraFraseViral: 'Audios anónimos de alarma sobre falsos operativos de combustible',
          fechaHora: '2026-09-18 12:30'
        },
        {
          origen: '8. Instagram',
          categoria: 'REDES_SOCIALES',
          cantidadDetectado: 11,
          amenazaPalabraFraseViral: 'Reels descontextualizados sobre el sistema de transporte público',
          fechaHora: '2026-09-19 10:15'
        },
        {
          origen: '9. YouTube',
          categoria: 'REDES_SOCIALES',
          cantidadDetectado: 6,
          amenazaPalabraFraseViral: 'Transmisiones en vivo con titulares clickbait desestabilizadores',
          fechaHora: '2026-09-17 21:00'
        },
        {
          origen: '10. TikTok',
          categoria: 'REDES_SOCIALES',
          cantidadDetectado: 24,
          amenazaPalabraFraseViral: 'Tendencia viral con audios clonados con IA de voceros oficiales',
          fechaHora: '2026-09-19 15:45'
        },
        {
          origen: '11. X',
          categoria: 'REDES_SOCIALES',
          cantidadDetectado: 32,
          amenazaPalabraFraseViral: 'Hashtag posicionado con granjas de bots contra la soberanía nacional',
          fechaHora: '2026-09-19 18:00'
        },
        {
          origen: '12. LinkedIn',
          categoria: 'REDES_SOCIALES',
          cantidadDetectado: 1,
          amenazaPalabraFraseViral: 'Artículos pseudotécnicos atacando la capacidad de la industria nacional',
          fechaHora: '2026-09-16 14:00'
        },
        {
          origen: '13. Otra: Canales de Telegram y Signal',
          categoria: 'REDES_SOCIALES',
          cantidadDetectado: 5,
          amenazaPalabraFraseViral: 'Difusión de PDF con supuestas gacetas oficiales adulteradas',
          fechaHora: '2026-09-18 22:10'
        }
      ],
      seoEditorial: {
        traficoOrganicoTotal: 2450000,
        impresionesBuscadores: 18750000,
        clicsBuscadores: 1820000,
        rendimientoVisitasEspontaneas: 630000,
        ctrOrganico: 9.7,
        tasaConversionSuscriptores: 4.8
      }
    },

    // ========================================================================
    // 2. DESPACHO DE GESTIÓN COMUNICACIONAL
    // ========================================================================
    despachoGestionComunicacional: {
      formacionAdaptacionTecnologica: [
        {
          nombreIndicador: 'Formación y Adaptación Tecnológica',
          codigoVariable: 'V1',
          variable: 'Número de trabajadores del SNMP capacitados en streaming, IA y formatos cortos',
          valorCapturado: 340,
          unidad: 'Número'
        },
        {
          nombreIndicador: 'Formación y Adaptación Tecnológica',
          codigoVariable: 'V2',
          variable: 'Número de Productores Nacionales Independientes (PNI) formados bajo el nuevo marco ético',
          valorCapturado: 185,
          unidad: 'Número'
        },
        {
          nombreIndicador: 'Formación y Adaptación Tecnológica',
          codigoVariable: 'V3',
          variable: 'Total de Nómina Operativa del SNMP (Dato Maestro)',
          valorCapturado: 1250,
          unidad: 'Número',
          esDatoMaestro: true
        }
      ],
      soberaniaTecnologicaTerritorio: [
        {
          nombreIndicador: 'Soberanía Tecnológica en el Territorio',
          codigoVariable: 'V1',
          variable: 'Número de Medios Alternativos, Comunitarios y Centros de Producción activos y georreferenciados',
          valorCapturado: 295,
          unidad: 'Número'
        },
        {
          nombreIndicador: 'Soberanía Tecnológica en el Territorio',
          codigoVariable: 'V2',
          variable: 'Número de solicitudes comunales de infraestructura y equipamiento comunicacional registradas',
          valorCapturado: 74,
          unidad: 'Número'
        }
      ],
      formacionPopularTransmedia: [
        {
          nombreIndicador: 'Formación Popular Transmedia',
          codigoVariable: 'V1',
          variable: 'Número de Facilitadores Comunitarios y Voceros del Poder Popular capacitados en formatos 3.0 e IA',
          valorCapturado: 512,
          unidad: 'Número'
        },
        {
          nombreIndicador: 'Formación Popular Transmedia',
          codigoVariable: 'V2',
          variable: 'Total de voceros y comunicadores comunitarios proyectados o registrados en las comunas',
          valorCapturado: 1480,
          unidad: 'Número'
        }
      ]
    },

    // ========================================================================
    // 3. VICEMINISTERIO DE PLANIFICACIÓN Y ESTRATEGIA COMUNICACIONAL
    // ========================================================================
    planificacionEstrategia: {
      ecosistemaDigital: [
        {
          plataforma: 'TikTok',
          metaSemanalVistas: 2200000,
          vistasLogradas: 2150000,
          varPorcSemanaAnterior: 33.81,
          interaccionesTotales: 76500,
          impresionesNetas: 2150000,
          engagementRateEE: 93.36
        },
        {
          plataforma: 'Instagram',
          metaSemanalVistas: 1650000,
          vistasLogradas: 1580000,
          varPorcSemanaAnterior: 31.2,
          interaccionesTotales: 58400,
          impresionesNetas: 1580000,
          engagementRateEE: 91.5
        },
        {
          plataforma: 'X',
          metaSemanalVistas: 980000,
          vistasLogradas: 920000,
          varPorcSemanaAnterior: 28.4,
          interaccionesTotales: 32100,
          impresionesNetas: 920000,
          engagementRateEE: 88.2
        },
        {
          plataforma: 'Facebook',
          metaSemanalVistas: 380000,
          vistasLogradas: 360000,
          varPorcSemanaAnterior: 15.6,
          interaccionesTotales: 11200,
          impresionesNetas: 360000,
          engagementRateEE: 85.0
        },
        {
          plataforma: 'WhatsApp',
          metaSemanalVistas: 120000,
          vistasLogradas: 115000,
          varPorcSemanaAnterior: 18.2,
          interaccionesTotales: 3100,
          impresionesNetas: 115000,
          engagementRateEE: 95.0
        },
        {
          plataforma: 'YouTube',
          metaSemanalVistas: 70000,
          vistasLogradas: 53197,
          varPorcSemanaAnterior: 12.0,
          interaccionesTotales: 1100,
          impresionesNetas: 53197,
          engagementRateEE: 82.5
        },
        {
          plataforma: 'LinkedIn',
          metaSemanalVistas: 15000,
          vistasLogradas: 12000,
          varPorcSemanaAnterior: 5.4,
          interaccionesTotales: 320,
          impresionesNetas: 12000,
          engagementRateEE: 78.0
        },
        {
          plataforma: 'Otra: Canales de Telegram / Threads',
          metaSemanalVistas: 15000,
          vistasLogradas: 11000,
          varPorcSemanaAnterior: 8.5,
          interaccionesTotales: 197,
          impresionesNetas: 11000,
          engagementRateEE: 86.4
        }
      ],
      produccionGeneral: {
        totalContenidoPublicado: 280,
        contenidoFormatoVideo: 28,
        contenidoFormatoPublicacion: 4,
        contenidoFormatoRadial: 6,
        contenidoProduccionPropia: 280
      },
      formatosDespliegue: [
        { tipoContenido: 'Formato corto (Reels, Shorts, TikTok)', cantidadUnidades: 28 },
        { tipoContenido: 'Formato largo (Reportajes, entrevistas)', cantidadUnidades: 6 },
        { tipoContenido: 'Formato estático (Infografías, flyers, carruseles)', cantidadUnidades: 4 },
        { tipoContenido: 'Pases en vivo (Streaming)', cantidadUnidades: 8 },
        { tipoContenido: 'Cobertura audiovisual en campamentos transitorios', cantidadUnidades: 4 },
        { tipoContenido: 'Cobertura audiovisual en operaciones de recuperación táctica', cantidadUnidades: 3 },
        { tipoContenido: 'Piezas producidas pautadas por Ley de Responsabilidad Social', cantidadUnidades: 12 }
      ],
      tiposAudiovisual: [
        { categoria: 'Noticias de última hora (Breaking News)', cantidadUnidades: 12 },
        { categoria: 'Reportajes y documentales', cantidadUnidades: 4 },
        { categoria: 'Entrevistas y debates', cantidadUnidades: 6 },
        { categoria: 'Contenido en vivo (Streaming)', cantidadUnidades: 8 },
        { categoria: 'Píldoras para redes (Reels/Shorts/TikTok)', cantidadUnidades: 28 }
      ],
      kpisAudiovisual: [
        {
          indicador: 'Volumen de producción',
          descripcion: 'Número total de piezas audiovisuales publicadas en el período (RED-013)',
          valorCapturado: 28,
          unidad: 'Piezas'
        },
        {
          indicador: 'Tiempo de entrega (Lead Time)',
          descripcion: 'Tiempo promedio desde que ocurre la noticia hasta que se publica el video',
          valorCapturado: 1.8,
          unidad: 'Horas'
        },
        {
          indicador: 'Costo por pieza',
          descripcion: 'Inversión total de recursos humanos y técnicos dividida entre el total de videos creados',
          valorCapturado: 38.5,
          unidad: '$/Bs'
        },
        {
          indicador: 'Tasa de aprovechamiento',
          descripcion: 'Porcentaje de material grabado que realmente se edita y publica',
          valorCapturado: 84.0,
          unidad: '%'
        }
      ],
      investigacionesEspecialesCantidad: 14,
      desgloseEntrevistas: [
        { categoria: 'Sobrevivientes', cantidad: 12 },
        { categoria: 'Autoridades/Militares', cantidad: 24 },
        { categoria: 'Especialistas/Psicólogos', cantidad: 10 },
        { categoria: 'Ingenieros', cantidad: 8 },
        { categoria: 'Geólogos', cantidad: 6 },
        { categoria: 'Epidemiólogos', cantidad: 6 },
        { categoria: 'Otros (Líderes de calle y poder popular)', cantidad: 14 }
      ],
      redCreadores: {
        numCreadoresActivos: 24,
        vistasDifusionRedesAliadas: 1840000,
        articulacionMediosPrivados: 18,
        articulacionMediosInternacionales: 8
      },
      gestionNarrativaMonitoreo: [
        { concepto: 'N° de Alertas de Matrices Procesadas (Rumores/Noticias Falsas)', cantidadUnidades: 48 },
        { concepto: 'Informes de Narrativa Emitidos', cantidadUnidades: 14 },
        { concepto: 'Reportes de Primeras Planas (Nacional, Regional e Internacional)', cantidadUnidades: 84 },
        { concepto: 'Resúmenes de Vocerías Oficiales', cantidadUnidades: 18 },
        { concepto: 'Narrativas y contranarrativas', cantidadUnidades: 32 }
      ],
      contenidoEscrito: {
        notasPrensaArticulosWeb: 248,
        publicacionesMicroblogging: 32,
        publicacionesHilosTexto: 8
      },
      trendingTopics: [
        { posicion: 1, tema: '#VenezuelaSoberanaYSolidaria', alcanceMenciones: 145000, sentimiento: 'POSITIVO' },
        { posicion: 2, tema: '#RecuperacionEconomica2026', alcanceMenciones: 98000, sentimiento: 'POSITIVO' },
        { posicion: 3, tema: '#1x10DelBuenGobierno', alcanceMenciones: 84000, sentimiento: 'POSITIVO' },
        { posicion: 4, tema: '#PoderPopularActivo', alcanceMenciones: 62000, sentimiento: 'POSITIVO' },
        { posicion: 5, tema: '#AlertaDesinformacion', alcanceMenciones: 55000, sentimiento: 'NEUTRO' },
        { posicion: 6, tema: '#PazYEstabilidadSocial', alcanceMenciones: 48000, sentimiento: 'POSITIVO' },
        { posicion: 7, tema: '#GranMisionVivaVenezuela', alcanceMenciones: 42000, sentimiento: 'POSITIVO' },
        { posicion: 8, tema: '#BricomilesEnAccion', alcanceMenciones: 38000, sentimiento: 'POSITIVO' },
        { posicion: 9, tema: '#ProduccionNacionalActiva', alcanceMenciones: 31000, sentimiento: 'POSITIVO' },
        { posicion: 10, tema: '#VenceremosLaGuerraCognitiva', alcanceMenciones: 27000, sentimiento: 'POSITIVO' }
      ]
    },

    // ========================================================================
    // 4. VICEMINISTERIO DE SOPORTE DE PLATAFORMA COMUNICACIONAL
    // ========================================================================
    soportePlataforma: {
      mediosComunitariosTransmisores: [
        {
          indicador: 'Medios Alternativos y Comunitarios Activos',
          codigoVariable: 'V1',
          variable: 'Número de Medios Alternativos y Comunitarios (MAC) que se encuentran en operación activa',
          valorCapturado: 295,
          unidad: 'Número',
          observaciones: 'Monitoreo de emisoras comunitarias e impresos locales con señal activa'
        },
        {
          indicador: 'Transmisores Operativos',
          codigoVariable: 'V2',
          variable: 'Número de transmisores de radio y televisión que operan sin fallas críticas que afecten su señal',
          valorCapturado: 512,
          unidad: 'Número',
          observaciones: 'Telemetría integrada REDTV y estaciones repetidoras'
        },
        {
          indicador: 'Total de Transmisores Instalados',
          codigoVariable: 'V3',
          variable: 'Total de transmisores de radio y televisión instalados en el país (DATO MAESTRO)',
          valorCapturado: 620,
          unidad: 'Número',
          observaciones: 'Censo técnico nacional de infraestructura de transmisión',
          esDatoMaestro: true
        }
      ],
      coberturaTerritorialIctm: [
        {
          indicador: 'Cobertura de Medios Públicos',
          codigoVariable: 'V1',
          variable: 'Superficie del territorio nacional (en km²) que cuenta con cobertura efectiva de medios públicos',
          valorCapturado: 712500,
          unidad: 'km²',
          observaciones: 'Cobertura electromagnética TDA, FM pública y enlaces satelitales'
        },
        {
          indicador: 'Cobertura de Medios Privados y Comunitarios',
          codigoVariable: 'V2',
          variable: 'Superficie del territorio nacional (en km²) que cuenta con cobertura efectiva de medios privados y comunitarios',
          valorCapturado: 685000,
          unidad: 'km²',
          observaciones: 'Concesiones habilitadas por CONATEL en bandas AM, FM y TV'
        },
        {
          indicador: 'Extensión Territorial Total',
          codigoVariable: 'V3',
          variable: 'Extensión territorial total del país (DATO MAESTRO)',
          valorCapturado: 916445,
          unidad: 'km²',
          observaciones: 'Dato geográfico oficial de la República Bolivariana de Venezuela',
          esDatoMaestro: true
        }
      ],
      hogaresInternetThai: [
        {
          indicador: 'Hogares con Internet Activo',
          codigoVariable: 'V1',
          variable: 'Número total de hogares registrados con un contrato de servicio de Internet activo (fijo o móvil)',
          valorCapturado: 5420000,
          unidad: 'Número',
          observaciones: 'Datos consolidados de CANTV, Movilnet y prestadores privados'
        },
        {
          indicador: 'Universo de Hogares',
          codigoVariable: 'V2',
          variable: 'Número total de hogares en el territorio nacional (DATO MAESTRO)',
          valorCapturado: 7850000,
          unidad: 'Número',
          observaciones: 'Censo y proyecciones del Instituto Nacional de Estadística (INE)',
          esDatoMaestro: true
        }
      ],
      bandaAnchaMovilTpbam: [
        {
          indicador: 'Líneas con Banda Ancha Móvil',
          codigoVariable: 'V1',
          variable: 'Total de líneas de telefonía móvil activas que tienen contratado un plan de datos de banda ancha',
          valorCapturado: 19850000,
          unidad: 'Número',
          observaciones: 'Líneas 3G, 4G LTE y despliegues 5G de operadores móviles'
        },
        {
          indicador: 'Población Total Estimada',
          codigoVariable: 'V2',
          variable: 'Población total estimada del país para el período evaluado (DATO MAESTRO)',
          valorCapturado: 29200000,
          unidad: 'Número',
          observaciones: 'Proyección demográfica oficial INE para 2026',
          esDatoMaestro: true
        }
      ],
      mediosDigitalesIpmd: [
        {
          indicador: 'Usuarios Activos Mensuales (MAU)',
          codigoVariable: 'V1',
          variable: 'Número de usuarios únicos activos por mes en las plataformas digitales públicas',
          valorCapturado: 11200000,
          unidad: 'Número',
          observaciones: 'Consolidado analítico de portales del SNMP, Patria y medios públicos'
        },
        {
          indicador: 'Población con Acceso a Internet',
          codigoVariable: 'V2',
          variable: 'Número estimado de personas que tienen acceso a Internet en el país (DATO MAESTRO)',
          valorCapturado: 20400000,
          unidad: 'Número',
          observaciones: 'Población conectada por cualquier medio (fijo, móvil o comunitario)',
          esDatoMaestro: true
        }
      ],
      cumplimientoLeyResorte: [
        {
          sujetoRegulado: 'Prestadores de servicios',
          cantidadMedida: 48,
          criterios: [
            { criterio: 'Clasificación de Contenido', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Señales monitoreadas con simbología visual y sonora reglamentaria' },
            { criterio: 'Protección al Menor', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Respeto a los bloques horarios y advertencias previas a la emisión' },
            { criterio: 'Obligaciones Financieras', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Retenciones y declaraciones al Fondo de Responsabilidad Social al día' },
            { criterio: 'Control de Franjas Horarias', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Verificación estricta de programación de todo usuario y adultos' }
          ]
        },
        {
          sujetoRegulado: 'Productores nacionales',
          cantidadMedida: 124,
          criterios: [
            { criterio: 'Clasificación de Contenido', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Certificados PNI al día con aprobación de proyectos' },
            { criterio: 'Protección al Menor', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Contenidos orientados a valores educativos y soberanía' },
            { criterio: 'Obligaciones Financieras', estado: 'CUMPLE_PARCIALMENTE', observaciones: '12 productores con trámites pendientes de solvencia' },
            { criterio: 'Control de Franjas Horarias', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Entrega en pautas autorizadas por los canales' }
          ]
        },
        {
          sujetoRegulado: 'Anunciantes',
          cantidadMedida: 86,
          criterios: [
            { criterio: 'Clasificación de Contenido', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Cuñas comerciales evaluadas y sin publicidad engañosa' },
            { criterio: 'Protección al Menor', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Cero publicidad de bebidas alcohólicas o tabaco en horario infantil' },
            { criterio: 'Obligaciones Financieras', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Aportes declarados conforme al artículo 24 de la ley' },
            { criterio: 'Control de Franjas Horarias', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Tiempo máximo de publicidad por hora cumplido (< 15 minutos/hora)' }
          ]
        },
        {
          sujetoRegulado: 'Radio',
          cantidadMedida: 310,
          criterios: [
            { criterio: 'Clasificación de Contenido', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Locución y contenidos supervisados por salas de monitoreo CONATEL' },
            { criterio: 'Protección al Menor', estado: 'CUMPLE_PARCIALMENTE', observaciones: '3 estaciones privadas amonestadas por lenguaje en horario matutino' },
            { criterio: 'Obligaciones Financieras', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Tributos de telecomunicaciones liquidados puntualmente' },
            { criterio: 'Control de Franjas Horarias', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Cumplimiento de transmisión del himno y cadenas nacionales' }
          ]
        },
        {
          sujetoRegulado: 'Televisión',
          cantidadMedida: 54,
          criterios: [
            { criterio: 'Clasificación de Contenido', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Revisión técnica de grillas y transmisiones en vivo' },
            { criterio: 'Protección al Menor', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Cumplimiento de cuota de producción nacional para niños y jóvenes' },
            { criterio: 'Obligaciones Financieras', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Pagos conciliados ante el Fondo RESORTE' },
            { criterio: 'Control de Franjas Horarias', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Franjas de 7:00 a 19:00 aptas para todo público respetadas' }
          ]
        },
        {
          sujetoRegulado: 'Medios Electrónicos',
          cantidadMedida: 180,
          criterios: [
            { criterio: 'Clasificación de Contenido', estado: 'CUMPLE_PARCIALMENTE', observaciones: '8 portales apercibidos por difusión de contenidos de violencia gráfica' },
            { criterio: 'Protección al Menor', estado: 'CUMPLE_PARCIALMENTE', observaciones: 'Falta de filtros de edad en sitios de apuestas y entretenimiento' },
            { criterio: 'Obligaciones Financieras', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Registros de empresas digitales de comunicación al día' },
            { criterio: 'Control de Franjas Horarias', estado: 'CUMPLE_TOTALMENTE', observaciones: 'Políticas de moderación y aviso de contenidos sensibles implementadas' }
          ]
        }
      ]
    }
  }
};
