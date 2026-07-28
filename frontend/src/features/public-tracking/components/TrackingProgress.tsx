import { CheckCircle, MapPin, Package, Truck } from "lucide-react";

interface TrackingStep {
    status: string;
    createdAt: string;
}

interface Props {
    status: string;
    history: TrackingStep[];
}


export const TrackingProgress = ({ status, history}: Props) => {
    
    const currentStep =
        status === "PENDING"
            ? 1
            : status === "IN_TRANSIT"
                ? 2
                : status === "DELIVERED"
                    ? 4
                    : 0;
    const steps = [
        {
            status: "PENDING",
            label: "Enregistré",
            icon: Package,
        },
        {
            status: "IN_TRANSIT",
            label: "En transit",
            icon: Truck,
        },
        {
            status: "ARRIVED",
            label: "Arrivé",
            icon: MapPin,
        },
        {
            status: "DELIVERED",
            label: "Livré",
            icon: CheckCircle,
        },
    ]
    return (
        <div className="px-6 py-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const Icon = step.icon;

                    const active = index < currentStep;

                    const tracking = history.find(
                        (item) => item.status === step.status
                    );

                    return (
                        <div
                            key={step.label}
                            className="flex flex-col items-center"
                        >
                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-full ${
                                    active
                                    ? "bg-green-100 text-green-600"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                            >
                                 <Icon size={24} />
                            </div>

                            <span className="mt-4 text-sm font-medium">
                                {step.label}     
                            </span>

                            {tracking && (
                                <span className="mt-1 text-xs text-slate-500">
                                    {new Date(tracking.createdAt).toLocaleDateString("fr-FR")}
                                </span>
                            )}
                        </div>
                    )
                })}
           </div>
        </div>
    )
}