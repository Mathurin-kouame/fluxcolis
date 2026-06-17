import { Button } from "@/components/ui/button"
import { ArrowRight, SquarePlay } from "lucide-react"


export const CtaSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 pb-28">
            <div className="relative overflow-hidden bg-linear-to-r from-blue-100 to bg-indigo-100 rounded-2xl p-10 lg:p-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className=" relative grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold leading-tight mb-6">Prêt à simpplifier la gestion <br />de vos colis ?</h2>
                        <p>Rejoignez des milliers d'entreprises qui optimisent déjà leur logitique avec FluxColis</p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="default"
                               
                            >
                                 <ArrowRight className="w-4 h-4 mr-2" />
                                Commencer gratuitement
                            </Button>
                            <Button
                                variant="secondary"
                            >
                                 <SquarePlay className="w-4 h-4 mr-2" />
                                Demander démo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}