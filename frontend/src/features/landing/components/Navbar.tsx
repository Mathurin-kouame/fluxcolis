import { Box, Menu, X } from "lucide-react"
import { NAV_LINK } from "../constants/navigation"
import { useAuth } from "../../../hooks/useAuth"
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export const Navbar = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState("home");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll("#home, #features, #pricing, #about, #contact");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    };
                });
            },
            {
                threshold: 0.4,
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [])
    return (
        <header className=" sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
            <nav className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-1 cursor-pointer"
                    onClick={() => navigate("/")}>
                    <div className="text-blue-700">
                        <Box size={24} />
                    </div>

                    <h1 className="font-bold text-lg: sm:text-xl">
                        <span className="text-xl font-bold text-blue-700">Flux</span> Colis
                    </h1>
                </div>

                {/* Navigation Desktop */}
                <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
                    {NAV_LINK.map((link) => (
                        <li key={link.label}>
                            {
                                link.type === "route" ? (
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `font-medium transition-colors ${isActive
                                                ? "text-blue-600"
                                                : "text-slate-700 hover:text-blue-600"
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                ) : (
                                    <a href={link.path}
                                        className={`font-medium transition-colors ${activeSection === link.path.replace("#", "")
                                                ? "text-blue-600"
                                                : "text-slate-700 hover:text-blue-600"
                                            }`}
                                    >
                                        {link.label}

                                    </a>
                                )
                            }
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center gap-3 sm:gap-3">

                    {!isAuthenticated && (
                        <div className="hidden lg:flex">
                            <button
                                onClick={() => navigate("/connexion")}
                                className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:text-blue-600 transition-all text-sm font-semibold cursor-pointer">
                                se connecter
                            </button>
                            <button
                                onClick={() => navigate("/inscription")}
                                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-semibold shadow-lg shadow-blue-500/20 cursor-pointer">
                                commencer
                            </button>
                        </div>
                    )}

                    {/* Hamburger Mobile */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Menu Mobile */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen
                    ? "max-h-125 border-t border-slate-200"
                    : "max-h-0"
                }`}
            >
                <div className="bg-white px-6 py-4">
                    <ul className="flex flex-col gap-2">
                        {NAV_LINK.map((link) => (
                            <li key={link.label}>
                                {link.type === "route" ? (
                                    <NavLink
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `block py-2 font-medium ${isActive
                                                ? "text-blue-600"
                                                : "text-slate-700 hover:text-blue-600"
                                            }`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                ) :
                                    (
                                        <a
                                            href={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`block py-2 font-medium transition-colors ${activeSection === link.path.replace("#", "")
                                                    ? "text-blue-600"
                                                    : "text-slate-700 hover:text-blue-600"
                                                }`}
                                        >
                                            {link.label}
                                        </a>
                                    )}

                            </li>
                        ))}
                    </ul>

                    {!isAuthenticated && (
                        <div className="flex flex-col gap-3 mt-6">
                            <button
                                onClick={() => {
                                    navigate("/connexion");
                                    setIsOpen(false);
                                }}
                                className="w-full py-2.5 rounded-xl border border-slate-300 font-semibold"
                            >
                                Se connecter
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/inscription");
                                    setIsOpen(false);
                                }}
                                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold"
                            >
                                Commencer
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}