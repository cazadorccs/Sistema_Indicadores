import React from 'react';
import { 
  Share2, 
  TrendingUp, 
  Users, 
  Video, 
  MessageSquare, 
  Sparkles, 
  BarChart2, 
  Radio, 
  ShieldAlert,
  Flame
} from 'lucide-react';
import { 
  RedesRowKpisCanales, 
  RedesRowAlcanceAudiencia, 
  RedesRowProduccionTactica, 
  RedesRowEntrevista, 
  RedesRowCreadores, 
  RedesRowCanalActivo, 
  RedesRowEngagementContenido 
} from '../../types';

interface RedesSocialesSectionProps {
  kpisCanales: RedesRowKpisCanales[];
  alcanceAudiencia: RedesRowAlcanceAudiencia[];
  produccionTactica: RedesRowProduccionTactica[];
  entrevistas: RedesRowEntrevista[];
  creadoresAliados: RedesRowCreadores[];
  canalesActivos: RedesRowCanalActivo[];
  engagementPorContenido: RedesRowEngagementContenido[];
  onChangeKpisCanales: (index: number, field: keyof RedesRowKpisCanales, value: any) => void;
  onChangeAlcanceAudiencia: (index: number, field: keyof RedesRowAlcanceAudiencia, value: any) => void;
  onChangeProduccionTactica: (index: number, field: keyof RedesRowProduccionTactica, value: any) => void;
  onChangeEntrevistas: (index: number, field: keyof RedesRowEntrevista, value: any) => void;
  onChangeCreadoresAliados: (index: number, field: keyof RedesRowCreadores, value: any) => void;
  onChangeCanalesActivos: (index: number, field: keyof RedesRowCanalActivo, value: any) => void;
  onChangeEngagementPorContenido: (index: number, field: keyof RedesRowEngagementContenido, value: any) => void;
  readOnly?: boolean;
}

