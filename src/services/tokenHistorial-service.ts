import api from "@/api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const TOKEN_HISTORIAL_KEY = ["token-historial"];

const TokenHistorialApi = {


    // He definido las funciones del servicio para obtener el historial de uso de los tokens
    // ademas la funciona de registrar, que se aplicara cada vez que se utilice un nodo.

    //Funciones del servicio

    getAll: () => api.get("/token-historial"),
    create: (data: any) => api.post("/token-historial", data),

    // Hooks de TanStack Query

    useGetAll: () => useQuery({
        queryKey: TOKEN_HISTORIAL_KEY,
        queryFn: () => TokenHistorialApi.getAll(),
    }),

    useCreate: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: (data: any) => TokenHistorialApi.create(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: TOKEN_HISTORIAL_KEY });
            },
        });
    },
}

export default TokenHistorialApi