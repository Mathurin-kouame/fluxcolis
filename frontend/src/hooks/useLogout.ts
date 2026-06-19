import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const queryClient = useQueryClient();
     const navigate = useNavigate();

    return () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");

        queryClient.removeQueries({ queryKey: ["me"] });
        queryClient.clear()

       navigate("/connexion")
    }
}