import React, { useState } from 'react';
import { 
  Globe, 
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
  FileCheck, 
  Layers, 
  Users, 
  MousePointerClick, 
  ShieldCheck, 
  AlertTriangle,
  FileSpreadsheet,
  TrendingUp,
  Clock,
  Send
} from 'lucide-react';
import { 
  DigitalRowPortales, 
  DigitalRowTematico, 
  DigitalRowSuscripciones, 
  DigitalRowTramites, 
  FullWeeklyReport, 
  MediaOperationalData, 
  UserAccount, 
  RACIRole 
} from '../types';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';

interface FormularioDigitalesProps {
  initialPortales?: DigitalRowPortales[];
  initialTematico?: DigitalRowTematico[];
  initialSuscripciones?: DigitalRowSuscripciones[];
  initialTramites?: DigitalRowTramites[];
  mediosData?: MediaOperationalData;
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onSuccessSave?: (message: string) => void;
}

const DEFAULT_PORTALES: DigitalRowPortales[] = [
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
];

const DEFAULT_TEMATICO: DigitalRowTematico[] = [
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
];

const DEFAULT_SUSCRIPCIONES: DigitalRowSuscripciones[] = [
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
    observaciones: 'Usuarios verificados en plataforma de servicios digitales'
  },
  {
    codigo: 'WEB-010',
    indicador: 'Notificaciones push enviadas',
    valor: 1420000,
    observaciones: 'Alertas informativas prioritarias y comunicados oficiales'
  },
  {
    codigo: 'WEB-011',
    indicador: 'Clics en boletines informativos',
    valor: 34800,
    observaciones: 'Tráfico directo derivado hacia el portal web principal'
  },
  {
    codigo: 'WEB-012',
    indicador: 'Nuevos suscriptores (semana)',
    valor: 1850,
    observaciones: 'Crecimiento semanal neto de base suscrita del 4.2%'
  }
];

const DEFAULT_TRAMITES: DigitalRowTramites[] = [
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
    observaciones: 'Periodistas y corresponsales nacionales e internacionales acreditados'
  },
  {
    codigo: 'WEB-015',
    indicador: 'Registros PNI (productores independientes)',
    valor: 36,
    observaciones: 'Certificaciones emitidas con firma electrónica válida'
  },
  {
    codigo: 'WEB-016',
    indicador: 'Visas/permisos tramitados',
    valor: 22,
    observaciones: 'En articulación directa con Cancillería y SAIME'
  },
  {
    codigo: 'WEB-017',
    indicador: 'Solicitudes de acceso a la información',
    valor: 45,
    observaciones: 'Atención a solicitudes ciudadanas, gremiales y académicas'
  },
  {
    codigo: 'WEB-018',
    indicador: 'Tasa de respuesta a solicitudes',
    valor: 96.5,
    unidad: '%',
    observaciones: 'Tiempo promedio de atención menor a 48 horas continuas'
  }
];

