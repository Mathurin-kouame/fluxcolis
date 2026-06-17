
import {  useMemo, type ReactNode } from "react";
import { useMe } from "../hooks/useUsers";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "./auth-context";



export function AuthProvider({ children }: { children: ReactNode }) {
 
    const { data: user, isLoading } = useMe();

    const loginMutation = useLogin();
    const logout = useLogout();

    const value = useMemo(() => ({
        user: user ?? null,
        isAuthenticated: !!user,
        isLoading,
        login: loginMutation.mutateAsync,
        logout
       
    }),
        [user,  isLoading, loginMutation, logout ]
    );
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )  
    };
