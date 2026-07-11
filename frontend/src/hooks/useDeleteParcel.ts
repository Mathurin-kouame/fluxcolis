import { deleteParcel } from "@/api/parcels.api";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteParcel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteParcel,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["parcels"],
            })
        }
    })
}