import { useCreateParcel } from "@/hooks/useCreateParcel";
import { ParcelForm } from "../modal/ParcelForm";

type CreateParcelFormProps = {
   onSuccess?: () => void
}

export const CreateParcelForm = ({onSuccess}: CreateParcelFormProps) => {
    const { mutate, isPending } = useCreateParcel();
    return (
        <ParcelForm
            submitLabel="Créer"
            isPending={isPending}
            onSubmit={(data) => 
                mutate(data, {
                    onSuccess: () => {
                        onSuccess?.();
                    },
                })
            }
        />
    );
}