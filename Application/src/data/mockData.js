export const mockPatients = [
    {
        id: "P001",
        name: "Emma Johnson",
        age: 32,
        bloodType: "A+",
        email: "emma.j@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Maple Ave, Springfield",
        medicalHistory: ["Asthma", "Seasonal Allergies"]
    },
    {
        id: "P002",
        name: "Michael Chen",
        age: 45,
        bloodType: "O+",
        email: "m.chen@example.com",
        phone: "+1 (555) 987-6543",
        address: "456 Oak St, Springfield",
        medicalHistory: ["Hypertension", "Diabetes Type 2"]
    },
    {
        id: "P003",
        name: "Sarah Williams",
        age: 28,
        bloodType: "B+",
        email: "sarah.w@example.com",
        phone: "+1 (555) 234-5678",
        address: "789 Pine Ln, Springfield",
        medicalHistory: ["None"]
    },
    {
        id: "P004",
        name: "James Brown",
        age: 55,
        bloodType: "AB+",
        email: "j.brown@example.com",
        phone: "+1 (555) 876-5432",
        address: "321 Elm St, Springfield",
        medicalHistory: ["Arthritis", "High Cholesterol"]
    },
    {
        id: "P005",
        name: "Lisa Davis",
        age: 38,
        bloodType: "A-",
        email: "lisa.d@example.com",
        phone: "+1 (555) 345-6789",
        address: "654 Birch Rd, Springfield",
        medicalHistory: ["Migraine"]
    },
    {
        id: "P006",
        name: "Robert Miller",
        age: 62,
        bloodType: "O-",
        email: "top.bob@example.com",
        phone: "+1 (555) 432-1098",
        address: "987 Cedar Blvd, Springfield",
        medicalHistory: ["Sciatica", "Glaucoma"]
    },
    {
        id: "P007",
        name: "Jennifer Wilson",
        age: 29,
        bloodType: "B-",
        email: "jen.wils@example.com",
        phone: "+1 (555) 567-8901",
        address: "147 Willow Way, Springfield",
        medicalHistory: ["Anemia", "PCOS"]
    },
    {
        id: "P008",
        name: "David Martinez",
        age: 41,
        bloodType: "A+",
        email: "dmartinez@example.com",
        phone: "+1 (555) 098-7654",
        address: "258 Spruce Ct, Springfield",
        medicalHistory: ["GERD"]
    },
    {
        id: "P009",
        name: "Amanda Garcia",
        age: 35,
        bloodType: "O+",
        email: "agarcia@example.com",
        phone: "+1 (555) 678-9012",
        address: "369 Aspen Dr, Springfield",
        medicalHistory: ["Depression", "Insomnia"]
    },
    {
        id: "P010",
        name: "Thomas Anderson",
        age: 50,
        bloodType: "AB-",
        email: "neo.tom@example.com",
        phone: "+1 (555) 210-9876",
        address: "159 Magnolia Ave, Springfield",
        medicalHistory: ["Hypertension", "Sleep Apnea"]
    },
    {
        id: "P011",
        name: "Patricia Taylor",
        age: 68,
        bloodType: "B+",
        email: "pat.taylor@example.com",
        phone: "+1 (555) 789-0123",
        address: "753 Redwood Dr, Springfield",
        medicalHistory: ["Osteoporosis", "Cataracts"]
    },
    {
        id: "P012",
        name: "Christopher Lee",
        age: 24,
        bloodType: "A-",
        email: "chris.lee@example.com",
        phone: "+1 (555) 321-0987",
        address: "951 Cypress Ln, Springfield",
        medicalHistory: ["Eczema"]
    }
];

export const mockAppointments = [
    // Friday, January 30, 2026
    {
        id: "A001",
        patientId: "P001",
        patientName: "Emma Johnson",
        date: "2026-01-30",
        time: "09:00",
        symptoms: "Persistent headache for 3 days, sensitivity to light",
        tags: ["Headache", "Fatigue", "Blurred Vision"],
        status: "pending"
    },
    {
        id: "A002",
        patientId: "P002",
        patientName: "Michael Chen",
        date: "2026-01-30",
        time: "10:00",
        symptoms: "Blood sugar levels fluctuating, increased thirst",
        tags: ["Fatigue", "Frequent Urination", "Weight Loss"],
        status: "pending"
    },
    {
        id: "A003",
        patientId: "P003",
        patientName: "Sarah Williams",
        date: "2026-01-30",
        time: "11:00",
        symptoms: "Wheezing and difficulty breathing, especially at night",
        tags: ["Shortness of Breath", "Cough", "Chest Pain"],
        status: "pending"
    },

    // Saturday, January 31, 2026
    {
        id: "A004",
        patientId: "P004",
        patientName: "James Brown",
        date: "2026-01-31",
        time: "09:00",
        symptoms: "Joint pain in knees and hands, stiffness in the morning",
        tags: ["Joint Pain", "Swelling", "Muscle Pain"],
        status: "pending"
    },
    {
        id: "A005",
        patientId: "P005",
        patientName: "Lisa Davis",
        date: "2026-01-31",
        time: "10:30",
        symptoms: "Severe migraine with nausea, occurring twice a week",
        tags: ["Headache", "Nausea", "Blurred Vision"],
        status: "pending"
    },
    {
        id: "A006",
        patientId: "P006",
        patientName: "Robert Miller",
        date: "2026-01-31",
        time: "14:00",
        symptoms: "Lower back pain radiating to left leg",
        tags: ["Back Pain", "Numbness", "Muscle Pain"],
        status: "pending"
    },

    // Sunday, February 01, 2026
    {
        id: "A007",
        patientId: "P007",
        patientName: "Jennifer Wilson",
        date: "2026-02-01",
        time: "09:30",
        symptoms: "Irregular periods, weight gain, acne",
        tags: ["Weight Gain", "Fatigue", "Anxiety"],
        status: "pending"
    },
    {
        id: "A008",
        patientId: "P008",
        patientName: "David Martinez",
        date: "2026-02-01",
        time: "11:00",
        symptoms: "Chest discomfort after physical activity",
        tags: ["Chest Pain", "Shortness of Breath", "Fatigue"],
        status: "pending"
    },
    {
        id: "A009",
        patientId: "P009",
        patientName: "Amanda Garcia",
        date: "2026-02-01",
        time: "16:00",
        symptoms: "Unable to sleep more than 3-4 hours, feeling sad",
        tags: ["Insomnia", "Depression", "Fatigue"],
        status: "pending"
    },

    // Monday, February 02, 2026
    {
        id: "A010",
        patientId: "P010",
        patientName: "Thomas Anderson",
        date: "2026-02-02",
        time: "08:30",
        symptoms: "Loud snoring, waking up gasping for air",
        tags: ["Snoring", "Fatigue", "Sleep Apnea"],
        status: "pending"
    },
    {
        id: "A011",
        patientId: "P011",
        patientName: "Patricia Taylor",
        date: "2026-02-02",
        time: "10:00",
        symptoms: "Blurry vision, difficulty seeing at night",
        tags: ["Vision Loss", "Eye Pain"],
        status: "pending"
    },
    {
        id: "A012",
        patientId: "P012",
        patientName: "Christopher Lee",
        date: "2026-02-02",
        time: "13:30",
        symptoms: "Itchy red patches on arms and legs",
        tags: ["Itching", "Redness", "Dry Skin"],
        status: "pending"
    }
];

