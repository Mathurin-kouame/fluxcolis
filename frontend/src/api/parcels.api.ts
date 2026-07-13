import type { CreateParcelInput, DashboardStats, LatestParcelRow, Parcel, PublicTrackingResponse, TrackingHistory, UpdateParcelInput, UpdateParcelStatusInput } from "../types";
import { api } from "./axios"


export const createParcel = async (data: CreateParcelInput): Promise<Parcel> => {
    const {data: parcel} = await api.post<Parcel>("/parcels", data);

    return parcel;
}

export const getAllParcels = async (): Promise<Parcel[]> => {
    const {data: parcels} = await api.get<Parcel[]>("/parcels");
    console.log("MES COLIS:", parcels);
    return parcels;
};

export const searchParcelByTracking = async (trackingNumber: string): Promise<Parcel> =>{
    const { data: parcel } = await api.get<Parcel>(`/parcels/search/${trackingNumber}`);
    return parcel;
}

export const getLatestParcels = async ():Promise<LatestParcelRow[]> => {
    const { data: parcels } = await api.get<LatestParcelRow[]>("/parcels/dashboard/latest");
    console.log("DENIER_COLIS:", parcels);
    return parcels;
}

export const getParcelById = async (id: string): Promise<Parcel> => {
    const {data: parcel} = await api.get<Parcel>(`/parcels/${id}`);
    
    return parcel;
}

export const updateParcelStatus = async (id: string, statusData:  UpdateParcelStatusInput): Promise<Parcel> => {
    const {data: updatedStatus } = await api.patch<Parcel>(`/parcels/${id}/status`, statusData);

    return updatedStatus;
}

export const reassignParcel = async (id: string, employeeId: string): Promise<Parcel> => {
    const { data: parcel } = await api.patch<Parcel>(`/parcels/${id}/reassign`, { employeeId });

    return parcel;
}

export const getAdminDashboard = async (): Promise<DashboardStats> => {
    const { data: stats } = await api.get<DashboardStats>("/parcels/dashboard/stats");
    
    return stats;
}

export const getEmployeeStats = async (): Promise<DashboardStats> => {
    const { data: stats } = await api.get<DashboardStats>("/parcels/employee/stats");

    return stats
}

export const getPublicTracking = async (trackingNumber: string):Promise<PublicTrackingResponse> => {
    const { data: tracking } = await api.get<PublicTrackingResponse>(`/parcels/public/${trackingNumber}`);
    
    return tracking;
}

export const getParcelTrackingHistory = async (id: string): Promise<TrackingHistory[]> => {
    const { data: history } = await api.get<TrackingHistory[]>(`/parcels/${id}/tracking`);
    
    return history;
}

export const updateParcel = async (id: string, data: UpdateParcelInput): Promise<Parcel> => {
    const payload = {
        description: data.description,
        destination: data.destination,
        recipientName: data.recipientName,
        recipientPhone: data.recipientPhone,
        senderName: data.senderName,
        weight: data.weight,
        userId: data.employeeId,
    }
    const { data: parcel } = await api.patch<Parcel>(`/parcels/${id}`, payload );
    console.log("mise a jour:", parcel)
    return parcel;
}

export const deleteParcel = async (id: string):Promise<{message: string}> => {
    const { data } = await api.delete<{ message: string }>(`/parcels/${id}`);
    
    return data;
}