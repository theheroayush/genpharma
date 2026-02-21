import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Users, UserCheck, UserX, Shield, TrendingUp, AlertTriangle } from "lucide-react";

interface Stats {
    total_users: number;
    patients: number;
    pharmacists: number;
    admins: number;
    pending_approvals: number;
    recent_signups: number;
}

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.rpc("admin_get_stats");
            if (!error && data) setStats(data);
            setLoading(false);
        })();
    }, []);

    if (loading) return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Admin Overview</h1>
                <p className="text-muted-foreground text-sm">System-wide statistics and quick actions</p>
            </div>

            {/* Pending Approvals Alert */}
            {stats && stats.pending_approvals > 0 && (
                <Card className="border-amber-300 bg-amber-50 dark:bg-amber-950/20">
                    <CardContent className="pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-600" />
                            <span className="font-semibold text-amber-800 dark:text-amber-200">
                                {stats.pending_approvals} pharmacist(s) awaiting approval
                            </span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => navigate("/admin/users")}>Review Now</Button>
                    </CardContent>
                </Card>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: "Total Users", value: stats?.total_users ?? 0, icon: Users, color: "text-blue-600" },
                    { label: "Patients", value: stats?.patients ?? 0, icon: UserCheck, color: "text-green-600" },
                    { label: "Pharmacists", value: stats?.pharmacists ?? 0, icon: UserCheck, color: "text-purple-600" },
                    { label: "Admins", value: stats?.admins ?? 0, icon: Shield, color: "text-red-600" },
                    { label: "Pending", value: stats?.pending_approvals ?? 0, icon: UserX, color: "text-amber-600" },
                    { label: "New (7d)", value: stats?.recent_signups ?? 0, icon: TrendingUp, color: "text-emerald-600" },
                ].map((card) => (
                    <Card key={card.label}>
                        <CardContent className="pt-6 text-center">
                            <card.icon className={`h-6 w-6 mx-auto mb-2 ${card.color} opacity-70`} />
                            <p className="text-2xl font-bold">{card.value}</p>
                            <p className="text-xs text-muted-foreground">{card.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/admin/users")}>
                            <Users className="h-5 w-5" /> Manage Users
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/admin/audit")}>
                            <Shield className="h-5 w-5" /> View Audit Logs
                        </Button>
                        <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/pharmacist")}>
                            <TrendingUp className="h-5 w-5" /> Pharmacist Portal
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
