import React, { useState } from 'react';
import { 
  Radio, 
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
  Mic, 
  RadioTower, 
  BarChart3, 
  Layers, 
  Hash, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';
import { 
  RadioRowAlcance, 
  RadioRowProduccion, 
  RadioRowTematico, 
  RadioRowInfraestructura, 
  FullWeeklyReport, 
  MediaOperationalData, 
  UserAccount, 
  RACIRole 
} from '../types';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';

interface FormularioRadiosProps {
  initialAlcanceRows?: RadioRowAlcance[];
  initialProduccionRows?: RadioRowProduccion[];
  initialTematicoRows?: RadioRowTematico[];
  initialInfraestructuraRows?: RadioRowInfraestructura[];
  mediosData?: MediaOperationalData;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onSuccessSave?: (message: string) => void;
}

const DEFAULT_ALCANCE_ROWS: RadioRowAlcance[] = [
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
];

const DEFAULT_PRODUCCION_ROWS: RadioRowProduccion[] = [
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
];

const DEFAULT_TEMATICO_ROWS: RadioRowTematico[] = [
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
];

const DEFAULT_INFRAESTRUCTURA_ROWS: RadioRowInfraestructura[] = [
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
];

type SubTabRadio = 'TODOS' | 'ALCANCE' | 'PRODUCCION' | 'TEMATICO' | 'INFRAESTRUCTURA';

export const FormularioRadios: React.FC<FormularioRadiosProps> = ({
  initialAlcanceRows,
  initialProduccionRows,
  initialTematicoRows,
  initialInfraestructuraRows,
  mediosData,
  report,
  onSaveReport,
  currentUser,
  currentRole,
  onSuccessSave
}) => {
  const [activeTab, setActiveTab] = useState<SubTabRadio>('TODOS');

  // Form 1: Alcance y Cobertura (RAD-001 al RAD-005)
  const [alcanceRows, setAlcanceRows] = useState<RadioRowAlcance[]>(() => {
    if (initialAlcanceRows && initialAlcanceRows.length >= 5) return initialAlcanceRows;
    if (report?.eje1Data?.radios?.alcance && report.eje1Data.radios.alcance.length >= 5) {
      return report.eje1Data.radios.alcance;
    }
    if (mediosData) {
      return [
        {
          codigo: 'RAD-001',
          indicador: 'Horas de transmisión totales',
          frecuencia: 'Diaria',
          metaSemanal: 168,
          logrado: mediosData.horasTransmisionRadio || 166.5,
          varSemanaAnterior: 0.5
        },
        {
          codigo: 'RAD-002',
          indicador: '% de operatividad de señal',
          frecuencia: 'Diaria',
          metaSemanal: 98.0,
          logrado: mediosData.operatividadSenalRadio || 97.4,
          varSemanaAnterior: 1.2
        },
        {
          codigo: 'RAD-003',
          indicador: 'Cobertura geográfica (municipios)',
          frecuencia: 'Semanal',
          metaSemanal: 310,
          logrado: mediosData.coberturaMunicipiosRadio || 304,
          varSemanaAnterior: 2.0
        },
        {
          codigo: 'RAD-004',
          indicador: 'Audiencia estimada (rating)',
          frecuencia: 'Semanal',
          metaSemanal: 42.0,
          logrado: mediosData.audienciaRatingRadio || 44.8,
          varSemanaAnterior: 4.6
        },
        {
          codigo: 'RAD-005',
          indicador: '% de señal disponible en zonas afectadas',
          frecuencia: 'Diaria',
          metaSemanal: 95.0,
          logrado: mediosData.senalZonasAfectadasRadio || 93.8,
          varSemanaAnterior: 3.1
        }
      ];
    }
    return DEFAULT_ALCANCE_ROWS;
  });

  // Form 2: Producción de Contenido Radial (RAD-006 al RAD-013)
  const [produccionRows, setProduccionRows] = useState<RadioRowProduccion[]>(() => {
    if (initialProduccionRows && initialProduccionRows.length >= 8) return initialProduccionRows;
    if (report?.eje1Data?.radios?.produccion && report.eje1Data.radios.produccion.length >= 8) {
      return report.eje1Data.radios.produccion;
    }
    if (mediosData) {
      return [
        {
          codigo: 'RAD-006',
          indicador: 'Programas en vivo producidos',
          frecuencia: 'Diaria',
          logrado: mediosData.programasEnVivoRadio || 48,
          observaciones: 'Cobertura continua en circuitos AM/FM y streaming'
        },
        {
          codigo: 'RAD-007',
          indicador: 'Horas de programación propia',
          frecuencia: 'Semanal',
          logrado: mediosData.horasProgramacionPropiaRadio || 118,
          observaciones: 'Producción nacional independiente y contenidos propios'
        },
        {
          codigo: 'RAD-008',
          indicador: 'Boletines informativos emitidos',
          frecuencia: 'Diaria',
          logrado: mediosData.boletinesRadio || 96,
          observaciones: 'Resumen cada 30 minutos con reportes de corresponsales'
        },
        {
          codigo: 'RAD-009',
          indicador: 'Microprogramas de contingencia',
          frecuencia: 'Diaria',
          logrado: mediosData.microprogramasContingenciaRadio || 64,
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
      ];
    }
    return DEFAULT_PRODUCCION_ROWS;
  });

  // Form 3: Desglose Temático (7 Temáticas)
  const [tematicoRows, setTematicoRows] = useState<RadioRowTematico[]>(() => {
    if (initialTematicoRows && initialTematicoRows.length >= 7) return initialTematicoRows;
    if (report?.eje1Data?.radios?.desgloseTematico && report.eje1Data.radios.desgloseTematico.length >= 7) {
      return report.eje1Data.radios.desgloseTematico;
    }
    return DEFAULT_TEMATICO_ROWS;
  });

  // Form 4: Infraestructura Técnica Radial (RAD-014 al RAD-018)
  const [infraestructuraRows, setInfraestructuraRows] = useState<RadioRowInfraestructura[]>(() => {
    if (initialInfraestructuraRows && initialInfraestructuraRows.length >= 5) return initialInfraestructuraRows;
    if (report?.eje1Data?.radios?.infraestructura && report.eje1Data.radios.infraestructura.length >= 5) {
      return report.eje1Data.radios.infraestructura;
    }
    if (mediosData) {
      return [
        {
          codigo: 'RAD-014',
          indicador: 'Transmisores operativos',
          valor: mediosData.transmisoresRadioOperativos || 82,
          totalRef: mediosData.transmisoresRadioTotal || 88,
          unidad: '%',
          observaciones: '6 transmisores en mantenimiento preventivo de válvulas'
        },
        {
          codigo: 'RAD-015',
          indicador: '% de potencia de transmisión',
          valor: mediosData.potenciaTransmisionRadio || 94.5,
          unidad: '%',
          observaciones: 'Potencia nominal estable en repetidores principales'
        },
        {
          codigo: 'RAD-016',
          indicador: 'Plantas de emergencia operativas',
          valor: mediosData.plantasEmergenciaRadioOperativas || 74,
          totalRef: mediosData.plantasEmergenciaRadioTotal || 76,
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
          valor: mediosData.tiempoCaidaRadioMin || 14.2,
          observaciones: 'Resuelto mediante transferencia automática a generador'
        }
      ];
    }
    return DEFAULT_INFRAESTRUCTURA_ROWS;
  });

  // Control and Metadata
  const [enteInformante, setEnteInformante] = useState<string>(
    currentUser?.enteAdscrito === 'MPPCI_CENTRAL' 
      ? 'Radio Nacional de Venezuela (RNV)' 
      : (currentUser?.enteAdscrito || 'Radio Nacional de Venezuela (RNV)')
  );
  const [responsableCarga, setResponsableCarga] = useState<string>(
    currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : 'Ing. Carlos Mendoza (Gerente Técnico & Operaciones RNV)'
  );
  const [cedulaResponsable, setCedulaResponsable] = useState<string>(
    currentUser?.cedula || 'V-11948203'
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

  // Handlers for Desglose Temático
  const handleTematicoChange = (index: number, field: 'numProgramas' | 'horasTransmision' | 'audienciaEstimada', rawVal: string) => {
    const num = rawVal === '' ? 0 : parseFloat(rawVal);
    setTematicoRows(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: isNaN(num) ? 0 : num
      };
      return updated;
    });
  };

  // Handlers for Infraestructura
  const handleInfraestructuraChange = (index: number, field: 'valor' | 'totalRef' | 'observaciones', rawVal: string) => {
    setInfraestructuraRows(prev => {
      const updated = [...prev];
      if (field === 'observaciones') {
        updated[index] = { ...updated[index], observaciones: rawVal };
      } else {
        const num = rawVal === '' ? 0 : parseFloat(rawVal);
        updated[index] = { ...updated[index], [field]: isNaN(num) ? 0 : num };
      }
      return updated;
    });
  };

  // Clear fields (_______)
  const handleClearFields = () => {
    if (activeTab === 'ALCANCE' || activeTab === 'TODOS') {
      setAlcanceRows(prev => prev.map(r => ({ ...r, metaSemanal: 0, logrado: 0, varSemanaAnterior: 0 })));
    }
    if (activeTab === 'PRODUCCION' || activeTab === 'TODOS') {
      setProduccionRows(prev => prev.map(r => ({ ...r, logrado: 0, observaciones: '' })));
    }
    if (activeTab === 'TEMATICO' || activeTab === 'TODOS') {
      setTematicoRows(prev => prev.map(r => ({ ...r, numProgramas: 0, horasTransmision: 0, audienciaEstimada: 0 })));
    }
    if (activeTab === 'INFRAESTRUCTURA' || activeTab === 'TODOS') {
      setInfraestructuraRows(prev => prev.map(r => ({ ...r, valor: 0, totalRef: r.totalRef !== undefined ? 0 : undefined, observaciones: '' })));
    }
    setFeedback({
      type: 'info',
      message: 'Formulario de Radios limpiado. Campos listos para la captura manual de nuevos datos (_______).'
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
    if (activeTab === 'TEMATICO' || activeTab === 'TODOS') {
      setTematicoRows(DEFAULT_TEMATICO_ROWS);
    }
    if (activeTab === 'INFRAESTRUCTURA' || activeTab === 'TODOS') {
      setInfraestructuraRows(DEFAULT_INFRAESTRUCTURA_ROWS);
    }
    setFeedback({
      type: 'info',
      message: 'Se han restaurado los valores de referencia oficiales del sistema radial.'
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
        // Alcance
        horasTransmisionRadio: alcanceRows[0]?.logrado || 0,
        operatividadSenalRadio: alcanceRows[1]?.logrado || 0,
        coberturaMunicipiosRadio: alcanceRows[2]?.logrado || 0,
        audienciaRatingRadio: alcanceRows[3]?.logrado || 0,
        senalZonasAfectadasRadio: alcanceRows[4]?.logrado || 0,
        // Producción
        programasEnVivoRadio: produccionRows[0]?.logrado || 0,
        horasProgramacionPropiaRadio: produccionRows[1]?.logrado || 0,
        boletinesRadio: produccionRows[2]?.logrado || 0,
        microprogramasContingenciaRadio: produccionRows[3]?.logrado || 0,
        // Infraestructura
        transmisoresRadioOperativos: infraestructuraRows[0]?.valor || 0,
        transmisoresRadioTotal: infraestructuraRows[0]?.totalRef || 88,
        potenciaTransmisionRadio: infraestructuraRows[1]?.valor || 0,
        plantasEmergenciaRadioOperativas: infraestructuraRows[2]?.valor || 0,
        plantasEmergenciaRadioTotal: infraestructuraRows[2]?.totalRef || 76,
        tiempoCaidaRadioMin: infraestructuraRows[4]?.valor || 0
      };

      // Sync into eje1Data.radios
      const updatedEje1Data = {
        ...(report.eje1Data || {
          impresos: { produccion: [], editorial: [], distribucion: [] },
          television: { alcance: [], produccion: [], desgloseProduccion: [], logistica: [] },
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
        radios: {
          alcance: alcanceRows,
          produccion: produccionRows,
          desgloseTematico: tematicoRows,
          infraestructura: infraestructuraRows
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

      const validations = runThreeLevelValidation(
        updatedControl,
        updatedMediosData,
        report.plataformasData,
        report.strategicData,
        report.vulnerabilityRows
      );

      const updatedReport: FullWeeklyReport = {
        ...report,
        control: updatedControl,
        mediosData: updatedMediosData,
        eje1Data: updatedEje1Data,
        kpisCalculados: computedKPIs,
        validaciones: validations,
        hashIntegridad: generateIntegrityHash(report.codigoReporte, new Date().toISOString(), computedKPIs),
        fechaUltimaModificacion: new Date().toISOString()
      };

      onSaveReport(updatedReport);
      setFeedback({
        type: 'success',
        message: 'Información de Radios AM y FM (RAD-001 al RAD-018) guardada y recalculada con éxito.'
      });
      if (onSuccessSave) {
        onSuccessSave('Formularios de Radios AM y FM actualizados');
      }
    } else {
      setFeedback({
        type: 'success',
        message: 'Datos de Radio validados y almacenados en memoria local.'
      });
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    let csv = `REPORTE OFICIAL DE RECOLECCION DE INFORMACION - RADIOS, EMISORAS AM Y FM\n`;
    csv += `Ente Informante: ${enteInformante}\n`;
    csv += `Responsable: ${responsableCarga} (${cedulaResponsable})\n`;
    csv += `Semana Epidemiologica: ${semanaReporte} | Fecha: ${fechaCorte}\n\n`;

    // Section 1
    csv += `1. ALCANCE Y COBERTURA RADIAL\n`;
    csv += `Codigo,Indicador,Frecuencia,Meta Semanal,Logrado,Var % vs Sem Anterior\n`;
    alcanceRows.forEach(r => {
      csv += `"${r.codigo}","${r.indicador}","${r.frecuencia}",${r.metaSemanal},${r.logrado},${r.varSemanaAnterior}%\n`;
    });

    // Section 2
    csv += `\n2. PRODUCCION DE CONTENIDO RADIAL\n`;
    csv += `Codigo,Indicador,Frecuencia,Logrado,Observaciones\n`;
    produccionRows.forEach(r => {
      csv += `"${r.codigo}","${r.indicador}","${r.frecuencia}",${r.logrado},"${r.observaciones.replace(/"/g, '""')}"\n`;
    });

    // Section 3
    csv += `\n3. DESGLOSE TEMATICO DE CONTENIDO RADIAL\n`;
    csv += `Tematica,N de Programas,Horas de Transmision,Audiencia Estimada\n`;
    tematicoRows.forEach(r => {
      csv += `"${r.tematica}",${r.numProgramas},${r.horasTransmision},${r.audienciaEstimada}\n`;
    });

    // Section 4
    csv += `\n4. INFRAESTRUCTURA TECNICA RADIAL\n`;
    csv += `Codigo,Indicador,Valor,Referencia Total,Unidad,Observaciones\n`;
    infraestructuraRows.forEach(r => {
      csv += `"${r.codigo}","${r.indicador}",${r.valor},${r.totalRef !== undefined ? r.totalRef : ''},"${r.unidad || ''}","${r.observaciones.replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Levantamiento_Radios_Semana_${semanaReporte}_${enteInformante.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Totals for Temático
  const totalProgramasTematico = tematicoRows.reduce((acc, r) => acc + (r.numProgramas || 0), 0);
  const totalHorasTematico = tematicoRows.reduce((acc, r) => acc + (r.horasTransmision || 0), 0);
  const totalAudienciaTematico = tematicoRows.reduce((acc, r) => acc + (r.audienciaEstimada || 0), 0);

  // Totals for Producción
  const totalProduccionLogrado = produccionRows.reduce((acc, r) => acc + (r.logrado || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Variables */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  1.B Radios, Emisoras AM y FM (RAD-001 al RAD-018)
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                Formularios Oficiales para Recabar Información: Radiodifusión AM/FM
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Instrumento operativo de captura para alcance, producción radial, desglose temático e infraestructura técnica.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleClearFields}
              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              title="Limpiar formulario para rellenar campos en blanco"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar Formulario</span>
            </button>
            <button
              type="button"
              onClick={handleRestoreReference}
              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              title="Cargar valores de referencia del corte semanal"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Valores de Referencia</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
            <button
              type="button"
              onClick={handleSaveData}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar y Registrar</span>
            </button>
          </div>
        </div>

        {/* Metadata Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 pt-1">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
              <Building2 className="w-3 h-3" /> Circuito / Ente Radial
            </label>
            <select
              value={enteInformante}
              onChange={(e) => setEnteInformante(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:bg-white focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Radio Nacional de Venezuela (RNV)">Radio Nacional de Venezuela (RNV)</option>
              <option value="YVKE Mundial">YVKE Mundial (AM / FM)</option>
              <option value="Tiuna FM">Tiuna FM (La Voz de la FANB)</option>
              <option value="Alba Ciudad 96.3 FM">Alba Ciudad 96.3 FM</option>
              <option value="Circuito Radial Comunitario">Red de Radios Comunitarias</option>
              <option value="MIPPCI Central - Radiodifusión">MIPPCI Central (Dirección de Radios)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
              <UserCheck className="w-3 h-3" /> Funcionario Responsable
            </label>
            <input
              type="text"
              value={responsableCarga}
              onChange={(e) => setResponsableCarga(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:bg-white focus:ring-1 focus:ring-indigo-500"
              placeholder="Nombre y cargo del responsable"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
              <Hash className="w-3 h-3" /> Cédula de Identidad
            </label>
            <input
              type="text"
              value={cedulaResponsable}
              onChange={(e) => setCedulaResponsable(e.target.value)}
              className="w-full text-xs font-mono font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:bg-white focus:ring-1 focus:ring-indigo-500"
              placeholder="V-00000000"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Semana Epidemiológica
            </label>
            <div className="flex items-center space-x-1.5">
              <input
                type="number"
                min="1"
                max="53"
                value={semanaReporte}
                onChange={(e) => setSemanaReporte(parseInt(e.target.value) || 1)}
                className="w-full text-xs font-bold text-center bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-indigo-700 focus:bg-white focus:ring-1 focus:ring-indigo-500"
              />
              <span className="text-[11px] font-semibold text-slate-500 shrink-0">W{semanaReporte}</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Fecha de Corte
            </label>
            <input
              type="date"
              value={fechaCorte}
              onChange={(e) => setFechaCorte(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:bg-white focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`mt-3 p-3 rounded-lg border text-xs flex items-center justify-between ${
            feedback.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : feedback.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-indigo-50 border-indigo-200 text-indigo-800'
          }`}>
            <div className="flex items-center space-x-2">
              {feedback.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {feedback.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
              {feedback.type === 'info' && <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0" />}
              <span>{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Sub-Form Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <span className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-wide">Seleccionar Formulario:</span>
        {[
          { id: 'TODOS', label: 'Todos los Formularios (Vista Integral)', icon: Layers, count: '18 Indicadores' },
          { id: 'ALCANCE', label: '1. Alcance y Cobertura', icon: Activity, count: 'RAD-001 al RAD-005' },
          { id: 'PRODUCCION', label: '2. Producción de Contenido', icon: Mic, count: 'RAD-006 al RAD-013' },
          { id: 'TEMATICO', label: '3. Desglose Temático', icon: BarChart3, count: '7 Temáticas' },
          { id: 'INFRAESTRUCTURA', label: '4. Infraestructura Técnica', icon: RadioTower, count: 'RAD-014 al RAD-018' }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SubTabRadio)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-xs' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* FORMULARIO 1: Alcance y Cobertura Radial (RAD-001 al RAD-005)              */}
      {/* ========================================================================= */}
      {(activeTab === 'TODOS' || activeTab === 'ALCANCE') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">FORMULARIO 1.B.1</span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  Alcance y Cobertura Radial
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Indicadores oficiales de horas de emisión, operatividad del espectro, rating y cobertura en contingencia.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAutoCalculateVariations}
                className="flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-indigo-700 rounded text-xs font-semibold border border-indigo-200 shadow-2xs transition-colors cursor-pointer"
                title="Calcular variación porcentual automáticamente vs meta semanal"
              >
                <Calculator className="w-3 h-3 text-indigo-600" />
                <span>Calcular Var %</span>
              </button>
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                Códigos RAD-001 al RAD-005
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-28">Frecuencia</th>
                  <th className="py-2.5 px-3 w-36 text-right">Meta Semanal</th>
                  <th className="py-2.5 px-3 w-36 text-right">Logrado</th>
                  <th className="py-2.5 px-3 w-36 text-right">Var % vs Sem Anterior</th>
                  <th className="py-2.5 px-3 w-28 text-center">% Cumplimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {alcanceRows.map((row, idx) => {
                  const isPct = row.codigo === 'RAD-002' || row.codigo === 'RAD-005';
                  const cumplimiento = row.metaSemanal > 0 
                    ? Math.round((row.logrado / row.metaSemanal) * 100) 
                    : 0;

                  return (
                    <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        <div>
                          <span>{row.indicador}</span>
                          {row.codigo === 'RAD-001' && (
                            <span className="block text-[10px] text-slate-500">Horas acumuladas continuas al aire en la semana (meta: 168 hrs)</span>
                          )}
                          {row.codigo === 'RAD-005' && (
                            <span className="block text-[10px] text-amber-700 font-medium">Prioridad en zonas con alerta sísmica o geológica</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">{row.codigo}</td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.frecuencia === 'Diaria' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {row.frecuencia}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="relative inline-flex items-center w-full">
                          <input
                            type="number"
                            step="0.1"
                            placeholder={isPct ? "_______%" : "_______"}
                            value={row.metaSemanal === 0 ? '' : row.metaSemanal}
                            onChange={(e) => handleAlcanceChange(idx, 'metaSemanal', e.target.value)}
                            className="w-full px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold focus:bg-white focus:ring-1 focus:ring-indigo-500"
                          />
                          {isPct && (
                            <span className="absolute right-2 text-[11px] font-bold text-slate-500 pointer-events-none">%</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="relative inline-flex items-center w-full">
                          <input
                            type="number"
                            step="0.1"
                            placeholder={isPct ? "_______%" : "_______"}
                            value={row.logrado === 0 ? '' : row.logrado}
                            onChange={(e) => handleAlcanceChange(idx, 'logrado', e.target.value)}
                            className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                          />
                          {isPct && (
                            <span className="absolute right-2 text-[11px] font-bold text-indigo-700 pointer-events-none">%</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <input
                            type="number"
                            step="0.1"
                            placeholder="_______%"
                            value={row.varSemanaAnterior === 0 ? '' : row.varSemanaAnterior}
                            onChange={(e) => handleAlcanceChange(idx, 'varSemanaAnterior', e.target.value)}
                            className={`w-20 px-2 py-1 text-right border rounded text-xs font-mono font-bold ${
                              row.varSemanaAnterior >= 0 
                                ? 'text-emerald-700 bg-emerald-50/50 border-emerald-200' 
                                : 'text-rose-700 bg-rose-50/50 border-rose-200'
                            }`}
                          />
                          <span className="text-[11px] font-bold text-slate-500">%</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                          cumplimiento >= 95 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : cumplimiento >= 80 
                            ? 'bg-indigo-100 text-indigo-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {cumplimiento}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FORMULARIO 2: Producción de Contenido Radial (RAD-006 al RAD-013)          */}
      {/* ========================================================================= */}
      {(activeTab === 'TODOS' || activeTab === 'PRODUCCION') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">FORMULARIO 1.B.2</span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Mic className="w-4 h-4 text-indigo-600" />
                  Producción de Contenido Radial
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Levantamiento de programas en vivo, boletines informativos, microprogramas de contingencia y reportes de campo.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                Códigos RAD-006 al RAD-013
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-28">Frecuencia</th>
                  <th className="py-2.5 px-3 w-36 text-right">Logrado</th>
                  <th className="py-2.5 px-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {produccionRows.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      <div>
                        <span>{row.indicador}</span>
                        {row.codigo === 'RAD-009' && (
                          <span className="block text-[10px] text-amber-700 font-medium">Cápsulas radiales de 60s con medidas preventivas de evacuación</span>
                        )}
                        {row.codigo === 'RAD-011' && (
                          <span className="block text-[10px] text-slate-500">Unidades móviles y enlaces con salas situacionales</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">{row.codigo}</td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.frecuencia === 'Diaria' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {row.frecuencia}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        placeholder="_______"
                        value={row.logrado === 0 ? '' : row.logrado}
                        onChange={(e) => handleProduccionChange(idx, 'logrado', e.target.value)}
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        placeholder="Observaciones..."
                        value={row.observaciones}
                        onChange={(e) => handleProduccionChange(idx, 'observaciones', e.target.value)}
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Producción Summary Metrics */}
          <div className="p-4 bg-indigo-50/40 border-t border-indigo-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-indigo-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Emisiones & Producciones</span>
              <span className="text-base font-bold font-mono text-indigo-900">{totalProduccionLogrado.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Suma RAD-006 a RAD-013</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-indigo-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Programas en Vivo (RAD-006)</span>
              <span className="text-base font-bold font-mono text-slate-900">{produccionRows[0]?.logrado || 0}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Producción informativa continua</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-indigo-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Microprogramas Contingencia</span>
              <span className="text-base font-bold font-mono text-amber-700">{produccionRows[3]?.logrado || 0} cápsulas</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Código RAD-009</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-indigo-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Reportes de Campo (RAD-011)</span>
              <span className="text-base font-bold font-mono text-emerald-700">{produccionRows[5]?.logrado || 0} despachos</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Corresponsalías en directo</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FORMULARIO 3: Desglose Temático de Contenido Radial (7 Temáticas)          */}
      {/* ========================================================================= */}
      {(activeTab === 'TODOS' || activeTab === 'TEMATICO') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">FORMULARIO 1.B.3</span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  Desglose Temático de Contenido Radial
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Distribución de la parrilla de programación por temáticas, horas al aire y audiencia estimada de oyentes.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                7 Temáticas Oficiales
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Temática</th>
                  <th className="py-2.5 px-3 w-40 text-right">N° de Programas</th>
                  <th className="py-2.5 px-3 w-44 text-right">Horas de Transmisión</th>
                  <th className="py-2.5 px-3 w-48 text-right">Audiencia Estimada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tematicoRows.map((row, idx) => (
                  <tr key={row.tematica} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      <div>
                        <span>{row.tematica}</span>
                        {row.tematica === 'Contingencia Sísmica' && (
                          <span className="block text-[10px] text-amber-700 font-medium">Programas especiales, guías de autoprotección y vocerías técnicas</span>
                        )}
                        {row.tematica === 'Comunitario/Participativo' && (
                          <span className="block text-[10px] text-slate-500">Comunas, vocerías populares y participación ciudadana</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        placeholder="_______"
                        value={row.numProgramas === 0 ? '' : row.numProgramas}
                        onChange={(e) => handleTematicoChange(idx, 'numProgramas', e.target.value)}
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="relative inline-flex items-center w-full">
                        <input
                          type="number"
                          step="0.5"
                          placeholder="_______"
                          value={row.horasTransmision === 0 ? '' : row.horasTransmision}
                          onChange={(e) => handleTematicoChange(idx, 'horasTransmision', e.target.value)}
                          className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                        />
                        <span className="absolute right-2 text-[10px] font-bold text-slate-400 pointer-events-none">hrs</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        placeholder="_______"
                        value={row.audienciaEstimada === 0 ? '' : row.audienciaEstimada}
                        onChange={(e) => handleTematicoChange(idx, 'audienciaEstimada', e.target.value)}
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-indigo-50/70 border-t-2 border-indigo-200 font-bold text-slate-900">
                <tr>
                  <td className="py-2.5 px-3 text-indigo-900">TOTALES CONSOLIDADOS</td>
                  <td className="py-2.5 px-3 text-right font-mono text-indigo-900">{totalProgramasTematico} programas</td>
                  <td className="py-2.5 px-3 text-right font-mono text-indigo-900">{totalHorasTematico.toFixed(1)} hrs</td>
                  <td className="py-2.5 px-3 text-right font-mono text-indigo-900">{totalAudienciaTematico.toLocaleString()} oyentes</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FORMULARIO 4: Infraestructura Técnica Radial (RAD-014 al RAD-018)          */}
      {/* ========================================================================= */}
      {(activeTab === 'TODOS' || activeTab === 'INFRAESTRUCTURA') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">FORMULARIO 1.B.4</span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <RadioTower className="w-4 h-4 text-indigo-600" />
                  Infraestructura Técnica Radial
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Auditoría técnica de transmisores operativos, potencia de emisión, plantas generadoras de emergencia y estabilidad de la señal.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                Códigos RAD-014 al RAD-018
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-56 text-right">Valor</th>
                  <th className="py-2.5 px-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {infraestructuraRows.map((row, idx) => {
                  // Dual ratio rows: RAD-014 & RAD-016
                  if (row.codigo === 'RAD-014' || row.codigo === 'RAD-016') {
                    return (
                      <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-slate-900">
                          <div>
                            <span>{row.indicador}</span>
                            {row.codigo === 'RAD-014' && (
                              <span className="block text-[10px] text-slate-500">Transmisores activos sobre el total del circuito (unidades)</span>
                            )}
                            {row.codigo === 'RAD-016' && (
                              <span className="block text-[10px] text-slate-500">Grupos electrógenos y generadores diésel de emergencia</span>
                            )}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">{row.codigo}</td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <input
                              type="number"
                              placeholder="_______"
                              value={row.valor === 0 ? '' : row.valor}
                              onChange={(e) => handleInfraestructuraChange(idx, 'valor', e.target.value)}
                              className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                              title="Unidades operativas"
                            />
                            <span className="text-slate-500 font-mono text-xs font-bold">/</span>
                            <input
                              type="number"
                              placeholder="_______"
                              value={row.totalRef === 0 || !row.totalRef ? '' : row.totalRef}
                              onChange={(e) => handleInfraestructuraChange(idx, 'totalRef', e.target.value)}
                              className="w-20 px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-700 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                              title="Total de unidades"
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <input
                            type="text"
                            placeholder="Observaciones..."
                            value={row.observaciones}
                            onChange={(e) => handleInfraestructuraChange(idx, 'observaciones', e.target.value)}
                            className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>
                      </tr>
                    );
                  }

                  // RAD-015: % de potencia de transmisión: _______%
                  if (row.codigo === 'RAD-015') {
                    return (
                      <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-slate-900">
                          <div>
                            <span>{row.indicador}</span>
                            <span className="block text-[10px] text-slate-500">Potencia nominal de radiación del circuito</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">{row.codigo}</td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="relative inline-flex items-center justify-end w-36">
                            <input
                              type="number"
                              step="0.1"
                              placeholder="_______%"
                              value={row.valor === 0 ? '' : row.valor}
                              onChange={(e) => handleInfraestructuraChange(idx, 'valor', e.target.value)}
                              className="w-full px-2 py-1 pr-6 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                            />
                            <span className="absolute right-2 text-xs font-bold text-slate-500 pointer-events-none">%</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <input
                            type="text"
                            placeholder="Observaciones..."
                            value={row.observaciones}
                            onChange={(e) => handleInfraestructuraChange(idx, 'observaciones', e.target.value)}
                            className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>
                      </tr>
                    );
                  }

                  // RAD-017 & RAD-018: Standard single value rows
                  return (
                    <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        <div>
                          <span>{row.indicador}</span>
                          {row.codigo === 'RAD-017' && (
                            <span className="block text-[10px] text-rose-700 font-medium">Repetidores o estaciones aisladas sin enlace satelital</span>
                          )}
                          {row.codigo === 'RAD-018' && (
                            <span className="block text-[10px] text-slate-500">Minutos acumulados de interrupción por fallas eléctricas o de enlace</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">{row.codigo}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end">
                          <input
                            type="number"
                            step="0.1"
                            placeholder="_______"
                            value={row.valor === 0 ? '' : row.valor}
                            onChange={(e) => handleInfraestructuraChange(idx, 'valor', e.target.value)}
                            className="w-32 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          placeholder="Observaciones..."
                          value={row.observaciones}
                          onChange={(e) => handleInfraestructuraChange(idx, 'observaciones', e.target.value)}
                          className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-indigo-500"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Infraestructura Summary Metrics */}
          <div className="p-4 bg-emerald-50/40 border-t border-emerald-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Transmisores Operativos (RAD-014)</span>
              <span className="text-base font-bold font-mono text-emerald-900">
                {infraestructuraRows[0]?.valor || 0} / {infraestructuraRows[0]?.totalRef || 88}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                {infraestructuraRows[0]?.totalRef ? (((infraestructuraRows[0].valor) / infraestructuraRows[0].totalRef) * 100).toFixed(1) : 0}% operatividad
              </span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Potencia de Transmisión (RAD-015)</span>
              <span className="text-base font-bold font-mono text-slate-900">{infraestructuraRows[1]?.valor || 0}%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Rendimiento en antena</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Generadores de Respaldo (RAD-016)</span>
              <span className="text-base font-bold font-mono text-emerald-700">
                {infraestructuraRows[2]?.valor || 0} / {infraestructuraRows[2]?.totalRef || 76}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Plantas diésel operativas</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Estaciones Afectadas / Caída</span>
              <span className="text-base font-bold font-mono text-rose-700">
                {infraestructuraRows[3]?.valor || 0} est. | {infraestructuraRows[4]?.valor || 0} min
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Tiempo medio de interrupción</span>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Legal & RACI Integrity Footer */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            Instrumento oficial regulado bajo la <strong>Ley de Responsabilidad Social en Radio, Televisión y Medios Electrónicos</strong> (RESORTE-ME).
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-500">
          <span>Semana: <strong>W{semanaReporte}</strong></span>
          <span>•</span>
          <span>Ente: <strong>{enteInformante}</strong></span>
          <span>•</span>
          <span className="text-indigo-700 font-bold">18 Indicadores Radiales</span>
        </div>
      </div>
    </div>
  );
};
