import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  ShieldCheck, 
  KeyRound, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  Shield, 
  Smartphone, 
  Mail, 
  Phone, 
  Send, 
  Fingerprint, 
  Layers, 
  Eye, 
  ArrowUpDown, 
  Check, 
  X, 
  RefreshCw, 
  FileText, 
  Sliders, 
  BadgeAlert,
  Info,
  ExternalLink,
  ShieldAlert,
  UserPlus,
  LogIn,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { 
  UserAccount, 
  RoleDefinition, 
  SystemRole, 
  RACIRole, 
  UserStatus, 
  AccessLevel, 
  IndicatorModule,
  EnteInfo
} from '../types';
import { SYSTEM_ROLES_DATA, INITIAL_USERS, MODULE_LABELS_MAP } from '../data/usersData';
import { ENTES_MIPCCI } from '../data/mockData';

interface UserManagementPanelProps {
  currentRole: RACIRole;
  onSwitchSessionRole?: (role: RACIRole) => void;
  currentUser?: UserAccount | null;
  onSelectUser?: (user: UserAccount) => void;
  simulatedUser?: UserAccount | null;
  onSimulateUserView?: (user: UserAccount | null) => void;
}

export const UserManagementPanel: React.FC<UserManagementPanelProps> = ({
  currentRole,
  onSwitchSessionRole,
  currentUser,
  onSelectUser,
  simulatedUser,
  onSimulateUserView
}) => {
  // State
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [roles] = useState<RoleDefinition[]>(SYSTEM_ROLES_DATA);
  const [activeTab, setActiveTab] = useState<'DIRECTORIO' | 'MATRIZ_ROLES' | 'COBERTURA_ENTES' | 'LOGS_SEGURIDAD'>('DIRECTORIO');
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('TODOS');
  const [selectedEnteFilter, setSelectedEnteFilter] = useState<string>('TODOS');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('TODOS');

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [viewingUser, setViewingUser] = useState<UserAccount | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  // Estados para Formalización y Gestión Administrativa de Credenciales
  const [passwordModalUser, setPasswordModalUser] = useState<UserAccount | null>(null);
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [resetPrecargadoUser, setResetPrecargadoUser] = useState<UserAccount | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Sincronización soberana con la base de datos de usuarios
  useEffect(() => {
    fetch('/api/v1/admin/users')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        }
      })
      .catch(err => {
        console.warn('Backend users not available, using initial users cache:', err);
      });
  }, []);

  // Form State for Create / Edit
  const [formData, setFormData] = useState<Partial<UserAccount>>({
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    telefono: '',
    telegram: '',
    enteAdscrito: 'VTV',
    cargo: '',
    dependencia: '',
    rolSistema: 'SALA_OPERATIVA_ENTE',
    raciRole: 'DIRECTOR_OPERACIONES',
    estado: 'ACTIVO',
    nivelAcceso: 'CAPTURA_EDICION',
    permisosModulos: ['DASHBOARD', 'CAPTURA', 'EJE_1_MEDIOS'],
    dobleFactorAuth: true
  });

  // Filtered Users
  const filteredUsers = useMemo(() => {
    const q = (searchQuery || '').toLowerCase();
    return users.filter(user => {
      const fullName = `${user.nombre || ''} ${user.apellido || ''}`.toLowerCase();
      const cedula = (user.cedula || '').toLowerCase();
      const email = (user.email || '').toLowerCase();
      const cargo = (user.cargo || '').toLowerCase();
      const ente = (user.enteAdscrito || '').toLowerCase();

      const matchesSearch = !q ||
        fullName.includes(q) ||
        cedula.includes(q) ||
        email.includes(q) ||
        cargo.includes(q) ||
        ente.includes(q);

      const matchesRole = selectedRoleFilter === 'TODOS' || user.rolSistema === selectedRoleFilter;
      const matchesEnte = selectedEnteFilter === 'TODOS' || user.enteAdscrito === selectedEnteFilter;
      const matchesStatus = selectedStatusFilter === 'TODOS' || user.estado === selectedStatusFilter;

      return matchesSearch && matchesRole && matchesEnte && matchesStatus;
    });
  }, [users, searchQuery, selectedRoleFilter, selectedEnteFilter, selectedStatusFilter]);

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = users.length;
    const activos = users.filter(u => u.estado === 'ACTIVO').length;
    const con2FA = users.filter(u => u.dobleFactorAuth).length;
    const entesConOperador = new Set(users.map(u => u.enteAdscrito)).size;
    return {
      total,
      activos,
      con2FA,
      pct2FA: Math.round((con2FA / (total || 1)) * 100),
      entesConOperador
    };
  }, [users]);

  // Notifications helper
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotificationMsg({ type, text });
    setTimeout(() => {
      setNotificationMsg(null);
    }, 4000);
  };

  // Handlers
  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setFormData({
      nombre: '',
      apellido: '',
      cedula: 'V-',
      email: '',
      telefono: '+58 ',
      telegram: '@',
      enteAdscrito: 'VTV',
      cargo: 'Responsable de Sala Operativa',
      dependencia: 'Sala Situacional',
      rolSistema: 'SALA_OPERATIVA_ENTE',
      raciRole: 'DIRECTOR_OPERACIONES',
      estado: 'ACTIVO',
      nivelAcceso: 'CAPTURA_EDICION',
      permisosModulos: ['DASHBOARD', 'CAPTURA', 'EJE_1_MEDIOS', 'EJE_2_PLATAFORMAS', 'AUDITORIA_RACI'],
      dobleFactorAuth: true
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (user: UserAccount) => {
    setEditingUser(user);
    setFormData({ ...user });
    setIsCreateModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.cedula || !formData.email) {
      showToast('Por favor complete todos los campos obligatorios.', 'error');
      return;
    }

    if (editingUser) {
      // Update
      const updated = users.map(u => {
        if (u.id === editingUser.id) {
          return {
            ...u,
            ...formData,
            nombre: formData.nombre!,
            apellido: formData.apellido!,
            cedula: formData.cedula!,
            email: formData.email!,
            telefono: formData.telefono || u.telefono,
            enteAdscrito: formData.enteAdscrito || u.enteAdscrito,
            cargo: formData.cargo || u.cargo,
            dependencia: formData.dependencia || u.dependencia,
            rolSistema: formData.rolSistema || u.rolSistema,
            raciRole: formData.raciRole || u.raciRole,
            estado: formData.estado || u.estado,
            nivelAcceso: formData.nivelAcceso || u.nivelAcceso,
            permisosModulos: formData.permisosModulos || u.permisosModulos,
            dobleFactorAuth: formData.dobleFactorAuth ?? u.dobleFactorAuth
          } as UserAccount;
        }
        return u;
      });
      setUsers(updated);
      showToast(`Usuario ${formData.nombre} ${formData.apellido} actualizado exitosamente.`);
    } else {
      // Create new
      const newUser: UserAccount = {
        id: `USR-${String(users.length + 1).padStart(3, '0')}`,
        nombre: formData.nombre!,
        apellido: formData.apellido!,
        cedula: formData.cedula!,
        email: formData.email!,
        telefono: formData.telefono || '+58 212 5053111',
        telegram: formData.telegram || '@mppci_usuario',
        enteAdscrito: formData.enteAdscrito || 'MPPCI_CENTRAL',
        cargo: formData.cargo || 'Funcionario MPPCI',
        dependencia: formData.dependencia || 'Coordinación Operativa',
        rolSistema: formData.rolSistema || 'SALA_OPERATIVA_ENTE',
        raciRole: formData.raciRole || 'DIRECTOR_OPERACIONES',
        estado: formData.estado || 'ACTIVO',
        nivelAcceso: formData.nivelAcceso || 'CAPTURA_EDICION',
        permisosModulos: formData.permisosModulos || ['DASHBOARD', 'CAPTURA'],
        dobleFactorAuth: formData.dobleFactorAuth ?? true,
        ultimoAcceso: 'Pendiente primer inicio',
        fechaCreacion: new Date().toISOString().split('T')[0],
        intentosFallidos: 0,
        avatarBg: 'bg-blue-600 text-white border-blue-400'
      };
      setUsers([newUser, ...users]);
      showToast(`Nuevo usuario ${newUser.nombre} ${newUser.apellido} (${newUser.cedula}) registrado en el sistema.`);
    }

    setIsCreateModalOpen(false);
  };

  const handleToggleStatus = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextStatus: UserStatus = u.estado === 'ACTIVO' ? 'SUSPENDIDO' : 'ACTIVO';
        showToast(`Estado de ${u.nombre} ${u.apellido} cambiado a ${nextStatus}`, 'info');
        return { ...u, estado: nextStatus };
      }
      return u;
    });
    setUsers(updated);
  };

  const handleToggle2FA = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextVal = !u.dobleFactorAuth;
        showToast(`2FA ${nextVal ? 'activado' : 'desactivado'} para ${u.nombre} ${u.apellido}`, 'info');
        return { ...u, dobleFactorAuth: nextVal };
      }
      return u;
    });
    setUsers(updated);
  };

  const handleResetPassword = (user: UserAccount) => {
    showToast(`Se ha emitido un enlace seguro temporal de reseteo a ${user.email}`, 'success');
  };

  const handleAdminSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordModalUser || !adminNewPassword.trim()) return;
    setIsActionLoading(true);
    try {
      const res = await fetch('/api/v1/admin/users/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: passwordModalUser.id, newPassword: adminNewPassword.trim() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message, 'success');
        setPasswordModalUser(null);
        setAdminNewPassword('');
      } else {
        showToast(data.error || 'Error al actualizar contraseña.', 'error');
      }
    } catch {
      showToast('Error de red al actualizar contraseña.', 'error');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleAdminResetToPrecargado = async () => {
    if (!resetPrecargadoUser) return;
    setIsActionLoading(true);
    try {
      const res = await fetch('/api/v1/admin/users/reset-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: resetPrecargadoUser.id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message, 'info');
        setUsers(prev => prev.map(u => u.id === resetPrecargadoUser.id ? {
          ...u,
          estatusEnrolamiento: 'PRECARGADO',
          boundDeviceId: undefined,
          boundDeviceNombre: undefined,
          fotoPerfilUrl: undefined
        } : u));
        setResetPrecargadoUser(null);
      } else {
        showToast(data.error || 'Error al restablecer estatus.', 'error');
      }
    } catch {
      showToast('Error de red al restablecer estatus.', 'error');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleRoleSystemChange = (roleId: SystemRole) => {
    const roleDef = roles.find(r => r.id === roleId);
    if (roleDef) {
      setFormData(prev => ({
        ...prev,
        rolSistema: roleId,
        raciRole: roleDef.raciEquivalente,
        permisosModulos: [...roleDef.permisosDefault]
      }));
    }
  };

  const handleToggleModulePermission = (mod: IndicatorModule) => {
    const current = formData.permisosModulos || [];
    if (current.includes(mod)) {
      setFormData(prev => ({
        ...prev,
        permisosModulos: current.filter(m => m !== mod)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permisosModulos: [...current, mod]
      }));
    }
  };

  // Helper Badge Renderers
  const getRoleBadge = (role: SystemRole) => {
    const roleDef = roles.find(r => r.id === role);
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${roleDef?.colorBadge || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
        {roleDef?.siglas || role}
      </span>
    );
  };

  const getRaciBadge = (raci: RACIRole) => {
    switch (raci) {
      case 'DIRECTOR_OPERACIONES':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200" title="R - Responsible: Captura y Reporta">R - Operativo</span>;
      case 'VICEMINISTRO':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200" title="A - Accountable: Aprueba y Valida">A - Aprobador</span>;
      case 'MAXIMA_AUTORIDAD':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200" title="I - Informed: Decisión Estratégica">I - Ministro</span>;
      case 'AUDITOR_CONTRALOR':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200" title="C - Consulted / Contraloría">C - Auditor</span>;
    }
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'ACTIVO':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5 animate-pulse" />
            Activo
          </span>
        );
      case 'SUSPENDIDO':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-1.5" />
            Suspendido
          </span>
        );
      case 'BLOQUEADO':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-rose-100 text-rose-800 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mr-1.5" />
            Bloqueado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Inactivo
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className={`fixed top-20 right-6 z-50 p-4 rounded-xl shadow-xl flex items-center space-x-3 text-sm font-medium border transition-all animate-in fade-in duration-200 ${
          notificationMsg.type === 'success' ? 'bg-emerald-900 text-emerald-100 border-emerald-700' :
          notificationMsg.type === 'error' ? 'bg-rose-900 text-rose-100 border-rose-700' :
          'bg-slate-900 text-slate-100 border-slate-700'
        }`}>
          {notificationMsg.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {notificationMsg.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
          {notificationMsg.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
          <span>{notificationMsg.text}</span>
          <button onClick={() => setNotificationMsg(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Space_Grotesk'] tracking-tight">
                Gestión de Usuarios y Roles Institucionales
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Control de acceso basado en roles (RBAC), matriz RACI y trazabilidad de operadores de la VSCC, MPPCI y entes adscritos
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nuevo Usuario</span>
          </button>

          {onSwitchSessionRole && (
            <div className="relative group">
              <button
                className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                title="Simular vista de otro rol ministerial"
              >
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Simular Rol: <span className="text-blue-300 font-mono">{currentRole.slice(0, 8)}...</span></span>
              </button>
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 p-2 hidden group-hover:block z-30">
                <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1">Cambiar Perfil Activo</div>
                {(['DIRECTOR_OPERACIONES', 'VICEMINISTRO', 'MAXIMA_AUTORIDAD', 'AUDITOR_CONTRALOR'] as RACIRole[]).map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      onSwitchSessionRole(r);
                      showToast(`Sesión cambiada a perfil: ${r}`, 'info');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                      currentRole === r ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{r}</span>
                    {currentRole === r && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Usuarios</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">{metrics.total}</span>
            <span className="text-xs text-emerald-600 font-semibold">{metrics.activos} activos</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Personal ministerial y entes adscritos</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Roles de Sistema (RBAC)</span>
            <Shield className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">{roles.length}</span>
            <span className="text-xs text-slate-500">Gobernanza RACI</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Desde Sala Operativa hasta Ministro</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Entes con Operador</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">{ENTES_MIPCCI.length}</span>
            <span className="text-xs text-emerald-600 font-semibold">100% Asignados</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">VTV, RNV, REDTV, CONATEL y más</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Autenticación 2FA</span>
            <Fingerprint className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">{metrics.pct2FA}%</span>
            <span className="text-xs text-purple-600 font-semibold">{metrics.con2FA}/{metrics.total} usuarios</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">Seguridad criptográfica reforzada</div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={() => setActiveTab('DIRECTORIO')}
            className={`pb-3 px-1 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'DIRECTORIO'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Directorio de Usuarios ({filteredUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('MATRIZ_ROLES')}
            className={`pb-3 px-1 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'MATRIZ_ROLES'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Gobernanza de Roles & RBAC</span>
          </button>

          <button
            onClick={() => setActiveTab('COBERTURA_ENTES')}
            className={`pb-3 px-1 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'COBERTURA_ENTES'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Responsables por Ente Adscrito</span>
          </button>

          <button
            onClick={() => setActiveTab('LOGS_SEGURIDAD')}
            className={`pb-3 px-1 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'LOGS_SEGURIDAD'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Auditoría de Accesos</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DIRECTORIO DE USUARIOS */}
      {activeTab === 'DIRECTORIO' && (
        <div className="space-y-4">
          {/* Perspective Preview / Module Simulator Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-700/50 rounded-2xl p-4 sm:p-5 text-white shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm sm:text-base text-white font-['Space_Grotesk']">
                    Simulador de Vista por Funcionario (Auditoría de Módulos RBAC)
                  </h3>
                  {simulatedUser ? (
                    <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      Simulación Activa
                    </span>
                  ) : (
                    <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full font-mono">
                      Vista Super Admin (Todos los módulos)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Active la perspectiva de cualquier usuario para auditar cómo se despliega el menú lateral y qué módulos se le presentan según su perfil oficial. Por ejemplo, al seleccionar a <span className="text-amber-300 font-semibold">Jorge Márquez (CONATEL)</span>, el sistema desplegará únicamente sus 5 módulos asignados.
                </p>
                {simulatedUser && (
                  <div className="mt-2.5 flex items-center space-x-2 text-xs">
                    <span className="text-slate-400">Funcionario activo:</span>
                    <span className="font-bold text-amber-300">{simulatedUser.nombre} {simulatedUser.apellido}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300">{simulatedUser.enteAdscrito}</span>
                    <span className="text-slate-400">•</span>
                    <span className="font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-bold">
                      {simulatedUser.permisosModulos.length} módulos visibles
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0 justify-end">
              <select
                value={simulatedUser ? simulatedUser.id : ''}
                onChange={(e) => {
                  if (!e.target.value) {
                    onSimulateUserView?.(null);
                  } else {
                    const target = users.find(u => u.id === e.target.value) || null;
                    onSimulateUserView?.(target);
                  }
                }}
                className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 cursor-pointer min-w-[240px]"
              >
                <option value="">Vista Super Admin (Totalidad de módulos)</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.nombre} {u.apellido} ({u.enteAdscrito} • {u.permisosModulos.length} mód.)
                  </option>
                ))}
              </select>

              {simulatedUser && (
                <button
                  type="button"
                  onClick={() => onSimulateUserView?.(null)}
                  className="flex items-center space-x-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  title="Restablecer la vista completa de Super Administrador"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer</span>
                </button>
              )}
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre, cédula, correo o cargo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span>Filtros:</span>
              </div>

              {/* Filter Rol */}
              <select
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="TODOS">Todos los Roles</option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
              </select>

              {/* Filter Ente */}
              <select
                value={selectedEnteFilter}
                onChange={(e) => setSelectedEnteFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="TODOS">Todos los Entes</option>
                <option value="VSCC">VSCC (Vicepresidencia Sectorial)</option>
                <option value="MPPCI_CENTRAL">MPPCI Central</option>
                {ENTES_MIPCCI.map(e => (
                  <option key={e.id} value={e.id}>{e.siglas}</option>
                ))}
              </select>

              {/* Filter Status */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="TODOS">Todos los Estados</option>
                <option value="ACTIVO">Activo</option>
                <option value="SUSPENDIDO">Suspendido</option>
                <option value="BLOQUEADO">Bloqueado</option>
              </select>

              {(searchQuery || selectedRoleFilter !== 'TODOS' || selectedEnteFilter !== 'TODOS' || selectedStatusFilter !== 'TODOS') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRoleFilter('TODOS');
                    setSelectedEnteFilter('TODOS');
                    setSelectedStatusFilter('TODOS');
                  }}
                  className="p-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                  title="Limpiar filtros"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="py-3 px-4">Usuario / Funcionario</th>
                    <th className="py-3 px-4">Cédula</th>
                    <th className="py-3 px-4">Ente Adscrito / Cargo</th>
                    <th className="py-3 px-4">Rol de Sistema & RACI</th>
                    <th className="py-3 px-4">Formalización & Dispositivo</th>
                    <th className="py-3 px-4">Nivel de Acceso</th>
                    <th className="py-3 px-4 text-center">2FA</th>
                    <th className="py-3 px-4">Estado</th>
                    <th className="py-3 px-4">Último Acceso</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400">
                        <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="text-sm font-medium text-slate-600">No se encontraron usuarios con los criterios de búsqueda.</p>
                        <p className="text-xs text-slate-400 mt-1">Pruebe modificando los filtros o agregue un nuevo usuario.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => {
                      const initials = `${user.nombre[0] || ''}${user.apellido[0] || ''}`;
                      return (
                        <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* User Avatar + Name */}
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              {user.fotoPerfilUrl ? (
                                <img 
                                  src={user.fotoPerfilUrl} 
                                  alt={user.nombre} 
                                  className="w-8 h-8 rounded-full object-cover border border-slate-300 shadow-xs shrink-0" 
                                />
                              ) : (
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border shrink-0 ${user.avatarBg || 'bg-slate-800 text-blue-400 border-blue-500/40'}`}>
                                  {initials}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-slate-900 leading-tight">
                                  {user.nombre} {user.apellido}
                                </div>
                                <div className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  <span>{user.email}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Cédula */}
                          <td className="py-3 px-4 font-mono font-medium text-slate-800">
                            {user.cedula}
                          </td>

                          {/* Ente & Cargo */}
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-800 flex items-center space-x-1.5">
                              <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{user.enteAdscrito === 'MPPCI_CENTRAL' ? 'MPPCI Central' : user.enteAdscrito}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate max-w-[180px]" title={user.cargo}>
                              {user.cargo}
                            </div>
                          </td>

                          {/* Rol Sistema & RACI */}
                          <td className="py-3 px-4 space-y-1">
                            <div>{getRoleBadge(user.rolSistema)}</div>
                            <div>{getRaciBadge(user.raciRole)}</div>
                          </td>

                          {/* Formalización & Dispositivo Vinculado */}
                          <td className="py-3 px-4">
                            <div className="space-y-1">
                              {user.estatusEnrolamiento === 'ENROLADO' ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                                  Enrolado
                                </span>
                              ) : user.estatusEnrolamiento === 'BLOQUEADO' ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                                  <AlertTriangle className="w-3 h-3 mr-1 text-rose-600" />
                                  Bloqueado
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                  <Sparkles className="w-3 h-3 mr-1 text-amber-600" />
                                  Precargado
                                </span>
                              )}
                              {user.boundDeviceNombre || user.boundDeviceId ? (
                                <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-1 truncate max-w-[130px]" title={`Dispositivo: ${user.boundDeviceNombre || user.boundDeviceId}`}>
                                  <Smartphone className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="truncate">{user.boundDeviceNombre || user.boundDeviceId}</span>
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-400 italic">Sin vincular</div>
                              )}
                            </div>
                          </td>

                          {/* Nivel Acceso */}
                          <td className="py-3 px-4">
                            <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {user.nivelAcceso === 'ADMIN_TOTAL' ? 'Total (Root)' :
                               user.nivelAcceso === 'APROBACION_FIRMA' ? 'Aprobación / Firma' :
                               user.nivelAcceso === 'CAPTURA_EDICION' ? 'Carga y Edición' : 'Lectura'}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                              {user.permisosModulos.length} módulos
                            </div>
                          </td>

                          {/* 2FA */}
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleToggle2FA(user.id)}
                              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                user.dobleFactorAuth 
                                  ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' 
                                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
                              }`}
                              title={user.dobleFactorAuth ? '2FA Activo - Clic para alternar' : '2FA Inactivo - Clic para activar'}
                            >
                              <Fingerprint className="w-4 h-4" />
                            </button>
                          </td>

                          {/* Estado */}
                          <td className="py-3 px-4">
                            {getStatusBadge(user.estado)}
                          </td>

                          {/* Último Acceso */}
                          <td className="py-3 px-4 text-[11px] text-slate-500 font-mono">
                            {user.ultimoAcceso}
                          </td>

                          {/* Acciones */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1">
                              {onSimulateUserView && (
                                <button
                                  onClick={() => onSimulateUserView(simulatedUser?.id === user.id ? null : user)}
                                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                                    simulatedUser?.id === user.id
                                      ? 'bg-amber-500 text-slate-950 font-bold ring-2 ring-amber-400 shadow-xs'
                                      : 'text-amber-600 hover:text-amber-700 hover:bg-amber-50'
                                  }`}
                                  title={
                                    simulatedUser?.id === user.id
                                      ? 'Desactivar simulación de este funcionario'
                                      : `Simular vista del sistema para ${user.nombre} ${user.apellido} (${user.permisosModulos.length} módulos)`
                                  }
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              )}

                              {onSelectUser && (
                                <button
                                  onClick={() => onSelectUser(user)}
                                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                    currentUser?.id === user.id
                                      ? 'bg-blue-600 text-white'
                                      : 'text-slate-500 hover:text-blue-600 hover:bg-blue-50'
                                  }`}
                                  title={currentUser?.id === user.id ? 'Sesión Actual Activa' : 'Iniciar Sesión como este funcionario'}
                                >
                                  <LogIn className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                onClick={() => setViewingUser(user)}
                                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Ver Ficha Detallada"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleOpenEditModal(user)}
                                className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                title="Editar Usuario y Permisos"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleToggleStatus(user.id)}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  user.estado === 'ACTIVO'
                                    ? 'text-slate-500 hover:text-amber-600 hover:bg-amber-50'
                                    : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50'
                                }`}
                                title={user.estado === 'ACTIVO' ? 'Suspender acceso temporalmente' : 'Reactivar acceso'}
                              >
                                {user.estado === 'ACTIVO' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                              </button>

                              {/* Asignar Contraseña Manualmente (Director) */}
                              <button
                                onClick={() => {
                                  setPasswordModalUser(user);
                                  setAdminNewPassword('');
                                }}
                                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                title={`Cambiar contraseña manualmente para ${user.nombre} ${user.apellido}`}
                              >
                                <KeyRound className="w-4 h-4" />
                              </button>

                              {/* Restablecer a Precargado (Fuerza Enrolamiento Inicial) */}
                              <button
                                onClick={() => setResetPrecargadoUser(user)}
                                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title={`Restablecer a PRECARGADO (fuerza formalización inicial de ${user.nombre})`}
                              >
                                <RotateCcw className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MATRIZ DE ROLES & RBAC */}
      {activeTab === 'MATRIZ_ROLES' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                  Arquitectura de Roles Institucionales (RBAC) & RACI
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Estructura jerárquica y facultades de operación de los 7 roles normados dentro del SGDO-VSCC
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Norma COVENIN / ISO 27001</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              {roles.map((role) => (
                <div 
                  key={role.id}
                  className="bg-slate-50/70 rounded-xl p-4 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${role.colorBadge}`}>
                        {role.siglas}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {getRaciBadge(role.raciEquivalente)}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mt-2">
                      {role.nombre}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {role.descripcion}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-200/80">
                      <div className="text-[11px] font-bold text-slate-700 mb-1.5">Capacidades Operativas:</div>
                      <ul className="space-y-1">
                        {role.capacidades.map((cap, idx) => (
                          <li key={idx} className="text-[11px] text-slate-600 flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>Nivel: <strong className="text-slate-700">{role.nivelSeguridad}</strong></span>
                    <span className="text-blue-600 font-semibold">{role.permisosDefault.length} módulos habilitados</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permisos Matrix Table */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk'] mb-3">
              Matriz de Permisos por Módulo y Rol
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="py-2.5 px-3">Módulo del Sistema</th>
                    {roles.map(r => (
                      <th key={r.id} className="py-2.5 px-2 text-center text-[11px]">
                        {r.siglas}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(Object.keys(MODULE_LABELS_MAP) as IndicatorModule[]).map(mod => (
                    <tr key={mod} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        {MODULE_LABELS_MAP[mod].label}
                      </td>
                      {roles.map(r => {
                        const hasPerm = r.permisosDefault.includes(mod);
                        return (
                          <td key={r.id} className="py-2.5 px-2 text-center">
                            {hasPerm ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
                                <X className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RESPONSABLES POR ENTE ADSCRITO */}
      {activeTab === 'COBERTURA_ENTES' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                  Responsables y Salas Operativas por Ente Adscrito
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Directorio de enlace técnico y operadores acreditados para la captura de indicadores semanales
                </p>
              </div>
              <div className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl">
                12 Entes Verificados
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              {ENTES_MIPCCI.map((ente) => {
                // Find assigned user
                const assignedUser = users.find(u => u.enteAdscrito === ente.id);
                return (
                  <div key={ente.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                          {ente.siglas.slice(0, 3)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{ente.siglas}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">{ente.tipo}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {ente.ejePrincipal}
                      </span>
                    </div>

                    <div className="mt-3 text-xs text-slate-600 font-medium line-clamp-1" title={ente.nombre}>
                      {ente.nombre}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-800">{ente.director}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{ente.email}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                        <Send className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                        <span>{ente.telegram}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Nómina: <strong>{ente.nominaTotal}</strong></span>
                      {assignedUser ? (
                        <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Operador Vinculado</span>
                        </span>
                      ) : (
                        <span className="text-amber-700 font-semibold">Pendiente cuenta</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LOGS DE AUDITORÍA Y ACCESOS */}
      {activeTab === 'LOGS_SEGURIDAD' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                  Registro Inmutable de Accesos y Privilegios
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trazabilidad de inicios de sesión, cambios de credenciales y firmas criptográficas del personal
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono bg-purple-50 text-purple-700 border border-purple-200">
                  SHA-256 HMAC Active
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {[
                { time: '2026-09-02 08:14:22', user: 'Ing. Sahib Franco', cedula: 'V-13537582', rol: 'SUPER_ADMIN', accion: 'LOGIN_2FA_SUCCESS', ip: '10.0.12.45', status: 'OK' },
                { time: '2026-09-02 08:10:05', user: 'Dra. Marlene Briceño', cedula: 'V-11849201', rol: 'AUDITOR_CONTRALOR', accion: 'VERIFY_INTEGRITY_HASH', ip: '10.0.12.88', status: 'OK' },
                { time: '2026-09-02 08:02:19', user: 'Dra. Valentina Rondón', cedula: 'V-13492810', rol: 'VICEMINISTRO', accion: 'SIGN_APPROVAL_SEMANA_35', ip: '10.0.10.12', status: 'OK' },
                { time: '2026-09-02 07:45:50', user: 'Lic. Miguel Ángel Pérez', cedula: 'V-11029384', rol: 'MINISTRO', accion: 'GENERATE_AI_BRIEF', ip: '10.0.10.01', status: 'OK' },
                { time: '2026-09-01 08:45:12', user: 'Lic. Gabriel Morales', cedula: 'V-14829301', rol: 'SALA_OPERATIVA_ENTE', accion: 'SUBMIT_WEEKLY_DATA_VTV', ip: '10.20.4.15', status: 'OK' },
                { time: '2026-09-01 09:12:40', user: 'Ing. Carlos Mendoza', cedula: 'V-12495810', rol: 'SALA_OPERATIVA_ENTE', accion: 'SUBMIT_TOWER_STATUS_REDTV', ip: '10.30.2.20', status: 'OK' },
              ].map((log, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/80 px-2 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-900">{log.user} <span className="font-mono text-slate-400 font-normal">({log.cedula})</span></div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                        <span className="font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200">{log.accion}</span>
                        <span>•</span>
                        <span>IP: {log.ip}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-[11px] text-slate-400">
                    {log.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREAR / EDITAR USUARIO */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  {editingUser ? <Edit3 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-['Space_Grotesk']">
                    {editingUser ? 'Editar Funcionario y Asignación de Roles' : 'Registrar Nuevo Funcionario en el SGDO-VSCC'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configuración de credenciales, ente adscrito, nivel de acceso y permisos por módulo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveUser} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Sección 1: Datos Personales */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>1. Identificación y Datos de Contacto</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nombres *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Roberto"
                      value={formData.nombre || ''}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Apellidos *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Castillo"
                      value={formData.apellido || ''}
                      onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Cédula de Identidad *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. V-15892041"
                      value={formData.cedula || ''}
                      onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Institucional *</label>
                    <input
                      type="email"
                      required
                      placeholder="usuario@mppci.gob.ve"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono Móvil</label>
                    <input
                      type="text"
                      placeholder="+58 412 0000000"
                      value={formData.telefono || ''}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Usuario de Telegram</label>
                    <input
                      type="text"
                      placeholder="@usuario_mppci"
                      value={formData.telegram || ''}
                      onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Adscripción y Roles */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>2. Ente Adscrito y Roles Institucionales</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Ente Adscrito *</label>
                    <select
                      value={formData.enteAdscrito || 'VTV'}
                      onChange={(e) => setFormData({ ...formData, enteAdscrito: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="VSCC">VSCC - Vicepresidencia Sectorial de Comunicación y Cultura</option>
                      <option value="MPPCI_CENTRAL">MPPCI Central - Sede Principal</option>
                      {ENTES_MIPCCI.map(e => (
                        <option key={e.id} value={e.id}>{e.siglas} - {e.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Cargo Oficial *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Director de Operaciones"
                      value={formData.cargo || ''}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rol de Sistema (RBAC) *</label>
                    <select
                      value={formData.rolSistema || 'SALA_OPERATIVA_ENTE'}
                      onChange={(e) => handleRoleSystemChange(e.target.value as SystemRole)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      {roles.map(r => (
                        <option key={r.id} value={r.id}>{r.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Rol RACI Ministerial</label>
                    <select
                      value={formData.raciRole || 'DIRECTOR_OPERACIONES'}
                      onChange={(e) => setFormData({ ...formData, raciRole: e.target.value as RACIRole })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="DIRECTOR_OPERACIONES">R - Responsible (Captura y Carga Operativa)</option>
                      <option value="VICEMINISTRO">A - Accountable (Revisión y Aprobación)</option>
                      <option value="MAXIMA_AUTORIDAD">I - Informed (Ministro / Máxima Autoridad)</option>
                      <option value="AUDITOR_CONTRALOR">C - Consulted (Auditoría y Control)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nivel de Acceso</label>
                    <select
                      value={formData.nivelAcceso || 'CAPTURA_EDICION'}
                      onChange={(e) => setFormData({ ...formData, nivelAcceso: e.target.value as AccessLevel })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="LECTURA">Solo Lectura (Visualización)</option>
                      <option value="CAPTURA_EDICION">Carga y Edición de Indicadores</option>
                      <option value="APROBACION_FIRMA">Aprobación y Firma Ejecutiva</option>
                      <option value="ADMIN_TOTAL">Administración Total del Sistema</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Estado de la Cuenta</label>
                    <select
                      value={formData.estado || 'ACTIVO'}
                      onChange={(e) => setFormData({ ...formData, estado: e.target.value as UserStatus })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    >
                      <option value="ACTIVO">Activo (Habilitado)</option>
                      <option value="SUSPENDIDO">Suspendido (Temporal)</option>
                      <option value="BLOQUEADO">Bloqueado (Seguridad)</option>
                      <option value="INACTIVO">Inactivo</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 flex items-center space-x-2 bg-purple-50 p-3 rounded-xl border border-purple-200">
                  <input
                    type="checkbox"
                    id="chk2fa"
                    checked={formData.dobleFactorAuth ?? true}
                    onChange={(e) => setFormData({ ...formData, dobleFactorAuth: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded border-purple-300 focus:ring-purple-500"
                  />
                  <label htmlFor="chk2fa" className="text-xs font-semibold text-purple-900 cursor-pointer">
                    Exigir Autenticación de Dos Factores (2FA por App / Telegram OTP)
                  </label>
                </div>
              </div>

              {/* Sección 3: Permisos de Módulos */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-600" />
                    <span>3. Permisos de Acceso por Módulo</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const allMods = Object.keys(MODULE_LABELS_MAP) as IndicatorModule[];
                      setFormData(prev => ({
                        ...prev,
                        permisosModulos: prev.permisosModulos?.length === allMods.length ? [] : allMods
                      }));
                    }}
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    Seleccionar Todos / Ninguno
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {(Object.keys(MODULE_LABELS_MAP) as IndicatorModule[]).map(mod => {
                    const isChecked = (formData.permisosModulos || []).includes(mod);
                    return (
                      <label
                        key={mod}
                        className={`flex items-center space-x-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          isChecked 
                            ? 'bg-blue-50/70 border-blue-200 text-blue-900 font-semibold' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleModulePermission(mod)}
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                        />
                        <span className="truncate">{MODULE_LABELS_MAP[mod].label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingUser ? 'Guardar Cambios' : 'Registrar Funcionario'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VER FICHA DETALLADA */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border ${viewingUser.avatarBg || 'bg-slate-800 text-blue-400'}`}>
                  {viewingUser.nombre[0]}{viewingUser.apellido[0]}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{viewingUser.nombre} {viewingUser.apellido}</h3>
                  <p className="text-xs text-slate-500 font-mono">{viewingUser.cedula} • {viewingUser.id}</p>
                </div>
              </div>
              <button onClick={() => setViewingUser(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Ente Adscrito</span>
                  <span className="font-bold text-slate-800">{viewingUser.enteAdscrito}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Cargo</span>
                  <span className="font-semibold text-slate-800">{viewingUser.cargo}</span>
                </div>
                <div className="mt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Rol Sistema</span>
                  <span className="font-semibold text-blue-700">{viewingUser.rolSistema}</span>
                </div>
                <div className="mt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Rol RACI</span>
                  <span>{getRaciBadge(viewingUser.raciRole)}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Correo:</span>
                  <span className="font-mono font-medium">{viewingUser.email}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Teléfono:</span>
                  <span>{viewingUser.telefono}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Telegram:</span>
                  <span className="text-blue-600 font-medium">{viewingUser.telegram || 'No asignado'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Estado de Cuenta:</span>
                  <span>{getStatusBadge(viewingUser.estado)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Autenticación 2FA:</span>
                  <span className="font-semibold text-purple-700">{viewingUser.dobleFactorAuth ? 'Activo (Protegido)' : 'Inactivo'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Último Inicio de Sesión:</span>
                  <span className="font-mono text-slate-700">{viewingUser.ultimoAcceso}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1.5">Módulos Habilitados ({(viewingUser.permisosModulos || []).length})</span>
                <div className="flex flex-wrap gap-1">
                  {(viewingUser.permisosModulos || []).map(m => (
                    <span key={m} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-200">
                      {MODULE_LABELS_MAP[m]?.label || m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
              {onSimulateUserView && (
                <button
                  onClick={() => {
                    onSimulateUserView(simulatedUser?.id === viewingUser.id ? null : viewingUser);
                    setViewingUser(null);
                  }}
                  className={`px-3 py-2 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 ${
                    simulatedUser?.id === viewingUser.id
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>{simulatedUser?.id === viewingUser.id ? 'Desactivar Simulación' : 'Simular Vista de este Usuario'}</span>
                </button>
              )}
              <button
                onClick={() => {
                  setViewingUser(null);
                  handleOpenEditModal(viewingUser);
                }}
                className="px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Editar Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Administrativo: Asignar Contraseña Manualmente */}
      {passwordModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col text-slate-800">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <KeyRound className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                  Asignar Contraseña Manual (scrypt)
                </h3>
              </div>
              <button
                onClick={() => setPasswordModalUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdminSavePassword} className="p-6 space-y-4">
              <p className="text-xs text-slate-600">
                Asignando nueva contraseña institucional al funcionario: <br />
                <strong className="text-slate-900">{passwordModalUser.nombre} {passwordModalUser.apellido}</strong> ({passwordModalUser.cedula} • {passwordModalUser.enteAdscrito}).
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nueva Contraseña Institucional
                </label>
                <input
                  type="text"
                  value={adminNewPassword}
                  onChange={(e) => setAdminNewPassword(e.target.value)}
                  placeholder="Ingrese nueva contraseña..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  required
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  La contraseña se codificará inmediatamente con sal aleatoria y derivación de clave scrypt.
                </span>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setPasswordModalUser(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isActionLoading || adminNewPassword.length < 6}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isActionLoading ? 'Guardando...' : 'Asignar Contraseña'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Administrativo: Restablecer a PRECARGADO */}
      {resetPrecargadoUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col text-slate-800">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-rose-50">
              <div className="flex items-center space-x-2 text-rose-700 font-bold">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="text-sm font-bold font-['Space_Grotesk']">
                  Restablecer a Estatus Precargado
                </h3>
              </div>
              <button
                onClick={() => setResetPrecargadoUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-700 leading-relaxed">
                ¿Está seguro de restablecer al funcionario <strong className="text-slate-900">{resetPrecargadoUser.nombre} {resetPrecargadoUser.apellido}</strong> ({resetPrecargadoUser.cedula}) al estatus <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold font-mono">PRECARGADO</span>?
              </p>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
                <div className="font-bold flex items-center space-x-1">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Efectos de esta acción:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-900">
                  <li>Se eliminará la vinculación de su dispositivo previo (<code className="font-mono">{resetPrecargadoUser.boundDeviceId || 'N/A'}</code>).</li>
                  <li>Se reseteará su contraseña actual y se requerirá la clave de contingencia oficial.</li>
                  <li>En su próximo ingreso, el sistema <strong>le obligará forzosamente</strong> a pasar por el flujo de formalización (toma de foto, asignación de clave y vinculación de dispositivo).</li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setResetPrecargadoUser(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAdminResetToPrecargado}
                  disabled={isActionLoading}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isActionLoading ? 'Restableciendo...' : 'Confirmar Restablecimiento'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementPanel;
