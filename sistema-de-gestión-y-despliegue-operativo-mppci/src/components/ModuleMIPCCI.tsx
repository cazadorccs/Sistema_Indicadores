import React, { useState } from 'react';
import { 
  Globe, 
  TrendingUp, 
  Search, 
  Award, 
  Users, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Wifi, 
  Activity,
  FileCheck2,
  FileSpreadsheet,
  Building2,
  ArrowRight,
  ShieldAlert,
  Smartphone,
  Share2,
  Tv,
  Radio,
  Download,
  BookOpen,
  MapPin,
  Flame,
  FileText
} from 'lucide-react';
import { 
  StrategicMIPCCIData, 
  CalculatedMasterKPIs, 
  MunicipalityData,
  FullWeeklyReport,
  RACIRole,
  UserAccount,
  Eje4ViceministeriosData
} from '../types';
import { INITIAL_EJE4_DATA } from '../data/mockEje4Data';
import { FormularioGestionViceministerios } from './FormularioGestionViceministerios';

interface ModuleMIPCCIProps {
  strategicData: StrategicMIPCCIData;
  kpis: CalculatedMasterKPIs;
  municipalities: MunicipalityData[];
  report?: FullWeeklyReport;
  onSaveReport?: (updatedReport: FullWeeklyReport) => void;
  currentUser?: UserAccount | null;
  currentRole?: RACIRole;
  onNavigateToCapture?: () => void;
}

