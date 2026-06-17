import { CheckCircle2, Clock, Package, TrendingDown, TrendingUp, Truck, XCircle } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number;
    percentage: string;
    type: "total" | "pending" | "inTransit" | "delivered" | "cancelled";

}

export const StatCard = ({ title, value, percentage, type }: StatCardProps) => {
    const config = {
        total: {
            icon: Package,
            bg: "bg-blue-500/15 text-blue-400",
            border: "border-blue-500/20",
            trend: "up",
            trendColor: "text-blue-400",
        },
        pending: {
            icon: Clock,
            bg: "bg-amber-500/15 text-amber-400",
            border: "border-amber-500/20",
            trend: "down",
            trendColor: "text-amber-400",
        },
        inTransit: {
            icon: Truck,
            bg: "bg-purple-500/15 text-purple-400",
            border: "border-purple-500/20",
            trend: "up",
            trendColor: "text-purple-400",
        },
        delivered: {
            icon: CheckCircle2,
            bg: "bg-green-500/15 text-green-400",
            border: "border-green-500/20",
            trend: "up",
            trendColor: "text-green-400",
        },
        cancelled: {
            icon: XCircle, bg: "bg-red-50 text-red-600",
            border: "border-red-500/20",
            trend: "down",
            trendColor: "text-red-400",
        },
    }

    const Icon = config[type].icon;
    const styles = config[type];
    const TrendIcon = styles.trend === "up" ? TrendingUp : TrendingDown;

    return (
        <div className={`bg-white p-6 rounded-3xl border shadow-sm ${config[type].border}`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                    {title}
                </span>

                <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center ${config[type].bg}`}
                >
                    <Icon size={18} />
                </div>
            </div>
            <h2
                className="mt-4 text-xl font-semibold text-slate-900">
                {value.toLocaleString()}
            </h2>

            <div className="mt-4 flex items-center gap-2">
               <TrendIcon size={16} className={styles.trendColor} />
                <span
                   className={`px-2 py-1 rounded-full text-xs font-medium ${styles.bg}`}
                >
                    {percentage}
                </span>
                <span className="text-sm text-slate-400">
                    vs mois dernier
                </span>
            </div>
        </div>
    )
}