import { getPublicTracking } from "@/api/parcels.api"
import { useQuery } from "@tanstack/react-query"

export const usePublicTracking = (trackingNumber: string) => {
    return useQuery({
        queryKey: ["public-tracking", trackingNumber],
        queryFn: () => getPublicTracking(trackingNumber),
        enabled: !!trackingNumber,
        retry: false,
   })
}