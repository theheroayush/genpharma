// ─── Shared TypeScript Types ───
export type UserRole = "patient" | "pharmacist" | "admin";

export interface Profile {
    id: string;
    full_name: string;
    email: string;
    role: UserRole;
    approved: boolean;
    phone: string;
    created_at: string;
}

export interface Drug {
    id: string;
    name: string;
    genericName: string;
    category: string;
    dosages: string[];
    unit: string;
}

export type TimeSlot = "morning" | "afternoon" | "evening" | "night";
export type OrderStatus = "processing" | "assembled" | "shipped" | "delivered";
export type PrescriptionStatus = "uploaded" | "ocr_completed" | "verified" | "pending" | "on_hold" | "assembled";

export interface MedicationEntry {
    drugName: string;
    genericName: string;
    dosage: string;
    frequency: string; // "once_daily" | "twice_daily" | "thrice_daily" | "every_8h" | "as_needed"
    timeSlots: TimeSlot[];
    duration: number; // in days
    specialInstructions?: string;
}

export interface Prescription {
    id: string;
    patientName: string;
    patientInitials: string;
    patientAge: number;
    condition: string;
    medications: MedicationEntry[];
    imageUrl?: string; // data URL of uploaded prescription image
    ocrText?: string;
    status: PrescriptionStatus;
    createdAt: string;
    updatedAt: string;
}

export interface PouchItem {
    drugName: string;
    dosage: string;
}

export interface DaySchedule {
    date: string;
    morning: PouchItem[];
    afternoon: PouchItem[];
    evening: PouchItem[];
    night: PouchItem[];
}

export interface PouchSchedule {
    prescriptionId: string;
    patientName: string;
    days: DaySchedule[];
}

export interface InventoryItem {
    id: string;
    name: string;
    genericName: string;
    stock: number;
    unit: string;
    batch: string;
    expiry: string;
    status: "ok" | "low" | "critical";
    reorderLevel: number;
}

export interface Order {
    id: string;
    prescriptionId?: string;
    patientName: string;
    patientInitials: string;
    items: { name: string; dosage: string; quantity: number }[];
    total: string;
    date: string;
    status: OrderStatus;
    timeline: { status: OrderStatus; timestamp: string }[];
}

export interface Patient {
    id: string;
    name: string;
    initials: string;
    age: number;
    condition: string;
    phone: string;
    email?: string;
    language: string;
    lastOrder: string;
    adherence: number;
    active: boolean;
    prescriptionIds: string[];
    notes?: string;
}

export interface BarcodeEntry {
    batchCode: string;
    drugName: string;
    verified: boolean;
    timestamp: string;
}
