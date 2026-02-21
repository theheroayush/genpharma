import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { initSeedData } from "@/data/seedData";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Layouts
import PharmacistLayout from "./components/pharmacist/PharmacistLayout";
import AdminLayout from "./components/admin/AdminLayout";
import PatientLayout from "./components/patient/PatientLayout";

// Pharmacist Pages
import PharmacistDashboard from "./pages/pharmacist/PharmacistDashboard";
import InventoryPage from "./pages/pharmacist/InventoryPage";
import OrdersPage from "./pages/pharmacist/OrdersPage";
import PatientsPage from "./pages/pharmacist/PatientsPage";
import ReportsPage from "./pages/pharmacist/ReportsPage";

// Patient Pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import UploadPrescriptionPage from "./pages/patient/UploadPrescriptionPage";
import MyOrdersPage from "./pages/patient/MyOrdersPage";
import MyMedsPage from "./pages/patient/MyMedsPage";
import RemindersPage from "./pages/patient/RemindersPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import AuditLogs from "./pages/admin/AuditLogs";

const queryClient = new QueryClient();

/** Redirects authenticated users to their role dashboard */
function AuthRedirect({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  if (loading) return null;
  if (user && profile) {
    const map: Record<string, string> = { patient: "/patient", pharmacist: "/pharmacist", admin: "/admin" };
    return <Navigate to={map[profile.role] || "/"} replace />;
  }
  return <>{children}</>;
}

const AppContent = () => {
  useEffect(() => { initSeedData(); }, []);

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
      <Route path="/register" element={<AuthRedirect><RegisterPage /></AuthRedirect>} />

      {/* Patient Portal */}
      <Route path="/patient" element={<ProtectedRoute allowedRoles={["patient"]}><PatientLayout><PatientDashboard /></PatientLayout></ProtectedRoute>} />
      <Route path="/patient/upload" element={<ProtectedRoute allowedRoles={["patient"]}><PatientLayout><UploadPrescriptionPage /></PatientLayout></ProtectedRoute>} />
      <Route path="/patient/orders" element={<ProtectedRoute allowedRoles={["patient"]}><PatientLayout><MyOrdersPage /></PatientLayout></ProtectedRoute>} />
      <Route path="/patient/meds" element={<ProtectedRoute allowedRoles={["patient"]}><PatientLayout><MyMedsPage /></PatientLayout></ProtectedRoute>} />
      <Route path="/patient/reminders" element={<ProtectedRoute allowedRoles={["patient"]}><PatientLayout><RemindersPage /></PatientLayout></ProtectedRoute>} />
      <Route path="/patient/profile" element={<ProtectedRoute allowedRoles={["patient"]}><PatientLayout><PatientDashboard /></PatientLayout></ProtectedRoute>} />

      {/* Legacy patient upload route redirect */}
      <Route path="/upload-prescription" element={<Navigate to="/patient/upload" replace />} />

      {/* Pharmacist Portal */}
      <Route path="/pharmacist" element={<ProtectedRoute allowedRoles={["pharmacist", "admin"]}><PharmacistLayout><PharmacistDashboard /></PharmacistLayout></ProtectedRoute>} />
      <Route path="/pharmacist/inventory" element={<ProtectedRoute allowedRoles={["pharmacist", "admin"]}><PharmacistLayout><InventoryPage /></PharmacistLayout></ProtectedRoute>} />
      <Route path="/pharmacist/orders" element={<ProtectedRoute allowedRoles={["pharmacist", "admin"]}><PharmacistLayout><OrdersPage /></PharmacistLayout></ProtectedRoute>} />
      <Route path="/pharmacist/patients" element={<ProtectedRoute allowedRoles={["pharmacist", "admin"]}><PharmacistLayout><PatientsPage /></PharmacistLayout></ProtectedRoute>} />
      <Route path="/pharmacist/reports" element={<ProtectedRoute allowedRoles={["pharmacist", "admin"]}><PharmacistLayout><ReportsPage /></PharmacistLayout></ProtectedRoute>} />

      {/* Admin Panel */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout><UserManagement /></AdminLayout></ProtectedRoute>} />
      <Route path="/admin/audit" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout><AuditLogs /></AdminLayout></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
