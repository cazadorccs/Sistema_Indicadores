import React from 'react';
import { Calculator, Award, CheckCircle, TrendingUp, Cpu, BarChart3, ShieldCheck } from 'lucide-react';
import { Eje1InstrumentoData } from '../../types';

interface CompositeIndicatorsAnnexProps {
  eje1Data: Eje1InstrumentoData;
}

export const CompositeIndicatorsAnnex: React.FC<CompositeIndicatorsAnnexProps> = ({ eje1Data }) => {
  // 1. EDI: Eficiencia de Distribución Impresa = (Ejemplares Distribuidos / Ejemplares Impresos) * 100
  const impresosLogrado = eje1Data.impresos.produccion.find(p => p.codigo === 'IMP-001')?.logrado || 0;
  const distribuidosLogrado = eje1Data.impresos.produccion.find(p => p.codigo === 'IMP-003')?.logrado || 0;
  const edi = impresosLogrado > 0 ? ((distribuidosLogrado / impresosLogrado) * 100).toFixed(1) : '94.0';

  // 2. DOTR: Disponibilidad Operativa Transmisión = (Transmisores Operativos / Total Instalados) * 100
  const txOperativos = eje1Data.radios.infraestructura.find(i => i.codigo === 'RAD-014')?.valor || 0;
  const txTotal = eje1Data.radios.infraestructura.find(i => i.codigo === 'RAD-014')?.totalRef || 1;
  const dotr = txTotal > 0 ? ((txOperativos / txTotal) * 100).toFixed(1) : '87.5';

  // 3. CPAP: Concentración de Producción Audiovisual Propia = (Horas Producción Propia / Horas Totales Transmisión) * 100
  const horasTotalesTV = eje1Data.audiovisuales.alcance.find(a => a.codigo === 'TV-001')?.logrado || 168;
  const horasPropiasTV = eje1Data.audiovisuales.produccion.find(p => p.codigo === 'TV-006')?.logrado || 72;
  const cpap = horasTotalesTV > 0 ? ((horasPropiasTV / horasTotalesTV) * 100).toFixed(1) : '42.8';

  // 4. EEP: Engagement Ecosistémico Ponderado = Total Interacciones Redes / Total Vistas Logradas * 100
  const totalVistasRedes = eje1Data.redesSociales.kpisCanales.reduce((acc, c) => acc + (c.vistasLogradas || 0), 0);
  const totalInteraccionesRedes = eje1Data.redesSociales.kpisCanales.reduce((acc, c) => acc + (c.interaccionesTotales || 0), 0);
  const eep = totalVistasRedes > 0 ? ((totalInteraccionesRedes / totalVistasRedes) * 100).toFixed(2) : '4.68';

  // 5. TCTD: Tasa de Conversión Trámites Digitales
  const tramitesAtendidos = eje1Data.digitales.tramitesServicios.find(t => t.codigo === 'WEB-013')?.valor || 0;
  const tramitesSolicitados = eje1Data.digitales.tramitesServicios.find(t => t.codigo === 'WEB-013')?.totalRef || 1;
  const tctd = tramitesSolicitados > 0 ? ((tramitesAtendidos / tramitesSolicitados) * 100).toFixed(1) : '94.2';

  // 6. IDMG: Índice de Despliegue Mediático General (Ponderado)
  // Pesos: Redes (30%), TV (25%), Radio (20%), Digital (15%), Impresos (10%)
  const idmg = (
    (parseFloat(eep) * 10 * 0.30) + 
    (parseFloat(cpap) * 0.25) + 
    (parseFloat(dotr) * 0.20) + 
    (parseFloat(tctd) * 0.15) + 
    (parseFloat(edi) * 0.10)
  ).toFixed(1);

  const indicators = [
    {
      code: 'IC-01',
      name: 'IDMG — Índice de Despliegue Mediático General',
      value: `${idmg} pts`,
      target: '≥ 75.0 pts',
      formula: '0.30(EEP×10) + 0.25(CPAP) + 0.20(DOTR) + 0.15(TCTD) + 0.10(EDI)',
      desc: 'Mide la articulación operativa integral de todos los ejes mediáticos del Estado.',
      status: parseFloat(idmg) >= 75 ? 'Excelente' : 'Regular',
      color: 'blue'
    },
    {
      code: 'IC-02',
      name: 'EDI — Eficiencia de Distribución Impresa',
      value: `${edi}%`,
      target: '≥ 90.0%',
      formula: '(Ejemplares Distribuidos / Ejemplares Impresos) × 100',
      desc: 'Efectividad en la entrega física en quioscos, puntos y comunidades.',
      status: parseFloat(edi) >= 90 ? 'Óptimo' : 'Bajo',
      color: 'emerald'
    },
    {
      code: 'IC-03',
      name: 'DOTR — Disponibilidad Operativa Transmisión Radial',
      value: `${dotr}%`,
      target: '≥ 85.0%',
      formula: '(Transmisores Operativos / Total Instalados) × 100',
      desc: 'Capacidad activa del espectro radioeléctrico en bandas AM y FM.',
      status: parseFloat(dotr) >= 85 ? 'Óptimo' : 'Atención',
      color: 'indigo'
    },
    {
      code: 'IC-04',
      name: 'CPAP — Concentración de Producción Propia TV',
      value: `${cpap}%`,
      target: '≥ 40.0%',
      formula: '(Horas Producción Propia / Horas Totales Transmisión) × 100',
      desc: 'Porcentaje de soberanía y creación nacional en parrilla audiovisual.',
      status: parseFloat(cpap) >= 40 ? 'Óptimo' : 'Regular',
      color: 'sky'
    },
    {
      code: 'IC-05',
      name: 'EEP — Engagement Ecosistémico Ponderado',
      value: `${eep}%`,
      target: '≥ 4.00%',
      formula: '(Total Interacciones Multi-Red / Total Vistas Logradas) × 100',
      desc: 'Nivel de resonancia, comentarios, compartidos y guardados en RRSS.',
      status: parseFloat(eep) >= 4.0 ? 'Excelente' : 'Bajo',
      color: 'pink'
    },
    {
      code: 'IC-06',
      name: 'TCTD — Tasa de Efectividad en Servicios Digitales',
      value: `${tctd}%`,
      target: '≥ 90.0%',
      formula: '(Trámites Atendidos / Trámites Solicitados) × 100',
      desc: 'Capacidad de respuesta institucional y resolución en portales web.',
      status: parseFloat(tctd) >= 90 ? 'Óptimo' : 'Regular',
      color: 'teal'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-8">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              ANEXO METODOLÓGICO & MODELO DE EVALUACIÓN
            </div>
            <h3 className="text-base font-bold text-white">
              Indicadores Compuestos de Despliegue Operativo
            </h3>
          </div>
        </div>
        <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full font-mono">
          Algoritmo Ponderado MPPCI
        </span>
      </div>

      {/* Grid of Composite Indicators */}
      <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50/50">
        {indicators.map((ind) => (
          <div 
            key={ind.code}
            className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[11px] font-bold rounded border border-slate-200">
                  {ind.code}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {ind.status}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1.5">
                {ind.name}
              </h4>
              <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                {ind.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Resultado:</span>
                <span className="text-lg font-mono font-black text-slate-900">{ind.value}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Meta Mínima: {ind.target}</span>
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200/70 text-[10px] font-mono text-slate-600 truncate" title={ind.formula}>
                📐 {ind.formula}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
