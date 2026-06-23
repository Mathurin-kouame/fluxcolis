import { getAllParcels } from "@/api/parcels.api"
import type { Parcel } from "@/types"
import { useQuery } from "@tanstack/react-query"

export const useParcels = () => {
    return useQuery<Parcel[]>({
        queryKey: ["Parcels"],
        queryFn: getAllParcels,
    })
}