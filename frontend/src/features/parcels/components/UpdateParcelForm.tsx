
import { useUpdateParcel } from "@/hooks/useUpdateParcel";
import type { Parcel, UpdateParcelInput } from "@/types";
import { ParcelForm } from "../modal/ParcelForm";
import { getParcelDefaultValues } from "../utils/getParcelDefaultValues";


type UpdateParcelFormProps = {
    parcel: Parcel;
    onSuccess?: () => void
}
export const UpdateParcelForm = ({ parcel, onSuccess }:UpdateParcelFormProps) => {
    const { mutate, isPending } = useUpdateParcel();

    const handleSubmit = (data: UpdateParcelInput) => {
        mutate(
            {
                id: parcel.id,
                data,
            }, {
                onSuccess: () =>  onSuccess?.(),
                                  
            }
        )
    }

    return (
        <ParcelForm
            submitLabel="Mettre à jour"
            isPending={isPending}
            defaultValues={getParcelDefaultValues(parcel)}
            onSubmit={handleSubmit}
           
        />
    )
}