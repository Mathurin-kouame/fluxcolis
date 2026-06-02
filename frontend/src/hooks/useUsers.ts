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
        enabled: !!localStorage.getItem("token"),
         staleTime: 1000 * 60 * 5,
    });
}
export const useUserById = (id: string) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserById(id),
        enabled: !!id,
    });
}