import React, {createContext, FC, useContext, useState} from "react";

interface AuthProps {
    isLogged: boolean,
    login: () => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const login = () => {
        setIsLogged(true);
    }

    const logout = () => {
        setIsLogged(false);
    }

    return (
        <AuthContext.Provider value={{isLogged, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
};




