import React from 'react';
import { X, Workflow } from 'lucide-react';

// Tipos para el modal
interface FlowModalProps {
    isOpen: boolean;
    onClose: () => void;
    flowData: any;
}

// Modal vacío y personalizable
const FlowModal: React.FC<FlowModalProps> = ({ isOpen, onClose, flowData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header del modal */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <Workflow className="h-6 w-6 text-blue-600" />
                        <div>
                            <h2 className="text-xl font-bold">{flowData?.nombre || 'Configurar Flujo'}</h2>
                            <p className="text-sm text-gray-600">{flowData?.descripcion || 'Personaliza este flujo según tus necesidades'}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Contenido del modal - AQUÍ PUEDES PERSONALIZAR TODO */}
                <div className="p-6">
                    {/* Información básica del flujo */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-800 mb-2">Información del Flujo</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><strong>Nombre:</strong> {flowData?.nombre}</p>
                            <p><strong>ID:</strong> {flowData?.id_flujo}</p>
                            <p><strong>Estado:</strong> {flowData?.estado ? 'Activo' : 'Inactivo'}</p>
                            <p><strong>Descripción:</strong> {flowData?.descripcion}</p>
                            {flowData?.createdAt && (
                                <p><strong>Creado:</strong> {new Date(flowData.createdAt).toLocaleDateString('es-ES')}</p>
                            )}
                        </div>
                    </div>

                    {/* ÁREA PERSONALIZABLE - Aquí puedes agregar tu contenido */}
                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">Área Personalizable</h3>
                            <p className="text-gray-500 text-sm">
                                Este es tu espacio para personalizar el modal.<br />
                                Puedes agregar formularios, configuraciones, botones, etc.
                            </p>
                        </div>

                        {/* Ejemplo de sección que puedes personalizar */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-gray-800">Configuración (Ejemplo)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Campo de ejemplo
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Escribe aquí..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Otro campo
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Opción 1</option>
                                        <option>Opción 2</option>
                                        <option>Opción 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer del modal */}
                <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            // Aquí puedes agregar tu lógica personalizada
                            console.log('Guardar configuración para:', flowData?.nombre);
                            onClose();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlowModal;
export type { FlowModalProps };