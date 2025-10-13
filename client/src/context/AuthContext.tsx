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

    //Add functionality for session checking
    // function login(userData: User) {
    //     setUser(userData);
    // }

    useEffect(() => {
        console.log(user)

    },[user])
    
    async function login(credentials: {identifier: string; password: string}) {
        try {
            const response = await fetch(`http://127.0.0.1:5000//user/login`, {
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


    function logout(){
        setUser(null);
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