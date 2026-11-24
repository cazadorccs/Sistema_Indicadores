import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Download, 
  Calculator, 
  Sparkles, 
  Newspaper, 
  Building2, 
  Calendar, 
  UserCheck, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Percent,
  Check,
  Hash,
  Truck,
  BookOpen,
  Layers,
  MapPin,
  Users,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { 
  ImpresoRowProduccion, 
  ImpresoRowEditorial, 
  ImpresoRowDistribucion, 
  FullWeeklyReport, 
  MediaOperationalData, 
  UserAccount, 
  RACIRole 
} from '../types';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';

interface FormularioProduccionImpresosProps {
  initialRows?: ImpresoRowProduccion[];
  initialEditorialRows?: ImpresoRowEditorial[];
  initialDistribucionRows?: ImpresoRowDistribucion[];
  mediosData?: MediaOperationalData;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onSuccessSave?: (message: string) => void;
}

const DEFAULT_PRODUCCION_ROWS: ImpresoRowProduccion[] = [
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
    metaSemanal: 80.0,
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
];

const DEFAULT_EDITORIAL_ROWS: ImpresoRowEditorial[] = [
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
];

const DEFAULT_DISTRIBUCION_ROWS: ImpresoRowDistribucion[] = [
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
];

type SubFormTab = 'TODOS' | 'PRODUCCION' | 'EDITORIAL' | 'DISTRIBUCION';

