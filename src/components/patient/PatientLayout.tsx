import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
    { label: "Home", path: "/patient" },
    { label: "My Meds", path: "/patient/meds" },
    { label: "Reminders", path: "/patient/reminders" },
    { label: "Profile", path: "/patient/profile" },
];

interface Props { children: React.ReactNode; }

export default function PatientLayout({ children }: Props) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { profile, logout } = useAuth();

    const handleLogout = async () => { await logout(); navigate("/"); };
    const displayName = profile?.full_name || "User";

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white dark:bg-slate-900 border-b border-border sticky top-0 z-50">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/patient" className="flex items-center gap-2.5 text-primary">
                        <div className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: 24 }}>local_pharmacy</span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">GenPharma</h1>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                    location.pathname === link.path
                                        ? "text-foreground bg-muted font-semibold"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>notifications</span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm hover:bg-primary/20 transition-colors"
                            title={`Logout (${displayName})`}
                        >
                            {displayName.split(" ").map(w => w[0]).join("").substring(0, 2)}
                        </button>

                        {/* Mobile hamburger */}
                        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
                            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{mobileOpen ? "close" : "menu"}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-border overflow-hidden z-40"
                    >
                        <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                        location.pathname === link.path
                                            ? "text-foreground bg-muted font-semibold"
                                            : "text-muted-foreground hover:bg-muted"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <button
                                onClick={() => { handleLogout(); setMobileOpen(false); }}
                                className="px-4 py-3 text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 text-left"
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main content */}
            <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-border bg-white py-6">
                <div className="max-w-[1200px] mx-auto px-6 text-center">
                    <p className="text-muted-foreground text-sm">© 2023 GenPharma Healthcare Pvt Ltd. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
