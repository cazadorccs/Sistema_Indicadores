import React, { useState } from 'react';
import { 
  Building2, 
  Globe, 
  Send, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  RotateCcw,
  Sparkles,
  Smartphone,
  ShieldAlert,
  Search,
  BookOpen,
  Wifi,
  Share2,
  Video,
  FileSpreadsheet,
  Tv,
  Radio,
  FileCheck2,
  TrendingUp,
  Cpu,
  Layers,
  MapPin,
  Flame,
  Users,
  FileText,
  Plus,
  Trash2
} from 'lucide-react';
import { 
  FullWeeklyReport, 
  UserAccount, 
  RACIRole, 
  Eje4InstrumentoData,
  Eje4ViceministeriosData,
  Eje4TelefoniaMovilRow,
  Eje4TendenciaViralRow,
  Eje4SeoEditorialData,
  Eje4GestionComunicacionalRow,
  Eje4EcosistemaDigitalRow,
  Eje4ProduccionGeneralData,
  Eje4FormatoDespliegueRow,
  Eje4ContenidoAudiovisualRow,
  Eje4KpiAudiovisualRow,
  Eje4EntrevistaRow,
  Eje4RedCreadoresData,
  Eje4NarrativaPlanificacionRow,
  Eje4ContenidoEscritoPlanificacionData,
  Eje4TrendingTopicRow,
  Eje4CoberturaInfraestructuraRow,
  Eje4CoberturaTerritorialRow,
  Eje4PenetracionDigitalRow,
  Eje4SujetoCumplimientoResorte,
  EstatusCumplimientoResorte
} from '../types';
import { INITIAL_EJE4_DATA } from '../data/mockEje4Data';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';

interface FormularioGestionViceministeriosProps {
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onSuccessSave?: (msg: string) => void;
}

