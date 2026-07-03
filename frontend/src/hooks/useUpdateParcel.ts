import { updateParcel } from "@/api/parcels.api"
import type { UpdateParcelInput } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"


type UpdateParcelMutationInput = {
    id: string,
    data: UpdateParcelInput,
}
export const useUpdateParcel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: UpdateParcelMutationInput) => updateParcel(id, data),

        onSuccess: (updateParcel) => {
             // Rafraîchir la liste des colis
            queryClient.invalidateQueries({
                queryKey: ["parcels"],
            });

            // Rafraîchir les détails du colis modifié
            queryClient.invalidateQueries({
                queryKey:["parcel", updateParcel.id],
            })
        }
    })
}