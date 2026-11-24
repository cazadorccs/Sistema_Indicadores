import { 
  FullWeeklyReport, 
  MediaOperationalData, 
  PlatformsTechnicalData, 
  StrategicMIPCCIData, 
  TalentVulnerabilityRow,
  Eje1InstrumentoData,
  CriticalTowerStatus,
  MunicipalityData
} from '../types';
import { Eje2InstrumentoData } from '../types/eje2Types';
import { Eje3InstrumentoData } from '../types/eje3Types';
import { Eje4InstrumentoData } from '../types/eje4Types';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from './engine';
import { INITIAL_REPORT_DATA, CRITICAL_TOWERS, MUNICIPALITIES_DATA } from '../data/mockData';
import { INITIAL_EJE1_DATA } from '../data/mockInstrumentData';
import { INITIAL_EJE2_DATA } from '../data/mockEje2Data';
import { INITIAL_EJE3_DATA } from '../data/mockEje3Data';
import { INITIAL_EJE4_DATA } from '../data/mockEje4Data';

/**
 * Genera un objeto MediaOperationalData con todos los valores numéricos en cero (0)
 */
export function createZeroMediosData(): MediaOperationalData {
  return {
    // Impresos
    ejemplaresImpresos: 0,
    tirajeTotal: 0,
    ejemplaresZonasAfectadas: 0,
    coberturaMunicipiosImpresos: 0,
    suplementosEspeciales: 0,
    notasPrensaImpresas: 0,
    articulosOpinion: 0,
    entrevistasImpresas: 0,
    contenidoSismoImpreso: 0,
    puntosDistribucionActivos: 0,
    rutasAfectadas: 0,
    personalDistribucion: 0,
    unidadesTransporteTotal: 0,
    unidadesTransporteOperativas: 0,

    // Radios
    horasTransmisionRadio: 0,
    operatividadSenalRadio: 0,
    coberturaMunicipiosRadio: 0,
    audienciaRatingRadio: 0,
    senalZonasAfectadasRadio: 0,
    programasEnVivoRadio: 0,
    horasProgramacionPropiaRadio: 0,
    boletinesRadio: 0,
    microprogramasContingenciaRadio: 0,
    transmisoresRadioTotal: 0,
    transmisoresRadioOperativos: 0,
    potenciaTransmisionRadio: 0,
    plantasEmergenciaRadioTotal: 0,
    plantasEmergenciaRadioOperativas: 0,
    tiempoCaidaRadioMin: 0,

    // Televisión
    horasTransmisionTV: 0,
    operatividadSenalTV: 0,
    coberturaNacionalTV: 0,
    senalTDAOperativaTV: 0,
    canalesSatelitalesActivosTV: 0,
    programasProducidosTV: 0,
    horasProgramacionPropiaTV: 0,
    pasesEnVivoCampoTV: 0,
    coberturasEspecialesTV: 0,
    unidadesMovilesTotal: 0,
    unidadesMovilesOperativas: 0,
    camarasProduccionTotal: 0,
    camarasProduccionOperativas: 0,
    equiposEdicionTotal: 0,
    equiposEdicionOperativos: 0,
    plantasEmergenciaTVTotal: 0,
    plantasEmergenciaTVOperativas: 0,
    personalTecnicoTV: 0,
    personalCampoTV: 0,

    // Digitales
    visitasPortalWeb: 0,
    usuariosUnicosWeb: 0,
    paginasVistasWeb: 0,
    tiempoPromedioSesionMin: 0,
    tasaReboteWeb: 0,
    contenidosPublicadosWeb: 0,
    multimediaPublicadoWeb: 0,
    boletinesSuscritosWeb: 0,
    usuariosRegistradosWeb: 0,
    notificacionesPushWeb: 0,
    nuevosSuscriptoresSemanaWeb: 0,
    tramitesDigitalesTotal: 0,
    tramitesDigitalesDisponibles: 0,
    solicitudesSIVERIF: 0,
    registrosPNI: 0,
    tasaRespuestaSolicitudes: 0,

    // Redes Sociales
    metaVistasDigital: 0,
    vistasLogradasDigital: 0,
    interaccionesTotalesDigital: 0,
    impresionesNetasDigital: 0,
    alcanceOrganicoDigital: 0,
    alcancePagadoDigital: 0,
    seguidoresTotalesDigital: 0,
    nuevosSeguidoresDigital: 0,
    contenidoTotalPublicadoRedes: 0,
    formatoVideoReelsTikTok: 0,
    formatoEstaticoFlyers: 0,
    radialDigitalizadoRedes: 0,
    pasesEnVivoRedes: 0,
    creadoresActivosRedes: 0,
    vistasRedesAliadas: 0,
    articulacionMediosPrivados: 0,
    hashtagsMonitorizados: 0
  };
}

