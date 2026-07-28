import type { ParcelStatus } from "@/types";

interface Props {
    status: ParcelStatus;
}

export const StatusBadge = ({status}: Props) => {
    const config = {
        PENDING: {
            label: "En attente",
            className: "bg-amber-100 text-amber-700"
        },

        IN_TRANSIT: {
            label: "En transit",
            className: "bg-blue-100 text-blue-700"
        },

        DELIVERED: {
            label: "Livré",
            className: "bg-green-100 text-green-700"
        },

        CANCELLED: {
            label: "Annulé",
            className: "bg-red-100 text-red-700"
        },
    }

    return (
        <span className={`rounded-full px-4 py-2 text-sm font-medium ${config[status].className}`}>
            {config[status].label}
        </span>
    )
}