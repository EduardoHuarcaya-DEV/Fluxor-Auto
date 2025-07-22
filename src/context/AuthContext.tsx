import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';
import api from '@/api/api';

// Definir interfaces para los tipos
interface User {
    id: string;
    name?: string;
    email: string;
    [key: string]: any; // Para otras propiedades que pueda tener el usuario
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    token: string | null;
    login: (credentials: { email: string; password: string }) => Promise<boolean>;
    logout: () => boolean;
    clearAuthState: () => void;
}

// Crear el contexto de autenticación con tipo explícito
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // Estados para manejar la autenticación
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);

    // Función para limpiar el estado de autenticación sin llamar al backend
    const clearAuthState = (): void => {
        // Eliminar token del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');

        // Eliminar el token de los headers de las peticiones
        delete api.defaults.headers.common['Authorization'];

        // Limpiar estado
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
    };

    // Verificar si hay un token almacenado al cargar la página
    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    // Configurar el token en el header de las peticiones
                    api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

                    // Obtener información del perfil del usuario
                    const response = await api.get('/auth/profile');

                    if (response.status === 200) {
                        setUser(response.data);
                        setIsAuthenticated(true);
                        setToken(storedToken);
                    } else {
                        // Si hay un error, limpiar la autenticación
                        clearAuthState();
                    }
                } catch (error) {
                    console.error('Error al verificar autenticación:', error);
                    clearAuthState();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Función para iniciar sesión
    const login = async (credentials: { email: string; password: string }): Promise<boolean> => {
        try {
            setLoading(true);
            const response = await api.post('/auth/login', credentials);

            if (response.status === 201 || response.status === 200) {
                const data = response.data;

                // Guardar token en localStorage
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('isAuthenticated', 'true');

                // Configurar el token en el header de las peticiones
                api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;

                // Actualizar estado con la información del usuario
                setUser(data.user);
                setIsAuthenticated(true);
                setToken(data.access_token);

                toast.success('Inicio de sesión exitoso');
                return true;
            } else {
                toast.error('Error al iniciar sesión');
                return false;
            }
        } catch (error: any) {
            // console.error('Error al iniciar sesión:', error);
            toast.error(error.response?.data?.message || 'Error al iniciar sesión');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Función para cerrar sesión
    const logout = (): boolean => {
        try {
            // Limpiar estado y localStorage
            clearAuthState();

            toast.success('Sesión cerrada correctamente');

            // Aquí podrías usar un hook de navegación para redirigir al usuario
            // Por ejemplo, si estás usando react-router-dom:
            // navigate('/login');

            return true;
        } catch (error: any) {
            console.error('Error al cerrar sesión:', error);
            toast.error('Error al cerrar sesión');
            return false;
        }
    };

    // Valores que se proporcionarán a través del contexto
    const value: AuthContextType = {
        isAuthenticated,
        user,
        loading,
        token,
        login,
        logout,
        clearAuthState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
