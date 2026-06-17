import { Menu } from "lucide-react";

interface TopbarProps {
    setIsSidebarOpen: (open: boolean) => void;
    isSidebarOpen: boolean;
}
export const Topbar = ({setIsSidebarOpen, isSidebarOpen}:TopbarProps) => {
    return (
        <header className="h-20 bg-transparent flex items-center justify-between px-8 shrink-0">
            {/* boutton d'ouverture rapide si la sidebar est fermée */}

            <div className="flex items-center gap-4">
                {!isSidebarOpen && (
                    <button onClick={() => setIsSidebarOpen(true)}
                      className="p-2 rounded-xl bg-white border  border-slate-200 shadow-2xs text-slate-500 hover:text-slate-700 cursor-pointer"
                    >
                        <Menu size={18}/>
                    </button>
               )} 
           </div>
        
            {/* boutton Action Déconnexion de sécuritée secret à droit */}
            <div className="flex items-center gap-4">
                <button>
                  <span className="hidden sm:inline">Déconnexion</span>
               </button>
            </div>
        </header>
    )
}