import { useCreateParcel } from "@/hooks/useCreateParcel"
import { useForm } from "react-hook-form";
import { createParcelSchema, type CreateParcelFormData } from "../schemas/createParcelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUsers } from "@/hooks/useUsers";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";




interface CreateParcelFormProps {
    onSuccess?: () => void;
}

export const CreateParcelForm = ({ onSuccess }: CreateParcelFormProps) => {


    const { mutate, isPending } = useCreateParcel();
    const { data: employees } = useUsers();

    const employee = employees?.filter(
        (user) => user.role === "EMPLOYEE"
    )

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<CreateParcelFormData>({
        resolver: zodResolver(createParcelSchema),
    });

    const onSubmit = (data: CreateParcelFormData) => {
        mutate(data, {
            onSuccess: () => {
                reset();
                onSuccess?.();
            }
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" >
                <div>
                    <input
                        {...register("description")}
                        placeholder="Description"
                        className="input"
                    />
                    <p className="text-red-500 text-sm">{errors.description?.message}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input {...register("senderName")}
                        placeholder="Expéditeur"
                        className="input"
                    />

                    <input {...register("recipientName")}
                        placeholder="Destinataire"
                        className="input"
                    />
                    <input {...register("recipientPhone")}
                        placeholder="Téléphone"
                        className="input"
                    />
                    <input {...register("destination")}
                        placeholder="Destination"
                        className="input"
                    />

                    <select {...register("employeeId")} className="input">
                        <option value="Choisir un employé"></option>
                        {employee?.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                                {emp.firstName} {emp.lastName}
                            </option>
                        ))}
                    </select>

                    <input type="number"
                        {...register("weight", { valueAsNumber: true })}
                        placeholder="Poids (kg)"
                        className="input"
                    />
                </div>
                <button
                    disabled={isPending}
                    className="w-full bg-blue-500 text-white py-2.5 rounded-xl font-medium hover:bg-blue-600 transition disabled:opacity-50"
                >
                    {isPending ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Création...
                        </span>
                    ) : (
                        "créer"
                    )}

                </button>
            </form>

        </div>
    )
}