import React, { useMemo, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Stethoscope, User, Heart, FileText, Tag, Calendar, Clock, Save, Search, Plus, File, Trash2, X, Check } from 'lucide-react';
import { mockMedicines } from '../data/mockData';
import { Input } from './ui/input';
import { useData } from '../context/DataContext';

export function AppointmentEditor({ appointment, onBack, onSave }) {
    const { patients } = useData();
    const [view, setView] = useState('details'); // 'details' or 'prescription'

    // Prescription State
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [prescribedMedicines, setPrescribedMedicines] = useState([]);
    const [doctorNotes, setDoctorNotes] = useState('');

    // Form State
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [duration, setDuration] = useState('');

    // Load existing prescription if available
    useEffect(() => {
        if (appointment.prescription) {
            setPrescribedMedicines(appointment.prescription.medicines || []);
            setDoctorNotes(appointment.prescription.notes || '');
        }
    }, [appointment]);

    // Find the full patient details
    const pId = appointment.patient_id || appointment.patientId;
    const patient = useMemo(() => {
        if (!pId) return {};
        // Match real patient from context (who has booked before)
        return patients.find(p => p.id === pId) || {
            name: appointment.patient_name || appointment.patientName || 'Unknown',
            id: pId,
            age: '--',
            bloodType: '--',
            email: 'N/A',
            phone: 'N/A',
            address: 'N/A',
            medicalHistory: []
        };
    }, [pId, patients, appointment]);

    // Safe gender fallback
    const gender = 'Unknown';

    const filteredMedicines = useMemo(() => {
        if (!searchQuery) return [];
        return mockMedicines.filter(med =>
            med.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5); // Limit to 5 results
    }, [searchQuery]);

    const handleAddMedicine = () => {
        if (selectedMedicine && dosage && frequency && duration) {
            setPrescribedMedicines([
                ...prescribedMedicines,
                {
                    ...selectedMedicine,
                    dosage,
                    frequency,
                    duration,
                    tempId: Date.now()
                }
            ]);
            // Reset form
            setSelectedMedicine(null);
            setSearchQuery('');
            setIsSearching(false);
            setDosage('');
            setFrequency('');
            setDuration('');
        }
    };

    const handleRemoveMedicine = (tempId) => {
        setPrescribedMedicines(prescribedMedicines.filter(m => m.tempId !== tempId));
    };

    const handleSavePrescription = () => {
        const updatedAppointment = {
            ...appointment,
            status: 'completed',
            prescription: {
                medicines: prescribedMedicines,
                notes: doctorNotes,
                date: new Date().toISOString()
            }
        };
        onSave(updatedAppointment);
    };

    return (
        <div className="min-h-screen bg-background text-foreground animate-in fade-in duration-300">
            {/* Top Navigation Bar */}
            <header className="flex justify-between items-center px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-2 text-primary">
                    <Stethoscope size={24} />
                    <span className="font-semibold text-lg text-white">Doctor Portal</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Logged in as Dr. Smith</span>
                    <Button variant="ghost" className="text-sm text-gray-400 hover:text-white">Switch Portal</Button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Back and Actions */}
                <div className="flex justify-between items-center">
                    <Button
                        onClick={onBack}
                        variant="ghost"
                        className="gap-2 text-gray-400 hover:text-white px-0 hover:bg-transparent"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </Button>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => setView('details')}
                            variant={view === 'details' ? 'default' : 'outline'}
                            className={view === 'details' ? "bg-primary text-black hover:bg-primary/90 font-medium" : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"}
                        >
                            Patient Data
                        </Button>
                        <Button
                            onClick={() => setView('prescription')}
                            variant={view === 'prescription' ? 'default' : 'outline'}
                            className={view === 'prescription' ? "bg-primary text-black hover:bg-primary/90 font-medium" : "border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"}
                        >
                            Prescription
                        </Button>
                    </div>
                </div>

                {/* Main Patient Header Card */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{appointment.patient_name || appointment.patientName}</h1>
                            <p className="text-gray-400 flex items-center gap-2 text-sm">
                                Patient ID: <span className="text-white font-mono">{pId}</span>
                                <span className="text-gray-600">|</span>
                                Age: <span className="text-white">{patient.age}</span>
                                <span className="text-gray-600">|</span>
                                Blood Type: <span className="text-white">{patient.bloodType}</span>
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                Appointment: <span className="text-white">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {appointment.time}</span>
                            </p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${appointment.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                            }`}>
                            {appointment.status}
                        </span>
                    </div>
                </div>

                {view === 'details' ? (
                    /* ---------------- PATIENT DATA VIEW ---------------- */
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Patient Information Section */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <User size={20} />
                                <h3 className="font-semibold text-lg text-white">Patient Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Full Name</label>
                                    <p className="text-white font-medium text-lg">{patient.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Patient ID</label>
                                    <p className="text-white font-medium text-lg font-mono">{patient.id}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Age</label>
                                    <p className="text-white font-medium text-lg">{patient.age} years</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Gender</label>
                                    <p className="text-white font-medium text-lg">{gender}</p>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Email</label>
                                    <p className="text-white font-medium truncate">{patient.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Phone</label>
                                    <p className="text-white font-medium font-mono">{patient.phone}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Blood Type</label>
                                    <p className="text-white font-medium text-lg">{patient.bloodType}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Address</label>
                                    <p className="text-white font-medium truncate">{patient.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Medical History Section */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-2 mb-4 text-red-400">
                                <Heart size={20} />
                                <h3 className="font-semibold text-lg text-white">Medical History</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                                    patient.medicalHistory.map((condition, index) => (
                                        <span key={index} className="px-3 py-1 bg-red-500/10 text-red-300 border border-red-500/20 rounded-md text-sm font-medium">
                                            {condition}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-500 italic">No recorded medical history</span>
                                )}
                            </div>
                        </div>

                        {/* Current Symptoms Section */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-2 mb-6 text-blue-400">
                                <FileText size={20} />
                                <h3 className="font-semibold text-lg text-white">Current Symptoms</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-2">Patient's Symptom Description</label>
                                    <div className="bg-background/50 p-4 rounded-lg border border-border text-white text-lg">
                                        {appointment.symptoms}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-500 block mb-2">How Patient is Feeling</label>
                                    <div className="bg-background/50 p-4 rounded-lg border border-border text-white text-lg">
                                        Patient reports feeling fatigued and unable to focus on daily tasks due to the symptoms.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Symptom Tags & Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-2 mb-4 text-purple-400">
                                    <Tag size={20} />
                                    <h3 className="font-semibold text-lg text-white">Symptom Tags</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {appointment.tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-white text-black rounded-md text-sm font-semibold">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-2 mb-4 text-yellow-400">
                                    <Calendar size={20} />
                                    <h3 className="font-semibold text-lg text-white">Appointment Details</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Date</label>
                                        <p className="text-white font-medium text-sm">{new Date(appointment.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Time</label>
                                        <p className="text-white font-medium text-sm">{appointment.time}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 block mb-1">Status</label>
                                        <span className={`font-medium text-sm capitalize ${appointment.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* ---------------- PRESCRIPTION VIEW ---------------- */
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Prescription Header Banner */}
                        <div className="bg-card border border-border rounded-lg p-5 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Prescription</h2>
                                    <p className="text-gray-400 text-sm">
                                        For: <span className="font-semibold text-gray-200">{appointment.patient_name || appointment.patientName}</span> |
                                        Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <Button
                                className="bg-primary text-black hover:bg-primary/90 font-medium gap-2"
                                onClick={handleSavePrescription}
                            >
                                <Save size={18} />
                                Save Prescription
                            </Button>
                        </div>

                        {/* Add Medicine Bar */}
                        <div className="bg-card border border-border rounded-xl p-4 shadow-lg space-y-4">
                            {!selectedMedicine ? (
                                <>
                                    <h3 className="font-semibold text-white ml-2">Add Medicine</h3>
                                    <div className="relative">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input
                                                placeholder="Search Medicine"
                                                className="pl-9 bg-background/50 border-gray-700 text-white placeholder:text-gray-500"
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(e.target.value);
                                                    setIsSearching(true);
                                                }}
                                            />
                                        </div>
                                        {isSearching && searchQuery && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-xl z-20 max-h-60 overflow-y-auto">
                                                {filteredMedicines.length > 0 ? (
                                                    filteredMedicines.map(med => (
                                                        <div
                                                            key={med.id}
                                                            className="p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800 last:border-0"
                                                            onClick={() => {
                                                                setSelectedMedicine(med);
                                                                setSearchQuery('');
                                                                setIsSearching(false);
                                                            }}
                                                        >
                                                            <p className="font-medium text-white">{med.name}</p>
                                                            <p className="text-xs text-gray-500">Category: {med.category}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-gray-500">No medicines found</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="flex justify-between items-center bg-background/50 p-3 rounded-lg border border-border">
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{selectedMedicine.name}</h3>
                                            <p className="text-sm text-gray-400">Category: {selectedMedicine.category}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-400 hover:text-white"
                                            onClick={() => setSelectedMedicine(null)}
                                        >
                                            <X size={18} />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 block mb-1">Dosage</label>
                                            <select
                                                className="w-full bg-background/50 border border-gray-700 rounded-md p-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                                value={dosage}
                                                onChange={(e) => setDosage(e.target.value)}
                                            >
                                                <option value="" disabled>Select dosage</option>
                                                <option value="5mg">5mg</option>
                                                <option value="10mg">10mg</option>
                                                <option value="20mg">20mg</option>
                                                <option value="50mg">50mg</option>
                                                <option value="100mg">100mg</option>
                                                <option value="250mg">250mg</option>
                                                <option value="500mg">500mg</option>
                                                <option value="1000mg">1000mg</option>
                                                <option value="1 tablet">1 tablet</option>
                                                <option value="2 tablets">2 tablets</option>
                                                <option value="5ml">5ml</option>
                                                <option value="10ml">10ml</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 block mb-1">Frequency</label>
                                            <select
                                                className="w-full bg-background/50 border border-gray-700 rounded-md p-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                                value={frequency}
                                                onChange={(e) => setFrequency(e.target.value)}
                                            >
                                                <option value="" disabled>Select frequency</option>
                                                <option value="Once daily">Once daily</option>
                                                <option value="Twice daily">Twice daily</option>
                                                <option value="Thrice daily">Thrice daily</option>
                                                <option value="Every 4 hours">Every 4 hours</option>
                                                <option value="Every 6 hours">Every 6 hours</option>
                                                <option value="Before meals">Before meals</option>
                                                <option value="After meals">After meals</option>
                                                <option value="At bedtime">At bedtime</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-500 block mb-1">Duration</label>
                                            <select
                                                className="w-full bg-background/50 border border-gray-700 rounded-md p-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                            >
                                                <option value="" disabled>Select duration</option>
                                                <option value="3 days">3 days</option>
                                                <option value="5 days">5 days</option>
                                                <option value="7 days">7 days</option>
                                                <option value="10 days">10 days</option>
                                                <option value="14 days">14 days</option>
                                                <option value="1 month">1 month</option>
                                                <option value="3 months">3 months</option>
                                                <option value="Ongoing">Ongoing</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            className="bg-primary text-black hover:bg-primary/90 font-medium"
                                            onClick={handleAddMedicine}
                                            disabled={!dosage || !frequency || !duration}
                                        >
                                            <Plus size={18} className="mr-2" />
                                            Add to Prescription
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                                            onClick={() => setSelectedMedicine(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Prescribed Medicines List */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-lg min-h-[300px]">
                            <h3 className="font-medium text-gray-400 mb-4 ml-1">Prescribed Medicines ({prescribedMedicines.length})</h3>

                            {prescribedMedicines.length === 0 ? (
                                <div className="bg-card/50 rounded-lg p-12 flex flex-col items-center justify-center text-center h-64 border-2 border-dashed border-gray-800">
                                    <div className="p-4 bg-gray-800 rounded-full mb-3 text-gray-400">
                                        <File size={48} />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-200 mb-1">No medicines added yet</h4>
                                    <p className="text-gray-500">Click "Search Medicine" to add medicines to the prescription</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {prescribedMedicines.map((med) => (
                                        <div key={med.tempId} className="bg-white rounded-lg p-4 flex justify-between items-center group animate-in fade-in slide-in-from-bottom-2 duration-300">
                                            <div className="grid grid-cols-4 gap-4 w-full items-center">
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg">{med.name}</p>
                                                    <p className="text-xs text-gray-500">{med.category}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Dosage</p>
                                                    <p className="font-medium text-gray-900">{med.dosage}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Frequency</p>
                                                    <p className="font-medium text-gray-900">{med.frequency}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Duration</p>
                                                    <p className="font-medium text-gray-900">{med.duration}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-400 hover:text-red-600 hover:bg-red-50 ml-4"
                                                onClick={() => handleRemoveMedicine(med.tempId)}
                                            >
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Doctor's Notes */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                            <div className="flex items-center gap-2 mb-4 text-gray-400">
                                <FileText size={20} />
                                <h3 className="font-semibold text-lg text-white">Doctor's Notes</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-white block mb-2">Clinical Notes and Instructions</label>
                                    <textarea
                                        className="w-full h-32 bg-background/50 rounded-lg border border-border p-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                        placeholder="Enter clinical notes, diagnosis, special instructions, follow-up recommendations, lifestyle advice, etc..."
                                        value={doctorNotes}
                                        onChange={(e) => setDoctorNotes(e.target.value)}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">These notes will be included in the prescription and visible to the patient.</p>
                            </div>
                        </div>

                        {/* Bottom Save Button */}
                        <div className="flex justify-end">
                            <Button
                                className="bg-primary text-black hover:bg-primary/90 font-medium gap-2 px-6 py-6 h-auto text-lg"
                                onClick={handleSavePrescription}
                            >
                                <Save size={20} />
                                Save Prescription
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
