import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Search,
  Check,
  X,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Copy,
  BookOpen
} from 'lucide-react';
import { SCIC_INDICATORS_DATA, ScicIndicator } from '../data/scicIndicators';
import { evaluateScicFormula } from '../utils/scicFormulaEngine';

interface ScicFormulaAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const ScicFormulaAssistantModal: React.FC<ScicFormulaAssistantModalProps> = ({
  isOpen,
  onClose,
  initialCode
}) => {
  const [selectedCode, setSelectedCode] = useState<string>(initialCode || 'IAAE');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [variableInputs, setVariableInputs] = useState<Record<string, number>>({
    NE: 45,
    NT: 50,
    MA: 18,
    MC: 20,
    EE: 12,
    ES: 15,
    FI: 85,
    FT: 90,
    CS: 8,
    CT: 10,
    ND: 35,
    NR: 38
  });
  const [copied, setCopied] = useState(false);

  // Active indicator
  const currentIndicator = useMemo(() => {
    return SCIC_INDICATORS_DATA.find(i => i.codigo.toUpperCase() === selectedCode.toUpperCase()) || SCIC_INDICATORS_DATA[0];
  }, [selectedCode]);

  // Detected variables from description or formula
  const requiredVariables = useMemo(() => {
    if (!currentIndicator) return [];
    const vars: string[] = [];
    const desc = currentIndicator.variables || '';
    // Look for patterns like "NE:", "NT:", "MA:", etc.
    const matches = desc.match(/([A-Za-z0-9_]+):/g);
    if (matches) {
      matches.forEach(m => {
        const v = m.replace(':', '').trim();
        if (!vars.includes(v)) vars.push(v);
      });
    }
    // Fallback if none parsed: extract letters from formula
    if (vars.length === 0) {
      const formulaWords = currentIndicator.formula.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];
      formulaWords.forEach(w => {
        if (!['T_dif', 'T_rec', 'Math'].includes(w) && !vars.includes(w)) vars.push(w);
      });
    }
    return vars.length > 0 ? vars : ['Valor_Numerador', 'Valor_Denominador'];
  }, [currentIndicator]);

  // Evaluated result
  const evaluation = useMemo(() => {
    if (!currentIndicator) return null;
    return evaluateScicFormula(currentIndicator.codigo, variableInputs);
  }, [currentIndicator, variableInputs]);

  const handleInputChange = (varName: string, val: string) => {
    const num = parseFloat(val) || 0;
    setVariableInputs(prev => ({
      ...prev,
      [varName]: num
    }));
  };

  const handleCopyResult = () => {
    if (evaluation) {
      navigator.clipboard.writeText(evaluation.resultado.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 bg-blue-600/30 border border-blue-400/30 text-blue-300 rounded-xl">
              <Calculator className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold font-['Space_Grotesk'] tracking-wide">
                Asistente y Calculadora de Fórmulas SCIC
              </h3>
              <p className="text-[11px] text-slate-300">
                Automatización matemática en tiempo real para captura de datos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Indicator Selector */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Seleccionar Indicador SCIC para Cálculo:
            </label>
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
            >
              {SCIC_INDICATORS_DATA.map((ind) => (
                <option key={ind.id} value={ind.codigo}>
                  [{ind.codigo}] {ind.nombre} ({ind.ente} - {ind.frecuencia})
                </option>
              ))}
            </select>
          </div>

          {/* Indicator Details Card */}
          {currentIndicator && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                  {currentIndicator.codigo}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {currentIndicator.ente} &bull; {currentIndicator.frecuencia}
                </span>
              </div>
              <div className="font-bold text-slate-900 text-xs">
                {currentIndicator.nombre}
              </div>
              <p className="text-[11px] text-slate-600">
                {currentIndicator.descripcion}
              </p>
              <div className="pt-2 border-t border-slate-200/80 font-mono text-[11px] text-blue-900 bg-blue-50/50 p-2 rounded-lg">
                <b>Fórmula Oficial:</b> {currentIndicator.formula}
              </div>
            </div>
          )}

          {/* Variable Inputs Form */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Ingreso de Variables Primarias de Medición:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {requiredVariables.map((varName) => (
                <div key={varName} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <label className="block text-[11px] font-mono font-bold text-slate-700">
                    Variable: {varName}
                  </label>
                  <input
                    type="number"
                    value={variableInputs[varName] ?? 0}
                    onChange={(e) => handleInputChange(varName, e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Calculation Result Display */}
          {evaluation && (
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-5 rounded-2xl shadow-lg border border-blue-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Resultado Calculado Automáticamente
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    evaluation.estatus === 'OPTIMO'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : evaluation.estatus === 'ALERTA'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                      : 'bg-red-500/20 text-red-300 border border-red-400/30'
                  }`}
                >
                  {evaluation.estatus}
                </span>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-extrabold font-mono text-white">
                  {evaluation.resultado}
                </span>
                <span className="text-slate-300 font-mono text-sm font-semibold">
                  {evaluation.unidad}
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span className="font-mono">
                  {currentIndicator?.codigo} = {currentIndicator?.formula}
                </span>

                <button
                  onClick={handleCopyResult}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Valor</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Cerrar Asistente
          </button>
        </div>
      </div>
    </div>
  );
};
