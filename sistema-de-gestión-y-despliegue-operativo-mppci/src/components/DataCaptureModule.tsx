import React, { useState, useEffect } from 'react';
import { 
  FileEdit, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Save, 
  Send, 
  Layers, 
  Tv, 
  Radio, 
  Globe, 
  Users, 
  Lock, 
  Sparkles,
  Info,
  Calendar,
  Building2,
  Clock,
  Hash,
  Check,
  ShieldCheck,
  Newspaper,
  Share2,
  Award,
  Download,
  RotateCcw,
  ArrowRight,
  UserCheck,
  ChevronDown,
  Calculator,
  FileSpreadsheet,
  DatabaseZap
} from 'lucide-react';
import { 
  FullWeeklyReport, 
  ControlVariables, 
  MediaOperationalData, 
  PlatformsTechnicalData, 
  StrategicMIPCCIData, 
  TalentVulnerabilityRow,
  ValidationItem,
  CalculatedMasterKPIs,
  RACIRole,
  EnteInfo,
  UserAccount,
  Eje1InstrumentoData,
  OpinionMatrixAlert,
  CriticalTowerStatus,
  MunicipalityData,
  IndicatorModule
} from '../types';
import { 
  calculateMasterKPIs, 
  runThreeLevelValidation, 
  generateIntegrityHash 
} from '../utils/engine';
import { ENTES_MIPCCI, CRITICAL_TOWERS, OPINION_MATRIX_ALERTS, MUNICIPALITIES_DATA } from '../data/mockData';
import { INITIAL_EJE1_DATA } from '../data/mockInstrumentData';
import { INITIAL_USERS } from '../data/usersData';

import { 
  CaptureModuleKey, 
  CAPTURE_MODULES_CONFIG, 
  isUserAuthorizedForCaptureModule, 
  getAuthorizedCaptureModules,
  getDefaultCaptureModuleForUser
} from '../utils/capturePermissions';

// Sub-components
import { ControlVariablesSection } from './instrument/ControlVariablesSection';
import { Eje1MediosInstrumentoCapture } from './instrument/Eje1MediosInstrumentoCapture';
import { Eje2PlataformasCapture } from './instrument/Eje2PlataformasCapture';
import { Eje3InteligenciaCapture } from './instrument/Eje3InteligenciaCapture';
import { Eje4GestionEstrategicaCapture } from './instrument/Eje4GestionEstrategicaCapture';
import { ScicFormulaAssistantModal } from './ScicFormulaAssistantModal';
import { EnteCaptureModule } from './EnteCaptureModule';

interface DataCaptureModuleProps {
  currentReport: FullWeeklyReport;
  onSaveReport: (report: FullWeeklyReport) => void;
  currentRole: RACIRole;
  currentUser?: UserAccount | null;
  initialCaptureModule?: CaptureModuleKey;
  onNavigateModule?: (module: IndicatorModule) => void;
  onSelectUser?: (user: UserAccount) => void;
  onOpenResetModal?: () => void;
  onOpenExcelImportModal?: () => void;
}

