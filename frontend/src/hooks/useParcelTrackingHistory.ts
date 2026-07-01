import { getParcelTrackingHistory } from "@/api/parcels.api"
import type { TrackingHistory } from "@/types"
import { useQuery } from "@tanstack/react-query"

export const useParcelTrackingHistory = (parcelId: string) => {
    return useQuery<TrackingHistory[]>({
        queryKey: ["parcel-tracking-history", parcelId],
        queryFn: () => getParcelTrackingHistory(parcelId),
        enabled: !!parcelId,
    })
}