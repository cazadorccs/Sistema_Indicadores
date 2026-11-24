import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Radio, 
  FileText, 
  Video, 
  Mic, 
  Layers, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  Sparkles,
  Sliders,
  Filter,
  BarChart2,
  Compass,
  FileCheck,
  PlusCircle,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { 
  OperatividadMediosDashboardData, 
  MuroProduccionItem, 
  RACIRole 
} from '../../types';

interface OperatividadMediosDashboardProps {
  currentRole: RACIRole;
}

export const OperatividadMediosDashboard: React.FC<OperatividadMediosDashboardProps> = ({
  currentRole
}) => {
  const [data, setData] = useState<OperatividadMediosDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filtroFamilia, setFiltroFamilia] = useState<string>('TODAS');
  const [isProduccionModalOpen, setIsProduccionModalOpen] = useState(false);
  const [submittingProduccion, setSubmittingProduccion] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [produccionForm, setProduccionForm] = useState({
    medio: 'VTV',
    familia: 'AUDIOVISUAL' as 'AUDIOVISUAL' | 'SONORO' | 'ESCRITO' | 'DIGITAL_GRAFICO',
    cantidad: 1,
    titulo: 'Avance Noticioso en Vivo / Cobertura de Despliegue de Obras',
    semanaEpidemiologica: 35
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboards/medios');
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error('Error fetching medios dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegistrarProduccionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingProduccion(true);
      const res = await fetch('/api/dashboards/medios/registrar-produccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medio: produccionForm.medio,
          tipo: produccionForm.familia,
          cantidad: Number(produccionForm.cantidad),
          titulo: produccionForm.titulo,
          semana: produccionForm.semanaEpidemiologica
        })
      });

      const result = await res.json();
      if (result.success) {
        setToastMsg(`Producción de ${produccionForm.medio} (${produccionForm.cantidad} piezas) agregada al Muro Eje 1.`);
        setIsProduccionModalOpen(false);
        setTimeout(() => setToastMsg(null), 5000);
        fetchData();
      } else {
        alert(result.error || 'Error registrando producción.');
      }
    } catch (err) {
      console.error(err);
      alert('Error en conexión con el servidor de medios.');
    } finally {
      setSubmittingProduccion(false);
    }
  };

  const radarData = (data?.radarPasesPorRegion || []).map(r => ({
    region: r.region.replace('_', ' '),
    pasesCampoTv: r.pasesCampoTv,
    programasRadio: r.programasRadioEnVivo,
    contingencias: r.contingenciasCubiertas * 3
  }));

  const alineacionChartData = (data?.alineacionMedios || []).map(m => ({
    medio: m.enteSiglas,
    logrado: m.cumplimientoEfectivoIAAE,
    meta: m.cuotaObligatoriaPauta,
    desviacion: m.desviacionPct
  }));

  const muroFiltrado = (data?.muroProduccion || []).filter(item => {
    if (filtroFamilia === 'TODAS') return true;
    return item.familia === filtroFamilia;
  });

  const canRegister = currentRole === 'DIRECTOR_OPERACIONES' || currentRole === 'VICEMINISTRO' || currentRole === 'MAXIMA_AUTORIDAD';

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & RACI Governance Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 border border-teal-900/40 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-teal-600/20 border border-teal-500/40 rounded-xl text-teal-400">
              <Tv className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  Tablero Operativo 4
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Pauta y Despliegue Informativo
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mt-1">
                Operatividad de Medios y Despliegue Informativo
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Supervisión del despliegue en campo [TV-008], programas en vivo [RAD-006], alineación editorial [IAAE] y muro de producción Eje 1 tipificado.
              </p>
            </div>
          </div>

          {/* RACI Ribbon */}
          <div className="bg-slate-950/70 border border-teal-800/30 rounded-xl p-3 flex flex-wrap items-center gap-3 text-xs">
            <div className="text-slate-400 text-[11px] font-semibold border-r border-slate-700 pr-2">
              Gobernanza RACI:
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">R</span>
              <span className="text-[11px] text-slate-300">Jefes de Redacción / Corresponsalías</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">A</span>
              <span className="text-[11px] text-slate-300">Vicemin. Comunicación e Información</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">C</span>
              <span className="text-[11px] text-slate-300">Prensa Presidencial / Logística</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center font-bold text-[10px]">I</span>
              <span className="text-[11px] text-slate-300">Ministro / Presidencia</span>
            </div>
          </div>
        </div>

        {/* Action Header */}
        <div className="mt-4 pt-4 border-t border-teal-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Filtrar Producción Eje 1:</span>
            {['TODAS', 'ESCRITO', 'SONORO', 'AUDIOVISUAL', 'DIGITAL_GRAFICO'].map(fam => (
              <button
                key={fam}
                onClick={() => setFiltroFamilia(fam)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  filtroFamilia === fam 
                    ? 'bg-teal-600 text-white shadow-sm' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {fam.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {canRegister && (
              <button
                onClick={() => setIsProduccionModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-lg font-bold transition-all cursor-pointer shadow-md border border-teal-400/40"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Registrar Producción Diaria</span>
              </button>
            )}

            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar Registro</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-800 text-xs font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Piezas Producidas Hoy
            </div>
            <div className="text-2xl font-bold text-teal-600 mt-1">
              {data?.resumen.totalPiezasProducidasHoy || 0}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              En las 4 familias de contenidos
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Pases en Vivo Campo [TV-008]
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {data?.resumen.pasesEnVivoHoy || 0}
            </div>
            <div className="text-[11px] text-blue-700 mt-0.5 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Supera meta diaria (35)
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Alineación Estratégica [IAAE]
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">
              {data?.resumen.indiceAlineacionGlobalIAAE || 0}%
            </div>
            <div className="text-[11px] text-emerald-700 mt-0.5 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Adherencia a pauta central
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Cobertura Regional
            </div>
            <div className="text-2xl font-bold text-indigo-600 mt-1">
              {data?.resumen.coberturaRegionesActivas || 8} / 8 REDI
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              100% despliegue territorial activo
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Radar de Pases & Alineación Estratégica (Bullet Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart de Pases por Región */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-600" />
                <span>Radar de Pases en Vivo y Cobertura Territorial [TV-008 / RAD-006]</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Volumen diario de transmisiones en directo por Regiones Estratégicas (REDI)
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="region" tick={{ fontSize: 10, fill: '#475569' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 20]} tick={{ fontSize: 9 }} />
                  <Radar name="Pases TV en Campo" dataKey="pasesCampoTv" stroke="#0d9488" fill="#0d9488" fillOpacity={0.5} />
                  <Radar name="Radio en Vivo (Horas)" dataKey="programasRadio" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Foco Territorial:</strong> La región <strong>Central</strong> y <strong>Zuliana</strong> lideran el despliegue con 14 y 7 pases satelitales en vivo respectivamente ante contingencias de infraestructura.
          </div>
        </div>

        {/* Alineación Estratégica Bullet Bar Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Índice de Alineación con la Agenda Estratégica (IAAE)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cumplimiento de la pauta y mensajes clave del Estado por medio público
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alineacionChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" unit="%" domain={[70, 100]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="medio" tick={{ fontSize: 11 }} width={90} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="logrado" name="% Logrado (IAAE)" fill="#0d9488" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="meta" name="% Meta Pauta" fill="#cbd5e1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-800">
            <span>Cumplimiento promedio del SNMP: <strong>92.4%</strong> (Óptimo)</span>
            <span className="font-semibold text-emerald-700">6 de 6 entes en pauta central</span>
          </div>
        </div>
      </div>

      {/* Muro de Producción Diaria (KPI Tiles Diferenciados por Familia Eje 1) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600" />
              <span>Muro de Producción Diaria Tipificada (Gestión de Contenidos Eje 1)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Clasificación estandarizada por tipo de contenido según la normativa oficial de captura
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {muroFiltrado.length} Tipologías
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {muroFiltrado.map(item => {
            const familyColor = 
              item.familia === 'ESCRITO' ? 'border-blue-200 bg-blue-50/40 text-blue-900' :
              item.familia === 'SONORO' ? 'border-amber-200 bg-amber-50/40 text-amber-900' :
              item.familia === 'AUDIOVISUAL' ? 'border-teal-200 bg-teal-50/40 text-teal-900' :
              'border-purple-200 bg-purple-50/40 text-purple-900';

            const badgeBg = 
              item.familia === 'ESCRITO' ? 'bg-blue-600 text-white' :
              item.familia === 'SONORO' ? 'bg-amber-600 text-white' :
              item.familia === 'AUDIOVISUAL' ? 'bg-teal-600 text-white' :
              'bg-purple-600 text-white';

            const pctCumplido = Math.round((item.cantidadDia / item.metaDia) * 100);

            return (
              <div key={item.id} className={`p-4 rounded-xl border ${familyColor} shadow-sm space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${badgeBg}`}>
                    {item.familia.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {item.codigoScic}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.etiqueta}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Emisor: {item.enteEmisor}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-lg font-bold text-slate-900">{item.cantidadDia}</span>
                    <span className="text-slate-500 text-[11px]"> / {item.metaDia} {item.unidad}</span>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                    pctCumplido >= 100 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {pctCumplido}% meta
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL REGISTRAR PRODUCCIÓN DIARIA EJE 1 */}
      {isProduccionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/40 rounded-2xl max-w-xl w-full p-6 text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-teal-500/20 text-teal-400 rounded-lg border border-teal-500/30">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Registrar Producción Diaria Eje 1
                  </h3>
                  <p className="text-xs text-slate-400">
                    Sistema Nacional de Medios Públicos | Rol RACI R
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsProduccionModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegistrarProduccionSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Medio / Ente:</label>
                  <select
                    value={produccionForm.medio}
                    onChange={e => setProduccionForm({ ...produccionForm, medio: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="VTV">Venezolana de Televisión (VTV)</option>
                    <option value="RNV">Radio Nacional de Venezuela (RNV)</option>
                    <option value="YVKE">YVKE Mundial</option>
                    <option value="Correo del Orinoco">Correo del Orinoco</option>
                    <option value="Telesur">Telesur</option>
                    <option value="Vive TV">Vive TV</option>
                    <option value="Radio del Sur">Radio del Sur</option>
                    <option value="Ciudad CCS">Ciudad CCS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Familia de Contenido:</label>
                  <select
                    value={produccionForm.familia}
                    onChange={e => setProduccionForm({ ...produccionForm, familia: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="AUDIOVISUAL">Audiovisual (Reportajes/Pases)</option>
                    <option value="SONORO">Sonoro (Micro radial/Emisión)</option>
                    <option value="ESCRITO">Escrito (Artículo/Nota)</option>
                    <option value="DIGITAL_GRAFICO">Digital Gráfico (Infografía)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Título de la Pieza o Pauta:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Cobertura Especial: Jornada de Atención Social Comunitaria"
                  value={produccionForm.titulo}
                  onChange={e => setProduccionForm({ ...produccionForm, titulo: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cantidad de Piezas:</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={produccionForm.cantidad}
                    onChange={e => setProduccionForm({ ...produccionForm, cantidad: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Semana Epidemiológica:</label>
                  <input
                    type="number"
                    min={1}
                    max={52}
                    required
                    value={produccionForm.semanaEpidemiologica}
                    onChange={e => setProduccionForm({ ...produccionForm, semanaEpidemiologica: parseInt(e.target.value) || 35 })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProduccionModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submittingProduccion}
                  className="px-5 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-lg shadow-lg flex items-center gap-2"
                >
                  {submittingProduccion ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Registrando...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Ingresar al Muro Eje 1</span>
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
