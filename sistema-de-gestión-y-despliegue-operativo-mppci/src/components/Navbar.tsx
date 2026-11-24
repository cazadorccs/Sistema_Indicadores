import React from 'react';
import { 
  BarChart3, 
  Radio, 
  Tv, 
  Globe, 
  ShieldAlert, 
  Cpu, 
  FileEdit, 
  FileCheck2, 
  Bell, 
  Award, 
  Building2,
  FileText,
  Users,
  ChevronDown,
  Activity,
  Layers,
  Sparkles,
  LogIn,
  LogOut,
  ShieldCheck,
  KeyRound,
  BookOpen,
  CheckSquare
} from 'lucide-react';
import { IndicatorModule, RACIRole, UserAccount } from '../types';
import MippciLogo from './MippciLogo';

interface NavbarProps {
  activeModule: IndicatorModule;
  onSelectModule: (module: IndicatorModule) => void;
  currentRole: RACIRole;
  onSelectRole: (role: RACIRole) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenStandards: () => void;
  onOpenAIStrategicBrief: () => void;
  onOpenBoletinEjecutivo?: () => void;
  currentUser: UserAccount | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeModule,
  onSelectModule,
  currentRole,
  onSelectRole,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenStandards,
  onOpenAIStrategicBrief,
  onOpenBoletinEjecutivo,
  currentUser,
  onOpenLogin,
  onLogout
}) => {
  const getRoleLabel = (role: RACIRole) => {
    switch (role) {
      case 'DIRECTOR_OPERACIONES':
        return { label: 'Director Operaciones', badge: 'R - Captura y Reporte', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'VICEMINISTRO':
        return { label: 'Viceministro / Revisor', badge: 'A - Aprobación y Control', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'MAXIMA_AUTORIDAD':
        return { label: 'Máxima Autoridad / Ministro', badge: 'I - Decisión Estratégica', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      case 'AUDITOR_CONTRALOR':
        return { label: 'Auditor Contralor', badge: 'C - Integridad y Trazabilidad', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
    }
  };

  const currentRoleInfo = getRoleLabel(currentRole);

  const [isTablerosOpen, setIsTablerosOpen] = React.useState(false);
  const tablerosRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tablerosRef.current && !tablerosRef.current.contains(event.target as Node)) {
        setIsTablerosOpen(false);
      }
    };

    if (isTablerosOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTablerosOpen]);

  const SPECIALIZED_DASHBOARDS = [
    { 
      id: 'DASHBOARD_CIBERDEFENSA' as IndicatorModule, 
      num: '1',
      label: '1. Ciberdefensa', 
      sub: 'Amenazas [DA-01] y Curva TRMD',
      badge: 'DA-01',
      icon: ShieldAlert, 
      color: 'text-rose-400 bg-rose-500/20 border-rose-500/40',
      raciReq: ['DIRECTOR_OPERACIONES', 'VICEMINISTRO', 'MAXIMA_AUTORIDAD', 'AUDITOR_CONTRALOR'] as RACIRole[],
      raciBadges: 'R: Monitoreo | A: Viceministro'
    },
    { 
      id: 'DASHBOARD_NOC' as IndicatorModule, 
      num: '2',
      label: '2. NOC / Redes', 
      sub: 'TDA [RTV-001], Satélite y MTTR',
      badge: 'TDA/Ku',
      icon: Radio, 
      color: 'text-blue-400 bg-blue-500/20 border-blue-500/40',
      raciReq: ['DIRECTOR_OPERACIONES', 'VICEMINISTRO', 'MAXIMA_AUTORIDAD', 'AUDITOR_CONTRALOR'] as RACIRole[],
      raciBadges: 'R: REDTV/CONATEL | A: Presidente'
    },
    { 
      id: 'DASHBOARD_DIGITAL' as IndicatorModule, 
      num: '3',
      label: '3. Digital & Audiencias', 
      sub: 'Reach [V1.4], Engagement & Streaming',
      badge: 'Reach',
      icon: Globe, 
      color: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/40',
      raciReq: ['DIRECTOR_OPERACIONES', 'VICEMINISTRO', 'MAXIMA_AUTORIDAD', 'AUDITOR_CONTRALOR'] as RACIRole[],
      raciBadges: 'R: Medios Digitales | A: Viceministro'
    },
    { 
      id: 'DASHBOARD_OPERATIVIDAD' as IndicatorModule, 
      num: '4',
      label: '4. Medios & Pauta', 
      sub: 'Pases [TV-008] y Muro Eje 1 Tipificado',
      badge: 'Eje 1',
      icon: Tv, 
      color: 'text-teal-400 bg-teal-500/20 border-teal-500/40',
      raciReq: ['DIRECTOR_OPERACIONES', 'VICEMINISTRO', 'MAXIMA_AUTORIDAD', 'AUDITOR_CONTRALOR'] as RACIRole[],
      raciBadges: 'R: Redacción | A: Viceministro'
    },
    { 
      id: 'DASHBOARD_EXECUTIVE_CLEVEL' as IndicatorModule, 
      num: '5',
      label: '5. C-Level Presidencia', 
      sub: '8 Macro-indicadores Presidenciales',
      badge: 'Macro-8',
      icon: Award, 
      color: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
      raciReq: ['MAXIMA_AUTORIDAD', 'VICEMINISTRO', 'AUDITOR_CONTRALOR'] as RACIRole[],
      raciBadges: 'A: Ministro | I: Presidencia'
    }
  ];

  const isSpecializedActive = 
    activeModule === 'DASHBOARD_CIBERDEFENSA' ||
    activeModule === 'DASHBOARD_NOC' ||
    activeModule === 'DASHBOARD_DIGITAL' ||
    activeModule === 'DASHBOARD_OPERATIVIDAD' ||
    activeModule === 'DASHBOARD_EXECUTIVE_CLEVEL';

  const activeSpecializedItem = SPECIALIZED_DASHBOARDS.find(d => d.id === activeModule);

  const navItems = [
    { id: 'DASHBOARD' as IndicatorModule, label: 'Dashboard Principal', icon: BarChart3 },
    { id: 'CAPTURA' as IndicatorModule, label: 'Captura Semanal', icon: FileEdit, badge: 'Corte Lun 10 AM' },
    { id: 'EJE_1_MEDIOS' as IndicatorModule, label: 'Medios e Información', icon: Tv, badge: 'IMP/RAD/TV' },
    { id: 'EJE_2_PLATAFORMAS' as IndicatorModule, label: 'Plataformas REDTV/CON', icon: Radio, badge: 'TDA/Sat' },
    { id: 'EJE_3_GESTION' as IndicatorModule, label: 'Gestión de Comunicaciones', icon: ShieldAlert, badge: 'Matrices/IVI' },
    { id: 'EJE_4_MIPCCI' as IndicatorModule, label: 'Estrategia Ministerial', icon: Globe, badge: '335 Mun' },
    { id: 'CATALOGO_SCIC' as IndicatorModule, label: 'Catálogo SCIC (267)', icon: BookOpen, badge: 'Oficial' },
    { id: 'AUDITORIA_RACI' as IndicatorModule, label: 'Auditoría & RACI', icon: FileCheck2, badge: 'Inmutable' },
    { id: 'GESTION_USUARIOS' as IndicatorModule, label: 'Gestión de Usuarios', icon: Users, badge: 'Roles/RBAC' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Ministerial Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-1.5 border-b border-slate-800/60 text-xs flex flex-wrap items-center justify-between text-slate-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-medium text-slate-200">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="tracking-wide">República Bolivariana de Venezuela</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-semibold">VSCC</span>
            <span className="hidden sm:inline text-slate-300 text-[11px] font-medium">- Vicepresidencia Sectorial de Comunicación y Cultura (Ente Rector)</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700/50 text-[11px]">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-300 font-medium">Semana Epidemiológica N° 35 / 2026</span>
          </div>
          <div className="hidden md:flex items-center space-x-1 text-[11px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>Corte: Dom - Sáb (Límite: Lunes 10:00 AM)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectModule('DASHBOARD_EXECUTIVE_CLEVEL')}>
            <MippciLogo compact className="h-9 w-auto" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white font-['Space_Grotesk']">
                  VSCC <span className="text-blue-400">SGDO</span>
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded border border-blue-500/30 font-mono">
                  v2.6 Enterprise
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none truncate max-w-xs">
                Vicepresidencia Sectorial de Comunicación y Cultura
              </p>
            </div>
          </div>

          {/* Action Buttons & Role Selector */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Diagnóstico Estratégico Trigger */}
            <button
              onClick={onOpenAIStrategicBrief}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-purple-500/20 hover:from-amber-500/30 hover:to-purple-500/30 text-amber-200 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm group cursor-pointer"
              title="Generar Diagnóstico Estratégico Ministerial (Motor Soberano)"
            >
              <Activity className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Diagnóstico Estratégico</span>
            </button>

            {/* Boletín Ejecutivo PDF Trigger */}
            {onOpenBoletinEjecutivo && (
              <button
                onClick={onOpenBoletinEjecutivo}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-600/40 hover:to-teal-600/40 text-emerald-200 border border-emerald-500/40 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm group cursor-pointer"
                title="Simulación de Cierre Semanal y Emisión del Boletín Ejecutivo Consolidado (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline">Boletín (PDF)</span>
              </button>
            )}

            {/* International Standards Button */}
            <button
              onClick={onOpenStandards}
              className="flex items-center space-x-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer hidden md:flex"
              title="Ver marcos de referencia internacionales (UNESCO, UIT, Sendai, Esfera)"
            >
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Estándares</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="Centro de Alertas y Notificaciones Automáticas"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-slate-900">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Active User / Login Trigger */}
            {currentUser ? (
              <div className="relative group">
                <button
                  onClick={onOpenLogin}
                  className="flex items-center space-x-2 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-blue-500/40 px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer text-left"
                  title="Clic para cambiar de sala u operador"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${currentUser.avatarBg || 'bg-blue-600 text-white'}`}>
                    {currentUser.nombre[0]}{currentUser.apellido[0]}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-white font-semibold leading-tight text-xs flex items-center space-x-1">
                      <span className="truncate max-w-[100px]">{currentUser.nombre}</span>
                      <span className="text-[10px] text-blue-400 font-mono">({currentUser.enteAdscrito === 'MPPCI_CENTRAL' ? 'MPPCI' : currentUser.enteAdscrito})</span>
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono">
                      {currentUser.rolSistema}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 opacity-70" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
                  <div className="px-2 py-1.5 border-b border-slate-800 mb-1">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Sesión Activa</div>
                    <div className="font-bold text-xs text-white">{currentUser.nombre} {currentUser.apellido}</div>
                    <div className="text-[10px] text-blue-400">{currentUser.cargo}</div>
                    <div className="text-[9px] text-slate-500 font-mono mt-0.5">{currentUser.cedula} • {currentUser.email}</div>
                  </div>

                  <button
                    onClick={onOpenLogin}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>Cambiar Operador / Sala</span>
                  </button>

                  <button
                    onClick={onLogout}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Ingresar</span>
              </button>
            )}

            {/* RACI Role Selector */}
            <div className="relative group">
              <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer ${currentRoleInfo.color}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                <div className="text-left">
                  <div className="leading-tight font-semibold">{currentRoleInfo.label}</div>
                  <div className="text-[9px] opacity-75 hidden lg:block">{currentRoleInfo.badge}</div>
                </div>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </div>

              {/* Dropdown for switching RACI role */}
              <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 hidden group-hover:block z-50">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider px-2 py-1 border-b border-slate-800 mb-1">
                  Cambiar Perfil RACI Activo
                </div>
                {[
                  { role: 'DIRECTOR_OPERACIONES' as RACIRole, name: 'Director de Operaciones', desc: 'R - Captura de datos semanales', icon: FileEdit },
                  { role: 'VICEMINISTRO' as RACIRole, name: 'Viceministro', desc: 'A - Revisión y aprobación ministerial', icon: ShieldAlert },
                  { role: 'MAXIMA_AUTORIDAD' as RACIRole, name: 'Máxima Autoridad / Ministro', desc: 'I - Visualización y toma de decisiones', icon: Award },
                  { role: 'AUDITOR_CONTRALOR' as RACIRole, name: 'Auditor Contralor', desc: 'C - Trazabilidad y validaciones', icon: FileCheck2 },
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => onSelectRole(item.role)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 transition-colors cursor-pointer ${
                      currentRole === item.role ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar items-center">
          {/* Botón Agrupado: Tablero de control (Desplegable y colapsable al hacer clic) */}
          <div ref={tablerosRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsTablerosOpen(prev => !prev)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                isSpecializedActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/90 text-amber-300 hover:text-white hover:bg-slate-800 border-amber-500/40'
              }`}
              title="Clic para desplegar y colapsar los 5 tableros de control especializados"
            >
              <Layers className={`w-3.5 h-3.5 ${isSpecializedActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>Tablero de control</span>
              {activeSpecializedItem ? (
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-slate-950/30 text-slate-950 border border-slate-900/20">
                  {activeSpecializedItem.badge}
                </span>
              ) : (
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  5
                </span>
              )}
              <ChevronDown className={`w-3 h-3 ${isSpecializedActive ? 'text-slate-950' : 'text-slate-400'} transition-transform duration-200 ${
                isTablerosOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Menú Desplegable (se abre y colapsa solo al hacer clic) */}
            {isTablerosOpen && (
              <div className="absolute left-0 mt-1.5 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 border-b border-slate-800 mb-1.5 flex items-center justify-between">
                  <div className="text-[10px] text-amber-400 uppercase tracking-wider font-bold">
                    Tablero de control
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">5 Especializados</span>
                </div>

                <div className="space-y-1">
                  {SPECIALIZED_DASHBOARDS.map((dash) => {
                    const isSelected = activeModule === dash.id;
                    const Icon = dash.icon;
                    const canAccess = !currentUser || currentUser.permisosModulos.includes(dash.id);

                    return (
                      <button
                        key={dash.id}
                        onClick={() => {
                          onSelectModule(dash.id);
                          setIsTablerosOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                            : canAccess
                              ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                              : 'text-slate-500 opacity-60 hover:bg-slate-950'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div className={`p-1.5 rounded-md ${dash.color} shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <div className="font-bold text-xs truncate text-slate-200">
                              {dash.label}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">{dash.sub}</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold bg-slate-800 text-amber-300 border border-slate-700 shrink-0 ml-2">
                          {dash.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Módulos Operativos Siguientes */}
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            const Icon = item.icon;
            const isAuthorized = !currentUser || currentUser.permisosModulos.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectModule(item.id);
                  setIsTablerosOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-semibold'
                    : isAuthorized
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-400 hover:bg-slate-900/40 opacity-70'
                }`}
                title={!isAuthorized ? 'Módulo restringido por rol RBAC' : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : isAuthorized ? 'text-slate-400' : 'text-slate-600'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-slate-900/30 text-slate-950 font-bold' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {!isAuthorized && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" title="Restringido" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
