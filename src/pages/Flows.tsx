import AsignacionFlujoApi from "@/services/asignacionFlujo-service";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Workflow, User } from "lucide-react";
import FlowCard from "@/components/FlowCard";

const Flows = () => {
    const { user } = useAuth();
    const { data: userFlows, isLoading, error } = AsignacionFlujoApi.useGetByUser();

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                    <Workflow className="h-6 w-6" />
                    <h1 className="text-2xl font-bold">Mis Flujos Asignados</h1>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="border rounded-lg p-4 shadow-sm">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                            <div className="mt-4">
                                <Skeleton className="h-20 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                    <Workflow className="h-6 w-6" />
                    <h1 className="text-2xl font-bold">Mis Flujos Asignados</h1>
                </div>
                <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <p className="text-red-800">
                            Error al cargar los flujos: {error instanceof Error ? error.message : 'Error desconocido'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Workflow className="h-6 w-6" />
                    <h1 className="text-2xl font-bold">Mis Flujos Asignados</h1>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{user?.email || user?.name || 'Usuario'}</span>
                </div>
            </div>

            {!userFlows || userFlows.length === 0 ? (
                <div className="border rounded-lg p-8 text-center">
                    <Workflow className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No tienes flujos asignados</h3>
                    <p className="text-gray-600">
                        Aún no se te han asignado flujos. Contacta con tu administrador para obtener acceso a los flujos.
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Total de flujos asignados: </span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">{userFlows.length}</span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {userFlows.map((assignment: any) => (
                            <FlowCard
                                key={assignment.id_asignacion_flujo}
                                nombre={assignment.flujo?.nombre || `Flujo #${assignment.id_flujo.slice(-8)}`}
                                descripcion={assignment.flujo?.descripcion || 'Sin descripción disponible'}
                                estado={assignment.flujo?.estado ?? true}
                                createdAt={assignment.createdAt}
                                updatedAt={assignment.updatedAt}
                                id_flujo={assignment.id_flujo}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Flows;