export const RedesSocialesSection: React.FC<RedesSocialesSectionProps> = ({
  kpisCanales,
  alcanceAudiencia,
  produccionTactica,
  entrevistas,
  creadoresAliados,
  canalesActivos,
  engagementPorContenido,
  onChangeKpisCanales,
  onChangeAlcanceAudiencia,
  onChangeProduccionTactica,
  onChangeEntrevistas,
  onChangeCreadoresAliados,
  onChangeCanalesActivos,
  onChangeEngagementPorContenido,
  readOnly = false
}) => {
  // KPI Totals Calculation
  const totalMetaVistas = kpisCanales.reduce((acc, c) => acc + (c.metaSemanalVistas || 0), 0);
  const totalVistasLogradas = kpisCanales.reduce((acc, c) => acc + (c.vistasLogradas || 0), 0);
  const totalInteracciones = kpisCanales.reduce((acc, c) => acc + (c.interaccionesTotales || 0), 0);
  const totalImpresiones = kpisCanales.reduce((acc, c) => acc + (c.impresionesNetas || 0), 0);
  const totalEngagementRate = totalVistasLogradas > 0 
    ? Number(((totalInteracciones / totalVistasLogradas) * 100).toFixed(2)) 
    : 0;

  // Audiencia Totals
  const totalSeguidores = alcanceAudiencia.reduce((acc, c) => acc + (c.seguidoresTotales || 0), 0);
  const totalNuevosSeguidores = alcanceAudiencia.reduce((acc, c) => acc + (c.nuevosSeguidores || 0), 0);
  const totalAlcanceOrganico = alcanceAudiencia.reduce((acc, c) => acc + (c.alcanceOrganico || 0), 0);
  const totalAlcancePagado = alcanceAudiencia.reduce((acc, c) => acc + (c.alcancePagado || 0), 0);

  // Entrevistas Totals
  const totalEntrevistas = entrevistas.reduce((acc, c) => acc + (c.numEntrevistas || 0), 0);
  const totalAlcanceEntrevistas = entrevistas.reduce((acc, c) => acc + (c.alcanceEstimado || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-pink-600/20 text-pink-400 rounded-lg border border-pink-500/30">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-pink-400 font-semibold">
              EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              1.E REDES SOCIALES & ECOSISTEMA DIGITAL
            </h2>
          </div>
        </div>
        <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
          Matriz de KPIs, Audiencia y Táctica
        </span>
      </div>

      {/* Table 1: Matriz de Ecosistema Digital - KPIs de Canales */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-pink-600" />
            Matriz de Ecosistema Digital - KPIs de Canales
          </h3>
          <span className="text-[11px] text-slate-500 font-medium font-mono">Fórmula: EE = (Interacciones / Vistas) × 100</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Plataforma</th>
                <th className="py-2.5 px-3 w-32 text-right">Meta Semanal Vistas</th>
                <th className="py-2.5 px-3 w-32 text-right">Vistas Logradas</th>
                <th className="py-2.5 px-3 w-32 text-right">Var % vs Sem Ant</th>
                <th className="py-2.5 px-3 w-32 text-right">Interacciones Totales</th>
                <th className="py-2.5 px-3 w-32 text-right">Impresiones Netas</th>
                <th className="py-2.5 px-3 w-32 text-right">Tasa Engagement (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {kpisCanales.map((row, idx) => {
                const autoEE = row.vistasLogradas > 0 
                  ? Number(((row.interaccionesTotales / row.vistasLogradas) * 100).toFixed(2)) 
                  : row.tasaEngagement;

                return (
                  <tr key={row.plataforma} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.plataforma}</td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.metaSemanalVistas}
                        onChange={(e) => onChangeKpisCanales(idx, 'metaSemanalVistas', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className="w-full px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold focus:bg-white focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.vistasLogradas}
                        onChange={(e) => onChangeKpisCanales(idx, 'vistasLogradas', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          value={row.varSemanaAnterior}
                          onChange={(e) => onChangeKpisCanales(idx, 'varSemanaAnterior', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          className={`w-16 px-1.5 py-1 text-right border rounded text-xs font-mono font-bold ${
                            row.varSemanaAnterior >= 0 
                              ? 'text-emerald-700 bg-emerald-50/50 border-emerald-200' 
                              : 'text-rose-700 bg-rose-50/50 border-rose-200'
                          }`}
                        />
                        <span className="text-[10px] font-bold text-slate-500">%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.interaccionesTotales}
                        onChange={(e) => onChangeKpisCanales(idx, 'interaccionesTotales', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <input
                        type="number"
                        value={row.impresionesNetas}
                        onChange={(e) => onChangeKpisCanales(idx, 'impresionesNetas', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="px-2 py-1 bg-pink-50 border border-pink-200 text-pink-700 font-mono font-bold rounded text-xs inline-block">
                        {autoEE}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-pink-50/70 border-t-2 border-pink-200 font-bold text-slate-900">
              <tr>
                <td className="py-2.5 px-3 text-pink-900">TOTALES</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalMetaVistas.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalVistasLogradas.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">--</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalInteracciones.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalImpresiones.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900 bg-pink-100/80">{totalEngagementRate}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Table 2: Desglose de Alcance por Red Social - Audiencia */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Users className="w-4 h-4 text-pink-600" />
            Desglose de Alcance por Red Social - Audiencia
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Seguidores y Alcance Orgánico/Pagado</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Plataforma</th>
                <th className="py-2.5 px-3 w-36 text-right">Seguidores Totales</th>
                <th className="py-2.5 px-3 w-36 text-right">Nuevos Seguidores</th>
                <th className="py-2.5 px-3 w-32 text-right">Crecimiento %</th>
                <th className="py-2.5 px-3 w-36 text-right">Alcance Orgánico</th>
                <th className="py-2.5 px-3 w-36 text-right">Alcance Pagado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {alcanceAudiencia.map((row, idx) => (
                <tr key={row.plataforma} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.plataforma}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.seguidoresTotales}
                      onChange={(e) => onChangeAlcanceAudiencia(idx, 'seguidoresTotales', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.nuevosSeguidores}
                      onChange={(e) => onChangeAlcanceAudiencia(idx, 'nuevosSeguidores', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <input
                        type="number"
                        step="0.1"
                        value={row.crecimientoPorc}
                        onChange={(e) => onChangeAlcanceAudiencia(idx, 'crecimientoPorc', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className="w-16 px-1.5 py-1 text-right border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                      />
                      <span className="text-[10px] font-bold text-slate-500">%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.alcanceOrganico}
                      onChange={(e) => onChangeAlcanceAudiencia(idx, 'alcanceOrganico', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.alcancePagado}
                      onChange={(e) => onChangeAlcanceAudiencia(idx, 'alcancePagado', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-700 focus:bg-white focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-pink-50/70 border-t-2 border-pink-200 font-bold text-slate-900">
              <tr>
                <td className="py-2.5 px-3 text-pink-900">TOTALES</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalSeguidores.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalNuevosSeguidores.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">--</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalAlcanceOrganico.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalAlcancePagado.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Table 3: Gestión de Contenidos y Producción Táctica en Redes */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-600" />
            Gestión de Contenidos y Producción Táctica en Redes
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos RED-001 al RED-011</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Tipo de Contenido</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-32 text-right">Unidades</th>
                <th className="py-2.5 px-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {produccionTactica.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.tipoContenido}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-pink-700 bg-pink-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.unidades}
                      onChange={(e) => onChangeProduccionTactica(idx, 'unidades', parseInt(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.observaciones}
                      onChange={(e) => onChangeProduccionTactica(idx, 'observaciones', e.target.value)}
                      disabled={readOnly}
                      placeholder="Observaciones de la producción y despliegue táctico..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 4: Desglose de Entrevistas Realizadas */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-pink-600" />
            Desglose de Entrevistas Realizadas
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Por Tipo de Entrevistado y Plataforma Principal</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Tipo de Entrevistado</th>
                <th className="py-2.5 px-3 w-36 text-right">N° de Entrevistas</th>
                <th className="py-2.5 px-3 w-48">Plataforma Principal</th>
                <th className="py-2.5 px-3 w-44 text-right">Alcance Estimado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {entrevistas.map((row, idx) => (
                <tr key={row.tipoEntrevistado} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.tipoEntrevistado}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.numEntrevistas}
                      onChange={(e) => onChangeEntrevistas(idx, 'numEntrevistas', parseInt(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.plataformaPrincipal}
                      onChange={(e) => onChangeEntrevistas(idx, 'plataformaPrincipal', e.target.value)}
                      disabled={readOnly}
                      placeholder="Ej: YouTube / X / TikTok"
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.alcanceEstimado}
                      onChange={(e) => onChangeEntrevistas(idx, 'alcanceEstimado', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-32 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-pink-50/70 border-t-2 border-pink-200 font-bold text-slate-900">
              <tr>
                <td className="py-2.5 px-3 text-pink-900">TOTAL</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalEntrevistas}</td>
                <td className="py-2.5 px-3 text-slate-500 font-normal">--</td>
                <td className="py-2.5 px-3 text-right font-mono text-pink-900">{totalAlcanceEntrevistas.toLocaleString()} vistas</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Table 5: Red de Creadores Aliados */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Users className="w-4 h-4 text-pink-600" />
            Red de Creadores Aliados
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos RED-012 al RED-016</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-40 text-right">Valor Registrado</th>
                <th className="py-2.5 px-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {creadoresAliados.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-pink-700 bg-pink-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.valor}
                      onChange={(e) => onChangeCreadoresAliados(idx, 'valor', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.observaciones}
                      onChange={(e) => onChangeCreadoresAliados(idx, 'observaciones', e.target.value)}
                      disabled={readOnly}
                      placeholder="Estrategia y articulación de creadores..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 6: Principales Canales Activos en la Semana */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Flame className="w-4 h-4 text-pink-600" />
            Principales Canales Activos en la Semana
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Top Cuentas y Contenido Destacado</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Canal / Cuenta</th>
                <th className="py-2.5 px-3 w-36">Plataforma</th>
                <th className="py-2.5 px-3 w-36 text-right">Seguidores</th>
                <th className="py-2.5 px-3 w-32 text-right">Crecimiento %</th>
                <th className="py-2.5 px-3">Contenido Destacado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {canalesActivos.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.canalCuenta}
                      onChange={(e) => onChangeCanalesActivos(idx, 'canalCuenta', e.target.value)}
                      disabled={readOnly}
                      placeholder="@Usuario"
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.plataforma}
                      onChange={(e) => onChangeCanalesActivos(idx, 'plataforma', e.target.value)}
                      disabled={readOnly}
                      placeholder="Plataforma"
                      className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.seguidores}
                      onChange={(e) => onChangeCanalesActivos(idx, 'seguidores', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <input
                        type="number"
                        step="0.1"
                        value={row.crecimientoPorc}
                        onChange={(e) => onChangeCanalesActivos(idx, 'crecimientoPorc', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className="w-16 px-1.5 py-1 text-right border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                      />
                      <span className="text-[10px] font-bold text-slate-500">%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.contenidoDestacado}
                      onChange={(e) => onChangeCanalesActivos(idx, 'contenidoDestacado', e.target.value)}
                      disabled={readOnly}
                      placeholder="Tema / Pieza con mayor tracción..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 7: Análisis de Engagement por Tipo de Contenido */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-pink-600" />
            Análisis de Engagement por Tipo de Contenido
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Interacciones, Comentarios, Compartidos y Guardados</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Tipo de Contenido</th>
                <th className="py-2.5 px-3 w-28 text-right">Publicaciones</th>
                <th className="py-2.5 px-3 w-28 text-right">Interacciones</th>
                <th className="py-2.5 px-3 w-28 text-right">Comentarios</th>
                <th className="py-2.5 px-3 w-28 text-right">Compartidos</th>
                <th className="py-2.5 px-3 w-28 text-right">Guardados</th>
                <th className="py-2.5 px-3 w-28 text-right">EE Promedio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {engagementPorContenido.map((row, idx) => (
                <tr key={row.tipoContenido} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.tipoContenido}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.publicaciones}
                      onChange={(e) => onChangeEngagementPorContenido(idx, 'publicaciones', parseInt(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.interacciones}
                      onChange={(e) => onChangeEngagementPorContenido(idx, 'interacciones', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.comentarios}
                      onChange={(e) => onChangeEngagementPorContenido(idx, 'comentarios', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.compartidos}
                      onChange={(e) => onChangeEngagementPorContenido(idx, 'compartidos', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      value={row.guardados}
                      onChange={(e) => onChangeEngagementPorContenido(idx, 'guardados', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-pink-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <input
                        type="number"
                        step="0.1"
                        value={row.eePromedio}
                        onChange={(e) => onChangeEngagementPorContenido(idx, 'eePromedio', parseFloat(e.target.value) || 0)}
                        disabled={readOnly}
                        className="w-16 px-1.5 py-1 text-right border border-slate-300 rounded text-xs font-mono font-bold text-pink-700 bg-pink-50/50 focus:ring-1 focus:ring-pink-500"
                      />
                      <span className="text-[10px] font-bold text-slate-500">%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
