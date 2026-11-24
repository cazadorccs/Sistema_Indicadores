import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  Radio, 
  Tv, 
  Globe, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  ChevronRight, 
  Sliders, 
  Printer, 
  Layers, 
  Send, 
  Flame, 
  Server, 
  Share2, 
  Eye,
  Lock,
  UserCheck,
  Key,
  Hash,
  Copy,
  Check,
  Award,
  X
} from 'lucide-react';
import { 
  ExecutiveCLevelDashboardData, 
  MacroIndicadorCLevel, 
  RACIRole, 
  IndicatorModule 
} from '../../types';

interface ExecutiveSinglePaneDashboardProps {
  currentRole: RACIRole;
  onNavigate: (module: IndicatorModule) => void;
  onOpenAIStrategicBrief?: () => void;
  onOpenBoletinEjecutivo?: () => void;
}

export const ExecutiveSinglePaneDashboard: React.FC<ExecutiveSinglePaneDashboardProps> = ({
  currentRole,
  onNavigate,
  onOpenAIStrategicBrief,
  onOpenBoletinEjecutivo
}) => {
  const [data, setData] = useState<ExecutiveCLevelDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefrendoModalOpen, setIsRefrendoModalOpen] = useState(false);
  const [isHistorialModalOpen, setIsHistorialModalOpen] = useState(false);
  const [sellosHistoricos, setSellosHistoricos] = useState<any[]>([]);
  const [ultimoSello, setUltimoSello] = useState<any | null>(null);
  const [submittingRefrendo, setSubmittingRefrendo] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [refrendoForm, setRefrendoForm] = useState({
    firmante: currentRole === 'MAXIMA_AUTORIDAD' ? 'Freddy Ñáñez' : 'Viceministro de Gestión Comunicacional',
    cargo: currentRole === 'MAXIMA_AUTORIDAD' 
      ? 'Ministro del Poder Popular para la Comunicación e Información' 
      : 'Viceministro de Planificación y Estrategia Comunicacional',
    cedula: 'V-14.892.341',
    comentarios: 'Corte semanal revisado y refrendado conforme a los estándares de efectividad comunicacional y resiliencia de la plataforma del Estado.'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboards/c-level');
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching C-level dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSellos = async () => {
    try {
      const res = await fetch('/api/dashboards/c-level/sellos-historicos');
      const json = await res.json();
      if (json.success && json.sellos) {
        setSellosHistoricos(json.sellos);
        if (json.sellos.length > 0) {
          setUltimoSello(json.sellos[0]);
        }
      }
    } catch (e) {
      console.warn('Error fetching sellos:', e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSellos();
  }, []);

  const handleRefrendar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingRefrendo(true);
      const res = await fetch('/api/dashboards/c-level/refrendo-ministerial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          semanaEpidemiologica: data?.resumenEjecutivo.semanaEpidemiologica || 35,
          firmante: refrendoForm.firmante,
          cargo: refrendoForm.cargo,
          cedula: refrendoForm.cedula,
          rol: currentRole,
          comentarios: refrendoForm.comentarios
        })
      });

      const result = await res.json();
      if (result.success && result.sello) {
        setUltimoSello(result.sello);
        setToastMsg(`¡Sello Criptográfico ${result.sello.selloId} generado con éxito!`);
        setIsRefrendoModalOpen(false);
        fetchSellos();
        setTimeout(() => setToastMsg(null), 5000);
      } else {
        alert(result.error || 'No se pudo generar el refrendo ministerial.');
      }
    } catch (err) {
      console.error(err);
      alert('Error en conexión al refrendar.');
    } finally {
      setSubmittingRefrendo(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 3000);
  };

  const canSign = currentRole === 'MAXIMA_AUTORIDAD' || currentRole === 'VICEMINISTRO';

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Single Pane of Glass C-Level */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 rounded-2xl p-6 border border-amber-500/30 shadow-2xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-slate-950 shadow-lg font-black text-xl">
              C-1
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  Tablero Estratégico 5
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Single Pane of Glass
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Despacho Ministerial / Presidencia
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">
                Dashboard Ejecutivo de Alto Nivel
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Centro de mando integral con los 8 macroindicadores críticos de efectividad comunicacional, resiliencia y alerta situacional nacional.
              </p>
            </div>
          </div>
        </div>

        {/* Action Header */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Semana Epidemiológica:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 font-bold text-white">
              N° {data?.resumenEjecutivo.semanaEpidemiologica || 35}
            </span>
            <span className="text-slate-400 ml-2">Corte:</span>
            <span className="text-slate-200 font-medium">{data?.resumenEjecutivo.fechaCorte}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenAIStrategicBrief && (
              <button
                onClick={onOpenAIStrategicBrief}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg font-bold transition-all cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Síntesis con IA</span>
              </button>
            )}

            {onOpenBoletinEjecutivo && (
              <button
                onClick={onOpenBoletinEjecutivo}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-lg font-bold transition-all cursor-pointer shadow-md"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Boletín Presidencial PDF</span>
              </button>
            )}

            {canSign && (
              <button
                onClick={() => setIsRefrendoModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg font-bold transition-all cursor-pointer shadow-md border border-emerald-400/40"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Refrendo Ministerial (SHA-256)</span>
              </button>
            )}

            <button
              onClick={() => setIsHistorialModalOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg transition-all cursor-pointer border border-amber-500/30"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Sellos ({sellosHistoricos.length})</span>
            </button>

            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* SELLO CRIPTOGRÁFICO MINISTERIAL INMUTABLE BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 rounded-2xl p-5 border border-amber-500/30 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Gobernanza RACI: Rol A / I
                </span>
                <span className="text-[10px] text-slate-400">
                  Protocolo de Sellado SHA-256 Inmutable
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Certificación y Refrendo Ministerial de Semana N° {data?.resumenEjecutivo.semanaEpidemiologica || 35}
              </h3>
              {ultimoSello ? (
                <div className="mt-2 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-amber-300 bg-slate-950 px-2 py-1 rounded border border-amber-500/40">
                      {ultimoSello.selloId}
                    </span>
                    <span className="text-slate-300 text-[11px]">
                      Firmado por <strong>{ultimoSello.firmante}</strong> ({ultimoSello.cargo}) - Cédula: {ultimoSello.cedula}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Hash className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-mono text-[10px] text-slate-300 truncate max-w-xl">
                      {ultimoSello.sha256}
                    </span>
                    <button
                      onClick={() => copyToClipboard(ultimoSello.sha256)}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] flex items-center gap-1 transition-all cursor-pointer border border-slate-700 shrink-0"
                    >
                      {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedHash ? 'Copiado' : 'Copiar Hash'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-300 mt-1">
                  El corte actual no cuenta con refrendo criptográfico ministerial formal. La Máxima Autoridad (Rol RACI A) puede emitir la firma digital vinculante para congelar e indexar la medición.
                </p>
              )}
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            {canSign && !ultimoSello && (
              <button
                onClick={() => setIsRefrendoModalOpen(true)}
                className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Key className="w-4 h-4" />
                <span>Firmar Ahora</span>
              </button>
            )}
            {ultimoSello && (
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Refrendado y Sellado</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* AI Executive Assessment & Direct Action Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Diagnóstico Estratégico Automatizado (Motor Heurístico VSCC)
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {data?.resumenEjecutivo.sintesisIA}
          </p>
          <div className="text-xs text-amber-800 bg-amber-50 border border-amber-200/80 p-2.5 rounded-xl font-medium">
            <strong>Recomendación Prioritaria:</strong> {data?.resumenEjecutivo.recomendacionPrioritaria}
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Semáforo de Gestión de Estado
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-2 flex items-center justify-center gap-2">
            <span className="w-4 h-4 rounded-full bg-emerald-500" />
            <span>ESTABLE / ÓPTIMO</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            8 de 8 macro-indicadores en umbral favorable
          </div>
        </div>
      </div>

      {/* THE 8 MACRO-INDICATORS GRID */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-600" />
            <span>Los 8 Macro-Indicadores de Estado (Consolidados en Tiempo Real)</span>
          </h2>
          <span className="text-xs text-slate-500">
            Escala normalizada y auditable
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(data?.macroIndicadores || []).map((macro, idx) => {
            const isIec = macro.codigo === 'IEC';
            const cardBg = isIec 
              ? 'border-amber-400 bg-gradient-to-br from-amber-50/60 to-white ring-2 ring-amber-400/30' 
              : 'border-slate-200 bg-white';

            return (
              <div key={macro.id} className={`p-4 rounded-xl border ${cardBg} shadow-sm space-y-2 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isIec ? 'bg-amber-600 text-white' : 'bg-slate-900 text-white'
                    }`}>
                      {macro.codigo}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
                      {macro.deltaSemanaAnterior > 0 ? (
                        <>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          +{macro.deltaSemanaAnterior}{macro.unidad}
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          {macro.deltaSemanaAnterior}{macro.unidad}
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                    {macro.nombre}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                    {macro.descripcionCorta}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-black ${isIec ? 'text-amber-700' : 'text-slate-900'}`}>
                      {typeof macro.valor === 'number' && macro.unidad === 'indice' ? macro.valor.toFixed(3) : macro.valor}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {macro.unidad}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 text-right">
                    Meta: <strong>{macro.meta}{macro.unidad}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alertas Críticas Directas a Presidencia */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Línea Directa de Contingencias Presidenciales</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Eventos que requieren conocimiento inmediato de la Máxima Autoridad del Estado
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700">
            {data?.alertasDirectasPresidencia.length || 0} Alertas
          </span>
        </div>

        <div className="space-y-3">
          {(data?.alertasDirectasPresidencia || []).map(alr => (
            <div key={alr.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    alr.severidad === 'ALTO' ? 'bg-amber-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {alr.severidad}
                  </span>
                  <span className="font-bold text-slate-900">{alr.titulo}</span>
                  <span className="text-slate-400 text-[11px]">({alr.ente} - {alr.fecha})</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  {alr.descripcion}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] font-semibold text-slate-800 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  {alr.accionRequerida}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navegación Rápida a los 4 Tableros Especializados */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800 text-white">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Navegación Táctica hacia Tableros Especializados</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Acceso directo a las vistas operativas e instrumentales interconectadas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('DASHBOARD_CIBERDEFENSA')}
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <Flame className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </div>
            <div className="font-bold text-xs text-white mt-2">1. Ciberdefensa</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Amenazas [DA-01] y TRMD</div>
          </button>

          <button
            onClick={() => onNavigate('DASHBOARD_NOC')}
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <Server className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </div>
            <div className="font-bold text-xs text-white mt-2">2. NOC & Telecom</div>
            <div className="text-[11px] text-slate-400 mt-0.5">TDA [RTV-001] y MTTR</div>
          </button>

          <button
            onClick={() => onNavigate('DASHBOARD_DIGITAL')}
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <Globe className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </div>
            <div className="font-bold text-xs text-white mt-2">3. Audiencias Digital</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Reach [V1.4] y Streaming</div>
          </button>

          <button
            onClick={() => onNavigate('DASHBOARD_OPERATIVIDAD')}
            className="p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <Tv className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform" />
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </div>
            <div className="font-bold text-xs text-white mt-2">4. Medios & Pauta</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Pases [TV-008] y Muro Eje 1</div>
          </button>
        </div>
      </div>

      {/* MODAL DE REFRENDO MINISTERIAL Y FIRMA CRIPTOGRÁFICA SHA-256 */}
      {isRefrendoModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 text-white shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Refrendo Ministerial y Sellado Criptográfico
                  </h3>
                  <p className="text-xs text-slate-400">
                    Semana Epidemiológica N° {data?.resumenEjecutivo.semanaEpidemiologica || 35} | Protocolo SHA-256
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRefrendoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRefrendar} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl text-amber-200 text-xs">
                <strong>Aviso Legal y de Gobernanza:</strong> El refrendo ministerial genera un hash SHA-256 inmutable derivado de las métricas consolidadas (IEC, IRT, ICD, EE). Esta acción certifica ante la Presidencia de la República el estado oficial de la medición.
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nombre de la Autoridad Firmante (Rol RACI A):
                </label>
                <input
                  type="text"
                  required
                  value={refrendoForm.firmante}
                  onChange={e => setRefrendoForm({ ...refrendoForm, firmante: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cargo Institucional:</label>
                  <input
                    type="text"
                    required
                    value={refrendoForm.cargo}
                    onChange={e => setRefrendoForm({ ...refrendoForm, cargo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cédula / Credencial:</label>
                  <input
                    type="text"
                    required
                    value={refrendoForm.cedula}
                    onChange={e => setRefrendoForm({ ...refrendoForm, cedula: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Dictamen / Observaciones Ministeriales:</label>
                <textarea
                  rows={3}
                  required
                  value={refrendoForm.comentarios}
                  onChange={e => setRefrendoForm({ ...refrendoForm, comentarios: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRefrendoModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submittingRefrendo}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg transition-all cursor-pointer shadow-lg flex items-center gap-2"
                >
                  {submittingRefrendo ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sellando Criptográficamente...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Estampar Firma y Generar Sello</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE HISTORIAL DE SELLOS CRIPTOGRÁFICOS */}
      {isHistorialModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-3xl w-full p-6 text-white shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Libro de Sellos Criptográficos Ministeriales (SHA-256)
                </h3>
              </div>
              <button
                onClick={() => setIsHistorialModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 pr-1 grow text-xs">
              {sellosHistoricos.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  No hay sellos históricos emitidos aún.
                </div>
              ) : (
                sellosHistoricos.map((s, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded text-[11px]">
                          {s.selloId}
                        </span>
                        <span className="font-bold text-white">Semana {s.semanaEpidemiologica}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(s.timestamp).toLocaleString('es-VE')}
                      </span>
                    </div>

                    <div className="text-slate-300">
                      Firmado por <strong>{s.firmante}</strong> ({s.cargo}) - C.I. {s.cedula}
                    </div>

                    <div className="p-2 bg-slate-900 rounded font-mono text-[10px] text-slate-300 break-all border border-slate-800 flex items-center justify-between gap-2">
                      <span>{s.sha256}</span>
                      <button
                        onClick={() => copyToClipboard(s.sha256)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded shrink-0 transition-colors cursor-pointer"
                      >
                        Copiar
                      </button>
                    </div>

                    <div className="text-slate-400 italic text-[11px]">
                      "{s.comentarios}"
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end shrink-0">
              <button
                onClick={() => setIsHistorialModalOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cerrar Historial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