/**
 * Genera PlatformsTechnicalData con todos los valores numéricos en cero (0)
 */
export function createZeroPlataformasData(): PlatformsTechnicalData {
  return {
    operatividadNacionalTDA: 0,
    metaTDA: 0,
    serviciosTVActivosTDA: 0,
    serviciosTVTotalTDA: 0,
    serviciosRadioActivosTDA: 0,
    serviciosRadioTotalTDA: 0,
    estacionesTDAOperativas: 0,
    estacionesTDATotal: 0,
    coberturaGeograficaTDA: 0,
    
    potenciaBandaKu: 0,
    canalesSatelitalesReactivados: 0,
    canalesSatelitalesTotal: 0,
    canalesSatelitalesOperativos: 0,
    disponibilidadEnlaceSatelital: 0,
    tiempoCaidaSatelitalMin: 0,

    transmisoresTVTotal: 0,
    transmisoresTVOperativos: 0,
    transmisoresRadioTotal: 0,
    transmisoresRadioOperativos: 0,
    enlacesMicroondasTotal: 0,
    enlacesMicroondasOperativos: 0,
    plantasRespaldoTotal: 0,
    plantasRespaldoOperativas: 0,
    capacidadTransmisionDisponible: 0,

    reportesPrimerasPlanasRegulatorias: 0,
    concesionesOtorgadas: 0,
    habilitacionesProcesadas: 0,
    homologacionesEquipos: 0,
    inspeccionesTecnicas: 0,
    multasSancionesAplicadas: 0,
    estacionesMonitoreoEspectroTotal: 0,
    estacionesMonitoreoEspectroOperativas: 0,
    espectroRadioelectricoMonitoreado: 0,
    interferenciasDetectadas: 0,
    operadoresIrregulares: 0,
    mediosMonitoreadosCuotasResorte: 0,
    cumplimientoContenidoNacionalResorte: 0,
    cumplimientoContenidoEducativoResorte: 0,
    cumplimientoFranjaInfantilResorte: 0,
    caidasServicioReportadas: 0,
    ciberataquesDetectados: 0,
    resolucionIncidentesPorcentaje: 0
  };
}

/**
 * Genera StrategicMIPCCIData con valores en cero (0) (preservando constantes demográficas maestras)
 */
export function createZeroStrategicData(): StrategicMIPCCIData {
  return {
    comunicadosOficialesEmitidos: 0,
    piezasTelefoniaMovilCanalesPresidencia: 0,
    tendenciasViralesDesestabilizadoras: 0,

    traficoOrganicoTotal: 0,
    impresionesBuscadores: 0,
    clicsBuscadores: 0,
    ctrOrganico: 0,
    tasaConversionSuscriptores: 0,

    trabajadoresSNMPCapacitados: 0,
    pniFormadosMarcoEtico: 0,
    totalNominaSNMP: 4800, // Censo maestro
    mediosComunitariosMACGeorreferenciados: 0,
    solicitudesComunalesInfraestructura: 0,
    vocerosComunitariosCapacitados3_0: 0,

    hogaresInternetActivoTHAI: 0,
    universoHogaresNacional: 7200000, // INE maestro
    lineasBandaAnchaMovilTPBAM: 0,
    poblacionTotalEstimada: 28500000, // INE maestro
    usuariosActivosMensualesDigitalIPMD: 0,
    poblacionAccesoInternet: 22000000 // INE maestro
  };
}

