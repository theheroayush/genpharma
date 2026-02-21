import { createContext } from "react";
import type { User, Session } from "@supabase/supabase-js";
import type { UserRole, Profile } from "@/types";

export interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    session: Session | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    register: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error?: string }>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
