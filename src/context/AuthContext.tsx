"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserRole = "admin" | "reader" | null;

// Interface pour le contexte
interface AuthContextType {
    userRole: UserRole;
    login: (role: UserRole) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userRole, setUserRole] = useState<UserRole>(null);


    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        if (storedRole !== null) {
            if (storedRole === "admin" || storedRole === "reader") {
                setUserRole(storedRole);
            }
        }
    }, []);


    const login = (role: UserRole) => {
        localStorage.setItem("role", role as string);
        setUserRole(role);
    };


    const logout = () => {
        localStorage.removeItem("role");
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
