import React, { useState } from 'react';
import { 
  Radio, 
  Satellite, 
  TowerControl as TowerIcon, 
  Gauge, 
  MapPin, 
  Zap, 
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
  Signal, 
  RadioTower, 
  Info, 
  BarChart3, 
  ArrowUpRight, 
  Check, 
  ChevronRight,
  Cpu
} from 'lucide-react';
import { 
  FullWeeklyReport, 
  PlatformsTechnicalData, 
  UserAccount, 
  RACIRole, 
  RedTVOperatividadMedioRow, 
  RedTVTdaKpiRow, 
  RedTVSatelitalRow, 
  RedTVTorreCriticaRow, 
  RedTVTransmisoresEquipamientoRow, 
  RedTVCoberturaRegionRow 
} from '../types';
import { INITIAL_EJE2_DATA } from '../data/mockEje2Data';
import { calculateMasterKPIs, runThreeLevelValidation, generateIntegrityHash } from '../utils/engine';

interface FormularioRedTVProps {
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onSuccessSave?: (message: string) => void;
}

export const FormularioRedTV: React.FC<FormularioRedTVProps> = ({
  report,
  onSaveReport,
  currentUser,
  currentRole = 'DIRECTOR_OPERACIONES',
  onSuccessSave
}) => {
  // Initial data derived from report.eje2Data or fallback to INITIAL_EJE2_DATA
  const initialData = report?.eje2Data?.redtv || INITIAL_EJE2_DATA.redtv;

  // Local state for all 6 tables of 2.A REDTV
  const [operatividadMedios, setOperatividadMedios] = useState<RedTVOperatividadMedioRow[]>(initialData.operatividadMedios);
  const [monitoreoTda, setMonitoreoTda] = useState<RedTVTdaKpiRow[]>(initialData.monitoreoTda);
  const [infraestructuraSatelital, setInfraestructuraSatelital] = useState<RedTVSatelitalRow[]>(initialData.infraestructuraSatelital);
  const [torresCriticas, setTorresCriticas] = useState<RedTVTorreCriticaRow[]>(initialData.torresCriticas);
  const [transmisoresEquipamiento, setTransmisoresEquipamiento] = useState<RedTVTransmisoresEquipamientoRow[]>(initialData.transmisoresEquipamiento);
  
  // Ensure all 24 federal entities (23 states + DC + Dependencias) are present even if report had legacy subset
  const [coberturaRegiones, setCoberturaRegiones] = useState<RedTVCoberturaRegionRow[]>(() => {
    const defaultList = INITIAL_EJE2_DATA.redtv.coberturaRegiones;
    const existingList = initialData.coberturaRegiones || [];
    const existingMap = new Map(existingList.map(r => [r.region.toLowerCase(), r]));
    return defaultList.map(def => existingMap.get(def.region.toLowerCase()) || def);
  });

  // Subtab for internal section navigation
  const [activeTab, setActiveTab] = useState<'SENALES' | 'TDA' | 'SATELITAL' | 'TORRES' | 'TRANSMISORES' | 'REGIONES'>('SENALES');

  // Audit control variables
  const [enteInformante, setEnteInformante] = useState('REDTV (Red de Transmisiones de Venezuela)');
  const [responsableCarga, setResponsableCarga] = useState(currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : 'Ing. Argenis Vielma');
  const [cedulaResponsable, setCedulaResponsable] = useState(currentUser?.cedula || 'V-12495810');
  const [semanaReporte, setSemanaReporte] = useState(report?.control?.semanaEpidemiologica || 35);
  const [fechaCorte, setFechaCorte] = useState(report?.control?.fechaReporte || '2026-09-20');
  const [periodoDesde, setPeriodoDesde] = useState(report?.control?.periodoDesde || '2026-09-14');
  const [periodoHasta, setPeriodoHasta] = useState(report?.control?.periodoHasta || '2026-09-20');

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Handlers for updating tables
  const updateOperatividadMedio = (index: number, field: keyof RedTVOperatividadMedioRow, value: any) => {
    setOperatividadMedios(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateMonitoreoTda = (index: number, field: keyof RedTVTdaKpiRow, value: any) => {
    setMonitoreoTda(prev => {
      const updated = [...prev];
      const row = { ...updated[index], [field]: value };
      // Auto-compute compliance percentage
      if (field === 'valor' || field === 'meta') {
        const val = field === 'valor' ? Number(value) : row.valor;
        const met = field === 'meta' ? Number(value) : row.meta;
        row.cumplimientoPorc = met > 0 ? Number(((val / met) * 100).toFixed(1)) : 100;
      }
      updated[index] = row;
      return updated;
    });
  };

  const updateSatelital = (index: number, field: keyof RedTVSatelitalRow, value: any) => {
    setInfraestructuraSatelital(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateTorre = (index: number, field: keyof RedTVTorreCriticaRow, value: any) => {
    setTorresCriticas(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateTransmisores = (index: number, field: keyof RedTVTransmisoresEquipamientoRow, value: any) => {
    setTransmisoresEquipamiento(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateCoberturaRegion = (index: number, field: keyof RedTVCoberturaRegionRow, value: any) => {
    setCoberturaRegiones(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Aggregated calculations
  const totalHorasSenal = operatividadMedios.reduce((acc, m) => acc + (Number(m.horasTransmision) || 0), 0);
  const promedioOperatividadSenal = operatividadMedios.length > 0 
    ? Number((operatividadMedios.reduce((acc, m) => acc + (Number(m.operatividadPorc) || 0), 0) / operatividadMedios.length).toFixed(1)) 
    : 98.5;
  const totalPasesVivo = operatividadMedios.reduce((acc, m) => acc + (Number(m.pasesEnVivoProduccion) || 0), 0);
  
  const rtv001 = monitoreoTda.find(t => t.codigo === 'RTV-001')?.valor || 98.2;
  const rtv006 = infraestructuraSatelital.find(s => s.codigo === 'RTV-006')?.valor || 94.8;
  const torresAfectadasCount = torresCriticas.filter(t => t.estatus !== 'OPERATIVA').length;
  
  // Formula: IRT = (% TDA + % Banda Ku + % Señal Medios) / 3
  const irtCalculado = Number(((rtv001 + rtv006 + promedioOperatividadSenal) / 3).toFixed(1));

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
      const tdaOperativas = monitoreoTda.find(t => t.codigo === 'RTV-004')?.valor || 23;
      const tdaTotal = monitoreoTda.find(t => t.codigo === 'RTV-004')?.totalRef || 25;
      const servTv = monitoreoTda.find(t => t.codigo === 'RTV-002')?.valor || 16;
      const servRadio = monitoreoTda.find(t => t.codigo === 'RTV-003')?.valor || 12;
      const cobTda = monitoreoTda.find(t => t.codigo === 'RTV-005')?.valor || 68.5;

      const txTv = transmisoresEquipamiento.find(t => t.codigo === 'RTV-011');
      const txRadio = transmisoresEquipamiento.find(t => t.codigo === 'RTV-012');
      const enlaces = transmisoresEquipamiento.find(t => t.codigo === 'RTV-013');
      const plantas = transmisoresEquipamiento.find(t => t.codigo === 'RTV-014');
      const capDisp = transmisoresEquipamiento.find(t => t.codigo === 'RTV-015');

      const updatedPlataformasData: PlatformsTechnicalData = {
        ...currentPlataformas,
        operatividadNacionalTDA: rtv001,
        estacionesTDAOperativas: tdaOperativas,
        estacionesTDATotal: tdaTotal,
        serviciosTVActivosTDA: servTv,
        serviciosRadioActivosTDA: servRadio,
        coberturaGeograficaTDA: cobTda,
        potenciaBandaKu: rtv006,
        transmisoresTVOperativos: txTv?.operativos || currentPlataformas.transmisoresTVOperativos,
        transmisoresTVTotal: txTv?.total || currentPlataformas.transmisoresTVTotal,
        transmisoresRadioOperativos: txRadio?.operativos || currentPlataformas.transmisoresRadioOperativos,
        transmisoresRadioTotal: txRadio?.total || currentPlataformas.transmisoresRadioTotal,
        enlacesMicroondasOperativos: enlaces?.operativos || currentPlataformas.enlacesMicroondasOperativos,
        enlacesMicroondasTotal: enlaces?.total || currentPlataformas.enlacesMicroondasTotal,
        plantasRespaldoOperativas: plantas?.operativos || currentPlataformas.plantasRespaldoOperativas,
        plantasRespaldoTotal: plantas?.total || currentPlataformas.plantasRespaldoTotal,
        capacidadTransmisionDisponible: capDisp?.operativos || currentPlataformas.capacidadTransmisionDisponible
      };

      const updatedEje2 = {
        ...(report.eje2Data || INITIAL_EJE2_DATA),
        redtv: {
          operatividadMedios,
          monitoreoTda,
          infraestructuraSatelital,
          torresCriticas,
          transmisoresEquipamiento,
          coberturaRegiones
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
      setSaveSuccessMsg('Datos del Eje 2.A (REDTV) sincronizados y validados exitosamente en el sistema maestro.');
      if (onSuccessSave) {
        onSuccessSave('REDTV guardado con éxito');
      }
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    let csv = 'EJE 2.A REDTV - INSTRUMENTO OFICIAL MPPCI\n';
    csv += `Ente,${enteInformante}\nResponsable,${responsableCarga}\nSemana,${semanaReporte}\nFecha,${fechaCorte}\n\n`;

    csv += 'MATRIZ DE OPERATIVIDAD TECNICA - SENALES Y TRANSMISION\n';
    csv += 'Medio/Ente,Horas de Transmision,% Operatividad,Estatus Senal/Servidores %,Pases en Vivo,Observaciones\n';
    operatividadMedios.forEach(m => {
      csv += `"${m.medioEnte}",${m.horasTransmision},${m.operatividadPorc}%,${m.estatusSenalServidoresPorc}%,${m.pasesEnVivoProduccion},"${m.observaciones}"\n`;
    });

    csv += '\nTELEVISION DIGITAL ABIERTA (TDA)\n';
    csv += 'Indicador,Codigo,Valor,Meta,Cumplimiento %\n';
    monitoreoTda.forEach(t => {
      csv += `"${t.indicador}",${t.codigo},${t.valor}${t.totalRef ? `/${t.totalRef}` : ''},${t.meta},${t.cumplimientoPorc}%\n`;
    });

    csv += '\nINFRAESTRUCTURA SATELITAL\n';
    csv += 'Indicador,Codigo,Valor,Unidad,Observaciones\n';
    infraestructuraSatelital.forEach(s => {
      csv += `"${s.indicador}",${s.codigo},${s.valor},${s.unidad},"${s.observaciones}"\n`;
    });

    csv += '\nTORRES CRITICAS\n';
    csv += 'Infraestructura,Ubicacion,Estatus,Observaciones\n';
    torresCriticas.forEach(tc => {
      csv += `"${tc.infraestructura}","${tc.ubicacion}",${tc.estatus},"${tc.observaciones}"\n`;
    });

    csv += '\nTRANSMISORES Y EQUIPAMIENTO\n';
    csv += 'Indicador,Codigo,Operativos,Total,Observaciones\n';
    transmisoresEquipamiento.forEach(te => {
      csv += `"${te.indicador}",${te.codigo},${te.operativos},${te.total},"${te.observaciones}"\n`;
    });

    csv += '\nANALISIS DE SENAL POR REGION\n';
    csv += 'Region,% Cobertura TDA,% Cobertura FM/AM,% Cobertura TV Abierta,Estaciones Afectadas\n';
    coberturaRegiones.forEach(cr => {
      csv += `"${cr.region}",${cr.coberturaTdaPorc}%,${cr.coberturaFmAmPorc}%,${cr.coberturaTvAbiertaPorc}%,${cr.estacionesAfectadas}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MPPCI_EJE2A_REDTV_Semana_${semanaReporte}.csv`);
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
              <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded">
                INSTRUMENTO OFICIAL MPPCI • EJE 2
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">
                Activo
              </span>
            </div>
            <h1 className="text-2xl font-bold font-['Space_Grotesk'] text-white">
              2.A REDTV - Red de Transmisiones de Venezuela
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Captura y telemetría de señales, enlaces satelitales en Banda Ku, infraestructura crítica de torres, 
              estaciones repetidoras TDA y análisis territorial de cobertura radioeléctrica.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Descargar matriz en CSV oficial"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Exportar CSV</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/30 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar & Validar</span>
            </button>
          </div>
        </div>

        {/* Live Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-800">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Resiliencia Técnica (IRT)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold font-mono text-emerald-400">{irtCalculado}%</span>
              <span className="text-[10px] text-slate-500">Fórmula Oficial</span>
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Operatividad TDA (RTV-001)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold font-mono text-blue-400">{rtv001}%</span>
              <span className="text-[10px] text-slate-500">Nacional</span>
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Potencia Banda Ku (RTV-006)</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold font-mono text-amber-400">{rtv006}%</span>
              <span className="text-[10px] text-slate-500">Telepuerto</span>
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Torres Afectadas</span>
            <div className="flex items-baseline space-x-1">
              <span className={`text-lg font-bold font-mono ${torresAfectadasCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {torresAfectadasCount}
              </span>
              <span className="text-[10px] text-slate-500">de 7 Nodos Críticos</span>
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
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
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

      {/* Internal Navigation Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'SENALES', label: '1. Matriz de Señales (10 Medios)', icon: Signal },
          { id: 'TDA', label: '2. Telecomunicaciones TDA (RTV-001/005)', icon: Radio },
          { id: 'SATELITAL', label: '3. Infraestructura Satelital (RTV-006/010)', icon: Satellite },
          { id: 'TORRES', label: '4. Torres Críticas (7 Estaciones)', icon: RadioTower },
          { id: 'TRANSMISORES', label: '5. Transmisores & Microondas (RTV-011/015)', icon: Cpu },
          { id: 'REGIONES', label: '6. Análisis por Región (Todos los Estados)', icon: MapPin },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUBTAB 1: MATRIZ DE SENALES */}
      {activeTab === 'SENALES' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Matriz de Operatividad Técnica - Señales y Transmisión
              </h3>
              <p className="text-xs text-slate-500">
                Monitoreo operativo continuo en 10 medios del Sistema Bolivariano de Comunicación e Información (SiBCI).
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Total Horas Transmitidas: </span>
              <span className="text-sm font-bold font-mono text-blue-600">{totalHorasSenal.toLocaleString()} hrs</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Medio / Ente</th>
                  <th className="p-3 w-32">Horas Transmisión</th>
                  <th className="p-3 w-32">% Operatividad</th>
                  <th className="p-3 w-36">Estatus Señal / Servidores (%)</th>
                  <th className="p-3 w-28">Pases en Vivo</th>
                  <th className="p-3">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {operatividadMedios.map((row, idx) => (
                  <tr key={row.medioEnte} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 font-bold text-slate-900 font-sans">{row.medioEnte}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.horasTransmision}
                        onChange={e => updateOperatividadMedio(idx, 'horasTransmision', Number(e.target.value))}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                      />
                    </td>
                    <td className="p-3">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={row.operatividadPorc}
                          onChange={e => updateOperatividadMedio(idx, 'operatividadPorc', Number(e.target.value))}
                          className="w-full px-2 py-1 pr-6 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={row.estatusSenalServidoresPorc}
                          onChange={e => updateOperatividadMedio(idx, 'estatusSenalServidoresPorc', Number(e.target.value))}
                          className="w-full px-2 py-1 pr-6 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.pasesEnVivoProduccion}
                        onChange={e => updateOperatividadMedio(idx, 'pasesEnVivoProduccion', Number(e.target.value))}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono text-slate-800 text-xs"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={e => updateOperatividadMedio(idx, 'observaciones', e.target.value)}
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

      {/* SUBTAB 2: TDA */}
      {activeTab === 'TDA' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
              Monitoreo de Telecomunicaciones - Televisión Digital Abierta (TDA)
            </h3>
            <p className="text-xs text-slate-500">
              Indicadores clave de rendimiento RTV-001 al RTV-005 con cálculo automático de porcentaje de cumplimiento.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Indicador</th>
                  <th className="p-3 w-28">Código</th>
                  <th className="p-3 w-36">Valor Alcanzado</th>
                  <th className="p-3 w-32">Meta</th>
                  <th className="p-3 w-32">Cumplimiento %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {monitoreoTda.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 font-sans font-medium text-slate-800">{row.indicador}</td>
                    <td className="p-3">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {row.codigo}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          step={row.codigo.includes('001') || row.codigo.includes('005') ? '0.1' : '1'}
                          value={row.valor}
                          onChange={e => updateMonitoreoTda(idx, 'valor', Number(e.target.value))}
                          className="w-20 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        {row.totalRef && (
                          <span className="text-slate-400 font-bold">/ {row.totalRef}</span>
                        )}
                        {(row.codigo === 'RTV-001' || row.codigo === 'RTV-005') && (
                          <span className="text-slate-400 font-bold">%</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        step="0.1"
                        value={row.meta}
                        onChange={e => updateMonitoreoTda(idx, 'meta', Number(e.target.value))}
                        className="w-20 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono text-slate-800 text-xs"
                      />
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-xs ${
                        row.cumplimientoPorc >= 100 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : row.cumplimientoPorc >= 80 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {row.cumplimientoPorc}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: SATELITAL */}
      {activeTab === 'SATELITAL' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
              Infraestructura Satelital
            </h3>
            <p className="text-xs text-slate-500">
              Códigos RTV-006 al RTV-010: Potencia de enlace ascendente/descendente en Banda Ku, telepuertos y transpondedores.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Indicador</th>
                  <th className="p-3 w-24">Código</th>
                  <th className="p-3 w-36">Valor</th>
                  <th className="p-3 w-28">Unidad</th>
                  <th className="p-3">Observaciones Técnicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {infraestructuraSatelital.map((row, idx) => (
                  <tr key={row.codigo} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 font-sans font-medium text-slate-800">{row.indicador}</td>
                    <td className="p-3">
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        {row.codigo}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          step={row.unidad === '%' ? '0.1' : '1'}
                          value={row.valor}
                          onChange={e => updateSatelital(idx, 'valor', Number(e.target.value))}
                          className="w-20 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        {row.totalRef && (
                          <span className="text-slate-400 font-bold">/ {row.totalRef}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 font-sans text-slate-500">{row.unidad}</td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={e => updateSatelital(idx, 'observaciones', e.target.value)}
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

      {/* SUBTAB 4: TORRES CRITICAS */}
      {activeTab === 'TORRES' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Reporte de Infraestructura Crítica en Telecomunicaciones
              </h3>
              <p className="text-xs text-slate-500">
                Monitoreo individual de las 7 torres y nodos estratégicos nacionales.
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-100 border border-slate-300 rounded text-slate-700">
              Total Torres Afectadas: {torresAfectadasCount}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Infraestructura</th>
                  <th className="p-3 w-40">Ubicación</th>
                  <th className="p-3 w-48">Estatus Operativo</th>
                  <th className="p-3">Observaciones de Campo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {torresCriticas.map((row, idx) => (
                  <tr key={row.infraestructura} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 font-bold text-slate-900 flex items-center space-x-2">
                      <RadioTower className="w-4 h-4 text-blue-600" />
                      <span>{row.infraestructura}</span>
                    </td>
                    <td className="p-3 font-medium text-slate-600">{row.ubicacion}</td>
                    <td className="p-3">
                      <select
                        value={row.estatus}
                        onChange={e => updateTorre(idx, 'estatus', e.target.value as any)}
                        className={`w-full px-2 py-1 rounded text-xs font-bold font-mono border ${
                          row.estatus === 'OPERATIVA' 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                            : row.estatus === 'ALERTA' 
                              ? 'bg-amber-50 text-amber-800 border-amber-300' 
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        <option value="OPERATIVA">OPERATIVA</option>
                        <option value="ALERTA">ALERTA</option>
                        <option value="FALLA_PARCIAL">FALLA PARCIAL</option>
                        <option value="FUERA_DE_SERVICIO">FUERA DE SERVICIO</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={row.observaciones}
                        onChange={e => updateTorre(idx, 'observaciones', e.target.value)}
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

      {/* SUBTAB 5: TRANSMISORES */}
      {activeTab === 'TRANSMISORES' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
              Estado de Transmisores y Equipamiento Técnico
            </h3>
            <p className="text-xs text-slate-500">
              Códigos RTV-011 al RTV-015: Transmisores de TV, Radio, Enlaces de microondas y Plantas de respaldo eléctrico.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Indicador</th>
                  <th className="p-3 w-24">Código</th>
                  <th className="p-3 w-40">Operativos / Total</th>
                  <th className="p-3 w-32">% Disponibilidad</th>
                  <th className="p-3">Observaciones Técnicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {transmisoresEquipamiento.map((row, idx) => {
                  const disp = row.total > 0 ? ((row.operativos / row.total) * 100).toFixed(1) : '100.0';
                  return (
                    <tr key={row.codigo} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-3 font-sans font-medium text-slate-800">{row.indicador}</td>
                      <td className="p-3">
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {row.codigo}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-1.5">
                          <input
                            type="number"
                            value={row.operativos}
                            onChange={e => updateTransmisores(idx, 'operativos', Number(e.target.value))}
                            className="w-16 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                          />
                          <span className="text-slate-400 font-bold">/</span>
                          <input
                            type="number"
                            value={row.total}
                            onChange={e => updateTransmisores(idx, 'total', Number(e.target.value))}
                            className="w-16 px-2 py-1 bg-slate-50 border border-slate-300 rounded font-mono text-slate-600 text-xs"
                          />
                        </div>
                      </td>
                      <td className="p-3 font-bold text-emerald-600">{disp}%</td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.observaciones}
                          onChange={e => updateTransmisores(idx, 'observaciones', e.target.value)}
                          className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded font-sans text-slate-700 text-xs"
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

      {/* SUBTAB 6: ANALISIS POR REGION */}
      {activeTab === 'REGIONES' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Análisis de Señal por Región
              </h3>
              <p className="text-xs text-slate-500">
                Cobertura en todas las entidades federales (23 Estados, Distrito Capital y Dependencias Federales): TDA, radio FM/AM, televisión analógica abierta y estaciones afectadas.
              </p>
            </div>
            <span className="text-[11px] font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full w-fit">
              {coberturaRegiones.length} Entidades Registradas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Región / Entidad</th>
                  <th className="p-3 w-36">% Cobertura TDA</th>
                  <th className="p-3 w-36">% Cobertura FM/AM</th>
                  <th className="p-3 w-36">% Cobertura TV Abierta</th>
                  <th className="p-3 w-36">Estaciones Afectadas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {coberturaRegiones.map((row, idx) => (
                  <tr key={row.region} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-3 font-bold text-slate-900 font-sans">{row.region}</td>
                    <td className="p-3">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={row.coberturaTdaPorc}
                          onChange={e => updateCoberturaRegion(idx, 'coberturaTdaPorc', Number(e.target.value))}
                          className="w-full px-2 py-1 pr-6 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={row.coberturaFmAmPorc}
                          onChange={e => updateCoberturaRegion(idx, 'coberturaFmAmPorc', Number(e.target.value))}
                          className="w-full px-2 py-1 pr-6 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          value={row.coberturaTvAbiertaPorc}
                          onChange={e => updateCoberturaRegion(idx, 'coberturaTvAbiertaPorc', Number(e.target.value))}
                          className="w-full px-2 py-1 pr-6 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-800 text-xs"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={row.estacionesAfectadas}
                        onChange={e => updateCoberturaRegion(idx, 'estacionesAfectadas', Number(e.target.value))}
                        className={`w-full px-2 py-1 rounded font-mono font-bold text-xs border ${
                          row.estacionesAfectadas > 0 ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-slate-50 text-slate-800 border-slate-300'
                        }`}
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
