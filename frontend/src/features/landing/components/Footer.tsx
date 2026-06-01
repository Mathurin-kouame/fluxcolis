import { Box } from "lucide-react"

export const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300 md:flex-row flex-wrap">
            <div className="max-w-7xl mx-auto px-6 py-6 grid lg:grid-cols-5 gap-12">
                <div className="flex flex-col-3  gap-50">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="text-blue-700">
                                <Box />
                            </div>
                            <h1 className="font-bold"><span className="text-xl font-bold text-blue-700">Flux</span>Colis</h1>

                        </div>

                        <p className="text-slate-400 leading-8 max-w-md">La solution moderne pour le suivi de vos colis en toute simplicité</p>
                        <div className="flex items-center gap-3 mt-4">
                            <a href="#" className="text-white hover:text-blue-200 transition-all duration-300 border border-white/10 bg-slate-900/80 backdrop-blur-md hover:border-blue-400/40 p-2.5 rounded-4xl shadow-xl shadow-black/30" aria-label="Facebook">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:text-blue-200 transition-all duration-300 border border-white/10 bg-slate-900/80 backdrop-blur-md hover:border-blue-400/40 p-2.5 rounded-4xl shadow-xl shadow-black/30" aria-label="Twitter / X">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:text-blue-200 transition-all duration-300 border border-white/10 bg-slate-900/80 backdrop-blur-md hover:border-blue-400/40 p-2.5 rounded-4xl shadow-xl shadow-black/30" aria-label="Email">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:text-blue-200 transition-all duration-300 border border-white/10 bg-slate-900/80 backdrop-blur-md hover:border-blue-400/40 p-2.5 rounded-4xl shadow-xl shadow-black/30" aria-label="WhatsApp">
                                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08c0 4.97-4.03 9-9 9a8.94 8.94 0 0 1-4.32-1.1L3 21l2.1-5.46A8.94 8.94 0 0 1 4 11.08c0-4.97 4.03-9 9-9s9 4.03 9 9Z" />
                                    <path d="M16.5 14.5c-.3-.15-1.74-.86-2-1-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07a8.26 8.26 0 0 1-2.42-1.5 9.12 9.12 0 0 1-1.67-2.08c-.18-.3-.02-.46.13-.6l.4-.4c.15-.17.2-.3.3-.47.1-.18.05-.33-.02-.48-.08-.15-.67-1.62-.92-2.22-.25-.6-.5-.5-.68-.5a15.4 15.4 0 0 0-1 .02c-.34 0-.9.13-1.37.64C4.33 7.85 3 9.13 3 11.7c0 2.57 1.87 5.05 2.13 5.4 2.16 2.94 4.81 4.4 7.63 4.4 2.1 0 3.86-.68 5.14-1.8.84-.73 1.34-1.8 1.34-2.95 0-.1-.02-.2-.03-.25-.07-.3-.43-.45-.72-.6Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="">
                        <h3 className="text-white font-bold mb-4">Produit</h3>
                        <ul className="text-slate-400 space-y-2">
                            <li>Fonctionnalité</li>
                            <li>Tarifs</li>
                            <li>Sécurité</li>
                            <li>Intégrations</li>
                        </ul>
                    </div>
                    <div className="leading-8 max-w-md">
                        <h3 className="text-white font-bold mb-4">Entreprise</h3>
                        <ul className="text-slate-400">
                            <li>A propos</li>
                            <li>Contact</li>
                            <li>Carrière</li>
                            <li>Mention légales </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-base tracking-wide mb-2">Newsletter</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">recevez nos dernières actualités et conseils logitiques</p>
                        <div className="relative flex items-center">
                            <form action="" className="flex justify-center bg-white rounded-full mt-4">
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="bg-transparent outline-none  text-slate-700 text-sm px-3 py-2 placeholder:text-slate-400 rounded-full"
                                />
                                <button
                                    type="submit"
                                    aria-label="write newsletter"
                                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white  p-3 rounded-r-full">
                                    <a href="#" className="">
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" />
                                        </svg>
                                    </a>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto border-t  border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
                    <p>© 2026 Fluxcolis tous droits reservés .</p>
                    <div className="flex items-center gap-6">
                        <span>Confidentialité</span>
                        <span>Condition d'utilisation</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}