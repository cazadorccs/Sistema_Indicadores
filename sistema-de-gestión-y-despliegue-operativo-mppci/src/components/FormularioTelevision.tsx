import React, { useState } from 'react';
import { 
  Tv, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Download, 
  Calculator, 
  Sparkles, 
  Building2, 
  Calendar, 
  UserCheck, 
  AlertCircle, 
  Activity, 
  Video, 
  Film, 
  MonitorPlay, 
  BarChart3, 
  Layers, 
  Hash, 
  ShieldCheck, 
  AlertTriangle,
  Clapperboard,
  Antenna,
  RadioTower,
  FileSpreadsheet
} from 'lucide-react';
import { 
  TVRowAlcance, 
  TVRowProduccion, 
  TVRowDesgloseProduccion, 
  TVRowLogistica, 
  FullWeeklyReport, 
  MediaOperationalData, 
  UserAccount, 
  RACIRole 
} from '../types';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';

interface FormularioTelevisionProps {
  initialAlcanceRows?: TVRowAlcance[];
  initialProduccionRows?: TVRowProduccion[];
  initialDesgloseRows?: TVRowDesgloseProduccion[];
  initialLogisticaRows?: TVRowLogistica[];
  mediosData?: MediaOperationalData;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onSuccessSave?: (message: string) => void;
}

const DEFAULT_ALCANCE_ROWS: TVRowAlcance[] = [
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
];

const DEFAULT_PRODUCCION_ROWS: TVRowProduccion[] = [
  {
    codigo: 'TV-006',
    indicador: 'Programas producidos',
    frecuencia: 'Semanal',
    logrado: 42,
    observaciones: 'Parrilla informativa, magazines matutinos y espacios de análisis'
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
    observaciones: 'Micros de cultura preventiva y autoprotección ciudadana'
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
];

const DEFAULT_DESGLOSE_ROWS: TVRowDesgloseProduccion[] = [
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
];

const DEFAULT_LOGISTICA_ROWS: TVRowLogistica[] = [
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
    observaciones: 'Periodistas, reporteros gráficos y productores en despliegue'
  }
];

type SubTabTV = 'TODOS' | 'ALCANCE' | 'PRODUCCION' | 'DESGLOSE' | 'LOGISTICA';

