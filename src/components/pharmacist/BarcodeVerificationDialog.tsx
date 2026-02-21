import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Scan, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import type { BarcodeEntry, InventoryItem } from "@/types";

interface Props {
    open: boolean;
    onClose: () => void;
    inventory: InventoryItem[];
}

export function BarcodeVerificationDialog({ open, onClose, inventory }: Props) {
    const [scanInput, setScanInput] = useState("");
    const [entries, setEntries] = useState<BarcodeEntry[]>([]);

    const handleScan = () => {
        if (!scanInput.trim()) return;
        const match = inventory.find(
            (item) => item.batch.toLowerCase() === scanInput.trim().toLowerCase()
        );
        const entry: BarcodeEntry = {
            batchCode: scanInput.trim(),
            drugName: match ? match.name : "Unknown",
            verified: !!match,
            timestamp: new Date().toLocaleTimeString("en-IN"),
        };
        setEntries((prev) => [entry, ...prev]);
        setScanInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleScan();
    };

    const clearEntries = () => setEntries([]);

    const verifiedCount = entries.filter((e) => e.verified).length;
    const failedCount = entries.filter((e) => !e.verified).length;

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Scan className="h-5 w-5 text-primary" /> Barcode Verification
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Scan or type a batch code to verify medications against inventory.
                        Try: <code className="px-1 bg-muted rounded">MET-2024-A</code>,{" "}
                        <code className="px-1 bg-muted rounded">TEL-2024-B</code>, etc.
                    </p>

                    <div className="flex gap-2">
                        <Input
                            value={scanInput}
                            onChange={(e) => setScanInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter batch code..."
                            autoFocus
                            className="font-mono"
                        />
                        <Button onClick={handleScan} className="gap-1 shrink-0">
                            <Scan className="h-4 w-4" /> Scan
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-3">
                        <Badge variant="success" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" /> {verifiedCount} Verified
                        </Badge>
                        <Badge variant="destructive" className="gap-1">
                            <XCircle className="h-3 w-3" /> {failedCount} Failed
                        </Badge>
                        {entries.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearEntries} className="ml-auto gap-1 text-xs">
                                <Trash2 className="h-3 w-3" /> Clear
                            </Button>
                        )}
                    </div>

                    {/* Audit Trail */}
                    {entries.length > 0 && (
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-muted">
                                        <th className="p-2 text-left">Status</th>
                                        <th className="p-2 text-left">Batch Code</th>
                                        <th className="p-2 text-left">Drug</th>
                                        <th className="p-2 text-left">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.map((entry, i) => (
                                        <tr key={i} className={entry.verified ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"}>
                                            <td className="p-2">
                                                {entry.verified ? (
                                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <XCircle className="h-4 w-4 text-red-600" />
                                                )}
                                            </td>
                                            <td className="p-2 font-mono text-xs">{entry.batchCode}</td>
                                            <td className="p-2">{entry.drugName}</td>
                                            <td className="p-2 text-muted-foreground text-xs">{entry.timestamp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {entries.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <Scan className="h-12 w-12 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No scans yet. Enter a batch code above.</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