/**
 * Genera Eje1InstrumentoData en cero (0)
 */
export function createZeroEje1Data(): Eje1InstrumentoData {
  const zeroEje1: Eje1InstrumentoData = JSON.parse(JSON.stringify(INITIAL_EJE1_DATA));
  
  // Impresos
  zeroEje1.impresos.produccion.forEach(p => { p.metaSemanal = 0; p.logrado = 0; p.varSemanaAnterior = 0; });
  zeroEje1.impresos.editorial.forEach(e => { e.logrado = 0; e.observaciones = ''; });
  zeroEje1.impresos.distribucion.forEach(d => { d.valor = 0; });

  // Radios
  zeroEje1.radios.alcance.forEach(a => { a.metaSemanal = 0; a.logrado = 0; a.varSemanaAnterior = 0; });
  zeroEje1.radios.produccion.forEach(p => { p.logrado = 0; p.observaciones = ''; });
  zeroEje1.radios.desgloseTematico.forEach(d => { d.numProgramas = 0; d.horasTransmision = 0; d.audienciaEstimada = 0; });
  zeroEje1.radios.infraestructura.forEach(i => { i.valor = 0; i.observaciones = ''; });

  // Audiovisuales
  zeroEje1.audiovisuales.alcance.forEach(a => { a.metaSemanal = 0; a.logrado = 0; a.varSemanaAnterior = 0; });
  zeroEje1.audiovisuales.produccion.forEach(p => { p.logrado = 0; p.observaciones = ''; });
  zeroEje1.audiovisuales.desgloseProduccion.forEach(d => { d.numPiezas = 0; d.duracionTotalHoras = 0; d.porcentajeParrilla = 0; });
  zeroEje1.audiovisuales.logistica.forEach(l => { l.valor = 0; l.observaciones = ''; });

  // Digitales
  zeroEje1.digitales.portales.forEach(p => { p.metaSemanal = 0; p.logrado = 0; p.varSemanaAnterior = 0; });
  zeroEje1.digitales.contenidoTematico.forEach(c => { c.articulosPublicados = 0; c.visitasGeneradas = 0; c.tiempoPromedioMin = 0; });
  zeroEje1.digitales.suscripciones.forEach(s => { s.valor = 0; s.observaciones = ''; });
  zeroEje1.digitales.tramitesServicios.forEach(t => { t.valor = 0; t.observaciones = ''; });

  // Redes Sociales
  zeroEje1.redesSociales.kpisCanales.forEach(k => { 
    k.metaSemanalVistas = 0; 
    k.vistasLogradas = 0; 
    k.varSemanaAnterior = 0; 
    k.interaccionesTotales = 0; 
    k.impresionesNetas = 0; 
    k.tasaEngagement = 0; 
  });
  zeroEje1.redesSociales.alcanceAudiencia.forEach(a => { 
    a.seguidoresTotales = 0; 
    a.nuevosSeguidores = 0; 
    a.crecimientoPorc = 0; 
    a.alcanceOrganico = 0; 
    a.alcancePagado = 0; 
  });
  zeroEje1.redesSociales.produccionTactica.forEach(p => { p.unidades = 0; p.observaciones = ''; });
  zeroEje1.redesSociales.entrevistas.forEach(e => { e.numEntrevistas = 0; e.alcanceEstimado = 0; });
  zeroEje1.redesSociales.creadoresAliados.forEach(c => { c.valor = 0; c.observaciones = ''; });
  zeroEje1.redesSociales.canalesActivos.forEach(ca => { ca.seguidores = 0; ca.crecimientoPorc = 0; });
  zeroEje1.redesSociales.engagementPorContenido.forEach(ec => { 
    ec.publicaciones = 0; 
    ec.interacciones = 0; 
    ec.comentarios = 0; 
    ec.compartidos = 0; 
    ec.guardados = 0; 
    ec.eePromedio = 0; 
  });

  return zeroEje1;
}

