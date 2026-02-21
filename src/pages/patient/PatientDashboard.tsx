import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const lastName = profile?.full_name?.split(" ").pop() || "User";
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

    return (
        <div>
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 md:mb-10">
                <div>
                    <p className="text-muted-foreground text-base md:text-lg font-medium mb-1">{dateStr}</p>
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                        Namaste, Mr. {lastName}
                    </h2>
                    <p className="text-muted-foreground mt-2 text-base md:text-lg max-w-2xl">
                        Here is your daily health overview. You are doing great with your schedule!
                    </p>
                </div>
                {/* Daily Adherence */}
                <div className="flex items-center gap-5 bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-border min-w-[260px]">
                    <div className="relative w-16 h-16">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" strokeLinecap="round" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeDasharray="85, 100" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-foreground">85%</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-foreground font-bold text-lg block">Daily Adherence</span>
                        <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>trending_up</span>
                            +2% from last week
                        </span>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                {/* Left Column */}
                <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
                    {/* Next Scheduled Dose */}
                    <section>
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: 24 }}>medication_liquid</span>
                            Next Scheduled Dose
                        </h3>
                        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                            <div className="bg-primary/5 p-4 md:p-6 border-b border-border flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="bg-orange-100 text-orange-600 p-2.5 md:p-3 rounded-full">
                                        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>wb_sunny</span>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl md:text-3xl font-bold text-foreground">8:00 AM</h4>
                                        <p className="text-muted-foreground font-medium text-sm">Morning Pouch • With Breakfast</p>
                                    </div>
                                </div>
                                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 text-sm md:text-base">
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>check_circle</span>
                                    Mark as Taken
                                </button>
                            </div>
                            <div className="p-4 md:p-6">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">Inside this pouch</p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>medication</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-base md:text-lg font-bold text-foreground">Metformin</p>
                                            <p className="text-muted-foreground text-sm">500mg • 1 Tablet</p>
                                        </div>
                                        <span className="material-symbols-outlined text-muted-foreground/30" style={{ fontSize: 20 }}>pill</span>
                                    </div>
                                    <div className="flex items-center gap-3 md:gap-4 border-t border-border/50 pt-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted flex items-center justify-center">
                                            <span className="material-symbols-outlined text-orange-500" style={{ fontSize: 22 }}>medication</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-base md:text-lg font-bold text-foreground">Amlodipine</p>
                                            <p className="text-muted-foreground text-sm">5mg • 1 Tablet</p>
                                        </div>
                                        <span className="material-symbols-outlined text-muted-foreground/30" style={{ fontSize: 20 }}>pill</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Health Tips */}
                    <section>
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">Health Tips for You</h3>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 md:p-6 rounded-2xl border border-emerald-100 flex flex-col md:flex-row gap-4 md:gap-6 items-center">
                            <div className="flex-1">
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">DAILY TIP</span>
                                <h4 className="text-lg md:text-xl font-bold text-foreground mb-2">Stay Hydrated with Generic Meds</h4>
                                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                    Drinking a full glass of water with your morning pouch helps absorption and prevents stomach upset. Aim for 8 glasses today!
                                </p>
                            </div>
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                                <span className="material-symbols-outlined text-emerald-500" style={{ fontSize: 40 }}>water_drop</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
                    {/* Quick Actions */}
                    <section>
                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-3 md:gap-4">
                            <button
                                onClick={() => navigate("/patient/upload")}
                                className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4 md:gap-5 hover:border-primary transition-all group text-left"
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: 28 }}>add_a_photo</span>
                                </div>
                                <div className="flex-1">
                                    <span className="block text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors">Upload New Prescription</span>
                                    <span className="text-muted-foreground text-sm">Scan or upload photo</span>
                                </div>
                                <span className="material-symbols-outlined text-muted-foreground/30 group-hover:text-primary" style={{ fontSize: 20 }}>arrow_forward_ios</span>
                            </button>
                            <button className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-border flex items-center gap-4 md:gap-5 hover:border-orange-400 transition-all group text-left">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: 28 }}>restart_alt</span>
                                </div>
                                <div className="flex-1">
                                    <span className="block text-base md:text-lg font-bold text-foreground group-hover:text-orange-500 transition-colors">Request Refill</span>
                                    <span className="text-muted-foreground text-sm">For existing medicines</span>
                                </div>
                                <span className="material-symbols-outlined text-muted-foreground/30 group-hover:text-orange-500" style={{ fontSize: 20 }}>arrow_forward_ios</span>
                            </button>
                        </div>
                    </section>

                    {/* Active Order */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg md:text-xl font-bold text-foreground">Active Order</h3>
                            <button onClick={() => navigate("/patient/orders")} className="text-primary text-sm font-semibold hover:underline">View History</button>
                        </div>
                        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-border">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Order #GP-9021</p>
                                    <p className="text-base md:text-lg font-bold text-foreground mt-1">Monthly Refill Pack</p>
                                </div>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">IN TRANSIT</span>
                            </div>
                            {/* Timeline */}
                            <div className="relative py-2">
                                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-border" />
                                <div className="flex gap-3 md:gap-4 items-start mb-5 md:mb-6 relative">
                                    <div className="z-10 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 border-2 border-white">
                                        <span className="material-symbols-outlined text-white" style={{ fontSize: 14 }}>check</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Order Confirmed</p>
                                        <p className="text-xs text-muted-foreground">Oct 22, 10:30 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 md:gap-4 items-start mb-5 md:mb-6 relative">
                                    <div className="z-10 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 border-2 border-white">
                                        <span className="material-symbols-outlined text-white" style={{ fontSize: 14 }}>check</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Packed &amp; Shipped</p>
                                        <p className="text-xs text-muted-foreground">Oct 23, 04:15 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 md:gap-4 items-start relative">
                                    <div className="z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 ring-4 ring-blue-50">
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary">Out for Delivery</p>
                                        <p className="text-xs text-muted-foreground">Expected by 6 PM Today</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-6 pt-4 border-t border-border flex gap-3">
                                <button className="flex-1 py-2.5 px-4 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">Track on Map</button>
                                <button className="flex-1 py-2.5 px-4 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">Support</button>
                            </div>
                        </div>
                    </section>

                    {/* Support Banner */}
                    <div className="bg-primary text-white rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-bold text-lg mb-2">Need help ordering?</h4>
                            <p className="text-blue-100 text-sm mb-4 max-w-[80%]">Call our dedicated support line for seniors. We speak Hindi and English.</p>
                            <a href="tel:1800-123-4567" className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>call</span>
                                1800-123-4567
                            </a>
                        </div>
                        <div className="absolute -right-6 -bottom-8 opacity-20">
                            <span className="material-symbols-outlined" style={{ fontSize: 130 }}>support_agent</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
