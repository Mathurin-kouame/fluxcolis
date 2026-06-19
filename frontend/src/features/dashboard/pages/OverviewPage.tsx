
import { StatCard } from "../../../components/ui/StatCard"
import { useDashboard } from "../../../hooks/useDashboard";
import { DateRangePicker } from "../components/DateRangePicker";



export const OverviewPage = () => {

    const { data, isLoading, error} = useDashboard();
    
    if (isLoading) {
        return (
            <div className="min-h-75 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-red-500">
                Erreur de changement ....
            </div>
        );
    }
    return (
        <div className="space-y-8 p-8">

            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-900">Tableau de bord</h1>
                    <DateRangePicker />    
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <StatCard
                    title="Total Colis"
                    value={data?.total ?? 0}
                    percentage="0%"
                    type="total"
                />

                <StatCard
                    title="En transit"
                    value={data?.inTransit ?? 0}
                    percentage="0"
                    type="inTransit"
                />

                <StatCard
                    title="Livrés"
                    value={data?.delivered ?? 0}
                    percentage="0%"
                    type="delivered"
                />

                <StatCard
                    title="En attente"
                    value={data?.pending ?? 0}
                    percentage="0%"
                    type="pending"
                />
                <StatCard
                    title="Annuler"
                    value={data?.cancelled ?? 0}
                    percentage="0%"
                    type="cancelled"
                />
            </div>
            {/* Zone graphique */}
            
            <div>
                    
            </div>

            {/* Tableau */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h2 className="text-xs font-semibold text-slate-700">Derniers colis</h2>
                    <button className="text-sm font-medium text-blue-500 hover:text-blue-700 transition cursor-pointer float-right">Voir tous les colis →</button> 
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="px-6 py-3">N° Colis</th>
                            <th className="px-6 py-3">Destinataire</th>
                            <th className="px-6 py-3">Statut</th>
                            <th className="px-6 py-3">Localisation</th>
                            <th className="px-6 py-3">Date</th>
                        </tr> 
                    </thead>
                    <tbody className=" divide-y divide-slate-100">
                        {data?.recentParcels?.length ? (
                            data.recentParcels?.map((parcel) => (
                                <tr key={parcel.id}>
                                    <td className="px-6 py-4">{parcel.trackingNumber}</td>
                                    <td className="px-6 py-4">
                                        {parcel.recipientName}
                                    </td>
                                    <td className="px-6 py-4">{parcel.status}</td>
                                    <td className="px-6 py-4">
                                        {parcel.destination}
                                    </td>
                                    <td>
                                        {new Date(parcel.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                            
                        ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-6 py-10 text-center text-sm text-slate-400"
                                    >
                                        Aucun colis récent disponible
                                    </td>
                                </tr>
                       )}
                    </tbody>        
                </table>
            </div>
        </div>
    );
}