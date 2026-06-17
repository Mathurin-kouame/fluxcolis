import { useQuery } from "@tanstack/react-query"
import { type DashboardStats } from "../types"
import { getAdminDashboard } from "../api/parcels.api"

export const useDashboard = () => {
    return useQuery<DashboardStats>({
        queryKey: ["dashboard-stats"],
        queryFn: getAdminDashboard,
    });
};