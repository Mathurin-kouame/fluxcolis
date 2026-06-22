import { getLatestParcels } from "@/api/parcels.api"
import type { LatestParcelRow } from "@/types"
import { useQuery } from "@tanstack/react-query"

export const useLatestParcels = () => {
    return useQuery<LatestParcelRow[]>(
        {
            queryKey: ["lastParcels"],
            queryFn: getLatestParcels,
        }
    )
}