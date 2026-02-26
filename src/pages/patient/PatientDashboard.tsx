import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/use-toast";

interface DoseEntry {
    id: string;
    time: string;
    label: string;
    icon: string;
    medications: { name: string; dosage: string }[];
    taken: boolean;
}

const defaultDoses: DoseEntry[] = [
    { id: "morning", time: "8:00 AM", label: "Morning Pouch", icon: "wb_sunny", medications: [{ name: "Metformin", dosage: "500mg • 1 Tablet" }, { name: "Amlodipine", dosage: "5mg • 1 Tablet" }], taken: false },
    { id: "afternoon", time: "1:00 PM", label: "Afternoon Pouch", icon: "wb_sunny", medications: [{ name: "Glimepiride", dosage: "2mg • 1 Tablet" }], taken: false },
    { id: "night", time: "9:00 PM", label: "Night Pouch", icon: "dark_mode", medications: [{ name: "Atorvastatin", dosage: "10mg • 1 Tablet" }], taken: false },
];

export default function PatientDashboard() {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const todayKey = new Date().toISOString().slice(0, 10);
    const [doses, setDoses] = useLocalStorage<DoseEntry[]>(`gp_doses_${todayKey}`, defaultDoses);
    const [weekLog] = useLocalStorage<Record<string, number>>("gp_weekly_adherence", {
        Mon: 100, Tue: 100, Wed: 67, Thu: 100, Fri: 33, Sat: 0, Sun: 0,
    });

    const lastName = profile?.full_name?.split(" ").pop() || "User";
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
    const takenCount = doses.filter(d => d.taken).length;
    const adherence = doses.length > 0 ? Math.round((takenCount / doses.length) * 100) : 0;

    const markTaken = (id: string) => {
        setDoses(prev => prev.map(d => d.id === id ? { ...d, taken: true } : d));
        toast({ title: "Dose marked as taken ✓", description: "Great job staying on track!" });
    };

    const nextDose = doses.find(d => !d.taken);
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div>
            {/* Welcome */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <p className="text-muted-foreground text-sm md:text-base font-medium mb-0.5">{dateStr}</p>
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                        Namaste, {lastName}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm md:text-base">
                        {takenCount === doses.length ? "All doses taken today! 🎉" : `${doses.length - takenCount} dose${doses.length - takenCount > 1 ? "s" : ""} remaining today.`}
                    </p>
                </div>
                {/* Adherence ring */}
                <div className="flex items-center gap-4 bg-white p-3 md:p-4 rounded-xl shadow-soft border border-border">
                    <div className="relative w-14 h-14">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" strokeLinecap="round" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${adherence}, 100`} />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-foreground">{adherence}%</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-foreground font-bold text-base block">Today</span>
                        <span className="text-sm text-muted-foreground">{takenCount}/{doses.length} doses</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8">
                {/* Left Column */}
                <div className="lg:col-span-7 flex flex-col gap-5 md:gap-6">
                    {/* Next Dose or All Done */}
                    {nextDose ? (
                        <section className="bg-white rounded-2xl shadow-soft border border-border overflow-hidden">
                            <div className="bg-primary/5 p-4 md:p-5 border-b border-border flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-100 text-orange-600 p-2.5 rounded-full">
                                        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{nextDose.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl md:text-2xl font-bold text-foreground">{nextDose.time}</h4>
                                        <p className="text-muted-foreground font-medium text-sm">{nextDose.label}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => markTaken(nextDose.id)}
                                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm"
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>
                                    Mark as Taken
                                </button>
                            </div>
                            <div className="p-4 md:p-5">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Inside this pouch</p>
                                <div className="space-y-3">
                                    {nextDose.medications.map((med, i) => (
                                        <div key={med.name} className={`flex items-center gap-3 ${i > 0 ? "border-t border-border/50 pt-3" : ""}`}>
                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>medication</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-foreground">{med.name}</p>
                                                <p className="text-muted-foreground text-sm">{med.dosage}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ) : (
                        <section className="bg-white rounded-2xl shadow-soft border border-border p-6 text-center">
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined text-green-600" style={{ fontSize: 32 }}>check_circle</span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-1">All Doses Taken! 🎉</h3>
                            <p className="text-muted-foreground text-sm">You've completed all your medications for today. Great work!</p>
                        </section>
                    )}

                    {/* Today's Schedule */}
                    <section className="bg-white rounded-2xl shadow-soft border border-border p-4 md:p-5">
                        <h3 className="text-base md:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>schedule</span>
                            Today's Schedule
                        </h3>
                        <div className="space-y-0">
                            {doses.map((dose, i) => (
                                <div key={dose.id} className={`flex items-center gap-3 py-3 ${i > 0 ? "border-t border-border/50" : ""}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${dose.taken ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                                            {dose.taken ? "check_circle" : dose.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-semibold text-sm ${dose.taken ? "text-muted-foreground line-through" : "text-foreground"}`}>{dose.label}</p>
                                        <p className="text-xs text-muted-foreground">{dose.time} • {dose.medications.length} medication{dose.medications.length > 1 ? "s" : ""}</p>
                                    </div>
                                    {dose.taken ? (
                                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Taken</span>
                                    ) : (
                                        <button
                                            onClick={() => markTaken(dose.id)}
                                            className="text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
                                        >
                                            Take Now
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Weekly Adherence */}
                    <section className="bg-white rounded-2xl shadow-soft border border-border p-4 md:p-5">
                        <h3 className="text-base md:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>bar_chart</span>
                            Weekly Adherence
                        </h3>
                        <div className="flex items-end justify-between gap-1">
                            {weekDays.map((day) => {
                                const pct = weekLog[day] ?? 0;
                                const isToday = day === weekDays[today.getDay() === 0 ? 6 : today.getDay() - 1];
                                return (
                                    <div key={day} className="flex flex-col items-center gap-1.5 flex-1">
                                        <div className="w-full max-w-[32px] h-20 bg-muted rounded-lg relative overflow-hidden">
                                            <div
                                                className={`absolute bottom-0 left-0 right-0 rounded-lg transition-all ${pct >= 80 ? "bg-green-400" : pct >= 50 ? "bg-amber-400" : pct > 0 ? "bg-red-400" : "bg-muted"}`}
                                                style={{ height: `${Math.max(pct, 4)}%` }}
                                            />
                                        </div>
                                        <span className={`text-xs font-medium ${isToday ? "text-primary font-bold" : "text-muted-foreground"}`}>{day}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">
                    {/* Quick Actions */}
                    <section>
                        <h3 className="text-base md:text-lg font-bold text-foreground mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => navigate("/patient/upload")}
                                className="bg-white p-4 rounded-xl shadow-soft border border-border flex flex-col items-center gap-2 hover:border-primary transition-all group text-center"
                            >
                                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>add_a_photo</span>
                                </div>
                                <span className="text-sm font-semibold text-foreground">Upload Rx</span>
                            </button>
                            <button
                                onClick={() => navigate("/patient/orders")}
                                className="bg-white p-4 rounded-xl shadow-soft border border-border flex flex-col items-center gap-2 hover:border-primary transition-all group text-center"
                            >
                                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>local_shipping</span>
                                </div>
                                <span className="text-sm font-semibold text-foreground">My Orders</span>
                            </button>
                            <button
                                onClick={() => navigate("/patient/meds")}
                                className="bg-white p-4 rounded-xl shadow-soft border border-border flex flex-col items-center gap-2 hover:border-primary transition-all group text-center"
                            >
                                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>medication</span>
                                </div>
                                <span className="text-sm font-semibold text-foreground">My Meds</span>
                            </button>
                            <button
                                onClick={() => navigate("/patient/reminders")}
                                className="bg-white p-4 rounded-xl shadow-soft border border-border flex flex-col items-center gap-2 hover:border-primary transition-all group text-center"
                            >
                                <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>alarm</span>
                                </div>
                                <span className="text-sm font-semibold text-foreground">Reminders</span>
                            </button>
                        </div>
                    </section>

                    {/* Active Order */}
                    <section className="bg-white p-4 md:p-5 rounded-xl shadow-soft border border-border">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-bold text-foreground">Active Order</h3>
                            <button onClick={() => navigate("/patient/orders")} className="text-primary text-xs font-semibold hover:underline">View All</button>
                        </div>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Order #GP-9021</p>
                                <p className="font-bold text-foreground mt-0.5">Monthly Refill Pack</p>
                            </div>
                            <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">IN TRANSIT</span>
                        </div>
                        <div className="relative py-1">
                            <div className="absolute left-2.5 top-1 bottom-1 w-0.5 bg-border" />
                            {[
                                { label: "Order Confirmed", time: "Oct 22, 10:30 AM", done: true },
                                { label: "Packed & Shipped", time: "Oct 23, 04:15 PM", done: true },
                                { label: "Out for Delivery", time: "Expected by 6 PM Today", active: true },
                            ].map((step) => (
                                <div key={step.label} className="flex gap-3 items-start mb-4 last:mb-0 relative">
                                    <div className={`z-10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 border-white ${step.done ? "bg-green-500" : step.active ? "bg-primary ring-3 ring-blue-50" : "bg-muted"}`}>
                                        {step.done ? <span className="material-symbols-outlined text-white" style={{ fontSize: 12 }}>check</span> : step.active ? <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> : null}
                                    </div>
                                    <div>
                                        <p className={`text-sm ${step.active ? "font-bold text-primary" : "font-medium text-foreground"}`}>{step.label}</p>
                                        <p className="text-xs text-muted-foreground">{step.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Health Tip */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-5 rounded-xl border border-emerald-100">
                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2 inline-block">DAILY TIP</span>
                        <h4 className="font-bold text-foreground mb-1">Stay Hydrated</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Drinking a full glass of water with your morning pouch helps absorption. Aim for 8 glasses today!
                        </p>
                    </div>

                    {/* Support */}
                    <div className="bg-primary text-white rounded-xl p-4 md:p-5 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-bold mb-1">Need help?</h4>
                            <p className="text-blue-100 text-sm mb-3">Call our support line — Hindi & English.</p>
                            <a href="tel:1800-123-4567" className="inline-flex items-center gap-1.5 bg-white text-primary px-3 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>call</span>
                                1800-123-4567
                            </a>
                        </div>
                        <div className="absolute -right-4 -bottom-6 opacity-15">
                            <span className="material-symbols-outlined" style={{ fontSize: 100 }}>support_agent</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
