import { useMutation } from "@tanstack/react-query"
import { createUser } from "../api/auth.api"
import type { RegisterDto } from "../types"

export const useRegister = () => {
    return useMutation({
        mutationFn:(data: RegisterDto ) => createUser(data)
    })
}