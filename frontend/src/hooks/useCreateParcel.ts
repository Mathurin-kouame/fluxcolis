import { createParcel } from "@/api/parcels.api"
import type { CreateParcelInput, Parcel } from "@/types"
import { useMutation, useQueryClient, } from "@tanstack/react-query"

export const useCreateParcel = () => {
    const queryClient = useQueryClient();

    return useMutation<Parcel, Error, CreateParcelInput>({
        mutationFn: createParcel,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["parcels"] });
        }
    })
}