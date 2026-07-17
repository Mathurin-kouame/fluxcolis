
import { updateParcelStatus } from "@/api/parcels.api";
import type { ParcelStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useUpdateParcelStatus = () => {
    const queryClient = useQueryClient();

   return useMutation({
  mutationFn: ({
    id,
    status,
  }: {
    id: string;
    status: ParcelStatus;
      }) => updateParcelStatus(id, { status }),
       
       onSuccess: () => {
           queryClient.invalidateQueries({
               queryKey: ["parcels"],
           });

           queryClient.invalidateQueries({
               queryKey: ["dashboard"],
           });

           queryClient.invalidateQueries({
               queryKey: ["latestParcels"],
           });
       }
   });
       
}