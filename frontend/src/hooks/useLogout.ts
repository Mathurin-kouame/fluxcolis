import { useQueryClient } from "@tanstack/react-query"

export const useLogout = () => {
    const queryClient = useQueryClient();

    return () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");

        queryClient.removeQueries();
        queryClient.clear()

        window.location.href= "/"
    }
}