export const mockMedicines = [
    { id: "M001", name: "Paracetamol", category: "Pain Relief" },
    { id: "M002", name: "Ibuprofen", category: "Pain Relief" },
    { id: "M003", name: "Amoxicillin", category: "Antibiotic" },
    { id: "M004", name: "Metformin", category: "Diabetes" },
    { id: "M005", name: "Atorvastatin", category: "Cholesterol" },
    { id: "M006", name: "Omeprazole", category: "Acid Reflux" },
    { id: "M007", name: "Amlodipine", category: "Blood Pressure" },
    { id: "M008", name: "Metoprolol", category: "Blood Pressure" },
    { id: "M009", name: "Albuterol", category: "Asthma" },
    { id: "M010", name: "Gabapentin", category: "Nerve Pain" },
    { id: "M011", name: "Levothyroxine", category: "Thyroid" },
    { id: "M012", name: "Lisinopril", category: "Blood Pressure" },
    { id: "M013", name: "Azithromycin", category: "Antibiotic" },
    { id: "M014", name: "Simvastatin", category: "Cholesterol" },
    { id: "M015", name: "Losartan", category: "Blood Pressure" },
    { id: "M016", name: "Hydrochlorothiazide", category: "Blood Pressure" },
    { id: "M017", name: "Sertraline", category: "Depression" },
    { id: "M018", name: "Montelukast", category: "Asthma" },
    { id: "M019", name: "Fluticasone", category: "Allergy" },
    { id: "M020", name: "Escitalopram", category: "Depression" },
    { id: "M021", name: "Furosemide", category: "Diuretic" },
    { id: "M022", name: "Pantoprazole", category: "Acid Reflux" },
    { id: "M023", name: "Prednisone", category: "Anti-inflammatory" },
    { id: "M024", name: "Tamsulosin", category: "Prostate" },
    { id: "M025", name: "Cetirizine", category: "Allergy" },
    { id: "M026", name: "Loratadine", category: "Allergy" },
    { id: "M027", name: "Clopidogrel", category: "Blood Thinner" },
    { id: "M028", name: "Duloxetine", category: "Depression" },
    { id: "M029", name: "Meloxicam", category: "Pain Relief" },
    { id: "M030", name: "Warfarin", category: "Blood Thinner" },
    { id: "M031", name: "Rosuvastatin", category: "Cholesterol" },
    { id: "M032", name: "Tramadol", category: "Pain Relief" },
    { id: "M033", name: "Ciprofloxacin", category: "Antibiotic" },
    { id: "M034", name: "Bupropion", category: "Depression" },
    { id: "M035", name: "Doxycycline", category: "Antibiotic" },
    { id: "M036", name: "Cephalexin", category: "Antibiotic" },
    { id: "M037", name: "Venlafaxine", category: "Depression" },
    { id: "M038", name: "Trazodone", category: "Sleep" },
    { id: "M039", name: "Esomeprazole", category: "Acid Reflux" },
    { id: "M040", name: "Aspirin", category: "Blood Thinner" },
    { id: "M041", name: "Famotidine", category: "Acid Reflux" },
    { id: "M042", name: "Diclofenac", category: "Pain Relief" },
    { id: "M043", name: "Naproxen", category: "Pain Relief" },
    { id: "M044", name: "Celecoxib", category: "Pain Relief" },
    { id: "M045", name: "Pregabalin", category: "Nerve Pain" },
    { id: "M046", name: "Oxycodone", category: "Pain Relief" },
    { id: "M047", name: "Allopurinol", category: "Gout" },
    { id: "M048", name: "Cyclobenzaprine", category: "Muscle Relaxant" },
    { id: "M049", name: "Insulin Glargine", category: "Diabetes" },
    { id: "M050", name: "Sitagliptin", category: "Diabetes" }
];
