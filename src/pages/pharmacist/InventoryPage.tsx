import { useState } from "react";

type Tab = "stock" | "orders";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("stock");
  const [search, setSearch] = useState("");

  const summaryCards = [
    { icon: "inventory_2", label: "Total SKUs", value: "246", change: "+12 this month", color: "text-primary bg-primary/10" },
    { icon: "warning", label: "Low Stock", value: "18", change: "Requires reorder", color: "text-red-500 bg-red-100" },
    { icon: "event_busy", label: "Expiring Soon", value: "7", change: "Within 90 days", color: "text-amber-500 bg-amber-100" },
    { icon: "account_balance_wallet", label: "Stock Value", value: "₹4.2L", change: "Updated today", color: "text-emerald-600 bg-emerald-100" },
  ];

  const stockItems = [
    { name: "Metformin 500mg", sku: "MET-500", batch: "B2023-145", qty: 1200, min: 500, expiry: "Mar 2025", status: "In Stock", statusColor: "bg-green-100 text-green-700" },
    { name: "Amlodipine 5mg", sku: "AML-005", batch: "B2023-089", qty: 120, min: 200, expiry: "Dec 2024", status: "Low Stock", statusColor: "bg-red-100 text-red-700" },
    { name: "Atorvastatin 10mg", sku: "ATV-010", batch: "B2023-201", qty: 800, min: 300, expiry: "Jan 2024", status: "Expiring", statusColor: "bg-amber-100 text-amber-700" },
    { name: "Vitamin B12", sku: "VB12-001", batch: "B2023-310", qty: 2100, min: 400, expiry: "Jun 2025", status: "In Stock", statusColor: "bg-green-100 text-green-700" },
    { name: "Glimepiride 2mg", sku: "GLM-002", batch: "B2023-156", qty: 90, min: 150, expiry: "Feb 2024", status: "Low Stock", statusColor: "bg-red-100 text-red-700" },
  ].filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Monitor stock levels, track expiry dates, and manage supplier orders.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Add Medicine
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl border border-border p-4 md:p-5">
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{card.icon}</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.change}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-5 md:px-6 pt-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab("stock")}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "stock" ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >Stock Levels</button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "orders" ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >Supplier Orders</button>
          </div>
          <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2 bg-muted/30 mb-3 md:mb-0">
            <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 18 }}>search</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search medicines..." className="bg-transparent text-sm outline-none w-40 placeholder:text-muted-foreground" />
          </div>
        </div>

        {activeTab === "stock" && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Medicine</th>
                    <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Batch</th>
                    <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Quantity</th>
                    <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Expiry</th>
                    <th className="text-left text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Status</th>
                    <th className="text-right text-xs font-bold text-muted-foreground uppercase tracking-wide px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stockItems.map((item) => (
                    <tr key={item.sku} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.batch}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{item.qty}</span>
                          <span className="text-xs text-muted-foreground">/ min {item.min}</span>
                        </div>
                        <div className="w-20 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                          <div className={`h-full rounded-full ${item.qty > item.min ? "bg-green-400" : "bg-red-400"}`} style={{ width: `${Math.min((item.qty / item.min) * 100, 100)}%` }} />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{item.expiry}</td>
                      <td className="px-6 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${item.statusColor}`}>{item.status}</span></td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-primary text-sm font-semibold hover:underline">
                          {item.status === "In Stock" ? "Edit" : item.status === "Low Stock" ? "Reorder →" : "Resolve →"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-border">
              {stockItems.map((item) => (
                <div key={item.sku} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.sku} • {item.batch}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.statusColor}`}>{item.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Qty: {item.qty} / min {item.min} • Exp: {item.expiry}</span>
                    <button className="text-primary font-semibold">{item.status === "In Stock" ? "Edit" : "Reorder"}</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <div className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 32 }}>local_shipping</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Supplier Orders</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">Track incoming supplier orders, view expected delivery dates, and manage purchase history.</p>
            <button className="mt-4 bg-primary text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors">Create New Order</button>
          </div>
        )}
      </div>
    </div>
  );
}