export const FormularioDigitales: React.FC<FormularioDigitalesProps> = ({
  initialPortales,
  initialTematico,
  initialSuscripciones,
  initialTramites,
  mediosData,
  report,
  onSaveReport,
  currentUser,
  currentRole,
  onSuccessSave
}) => {
  // Local state for the 4 tables
  const [portales, setPortales] = useState<DigitalRowPortales[]>(() => {
    if (initialPortales && initialPortales.length > 0) return initialPortales;
    if (report?.eje1Data?.digitales?.portales && report.eje1Data.digitales.portales.length > 0) {
      return report.eje1Data.digitales.portales;
    }
    return DEFAULT_PORTALES;
  });

  const [tematico, setTematico] = useState<DigitalRowTematico[]>(() => {
    if (initialTematico && initialTematico.length > 0) return initialTematico;
    if (report?.eje1Data?.digitales?.contenidoTematico && report.eje1Data.digitales.contenidoTematico.length > 0) {
      return report.eje1Data.digitales.contenidoTematico;
    }
    return DEFAULT_TEMATICO;
  });

  const [suscripciones, setSuscripciones] = useState<DigitalRowSuscripciones[]>(() => {
    if (initialSuscripciones && initialSuscripciones.length > 0) return initialSuscripciones;
    if (report?.eje1Data?.digitales?.suscripciones && report.eje1Data.digitales.suscripciones.length > 0) {
      return report.eje1Data.digitales.suscripciones;
    }
    return DEFAULT_SUSCRIPCIONES;
  });

  const [tramites, setTramites] = useState<DigitalRowTramites[]>(() => {
    if (initialTramites && initialTramites.length > 0) return initialTramites;
    if (report?.eje1Data?.digitales?.tramitesServicios && report.eje1Data.digitales.tramitesServicios.length > 0) {
      return report.eje1Data.digitales.tramitesServicios;
    }
    return DEFAULT_TRAMITES;
  });

  // Metadata controls
  const [enteInformante, setEnteInformante] = useState<string>(
    report?.control?.ente || 'Portal MinCI / AVN'
  );
  const [responsableCarga, setResponsableCarga] = useState<string>(
    currentUser?.nombre || report?.control?.responsable || 'Lic. Mariana Gómez'
  );
  const [cedulaResponsable, setCedulaResponsable] = useState<string>(
    currentUser?.cedula || report?.control?.cedula || 'V-16.782.419'
  );
  const [semanaReporte, setSemanaReporte] = useState<string>(
    report?.control?.semana || 'Semana 38 - 2026'
  );
  const [fechaCorte, setFechaCorte] = useState<string>(
    report?.control?.fechaCorte || '2026-09-20'
  );

  // Subtab filtering
  const [subTab, setSubTab] = useState<'TODOS' | 'PORTALES' | 'TEMATICO' | 'SUSCRIPCIONES' | 'TRAMITES'>('TODOS');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  // Totalized values for Temático
  const totalArticulos = tematico.reduce((acc, curr) => acc + (curr.articulosPublicados || 0), 0);
  const totalVisitasTematico = tematico.reduce((acc, curr) => acc + (curr.visitasGeneradas || 0), 0);
  const promedioTiempoMin = tematico.length > 0 
    ? (tematico.reduce((acc, curr) => acc + (curr.tiempoPromedioMin || 0), 0) / tematico.length).toFixed(1)
    : '0.0';

  // Totalized values for Portales
  const visitasTotalesLogradas = portales.find(p => p.codigo === 'WEB-001')?.logrado || 0;
  const usuariosUnicosLogrados = portales.find(p => p.codigo === 'WEB-002')?.logrado || 0;
  const paginasVistasLogradas = portales.find(p => p.codigo === 'WEB-003')?.logrado || 0;

  // Handlers for Portales
  const handleUpdatePortales = (index: number, field: keyof DigitalRowPortales, value: any) => {
    setPortales(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Handlers for Temático
  const handleUpdateTematico = (index: number, field: keyof DigitalRowTematico, value: any) => {
    setTematico(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Handlers for Suscripciones
  const handleUpdateSuscripciones = (index: number, field: keyof DigitalRowSuscripciones, value: any) => {
    setSuscripciones(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Handlers for Trámites
  const handleUpdateTramites = (index: number, field: keyof DigitalRowTramites, value: any) => {
    setTramites(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Auto-calculate Var % for Portales
  const handleAutoCalculateVar = () => {
    setPortales(prev =>
      prev.map(row => {
        if (row.metaSemanal > 0 && row.logrado > 0) {
          const varPct = Number((((row.logrado - row.metaSemanal) / row.metaSemanal) * 100).toFixed(1));
          return { ...row, varSemanaAnterior: varPct };
        }
        return row;
      })
    );
    setFeedbackMsg('Variaciones porcentuales (Var %) de portales calculadas automáticamente vs Meta Semanal.');
    setTimeout(() => setFeedbackMsg(''), 4500);
  };

  // Restore defaults
  const handleRestoreDefaults = () => {
    if (window.confirm('¿Desea restaurar los valores de referencia del instrumento 1.D Medios Digitales?')) {
      setPortales(DEFAULT_PORTALES);
      setTematico(DEFAULT_TEMATICO);
      setSuscripciones(DEFAULT_SUSCRIPCIONES);
      setTramites(DEFAULT_TRAMITES);
      setFeedbackMsg('Valores estándar de referencia restaurados.');
      setTimeout(() => setFeedbackMsg(''), 4000);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'INSTRUMENTO OFICIAL DE RECOLECCION TECNICA - 1.D MEDIOS DIGITALES\n';
    csvContent += `Ente Informante:,"${enteInformante}"\n`;
    csvContent += `Responsable:,"${responsableCarga}",Cedula:,"${cedulaResponsable}"\n`;
    csvContent += `Semana:,"${semanaReporte}",Fecha Corte:,"${fechaCorte}"\n\n`;

    // Tabla 1: Portales
    csvContent += 'TABLA 1: PLATAFORMAS WEB Y PORTALES\n';
    csvContent += 'Indicador,Codigo,Frecuencia,Meta Semanal,Logrado,Var % vs Sem Anterior\n';
    portales.forEach(row => {
      csvContent += `"${row.indicador}","${row.codigo}","${row.frecuencia}",${row.metaSemanal},${row.logrado},${row.varSemanaAnterior}%\n`;
    });
    csvContent += '\n';

    // Tabla 2: Temático
    csvContent += 'TABLA 2: CONTENIDO WEB POR TEMATICA\n';
    csvContent += 'Categoria,Articulos Publicados,Visitas Generadas,Tiempo Promedio (min)\n';
    tematico.forEach(row => {
      csvContent += `"${row.categoria}",${row.articulosPublicados},${row.visitasGeneradas},${row.tiempoPromedioMin}\n`;
    });
    csvContent += `TOTALES CONSOLIDADOS,${totalArticulos},${totalVisitasTematico},${promedioTiempoMin}\n\n`;

    // Tabla 3: Suscripciones
    csvContent += 'TABLA 3: SUSCRIPCIONES Y BASE DE USUARIOS\n';
    csvContent += 'Indicador,Codigo,Valor Registrado,Observaciones\n';
    suscripciones.forEach(row => {
      csvContent += `"${row.indicador}","${row.codigo}",${row.valor},"${row.observaciones}"\n`;
    });
    csvContent += '\n';

    // Tabla 4: Trámites
    csvContent += 'TABLA 4: TRAMITES Y SERVICIOS DIGITALES\n';
    csvContent += 'Indicador,Codigo,Valor Registrado,Total Referencial,Unidad,Observaciones\n';
    tramites.forEach(row => {
      csvContent += `"${row.indicador}","${row.codigo}",${row.valor},${row.totalRef || ''},"${row.unidad || ''}","${row.observaciones}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `1D_Medios_Digitales_${semanaReporte.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setFeedbackMsg('Archivo CSV generado y descargado exitosamente.');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  // Master Save Handler
  const handleSave = () => {
    if (report && onSaveReport) {
      const updatedControl = {
        ...report.control,
        enteAdscrito: enteInformante,
        responsableEnte: responsableCarga,
        cedulaIdentidad: cedulaResponsable,
        semanaEpidemiologica: typeof semanaReporte === 'number' ? semanaReporte : (report?.control?.semanaEpidemiologica || 35),
        fechaReporte: fechaCorte,
        fechaUltimaModificacion: new Date().toISOString()
      };

      const updatedEje1Data = {
        ...report.eje1Data,
        digitales: {
          portales,
          contenidoTematico: tematico,
          suscripciones,
          tramitesServicios: tramites
        }
      };

      const articulosWeb = portales.find(p => p.codigo === 'WEB-006')?.logrado || totalArticulos;
      const visitasWeb = portales.find(p => p.codigo === 'WEB-001')?.logrado || 1340000;
      const metaVisitasWeb = portales.find(p => p.codigo === 'WEB-001')?.metaSemanal || 1200000;

      const updatedMediosData: MediaOperationalData = {
        ...report.mediosData,
        articulosPublicadosDigital: articulosWeb,
        vistasLogradasDigital: visitasWeb,
        metaVistasDigital: metaVisitasWeb,
        ...(mediosData || {})
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
        eje1Data: updatedEje1Data,
        mediosData: updatedMediosData,
        kpisCalculados: computedKPIs,
        integrityHash: newHash,
        validations: computedValidations,
        fechaUltimaModificacion: new Date().toISOString()
      };

      onSaveReport(updatedReport);
    }

    setSaveSuccess(true);
    setFeedbackMsg('Datos de 1.D Medios Digitales guardados y sincronizados con éxito en el sistema.');
    if (onSuccessSave) {
      onSuccessSave('Datos de 1.D Medios Digitales sincronizados correctamente.');
    }
    setTimeout(() => {
      setSaveSuccess(false);
      setFeedbackMsg('');
    }, 4500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-5 rounded-xl border border-teal-800/40 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3.5">
            <div className="p-3 bg-teal-500/20 text-teal-400 rounded-xl border border-teal-500/30 shadow-inner">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold bg-teal-950/80 px-2 py-0.5 rounded border border-teal-700/50">
                  EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
                </span>
                <span className="text-[10px] font-mono text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded">
                  Códigos WEB-001 al WEB-018
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                1.D MEDIOS DIGITALES — PLATAFORMAS WEB, CONTENIDO & SERVICIOS
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Instrumento de recolección de tráfico web, alcance por categoría temática, suscriptores y trámites digitales.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAutoCalculateVar}
              title="Calcular variación porcentual automáticamente contra meta"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-teal-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calcular Var %</span>
            </button>

            <button
              onClick={handleExportCSV}
              title="Descargar plantilla y datos actuales en CSV"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={handleRestoreDefaults}
              title="Restaurar valores predeterminados"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 rounded-lg text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-teal-500/20 active:scale-95"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white animate-bounce" />
                  <span>¡Guardado!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-white" />
                  <span>Guardar Formulario</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live metric summary ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3.5 border-t border-teal-800/40 text-xs">
          <div className="bg-slate-800/60 p-2.5 rounded-lg border border-teal-900/50">
            <span className="text-[10px] text-teal-300 font-mono block">Visitas Totales (WEB-001)</span>
            <div className="text-base font-bold font-mono text-white mt-0.5">
              {visitasTotalesLogradas.toLocaleString()} visitas
            </div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-lg border border-teal-900/50">
            <span className="text-[10px] text-teal-300 font-mono block">Usuarios Únicos (WEB-002)</span>
            <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
              {usuariosUnicosLogrados.toLocaleString()} únicos
            </div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-lg border border-teal-900/50">
            <span className="text-[10px] text-teal-300 font-mono block">Páginas Vistas (WEB-003)</span>
            <div className="text-base font-bold font-mono text-white mt-0.5">
              {paginasVistasLogradas.toLocaleString()} vistas
            </div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-lg border border-teal-900/50">
            <span className="text-[10px] text-teal-300 font-mono block">Artículos Temáticos</span>
            <div className="text-base font-bold font-mono text-amber-300 mt-0.5">
              {totalArticulos} arts ({totalVisitasTematico.toLocaleString()} vis)
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMsg && (
        <div className="flex items-center space-x-2 bg-teal-50 border border-teal-300 text-teal-900 px-4 py-2.5 rounded-lg text-xs font-medium animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Metadata & Responsibility Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Control y Trazabilidad Institucional del Instrumento
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Validación RACI Nivel 1 & 2 Activa</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Ente Informante / Portal
            </label>
            <select
              value={enteInformante}
              onChange={(e) => setEnteInformante(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-800 font-medium focus:bg-white focus:ring-1 focus:ring-teal-500 text-xs"
            >
              <option value="Portal MinCI / AVN">Portal MinCI / AVN</option>
              <option value="Agencia Venezolana de Noticias (AVN)">Agencia Venezolana de Noticias (AVN)</option>
              <option value="Portal Web VTV Canal 8">Portal Web VTV Canal 8</option>
              <option value="Portal Web Radio Nacional de Venezuela">Portal Web Radio Nacional de Venezuela</option>
              <option value="Portal Web Diario Ciudad Caracas">Portal Web Diario Ciudad Caracas</option>
              <option value="Portal Web TVES / ViVe">Portal Web TVES / ViVe</option>
              <option value="MIPPCI Digital Central">MIPPCI Digital Central</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Responsable de Carga
            </label>
            <input
              type="text"
              value={responsableCarga}
              onChange={(e) => setResponsableCarga(e.target.value)}
              placeholder="Nombre y Apellido"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-medium focus:ring-1 focus:ring-teal-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Cédula de Identidad
            </label>
            <input
              type="text"
              value={cedulaResponsable}
              onChange={(e) => setCedulaResponsable(e.target.value)}
              placeholder="V-00.000.000"
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-mono font-medium focus:ring-1 focus:ring-teal-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Semana del Reporte
            </label>
            <input
              type="text"
              value={semanaReporte}
              onChange={(e) => setSemanaReporte(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-medium focus:ring-1 focus:ring-teal-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Fecha de Corte
            </label>
            <input
              type="date"
              value={fechaCorte}
              onChange={(e) => setFechaCorte(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 font-medium focus:ring-1 focus:ring-teal-500 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex border-b border-slate-200 gap-1 bg-slate-100/75 p-1 rounded-lg text-xs font-semibold">
        <button
          onClick={() => setSubTab('TODOS')}
          className={`px-3 py-1.5 rounded-md transition-all ${
            subTab === 'TODOS'
              ? 'bg-white text-teal-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          Vista Integral (Todos los Sub-bloques)
        </button>
        <button
          onClick={() => setSubTab('PORTALES')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'PORTALES'
              ? 'bg-white text-teal-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-teal-600" />
          <span>Plataformas Web y Portales</span>
        </button>
        <button
          onClick={() => setSubTab('TEMATICO')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'TEMATICO'
              ? 'bg-white text-teal-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-teal-600" />
          <span>Contenido por Temática</span>
        </button>
        <button
          onClick={() => setSubTab('SUSCRIPCIONES')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'SUSCRIPCIONES'
              ? 'bg-white text-teal-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-teal-600" />
          <span>Suscripciones & Usuarios</span>
        </button>
        <button
          onClick={() => setSubTab('TRAMITES')}
          className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
            subTab === 'TRAMITES'
              ? 'bg-white text-teal-800 shadow-sm font-bold border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Trámites & Servicios Digitales</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* BLOQUE 1: PLATAFORMAS WEB Y PORTALES (WEB-001 al WEB-007)                */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'PORTALES') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-teal-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Plataformas Web y Portales
                </h3>
                <p className="text-[11px] text-slate-500">
                  Métricas de tráfico, audiencia, tiempo de sesión, rebote y volumen de publicación diaria
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 font-bold">
              Códigos WEB-001 al WEB-007
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-28">Frecuencia</th>
                  <th className="py-2.5 px-3 w-32 text-right">Meta Semanal</th>
                  <th className="py-2.5 px-3 w-32 text-right">Logrado</th>
                  <th className="py-2.5 px-3 w-36 text-right">Var % vs Semana Anterior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {portales.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-700 bg-teal-50/50">{row.codigo}</td>
                    <td className="py-2.5 px-3 text-slate-600">{row.frecuencia}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.1"
                        value={row.metaSemanal === 0 ? '' : row.metaSemanal}
                        onChange={(e) => handleUpdatePortales(idx, 'metaSemanal', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.1"
                        value={row.logrado === 0 ? '' : row.logrado}
                        onChange={(e) => handleUpdatePortales(idx, 'logrado', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.varSemanaAnterior === 0 ? '' : row.varSemanaAnterior}
                          onChange={(e) => handleUpdatePortales(idx, 'varSemanaAnterior', parseFloat(e.target.value) || 0)}
                          placeholder="_______"
                          className={`w-20 px-2 py-1 text-right border rounded text-xs font-mono font-bold placeholder-slate-400 ${
                            row.varSemanaAnterior >= 0 
                              ? 'text-emerald-700 bg-emerald-50/50 border-emerald-200' 
                              : 'text-rose-700 bg-rose-50/50 border-rose-200'
                          }`}
                        />
                        <span className="text-[11px] font-bold text-slate-500">%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOQUE 2: CONTENIDO WEB POR TEMATICA (7 Categorías)                       */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'TEMATICO') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-teal-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Contenido Web por Temática
                </h3>
                <p className="text-[11px] text-slate-500">
                  Desglose de artículos, impacto en visitas y tiempo promedio de lectura por categoría editorial
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded font-semibold">
              7 Categorías Editoriales Oficiales
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Categoría</th>
                  <th className="py-2.5 px-3 w-40 text-right">Artículos Publicados</th>
                  <th className="py-2.5 px-3 w-44 text-right">Visitas Generadas</th>
                  <th className="py-2.5 px-3 w-44 text-right">Tiempo Promedio (min)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tematico.map((row, idx) => (
                  <tr key={row.categoria} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.categoria}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.articulosPublicados === 0 ? '' : row.articulosPublicados}
                        onChange={(e) => handleUpdateTematico(idx, 'articulosPublicados', parseInt(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.visitasGeneradas === 0 ? '' : row.visitasGeneradas}
                        onChange={(e) => handleUpdateTematico(idx, 'visitasGeneradas', parseInt(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-32 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        step="0.1"
                        value={row.tiempoPromedioMin === 0 ? '' : row.tiempoPromedioMin}
                        onChange={(e) => handleUpdateTematico(idx, 'tiempoPromedioMin', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-teal-50/70 border-t-2 border-teal-200 font-bold text-slate-900">
                <tr>
                  <td className="py-2.5 px-3 text-teal-900">TOTALES CONSOLIDADOS</td>
                  <td className="py-2.5 px-3 text-right font-mono text-teal-900">{totalArticulos} arts</td>
                  <td className="py-2.5 px-3 text-right font-mono text-teal-900">{totalVisitasTematico.toLocaleString()} visitas</td>
                  <td className="py-2.5 px-3 text-right font-mono text-teal-900">{promedioTiempoMin} min prom</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOQUE 3: SUSCRIPCIONES Y BASE DE USUARIOS (WEB-008 al WEB-012)           */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'SUSCRIPCIONES') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-teal-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Suscripciones y Base de Usuarios
                </h3>
                <p className="text-[11px] text-slate-500">
                  Boletines informativos, usuarios registrados en portal, notificaciones push y crecimiento semanal
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 font-bold">
              Códigos WEB-008 al WEB-012
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-40 text-right">Valor</th>
                  <th className="py-2.5 px-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {suscripciones.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-700 bg-teal-50/50">{row.codigo}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.valor === 0 ? '' : row.valor}
                        onChange={(e) => handleUpdateSuscripciones(idx, 'valor', parseFloat(e.target.value) || 0)}
                        placeholder="_______"
                        className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={(e) => handleUpdateSuscripciones(idx, 'observaciones', e.target.value)}
                        placeholder="Observaciones de entrega, apertura y crecimiento..."
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BLOQUE 4: TRAMITES Y SERVICIOS DIGITALES (WEB-013 al WEB-018)              */}
      {/* ========================================================================= */}
      {(subTab === 'TODOS' || subTab === 'TRAMITES') && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-teal-600" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Trámites y Servicios Digitales
                </h3>
                <p className="text-[11px] text-slate-500">
                  Ventanilla única digital, solicitudes de acreditación SIVERIF, registros PNI y tasas de respuesta
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 font-bold">
              Códigos WEB-013 al WEB-018
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Indicador</th>
                  <th className="py-2.5 px-3 w-24">Código</th>
                  <th className="py-2.5 px-3 w-48 text-right">Valor</th>
                  <th className="py-2.5 px-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tramites.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-teal-700 bg-teal-50/50">{row.codigo}</td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <input
                          type="number"
                          step="0.1"
                          value={row.valor === 0 ? '' : row.valor}
                          onChange={(e) => handleUpdateTramites(idx, 'valor', parseFloat(e.target.value) || 0)}
                          placeholder="_______"
                          className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                        />
                        {row.codigo === 'WEB-013' && (
                          <>
                            <span className="text-slate-400 font-bold">/</span>
                            <input
                              type="number"
                              value={row.totalRef === undefined || row.totalRef === 0 ? '' : row.totalRef}
                              onChange={(e) => handleUpdateTramites(idx, 'totalRef', parseFloat(e.target.value) || 0)}
                              placeholder="_______"
                              className="w-20 px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-semibold text-slate-700 placeholder-slate-400 focus:bg-white focus:ring-1 focus:ring-teal-500"
                            />
                          </>
                        )}
                        {row.unidad === '%' && (
                          <span className="text-slate-500 font-bold text-xs">%</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={(e) => handleUpdateTramites(idx, 'observaciones', e.target.value)}
                        placeholder="Gestión y tiempos de respuesta de trámites..."
                        className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-teal-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
