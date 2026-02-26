import { useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { UserRole, Profile } from "@/types";
import { AuthContext } from "./AuthContextContext";

// Demo profile for when Supabase is not configured
const demoProfile: Profile = {
    id: "demo-user",
    full_name: "Rajesh Kumar",
    email: "rajesh@example.com",
    role: "patient",
    approved: true,
    phone: "+91 98765 43210",
    created_at: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<{
        user: User | null;
        profile: Profile | null;
        session: Session | null;
        loading: boolean;
    }>({
        user: null,
        profile: null,
        session: null,
        loading: isSupabaseConfigured,
    });

    // Set demo profile when Supabase is not configured
    useEffect(() => {
        if (!isSupabaseConfigured) {
            setState({
                user: { id: "demo-user" } as User,
                profile: demoProfile,
                session: null,
                loading: false,
            });
        }
    }, []);

    const fetchProfile = useCallback(async (userId: string) => {
        if (!isSupabaseConfigured) return demoProfile;
        const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
        return data as Profile | null;
    }, []);

    const refreshProfile = useCallback(async () => {
        if (!isSupabaseConfigured || !state.user) return;
        const profile = await fetchProfile(state.user.id);
        setState((s) => ({ ...s, profile }));
    }, [state.user, fetchProfile]);

    useEffect(() => {
        if (!isSupabaseConfigured) return;

        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session?.user) {
                const profile = await fetchProfile(session.user.id);
                setState({ user: session.user, session, profile, loading: false });
            } else {
                setState({ user: null, session: null, profile: null, loading: false });
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
        if (!isSupabaseConfigured) return { error: "Backend not configured. Enable Lovable Cloud first." };
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from("audit_logs").insert({
                user_id: user.id, user_email: email, action: "login", details: "User logged in",
            });
        }
        return {};
    };

    const register = async (email: string, password: string, fullName: string, role: UserRole) => {
        if (!isSupabaseConfigured) return { error: "Backend not configured. Enable Lovable Cloud first." };
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName, role } },
        });
        if (error) return { error: error.message };
        return {};
    };

    const logout = async () => {
        if (!isSupabaseConfigured) {
            setState({ user: null, session: null, profile: null, loading: false });
            return;
        }
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
