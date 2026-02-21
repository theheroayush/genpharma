import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";

export type UserRole = "patient" | "pharmacist" | "admin";

export interface Profile {
    id: string;
    full_name: string;
    email: string;
    role: UserRole;
    approved: boolean;
    phone: string;
    created_at: string;
}

interface AuthState {
    user: User | null;
    profile: Profile | null;
    session: Session | null;
    loading: boolean;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ error?: string }>;
    register: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error?: string }>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null, profile: null, session: null, loading: true,
    });

    const fetchProfile = useCallback(async (userId: string) => {
        const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
        return data as Profile | null;
    }, []);

    const refreshProfile = useCallback(async () => {
        if (!state.user) return;
        const profile = await fetchProfile(state.user.id);
        setState((s) => ({ ...s, profile }));
    }, [state.user, fetchProfile]);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session?.user) {
                const profile = await fetchProfile(session.user.id);
                setState({ user: session.user, session, profile, loading: false });
            } else {
                setState({ user: null, session: null, profile: null, loading: false });
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                const profile = await fetchProfile(session.user.id);
                setState({ user: session.user, session, profile, loading: false });
            } else {
                setState({ user: null, session: null, profile: null, loading: false });
            }
        });

        return () => subscription.unsubscribe();
    }, [fetchProfile]);

    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        // Log audit
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from("audit_logs").insert({
                user_id: user.id, user_email: email, action: "login", details: "User logged in",
            });
        }
        return {};
    };

    const register = async (email: string, password: string, fullName: string, role: UserRole) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName, role } },
        });
        if (error) return { error: error.message };
        return {};
    };

    const logout = async () => {
        if (state.user) {
            await supabase.from("audit_logs").insert({
                user_id: state.user.id, user_email: state.profile?.email, action: "logout", details: "User logged out",
            });
        }
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
