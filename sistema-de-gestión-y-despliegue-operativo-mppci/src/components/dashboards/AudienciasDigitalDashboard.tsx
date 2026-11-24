import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Users, 
  TrendingUp, 
  PlayCircle, 
  Share2, 
  RefreshCw, 
  Eye, 
  BarChart3, 
  ArrowUpRight, 
  CheckCircle2, 
  Tv, 
  Radio, 
  Sparkles,
  Layers,
  Sliders,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  BarChart, 
  Bar, 
  ScatterChart, 
  Scatter, 
  ZAxis, 
  Cell 
} from 'recharts';
import { 
  AudienciasDigitalDashboardData, 
  RendimientoViralEnte, 
  RACIRole 
} from '../../types';

interface AudienciasDigitalDashboardProps {
  currentRole: RACIRole;
}

export const AudienciasDigitalDashboard: React.FC<AudienciasDigitalDashboardProps> = ({
  currentRole
}) => {
  const [data, setData] = useState<AudienciasDigitalDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [canalStreamingFiltro, setCanalStreamingFiltro] = useState<string>('TODOS');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboards/digital');
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching digital dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const funnelData = (data?.funnelAudiencia || []).map(f => ({
    etapa: f.nombre,
    volumen: f.volumen,
    tasaConversion: f.tasaConversionEtapaAnterior,
    fuente: f.indicadorFuente
  }));

  const scatterData = (data?.matrizViralEntes || []).map(ente => ({
    x: ente.crecimientoSeguidoresPct,
    y: ente.tasaEngagement,
    z: Math.round(ente.impresionesTotales / 100000),
    name: ente.enteSiglas,
    impresiones: ente.impresionesTotales,
    categoria: ente.categoriaRendimiento
  }));

  const streamingData = (data?.concurrenciaEnVivo || []).filter(item => {
    if (canalStreamingFiltro === 'TODOS') return true;
    return item.canalPlataforma === canalStreamingFiltro;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & RACI Governance Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 border border-indigo-900/40 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-indigo-400">
              <Globe className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Tablero Táctico 3
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  Audiencias y Ecosistema Digital
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">
                Analítica de Ecosistema Digital y Audiencias Transmedia
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Monitoreo del alcance total [V1.4], visitas web [WEB-001], matriz de crecimiento vs engagement [RED-ENG] y concurrencia streaming [STR-001].
              </p>
            </div>
          </div>

          {/* RACI Governance Ribbon */}
          <div className="bg-slate-950/70 border border-indigo-800/30 rounded-xl p-3 flex flex-wrap items-center gap-3 text-xs">
            <div className="text-slate-400 text-[11px] font-semibold border-r border-slate-700 pr-2">
              Gobernanza RACI:
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">R</span>
              <span className="text-[11px] text-slate-300">Medios Digitales / CMs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">A</span>
              <span className="text-[11px] text-slate-300">Vicemin. Comunicación / Dir. Redes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">C</span>
              <span className="text-[11px] text-slate-300">Desarrolladores / Streaming</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center font-bold text-[10px]">I</span>
              <span className="text-[11px] text-slate-300">Ministro / Presidencias Entes</span>
            </div>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="mt-4 pt-4 border-t border-indigo-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Plataformas Streaming:</span>
            {['TODOS', 'YOUTUBE', 'PORTAL_SOBERANO', 'FACEBOOK', 'TWITCH'].map(ch => (
              <button
                key={ch}
                onClick={() => setCanalStreamingFiltro(ch)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  canalStreamingFiltro === ch 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sincronizar Métricas</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Audiencia Bruta Reach [V1.4]
            </div>
            <div className="text-2xl font-bold text-indigo-600 mt-1">
              {(data?.resumen.audienciaBrutaTotalReach || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Alcance cross-platform semanal
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Visitas Portales Web [WEB-001]
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {(data?.resumen.visitasTotalesWeb || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Sesiones únicas identificadas
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Engagement Ecosistema [RED-ENG]
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {data?.resumen.engagementPromedioEcosistema || 0}%
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Superior a la meta (7.5%)
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Pico Streaming PCV [STR-001]
            </div>
            <div className="text-2xl font-bold text-rose-600 mt-1">
              {(data?.resumen.picoMaximoConcurrenciaStreaming || 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Usuarios concurrentes en vivo
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <PlayCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Funnel Chart & Matriz de Crecimiento Viral */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Embudo de Audiencias (Funnel Visual) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span>Embudo de Conversión de Audiencias (Funnel Transmedia)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Desde el alcance masivo bruto [V1.4] hasta la interacción cívica activa [RED-ENG]
              </p>
            </div>

            <div className="space-y-3.5 my-2">
              {funnelData.map((f, i) => {
                const widths = ['100%', '82%', '64%', '46%'];
                const bgs = ['bg-indigo-600', 'bg-blue-600', 'bg-sky-600', 'bg-emerald-600'];

                return (
                  <div key={f.etapa} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">{f.etapa}</span>
                      <span className="text-slate-500">
                        {f.volumen.toLocaleString()} ({f.tasaConversion}% conv.)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-8 rounded-lg overflow-hidden flex items-center px-3 relative">
                      <div 
                        className={`h-full absolute left-0 top-0 rounded-lg ${bgs[i]} opacity-85 transition-all`} 
                        style={{ width: widths[i] }} 
                      />
                      <span className="relative z-10 text-white font-bold text-xs tracking-wide">
                        {f.fuente} : {f.volumen.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Ratio de Conversión Efectiva:</strong> El 2.87% del alcance bruto total se traduce en interacción ciudadana de alto valor pedagógico e institucional.
          </div>
        </div>

        {/* Right Column: Matriz de Crecimiento Viral (Scatter Plot 4 Cuadrantes) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-purple-600" />
                <span>Matriz de Crecimiento vs. Engagement por Ente</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Crecimiento de seguidores (%) vs. Tasa de Engagement [RED-ENG] (Burbujas: Impresiones)
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Crecimiento Seguidores" 
                    unit="%" 
                    tick={{ fontSize: 11 }}
                    label={{ value: 'Crecimiento (%)', position: 'bottom', offset: 0, fontSize: 11 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Engagement" 
                    unit="%" 
                    tick={{ fontSize: 11 }}
                    label={{ value: 'Engagement (%)', angle: -90, position: 'left', fontSize: 11 }}
                  />
                  <ZAxis type="number" dataKey="z" range={[80, 500]} name="Impresiones (x100k)" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    formatter={(val: any, name: any) => [val, name]}
                  />
                  <Scatter data={scatterData} fill="#6366f1">
                    {scatterData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.categoria === 'ALTO_ENG_ALTO_CREC' ? '#10b981' : '#6366f1'} 
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {(data?.matrizViralEntes || []).map(ente => (
              <div key={ente.enteId} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <div className="font-bold text-slate-900">{ente.enteSiglas}</div>
                <div className="text-[11px] text-slate-500">Eng: <strong>{ente.tasaEngagement}%</strong></div>
                <div className="text-[11px] text-emerald-600">+{ente.crecimientoSeguidoresPct}% crec.</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monitor de Concurrencia en Vivo (Live Area Chart) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PlayCircle className="w-4 h-4 text-rose-500" />
              <span>Monitor de Concurrencia en Vivo (Live Streaming) [STR-001]</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Usuarios simultáneos concurrentes (PCV) y horas totales de visualización
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            Transmisión Activa
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={streamingData}>
              <defs>
                <linearGradient id="colorPcv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorHoras" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area 
                yAxisId="left" 
                type="monotone" 
                dataKey="picoConcurrenciaPCV" 
                name="Pico Concurrencia (PCV)" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorPcv)" 
              />
              <Area 
                yAxisId="right" 
                type="monotone" 
                dataKey="horasVisualizacionAcumuladas" 
                name="Horas Visualización" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorHoras)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