/**
 * Genera el estado en cero para torres críticas
 */
export function createZeroCriticalTowers(): CriticalTowerStatus[] {
  return CRITICAL_TOWERS.map(tower => ({
    ...tower,
    potenciaActual: 0,
    temperatura: 0,
    operatividadSenal: 0,
    fallaDetectada: false,
    transmisorTDA: 'INACTIVO' as any,
    enlaceMicroondas: 'SIN SEÑAL' as any,
    plantaElectrica: 'APAGADA' as any,
    poblacionBeneficiada: 0,
    ultimaRevision: 'Sin telemetría operativa registrada (Puesto a 0)'
  }));
}

/**
 * Genera el estado en cero para los 335 municipios oficiales (cobertura y conectividad en 0)
 */
export function createZeroMunicipalities(): MunicipalityData[] {
  return MUNICIPALITIES_DATA.map(m => ({
    ...m,
    coberturaEfectivaRadioTV: 0,
    penetracionInternet: 0,
    estatusSenal: 'CRITICO',
    mediosComunitariosActivos: 0,
    alertasActivas: 0,
    tdaDisponible: false,
    bandaKuDisponible: false
  }));
}

/**
 * Genera Eje2InstrumentoData completamente en cero (0) (REDTV y CONATEL)
 */
export function createZeroEje2Data(): Eje2InstrumentoData {
  return {
    redtv: {
      operatividadMedios: INITIAL_EJE2_DATA.redtv.operatividadMedios.map(m => ({
        ...m,
        horasTransmision: 0,
        operatividadPorc: 0,
        estatusSenalServidoresPorc: 0,
        pasesEnVivoProduccion: 0,
        observaciones: 'Sin emisiones registradas'
      })),
      monitoreoTda: INITIAL_EJE2_DATA.redtv.monitoreoTda.map(t => ({
        ...t,
        valor: 0,
        meta: 0,
        cumplimientoPorc: 0
      })),
      infraestructuraSatelital: INITIAL_EJE2_DATA.redtv.infraestructuraSatelital.map(s => ({
        ...s,
        valor: 0,
        observaciones: 'Sin enlace satelital activo'
      })),
      torresCriticas: INITIAL_EJE2_DATA.redtv.torresCriticas.map(tc => ({
        ...tc,
        estatus: 'ALERTA',
        observaciones: 'Sin telemetría de estación reportada'
      })),
      transmisoresEquipamiento: INITIAL_EJE2_DATA.redtv.transmisoresEquipamiento.map(te => ({
        ...te,
        operativos: 0,
        total: 0,
        observaciones: 'Sin equipamiento operativo reportado'
      })),
      coberturaRegiones: INITIAL_EJE2_DATA.redtv.coberturaRegiones.map(cr => ({
        ...cr,
        coberturaTdaPorc: 0,
        coberturaFmAmPorc: 0,
        coberturaTvAbiertaPorc: 0,
        estacionesAfectadas: 0
      }))
    },
    conatel: {
      monitoreoRegulatorio: INITIAL_EJE2_DATA.conatel.monitoreoRegulatorio.map(mr => ({
        ...mr,
        valor: 0,
        varSemanaAnteriorPorc: 0,
        observaciones: 'Sin trámites regulatorios registrados'
      })),
      monitoreoEspectro: INITIAL_EJE2_DATA.conatel.monitoreoEspectro.map(me => ({
        ...me,
        valor: 0,
        totalRef: 0,
        observaciones: 'Sin monitoreo de espectro activo'
      })),
      cumplimientoResorte: INITIAL_EJE2_DATA.conatel.cumplimientoResorte.map(cr => ({
        ...cr,
        valor: 0,
        observaciones: 'Sin fiscalización de contenido registrada'
      })),
      tramitesSigestel: INITIAL_EJE2_DATA.conatel.tramitesSigestel.map(ts => ({
        ...ts,
        solicitudesRecibidas: 0,
        solicitudesProcesadas: 0,
        tiempoPromedioDias: 0
      })),
      incidentesContingencias: INITIAL_EJE2_DATA.conatel.incidentesContingencias.map(ic => ({
        ...ic,
        numReportes: 0,
        resolucionPorc: 0,
        tiempoPromedioHoras: 0
      })),
      politicasPublicas: INITIAL_EJE2_DATA.conatel.politicasPublicas.map(pp => ({
        ...pp,
        documentosPublicados: 0,
        observaciones: 'Sin políticas publicadas'
      }))
    }
  };
}

