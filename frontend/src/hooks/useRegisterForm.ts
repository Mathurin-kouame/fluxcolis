import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../features/auth/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRegisterForm = () => {
    return useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
};
