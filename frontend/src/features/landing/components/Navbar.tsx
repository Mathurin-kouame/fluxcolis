import { Box } from "lucide-react"
import { NAV_LINK } from "../constants/navigation"
import { useAuth } from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const {  isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <header className=" sticky top-0 z-50 border-b border-slate-200 bg-white/98 backdrop-blur-xl">
            <nav className="max-w-7xl mx-auto px-6 py-4  flex items-center justify-between">

                <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/")}>
                    <div className="text-blue-700">
                        <Box />
                    </div>
                    <h1 className="font-bold"><span className="text-xl font-bold text-blue-700">Flux</span>Colis</h1>
                </div>

                <ul className=" hidden lg:flex items-center gap-8">
                    {NAV_LINK.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.label} className="text-sm font-sm medium  hover:text-blue-700 transition-colors">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className=" flex items-center gap-3">

                    {!isAuthenticated && (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className=" hidden md:flex px-4 py-2.5 rounded-xl border border-b-slate-300 bg-white hover:text-blue-600 transition-all text-sm font-semibold cursor-pointer">
                                se connecter
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-semibold shadow-lg shadow-blue-500/20 cursor-pointer">
                                commencer
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}