/**
 * Genera Eje3InstrumentoData completamente en cero (0) (Narrativa, Monitoreo, Alianzas, Cooperación e IVI)
 */
export function createZeroEje3Data(): Eje3InstrumentoData {
  return {
    narrativaMonitoreo: {
      monitoreoMedios: INITIAL_EJE3_DATA.narrativaMonitoreo.monitoreoMedios.map(m => ({
        ...m,
        valor: 0,
        observaciones: 'Sin monitoreo registrado'
      })),
      desgloseAlertas: INITIAL_EJE3_DATA.narrativaMonitoreo.desgloseAlertas.map(a => ({
        ...a,
        numAlertas: 0,
        porcentajeTotal: 0,
        accionesContrarrestacion: 'Sin alertas activas'
      })),
      contenidoEscrito: INITIAL_EJE3_DATA.narrativaMonitoreo.contenidoEscrito.map(c => ({
        ...c,
        valor: 0,
        observaciones: 'Sin contenidos producidos'
      })),
      voceriasPortavoces: INITIAL_EJE3_DATA.narrativaMonitoreo.voceriasPortavoces.map(v => ({
        ...v,
        valor: 0,
        observaciones: 'Sin vocerías registradas'
      })),
      sentimientoPosicionamiento: INITIAL_EJE3_DATA.narrativaMonitoreo.sentimientoPosicionamiento.map(s => ({
        ...s,
        valor: 0,
        varSemanaAnteriorPorc: 0
      })),
      vulnerabilidadTalento: INITIAL_EJE3_DATA.narrativaMonitoreo.vulnerabilidadTalento.map(vt => ({
        ...vt,
        totalPersonal: vt.totalPersonal || 0,
        nivelRojo: 0,
        nivelAmarillo: 0,
        nivelVerde: vt.totalPersonal || 0,
        porEvaluar: 0,
        sinClasificar: 0
      })),
      articulacionAlianzas: INITIAL_EJE3_DATA.narrativaMonitoreo.articulacionAlianzas.map(aa => ({
        ...aa,
        numAccionesConjuntas: 0,
        resultados: 'Sin acciones conjuntas',
        observaciones: 'Sin articulaciones activas'
      })),
      cooperacionInternacional: INITIAL_EJE3_DATA.narrativaMonitoreo.cooperacionInternacional.map(ci => ({
        ...ci,
        montoComprometidoUsd: 0,
        montoEjecutadoUsd: 0,
        porcEjecucion: 0
      }))
    }
  };
}

/**
 * Genera Eje4InstrumentoData completamente en cero (0) (Los 4 Viceministerios MPPCI)
 */
