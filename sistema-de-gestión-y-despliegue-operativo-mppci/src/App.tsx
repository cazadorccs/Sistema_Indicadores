import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Tv, 
  Radio, 
  Globe, 
  ShieldAlert, 
  FileEdit, 
  FileCheck2, 
  Bell, 
  Award, 
  Sparkles, 
  Activity,
  Menu,
  X,
  ChevronDown,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Users,
  LogIn,
  LogOut,
  Lock,
  Building2,
  AlertOctagon,
  BookOpen,
  FileSpreadsheet,
  DatabaseZap,
  Eye,
  RotateCcw,
  Settings,
  CheckSquare,
  Search,
  Wifi,
  WifiOff
} from 'lucide-react';

import { PinpointerModal } from './components/PinpointerModal';
import { syncOfflineDraftsWithBackend } from './utils/offlineStore';

import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { DataCaptureModule } from './components/DataCaptureModule';
import { ModuleMedios } from './components/ModuleMedios';
import { ModulePlataformas } from './components/ModulePlataformas';
import { ModuleGestionCom } from './components/ModuleGestionCom';
import { ModuleMIPCCI } from './components/ModuleMIPCCI';
import { AuditRaciTracker } from './components/AuditRaciTracker';
import { AlertsNotificationCenter } from './components/AlertsNotificationCenter';
import { CounterNarrativeModal } from './components/CounterNarrativeModal';
import { AIStrategicBriefModal } from './components/AIStrategicBriefModal';
import { BoletinEjecutivoModal } from './components/BoletinEjecutivoModal';
import { InternationalStandardsModal } from './components/InternationalStandardsModal';
import { UserManagementPanel } from './components/UserManagementPanel';
import { ScicCatalogModule } from './components/ScicCatalogModule';
import { EnteChecklistManager } from './components/EnteChecklistManager';
import { LoginModule } from './components/LoginModule';
import { ResetDataModal } from './components/ResetDataModal';
import { ExcelBulkImportModal } from './components/ExcelBulkImportModal';
import { SystemConfigModal } from './components/SystemConfigModal';
import { SystemConfiguration, getStoredSystemConfig } from './config/systemConfig';
import { createZeroReport, restoreDemoReport, createZeroCriticalTowers, createZeroMunicipalities } from './utils/reportResetEngine';
import MippciLogo from './components/MippciLogo';

import { CiberdefensaDashboard } from './components/dashboards/CiberdefensaDashboard';
import { NocInfraestructuraDashboard } from './components/dashboards/NocInfraestructuraDashboard';
import { AudienciasDigitalDashboard } from './components/dashboards/AudienciasDigitalDashboard';
import { OperatividadMediosDashboard } from './components/dashboards/OperatividadMediosDashboard';
import { ExecutiveSinglePaneDashboard } from './components/dashboards/ExecutiveSinglePaneDashboard';

import { 
  FullWeeklyReport, 
  IndicatorModule, 
  RACIRole, 
  CriticalTowerStatus, 
  OpinionMatrixAlert, 
  MunicipalityData, 
  AuditLogEntry, 
  AutomatedAlertNotification,
  UserAccount
} from './types';
import { 
  INITIAL_REPORT_DATA, 
  CRITICAL_TOWERS, 
  OPINION_MATRIX_ALERTS, 
  MUNICIPALITIES_DATA, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS,
  ENTES_MIPCCI 
} from './data/mockData';
import { INITIAL_USERS, MODULE_LABELS_MAP } from './data/usersData';
import { evaluateAutomatedAlerts, generateIntegrityHash } from './utils/engine';
import { 
  CaptureModuleKey, 
  isUserAuthorizedForCaptureModule, 
  getAuthorizedCaptureModules 
} from './utils/capturePermissions';

