import { useQuery } from "@tanstack/react-query"
import { getAdminDashboard, getEmployeeStats } from "../api/parcels.api"
import { useMe } from "./useUsers";

export const useDashboard = () => {
    const { data: user } = useMe();
    const isAdmin = user?.role === "ADMIN"
    return useQuery({
        queryKey: ["dashboard-stats", isAdmin],
        queryFn: isAdmin
            ? getAdminDashboard
            : getEmployeeStats,
        enabled: !!user

    });
};