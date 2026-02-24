import { useEffect, useState, useCallback, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { UserRole, Profile } from "@/types";
import { AuthContext } from "./AuthContextContext";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<{
        user: User | null;
        profile: Profile | null;
        session: Session | null;
        loading: boolean;
    }>({
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
        // Security check: Prevent client-side admin registration
        if (role === "admin") return { error: "Cannot register as admin" };

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

