import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    Users,
    Settings,
    LogOut,
    X
} from 'lucide-react';

import useLogin from '@/hooks/useLogin';

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
    const location = useLocation();
    const { Logout } = useLogin();

    // Definición de los elementos de navegación
    const navItems = [
        { name: 'Dashboard', icon: Home, path: '/dashboard' },
        { name: 'Flujos', icon: Users, path: '/dashboard/flows' },
        { name: 'Configuración', icon: Settings, path: '/dashboard/settings' },
    ];

    // Verificar si un elemento está activo
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <>
            {/* Sidebar para móvil (overlay) */}
            <div
                className={`fixed inset-0 z-40 md:hidden bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div
                className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-[var(--azul-marino)] shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header del sidebar */}
                    <div className="flex items-center justify-between px-4 py-5 border-b border-[var(--azul-oscuro)]">
                        <Link to="/dashboard" className="text-xl font-bold text-[var(--celeste-claro)]">
                            Fluxor
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="md:hidden text-[var(--blanco)] hover:text-[var(--celeste-claro)] focus:outline-none"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navegación */}
                    <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive(item.path)
                                    ? 'bg-[var(--celeste)] text-[var(--azul-oscuro)] font-medium'
                                    : 'text-[var(--blanco)] hover:bg-[var(--azul-oscuro)] hover:text-[var(--celeste-claro)]'
                                    }`}
                            >
                                <item.icon size={20} className="mr-3" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Footer del sidebar */}
                    <div className="p-4 border-t border-[var(--azul-oscuro)]">
                        <button
                            onClick={Logout}
                            className="flex items-center px-4 py-3 text-[var(--blanco)] hover:bg-[var(--azul-oscuro)] hover:text-[var(--celeste-claro)] rounded-lg transition-colors duration-200"
                        >
                            <LogOut size={20} className="mr-3" />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