export const ModuleMIPCCI: React.FC<ModuleMIPCCIProps> = ({
  strategicData,
  kpis,
  municipalities = [],
  report,
  onSaveReport,
  currentUser,
  currentRole,
  onNavigateToCapture
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'FORMULARIO_OFICIAL' | 'DASHBOARD_INDICADORES' | 'ACCESO_335'>(
    'DASHBOARD_INDICADORES'
  );

  const [activeViceministerioTab, setActiveViceministerioTab] = useState<
    'COMUNICACION_INFO' | 'GESTION_COM' | 'PLANIFICACION' | 'SOPORTE_PLATAFORMA'
  >('COMUNICACION_INFO');

  const munis = municipalities || [];
  const avgCobertura335 = munis.length > 0 
    ? (munis.reduce((acc, m) => acc + m.coberturaEfectivaRadioTV, 0) / munis.length).toFixed(1) 
    : '0';

  const eje4: Eje4ViceministeriosData = report?.eje4Data?.viceministerios || INITIAL_EJE4_DATA.viceministerios;

  // Key live metrics
  const totalPiezasMovil = eje4.despachoComunicacionInformacion.difusionMovilPresidencia.reduce((a, b) => a + (b.cantidad || 0), 0);
  const totalAmenazas = eje4.despachoComunicacionInformacion.tendenciasViralesDesestabilizadoras.reduce((a, b) => a + (b.cantidadDetectado || 0), 0);
  const v1Snmp = eje4.despachoGestionComunicacional.formacionAdaptacionTecnologica.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0;
  const v3Snmp = eje4.despachoGestionComunicacional.formacionAdaptacionTecnologica.find(r => r.codigoVariable === 'V3')?.valorCapturado || 1;
  const porcFormacion = ((v1Snmp / v3Snmp) * 100).toFixed(1);

  const totalVistas = eje4.planificacionEstrategia.ecosistemaDigital.reduce((a, b) => a + (b.vistasLogradas || 0), 0);
  const totalInteracciones = eje4.planificacionEstrategia.ecosistemaDigital.reduce((a, b) => a + (b.interaccionesTotales || 0), 0);
  const avgEE = totalVistas > 0 ? ((totalInteracciones / totalVistas) * 100).toFixed(1) : '0';

  const v2Transmisores = eje4.soportePlataforma.mediosComunitariosTransmisores.find(r => r.codigoVariable === 'V2')?.valorCapturado || 0;
  const v3Transmisores = eje4.soportePlataforma.mediosComunitariosTransmisores.find(r => r.codigoVariable === 'V3')?.valorCapturado || 1;
  const transmisoresPorc = ((v2Transmisores / v3Transmisores) * 100).toFixed(1);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 rounded-2xl p-6 border border-amber-500/30 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-mono font-bold">
              EJE FUNDAMENTAL N° 4
            </span>
            <span className="text-xs text-amber-200/80">Gestión de Viceministerios • MPPCI</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1 font-['Space_Grotesk']">
            Eje 4: Gestión de Viceministerios
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Indicadores oficiales de articulación del sistema de medios, difusión transmedia de Presidencia,
            formación SNMP, ecosistema digital, infraestructura electromagnética y cumplimiento de la Ley RESORTE.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onNavigateToCapture && (
            <button
              onClick={onNavigateToCapture}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              <span>Ir a Módulo de Captura</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="flex items-center space-x-3 bg-slate-950/80 p-2.5 rounded-xl border border-amber-500/20 text-xs">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Hogares THAI</span>
              <span className="text-base font-bold text-blue-400 font-mono">{kpis.thai}%</span>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Móvil TPBAM</span>
              <span className="text-base font-bold text-emerald-400 font-mono">{kpis.tpbam}%</span>
            </div>
            <div className="h-6 w-px bg-slate-800"></div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Operatividad</span>
              <span className="text-base font-bold text-amber-400 font-mono">{transmisoresPorc}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Mode Navigation Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm flex flex-wrap gap-2">
        <button
          onClick={() => setActiveMainTab('DASHBOARD_INDICADORES')}
          className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMainTab === 'DASHBOARD_INDICADORES'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Dashboard de Indicadores por Viceministerio</span>
        </button>

        <button
          onClick={() => setActiveMainTab('FORMULARIO_OFICIAL')}
          className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMainTab === 'FORMULARIO_OFICIAL'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Formulario Oficial de Captura (Matriz 4 Despachos)</span>
        </button>

        <button
          onClick={() => setActiveMainTab('ACCESO_335')}
          className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMainTab === 'ACCESO_335'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Despliegue Territorial 335 Municipios</span>
        </button>
      </div>

      {/* ================================================================ */}
      {/* MODE 1: FORMULARIO OFICIAL EMBEDDED                              */}
      {/* ================================================================ */}
      {activeMainTab === 'FORMULARIO_OFICIAL' && (
        <FormularioGestionViceministerios
          report={report}
          onSaveReport={onSaveReport}
          currentUser={currentUser}
          currentRole={currentRole}
        />
      )}

      {/* ================================================================ */}
      {/* MODE 2: DASHBOARD DE INDICADORES POR VICEMINISTERIO             */}
      {/* ================================================================ */}
      {activeMainTab === 'DASHBOARD_INDICADORES' && (
        <div className="space-y-6">
          {/* Subtabs for the 4 Viceministerios */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <button
              onClick={() => setActiveViceministerioTab('COMUNICACION_INFO')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeViceministerioTab === 'COMUNICACION_INFO'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Smartphone className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-wider font-mono">Despacho 1</span>
              </div>
              <span className="text-xs block font-bold leading-tight">Comunicación e Información</span>
            </button>

            <button
              onClick={() => setActiveViceministerioTab('GESTION_COM')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeViceministerioTab === 'GESTION_COM'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-wider font-mono">Despacho 2</span>
              </div>
              <span className="text-xs block font-bold leading-tight">Gestión Comunicacional</span>
            </button>

            <button
              onClick={() => setActiveViceministerioTab('PLANIFICACION')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeViceministerioTab === 'PLANIFICACION'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Share2 className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-wider font-mono">Viceministerio 3</span>
              </div>
              <span className="text-xs block font-bold leading-tight">Planificación & Estrategia</span>
            </button>

            <button
              onClick={() => setActiveViceministerioTab('SOPORTE_PLATAFORMA')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                activeViceministerioTab === 'SOPORTE_PLATAFORMA'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Wifi className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-wider font-mono">Viceministerio 4</span>
              </div>
              <span className="text-xs block font-bold leading-tight">Soporte de Plataforma</span>
            </button>
          </div>

          {/* 1. COMUNICACIÓN E INFORMACIÓN */}
          {activeViceministerioTab === 'COMUNICACION_INFO' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">Boletines Oficiales</span>
                  <div className="text-2xl font-bold font-mono text-slate-900">
                    {eje4.despachoComunicacionInformacion.comunicadosOficialesNotasPrensaEmitidos}
                  </div>
                  <p className="text-xs text-slate-500">Comunicados y notas emitidos en la semana.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">Difusión Móvil Presidencial</span>
                  <div className="text-2xl font-bold font-mono text-blue-700">
                    {totalPiezasMovil} piezas
                  </div>
                  <p className="text-xs text-slate-500">Audio, video y textos vía WhatsApp, Telegram y SMS.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-rose-700 uppercase">Amenazas Virales</span>
                  <div className="text-2xl font-bold font-mono text-rose-600">
                    {totalAmenazas} detectadas
                  </div>
                  <p className="text-xs text-slate-500">Matrices desestabilizadoras monitoreadas.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Tráfico Orgánico SEO</span>
                  <div className="text-2xl font-bold font-mono text-emerald-700">
                    {eje4.despachoComunicacionInformacion.seoEditorial.traficoOrganicoTotal.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500">Visitas espontáneas en motores de búsqueda.</p>
                </div>
              </div>

              {/* Detalle Difusion Movil y SEO */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                    Desglose de Difusión en Telefonía Móvil
                  </h3>
                  <div className="space-y-2">
                    {eje4.despachoComunicacionInformacion.difusionMovilPresidencia.map(row => (
                      <div key={row.tipoComunicacion} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs">
                        <span className="font-medium text-slate-700">{row.tipoComunicacion}</span>
                        <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {row.cantidad}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                    Métricas de SEO Editorial
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Impresiones Buscadores</span>
                      <span className="text-lg font-bold font-mono text-slate-900">
                        {eje4.despachoComunicacionInformacion.seoEditorial.impresionesBuscadores.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Clics Efectivos</span>
                      <span className="text-lg font-bold font-mono text-blue-700">
                        {eje4.despachoComunicacionInformacion.seoEditorial.clicsBuscadores.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">CTR Orgánico</span>
                      <span className="text-lg font-bold font-mono text-amber-700">
                        {eje4.despachoComunicacionInformacion.seoEditorial.ctrOrganico}%
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 block text-[11px]">Conversión Suscriptores</span>
                      <span className="text-lg font-bold font-mono text-emerald-700">
                        {eje4.despachoComunicacionInformacion.seoEditorial.tasaConversionSuscriptores}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. GESTIÓN COMUNICACIONAL */}
          {activeViceministerioTab === 'GESTION_COM' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">Capacitación SNMP</span>
                  <div className="text-2xl font-bold font-mono text-slate-900">{porcFormacion}%</div>
                  <p className="text-xs text-slate-500">
                    {v1Snmp} trabajadores de una nómina total de {v3Snmp}.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">Soberanía Tecnológica</span>
                  <div className="text-2xl font-bold font-mono text-blue-700">
                    {eje4.despachoGestionComunicacional.soberaniaTecnologicaTerritorio.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0} MAC
                  </div>
                  <p className="text-xs text-slate-500">Medios comunitarios georreferenciados en el territorio.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Formación Popular 3.0</span>
                  <div className="text-2xl font-bold font-mono text-emerald-700">
                    {eje4.despachoGestionComunicacional.formacionPopularTransmedia.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0} Voceros
                  </div>
                  <p className="text-xs text-slate-500">Comuneros certificados en herramientas transmedia.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                  Tabla Consolidada de Indicadores de Formación y Soberanía
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Indicador</th>
                        <th className="p-2.5 text-center">Código</th>
                        <th className="p-2.5">Variable</th>
                        <th className="p-2.5 text-right">Dato Reportado</th>
                        <th className="p-2.5">Unidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      {[
                        ...eje4.despachoGestionComunicacional.formacionAdaptacionTecnologica,
                        ...eje4.despachoGestionComunicacional.soberaniaTecnologicaTerritorio,
                        ...eje4.despachoGestionComunicacional.formacionPopularTransmedia
                      ].map(r => (
                        <tr key={r.variable} className="hover:bg-slate-50">
                          <td className="p-2.5 font-bold text-slate-900">{r.nombreIndicador}</td>
                          <td className="p-2.5 text-center font-mono font-bold text-amber-700">{r.codigoVariable}</td>
                          <td className="p-2.5 text-slate-700">{r.variable}</td>
                          <td className="p-2.5 text-right font-mono font-bold text-slate-900">{r.valorCapturado.toLocaleString()}</td>
                          <td className="p-2.5 text-slate-500 font-mono">{r.unidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. PLANIFICACIÓN Y ESTRATEGIA COMUNICACIONAL */}
          {activeViceministerioTab === 'PLANIFICACION' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-purple-700 uppercase">Vistas Logradas</span>
                  <div className="text-2xl font-bold font-mono text-purple-700">{totalVistas.toLocaleString()}</div>
                  <p className="text-xs text-slate-500">Alcance acumulado en redes oficiales.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">Interacciones Totales</span>
                  <div className="text-2xl font-bold font-mono text-blue-700">{totalInteracciones.toLocaleString()}</div>
                  <p className="text-xs text-slate-500">Likes, shares, comentarios y guardados.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Engagement EE Promedio</span>
                  <div className="text-2xl font-bold font-mono text-emerald-700">{avgEE}%</div>
                  <p className="text-xs text-slate-500">Tasa de efectividad de engagement.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">Producción Propia</span>
                  <div className="text-2xl font-bold font-mono text-amber-900">
                    {eje4.planificacionEstrategia.produccionGeneral.contenidoProduccionPropia}
                  </div>
                  <p className="text-xs text-slate-500">De {eje4.planificacionEstrategia.produccionGeneral.totalContenidoPublicado} publicaciones totales.</p>
                </div>
              </div>

              {/* Tabla de Canales Digitales */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                  Ecosistema Digital por Red y Desempeño
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-sans">
                      <tr>
                        <th className="p-2.5">Plataforma</th>
                        <th className="p-2.5 text-right">Meta Vistas</th>
                        <th className="p-2.5 text-right">Vistas Logradas</th>
                        <th className="p-2.5 text-center">Var %</th>
                        <th className="p-2.5 text-right">Interacciones</th>
                        <th className="p-2.5 text-right">Impresiones</th>
                        <th className="p-2.5 text-center">EE (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {eje4.planificacionEstrategia.ecosistemaDigital.map(r => {
                        const ee = r.vistasLogradas > 0 ? ((r.interaccionesTotales / r.vistasLogradas) * 100).toFixed(1) : '0';
                        return (
                          <tr key={r.plataforma} className="hover:bg-slate-50">
                            <td className="p-2.5 font-bold font-sans text-slate-900">{r.plataforma}</td>
                            <td className="p-2.5 text-right">{r.metaSemanalVistas.toLocaleString()}</td>
                            <td className="p-2.5 text-right font-bold text-slate-900">{r.vistasLogradas.toLocaleString()}</td>
                            <td className="p-2.5 text-center">{r.varPorcSemanaAnterior}%</td>
                            <td className="p-2.5 text-right">{r.interaccionesTotales.toLocaleString()}</td>
                            <td className="p-2.5 text-right">{r.impresionesNetas.toLocaleString()}</td>
                            <td className="p-2.5 text-center font-bold text-purple-700">{ee}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Trending Topics & Creadores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] flex items-center space-x-1.5">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Top Trending Topics de la Semana</span>
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    {eje4.planificacionEstrategia.trendingTopics.slice(0, 7).map(t => (
                      <div key={t.posicion} className="flex items-center space-x-2 p-1.5 bg-slate-50 rounded-lg">
                        <span className="w-5 font-mono font-bold text-amber-700 text-center">{t.posicion}</span>
                        <span className="font-semibold text-slate-800">{t.tema}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                    Red de Creadores Aliados & Articulación
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                      <span className="text-slate-600">Creadores Activos en Campaña:</span>
                      <span className="font-bold font-mono text-slate-900">{eje4.planificacionEstrategia.redCreadores.numCreadoresActivos}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                      <span className="text-slate-600">Vistas en Redes Aliadas:</span>
                      <span className="font-bold font-mono text-slate-900">{eje4.planificacionEstrategia.redCreadores.vistasDifusionRedesAliadas.toLocaleString()}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                      <span className="text-slate-600">Articulación con Medios Privados:</span>
                      <span className="font-bold font-mono text-slate-900">{eje4.planificacionEstrategia.redCreadores.articulacionMediosPrivados} medios</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                      <span className="text-slate-600">Articulación Internacional:</span>
                      <span className="font-bold font-mono text-slate-900">{eje4.planificacionEstrategia.redCreadores.articulacionMediosInternacionales} agencias</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gestión de Narrativa y Monitoreo de Medios + Producción de Contenidos Escrito */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gestión de Narrativa y Monitoreo de Medios */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 lg:col-span-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] flex items-center space-x-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>Gestión de Narrativa y Monitoreo de Medios</span>
                    </h3>
                    <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded-lg font-mono font-bold">
                      Total: {(eje4.planificacionEstrategia.gestionNarrativaMonitoreo || []).reduce((a, b) => a + (b.cantidadUnidades || 0), 0).toLocaleString()} uds
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-2.5">Concepto</th>
                          <th className="p-2.5 w-32 text-right">Cantidad (Unidades)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {(eje4.planificacionEstrategia.gestionNarrativaMonitoreo || [
                          { concepto: 'N° de Alertas de Matrices Procesadas (Rumores/Noticias Falsas)', cantidadUnidades: 48 },
                          { concepto: 'Informes de Narrativa Emitidos', cantidadUnidades: 14 },
                          { concepto: 'Reportes de Primeras Planas (Nacional, Regional e Internacional)', cantidadUnidades: 84 },
                          { concepto: 'Resúmenes de Vocerías Oficiales', cantidadUnidades: 18 },
                          { concepto: 'Narrativas y contranarrativas', cantidadUnidades: 32 }
                        ]).map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2.5 font-medium text-slate-800">{row.concepto}</td>
                            <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                              {row.cantidadUnidades.toLocaleString()} uds
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Producción de Contenidos Escrito */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Producción de Contenidos Escrito</span>
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-700 font-medium">Notas de prensa y artículos web:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {(eje4.planificacionEstrategia.contenidoEscrito?.notasPrensaArticulosWeb || 1420).toLocaleString()} uds
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-700 font-medium">Publicaciones en red de microblogging:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {(eje4.planificacionEstrategia.contenidoEscrito?.publicacionesMicroblogging || 3850).toLocaleString()} uds
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-700 font-medium">Publicaciones en plataformas de hilos de texto:</span>
                      <span className="font-mono font-bold text-slate-900">
                        {(eje4.planificacionEstrategia.contenidoEscrito?.publicacionesHilosTexto || 410).toLocaleString()} uds
                      </span>
                    </div>

                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between font-bold text-blue-900">
                      <span>Total Contenidos Escrito:</span>
                      <span className="font-mono">
                        {(
                          (Number(eje4.planificacionEstrategia.contenidoEscrito?.notasPrensaArticulosWeb) || 1420) +
                          (Number(eje4.planificacionEstrategia.contenidoEscrito?.publicacionesMicroblogging) || 3850) +
                          (Number(eje4.planificacionEstrategia.contenidoEscrito?.publicacionesHilosTexto) || 410)
                        ).toLocaleString()} uds
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. SOPORTE DE PLATAFORMA COMUNICACIONAL */}
          {activeViceministerioTab === 'SOPORTE_PLATAFORMA' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">Hogares con Internet (THAI)</span>
                  <div className="text-2xl font-bold font-mono text-blue-700">{kpis.thai}%</div>
                  <p className="text-xs text-slate-500">Penetración fija residencial.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">Banda Ancha Móvil (TPBAM)</span>
                  <div className="text-2xl font-bold font-mono text-emerald-700">{kpis.tpbam}%</div>
                  <p className="text-xs text-slate-500">Líneas LTE/4G activas en el país.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-purple-700 uppercase">Medios Digitales (IPMD)</span>
                  <div className="text-2xl font-bold font-mono text-purple-700">
                    {(
                      ((eje4.soportePlataforma.mediosDigitalesIpmd.find(r => r.codigoVariable === 'V1')?.valorCapturado || 0) /
                       (eje4.soportePlataforma.mediosDigitalesIpmd.find(r => r.codigoVariable === 'V2')?.valorCapturado || 1)) * 100
                    ).toFixed(1)}%
                  </div>
                  <p className="text-xs text-slate-500">Usuarios activos mensuales digitales.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">Transmisores Operativos</span>
                  <div className="text-2xl font-bold font-mono text-amber-900">{transmisoresPorc}%</div>
                  <p className="text-xs text-slate-500">
                    {v2Transmisores} de {v3Transmisores} transmisores de radio/TV instalados.
                  </p>
                </div>
              </div>

              {/* Cumplimiento Ley RESORTE */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                    Cumplimiento de la Ley RESORTE por Sujeto Regulado
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fiscalización a prestadores de servicios de televisión abierta, por suscripción, radiodifusión sonara y medios electrónicos.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {eje4.soportePlataforma.cumplimientoLeyResorte.map(s => {
                    const totalCrit = s.criterios.length || 1;
                    const cumpleTotal = s.criterios.filter(c => c.estado === 'CUMPLE_TOTALMENTE').length;
                    const porcCumplimiento = ((cumpleTotal / totalCrit) * 100).toFixed(0);

                    return (
                      <div key={s.sujetoRegulado} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-slate-900">{s.sujetoRegulado}</h4>
                          <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 font-bold">
                            {s.cantidadMedida} evaluados
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Cumplimiento Integral:</span>
                          <span className="font-bold font-mono text-emerald-700">{porcCumplimiento}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${porcCumplimiento}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-slate-600 pt-1 space-y-1">
                          {s.criterios.map(c => (
                            <div key={c.criterio} className="flex items-center justify-between">
                              <span className="truncate pr-2">{c.criterio}</span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                                c.estado === 'CUMPLE_TOTALMENTE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {c.estado === 'CUMPLE_TOTALMENTE' ? 'Total' : 'Parcial'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================================ */}
      {/* MODE 3: DESPLIEGUE TERRITORIAL 335 MUNICIPIOS                    */}
      {/* ================================================================ */}
      {activeMainTab === 'ACCESO_335' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                Cobertura Integral en los 335 Municipios del Territorio Nacional
              </h3>
              <p className="text-xs text-slate-500">
                Monitoreo de penetración y disponibilidad de Radio, Televisión, Internet y Telefonía Móvil.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-xl font-bold font-mono">
                Promedio Cobertura: {avgCobertura335}%
              </span>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Estado / Región</th>
                  <th className="p-3">Municipio</th>
                  <th className="p-3 text-center">Radio & TV (%)</th>
                  <th className="p-3 text-center">Internet (%)</th>
                  <th className="p-3 text-center">Telefonía Móvil (%)</th>
                  <th className="p-3 text-center">Cobertura General</th>
                  <th className="p-3 text-center">Estatus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {munis.slice(0, 25).map(m => {
                  const statusColor = 
                    m.coberturaGeneralPorc >= 75 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : m.coberturaGeneralPorc >= 50 
                      ? 'bg-amber-100 text-amber-800 border-amber-300' 
                      : 'bg-rose-100 text-rose-800 border-rose-300';
                  
                  return (
                    <tr key={m.municipioId} className="hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-800">{m.estado}</td>
                      <td className="p-3 font-semibold text-slate-900">{m.municipio}</td>
                      <td className="p-3 text-center font-mono">{m.coberturaEfectivaRadioTV}%</td>
                      <td className="p-3 text-center font-mono">{m.penetracionInternet}%</td>
                      <td className="p-3 text-center font-mono">{m.penetracionTelefoniaMovil}%</td>
                      <td className="p-3 text-center font-mono font-bold text-slate-900">
                        {m.coberturaGeneralPorc}%
                      </td>
                      <td className="p-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusColor}`}>
                          {m.estatusAlerta}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
