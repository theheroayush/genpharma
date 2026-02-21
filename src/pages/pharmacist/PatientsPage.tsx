import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Plus, Phone, MessageSquare, Search, User, Activity, ChevronRight } from "lucide-react";
import type { Patient, Prescription } from "@/types";

export default function PatientsPage() {
  const { toast } = useToast();
  const [patients, setPatients] = useLocalStorage<Patient[]>("gp_patients", []);
  const [prescriptions] = useLocalStorage<Prescription[]>("gp_prescriptions", []);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showCall, setShowCall] = useState<Patient | null>(null);
  const [showMessage, setShowMessage] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ─── Add form ───
  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formCondition, setFormCondition] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formLanguage, setFormLanguage] = useState("Hindi");
  const [formNotes, setFormNotes] = useState("");

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return patients;
    const q = searchQuery.toLowerCase();
    return patients.filter((p) =>
      p.name.toLowerCase().includes(q) || p.condition.toLowerCase().includes(q) || p.phone.includes(q)
    );
  }, [patients, searchQuery]);

  const handleAddPatient = () => {
    if (!formName.trim()) { toast({ title: "Name required", variant: "destructive" }); return; }
    const initials = formName.split(" ").map((w) => w[0]).join("").toUpperCase().substring(0, 2);
    const newPatient: Patient = {
      id: `pat-${Date.now()}`, name: formName.trim(), initials, age: parseInt(formAge) || 0,
      condition: formCondition, phone: formPhone, language: formLanguage,
      lastOrder: "Never", adherence: 0, active: true, prescriptionIds: [],
      notes: formNotes || undefined,
    };
    setPatients((prev) => [newPatient, ...prev]);
    toast({ title: "Patient added", description: newPatient.name });
    setShowAdd(false);
    setFormName(""); setFormAge(""); setFormCondition(""); setFormPhone(""); setFormLanguage("Hindi"); setFormNotes("");
  };

  const patientPrescriptions = useMemo(() => {
    if (!selectedPatient) return [];
    return prescriptions.filter((rx) => selectedPatient.prescriptionIds.includes(rx.id));
  }, [selectedPatient, prescriptions]);

  const adherenceColor = (a: number) => {
    if (a >= 80) return "text-green-600";
    if (a >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const adherenceBar = (a: number) => {
    const color = a >= 80 ? "bg-green-500" : a >= 60 ? "bg-amber-500" : "bg-red-500";
    return (
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full ${color} transition-all`} style={{ width: `${a}%` }} />
      </div>
    );
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Patients</h1>
            <p className="text-muted-foreground text-sm">{patients.length} registered patients · {patients.filter((p) => p.active).length} active</p>
          </div>
          <Button size="sm" className="gap-1" onClick={() => setShowAdd(true)}>
            <Plus className="h-4 w-4" /> Add Patient
          </Button>
        </div>

        <div className="relative sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search patients..." className="pl-9" />
        </div>

        {/* ─── Patient Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedPatient(patient)}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={`text-sm ${patient.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {patient.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate">{patient.name}</p>
                      {!patient.active && <Badge variant="muted" className="text-[10px]">Inactive</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{patient.condition} · Age {patient.age}</p>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Adherence</span>
                    <span className={`font-semibold ${adherenceColor(patient.adherence)}`}>{patient.adherence}%</span>
                  </div>
                  {adherenceBar(patient.adherence)}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Last: {patient.lastOrder}</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setShowCall(patient); }}>
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setShowMessage(patient); }}>
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">No patients found.</div>
          )}
        </div>
      </div>

      {/* ─── Add Patient Dialog ─── */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Patient</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Full Name *</Label><Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Rajesh Kumar" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Age</Label><Input type="number" value={formAge} onChange={(e) => setFormAge(e.target.value)} /></div>
              <div><Label>Language</Label>
                <Select value={formLanguage} onValueChange={setFormLanguage}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Hindi", "English", "Gujarati", "Marathi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam", "Punjabi"].map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Condition</Label><Input value={formCondition} onChange={(e) => setFormCondition(e.target.value)} placeholder="e.g. Diabetes Type 2" /></div>
            <div><Label>Phone</Label><Input value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="+91 ..." /></div>
            <div><Label>Notes</Label><Input value={formNotes} onChange={(e) => setFormNotes(e.target.value)} placeholder="Any special notes..." /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={handleAddPatient}>Add Patient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Patient Detail Dialog ─── */}
      <Dialog open={!!selectedPatient} onOpenChange={(v) => !v && setSelectedPatient(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Patient Profile</DialogTitle></DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">{selectedPatient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                  <p className="text-muted-foreground">Age {selectedPatient.age} · {selectedPatient.condition}</p>
                  <p className="text-sm">{selectedPatient.phone} · {selectedPatient.language}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Activity className="h-6 w-6 mx-auto text-primary mb-1" />
                    <p className={`text-2xl font-bold ${adherenceColor(selectedPatient.adherence)}`}>{selectedPatient.adherence}%</p>
                    <p className="text-xs text-muted-foreground">Adherence</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <User className="h-6 w-6 mx-auto text-primary mb-1" />
                    <p className="text-2xl font-bold">{selectedPatient.prescriptionIds.length}</p>
                    <p className="text-xs text-muted-foreground">Prescriptions</p>
                  </CardContent>
                </Card>
              </div>

              {patientPrescriptions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Prescription History</h4>
                  {patientPrescriptions.map((rx) => (
                    <div key={rx.id} className="flex items-center justify-between p-2 bg-muted/50 rounded mb-1">
                      <div>
                        <p className="text-sm font-medium">{rx.id}</p>
                        <p className="text-xs text-muted-foreground">{rx.medications.length} medication(s)</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">{rx.status}</Badge>
                    </div>
                  ))}
                </div>
              )}

              {selectedPatient.notes && (
                <div className="p-3 bg-muted/50 rounded text-sm">
                  <span className="font-semibold">Notes:</span> {selectedPatient.notes}
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-1" onClick={() => { setSelectedPatient(null); setShowCall(selectedPatient); }}>
                  <Phone className="h-4 w-4" /> Call
                </Button>
                <Button variant="outline" className="flex-1 gap-1" onClick={() => { setSelectedPatient(null); setShowMessage(selectedPatient); }}>
                  <MessageSquare className="h-4 w-4" /> Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── Call Dialog ─── */}
      <Dialog open={!!showCall} onOpenChange={(v) => !v && setShowCall(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>📞 Calling {showCall?.name}</DialogTitle></DialogHeader>
          <div className="text-center py-6 space-y-3">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-pulse">
              <Phone className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-lg font-mono">{showCall?.phone}</p>
            <p className="text-sm text-muted-foreground">Connecting to {showCall?.name}...</p>
            <Button variant="destructive" onClick={() => { setShowCall(null); toast({ title: "Call ended" }); }}>
              End Call
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── Message Dialog ─── */}
      <Dialog open={!!showMessage} onOpenChange={(v) => !v && setShowMessage(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>💬 Message {showMessage?.name}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium">Quick Templates:</p>
            </div>
            {[
              "Hi! Your medicine pack is ready for pickup.",
              "Reminder: Please take your medicines on time. 💊",
              "Your prescription has been verified. Order will be ready soon.",
              "Hi! Time for your refill. Shall we prepare another pack?",
            ].map((msg, i) => (
              <Button key={i} variant="outline" className="w-full text-left justify-start h-auto py-2 text-sm" onClick={() => {
                setShowMessage(null);
                toast({ title: `Message sent to ${showMessage?.name}`, description: msg });
              }}>
                {msg}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
