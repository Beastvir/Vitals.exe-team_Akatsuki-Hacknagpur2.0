import React, { useState } from 'react';
import { User, HelpCircle, Calendar, X } from 'lucide-react';
import './PatientPortal.css';
import { useData } from '../context/DataContext';

const PatientPortal = ({ onSwitchPortal }) => {
    const { appointments, addAppointment } = useData();
    const [activeTab, setActiveTab] = useState('medical-records');
    const [showBooking, setShowBooking] = useState(false);
    const [symptomTags, setSymptomTags] = useState([]);
    const [symptomInput, setSymptomInput] = useState('');

    // Booking Form State
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [symptomDescription, setSymptomDescription] = useState('');
    const [feelingDescription, setFeelingDescription] = useState('');

    const currentUser = { id: 'P001', name: 'Emma Johnson' }; // Hardcoded for demo

    // Filter appointments for current user
    const myAppointments = appointments.filter(a => a.patientId === currentUser.id);

    const commonSymptoms = [
        "Fever", "Cough", "Headache", "Fatigue", "Nausea", "Dizziness",
        "Chest Pain", "Shortness of Breath", "Abdominal Pain", "Back Pain",
        "Joint Pain", "Muscle Pain", "Sore Throat", "Runny Nose", "Congestion"
    ];

    const handleAddTag = (tag) => {
        if (!symptomTags.includes(tag)) {
            setSymptomTags([...symptomTags, tag]);
        }
    };

    const handleRemoveTag = (tag) => {
        setSymptomTags(symptomTags.filter(t => t !== tag));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && symptomInput.trim()) {
            handleAddTag(symptomInput.trim());
            setSymptomInput('');
        }
    };

    const handleBookAppointment = () => {
        if (!bookingDate || !bookingTime || !symptomDescription) {
            alert("Please fill in all required fields");
            return;
        }

        const newAppointment = {
            id: `A${Date.now()}`,
            patientId: currentUser.id,
            patientName: currentUser.name,
            date: bookingDate,
            time: bookingTime,
            symptoms: symptomDescription,
            tags: symptomTags,
            status: 'pending' // Default status
        };

        addAppointment(newAppointment);

        // Reset form
        setShowBooking(false);
        setSymptomTags([]);
        setBookingDate('');
        setBookingTime('');
        setSymptomDescription('');
        setFeelingDescription('');
        setActiveTab('appointments'); // Switch to appointments tab to see the new booking
    };

    return (
        <div className="patient-portal-container">
            <header className="pp-header">
                <div className="pp-logo-section">
                    <User className="pp-logo-icon" size={24} />
                    <span className="pp-logo-text">Patient Portal</span>
                </div>
                <button
                    onClick={onSwitchPortal}
                    className="pp-switch-portal-link bg-transparent border-0 cursor-pointer text-blue-500 hover:underline"
                >
                    Switch Portal
                </button>
            </header>

            <main className="pp-main">
                {!showBooking && (
                    <div className="pp-welcome-section">
                        <h1>Welcome, Emma Johnson</h1>
                        <p>Manage your health records and appointments</p>
                    </div>
                )}
                {showBooking && (
                    <div className="pp-welcome-section">
                        <h1>Book New Appointment</h1>
                        <p>Schedule an appointment and describe your symptoms</p>
                    </div>
                )}

                {!showBooking && (
                    <div className="pp-tabs">
                        <button
                            className={`pp-tab ${activeTab === 'medical-records' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('medical-records'); setShowBooking(false); }}
                        >
                            <User size={18} />
                            Medical Records
                        </button>
                        <button
                            className={`pp-tab ${activeTab === 'appointments' ? 'active' : ''}`}
                            onClick={() => { setActiveTab('appointments'); setShowBooking(false); }}
                        >
                            <Calendar size={18} />
                            Appointments
                        </button>
                    </div>
                )}

                {activeTab === 'medical-records' && (
                    <div className="pp-content-fade-in">
                        <div className="pp-section">
                            <div className="pp-section-header">
                                <h2>Personal Information</h2>
                                <p>Your basic health information</p>
                            </div>

                            <div className="pp-info-grid">
                                <div className="pp-info-item">
                                    <label>Full Name</label>
                                    <div className="pp-info-value">Emma Johnson</div>
                                </div>
                                <div className="pp-info-item">
                                    <label>Age</label>
                                    <div className="pp-info-value">32 years</div>
                                </div>
                                <div className="pp-info-item">
                                    <label>Gender</label>
                                    <div className="pp-info-value">Female</div>
                                </div>
                                <div className="pp-info-item">
                                    <label>Blood Type</label>
                                    <div className="pp-info-value">A+</div>
                                </div>
                                <div className="pp-info-item">
                                    <label>Email</label>
                                    <div className="pp-info-value">emma.j@email.com</div>
                                </div>
                                <div className="pp-info-item">
                                    <label>Phone</label>
                                    <div className="pp-info-value">555-0101</div>
                                </div>
                                <div className="pp-info-item full-width">
                                    <label>Address</label>
                                    <div className="pp-info-value">123 Maple St, Springfield</div>
                                </div>
                            </div>
                        </div>

                        <div className="pp-section">
                            <div className="pp-section-header">
                                <h2>Medical History</h2>
                                <p>Previous conditions and diagnoses</p>
                            </div>
                            <div className="pp-tags-list">
                                <span className="pp-tag">Hypertension</span>
                                <span className="pp-tag">Seasonal Allergies</span>
                            </div>
                        </div>

                        <div className="pp-section">
                            <div className="pp-section-header">
                                <h2>Past Appointments</h2>
                                <p>Your appointment history</p>
                            </div>
                            <div className="pp-appointment-card">
                                <div className="pp-appt-header">
                                    <h3>Friday, January 30, 2026</h3>
                                </div>
                                <div className="pp-appt-details">
                                    <div className="pp-appt-row">
                                        <span className="pp-appt-label">Time:</span>
                                        <span>09:00</span>
                                    </div>
                                    <div className="pp-appt-row">
                                        <span className="pp-appt-label">Status:</span>
                                        <span className="pp-status-badge pending">pending</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'appointments' && !showBooking && (
                    <div className="pp-content-fade-in">
                        <div className="pp-section-header-row">
                            <div>
                                <h2>Your Appointments</h2>
                                <p>View and book appointments</p>
                            </div>
                            <button className="pp-book-btn" onClick={() => setShowBooking(true)}>
                                + Book New Appointment
                            </button>
                        </div>

                        {myAppointments.length === 0 ? (
                            <div className="pp-section">
                                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                                    <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900">No appointments yet</h3>
                                    <p className="mt-2 text-sm text-gray-500">Book your first appointment to get started.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {myAppointments.map(appt => (
                                    <div key={appt.id} className="pp-appointment-detail-card">
                                        <div className="pp-detail-header">
                                            <div className="pp-dh-left">
                                                <Calendar className="pp-dh-icon" size={20} />
                                                <div>
                                                    <h3 className="pp-dh-date">{new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                                                    <span className="pp-dh-time">Time: {appt.time}</span>
                                                </div>
                                            </div>
                                            <span className={`pp-status-badge ${appt.status}`}>{appt.status}</span>
                                        </div>

                                        <div className="pp-detail-content">
                                            <div className="pp-detail-block">
                                                <label>Symptoms:</label>
                                                <p>{appt.symptoms}</p>
                                            </div>

                                            <div className="pp-detail-block">
                                                <label>Tags:</label>
                                                <div className="pp-tags-list">
                                                    {appt.tags && appt.tags.map((tag, i) => (
                                                        <span key={i} className="pp-tag-v2">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            {appt.prescription && (
                                                <div className="pp-detail-block mt-4 pt-4 border-t border-gray-200">
                                                    <label className="text-blue-600 font-semibold mb-2 block">Doctor's Prescription:</label>
                                                    <div className="bg-blue-50 p-4 rounded-lg">
                                                        {appt.prescription.medicines && appt.prescription.medicines.length > 0 && (
                                                            <div className="mb-3">
                                                                <p className="font-medium text-sm text-gray-700 mb-2">Medicines:</p>
                                                                <ul className="list-disc list-inside space-y-1">
                                                                    {appt.prescription.medicines.map((med, idx) => (
                                                                        <li key={idx} className="text-sm text-gray-800">
                                                                            <span className="font-semibold">{med.name}</span> - {med.dosage}, {med.frequency} for {med.duration}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                        {appt.prescription.notes && (
                                                            <div>
                                                                <p className="font-medium text-sm text-gray-700 mb-1">Notes:</p>
                                                                <p className="text-sm text-gray-600 italic">"{appt.prescription.notes}"</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {showBooking && (
                    <div className="pp-content-fade-in">
                        <div className="pp-form-container">
                            <div className="pp-form-row">
                                <div className="pp-form-group half">
                                    <label>Appointment Date *</label>
                                    <input
                                        type="date"
                                        className="pp-input"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                    />
                                </div>
                                <div className="pp-form-group half">
                                    <label>Appointment Time *</label>
                                    <input
                                        type="time"
                                        className="pp-input"
                                        value={bookingTime}
                                        onChange={(e) => setBookingTime(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="pp-form-group">
                                <label>Describe Your Symptoms *</label>
                                <textarea
                                    className="pp-textarea"
                                    placeholder="Please describe your symptoms in detail..."
                                    rows={4}
                                    value={symptomDescription}
                                    onChange={(e) => setSymptomDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="pp-form-group">
                                <label>How Are You Feeling? *</label>
                                <textarea
                                    className="pp-textarea"
                                    placeholder="Describe how you're feeling, any concerns or worries..."
                                    rows={3}
                                    value={feelingDescription}
                                    onChange={(e) => setFeelingDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="pp-form-group">
                                <label>Symptom Tags * (Select at least one)</label>
                                <div className="pp-tags-input-container">
                                    {symptomTags.map(tag => (
                                        <span key={tag} className="pp-tag-chip">
                                            {tag}
                                            <button onClick={() => handleRemoveTag(tag)}><X size={14} /></button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        className="pp-tags-input"
                                        placeholder="Search and add symptom tags..."
                                        value={symptomInput}
                                        onChange={(e) => setSymptomInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div className="pp-form-group">
                                <label style={{ marginBottom: '0.75rem', display: 'block' }}>Common symptoms (click to add):</label>
                                <div className="pp-common-tags">
                                    {commonSymptoms.map(tag => (
                                        <button
                                            key={tag}
                                            className="pp-common-tag-btn"
                                            onClick={() => handleAddTag(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pp-form-actions">
                                <button className="pp-cancel-btn" onClick={() => setShowBooking(false)}>Cancel</button>
                                <button className="pp-submit-btn" onClick={handleBookAppointment}>Book Appointment</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PatientPortal;
