import { useForm } from "react-hook-form"
import { loginSchema, type LoginFormData } from "../features/auth/schemas/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"

export const useLoginForm = () => {
    return useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });
};