import React, { useState } from 'react';
import { X, Database, Filter, Settings, Play } from 'lucide-react';
import type { FlowModalProps } from '../FlowModalManager';

const DataProcessingModal: React.FC<FlowModalProps> = ({ isOpen, onClose, flowData }) => {
    const [config, setConfig] = useState({
        dataSource: 'database',
        connectionString: '',
        query: 'SELECT * FROM users WHERE active = 1',
        outputFormat: 'json',
        batchSize: 100,
        filters: [],
        transformations: [],
        schedule: 'manual'
    });

    const handleConfigChange = (field: string, value: any) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        console.log('Configuración de procesamiento de datos guardada:', config);
        onClose();
    };

    const handleTest = () => {
        console.log('Probando procesamiento de datos:', config);
        alert('Procesamiento de datos ejecutado!');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Database className="h-6 w-6 text-indigo-600" />
                        <div>
                            <h2 className="text-xl font-bold">Data Processing</h2>
                            <p className="text-sm text-gray-600">Automatización de procesamiento de datos</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Configuración de fuente de datos */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Database className="h-5 w-5 text-indigo-600" />
                            <h3 className="text-lg font-semibold">Fuente de Datos</h3>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo de fuente
                            </label>
                            <select
                                value={config.dataSource}
                                onChange={(e) => handleConfigChange('dataSource', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="database">Base de datos</option>
                                <option value="api">API REST</option>
                                <option value="csv">Archivo CSV</option>
                                <option value="json">Archivo JSON</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cadena de conexión / URL
                            </label>
                            <input
                                type="text"
                                value={config.connectionString}
                                onChange={(e) => handleConfigChange('connectionString', e.target.value)}
                                placeholder="postgresql://user:pass@localhost:5432/db"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Configuración de consulta */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold">Consulta y Filtros</h3>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Consulta SQL / Filtro
                            </label>
                            <textarea
                                value={config.query}
                                onChange={(e) => handleConfigChange('query', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="SELECT * FROM tabla WHERE condicion = valor"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Formato de salida
                                </label>
                                <select
                                    value={config.outputFormat}
                                    onChange={(e) => handleConfigChange('outputFormat', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="json">JSON</option>
                                    <option value="csv">CSV</option>
                                    <option value="xml">XML</option>
                                    <option value="excel">Excel</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tamaño de lote
                                </label>
                                <input
                                    type="number"
                                    value={config.batchSize}
                                    onChange={(e) => handleConfigChange('batchSize', parseInt(e.target.value))}
                                    min="1"
                                    max="1000"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Configuración de programación */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Settings className="h-5 w-5 text-gray-600" />
                            <h3 className="text-lg font-semibold">Programación</h3>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Frecuencia de ejecución
                            </label>
                            <select
                                value={config.schedule}
                                onChange={(e) => handleConfigChange('schedule', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                <option value="manual">Manual</option>
                                <option value="hourly">Cada hora</option>
                                <option value="daily">Diario</option>
                                <option value="weekly">Semanal</option>
                                <option value="monthly">Mensual</option>
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
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    >
                        <Play className="h-4 w-4" />
                        Ejecutar Procesamiento
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

export default DataProcessingModal;
