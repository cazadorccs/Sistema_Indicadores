import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  ShieldAlert,
  Users,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { AutomatedAlertNotification, EnteInfo } from '../types';
import { ENTES_MIPCCI } from '../data/mockData';

interface AlertsNotificationCenterProps {
  notifications: AutomatedAlertNotification[];
  onDismissNotification: (id: string) => void;
  onDispatchCustomNotification: (payload: {
    tipo: 'DEMORA_CARGA' | 'KPI_CRITICO' | 'FALLA_INFRAESTRUCTURA' | 'MATRIZ_DESINFORMACION';
    destinatarioEnte: string;
    destinatarioResponsable: string;
    correo: string;
    telegram: string;
    asunto: string;
    mensaje: string;
    canal: 'TELEGRAM' | 'EMAIL' | 'AMBOS';
  }) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const AlertsNotificationCenter: React.FC<AlertsNotificationCenterProps> = ({
  notifications,
  onDismissNotification,
  onDispatchCustomNotification,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'DISPATCH_CUSTOM'>('ACTIVE');
  const [selectedEnte, setSelectedEnte] = useState<EnteInfo>(ENTES_MIPCCI[0]);
  const [alertType, setAlertType] = useState<'DEMORA_CARGA' | 'KPI_CRITICO' | 'FALLA_INFRAESTRUCTURA' | 'MATRIZ_DESINFORMACION'>('DEMORA_CARGA');
  const [channel, setChannel] = useState<'TELEGRAM' | 'EMAIL' | 'AMBOS'>('AMBOS');
  const [customSubject, setCustomSubject] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDispatch = () => {
    onDispatchCustomNotification({
      tipo: alertType,
      destinatarioEnte: selectedEnte.siglas,
      destinatarioResponsable: selectedEnte.director,
      correo: selectedEnte.email,
      telegram: selectedEnte.telegram,
      asunto: customSubject || `[ALERTA MPPCI] Requerimiento urgente: ${alertType}`,
      mensaje: customMessage || `Se solicita atención inmediata del Director General de ${selectedEnte.siglas} para resolver la situación reportada.`,
      canal: channel
    });

    setDispatchStatus('¡Notificación enviada exitosamente vía API a Telegram y Servidor SMTP!');
    setTimeout(() => {
      setDispatchStatus(null);
      setCustomSubject('');
      setCustomMessage('');
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Centro de Notificaciones & Alertas Automáticas
              </h2>
              <p className="text-xs text-slate-400">Disparador de alertas Telegram y Correo para cumplimiento del corte semanal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex space-x-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
              activeTab === 'ACTIVE' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Alertas Activas ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('DISPATCH_CUSTOM')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
              activeTab === 'DISPATCH_CUSTOM' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Consola de Despacho Manual
          </button>
        </div>

        {/* TAB 1: ACTIVE NOTIFICATIONS */}
        {activeTab === 'ACTIVE' && (
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                No hay alertas activas en este momento. Todos los indicadores y plazos están al día.
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    notif.severidad === 'CRITICA' ? 'bg-red-950/20 border-red-500/50' :
                    notif.severidad === 'ALTA' ? 'bg-amber-950/20 border-amber-500/50' :
                    'bg-blue-950/20 border-blue-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          notif.severidad === 'CRITICA' ? 'bg-red-500/20 text-red-300' :
                          notif.severidad === 'ALTA' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {notif.tipo}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">{notif.timestamp}</span>
                      </div>
                      <h4 className="font-bold text-white mt-1">{notif.asunto}</h4>
                    </div>
                    <button
                      onClick={() => onDismissNotification(notif.id)}
                      className="text-[10px] text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded cursor-pointer"
                    >
                      Descartar
                    </button>
                  </div>

                  <p className="text-slate-300 text-xs">{notif.mensaje}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <div>
                      Destinatario: <b className="text-slate-200">{notif.destinatarioResponsable} ({notif.destinatarioEnte})</b>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {(notif.canales && notif.canales.length > 0
                          ? notif.canales
                          : (notif.canal === 'AMBOS'
                              ? ['TELEGRAM', 'EMAIL']
                              : [notif.canal || 'TELEGRAM'])
                        ).join(' & ')}{' '}
                        ENVIADO
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: DISPATCH CUSTOM NOTIFICATION */}
        {activeTab === 'DISPATCH_CUSTOM' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Seleccionar Ente Adscrito</label>
                <select
                  value={selectedEnte.id}
                  onChange={e => {
                    const found = ENTES_MIPCCI.find(ent => ent.id === e.target.value);
                    if (found) setSelectedEnte(found);
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 cursor-pointer"
                >
                  {ENTES_MIPCCI.map(ente => (
                    <option key={ente.id} value={ente.id}>{ente.nombre} ({ente.siglas})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Tipo de Alerta</label>
                <select
                  value={alertType}
                  onChange={e => setAlertType(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 cursor-pointer"
                >
                  <option value="DEMORA_CARGA">Demora en Reporte Semanal (Lunes 10 AM)</option>
                  <option value="KPI_CRITICO">Caída Crítica de KPI (&lt; 70%)</option>
                  <option value="FALLA_INFRAESTRUCTURA">Falla en Torre / Telepuerto</option>
                  <option value="MATRIZ_DESINFORMACION">Crisis por Matriz de Desinformación</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Canal de Envío</label>
                <select
                  value={channel}
                  onChange={e => setChannel(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 cursor-pointer"
                >
                  <option value="AMBOS">Telegram Bot + Correo Electrónico</option>
                  <option value="TELEGRAM">Solo Canal Telegram</option>
                  <option value="EMAIL">Solo Correo Electrónico Institucional</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Contacto Registrado</label>
                <div className="bg-slate-950 p-2 rounded-xl text-[11px] text-slate-300 border border-slate-800">
                  <span>{selectedEnte.email} | {selectedEnte.telegram}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="text-slate-300 block">Asunto</label>
              <input
                type="text"
                value={customSubject}
                onChange={e => setCustomSubject(e.target.value)}
                placeholder="[MPPCI-ALERTA] Notificación urgente de sala situacional..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>

            <div className="space-y-2 text-xs">
              <label className="text-slate-300 block">Mensaje / Instrucción Ministerial</label>
              <textarea
                rows={3}
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                placeholder="Describa la directriz que debe acatar el responsable del ente..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-100"
              />
            </div>

            {dispatchStatus && (
              <div className="p-3 bg-emerald-950 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{dispatchStatus}</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleDispatch}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Emitir Despacho Inmediato</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
