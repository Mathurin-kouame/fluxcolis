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
    
    const initials = user.lastName?.[0]?.toUpperCase() || "?";
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
        <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between shadow-sm">

            {/* boutton Action Déconnexion de sécuritée secret à droit */}
            <div className="ml-auto flex items-center gap-4">
                {/* Profile dropdown */}
                <div
                    className="relative"
                    ref={dropdownRef}>

                    <button
                       onClick={() => setOpenProfile((prev) => !prev)}
                        className="flex items-center  rounded-full  hover:bg-blue-100  transition-all duration-200"
                    >
                        <div 
                            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-sm font-bold">
                            {initials}
                        </div>

                        <div className="hidden sm:block text-left leading-tight">
                            {/* <p className="text-xs font-bold text-slate-900 truncate">
                                {user.firstName}
                            </p> */}
                            <p className="text-xs text-slate-400 truncate">
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
                                   {user.lastName} {user.firstName} 
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                            <div className="">
                                <button
                                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg  transition-colors">
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