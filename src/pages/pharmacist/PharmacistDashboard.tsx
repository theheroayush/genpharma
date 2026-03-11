import { useAuth } from "@/hooks/useAuth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { Prescription, Order } from "@/types";

export default function PharmacistDashboard() {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(" ")[0] || "Doctor";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const [fetchedPrescriptions] = useLocalStorage<Prescription[]>("gp_prescriptions", []);
  const [fetchedOrders] = useLocalStorage<Order[]>("gp_orders", []);

  // Calculate stats
  const pendingPrescriptions = fetchedPrescriptions.filter(p => ["pending", "ocr_completed"].includes(p.status));
  const verifiedPrescriptions = fetchedPrescriptions.filter(p => p.status === "verified");
  const pendingDeliveries = fetchedOrders.filter(o => ["processing", "assembled", "shipped"].includes(o.status));

  // Mock urgent count (e.g. 20% of pending)
  const urgentCount = Math.ceil(pendingPrescriptions.length * 0.2);

  const stats = [
    {
      label: "Prescriptions to Process",
      value: pendingPrescriptions.length.toString(),
      badge: `${urgentCount} Urgent`,
      badgeColor: "bg-red-100 text-red-700",
      icon: "description",
      iconColor: "text-orange-500 bg-orange-100"
    },
    {
      label: "Packs to Assemble",
      value: verifiedPrescriptions.length.toString(),
      badge: `${verifiedPrescriptions.length} Ready`,
      badgeColor: "bg-green-100 text-green-700",
      icon: "package_2",
      iconColor: "text-primary bg-primary/10"
    },
    {
      label: "Pending Deliveries",
      value: pendingDeliveries.length.toString(),
      badge: `${pendingDeliveries.length} Active`,
      badgeColor: "bg-blue-100 text-blue-700",
      icon: "local_shipping",
      iconColor: "text-emerald-600 bg-emerald-100"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assembled": return "bg-green-100 text-green-700";
      case "verified": return "bg-blue-100 text-blue-700";
      case "pending": return "bg-amber-100 text-amber-700";
      case "ocr_completed": return "bg-purple-100 text-purple-700";
      case "on_hold": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const prescriptions = fetchedPrescriptions.map(rx => ({
    id: rx.id,
    patient: rx.patientName,
    age: rx.patientAge,
    meds: rx.medications.length,
    date: new Date(rx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    status: rx.status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase()),
    statusColor: getStatusColor(rx.status),
    rawStatus: rx.status // kept for button logic
  }));

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-5 md:p-8 text-white mb-6 md:mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-blue-200 font-medium">{greeting},</p>
          <h1 className="text-2xl md:text-4xl font-bold mt-1">Dr. {firstName}</h1>
          <p className="text-blue-100 mt-2 max-w-lg">You have <span className="font-bold text-white">{pendingPrescriptions.length} prescriptions</span> to process and <span className="font-bold text-white">{urgentCount} urgent</span> items today.</p>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10">
          <span className="material-symbols-outlined" style={{ fontSize: 180 }}>medical_services</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border p-5 md:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${s.iconColor} flex items-center justify-center`}>
                <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{s.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Prescriptions Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="p-5 md:p-6 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">Recent Prescriptions</h3>
            <p className="text-sm text-muted-foreground">Latest prescriptions requiring your attention</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2 bg-muted/30">
              <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 18 }}>search</span>
              <input placeholder="Search patients..." className="bg-transparent text-sm outline-none w-40 placeholder:text-muted-foreground" />
            </div>
            <button className="flex items-center gap-1.5 border border-border rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>filter_list</span>
              Filter
            </button>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Patient</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Order ID</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Medicines</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Date</th>
                <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Status</th>
                <th className="text-right text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((rx) => (
                <tr key={rx.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {rx.patient.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{rx.patient}</p>
                        <p className="text-xs text-muted-foreground">Age: {rx.age}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{rx.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{rx.meds} items</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{rx.date}</td>
                  <td className="px-6 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${rx.statusColor}`}>{rx.status}</span></td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary text-sm font-semibold hover:underline">
                      {rx.rawStatus === "assembled" ? "View" : "Process →"}
                    </button>
                  </td>
                </tr>
              ))}
              {prescriptions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No prescriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="p-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {rx.patient.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{rx.patient}</p>
                    <p className="text-xs text-muted-foreground">{rx.id} • Age {rx.age}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rx.statusColor}`}>{rx.status}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{rx.meds} medicines • {rx.date}</span>
                <button className="text-primary font-semibold">{rx.rawStatus === "assembled" ? "View" : "Process →"}</button>
              </div>
            </div>
          ))}
          {prescriptions.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No prescriptions found.
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {prescriptions.length} of {prescriptions.length} prescriptions</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors" disabled>Previous</button>
            <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
