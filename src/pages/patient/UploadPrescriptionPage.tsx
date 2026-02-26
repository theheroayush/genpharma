import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UploadedRx {
    id: string;
    fileName: string;
    fileType: string;
    preview?: string;
    uploadedAt: string;
    status: "uploaded" | "processing" | "verified";
}

export default function UploadPrescriptionPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { toast } = useToast();
    const [uploads, setUploads] = useLocalStorage<UploadedRx[]>("gp_patient_uploads", []);

    const handleFile = (f: File) => {
        const isImage = f.type.startsWith("image/");
        const isPDF = f.type === "application/pdf";
        if (!isImage && !isPDF) {
            toast({ title: "Invalid file", description: "Please upload an image or PDF of your prescription.", variant: "destructive" });
            return;
        }
        if (f.size > 10 * 1024 * 1024) {
            toast({ title: "File too large", description: "Maximum file size is 10MB.", variant: "destructive" });
            return;
        }
        setFile(f);
        if (isImage) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(f);
        } else {
            setPreview(null); // PDF has no image preview
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        await new Promise((r) => setTimeout(r, 2000));
        const newUpload: UploadedRx = {
            id: `RX-${Date.now()}`,
            fileName: file.name,
            fileType: file.type,
            preview: preview || undefined,
            uploadedAt: new Date().toISOString(),
            status: "uploaded",
        };
        setUploads(prev => [newUpload, ...prev]);
        setUploading(false);
        setSuccess(true);
        toast({ title: "Prescription uploaded!", description: "Our pharmacist will review it shortly." });
    };

    if (success) {
        return (
            <div className="text-center py-12 md:py-16 max-w-md mx-auto space-y-5">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-600" style={{ fontSize: 36 }}>check_circle</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Prescription Uploaded!</h2>
                <p className="text-muted-foreground text-sm">Our pharmacist will verify your prescription and prepare your medicine pouches. You'll receive a notification once it's ready.</p>
                <div className="flex gap-3 justify-center">
                    <button onClick={() => navigate("/patient")} className="px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">Back to Dashboard</button>
                    <button onClick={() => { setSuccess(false); setFile(null); setPreview(null); }} className="px-5 py-2.5 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">Upload Another</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => navigate("/patient")} className="text-primary text-sm font-medium flex items-center gap-1 mb-3 hover:underline">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
                Back
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">Upload Prescription</h1>
            <p className="text-muted-foreground text-sm mb-5 md:mb-6">Take a photo or upload an image/PDF of your prescription.</p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8">
                {/* Upload Area */}
                <div className="lg:col-span-7">
                    {preview ? (
                        <div className="relative rounded-xl overflow-hidden bg-slate-900">
                            <img src={preview} alt="Prescription preview" className="w-full max-h-[400px] object-contain" />
                            <button onClick={() => { setFile(null); setPreview(null); }} className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 transition-colors">
                                <span className="material-symbols-outlined text-foreground" style={{ fontSize: 18 }}>close</span>
                            </button>
                        </div>
                    ) : file && file.type === "application/pdf" ? (
                        <div className="rounded-xl bg-muted border border-border p-8 text-center">
                            <span className="material-symbols-outlined text-red-500 mb-3 block" style={{ fontSize: 48 }}>picture_as_pdf</span>
                            <p className="font-bold text-foreground mb-1">{file.name}</p>
                            <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
                            <button onClick={() => { setFile(null); setPreview(null); }} className="mt-4 text-sm text-primary font-semibold hover:underline">Remove</button>
                        </div>
                    ) : (
                        <div
                            className="bg-slate-800 rounded-xl overflow-hidden relative flex items-center justify-center cursor-pointer"
                            style={{ minHeight: 300 }}
                            onClick={() => inputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
                        >
                            <div className="absolute inset-6 md:inset-10 border-2 border-dashed border-blue-400/40 rounded-xl flex flex-col items-center justify-center gap-3">
                                <span className="material-symbols-outlined text-blue-300" style={{ fontSize: 48 }}>add_a_photo</span>
                                <p className="text-slate-300 text-sm font-medium">Tap to capture or upload</p>
                                <p className="text-slate-500 text-xs">Supports JPG, PNG, PDF (max 10MB)</p>
                            </div>
                        </div>
                    )}

                    {/* Bottom controls */}
                    <div className="mt-3 bg-white rounded-xl border border-border p-3 flex items-center justify-between gap-3">
                        <button onClick={() => inputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium text-foreground">
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>photo_library</span>
                            <span className="hidden sm:inline">Gallery</span>
                        </button>
                        <input ref={inputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-white" style={{ fontSize: 24 }}>photo_camera</span>
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {uploading ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading...</>
                            ) : (
                                <>Submit <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span></>
                            )}
                        </button>
                    </div>
                </div>

                {/* Tips + History */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-white rounded-xl border border-border p-4 md:p-5">
                        <h3 className="font-bold text-foreground mb-4">Tips for a good photo</h3>
                        <div className="space-y-4">
                            {[
                                { icon: "table_restaurant", title: "Flat Surface", desc: "Place on a dark, flat table for contrast." },
                                { icon: "light_mode", title: "Good Lighting", desc: "Ensure bright light. Avoid shadows." },
                                { icon: "fullscreen", title: "Full Page", desc: "Capture entire page including doctor's name." },
                            ].map((tip) => (
                                <div key={tip.title} className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>{tip.icon}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground text-sm">{tip.title}</p>
                                        <p className="text-xs text-muted-foreground">{tip.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Previous Uploads */}
                    {uploads.length > 0 && (
                        <div className="bg-white rounded-xl border border-border p-4 md:p-5">
                            <h3 className="font-bold text-foreground mb-3">Previous Uploads</h3>
                            <div className="space-y-2">
                                {uploads.slice(0, 5).map((u) => (
                                    <div key={u.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-b-0">
                                        <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 20 }}>
                                            {u.fileType.includes("pdf") ? "picture_as_pdf" : "image"}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">{u.fileName}</p>
                                            <p className="text-xs text-muted-foreground">{new Date(u.uploadedAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.status === "verified" ? "bg-green-100 text-green-700" : u.status === "processing" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                                            {u.status.toUpperCase()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
