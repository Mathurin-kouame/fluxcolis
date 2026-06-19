import { useLogout } from "@/hooks/useLogout";
import { LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TopbarProps {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        role:  "ADMIN" | "EMPLOYEE";
    }
}

export const Topbar = ({ user }: TopbarProps) => {
    
    const initials = user.email?.[0]?.toUpperCase() || "?";
    const logout = useLogout();

    const [openProfile, setOpenProfile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    console.log("USER TOPBAR:", user);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])
    
    return (
        <header className="h-15 bg-white flex items-center justify-end px-8 shrink-0">

            {/* boutton Action Déconnexion de sécuritée secret à droit */}
            <div className="flex items-center gap-4 relative">
                {/* Profile dropdown */}
                <div className="relative" ref={dropdownRef}>

                    <button
                       onClick={() => setOpenProfile((prev) => !prev)}
                        className="flex items-center  p-2 rounded-full  hover:bg-blue-100  transition"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-sm font-bold">
                            {initials}
                        </div>

                        <div className="text-left leading-tight">
                            <p className="text-xs font-bold text-slate-900 truncate">
                                {user.firstName}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                                {user.role}
                            </p>
                        </div>
                    </button>

                    {/* Dropdown */}
                    {openProfile && (
                        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">

                            <div className="p-3 border-b">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center m-auto mb-5 p-6">
                                    {initials}
                                </div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                            <div className="p-1">
                                <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-slate-50 rounded-lg">
                                    <User size={16} />
                                    Mon Profile
                                </button>
                                <button
                                     onClick={logout}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-slate-50 rounded-lg">
                                    <LogOut size={16} />
                                    Déconnexion
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}