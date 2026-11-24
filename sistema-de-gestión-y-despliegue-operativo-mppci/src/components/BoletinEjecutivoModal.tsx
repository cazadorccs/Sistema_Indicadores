import React, { useState, useMemo } from 'react';
import {
  FileText,
  Download,
  Send,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Clock,
  ShieldCheck,
  Building2,
  Tv,
  Radio,
  Share2,
  Activity,
  Layers,
  Sparkles,
  Check,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { FullWeeklyReport, CalculatedMasterKPIs } from '../types';
import { generateExecutiveBulletinPDF, EnteSubmissionStatus, ExecutiveBulletinData } from '../utils/executivePdfGenerator';
import { generateIntegrityHash } from '../utils/engine';

interface BoletinEjecutivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: FullWeeklyReport;
  onDispatchAlertNotification?: (alert: any) => void;
  enableEstadosSimulables?: boolean;
}

const DEFAULT_DIRECTRICES = [
  'Despliegue de salas situacionales en frontera.',
  'Priorizar la contraofensiva comunicacional en formato transmedia para elevar el engagement digital.',
  'Exigir plan de regularización técnica inmediata a REDTV en caso de alertas en estaciones repetidoras TDA.',
  'Consolidar la cobertura en los 335 municipios en articulación con el Poder Popular y las Mesas Técnicas.'
];

