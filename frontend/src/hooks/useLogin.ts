import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { LoginDto } from "../types";
import { loginUser } from "../api/auth.api";


export const useLogin = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: LoginDto) => loginUser(data),

        onSuccess :async (data) => {
            localStorage.setItem("token", data.access_token);

            await queryClient.invalidateQueries({ queryKey: ["me"] });
            await queryClient.refetchQueries({ queryKey: ["me"] });
        },
    })
}