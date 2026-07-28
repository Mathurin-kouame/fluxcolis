import { BarChart3, LayoutDashboard, MessageSquare, Package, PanelLeft, Send, Settings, Users } from "lucide-react"
import Logo from "../../../components/ui/Logo"
import { NavLink } from "react-router-dom";
import type { User } from "@/types";



interface SidebarProps {
     user: User;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen}: SidebarProps) => {

    const menuItems = [
        {label: "Tableau de bord", path: "/dashboard", icon: LayoutDashboard},
        {label: "Colis", path: "/dashboard/colis", icon: Package},
        {label: "Expéditions", path: "/dashboard/expeditions", icon: Send},
        {label: "Destinataires", path: "/dashboard/destinataires", icon: Users},
        {label: "Réclamations", path: "/dashboard/reclamations", icon: MessageSquare},
        {label: "Rapports", path: "/dashboard/rapports", icon: BarChart3},
        {label: "Paramètres", path: "/dashboard/settings", icon: Settings},
    ]
    return (
        <aside className={`bg-white border-r border-slate-100 h-screen flex-col transition-all duration-300 shrink-0 ${isOpen ? "w-64" : "w-20"}`}>

            <div className="h-20 flex items-center justify-between p-5 border-b border-slate-50">
                <div className={`flex items-center gap-2.5 transition-opacity ${!isOpen && "opacity-0 w-0 overflow-hidden"}`}>
                    <span className="text-base text-slate-900 tracking-tight">
                         <Logo />
                   </span>
                </div>
                <button onClick={()=> setIsOpen(!isOpen)} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 cursor-pointer">
                    <PanelLeft size={18}/>
                </button>
            </div>
            
            {/* Liste de nanigation */}
            <nav>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold  text-xs xl:text-sm
                        ${isActive ? "bg-blue-50 text-blue-600" :"text-slate-500 hover:bg-slate-50 hover:text-slate-600"}
                        `} >
                            <Icon size={18} className="shrink-0"/>
                            <span className={`transition-all duration-200 ${!isOpen && "opacity-0 w-0 overflow-hidden"}`}>
                                {item.label}
                            </span>
                        </NavLink>
                    )
                })}
            </nav>
        </aside>
    )
}