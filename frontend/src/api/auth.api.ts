import type { LoginDto, LoginResponse, RegisterDto, User } from "../types"
import { api } from "./axios"

export const createUser = async (data: RegisterDto ): Promise<User> => {
    const { data: user } = await api.post<User>("auth/register", data);
    return user;
}

export const loginUser = async (data: LoginDto): Promise<LoginResponse> => {
    const { data: response } = await api.post<LoginResponse>("auth/login", data);

    return response;
}