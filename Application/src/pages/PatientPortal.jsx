import React, { useState } from 'react';
import { User, HelpCircle, Calendar, X } from 'lucide-react';
import './PatientPortal.css';

const PatientPortal = () => {
    const [activeTab, setActiveTab] = useState('medical-records');
    const [showBooking, setShowBooking] = useState(false);
    const [symptomTags, setSymptomTags] = useState([]);
    const [symptomInput, setSymptomInput] = useState('');

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
        // Just a UI demo for now, return to list
        setShowBooking(false);
        setSymptomTags([]);
    };

    return (
        <div className="patient-portal-container">
            <header className="pp-header">
                <div className="pp-logo-section">
                    <User className="pp-logo-icon" size={24} />
                    <span className="pp-logo-text">Patient Portal</span>
                </div>
                <a href="/" className="pp-switch-portal-link">Switch Portal</a>
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

                        <div className="pp-appointment-detail-card">
                            <div className="pp-detail-header">
                                <div className="pp-dh-left">
                                    <Calendar className="pp-dh-icon" size={20} />
                                    <div>
                                        <h3 className="pp-dh-date">Friday, January 30, 2026</h3>
                                        <span className="pp-dh-time">Time: 09:00</span>
                                    </div>
                                </div>
                                <span className="pp-status-badge pending">pending</span>
                            </div>

                            <div className="pp-detail-content">
                                <div className="pp-detail-block">
                                    <label>Symptoms:</label>
                                    <p>Persistent headache for 3 days, sensitivity to light</p>
                                </div>

                                <div className="pp-detail-block">
                                    <label>How you're feeling:</label>
                                    <p>Feeling tired and unable to focus on work</p>
                                </div>

                                <div className="pp-detail-block">
                                    <label>Tags:</label>
                                    <div className="pp-tags-list">
                                        <span className="pp-tag-v2">Headache</span>
                                        <span className="pp-tag-v2">Fatigue</span>
                                        <span className="pp-tag-v2">Blurred Vision</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showBooking && (
                    <div className="pp-content-fade-in">
                        <div className="pp-form-container">
                            <div className="pp-form-row">
                                <div className="pp-form-group half">
                                    <label>Appointment Date *</label>
                                    <input type="date" className="pp-input" placeholder="dd-mm-yyyy" />
                                </div>
                                <div className="pp-form-group half">
                                    <label>Appointment Time *</label>
                                    <input type="time" className="pp-input" />
                                </div>
                            </div>

                            <div className="pp-form-group">
                                <label>Describe Your Symptoms *</label>
                                <textarea
                                    className="pp-textarea"
                                    placeholder="Please describe your symptoms in detail..."
                                    rows={4}
                                ></textarea>
                            </div>

                            <div className="pp-form-group">
                                <label>How Are You Feeling? *</label>
                                <textarea
                                    className="pp-textarea"
                                    placeholder="Describe how you're feeling, any concerns or worries..."
                                    rows={3}
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
