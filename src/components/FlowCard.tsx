import { Workflow } from "lucide-react";
import { useState } from "react";
import FlowModal from "./modals/FlowModalManager";

interface FlowCardProps {
    nombre: string;
    descripcion: string;
    estado: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    id_flujo?: string;
    className?: string;
}

const FlowCard = ({
    nombre,
    descripcion,
    estado,
    createdAt,
    updatedAt,
    id_flujo,
    className = ""
}: FlowCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Preparar los datos del flujo para el modal
    const flowData = {
        nombre,
        descripcion,
        estado,
        createdAt,
        updatedAt,
        id_flujo
    };

    return (
        <>
            <div
                className={`border rounded-lg p-4 gap-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${className}`}
                onClick={handleCardClick}
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Workflow className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">{nombre}</h3>
                    </div>
                    <span
                        className={`px-2 py-1 rounded text-xs font-medium ${estado
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {estado ? 'Activo' : 'Inactivo'}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {descripcion}
                </p>

                <div className="space-y-2 text-xs text-gray-500">
                    {id_flujo && (
                        <div>
                            <span className="font-medium">ID:</span>
                            <span className="ml-1 font-mono">{id_flujo.slice(-8)}</span>
                        </div>
                    )}

                    {createdAt && (
                        <div>
                            <span className="font-medium">Creado:</span>
                            <span className="ml-1">
                                {new Date(createdAt).toLocaleDateString('es-ES')}
                            </span>
                        </div>
                    )}

                    {updatedAt && updatedAt !== createdAt && (
                        <div>
                            <span className="font-medium">Actualizado:</span>
                            <span className="ml-1">
                                {new Date(updatedAt).toLocaleDateString('es-ES')}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal del flujo */}
            <FlowModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                flowData={flowData}
            />
        </>
    );
};

export default FlowCard;