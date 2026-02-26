import type { Prescription, InventoryItem, Order, Patient } from "@/types";

export const seedPrescriptions: Prescription[] = [
    {
        id: "RX-7392",
        patientName: "Rajesh Kumar",
        patientInitials: "RK",
        patientAge: 54,
        condition: "Diabetes Type 2",
        medications: [
            { drugName: "Metformin 500mg", genericName: "Metformin HCl", dosage: "500mg", frequency: "twice_daily", timeSlots: ["morning", "evening"], duration: 30, specialInstructions: "Take after meals" },
            { drugName: "Glimepiride 2mg", genericName: "Glimepiride", dosage: "2mg", frequency: "once_daily", timeSlots: ["morning"], duration: 30 },
        ],
        status: "ocr_completed",
        createdAt: "2023-10-24T08:00:00Z",
        updatedAt: "2023-10-24T08:30:00Z",
    },
    {
        id: "RX-7391",
        patientName: "Anita Desai",
        patientInitials: "AD",
        patientAge: 62,
        condition: "Hypertension",
        medications: [
            { drugName: "Telmisartan 40mg", genericName: "Telmisartan", dosage: "40mg", frequency: "once_daily", timeSlots: ["morning"], duration: 30 },
            { drugName: "Amlodipine 5mg", genericName: "Amlodipine Besylate", dosage: "5mg", frequency: "once_daily", timeSlots: ["evening"], duration: 30 },
        ],
        status: "verified",
        createdAt: "2023-10-24T09:00:00Z",
        updatedAt: "2023-10-24T10:00:00Z",
    },
    {
        id: "RX-7390",
        patientName: "Vikram Singh",
        patientInitials: "VS",
        patientAge: 48,
        condition: "Cholesterol",
        medications: [
            { drugName: "Atorvastatin 10mg", genericName: "Atorvastatin Calcium", dosage: "10mg", frequency: "once_daily", timeSlots: ["night"], duration: 30 },
        ],
        status: "pending",
        createdAt: "2023-10-23T14:00:00Z",
        updatedAt: "2023-10-23T14:00:00Z",
    },
    {
        id: "RX-7389",
        patientName: "Priya Mehta",
        patientInitials: "PM",
        patientAge: 29,
        condition: "Thyroid",
        medications: [
            { drugName: "Thyroxine 50mcg", genericName: "Levothyroxine Sodium", dosage: "50mcg", frequency: "once_daily", timeSlots: ["morning"], duration: 90, specialInstructions: "Take on empty stomach, 30 min before food" },
        ],
        status: "verified",
        createdAt: "2023-10-23T10:00:00Z",
        updatedAt: "2023-10-23T11:00:00Z",
    },
    {
        id: "RX-7388",
        patientName: "Suresh Kumar",
        patientInitials: "SK",
        patientAge: 71,
        condition: "Cardiac",
        medications: [
            { drugName: "Clopidogrel 75mg", genericName: "Clopidogrel Bisulphate", dosage: "75mg", frequency: "once_daily", timeSlots: ["afternoon"], duration: 30 },
            { drugName: "Aspirin 75mg", genericName: "Acetylsalicylic Acid", dosage: "75mg", frequency: "once_daily", timeSlots: ["afternoon"], duration: 30 },
        ],
        status: "on_hold",
        createdAt: "2023-10-23T08:00:00Z",
        updatedAt: "2023-10-23T09:00:00Z",
    },
    {
        id: "RX-7387",
        patientName: "Meena Patel",
        patientInitials: "MP",
        patientAge: 45,
        condition: "Diabetes Type 2",
        medications: [
            { drugName: "Insulin Glargine", genericName: "Insulin Glargine", dosage: "100IU/mL", frequency: "once_daily", timeSlots: ["night"], duration: 30 },
        ],
        status: "assembled",
        createdAt: "2023-10-22T12:00:00Z",
        updatedAt: "2023-10-22T15:00:00Z",
    },
];

export const seedInventory: InventoryItem[] = [
    { id: "inv-1", name: "Metformin 500mg", genericName: "Metformin HCl", stock: 2400, unit: "tablets", batch: "MET-2024-A", expiry: "Mar 2026", status: "ok", reorderLevel: 500 },
    { id: "inv-2", name: "Telmisartan 40mg", genericName: "Telmisartan", stock: 1800, unit: "tablets", batch: "TEL-2024-B", expiry: "Jun 2026", status: "ok", reorderLevel: 400 },
    { id: "inv-3", name: "Atorvastatin 10mg", genericName: "Atorvastatin Calcium", stock: 320, unit: "tablets", batch: "ATV-2024-C", expiry: "Jan 2026", status: "low", reorderLevel: 500 },
    { id: "inv-4", name: "Thyroxine 50mcg", genericName: "Levothyroxine", stock: 85, unit: "tablets", batch: "THY-2024-D", expiry: "Dec 2025", status: "critical", reorderLevel: 200 },
    { id: "inv-5", name: "Amlodipine 5mg", genericName: "Amlodipine Besylate", stock: 1500, unit: "tablets", batch: "AML-2024-E", expiry: "Sep 2026", status: "ok", reorderLevel: 300 },
    { id: "inv-6", name: "Clopidogrel 75mg", genericName: "Clopidogrel Bisulphate", stock: 640, unit: "tablets", batch: "CLO-2024-F", expiry: "Apr 2026", status: "ok", reorderLevel: 200 },
    { id: "inv-7", name: "Glimepiride 2mg", genericName: "Glimepiride", stock: 150, unit: "tablets", batch: "GLM-2024-G", expiry: "Feb 2026", status: "low", reorderLevel: 300 },
    { id: "inv-8", name: "Insulin Glargine", genericName: "Insulin Glargine", stock: 45, unit: "vials", batch: "INS-2024-H", expiry: "Nov 2025", status: "critical", reorderLevel: 50 },
    { id: "inv-9", name: "Aspirin 75mg", genericName: "Acetylsalicylic Acid", stock: 3000, unit: "tablets", batch: "ASP-2024-I", expiry: "Aug 2026", status: "ok", reorderLevel: 500 },
    { id: "inv-10", name: "Pantoprazole 40mg", genericName: "Pantoprazole Sodium", stock: 900, unit: "tablets", batch: "PAN-2024-J", expiry: "Jul 2026", status: "ok", reorderLevel: 300 },
];

