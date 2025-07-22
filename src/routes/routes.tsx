import { createBrowserRouter, Outlet } from "react-router-dom";

// Componente de proteccion de rutas
import ProtectedRoute from "@/auth/ProtectedRoute";

// Componente para desplazar al inicio en cada cambio de ruta
import ScrollTop from "@/components/ui/ScrollToTop"

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout";

// Rutas de la aplicacion
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Login from "@/auth/Login";
import Prices from "@/pages/Prices";
import Contact from "@/pages/Contact";

// Rutas dentro del dashboard
import Flows from "@/pages/Flows";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import { Navigate } from "react-router-dom";

// Layout principal que incluye ScrollToTop
// Cumple la funcionalidad de scrolear automaticamente hacia arriba cuando viajas a una nueva pagina
const AppLayout = () => {
    return (
        <>
            <ScrollTop />
            <Outlet />
        </>
    );
};

// Crear el router
const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "prices",
                element: <Prices />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Dashboard />
                    },
                    {
                        path: "flows",
                        element: <Flows />
                    },
                    {
                        path: "history",
                        element: <History />
                    },
                    {
                        path: "settings",
                        element: <Settings />
                    }
                ]
            },
            {
                path: "*",
                element: <Navigate to="/" />
            }
        ]
    }
]);

export default router;