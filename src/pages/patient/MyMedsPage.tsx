import { useAuth } from "@/hooks/useAuth";

export default function MyMedsPage() {
    const { profile } = useAuth();
    const lastName = profile?.full_name?.split(" ").pop() || "User";

    const meds = [
        { name: "Metformin 500mg", tag: "GENERIC", purpose: "For Diabetes (Blood Sugar Control)", note: "Take after food", morning: true, afternoon: false, night: true },
        { name: "Amlodipine 5mg", tag: "GENERIC", purpose: "For Hypertension (Blood Pressure)", note: "Often branded as Amlong", morning: true, afternoon: false, night: false },
        { name: "Atorvastatin 10mg", tag: "GENERIC", purpose: "For Cholesterol (Heart Health)", note: "Take at bedtime", morning: false, afternoon: false, night: true },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                {/* Left Column */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Status Card */}
                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Namaste, Mrs. {lastName}</h2>
                            <p className="text-muted-foreground mt-1">Your current pack is active.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-green-50 border border-green-200 px-4 py-3 rounded-xl">
                            <span className="material-symbols-outlined text-green-600" style={{ fontSize: 22 }}>calendar_today</span>
                            <div>
                                <p className="text-xs text-green-600 font-bold uppercase">Status</p>
                                <p className="text-lg font-bold text-green-700">12 Days Remaining</p>
                            </div>
                        </div>
                    </div>

                    {/* Active Medicines */}
                    <div>
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <h3 className="text-lg md:text-xl font-bold text-foreground">Active Medicines</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">Pouch Legend:</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-400" /> Morning</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-400" /> Afternoon</span>
                                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-indigo-500" /> Night</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {meds.map((med) => (
                                <div key={med.name} className="bg-white rounded-2xl border border-border p-4 md:p-5 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary" style={{ fontSize: 24 }}>medication</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="text-base md:text-lg font-bold text-foreground">{med.name}</p>
                                            <span className="bg-muted text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded uppercase">{med.tag}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{med.purpose}</p>
                                        <p className="text-xs text-primary italic mt-0.5">{med.note}</p>
                                    </div>
                                    {/* Pouch dots */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        {/* Morning */}
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="material-symbols-outlined text-amber-400" style={{ fontSize: 18 }}>wb_sunny</span>
                                            <span className={`w-2.5 h-2.5 rounded-full ${med.morning ? "bg-amber-400" : "bg-muted"}`} />
                                        </div>
                                        {/* Afternoon */}
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="material-symbols-outlined text-orange-400" style={{ fontSize: 18 }}>wb_twilight</span>
                                            <span className={`w-2.5 h-2.5 rounded-full ${med.afternoon ? "bg-orange-400" : "bg-muted"}`} />
                                        </div>
                                        {/* Night */}
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="material-symbols-outlined text-indigo-500" style={{ fontSize: 18 }}>dark_mode</span>
                                            <span className={`w-2.5 h-2.5 rounded-full ${med.night ? "bg-indigo-500" : "bg-muted"}`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 w-full bg-white border border-border border-dashed rounded-2xl py-4 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-medium flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add_circle</span>
                            Review Past Medications
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Need a Refill */}
                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6 relative overflow-hidden">
                        <h3 className="text-xl font-bold text-foreground mb-2">Need a Refill?</h3>
                        <p className="text-muted-foreground text-sm mb-5">
                            Your pack ends on <strong className="text-foreground">Oct 25</strong>. Request a refill now to ensure your local partner prepares your pouches on time.
                        </p>
                        <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>restart_alt</span>
                            Request Refill Pack
                        </button>
                    </div>

                    {/* Pack Summary */}
                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-4">Pack Summary</p>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Total Medicines</span>
                                <span className="font-bold text-foreground">3</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Dosage Frequency</span>
                                <span className="font-bold text-foreground">2x Daily</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Next Delivery</span>
                                <span className="font-bold text-primary">Pending Request</span>
                            </div>
                        </div>
                    </div>

                    {/* Local Partner */}
                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-4">Your Local Partner</p>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 22 }}>store</span>
                            </div>
                            <div>
                                <p className="font-bold text-foreground">GenPharma Andheri West</p>
                                <p className="text-xs text-muted-foreground">License #MH-WZ-2024</p>
                            </div>
                        </div>
                        <button className="w-full py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>call</span>
                            Call Partner
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
