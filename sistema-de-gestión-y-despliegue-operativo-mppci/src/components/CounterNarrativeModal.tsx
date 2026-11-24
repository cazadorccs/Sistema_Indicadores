import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  Send, 
  Copy, 
  Check, 
  Layers, 
  Share2, 
  Activity, 
  Bot,
  RefreshCw
} from 'lucide-react';
import { OpinionMatrixAlert } from '../types';

interface CounterNarrativeModalProps {
  alert: OpinionMatrixAlert | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyCounterNarrative: (alertId: string, narrativeText: string) => void;
}

interface InstitutionalCounterNarrativeResponse {
  narrativaOficial: string;
  lineasDiscursivas: string[];
  voceriaRecomendada: string;
  canalesDespliegue: string[];
  nivelAlertaSugerido: string;
  source?: string;
}

export const CounterNarrativeModal: React.FC<CounterNarrativeModalProps> = ({
  alert,
  isOpen,
  onClose,
  onApplyCounterNarrative
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InstitutionalCounterNarrativeResponse | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !alert) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/intelligence/counter-narrative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: alert.titulo,
          tematica: alert.tematica,
          amenazaFraseViral: alert.amenazaFraseViral,
          origen: alert.origen,
          impactoVistas: alert.impactoEstimadoVistas,
          ente: alert.enteAdscritoRelacionado
        })
      });

      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        throw new Error(data.error || 'Error al procesar');
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setResult({
        narrativaOficial: `COMUNICADO OFICIAL: Frente a falsas afirmaciones difundidas en ${alert.origen} respecto a "${alert.titulo}", el Ministerio del Poder Popular para la Comunicación e Información (MPPCI) aclara categóricamente que los servicios y datos técnicos se encuentran plenamente garantizados. Exhortamos al pueblo a no replicar rumores infundados.`,
        lineasDiscursivas: [
          'Verificación in situ con personal técnico calificado.',
          'Mantenimiento continuo de los canales de comunicación de servicio público.',
          'Llamado a la serenidad y a informarse por canales oficiales del Estado.'
        ],
        voceriaRecomendada: 'Dirección General de Medios y Vocería Especializada',
        canalesDespliegue: ['VTV Noticiero', 'RNV Informativa', 'Agencia AVN', 'Canales Oficiales Telegram'],
        nivelAlertaSugerido: 'ALTO'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.narrativaOficial);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApply = () => {
    if (result) {
      onApplyCounterNarrative(alert.id, result.narrativaOficial);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Space_Grotesk']">
                Asistente Institucional de Contranarrativa & Vocería Oficial (VSCC)
              </h2>
              <p className="text-xs text-slate-400">Generador de respuesta institucional rápida contra matrices virales</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Threat Context Box */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="font-bold text-amber-400 uppercase font-mono">{alert.tematica}</span>
            <span className="text-slate-400 font-mono">{alert.impactoEstimadoVistas.toLocaleString()} vistas ({alert.origen})</span>
          </div>
          <h3 className="font-bold text-white text-sm">{alert.titulo}</h3>
          <p className="text-slate-300 italic bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            "{alert.amenazaFraseViral}"
          </p>
        </div>

        {!result && !loading && (
          <div className="text-center py-6 space-y-3">
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Haga clic para generar una contranarrativa fundamentada, líneas discursivas y recomendaciones de vocería ministerial mediante el Motor Institucional Soberano.
            </p>
            <button
              onClick={handleGenerate}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 mx-auto shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generar Contranarrativa Institucional</span>
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-10 space-y-3">
            <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <p className="text-xs text-slate-300 font-medium">Analizando matriz de opinión y estructurando vocería oficial...</p>
          </div>
        )}

        {result && (
          <div className="space-y-4 text-xs animate-in fade-in">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-300">Narrativa / Comunicado Oficial:</label>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-[11px] text-amber-400 hover:underline cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-200 leading-relaxed font-sans">
                {result.narrativaOficial}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Líneas Discursivas Clave:</label>
              <ul className="space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-slate-300">
                {result.lineasDiscursivas.map((linea, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">▪</span>
                    <span>{linea}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Vocería Recomendada:</span>
                <span className="font-semibold text-white">{result.voceriaRecomendada}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Canales de Difusión:</span>
                <span className="font-semibold text-amber-300">
                  {result.canalesDespliegue && result.canalesDespliegue.length > 0
                    ? result.canalesDespliegue.join(', ')
                    : 'Canales oficiales'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleGenerate}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerar</span>
              </button>

              <button
                onClick={handleApply}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center space-x-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Aplicar Contranarrativa a la Alerta</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
