import React, { useState } from 'react';
import { 
  Award, 
  Globe2, 
  ShieldCheck, 
  BookOpen, 
  Activity, 
  CheckCircle2, 
  Layers,
  ChevronRight
} from 'lucide-react';

interface InternationalStandardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InternationalStandardsModal: React.FC<InternationalStandardsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedStandard, setSelectedStandard] = useState<'UNESCO' | 'UIT' | 'SENDAI' | 'ESFERA' | 'SMART'>('UNESCO');

  if (!isOpen) return null;

  const standardsData = {
    UNESCO: {
      title: 'UNESCO: Indicadores de Desarrollo Mediático (MDI)',
      desc: 'Marco global para evaluar la pluralidad, el servicio público y la libertad informativa.',
      color: 'text-blue-400',
      items: [
        { code: 'Categoría 1', desc: 'Sistema de regulación favorable a la libertad de expresión y pluralismo (Art. 57 y 58 CRBV).' },
        { code: 'Categoría 2', desc: 'Pluralidad y diversidad de medios: Sistema Nacional de Medios Públicos (VTV, RNV, YVKE, ViVe, AVN).' },
        { code: 'Categoría 3', desc: 'Los medios como plataforma para el discurso democrático y participación ciudadana.' },
        { code: 'Categoría 4', desc: 'Capacitación profesional y creación de capacidades en tecnologías emergentes (SNMP e IA).' },
        { code: 'Categoría 5', desc: 'Capacidad infraestructural suficiente para apoyar medios independientes y pluralistas (REDTV).' },
      ]
    },
    UIT: {
      title: 'UIT: Índice de Desarrollo de las TIC (IDI)',
      desc: 'Estándar de la Unión Internacional de Telecomunicaciones para medir la conectividad universal y significativa.',
      color: 'text-emerald-400',
      items: [
        { code: 'Pilar 1: Conectividad Universal', desc: 'THAI (Tasa de Hogares con Acceso a Internet) y TPBAM (Banda Ancha Móvil) en 335 municipios.' },
        { code: 'Pilar 2: Conectividad Significativa', desc: 'Despliegue de fibra óptica y telepuerto satelital Banda Ku para cobertura en zonas rurales.' },
        { code: 'Pilar 3: Infraestructura y Equipamiento', desc: 'Red TDA (Televisión Digital Abierta) bajo el estándar ISDB-Tb con cobertura poblacional > 65%.' },
      ]
    },
    SENDAI: {
      title: 'Marco de Sendai para la Reducción del Riesgo de Desastres (UNDRR)',
      desc: 'Lineamientos de alerta temprana multirriesgo y comunicación efectiva en emergencias.',
      color: 'text-amber-400',
      items: [
        { code: 'Prioridad 1', desc: 'Comprensión del riesgo de desastres mediante difusión de contenidos pedagógicos de autoprotección.' },
        { code: 'Prioridad 2', desc: 'Fortalecimiento de la gobernanza del riesgo: protocolos de contingencia sísmica (IMP-009, RAD-009).' },
        { code: 'Prioridad 4', desc: 'Aumento de la preparación para casos de desastre con sistemas de alerta y radiodifusión de emergencia.' },
      ]
    },
    ESFERA: {
      title: 'Proyecto Esfera: Normas Humanitarias Mínimas',
      desc: 'Garantía del derecho a la información oportuna y accesible en situaciones de contingencia.',
      color: 'text-purple-400',
      items: [
        { code: 'Norma Esfera 1', desc: 'Comunicación con las comunidades afectadas: acceso a canales bidireccionales y retroalimentación.' },
        { code: 'Norma Esfera 2', desc: 'Información vital transparente sobre albergues, servicios básicos y asistencia sanitaria.' },
      ]
    },
    SMART: {
      title: 'Criterios OCDE / SMART para Indicadores de Gestión',
      desc: 'Metodología aplicada en la construcción de los 158 indicadores del sistema MPPCI.',
      color: 'text-teal-400',
      items: [
        { code: 'Specific (Específico)', desc: 'Códigos estandarizados por eje: IMP, RAD, TV, WEB, RED, RTV, CON, MON, GES.' },
        { code: 'Measurable (Medible)', desc: 'Validación en tres niveles (Integridad, Consistencia Lógica, Validación Cruzada).' },
        { code: 'Achievable (Alcanzable)', desc: 'Metas ponderadas según capacidades operativas y presupuesto asignado.' },
        { code: 'Relevant (Relevante)', desc: 'KPI Maestro (IEC) e índices sintéticos (IVI, IRT, ICD, EE).' },
        { code: 'Time-bound (Temporal)', desc: 'Ciclo semanal epidemiológico con corte estricto los lunes a las 10:00 AM.' },
      ]
    }
  };

  const current = standardsData[selectedStandard];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Space_Grotesk']">
                Alineación con Estándares Internacionales & Metodologías
              </h2>
              <p className="text-xs text-slate-400">Marcos normativos aplicados en el diseño del sistema MPPCI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {(['UNESCO', 'UIT', 'SENDAI', 'ESFERA', 'SMART'] as const).map(std => (
            <button
              key={std}
              onClick={() => setSelectedStandard(std)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStandard === std
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {std}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
          <div>
            <h3 className={`text-sm font-bold ${current.color} font-['Space_Grotesk']`}>
              {current.title}
            </h3>
            <p className="text-slate-400 mt-1">{current.desc}</p>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            {current.items.map((item, idx) => (
              <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200">{item.code}: </span>
                  <span className="text-slate-300">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
