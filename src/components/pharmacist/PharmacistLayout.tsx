import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Dashboard", icon: "dashboard", path: "/pharmacist" },
  { label: "Inventory", icon: "inventory_2", path: "/pharmacist/inventory" },
  { label: "Orders", icon: "shopping_cart", path: "/pharmacist/orders", badge: 3 },
  { label: "Patients", icon: "group", path: "/pharmacist/patients" },
  { label: "Reports", icon: "description", path: "/pharmacist/reports" },
];

interface Props { children: React.ReactNode; }

export default function PharmacistLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, logout } = useAuth();

  const handleLogout = async () => { await logout(); navigate("/"); };
  const initials = profile?.full_name?.split(" ").map((w) => w[0]).join("").substring(0, 2) || "PH";
  const displayName = profile?.full_name || "Pharmacist";

  return (
    <div className="flex min-h-screen bg-background w-full">
      {/* Desktop Sidebar */}
      <aside className={cn("hidden lg:flex flex-col bg-white border-r border-border h-screen sticky top-0 transition-all duration-300", collapsed ? "w-[72px]" : "w-60")}>
        <div className="h-16 flex items-center px-4 border-b border-border gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>local_pharmacy</span>
          </div>
          {!collapsed && <span className="text-lg font-bold text-foreground tracking-tight">GenPharma</span>}
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors relative", active ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                <span className="material-symbols-outlined shrink-0" style={{ fontSize: 20 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
                {item.badge && !collapsed && <span className="ml-auto bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
                {item.badge && collapsed && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3 space-y-2">
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{initials}</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground">Pharmacist</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
            {!collapsed && <span>Logout</span>}
          </button>
          <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <span className={cn("material-symbols-outlined transition-transform", collapsed && "rotate-180")} style={{ fontSize: 18 }}>chevron_left</span>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile header + overlay */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-border h-14 flex items-center px-4 justify-between">
        <button onClick={() => setMobileOpen(true)} className="p-2 text-foreground">
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>menu</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>local_pharmacy</span>
          </div>
          <span className="text-lg font-bold text-foreground">GenPharma</span>
        </div>
        <button onClick={handleLogout} className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>logout</span>
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>local_pharmacy</span>
                </div>
                <span className="text-lg font-bold text-foreground">GenPharma</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-foreground">
                <span className="material-symbols-outlined" style={{ fontSize: 24 }}>close</span>
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors", active ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted")}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && <span className="ml-auto bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-border pt-3 mt-2">
              <div className="flex items-center gap-3 px-2 py-2 mb-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{initials}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{displayName}</p>
                  <p className="text-xs text-muted-foreground">Pharmacist</p>
                </div>
              </div>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:p-6 p-4 pt-[72px] lg:pt-6">
        <div className="max-w-[1100px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
