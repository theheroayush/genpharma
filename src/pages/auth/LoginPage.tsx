import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Loader2, Pill, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);
        if (result.error) {
            setError(result.error);
        } else {
            navigate("/");
        }
    };

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
                    <p className="text-muted-foreground">Sign in to manage your medicines</p>
                </div>

                <Card className="rounded-2xl shadow-card border-border">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <LogIn className="text-primary h-[22px] w-[22px]" />
                            Welcome Back
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
                                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                <div className="relative mt-1.5">
                                    <Input
                                        id="password"
                                        type={showPw ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
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
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
                            </Button>
                        </form>
                        <p className="mt-5 text-center text-sm text-muted-foreground">
                            Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Get Started</Link>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
