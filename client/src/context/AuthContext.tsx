import React, { createContext, useContext, useState } from "react";

interface User {
    username: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined> (undefined)

export function AuthProvider({children}: {children:React.ReactNode}) {
    const [user,setUser] = useState<User | null>(null)

    //Add functionality for session checking
    function login(userData: User) {
        setUser(userData);
    }

    function logout(){
        setUser(null);
    }

    return (
        <AuthContext value={{user, isAuthenticated: true, login, logout}}>
            {children}
        </AuthContext>
    );
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}