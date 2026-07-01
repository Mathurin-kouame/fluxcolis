import { ActionButton } from "@/components/ui/ActionButton";
import { CreateParcelModal } from "@/features/parcels/modal/CreateParcelModal";
import { useParcels } from "@/hooks/useParcels";
import { ChevronLeft, ChevronRight, Eye, Loader2, Pencil, Search, SlidersHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const ParcelPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data: parcels = [], isLoading, isError, error } = useParcels();

  const parcelTabs = [
    { id: "ALL", label: "Tous", count: parcels.length },
    { id: "PENDING", label: "En attente", count: parcels?.filter(p => p.status === "PENDING").length },
    { id: "IN_TRANSIT", label: "En transit", count: parcels?.filter(p => p.status === "IN_TRANSIT").length },
    { id: "DELIVERED", label: "Livrés", count: parcels?.filter(p => p.status === "DELIVERED").length },
    { id: "CANCELLED", label: "Annulés", count: parcels?.filter(p => p.status === "CANCELLED").length },
  ]

  const filteredParcels = parcels?.filter((parcel) => {
    const matchesTab = activeTab === "ALL" || parcel.status === activeTab;
    const matchesSearch =
      parcel.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.destination?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      {/* header */}
      <div className="mb-3">
        <div className="">
          <h1 className="text-xl font-bold text-slate-900">Liste des colis</h1>
          <p className="text-sm text-slate-400 mt-1">Gérez et suivez tous vos colis en un seul endroit</p>
        </div>

        {/* notification */}
        <div className="mt-3 flex items-center justify-center">
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm">
              {successMessage}
            </div>
          )}
        </div>

        {/* actions rapide a droite */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text"
              placeholder="Rechercher un colis..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-sm text-sm text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center border border-slate-200 rounded-sm text-sm text-slate-600 hover:border-slate-50 font-medium transition-colors px-4 py-2 gap-2 cursor-pointer">
            <SlidersHorizontal size={16} />
            Filtes
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center bg-blue-600 text-white rounded-sm text-sm font-semibold hover:bg-blue-700 shadow-sm transition-colors px-4 py-2 gap-2 cursor-pointer">
            Nouveau colis
          </button>
        </div>
      </div>

      {/* MODAL */}
      <CreateParcelModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSuccess={() => {
          setSuccessMessage("Colis crée avec succès !");
          setTimeout(() => setSuccessMessage(null), 3000)
        }}
      />

      <div className="flex items-center border border-slate-100 overflow-x-auto scrollbar-none mb-6 gap-6 p-2">
        {parcelTabs.map((parcelTab) => (
          <button
            key={parcelTab.id}
            onClick={() => setActiveTab(parcelTab.id)}
            className={`pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all cursor-pointer ${activeTab === parcelTab.id
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
          >
            {parcelTab.label}
            <span className={activeTab === parcelTab.id ? "text-blue-600" : "text-slate-500"}>({parcelTab.count})</span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
          <Loader2 className="animate-spin text-slate-600" size={32} />
          <p className="text-sm font-medium">chargement...</p>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 bg-red-50 border border-red-100 rounded-xl text-sm font-medium py-10 p-4">
          Erreur survenue :{error.message}
        </div>
      ) : (
        <div className="max-h-150 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-20 bg-white">
              <tr className="border-b border-slate-100 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-blue-600">N° de suivis</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-500">Destinataire</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-500">Destination</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-500">Statut</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-500">Date</th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-500 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredParcels.length ? (
                filteredParcels.map((parcel) => (
                  <tr key={parcel.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4 text-sm font-medium text-slate-700 whitespace-nowrap">{parcel.trackingNumber}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{parcel.recipientName}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{parcel.destination}</td>

                    <td className="px-4 py-4 whitespace-nowrap">
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
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-500 whitespace-nowrap">
                      {parcel.createdAt ? new Date(parcel.createdAt).toLocaleDateString('fr-FR') : "-"}
                    </td>

                    <td className="text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5 text-slate-400">
                        <ActionButton
                          tooltip="Voir détails"
                          icon={<Eye size={16} />}
                          className="hover:text-slate-600"
                          onClick={() => navigate(`/parcels/${parcel.id}`)} 
                        />

                        <ActionButton
                          tooltip="Modifier"
                          icon={<Pencil size={16} />}
                          className="hover:text-slate-600"
                        />

                        <ActionButton
                          tooltip="Supprimer"
                          icon={<Trash2 size={16} />}
                          className="hover:text-slate-600"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 py-10 text-center text-sm text-slate-400 font-medium">
                    Rien n'est encore faire ...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* --- BARRE DE PAGINATION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-400">
          Afficher de 1 á {filteredParcels.length} sur {filteredParcels.length} résultats
        </span>

        <div className="flex flex-row self-center sm:self-auto gap-1.5">
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50" disabled={isLoading}><ChevronLeft size={16} /></button>
          <button className="flex items-center justify-center rounded-lg font-semibold bg-blue-600 text-white text-xs h-8 w-8">1</button>
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50" disabled={isLoading}><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  )
}