export const DataCaptureModule: React.FC<DataCaptureModuleProps> = ({
  currentReport,
  onSaveReport,
  currentRole,
  currentUser,
  initialCaptureModule,
  onNavigateModule,
  onSelectUser,
  onOpenResetModal,
  onOpenExcelImportModal
}) => {
  // Determine if logged-in user is Super Admin
  const isSuperAdmin = currentUser?.rolSistema === 'SUPER_ADMIN';

  // Determine if logged-in user is an Ente operator (restricted to their own Ente)
  const isEnteOperator = currentUser && 
    currentUser.enteAdscrito !== 'MPPCI_CENTRAL' && 
    !isSuperAdmin && 
    currentUser.rolSistema !== 'MINISTRO' && 
    currentUser.rolSistema !== 'VICEMINISTRO' && 
    currentUser.rolSistema !== 'AUDITOR_CONTRALOR';

  const userEnte = isEnteOperator
    ? ENTES_MIPCCI.find(e => e.id === currentUser?.enteAdscrito || e.siglas === currentUser?.enteAdscrito) || ENTES_MIPCCI[0]
    : null;

  // Authorized capture modules for this user
  const authorizedModules = getAuthorizedCaptureModules(currentUser);

  // Active module state
  const [activeTab, setActiveTab] = useState<CaptureModuleKey>(() => {
    if (initialCaptureModule && isUserAuthorizedForCaptureModule(currentUser, initialCaptureModule)) {
      return initialCaptureModule;
    }
    return getDefaultCaptureModuleForUser(currentUser);
  });

  // Keep active tab in sync if initialCaptureModule changes or user changes
  useEffect(() => {
    if (initialCaptureModule && isUserAuthorizedForCaptureModule(currentUser, initialCaptureModule)) {
      setActiveTab(initialCaptureModule);
    } else if (!isUserAuthorizedForCaptureModule(currentUser, activeTab)) {
      setActiveTab(getDefaultCaptureModuleForUser(currentUser));
    }
  }, [initialCaptureModule, currentUser]);

  // Local state for live editable data
  const [control, setControl] = useState<ControlVariables>(() => {
    if (userEnte) {
      return {
        ...currentReport.control,
        enteAdscrito: userEnte.siglas,
        responsableEnte: `${currentUser?.nombre} ${currentUser?.apellido} (${currentUser?.cargo})`,
        cedulaIdentidad: currentUser?.cedula || userEnte.cedula,
        correo: currentUser?.email || userEnte.email,
        regionLocalidad: userEnte.region
      };
    }
    return currentReport.control;
  });

  const [eje1Data, setEje1Data] = useState<Eje1InstrumentoData>(currentReport.eje1Data || INITIAL_EJE1_DATA);
  const [medios, setMedios] = useState<MediaOperationalData>(currentReport.mediosData);
  const [plataformas, setPlataformas] = useState<PlatformsTechnicalData>(currentReport.plataformasData);
  const [strategic, setStrategic] = useState<StrategicMIPCCIData>(currentReport.strategicData);
  const [vulnerabilityRows, setVulnerabilityRows] = useState<TalentVulnerabilityRow[]>(currentReport.vulnerabilityRows);
  const [opinionAlerts, setOpinionAlerts] = useState<OpinionMatrixAlert[]>(currentReport.opinionAlerts || OPINION_MATRIX_ALERTS);
  const [criticalTowers, setCriticalTowers] = useState<CriticalTowerStatus[]>(CRITICAL_TOWERS);
  const [municipalities] = useState<MunicipalityData[]>(MUNICIPALITIES_DATA);

  // Sync if currentUser changes
  useEffect(() => {
    if (currentUser) {
      const ente = ENTES_MIPCCI.find(e => e.id === currentUser.enteAdscrito || e.siglas === currentUser.enteAdscrito);
      if (ente) {
        setControl(prev => ({
          ...prev,
          enteAdscrito: ente.siglas,
          responsableEnte: `${currentUser.nombre} ${currentUser.apellido} (${currentUser.cargo})`,
          cedulaIdentidad: currentUser.cedula,
          correo: currentUser.email,
          regionLocalidad: ente.region
        }));
      }
    }
  }, [currentUser]);

  // Notification / confirmation feedback
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isFormulaAssistantOpen, setIsFormulaAssistantOpen] = useState(false);

  // Real-time validations
  const liveValidations: ValidationItem[] = runThreeLevelValidation(
    control,
    medios,
    plataformas,
    strategic,
    vulnerabilityRows
  );

  const errorsCount = liveValidations.filter(v => v.severidad === 'ERROR' && !v.esValido).length;
  const warningsCount = liveValidations.filter(v => v.severidad === 'ADVERTENCIA' && !v.esValido).length;
  const passCount = liveValidations.filter(v => v.esValido).length;

  const handleSave = (finalSubmit = false) => {
    const computedKPIs = calculateMasterKPIs(medios, plataformas, strategic, vulnerabilityRows);
    const validations = runThreeLevelValidation(control, medios, plataformas, strategic, vulnerabilityRows);
    const hash = generateIntegrityHash(currentReport.id, new Date().toISOString(), computedKPIs);

    const hasErrors = validations.some(v => v.severidad === 'ERROR' && !v.esValido);

    const updatedReport: FullWeeklyReport = {
      ...currentReport,
      control,
      eje1Data,
      mediosData: medios,
      plataformasData: plataformas,
      strategicData: strategic,
      vulnerabilityRows,
      opinionAlerts,
      kpisCalculados: computedKPIs,
      validaciones: validations,
      status: finalSubmit ? (hasErrors ? 'OBSERVADO' : 'EN_REVISION') : 'BORRADOR',
      hashIntegridad: hash,
      fechaUltimaModificacion: new Date().toISOString()
    };

    onSaveReport(updatedReport);
    setSaveMessage(
      finalSubmit 
        ? `¡Datos de ${control.enteAdscrito} refrendados con hash criptográfico SHA-256 y enviados a Viceministerio!` 
        : `¡Borrador de ${control.enteAdscrito} guardado exitosamente en el sistema!`
    );
    setTimeout(() => setSaveMessage(null), 5000);
  };

  const handleExportJSON = () => {
    const exportData = {
      control,
      ejeActivo: activeTab,
      eje1Data: isUserAuthorizedForCaptureModule(currentUser, 'EJE_1') ? eje1Data : undefined,
      plataformasData: isUserAuthorizedForCaptureModule(currentUser, 'EJE_2') ? plataformas : undefined,
      eje3Data: isUserAuthorizedForCaptureModule(currentUser, 'EJE_3') ? currentReport.eje3Data : undefined,
      vulnerabilityData: isUserAuthorizedForCaptureModule(currentUser, 'EJE_3') ? vulnerabilityRows : undefined,
      strategicData: isUserAuthorizedForCaptureModule(currentUser, 'EJE_4') ? strategic : undefined,
      timestamp: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CAPTURA_${activeTab}_${control.enteAdscrito}_SEM${control.semanaEpidemiologica}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Check if active module is authorized for current user
  const isAuthorizedForCurrentTab = isUserAuthorizedForCaptureModule(currentUser, activeTab);

  // Key sample test users to demo the RBAC permissions
  const sampleUsers = [
    { id: 'USR-004', label: 'Gabriel Morales (VTV • Medios/TV)', user: INITIAL_USERS.find(u => u.id === 'USR-004') },
    { id: 'USR-005', label: 'Carlos Mendoza (REDTV • Transmisión/TDA)', user: INITIAL_USERS.find(u => u.id === 'USR-005') },
    { id: 'USR-006', label: 'Isbemar Jiménez (RNV • Radial)', user: INITIAL_USERS.find(u => u.id === 'USR-006') },
    { id: 'USR-009', label: 'Jorge Márquez (CONATEL • Regulatorio)', user: INITIAL_USERS.find(u => u.id === 'USR-009') },
    { id: 'USR-021', label: 'Carmen Salazar (SAINGO • Imprenta/Vulnerab.)', user: INITIAL_USERS.find(u => u.id === 'USR-021') },
    { id: 'USR-001', label: 'Sahib Franco (Super Admin • Todos los Módulos)', user: INITIAL_USERS.find(u => u.id === 'USR-001') },
    { id: 'USR-010', label: 'Lucía Sánchez (Analista • Perfil Lectura)', user: INITIAL_USERS.find(u => u.id === 'USR-010') }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      
      {/* Top Bar with Institutional Context and Role Badge */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white border border-slate-800 shadow-lg space-y-4">
        
        {/* User Institutional Authorization Strip */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white">
                  {currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : 'Usuario en Sesión'}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {currentUser?.rolSistema}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700">
                  Ente: {currentUser?.enteAdscrito}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Nivel de Acceso: <span className="text-slate-200 font-semibold">{currentUser?.nivelAcceso}</span> • 
                RACI: <span className="text-blue-300 font-bold">{currentUser?.raciRole}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-wrap">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-blue-950/80 border border-blue-800 rounded-lg text-[11px] text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Módulos de Carga Habilitados:</span>
              <span className="font-bold font-mono text-white bg-blue-600 px-1.5 py-0.2 rounded">
                {authorizedModules.length} de 5
              </span>
            </div>

            {/* Quick Profile Simulator Toggle (Super Admin Only) */}
            {isSuperAdmin && onSelectUser && (
              <div className="relative">
                <button
                  onClick={() => setIsSimulatorOpen(prev => !prev)}
                  className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors"
                  title="Simular cambio de usuario para comprobar permisos RBAC"
                >
                  <Users className="w-3 h-3 text-blue-400" />
                  <span>Simulador RBAC</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {isSimulatorOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 text-xs space-y-1 animate-in fade-in">
                    <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800">
                      Cambiar Perfil de Carga (Prueba RBAC)
                    </div>
                    {sampleUsers.map(sample => {
                      if (!sample.user) return null;
                      const isSelected = currentUser?.id === sample.user.id;
                      return (
                        <button
                          key={sample.id}
                          onClick={() => {
                            onSelectUser(sample.user!);
                            setIsSimulatorOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-blue-600 text-white font-bold' 
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{sample.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Title and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded font-mono font-semibold">
                SISTEMA DE GESTIÓN Y DESPLIEGUE OPERATIVO • VSCC
              </span>
              <span className="text-xs text-slate-400 font-medium">Corte Semanal de Gestión</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mt-1 font-['Space_Grotesk']">
              Captura de Indicadores de Gestión y Despliegue Operativo
            </h1>
            <p className="text-xs text-slate-300">
              Módulos individuales de recolección y fiscalización con control de visibilidad y acceso por Ente Adscrito.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {isSuperAdmin && onOpenExcelImportModal && (
              <button
                type="button"
                onClick={onOpenExcelImportModal}
                className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                title="Cargar archivo Excel (.xlsx, .xls o .csv) para poblar los formularios automáticamente"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
                <span>Carga Masiva Excel</span>
              </button>
            )}

            {isSuperAdmin && onOpenResetModal && (
              <button
                type="button"
                onClick={onOpenResetModal}
                className="flex items-center space-x-1.5 bg-rose-700/80 hover:bg-rose-600 text-white border border-rose-500/40 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                title="Poner a cero todos los indicadores para iniciar un levantamiento real"
              >
                <DatabaseZap className="w-3.5 h-3.5 text-rose-200" />
                <span>Poner a Cero (0)</span>
              </button>
            )}

            <button
              onClick={() => setIsFormulaAssistantOpen(true)}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              title="Calcular indicadores con fórmulas oficiales del SCIC"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-200" />
              <span>Calculadora SCIC</span>
            </button>

            {isSuperAdmin && (
              <button
                onClick={handleExportJSON}
                className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Exportar archivo estructurado JSON del módulo activo"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Exportar JSON</span>
              </button>
            )}
            <button
              onClick={() => handleSave(false)}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-slate-300" />
              <span>Guardar Borrador</span>
            </button>
            <button
              onClick={() => handleSave(true)}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Refrendar y Enviar (RACI)</span>
            </button>
          </div>
        </div>

        {saveMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{saveMessage}</span>
          </div>
        )}

        {/* 5 INDIVIDUAL CAPTURE MODULES SELECTOR (VISIBLE ONLY IF USER IS AUTHORIZED) */}
        <div className="pt-2">
          <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center justify-between">
            <span>Módulos de Carga Asignados a su Usuario ({authorizedModules.length}):</span>
            <span className="text-[10px] text-slate-400 normal-case">
              Los módulos no asignados a su Ente permanecen ocultos conforme a la política de seguridad
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
            {CAPTURE_MODULES_CONFIG.map(mod => {
              const isAuthorized = isUserAuthorizedForCaptureModule(currentUser, mod.key);
              const isActive = activeTab === mod.key;

              // If NOT authorized, DO NOT SHOW or show as strictly locked if requested
              // The user prompt explicitly requested: "Modulos que deben ser visibles solo para los usuarios que deben cargar esos datos."
              if (!isAuthorized) {
                return null; // COMPLETELY HIDDEN for unauthorized users!
              }

              return (
                <button
                  key={mod.key}
                  onClick={() => setActiveTab(mod.key)}
                  className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 border-blue-400 text-white shadow-md ring-2 ring-blue-400/40'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {mod.codigoOficial}
                      </span>
                      <span className={`text-[9px] font-semibold ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                        {mod.badgeTexto}
                      </span>
                    </div>
                    <div className="text-xs font-bold font-['Space_Grotesk'] leading-snug">
                      {mod.nombreCorto}
                    </div>
                  </div>
                  <div className={`text-[10px] mt-2 line-clamp-1 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {mod.responsablesCarga}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Layout: Active Capture Form on Left + Live 3-Level Validation Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form content for the Selected Module */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Security Guard: If user navigated to an unauthorized module */}
          {!isAuthorizedForCurrentTab ? (
            <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                  Módulo de Carga No Autorizado para su Ente
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Su cuenta asignada a <b>{currentUser?.enteAdscrito || 'su Ente'}</b> no tiene atribución para diligenciar este módulo de datos.
                  Conforme a la providencia de gobernanza RACI, cada Ente carga únicamente los indicadores técnicos y operativos correspondientes a su competencia.
                </p>
              </div>

              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Módulos disponibles para su perfil:
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {authorizedModules.map(mod => (
                    <button
                      key={mod.key}
                      onClick={() => setActiveTab(mod.key)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Ir a {mod.nombreCorto} →
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* MODULE 0: PLANILLA PARAMETRIZADA POR ENTE (SCIC 267 INDICADORES) */}
              {activeTab === 'SCIC_ENTE' && (
                <EnteCaptureModule
                  currentReport={currentReport}
                  onSaveReport={onSaveReport}
                  currentUser={currentUser}
                  currentRole={currentRole}
                  onOpenExcelImportModal={onOpenExcelImportModal}
                  onOpenFormulaAssistant={(_code) => {
                    setIsFormulaAssistantOpen(true);
                  }}
                />
              )}

              {/* MODULE 1: VARIABLES DE CONTROL */}
              {activeTab === 'CONTROL' && (
                <div className="space-y-4">
                  <ControlVariablesSection
                    control={control}
                    onChange={(updated) => setControl(prev => ({ ...prev, ...updated }))}
                    readOnly={false}
                    enteInfo={userEnte}
                  />

                  {/* Summary of control variables status */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Verificación de Metadatos de Corte Operativo
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block">Ente Reportante:</span>
                        <span className="font-bold text-slate-900 font-mono">{control.enteAdscrito}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Semana Epidemiológica:</span>
                        <span className="font-bold text-blue-700 font-mono">Semana {control.semanaEpidemiologica}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Período de Corte:</span>
                        <span className="font-bold text-slate-900 font-mono">{control.periodoDesde} al {control.periodoHasta}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Responsable de Carga:</span>
                        <span className="font-bold text-slate-900">{control.responsableEnte}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Cédula de Identidad:</span>
                        <span className="font-bold text-slate-900 font-mono">{control.cedulaIdentidad}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Correo Institucional:</span>
                        <span className="font-bold text-slate-900 font-mono">{control.correo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 2: EJE 1: MEDIOS DE COMUNICACIÓN (INSTRUMENTO) */}
              {activeTab === 'EJE_1' && (
                <Eje1MediosInstrumentoCapture
                  eje1Data={eje1Data}
                  setEje1Data={setEje1Data}
                  control={control}
                  currentUser={currentUser}
                  userEnte={userEnte}
                />
              )}

              {/* MODULE 3: EJE 2: PLATAFORMAS & ESPECTRO */}
              {activeTab === 'EJE_2' && (
                <Eje2PlataformasCapture
                  plataformas={plataformas}
                  onChangePlataformas={setPlataformas}
                  criticalTowers={criticalTowers}
                  control={control}
                  currentUser={currentUser}
                  report={currentReport}
                  onSaveReport={onSaveReport}
                  currentRole={currentRole}
                />
              )}

              {/* MODULE 4: EJE 3: INTELIGENCIA & VULNERABILIDAD */}
              {activeTab === 'EJE_3' && (
                <Eje3InteligenciaCapture
                  vulnerabilityRows={vulnerabilityRows}
                  onChangeVulnerabilityRows={setVulnerabilityRows}
                  opinionAlerts={opinionAlerts}
                  onChangeOpinionAlerts={setOpinionAlerts}
                  control={control}
                  currentUser={currentUser}
                  report={currentReport}
                  onSaveReport={onSaveReport}
                  currentRole={currentRole}
                />
              )}

              {/* MODULE 5: EJE 4: GESTIÓN ESTRATÉGICA */}
              {activeTab === 'EJE_4' && (
                <Eje4GestionEstrategicaCapture
                  strategic={strategic}
                  onChangeStrategic={setStrategic}
                  municipalities={municipalities}
                  control={control}
                  currentUser={currentUser}
                  report={currentReport}
                  onSaveReport={onSaveReport}
                  currentRole={currentRole}
                />
              )}
            </>
          )}

        </div>

        {/* Right Column: 3-Level Real-Time Validation Engine Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                    Motor de Validación (3 Niveles)
                  </h3>
                  <p className="text-[10px] text-slate-500">Integridad de datos en tiempo real</p>
                </div>
              </div>
              <span className="text-[10px] text-blue-700 bg-blue-50 font-bold px-2 py-0.5 rounded border border-blue-200 font-mono">
                EN VIVO
              </span>
            </div>

            {/* Validation Stats Pill */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl">
                <span className="text-emerald-700 font-bold block text-base font-mono">{passCount}</span>
                <span className="text-[10px] text-emerald-600 font-medium">Válidos</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl">
                <span className="text-amber-700 font-bold block text-base font-mono">{warningsCount}</span>
                <span className="text-[10px] text-amber-600 font-medium">Avisos</span>
              </div>
              <div className="bg-rose-50 border border-rose-200 p-2 rounded-xl">
                <span className="text-rose-700 font-bold block text-base font-mono">{errorsCount}</span>
                <span className="text-[10px] text-rose-600 font-medium">Errores</span>
              </div>
            </div>

            {/* Validation Items List grouped by Level */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {[1, 2, 3].map(lvl => {
                const lvlItems = liveValidations.filter(v => v.nivel === lvl);
                const lvlName = lvl === 1 ? 'Nivel 1: Integridad de Entrada' : lvl === 2 ? 'Nivel 2: Consistencia Lógica' : 'Nivel 3: Validación Cruzada';
                return (
                  <div key={lvl} className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span>{lvlName}</span>
                      <span className="text-[10px] text-slate-400">({lvlItems.length})</span>
                    </div>

                    {lvlItems.map(item => (
                      <div
                        key={item.id}
                        className={`p-2.5 rounded-xl border text-xs space-y-1 transition-colors ${
                          item.esValido 
                            ? 'bg-slate-50 border-slate-200 text-slate-700' 
                            : item.severidad === 'ERROR'
                            ? 'bg-rose-50 border-rose-200 text-rose-900'
                            : 'bg-amber-50 border-amber-200 text-amber-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <span className="font-semibold">{item.titulo}</span>
                          {item.esValido ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className={`w-3.5 h-3.5 flex-shrink-0 ${item.severidad === 'ERROR' ? 'text-rose-600' : 'text-amber-600'}`} />
                          )}
                        </div>
                        <p className="text-[10px] opacity-85 leading-relaxed">{item.descripcion}</p>
                        {item.valorActual !== undefined && (
                          <div className="text-[10px] font-mono font-bold opacity-90 pt-0.5">
                            Valor: {String(item.valorActual)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Calculadora de Fórmulas SCIC */}
        <ScicFormulaAssistantModal
          isOpen={isFormulaAssistantOpen}
          onClose={() => setIsFormulaAssistantOpen(false)}
        />
      </div>
    </div>
  );
};
