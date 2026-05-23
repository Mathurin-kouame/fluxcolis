import { useQuery } from "@tanstack/react-query"
import { getMe, getUserById, getUsers } from "../api/users.api"

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
}
export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: getMe,
    });
}
export const useUserById = (id: string) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
        enabled: !!id,
    });
}