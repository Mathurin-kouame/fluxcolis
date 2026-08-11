
import { useNavigate } from "react-router-dom";
import { StatCard } from "../../../components/ui/StatCard"
import { useDashboard } from "../../../hooks/useDashboard";
import { DateRangePicker } from "../components/DateRangePicker";
import { useLatestParcels } from "@/hooks/useLatestParcels"
import { ParcelStatusChart } from "../components/ParcelStatusChart";



export const OverviewPage = () => {

    const navigate = useNavigate();

    const { data: stats, isLoading, error } = useDashboard();
    
    const { data: lastParcels } = useLatestParcels();

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
    console.log("lastParcels", lastParcels);
    return (
        <div className="space-y-8 p-8">

            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-900">Tableau de bord</h1>
                <DateRangePicker />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <StatCard
                    title="Total Colis"
                    value={stats?.total ?? 0}
                    percentage="0%"
                    type="total"
                />

                <StatCard
                    title="En attente"
                    value={stats?.pending ?? 0}
                    percentage="0%"
                    type="pending"
                />

                <StatCard
                    title="En transit"
                    value={stats?.inTransit ?? 0}
                    percentage="0%"
                    type="inTransit"
                />

                <StatCard
                    title="Livré"
                    value={stats?.delivered ?? 0}
                    percentage="0%"
                    type="delivered"
                />
                <StatCard
                    title="Annulés"
                    value={stats?.cancelled ?? 0}
                    percentage="0%"
                    type="cancelled"
                />
            </div>
            {/* Zone graphique */}
            
            <div className="grid gap-3 xl:grid-cols-2">
                <ParcelStatusChart
                    pending={stats?.pending ?? 0}
                    inTransit={stats?.inTransit ?? 0}
                    delivered={stats?.delivered ?? 0}
                    cancelled={stats?.cancelled ?? 0}
                />

               
            </div>

            {/* Tableau */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                    <h2 className="text-xs font-semibold text-slate-700">Derniers colis</h2>
                    <button onClick={() => navigate("/dashboard/colis")} className="text-sm font-medium text-blue-500 hover:text-blue-700 transition cursor-pointer float-right">Voir tous les colis →</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-500">N° Colis</th>
                                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-500">Destinataire</th>
                                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-500">Statut</th>
                                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-500">Destination</th>
                                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-500">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {lastParcels?.length ? (
                                lastParcels?.map((parcel) => (
                                    <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-3 py-3">
                                            {parcel.trackingNumber}
                                        </td>
                                        <td className="px-3 py-3">
                                            {parcel.recipientName}
                                        </td>
                                        <td className="px-3 py-3 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${parcel.status === 'PENDING'
                                                ? 'bg-amber-500/15 text-amber-500 border-amber-500/20'
                                                : parcel.status === 'IN_TRANSIT'
                                                    ? 'bg-purple-500/15 text-purple-500 border-purple-500/20'
                                                    : parcel.status === 'DELIVERED'
                                                        ? 'bg-green-500/15 text-green-500 border-green-500/20'
                                                        : 'bg-red-500/15 text-red-500 border-red-500/20'
                                                }`}>
                                                {parcel.status === 'PENDING' && 'En attente'}
                                                {parcel.status === 'IN_TRANSIT' && 'En transit'}
                                                {parcel.status === 'DELIVERED' && 'Livré'}
                                                {parcel.status === 'CANCELLED' && 'Annulés'}
                                            </span>

                                        </td>
                                        <td className="px-3 py-3 text-sm text-slate-600">
                                            {parcel.destination}
                                        </td>
                                        <td>
                                            {new Date(parcel.createdAt).toLocaleDateString("fr-FR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })}
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
        </div>
    );
}