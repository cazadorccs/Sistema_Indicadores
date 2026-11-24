import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  TrendingDown, 
  Activity, 
  Clock, 
  MessageSquareWarning, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  RefreshCw, 
  Send,
  Eye,
  Sliders,
  Radio,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  PlusCircle,
  X,
  FileCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  CiberdefensaDashboardData, 
  AmenazaViralDA01, 
  RACIRole 
} from '../../types';

interface CiberdefensaDashboardProps {
  currentRole: RACIRole;
  onOpenCounterNarrative?: (alert: any) => void;
}

export const CiberdefensaDashboard: React.FC<CiberdefensaDashboardProps> = ({
  currentRole,
  onOpenCounterNarrative
}) => {
  const [data, setData] = useState<CiberdefensaDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filtroSeveridad, setFiltroSeveridad] = useState<string>('TODAS');
  const [selectedAmenaza, setSelectedAmenaza] = useState<AmenazaViralDA01 | null>(null);
  const [notifSuccess, setNotifSuccess] = useState<string | null>(null);
  const [isNewAmenazaOpen, setIsNewAmenazaOpen] = useState(false);
  const [submittingAmenaza, setSubmittingAmenaza] = useState(false);

  const [newAmenaza, setNewAmenaza] = useState({
    titulo: '',
    tematica: 'Servicios Públicos',
    origenPlataforma: 'X / Twitter',
    estadoAfectado: 'Distrito Capital',
    municipioAfectado: 'Libertador',
    nivelRiesgo: 'ALTO' as 'BAJO' | 'MEDIO' | 'ALTO' | 'CRITICO',
    volumenMenciones: 2500,
    impactoEstimadoVistas: 35000,
    tiempoRespuestaMinutos: 45,
    contranarrativaActiva: 'Despliegue de cuadrillas técnicas y reporte en tiempo real de normalización de servicio.'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboards/ciberdefensa');
      const json = await res.json();
      if (json.success) {
        setData(json);
        if (json.amenazas && json.amenazas.length > 0) {
          setSelectedAmenaza(json.amenazas[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching ciberdefensa dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNeutralizar = async (amenazaId: string) => {
    try {
      const res = await fetch('/api/dashboards/ciberdefensa/neutralizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amenazaId,
          accion: 'MARCAR_NEUTRALIZADA'
        })
      });
      const result = await res.json();
      if (result.success) {
        setNotifSuccess(`Amenaza ${amenazaId} clasificada como neutralizada.`);
        setTimeout(() => setNotifSuccess(null), 4000);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAprobarContranarrativa = async (amenazaId: string, contranarrativaText: string) => {
    try {
      const res = await fetch('/api/dashboards/ciberdefensa/aprobar-contranarrativa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amenazaId,
          contranarrativa: contranarrativaText,
          aprobadoPor: currentRole === 'MAXIMA_AUTORIDAD' ? 'Ministro(a) MPPCI' : 'Viceministro(a) Gestión Comunicacional'
        })
      });
      const result = await res.json();
      if (result.success) {
        setNotifSuccess(`Contranarrativa oficial aprobada y sellada para la matriz ${amenazaId}.`);
        setTimeout(() => setNotifSuccess(null), 4000);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCrearAmenazaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingAmenaza(true);
      const res = await fetch('/api/dashboards/ciberdefensa/amenaza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAmenaza,
          horaDeteccion: new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }),
          reportadoPor: `${currentRole} - Sala Situacional`
        })
      });
      const result = await res.json();
      if (result.success) {
        setNotifSuccess(`¡Alerta ${result.amenaza?.id || ''} ingresada y priorizada en el radar!`);
        setIsNewAmenazaOpen(false);
        setNewAmenaza({
          titulo: '',
          tematica: 'Servicios Públicos',
          origenPlataforma: 'X / Twitter',
          estadoAfectado: 'Distrito Capital',
          municipioAfectado: 'Libertador',
          nivelRiesgo: 'ALTO',
          volumenMenciones: 2500,
          impactoEstimadoVistas: 35000,
          tiempoRespuestaMinutos: 45,
          contranarrativaActiva: 'Despliegue de cuadrillas técnicas y reporte en tiempo real de normalización de servicio.'
        });
        setTimeout(() => setNotifSuccess(null), 5000);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      alert('Error registrando amenaza.');
    } finally {
      setSubmittingAmenaza(false);
    }
  };

  const amenazasFiltradas = (data?.amenazas || []).filter(a => {
    if (filtroSeveridad === 'TODAS') return true;
    return a.nivelRiesgo === filtroSeveridad;
  });

  const pieColors = ['#10b981', '#3b82f6', '#ef4444'];
  const pieData = data?.sentimientoNLP ? [
    { name: 'Oficial SNMP', value: data.sentimientoNLP.shareOfVoice.oficialSNMP },
    { name: 'Medios Aliados', value: data.sentimientoNLP.shareOfVoice.mediosIndependientes },
    { name: 'Narrativa Adversa', value: data.sentimientoNLP.shareOfVoice.narrativaAdversa }
  ] : [];

  const sentimentData = data?.sentimientoNLP ? [
    { name: 'Sentimiento Digital', Positivo: data.sentimientoNLP.porcentajePositivo, Neutro: data.sentimientoNLP.porcentajeNeutro, Negativo: data.sentimientoNLP.porcentajeNegativo }
  ] : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & RACI Governance Badge */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-2xl p-6 border border-rose-900/40 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-rose-600/20 border border-rose-500/40 rounded-xl text-rose-400">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">
                  Tablero Táctico 1
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Control de Entorno Geopolítico
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">
                Sala Situacional y Ciberdefensa
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Monitoreo en tiempo cuasi-real de tendencias desestabilizadoras [DA-01], curva de neutralización [TRMD] y balance de sentimiento [ID-09].
              </p>
            </div>
          </div>

          {/* RACI Governance Ribbon */}
          <div className="bg-slate-950/70 border border-rose-800/30 rounded-xl p-3 flex flex-wrap items-center gap-3 text-xs">
            <div className="text-slate-400 text-[11px] font-semibold border-r border-slate-700 pr-2">
              Gobernanza RACI:
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">R</span>
              <span className="text-[11px] text-slate-300">Sala Situacional / Monitoreo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">A</span>
              <span className="text-[11px] text-slate-300">Vicemin. Planificación</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">C</span>
              <span className="text-[11px] text-slate-300">Ciberseguridad / DGCIM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center font-bold text-[10px]">I</span>
              <span className="text-[11px] text-slate-300">Ministro / Presidencia</span>
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="mt-4 pt-4 border-t border-rose-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Filtrar Severidad:</span>
            {['TODAS', 'CRITICO', 'ALTO', 'MEDIO'].map(sev => (
              <button
                key={sev}
                onClick={() => setFiltroSeveridad(sev)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  filtroSeveridad === sev 
                    ? 'bg-rose-600 text-white shadow-sm' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {(currentRole === 'DIRECTOR_OPERACIONES' || currentRole === 'MAXIMA_AUTORIDAD') && (
              <button
                onClick={() => setIsNewAmenazaOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-lg font-bold transition-all cursor-pointer shadow-md border border-rose-400/40"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Registrar Alerta [DA-01]</span>
              </button>
            )}

            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar Telemetría</span>
            </button>
          </div>
        </div>
      </div>

      {notifSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notifSuccess}</span>
        </div>
      )}

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Amenazas Activas [DA-01]
            </div>
            <div className="text-2xl font-bold text-rose-600 mt-1">
              {data?.resumen.amenazasActivas || 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {data?.resumen.amenazasCriticas || 0} de severidad crítica
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Tasa Neutralización
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {data?.resumen.tasaNeutralizacionGlobal || 0}%
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Efectividad favorable
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Tiempo Respuesta [TRMD]
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {data?.resumen.tiempoPromedioRespuestaMinutos || 0} min
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Meta normativa: &lt; 60 min
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Balance Sentimiento [IBS]
            </div>
            <div className="text-2xl font-bold text-indigo-600 mt-1">
              +{data?.resumen.balanceSentimientoNeto || 0} pts
            </div>
            <div className="text-[11px] text-indigo-700 mt-0.5 font-medium">
              Hegemonía favorable (&gt; 20)
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Heatmap Termómetro de Amenazas & Curva de Neutralización */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Termómetro de Amenazas (Heatmap list & details) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span>Termómetro de Amenazas y Focos de Desestabilización [DA-01]</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Matrices virales detectadas por geolocalización, plataforma y estimación de impacto
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {amenazasFiltradas.length} Focos
              </span>
            </div>

            <div className="space-y-3">
              {amenazasFiltradas.map(amenaza => {
                const isSelected = selectedAmenaza?.id === amenaza.id;
                const riskColor = 
                  amenaza.nivelRiesgo === 'CRITICO' ? 'border-rose-500 bg-rose-50/40 text-rose-800' :
                  amenaza.nivelRiesgo === 'ALTO' ? 'border-amber-500 bg-amber-50/40 text-amber-800' :
                  'border-blue-500 bg-blue-50/40 text-blue-800';

                const badgeBg = 
                  amenaza.nivelRiesgo === 'CRITICO' ? 'bg-rose-600 text-white' :
                  amenaza.nivelRiesgo === 'ALTO' ? 'bg-amber-600 text-white' :
                  'bg-blue-600 text-white';

                return (
                  <div
                    key={amenaza.id}
                    onClick={() => setSelectedAmenaza(amenaza)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected ? `${riskColor} shadow-md ring-2 ring-rose-500/20` : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${badgeBg}`}>
                            {amenaza.nivelRiesgo}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-800">
                            {amenaza.origenPlataforma}
                          </span>
                          <span className="text-xs text-slate-500">
                            {amenaza.estadoAfectado} ({amenaza.municipioAfectado})
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {amenaza.titulo}
                        </h4>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-slate-800">
                          {amenaza.impactoEstimadoVistas.toLocaleString()} vistas
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {amenaza.volumenMenciones.toLocaleString()} menciones
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        TRMD: <strong>{amenaza.tiempoRespuestaMinutos} min</strong>
                      </span>
                      <span className="text-[11px] font-semibold text-rose-700">
                        Estatus: {amenaza.estadoNeutralizacion.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Threat Inspection / Counter Narrative Trigger */}
          {selectedAmenaza && (
            <div className="mt-5 p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                  Respuesta Inmediata: {selectedAmenaza.id}
                </span>
                <span className="text-xs text-slate-400">
                  Detectado: {selectedAmenaza.horaDeteccion}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                {selectedAmenaza.contranarrativaActiva || 'Pendiente generación y refrendo de contranarrativa oficial.'}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {onOpenCounterNarrative && (
                  <button
                    onClick={() => onOpenCounterNarrative({
                      id: selectedAmenaza.id,
                      titulo: selectedAmenaza.titulo,
                      amenazaFraseViral: selectedAmenaza.titulo,
                      impactoVistas: selectedAmenaza.impactoEstimadoVistas,
                      tematica: selectedAmenaza.tematica,
                      origen: selectedAmenaza.origenPlataforma,
                      estado: 'ACTIVA' as any
                    })}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generar Contranarrativa con IA</span>
                  </button>
                )}

                {(currentRole === 'VICEMINISTRO' || currentRole === 'MAXIMA_AUTORIDAD') && (
                  <button
                    onClick={() => handleAprobarContranarrativa(selectedAmenaza.id, selectedAmenaza.contranarrativaActiva || 'Despliegue de contranarrativa institucional validada.')}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Aprobar Contranarrativa (Rol A)</span>
                  </button>
                )}

                {selectedAmenaza.estadoNeutralizacion !== 'NEUTRALIZADA' && (
                  <button
                    onClick={() => handleNeutralizar(selectedAmenaza.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Marcar como Neutralizada</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Curva de Neutralización (Line Chart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-blue-600" />
                <span>Curva de Neutralización Comunicacional [TRMD]</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Volumen de propagación hostil vs. Tasa de despliegue institucional
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.curvaNeutralizacion || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="minutoRelativo" unit="m" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" unit="%" tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="volumenMatrizAdversa" 
                    name="Volumen Hostil" 
                    stroke="#ef4444" 
                    strokeWidth={2.5} 
                    dot={{ r: 3 }}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="tasaRespuestaInstitucional" 
                    name="Respuesta (%)" 
                    stroke="#10b981" 
                    strokeWidth={2.5} 
                    dot={{ r: 3 }}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="despliegueContranarrativa" 
                    name="Despliegue Contranarrativa (%)" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-800">Interpretación Táctica:</span> El punto de inflexión donde la respuesta institucional superó a la matriz hostil se produjo a los <strong>38 minutos</strong> de emisión, conteniendo el pico viral por debajo de las 10.000 interacciones concurrentes.
          </div>
        </div>
      </div>

      {/* Share of Voice y Análisis de Sentimiento NLP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Share of Voice Donut */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-purple-600" />
              <span>Share of Voice Institucional [V1.1]</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Porcentaje de participación discursiva en la conversación pública
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NLP Sentiment Bar */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessageSquareWarning className="w-4 h-4 text-indigo-600" />
                <span>Análisis de Sentimiento Digital NLP [ID-09]</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Procesamiento de Lenguaje Natural sobre 345.000 menciones directas e indirectas
              </p>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Positivo" fill="#10b981" stackId="a" />
                  <Bar dataKey="Neutro" fill="#94a3b8" stackId="a" />
                  <Bar dataKey="Negativo" fill="#ef4444" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center mt-3 pt-3 border-t border-slate-100">
            <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
              <div className="text-[10px] font-bold text-emerald-800 uppercase">Favorable</div>
              <div className="text-base font-bold text-emerald-700">58.5%</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
              <div className="text-[10px] font-bold text-slate-700 uppercase">Informativo/Neutro</div>
              <div className="text-base font-bold text-slate-700">17.5%</div>
            </div>
            <div className="p-2 rounded-lg bg-rose-50 border border-rose-100">
              <div className="text-[10px] font-bold text-rose-800 uppercase">Hostil/Adverso</div>
              <div className="text-base font-bold text-rose-700">24.0%</div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL REGISTRAR ALERTA [DA-01] */}
      {isNewAmenazaOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl max-w-xl w-full p-6 text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Registrar Alerta Temprana [DA-01]
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sala Situacional y Ciberdefensa | Rol RACI R
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNewAmenazaOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCrearAmenazaSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Vector / Frase Viral Adversa:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Matriz de desinformación sobre falla en sistema eléctrico de Occidente"
                  value={newAmenaza.titulo}
                  onChange={e => setNewAmenaza({ ...newAmenaza, titulo: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Plataforma Origen:</label>
                  <select
                    value={newAmenaza.origenPlataforma}
                    onChange={e => setNewAmenaza({ ...newAmenaza, origenPlataforma: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="X / Twitter">X / Twitter</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Telegram">Telegram</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Portales Digitales">Portales Digitales</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nivel de Riesgo:</label>
                  <select
                    value={newAmenaza.nivelRiesgo}
                    onChange={e => setNewAmenaza({ ...newAmenaza, nivelRiesgo: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="BAJO">BAJO</option>
                    <option value="MEDIO">MEDIO</option>
                    <option value="ALTO">ALTO</option>
                    <option value="CRITICO">CRITICO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estado / Región:</label>
                  <input
                    type="text"
                    required
                    value={newAmenaza.estadoAfectado}
                    onChange={e => setNewAmenaza({ ...newAmenaza, estadoAfectado: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Municipio / Territorio:</label>
                  <input
                    type="text"
                    required
                    value={newAmenaza.municipioAfectado}
                    onChange={e => setNewAmenaza({ ...newAmenaza, municipioAfectado: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Volumen Menciones:</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newAmenaza.volumenMenciones}
                    onChange={e => setNewAmenaza({ ...newAmenaza, volumenMenciones: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Impacto Vistas Estimadas:</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newAmenaza.impactoEstimadoVistas}
                    onChange={e => setNewAmenaza({ ...newAmenaza, impactoEstimadoVistas: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contranarrativa Institucional Propuesta:</label>
                <textarea
                  rows={2}
                  required
                  value={newAmenaza.contranarrativaActiva}
                  onChange={e => setNewAmenaza({ ...newAmenaza, contranarrativaActiva: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewAmenazaOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submittingAmenaza}
                  className="px-5 py-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
                >
                  {submittingAmenaza ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Registrando...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Ingresar al Radar [DA-01]</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
