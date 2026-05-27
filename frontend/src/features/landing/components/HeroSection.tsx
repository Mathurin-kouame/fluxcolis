import { ArrowRight, ChartNoAxesCombined, Clock3, ShieldCheck, SquarePlay } from "lucide-react"

export const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-10 items-center">
      <div className="">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          plateforme logistique moderne
        </div>
        <div className="">
          <h1 className="text-4xl lg:text-4xl font-extrabold leading-tight mb-6">Gérez vos colis <span className="text-blue-700"> <br />Simplement et  <br />Efficacement</span></h1>
          <p className="text-lg text-slate-600 leading-8 max-w-xl mb-8">FluxColis est la solution tout-en-un pour suivre, <br /> organiser et livrer vos colis en toute sérénité. <br />
            Gagnez du temps, améliorez votre productivité.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <button className="px-4 py-3 rounded-2xl text-white border bg-blue-600 hover:bg-blue-700 hover:text-blue-50 hover:border-blue-50 transition-all font-semibold shadow-xl shadow-blue-500/30 flex items-center gap-2 cursor-pointer">
            Commencer gratuitement
            <ArrowRight size={18} />
          </button>
          <button className="px-4 py-3 rounded-2xl border border-slate-300 bg-white hover:bg-slate-100 transition-all font-semibold flex items-center gap-2 cursor-pointer">
            <SquarePlay size={18} />
            voir la démo
          </button>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className=" text-blue-700" />
            <div className="flex flex-col">
              <p className="font-bold text-slate-900">
                Sécurité
              </p>
              <span> Données protègées </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className=" text-blue-700" />
            <div className="flex flex-col">
              <p className="font-bold text-slate-900">
                Rapide
              </p>
              <span>
                Gain de temps
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChartNoAxesCombined className=" text-blue-700" />
            <div className="flex flex-col">
              <p className="font-bold text-slate-900">
                Performant
              </p>
              <span>
                Suivi en temps réel
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="">
          <img src="/../public/Capture d’écran 2026-05-26 à 11.31.05.png" />
        </div>
      </div>
    </section>

  )
}