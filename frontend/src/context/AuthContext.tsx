
import {  useMemo, type ReactNode } from "react";
import { useMe } from "../hooks/useUsers";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from "../hooks/useLogout";
import { AuthContext } from "./auth-context";



export function AuthProvider({ children }: { children: ReactNode }) {
 
    const { data: user, isLoading, refetch } = useMe();
    console.log("USER AUTH PROVIDER:", user);
    const loginMutation = useLogin();
    const logout = useLogout();

    const value = useMemo(() => ({
        user: user ?? null,
        isAuthenticated: !!user,
        isLoading,
        login: loginMutation.mutateAsync,
        logout,
        refetchUser: refetch,
       
    }),
        [user,  isLoading, loginMutation, logout, refetch ]
    );
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )  
    };
