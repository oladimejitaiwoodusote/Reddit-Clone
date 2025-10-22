import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    username: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    // login: (userData: User) => void;
    login: (credentials: {identifier: string; password: string}) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined> (undefined)

export function AuthProvider({children}: {children:React.ReactNode}) {
    const [user,setUser] = useState<User | null>(null)

    useEffect(() => {
        async function checkSession() {
            try {
                const res = await fetch(`http://127.0.0.1:5000/user/me`, {
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch(err) {
                console.error("Session check failed", err);
            }
        }
        checkSession();
    },[])
    
    async function login(credentials: {identifier: string; password: string}) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/user/login`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                const err = await response.json();
                alert(err.message || "Login failed");
            }           
        }   catch (error) {
            console.error("Login error:", error);
        }
    }

    async function logout() {
        try {
            const response = await fetch(`http://127.0.0.1:5000/user/logout`, {
                method: "DELETE",
                credentials: "include"
            });

            if (response.ok) {
                setUser(null);
            } else {
                console.error("Logout failed", await response.text())
            }
        } catch(error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <AuthContext value={{user, isAuthenticated: user? true: false, login, logout}}>
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