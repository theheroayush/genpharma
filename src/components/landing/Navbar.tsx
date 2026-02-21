import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, UserPlus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { UserRole } from "@/types";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    } else if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleLogout = async () => { await logout(); setIsOpen(false); };

  const dashboardPath: Record<UserRole, string> = { patient: "/patient", pharmacist: "/pharmacist", admin: "/admin" };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display text-lg font-bold">G</span>
          </div>
          <span className="font-display text-xl text-foreground">GenPharma</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
          {user && profile ? (
            <div className="flex items-center gap-3">
              <Button size="sm" variant="outline" onClick={() => navigate(dashboardPath[profile.role])}>
                Dashboard
              </Button>
              <Button size="sm" variant="ghost" onClick={handleLogout} className="gap-1">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={() => navigate("/login")} className="gap-1">
                <LogIn className="h-4 w-4" /> Login
              </Button>
              <Button size="sm" onClick={() => navigate("/register")} className="gap-1">
                <UserPlus className="h-4 w-4" /> Get Started
              </Button>
            </div>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background border-b border-border overflow-hidden">
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground py-2" onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}>
                  {link.label}
                </a>
              ))}
              {user && profile ? (
                <>
                  <Button size="sm" className="w-fit" onClick={() => { navigate(dashboardPath[profile.role]); setIsOpen(false); }}>Dashboard</Button>
                  <Button size="sm" variant="ghost" className="w-fit gap-1" onClick={handleLogout}><LogOut className="h-4 w-4" /> Logout</Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="ghost" className="w-fit gap-1" onClick={() => { navigate("/login"); setIsOpen(false); }}><LogIn className="h-4 w-4" /> Login</Button>
                  <Button size="sm" className="w-fit gap-1" onClick={() => { navigate("/register"); setIsOpen(false); }}><UserPlus className="h-4 w-4" /> Get Started</Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
