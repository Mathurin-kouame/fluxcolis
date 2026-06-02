import { createContext } from "react";
import type { useLogin } from "../hooks/useLogin";
import type { User } from "../types";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: ReturnType<typeof useLogin>["mutateAsync"];
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);