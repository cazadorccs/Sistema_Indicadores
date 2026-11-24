import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Radio, 
  Tv, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Wifi, 
  RefreshCw,
  MapPin,
  Flame,
  ArrowUpRight,
  Shield,
  Layers,
  Sliders,
  CheckCircle,
  XCircle,
  PlusCircle,
  X,
  Wrench
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  NocInfraestructuraDashboardData, 
  NodoTransmisionGeo, 
  RACIRole 
} from '../../types';

interface NocInfraestructuraDashboardProps {
  currentRole: RACIRole;
}

export const NocInfraestructuraDashboard: React.FC<NocInfraestructuraDashboardProps> = ({
  currentRole
}) => {
  const [data, setData] = useState<NocInfraestructuraDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNodo, setSelectedNodo] = useState<NodoTransmisionGeo | null>(null);
  const [isIncidenciaModalOpen, setIsIncidenciaModalOpen] = useState(false);
  const [submittingIncidencia, setSubmittingIncidencia] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [incidenciaForm, setIncidenciaForm] = useState({
    torreId: 'T-01',
    nombreEstacion: 'Torre Mecedores (Caracas)',
    estado: 'ALERTA_TECNICA' as 'OPERATIVA' | 'ALERTA_TECNICA' | 'FALLA_CRITICA' | 'MANTENIMIENTO',
    mttrHoras: 2.5,
    tipoFalla: 'Fluctuación de Tensión Eléctrica (CORPOELEC)',
    cuadrillaAsignada: 'Cuadrilla Central REDTV / CANTV',
    observaciones: 'Respaldo con motogenerador auxiliar activado mientras se restablece alimentador principal.'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboards/noc');
      const json = await res.json();
      if (json.success) {
        setData(json);
        if (json.nodos && json.nodos.length > 0) {
          setSelectedNodo(json.nodos[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching NOC dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIncidenciaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingIncidencia(true);
      const res = await fetch('/api/dashboards/noc/incidencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          torreId: incidenciaForm.torreId,
          nombreEstacion: incidenciaForm.nombreEstacion,
          estado: incidenciaForm.estado,
          mttrHoras: Number(incidenciaForm.mttrHoras),
          tipoFalla: incidenciaForm.tipoFalla,
          cuadrillaAsignada: incidenciaForm.cuadrillaAsignada,
          observaciones: incidenciaForm.observaciones,
          reportadoPor: `${currentRole} - Sala Técnica NOC`
        })
      });

      const result = await res.json();
      if (result.success) {
        setToastMsg(`Incidencia en ${incidenciaForm.nombreEstacion} registrada y propagada al NOC.`);
        setIsIncidenciaModalOpen(false);
        setTimeout(() => setToastMsg(null), 5000);
        fetchData();
      } else {
        alert(result.error || 'Error registrando incidencia.');
      }
    } catch (err) {
      console.error(err);
      alert('Error en conexión con el servidor NOC.');
    } finally {
      setSubmittingIncidencia(false);
    }
  };

  const mttrChartData = (data?.timelineMTTR || []).map(item => ({
    estacion: item.estacion.replace('Torre ', '').replace('Estación ', ''),
    mttrMinutos: item.mttrMinutos,
    estado: item.estado,
    estatus: item.estatus
  }));

  const canReportIncidencia = currentRole === 'DIRECTOR_OPERACIONES' || currentRole === 'VICEMINISTRO' || currentRole === 'MAXIMA_AUTORIDAD';

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & RACI Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 border border-blue-900/40 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-600/20 border border-blue-500/40 rounded-xl text-blue-400">
              <Server className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Tablero Operativo 2
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Infraestructura y Telecomunicaciones
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">
                Centro de Operaciones de Red (NOC) e Infraestructura
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Monitoreo continuo de operatividad nacional TDA [RTV-001], servicios activos [RTV-002], telepuerto Banda Ku [RTV-009] y MTTR de caídas [TMR].
              </p>
            </div>
          </div>

          {/* RACI Ribbon */}
          <div className="bg-slate-950/70 border border-blue-800/30 rounded-xl p-3 flex flex-wrap items-center gap-3 text-xs">
            <div className="text-slate-400 text-[11px] font-semibold border-r border-slate-700 pr-2">
              Gobernanza RACI:
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">R</span>
              <span className="text-[11px] text-slate-300">REDTV / CONATEL Ops</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">A</span>
              <span className="text-[11px] text-slate-300">Presidente REDTV / Dir. CONATEL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">C</span>
              <span className="text-[11px] text-slate-300">Cuadrillas / CORPOELEC / CANTV</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center font-bold text-[10px]">I</span>
              <span className="text-[11px] text-slate-300">Ministro / Presidencia</span>
            </div>
          </div>
        </div>

        {/* Action Header */}
        <div className="mt-4 pt-4 border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Telemetría REDTV / Master en Vivo
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">
              Estaciones Monitoreadas: <strong>{data?.nodos.length || 0} Nodos Estratégicos</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {canReportIncidencia && (
              <button
                onClick={() => setIsIncidenciaModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-bold transition-all cursor-pointer shadow-md border border-blue-400/40"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Reportar / Actualizar Incidencia</span>
              </button>
            )}

            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refrescar Telemetría</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-xs font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* 4 NOC Summary Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Operatividad TDA [RTV-001]
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {data?.resumen.operatividadNacionalTDA || 0}%
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Cobertura óptima nacional
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Tv className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Servicios TV Activos [RTV-002]
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {data?.resumen.totalServiciosTvActivos || 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Múltiplex de canales públicos y aliados
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Radio className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Enlace Satelital Ku [RTV-009]
            </div>
            <div className="text-2xl font-bold text-indigo-600 mt-1">
              {data?.resumen.disponibilidadSatelitalGlobal || 0}%
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Telepuerto principal en órbita
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Wifi className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              MTTR Promedio Red [TMR]
            </div>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              {data?.resumen.mttrPromedioHoras || 0} h
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Meta: Resolución &lt; 2.5 h
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Mapa Topológico de Nodos y Monitor Radial de Master */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topología de Estaciones y Nodos */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Mapa Topológico de Transmisión y Torres Críticas [RTV-001/002]</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Telemetría en vivo por estación repetidora y respaldo energético
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                REDTV Telemetría
              </span>
            </div>

            <div className="space-y-3">
              {(data?.nodos || []).map(nodo => {
                const isSelected = selectedNodo?.id === nodo.id;
                const statusBorder = nodo.fallaDetectada ? 'border-amber-400 bg-amber-50/30' : 'border-slate-200 bg-white';

                return (
                  <div
                    key={nodo.id}
                    onClick={() => setSelectedNodo(nodo)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${statusBorder} ${
                      isSelected ? 'ring-2 ring-blue-500/30 shadow-md' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${nodo.fallaDetectada ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                          <h4 className="text-sm font-bold text-slate-900">
                            {nodo.estacionNombre}
                          </h4>
                          <span className="text-xs text-slate-500">
                            ({nodo.estado} - {nodo.municipio})
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-600 mt-2">
                          <span>Operatividad TDA: <strong className="text-slate-900">{nodo.operatividadTDA}%</strong></span>
                          <span>Canales TV: <strong className="text-slate-900">{nodo.serviciosTvActivos}</strong></span>
                          <span>Banda Ku: <strong className="text-slate-900">{nodo.potenciaKuSatelital}%</strong></span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          nodo.estatusEnergia === 'CORPOELEC_STABLE' ? 'bg-emerald-100 text-emerald-800' :
                          nodo.estatusEnergia === 'PLANTA_ELECTRICA_ACTIVA' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {nodo.estatusEnergia.replace(/_/g, ' ')}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {nodo.ultimaTelemetria}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Station Deep-Dive */}
          {selectedNodo && (
            <div className="mt-5 p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Nodo Seleccionado: {selectedNodo.estacionNombre}
                </span>
                <span className="text-xs text-slate-400">
                  Coordenadas: {selectedNodo.coordenadas[0].toFixed(4)}°N, {Math.abs(selectedNodo.coordenadas[1]).toFixed(4)}°W
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs">
                <div className="p-2 rounded bg-slate-800 border border-slate-700">
                  <div className="text-[10px] text-slate-400">TDA Operativa</div>
                  <div className="text-base font-bold text-emerald-400">{selectedNodo.operatividadTDA}%</div>
                </div>
                <div className="p-2 rounded bg-slate-800 border border-slate-700">
                  <div className="text-[10px] text-slate-400">Canales TV</div>
                  <div className="text-base font-bold text-white">{selectedNodo.serviciosTvActivos} activos</div>
                </div>
                <div className="p-2 rounded bg-slate-800 border border-slate-700">
                  <div className="text-[10px] text-slate-400">Emisoras Radio</div>
                  <div className="text-base font-bold text-white">{selectedNodo.serviciosRadioActivos} activas</div>
                </div>
                <div className="p-2 rounded bg-slate-800 border border-slate-700">
                  <div className="text-[10px] text-slate-400">Potencia Ku</div>
                  <div className="text-base font-bold text-blue-400">{selectedNodo.potenciaKuSatelital}%</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Gauges de Estabilidad Master & Satélite */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Monitor de Estabilidad de Master y Satélite</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Lecturas instantáneas de telepuerto, enlace Ku [RTV-009] y eficiencia de modulación [EFM]
              </p>
            </div>

            {/* Gauge Displays */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs font-semibold text-slate-500">Enlace Satelital Banda Ku</div>
                <div className="text-3xl font-bold text-emerald-600 mt-2">
                  {data?.estabilidadMaster.disponibilidadSatelitalKu || 99.7}%
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Disponibilidad Óptima</div>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${data?.estabilidadMaster.disponibilidadSatelitalKu || 99}%` }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs font-semibold text-slate-500">Eficiencia Modulación (EFM)</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {data?.estabilidadMaster.eficienciaModulacionSenal || 98.2}%
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Señal Transmitida</div>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${data?.estabilidadMaster.eficienciaModulacionSenal || 98}%` }} />
                </div>
              </div>
            </div>

            {/* Additional RF Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Nivel Ruido [CON-004]</div>
                <div className="text-sm font-bold text-slate-800">{data?.estabilidadMaster.nivelRuidoDb || 1.4} dB</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Potencia Emisión</div>
                <div className="text-sm font-bold text-slate-800">{data?.estabilidadMaster.potenciaEmisionKw || 45.8} kW</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Temperatura Transm.</div>
                <div className="text-sm font-bold text-slate-800">{data?.estabilidadMaster.temperaturaTransmisorC || 32.4} °C</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Telepuerto Matriz operando sin atenuación por lluvia ni pérdidas de portadora.</span>
          </div>
        </div>
      </div>

      {/* Línea de Tiempo de Recuperación de Red (MTTR) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Línea de Tiempo de Recuperación de Red (MTTR) [TMR]</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Registro histórico de caídas, tiempo medio de recuperación en minutos y cuadrillas desplegadas
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
            Control de Contingencias
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mttrChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="estacion" tick={{ fontSize: 11 }} />
                <YAxis unit=" min" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="mttrMinutos" fill="#f59e0b" name="MTTR (Minutos)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-5 space-y-3">
            {(data?.timelineMTTR || []).map(inc => (
              <div key={inc.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{inc.estacion} ({inc.estado})</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    inc.estatus === 'RESUELTO' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inc.estatus}
                  </span>
                </div>
                <div className="mt-1 text-slate-500">
                  Falla: <strong>{inc.tipoFalla}</strong> | MTTR: <strong>{inc.mttrMinutos} minutos</strong>
                </div>
                <div className="mt-1 text-[11px] text-slate-600">
                  Cuadrilla: {inc.cuadrillaAsignada}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL REPORTAR / ACTUALIZAR INCIDENCIA DE TRANSMISIÓN */}
      {isIncidenciaModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-blue-500/40 rounded-2xl max-w-xl w-full p-6 text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Reportar / Actualizar Incidencia de Torre
                  </h3>
                  <p className="text-xs text-slate-400">
                    Control Operativo NOC REDTV | Rol RACI R
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsIncidenciaModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIncidenciaSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estación / Nodo:</label>
                  <select
                    value={incidenciaForm.torreId}
                    onChange={e => {
                      const selected = (data?.nodos || []).find(n => n.id === e.target.value);
                      setIncidenciaForm({
                        ...incidenciaForm,
                        torreId: e.target.value,
                        nombreEstacion: selected ? `${selected.nombre} (${selected.estado})` : e.target.value
                      });
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    {(data?.nodos || []).map(n => (
                      <option key={n.id} value={n.id}>
                        {n.nombre} ({n.estado})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estatus Operativo:</label>
                  <select
                    value={incidenciaForm.estado}
                    onChange={e => setIncidenciaForm({ ...incidenciaForm, estado: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="OPERATIVA">OPERATIVA (100% On-Air)</option>
                    <option value="ALERTA_TECNICA">ALERTA TÉCNICA (Respaldo)</option>
                    <option value="FALLA_CRITICA">FALLA CRÍTICA (Off-Air)</option>
                    <option value="MANTENIMIENTO">MANTENIMIENTO PREVENTIVO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">MTTR / Tiempo Caída (Horas):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={incidenciaForm.mttrHoras}
                    onChange={e => setIncidenciaForm({ ...incidenciaForm, mttrHoras: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tipo de Evento / Falla:</label>
                  <input
                    type="text"
                    required
                    value={incidenciaForm.tipoFalla}
                    onChange={e => setIncidenciaForm({ ...incidenciaForm, tipoFalla: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cuadrilla Asignada:</label>
                <input
                  type="text"
                  required
                  value={incidenciaForm.cuadrillaAsignada}
                  onChange={e => setIncidenciaForm({ ...incidenciaForm, cuadrillaAsignada: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Observaciones Técnicas / Acciones:</label>
                <textarea
                  rows={2}
                  required
                  value={incidenciaForm.observaciones}
                  onChange={e => setIncidenciaForm({ ...incidenciaForm, observaciones: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsIncidenciaModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submittingIncidencia}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
                >
                  {submittingIncidencia ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Actualizando NOC...</span>
                    </>
                  ) : (
                    <>
                      <Wrench className="w-4 h-4" />
                      <span>Registrar en Telemetría NOC</span>
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