export function createZeroEje4Data(): Eje4InstrumentoData {
  return {
    viceministerios: {
      despachoComunicacionInformacion: {
        comunicadosOficialesNotasPrensaEmitidos: 0,
        difusionMovilPresidencia: INITIAL_EJE4_DATA.viceministerios.despachoComunicacionInformacion.difusionMovilPresidencia.map(dm => ({
          ...dm,
          cantidad: 0
        })),
        tendenciasViralesDesestabilizadoras: INITIAL_EJE4_DATA.viceministerios.despachoComunicacionInformacion.tendenciasViralesDesestabilizadoras.map(tv => ({
          ...tv,
          cantidadDetectado: 0,
          amenazaPalabraFraseViral: 'Sin amenaza detectada'
        })),
        seoEditorial: {
          traficoOrganicoTotal: 0,
          impresionesBuscadores: 0,
          clicsBuscadores: 0,
          rendimientoVisitasEspontaneas: 0,
          ctrOrganico: 0,
          tasaConversionSuscriptores: 0
        }
      },
      despachoGestionComunicacional: {
        formacionAdaptacionTecnologica: INITIAL_EJE4_DATA.viceministerios.despachoGestionComunicacional.formacionAdaptacionTecnologica.map(fa => ({
          ...fa,
          valorCapturado: fa.esDatoMaestro ? fa.valorCapturado : 0
        })),
        soberaniaTecnologicaTerritorio: INITIAL_EJE4_DATA.viceministerios.despachoGestionComunicacional.soberaniaTecnologicaTerritorio.map(st => ({
          ...st,
          valorCapturado: 0
        })),
        formacionPopularTransmedia: INITIAL_EJE4_DATA.viceministerios.despachoGestionComunicacional.formacionPopularTransmedia.map(fp => ({
          ...fp,
          valorCapturado: 0
        }))
      },
      planificacionEstrategia: {
        ecosistemaDigital: INITIAL_EJE4_DATA.viceministerios.planificacionEstrategia.ecosistemaDigital.map(ed => ({
          ...ed,
          metaSemanalVistas: 0,
          vistasLogradas: 0,
          varPorcSemanaAnterior: 0,
          interaccionesTotales: 0,
          impresionesNetas: 0,
          engagementRateEE: 0
        })),
        produccionGeneral: {
          totalContenidoPublicado: 0,
          contenidoFormatoVideo: 0,
          contenidoFormatoPublicacion: 0,
          contenidoFormatoRadial: 0,
          contenidoProduccionPropia: 0
        },
        formatosDespliegue: INITIAL_EJE4_DATA.viceministerios.planificacionEstrategia.formatosDespliegue.map(fd => ({
          ...fd,
          cantidadUnidades: 0
        })),
        tiposAudiovisual: INITIAL_EJE4_DATA.viceministerios.planificacionEstrategia.tiposAudiovisual.map(ta => ({
          ...ta,
          cantidadUnidades: 0
        })),
        kpisAudiovisual: INITIAL_EJE4_DATA.viceministerios.planificacionEstrategia.kpisAudiovisual.map(ka => ({
          ...ka,
          valorCapturado: 0
        })),
        investigacionesEspecialesCantidad: 0,
        desgloseEntrevistas: INITIAL_EJE4_DATA.viceministerios.planificacionEstrategia.desgloseEntrevistas.map(de => ({
          ...de,
          cantidad: 0
        })),
        redCreadores: {
          numCreadoresActivos: 0,
          vistasDifusionRedesAliadas: 0,
          articulacionMediosPrivados: 0,
          articulacionMediosInternacionales: 0
        },
        gestionNarrativaMonitoreo: INITIAL_EJE4_DATA.viceministerios.planificacionEstrategia.gestionNarrativaMonitoreo.map(gn => ({
          ...gn,
          cantidadUnidades: 0
        })),
        contenidoEscrito: {
          notasPrensaArticulosWeb: 0,
          publicacionesMicroblogging: 0,
          publicacionesHilosTexto: 0
        },
        trendingTopics: INITIAL_EJE4_DATA.viceministerios.planificacionEstrategia.trendingTopics.map(tt => ({
          ...tt,
          alcanceMenciones: 0,
          tema: 'Sin tendencia activa'
        }))
      },
      soportePlataforma: {
        mediosComunitariosTransmisores: INITIAL_EJE4_DATA.viceministerios.soportePlataforma.mediosComunitariosTransmisores.map(mc => ({
          ...mc,
          valorCapturado: mc.esDatoMaestro ? mc.valorCapturado : 0
        })),
        coberturaTerritorialIctm: INITIAL_EJE4_DATA.viceministerios.soportePlataforma.coberturaTerritorialIctm.map(ct => ({
          ...ct,
          valorCapturado: ct.esDatoMaestro ? ct.valorCapturado : 0
        })),
        hogaresInternetThai: INITIAL_EJE4_DATA.viceministerios.soportePlataforma.hogaresInternetThai.map(hi => ({
          ...hi,
          valorCapturado: hi.esDatoMaestro ? hi.valorCapturado : 0
        })),
        bandaAnchaMovilTpbam: INITIAL_EJE4_DATA.viceministerios.soportePlataforma.bandaAnchaMovilTpbam.map(ba => ({
          ...ba,
          valorCapturado: ba.esDatoMaestro ? ba.valorCapturado : 0
        })),
        mediosDigitalesIpmd: INITIAL_EJE4_DATA.viceministerios.soportePlataforma.mediosDigitalesIpmd.map(md => ({
          ...md,
          valorCapturado: md.esDatoMaestro ? md.valorCapturado : 0
        })),
        cumplimientoLeyResorte: INITIAL_EJE4_DATA.viceministerios.soportePlataforma.cumplimientoLeyResorte.map(cr => ({
          ...cr,
          cantidadMedida: 0
        }))
      }
    }
  };
}

