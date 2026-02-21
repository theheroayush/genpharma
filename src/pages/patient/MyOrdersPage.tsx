import { useNavigate } from "react-router-dom";

export default function MyOrdersPage() {
    const navigate = useNavigate();

    return (
        <div>
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6 md:mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">ACTIVE ORDER</span>
                        <span className="text-muted-foreground text-sm">Order #MP-2023-8921</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Track Your Medicine Pack</h1>
                    <p className="text-muted-foreground mt-1">Estimated Delivery: <strong className="text-foreground">Oct 24, 2023</strong> by 6:00 PM</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white text-foreground font-medium text-sm hover:bg-muted transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>receipt_long</span>
                        View Invoice
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>call</span>
                        Call for Help
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                {/* Left column */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Pack Info */}
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                        {[
                            { icon: "local_pharmacy", label: "Pack Type", value: "Diabetes Care" },
                            { icon: "calendar_month", label: "Duration", value: "30 Days Supply" },
                            { icon: "update", label: "Next Refill", value: "Nov 20" },
                        ].map((item) => (
                            <div key={item.label} className="bg-white rounded-2xl border border-border p-4 md:p-5">
                                <span className="material-symbols-outlined text-primary mb-2 block" style={{ fontSize: 24 }}>{item.icon}</span>
                                <p className="text-xs text-muted-foreground">{item.label}</p>
                                <p className="font-bold text-foreground text-sm md:text-base mt-0.5">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Delivery Status Timeline */}
                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                        <h3 className="text-lg font-bold text-foreground mb-1">Delivery Status</h3>
                        <p className="text-sm text-muted-foreground mb-6">Real-time updates on your medicine pack journey</p>
                        <div className="relative">
                            <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-border" />
                            {/* Step 1: Completed */}
                            <div className="flex gap-4 items-start mb-8 relative">
                                <div className="z-10 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0 border-2 border-white">
                                    <span className="material-symbols-outlined text-white" style={{ fontSize: 16 }}>check</span>
                                </div>
                                <div className="flex-1 flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold text-foreground">Prescription Verified</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Verified by Dr. Sharma at 10:30 AM, Oct 22</p>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full hidden sm:block">COMPLETED</span>
                                </div>
                            </div>
                            {/* Step 2: In Progress */}
                            <div className="flex gap-4 items-start mb-8 relative">
                                <div className="z-10 w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 ring-4 ring-blue-50">
                                    <span className="material-symbols-outlined text-white" style={{ fontSize: 16 }}>package_2</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-bold text-primary">Pouch Assembly</p>
                                            <p className="text-sm text-muted-foreground mt-1">We are currently sorting your medicines into convenient pouches for Morning, Afternoon, and Night doses.</p>
                                        </div>
                                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full hidden sm:block whitespace-nowrap ml-2">IN PROGRESS</span>
                                    </div>
                                    <div className="mt-3">
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: "65%" }} />
                                        </div>
                                        <p className="text-xs text-primary font-semibold mt-1 text-right">65% Done</p>
                                    </div>
                                </div>
                            </div>
                            {/* Step 3: Pending */}
                            <div className="flex gap-4 items-start mb-8 relative opacity-50">
                                <div className="z-10 w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 16 }}>verified</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-muted-foreground">Quality Check</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Final pharmacist review to ensure safety and accuracy.</p>
                                </div>
                            </div>
                            {/* Step 4: Pending */}
                            <div className="flex gap-4 items-start relative opacity-50">
                                <div className="z-10 w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 16 }}>local_shipping</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-muted-foreground">Out for Delivery</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Scheduled for tomorrow via local partner.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What's Inside */}
                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-foreground">What's Inside Your Pack?</h3>
                            <button className="text-primary text-sm font-semibold hover:underline">View Full Prescription</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-xl">
                                <span className="text-xl">🌅</span>
                                <div>
                                    <p className="font-bold text-foreground text-sm">Morning Pouch</p>
                                    <p className="text-xs text-muted-foreground">Metformin 500mg, Amlodipine 5mg</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-xl">
                                <span className="text-xl">🌙</span>
                                <div>
                                    <p className="font-bold text-foreground text-sm">Night Pouch</p>
                                    <p className="text-xs text-muted-foreground">Atorvastatin 10mg</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Delivery Partner */}
                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Your Delivery Partner</p>
                            <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>verified</span>
                        </div>
                        <div className="text-center mb-4">
                            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3 relative">
                                <span className="material-symbols-outlined text-primary" style={{ fontSize: 36 }}>person</span>
                                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white" style={{ fontSize: 12 }}>check</span>
                                </div>
                            </div>
                            <p className="font-bold text-foreground text-lg">Sunita Devi</p>
                            <p className="text-sm text-muted-foreground">ASHA Worker • Verified Partner</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors flex items-center justify-center gap-1.5">
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chat</span> Message
                            </button>
                            <button className="py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors flex items-center justify-center gap-1.5">
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>call</span> Call
                            </button>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-foreground">Delivery Address</h3>
                            <button className="text-primary text-sm font-semibold hover:underline">Edit</button>
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            <span className="material-symbols-outlined text-muted-foreground mt-0.5" style={{ fontSize: 20 }}>location_on</span>
                            <div>
                                <p className="font-bold text-foreground text-sm">Home</p>
                                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                                    Flat 402, Krishna Residency,<br />
                                    Sector 14, Near City Hospital,<br />
                                    Gurgaon, Haryana, 122001
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">Phone: +91 98765 43210</p>
                            </div>
                        </div>
                        <div className="bg-muted rounded-xl h-32 flex items-center justify-center">
                            <button className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg shadow-sm text-sm font-medium text-foreground hover:bg-muted transition-colors">
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>map</span>
                                View on Map
                            </button>
                        </div>
                    </div>

                    {/* Need Help */}
                    <div className="bg-primary text-white rounded-2xl p-5 md:p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                                <span className="material-symbols-outlined" style={{ fontSize: 24 }}>headphones</span>
                            </div>
                            <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                            <p className="text-blue-100 text-sm mb-4">Questions about your dosage or delivery? Our pharmacists are available 24/7.</p>
                            <button className="bg-white text-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>call</span>
                                Call Pharmacy Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
