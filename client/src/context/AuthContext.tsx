import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    full_name: string;
    bio: string | null;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: {identifier: string; password: string}) => Promise<void>;
    signup: (credentials:{
        email: string;
        username: string;
        full_name: string;
        password: string;
    }) => Promise<void>;
    logout: () => void;
    loading: boolean;

    subscriptions: Set<number>;
    subscriptionMap: Map<number, number>; // subreddit_id -> subscription_id
    refreshSubscriptions: () => Promise<void>;
    subscribeTo: (subreddit_id: number) => Promise<void>;
    unsubscribeFrom: (subreddit_id: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [subscriptions, setSubscriptions] = useState<Set<number>>(new Set());
    const [subscriptionMap, setSubscriptionMap] = useState<Map<number, number>>(new Map());

    useEffect(() => {
        async function init() {
            try {
                const res = await fetch(`http://127.0.0.1:5000/user/me`, { credentials: "include" });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                    await refreshSubscriptions();
                }
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    async function refreshSubscriptions() {
        try {
            const res = await fetch(`http://127.0.0.1:5000/subscription/my_subreddits`, { credentials: "include" });
            if (res.ok) {
                const data: { subreddit_id: number; subscription_id: number }[] = await res.json();
                const newSet = new Set<number>();
                const newMap = new Map<number, number>();
                data.forEach((sub: any) => {
                    newSet.add(sub.subreddit_id);
                    newMap.set(sub.subreddit_id, sub.subscription_id);
                });
                setSubscriptions(newSet);
                setSubscriptionMap(newMap);
            }
        } catch (err) {
            console.error("Subscription refresh error:", err);
        }
    }

    async function subscribeTo(subreddit_id: number) {
        try {
            const res = await fetch(`http://127.0.0.1:5000/subscription/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ subreddit_id }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.error(data.message);
                return;
            }

            // Update context state
            setSubscriptions((prev) => new Set(prev).add(subreddit_id));
            setSubscriptionMap((prev) => new Map(prev).set(subreddit_id, data.id));
        } catch (err) {
            console.error("Subscribe error:", err);
        }
    }

    async function unsubscribeFrom(subreddit_id: number) {
        const subscription_id = subscriptionMap.get(subreddit_id);
        if (!subscription_id) return;

        try {
            const res = await fetch(`http://127.0.0.1:5000/subscription/delete/${subscription_id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (res.ok) {
                setSubscriptions((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(subreddit_id);
                    return newSet;
                });
                setSubscriptionMap((prev) => {
                    const newMap = new Map(prev);
                    newMap.delete(subreddit_id);
                    return newMap;
                });
            }
        } catch (err) {
            console.error("Unsubscribe error:", err);
        }
    }

    async function login(credentials: { identifier: string; password: string }) {
        try {
            const res = await fetch(`http://127.0.0.1:5000/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(credentials),
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
                await refreshSubscriptions();
            } else {
                const err = await res.json();
                alert(err.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    }

    async function logout() {
        try {
            const res = await fetch(`http://127.0.0.1:5000/user/logout`, {
                method: "DELETE",
                credentials: "include",
            });
            if (res.ok) {
                setUser(null);
                setSubscriptions(new Set());
                setSubscriptionMap(new Map());
            } else {
                console.error("Logout failed", await res.text());
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    async function signup(credentials:{
        email: string;
        username: string;
        full_name: string;
        password: string;
    }) {
        try {
            const res = await fetch(`http://127.0.0.1:5000/user/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(credentials)
            });

            const data = await res.json()

            if (!res.ok) {
                alert(data.message || "Signup failed")
                return;
            }

            setUser(data)
            await refreshSubscriptions();
        } catch(err) {
            console.error("Signup error:", err)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                signup,
                loading,
                subscriptions,
                subscriptionMap,
                refreshSubscriptions,
                subscribeTo,
                unsubscribeFrom,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
