import type { PublicTrackingResponse } from "@/types";
import { TrackingSummary } from "./TrackingSummary";
import { TrackingProgress } from "./TrackingProgress";

interface Props {
    parcel: PublicTrackingResponse;
}

export const TrackingResult = ({parcel}: Props) => {
    return (
        <div className="mt-8 overflow-hidden rounded-xl border-slate-200 bg-white shadow-lg">
            <div className="bg-slate-50 px-8 py-6">
                <h2 className="text-sm font-semibold">
                   Résultat du suivi
                </h2>
            </div>
            <TrackingSummary parcel={parcel} />
            
            <TrackingProgress
                status={parcel.status}
                history={parcel.history}
            />
        </div>
    )
}