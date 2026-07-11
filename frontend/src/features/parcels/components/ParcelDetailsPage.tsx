import { useParcelDetails } from "@/hooks/useParcelDetails";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"
import { TrackingTimeline } from "./TrackingTimeline";
import { useParcelTrackingHistory } from "@/hooks/useParcelTrackingHistory";


export const ParcelDetailsPage = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)
  const { data: parcel, isLoading } = useParcelDetails(id ?? "");
  const {data: history} = useParcelTrackingHistory(id!);
  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (!parcel) {
    return <p>Colis introuvable</p>;
  }

  return (
    <div>
      <button
          onClick={() => navigate("/dashboard/colis")}
          className="flex items-center text-blue-500 hover:text-blue-700 gap-2 cursor-pointer m-6"
        >
          <ArrowLeft size={18} />
          Retour à la liste
        </button>
      <div className="max-w-max bg-white p-6 rounded-xl font-sans text-slate-800 m-auto border  border-slate-200 mt-10">
        <div className="border border-slate-100 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 items-center rounded-xl p-6 mb-6 gap-6">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-900 mb-3 text-sm mt-3">N° de Colis:</h2>
            <span className="text-sm font-semibold text-slate-800 tracking-wide">{parcel.trackingNumber}</span>
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
              {parcel.status === 'CANCELLED' && 'Annulé'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
            <div>
              <p className="font-medium mb-0.5">Date d'expédition</p>
              <span className="font-semibold text-slate-700">
                {parcel.createdAt ? new Date(parcel.createdAt).toLocaleDateString('fr-FR') : "-"}
              </span>
            </div>
            <div>
              <p className="font-medium mb-0.5">Date de livraison</p>
              <p className="font-semibold text-slate-700">{parcel.updatedAt || "Document"}</p>
            </div>

            <div>
              <p className="font-medium mb-0.5">Poids</p>
              <p className="font-semibold text-slate-700">{parcel.weight} kg</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
          <div className="border border-slate-100 rounded-xl  p-5 mb-3">
            <h2 className="font-semibold text-900 mb-3 text-sm">Expéditeur</h2>
            <div className="text-sm text-slate-600 space-y-1">
              <p>{parcel.senderName}</p>
              <span>{parcel.recipientPhone}</span>
            </div>
          </div>

           <div className="border border-slate-100 rounded-xl  p-5 mb-3">
            <h2 className="font-semibold text-900 mb-3 text-sm">Destinataire</h2>
            <div className="text-sm text-slate-600 space-y-1">
              <p>{parcel.recipientName}</p>
               <p>{parcel.destination}</p>
            </div>
          </div>
        </div>

        {/* Section Chronologie de Suivi */}
        <div>
          <TrackingTimeline
             history={history ?? []}
          />
        </div>
      </div>
    </div>
  )
}