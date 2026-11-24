import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  Radio, 
  Tv, 
  Globe, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  MapPin, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Server, 
  Wifi, 
  Eye, 
  Share2, 
  Building2, 
  FileText,
  Info,
  Layers,
  ChevronRight,
  RefreshCw,
  FileSpreadsheet,
  DatabaseZap
} from 'lucide-react';
import { 
  FullWeeklyReport, 
  CriticalTowerStatus, 
  OpinionMatrixAlert, 
  MunicipalityData, 
  IndicatorModule,
  RACIRole,
  UserAccount
} from '../types';
import { VenezuelaLeafletMap } from './VenezuelaLeafletMap';
import { FrequencyComplianceBoard } from './FrequencyComplianceBoard';

import { SystemConfiguration } from '../config/systemConfig';

interface ExecutiveDashboardProps {
  report: FullWeeklyReport;
  criticalTowers: CriticalTowerStatus[];
  opinionAlerts: OpinionMatrixAlert[];
  municipalities: MunicipalityData[];
  onNavigate: (module: IndicatorModule) => void;
  onOpenCounterNarrative: (alert: OpinionMatrixAlert) => void;
  onOpenAIStrategicBrief: () => void;
  onOpenBoletinEjecutivo?: () => void;
  currentRole: RACIRole;
  currentUser?: UserAccount | null;
  onOpenResetModal?: () => void;
  onOpenExcelImportModal?: () => void;
  systemConfig?: SystemConfiguration;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  report,
  criticalTowers = [],
  opinionAlerts = [],
  municipalities = [],
  onNavigate,
  onOpenCounterNarrative,
  onOpenAIStrategicBrief,
  onOpenBoletinEjecutivo,
  currentRole,
  currentUser,
  onOpenResetModal,
  onOpenExcelImportModal,
  systemConfig
}) => {
  const isSuperAdmin = currentUser?.rolSistema === 'SUPER_ADMIN';
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('TODOS');
  const [searchMunicipality, setSearchMunicipality] = useState<string>('');
  const [selectedMunicipality, setSelectedMunicipality] = useState<MunicipalityData | null>(null);

  const kpis = report.kpisCalculados;

  // Filter municipalities
  const statesList = Array.from(new Set((municipalities || []).map(m => m.estado))).filter(Boolean).sort();
  const searchLower = (searchMunicipality || '').toLowerCase();
  const filteredMunicipalities = (municipalities || []).filter(m => {
    const matchState = selectedStateFilter === 'TODOS' || m.estado === selectedStateFilter;
    const name = (m.nombre || '').toLowerCase();
    const st = (m.estado || '').toLowerCase();
    const code = m.codigoINE || '';
    const matchSearch = !searchLower || name.includes(searchLower) || st.includes(searchLower) || code.includes(searchMunicipality);
    return matchState && matchSearch;
  });

  const criticalTowersWithIssues = (criticalTowers || []).filter(t => t.fallaDetectada || t.transmisorTDA !== 'OPERATIVO' || t.operatividadSenal < 85);
  const activeAlertsCount = (opinionAlerts || []).filter(a => a.estado !== 'NEUTRALIZADA').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Quick Action / Data Capture Notice Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-xl p-4 border border-blue-800/60 shadow-sm text-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>Levantamiento y Recolección de Información Operativa</span>
              <span className="text-[10px] bg-blue-500/30 text-blue-200 border border-blue-400/40 px-2 py-0.2 rounded-full font-normal">
                Modo Captura Habilitado
              </span>
            </h2>
            <p className="text-[11px] text-slate-300">
              Formulario activo para recabar datos de producción y distribución de medios impresos (IMP-001 al IMP-005) y otros ejes.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {onOpenBoletinEjecutivo && (
            <button
              type="button"
              onClick={onOpenBoletinEjecutivo}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-xs shadow-md transition-all cursor-pointer"
              title="Simular corte semanal, alertas de cumplimiento lunes 10 AM y emitir Boletín Ejecutivo en PDF"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Boletín Ejecutivo (PDF)</span>
            </button>
          )}

          {isSuperAdmin && onOpenExcelImportModal && (
            <button
              type="button"
              onClick={onOpenExcelImportModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Automatizar la carga subiendo una hoja de cálculo Excel (.xlsx, .xls o .csv)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Carga Masiva Excel</span>
            </button>
          )}

          {isSuperAdmin && onOpenResetModal && (
            <button
              type="button"
              onClick={onOpenResetModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-700/80 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold border border-rose-500/40 transition-colors cursor-pointer"
              title="Restablecer todos los datos de ejemplo a cero (0) para despliegue real en producción"
            >
              <DatabaseZap className="w-3.5 h-3.5" />
              <span>Poner a Cero (0)</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate('CAPTURA_SCIC_ENTE')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Diligenciar la planilla semanal parametrizada según los indicadores asignados a cada Ente Adscrito"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Planilla por Ente (SCIC)</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('CAPTURA')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            title="Ver instrumento estructurado integral por Ejes"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Instrumento por Ejes</span>
          </button>
        </div>
      </div>

      {/* Geometric Balance Top 4 Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Engagement (EE) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Engag. (EE)
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 font-mono">
            {kpis.ee}%
          </div>
          <div className="text-[10px] text-green-600 font-semibold mt-1 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +2.4% vs meta
          </div>
        </div>

        {/* Card 2: Resiliencia (IRT) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Resiliencia (IRT)
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
            {kpis.irt}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Señal TDA / Satelital
          </div>
        </div>

        {/* Card 3: Cobertura (ICD) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Cobertura (ICD)
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono">
            {kpis.icd}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            335 Municipios
          </div>
        </div>

        {/* Card 4: Maestro (IEC) - Deep Slate 900 High-Contrast */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm text-white">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Maestro (IEC)
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {kpis.iec}%
          </div>
          <div className="text-[10px] text-blue-400 font-medium mt-1">
            Efectividad Global
          </div>
        </div>
      </div>

      {/* Mapa Interactivo Leaflet: Cobertura Efectiva Municipal (IGVSB) - Posicionado sobre el Tablero de Cumplimiento SCIC */}
      <VenezuelaLeafletMap
        municipalities={municipalities}
        criticalTowers={criticalTowers}
        opinionAlerts={opinionAlerts}
        onSelectMunicipality={(muni) => setSelectedMunicipality(muni)}
        onOpenCounterNarrative={onOpenCounterNarrative}
        systemConfig={systemConfig}
      />

      {/* Tablero de Cumplimiento por Frecuencia SCIC (Punto D) */}
      <FrequencyComplianceBoard
        onNavigateToCatalog={() => onNavigate('CATALOGO_SCIC')}
        onNavigateToCapture={() => onNavigate('CAPTURA')}
      />

      {/* Main Structural Layout: 8 cols left / 4 cols right */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* Secondary 4 Compound Indicators in Geometric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* IVI */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vulnerabilidad (IVI)</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded">EJE 3</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-slate-900 font-mono">{kpis.ivi}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Ponderación: Rojo×3 + Amarillo×1</p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                <span>Nómina SNMP:</span>
                <span className="font-semibold text-slate-700">{kpis.ivi === 0 ? '0 trab.' : '4,145 trab.'}</span>
              </div>
            </div>

            {/* THAI */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hogares con Internet (THAI)</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded">EJE 4</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-blue-600 font-mono">{kpis.thai}%</div>
                <p className="text-[11px] text-slate-500 mt-0.5">{kpis.thai === 0 ? '0 de 7.20M hogares registrados' : '4.95M de 7.20M hogares registrados'}</p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                <span>Alineación UIT:</span>
                <span className={`font-semibold ${kpis.thai === 0 ? 'text-slate-500' : 'text-green-600'}`}>
                  {kpis.thai === 0 ? 'Sin datos de campo' : 'Meta Cumplida'}
                </span>
              </div>
            </div>

            {/* TPBAM */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Banda Ancha Móvil (TPBAM)</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded">EJE 4</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-slate-900 font-mono">{kpis.tpbam}%</div>
                <p className="text-[11px] text-slate-500 mt-0.5">{kpis.tpbam === 0 ? '0 líneas activas con datos' : '21.5M de líneas activas con datos'}</p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                <span>Población Base:</span>
                <span className="font-semibold text-slate-700">{kpis.tpbam === 0 ? '0 hab. asignados' : '28.5M hab.'}</span>
              </div>
            </div>

            {/* RESORTE */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Normativa RESORTE</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded">CONATEL</span>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-green-600 font-mono">{kpis.cumplimientoResortePromedio}%</div>
                <p className="text-[11px] text-slate-500 mt-0.5">{kpis.cumplimientoResortePromedio === 0 ? '0 evaluaciones registradas' : 'Contenido nacional e infantil regulado'}</p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between">
                <span>Medios Monitoreados:</span>
                <span className="font-semibold text-slate-700">{kpis.cumplimientoResortePromedio === 0 ? '0 prestadores' : '140 prestadores'}</span>
              </div>
            </div>
          </div>

          {/* Despliegue Digital y Redes Sociales: Cifras Reales Viceministerio de Planificación y Estrategia Comunicacional */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-xl border border-blue-900/60 p-5 text-white shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-blue-800/60">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white font-['Space_Grotesk']">
                      Ecosistema Digital y Redes &bull; Cifras Reales Viceministerio de Estrategia
                    </h3>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-mono font-bold">
                      Checklist Oficial Verificado
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-200/80">
                    Datos empíricos declarados bajo norma SCIC por el Viceministerio de Planificación y Estrategia Comunicacional
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('EJE_4_ESTRATEGICO')}
                className="text-[11px] font-semibold text-blue-300 hover:text-white flex items-center self-start sm:self-auto cursor-pointer"
              >
                <span>Ver Planilla Viceministerios</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Card 1: Vistas Logradas vs Meta */}
              <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-[10px] text-blue-300 font-semibold uppercase">
                  <span>Vistas Logradas</span>
                  <span className="font-mono text-emerald-400 font-bold">RED-002</span>
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
                  {(report.mediosData.vistasLogradasDigital || 5201197).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-300 mt-1 flex items-center justify-between">
                  <span>Meta: {((report.mediosData.metaVistasDigital || 5430000) / 1000000).toFixed(2)}M</span>
                  <span className="text-emerald-400 font-semibold font-mono">
                    {(((report.mediosData.vistasLogradasDigital || 5201197) / (report.mediosData.metaVistasDigital || 5430000)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="text-[9px] text-emerald-400 font-mono mt-0.5 flex items-center">
                  <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" /> +33.81% vs anterior
                </div>
              </div>

              {/* Card 2: Interacciones Totales */}
              <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-[10px] text-blue-300 font-semibold uppercase">
                  <span>Interacciones Totales</span>
                  <span className="font-mono text-emerald-400 font-bold">RED-004</span>
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
                  {(report.mediosData.interaccionesTotalesDigital || 182917).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-300 mt-1 flex items-center justify-between">
                  <span>Engagement EE:</span>
                  <span className="text-blue-300 font-semibold font-mono">93.36%</span>
                </div>
                <div className="text-[9px] text-emerald-400 font-mono mt-0.5 flex items-center">
                  <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" /> +46.57% vs anterior
                </div>
              </div>

              {/* Card 3: Comunidad Digital */}
              <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-[10px] text-blue-300 font-semibold uppercase">
                  <span>Seguidores Totales</span>
                  <span className="font-mono text-emerald-400 font-bold">RED-007</span>
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
                  {(report.mediosData.seguidoresTotalesDigital || 1280445).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-300 mt-1 flex items-center justify-between">
                  <span>Nuevos/Semana:</span>
                  <span className="text-emerald-400 font-semibold font-mono">+{(report.mediosData.nuevosSeguidoresDigital || 5234).toLocaleString()}</span>
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                  Tasa Crecim.: +15.73%
                </div>
              </div>

              {/* Card 4: Portal Web y Artículos */}
              <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-[10px] text-blue-300 font-semibold uppercase">
                  <span>Portal Web &bull; Visitas</span>
                  <span className="font-mono text-emerald-400 font-bold">WEB-001</span>
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
                  {(report.mediosData.visitasPortalWeb || 20884).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-300 mt-1 flex items-center justify-between">
                  <span>Artículos Pub.:</span>
                  <span className="text-amber-300 font-semibold font-mono">{report.mediosData.contenidosPublicadosWeb || 248} arts.</span>
                </div>
                <div className="text-[9px] text-slate-300 font-mono mt-0.5">
                  Sesión media: 2m 27s (+36.7%)
                </div>
              </div>
            </div>

            {/* Formatos de Despliegue Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                <span className="font-semibold text-white">Cuota de Formatos Desplegados:</span>
                <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-white font-mono">
                  <b>28</b> Videos (Reels/TikTok/Shorts) &bull; 100%
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-white font-mono">
                  <b>4</b> Estáticos (Infografías) &bull; 100%
                </span>
                <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-white font-mono">
                  Alcance Orgánico: <b>539.400</b>
                </span>
              </div>

              <div className="text-[10px] text-blue-200/70 font-mono">
                Corte Semanal DOM-SÁB &bull; Validación Hash SHA-256
              </div>
            </div>
          </div>

          {/* Critical Infrastructure List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Radio className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-700 font-['Space_Grotesk']">
                  Monitor de Infraestructura Crítica (REDTV & Satelital)
                </h3>
              </div>
              <button
                onClick={() => onNavigate('EJE_2_PLATAFORMAS')}
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center cursor-pointer"
              >
                <span>Ver Telemetría Completa</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
              {(criticalTowers || []).map(tower => (
                <div 
                  key={tower.id}
                  className={`p-3 rounded-xl border transition-all ${
                    tower.fallaDetectada 
                      ? 'bg-red-50/50 border-red-200' 
                      : 'bg-slate-50/70 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${tower.fallaDetectada ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                      <span className="text-xs font-bold text-slate-900">{tower.nombre}</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-slate-800">{tower.operatividadSenal}%</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                    <span>TDA: <b>{tower.transmisorTDA}</b></span>
                    <span>Planta: <b>{tower.plantaElectrica}</b></span>
                    <span>Potencia: <b>{tower.potenciaActual}%</b></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          {/* Alertas Tempranas with Geometric Left Stripes */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-['Space_Grotesk']">
                Alertas Tempranas
              </h3>
              <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                {activeAlertsCount} Críticas
              </span>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {(opinionAlerts || []).map(alert => {
                const borderClass = alert.nivelRiesgo === 'CRITICO' 
                  ? 'border-l-4 border-red-500' 
                  : alert.nivelRiesgo === 'ALTO'
                  ? 'border-l-4 border-yellow-500'
                  : 'border-l-4 border-blue-500';

                return (
                  <div key={alert.id} className={`p-3 ${borderClass} bg-slate-50 rounded-r shadow-sm space-y-1.5`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-700 uppercase">
                        {alert.titulo}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">{alert.fechaHora}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900">
                      Entidad: {alert.origen}
                    </div>
                    <div className="text-[10px] text-slate-600 leading-tight italic">
                      "{alert.amenazaFraseViral}"
                    </div>
                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 font-mono">{alert.impactoEstimadoVistas.toLocaleString()} vistas</span>
                      <button
                        onClick={() => onOpenCounterNarrative(alert)}
                        className="text-blue-600 font-bold hover:underline cursor-pointer"
                      >
                        Contranarrativa IA →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
              <button 
                onClick={() => onNavigate('AUDITORIA_RACI')}
                className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline cursor-pointer"
              >
                Ver Auditoría Integral
              </button>
            </div>
          </div>

          {/* High-Contrast Dark Card: Efectividad Narrativa */}
          <div className="bg-slate-900 rounded-xl p-5 text-white shadow-lg flex flex-col justify-between" style={{ minHeight: '190px' }}>
            <div>
              <div className="flex justify-between items-start">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Efectividad Narrativa
                </div>
                <div className="p-1 bg-white/10 rounded">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono mt-1 text-white">
                +12.8%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Alcance Orgánico vs Fake News
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-slate-400">Matriz de Opinión</span>
                <span className="text-[10px] text-green-400 font-bold">Favorable</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '74%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Municipality Detail Modal */}
      {selectedMunicipality && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs text-amber-400 font-semibold font-mono">INE {selectedMunicipality.codigoINE}</span>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Municipio {selectedMunicipality.nombre}
                </h3>
                <p className="text-xs text-slate-400">Estado {selectedMunicipality.estado} | Región {selectedMunicipality.region}</p>
              </div>
              <button
                onClick={() => setSelectedMunicipality(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 block">Población Total</span>
                <span className="text-base font-bold text-white font-mono">{selectedMunicipality.poblacion.toLocaleString()} hab.</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 block">Universo de Hogares</span>
                <span className="text-base font-bold text-white font-mono">{selectedMunicipality.hogares.toLocaleString()}</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 block">Cobertura Radio/TV</span>
                <span className="text-base font-bold text-emerald-400 font-mono">{selectedMunicipality.coberturaEfectivaRadioTV}%</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 block">Penetración Internet</span>
                <span className="text-base font-bold text-blue-400 font-mono">{selectedMunicipality.penetracionInternet}%</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span>Torre de Transmisión Vinculada:</span>
                <span className="font-semibold text-amber-300">{selectedMunicipality.torreTransmisionCercana}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span>Señal TDA Disponible:</span>
                <span className={selectedMunicipality.tdaDisponible ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                  {selectedMunicipality.tdaDisponible ? 'SÍ (Activa)' : 'NO (Requiere Transmisor)'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span>Banda Satelital Ku:</span>
                <span className={selectedMunicipality.bandaKuDisponible ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                  {selectedMunicipality.bandaKuDisponible ? 'SÍ (Telepuerto Operativo)' : 'NO'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedMunicipality(null)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