export default function App() {
  const [activeModule, setActiveModule] = useState<IndicatorModule>('DASHBOARD_EXECUTIVE_CLEVEL');
  const [currentRole, setCurrentRole] = useState<RACIRole>('MAXIMA_AUTORIDAD');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(INITIAL_USERS[0]); // Lic. Gabriel Morales (VTV - Responsable RACI R)
  const [report, setReport] = useState<FullWeeklyReport>(INITIAL_REPORT_DATA);
  const [criticalTowers, setCriticalTowers] = useState<CriticalTowerStatus[]>(CRITICAL_TOWERS);
  const [opinionAlerts, setOpinionAlerts] = useState<OpinionMatrixAlert[]>(OPINION_MATRIX_ALERTS);
  const [municipalities, setMunicipalities] = useState<MunicipalityData[]>(MUNICIPALITIES_DATA);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<AutomatedAlertNotification[]>(INITIAL_NOTIFICATIONS);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [isTableroControlExpanded, setIsTableroControlExpanded] = useState(false);
  const [simulatedUser, setSimulatedUser] = useState<UserAccount | null>(null);

  // Modals
  const [selectedAlertForAI, setSelectedAlertForAI] = useState<OpinionMatrixAlert | null>(null);
  const [isCounterNarrativeOpen, setIsCounterNarrativeOpen] = useState(false);
  const [isAIStrategicBriefOpen, setIsAIStrategicBriefOpen] = useState(false);
  const [isBoletinEjecutivoOpen, setIsBoletinEjecutivoOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isStandardsOpen, setIsStandardsOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isExcelImportModalOpen, setIsExcelImportModalOpen] = useState(false);
  const [isSystemConfigOpen, setIsSystemConfigOpen] = useState(false);
  const [isPinpointerOpen, setIsPinpointerOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [systemConfig, setSystemConfig] = useState<SystemConfiguration>(getStoredSystemConfig());
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Atajo de teclado global Ctrl+K / Cmd+K para Pinpointer Soberano
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPinpointerOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Monitor de Resiliencia en Red (Offline-First Sync)
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setToastNotification('Conectividad restablecida. Sincronizando capturas pendientes...');
      syncOfflineDraftsWithBackend().then(res => {
        if (res.synced > 0) {
          setToastNotification(`¡${res.synced} captura(s) sincronizadas con el servidor soberano!`);
        }
        setTimeout(() => setToastNotification(null), 4000);
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      setToastNotification('Modo sin conexión activado. Los datos se guardarán localmente (IndexedDB).');
      setTimeout(() => setToastNotification(null), 4000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sincronización continua de la base centralizada para los 5 tableros especializados
  useEffect(() => {
    let isCancelled = false;
    const syncCentralDashboards = async () => {
      try {
        await fetch('/api/dashboards/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            report,
            criticalTowers,
            opinionAlerts
          })
        });
      } catch (err) {
        // En modo local/offline sin conexión o durante recarga
        if (!isCancelled) {
          console.debug('[Tableros Sync] Servidor sincronizado localmente:', err);
        }
      }
    };

    syncCentralDashboards();
    return () => {
      isCancelled = true;
    };
  }, [report, criticalTowers, opinionAlerts]);

  // Handle Reset to Zero
  const handleConfirmResetToZero = () => {
    const zeroReport = createZeroReport(report);
    setReport(zeroReport);
    setCriticalTowers(createZeroCriticalTowers());
    setOpinionAlerts([]);
    setMunicipalities(createZeroMunicipalities());

    const resetLog: AuditLogEntry = {
      id: `AUD-RESET-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      usuario: currentUser ? `${currentUser.nombre} ${currentUser.apellido} (${currentUser.rolSistema})` : 'SUPER_ADMIN',
      rol: currentRole,
      accion: 'PUESTA_A_CERO_PRODUCCION',
      modulo: 'DESPLIEGUE_OPERATIVO',
      detalles: `Puesta a cero de todos los indicadores operativos para inicio de levantamiento real en producción. Ente: ${report.control.enteAdscrito}, Semana: ${report.control.semanaEpidemiologica}`,
      hash: zeroReport.hashIntegridad,
      ip: '10.200.15.42'
    };
    setAuditLogs(prev => [resetLog, ...prev]);
    setToastNotification('¡Todos los indicadores han sido restablecidos a cero (0) para despliegue en producción!');
    setTimeout(() => setToastNotification(null), 6000);
  };

  // Handle Restore Demo Data
  const handleRestoreDemoData = () => {
    const demoReport = restoreDemoReport();
    setReport(demoReport);
    setCriticalTowers(CRITICAL_TOWERS);
    setOpinionAlerts(OPINION_MATRIX_ALERTS);
    setMunicipalities(MUNICIPALITIES_DATA);

    const restoreLog: AuditLogEntry = {
      id: `AUD-RESTORE-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      usuario: currentUser ? `${currentUser.nombre} ${currentUser.apellido} (${currentUser.rolSistema})` : 'SUPER_ADMIN',
      rol: currentRole,
      accion: 'RESTAURAR_DATOS_DEMO',
      modulo: 'DESPLIEGUE_OPERATIVO',
      detalles: 'Restauración de cifras y mediciones de demostración precargadas.',
      hash: demoReport.hashIntegridad,
      ip: '10.200.15.42'
    };
    setAuditLogs(prev => [restoreLog, ...prev]);
    setToastNotification('¡Datos de demostración precargados restaurados exitosamente!');
    setTimeout(() => setToastNotification(null), 6000);
  };

  // Handle Apply Excel Import
  const handleApplyExcelImport = (updatedReport: FullWeeklyReport, summary: { fileName: string; mappedCount: number }) => {
    setReport(updatedReport);

    const importLog: AuditLogEntry = {
      id: `AUD-EXCEL-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      usuario: currentUser ? `${currentUser.nombre} ${currentUser.apellido} (${currentUser.rolSistema})` : 'OPERADOR_CARGA',
      rol: currentRole,
      accion: 'CARGA_MASIVA_EXCEL',
      modulo: 'IMPORTACION_AUTOMATIZADA',
      detalles: `Carga automatizada desde ${summary.fileName}. ${summary.mappedCount} indicadores correlacionados y actualizados.`,
      hash: updatedReport.hashIntegridad,
      ip: '10.200.15.42'
    };
    setAuditLogs(prev => [importLog, ...prev]);

    // Evaluate automated alerts
    const newAlerts = evaluateAutomatedAlerts(updatedReport, criticalTowers, opinionAlerts);
    if (newAlerts.length > 0) {
      setNotifications(prev => [...newAlerts, ...prev]);
    }

    setToastNotification(`¡Carga masiva completada! Se actualizaron ${summary.mappedCount} indicadores desde ${summary.fileName}.`);
    setTimeout(() => setToastNotification(null), 6000);
  };

  // Handle simulated user view for Super Admin
  const handleSimulateUserView = (user: UserAccount | null) => {
    setSimulatedUser(user);
    if (user) {
      const defaultMod: IndicatorModule = 
        user.rolSistema === 'SALA_OPERATIVA_ENTE'
          ? 'CAPTURA'
          : user.permisosModulos.includes('DASHBOARD_EXECUTIVE_CLEVEL')
            ? 'DASHBOARD_EXECUTIVE_CLEVEL'
            : user.permisosModulos.includes('DASHBOARD')
              ? 'DASHBOARD'
              : (user.permisosModulos[0] as IndicatorModule || 'CAPTURA');
      setActiveModule(defaultMod);
      setToastNotification(`👁️ Vista simulada activada para ${user.nombre} ${user.apellido} (${user.enteAdscrito}). Módulos autorizados: ${user.permisosModulos.length}.`);
    } else {
      setActiveModule('DASHBOARD_EXECUTIVE_CLEVEL');
      setToastNotification('Vista de Super Administrador restablecida. Visualizando todos los módulos.');
    }
    setTimeout(() => setToastNotification(null), 5000);
  };

  // Handle user authentication / switch user
  const handleLogin = (user: UserAccount) => {
    setSimulatedUser(null);
    setCurrentUser(user);
    setCurrentRole(user.raciRole);

    const defaultModule: IndicatorModule = 
      user.rolSistema === 'SALA_OPERATIVA_ENTE'
        ? 'CAPTURA'
        : user.permisosModulos.includes('DASHBOARD_EXECUTIVE_CLEVEL')
          ? 'DASHBOARD_EXECUTIVE_CLEVEL'
          : user.permisosModulos.includes('DASHBOARD')
            ? 'DASHBOARD'
            : (user.permisosModulos[0] as IndicatorModule || 'CAPTURA');
    setActiveModule(defaultModule);

    // Register in immutable audit trail
    const loginLog: AuditLogEntry = {
      id: `AUD-LOGIN-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      usuario: `${user.nombre} ${user.apellido} (${user.rolSistema})`,
      rol: user.raciRole,
      accion: 'AUTENTICACION_EXITOSA_RBAC',
      modulo: 'GOBERNANZA_RACI',
      detalles: `Inicio de sesión validado. Ente: ${user.enteAdscrito}, Nivel: ${user.nivelAcceso}, 2FA: ${user.dobleFactorAuth ? 'Activo' : 'No'}`,
      hash: generateIntegrityHash(report),
      ip: '10.200.15.42'
    };
    setAuditLogs(prev => [loginLog, ...prev]);
  };

  const handleLogout = () => {
    if (currentUser) {
      const logoutLog: AuditLogEntry = {
        id: `AUD-LOGOUT-${Date.now().toString(36).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        usuario: `${currentUser.nombre} ${currentUser.apellido}`,
        rol: currentUser.raciRole,
        accion: 'CIERRE_SESION_USUARIO',
        modulo: 'GOBERNANZA_RACI',
        detalles: `Cierre de sesión ordenado por el usuario.`,
        hash: generateIntegrityHash(report),
        ip: '10.200.15.42'
      };
      setAuditLogs(prev => [logoutLog, ...prev]);
    }
    setCurrentUser(null);
    setActiveModule('LOGIN');
  };

  // Save report from DataCaptureModule
  const handleSaveReport = (updatedReport: FullWeeklyReport) => {
    setReport(updatedReport);

    // Append to audit trail
    const newLog: AuditLogEntry = {
      id: `AUD-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      usuario: currentUser ? `${currentUser.nombre} ${currentUser.apellido} (${currentUser.rolSistema})` : `${currentRole} - ${updatedReport.control.responsableEnte}`,
      rol: currentRole,
      accion: 'ACTUALIZAR_REPORTE_SEMANAL',
      modulo: 'EJE_1_AL_4_CONSOLIDADO',
      detalles: `Actualización de indicadores semana ${updatedReport.control.semanaEpidemiologica}. Estado: ${updatedReport.status}`,
      hash: updatedReport.hashIntegridad,
      ip: '10.200.15.42'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Check for automated notifications
    const newAlerts = evaluateAutomatedAlerts(updatedReport, criticalTowers, opinionAlerts);
    if (newAlerts.length > 0) {
      setNotifications(prev => [...newAlerts, ...prev]);
    }
  };

  // Sign off from Audit & RACI
  const handleSignOff = (role: RACIRole, comments: string) => {
    const updatedStatus = role === 'MAXIMA_AUTORIDAD' || role === 'VICEMINISTRO' ? 'APROBADO' : 'EN_REVISION';
    const updatedReport = {
      ...report,
      status: updatedStatus as any,
      fechaUltimaModificacion: new Date().toISOString()
    };
    setReport(updatedReport);

    const signLog: AuditLogEntry = {
      id: `AUD-SIGN-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      usuario: currentUser ? `${currentUser.nombre} ${currentUser.apellido} (${currentUser.cargo})` : `${role} - Firma Digital`,
      rol: role,
      accion: 'FIRMA_Y_REFRENDO_MINISTERIAL',
      modulo: 'GOBERNANZA_RACI',
      detalles: `Refrendo de reporte semana ${report.control.semanaEpidemiologica}. Dictamen: ${comments || 'Aprobado sin observaciones.'}`,
      hash: generateIntegrityHash(updatedReport),
      ip: '10.200.15.42'
    };
    setAuditLogs(prev => [signLog, ...prev]);
  };

  // Handle Counter Narrative Modal
  const handleOpenCounterNarrative = (alert: OpinionMatrixAlert) => {
    setSelectedAlertForAI(alert);
    setIsCounterNarrativeOpen(true);
  };

  const handleApplyCounterNarrative = (alertId: string, narrativeAction: string) => {
    setOpinionAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          contraNarrativaSugerida: narrativeAction,
          estado: 'EN_PROCESO'
        };
      }
      return a;
    }));

    // Register in audit trail
    const actionLog: AuditLogEntry = {
      id: `AUD-AI-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      usuario: currentUser ? `${currentUser.nombre} ${currentUser.apellido}` : `Operador ${currentRole}`,
      rol: currentRole,
      accion: 'DESPLIEGUE_CONTRA_NARRATIVA_IA',
      modulo: 'EJE_3_GESTION',
      detalles: `Activación de vector de respuesta comunicacional para matriz ${alertId}`,
      hash: generateIntegrityHash(report),
      ip: '10.200.15.42'
    };
    setAuditLogs(prev => [actionLog, ...prev]);
  };

  // Notification management
  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDispatchCustomNotification = async (payload: {
    tipo: AutomatedAlertNotification['tipo'];
    destinatarioEnte: string;
    destinatarioResponsable: string;
    asunto: string;
    mensaje: string;
    canal: 'TELEGRAM' | 'EMAIL' | 'AMBOS';
  }) => {
    try {
      await fetch('/api/notifications/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.error(e);
    }

    const newNotification: AutomatedAlertNotification = {
      id: `NOTIF-${Date.now().toString(36).toUpperCase()}`,
      tipo: payload.tipo,
      severidad: payload.tipo === 'FALLA_INFRAESTRUCTURA' || payload.tipo === 'MATRIZ_DESINFORMACION' ? 'CRITICA' : 'ALTA',
      destinatarioEnte: payload.destinatarioEnte,
      destinatarioResponsable: payload.destinatarioResponsable,
      asunto: payload.asunto,
      mensaje: payload.mensaje,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      canales: payload.canal === 'AMBOS' ? ['TELEGRAM', 'EMAIL'] : [payload.canal],
      estado: 'ENVIADO'
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const SPECIALIZED_DASHBOARDS = [
    { id: 'DASHBOARD_CIBERDEFENSA' as IndicatorModule, label: '1. Ciberdefensa', icon: ShieldAlert, badge: 'DA-01' },
    { id: 'DASHBOARD_NOC' as IndicatorModule, label: '2. NOC / Redes', icon: Radio, badge: 'TDA/Ku' },
    { id: 'DASHBOARD_DIGITAL' as IndicatorModule, label: '3. Digital & Audiencias', icon: Globe, badge: 'Reach' },
    { id: 'DASHBOARD_OPERATIVIDAD' as IndicatorModule, label: '4. Medios & Pauta', icon: Tv, badge: 'Eje 1' },
    { id: 'DASHBOARD_EXECUTIVE_CLEVEL' as IndicatorModule, label: '5. C-Level Presidencia', icon: Award, badge: 'Macro-8' },
  ];

  const navItems = [
    { id: 'DASHBOARD' as IndicatorModule, label: 'Dashboard Principal', icon: BarChart3, badge: null },
    { id: 'CAPTURA' as IndicatorModule, label: 'Captura Semanal', icon: FileEdit, badge: 'Corte Lun 10 AM' },
    { id: 'EJE_1_MEDIOS' as IndicatorModule, label: 'Medios e Información', icon: Tv, badge: 'IMP/RAD/TV' },
    { id: 'EJE_2_PLATAFORMAS' as IndicatorModule, label: 'Plataformas REDTV/CON', icon: Radio, badge: 'TDA/Sat' },
    { id: 'EJE_3_GESTION' as IndicatorModule, label: 'Gestión de Comunicaciones', icon: ShieldAlert, badge: 'Matrices/IVI' },
    { id: 'EJE_4_MIPCCI' as IndicatorModule, label: 'Estrategia Ministerial', icon: Globe, badge: '335 Mun' },
    { id: 'CATALOGO_SCIC' as IndicatorModule, label: 'Catálogo SCIC (267)', icon: BookOpen, badge: 'Oficial' },
    { id: 'CHECKLIST_ENTES' as IndicatorModule, label: 'Checklist por Ente', icon: CheckSquare, badge: 'Dinámico' },
    { id: 'AUDITORIA_RACI' as IndicatorModule, label: 'Auditoría & RACI', icon: FileCheck2, badge: 'Inmutable' },
    { id: 'GESTION_USUARIOS' as IndicatorModule, label: 'Gestión de Usuarios', icon: Users, badge: 'Roles/RBAC' },
  ];

  const isSpecializedActive = 
    activeModule === 'DASHBOARD_CIBERDEFENSA' ||
    activeModule === 'DASHBOARD_NOC' ||
    activeModule === 'DASHBOARD_DIGITAL' ||
    activeModule === 'DASHBOARD_OPERATIVIDAD' ||
    activeModule === 'DASHBOARD_EXECUTIVE_CLEVEL';

  const getRoleBadge = (role: RACIRole) => {
    switch (role) {
      case 'DIRECTOR_OPERACIONES':
        return { label: 'Director Operaciones', initials: 'DO', badge: 'R - Captura y Reporte' };
      case 'VICEMINISTRO':
        return { label: 'Viceministro Revisor', initials: 'VR', badge: 'A - Aprobación y Control' };
      case 'MAXIMA_AUTORIDAD':
        return { label: 'Vicepresidente Sectorial / Autoridad', initials: 'VP', badge: 'I - Decisión Estratégica' };
      case 'AUDITOR_CONTRALOR':
        return { label: 'Auditor Contralor', initials: 'AC', badge: 'C - Trazabilidad y Fe' };
    }
  };

  const effectiveUser = simulatedUser || currentUser;
  const isSuperAdmin = effectiveUser?.rolSistema === 'SUPER_ADMIN';
  const roleInfo = getRoleBadge(effectiveUser ? effectiveUser.raciRole : currentRole);

  // If user is not logged in, show standalone Login view only (No sidebar, no operational data)
  if (!currentUser) {
    return (
      <LoginModule
        onLogin={(user) => {
          handleLogin(user);
        }}
      />
    );
  }

  // Determine initial capture sub-module if activeModule is a sub-module
  const getInitialCaptureKey = (mod: IndicatorModule): CaptureModuleKey | undefined => {
    if (mod === 'CAPTURA_SCIC_ENTE') return 'SCIC_ENTE';
    if (mod === 'CAPTURA_CONTROL') return 'CONTROL';
    if (mod === 'CAPTURA_EJE_1') return 'EJE_1';
    if (mod === 'CAPTURA_EJE_2') return 'EJE_2';
    if (mod === 'CAPTURA_EJE_3') return 'EJE_3';
    if (mod === 'CAPTURA_EJE_4') return 'EJE_4';
    return undefined;
  };

  const isCaptureModule = 
    activeModule === 'CAPTURA' ||
    activeModule === 'CAPTURA_SCIC_ENTE' ||
    activeModule === 'CAPTURA_CONTROL' ||
    activeModule === 'CAPTURA_EJE_1' ||
    activeModule === 'CAPTURA_EJE_2' ||
    activeModule === 'CAPTURA_EJE_3' ||
    activeModule === 'CAPTURA_EJE_4';

  // Check if effective user is authorized for the active module
  const isAuthorized = !effectiveUser || (() => {
    if (isCaptureModule) {
      const captureKey = getInitialCaptureKey(activeModule);
      if (captureKey) {
        return isUserAuthorizedForCaptureModule(effectiveUser, captureKey);
      }
      return getAuthorizedCaptureModules(effectiveUser).length > 0 || effectiveUser.permisosModulos.includes('CAPTURA');
    }
    return effectiveUser.permisosModulos.includes(activeModule);
  })();

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Salto de Navegación Accesible (WCAG 2.2 AA) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-semibold"
      >
        Saltar al contenido principal
      </a>

      {/* Toast Notification */}
      {toastNotification && (
        <div 
          role="status" 
          aria-live="polite" 
          className="fixed top-4 right-4 z-50 bg-slate-900 border border-amber-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs animate-in slide-in-from-top-2 duration-200"
        >
          <Eye className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
          <span className="font-medium">{toastNotification}</span>
        </div>
      )}
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpenMobile && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpenMobile(false)}
        />
      )}

      {/* Geometric Balance Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-700 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
        isSidebarOpenMobile ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 p-1 shadow-xs">
              <img 
                src="/logos/LOGOTIPO VSCC_V1-VSCC.png" 
                alt="Logo VSCC" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <span className="hidden items-center justify-center text-blue-600">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </span>
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-tight font-['Space_Grotesk']">
                VSCC <span className="text-blue-400">SGDO</span>
              </div>
              <div className="text-[9px] text-slate-400 uppercase tracking-widest">
                Vicepresidencia de Comunicación y Cultura
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpenMobile(false)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 py-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Sección 1: Tablero de control (Solo visible si el usuario tiene tableros especializados autorizados) */}
          {(() => {
            const authorizedSpecialized = SPECIALIZED_DASHBOARDS.filter((item) => {
              if (!effectiveUser) return true;
              return effectiveUser.permisosModulos.includes(item.id);
            });

            if (authorizedSpecialized.length === 0) return null;

            return (
              <div className="mb-2">
                <button
                  type="button"
                  onClick={() => setIsTableroControlExpanded(prev => !prev)}
                  className={`w-full flex items-center justify-between px-6 py-2.5 transition-all text-left cursor-pointer border-y ${
                    isSpecializedActive
                      ? 'bg-amber-500/15 text-amber-300 font-semibold border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border-transparent'
                  }`}
                  title="Clic para desplegar y colapsar los tableros especializados autorizados"
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Layers className={`w-4 h-4 shrink-0 ${isSpecializedActive ? 'text-amber-400' : 'text-amber-400/80'}`} />
                    <span className="text-xs font-bold uppercase tracking-wider truncate">Tablero de control</span>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0 ml-1">
                    <span className="text-[9px] font-mono font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.2 rounded">
                      {authorizedSpecialized.length}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isTableroControlExpanded ? 'rotate-180 text-amber-400' : ''
                    }`} />
                  </div>
                </button>

                {/* Sub-items que se abren y colapsan sobre sí mismos al hacer clic */}
                {isTableroControlExpanded && (
                  <div className="bg-slate-950/50 py-1 space-y-0.5 border-b border-slate-800/70 animate-in slide-in-from-top-1 duration-150">
                    {authorizedSpecialized.map((item) => {
                      const isActive = activeModule === item.id;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveModule(item.id);
                            setIsSidebarOpenMobile(false);
                          }}
                          className={`w-full flex items-center justify-between pl-8 pr-5 py-2 transition-colors text-left cursor-pointer ${
                            isActive
                              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                              : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center truncate">
                            <Icon className={`w-3.5 h-3.5 mr-2 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                            <span className="text-xs truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold shrink-0 ml-1.5 ${
                              isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Sección 2: Módulos Operativos */}
          <div className="px-6 py-2 text-[10px] uppercase font-semibold text-slate-500 tracking-wider flex items-center justify-between border-t border-slate-800/80 pt-3">
            <span>Módulos Operativos</span>
            {effectiveUser && (
              <span className="text-[9px] text-blue-400 font-mono font-bold bg-blue-950/60 border border-blue-800 px-1.5 py-0.2 rounded">
                {[...SPECIALIZED_DASHBOARDS, ...navItems].filter(item => effectiveUser.permisosModulos.includes(item.id)).length} autorizados
              </span>
            )}
          </div>
          <div className="space-y-1 mt-1">
            {navItems
              .filter((item) => {
                if (!effectiveUser) return true;
                return effectiveUser.permisosModulos.includes(item.id);
              })
              .map((item) => {
                const isActive = activeModule === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveModule(item.id);
                      setIsSidebarOpenMobile(false);
                    }}
                    className={`w-full flex items-center justify-between px-6 py-2.5 transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white font-medium shadow-sm'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center truncate">
                      <Icon className={`w-3.5 h-3.5 mr-2.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="text-xs truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono shrink-0 ml-1.5 ${
                        isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </nav>

        {/* User / RACI Profile Card Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          {simulatedUser && (
            <div className="mb-2 p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5 text-amber-300 font-medium truncate">
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] font-bold truncate">Simulando a {simulatedUser.nombre}</span>
              </div>
              <button
                onClick={() => handleSimulateUserView(null)}
                className="text-[10px] text-amber-400 hover:text-amber-200 underline font-semibold shrink-0 cursor-pointer ml-1"
                title="Volver a vista completa Super Admin"
              >
                Salir
              </button>
            </div>
          )}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center space-x-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-xs ${effectiveUser?.avatarBg || 'bg-blue-600'}`}>
                {effectiveUser ? `${effectiveUser.nombre[0]}${effectiveUser.apellido[0]}` : roleInfo.initials}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-white truncate">
                  {effectiveUser ? `${effectiveUser.nombre} ${effectiveUser.apellido}` : roleInfo.label}
                </div>
                <div className="text-[10px] text-blue-400 font-mono truncate">
                  {effectiveUser ? `${effectiveUser.enteAdscrito === 'MPPCI_CENTRAL' ? 'MPPCI' : effectiveUser.enteAdscrito} • ${effectiveUser.rolSistema}` : 'ID: 117046-VSCC'}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {(effectiveUser?.rolSistema === 'SUPER_ADMIN' || effectiveUser?.rolSistema === 'MINISTRO') && (
                <button
                  onClick={() => setIsSystemConfigOpen(true)}
                  className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer group"
                  title="Configuración General del Sistema y Banderas Globales"
                >
                  <Settings className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                </button>
              )}
              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Cerrar Sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {/* Quick role selector - Solo visible para Super Admin */}
          {effectiveUser?.rolSistema === 'SUPER_ADMIN' && (
            <select 
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as RACIRole)}
              className="w-full bg-slate-800 border border-slate-700 rounded text-[11px] text-slate-200 px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="MAXIMA_AUTORIDAD">Vicepresidente Sectorial / Máxima Autoridad (I)</option>
              <option value="VICEMINISTRO">Viceministro Revisor (A)</option>
              <option value="DIRECTOR_OPERACIONES">Director Operaciones (R)</option>
              <option value="AUDITOR_CONTRALOR">Auditor Contralor (C)</option>
            </select>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
        {/* Active Simulation Perspective Banner */}
        {simulatedUser && (
          <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-b border-amber-500/40 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-100 z-30 shadow-md shrink-0">
            <div className="flex items-center space-x-2.5">
              <span className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold animate-pulse shrink-0">
                <Eye className="w-4 h-4" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-amber-300">Modo Vista Simulada Activo:</span>
                  <span className="font-semibold text-white">{simulatedUser.nombre} {simulatedUser.apellido}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 font-mono text-amber-200">
                    {simulatedUser.enteAdscrito} • {simulatedUser.cargo}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">
                    {simulatedUser.permisosModulos.length} módulos visibles
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Visualizando la interfaz tal como se le presenta a este funcionario según sus permisos RBAC.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 ml-auto">
              <select
                value={simulatedUser.id}
                onChange={(e) => {
                  const target = INITIAL_USERS.find(u => u.id === e.target.value) || null;
                  handleSimulateUserView(target);
                }}
                className="bg-slate-900 border border-amber-500/50 rounded-lg text-xs text-amber-200 px-2.5 py-1 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {INITIAL_USERS.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.nombre} {u.apellido} ({u.enteAdscrito} • {u.permisosModulos.length} mód.)
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleSimulateUserView(null)}
                className="flex items-center space-x-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
                title="Volver a la vista completa de Super Administrador con todos los módulos"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer Super Admin</span>
              </button>
            </div>
          </div>
        )}

        {/* Geometric Balance Header */}
        <header className="h-16 sm:h-20 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={() => setIsSidebarOpenMobile(true)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* MIPPCI Official Logo */}
            <div className="flex items-center space-x-3">
              <MippciLogo className="h-10 sm:h-12 w-auto max-w-[160px] sm:max-w-[210px] rounded-xl px-2 py-1 shadow-xs" />
              <div className="hidden sm:block h-8 w-px bg-slate-200" />
              <div className="hidden sm:block">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 font-['Space_Grotesk'] leading-tight">
                  Dashboard de Gestión y Despliegue Operativo
                </h1>
                <p className="text-[10px] sm:text-[11px] text-slate-500 hidden md:block">
                  Semana Epidemiológica {report.control.semanaEpidemiologica} ({report.control.periodoDesde} al {report.control.periodoHasta}) • Caracas, Venezuela (VET UTC-4)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Buscador Instantáneo Pinpointer (Ctrl+K) */}
            <button
              onClick={() => setIsPinpointerOpen(true)}
              className="inline-flex items-center gap-1.5 h-8 px-2 sm:px-2.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Buscador instantáneo de indicadores y módulos (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="hidden md:inline font-medium">Buscar</span>
              <kbd className="hidden lg:inline text-[10px] font-mono bg-white px-1.5 py-0.2 rounded border border-slate-300 text-slate-500 shadow-2xs">
                Ctrl+K
              </kbd>
            </button>

            {/* Estado de Conectividad Soberana (Offline / Online) */}
            <div 
              className={`hidden md:flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-lg border ${
                isOnline 
                  ? 'bg-emerald-50/80 border-emerald-200/60 text-emerald-800' 
                  : 'bg-amber-50 border-amber-300 text-amber-900 animate-pulse'
              }`}
              title={isOnline ? 'Conexión activa con el servidor local' : 'Operando en Modo Desconectado (IndexedDB)'}
            >
              {isOnline ? (
                <Wifi className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              )}
              <span className="text-[11px] font-medium">{isOnline ? 'Online' : 'Offline'}</span>
            </div>

            {/* Status de Carga Minimalista */}
            <div 
              className="hidden xl:flex items-center space-x-1.5 text-xs bg-emerald-50/80 border border-emerald-200/60 px-2.5 py-1 rounded-lg"
              title="Status de Carga: 94% de entidades reportadas para esta semana"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-medium text-emerald-800">94% Reportado</span>
            </div>

            {/* Separador */}
            <div className="h-5 w-px bg-slate-200 hidden xl:block" />

            {/* Grupo 1: Acciones Principales (Reportes e Ingesta) */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setIsBoletinEjecutivoOpen(true)}
                className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Generar y previsualizar Boletín Ejecutivo Consolidado (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Boletín PDF</span>
              </button>

              <button
                onClick={() => setIsAIStrategicBriefOpen(true)}
                className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-medium text-blue-900 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Generar Síntesis Ejecutiva Ministerial asistida por IA"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">IA</span>
              </button>

              <button
                onClick={() => setIsExcelImportModalOpen(true)}
                className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Cargar archivo Excel (.xlsx, .xls o .csv)"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Excel</span>
              </button>
            </div>

            {/* Separador */}
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            {/* Grupo 2: Herramientas y Utilidades del Sistema (Icon Tray Minimalista) */}
            <div className="flex items-center bg-slate-100/80 p-0.5 rounded-lg border border-slate-200/80 space-x-0.5">
              <button
                onClick={() => setIsStandardsOpen(true)}
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white transition-all cursor-pointer"
                title="Marcos y Estándares Internacionales (UNESCO, UIT, Sendai)"
                aria-label="Estándares"
              >
                <Award className="w-4 h-4 text-slate-600" />
              </button>

              {isSuperAdmin && (
                <button
                  onClick={() => setIsSystemConfigOpen(true)}
                  className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white transition-all cursor-pointer group"
                  title="Configuración General del Sistema y Banderas Globales (Super Admin)"
                  aria-label="Configuración"
                >
                  <Settings className="w-4 h-4 text-slate-600 group-hover:rotate-45 transition-transform duration-200" />
                </button>
              )}

              {isSuperAdmin && (
                <button
                  onClick={() => setIsResetModalOpen(true)}
                  className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                  title="Restablecer Datos (Poner a Cero para Despliegue Real)"
                  aria-label="Poner a cero"
                >
                  <DatabaseZap className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setIsNotificationsOpen(true)}
                className="relative w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white transition-all cursor-pointer"
                title="Centro de Alertas y Notificaciones"
                aria-label="Notificaciones"
              >
                <Bell className="w-4 h-4 text-slate-600" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                )}
              </button>
            </div>

            {/* Separador */}
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            {/* Grupo 3: Identidad de Usuario y Sesión */}
            <div className="flex items-center space-x-1.5">
              {currentUser && (
                <div
                  className="hidden md:flex items-center space-x-2 h-8 bg-slate-50 border border-slate-200/80 px-2.5 rounded-lg text-xs font-medium text-slate-700 shadow-2xs"
                  title={`Sesión activa: ${currentUser.nombre} ${currentUser.apellido}`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-800 truncate max-w-[110px]">{currentUser.nombre}</span>
                  <span className="text-[10px] text-blue-700 font-mono bg-blue-50 border border-blue-200/60 px-1.5 py-0.2 rounded font-bold">
                    {currentUser.enteAdscrito === 'MPPCI_CENTRAL' ? 'MPPCI' : currentUser.enteAdscrito}
                  </span>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 transition-all cursor-pointer"
                title="Cerrar Sesión"
                aria-label="Cerrar Sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Main View Canvas */}
        <main id="main-content" tabIndex={-1} className="flex-1 p-4 sm:p-6 overflow-y-auto text-slate-800 flex flex-col justify-between focus:outline-none">
          <div className="max-w-7xl mx-auto w-full flex-1">
            
            {/* RBAC Access Restricted Guard Screen */}
            {!isAuthorized ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center max-w-2xl mx-auto my-8 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600 shadow-xs">
                  <AlertOctagon className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                    Acceso Restringido por Gobernanza RBAC
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk'] mt-2">
                    Módulo No Autorizado para su Perfil Actual
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    El usuario <strong>{currentUser?.nombre} {currentUser?.apellido}</strong> ({currentUser?.rolSistema}) no posee privilegios suficientes para operar el módulo <strong className="text-blue-700">{MODULE_LABELS_MAP[activeModule] || activeModule}</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 text-left space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ente Asignado:</span>
                    <span className="font-bold text-slate-800">{currentUser?.enteAdscrito}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nivel de Acceso:</span>
                    <span className="font-bold text-slate-800">{currentUser?.nivelAcceso}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rol RACI Equivalente:</span>
                    <span className="font-bold text-blue-700">{currentUser?.raciRole}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveModule('DASHBOARD')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Volver al Dashboard Principal
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar Sesión / Cambiar Usuario</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {activeModule === 'DASHBOARD' && (
                  <ExecutiveDashboard
                    key={`dash-${report.id}`}
                    report={report}
                    criticalTowers={criticalTowers}
                    opinionAlerts={opinionAlerts}
                    municipalities={municipalities}
                    onNavigate={setActiveModule}
                    onOpenCounterNarrative={handleOpenCounterNarrative}
                    onOpenAIStrategicBrief={() => setIsAIStrategicBriefOpen(true)}
                    onOpenBoletinEjecutivo={() => setIsBoletinEjecutivoOpen(true)}
                    currentRole={currentRole}
                    currentUser={effectiveUser}
                    onOpenResetModal={() => setIsResetModalOpen(true)}
                    onOpenExcelImportModal={() => setIsExcelImportModalOpen(true)}
                    systemConfig={systemConfig}
                  />
                )}

                {activeModule === 'DASHBOARD_EXECUTIVE_CLEVEL' && (
                  <ExecutiveSinglePaneDashboard
                    key="dash-c-level"
                    currentRole={currentRole}
                    onNavigate={setActiveModule}
                    onOpenAIStrategicBrief={() => setIsAIStrategicBriefOpen(true)}
                    onOpenBoletinEjecutivo={() => setIsBoletinEjecutivoOpen(true)}
                  />
                )}

                {activeModule === 'DASHBOARD_CIBERDEFENSA' && (
                  <CiberdefensaDashboard
                    key="dash-ciberdefensa"
                    currentRole={currentRole}
                    onOpenCounterNarrative={handleOpenCounterNarrative}
                  />
                )}

                {activeModule === 'DASHBOARD_NOC' && (
                  <NocInfraestructuraDashboard
                    key="dash-noc"
                    currentRole={currentRole}
                  />
                )}

                {activeModule === 'DASHBOARD_DIGITAL' && (
                  <AudienciasDigitalDashboard
                    key="dash-digital"
                    currentRole={currentRole}
                  />
                )}

                {activeModule === 'DASHBOARD_OPERATIVIDAD' && (
                  <OperatividadMediosDashboard
                    key="dash-operatividad"
                    currentRole={currentRole}
                  />
                )}

                {isCaptureModule && (
                  <DataCaptureModule
                    key={`capture-${report.id}`}
                    currentReport={report}
                    onSaveReport={handleSaveReport}
                    currentRole={currentRole}
                    currentUser={effectiveUser}
                    initialCaptureModule={getInitialCaptureKey(activeModule)}
                    onNavigateModule={setActiveModule}
                    onSelectUser={handleLogin}
                    onOpenResetModal={() => setIsResetModalOpen(true)}
                    onOpenExcelImportModal={() => setIsExcelImportModalOpen(true)}
                  />
                )}

                {activeModule === 'EJE_1_MEDIOS' && (
                  <ModuleMedios
                    key={`medios-${report.id}`}
                    mediosData={report.mediosData}
                    kpis={report.kpisCalculados}
                    report={report}
                    onSaveReport={handleSaveReport}
                    currentUser={currentUser}
                    currentRole={currentRole}
                    onNavigateToCapture={() => setActiveModule('CAPTURA_EJE_1')}
                  />
                )}

                {activeModule === 'EJE_2_PLATAFORMAS' && (
                  <ModulePlataformas
                    key={`plataformas-${report.id}`}
                    plataformasData={report.plataformasData}
                    criticalTowers={criticalTowers}
                    kpis={report.kpisCalculados}
                    report={report}
                    onSaveReport={handleSaveReport}
                    currentUser={currentUser}
                    currentRole={currentRole}
                    onNavigateToCapture={() => setActiveModule('CAPTURA_EJE_2')}
                  />
                )}

                {activeModule === 'EJE_3_GESTION' && (
                  <ModuleGestionCom
                    key={`gestion-${report.id}`}
                    opinionAlerts={opinionAlerts}
                    vulnerabilityRows={report.vulnerabilityRows}
                    kpis={report.kpisCalculados}
                    onOpenCounterNarrative={handleOpenCounterNarrative}
                    report={report}
                    onSaveReport={handleSaveReport}
                    currentUser={currentUser}
                    currentRole={currentRole}
                    onNavigateToCapture={() => setActiveModule('CAPTURA_EJE_3')}
                  />
                )}

                {activeModule === 'EJE_4_MIPCCI' && (
                  <ModuleMIPCCI
                    key={`mipcci-${report.id}`}
                    strategicData={report.strategicData}
                    kpis={report.kpisCalculados}
                    municipalities={municipalities}
                    report={report}
                    onSaveReport={handleSaveReport}
                    currentUser={currentUser}
                    currentRole={currentRole}
                    onNavigateToCapture={() => setActiveModule('CAPTURA_EJE_4')}
                  />
                )}

                {activeModule === 'CATALOGO_SCIC' && (
                  <ScicCatalogModule onNavigateToChecklist={() => setActiveModule('CHECKLIST_ENTES')} />
                )}

                {activeModule === 'CHECKLIST_ENTES' && (
                  <EnteChecklistManager
                    onNavigateToCapture={() => setActiveModule('CAPTURA_SCIC_ENTE')}
                    onNavigateToCatalog={() => setActiveModule('CATALOGO_SCIC')}
                  />
                )}

                {activeModule === 'AUDITORIA_RACI' && (
                  <AuditRaciTracker
                    auditLogs={auditLogs}
                    currentReport={report}
                    currentRole={currentRole}
                    onSignOffReport={handleSignOff}
                  />
                )}

                {activeModule === 'GESTION_USUARIOS' && (
                  <UserManagementPanel
                    currentRole={currentRole}
                    onSwitchSessionRole={setCurrentRole}
                    currentUser={currentUser}
                    onSelectUser={handleLogin}
                    simulatedUser={simulatedUser}
                    onSimulateUserView={handleSimulateUserView}
                  />
                )}
              </>
            )}
          </div>

          {/* Institutional Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3">
                <MippciLogo compact className="h-9 w-auto" />
                <div className="text-[11px] leading-relaxed">
                  <div className="font-bold text-slate-800">
                    Ministerio del Poder Popular para la Comunicación y la Información (MIPPCI)
                  </div>
                  <div className="text-slate-600">
                    Desarrollado y administrado por la <span className="font-semibold text-blue-700">Dirección de Tecnología de Información y Comunicaciones del MIPPCI</span>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-right text-[11px] text-slate-500">
                <div className="font-medium text-slate-700">Sistema de Gestión y Despliegue Operativo MPPCI</div>
                <div className="text-slate-400 font-mono text-[10px]">República Bolivariana de Venezuela • Gestión 2026</div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Modals */}
      <CounterNarrativeModal
        alert={selectedAlertForAI}
        isOpen={isCounterNarrativeOpen}
        onClose={() => {
          setIsCounterNarrativeOpen(false);
          setSelectedAlertForAI(null);
        }}
        onApplyCounterNarrative={handleApplyCounterNarrative}
      />

      <AIStrategicBriefModal
        report={report}
        criticalTowers={criticalTowers}
        opinionAlerts={opinionAlerts}
        isOpen={isAIStrategicBriefOpen}
        onClose={() => setIsAIStrategicBriefOpen(false)}
      />

      {isBoletinEjecutivoOpen && (
        <BoletinEjecutivoModal
          report={report}
          isOpen={isBoletinEjecutivoOpen}
          enableEstadosSimulables={systemConfig.simulacion?.enableEstadosSimulables ?? true}
          onClose={() => setIsBoletinEjecutivoOpen(false)}
          onDispatchAlertNotification={(alert) => {
            handleDispatchCustomNotification({
              tipo: alert.tipo || 'DEMORA_CARGA',
              destinatarioEnte: alert.ente,
              destinatarioResponsable: alert.destinatario || 'Director General',
              asunto: `[ALERTA CORTE LUNES] ${alert.tipo} - ${alert.ente}`,
              mensaje: alert.mensaje,
              canal: 'AMBOS'
            });
          }}
        />
      )}

      <AlertsNotificationCenter
        notifications={notifications}
        onDismissNotification={handleDismissNotification}
        onDispatchCustomNotification={handleDispatchCustomNotification}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <InternationalStandardsModal
        isOpen={isStandardsOpen}
        onClose={() => setIsStandardsOpen(false)}
      />

      {/* Modal Puesta a Cero / Restaurar Demo */}
      <ResetDataModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmResetToZero={handleConfirmResetToZero}
        onRestoreDemoData={handleRestoreDemoData}
        currentReport={report}
      />

      {/* Modal Carga Masiva Excel / CSV */}
      <ExcelBulkImportModal
        isOpen={isExcelImportModalOpen}
        onClose={() => setIsExcelImportModalOpen(false)}
        currentReport={report}
        onApplyImport={handleApplyExcelImport}
      />

      {/* Modal Configuración General Centralizada del Sistema (SGDO-VSCC) */}
      <SystemConfigModal
        isOpen={isSystemConfigOpen}
        onClose={() => setIsSystemConfigOpen(false)}
        config={systemConfig}
        onUpdateConfig={(newConfig) => {
          setSystemConfig(newConfig);
          setToastNotification('¡Configuración general y banderas globales actualizadas en tiempo real!');
          setTimeout(() => setToastNotification(null), 4000);
        }}
      />

      {/* Modal Buscador Instantáneo Pinpointer (Ctrl+K) */}
      <PinpointerModal
        isOpen={isPinpointerOpen}
        onClose={() => setIsPinpointerOpen(false)}
        onNavigate={(mod) => {
          setActiveModule(mod);
          setIsPinpointerOpen(false);
        }}
      />

      {/* Toast Notification Flotante */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 text-xs max-w-md animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-100">{toastNotification}</p>
          </div>
          <button
            onClick={() => setToastNotification(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
