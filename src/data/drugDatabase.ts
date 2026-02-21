import type { Drug } from "@/types";

export const drugDatabase: Drug[] = [
    // ─── Diabetes ───
    { id: "d1", name: "Metformin 500mg", genericName: "Metformin HCl", category: "Diabetes", dosages: ["250mg", "500mg", "750mg", "1000mg"], unit: "tablets" },
    { id: "d2", name: "Glimepiride 2mg", genericName: "Glimepiride", category: "Diabetes", dosages: ["1mg", "2mg", "3mg", "4mg"], unit: "tablets" },
    { id: "d3", name: "Insulin Glargine", genericName: "Insulin Glargine", category: "Diabetes", dosages: ["100IU/mL"], unit: "vials" },
    { id: "d4", name: "Sitagliptin 100mg", genericName: "Sitagliptin Phosphate", category: "Diabetes", dosages: ["25mg", "50mg", "100mg"], unit: "tablets" },
    { id: "d5", name: "Pioglitazone 15mg", genericName: "Pioglitazone HCl", category: "Diabetes", dosages: ["15mg", "30mg", "45mg"], unit: "tablets" },
    { id: "d6", name: "Gliclazide 80mg", genericName: "Gliclazide", category: "Diabetes", dosages: ["40mg", "80mg"], unit: "tablets" },
    { id: "d7", name: "Voglibose 0.3mg", genericName: "Voglibose", category: "Diabetes", dosages: ["0.2mg", "0.3mg"], unit: "tablets" },

    // ─── Hypertension ───
    { id: "d8", name: "Telmisartan 40mg", genericName: "Telmisartan", category: "Hypertension", dosages: ["20mg", "40mg", "80mg"], unit: "tablets" },
    { id: "d9", name: "Amlodipine 5mg", genericName: "Amlodipine Besylate", category: "Hypertension", dosages: ["2.5mg", "5mg", "10mg"], unit: "tablets" },
    { id: "d10", name: "Losartan 50mg", genericName: "Losartan Potassium", category: "Hypertension", dosages: ["25mg", "50mg", "100mg"], unit: "tablets" },
    { id: "d11", name: "Ramipril 5mg", genericName: "Ramipril", category: "Hypertension", dosages: ["1.25mg", "2.5mg", "5mg", "10mg"], unit: "tablets" },
    { id: "d12", name: "Enalapril 5mg", genericName: "Enalapril Maleate", category: "Hypertension", dosages: ["2.5mg", "5mg", "10mg", "20mg"], unit: "tablets" },
    { id: "d13", name: "Olmesartan 20mg", genericName: "Olmesartan Medoxomil", category: "Hypertension", dosages: ["10mg", "20mg", "40mg"], unit: "tablets" },
    { id: "d14", name: "Cilnidipine 10mg", genericName: "Cilnidipine", category: "Hypertension", dosages: ["5mg", "10mg", "20mg"], unit: "tablets" },
    { id: "d15", name: "Metoprolol 50mg", genericName: "Metoprolol Tartrate", category: "Hypertension", dosages: ["25mg", "50mg", "100mg"], unit: "tablets" },

    // ─── Cholesterol ───
    { id: "d16", name: "Atorvastatin 10mg", genericName: "Atorvastatin Calcium", category: "Cholesterol", dosages: ["10mg", "20mg", "40mg", "80mg"], unit: "tablets" },
    { id: "d17", name: "Rosuvastatin 10mg", genericName: "Rosuvastatin Calcium", category: "Cholesterol", dosages: ["5mg", "10mg", "20mg", "40mg"], unit: "tablets" },
    { id: "d18", name: "Fenofibrate 160mg", genericName: "Fenofibrate", category: "Cholesterol", dosages: ["145mg", "160mg", "200mg"], unit: "tablets" },

    // ─── Thyroid ───
    { id: "d19", name: "Thyroxine 50mcg", genericName: "Levothyroxine Sodium", category: "Thyroid", dosages: ["25mcg", "50mcg", "75mcg", "100mcg", "125mcg"], unit: "tablets" },
    { id: "d20", name: "Methimazole 5mg", genericName: "Methimazole", category: "Thyroid", dosages: ["5mg", "10mg"], unit: "tablets" },

    // ─── Cardiac ───
    { id: "d21", name: "Clopidogrel 75mg", genericName: "Clopidogrel Bisulphate", category: "Cardiac", dosages: ["75mg", "150mg"], unit: "tablets" },
    { id: "d22", name: "Aspirin 75mg", genericName: "Acetylsalicylic Acid", category: "Cardiac", dosages: ["75mg", "150mg", "325mg"], unit: "tablets" },
    { id: "d23", name: "Warfarin 5mg", genericName: "Warfarin Sodium", category: "Cardiac", dosages: ["1mg", "2mg", "5mg"], unit: "tablets" },
    { id: "d24", name: "Digoxin 0.25mg", genericName: "Digoxin", category: "Cardiac", dosages: ["0.125mg", "0.25mg"], unit: "tablets" },
    { id: "d25", name: "Rivaroxaban 10mg", genericName: "Rivaroxaban", category: "Cardiac", dosages: ["10mg", "15mg", "20mg"], unit: "tablets" },

    // ─── GI / Acidity ───
    { id: "d26", name: "Pantoprazole 40mg", genericName: "Pantoprazole Sodium", category: "Gastric", dosages: ["20mg", "40mg"], unit: "tablets" },
    { id: "d27", name: "Omeprazole 20mg", genericName: "Omeprazole", category: "Gastric", dosages: ["10mg", "20mg", "40mg"], unit: "capsules" },
    { id: "d28", name: "Ranitidine 150mg", genericName: "Ranitidine HCl", category: "Gastric", dosages: ["150mg", "300mg"], unit: "tablets" },
    { id: "d29", name: "Domperidone 10mg", genericName: "Domperidone", category: "Gastric", dosages: ["10mg", "20mg"], unit: "tablets" },
    { id: "d30", name: "Sucralfate 1g", genericName: "Sucralfate", category: "Gastric", dosages: ["500mg", "1g"], unit: "tablets" },

    // ─── Pain / Anti-inflammatory ───
    { id: "d31", name: "Paracetamol 500mg", genericName: "Acetaminophen", category: "Pain", dosages: ["325mg", "500mg", "650mg"], unit: "tablets" },
    { id: "d32", name: "Ibuprofen 400mg", genericName: "Ibuprofen", category: "Pain", dosages: ["200mg", "400mg", "600mg"], unit: "tablets" },
    { id: "d33", name: "Diclofenac 50mg", genericName: "Diclofenac Sodium", category: "Pain", dosages: ["25mg", "50mg", "100mg"], unit: "tablets" },
    { id: "d34", name: "Aceclofenac 100mg", genericName: "Aceclofenac", category: "Pain", dosages: ["100mg", "200mg"], unit: "tablets" },
    { id: "d35", name: "Tramadol 50mg", genericName: "Tramadol HCl", category: "Pain", dosages: ["50mg", "100mg"], unit: "capsules" },

    // ─── Antibiotics ───
    { id: "d36", name: "Amoxicillin 500mg", genericName: "Amoxicillin Trihydrate", category: "Antibiotic", dosages: ["250mg", "500mg"], unit: "capsules" },
    { id: "d37", name: "Azithromycin 500mg", genericName: "Azithromycin", category: "Antibiotic", dosages: ["250mg", "500mg"], unit: "tablets" },
    { id: "d38", name: "Ciprofloxacin 500mg", genericName: "Ciprofloxacin HCl", category: "Antibiotic", dosages: ["250mg", "500mg", "750mg"], unit: "tablets" },
    { id: "d39", name: "Levofloxacin 500mg", genericName: "Levofloxacin", category: "Antibiotic", dosages: ["250mg", "500mg", "750mg"], unit: "tablets" },
    { id: "d40", name: "Cefixime 200mg", genericName: "Cefixime", category: "Antibiotic", dosages: ["100mg", "200mg", "400mg"], unit: "tablets" },
    { id: "d41", name: "Doxycycline 100mg", genericName: "Doxycycline Hyclate", category: "Antibiotic", dosages: ["50mg", "100mg"], unit: "capsules" },
    { id: "d42", name: "Metronidazole 400mg", genericName: "Metronidazole", category: "Antibiotic", dosages: ["200mg", "400mg"], unit: "tablets" },

    // ─── Respiratory ───
    { id: "d43", name: "Montelukast 10mg", genericName: "Montelukast Sodium", category: "Respiratory", dosages: ["4mg", "5mg", "10mg"], unit: "tablets" },
    { id: "d44", name: "Salbutamol 4mg", genericName: "Salbutamol Sulphate", category: "Respiratory", dosages: ["2mg", "4mg"], unit: "tablets" },
    { id: "d45", name: "Cetirizine 10mg", genericName: "Cetirizine HCl", category: "Allergy", dosages: ["5mg", "10mg"], unit: "tablets" },
    { id: "d46", name: "Levocetirizine 5mg", genericName: "Levocetirizine", category: "Allergy", dosages: ["2.5mg", "5mg"], unit: "tablets" },
    { id: "d47", name: "Fexofenadine 120mg", genericName: "Fexofenadine HCl", category: "Allergy", dosages: ["60mg", "120mg", "180mg"], unit: "tablets" },

    // ─── Vitamins / Supplements ───
    { id: "d48", name: "Calcium + Vitamin D3", genericName: "Calcium Carbonate + Cholecalciferol", category: "Supplement", dosages: ["500mg+250IU", "500mg+500IU"], unit: "tablets" },
    { id: "d49", name: "Iron + Folic Acid", genericName: "Ferrous Sulphate + Folic Acid", category: "Supplement", dosages: ["100mg+0.5mg", "150mg+0.5mg"], unit: "tablets" },
    { id: "d50", name: "Vitamin B Complex", genericName: "B-Complex Vitamins", category: "Supplement", dosages: ["Standard"], unit: "tablets" },
    { id: "d51", name: "Methylcobalamin 1500mcg", genericName: "Methylcobalamin", category: "Supplement", dosages: ["500mcg", "1500mcg"], unit: "tablets" },
    { id: "d52", name: "Zinc 50mg", genericName: "Zinc Sulphate", category: "Supplement", dosages: ["20mg", "50mg"], unit: "tablets" },

    // ─── Mental Health ───
    { id: "d53", name: "Escitalopram 10mg", genericName: "Escitalopram Oxalate", category: "Mental Health", dosages: ["5mg", "10mg", "20mg"], unit: "tablets" },
    { id: "d54", name: "Sertraline 50mg", genericName: "Sertraline HCl", category: "Mental Health", dosages: ["25mg", "50mg", "100mg"], unit: "tablets" },
    { id: "d55", name: "Alprazolam 0.5mg", genericName: "Alprazolam", category: "Mental Health", dosages: ["0.25mg", "0.5mg", "1mg"], unit: "tablets" },
    { id: "d56", name: "Clonazepam 0.5mg", genericName: "Clonazepam", category: "Mental Health", dosages: ["0.25mg", "0.5mg", "1mg", "2mg"], unit: "tablets" },

    // ─── Kidney / Urology ───
    { id: "d57", name: "Tamsulosin 0.4mg", genericName: "Tamsulosin HCl", category: "Urology", dosages: ["0.2mg", "0.4mg"], unit: "capsules" },
    { id: "d58", name: "Potassium Citrate 1100mg", genericName: "Potassium Citrate", category: "Urology", dosages: ["550mg", "1100mg"], unit: "tablets" },

    // ─── Skin ───
    { id: "d59", name: "Hydroxychloroquine 200mg", genericName: "Hydroxychloroquine Sulphate", category: "Autoimmune", dosages: ["200mg", "400mg"], unit: "tablets" },
    { id: "d60", name: "Prednisolone 5mg", genericName: "Prednisolone", category: "Steroid", dosages: ["5mg", "10mg", "20mg", "40mg"], unit: "tablets" },

    // ─── Neuro ───
    { id: "d61", name: "Gabapentin 300mg", genericName: "Gabapentin", category: "Neuro", dosages: ["100mg", "300mg", "400mg", "600mg"], unit: "capsules" },
    { id: "d62", name: "Pregabalin 75mg", genericName: "Pregabalin", category: "Neuro", dosages: ["50mg", "75mg", "150mg", "300mg"], unit: "capsules" },

    // ─── Eye ───
    { id: "d63", name: "Brimonidine 0.2%", genericName: "Brimonidine Tartrate", category: "Ophthalmology", dosages: ["0.15%", "0.2%"], unit: "drops" },
    { id: "d64", name: "Timolol 0.5%", genericName: "Timolol Maleate", category: "Ophthalmology", dosages: ["0.25%", "0.5%"], unit: "drops" },

    // ─── More common medicines ───
    { id: "d65", name: "Razo 20mg", genericName: "Rabeprazole Sodium", category: "Gastric", dosages: ["10mg", "20mg"], unit: "tablets" },
    { id: "d66", name: "Dolo 650", genericName: "Paracetamol", category: "Pain", dosages: ["650mg"], unit: "tablets" },
    { id: "d67", name: "Crocin Advance", genericName: "Paracetamol", category: "Pain", dosages: ["500mg"], unit: "tablets" },
    { id: "d68", name: "Shelcal 500", genericName: "Calcium + Vitamin D3", category: "Supplement", dosages: ["500mg+250IU"], unit: "tablets" },
    { id: "d69", name: "Ecosprin 75", genericName: "Aspirin", category: "Cardiac", dosages: ["75mg"], unit: "tablets" },
    { id: "d70", name: "Pan-D", genericName: "Pantoprazole + Domperidone", category: "Gastric", dosages: ["40mg+30mg"], unit: "capsules" },
    { id: "d71", name: "Glycomet GP 1", genericName: "Glimepiride + Metformin", category: "Diabetes", dosages: ["1mg+500mg", "2mg+500mg"], unit: "tablets" },
    { id: "d72", name: "Telma 40", genericName: "Telmisartan", category: "Hypertension", dosages: ["20mg", "40mg", "80mg"], unit: "tablets" },
    { id: "d73", name: "Thyronorm 50mcg", genericName: "Levothyroxine", category: "Thyroid", dosages: ["25mcg", "50mcg", "75mcg", "100mcg"], unit: "tablets" },
    { id: "d74", name: "Montair LC", genericName: "Montelukast + Levocetirizine", category: "Respiratory", dosages: ["10mg+5mg"], unit: "tablets" },
    { id: "d75", name: "Augmentin 625", genericName: "Amoxicillin + Clavulanic Acid", category: "Antibiotic", dosages: ["375mg", "625mg", "1g"], unit: "tablets" },
];

export function searchDrugs(query: string): Drug[] {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return drugDatabase
        .filter(
            (d) =>
                d.name.toLowerCase().includes(q) ||
                d.genericName.toLowerCase().includes(q) ||
                d.category.toLowerCase().includes(q)
        )
        .slice(0, 10);
}
