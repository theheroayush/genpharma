import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { searchDrugs } from "@/data/drugDatabase";
import { Plus, X, Pill, Image as ImageIcon } from "lucide-react";
import type { MedicationEntry, Prescription, TimeSlot } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (prescription: Prescription) => void;
}

const frequencyOptions = [
  {
    value: "once_daily",
    label: "Once Daily",
    defaultSlots: ["morning"] as TimeSlot[],
  },
  {
    value: "twice_daily",
    label: "Twice Daily",
    defaultSlots: ["morning", "evening"] as TimeSlot[],
  },
  {
    value: "thrice_daily",
    label: "Three Times Daily",
    defaultSlots: ["morning", "afternoon", "evening"] as TimeSlot[],
  },
  {
    value: "every_8h",
    label: "Every 8 Hours",
    defaultSlots: ["morning", "afternoon", "night"] as TimeSlot[],
  },
  {
    value: "at_bedtime",
    label: "At Bedtime",
    defaultSlots: ["night"] as TimeSlot[],
  },
];

const timeSlotLabels: Record<TimeSlot, string> = {
  morning: "🌅 Morning",
  afternoon: "☀️ Afternoon",
  evening: "🌇 Evening",
  night: "🌙 Night",
};

export function PrescriptionEntryDialog({ open, onClose, onSave }: Props) {
  const { toast } = useToast();
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [condition, setCondition] = useState("");
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [ocrText, setOcrText] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);

  // ─── Current medication being added ───
  const [drugSearch, setDrugSearch] = useState("");
  const [suggestions, setSuggestions] = useState<
    ReturnType<typeof searchDrugs>
  >([]);
  const [selectedDrug, setSelectedDrug] = useState("");
  const [selectedGeneric, setSelectedGeneric] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("30");
  const [instructions, setInstructions] = useState("");
  const [availableDosages, setAvailableDosages] = useState<string[]>([]);

  useEffect(() => {
    if (drugSearch.length >= 2) {
      setSuggestions(searchDrugs(drugSearch));
    } else {
      setSuggestions([]);
    }
  }, [drugSearch]);

  const handleSelectDrug = (drug: ReturnType<typeof searchDrugs>[0]) => {
    setSelectedDrug(drug.name);
    setSelectedGeneric(drug.genericName);
    setDrugSearch(drug.name);
    setAvailableDosages(drug.dosages);
    setDosage(drug.dosages[0] || "");
    setSuggestions([]);
  };

  const handleAddMedication = () => {
    if (!selectedDrug || !dosage || !frequency) {
      toast({
        title: "Missing fields",
        description: "Please select a drug, dosage, and frequency.",
        variant: "destructive",
      });
      return;
    }
    const freq = frequencyOptions.find((f) => f.value === frequency);
    const entry: MedicationEntry = {
      drugName: selectedDrug,
      genericName: selectedGeneric,
      dosage,
      frequency,
      timeSlots: freq?.defaultSlots || ["morning"],
      duration: parseInt(duration) || 30,
      specialInstructions: instructions || undefined,
    };
    setMedications((prev) => [...prev, entry]);
    // Reset
    setDrugSearch("");
    setSelectedDrug("");
    setSelectedGeneric("");
    setDosage("");
    setFrequency("");
    setDuration("30");
    setInstructions("");
    setAvailableDosages([]);
  };

  const removeMedication = (idx: number) => {
    setMedications((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
      // Simulated OCR
      setOcrText(
        `[OCR Scan Result]\nPatient: ${patientName || "Unknown"}\nMedications detected from image.\nPlease verify and add medications manually using the drug search above.`,
      );
      toast({
        title: "Prescription scanned",
        description: "OCR completed. Please verify detected information.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!patientName.trim()) {
      toast({ title: "Patient name required", variant: "destructive" });
      return;
    }
    if (medications.length === 0) {
      toast({ title: "Add at least one medication", variant: "destructive" });
      return;
    }

    const initials = patientName
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
    const id = `RX-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const prescription: Prescription = {
      id,
      patientName: patientName.trim(),
      patientInitials: initials,
      patientAge: parseInt(patientAge) || 0,
      condition: condition.trim(),
      medications,
      imageUrl,
      ocrText,
      status: "uploaded",
      createdAt: now,
      updatedAt: now,
    };

    onSave(prescription);
    toast({
      title: "Prescription created",
      description: `${id} for ${patientName} with ${medications.length} medication(s).`,
    });
    // Reset all
    setPatientName("");
    setPatientAge("");
    setCondition("");
    setMedications([]);
    setImageUrl(undefined);
    setOcrText(undefined);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" /> New Prescription
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* ─── Patient Info ─── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label>Patient Name *</Label>
              <Input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Rajesh Kumar"
              />
            </div>
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="e.g. 54"
              />
            </div>
            <div>
              <Label>Condition</Label>
              <Input
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                placeholder="e.g. Diabetes Type 2"
              />
            </div>
          </div>

          {/* ─── Prescription Image Upload ─── */}
          <div>
            <Label>Prescription Image (optional)</Label>
            <div
              onClick={() => fileRef.current?.click()}
              className="mt-1 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/60 transition-colors"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Prescription"
                  className="mx-auto max-h-48 rounded-lg object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-sm">
                    Click to upload prescription photo
                  </span>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            {ocrText && (
              <div className="mt-2 p-3 bg-muted rounded-lg text-sm whitespace-pre-line font-mono">
                {ocrText}
              </div>
            )}
          </div>

          {/* ─── Add Medication ─── */}
          <div className="border rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-sm">Add Medication</h4>
            <div className="relative">
              <Label>Drug Name *</Label>
              <Input
                value={drugSearch}
                onChange={(e) => {
                  setDrugSearch(e.target.value);
                  setSelectedDrug("");
                }}
                placeholder="Type to search... e.g. Metformin"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {suggestions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSelectDrug(s)}
                      className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm flex justify-between"
                    >
                      <span className="font-medium">{s.name}</span>
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {s.category}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label>Dosage *</Label>
                {availableDosages.length > 0 ? (
                  <Select value={dosage} onValueChange={setDosage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDosages.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 500mg"
                  />
                )}
              </div>
              <div>
                <Label>Frequency *</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duration (days)</Label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Special Instructions</Label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Take after meals"
                rows={2}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={handleAddMedication}
            >
              <Plus className="h-4 w-4" /> Add to Prescription
            </Button>
          </div>

          {/* ─── Medications List ─── */}
          {medications.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">
                Medications ({medications.length})
              </h4>
              {medications.map((med, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {med.drugName} — {med.dosage}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {
                        frequencyOptions.find((f) => f.value === med.frequency)
                          ?.label
                      }{" "}
                      · {med.duration} days
                      {med.specialInstructions &&
                        ` · ${med.specialInstructions}`}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {med.timeSlots.map((s) => (
                        <Badge
                          key={s}
                          variant="outline"
                          className="text-[10px]"
                        >
                          {timeSlotLabels[s]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${med.drugName}`}
                    title={`Remove ${med.drugName}`}
                    onClick={() => removeMedication(i)}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Create Prescription</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