export const seedOrders: Order[] = [
    { id: "#ORD-7392", patientName: "Rajesh Kumar", patientInitials: "RK", items: [{ name: "Metformin 500mg", dosage: "500mg", quantity: 60 }, { name: "Glimepiride 2mg", dosage: "2mg", quantity: 30 }], total: "₹450", date: "Oct 24, 2023", status: "processing", timeline: [{ status: "processing", timestamp: "2023-10-24T08:30:00Z" }] },
    { id: "#ORD-7391", patientName: "Anita Desai", patientInitials: "AD", items: [{ name: "Telmisartan 40mg", dosage: "40mg", quantity: 30 }, { name: "Amlodipine 5mg", dosage: "5mg", quantity: 30 }], total: "₹320", date: "Oct 24, 2023", status: "assembled", timeline: [{ status: "processing", timestamp: "2023-10-24T09:00:00Z" }, { status: "assembled", timestamp: "2023-10-24T11:00:00Z" }] },
    { id: "#ORD-7390", patientName: "Vikram Singh", patientInitials: "VS", items: [{ name: "Atorvastatin 10mg", dosage: "10mg", quantity: 30 }], total: "₹180", date: "Oct 23, 2023", status: "shipped", timeline: [{ status: "processing", timestamp: "2023-10-23T14:00:00Z" }, { status: "assembled", timestamp: "2023-10-23T16:00:00Z" }, { status: "shipped", timestamp: "2023-10-24T08:00:00Z" }] },
    { id: "#ORD-7389", patientName: "Priya Mehta", patientInitials: "PM", items: [{ name: "Thyroxine 50mcg", dosage: "50mcg", quantity: 90 }], total: "₹95", date: "Oct 23, 2023", status: "delivered", timeline: [{ status: "processing", timestamp: "2023-10-23T10:00:00Z" }, { status: "assembled", timestamp: "2023-10-23T12:00:00Z" }, { status: "shipped", timestamp: "2023-10-23T15:00:00Z" }, { status: "delivered", timestamp: "2023-10-24T10:00:00Z" }] },
    { id: "#ORD-7388", patientName: "Suresh Kumar", patientInitials: "SK", items: [{ name: "Clopidogrel 75mg", dosage: "75mg", quantity: 30 }, { name: "Aspirin 75mg", dosage: "75mg", quantity: 30 }, { name: "Atorvastatin 10mg", dosage: "10mg", quantity: 30 }, { name: "Metoprolol 50mg", dosage: "50mg", quantity: 60 }], total: "₹720", date: "Oct 22, 2023", status: "processing", timeline: [{ status: "processing", timestamp: "2023-10-22T08:00:00Z" }] },
];

export const seedPatients: Patient[] = [
    { id: "pat-1", name: "Rajesh Kumar", initials: "RK", age: 54, condition: "Diabetes Type 2", phone: "+91 98765 43210", language: "Hindi", lastOrder: "Oct 24, 2023", adherence: 92, active: true, prescriptionIds: ["RX-7392"] },
    { id: "pat-2", name: "Anita Desai", initials: "AD", age: 62, condition: "Hypertension", phone: "+91 98765 43211", language: "Hindi", lastOrder: "Oct 24, 2023", adherence: 88, active: true, prescriptionIds: ["RX-7391"] },
    { id: "pat-3", name: "Vikram Singh", initials: "VS", age: 48, condition: "Cholesterol", phone: "+91 97654 32100", language: "English", lastOrder: "Oct 23, 2023", adherence: 75, active: true, prescriptionIds: ["RX-7390"] },
    { id: "pat-4", name: "Priya Mehta", initials: "PM", age: 29, condition: "Thyroid", phone: "+91 99876 54321", language: "Gujarati", lastOrder: "Oct 23, 2023", adherence: 95, active: true, prescriptionIds: ["RX-7389"] },
    { id: "pat-5", name: "Suresh Kumar", initials: "SK", age: 71, condition: "Cardiac", phone: "+91 96543 21098", language: "Hindi", lastOrder: "Oct 20, 2023", adherence: 60, active: false, prescriptionIds: ["RX-7388"] },
    { id: "pat-6", name: "Meena Patel", initials: "MP", age: 45, condition: "Diabetes Type 2", phone: "+91 98765 43219", language: "Gujarati", lastOrder: "Oct 18, 2023", adherence: 82, active: true, prescriptionIds: ["RX-7387"] },
];

export function initSeedData() {
    if (!localStorage.getItem("gp_prescriptions")) {
        localStorage.setItem("gp_prescriptions", JSON.stringify(seedPrescriptions));
    }
    if (!localStorage.getItem("gp_inventory")) {
        localStorage.setItem("gp_inventory", JSON.stringify(seedInventory));
    }
    if (!localStorage.getItem("gp_patients")) {
        localStorage.setItem("gp_patients", JSON.stringify(seedPatients));
    }
}