export const FormularioGestionViceministerios: React.FC<FormularioGestionViceministeriosProps> = ({
  report,
  onSaveReport,
  currentUser,
  currentRole,
  onSuccessSave
}) => {
  // Source data: report.eje4Data or INITIAL_EJE4_DATA
  const baseData: Eje4ViceministeriosData = report?.eje4Data?.viceministerios || INITIAL_EJE4_DATA.viceministerios;

  // Active Tab for the 4 Viceministerios
  const [activeViceministerio, setActiveViceministerio] = useState<
    'COMUNICACION_INFORMACION' | 'GESTION_COMUNICACIONAL' | 'PLANIFICACION_ESTRATEGIA' | 'SOPORTE_PLATAFORMA'
  >('COMUNICACION_INFORMACION');

  // Control variables state
  const [enteInformante, setEnteInformante] = useState(report?.control?.enteAdscrito || 'Despacho del Ministro (MPPCI)');
  const [responsableCarga, setResponsableCarga] = useState(
    report?.control?.responsableEnte || currentUser ? `${currentUser?.nombre} ${currentUser?.apellido}` : 'Lic. Carlos Castillo'
  );
  const [cedulaIdentidad, setCedulaIdentidad] = useState(currentUser?.cedula || 'V-15892341');
  const [regionLocalidad, setRegionLocalidad] = useState(report?.control?.regionLocalidad || 'Caracas - Distrito Capital');
  const [telefonoContacto, setTelefonoContacto] = useState(report?.control?.telefono || '+58 212 505-3211');
  const [correoElectronico, setCorreoElectronico] = useState(report?.control?.correo || 'despacho.viceministerios@minci.gob.ve');
  const [semanaReporte, setSemanaReporte] = useState(report?.control?.semanaEpidemiologica || 36);
  const [fechaCorte, setFechaCorte] = useState(report?.control?.fechaReporte || '2026-09-20');
  const [periodoInicio, setPeriodoInicio] = useState('2026-09-14');
  const [periodoFin, setPeriodoFin] = useState('2026-09-20');

  // 1. Despacho de Comunicación e Información State
  const [comunicadosEmitidos, setComunicadosEmitidos] = useState(
    baseData.despachoComunicacionInformacion.comunicadosOficialesNotasPrensaEmitidos
  );
  const [difusionMovil, setDifusionMovil] = useState<Eje4TelefoniaMovilRow[]>(
    baseData.despachoComunicacionInformacion.difusionMovilPresidencia
  );
  const [tendenciasVirales, setTendenciasVirales] = useState<Eje4TendenciaViralRow[]>(
    baseData.despachoComunicacionInformacion.tendenciasViralesDesestabilizadoras
  );
  const [seoEditorial, setSeoEditorial] = useState<Eje4SeoEditorialData>(
    baseData.despachoComunicacionInformacion.seoEditorial
  );

  // 2. Despacho de Gestión Comunicacional State
  const [formacionAdaptacion, setFormacionAdaptacion] = useState<Eje4GestionComunicacionalRow[]>(
    baseData.despachoGestionComunicacional.formacionAdaptacionTecnologica
  );
  const [soberaniaTerritorio, setSoberaniaTerritorio] = useState<Eje4GestionComunicacionalRow[]>(
    baseData.despachoGestionComunicacional.soberaniaTecnologicaTerritorio
  );
  const [formacionPopular, setFormacionPopular] = useState<Eje4GestionComunicacionalRow[]>(
    baseData.despachoGestionComunicacional.formacionPopularTransmedia
  );

  // 3. Viceministerio de Planificación y Estrategia Comunicacional State
  const [ecosistemaDigital, setEcosistemaDigital] = useState<Eje4EcosistemaDigitalRow[]>(
    baseData.planificacionEstrategia.ecosistemaDigital
  );
  const [produccionGeneral, setProduccionGeneral] = useState<Eje4ProduccionGeneralData>(
    baseData.planificacionEstrategia.produccionGeneral
  );
  const [formatosDespliegue, setFormatosDespliegue] = useState<Eje4FormatoDespliegueRow[]>(
    baseData.planificacionEstrategia.formatosDespliegue
  );
  const [tiposAudiovisual, setTiposAudiovisual] = useState<Eje4ContenidoAudiovisualRow[]>(
    baseData.planificacionEstrategia.tiposAudiovisual
  );
  const [kpisAudiovisual, setKpisAudiovisual] = useState<Eje4KpiAudiovisualRow[]>(
    baseData.planificacionEstrategia.kpisAudiovisual
  );
  const [investigacionesCantidad, setInvestigacionesCantidad] = useState(
    baseData.planificacionEstrategia.investigacionesEspecialesCantidad
  );
  const [desgloseEntrevistas, setDesgloseEntrevistas] = useState<Eje4EntrevistaRow[]>(
    baseData.planificacionEstrategia.desgloseEntrevistas
  );
  const [redCreadores, setRedCreadores] = useState<Eje4RedCreadoresData>(
    baseData.planificacionEstrategia.redCreadores
  );
  const DEFAULT_GESTION_NARRATIVA: Eje4NarrativaPlanificacionRow[] = [
    { concepto: 'N° de Alertas de Matrices Procesadas (Rumores/Noticias Falsas)', cantidadUnidades: 48 },
    { concepto: 'Informes de Narrativa Emitidos', cantidadUnidades: 14 },
    { concepto: 'Reportes de Primeras Planas (Nacional, Regional e Internacional)', cantidadUnidades: 84 },
    { concepto: 'Resúmenes de Vocerías Oficiales', cantidadUnidades: 18 },
    { concepto: 'Narrativas y contranarrativas', cantidadUnidades: 32 }
  ];

  const DEFAULT_CONTENIDO_ESCRITO: Eje4ContenidoEscritoPlanificacionData = {
    notasPrensaArticulosWeb: 1420,
    publicacionesMicroblogging: 3850,
    publicacionesHilosTexto: 410
  };

  const [narrativaPlanificacion, setNarrativaPlanificacion] = useState<Eje4NarrativaPlanificacionRow[]>(
    baseData.planificacionEstrategia.gestionNarrativaMonitoreo && baseData.planificacionEstrategia.gestionNarrativaMonitoreo.length > 0
      ? baseData.planificacionEstrategia.gestionNarrativaMonitoreo
      : DEFAULT_GESTION_NARRATIVA
  );
  const [contenidoEscrito, setContenidoEscrito] = useState<Eje4ContenidoEscritoPlanificacionData>(
    baseData.planificacionEstrategia.contenidoEscrito || DEFAULT_CONTENIDO_ESCRITO
  );
  const [trendingTopics, setTrendingTopics] = useState<Eje4TrendingTopicRow[]>(
    baseData.planificacionEstrategia.trendingTopics
  );

  // 4. Viceministerio de Soporte de Plataforma Comunicacional State
  const [mediosComunitariosTransmisores, setMediosComunitariosTransmisores] = useState<Eje4CoberturaInfraestructuraRow[]>(
    baseData.soportePlataforma.mediosComunitariosTransmisores
  );
  const [coberturaTerritorial, setCoberturaTerritorial] = useState<Eje4CoberturaTerritorialRow[]>(
    baseData.soportePlataforma.coberturaTerritorialIctm
  );
  const [hogaresInternetThai, setHogaresInternetThai] = useState<Eje4PenetracionDigitalRow[]>(
    baseData.soportePlataforma.hogaresInternetThai
  );
  const [bandaAnchaMovilTpbam, setBandaAnchaMovilTpbam] = useState<Eje4PenetracionDigitalRow[]>(
    baseData.soportePlataforma.bandaAnchaMovilTpbam
  );
  const [mediosDigitalesIpmd, setMediosDigitalesIpmd] = useState<Eje4PenetracionDigitalRow[]>(
    baseData.soportePlataforma.mediosDigitalesIpmd
  );
  const [cumplimientoResorte, setCumplimientoResorte] = useState<Eje4SujetoCumplimientoResorte[]>(
    baseData.soportePlataforma.cumplimientoLeyResorte
  );

  // Save UI states
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Live calculations for Viceministerios
  // 1. Despacho Comunicacion: Total piezas movil & total amenazas detectadas
  const totalPiezasMovil = difusionMovil.reduce((acc, r) => acc + (r.cantidad || 0), 0);
  const totalAmenazasVirales = tendenciasVirales.reduce((acc, r) => acc + (r.cantidadDetectado || 0), 0);

  // 2. Gestion Comunicacional: Formacion coverage
  const v1Snmp = formacionAdaptacion.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0;
  const v3Snmp = formacionAdaptacion.find(r => r.codigoVariable === 'V3')?.valorCapturado || 1;
  const porcFormacionSnmp = ((v1Snmp / v3Snmp) * 100).toFixed(1);

  const v1Voceros = formacionPopular.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0;
  const v2Voceros = formacionPopular.find(r => r.codigoVariable === 'V2')?.valorCapturado || 1;
  const porcVoceros = ((v1Voceros / v2Voceros) * 100).toFixed(1);

  // 3. Planificacion: Vistas totales y engagement
  const totalVistasLogradas = ecosistemaDigital.reduce((acc, r) => acc + (r.vistasLogradas || 0), 0);
  const totalInteracciones = ecosistemaDigital.reduce((acc, r) => acc + (r.interaccionesTotales || 0), 0);
  const totalImpresiones = ecosistemaDigital.reduce((acc, r) => acc + (r.impresionesNetas || 0), 0);
  const globalEePorc = totalVistasLogradas > 0 ? ((totalInteracciones / totalVistasLogradas) * 100).toFixed(2) : '0';

  // 4. Soporte Plataforma: THAI, TPBAM, IPMD
  const v1Thai = hogaresInternetThai.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0;
  const v2Thai = hogaresInternetThai.find(r => r.codigoVariable === 'V2')?.valorCapturado || 1;
  const thaiPorc = ((v1Thai / v2Thai) * 100).toFixed(1);

  const v1Tpbam = bandaAnchaMovilTpbam.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0;
  const v2Tpbam = bandaAnchaMovilTpbam.find(r => r.codigoVariable === 'V2')?.valorCapturado || 1;
  const tpbamPorc = ((v1Tpbam / v2Tpbam) * 100).toFixed(1);

  const v1Ipmd = mediosDigitalesIpmd.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0;
  const v2Ipmd = mediosDigitalesIpmd.find(r => r.codigoVariable === 'V2')?.valorCapturado || 1;
  const ipmdPorc = ((v1Ipmd / v2Ipmd) * 100).toFixed(1);

  const v2Transmisores = mediosComunitariosTransmisores.find(r => r.codigoVariable === 'V2')?.valorCapturado || 0;
  const v3Transmisores = mediosComunitariosTransmisores.find(r => r.codigoVariable === 'V3')?.valorCapturado || 1;
  const transmisoresOperativosPorc = ((v2Transmisores / v3Transmisores) * 100).toFixed(1);

  // Save handler
  const handleGuardarReporte = () => {
    if (!report || !onSaveReport) return;

    const updatedEje4: Eje4InstrumentoData = {
      viceministerios: {
        despachoComunicacionInformacion: {
          comunicadosOficialesNotasPrensaEmitidos: comunicadosEmitidos,
          difusionMovilPresidencia: difusionMovil,
          tendenciasViralesDesestabilizadoras: tendenciasVirales,
          seoEditorial: seoEditorial
        },
        despachoGestionComunicacional: {
          formacionAdaptacionTecnologica: formacionAdaptacion,
          soberaniaTecnologicaTerritorio: soberaniaTerritorio,
          formacionPopularTransmedia: formacionPopular
        },
        planificacionEstrategia: {
          ecosistemaDigital: ecosistemaDigital,
          produccionGeneral: produccionGeneral,
          formatosDespliegue: formatosDespliegue,
          tiposAudiovisual: tiposAudiovisual,
          kpisAudiovisual: kpisAudiovisual,
          investigacionesEspecialesCantidad: investigacionesCantidad,
          desgloseEntrevistas: desgloseEntrevistas,
          redCreadores: redCreadores,
          gestionNarrativaMonitoreo: narrativaPlanificacion,
          contenidoEscrito: contenidoEscrito,
          trendingTopics: trendingTopics
        },
        soportePlataforma: {
          mediosComunitariosTransmisores: mediosComunitariosTransmisores,
          coberturaTerritorialIctm: coberturaTerritorial,
          hogaresInternetThai: hogaresInternetThai,
          bandaAnchaMovilTpbam: bandaAnchaMovilTpbam,
          mediosDigitalesIpmd: mediosDigitalesIpmd,
          cumplimientoLeyResorte: cumplimientoResorte
        }
      }
    };

    // Update StrategicMIPCCIData for backwards compatibility with existing dashboards
    const updatedStrategic = {
      ...report.strategicData,
      comunicadosOficialesEmitidos: comunicadosEmitidos,
      piezasTelefoniaMovilCanalesPresidencia: totalPiezasMovil,
      tendenciasViralesDesestabilizadoras: totalAmenazasVirales,
      traficoOrganicoTotal: seoEditorial.traficoOrganicoTotal,
      impresionesBuscadores: seoEditorial.impresionesBuscadores,
      clicsBuscadores: seoEditorial.clicsBuscadores,
      ctrOrganico: seoEditorial.ctrOrganico,
      tasaConversionSuscriptores: seoEditorial.tasaConversionSuscriptores,
      trabajadoresSNMPCapacitados: v1Snmp,
      pniFormadosMarcoEtico: formacionAdaptacion.find(r => r.codigoVariable === 'V2')?.valorCapturado || 0,
      totalNominaSNMP: v3Snmp,
      mediosComunitariosMACGeorreferenciados: soberaniaTerritorio.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0,
      solicitudesComunalesInfraestructura: soberaniaTerritorio.find(r => r.codigoVariable === 'V2')?.valorCapturado || 0,
      vocerosComunitariosCapacitados3_0: v1Voceros,
      hogaresInternetActivoTHAI: v1Thai,
      universoHogaresNacional: v2Thai,
      lineasBandaAnchaMovilTPBAM: v1Tpbam,
      poblacionTotalEstimada: v2Tpbam,
      usuariosActivosMensualesDigitalIPMD: v1Ipmd,
      poblacionAccesoInternet: v2Ipmd
    };

    const updatedReport: FullWeeklyReport = {
      ...report,
      control: {
        ...report.control,
        enteAdscrito: enteInformante,
        responsableEnte: responsableCarga,
        cedulaIdentidad,
        regionLocalidad,
        telefono: telefonoContacto,
        correo: correoElectronico,
        semanaEpidemiologica: semanaReporte,
        fechaReporte: fechaCorte
      },
      eje4Data: updatedEje4,
      strategicData: updatedStrategic,
      fechaUltimaModificacion: new Date().toISOString()
    };

    // Recalculate KPIs and validations
    updatedReport.kpisCalculados = calculateMasterKPIs(
      updatedReport.mediosData,
      updatedReport.plataformasData,
      updatedReport.strategicData,
      updatedReport.vulnerabilityRows
    );

    updatedReport.validaciones = runThreeLevelValidation(
      updatedReport.control,
      updatedReport.mediosData,
      updatedReport.plataformasData,
      updatedReport.strategicData,
      updatedReport.vulnerabilityRows
    );

    updatedReport.hashIntegridad = generateIntegrityHash(updatedReport);

    onSaveReport(updatedReport);
    setSaveFeedback('Datos de EJE 4: Gestión de Viceministerios guardados exitosamente con trazabilidad y hash ministerial.');
    setSaveSuccess(true);
    if (onSuccessSave) {
      onSuccessSave('Eje 4 guardado exitosamente.');
    }
    setTimeout(() => setSaveSuccess(false), 5000);
  };

  // Export to CSV
  const handleExportarCSV = () => {
    let csv = 'INSTRUMENTO DE CAPTURA DE DATOS - GESTION Y DESPLIEGUE OPERATIVO COMUNICACIONAL (MPPCI)\n';
    csv += 'EJE 4: GESTION DE VICEMINISTERIOS (GESTION MIPCCI)\n\n';
    csv += `Ente Informante,${enteInformante}\nResponsable,${responsableCarga}\nCedula,${cedulaIdentidad}\nSemana,${semanaReporte}\nFecha,${fechaCorte}\nPeriodo,${periodoInicio} al ${periodoFin}\n\n`;

    csv += '1. DESPACHO DE COMUNICACION E INFORMACION\n';
    csv += `Comunicados Oficiales y Notas de Prensa Emitidos,${comunicadosEmitidos}\n\n`;
    csv += 'DIFUSION TRANSMEDIA TELEFONIA MOVIL\nTipo de Comunicacion,Cantidad\n';
    difusionMovil.forEach(r => {
      csv += `"${r.tipoComunicacion}",${r.cantidad}\n`;
    });

    csv += '\nTENDENCIAS VIRALES CON POTENCIAL DESESTABILIZADOR\nOrigen,Categoria,Cantidad Detectado,Amenaza Palabra o Frase Viral,Fecha/Hora\n';
    tendenciasVirales.forEach(r => {
      csv += `"${r.origen}",${r.categoria},${r.cantidadDetectado},"${r.amenazaPalabraFraseViral}","${r.fechaHora}"\n`;
    });

    csv += '\nMETRICAS DE SEO EDITORIAL\nMetrica,Valor,Unidad\n';
    csv += `Trafico Organico Total,${seoEditorial.traficoOrganicoTotal},Usuarios\n`;
    csv += `Impresiones en Buscadores,${seoEditorial.impresionesBuscadores},Impresiones\n`;
    csv += `Clics en Buscadores,${seoEditorial.clicsBuscadores},Clics\n`;
    csv += `Rendimiento Visitas Espontaneas,${seoEditorial.rendimientoVisitasEspontaneas},Visitas\n`;
    csv += `CTR Organico,${seoEditorial.ctrOrganico},%\n`;
    csv += `Tasa de Conversion de Suscriptores,${seoEditorial.tasaConversionSuscriptores},%\n\n`;

    csv += '2. DESPACHO DE GESTION COMUNICACIONAL\n';
    csv += 'Indicador,Variable,Codigo,Valor Capturado,Unidad\n';
    [...formacionAdaptacion, ...soberaniaTerritorio, ...formacionPopular].forEach(r => {
      csv += `"${r.nombreIndicador}","${r.variable}",${r.codigoVariable},${r.valorCapturado},"${r.unidad}"\n`;
    });

    csv += '\n3. VICEMINISTERIO DE PLANIFICACION Y ESTRATEGIA COMUNICACIONAL\n';
    csv += 'ECOSISTEMA DIGITAL (KPIS DE CANALES)\nPlataforma,Meta Vistas,Vistas Logradas,Var % vs Anterior,Interacciones,Impresiones,Engagement EE %\n';
    ecosistemaDigital.forEach(r => {
      csv += `"${r.plataforma}",${r.metaSemanalVistas},${r.vistasLogradas},${r.varPorcSemanaAnterior}%,${r.interaccionesTotales},${r.impresionesNetas},${r.engagementRateEE}%\n`;
    });

    csv += '\nGESTION DE NARRATIVA Y MONITOREO DE MEDIOS\nConcepto,Cantidad (Unidades)\n';
    narrativaPlanificacion.forEach(r => {
      csv += `"${r.concepto}",${r.cantidadUnidades}\n`;
    });

    csv += '\nPRODUCCION DE CONTENIDOS ESCRITO\nTipo de Contenido,Cantidad (Unidades)\n';
    csv += `"Notas de prensa y articulos web",${contenidoEscrito.notasPrensaArticulosWeb}\n`;
    csv += `"Publicaciones en red de microblogging",${contenidoEscrito.publicacionesMicroblogging}\n`;
    csv += `"Publicaciones en plataformas de hilos de texto",${contenidoEscrito.publicacionesHilosTexto}\n`;

    csv += '\n4. VICEMINISTERIO DE SOPORTE DE PLATAFORMA COMUNICACIONAL\n';
    csv += 'Indicador,Codigo,Variable,Valor Capturado,Unidad,Observaciones\n';
    [...mediosComunitariosTransmisores, ...coberturaTerritorial, ...hogaresInternetThai, ...bandaAnchaMovilTpbam, ...mediosDigitalesIpmd].forEach(r => {
      csv += `"${r.indicador}",${r.codigoVariable},"${r.variable}",${r.valorCapturado},"${r.unidad}","${r.observaciones}"\n`;
    });

    csv += '\nCUMPLIMIENTO LEY RESORTE\nSujeto Regulado,Cantidad Medida,Criterio,Estado Cumplimiento,Observaciones\n';
    cumplimientoResorte.forEach(s => {
      s.criterios.forEach(c => {
        csv += `"${s.sujetoRegulado}",${s.cantidadMedida},"${c.criterio}","${c.estado}","${c.observaciones}"\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `EJE4_GESTION_VICEMINISTERIOS_SEMANA_${semanaReporte}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset to defaults
  const handleRestablecerValores = () => {
    if (window.confirm('¿Está seguro de restablecer los datos de EJE 4 a los valores oficiales por defecto?')) {
      const init = INITIAL_EJE4_DATA.viceministerios;
      setComunicadosEmitidos(init.despachoComunicacionInformacion.comunicadosOficialesNotasPrensaEmitidos);
      setDifusionMovil(init.despachoComunicacionInformacion.difusionMovilPresidencia);
      setTendenciasVirales(init.despachoComunicacionInformacion.tendenciasViralesDesestabilizadoras);
      setSeoEditorial(init.despachoComunicacionInformacion.seoEditorial);
      setFormacionAdaptacion(init.despachoGestionComunicacional.formacionAdaptacionTecnologica);
      setSoberaniaTerritorio(init.despachoGestionComunicacional.soberaniaTecnologicaTerritorio);
      setFormacionPopular(init.despachoGestionComunicacional.formacionPopularTransmedia);
      setEcosistemaDigital(init.planificacionEstrategia.ecosistemaDigital);
      setProduccionGeneral(init.planificacionEstrategia.produccionGeneral);
      setFormatosDespliegue(init.planificacionEstrategia.formatosDespliegue);
      setTiposAudiovisual(init.planificacionEstrategia.tiposAudiovisual);
      setKpisAudiovisual(init.planificacionEstrategia.kpisAudiovisual);
      setInvestigacionesCantidad(init.planificacionEstrategia.investigacionesEspecialesCantidad);
      setDesgloseEntrevistas(init.planificacionEstrategia.desgloseEntrevistas);
      setRedCreadores(init.planificacionEstrategia.redCreadores);
      setNarrativaPlanificacion(init.planificacionEstrategia.gestionNarrativaMonitoreo || DEFAULT_GESTION_NARRATIVA);
      setContenidoEscrito(init.planificacionEstrategia.contenidoEscrito || DEFAULT_CONTENIDO_ESCRITO);
      setTrendingTopics(init.planificacionEstrategia.trendingTopics);
      setMediosComunitariosTransmisores(init.soportePlataforma.mediosComunitariosTransmisores);
      setCoberturaTerritorial(init.soportePlataforma.coberturaTerritorialIctm);
      setHogaresInternetThai(init.soportePlataforma.hogaresInternetThai);
      setBandaAnchaMovilTpbam(init.soportePlataforma.bandaAnchaMovilTpbam);
      setMediosDigitalesIpmd(init.soportePlataforma.mediosDigitalesIpmd);
      setCumplimientoResorte(init.soportePlataforma.cumplimientoLeyResorte);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Official Instrument Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-2xl p-6 border border-amber-500/30 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  MPPCI • INSTRUMENTO OFICIAL
                </span>
                <span className="text-xs text-amber-200 font-medium">GESTIÓN MIPCCI</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight mt-1 font-['Space_Grotesk']">
                Eje 4: Gestión de Viceministerios
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 max-w-3xl">
                Articulación del sistema de medios, análisis de inteligencia de datos, formación ético-técnica,
                infraestructura física, penetración digital (THAI, TPBAM, IPMD) y cumplimiento de la Ley RESORTE.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportarCSV}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Descargar matriz consolidada de los 4 viceministerios en formato CSV"
            >
              <Download className="w-4 h-4" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={handleGuardarReporte}
              className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Guardar Eje 4</span>
            </button>
          </div>
        </div>

        {/* Control Variables Card */}
        <div className="mt-4 pt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Fecha de Reporte</span>
            <input
              type="date"
              value={fechaCorte}
              onChange={(e) => setFechaCorte(e.target.value)}
              className="bg-transparent font-semibold text-white focus:outline-none w-full cursor-pointer"
            />
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Semana Epidemiológica</span>
            <div className="flex items-center space-x-1">
              <span className="text-amber-400 font-bold">N°</span>
              <input
                type="number"
                value={semanaReporte}
                onChange={(e) => setSemanaReporte(parseInt(e.target.value) || 1)}
                className="bg-transparent font-bold text-white focus:outline-none w-16"
              />
            </div>
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Responsable del Área</span>
            <input
              type="text"
              value={responsableCarga}
              onChange={(e) => setResponsableCarga(e.target.value)}
              className="bg-transparent font-semibold text-white focus:outline-none w-full"
            />
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Cédula de Identidad</span>
            <input
              type="text"
              value={cedulaIdentidad}
              onChange={(e) => setCedulaIdentidad(e.target.value)}
              className="bg-transparent font-semibold text-amber-300 focus:outline-none w-full"
            />
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Región / Localidad</span>
            <input
              type="text"
              value={regionLocalidad}
              onChange={(e) => setRegionLocalidad(e.target.value)}
              className="bg-transparent font-semibold text-white focus:outline-none w-full"
            />
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Teléfono de Contacto</span>
            <input
              type="text"
              value={telefonoContacto}
              onChange={(e) => setTelefonoContacto(e.target.value)}
              className="bg-transparent font-semibold text-white focus:outline-none w-full"
            />
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Correo Electrónico</span>
            <input
              type="email"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              className="bg-transparent font-semibold text-white focus:outline-none w-full truncate"
            />
          </div>
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Período de Corte</span>
            <div className="flex items-center space-x-1 font-mono text-[11px] text-amber-300">
              <span>Del:</span>
              <input 
                type="text" 
                value={periodoInicio} 
                onChange={(e) => setPeriodoInicio(e.target.value)}
                className="bg-transparent w-20 focus:outline-none"
              />
              <span>Al:</span>
              <input 
                type="text" 
                value={periodoFin} 
                onChange={(e) => setPeriodoFin(e.target.value)}
                className="bg-transparent w-20 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification Feedback */}
      {saveFeedback && (
        <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-semibold animate-in fade-in duration-200 ${
          saveSuccess ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-amber-50 text-amber-900 border-amber-300'
        }`}>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{saveFeedback}</span>
          </div>
          <button onClick={() => setSaveFeedback(null)} className="text-slate-500 hover:text-slate-800 text-sm">✕</button>
        </div>
      )}

      {/* Selector de Viceministerios (4 Despachos del Eje 4) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <button
            onClick={() => setActiveViceministerio('COMUNICACION_INFORMACION')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
              activeViceministerio === 'COMUNICACION_INFORMACION'
                ? 'bg-amber-50 border-2 border-amber-500 text-amber-950 shadow-sm'
                : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              activeViceministerio === 'COMUNICACION_INFORMACION' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <Smartphone className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">Despacho 1</span>
              <span className="text-xs font-bold truncate block">Comunicación e Información</span>
            </div>
          </button>

          <button
            onClick={() => setActiveViceministerio('GESTION_COMUNICACIONAL')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
              activeViceministerio === 'GESTION_COMUNICACIONAL'
                ? 'bg-amber-50 border-2 border-amber-500 text-amber-950 shadow-sm'
                : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              activeViceministerio === 'GESTION_COMUNICACIONAL' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">Despacho 2</span>
              <span className="text-xs font-bold truncate block">Gestión Comunicacional</span>
            </div>
          </button>

          <button
            onClick={() => setActiveViceministerio('PLANIFICACION_ESTRATEGIA')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
              activeViceministerio === 'PLANIFICACION_ESTRATEGIA'
                ? 'bg-amber-50 border-2 border-amber-500 text-amber-950 shadow-sm'
                : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              activeViceministerio === 'PLANIFICACION_ESTRATEGIA' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <Share2 className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">Viceministerio 3</span>
              <span className="text-xs font-bold truncate block">Planificación & Estrategia</span>
            </div>
          </button>

          <button
            onClick={() => setActiveViceministerio('SOPORTE_PLATAFORMA')}
            className={`flex items-center space-x-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
              activeViceministerio === 'SOPORTE_PLATAFORMA'
                ? 'bg-amber-50 border-2 border-amber-500 text-amber-950 shadow-sm'
                : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              activeViceministerio === 'SOPORTE_PLATAFORMA' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              <Wifi className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">Viceministerio 4</span>
              <span className="text-xs font-bold truncate block">Soporte de Plataforma</span>
            </div>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 1. DESPACHO DE COMUNICACIÓN E INFORMACIÓN                           */}
      {/* ==================================================================== */}
      {activeViceministerio === 'COMUNICACION_INFORMACION' && (
        <div className="space-y-6">
          {/* 1.1 Volumen Informativo y Difusión Transmedia */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                  SECCIÓN 1.1 • DESPACHO DE COMUNICACIÓN E INFORMACIÓN
                </span>
                <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                  Volumen Informativo y Difusión Transmedia
                </h3>
              </div>
              <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-xs">
                <span className="text-amber-800 font-medium">Total Piezas Móvil:</span>
                <span className="font-bold font-mono text-amber-950">{totalPiezasMovil}</span>
              </div>
            </div>

            {/* Número de comunicados oficiales y notas de prensa emitidos */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="text-xs font-bold text-slate-900 block">
                  Número de comunicados oficiales y notas de prensa emitidos:
                </label>
                <span className="text-[11px] text-slate-500">
                  Total de boletines de prensa gubernamental y alocuciones ministeriales oficiales pautadas en la semana.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  value={comunicadosEmitidos}
                  onChange={(e) => setComunicadosEmitidos(parseInt(e.target.value) || 0)}
                  className="w-28 px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold font-mono text-slate-900 text-right focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <span className="text-xs font-medium text-slate-600">Unidades</span>
              </div>
            </div>

            {/* Piezas comunicadas semanalmente usando telefonía móvil */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-900">
                  Piezas comunicadas semanalmente usando como medio la telefonía móvil (Canales Oficiales de Presidencia y ministros):
                </label>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Tipo de Comunicación</th>
                      <th className="p-3 w-40 text-right">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {difusionMovil.map((row, idx) => (
                      <tr key={row.tipoComunicacion} className="hover:bg-slate-50">
                        <td className="p-3 font-medium text-slate-800">{row.tipoComunicacion}</td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            min="0"
                            value={row.cantidad}
                            onChange={(e) => {
                              const updated = [...difusionMovil];
                              updated[idx].cantidad = parseInt(e.target.value) || 0;
                              setDifusionMovil(updated);
                            }}
                            className="w-28 px-2 py-1 bg-white border border-slate-300 rounded-lg font-bold font-mono text-slate-900 text-right focus:ring-1 focus:ring-amber-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-amber-50/50 font-bold border-t border-slate-200">
                    <tr>
                      <td className="p-3 text-slate-900">Total Despliegue Transmedia Móvil</td>
                      <td className="p-3 text-right font-mono text-amber-900">{totalPiezasMovil}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* 1.2 Tendencias Virales con Potencial Desestabilizador */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider">
                  SECCIÓN 1.2 • INTELIGENCIA DE MEDIOS DIGITALES Y REDES
                </span>
                <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                  Número de tendencias virales en redes y/o medios digitales con potencial desestabilizador detectadas
                </h3>
              </div>
              <div className="flex items-center space-x-2 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 text-xs">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span className="text-rose-800 font-medium">Amenazas Detectadas:</span>
                <span className="font-bold font-mono text-rose-950">{totalAmenazasVirales}</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3 min-w-[220px]">Origen</th>
                    <th className="p-3 w-28 text-center">Cantidad Detectado</th>
                    <th className="p-3 min-w-[280px]">Amenaza de Palabra o Frase Viral Detectada</th>
                    <th className="p-3 w-40">Fecha / Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-sans">
                  {/* Category Header 1 */}
                  <tr className="bg-slate-100/70">
                    <td colSpan={4} className="px-3 py-1.5 font-bold font-mono text-slate-700 text-[11px]">
                      MEDIOS DIGITALES
                    </td>
                  </tr>
                  {tendenciasVirales.filter(r => r.categoria === 'MEDIOS_DIGITALES').map((row, idx) => {
                    const realIdx = tendenciasVirales.findIndex(t => t.origen === row.origen);
                    return (
                      <tr key={row.origen} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">{row.origen}</td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="0"
                            value={row.cantidadDetectado}
                            onChange={(e) => {
                              const updated = [...tendenciasVirales];
                              updated[realIdx].cantidadDetectado = parseInt(e.target.value) || 0;
                              setTendenciasVirales(updated);
                            }}
                            className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-bold font-mono text-center text-slate-900 focus:ring-1 focus:ring-amber-500"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={row.amenazaPalabraFraseViral}
                            onChange={(e) => {
                              const updated = [...tendenciasVirales];
                              updated[realIdx].amenazaPalabraFraseViral = e.target.value;
                              setTendenciasVirales(updated);
                            }}
                            placeholder="Describa la frase viral o narrativa de ataque..."
                            className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:ring-1 focus:ring-amber-500"
                          />
                        </td>
                        <td className="p-3 font-mono">
                          <input
                            type="text"
                            value={row.fechaHora}
                            onChange={(e) => {
                              const updated = [...tendenciasVirales];
                              updated[realIdx].fechaHora = e.target.value;
                              setTendenciasVirales(updated);
                            }}
                            className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 text-xs"
                          />
                        </td>
                      </tr>
                    );
                  })}

                  {/* Category Header 2 */}
                  <tr className="bg-slate-100/70">
                    <td colSpan={4} className="px-3 py-1.5 font-bold font-mono text-slate-700 text-[11px]">
                      REDES SOCIALES
                    </td>
                  </tr>
                  {tendenciasVirales.filter(r => r.categoria === 'REDES_SOCIALES').map((row) => {
                    const realIdx = tendenciasVirales.findIndex(t => t.origen === row.origen);
                    return (
                      <tr key={row.origen} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">{row.origen}</td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            min="0"
                            value={row.cantidadDetectado}
                            onChange={(e) => {
                              const updated = [...tendenciasVirales];
                              updated[realIdx].cantidadDetectado = parseInt(e.target.value) || 0;
                              setTendenciasVirales(updated);
                            }}
                            className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-bold font-mono text-center text-slate-900 focus:ring-1 focus:ring-amber-500"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={row.amenazaPalabraFraseViral}
                            onChange={(e) => {
                              const updated = [...tendenciasVirales];
                              updated[realIdx].amenazaPalabraFraseViral = e.target.value;
                              setTendenciasVirales(updated);
                            }}
                            placeholder="Describa la frase viral o narrativa..."
                            className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-800 text-xs focus:ring-1 focus:ring-amber-500"
                          />
                        </td>
                        <td className="p-3 font-mono">
                          <input
                            type="text"
                            value={row.fechaHora}
                            onChange={(e) => {
                              const updated = [...tendenciasVirales];
                              updated[realIdx].fechaHora = e.target.value;
                              setTendenciasVirales(updated);
                            }}
                            className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 text-xs"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 1.3 Métricas de SEO Editorial */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="pb-3 border-b border-slate-200">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                SECCIÓN 1.3 • VISIBILIDAD DIGITAL Y CAPTACIÓN ORGÁNICA
              </span>
              <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                Métricas de SEO Editorial (Visibilidad y Captación)
              </h3>
              <p className="text-xs text-slate-500">
                Seguimiento a motores de búsqueda (Google, Bing, Yahoo), tasa de clics (CTR) y captación de suscriptores al medio oficial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Tráfico Orgánico Total */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">1. Tráfico Orgánico Total</span>
                  <Search className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Número de usuarios únicos y sesiones que llegan al medio Oficial a través de buscadores como Google, Bing o Yahoo.
                </p>
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="number"
                    min="0"
                    value={seoEditorial.traficoOrganicoTotal}
                    onChange={(e) => setSeoEditorial({ ...seoEditorial, traficoOrganicoTotal: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold font-mono text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-xs font-medium text-slate-600 shrink-0">Usuarios</span>
                </div>
              </div>

              {/* 2. Impresiones y Clics */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">2. Impresiones y Clics</span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">a. Impresiones (Apariciones)</label>
                    <input
                      type="number"
                      min="0"
                      value={seoEditorial.impresionesBuscadores}
                      onChange={(e) => setSeoEditorial({ ...seoEditorial, impresionesBuscadores: parseInt(e.target.value) || 0 })}
                      className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-bold font-mono text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">b. Clics (Tráfico Real)</label>
                    <input
                      type="number"
                      min="0"
                      value={seoEditorial.clicsBuscadores}
                      onChange={(e) => setSeoEditorial({ ...seoEditorial, clicsBuscadores: parseInt(e.target.value) || 0 })}
                      className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-bold font-mono text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Rendimiento */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">3. Rendimiento Espontáneo</span>
                <p className="text-[11px] text-slate-500">
                  Total de volumen de visitas espontáneas generadas por recomendación de noticias y descubrimientos algorítmicos.
                </p>
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="number"
                    min="0"
                    value={seoEditorial.rendimientoVisitasEspontaneas}
                    onChange={(e) => setSeoEditorial({ ...seoEditorial, rendimientoVisitasEspontaneas: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold font-mono text-slate-900"
                  />
                  <span className="text-xs font-medium text-slate-600 shrink-0">Visitas</span>
                </div>
              </div>

              {/* 4. CTR Orgánico y 5. Tasa de Conversión */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">4. CTR Orgánico & 5. Conversión</span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">4. CTR Orgánico (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={seoEditorial.ctrOrganico}
                        onChange={(e) => setSeoEditorial({ ...seoEditorial, ctrOrganico: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-bold font-mono text-xs text-slate-900 pr-6"
                      />
                      <span className="absolute right-2 top-1.5 text-xs text-slate-400 font-bold">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">5. Tasa Conversión (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        value={seoEditorial.tasaConversionSuscriptores}
                        onChange={(e) => setSeoEditorial({ ...seoEditorial, tasaConversionSuscriptores: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-bold font-mono text-xs text-slate-900 pr-6"
                      />
                      <span className="absolute right-2 top-1.5 text-xs text-slate-400 font-bold">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. DESPACHO DE GESTIÓN COMUNICACIONAL                                */}
      {/* ==================================================================== */}
      {activeViceministerio === 'GESTION_COMUNICACIONAL' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                EJE 4 • DESPACHO DE GESTIÓN COMUNICACIONAL
              </span>
              <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                Formación, Soberanía Tecnológica y Transmedia Popular
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-xl font-bold font-mono">
                Cobertura SNMP: {porcFormacionSnmp}%
              </span>
              <span className="text-xs bg-blue-50 text-blue-800 border border-blue-300 px-3 py-1 rounded-xl font-bold font-mono">
                Cobertura Voceros: {porcVoceros}%
              </span>
            </div>
          </div>

          {/* Master Table of Indicators */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-56">Nombre del Indicador</th>
                  <th className="p-3 w-16 text-center">Código</th>
                  <th className="p-3 min-w-[320px]">Variable</th>
                  <th className="p-3 w-36 text-right">Dato / Valor Capturado</th>
                  <th className="p-3 w-24">Unidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* 1. Formación y Adaptación Tecnológica */}
                <tr className="bg-amber-50/40">
                  <td colSpan={5} className="px-3 py-1.5 font-bold font-mono text-amber-900 text-[11px]">
                    1. FORMACIÓN Y ADAPTACIÓN TECNOLÓGICA
                  </td>
                </tr>
                {formacionAdaptacion.map((row, idx) => (
                  <tr key={row.variable} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{row.nombreIndicador}</td>
                    <td className="p-3 font-mono font-bold text-center text-amber-700">{row.codigoVariable}</td>
                    <td className="p-3 text-slate-700">
                      {row.variable}
                      {row.esDatoMaestro && (
                        <span className="ml-2 text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                          DATO MAESTRO
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        min="0"
                        value={row.valorCapturado}
                        onChange={(e) => {
                          const updated = [...formacionAdaptacion];
                          updated[idx].valorCapturado = parseInt(e.target.value) || 0;
                          setFormacionAdaptacion(updated);
                        }}
                        className="w-24 px-2 py-1 bg-white border border-slate-300 rounded-lg font-bold font-mono text-right text-slate-900 focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                    <td className="p-3 text-slate-500 font-mono">{row.unidad}</td>
                  </tr>
                ))}

                {/* 2. Soberanía Tecnológica en el Territorio */}
                <tr className="bg-amber-50/40">
                  <td colSpan={5} className="px-3 py-1.5 font-bold font-mono text-amber-900 text-[11px]">
                    2. SOBERANÍA TECNOLÓGICA EN EL TERRITORIO
                  </td>
                </tr>
                {soberaniaTerritorio.map((row, idx) => (
                  <tr key={row.variable} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{row.nombreIndicador}</td>
                    <td className="p-3 font-mono font-bold text-center text-amber-700">{row.codigoVariable}</td>
                    <td className="p-3 text-slate-700">{row.variable}</td>
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        min="0"
                        value={row.valorCapturado}
                        onChange={(e) => {
                          const updated = [...soberaniaTerritorio];
                          updated[idx].valorCapturado = parseInt(e.target.value) || 0;
                          setSoberaniaTerritorio(updated);
                        }}
                        className="w-24 px-2 py-1 bg-white border border-slate-300 rounded-lg font-bold font-mono text-right text-slate-900 focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                    <td className="p-3 text-slate-500 font-mono">{row.unidad}</td>
                  </tr>
                ))}

                {/* 3. Formación Popular Transmedia */}
                <tr className="bg-amber-50/40">
                  <td colSpan={5} className="px-3 py-1.5 font-bold font-mono text-amber-900 text-[11px]">
                    3. FORMACIÓN POPULAR TRANSMEDIA
                  </td>
                </tr>
                {formacionPopular.map((row, idx) => (
                  <tr key={row.variable} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{row.nombreIndicador}</td>
                    <td className="p-3 font-mono font-bold text-center text-amber-700">{row.codigoVariable}</td>
                    <td className="p-3 text-slate-700">{row.variable}</td>
                    <td className="p-3 text-right">
                      <input
                        type="number"
                        min="0"
                        value={row.valorCapturado}
                        onChange={(e) => {
                          const updated = [...formacionPopular];
                          updated[idx].valorCapturado = parseInt(e.target.value) || 0;
                          setFormacionPopular(updated);
                        }}
                        className="w-24 px-2 py-1 bg-white border border-slate-300 rounded-lg font-bold font-mono text-right text-slate-900 focus:ring-1 focus:ring-amber-500"
                      />
                    </td>
                    <td className="p-3 text-slate-500 font-mono">{row.unidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. VICEMINISTERIO DE PLANIFICACIÓN Y ESTRATEGIA COMUNICACIONAL      */}
      {/* ==================================================================== */}
      {activeViceministerio === 'PLANIFICACION_ESTRATEGIA' && (
        <div className="space-y-6">
          {/* 3.1 Matriz de Ecosistema Digital (KPIs de Canales) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                  SECCIÓN 3.1 • VICEMINISTERIO DE PLANIFICACIÓN Y ESTRATEGIA COMUNICACIONAL
                </span>
                <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                  Matriz de Ecosistema Digital (KPIs de Canales)
                </h3>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-500">EE Promedio:</span>
                <span className="font-bold font-mono text-purple-700">{globalEePorc}%</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3 min-w-[140px]">Plataforma</th>
                    <th className="p-3 w-32 text-right">Meta Semanal Vistas</th>
                    <th className="p-3 w-32 text-right">Vistas Logradas</th>
                    <th className="p-3 w-28 text-center">Var % vs Anterior</th>
                    <th className="p-3 w-32 text-right">Interacciones Totales</th>
                    <th className="p-3 w-32 text-right">Impresiones Netas</th>
                    <th className="p-3 w-24 text-center">EE (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {ecosistemaDigital.map((row, idx) => {
                    const ee = row.vistasLogradas > 0 ? ((row.interaccionesTotales / row.vistasLogradas) * 100).toFixed(1) : '0';
                    return (
                      <tr key={row.plataforma} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900 font-sans">{row.plataforma}</td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            min="0"
                            value={row.metaSemanalVistas}
                            onChange={(e) => {
                              const updated = [...ecosistemaDigital];
                              updated[idx].metaSemanalVistas = parseInt(e.target.value) || 0;
                              setEcosistemaDigital(updated);
                            }}
                            className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-bold text-right text-slate-800"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            min="0"
                            value={row.vistasLogradas}
                            onChange={(e) => {
                              const updated = [...ecosistemaDigital];
                              updated[idx].vistasLogradas = parseInt(e.target.value) || 0;
                              setEcosistemaDigital(updated);
                            }}
                            className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-bold text-right text-slate-900 focus:ring-1 focus:ring-amber-500"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            step="0.1"
                            value={row.varPorcSemanaAnterior}
                            onChange={(e) => {
                              const updated = [...ecosistemaDigital];
                              updated[idx].varPorcSemanaAnterior = parseFloat(e.target.value) || 0;
                              setEcosistemaDigital(updated);
                            }}
                            className="w-20 px-1 py-1 bg-white border border-slate-300 rounded font-bold text-center text-slate-800"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            min="0"
                            value={row.interaccionesTotales}
                            onChange={(e) => {
                              const updated = [...ecosistemaDigital];
                              updated[idx].interaccionesTotales = parseInt(e.target.value) || 0;
                              setEcosistemaDigital(updated);
                            }}
                            className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-bold text-right text-slate-800"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            min="0"
                            value={row.impresionesNetas}
                            onChange={(e) => {
                              const updated = [...ecosistemaDigital];
                              updated[idx].impresionesNetas = parseInt(e.target.value) || 0;
                              setEcosistemaDigital(updated);
                            }}
                            className="w-28 px-2 py-1 bg-white border border-slate-300 rounded font-bold text-right text-slate-800"
                          />
                        </td>
                        <td className="p-3 text-center font-bold text-purple-700">
                          {ee}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-100 font-bold border-t border-slate-200">
                  <tr>
                    <td className="p-3 text-slate-900 font-sans">Total Redes Digitales</td>
                    <td className="p-3 text-right font-mono text-slate-700">
                      {ecosistemaDigital.reduce((a, b) => a + (b.metaSemanalVistas || 0), 0).toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono text-slate-900">
                      {totalVistasLogradas.toLocaleString()}
                    </td>
                    <td className="p-3 text-center font-mono text-slate-600">—</td>
                    <td className="p-3 text-right font-mono text-slate-700">
                      {totalInteracciones.toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-mono text-slate-700">
                      {totalImpresiones.toLocaleString()}
                    </td>
                    <td className="p-3 text-center font-mono text-purple-800">{globalEePorc}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* 3.2 Volumen de Producción General y por Formato */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Volumen de Producción General */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] border-b border-slate-200 pb-2">
                Volumen de Producción General
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span className="font-bold text-slate-800">Total, de contenido publicado:</span>
                  <input
                    type="number"
                    min="0"
                    value={produccionGeneral.totalContenidoPublicado}
                    onChange={(e) => setProduccionGeneral({ ...produccionGeneral, totalContenidoPublicado: parseInt(e.target.value) || 0 })}
                    className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-bold font-mono text-right text-slate-900"
                  />
                </div>
                <div className="pl-3 space-y-2 border-l-2 border-amber-400">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">- Contenido en formato video:</span>
                    <input
                      type="number"
                      min="0"
                      value={produccionGeneral.contenidoFormatoVideo}
                      onChange={(e) => setProduccionGeneral({ ...produccionGeneral, contenidoFormatoVideo: parseInt(e.target.value) || 0 })}
                      className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-right text-slate-800"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">- Contenido en formato publicación:</span>
                    <input
                      type="number"
                      min="0"
                      value={produccionGeneral.contenidoFormatoPublicacion}
                      onChange={(e) => setProduccionGeneral({ ...produccionGeneral, contenidoFormatoPublicacion: parseInt(e.target.value) || 0 })}
                      className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-right text-slate-800"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">- Contenido en formato radial:</span>
                    <input
                      type="number"
                      min="0"
                      value={produccionGeneral.contenidoFormatoRadial}
                      onChange={(e) => setProduccionGeneral({ ...produccionGeneral, contenidoFormatoRadial: parseInt(e.target.value) || 0 })}
                      className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-right text-slate-800"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-amber-50/60 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-900">Contenido de producción propia:</span>
                  <input
                    type="number"
                    min="0"
                    value={produccionGeneral.contenidoProduccionPropia}
                    onChange={(e) => setProduccionGeneral({ ...produccionGeneral, contenidoProduccionPropia: parseInt(e.target.value) || 0 })}
                    className="w-24 px-2 py-1 bg-white border border-amber-300 rounded font-bold font-mono text-right text-amber-900"
                  />
                </div>
              </div>
            </div>

            {/* Desglose por Formatos y Despliegue */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] border-b border-slate-200 pb-2">
                Desglose por Formatos y Despliegue
              </h3>
              <div className="space-y-2 text-xs">
                {formatosDespliegue.map((row, idx) => (
                  <div key={row.tipoContenido} className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">{row.tipoContenido}</span>
                    <input
                      type="number"
                      min="0"
                      value={row.cantidadUnidades}
                      onChange={(e) => {
                        const updated = [...formatosDespliegue];
                        updated[idx].cantidadUnidades = parseInt(e.target.value) || 0;
                        setFormatosDespliegue(updated);
                      }}
                      className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-right text-slate-800"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3.3 Tipos de Contenido Audiovisual & KPIs Internos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipos de Contenido Audiovisual */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] border-b border-slate-200 pb-2">
                Tipos de Contenido Audiovisual (Desglose)
              </h3>
              <div className="space-y-2.5 text-xs">
                {tiposAudiovisual.map((row, idx) => (
                  <div key={row.categoria} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl">
                    <span className="font-medium text-slate-800">{row.categoria}</span>
                    <input
                      type="number"
                      min="0"
                      value={row.cantidadUnidades}
                      onChange={(e) => {
                        const updated = [...tiposAudiovisual];
                        updated[idx].cantidadUnidades = parseInt(e.target.value) || 0;
                        setTiposAudiovisual(updated);
                      }}
                      className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-mono text-right text-slate-900 font-bold"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Producción Audiovisual (KPIs Internos) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] border-b border-slate-200 pb-2">
                Producción Audiovisual (KPIs Internos)
              </h3>
              <div className="space-y-3 text-xs">
                {kpisAudiovisual.map((row, idx) => (
                  <div key={row.indicador} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 block">{row.indicador}</span>
                      <span className="text-[11px] text-slate-500">{row.descripcion}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={row.valorCapturado}
                        onChange={(e) => {
                          const updated = [...kpisAudiovisual];
                          updated[idx].valorCapturado = parseFloat(e.target.value) || 0;
                          setKpisAudiovisual(updated);
                        }}
                        className="w-20 px-2 py-1 bg-white border border-slate-300 rounded font-bold font-mono text-right text-slate-900"
                      />
                      <span className="text-xs font-mono text-slate-500">{row.unidad}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3.4 Investigaciones Especiales, Entrevistas y Red de Creadores */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Desglose de Entrevistas */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 lg:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                    Investigaciones Especiales y Entrevistas
                  </h3>
                  <span className="text-xs text-slate-500">Desglose temático de vocerías recogidas en el período</span>
                </div>
                <div className="flex items-center space-x-2 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-xs">
                  <span className="text-amber-800">Investigaciones:</span>
                  <input
                    type="number"
                    min="0"
                    value={investigacionesCantidad}
                    onChange={(e) => setInvestigacionesCantidad(parseInt(e.target.value) || 0)}
                    className="w-14 px-1 py-0.5 bg-white border border-amber-300 rounded font-bold font-mono text-center text-amber-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {desgloseEntrevistas.map((row, idx) => (
                  <div key={row.categoria} className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-700 truncate">{row.categoria}</span>
                    <input
                      type="number"
                      min="0"
                      value={row.cantidad}
                      onChange={(e) => {
                        const updated = [...desgloseEntrevistas];
                        updated[idx].cantidad = parseInt(e.target.value) || 0;
                        setDesgloseEntrevistas(updated);
                      }}
                      className="w-14 px-1 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-right text-slate-900"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Red de Creadores Aliados y Articulación */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] border-b border-slate-200 pb-2">
                Red de Creadores Aliados
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-500 block text-[11px]">N° de creadores activos:</label>
                  <input
                    type="number"
                    min="0"
                    value={redCreadores.numCreadoresActivos}
                    onChange={(e) => setRedCreadores({ ...redCreadores, numCreadoresActivos: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900 mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block text-[11px]">Vistas en redes aliadas:</label>
                  <input
                    type="number"
                    min="0"
                    value={redCreadores.vistasDifusionRedesAliadas}
                    onChange={(e) => setRedCreadores({ ...redCreadores, vistasDifusionRedesAliadas: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900 mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block text-[11px]">Articulación con medios privados:</label>
                  <input
                    type="number"
                    min="0"
                    value={redCreadores.articulacionMediosPrivados}
                    onChange={(e) => setRedCreadores({ ...redCreadores, articulacionMediosPrivados: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900 mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block text-[11px]">Articulación con medios internacionales:</label>
                  <input
                    type="number"
                    min="0"
                    value={redCreadores.articulacionMediosInternacionales}
                    onChange={(e) => setRedCreadores({ ...redCreadores, articulacionMediosInternacionales: parseInt(e.target.value) || 0 })}
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900 mt-0.5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3.5 Gestión de Narrativa y Monitoreo de Medios */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                  SECCIÓN 3.5 • MONITOREO Y MATRICES
                </span>
                <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk'] flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <span>Gestión de Narrativa y Monitoreo de Medios</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Instrumento de seguimiento a matrices discursivas, alertas de desinformación, síntesis de prensa y vocerías.
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-xs">
                <span className="text-amber-800 font-medium">Total Procesado:</span>
                <span className="font-mono font-bold text-amber-900 text-sm">
                  {narrativaPlanificacion.reduce((acc, curr) => acc + (Number(curr.cantidadUnidades) || 0), 0).toLocaleString()} uds
                </span>
              </div>
            </div>

            {/* Tabla de Concepto y Cantidad (Unidades) */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3 min-w-[340px]">Concepto</th>
                    <th className="p-3 w-52 text-right">Cantidad (Unidades)</th>
                    <th className="p-3 w-16 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {narrativaPlanificacion.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-center font-mono font-bold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.concepto}
                          onChange={(e) => {
                            const updated = [...narrativaPlanificacion];
                            updated[idx].concepto = e.target.value;
                            setNarrativaPlanificacion(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 font-medium text-xs focus:ring-1 focus:ring-amber-500"
                          placeholder="Nombre del concepto de narrativa..."
                        />
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <input
                            type="number"
                            min="0"
                            value={row.cantidadUnidades}
                            onChange={(e) => {
                              const updated = [...narrativaPlanificacion];
                              updated[idx].cantidadUnidades = parseInt(e.target.value) || 0;
                              setNarrativaPlanificacion(updated);
                            }}
                            className="w-32 px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-bold font-mono text-right text-slate-900 focus:ring-2 focus:ring-amber-500 shadow-inner"
                            placeholder="0"
                          />
                          <span className="text-[11px] font-mono text-slate-500 w-8 text-left">uds</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            if (narrativaPlanificacion.length > 1) {
                              const updated = narrativaPlanificacion.filter((_, i) => i !== idx);
                              setNarrativaPlanificacion(updated);
                            }
                          }}
                          disabled={narrativaPlanificacion.length <= 1}
                          className="text-slate-400 hover:text-rose-600 disabled:opacity-30 transition-colors p-1"
                          title="Eliminar concepto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                  <tr>
                    <td colSpan={2} className="p-3 text-slate-700 text-right">
                      Total Gestión de Narrativa y Monitoreo de Medios:
                    </td>
                    <td className="p-3 text-right font-mono text-amber-900 text-sm">
                      {narrativaPlanificacion.reduce((acc, curr) => acc + (Number(curr.cantidadUnidades) || 0), 0).toLocaleString()} uds
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setNarrativaPlanificacion([
                    ...narrativaPlanificacion,
                    { concepto: '', cantidadUnidades: 0 }
                  ]);
                }}
                className="flex items-center space-x-1.5 text-xs text-amber-700 hover:text-amber-800 font-semibold px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Concepto de Narrativa</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setNarrativaPlanificacion([
                    { concepto: 'N° de Alertas de Matrices Procesadas (Rumores/Noticias Falsas)', cantidadUnidades: 48 },
                    { concepto: 'Informes de Narrativa Emitidos', cantidadUnidades: 14 },
                    { concepto: 'Reportes de Primeras Planas (Nacional, Regional e Internacional)', cantidadUnidades: 84 },
                    { concepto: 'Resúmenes de Vocerías Oficiales', cantidadUnidades: 18 },
                    { concepto: 'Narrativas y contranarrativas', cantidadUnidades: 32 }
                  ]);
                }}
                className="text-[11px] text-slate-500 hover:text-slate-700 underline cursor-pointer"
              >
                Restablecer 5 conceptos oficiales por defecto
              </button>
            </div>
          </div>

          {/* 3.6 Producción de Contenidos Escrito & 3.7 Trending Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Producción de Contenidos Escrito */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider block">
                    SECCIÓN 3.6 • EDITORIAL
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Producción de Contenidos Escrito</span>
                  </h3>
                </div>
                <div className="bg-blue-50 text-blue-800 border border-blue-200 font-mono font-bold text-xs px-2.5 py-1 rounded-lg">
                  Total: {((Number(contenidoEscrito.notasPrensaArticulosWeb) || 0) + (Number(contenidoEscrito.publicacionesMicroblogging) || 0) + (Number(contenidoEscrito.publicacionesHilosTexto) || 0)).toLocaleString()} uds
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 gap-2">
                  <span className="font-semibold text-slate-800">
                    Notas de prensa y artículos web:
                  </span>
                  <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                    <input
                      type="number"
                      min="0"
                      value={contenidoEscrito.notasPrensaArticulosWeb}
                      onChange={(e) => setContenidoEscrito({ ...contenidoEscrito, notasPrensaArticulosWeb: parseInt(e.target.value) || 0 })}
                      className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold font-mono text-right text-slate-900 shadow-inner focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                    <span className="text-[11px] font-mono text-slate-500">uds</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 gap-2">
                  <span className="font-semibold text-slate-800">
                    Publicaciones en red de microblogging:
                  </span>
                  <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                    <input
                      type="number"
                      min="0"
                      value={contenidoEscrito.publicacionesMicroblogging}
                      onChange={(e) => setContenidoEscrito({ ...contenidoEscrito, publicacionesMicroblogging: parseInt(e.target.value) || 0 })}
                      className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold font-mono text-right text-slate-900 shadow-inner focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                    <span className="text-[11px] font-mono text-slate-500">uds</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 gap-2">
                  <span className="font-semibold text-slate-800">
                    Publicaciones en plataformas de hilos de texto:
                  </span>
                  <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                    <input
                      type="number"
                      min="0"
                      value={contenidoEscrito.publicacionesHilosTexto}
                      onChange={(e) => setContenidoEscrito({ ...contenidoEscrito, publicacionesHilosTexto: parseInt(e.target.value) || 0 })}
                      className="w-28 px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold font-mono text-right text-slate-900 shadow-inner focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                    <span className="text-[11px] font-mono text-slate-500">uds</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Topics (Top 10) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider block">
                    SECCIÓN 3.7 • CONVERSACIÓN
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] flex items-center space-x-1.5">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Trending Topics (Principales 10 temas)</span>
                  </h3>
                </div>
              </div>
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 text-xs">
                {trendingTopics.map((row, idx) => (
                  <div key={row.posicion} className="flex items-center space-x-2 p-1.5 bg-slate-50 rounded-lg">
                    <span className="w-5 font-mono font-bold text-amber-600 text-center">{row.posicion}</span>
                    <input
                      type="text"
                      value={row.tema}
                      onChange={(e) => {
                        const updated = [...trendingTopics];
                        updated[idx].tema = e.target.value;
                        setTrendingTopics(updated);
                      }}
                      className="flex-1 px-2 py-1 bg-white border border-slate-300 rounded text-slate-800 font-semibold text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. VICEMINISTERIO DE SOPORTE DE PLATAFORMA COMUNICACIONAL           */}
      {/* ==================================================================== */}
      {activeViceministerio === 'SOPORTE_PLATAFORMA' && (
        <div className="space-y-6">
          {/* 4.1 Cobertura e Infraestructura (MAC y Transmisores) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                  SECCIÓN 4.1 • INFRAESTRUCTURA Y COBERTURA
                </span>
                <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                  Medios Alternativos y Comunitarios (MAC) y Transmisores
                </h3>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs">
                <span className="text-emerald-800 font-medium">Operatividad Transmisores:</span>
                <span className="font-bold font-mono text-emerald-950">{transmisoresOperativosPorc}%</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-56">Indicador</th>
                    <th className="p-3 w-16 text-center">Código</th>
                    <th className="p-3 min-w-[300px]">Variable</th>
                    <th className="p-3 w-36 text-right">Dato / Valor Capturado</th>
                    <th className="p-3 min-w-[240px]">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mediosComunitariosTransmisores.map((row, idx) => (
                    <tr key={row.variable} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{row.indicador}</td>
                      <td className="p-3 font-mono font-bold text-center text-amber-700">{row.codigoVariable}</td>
                      <td className="p-3 text-slate-700">
                        {row.variable}
                        {row.esDatoMaestro && (
                          <span className="ml-2 text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                            DATO MAESTRO
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          min="0"
                          value={row.valorCapturado}
                          onChange={(e) => {
                            const updated = [...mediosComunitariosTransmisores];
                            updated[idx].valorCapturado = parseInt(e.target.value) || 0;
                            setMediosComunitariosTransmisores(updated);
                          }}
                          className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-right text-slate-900"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.observaciones}
                          onChange={(e) => {
                            const updated = [...mediosComunitariosTransmisores];
                            updated[idx].observaciones = e.target.value;
                            setMediosComunitariosTransmisores(updated);
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4.2 Cobertura Territorial de Medios Públicos y Privados (ICTM) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                SECCIÓN 4.2 • COBERTURA TERRITORIAL ELECTROMAGNÉTICA
              </span>
              <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                Cobertura Territorial de Medios Públicos y Privados (ICTM)
              </h3>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-56">Indicador</th>
                    <th className="p-3 w-16 text-center">Código</th>
                    <th className="p-3 min-w-[300px]">Variable</th>
                    <th className="p-3 w-40 text-right">Dato Capturado (km²)</th>
                    <th className="p-3 min-w-[240px]">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {coberturaTerritorial.map((row, idx) => (
                    <tr key={row.variable} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{row.indicador}</td>
                      <td className="p-3 font-mono font-bold text-center text-amber-700">{row.codigoVariable}</td>
                      <td className="p-3 text-slate-700">
                        {row.variable}
                        {row.esDatoMaestro && (
                          <span className="ml-2 text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                            DATO MAESTRO
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <input
                          type="number"
                          min="0"
                          value={row.valorCapturado}
                          onChange={(e) => {
                            const updated = [...coberturaTerritorial];
                            updated[idx].valorCapturado = parseInt(e.target.value) || 0;
                            setCoberturaTerritorial(updated);
                          }}
                          className="w-32 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-right text-slate-900"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.observaciones}
                          onChange={(e) => {
                            const updated = [...coberturaTerritorial];
                            updated[idx].observaciones = e.target.value;
                            setCoberturaTerritorial(updated);
                          }}
                          className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4.3 Indicadores de Acceso y Penetración Digital (THAI, TPBAM, IPMD) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                  SECCIÓN 4.3 • CONECTIVIDAD NACIONAL Y DIGITAL
                </span>
                <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                  Indicadores de Acceso y Penetración Digital
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-lg font-bold font-mono">
                  THAI: {thaiPorc}%
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold font-mono">
                  TPBAM: {tpbamPorc}%
                </span>
                <span className="bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-lg font-bold font-mono">
                  IPMD: {ipmdPorc}%
                </span>
              </div>
            </div>

            {/* Subtabla 1: THAI */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Tasa de Hogares con Acceso a Internet (THAI)</span>
                <span className="font-mono text-blue-700 font-bold">{thaiPorc}% Penetración</span>
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="p-2.5 w-48">Indicador</th>
                      <th className="p-2.5 w-16 text-center">Código</th>
                      <th className="p-2.5">Variable</th>
                      <th className="p-2.5 w-36 text-right">Dato Capturado</th>
                      <th className="p-2.5 w-72">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {hogaresInternetThai.map((row, idx) => (
                      <tr key={row.variable}>
                        <td className="p-2.5 font-bold text-slate-900">{row.indicador}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-amber-700">{row.codigoVariable}</td>
                        <td className="p-2.5 text-slate-700">{row.variable}</td>
                        <td className="p-2.5 text-right">
                          <input
                            type="number"
                            value={row.valorCapturado}
                            onChange={(e) => {
                              const updated = [...hogaresInternetThai];
                              updated[idx].valorCapturado = parseInt(e.target.value) || 0;
                              setHogaresInternetThai(updated);
                            }}
                            className="w-28 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-right"
                          />
                        </td>
                        <td className="p-2.5 text-slate-500 text-[11px]">{row.observaciones}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subtabla 2: TPBAM */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Tasa de Penetración de Banda Ancha Móvil (TPBAM)</span>
                <span className="font-mono text-emerald-700 font-bold">{tpbamPorc}% Penetración</span>
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="p-2.5 w-48">Indicador</th>
                      <th className="p-2.5 w-16 text-center">Código</th>
                      <th className="p-2.5">Variable</th>
                      <th className="p-2.5 w-36 text-right">Dato Capturado</th>
                      <th className="p-2.5 w-72">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {bandaAnchaMovilTpbam.map((row, idx) => (
                      <tr key={row.variable}>
                        <td className="p-2.5 font-bold text-slate-900">{row.indicador}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-amber-700">{row.codigoVariable}</td>
                        <td className="p-2.5 text-slate-700">{row.variable}</td>
                        <td className="p-2.5 text-right">
                          <input
                            type="number"
                            value={row.valorCapturado}
                            onChange={(e) => {
                              const updated = [...bandaAnchaMovilTpbam];
                              updated[idx].valorCapturado = parseInt(e.target.value) || 0;
                              setBandaAnchaMovilTpbam(updated);
                            }}
                            className="w-28 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-right"
                          />
                        </td>
                        <td className="p-2.5 text-slate-500 text-[11px]">{row.observaciones}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subtabla 3: IPMD */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center justify-between">
                <span>Índice de Penetración de Medios Digitales (IPMD)</span>
                <span className="font-mono text-purple-700 font-bold">{ipmdPorc}% Penetración</span>
              </h4>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="p-2.5 w-48">Indicador</th>
                      <th className="p-2.5 w-16 text-center">Código</th>
                      <th className="p-2.5">Variable</th>
                      <th className="p-2.5 w-36 text-right">Dato Capturado</th>
                      <th className="p-2.5 w-72">Observaciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {mediosDigitalesIpmd.map((row, idx) => (
                      <tr key={row.variable}>
                        <td className="p-2.5 font-bold text-slate-900">{row.indicador}</td>
                        <td className="p-2.5 text-center font-mono font-bold text-amber-700">{row.codigoVariable}</td>
                        <td className="p-2.5 text-slate-700">{row.variable}</td>
                        <td className="p-2.5 text-right">
                          <input
                            type="number"
                            value={row.valorCapturado}
                            onChange={(e) => {
                              const updated = [...mediosDigitalesIpmd];
                              updated[idx].valorCapturado = parseInt(e.target.value) || 0;
                              setMediosDigitalesIpmd(updated);
                            }}
                            className="w-28 px-2 py-1 bg-white border border-slate-300 rounded font-mono font-bold text-right"
                          />
                        </td>
                        <td className="p-2.5 text-slate-500 text-[11px]">{row.observaciones}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 4.4 Cumplimiento Ley RESORTE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="pb-3 border-b border-slate-200">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                SECCIÓN 4.4 • MARCO NORMATIVO Y REGULATORIO
              </span>
              <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                Cumplimiento de la Ley de Responsabilidad Social en Radio, Televisión y Medios Electrónicos (Ley RESORTE)
              </h3>
              <p className="text-xs text-slate-500">
                Monitoreo continuo de franjas horarias, cuota de producción nacional, protección de menores y obligaciones tributarias.
              </p>
            </div>

            <div className="space-y-6">
              {cumplimientoResorte.map((sujeto, sIdx) => (
                <div key={sujeto.sujetoRegulado} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                    <div className="flex items-center space-x-2">
                      <FileCheck2 className="w-4 h-4 text-amber-600" />
                      <h4 className="text-sm font-bold text-slate-900">{sujeto.sujetoRegulado}</h4>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-slate-600 font-medium">Cantidad Medida:</span>
                      <input
                        type="number"
                        min="0"
                        value={sujeto.cantidadMedida}
                        onChange={(e) => {
                          const updated = [...cumplimientoResorte];
                          updated[sIdx].cantidadMedida = parseInt(e.target.value) || 0;
                          setCumplimientoResorte(updated);
                        }}
                        className="w-20 px-2 py-1 bg-white border border-slate-300 rounded font-bold font-mono text-center text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-semibold">
                        <tr>
                          <th className="p-2.5 w-48">Indicador de Cumplimiento</th>
                          <th className="p-2.5 w-52">% Estado de Cumplimiento</th>
                          <th className="p-2.5">Observaciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {sujeto.criterios.map((criterio, cIdx) => (
                          <tr key={criterio.criterio}>
                            <td className="p-2.5 font-bold text-slate-900">{criterio.criterio}</td>
                            <td className="p-2.5">
                              <select
                                value={criterio.estado}
                                onChange={(e) => {
                                  const updated = [...cumplimientoResorte];
                                  updated[sIdx].criterios[cIdx].estado = e.target.value as EstatusCumplimientoResorte;
                                  setCumplimientoResorte(updated);
                                }}
                                className={`w-full px-2 py-1 rounded-lg border text-xs font-bold ${
                                  criterio.estado === 'CUMPLE_TOTALMENTE'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : criterio.estado === 'CUMPLE_PARCIALMENTE'
                                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                                    : 'bg-rose-50 text-rose-800 border-rose-300'
                                }`}
                              >
                                <option value="CUMPLE_TOTALMENTE">[✔] Cumple Totalmente</option>
                                <option value="CUMPLE_PARCIALMENTE">[⚠] Cumple Parcialmente</option>
                                <option value="INCUMPLE">[✖] Incumple</option>
                              </select>
                            </td>
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={criterio.observaciones}
                                onChange={(e) => {
                                  const updated = [...cumplimientoResorte];
                                  updated[sIdx].criterios[cIdx].observaciones = e.target.value;
                                  setCumplimientoResorte(updated);
                                }}
                                placeholder="Detalles de fiscalización, inspección o solvencia..."
                                className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-800 text-xs"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Bar */}
      <div className="sticky bottom-4 z-20 bg-slate-900/95 backdrop-blur border border-amber-500/30 text-white rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></div>
          <div>
            <span className="font-bold text-white">Eje 4: Gestión MIPCCI / Viceministerios</span>
            <span className="text-slate-400 block text-[11px]">
              Semana {semanaReporte} • {fechaCorte} • {enteInformante}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleRestablecerValores}
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>
          <button
            onClick={handleExportarCSV}
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-semibold transition-all cursor-pointer border border-amber-500/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          <button
            onClick={handleGuardarReporte}
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Guardar Reporte Eje 4</span>
          </button>
        </div>
      </div>
    </div>
  );
};
