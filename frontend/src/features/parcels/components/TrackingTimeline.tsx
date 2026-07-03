import type { TrackingHistory } from "@/types";

interface Props {
     history: TrackingHistory[];
 }

export const TrackingTimeline = ({ history }: Props) => {
    
    if (!history || history.length === 0) {
        return (
            <div className="text-sm text-slate-400 italic p-4 border border-dashed border-slate-200 rounded-lg text-center">
                Aucun historique de suivi enregistré pour ce colis.
            </div>
        );
    }

    
    const sortedHistory = [...history].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
    console.log(history)
    return (
        <div className="w-full">
            <h2 className="font-semibold text-slate-900  text-sm mb-6">Suivi du colis</h2>
            <div className="relative border-green-500 border-l-2 pl-6 ml-2 space-y-6 min-h-20">
                {sortedHistory.map((item) => (
                    <div
                        key={item.id}
                        className="relative grid grid-cols-1 sm:grid-cols-3 text-sm items-start gap-2"
                    >
                        <span className="absolute -left-8 top-0.5 w-4 h-4 items-center justify-center rounded-full bg-white border-4 border-green-500" />
                        
                        <div>
                            <span className="font-semibold text-slate-900">
                                {item.status === 'PENDING' && 'Colis enregistré'}
                                {item.status === 'IN_TRANSIT' && 'En transit'}
                                {item.status === 'DELIVERED' && 'Livré'}
                                {item.status === 'CANCELLED' && 'Annulé'}
                            </span>
                            {item.note && (
                                <p className="text-xs font-normal text-slate-400 mt-0.5">{item.note}</p>
                            )}
                        </div>

                        {/* Colonne 2 : Date et heure formatées */}
                        <div>
                            {new Date(item.createdAt).toLocaleDateString('fr-FR', { 
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            })}
                        </div>

                        {/* Colonne 3 : Localisation */}
                        <div className="text-slate-500 sm:text-right font-medium">
                            {item.location}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}