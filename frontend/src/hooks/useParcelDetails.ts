import { getParcelById } from "@/api/parcels.api"
import { useQuery } from "@tanstack/react-query"

export const useParcelDetails = (id: string | null)  =>{
    return useQuery({
        queryKey: ['parcel', id],
        queryFn: () => getParcelById(id!),
        enabled: !!id,
    })
}