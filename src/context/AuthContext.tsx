import React, {createContext, FC, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface AuthContext {
    userId: string | null;
    isLogged: boolean,
    login: (token: string, userRole: string) => void;
    role: string | null;
    logout: () => void;
    decodeToken: () => void;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLogged, setIsLogged] = useState<boolean>(!!localStorage.getItem("token"));
    const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        if(isLogged){
            decodeToken();
        }
    }, [isLogged]);

    const login = (token: string, userRole: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        setIsLogged(true);
        setRole(role);
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        setIsLogged(false);
        setRole(null);
    }

    const decodeToken = () => {
        if(isLogged)
    }

    return (
        <AuthContext.Provider value={{isLogged, login, logout, role}}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook personnalisé
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext is undefined");
    }

    return context;
};




