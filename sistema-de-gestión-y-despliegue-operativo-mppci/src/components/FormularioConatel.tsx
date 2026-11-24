import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Gauge, 
  FileCheck, 
  AlertOctagon, 
  Scale, 
  Save, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Sparkles, 
  Building2, 
  Calendar, 
  UserCheck, 
  FileSpreadsheet, 
  Layers, 
  Hash, 
  FileText, 
  HelpCircle, 
  Clock, 
  ShieldAlert,
  Search,
  Radio
} from 'lucide-react';
import { 
  FullWeeklyReport, 
  PlatformsTechnicalData, 
  UserAccount, 
  RACIRole, 
  ConatelMonitoreoRow, 
  ConatelEspectroRow, 
  ConatelResorteRow, 
  ConatelTramiteSigestelRow, 
  ConatelIncidenteRow, 
  ConatelPoliticaPublicaRow 
} from '../types';
import { INITIAL_EJE2_DATA } from '../data/mockEje2Data';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';

interface FormularioConatelProps {
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onSuccessSave?: (message: string) => void;
}

export const FormularioConatel: React.FC<FormularioConatelProps> = ({
  report,
  onSaveReport,
  currentUser,
  currentRole = 'DIRECTOR_OPERACIONES',
  onSuccessSave
}) => {
  const initialData = report?.eje2Data?.conatel || INITIAL_EJE2_DATA.conatel;

  // 6 State arrays corresponding to Document Pages 4 to 6
  const [monitoreoRegulatorio, setMonitoreoRegulatorio] = useState<ConatelMonitoreoRow[]>(initialData.monitoreoRegulatorio);
  const [monitoreoEspectro, setMonitoreoEspectro] = useState<ConatelEspectroRow[]>(initialData.monitoreoEspectro);
  const [cumplimientoResorte, setCumplimientoResorte] = useState<ConatelResorteRow[]>(initialData.cumplimientoResorte);
  const [tramitesSigestel, setTramitesSigestel] = useState<ConatelTramiteSigestelRow[]>(initialData.tramitesSigestel);
  const [incidentesContingencias, setIncidentesContingencias] = useState<ConatelIncidenteRow[]>(initialData.incidentesContingencias);
  const [politicasPublicas, setPoliticasPublicas] = useState<ConatelPoliticaPublicaRow[]>(initialData.politicasPublicas);

  // Subtab for internal sections
  const [activeTab, setActiveTab] = useState<'REGULATORIO' | 'ESPECTRO' | 'RESORTE' | 'SIGESTEL' | 'INCIDENTES' | 'POLITICAS'>('REGULATORIO');

  // Control variables
  const [enteInformante, setEnteInformante] = useState('CONATEL (Comisión Nacional de Telecomunicaciones)');
  const [responsableCarga, setResponsableCarga] = useState(currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : 'G/D Jorge Márquez Monsalve');
  const [cedulaResponsable, setCedulaResponsable] = useState(currentUser?.cedula || 'V-10492819');
  const [semanaReporte, setSemanaReporte] = useState(report?.control?.semanaEpidemiologica || 35);
  const [fechaCorte, setFechaCorte] = useState(report?.control?.fechaReporte || '2026-09-20');
  const [periodoDesde, setPeriodoDesde] = useState(report?.control?.periodoDesde || '2026-09-14');
  const [periodoHasta, setPeriodoHasta] = useState(report?.control?.periodoHasta || '2026-09-20');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Handlers
  const updateRegulatorio = (index: number, field: keyof ConatelMonitoreoRow, value: any) => {
    setMonitoreoRegulatorio(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateEspectro = (index: number, field: keyof ConatelEspectroRow, value: any) => {
    setMonitoreoEspectro(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateResorte = (index: number, field: keyof ConatelResorteRow, value: any) => {
    setCumplimientoResorte(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateSigestel = (index: number, field: keyof ConatelTramiteSigestelRow, value: any) => {
    setTramitesSigestel(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateIncidente = (index: number, field: keyof ConatelIncidenteRow, value: any) => {
    setIncidentesContingencias(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updatePolitica = (index: number, field: keyof ConatelPoliticaPublicaRow, value: any) => {
    setPoliticasPublicas(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Summaries
  const totalTramitesRecibidos = tramitesSigestel.reduce((acc, t) => acc + (Number(t.solicitudesRecibidas) || 0), 0);
  const totalTramitesProcesados = tramitesSigestel.reduce((acc, t) => acc + (Number(t.solicitudesProcesadas) || 0), 0);
  const eficaciaSigestel = totalTramitesRecibidos > 0 
    ? Number(((totalTramitesProcesados / totalTramitesRecibidos) * 100).toFixed(1)) 
    : 100;

  const cumplimientoNacionalResorte = cumplimientoResorte.find(r => r.codigo === 'CON-015')?.valor || 78.4;
  const cumplimientoEducativoResorte = cumplimientoResorte.find(r => r.codigo === 'CON-016')?.valor || 24.2;
  const cumplimientoInfantilResorte = cumplimientoResorte.find(r => r.codigo === 'CON-017')?.valor || 22.8;

  const espectroMonitoreadoPorc = monitoreoEspectro.find(e => e.codigo === 'CON-010')?.valor || 89.5;
  const interferenciasCount = monitoreoEspectro.find(e => e.codigo === 'CON-011')?.valor || 7;

  // Save to master system
  const handleSave = () => {
    if (report && onSaveReport) {
      const updatedControl = {
        ...report.control,
        enteAdscrito: enteInformante,
        responsableEnte: responsableCarga,
        cedulaIdentidad: cedulaResponsable,
        semanaEpidemiologica: typeof semanaReporte === 'number' ? semanaReporte : 35,
        fechaReporte: fechaCorte,
        periodoDesde,
        periodoHasta,
        fechaUltimaModificacion: new Date().toISOString()
      };

      const currentPlataformas = report.plataformasData || {};
      const con001 = monitoreoRegulatorio.find(m => m.codigo === 'CON-001')?.valor || 24;
      const con002 = monitoreoRegulatorio.find(m => m.codigo === 'CON-002')?.valor || 8;
      const con003 = monitoreoRegulatorio.find(m => m.codigo === 'CON-003')?.valor || 15;
      const con004 = monitoreoRegulatorio.find(m => m.codigo === 'CON-004')?.valor || 32;
      const con005 = monitoreoRegulatorio.find(m => m.codigo === 'CON-005')?.valor || 19;
      const con006 = monitoreoRegulatorio.find(m => m.codigo === 'CON-006')?.valor || 3;

      const con009 = monitoreoEspectro.find(e => e.codigo === 'CON-009')?.valor || 18;
      const con012 = monitoreoEspectro.find(e => e.codigo === 'CON-012')?.valor || 4;

      const con014 = cumplimientoResorte.find(r => r.codigo === 'CON-014')?.valor || 85;

      const updatedPlataformasData: PlatformsTechnicalData = {
        ...currentPlataformas,
        reportesPrimerasPlanasRegulatorias: con001,
        concesionesOtorgadas: con002,
        habilitacionesProcesadas: con003,
        homologacionesEquipos: con004,
        inspeccionesTecnicas: con005,
        multasSancionesAplicadas: con006,
        estacionesMonitoreoEspectroOperativas: con009,
        espectroRadioelectricoMonitoreado: espectroMonitoreadoPorc,
        interferenciasDetectadas: interferenciasCount,
        operadoresIrregulares: con012,
        mediosMonitoreadosCuotasResorte: con014,
        cumplimientoContenidoNacionalResorte: cumplimientoNacionalResorte,
        cumplimientoContenidoEducativoResorte: cumplimientoEducativoResorte,
        cumplimientoFranjaInfantilResorte: cumplimientoInfantilResorte
      };

      const updatedEje2 = {
        ...(report.eje2Data || INITIAL_EJE2_DATA),
        conatel: {
          monitoreoRegulatorio,
          monitoreoEspectro,
          cumplimientoResorte,
          tramitesSigestel,
          incidentesContingencias,
          politicasPublicas
        }
      };

      const computedKpis = calculateMasterKPIs(
        report.mediosData,
        updatedPlataformasData,
        report.strategicData,
        report.vulnerabilityRows
      );

      const computedValidations = runThreeLevelValidation(
        updatedControl,
        report.mediosData,
        updatedPlataformasData,
        report.strategicData,
        report.vulnerabilityRows
      );

      const updatedReport: FullWeeklyReport = {
        ...report,
        control: updatedControl,
        plataformasData: updatedPlataformasData,
        eje2Data: updatedEje2,
        kpisCalculados: computedKpis,
        validaciones: computedValidations,
        hashIntegridad: generateIntegrityHash(
          report.codigoReporte,
          new Date().toISOString(),
          computedKpis
        ),
        fechaUltimaModificacion: new Date().toISOString()
      };

      onSaveReport(updatedReport);
      setSaveSuccessMsg('Datos del Eje 2.B (CONATEL) sincronizados y validados exitosamente en el sistema maestro.');
      if (onSuccessSave) {
        onSuccessSave('CONATEL guardado con éxito');
      }
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csv = 'EJE 2.B CONATEL - INSTRUMENTO OFICIAL MPPCI\n';
    csv += `Ente,${enteInformante}\nResponsable,${responsableCarga}\nSemana,${semanaReporte}\nFecha,${fechaCorte}\n\n`;

    csv += 'MONITOREO REGULATORIO Y DE INFRAESTRUCTURA\n';
    csv += 'Indicador,Codigo,Valor,Var % vs Semana Anterior,Observaciones\n';
    monitoreoRegulatorio.forEach(r => {
      csv += `"${r.indicador}",${r.codigo},${r.valor},${r.varSemanaAnteriorPorc}%,"${r.observaciones}"\n`;
    });

    csv += '\nMONITOREO DE ESPECTRO RADIOELECTRICO\n';
    csv += 'Indicador,Codigo,Valor,Observaciones\n';
    monitoreoEspectro.forEach(e => {
      csv += `"${e.indicador}",${e.codigo},${e.valor}${e.totalRef ? `/${e.totalRef}` : ''},"${e.observaciones}"\n`;
    });

    csv += '\nCUMPLIMIENTO NORMATIVO - LEY RESORTE\n';
    csv += 'Indicador,Codigo,Valor,Observaciones\n';
    cumplimientoResorte.forEach(res => {
      csv += `"${res.indicador}",${res.codigo},${res.valor},"${res.observaciones}"\n`;
    });

    csv += '\nGESTION DE TRAMITES Y SERVICIOS (SIGESTEL)\n';
    csv += 'Tramite,Codigo,Solicitudes Recibidas,Solicitudes Procesadas,Tiempo Promedio (dias)\n';
    tramitesSigestel.forEach(t => {
      csv += `"${t.tramite}",${t.codigo},${t.solicitudesRecibidas},${t.solicitudesProcesadas},${t.tiempoPromedioDias}\n`;
    });

    csv += '\nREPORTE DE INCIDENTES Y CONTINGENCIAS\n';
    csv += 'Tipo de Incidente,N° de Reportes,% de Resolucion,Tiempo Promedio (hrs)\n';
    incidentesContingencias.forEach(i => {
      csv += `"${i.tipoIncidente}",${i.numReportes},${i.resolucionPorc}%,${i.tiempoPromedioHoras}\n`;
    });

    csv += '\nACTUALIZACIONES REGULATORIAS Y POLITICAS PUBLICAS\n';
    csv += 'Tema,N° Documentos Publicados,Fecha,Observaciones\n';
    politicasPublicas.forEach(p => {
      csv += `"${p.tema}",${p.documentosPublicados},${p.fecha},"${p.observaciones}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MPPCI_EJE2B_CONATEL_Semana_${semanaReporte}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Official Header Banner */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                INSTRUMENTO OFICIAL MPPCI • EJE 2
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                Activo
              </span>
            </div>
            <h1 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
              2.B CONATEL - Comisión Nacional de Telecomunicaciones
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Monitoreo del espectro radioeléctrico, habilitaciones administrativas, fiscalización de Ley RESORTE, 
              trámites SIGESTEL y atención técnica ante contingencias e interferencias.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Descargar matriz en CSV oficial"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-600/30 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar & Validar</span>
            </button>
          </div>
        </div>

        {/* Live Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-800">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Espectro Monitoreado (CON-010)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold font-mono text-emerald-400">{espectroMonitoreadoPorc}%</span>
              <span className="text-[10px] text-slate-500">Supervisado</span>
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">PNI Ley RESORTE (CON-015)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold font-mono text-blue-400">{cumplimientoNacionalResorte}%</span>
              <span className="text-[10px] text-slate-500">Meta: 70%</span>
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Eficacia SIGESTEL</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold font-mono text-amber-400">{eficaciaSigestel}%</span>
              <span className="text-[10px] text-slate-500">{totalTramitesProcesados}/{totalTramitesRecibidos}</span>
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Interferencias Activas (CON-011)</span>
            <div className="flex items-baseline space-x-1">
              <span className={`text-lg font-bold font-mono ${interferenciasCount > 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {interferenciasCount}
              </span>
              <span className="text-[10px] text-slate-500">Detectadas</span>
            </div>
          </div>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Control Variable Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-600" />
          <span>Variables de Control & Registro</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="text-[10px] text-slate-500 font-semibold block">Responsable / Ente</label>
            <input
              type="text"
              value={responsableCarga}
              onChange={e => setResponsableCarga(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-medium"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 font-semibold block">Cédula de Identidad</label>
            <input
              type="text"
              value={cedulaResponsable}
              onChange={e => setCedulaResponsable(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 font-semibold block">Semana Epidemiológica</label>
            <input
              type="number"
              value={semanaReporte}
              onChange={e => setSemanaReporte(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 font-semibold block">Período de Corte (Del)</label>
            <input
              type="date"
              value={periodoDesde}
              onChange={e => setPeriodoDesde(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono text-[11px]"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-500 font-semibold block">Período de Corte (Al)</label>
            <input
              type="date"
              value={periodoHasta}
              onChange={e => setPeriodoHasta(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono text-[11px]"
            />
          </div>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'REGULATORIO', label: '1. Monitoreo Regulatorio (CON-001/008)', icon: Gauge },
          { id: 'ESPECTRO', label: '2. Espectro Radioeléctrico (CON-009/013)', icon: Radio },
          { id: 'RESORTE', label: '3. Cumplimiento Ley RESORTE (CON-014/018)', icon: Scale },
          { id: 'SIGESTEL', label: '4. Trámites SIGESTEL (CON-019/025)', icon: FileCheck },
          { id: 'INCIDENTES', label: '5. Incidentes y Contingencias (6 Tipos)', icon: AlertOctagon },
          { id: 'POLITICAS', label: '6. Actualizaciones Regulatorias (4 Temas)', icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: MONITOREO REGULATORIO */}
      {activeTab === 'REGULATORIO' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
              Monitoreo Regulatorio y de Infraestructura
            </h3>
            <p className="text-xs text-slate-500">
              Códigos CON-001 al CON-008: Actos regulatorios, concesiones, habilitaciones, inspecciones y sanciones.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Indicador</th>
                  <th className="p-3 w-24">Código</th>
                  <th className="p-3 w-32">Valor</th>
                  <th className="p-3 w-36">Var % vs Sem. Anterior</th>
                  <th className="p-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {monitoreoRegulatorio.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-sans font-medium text-slate-800">{row.indicador}</td>
                    <td className="p-3">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {row.codigo}
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.valor}
                        onChange={e => updateRegulatorio(idx, 'valor', Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                      />
                    </td>
                    <td className="p-3">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={row.varSemanaAnteriorPorc}
                          onChange={e => updateRegulatorio(idx, 'varSemanaAnteriorPorc', Number(e.target.value))}
                          className={`w-24 px-2 py-1 pr-6 rounded font-mono font-bold text-xs border ${
                            row.varSemanaAnteriorPorc < 0 
                              ? 'bg-rose-50 text-rose-800 border-rose-300' 
                              : 'bg-slate-50 text-slate-800 border-slate-300'
                          }`}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={e => updateRegulatorio(idx, 'observaciones', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-sans text-slate-700 text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 2: ESPECTRO */}
      {activeTab === 'ESPECTRO' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
              Monitoreo de Espectro Radioeléctrico
            </h3>
            <p className="text-xs text-slate-500">
              Códigos CON-009 al CON-013: Estaciones de monitoreo, interferencias detectadas y operadores irregulares.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Indicador</th>
                  <th className="p-3 w-24">Código</th>
                  <th className="p-3 w-36">Valor</th>
                  <th className="p-3">Observaciones Técnicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {monitoreoEspectro.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-sans font-medium text-slate-800">{row.indicador}</td>
                    <td className="p-3">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {row.codigo}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          step={row.codigo === 'CON-010' ? '0.1' : '1'}
                          value={row.valor}
                          onChange={e => updateEspectro(idx, 'valor', Number(e.target.value))}
                          className="w-20 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        {row.totalRef && (
                          <span className="text-slate-400 font-bold">/ {row.totalRef}</span>
                        )}
                        {row.codigo === 'CON-010' && (
                          <span className="text-slate-400 font-bold">%</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={e => updateEspectro(idx, 'observaciones', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-sans text-slate-700 text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: RESORTE */}
      {activeTab === 'RESORTE' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
              Cumplimiento Normativo - Ley Resorte
            </h3>
            <p className="text-xs text-slate-500">
              Códigos CON-014 al CON-018: Porcentajes de producción nacional, contenido educativo y franja infantil.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Indicador</th>
                  <th className="p-3 w-24">Código</th>
                  <th className="p-3 w-36">Valor Alcanzado</th>
                  <th className="p-3">Observaciones de Fiscalización</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {cumplimientoResorte.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-sans font-medium text-slate-800">{row.indicador}</td>
                    <td className="p-3">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {row.codigo}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="relative inline-block">
                        <input
                          type="number"
                          step={row.indicador.includes('%') ? '0.1' : '1'}
                          value={row.valor}
                          onChange={e => updateResorte(idx, 'valor', Number(e.target.value))}
                          className="w-24 px-2 py-1 pr-6 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        {row.indicador.includes('%') && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={e => updateResorte(idx, 'observaciones', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-sans text-slate-700 text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 4: SIGESTEL */}
      {activeTab === 'SIGESTEL' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Gestión de Trámites y Servicios (SIGESTEL)
              </h3>
              <p className="text-xs text-slate-500">
                Códigos CON-019 al CON-025: Solicitudes recibidas, procesadas y tiempos de respuesta.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded">
              Eficacia Global: {eficaciaSigestel}%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Trámite</th>
                  <th className="p-3 w-24">Código</th>
                  <th className="p-3 w-36">Solicitudes Recibidas</th>
                  <th className="p-3 w-36">Solicitudes Procesadas</th>
                  <th className="p-3 w-36">Tiempo Promedio (días)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {tramitesSigestel.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-sans font-bold text-slate-800">{row.tramite}</td>
                    <td className="p-3">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {row.codigo}
                      </span>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.solicitudesRecibidas}
                        onChange={e => updateSigestel(idx, 'solicitudesRecibidas', Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.solicitudesProcesadas}
                        onChange={e => updateSigestel(idx, 'solicitudesProcesadas', Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.tiempoPromedioDias}
                        onChange={e => updateSigestel(idx, 'tiempoPromedioDias', Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono text-slate-800 text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 5: INCIDENTES */}
      {activeTab === 'INCIDENTES' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
              Reporte de Incidentes y Contingencias
            </h3>
            <p className="text-xs text-slate-500">
              6 Tipologías críticas: Caídas de servicio, interferencias, afectaciones a infraestructura, ciberataques y emergencias.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Tipo de Incidente</th>
                  <th className="p-3 w-36">N° de Reportes</th>
                  <th className="p-3 w-36">% de Resolución</th>
                  <th className="p-3 w-36">Tiempo Promedio (hrs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {incidentesContingencias.map((row, idx) => (
                  <tr key={row.tipoIncidente} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-bold text-slate-900 font-sans">{row.tipoIncidente}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.numReportes}
                        onChange={e => updateIncidente(idx, 'numReportes', Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                      />
                    </td>
                    <td className="p-3">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={row.resolucionPorc}
                          onChange={e => updateIncidente(idx, 'resolucionPorc', Number(e.target.value))}
                          className="w-24 px-2 py-1 pr-6 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        step="0.1"
                        value={row.tiempoPromedioHoras}
                        onChange={e => updateIncidente(idx, 'tiempoPromedioHoras', Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono text-slate-800 text-xs"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 6: POLITICAS PUBLICAS */}
      {activeTab === 'POLITICAS' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
              Actualizaciones Regulatorias y Políticas Públicas
            </h3>
            <p className="text-xs text-slate-500">
              Publicación oficial de providencias, resoluciones, consultas públicas e informes técnicos.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-56">Tema</th>
                  <th className="p-3 w-36">N° de Documentos</th>
                  <th className="p-3 w-36">Fecha</th>
                  <th className="p-3">Observaciones de Impacto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {politicasPublicas.map((row, idx) => (
                  <tr key={row.tema} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{row.tema}</td>
                    <td className="p-3 font-mono">
                      <input
                        type="number"
                        value={row.documentosPublicados}
                        onChange={e => updatePolitica(idx, 'documentosPublicados', Number(e.target.value))}
                        className="w-24 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                      />
                    </td>
                    <td className="p-3 font-mono">
                      <input
                        type="date"
                        value={row.fecha}
                        onChange={e => updatePolitica(idx, 'fecha', e.target.value)}
                        className="w-32 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono text-slate-800 text-xs"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={e => updatePolitica(idx, 'observaciones', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-sans text-slate-700 text-xs"
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