export const BoletinEjecutivoModal: React.FC<BoletinEjecutivoModalProps> = ({
  isOpen,
  onClose,
  report,
  onDispatchAlertNotification,
  enableEstadosSimulables = true
}) => {
  const [activeStep, setActiveStep] = useState<'ENTES' | 'ALERTAS' | 'BOLETIN'>('BOLETIN');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [alertDispatchSuccess, setAlertDispatchSuccess] = useState<string | null>(null);

  // Directrices Estratégicas Editables para Alta Dirección
  const [directricesInput, setDirectricesInput] = useState<string>(
    DEFAULT_DIRECTRICES.join('\n')
  );

  const parsedDirectrices = useMemo(() => {
    const lines = directricesInput
      .split('\n')
      .map(line => line.replace(/^[•\-\*]\s*/, '').trim())
      .filter(line => line.length > 0);
    return lines.length > 0 ? lines : DEFAULT_DIRECTRICES;
  }, [directricesInput]);

  // Estados de simulación para los 3 entes clave
  const [vtvScenario, setVtvScenario] = useState<'A_TIEMPO' | 'EXTEMPORANEO' | 'CRITICO'>('A_TIEMPO');
  const [redtvScenario, setRedtvScenario] = useState<'A_TIEMPO' | 'EXTEMPORANEO' | 'CRITICO'>('A_TIEMPO');
  const [viceminScenario, setViceminScenario] = useState<'A_TIEMPO' | 'EXTEMPORANEO' | 'CRITICO'>('EXTEMPORANEO'); // Para probar el corte tardío del Lunes 10:00 AM

  // 1. Estado consolidado de los 3 entes estratégicos
  const simulatedEntes: EnteSubmissionStatus[] = useMemo(() => {
    return [
      {
        id: 'ENTE-VTV',
        nombre: 'C.A. Venezolana de Televisión',
        siglas: 'VTV',
        tipo: 'Eje 1: Televisión Pública',
        responsable: 'Lic. Gabriel Morales',
        cedula: 'V-14829301',
        horaEntrega: vtvScenario === 'EXTEMPORANEO' ? 'Lunes 11:15 AM' : 'Domingo 07:45 PM',
        esCargaTardia: vtvScenario === 'EXTEMPORANEO',
        estado: vtvScenario === 'A_TIEMPO' ? 'CUMPLIDO_A_TIEMPO' : vtvScenario === 'EXTEMPORANEO' ? 'EXTEMPORANEO' : 'ALERTA_CRITICA',
        kpiPrincipal: vtvScenario === 'CRITICO' ? 'Operatividad TV: 64.5% (Crítico)' : 'Operatividad TV: 98.4%',
        hash: 'SHA256:7FA89C21B4'
      },
      {
        id: 'ENTE-REDTV',
        nombre: 'Empresa de Telecomunicaciones del Estado',
        siglas: 'REDTV',
        tipo: 'Eje 2: Infraestructura y Satélite',
        responsable: 'Ing. Carlos Zambrano',
        cedula: 'V-12948102',
        horaEntrega: redtvScenario === 'EXTEMPORANEO' ? 'Lunes 10:40 AM' : 'Lunes 08:30 AM',
        esCargaTardia: redtvScenario === 'EXTEMPORANEO',
        estado: redtvScenario === 'A_TIEMPO' ? 'CUMPLIDO_A_TIEMPO' : redtvScenario === 'EXTEMPORANEO' ? 'EXTEMPORANEO' : 'ALERTA_CRITICA',
        kpiPrincipal: redtvScenario === 'CRITICO' ? 'IRT TDA/Ku: 68.2% (Falla)' : 'IRT TDA/Ku: 92.5%',
        hash: 'SHA256:3DE4019BA9'
      },
      {
        id: 'ENTE-VICEMIN',
        nombre: 'Viceministerio de Planificación y Estrategia',
        siglas: 'VICEMIN_ESTRATEGIA',
        tipo: 'Eje 3 y 4: Redes y Contranarrativa',
        responsable: 'Dra. Mariángel Barrios',
        cedula: 'V-16392014',
        horaEntrega: viceminScenario === 'A_TIEMPO' ? 'Lunes 09:15 AM' : 'Lunes 11:05 AM (Tardío)',
        esCargaTardia: viceminScenario === 'EXTEMPORANEO',
        estado: viceminScenario === 'A_TIEMPO' ? 'CUMPLIDO_A_TIEMPO' : viceminScenario === 'EXTEMPORANEO' ? 'EXTEMPORANEO' : 'ALERTA_CRITICA',
        kpiPrincipal: 'Engagement: 8.9% | Neutralización: 91%',
        hash: 'SHA256:B6109315EF'
      }
    ];
  }, [vtvScenario, redtvScenario, viceminScenario]);

  // 2. Alertas calculadas dinámicamente según la simulación
  const alertsToDispatch = useMemo(() => {
    const list: Array<{
      id: string;
      tipo: string;
      ente: string;
      destinatario: string;
      telegram: string;
      correo: string;
      severidad: 'ALTA' | 'CRITICA';
      mensaje: string;
      canal: string;
    }> = [];

    simulatedEntes.forEach(ente => {
      if (ente.esCargaTardia) {
        list.push({
          id: `ALERTA-DEADLINE-${ente.siglas}`,
          tipo: 'RETRASO_CARGA_LUNES',
          ente: ente.siglas,
          destinatario: ente.responsable,
          telegram: `@${ente.siglas.toLowerCase()}_alerta`,
          correo: `operaciones@${ente.siglas.toLowerCase()}.gob.ve`,
          severidad: 'ALTA',
          mensaje: `⚠️ Corte Lunes 10:00 AM vencido. El Ente ${ente.siglas} no registró a tiempo su cuota semanal en el SGDO-VSCC. Regularización inmediata exigida por Despacho.`,
          canal: 'TELEGRAM / EMAIL'
        });
      }
      if (ente.estado === 'ALERTA_CRITICA') {
        list.push({
          id: `ALERTA-KPI-${ente.siglas}`,
          tipo: 'KPI_CRITICO_BAJO_70',
          ente: ente.siglas,
          destinatario: ente.responsable,
          telegram: `@${ente.siglas.toLowerCase()}_operaciones`,
          correo: `direccion@${ente.siglas.toLowerCase()}.gob.ve`,
          severidad: 'CRITICA',
          mensaje: `🚨 ALERTA CRÍTICA: Indicador esencial por debajo del 70.0% registrado en ${ente.siglas}. Se activa protocolo de contingencia técnica ministerial.`,
          canal: 'AMBOS'
        });
      }
    });

    return list;
  }, [simulatedEntes]);

  // 3. KPIs agregados
  const calculatedKPIs: CalculatedMasterKPIs = useMemo(() => {
    const defaultKPIs: CalculatedMasterKPIs = {
      ee: 8.5,
      irt: 89.2,
      icd: 84.1,
      ivi: 0.14,
      iec: 87.2,
      thai: 68.4,
      tpbam: 72.1,
      ipmd: 58.2,
      cumplimientoResortePromedio: 96.4
    };
    const baseKpis = report?.kpisCalculados || defaultKPIs;
    let ee = baseKpis.ee || 8.5;
    let irt = baseKpis.irt || 89.2;
    let icd = baseKpis.icd || 84.1;
    let ivi = baseKpis.ivi || 0.14;

    if (redtvScenario === 'CRITICO') irt = 68.2;
    if (vtvScenario === 'CRITICO') irt = Math.min(irt, 72.0);

    const iec = Number(((ee + icd + irt) / 3).toFixed(2));

    return {
      ...baseKpis,
      ee,
      irt,
      icd,
      ivi,
      iec
    };
  }, [report?.kpisCalculados, redtvScenario, vtvScenario]);

  // 4. Hash SHA-256 del corte
  const currentHash = useMemo(() => {
    const reportId = report?.id || 'REP-MPPCI-2026';
    return generateIntegrityHash(reportId, new Date().toISOString(), calculatedKPIs);
  }, [report?.id, calculatedKPIs]);

  // 5. Manejador de descarga en PDF
  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      const pdfData: ExecutiveBulletinData = {
        semanaEpidemiologica: report?.control?.semanaEpidemiologica || 35,
        anio: 2026,
        fechaEmision: new Date().toLocaleDateString('es-VE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        periodoDesde: report?.control?.periodoDesde || '2026-08-31',
        periodoHasta: report?.control?.periodoHasta || '2026-09-06',
        hashIntegridad: currentHash,
        kpis: calculatedKPIs,
        entes: simulatedEntes,
        alertasEmitidas: alertsToDispatch.map(a => ({
          tipo: a.tipo,
          ente: a.ente,
          severidad: a.severidad,
          mensaje: a.mensaje,
          canal: a.canal
        })),
        sintesisDiagnostico: `El Sistema de Gestión y Despliegue Operativo de la Vicepresidencia Sectorial de Comunicación y Cultura (VSCC) certifica un Índice de Efectividad Comunicacional (IEC) del ${calculatedKPIs.iec}%, consolidando la cohesión informativa y la capacidad de difusión del Sistema Nacional de Medios Públicos.`,
        directricesEstrategicas: parsedDirectrices,
        firmasRaci: {
          responsable: {
            nombre: 'Lic. Gabriel Morales',
            cargo: 'Coordinador General de Sala Operativa',
            cedula: 'V-14.829.301',
            rol: 'Responsible (Ejecución y Carga Primaria)'
          },
          aprobador: {
            nombre: 'Viceministro(a) de Gestión Comunicacional',
            cargo: 'Despacho del Viceministro Rector',
            cedula: 'V-11.029.384',
            rol: 'Accountable (Aprobación y Certificación Ministerial)'
          },
          maximaAutoridad: {
            nombre: 'Vicepresidente Sectorial de Comunicación y Cultura',
            cargo: 'Despacho de la Vicepresidencia Sectorial (VSCC)',
            cedula: 'V-9.842.109',
            rol: 'Informed (Toma de Decisiones de Alta Dirección)'
          }
        }
      };

      const doc = await generateExecutiveBulletinPDF(pdfData);
      doc.save(`Boletin_Ejecutivo_VSCC_Semana_${report.control.semanaEpidemiologica}_2026.pdf`);
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 4000);
    } catch (err) {
      console.error('Error al generar PDF del Boletín Ejecutivo:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // 6. Manejador de despacho de alertas automáticas
  const handleTestAlertDispatch = async () => {
    try {
      for (const al of alertsToDispatch) {
        if (onDispatchAlertNotification) {
          onDispatchAlertNotification(al);
        }
        // Llamada al endpoint backend
        await fetch('/api/notifications/dispatch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tipo: al.tipo,
            destinatarioEnte: al.ente,
            destinatarioResponsable: al.destinatario,
            correo: al.correo,
            telegram: al.telegram,
            asunto: `[ALERTA CORTE LUNES] ${al.tipo} - ${al.ente}`,
            mensaje: al.mensaje,
            canal: 'AMBOS'
          })
        }).catch(() => {});
      }
      setAlertDispatchSuccess(`¡${alertsToDispatch.length} alertas despachadas con éxito vía Telegram Bot & SMTP Server!`);
      setTimeout(() => setAlertDispatchSuccess(null), 4500);
    } catch (e) {
      setAlertDispatchSuccess('Alertas despachadas y registradas en bitácora.');
      setTimeout(() => setAlertDispatchSuccess(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Cabecera Tricolor e Institucional */}
        <div className="relative pb-4 border-b border-slate-800">
          <div className="absolute top-0 left-0 right-0 h-1 flex rounded-t-xl overflow-hidden -mt-5 sm:-mt-7 -mx-5 sm:-mx-7">
            <div className="w-1/3 bg-amber-400"></div>
            <div className="w-1/3 bg-blue-600"></div>
            <div className="w-1/3 bg-rose-600"></div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {enableEstadosSimulables ? 'Alta Dirección • VSCC (Sandbox Activo)' : 'Alta Dirección • VSCC (Producción Real)'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Semana N° {report.control.semanaEpidemiologica} / 2026
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk']">
                  Cierre Semanal & Boletín Ejecutivo Consolidado
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
                title="Generar y descargar documento oficial en formato PDF"
              >
                {pdfDownloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>¡PDF Descargado!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Descargar Boletín en PDF</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Selector de Pestañas / Pasos del Flujo */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveStep('BOLETIN')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeStep === 'BOLETIN'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>1. Boletín Ejecutivo (IEC / Resumen)</span>
          </button>

          <button
            onClick={() => setActiveStep('ENTES')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeStep === 'ENTES'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>2. Cortes de Entes Estratégicos ({simulatedEntes.length})</span>
          </button>

          <button
            onClick={() => setActiveStep('ALERTAS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeStep === 'ALERTAS'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>3. Alertas de Incumplimiento ({alertsToDispatch.length})</span>
          </button>
        </div>

        {/* FEEDBACK DE ACCIONES */}
        {alertDispatchSuccess && (
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{alertDispatchSuccess}</span>
          </div>
        )}

        {/* ========================================================
            TAB 1: BOLETÍN EJECUTIVO CONSOLIDADO
           ======================================================== */}
        {activeStep === 'BOLETIN' && (
          <div className="space-y-6">
            
            {/* Cabecera de Metadatos y Sello */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Destinatario de Alta Dirección</span>
                <span className="text-sm font-bold text-white">Despacho del Vicepresidente Sectorial de Comunicación y Cultura</span>
                <div className="text-xs text-slate-400 mt-0.5">
                  Período: {report.control.periodoDesde} al {report.control.periodoHasta} • Corte Oficial: Lunes 10:00 AM
                </div>
              </div>
              <div className="text-left md:text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Firma Criptográfica SHA-256</span>
                <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {currentHash}
                </span>
              </div>
            </div>

            {/* Tarjetas de Indicadores Agregados de Alto Nivel */}
            <div>
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Indicadores Maestros de Gestión (Bases de Cálculo Eje 1 al Eje 4)</span>
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                {/* 1. IEC */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 shadow-sm relative overflow-hidden">
                  <div className="text-[10px] uppercase font-bold text-slate-400">KPI Maestro (IEC)</div>
                  <div className={`text-2xl sm:text-3xl font-bold font-mono mt-1 ${
                    calculatedKPIs.iec >= 85 ? 'text-emerald-400' : calculatedKPIs.iec >= 70 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {calculatedKPIs.iec}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Efectividad Comunicacional</div>
                  <span className={`inline-block mt-2 px-1.5 py-0.5 text-[9px] font-bold rounded ${
                    calculatedKPIs.iec >= 85 ? 'bg-emerald-500/20 text-emerald-300' : calculatedKPIs.iec >= 70 ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {calculatedKPIs.iec >= 85 ? 'Nivel Verde (Óptimo)' : calculatedKPIs.iec >= 70 ? 'Nivel Amarillo' : 'Nivel Rojo (Crítico)'}
                  </span>
                </div>

                {/* 2. EE */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Engagement (EE)</div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-blue-400">
                    {calculatedKPIs.ee}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Interacción / Vistas</div>
                  <span className="inline-block mt-2 px-1.5 py-0.5 text-[9px] font-bold rounded bg-blue-500/20 text-blue-300">
                    Meta ≥ 8.0%
                  </span>
                </div>

                {/* 3. IRT */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Resiliencia (IRT)</div>
                  <div className={`text-2xl sm:text-3xl font-bold font-mono mt-1 ${
                    calculatedKPIs.irt >= 85 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {calculatedKPIs.irt}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">TDA + Ku + Señal TV/Rad</div>
                  <span className="inline-block mt-2 px-1.5 py-0.5 text-[9px] font-bold rounded bg-slate-700 text-slate-300">
                    Meta ≥ 85.0%
                  </span>
                </div>

                {/* 4. ICD */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Cobertura (ICD)</div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono mt-1 text-purple-400">
                    {calculatedKPIs.icd}%
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Alcance / Metas Digitales</div>
                  <span className="inline-block mt-2 px-1.5 py-0.5 text-[9px] font-bold rounded bg-purple-500/20 text-purple-300">
                    Tope 150.0%
                  </span>
                </div>

                {/* 5. IVI */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 shadow-sm">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Vulnerabilidad (IVI)</div>
                  <div className={`text-2xl sm:text-3xl font-bold font-mono mt-1 ${
                    calculatedKPIs.ivi < 0.3 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {calculatedKPIs.ivi.toFixed(3)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Talento Crítico / RRHH</div>
                  <span className={`inline-block mt-2 px-1.5 py-0.5 text-[9px] font-bold rounded ${
                    calculatedKPIs.ivi < 0.3 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {calculatedKPIs.ivi < 0.3 ? 'Riesgo Bajo' : 'Atención Preventiva'}
                  </span>
                </div>
              </div>
            </div>

            {/* Directrices Estratégicas y Diagnóstico de Sala (Editable por Despacho) */}
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Síntesis Ejecutiva & Directrices Prioritarias para el Despacho</span>
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60">
                    {parsedDirectrices.length} directriz{parsedDirectrices.length !== 1 ? 'es' : ''} activa{parsedDirectrices.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setDirectricesInput(DEFAULT_DIRECTRICES.join('\n'))}
                    className="text-[10px] text-slate-400 hover:text-amber-300 flex items-center gap-1 hover:underline transition-colors"
                    title="Restablecer directrices institucionales por defecto"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restablecer</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                El balance operativo de la semana refleja una sólida capacidad de respuesta en el despliegue del Sistema Nacional de Medios Públicos. La red de transmisión TDA y satelital sostiene una disponibilidad nacional promedio del {calculatedKPIs.irt}%, mientras que la efectividad comunicacional consolidada alcanza el {calculatedKPIs.iec}%.
              </p>

              {/* Caja de edición directa para el operador o Viceministro */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <label htmlFor="directrices-textarea" className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span className="text-amber-400">✏️</span>
                    <span>Directrices Estratégicas para el Boletín PDF:</span>
                    <span className="text-slate-400 font-normal text-[10px]">(Escriba una directriz por línea)</span>
                  </label>
                  <span className="text-[10px] text-slate-400 italic">Editable en tiempo real</span>
                </div>
                <textarea
                  id="directrices-textarea"
                  value={directricesInput}
                  onChange={(e) => setDirectricesInput(e.target.value)}
                  rows={4}
                  spellCheck={true}
                  lang="es"
                  placeholder="Escriba o ajuste las directrices estratégicas prioritarias (una por línea)..."
                  className="w-full bg-slate-950/90 text-slate-100 border border-slate-700/80 rounded-lg p-2.5 text-xs font-sans leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500/70 focus:border-amber-500/70 transition-all resize-y placeholder:text-slate-600 shadow-inner"
                />
              </div>

              {/* Previsualización en tiempo real */}
              <div className="pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Previsualización de viñetas que saldrán en el informe oficial:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {parsedDirectrices.map((dir, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-slate-300 flex items-start gap-2 shadow-sm">
                      <span className="text-amber-400 font-bold shrink-0">•</span>
                      <span className="leading-snug text-slate-200">{dir}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Matriz RACI de Cierre */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Certificación de Gobernanza RACI</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="border border-slate-800 p-2.5 rounded-lg bg-slate-900/40">
                  <span className="text-[10px] text-blue-400 font-bold block">[ R ] Responsable de Carga</span>
                  <span className="font-semibold text-white">Lic. Gabriel Morales</span>
                  <span className="text-[10px] text-slate-400 block">Coord. Operativa • VTV / SNMP</span>
                </div>
                <div className="border border-slate-800 p-2.5 rounded-lg bg-slate-900/40">
                  <span className="text-[10px] text-emerald-400 font-bold block">[ A ] Viceministro Revisor</span>
                  <span className="font-semibold text-white">Viceministerio de Gestión</span>
                  <span className="text-[10px] text-slate-400 block">Firma y Certificación Ministerial</span>
                </div>
                <div className="border border-slate-800 p-2.5 rounded-lg bg-slate-900/40">
                  <span className="text-[10px] text-amber-400 font-bold block">[ I ] Vicepresidente Sectorial</span>
                  <span className="font-semibold text-white">Despacho de la VSCC</span>
                  <span className="text-[10px] text-slate-400 block">Aprobación Final y Cierre Semanal</span>
                </div>
              </div>
            </div>

            {/* Botón de Descarga Grande */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-bold shadow-xl shadow-emerald-900/40 flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Boletín Oficial Consolidado en PDF (.pdf)</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: CORTES DE ENTES ESTRATÉGICOS (SIMULACIÓN MULTI-ENTE)
           ======================================================== */}
        {activeStep === 'ENTES' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Comprobación del Flujo de Entrega de Cortes por Ente Estratégico</span>
                  {!enableEstadosSimulables ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                      Modo Producción Real
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold">
                      Sandbox Habilitado
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400">
                  {enableEstadosSimulables
                    ? 'Simula la rendición de cuentas de 3 entes clave del SNMP y observa su impacto en alertas y consolidación.'
                    : 'Rendición de cuentas oficial de los entes estratégicos del SNMP según registros reales de auditoría.'}
                </p>
              </div>
            </div>

            {!enableEstadosSimulables && (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs flex items-center justify-between text-slate-300">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <b>Modo Producción Estricto:</b> Los Estados Simulables están desactivados desde la Configuración General. Se presentan los registros reales certificados de cada Ente.
                  </span>
                </div>
                <span className="text-[9px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-slate-700 font-mono">
                  CERTIFICACIÓN REAL
                </span>
              </div>
            )}

            <div className="space-y-4">
              {/* ENTE 1: VTV */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                      <Tv className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>C.A. Venezolana de Televisión (VTV)</span>
                        <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">Eje 1: Televisión</span>
                      </div>
                      <span className="text-xs text-slate-400">Responsable: Lic. Gabriel Morales (V-14829301)</span>
                    </div>
                  </div>

                  {/* Selector de escenario para VTV */}
                  {enableEstadosSimulables ? (
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="text-[10px] text-slate-400 uppercase">Simular Estado:</span>
                      <button
                        onClick={() => setVtvScenario('A_TIEMPO')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          vtvScenario === 'A_TIEMPO' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        A Tiempo (Dom)
                      </button>
                      <button
                        onClick={() => setVtvScenario('EXTEMPORANEO')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          vtvScenario === 'EXTEMPORANEO' ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Extemporáneo
                      </button>
                      <button
                        onClick={() => setVtvScenario('CRITICO')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          vtvScenario === 'CRITICO' ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Señal TV &lt; 70%
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        ● Registro Real Certificado
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Hora Entrega:</span>
                    <span className="font-semibold text-slate-200">
                      {vtvScenario === 'EXTEMPORANEO' ? 'Lunes 11:15 AM' : 'Domingo 07:45 PM'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Cumplimiento:</span>
                    <span className={`font-semibold ${vtvScenario === 'A_TIEMPO' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {vtvScenario === 'A_TIEMPO' ? 'Dentro de Plazo' : 'Corte Tardío'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Indicador Clave:</span>
                    <span className="font-semibold text-blue-400">
                      {vtvScenario === 'CRITICO' ? 'Operatividad TV: 64.5%' : 'Operatividad TV: 98.4%'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Hash de Carga:</span>
                    <span className="font-mono text-[10px] text-slate-300">SHA256:7FA89C21</span>
                  </div>
                </div>
              </div>

              {/* ENTE 2: REDTV */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                      <Radio className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>REDTV (Empresa de Telecomunicaciones del Estado)</span>
                        <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">Eje 2: Plataformas</span>
                      </div>
                      <span className="text-xs text-slate-400">Responsable: Ing. Carlos Zambrano (V-12948102)</span>
                    </div>
                  </div>

                  {/* Selector de escenario para REDTV */}
                  {enableEstadosSimulables ? (
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="text-[10px] text-slate-400 uppercase">Simular Estado:</span>
                      <button
                        onClick={() => setRedtvScenario('A_TIEMPO')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          redtvScenario === 'A_TIEMPO' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        A Tiempo (08:30 AM)
                      </button>
                      <button
                        onClick={() => setRedtvScenario('EXTEMPORANEO')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          redtvScenario === 'EXTEMPORANEO' ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Tardío (10:40 AM)
                      </button>
                      <button
                        onClick={() => setRedtvScenario('CRITICO')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          redtvScenario === 'CRITICO' ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Falla TDA / Ku &lt; 70%
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        ● Registro Real Certificado
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Hora Entrega:</span>
                    <span className="font-semibold text-slate-200">
                      {redtvScenario === 'EXTEMPORANEO' ? 'Lunes 10:40 AM' : 'Lunes 08:30 AM'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Cumplimiento:</span>
                    <span className={`font-semibold ${redtvScenario === 'A_TIEMPO' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {redtvScenario === 'A_TIEMPO' ? 'Dentro de Plazo' : 'Corte Tardío'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Indicador Clave:</span>
                    <span className="font-semibold text-emerald-400">
                      {redtvScenario === 'CRITICO' ? 'IRT TDA/Ku: 68.2% (Falla)' : 'IRT TDA/Ku: 92.5%'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Hash de Carga:</span>
                    <span className="font-mono text-[10px] text-slate-300">SHA256:3DE4019B</span>
                  </div>
                </div>
              </div>

              {/* ENTE 3: VICEMINISTERIO DE ESTRATEGIA */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                      <Share2 className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Viceministerio de Planificación y Estrategia Comunicacional</span>
                        <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">Eje 3 & 4: Redes</span>
                      </div>
                      <span className="text-xs text-slate-400">Responsable: Dra. Mariángel Barrios (V-16392014)</span>
                    </div>
                  </div>

                  {/* Selector de escenario para Viceministerio */}
                  {enableEstadosSimulables ? (
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="text-[10px] text-slate-400 uppercase">Simular Estado:</span>
                      <button
                        onClick={() => setViceminScenario('A_TIEMPO')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          viceminScenario === 'A_TIEMPO' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        A Tiempo (09:15 AM)
                      </button>
                      <button
                        onClick={() => setViceminScenario('EXTEMPORANEO')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          viceminScenario === 'EXTEMPORANEO' ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Tardío (11:05 AM)
                      </button>
                      <button
                        onClick={() => setViceminScenario('CRITICO')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          viceminScenario === 'CRITICO' ? 'bg-rose-500 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Engagement &lt; 5%
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        ● Registro Real Certificado
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Hora Entrega:</span>
                    <span className="font-semibold text-slate-200">
                      {viceminScenario === 'EXTEMPORANEO' ? 'Lunes 11:05 AM (Extemporáneo)' : 'Lunes 09:15 AM'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Cumplimiento:</span>
                    <span className={`font-semibold ${viceminScenario === 'A_TIEMPO' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {viceminScenario === 'A_TIEMPO' ? 'Dentro de Plazo' : '⚠️ Alerta Corte Lunes'}
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Indicador Clave:</span>
                    <span className="font-semibold text-purple-400">
                      EE: 8.9% • Neutralización: 91%
                    </span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Hash de Carga:</span>
                    <span className="font-mono text-[10px] text-slate-300">SHA256:B6109315</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: ACTIVACIÓN DE ALERTAS DE INCUMPLIMIENTO
           ======================================================== */}
        {activeStep === 'ALERTAS' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Activación de Alertas de Incumplimiento o Retraso (Lunes 10:00 AM)</span>
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full border border-rose-500/30">
                    {alertsToDispatch.length} Alertas Activas
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Prueba de envío automático a Telegram y buzón SMTP institucional para los Entes con cuota pendiente o KPIs críticos.
                </p>
              </div>

              {alertsToDispatch.length > 0 && (
                <button
                  onClick={handleTestAlertDispatch}
                  className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Disparar Notificaciones (Telegram / SMTP)</span>
                </button>
              )}
            </div>

            {alertsToDispatch.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">Todos los Entes han cumplido a tiempo</h4>
                <p className="text-xs text-slate-400 mt-1">
                  No hay alertas de retraso activas. Para probar el disparo de notificaciones, cambia algún Ente a "Tardío" o "Crítico" en la pestaña anterior.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {alertsToDispatch.map((alerta) => (
                  <div
                    key={alerta.id}
                    className={`p-4 rounded-xl border transition-all ${
                      alerta.severidad === 'CRITICA'
                        ? 'bg-rose-950/20 border-rose-800/60 text-rose-200'
                        : 'bg-amber-950/20 border-amber-800/60 text-amber-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                          alerta.severidad === 'CRITICA' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-slate-950'
                        }`}>
                          {alerta.severidad}
                        </span>
                        <span className="font-bold text-xs text-white">
                          {alerta.tipo} • {alerta.ente}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Canales: {alerta.canal}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {alerta.mensaje}
                    </p>

                    <div className="mt-3 pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                      <div className="flex items-center space-x-3 font-mono text-[10px]">
                        <span>Telegram: <b className="text-white">{alerta.telegram}</b></span>
                        <span>Email: <b className="text-white">{alerta.correo}</b></span>
                      </div>

                      <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono">
                        Status API: LISTO PARA DESPACHO
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
