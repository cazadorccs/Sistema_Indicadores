import React from 'react';
import { Radio, Mic, Activity, RadioTower, Clock, BarChart3, Users } from 'lucide-react';
import { RadioRowAlcance, RadioRowProduccion, RadioRowTematico, RadioRowInfraestructura } from '../../types';

interface RadiosSectionProps {
  alcance: RadioRowAlcance[];
  produccion: RadioRowProduccion[];
  desgloseTematico: RadioRowTematico[];
  infraestructura: RadioRowInfraestructura[];
  onChangeAlcance: (index: number, field: keyof RadioRowAlcance, value: any) => void;
  onChangeProduccion: (index: number, field: keyof RadioRowProduccion, value: any) => void;
  onChangeDesgloseTematico: (index: number, field: keyof RadioRowTematico, value: any) => void;
  onChangeInfraestructura: (index: number, field: keyof RadioRowInfraestructura, value: any) => void;
  readOnly?: boolean;
}

export const RadiosSection: React.FC<RadiosSectionProps> = ({
  alcance,
  produccion,
  desgloseTematico,
  infraestructura,
  onChangeAlcance,
  onChangeProduccion,
  onChangeDesgloseTematico,
  onChangeInfraestructura,
  readOnly = false
}) => {
  const totalProgramas = desgloseTematico.reduce((acc, curr) => acc + (curr.numProgramas || 0), 0);
  const totalHoras = desgloseTematico.reduce((acc, curr) => acc + (curr.horasTransmision || 0), 0);
  const totalAudiencia = desgloseTematico.reduce((acc, curr) => acc + (curr.audienciaEstimada || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              EJE 1: MEDIOS DE COMUNICACIÓN E INFORMACIÓN
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              1.B RADIOS, EMISORAS AM Y FM
            </h2>
          </div>
        </div>
        <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
          Códigos RAD-001 al RAD-018
        </span>
      </div>

      {/* Table 1: Alcance y Cobertura Radial */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            Alcance y Cobertura Radial
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos RAD-001 al RAD-005</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-28">Frecuencia</th>
                <th className="py-2.5 px-3 w-32 text-right">Meta Semanal</th>
                <th className="py-2.5 px-3 w-32 text-right">Logrado</th>
                <th className="py-2.5 px-3 w-36 text-right">Var % vs Sem Anterior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {alcance.map((row, idx) => {
                const isPct = row.codigo === 'RAD-002' || row.codigo === 'RAD-005';
                return (
                  <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">{row.codigo}</td>
                    <td className="py-2.5 px-3 text-slate-600">{row.frecuencia}</td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="relative inline-flex items-center w-full">
                        <input
                          type="number"
                          step="0.1"
                          placeholder={isPct ? "_______%" : "_______"}
                          value={row.metaSemanal === 0 ? '' : row.metaSemanal}
                          onChange={(e) => onChangeAlcance(idx, 'metaSemanal', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          className="w-full px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold focus:bg-white focus:ring-1 focus:ring-indigo-500"
                        />
                        {isPct && (
                          <span className="absolute right-2 text-[11px] font-bold text-slate-500 pointer-events-none">%</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="relative inline-flex items-center w-full">
                        <input
                          type="number"
                          step="0.1"
                          placeholder={isPct ? "_______%" : "_______"}
                          value={row.logrado === 0 ? '' : row.logrado}
                          onChange={(e) => onChangeAlcance(idx, 'logrado', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                        />
                        {isPct && (
                          <span className="absolute right-2 text-[11px] font-bold text-indigo-700 pointer-events-none">%</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.1"
                          placeholder="_______%"
                          value={row.varSemanaAnterior === 0 ? '' : row.varSemanaAnterior}
                          onChange={(e) => onChangeAlcance(idx, 'varSemanaAnterior', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          className={`w-20 px-2 py-1 text-right border rounded text-xs font-mono font-bold ${
                            row.varSemanaAnterior >= 0 
                              ? 'text-emerald-700 bg-emerald-50/50 border-emerald-200' 
                              : 'text-rose-700 bg-rose-50/50 border-rose-200'
                          }`}
                        />
                        <span className="text-[11px] font-bold text-slate-500">%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Producción de Contenido Radial */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Mic className="w-4 h-4 text-indigo-600" />
            Producción de Contenido Radial
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos RAD-006 al RAD-013</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-28">Frecuencia</th>
                <th className="py-2.5 px-3 w-28 text-right">Logrado</th>
                <th className="py-2.5 px-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {produccion.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-slate-600">{row.frecuencia}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      placeholder="_______"
                      value={row.logrado === 0 ? '' : row.logrado}
                      onChange={(e) => onChangeProduccion(idx, 'logrado', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-full px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.observaciones}
                      onChange={(e) => onChangeProduccion(idx, 'observaciones', e.target.value)}
                      disabled={readOnly}
                      placeholder="Detalles de la producción radial..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 3: Desglose Temático de Contenido Radial */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            Desglose Temático de Contenido Radial
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">7 Temáticas Oficiales</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Temática</th>
                <th className="py-2.5 px-3 w-36 text-right">N° de Programas</th>
                <th className="py-2.5 px-3 w-40 text-right">Horas de Transmisión</th>
                <th className="py-2.5 px-3 w-44 text-right">Audiencia Estimada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {desgloseTematico.map((row, idx) => (
                <tr key={row.tematica} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{row.tematica}</td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      placeholder="_______"
                      value={row.numProgramas === 0 ? '' : row.numProgramas}
                      onChange={(e) => onChangeDesgloseTematico(idx, 'numProgramas', parseInt(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      step="0.5"
                      placeholder="_______"
                      value={row.horasTransmision === 0 ? '' : row.horasTransmision}
                      onChange={(e) => onChangeDesgloseTematico(idx, 'horasTransmision', parseFloat(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-28 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <input
                      type="number"
                      placeholder="_______"
                      value={row.audienciaEstimada === 0 ? '' : row.audienciaEstimada}
                      onChange={(e) => onChangeDesgloseTematico(idx, 'audienciaEstimada', parseInt(e.target.value) || 0)}
                      disabled={readOnly}
                      className="w-32 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-indigo-50/70 border-t-2 border-indigo-200 font-bold text-slate-900">
              <tr>
                <td className="py-2.5 px-3 text-indigo-900">TOTALES CONSOLIDADOS</td>
                <td className="py-2.5 px-3 text-right font-mono text-indigo-900">{totalProgramas}</td>
                <td className="py-2.5 px-3 text-right font-mono text-indigo-900">{totalHoras.toFixed(1)} hrs</td>
                <td className="py-2.5 px-3 text-right font-mono text-indigo-900">{totalAudiencia.toLocaleString()} oyentes</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Table 4: Infraestructura Técnica Radial */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <RadioTower className="w-4 h-4 text-indigo-600" />
            Infraestructura Técnica Radial
          </h3>
          <span className="text-[11px] text-slate-500 font-medium">Códigos RAD-014 al RAD-018</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Indicador</th>
                <th className="py-2.5 px-3 w-24">Código</th>
                <th className="py-2.5 px-3 w-56 text-right">Valor</th>
                <th className="py-2.5 px-3">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {infraestructura.map((row, idx) => (
                <tr key={row.codigo} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{row.indicador}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">{row.codigo}</td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      {row.codigo === 'RAD-014' || row.codigo === 'RAD-016' ? (
                        <>
                          <input
                            type="number"
                            step="1"
                            placeholder="_______"
                            value={row.valor === 0 ? '' : row.valor}
                            onChange={(e) => onChangeInfraestructura(idx, 'valor', parseFloat(e.target.value) || 0)}
                            disabled={readOnly}
                            className="w-20 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                          />
                          <span className="text-slate-500 font-mono text-xs font-bold">/</span>
                          <input
                            type="number"
                            step="1"
                            placeholder="_______"
                            value={row.totalRef === 0 || !row.totalRef ? '' : row.totalRef}
                            onChange={(e) => onChangeInfraestructura(idx, 'totalRef', parseFloat(e.target.value) || 0)}
                            disabled={readOnly}
                            className="w-20 px-2 py-1 text-right bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-700 focus:bg-white focus:ring-1 focus:ring-indigo-500"
                            title="Total de referencia"
                          />
                        </>
                      ) : row.codigo === 'RAD-015' ? (
                        <div className="relative inline-flex items-center justify-end w-32">
                          <input
                            type="number"
                            step="0.1"
                            placeholder="_______%"
                            value={row.valor === 0 ? '' : row.valor}
                            onChange={(e) => onChangeInfraestructura(idx, 'valor', parseFloat(e.target.value) || 0)}
                            disabled={readOnly}
                            className="w-full px-2 py-1 pr-6 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                          />
                          <span className="absolute right-2 text-xs font-bold text-slate-500 pointer-events-none">%</span>
                        </div>
                      ) : (
                        <input
                          type="number"
                          step="0.1"
                          placeholder="_______"
                          value={row.valor === 0 ? '' : row.valor}
                          onChange={(e) => onChangeInfraestructura(idx, 'valor', parseFloat(e.target.value) || 0)}
                          disabled={readOnly}
                          className="w-24 px-2 py-1 text-right bg-white border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:ring-1 focus:ring-indigo-500"
                        />
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={row.observaciones}
                      onChange={(e) => onChangeInfraestructura(idx, 'observaciones', e.target.value)}
                      disabled={readOnly}
                      placeholder="Estado de transmisores y repetidores..."
                      className="w-full px-2.5 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-indigo-500"
                    />
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
