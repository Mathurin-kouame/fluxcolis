import { useAuth } from "../../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useState } from "react";



export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   
    const {  user, isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/connexion" replace />;
    }
    return (
        <div className="min-h-screen bg-slate-100 flex">

            {/* Barre latérale à gauche */}
            <Sidebar user={user}
                  isOpen={isSidebarOpen}
                  setIsOpen={setIsSidebarOpen}/>

            {/* Zone droite globale */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Barre du haut */}
                <Topbar
                   user={user}
                />
                

                {/* Contenu de la page active */}
                <main>
                    <div>
                         < Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};