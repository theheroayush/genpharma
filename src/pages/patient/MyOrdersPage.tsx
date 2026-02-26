import { useState } from "react";
import { useNavigate } from "react-router-dom";

type OrderTab = "active" | "history";

interface PatientOrder {
    id: string;
    name: string;
    date: string;
    status: "processing" | "assembled" | "shipped" | "delivered";
    items: string[];
    total: string;
    eta?: string;
}

const orders: PatientOrder[] = [
    { id: "GP-9021", name: "Monthly Refill Pack", date: "Oct 24, 2023", status: "shipped", items: ["Metformin 500mg x60", "Amlodipine 5mg x30", "Atorvastatin 10mg x30"], total: "₹450", eta: "Expected by 6 PM Today" },
    { id: "GP-8844", name: "Diabetes Care Pack", date: "Sep 22, 2023", status: "delivered", items: ["Metformin 500mg x60", "Glimepiride 2mg x30"], total: "₹320" },
    { id: "GP-8710", name: "Monthly Refill Pack", date: "Aug 20, 2023", status: "delivered", items: ["Metformin 500mg x60", "Amlodipine 5mg x30"], total: "₹380" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    processing: { label: "Processing", color: "text-amber-700", bg: "bg-amber-100" },
    assembled: { label: "Packed", color: "text-blue-700", bg: "bg-blue-100" },
    shipped: { label: "In Transit", color: "text-primary", bg: "bg-blue-100" },
    delivered: { label: "Delivered", color: "text-green-700", bg: "bg-green-100" },
};

export default function MyOrdersPage() {
    const [tab, setTab] = useState<OrderTab>("active");
    const navigate = useNavigate();

    const activeOrders = orders.filter(o => o.status !== "delivered");
    const pastOrders = orders.filter(o => o.status === "delivered");
    const displayOrders = tab === "active" ? activeOrders : pastOrders;
    const activeOrder = activeOrders[0];

    return (
        <div>
            <button onClick={() => navigate("/patient")} className="text-primary text-sm font-medium flex items-center gap-1 mb-3 hover:underline">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
                Back
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">My Orders</h1>
            <p className="text-muted-foreground text-sm mb-5">Track your medicine pack deliveries.</p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8">
                {/* Left */}
                <div className="lg:col-span-7 space-y-5">
                    {/* Active order tracker */}
                    {activeOrder && (
                        <div className="bg-white rounded-xl border border-border p-4 md:p-5">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase">#{activeOrder.id}</p>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig[activeOrder.status].bg} ${statusConfig[activeOrder.status].color}`}>
                                    {statusConfig[activeOrder.status].label}
                                </span>
                            </div>
                            <h3 className="font-bold text-foreground mb-1">{activeOrder.name}</h3>
                            {activeOrder.eta && <p className="text-sm text-primary font-medium mb-4">{activeOrder.eta}</p>}

                            {/* Timeline */}
                            <div className="relative py-1">
                                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-border" />
                                {[
                                    { label: "Order Confirmed", time: "Oct 22, 10:30 AM", done: true },
                                    { label: "Packed & Verified", time: "Oct 23, 2:00 PM", done: true },
                                    { label: "Shipped", time: "Oct 23, 4:15 PM", done: activeOrder.status === "shipped" || activeOrder.status === "delivered" },
                                    { label: "Delivered", time: activeOrder.eta || "Pending", done: activeOrder.status === "delivered" },
                                ].map((step) => {
                                    return (
                                        <div key={step.label} className="flex gap-3 items-start mb-4 last:mb-0 relative">
                                            <div className={`z-10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 border-white ${step.done ? "bg-green-500" : "bg-muted"}`}>
                                                {step.done && <span className="material-symbols-outlined text-white" style={{ fontSize: 12 }}>check</span>}
                                            </div>
                                            <div>
                                                <p className={`text-sm ${step.done ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                                                <p className="text-xs text-muted-foreground">{step.time}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex gap-1 bg-muted rounded-lg p-1">
                        {(["active", "history"] as OrderTab[]).map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${tab === t ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                {t === "active" ? `Active (${activeOrders.length})` : `History (${pastOrders.length})`}
                            </button>
                        ))}
                    </div>

                    {/* Order List */}
                    <div className="space-y-2.5">
                        {displayOrders.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground text-sm">No {tab} orders found.</div>
                        ) : (
                            displayOrders.map(order => (
                                <div key={order.id} className="bg-white rounded-xl border border-border p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="text-xs font-bold text-muted-foreground">#{order.id}</p>
                                            <p className="font-bold text-foreground text-sm mt-0.5">{order.name}</p>
                                            <p className="text-xs text-muted-foreground">{order.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                                                {statusConfig[order.status].label}
                                            </span>
                                            <p className="text-sm font-bold text-foreground mt-1">{order.total}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {order.items.map(item => (
                                            <span key={item} className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded">{item}</span>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right */}
                <div className="lg:col-span-5 space-y-5">
                    {/* Pack info cards */}
                    <div className="grid grid-cols-3 gap-2.5">
                        {[
                            { icon: "local_pharmacy", label: "Pack Type", value: "Diabetes Care" },
                            { icon: "calendar_month", label: "Duration", value: "30 Days" },
                            { icon: "update", label: "Next Refill", value: "Nov 20" },
                        ].map(item => (
                            <div key={item.label} className="bg-white rounded-xl border border-border p-3">
                                <span className="material-symbols-outlined text-primary mb-1 block" style={{ fontSize: 20 }}>{item.icon}</span>
                                <p className="text-[10px] text-muted-foreground">{item.label}</p>
                                <p className="font-bold text-foreground text-xs mt-0.5">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Delivery partner */}
                    <div className="bg-white rounded-xl border border-border p-4 md:p-5">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Delivery Partner</p>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center relative">
                                <span className="material-symbols-outlined text-primary" style={{ fontSize: 24 }}>person</span>
                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white" style={{ fontSize: 10 }}>check</span>
                                </div>
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-sm">Sunita Devi</p>
                                <p className="text-xs text-muted-foreground">ASHA Worker • Verified</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="py-2 rounded-lg border border-border text-foreground font-medium text-xs hover:bg-muted transition-colors flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chat</span> Message
                            </button>
                            <button className="py-2 rounded-lg border border-border text-foreground font-medium text-xs hover:bg-muted transition-colors flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>call</span> Call
                            </button>
                        </div>
                    </div>

                    {/* Help */}
                    <div className="bg-primary text-white rounded-xl p-4 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-bold mb-1">Need Help?</h4>
                            <p className="text-blue-100 text-sm mb-3">Questions about your delivery? Available 24/7.</p>
                            <button className="bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-1.5">
                                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>call</span>
                                Call Support
                            </button>
                        </div>
                        <div className="absolute -right-3 -bottom-4 opacity-15">
                            <span className="material-symbols-outlined" style={{ fontSize: 80 }}>headphones</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
