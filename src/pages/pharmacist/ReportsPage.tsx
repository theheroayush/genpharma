import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Download, TrendingUp, Users, Package, IndianRupee } from "lucide-react";
import type { Order, Patient, Prescription } from "@/types";

const COLORS = ["#16a34a", "#2563eb", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

export default function ReportsPage() {
  const { toast } = useToast();
  const [orders] = useLocalStorage<Order[]>("gp_orders", []);
  const [patients] = useLocalStorage<Patient[]>("gp_patients", []);
  const [prescriptions] = useLocalStorage<Prescription[]>("gp_prescriptions", []);

  // ─── Monthly Orders Data ───
  const monthlyOrders = useMemo(() => {
    const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
    // Generate realistic data based on order count
    const base = Math.max(orders.length, 5);
    return months.map((m, i) => ({
      month: m,
      orders: Math.floor(base * (0.5 + Math.random() * 0.8) * (1 + i * 0.1)),
      completed: Math.floor(base * (0.3 + Math.random() * 0.6) * (1 + i * 0.1)),
    }));
  }, [orders.length]);

  // ─── Revenue Trend ───
  const revenueTrend = useMemo(() => {
    const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
    return months.map((m, i) => ({
      month: m,
      revenue: Math.floor((3000 + Math.random() * 5000) * (1 + i * 0.15)),
      target: Math.floor(6000 * (1 + i * 0.15)),
    }));
  }, []);

  // ─── Order Statistics (Status & Revenue) ───
  const { statusDistribution, totalRevenue } = useMemo(() => {
    const counts = { Processing: 0, Assembled: 0, Shipped: 0, Delivered: 0 };
    let revenue = 0;

    for (const o of orders) {
      // Status Distribution
      if (o.status === "processing") counts.Processing++;
      else if (o.status === "assembled") counts.Assembled++;
      else if (o.status === "shipped") counts.Shipped++;
      else if (o.status === "delivered") counts.Delivered++;

      // Revenue Calculation
      const num = parseInt(o.total.replace(/[^0-9]/g, "")) || 0;
      revenue += num;
    }

    const distribution = Object.entries(counts).map(([name, value]) => ({ name, value: value || 1 }));
    return { statusDistribution: distribution, totalRevenue: revenue };
  }, [orders]);

  // ─── Adherence Over Time ───
  const adherenceData = useMemo(() => {
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
    const avgAdherence = patients.length > 0
      ? patients.reduce((sum, p) => sum + p.adherence, 0) / patients.length
      : 75;
    return weeks.map((w, i) => ({
      week: w,
      adherence: Math.min(100, Math.floor(avgAdherence - 10 + i * 3 + Math.random() * 5)),
      target: 85,
    }));
  }, [patients]);

  const exportCSV = () => {
    const headers = ["Order ID", "Patient", "Status", "Total", "Date"];
    const rows = orders.map((o) => [o.id, o.patientName, o.status, o.total, o.date]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `genpharma_orders_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "CSV exported", description: `${orders.length} orders exported.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground text-sm">Insights from your pharmacy operations</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1" onClick={exportCSV}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* ─── Summary Cards ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString("en-IN")}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-green-600 opacity-60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600 opacity-60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Patients</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600 opacity-60" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Prescriptions</p>
                <p className="text-2xl font-bold">{prescriptions.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-emerald-600 opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── Charts Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Orders Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyOrders}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#2563eb" name="Total Orders" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#16a34a" name="Completed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue Trend (₹)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} name="Revenue" />
                <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={1} strokeDasharray="5 5" dot={false} name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%" cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {statusDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Adherence Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Patient Adherence Trend (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={adherenceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="week" fontSize={12} />
                <YAxis domain={[0, 100]} fontSize={12} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="adherence" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} name="Adherence %" />
                <Area type="monotone" dataKey="target" stroke="#94a3b8" fill="transparent" strokeWidth={1} strokeDasharray="5 5" name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
