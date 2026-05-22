import type { CreateParcelInput } from "../types";
import { api } from "./axios"

export const getParcels = async () => {
    const response = await api.get("/parcels");

    return response;
};

export const createParcel = async (data: CreateParcelInput) => {
    const response = await api.post("/parcels", data);

    return response.data;
}

export const getParcelById = async (id: string) => {
    const response = await api.get(`/parcels/${id}`);
    
    return response.data;
}