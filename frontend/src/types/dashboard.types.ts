import type { Parcel } from ".";


export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "ADMIN" | "EMPLOYEE";
}

export type ParcelStatus = "Livré" | "En transit" | "En attente";

export interface ParcelsRow {
    id: string;
    destinataire: string;
    status: ParcelStatus;
    localisation: string;
    date: string;
}

export interface StatistiquesParcels {
    total: number;
    pending: number;
    inTransit: number;
    delivered: number;
    cancelled: number;
    recentParcels?: Parcel[]; // optionnel pour plus tard
}