export const FormularioProduccionImpresos: React.FC<FormularioProduccionImpresosProps> = ({
  initialRows,
  initialEditorialRows,
  initialDistribucionRows,
  mediosData,
  report,
  onSaveReport,
  currentUser,
  currentRole,
  onSuccessSave
}) => {
  // Active sub-form tab
  const [activeTab, setActiveTab] = useState<SubFormTab>('TODOS');

  // State 1: Producción y Tiraje (IMP-001 al IMP-005)
  const [produccionRows, setProduccionRows] = useState<ImpresoRowProduccion[]>(() => {
    if (initialRows && initialRows.length >= 5) return initialRows;
    if (report?.eje1Data?.impresos?.produccion && report.eje1Data.impresos.produccion.length >= 5) {
      return report.eje1Data.impresos.produccion;
    }
    if (mediosData) {
      return [
        {
          codigo: 'IMP-001',
          indicador: 'Ejemplares impresos y distribuidos',
          frecuencia: 'Diaria',
          metaSemanal: mediosData.ejemplaresImpresos ? Math.round(mediosData.ejemplaresImpresos * 1.02) : 150000,
          logrado: mediosData.ejemplaresImpresos || 148500,
          varSemanaAnterior: 3.2
        },
        {
          codigo: 'IMP-002',
          indicador: 'Tiraje total (unidades físicas)',
          frecuencia: 'Diaria',
          metaSemanal: mediosData.tirajeTotal ? Math.round(mediosData.tirajeTotal * 1.01) : 160000,
          logrado: mediosData.tirajeTotal || 158000,
          varSemanaAnterior: 2.5
        },
        {
          codigo: 'IMP-003',
          indicador: 'Ejemplares distribuidos en zonas afectadas',
          frecuencia: 'Diaria',
          metaSemanal: mediosData.ejemplaresZonasAfectadas ? Math.round(mediosData.ejemplaresZonasAfectadas * 1.03) : 45000,
          logrado: mediosData.ejemplaresZonasAfectadas || 44200,
          varSemanaAnterior: 8.4
        },
        {
          codigo: 'IMP-004',
          indicador: 'Porcentaje de cobertura territorial (municipios)',
          frecuencia: 'Semanal',
          metaSemanal: 80.0,
          logrado: mediosData.coberturaMunicipiosImpresos || 78.5,
          varSemanaAnterior: 1.8
        },
        {
          codigo: 'IMP-005',
          indicador: 'Número de suplementos especiales (contingencia)',
          frecuencia: 'Semanal',
          metaSemanal: mediosData.suplementosEspeciales || 4,
          logrado: mediosData.suplementosEspeciales || 4,
          varSemanaAnterior: 0.0
        }
      ];
    }
    return DEFAULT_PRODUCCION_ROWS;
  });

  // State 2: Contenido Editorial y Temático (IMP-006 al IMP-012)
  const [editorialRows, setEditorialRows] = useState<ImpresoRowEditorial[]>(() => {
    if (initialEditorialRows && initialEditorialRows.length >= 7) return initialEditorialRows;
    if (report?.eje1Data?.impresos?.editorial && report.eje1Data.impresos.editorial.length >= 7) {
      return report.eje1Data.impresos.editorial;
    }
    if (mediosData) {
      return [
        {
          codigo: 'IMP-006',
          indicador: 'Notas de prensa publicadas',
          frecuencia: 'Diaria',
          logrado: mediosData.notasPrensaImpresas || 142,
          observaciones: 'Despliegue prioritario en primera plana y cuerpo central'
        },
        {
          codigo: 'IMP-007',
          indicador: 'Artículos de opinión / análisis',
          frecuencia: 'Diaria',
          logrado: mediosData.articulosOpinion || 38,
          observaciones: 'Columnas de especialistas, economistas e historiadores'
        },
        {
          codigo: 'IMP-008',
          indicador: 'Entrevistas publicadas',
          frecuencia: 'Diaria',
          logrado: mediosData.entrevistasImpresas || 24,
          observaciones: 'Vocerías comunitarias y autoridades de protección civil'
        },
        {
          codigo: 'IMP-009',
          indicador: 'Contenido sobre contingencia sísmica',
          frecuencia: 'Diaria',
          logrado: mediosData.contenidoSismoImpreso || 31,
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
      ];
    }
    return DEFAULT_EDITORIAL_ROWS;
  });

  // State 3: Distribución Física y Logística (IMP-013 al IMP-017)
  const [distribucionRows, setDistribucionRows] = useState<ImpresoRowDistribucion[]>(() => {
    if (initialDistribucionRows && initialDistribucionRows.length >= 5) return initialDistribucionRows;
    if (report?.eje1Data?.impresos?.distribucion && report.eje1Data.impresos.distribucion.length >= 5) {
      return report.eje1Data.impresos.distribucion;
    }
    if (mediosData) {
      return [
        {
          codigo: 'IMP-013',
          indicador: 'Puntos de distribución activos',
          valor: mediosData.puntosDistribucionActivos || 480,
          unidad: 'Número'
        },
        {
          codigo: 'IMP-014',
          indicador: 'Municipios con cobertura física',
          valor: mediosData.coberturaMunicipiosImpresos || 263,
          totalRef: 335,
          unidad: '%'
        },
        {
          codigo: 'IMP-015',
          indicador: 'Rutas de distribución afectadas',
          valor: mediosData.rutasAfectadas !== undefined ? mediosData.rutasAfectadas : 6,
          unidad: 'Número'
        },
        {
          codigo: 'IMP-016',
          indicador: 'Personal de distribución desplegado',
          valor: mediosData.personalDistribucion || 185,
          unidad: 'Número'
        },
        {
          codigo: 'IMP-017',
          indicador: 'Unidades de transporte operativas',
          valor: mediosData.unidadesTransporteOperativas || 38,
          totalRef: mediosData.unidadesTransporteTotal || 42,
          unidad: '%'
        }
      ];
    }
    return DEFAULT_DISTRIBUCION_ROWS;
  });

  // Control / Metadata
  const [enteInformante, setEnteInformante] = useState<string>(
    currentUser?.enteAdscrito === 'MPPCI_CENTRAL' 
      ? 'Correo del Orinoco' 
      : (currentUser?.enteAdscrito || 'Correo del Orinoco')
  );
  const [responsableCarga, setResponsableCarga] = useState<string>(
    currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : 'Lic. Manuel Azuaje (Coord. Producción Editorial)'
  );
  const [cedulaResponsable, setCedulaResponsable] = useState<string>(
    currentUser?.cedula || 'V-13847291'
  );
  const [semanaReporte, setSemanaReporte] = useState<number>(
    report?.control?.semanaEpidemiologica || 35
  );
  const [fechaCorte, setFechaCorte] = useState<string>(
    report?.control?.fechaReporte || new Date().toISOString().substring(0, 10)
  );

  // Status message
  const [feedback, setFeedback] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Handlers for Producción
  const handleProduccionChange = (index: number, field: 'metaSemanal' | 'logrado' | 'varSemanaAnterior', rawVal: string) => {
    const num = rawVal === '' ? 0 : parseFloat(rawVal);
    setProduccionRows(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: isNaN(num) ? 0 : num
      };
      return updated;
    });
    setIsSavedSuccess(false);
  };

  // Handlers for Editorial
  const handleEditorialChange = (index: number, field: 'logrado' | 'observaciones', rawVal: string) => {
    setEditorialRows(prev => {
      const updated = [...prev];
      if (field === 'logrado') {
        const num = rawVal === '' ? 0 : parseFloat(rawVal);
        updated[index] = { ...updated[index], logrado: isNaN(num) ? 0 : num };
      } else {
        updated[index] = { ...updated[index], observaciones: rawVal };
      }
      return updated;
    });
    setIsSavedSuccess(false);
  };

  // Handlers for Distribución
  const handleDistribucionChange = (index: number, field: 'valor' | 'totalRef', rawVal: string) => {
    const num = rawVal === '' ? 0 : parseFloat(rawVal);
    setDistribucionRows(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: isNaN(num) ? 0 : num
      };
      return updated;
    });
    setIsSavedSuccess(false);
  };

  // Clear fields
  const handleClearFields = () => {
    if (activeTab === 'PRODUCCION' || activeTab === 'TODOS') {
      setProduccionRows(prev => prev.map(r => ({ ...r, metaSemanal: 0, logrado: 0, varSemanaAnterior: 0 })));
    }
    if (activeTab === 'EDITORIAL' || activeTab === 'TODOS') {
      setEditorialRows(prev => prev.map(r => ({ ...r, logrado: 0, observaciones: '' })));
    }
    if (activeTab === 'DISTRIBUCION' || activeTab === 'TODOS') {
      setDistribucionRows(prev => prev.map(r => ({ ...r, valor: 0, totalRef: r.codigo === 'IMP-014' ? 335 : (r.totalRef || 0) })));
    }
    setFeedback({
      type: 'info',
      message: 'Formulario limpiado. Campos listos para la captura manual de nuevos datos (_______).'
    });
    setIsSavedSuccess(false);
  };

  // Restore reference data
  const handleRestoreReference = () => {
    if (activeTab === 'PRODUCCION' || activeTab === 'TODOS') {
      setProduccionRows(DEFAULT_PRODUCCION_ROWS);
    }
    if (activeTab === 'EDITORIAL' || activeTab === 'TODOS') {
      setEditorialRows(DEFAULT_EDITORIAL_ROWS);
    }
    if (activeTab === 'DISTRIBUCION' || activeTab === 'TODOS') {
      setDistribucionRows(DEFAULT_DISTRIBUCION_ROWS);
    }
    setFeedback({
      type: 'info',
      message: 'Se han restaurado los valores de referencia oficiales para los medios impresos.'
    });
    setIsSavedSuccess(false);
  };

  // Auto calculate variation % vs meta
  const handleAutoCalculateVariations = () => {
    setProduccionRows(prev => prev.map(r => {
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
    setIsSavedSuccess(false);
  };

  // Save all collected data
  const handleSaveData = () => {
    if (report && onSaveReport) {
      // Sync into master report mediosData
      const updatedMediosData: MediaOperationalData = {
        ...report.mediosData,
        // Producción
        ejemplaresImpresos: produccionRows[0]?.logrado || 0,
        tirajeTotal: produccionRows[1]?.logrado || 0,
        ejemplaresZonasAfectadas: produccionRows[2]?.logrado || 0,
        coberturaMunicipiosImpresos: produccionRows[3]?.logrado || distribucionRows[1]?.valor || 0,
        suplementosEspeciales: produccionRows[4]?.logrado || 0,
        // Editorial
        notasPrensaImpresas: editorialRows[0]?.logrado || 0,
        articulosOpinion: editorialRows[1]?.logrado || 0,
        entrevistasImpresas: editorialRows[2]?.logrado || 0,
        contenidoSismoImpreso: editorialRows[3]?.logrado || 0,
        // Distribución
        puntosDistribucionActivos: distribucionRows[0]?.valor || 0,
        rutasAfectadas: distribucionRows[2]?.valor || 0,
        personalDistribucion: distribucionRows[3]?.valor || 0,
        unidadesTransporteOperativas: distribucionRows[4]?.valor || 0,
        unidadesTransporteTotal: distribucionRows[4]?.totalRef || 42
      };

      // Sync into eje1Data
      const updatedEje1Data = {
        ...(report.eje1Data || {
          radios: { alcance: [], produccion: [], tematico: [], infraestructura: [] },
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
        impresos: {
          produccion: produccionRows,
          editorial: editorialRows,
          distribucion: distribucionRows
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
      setIsSavedSuccess(true);
      setFeedback({
        type: 'success',
        message: 'Información de Medios Impresos (IMP-001 al IMP-017) guardada y recalculada con éxito.'
      });
      if (onSuccessSave) {
        onSuccessSave('Formularios de Medios Impresos actualizados');
      }
    } else {
      setIsSavedSuccess(true);
      setFeedback({
        type: 'success',
        message: 'Datos validados y almacenados en memoria local.'
      });
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    let csv = `REPORTE OFICIAL DE RECOLECCION DE INFORMACION - MEDIOS IMPRESOS\n`;
    csv += `Ente Informante: ${enteInformante}\n`;
    csv += `Responsable: ${responsableCarga} (${cedulaResponsable})\n`;
    csv += `Semana Epidemiologica: ${semanaReporte} | Fecha: ${fechaCorte}\n\n`;

    // Section 1
    csv += `1. PRODUCCION Y DISTRIBUCION DE CONTENIDO IMPRESO\n`;
    csv += `Codigo,Indicador,Frecuencia,Meta Semanal,Logrado,Var % vs Sem Anterior\n`;
    produccionRows.forEach(r => {
      csv += `"${r.codigo}","${r.indicador}","${r.frecuencia}",${r.metaSemanal},${r.logrado},${r.varSemanaAnterior}%\n`;
    });

    // Section 2
    csv += `\n2. CONTENIDO EDITORIAL Y TEMATICO\n`;
    csv += `Codigo,Indicador,Frecuencia,Logrado,Observaciones\n`;
    editorialRows.forEach(r => {
      csv += `"${r.codigo}","${r.indicador}","${r.frecuencia}",${r.logrado},"${r.observaciones.replace(/"/g, '""')}"\n`;
    });

    // Section 3
    csv += `\n3. DISTRIBUCION FISICA Y LOGISTICA\n`;
    csv += `Codigo,Indicador,Valor,Referencia Total,Unidad\n`;
    distribucionRows.forEach(r => {
      csv += `"${r.codigo}","${r.indicador}",${r.valor},${r.totalRef !== undefined ? r.totalRef : ''},"${r.unidad}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Levantamiento_Impresos_Semana_${semanaReporte}_${enteInformante.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Computed calculations for Contenido Editorial
  const totalEditorialLogrado = editorialRows.reduce((acc, r) => acc + (r.logrado || 0), 0);
  const piezasDiarias = editorialRows.filter(r => r.frecuencia === 'Diaria').reduce((acc, r) => acc + (r.logrado || 0), 0);
  const piezasSemanales = editorialRows.filter(r => r.frecuencia === 'Semanal').reduce((acc, r) => acc + (r.logrado || 0), 0);
  const contenidoSismo = editorialRows.find(r => r.codigo === 'IMP-009')?.logrado || 0;
  const interesComunitario = editorialRows.find(r => r.codigo === 'IMP-010')?.logrado || 0;

  // Computed calculations for Distribución Física
  const puntosDistribucion = distribucionRows.find(r => r.codigo === 'IMP-013')?.valor || 0;
  const munCubiertos = distribucionRows.find(r => r.codigo === 'IMP-014')?.valor || 0;
  const munTotal = distribucionRows.find(r => r.codigo === 'IMP-014')?.totalRef || 335;
  const munPorcentaje = munTotal > 0 ? +((munCubiertos / munTotal) * 100).toFixed(1) : 0;
  const rutasAfectadas = distribucionRows.find(r => r.codigo === 'IMP-015')?.valor || 0;
  const personalDesplegado = distribucionRows.find(r => r.codigo === 'IMP-016')?.valor || 0;
  const vehOperativos = distribucionRows.find(r => r.codigo === 'IMP-017')?.valor || 0;
  const vehTotal = distribucionRows.find(r => r.codigo === 'IMP-017')?.totalRef || 42;
  const vehPorcentaje = vehTotal > 0 ? +((vehOperativos / vehTotal) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Variables */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  1.A Medios Impresos (IMP-001 al IMP-017)
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                Formularios Oficiales para Recabar Información: Medios Impresos
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Instrumento operativo de captura para producción, tiraje, contenido editorial y distribución logística.
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
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
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
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
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
              <Building2 className="w-3 h-3" /> Ente Informante
            </label>
            <select
              value={enteInformante}
              onChange={(e) => setEnteInformante(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-500"
            >
              <option value="Correo del Orinoco">Correo del Orinoco (Periódico)</option>
              <option value="Ciudad Caracas">Diario Ciudad Caracas</option>
              <option value="Diario VEA">Diario VEA</option>
              <option value="SAINGO - Imprenta Nacional">SAINGO - Imprenta Nacional</option>
              <option value="MIPPCI Central">MIPPCI Central (Dirección de Medios Impresos)</option>
              <option value="Agencia Venezolana de Noticias">AVN (Distribución de Suplementos)</option>
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
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-500"
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
              className="w-full text-xs font-mono font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-500"
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
                className="w-full text-xs font-bold text-center bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-blue-700 focus:bg-white focus:ring-1 focus:ring-blue-500"
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
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:bg-white focus:ring-1 focus:ring-blue-500"
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
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center space-x-2">
              {feedback.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              {feedback.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
              {feedback.type === 'info' && <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />}
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
          { id: 'TODOS', label: 'Todos los Formularios (Vista Integral)', icon: Layers, count: '17 Indicadores' },
          { id: 'PRODUCCION', label: '1. Producción y Tiraje', icon: Newspaper, count: 'IMP-001 al IMP-005' },
          { id: 'EDITORIAL', label: '2. Contenido Editorial y Temático', icon: BookOpen, count: 'IMP-006 al IMP-012' },
          { id: 'DISTRIBUCION', label: '3. Distribución Física y Logística', icon: Truck, count: 'IMP-013 al IMP-017' }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SubFormTab)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* FORMULARIO 1: Producción y Distribución de Contenido Impreso (IMP-001-005) */}
      {/* ========================================================================= */}
      {(activeTab === 'TODOS' || activeTab === 'PRODUCCION') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">FORMULARIO 1.A.1</span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-blue-600" />
                  Producción y Distribución de Contenido Impreso
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Indicadores oficiales de tiraje físico, distribución territorial y suplementos especiales.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAutoCalculateVariations}
                className="flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-slate-100 text-blue-700 rounded text-xs font-semibold border border-blue-200 shadow-2xs transition-colors cursor-pointer"
                title="Calcular variación porcentual automáticamente vs meta semanal"
              >
                <Calculator className="w-3 h-3 text-blue-600" />
                <span>Calcular Var %</span>
              </button>
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                Códigos IMP-001 al IMP-005
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
                {produccionRows.map((row, idx) => {
                  const isPercentageRow = row.codigo === 'IMP-004';
                  const cumplimiento = row.metaSemanal > 0 
                    ? Math.round((row.logrado / row.metaSemanal) * 100) 
                    : 0;

                  return (
                    <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        <div>
                          <span>{row.indicador}</span>
                          {row.codigo === 'IMP-001' && (
                            <span className="block text-[10px] text-slate-500">Unidades efectivamente colocadas en puntos de venta y comunitarios</span>
                          )}
                          {row.codigo === 'IMP-003' && (
                            <span className="block text-[10px] text-amber-700 font-medium">Prioridad de contingencia sísmica Funvisis</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-700 bg-blue-50/50">{row.codigo}</td>
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
                            step={isPercentageRow ? "0.1" : "1"}
                            placeholder={isPercentageRow ? "_______%" : "_______"}
                            value={row.metaSemanal === 0 ? '' : row.metaSemanal}
                            onChange={(e) => handleProduccionChange(idx, 'metaSemanal', e.target.value)}
                            className="w-full px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold focus:bg-white focus:ring-1 focus:ring-blue-500"
                          />
                          {isPercentageRow && (
                            <span className="absolute right-2 text-[11px] font-bold text-slate-500 pointer-events-none">%</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="relative inline-flex items-center w-full">
                          <input
                            type="number"
                            step={isPercentageRow ? "0.1" : "1"}
                            placeholder={isPercentageRow ? "_______%" : "_______"}
                            value={row.logrado === 0 ? '' : row.logrado}
                            onChange={(e) => handleProduccionChange(idx, 'logrado', e.target.value)}
                            className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-blue-500"
                          />
                          {isPercentageRow && (
                            <span className="absolute right-2 text-[11px] font-bold text-blue-700 pointer-events-none">%</span>
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
                            onChange={(e) => handleProduccionChange(idx, 'varSemanaAnterior', e.target.value)}
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
                            ? 'bg-blue-100 text-blue-800' 
                            : cumplimiento >= 60 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-rose-100 text-rose-800'
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
      {/* FORMULARIO 2: Contenido Editorial y Temático (IMP-006 al IMP-012)        */}
      {/* ========================================================================= */}
      {(activeTab === 'TODOS' || activeTab === 'EDITORIAL') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">FORMULARIO 1.A.2</span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  Contenido Editorial y Temático
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Levantamiento de notas periodísticas, columnas de opinión, entrevistas comunitarias y contenidos de contingencia.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                Códigos IMP-006 al IMP-012
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
                {editorialRows.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      <div>
                        <span>{row.indicador}</span>
                        {row.codigo === 'IMP-009' && (
                          <span className="block text-[10px] text-amber-700 font-medium">Líneas de autoprotección, centros de acopio y prevención</span>
                        )}
                        {row.codigo === 'IMP-010' && (
                          <span className="block text-[10px] text-slate-500">Servicios públicos, salud comunitaria y jornadas solidarias</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-purple-700 bg-purple-50/50">{row.codigo}</td>
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
                        onChange={(e) => handleEditorialChange(idx, 'logrado', e.target.value)}
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-purple-500"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        placeholder="Observaciones..."
                        value={row.observaciones}
                        onChange={(e) => handleEditorialChange(idx, 'observaciones', e.target.value)}
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-purple-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Editorial Summary Metrics */}
          <div className="p-4 bg-purple-50/40 border-t border-purple-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-purple-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Piezas Publicadas</span>
              <span className="text-base font-bold font-mono text-purple-900">{totalEditorialLogrado.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Suma IMP-006 a IMP-012</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-purple-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Contenidos Diarios</span>
              <span className="text-base font-bold font-mono text-slate-900">{piezasDiarias.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{piezasSemanales} en periodicidad semanal</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-purple-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Contingencia Sísmica (IMP-009)</span>
              <span className="text-base font-bold font-mono text-amber-700">{contenidoSismo} piezas</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Protocolos de emergencia</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-purple-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Interés Comunitario (IMP-010)</span>
              <span className="text-base font-bold font-mono text-emerald-700">{interesComunitario} piezas</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Servicios y comunas</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FORMULARIO 3: Distribución Física y Logística (IMP-013 al IMP-017)        */}
      {/* ========================================================================= */}
      {(activeTab === 'TODOS' || activeTab === 'DISTRIBUCION') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">FORMULARIO 1.A.3</span>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Distribución Física y Logística
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Capacidad de despliegue territorial, flota operativa, cobertura municipal y personal logístico.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                Códigos IMP-013 al IMP-017
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-64 text-right">Valor</th>
                  <th className="py-2.5 px-3 w-28">Unidad</th>
                  <th className="py-2.5 px-3 w-36 text-center">Cálculo en Tiempo Real</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {distribucionRows.map((row, idx) => {
                  if (row.codigo === 'IMP-014') {
                    // Municipios con cobertura física: _______ / 335 %
                    const pct = row.totalRef && row.totalRef > 0 
                      ? +((row.valor / row.totalRef) * 100).toFixed(1) 
                      : 0;

                    return (
                      <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-slate-900">
                          <div>
                            <span>{row.indicador}</span>
                            <span className="block text-[10px] text-slate-500">Universo total INE: 335 Municipios de la República</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 bg-emerald-50/50">{row.codigo}</td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <input
                              type="number"
                              placeholder="_______"
                              value={row.valor === 0 ? '' : row.valor}
                              onChange={(e) => handleDistribucionChange(idx, 'valor', e.target.value)}
                              className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-emerald-500"
                            />
                            <span className="text-slate-500 font-mono text-xs font-bold">/ 335</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-600">%</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                            pct >= 75 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {pct}% Cobertura
                          </span>
                        </td>
                      </tr>
                    );
                  }

                  if (row.codigo === 'IMP-017') {
                    // Unidades de transporte operativas: _______ / _______ %
                    const operativas = row.valor;
                    const total = row.totalRef || 0;
                    const pct = total > 0 ? +((operativas / total) * 100).toFixed(1) : 0;

                    return (
                      <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-slate-900">
                          <div>
                            <span>{row.indicador}</span>
                            <span className="block text-[10px] text-slate-500">Flota vehicular operativa sobre el parque total de transporte</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 bg-emerald-50/50">{row.codigo}</td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <input
                              type="number"
                              placeholder="_______"
                              value={row.valor === 0 ? '' : row.valor}
                              onChange={(e) => handleDistribucionChange(idx, 'valor', e.target.value)}
                              className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-emerald-500"
                              title="Unidades operativas"
                            />
                            <span className="text-slate-500 font-mono text-xs font-bold">/</span>
                            <input
                              type="number"
                              placeholder="_______"
                              value={row.totalRef === 0 ? '' : row.totalRef}
                              onChange={(e) => handleDistribucionChange(idx, 'totalRef', e.target.value)}
                              className="w-20 px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-700 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                              title="Total de unidades de la flota"
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-600">%</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                            pct >= 85 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {pct}% Operatividad
                          </span>
                        </td>
                      </tr>
                    );
                  }

                  // IMP-013, IMP-015, IMP-016 (standard number rows)
                  return (
                    <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        <div>
                          <span>{row.indicador}</span>
                          {row.codigo === 'IMP-015' && (
                            <span className="block text-[10px] text-rose-700 font-medium">Bloqueos de vías o accesos interrumpidos</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 bg-emerald-50/50">{row.codigo}</td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end">
                          <input
                            type="number"
                            placeholder="_______"
                            value={row.valor === 0 ? '' : row.valor}
                            onChange={(e) => handleDistribucionChange(idx, 'valor', e.target.value)}
                            className="w-32 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-600">{row.unidad}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="text-[11px] font-mono text-slate-500">
                          {row.codigo === 'IMP-015' && row.valor > 0 ? (
                            <span className="text-rose-700 font-bold">⚠️ {row.valor} alerta(s)</span>
                          ) : (
                            <span>Registrado</span>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Distribución Summary Metrics */}
          <div className="p-4 bg-emerald-50/40 border-t border-emerald-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Puntos de Distribución</span>
              <span className="text-base font-bold font-mono text-emerald-900">{puntosDistribucion.toLocaleString()} activos</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Kioscos, sedes y comunidades</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Cobertura Nacional (IMP-014)</span>
              <span className="text-base font-bold font-mono text-slate-900">{munPorcentaje}%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{munCubiertos} de {munTotal} municipios</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Flota Operativa (IMP-017)</span>
              <span className="text-base font-bold font-mono text-emerald-700">{vehPorcentaje}%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{vehOperativos} de {vehTotal} vehículos</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Personal Desplegado</span>
              <span className="text-base font-bold font-mono text-blue-900">{personalDesplegado} personas</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{rutasAfectadas} rutas con afectación</span>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Legal & RACI Integrity Footer */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Instrumento oficial regulado bajo la <strong>Ley de Comunicación del Poder Popular</strong> y normativas MPPCI.
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-500">
          <span>Semana: <strong>W{semanaReporte}</strong></span>
          <span>•</span>
          <span>Ente: <strong>{enteInformante}</strong></span>
          <span>•</span>
          <span className="text-emerald-700 font-bold">17 Indicadores Operativos</span>
        </div>
      </div>
    </div>
  );
};
