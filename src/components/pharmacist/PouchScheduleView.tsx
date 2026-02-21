import { useMemo, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Printer, Calendar } from "lucide-react";
import type { Prescription, DaySchedule, TimeSlot } from "@/types";

interface Props {
    open: boolean;
    onClose: () => void;
    prescription: Prescription | null;
    readOnly?: boolean;
}

const slotOrder: TimeSlot[] = ["morning", "afternoon", "evening", "night"];
const slotLabels: Record<TimeSlot, { label: string; emoji: string; time: string }> = {
    morning: { label: "Morning", emoji: "🌅", time: "8:00 AM" },
    afternoon: { label: "Afternoon", emoji: "☀️", time: "1:00 PM" },
    evening: { label: "Evening", emoji: "🌇", time: "6:00 PM" },
    night: { label: "Night", emoji: "🌙", time: "10:00 PM" },
};

function generateSchedule(prescription: Prescription): DaySchedule[] {
    const days: DaySchedule[] = [];
    const startDate = new Date();
    const maxDays = Math.min(7, Math.max(...prescription.medications.map((m) => m.duration)));

    for (let i = 0; i < maxDays; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const day: DaySchedule = {
            date: date.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" }),
            morning: [],
            afternoon: [],
            evening: [],
            night: [],
        };

        for (const med of prescription.medications) {
            if (i < med.duration) {
                for (const slot of med.timeSlots) {
                    day[slot].push({ drugName: med.drugName, dosage: med.dosage });
                }
            }
        }
        days.push(day);
    }
    return days;
}

export function PouchScheduleView({ open, onClose, prescription }: Props) {
    const printRef = useRef<HTMLDivElement>(null);
    const schedule = useMemo(() => (prescription ? generateSchedule(prescription) : []), [prescription]);

    const handlePrint = () => {
        if (!printRef.current) return;
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;
        printWindow.document.write(`
      <html><head><title>Labels — ${prescription?.patientName}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 20px; }
        .label { border: 2px solid #333; border-radius: 8px; padding: 12px; margin: 8px; page-break-inside: avoid; width: 280px; display: inline-block; font-size: 12px; }
        .label h3 { margin: 0 0 6px; font-size: 14px; }
        .label .patient { font-weight: bold; font-size: 13px; color: #1a5632; }
        .label .time { color: #555; font-style: italic; }
        .label .meds { margin: 6px 0; }
        .label .med { padding: 2px 0; border-bottom: 1px dotted #ccc; }
        .qr { width: 50px; height: 50px; border: 1px solid #ccc; display: inline-block; text-align: center; font-size: 8px; line-height: 50px; }
        @media print { body { padding: 0; } .label { border-width: 1px; } }
      </style></head><body>
      <h2>GenPharma — Medication Labels</h2>
      <p>Patient: <strong>${prescription?.patientName}</strong> | Generated: ${new Date().toLocaleDateString("en-IN")}</p>
      <hr/>
      ${schedule.map((day) =>
            slotOrder.map((slot) => {
                const items = day[slot];
                if (items.length === 0) return "";
                return `<div class="label">
            <div class="patient">${prescription?.patientName} (${prescription?.patientInitials})</div>
            <h3>${day.date} — ${slotLabels[slot].emoji} ${slotLabels[slot].label} (${slotLabels[slot].time})</h3>
            <div class="meds">${items.map((it) => `<div class="med">💊 ${it.drugName} — ${it.dosage}</div>`).join("")}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:10px;color:#888;">GenPharma™</span>
              <div class="qr">QR</div>
            </div>
          </div>`;
            }).join("")
        ).join("")}
      </body></html>
    `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    if (!prescription) return null;

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            Pouch Schedule — {prescription.patientName}
                        </span>
                        <Button size="sm" onClick={handlePrint} className="gap-1">
                            <Printer className="h-4 w-4" /> Print Labels
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <div ref={printRef}>
                    {/* ─── Medications Summary ─── */}
                    <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                        <h4 className="text-sm font-semibold mb-2">Prescribed Medications</h4>
                        <div className="flex flex-wrap gap-2">
                            {prescription.medications.map((m, i) => (
                                <Badge key={i} variant="secondary">{m.drugName} {m.dosage}</Badge>
                            ))}
                        </div>
                    </div>

                    {/* ─── 7-Day Schedule Grid ─── */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr>
                                    <th className="border border-border p-2 bg-muted text-left">Day</th>
                                    {slotOrder.map((slot) => (
                                        <th key={slot} className="border border-border p-2 bg-muted text-center">
                                            {slotLabels[slot].emoji} {slotLabels[slot].label}<br />
                                            <span className="text-xs text-muted-foreground font-normal">{slotLabels[slot].time}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((day, di) => (
                                    <tr key={di} className={di % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                        <td className="border border-border p-2 font-medium whitespace-nowrap">{day.date}</td>
                                        {slotOrder.map((slot) => (
                                            <td key={slot} className="border border-border p-2 text-center">
                                                {day[slot].length > 0 ? (
                                                    <div className="space-y-1">
                                                        {day[slot].map((item, ii) => (
                                                            <div key={ii} className="text-xs bg-primary/10 text-primary rounded px-2 py-1">
                                                                💊 {item.drugName}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-xs">—</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
