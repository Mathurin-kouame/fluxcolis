
import type { User } from "../types"
import { api } from "./axios"

export const getUsers = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users");

    return data;
}

export const getMe = async (): Promise<User> => {
    const { data } = await api.get<User>("/users/me");
    console.log("API ME RESPONSE:", data);
    return data;
}
export const getUserById = async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);

    return data;
}

