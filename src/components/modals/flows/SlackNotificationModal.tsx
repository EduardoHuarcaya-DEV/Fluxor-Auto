import React, { useState } from 'react';
import { X, MessageSquare, Bell, Settings, Play } from 'lucide-react';
import type { FlowModalProps } from '../FlowModalManager';

const SlackNotificationModal: React.FC<FlowModalProps> = ({ isOpen, onClose, flowData }) => {
    const [config, setConfig] = useState({
        slackWebhookUrl: '',
        channel: '#general',
        username: 'FluxorBot',
        messageTemplate: '🚨 Notificación automática: {message}',
        triggerConditions: ['error', 'warning', 'success'],
        includeTimestamp: true,
        mentionUsers: '',
        priority: 'normal'
    });

    const handleConfigChange = (field: string, value: any) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Configuración de Slack guardada:', config);
        onClose();
    };

    const handleTest = () => {
        console.log('Probando notificación de Slack:', config);
        alert('Notificación de prueba enviada a Slack!');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                        <div>
                            <h2 className="text-xl font-bold">Slack Notification</h2>
                            <p className="text-sm text-gray-600">Automatización de notificaciones en Slack</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Configuración de Slack */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-purple-600" />
                            <h3 className="text-lg font-semibold">Configuración de Slack</h3>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Webhook URL de Slack
                            </label>
                            <input
                                type="url"
                                value={config.slackWebhookUrl}
                                onChange={(e) => handleConfigChange('slackWebhookUrl', e.target.value)}
                                placeholder="https://hooks.slack.com/services/..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Canal
                                </label>
                                <input
                                    type="text"
                                    value={config.channel}
                                    onChange={(e) => handleConfigChange('channel', e.target.value)}
                                    placeholder="#general"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre de usuario
                                </label>
                                <input
                                    type="text"
                                    value={config.username}
                                    onChange={(e) => handleConfigChange('username', e.target.value)}
                                    placeholder="FluxorBot"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Template del mensaje */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-orange-600" />
                            <h3 className="text-lg font-semibold">Template del Mensaje</h3>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Plantilla del mensaje
                            </label>
                            <textarea
                                value={config.messageTemplate}
                                onChange={(e) => handleConfigChange('messageTemplate', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Tu mensaje personalizado..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Usa {`{message}`} para insertar el contenido dinámico</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mencionar usuarios (opcional)
                            </label>
                            <input
                                type="text"
                                value={config.mentionUsers}
                                onChange={(e) => handleConfigChange('mentionUsers', e.target.value)}
                                placeholder="@usuario1, @usuario2"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>

                    {/* Configuración avanzada */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-gray-600" />
                            <h3 className="text-lg font-semibold">Configuración Avanzada</h3>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Condiciones de activación
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {['error', 'warning', 'success', 'info'].map((condition) => (
                                    <label key={condition} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={config.triggerConditions.includes(condition)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    handleConfigChange('triggerConditions', [...config.triggerConditions, condition]);
                                                } else {
                                                    handleConfigChange('triggerConditions', config.triggerConditions.filter(c => c !== condition));
                                                }
                                            }}
                                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm capitalize">{condition}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="includeTimestamp"
                                checked={config.includeTimestamp}
                                onChange={(e) => handleConfigChange('includeTimestamp', e.target.checked)}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label htmlFor="includeTimestamp" className="text-sm font-medium text-gray-700">
                                Incluir timestamp en el mensaje
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prioridad
                            </label>
                            <select
                                value={config.priority}
                                onChange={(e) => handleConfigChange('priority', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="low">Baja</option>
                                <option value="normal">Normal</option>
                                <option value="high">Alta</option>
                                <option value="urgent">Urgente</option>
                            </select>
                        </div>
                    </div>

                    {/* Información del flujo */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Información del Flujo</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>ID:</strong> {flowData?.id_flujo}</p>
                            <p><strong>Estado:</strong> {flowData?.estado ? 'Activo' : 'Inactivo'}</p>
                            <p><strong>Descripción:</strong> {flowData?.descripcion}</p>
                        </div>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-between">
                    <button
                        onClick={handleTest}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                        <Play className="h-4 w-4" />
                        Probar Notificación
                    </button>
                    
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                            Guardar Configuración
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlackNotificationModal;
