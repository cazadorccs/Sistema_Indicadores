import React, { useState } from 'react';
import { 
  Tv, 
  Radio, 
  Globe, 
  Newspaper, 
  Share2, 
  Award, 
  Building2, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { Eje1InstrumentoData, UserAccount, EnteInfo, ControlVariables } from '../../types';
import { ImpresosSection } from './ImpresosSection';
import { RadiosSection } from './RadiosSection';
import { AudiovisualesSection } from './AudiovisualesSection';
import { DigitalesSection } from './DigitalesSection';
import { RedesSocialesSection } from './RedesSocialesSection';
import { CompositeIndicatorsAnnex } from './CompositeIndicatorsAnnex';

interface Eje1MediosInstrumentoCaptureProps {
  eje1Data: Eje1InstrumentoData;
  setEje1Data: React.Dispatch<React.SetStateAction<Eje1InstrumentoData>>;
  control: ControlVariables;
  currentUser?: UserAccount | null;
  userEnte?: EnteInfo | null;
}

export type Eje1SubTab = 
  | '1A_IMPRESOS' 
  | '1B_RADIOS' 
  | '1C_AUDIOVISUALES' 
  | '1D_DIGITALES' 
  | '1E_REDES' 
  | '1F_COMPUESTOS';

export const Eje1MediosInstrumentoCapture: React.FC<Eje1MediosInstrumentoCaptureProps> = ({
  eje1Data,
  setEje1Data,
  control,
  currentUser,
  userEnte
}) => {
  // Determine user category default sub-tab
  const getDefaultSubTab = (): Eje1SubTab => {
    if (!userEnte) return '1C_AUDIOVISUALES';
    const tipo = userEnte.tipo;
    if (tipo === 'RADIO') return '1B_RADIOS';
    if (tipo === 'IMPRESO') return '1A_IMPRESOS';
    if (tipo === 'TELEVISION') return '1C_AUDIOVISUALES';
    if (tipo === 'DIGITAL') return '1D_DIGITALES';
    return '1C_AUDIOVISUALES';
  };

  const [activeSubTab, setActiveSubTab] = useState<Eje1SubTab>(getDefaultSubTab());

  // --- Handlers for Impresos ---
  const handleUpdateImpresosProduccion = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.impresos.produccion];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, impresos: { ...prev.impresos, produccion: updated } };
    });
  };

  const handleUpdateImpresosEditorial = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.impresos.editorial];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, impresos: { ...prev.impresos, editorial: updated } };
    });
  };

  const handleUpdateImpresosDistribucion = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.impresos.distribucion];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, impresos: { ...prev.impresos, distribucion: updated } };
    });
  };

  // --- Handlers for Radios ---
  const handleUpdateRadiosAlcance = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.radios.alcance];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, radios: { ...prev.radios, alcance: updated } };
    });
  };

  const handleUpdateRadiosProduccion = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.radios.produccion];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, radios: { ...prev.radios, produccion: updated } };
    });
  };

  const handleUpdateRadiosDesgloseTematico = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.radios.desgloseTematico];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, radios: { ...prev.radios, desgloseTematico: updated } };
    });
  };

  const handleUpdateRadiosInfraestructura = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.radios.infraestructura];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, radios: { ...prev.radios, infraestructura: updated } };
    });
  };

  // --- Handlers for Audiovisuales ---
  const handleUpdateAudiovisualesAlcance = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.audiovisuales.alcance];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, audiovisuales: { ...prev.audiovisuales, alcance: updated } };
    });
  };

  const handleUpdateAudiovisualesProduccion = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.audiovisuales.produccion];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, audiovisuales: { ...prev.audiovisuales, produccion: updated } };
    });
  };

  const handleUpdateAudiovisualesDesgloseProduccion = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.audiovisuales.desgloseProduccion];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, audiovisuales: { ...prev.audiovisuales, desgloseProduccion: updated } };
    });
  };

  const handleUpdateAudiovisualesLogistica = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.audiovisuales.logistica];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, audiovisuales: { ...prev.audiovisuales, logistica: updated } };
    });
  };

  // --- Handlers for Digitales ---
  const handleUpdateDigitalesPortales = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.digitales.portales];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, digitales: { ...prev.digitales, portales: updated } };
    });
  };

  const handleUpdateDigitalesContenidoTematico = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.digitales.contenidoTematico];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, digitales: { ...prev.digitales, contenidoTematico: updated } };
    });
  };

  const handleUpdateDigitalesSuscripciones = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.digitales.suscripciones];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, digitales: { ...prev.digitales, suscripciones: updated } };
    });
  };

  const handleUpdateDigitalesTramitesServicios = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.digitales.tramitesServicios];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, digitales: { ...prev.digitales, tramitesServicios: updated } };
    });
  };

  // --- Handlers for Redes Sociales ---
  const handleUpdateRedesKpisCanales = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.redesSociales.kpisCanales];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, redesSociales: { ...prev.redesSociales, kpisCanales: updated } };
    });
  };

  const handleUpdateRedesAlcanceAudiencia = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.redesSociales.alcanceAudiencia];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, redesSociales: { ...prev.redesSociales, alcanceAudiencia: updated } };
    });
  };

  const handleUpdateRedesProduccionTactica = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.redesSociales.produccionTactica];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, redesSociales: { ...prev.redesSociales, produccionTactica: updated } };
    });
  };

  const handleUpdateRedesEntrevistas = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.redesSociales.entrevistas];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, redesSociales: { ...prev.redesSociales, entrevistas: updated } };
    });
  };

  const handleUpdateRedesCreadoresAliados = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.redesSociales.creadoresAliados];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, redesSociales: { ...prev.redesSociales, creadoresAliados: updated } };
    });
  };

  const handleUpdateRedesCanalesActivos = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.redesSociales.canalesActivos];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, redesSociales: { ...prev.redesSociales, canalesActivos: updated } };
    });
  };

  const handleUpdateRedesEngagementPorContenido = (index: number, field: string, value: any) => {
    setEje1Data(prev => {
      const updated = [...prev.redesSociales.engagementPorContenido];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, redesSociales: { ...prev.redesSociales, engagementPorContenido: updated } };
    });
  };

  const subTabs = [
    { id: '1A_IMPRESOS' as const, label: '1.A Medios Impresos', icon: Newspaper, count: '17 Indicadores' },
    { id: '1B_RADIOS' as const, label: '1.B Radios AM/FM', icon: Radio, count: '18 Indicadores' },
    { id: '1C_AUDIOVISUALES' as const, label: '1.C Audiovisuales / TV', icon: Tv, count: '19 Indicadores' },
    { id: '1D_DIGITALES' as const, label: '1.D Medios Digitales', icon: Globe, count: '18 Indicadores' },
    { id: '1E_REDES' as const, label: '1.E Redes Sociales', icon: Share2, count: '16 Indicadores' },
    { id: '1F_COMPUESTOS' as const, label: 'Anexo: Compuestos (IDMG)', icon: Award, count: 'Fórmulas Clave' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Module Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  EJE 1 • INSTRUMENTO OFICIAL
                </span>
                <span className="text-xs text-slate-500">65+ Indicadores Estandarizados</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                Medios de Comunicación Social del Estado
              </h2>
            </div>
          </div>

          {/* Ente Indicator Badge */}
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600">Ente Creador:</span>
            <span className="font-bold text-slate-900 font-mono">{control.enteAdscrito}</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">Semana:</span>
            <span className="font-bold text-blue-700 font-mono">N° {control.semanaEpidemiologica}</span>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex space-x-1.5 overflow-x-auto bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {subTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-emerald-700 shadow-sm border border-slate-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Section 1.A */}
      {activeSubTab === '1A_IMPRESOS' && (
        <ImpresosSection
          produccion={eje1Data.impresos.produccion}
          editorial={eje1Data.impresos.editorial}
          distribucion={eje1Data.impresos.distribucion}
          onChangeProduccion={handleUpdateImpresosProduccion}
          onChangeEditorial={handleUpdateImpresosEditorial}
          onChangeDistribucion={handleUpdateImpresosDistribucion}
        />
      )}

      {/* Sub-Section 1.B */}
      {activeSubTab === '1B_RADIOS' && (
        <RadiosSection
          alcance={eje1Data.radios.alcance}
          produccion={eje1Data.radios.produccion}
          desgloseTematico={eje1Data.radios.desgloseTematico}
          infraestructura={eje1Data.radios.infraestructura}
          onChangeAlcance={handleUpdateRadiosAlcance}
          onChangeProduccion={handleUpdateRadiosProduccion}
          onChangeDesgloseTematico={handleUpdateRadiosDesgloseTematico}
          onChangeInfraestructura={handleUpdateRadiosInfraestructura}
        />
      )}

      {/* Sub-Section 1.C */}
      {activeSubTab === '1C_AUDIOVISUALES' && (
        <AudiovisualesSection
          alcance={eje1Data.audiovisuales.alcance}
          produccion={eje1Data.audiovisuales.produccion}
          desgloseProduccion={eje1Data.audiovisuales.desgloseProduccion}
          logistica={eje1Data.audiovisuales.logistica}
          onChangeAlcance={handleUpdateAudiovisualesAlcance}
          onChangeProduccion={handleUpdateAudiovisualesProduccion}
          onChangeDesgloseProduccion={handleUpdateAudiovisualesDesgloseProduccion}
          onChangeLogistica={handleUpdateAudiovisualesLogistica}
        />
      )}

      {/* Sub-Section 1.D */}
      {activeSubTab === '1D_DIGITALES' && (
        <DigitalesSection
          portales={eje1Data.digitales.portales}
          contenidoTematico={eje1Data.digitales.contenidoTematico}
          suscripciones={eje1Data.digitales.suscripciones}
          tramitesServicios={eje1Data.digitales.tramitesServicios}
          onChangePortales={handleUpdateDigitalesPortales}
          onChangeContenidoTematico={handleUpdateDigitalesContenidoTematico}
          onChangeSuscripciones={handleUpdateDigitalesSuscripciones}
          onChangeTramitesServicios={handleUpdateDigitalesTramitesServicios}
        />
      )}

      {/* Sub-Section 1.E */}
      {activeSubTab === '1E_REDES' && (
        <RedesSocialesSection
          kpisCanales={eje1Data.redesSociales.kpisCanales}
          alcanceAudiencia={eje1Data.redesSociales.alcanceAudiencia}
          produccionTactica={eje1Data.redesSociales.produccionTactica}
          entrevistas={eje1Data.redesSociales.entrevistas}
          creadoresAliados={eje1Data.redesSociales.creadoresAliados}
          canalesActivos={eje1Data.redesSociales.canalesActivos}
          engagementPorContenido={eje1Data.redesSociales.engagementPorContenido}
          onChangeKpisCanales={handleUpdateRedesKpisCanales}
          onChangeAlcanceAudiencia={handleUpdateRedesAlcanceAudiencia}
          onChangeProduccionTactica={handleUpdateRedesProduccionTactica}
          onChangeEntrevistas={handleUpdateRedesEntrevistas}
          onChangeCreadoresAliados={handleUpdateRedesCreadoresAliados}
          onChangeCanalesActivos={handleUpdateRedesCanalesActivos}
          onChangeEngagementPorContenido={handleUpdateRedesEngagementPorContenido}
        />
      )}

      {/* Sub-Section 1.F: Indicadores Compuestos */}
      {activeSubTab === '1F_COMPUESTOS' && (
        <CompositeIndicatorsAnnex eje1Data={eje1Data} />
      )}
    </div>
  );
};
