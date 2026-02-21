import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Profile } from "@/types";
import { Search, CheckCircle, XCircle, UserCheck, UserX } from "lucide-react";

export default function UserManagement() {
    const { toast } = useToast();
    const { profile: myProfile } = useAuth();
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const fetchUsers = async () => {
        const { data, error } = await supabase.rpc("admin_get_all_users");
        if (!error && data) setUsers(data as Profile[]);
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, []);

    const filtered = users.filter((u) => {
        if (roleFilter !== "all" && u.role !== roleFilter) return false;
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            return u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
        }
        return true;
    });

    const handleApprove = async (userId: string) => {
        const { error } = await supabase.rpc("admin_approve_user", { target_user_id: userId });
        if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
        await supabase.from("audit_logs").insert({ user_id: myProfile?.id, user_email: myProfile?.email, action: "approve_user", details: `Approved user ${userId}` });
        toast({ title: "User approved" });
        fetchUsers();
    };

    const handleReject = async (userId: string) => {
        const { error } = await supabase.rpc("admin_reject_user", { target_user_id: userId });
        if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
        await supabase.from("audit_logs").insert({ user_id: myProfile?.id, user_email: myProfile?.email, action: "reject_user", details: `Rejected user ${userId}` });
        toast({ title: "User rejected" });
        fetchUsers();
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (userId === myProfile?.id) { toast({ title: "Cannot change your own role", variant: "destructive" }); return; }
        const { error } = await supabase.rpc("admin_change_role", { target_user_id: userId, new_role: newRole });
        if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
        await supabase.from("audit_logs").insert({ user_id: myProfile?.id, user_email: myProfile?.email, action: "change_role", details: `Changed ${userId} to ${newRole}` });
        toast({ title: `Role changed to ${newRole}` });
        fetchUsers();
    };

    const roleBadge = (role: string) => {
        const map: Record<string, "default" | "success" | "destructive"> = { admin: "destructive", pharmacist: "default", patient: "success" };
        return <Badge variant={map[role] || "secondary"}>{role}</Badge>;
    };

    if (loading) return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

    const pendingUsers = users.filter((u) => !u.approved);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">User Management</h1>
                <p className="text-muted-foreground text-sm">{users.length} registered users</p>
            </div>

            {/* Pending Approvals */}
            {pendingUsers.length > 0 && (
                <Card className="border-amber-300">
                    <CardHeader><CardTitle className="text-base flex items-center gap-2"><UserX className="h-4 w-4 text-amber-600" /> Pending Approvals ({pendingUsers.length})</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {pendingUsers.map((u) => (
                                <div key={u.id} className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                                    <div>
                                        <p className="font-medium">{u.full_name || "Unnamed"}</p>
                                        <p className="text-sm text-muted-foreground">{u.email} · {u.role}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="gap-1" onClick={() => handleApprove(u.id)}>
                                            <CheckCircle className="h-3 w-3" /> Approve
                                        </Button>
                                        <Button size="sm" variant="destructive" className="gap-1" onClick={() => handleReject(u.id)}>
                                            <XCircle className="h-3 w-3" /> Reject
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative sm:max-w-xs flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search users..." className="pl-9" />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="sm:w-[150px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="pharmacist">Pharmacist</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Users Table */}
            <Card>
                <CardContent className="pt-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-3 font-medium">User</th>
                                    <th className="text-left py-3 px-3 font-medium">Role</th>
                                    <th className="text-left py-3 px-3 font-medium">Status</th>
                                    <th className="text-left py-3 px-3 font-medium hidden md:table-cell">Joined</th>
                                    <th className="text-left py-3 px-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((u) => (
                                    <tr key={u.id} className="border-b hover:bg-muted/50">
                                        <td className="py-3 px-3">
                                            <p className="font-medium">{u.full_name || "Unnamed"}</p>
                                            <p className="text-xs text-muted-foreground">{u.email}</p>
                                        </td>
                                        <td className="py-3 px-3">{roleBadge(u.role)}</td>
                                        <td className="py-3 px-3">
                                            {u.approved ? <Badge variant="success" className="gap-1"><UserCheck className="h-3 w-3" />Active</Badge> : <Badge variant="warning" className="gap-1"><UserX className="h-3 w-3" />Pending</Badge>}
                                        </td>
                                        <td className="py-3 px-3 text-muted-foreground text-xs hidden md:table-cell">
                                            {new Date(u.created_at).toLocaleDateString("en-IN")}
                                        </td>
                                        <td className="py-3 px-3">
                                            {u.id !== myProfile?.id ? (
                                                <Select onValueChange={(v) => handleRoleChange(u.id, v)}>
                                                    <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue placeholder="Change Role" /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="patient">Patient</SelectItem>
                                                        <SelectItem value="pharmacist">Pharmacist</SelectItem>
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <span className="text-xs text-muted-foreground italic">You</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
