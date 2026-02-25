import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Loader2, Pill, UserPlus, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
        setLoading(true);
        // Always register as patient — pharmacist/admin accounts are created by admin only
        const result = await register(email, password, name, "patient");
        setLoading(false);
        if (result.error) {
            setError(result.error);
        } else {
            setSuccess(true);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md text-center space-y-5">
                    <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="text-green-600 h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Welcome to GenPharma!</h2>
                    <p className="text-muted-foreground">Your account is ready. You can now upload prescriptions, order medicines, and track deliveries.</p>
                    <Button onClick={() => navigate("/login")} className="px-8">Sign In Now</Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Pill className="text-primary h-[22px] w-[22px]" />
                        </div>
                        <span className="text-2xl font-bold text-foreground tracking-tight">GenPharma</span>
                    </Link>
                    <p className="text-muted-foreground">Get affordable medicine packs delivered to your door</p>
                </div>

                <Card className="rounded-2xl shadow-card border-border">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <UserPlus className="text-primary h-[22px] w-[22px]" />
                            Create Your Account
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-xl flex items-center gap-2">
                                    <AlertCircle className="h-[18px] w-[18px]" />
                                    {error}
                                </div>
                            )}
                            <div>
                                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Rajesh Kumar"
                                    required
                                    className="mt-1.5 rounded-xl"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="mt-1.5 rounded-xl"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className="mt-1.5 rounded-xl"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                <div className="relative mt-1.5">
                                    <Input
                                        id="password"
                                        type={showPw ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min 6 characters"
                                        required
                                        className="rounded-xl pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw(!showPw)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        aria-label={showPw ? "Hide password" : "Show password"}
                                    >
                                        {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full rounded-xl h-11 text-base font-semibold" disabled={loading}>
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Get Started"}
                            </Button>
                        </form>
                        <p className="mt-5 text-center text-sm text-muted-foreground">
                            Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
                        </p>
                    </CardContent>
                </Card>

                <div className="mt-6 text-center text-xs text-muted-foreground">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                </div>
            </motion.div>
        </div>
    );
}
