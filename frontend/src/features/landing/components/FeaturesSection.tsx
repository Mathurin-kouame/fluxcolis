import { FEATURES } from "../constants/navigation"

export const FeaturesSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 pb-28">
            <div className=" text-center max-w-3xl mx-auto mb-16">
                <span className="text-blue-600 semibold uppercase tracking-widest text-sm">Fonctionnalités</span>
                <h2 className=" text-3xl font-bold mt-4 mb-6">Tout ce qu'il vous faut pour gérer vos colis</h2>
                <p>Des outils puissants pour simpplifier chaque étape de la gestion de vos livraisons</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
                {FEATURES.map((feature) => {
                    const Icon = feature.icon
                    return (
                        <div key={feature.title} className="bg-white border border-slate-200 rounded-3xl p-4 hover:-translate-y-1 ">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                                <Icon className="text-blue-600"/>
                            </div>
                            <h3 className="font-bold mb-2">{feature.title}</h3>
                            <p className=" text-slate-500">{feature.description }</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}