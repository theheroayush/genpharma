import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, ScrollText, Menu, X, LogOut, ChevronLeft, Shield } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const navItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/admin" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Audit Logs", icon: ScrollText, path: "/admin/audit" },
];

interface Props { children: React.ReactNode; }

export default function AdminLayout({ children }: Props) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { profile, logout } = useAuth();

    const handleLogout = async () => { await logout(); navigate("/"); };

    return (
        <div className="flex min-h-screen bg-background w-full">
            {/* Desktop Sidebar */}
            <aside className={cn("hidden lg:flex flex-col bg-card border-r border-border h-screen sticky top-0 transition-all duration-300", collapsed ? "w-[72px]" : "w-60")}>
                <div className="h-16 flex items-center px-4 border-b border-border">
                    <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center shrink-0">
                        <Shield className="text-white h-5 w-5" />
                    </div>
                    {!collapsed && <span className="ml-3 font-display text-lg text-foreground">Admin Panel</span>}
                </div>
                <nav className="flex-1 py-4 px-2 space-y-1">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", location.pathname === item.path ? "bg-red-600/10 text-red-600" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                            <item.icon size={20} className="shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>
                <div className="border-t border-border p-3 space-y-2">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <LogOut size={18} />{!collapsed && <span>Logout</span>}
                    </button>
                    <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <ChevronLeft size={18} className={cn("transition-transform", collapsed && "rotate-180")} />{!collapsed && <span>Collapse</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-foreground/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
                        <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border z-50 lg:hidden flex flex-col">
                            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                                <span className="font-display text-lg">Admin Panel</span>
                                <button onClick={() => setMobileOpen(false)}><X size={22} /></button>
                            </div>
                            <nav className="flex-1 py-4 px-3 space-y-1">
                                {navItems.map((item) => (
                                    <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors", location.pathname === item.path ? "bg-red-600/10 text-red-600" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                                        <item.icon size={20} /><span>{item.label}</span>
                                    </Link>
                                ))}
                            </nav>
                            <div className="border-t border-border p-4">
                                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted">
                                    <LogOut size={18} /><span>Logout</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-lg border-b border-border flex items-center px-4 lg:px-6 gap-4">
                    <button className="lg:hidden" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
                    <div className="flex-1" />
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center text-red-600 font-bold text-xs">
                            {getInitials(profile?.full_name, "AD")}
                        </div>
                        <span className="text-sm font-medium hidden sm:block">{profile?.full_name || "Admin"}</span>
                    </div>
                </header>
                <main className="flex-1 p-4 lg:p-6">{children}</main>
            </div>
        </div>
    );
}
