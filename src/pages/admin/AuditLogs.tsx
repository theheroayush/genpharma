import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { Search, ScrollText } from "lucide-react";

interface AuditLog {
    id: number;
    user_email: string | null;
    action: string;
    details: string | null;
    created_at: string;
}

export default function AuditLogs() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [actionFilter, setActionFilter] = useState("all");

    useEffect(() => {
        (async () => {
            const { data } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(200);
            if (data) setLogs(data);
            setLoading(false);
        })();
    }, []);

    const actions = [...new Set(logs.map((l) => l.action))];
    const filtered = logs.filter((l) => {
        if (actionFilter !== "all" && l.action !== actionFilter) return false;
        if (search.trim()) {
            const q = search.toLowerCase();
            return (l.user_email || "").toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || (l.details || "").toLowerCase().includes(q);
        }
        return true;
    });

    const actionColor = (a: string) => {
        if (a.includes("login")) return "info";
        if (a.includes("logout")) return "muted";
        if (a.includes("approve")) return "success";
        if (a.includes("reject")) return "destructive";
        if (a.includes("role")) return "warning";
        return "secondary";
    };

    if (loading) return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Audit Logs</h1>
                <p className="text-muted-foreground text-sm">{logs.length} events logged</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative sm:max-w-xs flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." className="pl-9" />
                </div>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                    <SelectTrigger className="sm:w-[180px]"><SelectValue placeholder="All Actions" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Actions</SelectItem>
                        {actions.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <Card>
                <CardContent className="pt-4">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-3 font-medium">Time</th>
                                    <th className="text-left py-3 px-3 font-medium">User</th>
                                    <th className="text-left py-3 px-3 font-medium">Action</th>
                                    <th className="text-left py-3 px-3 font-medium hidden md:table-cell">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((log) => (
                                    <tr key={log.id} className="border-b hover:bg-muted/50">
                                        <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(log.created_at).toLocaleString("en-IN")}
                                        </td>
                                        <td className="py-3 px-3 text-xs">{log.user_email || "System"}</td>
                                        <td className="py-3 px-3">
                                            <Badge variant={actionColor(log.action) as "default" | "destructive" | "outline" | "secondary"} className="text-xs">{log.action}</Badge>
                                        </td>
                                        <td className="py-3 px-3 text-xs text-muted-foreground hidden md:table-cell max-w-xs truncate">{log.details || "—"}</td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr><td colSpan={4} className="text-center py-12 text-muted-foreground">
                                        <ScrollText className="h-8 w-8 mx-auto mb-2 opacity-30" />No logs found.
                                    </td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