/**
 * Pone a cero (0) todos los datos operativos de un reporte conservando
 * las variables de control institucionales (o actualizándolas)
 */
export function createZeroReport(currentReport: FullWeeklyReport): FullWeeklyReport {
  const mediosData = createZeroMediosData();
  const plataformasData = createZeroPlataformasData();
  const strategicData = createZeroStrategicData();
  const eje1Data = createZeroEje1Data();
  const eje2Data = createZeroEje2Data();
  const eje3Data = createZeroEje3Data();
  const eje4Data = createZeroEje4Data();

  const zeroVulnerabilityRows: TalentVulnerabilityRow[] = (currentReport.vulnerabilityRows || []).map(row => ({
    ...row,
    totalPersonal: row.totalPersonal || 0,
    nivelRojo: 0,
    nivelAmarillo: 0,
    nivelVerde: row.totalPersonal || 0,
    porEvaluar: 0,
    sinClasificar: 0,
    iviCalculado: 0
  }));

  const kpisCalculados = calculateMasterKPIs(
    mediosData, 
    plataformasData, 
    strategicData, 
    zeroVulnerabilityRows
  );

  const validaciones = runThreeLevelValidation(
    currentReport.control, 
    mediosData, 
    plataformasData, 
    strategicData, 
    zeroVulnerabilityRows
  );

  const hashIntegridad = generateIntegrityHash(
    currentReport.codigoReporte || 'MPPCI-REP-PROD-CERO',
    new Date().toISOString(),
    kpisCalculados
  );

  return {
    ...currentReport,
    id: `MPPCI-REP-CERO-${Date.now().toString(36).toUpperCase()}`,
    status: 'BORRADOR',
    mediosData,
    plataformasData,
    strategicData,
    eje1Data,
    eje2Data,
    eje3Data,
    eje4Data,
    vulnerabilityRows: zeroVulnerabilityRows,
    opinionAlerts: [],
    kpisCalculados,
    validaciones,
    hashIntegridad,
    fechaUltimaModificacion: new Date().toISOString()
  };
}

/**
 * Restaura el reporte a los datos iniciales de demostración
 */
export function restoreDemoReport(): FullWeeklyReport {
  return JSON.parse(JSON.stringify(INITIAL_REPORT_DATA));
}
