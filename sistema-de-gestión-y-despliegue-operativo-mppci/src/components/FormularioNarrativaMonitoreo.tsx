import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FileText, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  BarChart3, 
  Save, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  UserCheck, 
  FileSpreadsheet, 
  Layers, 
  Hash, 
  Info, 
  Check, 
  Globe2, 
  Radio,
  Eye,
  Handshake,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { 
  FullWeeklyReport, 
  UserAccount, 
  RACIRole, 
  Eje3MonitoreoOpinionRow,
  Eje3DesgloseAlertaRow,
  Eje3ContenidoEscritoRow,
  Eje3VoceriasPortavocesRow,
  Eje3SentimientoPosicionamientoRow,
  Eje3VulnerabilidadTalentoRow,
  Eje3ArticulacionAlianzaRow,
  Eje3CooperacionInternacionalRow
} from '../types';
import { INITIAL_EJE3_DATA } from '../data/mockEje3Data';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';

interface FormularioNarrativaMonitoreoProps {
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onSuccessSave?: (message: string) => void;
}

export const FormularioNarrativaMonitoreo: React.FC<FormularioNarrativaMonitoreoProps> = ({
  report,
  onSaveReport,
  currentUser,
  currentRole = 'DIRECTOR_OPERACIONES',
  onSuccessSave
}) => {
  const initialData = report?.eje3Data?.narrativaMonitoreo || INITIAL_EJE3_DATA.narrativaMonitoreo;

  // Header Control Variables
  const [enteInformante, setEnteInformante] = useState(
    report?.control?.enteAdscrito || 'MIPPCI / Sala Situacional y Monitoreo de Medios'
  );
  const [responsableCarga, setResponsableCarga] = useState(
    report?.control?.responsableEnte || 'Dirección General de Monitoreo y Estrategia Comunicacional'
  );
  const [cedulaIdentidad, setCedulaIdentidad] = useState(
    report?.control?.cedulaIdentidad || 'V-15882341'
  );
  const [regionLocalidad, setRegionLocalidad] = useState(
    report?.control?.regionLocalidad || 'Caracas, Distrito Capital - Sede Principal MPPCI'
  );
  const [telefonoContacto, setTelefonoContacto] = useState(
    report?.control?.telefono || '+58 212 5053100'
  );
  const [correoElectronico, setCorreoElectronico] = useState(
    report?.control?.correo || 'vpscc.informacion.indicadores@gmail.com'
  );
  const [semanaReporte, setSemanaReporte] = useState(
    report?.control?.semanaEpidemiologica || 35
  );
  const [fechaCorte, setFechaCorte] = useState(
    report?.control?.fechaReporte || '2026-09-01'
  );

  // Sub-sections Tab Navigation
  const [activeSubSection, setActiveSubSection] = useState<
    'MONITOREO_MATRICES' | 'CONTENIDO_ESCRITO' | 'VOCERIAS_PORTAVOCES' | 'SENTIMIENTO' | 'TALENTO_IVI' | 'RELACIONES_ALIANZAS' | 'COOPERACION'
  >('MONITOREO_MATRICES');

  // Form State Tables
  const [monitoreoMedios, setMonitoreoMedios] = useState<Eje3MonitoreoOpinionRow[]>(
    initialData.monitoreoMedios
  );
  const [desgloseAlertas, setDesgloseAlertas] = useState<Eje3DesgloseAlertaRow[]>(
    initialData.desgloseAlertas
  );
  const [contenidoEscrito, setContenidoEscrito] = useState<Eje3ContenidoEscritoRow[]>(
    initialData.contenidoEscrito
  );
  const [voceriasPortavoces, setVoceriasPortavoces] = useState<Eje3VoceriasPortavocesRow[]>(
    initialData.voceriasPortavoces
  );
  const [sentimientoPosicionamiento, setSentimientoPosicionamiento] = useState<Eje3SentimientoPosicionamientoRow[]>(
    initialData.sentimientoPosicionamiento
  );
  const [vulnerabilidadTalento, setVulnerabilidadTalento] = useState<Eje3VulnerabilidadTalentoRow[]>(
    initialData.vulnerabilidadTalento
  );
  const [articulacionAlianzas, setArticulacionAlianzas] = useState<Eje3ArticulacionAlianzaRow[]>(
    initialData.articulacionAlianzas
  );
  const [cooperacionInternacional, setCooperacionInternacional] = useState<Eje3CooperacionInternacionalRow[]>(
    initialData.cooperacionInternacional
  );

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState('');

  // Handlers for state modifications
  const handleMonitoreoChange = (index: number, field: keyof Eje3MonitoreoOpinionRow, val: any) => {
    const updated = [...monitoreoMedios];
    updated[index] = { ...updated[index], [field]: val };
    setMonitoreoMedios(updated);
  };

  const handleDesgloseAlertasChange = (index: number, field: keyof Eje3DesgloseAlertaRow, val: any) => {
    const updated = [...desgloseAlertas];
    updated[index] = { ...updated[index], [field]: val };
    
    // Recalculate percentages dynamically if numAlertas changed
    if (field === 'numAlertas') {
      const totalAlertas = updated.reduce((sum, item) => sum + (Number(item.numAlertas) || 0), 0) || 1;
      updated.forEach(item => {
        item.porcentajeTotal = Number((((Number(item.numAlertas) || 0) / totalAlertas) * 100).toFixed(1));
      });
    }
    setDesgloseAlertas(updated);
  };

  const handleContenidoEscritoChange = (index: number, field: keyof Eje3ContenidoEscritoRow, val: any) => {
    const updated = [...contenidoEscrito];
    updated[index] = { ...updated[index], [field]: val };
    setContenidoEscrito(updated);
  };

  const handleVoceriasChange = (index: number, field: keyof Eje3VoceriasPortavocesRow, val: any) => {
    const updated = [...voceriasPortavoces];
    updated[index] = { ...updated[index], [field]: val };
    setVoceriasPortavoces(updated);
  };

  const handleSentimientoChange = (index: number, field: keyof Eje3SentimientoPosicionamientoRow, val: any) => {
    const updated = [...sentimientoPosicionamiento];
    updated[index] = { ...updated[index], [field]: val };
    setSentimientoPosicionamiento(updated);
  };

  const handleVulnerabilidadChange = (index: number, field: keyof Eje3VulnerabilidadTalentoRow, val: any) => {
    const updated = [...vulnerabilidadTalento];
    const row = { ...updated[index], [field]: Number(val) || 0 };
    // Auto calculate porEvaluar and validate
    const evaluados = (row.nivelRojo || 0) + (row.nivelAmarillo || 0) + (row.nivelVerde || 0) + (row.sinClasificar || 0);
    row.porEvaluar = Math.max(0, row.totalPersonal - evaluados);
    updated[index] = row;
    setVulnerabilidadTalento(updated);
  };

  const handleArticulacionChange = (index: number, field: keyof Eje3ArticulacionAlianzaRow, val: any) => {
    const updated = [...articulacionAlianzas];
    updated[index] = { ...updated[index], [field]: val };
    setArticulacionAlianzas(updated);
  };

  const handleCooperacionChange = (index: number, field: keyof Eje3CooperacionInternacionalRow, val: any) => {
    const updated = [...cooperacionInternacional];
    const row = { ...updated[index], [field]: val };
    if (field === 'montoComprometidoUsd' || field === 'montoEjecutadoUsd') {
      const comp = Number(row.montoComprometidoUsd) || 0;
      const ejec = Number(row.montoEjecutadoUsd) || 0;
      row.porcEjecucion = comp > 0 ? Number(((ejec / comp) * 100).toFixed(1)) : 0;
    }
    updated[index] = row;
    setCooperacionInternacional(updated);
  };

  // Aggregates & KPIs
  const totalAlertasIdentificadas = desgloseAlertas.reduce((acc, r) => acc + (Number(r.numAlertas) || 0), 0);
  const totalContenidoEscrito = contenidoEscrito.reduce((acc, r) => acc + (Number(r.valor) || 0), 0);
  const totalVocerias = voceriasPortavoces.reduce((acc, r) => acc + (Number(r.valor) || 0), 0);

  // Total Talent Vulnerability & IVI Calculation
  const totalTalento = vulnerabilidadTalento.reduce((acc, r) => acc + (Number(r.totalPersonal) || 0), 0) || 1;
  const totalRojo = vulnerabilidadTalento.reduce((acc, r) => acc + (Number(r.nivelRojo) || 0), 0);
  const totalAmarillo = vulnerabilidadTalento.reduce((acc, r) => acc + (Number(r.nivelAmarillo) || 0), 0);
  const totalVerde = vulnerabilidadTalento.reduce((acc, r) => acc + (Number(r.nivelVerde) || 0), 0);
  const totalPorEvaluar = vulnerabilidadTalento.reduce((acc, r) => acc + (Number(r.porEvaluar) || 0), 0);
  const totalSinClasificar = vulnerabilidadTalento.reduce((acc, r) => acc + (Number(r.sinClasificar) || 0), 0);

  // Official formula: IVI = (N° Rojo * 3 + N° Amarillo * 1 + N° Verde * 0) / (Total Personal * 3) * 100 or divided by Total Personal
  // From Annex 2: IVI = (N° Rojo × 3 + N° Amarillo × 1 + N° Verde × 0) / Total Personal
  const rawIvi = Number(((totalRojo * 3 + totalAmarillo * 1) / totalTalento).toFixed(3));
  const iviPercentage = Number((( (totalRojo * 3 + totalAmarillo * 1) / (totalTalento * 3) ) * 100).toFixed(1));

  // Cooperacion sums
  const totalComprometido = cooperacionInternacional.reduce((acc, r) => acc + (Number(r.montoComprometidoUsd) || 0), 0);
  const totalEjecutado = cooperacionInternacional.reduce((acc, r) => acc + (Number(r.montoEjecutadoUsd) || 0), 0);
  const porcEjecucionGlobal = totalComprometido > 0 ? Number(((totalEjecutado / totalComprometido) * 100).toFixed(1)) : 0;

  // Save report handler
  const handleGuardarFormulario = () => {
    if (!report || !onSaveReport) {
      setSaveFeedback('Formulario validado y guardado en memoria de sesión.');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
      return;
    }

    const updatedEje3 = {
      narrativaMonitoreo: {
        monitoreoMedios,
        desgloseAlertas,
        contenidoEscrito,
        voceriasPortavoces,
        sentimientoPosicionamiento,
        vulnerabilidadTalento,
        articulacionAlianzas,
        cooperacionInternacional
      }
    };

    // Also sync the vulnerabilityRows to the root report for system-wide consistency
    const updatedVulnerabilityRows = vulnerabilidadTalento.map(v => ({
      ente: v.ente,
      totalPersonal: v.totalPersonal,
      nivelRojo: v.nivelRojo,
      nivelAmarillo: v.nivelAmarillo,
      nivelVerde: v.nivelVerde,
      porEvaluar: v.porEvaluar
    }));

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
      eje3Data: updatedEje3,
      vulnerabilityRows: updatedVulnerabilityRows,
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
    setSaveFeedback('Datos de EJE 3: Gestión de Narrativa y Monitoreo guardados exitosamente con trazabilidad criptográfica.');
    setSaveSuccess(true);
    if (onSuccessSave) {
      onSuccessSave('Eje 3 guardado exitosamente.');
    }
    setTimeout(() => setSaveSuccess(false), 5000);
  };

  // Export to CSV
  const handleExportarCSV = () => {
    let csv = 'INSTRUMENTO DE CAPTURA DE DATOS - GESTION Y DESPLIEGUE OPERATIVO COMUNICACIONAL (MPPCI)\n';
    csv += 'EJE 3: GESTION DE COMUNICACIONES - 3.A GESTION DE NARRATIVA Y MONITOREO DE MEDIOS\n\n';
    csv += `Ente Informante,${enteInformante}\nResponsable,${responsableCarga}\nCedula,${cedulaIdentidad}\nSemana,${semanaReporte}\nFecha,${fechaCorte}\n\n`;

    csv += '1. MONITOREO DE MEDIOS Y MATRICES DE OPINION\n';
    csv += 'Indicador,Codigo,Valor,Observaciones\n';
    monitoreoMedios.forEach(r => {
      csv += `"${r.indicador}",${r.codigo},${r.valor},"${r.observaciones}"\n`;
    });

    csv += '\n2. DESGLOSE DE ALERTAS POR TEMATICA\n';
    csv += 'Tematica,N de Alertas,% del Total,Acciones de Contrarrestacion\n';
    desgloseAlertas.forEach(r => {
      csv += `"${r.tematica}",${r.numAlertas},${r.porcentajeTotal}%,"${r.accionesContrarrestacion}"\n`;
    });

    csv += '\n3. PRODUCCION DE CONTENIDO ESCRITO\n';
    csv += 'Indicador,Codigo,Valor,Observaciones\n';
    contenidoEscrito.forEach(r => {
      csv += `"${r.indicador}",${r.codigo},${r.valor},"${r.observaciones}"\n`;
    });

    csv += '\n4. GESTION DE VOCERIAS Y PORTAVOCES\n';
    csv += 'Indicador,Codigo,Valor,Observaciones\n';
    voceriasPortavoces.forEach(r => {
      csv += `"${r.indicador}",${r.codigo},${r.valor},"${r.observaciones}"\n`;
    });

    csv += '\n5. ANALISIS DE SENTIMIENTO Y POSICIONAMIENTO\n';
    csv += 'Indicador,Codigo,Valor,Var % vs Semana Anterior\n';
    sentimientoPosicionamiento.forEach(r => {
      csv += `"${r.indicador}",${r.codigo},${r.valor},${r.varSemanaAnteriorPorc}%\n`;
    });

    csv += '\n6. MATRIZ DE VULNERABILIDAD DEL TALENTO HUMANO\n';
    csv += 'Ente / Dependencia,Total de Personal,Nivel Rojo,Nivel Amarillo,Nivel Verde,Por Evaluar,Sin Clasificar\n';
    vulnerabilidadTalento.forEach(r => {
      csv += `"${r.ente}",${r.totalPersonal},${r.nivelRojo},${r.nivelAmarillo},${r.nivelVerde},${r.porEvaluar},${r.sinClasificar}\n`;
    });

    csv += '\n7. ARTICULACION INTERINSTITUCIONAL\n';
    csv += 'Institucion,Tipo de Alianza,N de Acciones Conjuntas,Resultados,Observaciones\n';
    articulacionAlianzas.forEach(r => {
      csv += `"${r.institucion}","${r.tipoAlianza}",${r.numAccionesConjuntas},"${r.resultados}","${r.observaciones}"\n`;
    });

    csv += '\n8. GESTION DE COOPERACION INTERNACIONAL\n';
    csv += 'Donante / Organismo,Monto Comprometido (USD),Monto Ejecutado (USD),% Ejecucion,Sector\n';
    cooperacionInternacional.forEach(r => {
      csv += `"${r.donanteOrganismo}",${r.montoComprometidoUsd},${r.montoEjecutadoUsd},${r.porcEjecucion}%,"${r.sector}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `EJE3_GESTION_COMUNICACIONES_S${semanaReporte}_${fechaCorte}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset to default
  const handleRestablecer = () => {
    if (window.confirm('¿Desea restablecer todos los campos del EJE 3 a sus valores base oficiales?')) {
      setMonitoreoMedios(INITIAL_EJE3_DATA.narrativaMonitoreo.monitoreoMedios);
      setDesgloseAlertas(INITIAL_EJE3_DATA.narrativaMonitoreo.desgloseAlertas);
      setContenidoEscrito(INITIAL_EJE3_DATA.narrativaMonitoreo.contenidoEscrito);
      setVoceriasPortavoces(INITIAL_EJE3_DATA.narrativaMonitoreo.voceriasPortavoces);
      setSentimientoPosicionamiento(INITIAL_EJE3_DATA.narrativaMonitoreo.sentimientoPosicionamiento);
      setVulnerabilidadTalento(INITIAL_EJE3_DATA.narrativaMonitoreo.vulnerabilidadTalento);
      setArticulacionAlianzas(INITIAL_EJE3_DATA.narrativaMonitoreo.articulacionAlianzas);
      setCooperacionInternacional(INITIAL_EJE3_DATA.narrativaMonitoreo.cooperacionInternacional);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Official Form Header */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl border border-purple-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ShieldAlert className="w-64 h-64 text-purple-300" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                INSTRUMENTO OFICIAL MPPCI • EJE 3
              </span>
              <span className="text-xs bg-slate-800/80 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
                3.A GESTIÓN DE NARRATIVA Y MONITOREO DE MEDIOS
              </span>
              <span className="text-xs text-slate-300">Corte Semanal: Domingo a Sábado</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold font-['Space_Grotesk'] text-white tracking-tight">
              EJE 3: GESTIÓN DE COMUNICACIONES
            </h1>
            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
              Monitoreo de medios, matrices de opinión y desinformación (MON-001 al MON-008), 
              producción de contenido escrito y vocerías (GES-001 al GES-018), 
              Matriz de Vulnerabilidad del Talento Humano (IVI), articulación de alianzas y cooperación internacional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 min-w-[200px]">
            <button
              onClick={handleGuardarFormulario}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all cursor-pointer text-xs"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Reporte Eje 3</span>
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleExportarCSV}
                className="flex-1 flex items-center justify-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-3 rounded-lg border border-slate-700 transition-all cursor-pointer text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar CSV</span>
              </button>
              <button
                onClick={handleRestablecer}
                title="Restablecer a valores base"
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg border border-slate-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Feedback notification */}
        {saveSuccess && (
          <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveFeedback}</span>
          </div>
        )}

        {/* Variable de Control | Información de Registro */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Ente / Sala Responsable</span>
            <input
              type="text"
              value={enteInformante}
              onChange={(e) => setEnteInformante(e.target.value)}
              className="mt-1 w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 font-medium focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Responsable de Carga</span>
            <input
              type="text"
              value={responsableCarga}
              onChange={(e) => setResponsableCarga(e.target.value)}
              className="mt-1 w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 font-medium focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Cédula de Identidad</span>
            <input
              type="text"
              value={cedulaIdentidad}
              onChange={(e) => setCedulaIdentidad(e.target.value)}
              className="mt-1 w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 font-medium focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Semana / Fecha de Corte</span>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="number"
                value={semanaReporte}
                onChange={(e) => setSemanaReporte(parseInt(e.target.value) || 1)}
                className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-amber-300 font-mono font-bold text-center"
              />
              <input
                type="date"
                value={fechaCorte}
                onChange={(e) => setFechaCorte(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>Alertas MON</span>
            <span className="font-mono text-purple-600 font-bold">MON-001</span>
          </div>
          <div className="text-xl font-bold text-purple-700 font-mono">{totalAlertasIdentificadas}</div>
          <div className="text-[10px] text-slate-400 truncate">Total detectadas</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>Contenido Escrito</span>
            <span className="font-mono text-blue-600 font-bold">GES-001..008</span>
          </div>
          <div className="text-xl font-bold text-blue-700 font-mono">{totalContenidoEscrito.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 truncate">Notas, artículos y posts</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>Vocerías & Prensa</span>
            <span className="font-mono text-indigo-600 font-bold">GES-009..013</span>
          </div>
          <div className="text-xl font-bold text-indigo-700 font-mono">{totalVocerias}</div>
          <div className="text-[10px] text-slate-400 truncate">Actividades de vocería</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>Sentimiento Positivo</span>
            <span className="font-mono text-emerald-600 font-bold">GES-014</span>
          </div>
          <div className="text-xl font-bold text-emerald-700 font-mono">
            {sentimientoPosicionamiento.find(s => s.codigo === 'GES-014')?.valor || 0}%
          </div>
          <div className="text-[10px] text-emerald-600">Balance favorable</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>Índice IVI</span>
            <span className="font-mono text-rose-600 font-bold">Anexo 2</span>
          </div>
          <div className="text-xl font-bold text-rose-700 font-mono">{rawIvi}</div>
          <div className="text-[10px] text-slate-400 truncate">{iviPercentage}% Ponderado</div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>Cooperación Int.</span>
            <span className="font-mono text-amber-600 font-bold">% Ejecución</span>
          </div>
          <div className="text-xl font-bold text-amber-700 font-mono">{porcEjecucionGlobal}%</div>
          <div className="text-[10px] text-slate-400 truncate">${(totalEjecutado / 1000000).toFixed(2)}M Ejecutados</div>
        </div>
      </div>

      {/* Sub-sections Tab Buttons */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-200/70 rounded-xl border border-slate-300">
        {[
          { id: 'MONITOREO_MATRICES', label: '1. Monitoreo & Desglose Alertas', icon: ShieldAlert, badge: 'MON-001 al 008' },
          { id: 'CONTENIDO_ESCRITO', label: '2. Contenido Escrito', icon: FileText, badge: 'GES-001 al 008' },
          { id: 'VOCERIAS_PORTAVOCES', label: '3. Vocerías & Portavoces', icon: MessageSquare, badge: 'GES-009 al 013' },
          { id: 'SENTIMIENTO', label: '4. Sentimiento & Posicionamiento', icon: TrendingUp, badge: 'GES-014 al 018' },
          { id: 'TALENTO_IVI', label: '5. Matriz de Vulnerabilidad (IVI)', icon: Users, badge: '12 Entes' },
          { id: 'RELACIONES_ALIANZAS', label: '6. Articulación Interinstitucional', icon: Handshake, badge: 'Alianzas' },
          { id: 'COOPERACION', label: '7. Cooperación Internacional', icon: DollarSign, badge: 'Fondos USD' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubSection(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-purple-900 shadow-sm border border-slate-300 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-600' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                isActive ? 'bg-purple-100 text-purple-800' : 'bg-slate-200 text-slate-600'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: MONITOREO DE MEDIOS & MATRICES DE OPINIÓN      */}
      {/* ========================================================= */}
      {activeSubSection === 'MONITOREO_MATRICES' && (
        <div className="space-y-6">
          {/* Table 1.A: Monitoreo de Medios y Matrices de Opinión */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                    3.A.1 MONITOREO DE MEDIOS Y MATRICES DE OPINIÓN
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Códigos MON-001 al MON-008</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  Alertas, Reportes de Primeras Planas y Contranarrativas
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Orden estandarizado: Indicador primero, Código después</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Indicador</th>
                    <th className="p-3 w-28">Código</th>
                    <th className="p-3 w-36">Valor</th>
                    <th className="p-3">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {monitoreoMedios.map((row, idx) => (
                    <tr key={row.codigo} className="hover:bg-purple-50/30 transition-colors">
                      <td className="p-3 font-sans font-medium text-slate-800">
                        {row.indicador}
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {row.codigo}
                        </span>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          step={row.codigo === 'MON-008' ? '0.1' : '1'}
                          value={row.valor}
                          onChange={(e) => handleMonitoreoChange(idx, 'valor', parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 font-bold focus:bg-white focus:ring-1 focus:ring-purple-500"
                        />
                      </td>
                      <td className="p-3 font-sans">
                        <input
                          type="text"
                          value={row.observaciones}
                          onChange={(e) => handleMonitoreoChange(idx, 'observaciones', e.target.value)}
                          className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-purple-500 focus:bg-white px-2 py-1 text-xs text-slate-700"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 1.B: Desglose de Alertas por Temática */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  3.A.2 DESGLOSE DE ALERTAS POR TEMÁTICA
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  Tipología de Desinformación y Acciones de Contrarrestación
                </h3>
              </div>
              <div className="text-xs font-mono text-slate-500">
                Total Alertas Registradas: <span className="font-bold text-purple-700">{totalAlertasIdentificadas}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Temática</th>
                    <th className="p-3 w-32">N° de Alertas</th>
                    <th className="p-3 w-32">% del Total</th>
                    <th className="p-3">Acciones de Contrarrestación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {desgloseAlertas.map((row, idx) => (
                    <tr key={row.tematica} className="hover:bg-amber-50/30 transition-colors">
                      <td className="p-3 font-sans font-bold text-slate-800">
                        {row.tematica}
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.numAlertas}
                          onChange={(e) => handleDesgloseAlertasChange(idx, 'numAlertas', parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 font-bold focus:bg-white focus:ring-1 focus:ring-amber-500"
                        />
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {row.porcentajeTotal}%
                        </span>
                      </td>
                      <td className="p-3 font-sans">
                        <input
                          type="text"
                          value={row.accionesContrarrestacion}
                          onChange={(e) => handleDesgloseAlertasChange(idx, 'accionesContrarrestacion', e.target.value)}
                          className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-500 focus:bg-white px-2 py-1 text-xs text-slate-700"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: PRODUCCIÓN DE CONTENIDO ESCRITO (GES-001..008)  */}
      {/* ========================================================= */}
      {activeSubSection === 'CONTENIDO_ESCRITO' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  3.A.3 PRODUCCIÓN DE CONTENIDO ESCRITO
                </span>
                <span className="text-xs text-slate-500 font-medium">Códigos GES-001 al GES-008</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Notas de Prensa, Artículos Web, Microblogging, Boletines y Comunicados
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Total Producción Escrita: <span className="font-bold text-blue-700">{totalContenidoEscrito.toLocaleString()} piezas</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Indicador</th>
                  <th className="p-3 w-28">Código</th>
                  <th className="p-3 w-36">Valor</th>
                  <th className="p-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {contenidoEscrito.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 font-sans font-medium text-slate-800">
                      {row.indicador}
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {row.codigo}
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.valor}
                        onChange={(e) => handleContenidoEscritoChange(idx, 'valor', parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 font-bold focus:bg-white focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3 font-sans">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={(e) => handleContenidoEscritoChange(idx, 'observaciones', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white px-2 py-1 text-xs text-slate-700"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 3: GESTIÓN DE VOCERÍAS Y PORTAVOCES (GES-009..013) */}
      {/* ========================================================= */}
      {activeSubSection === 'VOCERIAS_PORTAVOCES' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                  3.A.4 GESTIÓN DE VOCERÍAS Y PORTAVOCES
                </span>
                <span className="text-xs text-slate-500 font-medium">Códigos GES-009 al GES-013</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Vocerías Coordinadas, Ruedas de Prensa, Entrevistas y Capacitaciones
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Total Acciones de Vocería: <span className="font-bold text-indigo-700">{totalVocerias}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Indicador</th>
                  <th className="p-3 w-28">Código</th>
                  <th className="p-3 w-36">Valor</th>
                  <th className="p-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {voceriasPortavoces.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-3 font-sans font-medium text-slate-800">
                      {row.indicador}
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {row.codigo}
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.valor}
                        onChange={(e) => handleVoceriasChange(idx, 'valor', parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 font-bold focus:bg-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="p-3 font-sans">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={(e) => handleVoceriasChange(idx, 'observaciones', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:bg-white px-2 py-1 text-xs text-slate-700"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 4: ANÁLISIS DE SENTIMIENTO Y POSICIONAMIENTO      */}
      {/* ========================================================= */}
      {activeSubSection === 'SENTIMIENTO' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  3.A.5 ANÁLISIS DE SENTIMIENTO Y POSICIONAMIENTO
                </span>
                <span className="text-xs text-slate-500 font-medium">Códigos GES-014 al GES-018</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Sentimiento en Medios (Positivo, Neutro, Negativo), Agenda Institucional y Menciones Internacionales
              </h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Indicador</th>
                  <th className="p-3 w-28">Código</th>
                  <th className="p-3 w-40">Valor</th>
                  <th className="p-3 w-48">Var % vs Semana Anterior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {sentimientoPosicionamiento.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3 font-sans font-medium text-slate-800">
                      {row.indicador}
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {row.codigo}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1.5">
                        <input
                          type="number"
                          step={row.codigo === 'GES-018' ? '1' : '0.1'}
                          value={row.valor}
                          onChange={(e) => handleSentimientoChange(idx, 'valor', parseFloat(e.target.value) || 0)}
                          className="w-28 bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 font-bold focus:bg-white focus:ring-1 focus:ring-emerald-500"
                        />
                        <span className="text-slate-500 font-sans">{row.codigo === 'GES-018' ? 'menciones' : '%'}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1.5">
                        <input
                          type="number"
                          step="0.1"
                          value={row.varSemanaAnteriorPorc}
                          onChange={(e) => handleSentimientoChange(idx, 'varSemanaAnteriorPorc', parseFloat(e.target.value) || 0)}
                          className={`w-24 border rounded px-2 py-1 font-bold ${
                            row.varSemanaAnteriorPorc >= 0
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                              : 'bg-rose-50 border-rose-300 text-rose-700'
                          }`}
                        />
                        <span className="text-slate-500 font-sans">%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 5: MATRIZ DE VULNERABILIDAD DEL TALENTO HUMANO (IVI) */}
      {/* ========================================================= */}
      {activeSubSection === 'TALENTO_IVI' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                  3.A.6 MATRIZ DE VULNERABILIDAD DEL TALENTO HUMANO
                </span>
                <span className="text-xs text-slate-500 font-medium">Anexo 2 • Cálculo del IVI</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Semáforo de Riesgo por Ente / Dependencia Adscrita
              </h3>
            </div>
            <div className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Fórmula Oficial: <span className="font-bold text-purple-700">IVI = (Rojo×3 + Amarillo×1) / Total Personal</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Ente / Dependencia</th>
                  <th className="p-3 w-28">Total de Personal</th>
                  <th className="p-3 w-28 text-rose-700">Nivel Rojo (x3)</th>
                  <th className="p-3 w-28 text-amber-700">Nivel Amarillo (x1)</th>
                  <th className="p-3 w-28 text-emerald-700">Nivel Verde (x0)</th>
                  <th className="p-3 w-24 text-slate-500">Por Evaluar</th>
                  <th className="p-3 w-24 text-slate-500">Sin Clasificar</th>
                  <th className="p-3 w-28 text-purple-700">IVI Ente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {vulnerabilidadTalento.map((row, idx) => {
                  const enteIvi = ((row.nivelRojo * 3 + row.nivelAmarillo * 1) / (row.totalPersonal || 1)).toFixed(3);
                  return (
                    <tr key={row.ente} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-sans font-bold text-slate-800">
                        {row.ente}
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.totalPersonal}
                          onChange={(e) => handleVulnerabilidadChange(idx, 'totalPersonal', e.target.value)}
                          className="w-20 bg-slate-50 border border-slate-300 rounded px-2 py-1 font-bold text-slate-900"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.nivelRojo}
                          onChange={(e) => handleVulnerabilidadChange(idx, 'nivelRojo', e.target.value)}
                          className="w-20 bg-rose-50 border border-rose-300 rounded px-2 py-1 font-bold text-rose-700"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.nivelAmarillo}
                          onChange={(e) => handleVulnerabilidadChange(idx, 'nivelAmarillo', e.target.value)}
                          className="w-20 bg-amber-50 border border-amber-300 rounded px-2 py-1 font-bold text-amber-700"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.nivelVerde}
                          onChange={(e) => handleVulnerabilidadChange(idx, 'nivelVerde', e.target.value)}
                          className="w-20 bg-emerald-50 border border-emerald-300 rounded px-2 py-1 font-bold text-emerald-700"
                        />
                      </td>
                      <td className="p-3 text-slate-500 font-bold">
                        {row.porEvaluar}
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.sinClasificar}
                          onChange={(e) => handleVulnerabilidadChange(idx, 'sinClasificar', e.target.value)}
                          className="w-16 bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-600"
                        />
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {enteIvi}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300 font-mono">
                <tr>
                  <td className="p-3 font-sans font-extrabold uppercase">TOTAL CONSOLIDADO</td>
                  <td className="p-3 text-slate-900">{totalTalento}</td>
                  <td className="p-3 text-rose-700">{totalRojo}</td>
                  <td className="p-3 text-amber-700">{totalAmarillo}</td>
                  <td className="p-3 text-emerald-700">{totalVerde}</td>
                  <td className="p-3 text-slate-600">{totalPorEvaluar}</td>
                  <td className="p-3 text-slate-600">{totalSinClasificar}</td>
                  <td className="p-3 text-purple-800 font-extrabold">{rawIvi}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 6: ARTICULACIÓN INTERINSTITUCIONAL               */}
      {/* ========================================================= */}
      {activeSubSection === 'RELACIONES_ALIANZAS' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded">
                3.A.7 GESTIÓN DE RELACIONES INSTITUCIONALES Y ALIANZAS
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Articulación Interinstitucional (Agencias ONU, Gobiernos Regionales, Alcaldías y Comunidad)
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Total Acciones Conjuntas: <span className="font-bold text-cyan-700">
                {articulacionAlianzas.reduce((sum, r) => sum + (Number(r.numAccionesConjuntas) || 0), 0)}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-40">Institución</th>
                  <th className="p-3 w-32">Tipo de Alianza</th>
                  <th className="p-3 w-36">N° de Acciones Conjuntas</th>
                  <th className="p-3">Resultados</th>
                  <th className="p-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {articulacionAlianzas.map((row, idx) => (
                  <tr key={row.institucion} className="hover:bg-cyan-50/30 transition-colors">
                    <td className="p-3 font-sans font-bold text-slate-800">
                      {row.institucion}
                    </td>
                    <td className="p-3 font-sans">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {row.tipoAlianza}
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.numAccionesConjuntas}
                        onChange={(e) => handleArticulacionChange(idx, 'numAccionesConjuntas', parseInt(e.target.value) || 0)}
                        className="w-24 bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 font-bold focus:bg-white focus:ring-1 focus:ring-cyan-500"
                      />
                    </td>
                    <td className="p-3 font-sans">
                      <input
                        type="text"
                        value={row.resultados}
                        onChange={(e) => handleArticulacionChange(idx, 'resultados', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-cyan-500 focus:bg-white px-2 py-1 text-xs text-slate-700"
                      />
                    </td>
                    <td className="p-3 font-sans">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={(e) => handleArticulacionChange(idx, 'observaciones', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-cyan-500 focus:bg-white px-2 py-1 text-xs text-slate-700"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 7: GESTIÓN DE COOPERACIÓN INTERNACIONAL           */}
      {/* ========================================================= */}
      {activeSubSection === 'COOPERACION' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                3.A.8 GESTIÓN DE COOPERACIÓN INTERNACIONAL
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">
                Fondos Multilaterales y Bilaterales Comprometidos vs Ejecutados (USD)
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Ejecución Promedio: <span className="font-bold text-amber-700">{porcEjecucionGlobal}%</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-44">Donante / Organismo</th>
                  <th className="p-3 w-40">Monto Comprometido (USD)</th>
                  <th className="p-3 w-40">Monto Ejecutado (USD)</th>
                  <th className="p-3 w-32">% Ejecución</th>
                  <th className="p-3">Sector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {cooperacionInternacional.map((row, idx) => (
                  <tr key={row.donanteOrganismo} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-sans font-bold text-slate-800">
                      {row.donanteOrganismo}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <span className="text-slate-400">$</span>
                        <input
                          type="number"
                          value={row.montoComprometidoUsd}
                          onChange={(e) => handleCooperacionChange(idx, 'montoComprometidoUsd', parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 font-bold focus:bg-white focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <span className="text-slate-400">$</span>
                        <input
                          type="number"
                          value={row.montoEjecutadoUsd}
                          onChange={(e) => handleCooperacionChange(idx, 'montoEjecutadoUsd', parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 font-bold focus:bg-white focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`font-bold px-2 py-0.5 rounded border ${
                        row.porcEjecucion >= 75
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : row.porcEjecucion >= 50
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {row.porcEjecucion}%
                      </span>
                    </td>
                    <td className="p-3 font-sans">
                      <input
                        type="text"
                        value={row.sector}
                        onChange={(e) => handleCooperacionChange(idx, 'sector', e.target.value)}
                        className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-amber-500 focus:bg-white px-2 py-1 text-xs text-slate-700"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300 font-mono">
                <tr>
                  <td className="p-3 font-sans font-extrabold uppercase">TOTAL CONSOLIDADO</td>
                  <td className="p-3 text-slate-900">${totalComprometido.toLocaleString()}</td>
                  <td className="p-3 text-slate-900">${totalEjecutado.toLocaleString()}</td>
                  <td className="p-3 text-amber-800 font-extrabold">{porcEjecucionGlobal}%</td>
                  <td className="p-3 font-sans text-xs text-slate-500">Gestión Integral de Cooperación MPPCI</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
