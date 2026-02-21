import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";

interface Props {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: Props) {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-3">
                    <div className="h-10 w-10 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted-foreground text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user || !profile) {
        return <Navigate to="/login" replace />;
    }

    // Pharmacist pending approval
    if (profile.role === "pharmacist" && !profile.approved) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="max-w-md text-center space-y-4">
                    <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <span className="text-3xl">⏳</span>
                    </div>
                    <h2 className="text-2xl font-bold">Pending Approval</h2>
                    <p className="text-muted-foreground">
                        Your pharmacist account is awaiting admin approval. You'll be notified once approved.
                    </p>
                    <p className="text-sm text-muted-foreground">Email: {profile.email}</p>
                </div>
            </div>
        );
    }

    // Role check
    if (allowedRoles && !allowedRoles.includes(profile.role)) {
        // Redirect to appropriate dashboard
        const redirectMap: Record<UserRole, string> = {
            patient: "/patient",
            pharmacist: "/pharmacist",
            admin: "/admin",
        };
        return <Navigate to={redirectMap[profile.role]} replace />;
    }

    return <>{children}</>;
}
