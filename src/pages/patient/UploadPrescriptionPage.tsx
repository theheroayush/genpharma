import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function UploadPrescriptionPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleFile = (f: File) => {
        if (!f.type.startsWith("image/")) {
            toast({ title: "Invalid file", description: "Please upload an image of your prescription.", variant: "destructive" });
            return;
        }
        setFile(f);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(f);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        await new Promise((r) => setTimeout(r, 2000));
        setUploading(false);
        setSuccess(true);
        toast({ title: "Prescription uploaded!", description: "Our pharmacist will review it shortly." });
    };

    if (success) {
        return (
            <div className="text-center py-16 max-w-md mx-auto space-y-6">
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-600" style={{ fontSize: 40 }}>check_circle</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Prescription Uploaded!</h2>
                <p className="text-muted-foreground">Our pharmacist will verify your prescription and prepare your medicine pouches. You'll receive a notification once it's ready.</p>
                <div className="flex gap-3 justify-center">
                    <button onClick={() => navigate("/patient")} className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">Back to Dashboard</button>
                    <button onClick={() => { setSuccess(false); setFile(null); setPreview(null); }} className="px-6 py-2.5 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-colors">Upload Another</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => navigate("/patient")} className="text-primary text-sm font-medium flex items-center gap-1 mb-4 hover:underline">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
                Back to Dashboard
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Upload Prescription</h1>
            <p className="text-muted-foreground mb-6 md:mb-8">Align your prescription within the frame to capture a clear photo.</p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                {/* Camera / Upload Area */}
                <div className="lg:col-span-7">
                    {preview ? (
                        <div className="relative rounded-2xl overflow-hidden bg-slate-900">
                            <img src={preview} alt="Prescription preview" className="w-full max-h-[500px] object-contain" />
                            <button onClick={() => { setFile(null); setPreview(null); }} className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 transition-colors">
                                <span className="material-symbols-outlined text-foreground" style={{ fontSize: 20 }}>close</span>
                            </button>
                        </div>
                    ) : (
                        <div
                            className="bg-slate-800 rounded-2xl overflow-hidden relative flex items-center justify-center"
                            style={{ minHeight: 400 }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
                        >
                            {/* Frame overlay */}
                            <div className="absolute inset-8 md:inset-12 border-2 border-dashed border-blue-400/50 rounded-xl flex items-end justify-center pb-4">
                                <span className="bg-slate-700/80 text-slate-200 text-sm px-4 py-1.5 rounded-full">Align document here</span>
                            </div>
                            {/* Controls */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button className="w-10 h-10 bg-slate-700/60 hover:bg-slate-700 rounded-full flex items-center justify-center text-white transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>flash_on</span>
                                </button>
                                <button className="w-10 h-10 bg-slate-700/60 hover:bg-slate-700 rounded-full flex items-center justify-center text-white transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>settings</span>
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Bottom controls */}
                    <div className="mt-4 bg-white rounded-2xl border border-border p-4 flex items-center justify-between gap-4">
                        <button onClick={() => inputRef.current?.click()} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium text-foreground">
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>photo_library</span>
                            Upload from Gallery
                        </button>
                        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
                        <button
                            onClick={() => inputRef.current?.click()}
                            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center shadow-lg transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-white" style={{ fontSize: 28 }}>photo_camera</span>
                        </button>
                        <span className="text-sm text-muted-foreground hidden sm:block">Press spacebar to capture</span>
                    </div>
                </div>

                {/* Tips Sidebar */}
                <div className="lg:col-span-5 space-y-4 md:space-y-6">
                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                        <h3 className="text-lg font-bold text-foreground mb-5">Tips for a good photo</h3>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>table_restaurant</span>
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">1. Flat Surface</p>
                                    <p className="text-sm text-muted-foreground mt-0.5">Place the prescription on a dark, flat table for better contrast.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>light_mode</span>
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">2. Good Lighting</p>
                                    <p className="text-sm text-muted-foreground mt-0.5">Ensure the room is bright. Avoid shadows falling on the text.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 22 }}>fullscreen</span>
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">3. Full Page</p>
                                    <p className="text-sm text-muted-foreground mt-0.5">Capture the entire page including corners. Do not crop the doctor's name.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-border p-5 md:p-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-foreground">Pages Captured</h3>
                            <span className="bg-muted text-foreground w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">{file ? 1 : 0}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Review your captures before submitting. Ensure text is readable.</p>
                        <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className="w-full bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? (
                                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                            ) : (
                                <>Review Photo <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span></>
                            )}
                        </button>
                    </div>

                    <button className="text-primary text-sm font-semibold flex items-center gap-1 mx-auto hover:underline">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>help</span>
                        Need help uploading?
                    </button>
                </div>
            </div>
        </div>
    );
}
