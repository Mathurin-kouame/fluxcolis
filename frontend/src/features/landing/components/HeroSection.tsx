import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"


export const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-0 right-0 h-125 w-125 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Contenu */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
              plateforme logistique moderne
            </div>

            {/* Titre */}
            <h1 className="text-4xl  sm:text-xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              La plateforme intelligente pour

              <span className="block text-blue-700">
                Gérer et suivre vos colis
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
              Centralisez le suivi, la gestion et la livraison de vos colis sur
              une plateforme unique. Automatisez vos opérations, améliorez la
              visibilité et gagnez du temps grâce à une solution moderne,
              sécurisée et performante.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row  justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/inscription")}
                className="group px-4 py-3 rounded-full text-white  bg-blue-600 hover:bg-blue-700 hover:text-blue-50 hover:border-blue-50 transition-all font-semibold shadow-xl shadow-blue-500/20 flex items-center justify-center gap-8 cursor-pointer">
                Commencer gratuitement
                <ArrowRight size={18} className="-translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"/>
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <span>✓ Suivi en temps réel</span>
              <span>✓ Données sécurisées</span>
              <span>✓ Disponible 24h/24</span>
            </div>
          </div>

           <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-2xl">
                
                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
                
              <img
                src="/Capture d’écran 2026-05-26 à 11.31.05.png"
                alt="Dashboard FluxColi"
                className="relative w-full h-auto rounded-3xl object-cover"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>

  )
}