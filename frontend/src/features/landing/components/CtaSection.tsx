import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"


export const CtaSection = () => {

    const navigate = useNavigate()
    return (
        <section className="max-w-7xl mx-auto pb-28">
            <div className="relative overflow-hidden bg-linear-to-r from-blue-100 to bg-indigo-100 rounded-2xl p-6 lg:p-16">
            
                <div className="relative grid lg:grid-cols-2 gap-9 items-center">
                    <div>
                        <h2
                            className="text-2xl font-bold leading-tight mb-3">
                            Prêt à simpplifier la gestion de vos colis ?
                        </h2>
                        <p>
                           Rejoignez les entreprises qui optimisent déjà leur logistique
                           avec FluxColis grâce à une plateforme simple, rapide et sécurisée.

                        </p>    
                    </div>

                    <div className="order-2 lg:order-0">
                        <img
                        src="/img-illustre.png"
                        alt="image illustration"
                        className="rounded-2xl w-full"
                    />
                    </div>
                    
                    <div className="order-3 lg:order-0 lg:absolute lg:left-0 lg:bottom-0 flex justify-center">
                            <button
                                onClick={() => navigate("/inscription")}
                                className="group px-4 py-3 rounded-full text-white  bg-blue-600 hover:bg-blue-700 hover:text-blue-50 hover:border-blue-50 transition-all font-semibold shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 cursor-pointer">
                                Commencer gratuitement
                                <ArrowRight size={18} className="-translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                            </button>
                        </div>
                </div>  
            </div>
        </section>
    )
}