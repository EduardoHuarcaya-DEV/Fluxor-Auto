import React, { useState } from 'react';
import { X, Mail, Brain, Settings, Play } from 'lucide-react';
import type { FlowModalProps } from '../FlowModalManager';

const GmailOpenAIModal: React.FC<FlowModalProps> = ({ isOpen, onClose, flowData }) => {
    const [config, setConfig] = useState({
        gmailAccount: '',
        openaiApiKey: '',
        promptTemplate: 'Analiza el siguiente email y proporciona un resumen ejecutivo:\n\n{email_content}',
        autoReply: false,
        replyTemplate: 'Gracias por tu email. He procesado tu mensaje con IA y te responderé pronto.',
        triggerKeywords: ['urgente', 'importante', 'revisar'],
        maxTokens: 150
    });

    const handleConfigChange = (field: string, value: any) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Aquí implementarías la lógica para guardar la configuración
        console.log('Configuración guardada:', config);
        // Podrías hacer una petición al backend para guardar la configuración
        onClose();
    };

    const handleTest = () => {
        // Aquí implementarías la lógica para probar el flujo
        console.log('Probando flujo con configuración:', config);
        alert('Función de prueba ejecutada. Revisa la consola para más detalles.');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-blue-600" />
                            <span className="text-gray-400">+</span>
                            <Brain className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Gmail + OpenAI</h2>
                            <p className="text-sm text-gray-600">Automatización de análisis de emails con IA</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Configuración de Gmail */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold">Configuración de Gmail</h3>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cuenta de Gmail
                            </label>
                            <input
                                type="email"
                                value={config.gmailAccount}
                                onChange={(e) => handleConfigChange('gmailAccount', e.target.value)}
                                placeholder="tu-email@gmail.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Palabras clave para activar el flujo
                            </label>
                            <input
                                type="text"
                                value={config.triggerKeywords.join(', ')}
                                onChange={(e) => handleConfigChange('triggerKeywords', e.target.value.split(', '))}
                                placeholder="urgente, importante, revisar"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Separar con comas</p>
                        </div>
                    </div>

                    {/* Configuración de OpenAI */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-green-600" />
                            <h3 className="text-lg font-semibold">Configuración de OpenAI</h3>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                API Key de OpenAI
                            </label>
                            <input
                                type="password"
                                value={config.openaiApiKey}
                                onChange={(e) => handleConfigChange('openaiApiKey', e.target.value)}
                                placeholder="sk-..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Template del Prompt
                            </label>
                            <textarea
                                value={config.promptTemplate}
                                onChange={(e) => handleConfigChange('promptTemplate', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Escribe el prompt que se enviará a OpenAI..."
                            />
                            <p className="text-xs text-gray-500 mt-1">Usa {`{email_content}`} para insertar el contenido del email</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Máximo de tokens
                            </label>
                            <input
                                type="number"
                                value={config.maxTokens}
                                onChange={(e) => handleConfigChange('maxTokens', parseInt(e.target.value))}
                                min="50"
                                max="1000"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Configuración de respuesta automática */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-gray-600" />
                            <h3 className="text-lg font-semibold">Respuesta Automática</h3>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="autoReply"
                                checked={config.autoReply}
                                onChange={(e) => handleConfigChange('autoReply', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="autoReply" className="text-sm font-medium text-gray-700">
                                Enviar respuesta automática
                            </label>
                        </div>

                        {config.autoReply && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Template de respuesta automática
                                </label>
                                <textarea
                                    value={config.replyTemplate}
                                    onChange={(e) => handleConfigChange('replyTemplate', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        )}
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
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        <Play className="h-4 w-4" />
                        Probar Flujo
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

export default GmailOpenAIModal;
