import { useState } from "react";

interface DoseTime { label: string; desc: string; time: string; icon: string; enabled: boolean; color: string; }

export default function RemindersPage() {
    const [doses, setDoses] = useState<DoseTime[]>([
        { label: "Morning Dose", desc: "Usually taken with breakfast", time: "08:00", icon: "wb_sunny", enabled: true, color: "text-amber-500 bg-amber-100" },
        { label: "Afternoon Dose", desc: "Usually taken after lunch", time: "13:00", icon: "wb_sunny", enabled: true, color: "text-orange-500 bg-orange-100" },
        { label: "Evening Dose", desc: "Usually taken with dinner", time: "18:00", icon: "wb_twilight", enabled: false, color: "text-indigo-400 bg-indigo-100" },
        { label: "Night Dose", desc: "Before going to bed", time: "21:00", icon: "dark_mode", enabled: true, color: "text-blue-600 bg-blue-100" },
    ]);
    const [language, setLanguage] = useState("English");
    const [reminderType, setReminderType] = useState("push");
    const [saved, setSaved] = useState(false);

    const toggleDose = (i: number) => {
        setDoses((prev) => prev.map((d, idx) => idx === i ? { ...d, enabled: !d.enabled } : d));
        setSaved(false);
    };

    const updateTime = (i: number, time: string) => {
        setDoses((prev) => prev.map((d, idx) => idx === i ? { ...d, time } : d));
        setSaved(false);
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-border p-5 md:p-6 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Reminder Settings</h1>
                <p className="text-muted-foreground mt-1">Customize how and when you receive medication alerts to stay on track.</p>
            </div>

            {/* Daily Schedule */}
            <div className="bg-white rounded-2xl border border-border p-5 md:p-6 mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-5">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>schedule</span>
                    Daily Schedule
                </h3>
                <div className="space-y-0">
                    {doses.map((dose, i) => (
                        <div key={dose.label} className={`flex items-center gap-3 md:gap-4 py-4 ${i > 0 ? "border-t border-border" : ""}`}>
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${dose.color} flex items-center justify-center shrink-0`}>
                                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{dose.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-foreground">{dose.label}</p>
                                <p className="text-sm text-muted-foreground">{dose.desc}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                                <div className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-2">
                                    <input
                                        type="time"
                                        value={dose.time}
                                        onChange={(e) => updateTime(i, e.target.value)}
                                        className="bg-transparent text-foreground font-medium text-sm w-[70px] outline-none"
                                    />
                                    <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 16 }}>schedule</span>
                                </div>
                                {/* Toggle */}
                                <button
                                    onClick={() => toggleDose(i)}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${dose.enabled ? "bg-primary" : "bg-muted"}`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all ${dose.enabled ? "left-[22px]" : "left-0.5"}`} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Alert Language & Reminder Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {/* Language */}
                <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>translate</span>
                        Alert Language
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">Select your preferred language</p>
                    <select
                        value={language}
                        onChange={(e) => { setLanguage(e.target.value); setSaved(false); }}
                        className="w-full border border-border rounded-xl px-4 py-3 bg-white text-foreground font-medium text-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_12px] pr-10"
                    >
                        <option>English</option>
                        <option>Hindi (हिंदी)</option>
                        <option>Tamil (தமிழ்)</option>
                        <option>Telugu (తెలుగు)</option>
                        <option>Marathi (मराठी)</option>
                    </select>
                    <div className="mt-3 bg-blue-50 text-primary text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1.5">
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>info</span>
                        All SMS and Voice calls will be made in this language.
                    </div>
                </div>

                {/* Reminder Type */}
                <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>notifications_active</span>
                        Reminder Type
                    </h3>
                    <div className="space-y-3">
                        {[
                            { id: "push", label: "Push Notification", desc: "App alert on device", icon: "notifications" },
                            { id: "sms", label: "SMS Message", desc: "Text to mobile number", icon: "sms" },
                            { id: "voice", label: "Voice Call", desc: "Automated phone call", icon: "call" },
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => { setReminderType(type.id); setSaved(false); }}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${reminderType === type.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/30"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 22 }}>{type.icon}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-foreground text-sm">{type.label}</p>
                                    <p className="text-xs text-muted-foreground">{type.desc}</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${reminderType === type.id ? "border-primary" : "border-muted-foreground/30"
                                    }`}>
                                    {reminderType === type.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={() => setSaved(true)}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md"
            >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>save</span>
                {saved ? "Preferences Saved ✓" : "Save Preferences"}
            </button>
            <p className="text-center text-sm text-muted-foreground mt-3">Changes will apply to your next scheduled dose.</p>
        </div>
    );
}
