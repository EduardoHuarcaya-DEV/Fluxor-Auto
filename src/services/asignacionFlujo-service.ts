import api from "@/api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

export const ASIGNACION_FLUJO_KEY = ["asignacion-flujo"];

// Interfaces para tipar los datos
interface CreateAsignacionFlujoDto {
    id_user: string;
    id_flujo: string;
}

const AsignacionFlujoApi = {

    // Funciones del servicio para obtener las asignaciones de flujo
    // Permite obtener los flujos asignados al usuario logueado

    //Funciones del servicio

    getAll: () => api.get("/asignacion-flujo"),
    getByUserId: (userId: string) => api.get(`/asignacion-flujo/user/${userId}`),
    create: (data: CreateAsignacionFlujoDto) => api.post("/asignacion-flujo", data),
    update: (id: string, data: Partial<CreateAsignacionFlujoDto>) => api.patch(`/asignacion-flujo/${id}`, data),
    delete: (id: string) => api.delete(`/asignacion-flujo/${id}`),

    // Hooks de TanStack Query

    useGetAll: () => useQuery({
        queryKey: ASIGNACION_FLUJO_KEY,
        queryFn: () => AsignacionFlujoApi.getAll(),
    }),

    // Hook para obtener los flujos del usuario logueado
    useGetByUser: () => {
        const { user } = useAuth();
        
        return useQuery({
            queryKey: [...ASIGNACION_FLUJO_KEY, "user", user?.id_user || user?.id],
            queryFn: async () => {
                const userId = user?.id_user || user?.id;
                if (!userId) {
                    throw new Error("Usuario no autenticado");
                }
                // Usar el endpoint específico del backend para obtener flujos por usuario
                const response = await AsignacionFlujoApi.getByUserId(userId);
                return response.data;
            },
            enabled: !!(user?.id_user || user?.id), // Solo ejecutar si hay un usuario logueado
        });
    },

    useCreate: () => {
        const queryClient = useQueryClient();
        const { user } = useAuth();

        return useMutation({
            mutationFn: (data: CreateAsignacionFlujoDto) => AsignacionFlujoApi.create(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ASIGNACION_FLUJO_KEY });
                // También invalidar la query específica del usuario
                const userId = user?.id_user || user?.id;
                if (userId) {
                    queryClient.invalidateQueries({ 
                        queryKey: [...ASIGNACION_FLUJO_KEY, "user", userId] 
                    });
                }
            },
        });
    },

    useUpdate: () => {
        const queryClient = useQueryClient();
        const { user } = useAuth();

        return useMutation({
            mutationFn: ({ id, data }: { id: string; data: Partial<CreateAsignacionFlujoDto> }) => 
                AsignacionFlujoApi.update(id, data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ASIGNACION_FLUJO_KEY });
                const userId = user?.id_user || user?.id;
                if (userId) {
                    queryClient.invalidateQueries({ 
                        queryKey: [...ASIGNACION_FLUJO_KEY, "user", userId] 
                    });
                }
            },
        });
    },

    useDelete: () => {
        const queryClient = useQueryClient();
        const { user } = useAuth();

        return useMutation({
            mutationFn: (id: string) => AsignacionFlujoApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ASIGNACION_FLUJO_KEY });
                const userId = user?.id_user || user?.id;
                if (userId) {
                    queryClient.invalidateQueries({ 
                        queryKey: [...ASIGNACION_FLUJO_KEY, "user", userId] 
                    });
                }
            },
        });
    },
}

export default AsignacionFlujoApi;