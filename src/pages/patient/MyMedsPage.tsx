import { useState } from "react";

interface Med {
    name: string;
    tag: string;
    purpose: string;
    note: string;
    morning: boolean;
    afternoon: boolean;
    night: boolean;
    dosage: string;
}

const activeMeds: Med[] = [
    { name: "Metformin 500mg", tag: "GENERIC", purpose: "Diabetes (Blood Sugar Control)", note: "Take after food", morning: true, afternoon: false, night: true, dosage: "1 Tablet" },
    { name: "Amlodipine 5mg", tag: "GENERIC", purpose: "Hypertension (Blood Pressure)", note: "Branded as Amlong", morning: true, afternoon: false, night: false, dosage: "1 Tablet" },
    { name: "Atorvastatin 10mg", tag: "GENERIC", purpose: "Cholesterol (Heart Health)", note: "Take at bedtime", morning: false, afternoon: false, night: true, dosage: "1 Tablet" },
];

const pastMeds: Med[] = [
    { name: "Amoxicillin 500mg", tag: "ANTIBIOTIC", purpose: "Infection (Completed Course)", note: "7-day course completed", morning: true, afternoon: true, night: true, dosage: "1 Capsule" },
];

export default function MyMedsPage() {
    const [showPast, setShowPast] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = activeMeds.filter(m =>
        !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.purpose.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8">
                {/* Left */}
                <div className="lg:col-span-7 space-y-5">
                    {/* Status */}
                    <div className="bg-white rounded-xl border border-border p-4 md:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-foreground">My Medications</h2>
                                <p className="text-muted-foreground text-sm mt-0.5">Your current active prescriptions.</p>
                            </div>
                            <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                                <span className="material-symbols-outlined text-green-600" style={{ fontSize: 18 }}>calendar_today</span>
                                <div>
                                    <p className="text-[10px] text-green-600 font-bold uppercase">Pack Status</p>
                                    <p className="text-sm font-bold text-green-700">12 Days Left</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: 18 }}>search</span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search medications..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                    </div>

                    {/* Active Meds */}
                    <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <h3 className="text-base font-bold text-foreground">Active Medicines ({filtered.length})</h3>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Morning</span>
                                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Afternoon</span>
                                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Night</span>
                            </div>
                        </div>
                        <div className="space-y-2.5">
                            {filtered.map((med) => (
                                <div key={med.name} className="bg-white rounded-xl border border-border p-3.5 md:p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>medication</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="font-bold text-foreground text-sm md:text-base">{med.name}</p>
                                            <span className="bg-muted text-muted-foreground text-[9px] font-bold px-1.5 py-0.5 rounded">{med.tag}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{med.purpose}</p>
                                        <p className="text-[11px] text-primary italic">{med.note} • {med.dosage}</p>
                                    </div>
                                    <div className="flex items-center gap-2.5 shrink-0">
                                        <div className="flex flex-col items-center gap-0.5">
                                            <span className="material-symbols-outlined text-amber-400" style={{ fontSize: 14 }}>wb_sunny</span>
                                            <span className={`w-2 h-2 rounded-full ${med.morning ? "bg-amber-400" : "bg-muted"}`} />
                                        </div>
                                        <div className="flex flex-col items-center gap-0.5">
                                            <span className="material-symbols-outlined text-orange-400" style={{ fontSize: 14 }}>wb_twilight</span>
                                            <span className={`w-2 h-2 rounded-full ${med.afternoon ? "bg-orange-400" : "bg-muted"}`} />
                                        </div>
                                        <div className="flex flex-col items-center gap-0.5">
                                            <span className="material-symbols-outlined text-indigo-500" style={{ fontSize: 14 }}>dark_mode</span>
                                            <span className={`w-2 h-2 rounded-full ${med.night ? "bg-indigo-500" : "bg-muted"}`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Past meds toggle */}
                        <button
                            onClick={() => setShowPast(!showPast)}
                            className="mt-3 w-full bg-white border border-border border-dashed rounded-xl py-3 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-medium flex items-center justify-center gap-1.5 text-sm"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{showPast ? "expand_less" : "expand_more"}</span>
                            {showPast ? "Hide" : "View"} Past Medications ({pastMeds.length})
                        </button>

                        {showPast && (
                            <div className="mt-2.5 space-y-2.5">
                                {pastMeds.map((med) => (
                                    <div key={med.name} className="bg-white rounded-xl border border-border p-3.5 md:p-4 flex items-center gap-3 opacity-60">
                                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 20 }}>medication</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-bold text-foreground text-sm">{med.name}</p>
                                                <span className="bg-muted text-muted-foreground text-[9px] font-bold px-1.5 py-0.5 rounded">{med.tag}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{med.purpose}</p>
                                            <p className="text-[11px] text-muted-foreground italic">{med.note}</p>
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">COMPLETED</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right */}
                <div className="lg:col-span-5 space-y-5">
                    {/* Refill */}
                    <div className="bg-white rounded-xl border border-border p-4 md:p-5">
                        <h3 className="font-bold text-foreground mb-2">Need a Refill?</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Your pack ends on <strong className="text-foreground">Oct 25</strong>. Request a refill now.
                        </p>
                        <button className="w-full bg-primary text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>restart_alt</span>
                            Request Refill Pack
                        </button>
                    </div>

                    {/* Pack Summary */}
                    <div className="bg-white rounded-xl border border-border p-4 md:p-5">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Pack Summary</p>
                        <div className="space-y-3">
                            {[
                                { label: "Total Medicines", value: String(activeMeds.length) },
                                { label: "Dosage Frequency", value: "2x Daily" },
                                { label: "Next Delivery", value: "Pending Request", highlight: true },
                            ].map(item => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <span className="text-muted-foreground text-sm">{item.label}</span>
                                    <span className={`font-bold text-sm ${item.highlight ? "text-primary" : "text-foreground"}`}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pharmacy Partner */}
                    <div className="bg-white rounded-xl border border-border p-4 md:p-5">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Your Local Partner</p>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 20 }}>store</span>
                            </div>
                            <div>
                                <p className="font-bold text-foreground text-sm">GenPharma Andheri West</p>
                                <p className="text-xs text-muted-foreground">License #MH-WZ-2024</p>
                            </div>
                        </div>
                        <button className="w-full py-2 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors flex items-center justify-center gap-1.5">
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>call</span>
                            Call Partner
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