export const FormularioTelevision: React.FC<FormularioTelevisionProps> = ({
  initialAlcanceRows,
  initialProduccionRows,
  initialDesgloseRows,
  initialLogisticaRows,
  mediosData,
  report,
  onSaveReport,
  currentUser,
  currentRole,
  onSuccessSave
}) => {
  const [activeTab, setActiveTab] = useState<SubTabTV>('TODOS');

  // Form 1: Televisión Abierta y por Suscripción (TV-001 al TV-005)
  const [alcanceRows, setAlcanceRows] = useState<TVRowAlcance[]>(() => {
    if (initialAlcanceRows && initialAlcanceRows.length >= 5) return initialAlcanceRows;
    if (report?.eje1Data?.audiovisuales?.alcance && report.eje1Data.audiovisuales.alcance.length >= 5) {
      return report.eje1Data.audiovisuales.alcance;
    }
    if (mediosData) {
      return [
        {
          codigo: 'TV-001',
          indicador: 'Horas de transmisión totales',
          frecuencia: 'Diaria',
          metaSemanal: 168,
          logrado: mediosData.horasTransmisionTV || 168,
          varSemanaAnterior: 0.0
        },
        {
          codigo: 'TV-002',
          indicador: '% de operatividad de señal',
          frecuencia: 'Diaria',
          metaSemanal: 99.0,
          logrado: mediosData.operatividadSenalTV || 98.6,
          varSemanaAnterior: 0.8
        },
        {
          codigo: 'TV-003',
          indicador: 'Cobertura nacional (%)',
          frecuencia: 'Semanal',
          metaSemanal: 92.0,
          logrado: mediosData.coberturaNacionalTV || 91.2,
          varSemanaAnterior: 1.5
        },
        {
          codigo: 'TV-004',
          indicador: '% de señal TDA operativa',
          frecuencia: 'Diaria',
          metaSemanal: 94.0,
          logrado: mediosData.senalTDAOperativaTV || 93.5,
          varSemanaAnterior: 2.1
        },
        {
          codigo: 'TV-005',
          indicador: 'Canales satelitales activos',
          frecuencia: 'Diaria',
          metaSemanal: 8,
          logrado: mediosData.canalesSatelitalesActivosTV || 8,
          varSemanaAnterior: 0.0
        }
      ];
    }
    return DEFAULT_ALCANCE_ROWS;
  });

  // Form 2: Producción Audiovisual (TV-006 al TV-013)
  const [produccionRows, setProduccionRows] = useState<TVRowProduccion[]>(() => {
    if (initialProduccionRows && initialProduccionRows.length >= 8) return initialProduccionRows;
    if (report?.eje1Data?.audiovisuales?.produccion && report.eje1Data.audiovisuales.produccion.length >= 8) {
      return report.eje1Data.audiovisuales.produccion;
    }
    if (mediosData) {
      return [
        {
          codigo: 'TV-006',
          indicador: 'Programas producidos',
          frecuencia: 'Semanal',
          logrado: mediosData.programasProducidosTV || 42,
          observaciones: 'Parrilla informativa, magazines matutinos y espacios de análisis'
        },
        {
          codigo: 'TV-007',
          indicador: 'Horas de programación propia',
          frecuencia: 'Semanal',
          logrado: mediosData.horasProgramacionPropiaTV || 126,
          observaciones: '75% de la parrilla total de transmisión semanal'
        },
        {
          codigo: 'TV-008',
          indicador: 'Pases en vivo desde campo',
          frecuencia: 'Diaria',
          logrado: mediosData.pasesEnVivoCampoTV || 68,
          observaciones: 'Despliegue con mochilas LiveU y enlaces satelitales DSNG'
        },
        {
          codigo: 'TV-009',
          indicador: 'Coberturas especiales',
          frecuencia: 'Diaria',
          logrado: mediosData.coberturasEspecialesTV || 19,
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
          observaciones: 'Micros de cultura preventiva y autoprotección ciudadana'
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
      ];
    }
    return DEFAULT_PRODUCCION_ROWS;
  });

  // Form 3: Desglose por Tipo de Producción Audiovisual (7 Tipos)
  const [desgloseRows, setDesgloseRows] = useState<TVRowDesgloseProduccion[]>(() => {
    if (initialDesgloseRows && initialDesgloseRows.length >= 7) return initialDesgloseRows;
    if (report?.eje1Data?.audiovisuales?.desgloseProduccion && report.eje1Data.audiovisuales.desgloseProduccion.length >= 7) {
      return report.eje1Data.audiovisuales.desgloseProduccion;
    }
    return DEFAULT_DESGLOSE_ROWS;
  });

  // Form 4: Equipamiento y Logística Audiovisual (TV-014 al TV-019)
  const [logisticaRows, setLogisticaRows] = useState<TVRowLogistica[]>(() => {
    if (initialLogisticaRows && initialLogisticaRows.length >= 6) return initialLogisticaRows;
    if (report?.eje1Data?.audiovisuales?.logistica && report.eje1Data.audiovisuales.logistica.length >= 6) {
      return report.eje1Data.audiovisuales.logistica;
    }
    if (mediosData) {
      return [
        {
          codigo: 'TV-014',
          indicador: 'Unidades móviles de producción operativas',
          valor: mediosData.unidadesMovilesOperativas || 9,
          totalRef: mediosData.unidadesMovilesTotal || 10,
          observaciones: '8 unidades HD operativas + 1 unidad DSNG satelital'
        },
        {
          codigo: 'TV-015',
          indicador: 'Cámaras de producción disponibles',
          valor: mediosData.camarasProduccionOperativas || 48,
          totalRef: mediosData.camarasProduccionTotal || 52,
          observaciones: 'Cámaras de estudio 4K y kits portátiles ENG'
        },
        {
          codigo: 'TV-016',
          indicador: 'Equipos de edición operativos',
          valor: mediosData.equiposEdicionOperativos || 24,
          totalRef: mediosData.equiposEdicionTotal || 26,
          observaciones: 'Suites de edición no lineal conectadas a SAN'
        },
        {
          codigo: 'TV-017',
          indicador: 'Plantas de emergencia',
          valor: mediosData.plantasEmergenciaTVOperativas || 8,
          totalRef: mediosData.plantasEmergenciaTVTotal || 8,
          observaciones: '100% de redundancia eléctrica operativa en sede central'
        },
        {
          codigo: 'TV-018',
          indicador: 'Personal técnico disponible',
          valor: mediosData.personalTecnicoTV || 215,
          totalRef: 230,
          observaciones: 'Camarógrafos, operadores de máster, sonidistas y directores'
        },
        {
          codigo: 'TV-019',
          indicador: 'Personal en campo (producción)',
          valor: mediosData.personalCampoTV || 84,
          observaciones: 'Periodistas, reporteros gráficos y productores en despliegue'
        }
      ];
    }
    return DEFAULT_LOGISTICA_ROWS;
  });

  // Control & Metadata
  const [enteInformante, setEnteInformante] = useState<string>(
    currentUser?.enteAdscrito === 'MPPCI_CENTRAL' 
      ? 'Venezolana de Televisión (VTV Canal 8)' 
      : (currentUser?.enteAdscrito || 'Venezolana de Televisión (VTV Canal 8)')
  );
  const [responsableCarga, setResponsableCarga] = useState<string>(
    currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : 'Lic. Rafael Domínguez (Gerente General de Operaciones VTV)'
  );
  const [cedulaResponsable, setCedulaResponsable] = useState<string>(
    currentUser?.cedula || 'V-14892301'
  );
  const [semanaReporte, setSemanaReporte] = useState<number>(
    report?.control?.semanaEpidemiologica || 35
  );
  const [fechaCorte, setFechaCorte] = useState<string>(
    report?.control?.fechaReporte || new Date().toISOString().substring(0, 10)
  );

  const [feedback, setFeedback] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  // Handlers for Alcance
  const handleAlcanceChange = (index: number, field: 'metaSemanal' | 'logrado' | 'varSemanaAnterior', rawVal: string) => {
    const num = rawVal === '' ? 0 : parseFloat(rawVal);
    setAlcanceRows(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: isNaN(num) ? 0 : num
      };
      return updated;
    });
  };

  // Handlers for Producción
  const handleProduccionChange = (index: number, field: 'logrado' | 'observaciones', rawVal: string) => {
    setProduccionRows(prev => {
      const updated = [...prev];
      if (field === 'logrado') {
        const num = rawVal === '' ? 0 : parseFloat(rawVal);
        updated[index] = { ...updated[index], logrado: isNaN(num) ? 0 : num };
      } else {
        updated[index] = { ...updated[index], observaciones: rawVal };
      }
      return updated;
    });
  };

  // Handlers for Desglose
  const handleDesgloseChange = (index: number, field: 'numPiezas' | 'duracionTotalHoras' | 'porcentajeParrilla', rawVal: string) => {
    const num = rawVal === '' ? 0 : parseFloat(rawVal);
    setDesgloseRows(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: isNaN(num) ? 0 : num
      };
      return updated;
    });
  };

  // Handlers for Logística
  const handleLogisticaChange = (index: number, field: 'valor' | 'totalRef' | 'observaciones', rawVal: string) => {
    setLogisticaRows(prev => {
      const updated = [...prev];
      if (field === 'valor') {
        const num = rawVal === '' ? 0 : parseFloat(rawVal);
        updated[index] = { ...updated[index], valor: isNaN(num) ? 0 : num };
      } else if (field === 'totalRef') {
        const num = rawVal === '' ? undefined : parseFloat(rawVal);
        updated[index] = { ...updated[index], totalRef: isNaN(num as number) ? undefined : num };
      } else {
        updated[index] = { ...updated[index], observaciones: rawVal };
      }
      return updated;
    });
  };

  // Restore reference data
  const handleRestoreReference = () => {
    if (activeTab === 'ALCANCE' || activeTab === 'TODOS') {
      setAlcanceRows(DEFAULT_ALCANCE_ROWS);
    }
    if (activeTab === 'PRODUCCION' || activeTab === 'TODOS') {
      setProduccionRows(DEFAULT_PRODUCCION_ROWS);
    }
    if (activeTab === 'DESGLOSE' || activeTab === 'TODOS') {
      setDesgloseRows(DEFAULT_DESGLOSE_ROWS);
    }
    if (activeTab === 'LOGISTICA' || activeTab === 'TODOS') {
      setLogisticaRows(DEFAULT_LOGISTICA_ROWS);
    }
    setFeedback({
      type: 'info',
      message: 'Se han restaurado los valores de referencia oficiales del sistema audiovisual y televisivo.'
    });
  };

  // Auto calculate variation % vs meta
  const handleAutoCalculateVariations = () => {
    setAlcanceRows(prev => prev.map(r => {
      let varPct = 0;
      if (r.metaSemanal > 0) {
        varPct = +(((r.logrado - r.metaSemanal) / r.metaSemanal) * 100).toFixed(1);
      }
      return { ...r, varSemanaAnterior: varPct };
    }));
    setFeedback({
      type: 'success',
      message: 'Variaciones porcentuales calculadas automáticamente en base al cumplimiento de meta semanal.'
    });
  };

  // Save all collected data
  const handleSaveData = () => {
    if (report && onSaveReport) {
      // Sync into master report mediosData
      const updatedMediosData: MediaOperationalData = {
        ...report.mediosData,
        // Televisión Alcance (TV-001 al TV-005)
        horasTransmisionTV: alcanceRows[0]?.logrado || 0,
        operatividadSenalTV: alcanceRows[1]?.logrado || 0,
        coberturaNacionalTV: alcanceRows[2]?.logrado || 0,
        senalTDAOperativaTV: alcanceRows[3]?.logrado || 0,
        canalesSatelitalesActivosTV: alcanceRows[4]?.logrado || 0,
        // Televisión Producción (TV-006 al TV-013)
        programasProducidosTV: produccionRows[0]?.logrado || 0,
        horasProgramacionPropiaTV: produccionRows[1]?.logrado || 0,
        pasesEnVivoCampoTV: produccionRows[2]?.logrado || 0,
        coberturasEspecialesTV: produccionRows[3]?.logrado || 0,
        // Equipamiento y Logística (TV-014 al TV-019)
        unidadesMovilesOperativas: logisticaRows[0]?.valor || 0,
        unidadesMovilesTotal: logisticaRows[0]?.totalRef || 10,
        camarasProduccionOperativas: logisticaRows[1]?.valor || 0,
        camarasProduccionTotal: logisticaRows[1]?.totalRef || 52,
        equiposEdicionOperativos: logisticaRows[2]?.valor || 0,
        equiposEdicionTotal: logisticaRows[2]?.totalRef || 26,
        plantasEmergenciaTVOperativas: logisticaRows[3]?.valor || 0,
        plantasEmergenciaTVTotal: logisticaRows[3]?.totalRef || 8,
        personalTecnicoTV: logisticaRows[4]?.valor || 0,
        personalCampoTV: logisticaRows[5]?.valor || 0
      };

      // Sync into eje1Data.audiovisuales
      const updatedEje1Data = {
        ...(report.eje1Data || {
          impresos: { produccion: [], editorial: [], distribucion: [] },
          radios: { alcance: [], produccion: [], desgloseTematico: [], infraestructura: [] },
          digitales: { portales: [], contenidoTematico: [], suscripciones: [], tramitesServicios: [] },
          redesSociales: {
            kpisCanales: [],
            alcanceAudiencia: [],
            produccionTactica: [],
            entrevistas: [],
            creadoresAliados: [],
            canalesActivos: [],
            engagementPorContenido: []
          }
        }),
        audiovisuales: {
          alcance: alcanceRows,
          produccion: produccionRows,
          desgloseProduccion: desgloseRows,
          logistica: logisticaRows
        }
      };

      const updatedControl = {
        ...report.control,
        enteAdscrito: enteInformante,
        responsableEnte: responsableCarga,
        cedulaIdentidad: cedulaResponsable,
        semanaEpidemiologica: semanaReporte,
        fechaReporte: fechaCorte
      };

      const computedKPIs = calculateMasterKPIs(
        updatedMediosData,
        report.plataformasData,
        report.strategicData,
        report.vulnerabilityRows
      );

      const computedValidations = runThreeLevelValidation(
        updatedControl,
        updatedMediosData,
        report.plataformasData,
        report.strategicData,
        report.vulnerabilityRows
      );

      const newHash = generateIntegrityHash(
        report.codigoReporte,
        new Date().toISOString(),
        computedKPIs
      );

      const updatedReport: FullWeeklyReport = {
        ...report,
        control: updatedControl,
        mediosData: updatedMediosData,
        eje1Data: updatedEje1Data,
        kpisCalculados: computedKPIs,
        validaciones: computedValidations,
        hashIntegridad: newHash,
        fechaUltimaModificacion: new Date().toISOString()
      };

      onSaveReport(updatedReport);

      setFeedback({
        type: 'success',
        message: `¡Formulario 1.C Televisión y Medios Audiovisuales guardado exitosamente! Integridad SHA-256 generada: ${newHash.substring(0, 16)}...`
      });

      if (onSuccessSave) {
        onSuccessSave('1.C Medios Audiovisuales sincronizado con el Informe Consolidado');
      }
    } else {
      setFeedback({
        type: 'success',
        message: '¡Datos de 1.C Televisión Abierta y por Suscripción validados localmente!'
      });
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'SISTEMA INTEGRAL DE MONITOREO - EJE 1.C MEDIOS AUDIOVISUALES\n';
    csvContent += `Ente Informante,"${enteInformante}"\n`;
    csvContent += `Responsable,"${responsableCarga}",C.I.,"${cedulaResponsable}"\n`;
    csvContent += `Semana,${semanaReporte},Fecha de Corte,${fechaCorte}\n\n`;

    csvContent += '--- 1. TELEVISIÓN ABIERTA Y POR SUSCRIPCIÓN ---\n';
    csvContent += 'Indicador,Código,Frecuencia,Meta Semanal,Logrado,Var % vs Semana Anterior\n';
    alcanceRows.forEach(r => {
      csvContent += `"${r.indicador}","${r.codigo}","${r.frecuencia}",${r.metaSemanal},${r.logrado},"${r.varSemanaAnterior}%"\n`;
    });

    csvContent += '\n--- 2. PRODUCCIÓN AUDIOVISUAL ---\n';
    csvContent += 'Indicador,Código,Frecuencia,Logrado,Observaciones\n';
    produccionRows.forEach(r => {
      csvContent += `"${r.indicador}","${r.codigo}","${r.frecuencia}",${r.logrado},"${r.observaciones.replace(/"/g, '""')}"\n`;
    });

    csvContent += '\n--- 3. DESGLOSE POR TIPO DE PRODUCCIÓN AUDIOVISUAL ---\n';
    csvContent += 'Tipo de Contenido,N° de Piezas,Duración Total (hrs),% de Parrilla\n';
    desgloseRows.forEach(r => {
      csvContent += `"${r.tipoContenido}",${r.numPiezas},${r.duracionTotalHoras},"${r.porcentajeParrilla}%"\n`;
    });

    csvContent += '\n--- 4. EQUIPAMIENTO Y LOGÍSTICA AUDIOVISUAL ---\n';
    csvContent += 'Indicador,Código,Valor,Total Referencia,Observaciones\n';
    logisticaRows.forEach(r => {
      csvContent += `"${r.indicador}","${r.codigo}",${r.valor},${r.totalRef ?? ''},"${r.observaciones.replace(/"/g, '""')}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `F1_C_Medios_Audiovisuales_W${semanaReporte}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculations for summary banner
  const totalPiezas = desgloseRows.reduce((sum, r) => sum + (r.numPiezas || 0), 0);
  const totalHorasParrilla = desgloseRows.reduce((sum, r) => sum + (r.duracionTotalHoras || 0), 0);
  const totalPorcentajeParrilla = desgloseRows.reduce((sum, r) => sum + (r.porcentajeParrilla || 0), 0);
  const unidadesMovilesPct = logisticaRows[0]?.totalRef ? Math.round((logisticaRows[0].valor / logisticaRows[0].totalRef) * 100) : 90;
  const camarasPct = logisticaRows[1]?.totalRef ? Math.round((logisticaRows[1].valor / logisticaRows[1].totalRef) * 100) : 92;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="p-3.5 bg-gradient-to-br from-sky-500/20 to-blue-600/30 text-sky-400 rounded-xl border border-sky-500/30 shadow-inner">
              <Tv className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded border border-sky-500/30 tracking-wider">
                  EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Códigos TV-001 al TV-019
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white mt-1 tracking-tight flex items-center gap-2">
                1.C MEDIOS AUDIOVISUALES
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl mt-1">
                Instrumento de recolección para Televisión Abierta y por Suscripción, producción audiovisual propia,
                desglose programático por tipo de contenido y equipamiento logístico de transmisión y campo.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleAutoCalculateVariations}
              type="button"
              className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition shadow-sm"
              title="Calcular variación porcentual automáticamente en base a meta semanal"
            >
              <Calculator className="w-3.5 h-3.5 text-sky-400" />
              <span>Calcular Var %</span>
            </button>

            <button
              onClick={handleRestoreReference}
              type="button"
              className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition shadow-sm"
              title="Restaurar valores de referencia del sistema audiovisual"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Restaurar</span>
            </button>

            <button
              onClick={handleExportCSV}
              type="button"
              className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition shadow-sm"
              title="Exportar formulario a CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>CSV</span>
            </button>

            <button
              onClick={handleSaveData}
              type="button"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-sky-500/20 transition active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Formulario</span>
            </button>
          </div>
        </div>

        {/* Status Indicators Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">TV-001 Transmisión</span>
            <span className="text-sm font-bold font-mono text-sky-400">
              {alcanceRows[0]?.logrado || 0} hrs / sem
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Meta: {alcanceRows[0]?.metaSemanal || 168} hrs</span>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">TV-002 Señal & TDA</span>
            <span className="text-sm font-bold font-mono text-emerald-400">
              {alcanceRows[1]?.logrado || 0}% / TDA: {alcanceRows[3]?.logrado || 0}%
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Operatividad nacional</span>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">TV-008 & TV-009 Campo</span>
            <span className="text-sm font-bold font-mono text-amber-400">
              {produccionRows[2]?.logrado || 0} pases / {produccionRows[3]?.logrado || 0} especiales
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Despliegue diario</span>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">TV-014 Unidades Móviles</span>
            <span className="text-sm font-bold font-mono text-white">
              {logisticaRows[0]?.valor || 0} / {logisticaRows[0]?.totalRef || 10} operativas
            </span>
            <span className="text-[10px] text-emerald-400 block mt-0.5 font-semibold">
              {unidadesMovilesPct}% de flota activa
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-medium animate-fadeIn ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : feedback.type === 'error'
              ? 'bg-rose-50 text-rose-900 border-rose-200'
              : 'bg-sky-50 text-sky-900 border-sky-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : feedback.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Metadata & Responsibility Controls Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Control de Carga & Ente Audiovisual Informante
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
              RACI: {currentRole || 'RESPONSIBLE'}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-50 text-sky-700 border border-sky-200">
              HASH SHA-256 ACTIVO
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">Ente Informante</label>
            <input
              type="text"
              value={enteInformante}
              onChange={(e) => setEnteInformante(e.target.value)}
              placeholder="Ej. Venezolana de Televisión (VTV)"
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 focus:bg-white focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">Responsable de Carga</label>
            <input
              type="text"
              value={responsableCarga}
              onChange={(e) => setResponsableCarga(e.target.value)}
              placeholder="Nombre y cargo del responsable"
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 focus:bg-white focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">Cédula de Identidad</label>
            <input
              type="text"
              value={cedulaResponsable}
              onChange={(e) => setCedulaResponsable(e.target.value)}
              placeholder="V-XXXXXXXX"
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-medium text-slate-800 focus:bg-white focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">Semana del Reporte</label>
            <div className="flex items-center space-x-1">
              <span className="text-xs font-mono font-bold text-slate-400">Sem</span>
              <input
                type="number"
                min="1"
                max="52"
                value={semanaReporte}
                onChange={(e) => setSemanaReporte(parseInt(e.target.value) || 35)}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 block">Fecha de Corte</label>
            <input
              type="date"
              value={fechaCorte}
              onChange={(e) => setFechaCorte(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono text-slate-800 focus:bg-white focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Subtabs Filter */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('TODOS')}
            className={`px-3 py-2 rounded-t-lg text-xs font-bold transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'TODOS'
                ? 'border-sky-600 text-sky-700 bg-sky-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Formulario Completo</span>
          </button>

          <button
            onClick={() => setActiveTab('ALCANCE')}
            className={`px-3 py-2 rounded-t-lg text-xs font-bold transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'ALCANCE'
                ? 'border-sky-600 text-sky-700 bg-sky-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>1. TV Abierta & Suscripción (TV-001 al TV-005)</span>
          </button>

          <button
            onClick={() => setActiveTab('PRODUCCION')}
            className={`px-3 py-2 rounded-t-lg text-xs font-bold transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'PRODUCCION'
                ? 'border-sky-600 text-sky-700 bg-sky-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>2. Producción Audiovisual (TV-006 al TV-013)</span>
          </button>

          <button
            onClick={() => setActiveTab('DESGLOSE')}
            className={`px-3 py-2 rounded-t-lg text-xs font-bold transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'DESGLOSE'
                ? 'border-sky-600 text-sky-700 bg-sky-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>3. Desglose por Tipo de Contenido</span>
          </button>

          <button
            onClick={() => setActiveTab('LOGISTICA')}
            className={`px-3 py-2 rounded-t-lg text-xs font-bold transition flex items-center space-x-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'LOGISTICA'
                ? 'border-sky-600 text-sky-700 bg-sky-50/70'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>4. Equipamiento & Logística (TV-014 al TV-019)</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: TELEVISIÓN ABIERTA Y POR SUSCRIPCIÓN (TV-001 al TV-005) */}
      {(activeTab === 'TODOS' || activeTab === 'ALCANCE') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-600" />
                Televisión Abierta y por Suscripción
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Indicadores técnicos de transmisión, operatividad de señal analógica y digital TDA, y canales satelitales
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded font-semibold self-start sm:self-center">
              Códigos TV-001 al TV-005
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-28">Frecuencia</th>
                  <th className="py-2.5 px-3 w-36 text-right">Meta Semanal</th>
                  <th className="py-2.5 px-3 w-36 text-right">Logrado</th>
                  <th className="py-2.5 px-3 w-40 text-right">Var % vs Semana Anterior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {alcanceRows.map((row, idx) => {
                  const isPercentage = row.codigo === 'TV-002' || row.codigo === 'TV-003' || row.codigo === 'TV-004';
                  return (
                    <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        {row.indicador}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-sky-700 bg-sky-50/40">
                        {row.codigo}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                          {row.frecuencia}
                        </span>
                      </td>

                      {/* Meta Semanal */}
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <input
                            type="number"
                            step="0.1"
                            value={row.metaSemanal === 0 ? '' : row.metaSemanal}
                            onChange={(e) => handleAlcanceChange(idx, 'metaSemanal', e.target.value)}
                            placeholder="_______"
                            className="w-24 px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-sky-500"
                          />
                          <span
                            aria-hidden={!isPercentage}
                            className={`w-4 text-center text-xs font-bold text-slate-500 inline-block shrink-0 ${
                              isPercentage ? '' : 'invisible'
                            }`}
                          >
                            %
                          </span>
                        </div>
                      </td>

                      {/* Logrado */}
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <input
                            type="number"
                            step="0.1"
                            value={row.logrado === 0 ? '' : row.logrado}
                            onChange={(e) => handleAlcanceChange(idx, 'logrado', e.target.value)}
                            placeholder="_______"
                            className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                          />
                          <span
                            aria-hidden={!isPercentage}
                            className={`w-4 text-center text-xs font-bold text-slate-500 inline-block shrink-0 ${
                              isPercentage ? '' : 'invisible'
                            }`}
                          >
                            %
                          </span>
                        </div>
                      </td>

                      {/* Var % vs Semana Anterior */}
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <input
                            type="number"
                            step="0.1"
                            value={row.varSemanaAnterior === 0 ? '' : row.varSemanaAnterior}
                            onChange={(e) => handleAlcanceChange(idx, 'varSemanaAnterior', e.target.value)}
                            placeholder="_______"
                            className={`w-20 px-2 py-1 text-right border rounded text-xs font-mono font-bold placeholder-slate-400 ${
                              row.varSemanaAnterior >= 0 
                                ? 'text-emerald-700 bg-emerald-50/50 border-emerald-200' 
                                : 'text-rose-700 bg-rose-50/50 border-rose-200'
                            }`}
                          />
                          <span className="w-4 text-center text-xs font-bold text-slate-500 inline-block shrink-0">
                            %
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: PRODUCCIÓN AUDIOVISUAL (TV-006 al TV-013) */}
      {(activeTab === 'TODOS' || activeTab === 'PRODUCCION') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Video className="w-4 h-4 text-sky-600" />
                Producción Audiovisual
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Volumen de producción propia, pases en vivo desde campo, coberturas y material archivístico catalogado
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded font-semibold self-start sm:self-center">
              Códigos TV-006 al TV-013
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-28">Frecuencia</th>
                  <th className="py-2.5 px-3 w-32 text-right">Logrado</th>
                  <th className="py-2.5 px-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {produccionRows.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      {row.indicador}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-sky-700 bg-sky-50/40">
                      {row.codigo}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                        {row.frecuencia}
                      </span>
                    </td>

                    {/* Logrado */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.logrado === 0 ? '' : row.logrado}
                        onChange={(e) => handleProduccionChange(idx, 'logrado', e.target.value)}
                        placeholder="_______"
                        className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                      />
                    </td>

                    {/* Observaciones */}
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={(e) => handleProduccionChange(idx, 'observaciones', e.target.value)}
                        placeholder="Detalles técnicos de emisión, vocería y cobertura..."
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: DESGLOSE POR TIPO DE PRODUCCIÓN AUDIOVISUAL */}
      {(activeTab === 'TODOS' || activeTab === 'DESGLOSE') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Film className="w-4 h-4 text-sky-600" />
                Desglose por Tipo de Producción Audiovisual
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Distribución cuantitativa de piezas audiovisuales, duración horaria y porcentaje de la parrilla semanal
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded font-semibold self-start sm:self-center">
              7 Tipos de Contenido
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Tipo de Contenido</th>
                  <th className="py-2.5 px-3 w-40 text-right">N° de Piezas</th>
                  <th className="py-2.5 px-3 w-44 text-right">Duración Total (hrs)</th>
                  <th className="py-2.5 px-3 w-40 text-right">% de Parrilla</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {desgloseRows.map((row, idx) => (
                  <tr key={row.tipoContenido} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {row.tipoContenido}
                    </td>

                    {/* N° de Piezas */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.numPiezas === 0 ? '' : row.numPiezas}
                        onChange={(e) => handleDesgloseChange(idx, 'numPiezas', e.target.value)}
                        placeholder="_______"
                        className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                      />
                    </td>

                    {/* Duración Total (hrs) */}
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.5"
                        value={row.duracionTotalHoras === 0 ? '' : row.duracionTotalHoras}
                        onChange={(e) => handleDesgloseChange(idx, 'duracionTotalHoras', e.target.value)}
                        placeholder="_______"
                        className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                      />
                    </td>

                    {/* % de Parrilla */}
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.porcentajeParrilla === 0 ? '' : row.porcentajeParrilla}
                          onChange={(e) => handleDesgloseChange(idx, 'porcentajeParrilla', e.target.value)}
                          placeholder="_______"
                          className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-sky-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                        />
                        <span className="text-xs font-bold text-slate-500">%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-sky-50/75 border-t-2 border-sky-200 font-bold text-slate-900">
                <tr>
                  <td className="py-2.5 px-3 text-sky-950 font-black">TOTALES CONSOLIDADOS</td>
                  <td className="py-2.5 px-3 text-right font-mono text-sky-950 text-sm">
                    {totalPiezas} piezas
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-sky-950 text-sm">
                    {totalHorasParrilla.toFixed(1)} hrs
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-sm">
                    <span className={`inline-block px-2 py-0.5 rounded font-bold ${
                      Math.abs(totalPorcentajeParrilla - 100) < 1 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {totalPorcentajeParrilla.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: EQUIPAMIENTO Y LOGÍSTICA AUDIOVISUAL (TV-014 al TV-019) */}
      {(activeTab === 'TODOS' || activeTab === 'LOGISTICA') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <MonitorPlay className="w-4 h-4 text-sky-600" />
                Equipamiento y Logística Audiovisual
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Capacidad de unidades móviles, cámaras 4K/ENG, islas de edición, plantas eléctricas y talento humano
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded font-semibold self-start sm:self-center">
              Códigos TV-014 al TV-019
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-48 text-right">Valor Registrado</th>
                  <th className="py-2.5 px-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {logisticaRows.map((row, idx) => {
                  const hasRatio = row.codigo !== 'TV-019';
                  return (
                    <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        {row.indicador}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-sky-700 bg-sky-50/40">
                        {row.codigo}
                      </td>

                      {/* Valor Registrado */}
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <input
                            type="number"
                            value={row.valor === 0 ? '' : row.valor}
                            onChange={(e) => handleLogisticaChange(idx, 'valor', e.target.value)}
                            placeholder="_______"
                            className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                          />
                          {hasRatio && (
                            <>
                              <span className="text-slate-400 font-bold">/</span>
                              <input
                                type="number"
                                value={row.totalRef === undefined ? '' : row.totalRef}
                                onChange={(e) => handleLogisticaChange(idx, 'totalRef', e.target.value)}
                                placeholder="_______"
                                className="w-20 px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-semibold text-slate-700 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-sky-500"
                              />
                            </>
                          )}
                        </div>
                      </td>

                      {/* Observaciones */}
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={row.observaciones}
                          onChange={(e) => handleLogisticaChange(idx, 'observaciones', e.target.value)}
                          placeholder="Estado de mantenimiento, redundancia y cobertura técnica..."
                          className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-sky-500"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
