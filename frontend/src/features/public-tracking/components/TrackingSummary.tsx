import type { PublicTrackingResponse } from "@/types";
import { StatusBadge } from "./StatusBadge";

interface Props {
    parcel: PublicTrackingResponse;
}

export const TrackingSummary = ({ parcel }: Props) => {
    return (
        <div className="grid gap-8 px-8 py-10 md:grid-cols-4 sm:grid-cols-1">
            <div>
                <p className="text-sm text-slate-500">
                    N° de suivi
                </p>
                <h3 className="mt-2 text-sm font-semibold">
                    {parcel.trackingNumber}
                </h3>
            </div>

            <div>
                <p className="text-sm text-slate-500">
                  status
                </p>
                <div className="mt-2">
                    <StatusBadge
                        status={parcel.status}
                    />
                </div>
            </div>
            <div>
                <p className="text-sm text-slate-500">
                    Destination
                </p>
                <h3 className="mt-2 text-sm font-semibold">
                    {parcel.destination}
                </h3>
            </div>
            <div>
                <p className="text-sm text-slate-500">
                    Crée le 
                </p>
                <h3 className="mt-2 text-sm font-semibold">
                    {new Date(parcel.createdAt).toLocaleDateString("fr-FR")}
                </h3>
            </div>
        </div>
    )
}