import React from 'react';
import { Search, Calendar, Stethoscope, User, HelpCircle } from 'lucide-react';
import './DoctorPortal.css';

const DoctorPortal = () => {
    const appointments = [
        {
            date: "Friday, January 30, 2026",
            patients: [
                {
                    id: "P001",
                    name: "Emma Johnson",
                    time: "09:00",
                    age: 32,
                    bloodType: "A+",
                    symptoms: "Persistent headache for 3 days, sensitivity to light",
                    tags: ["Headache", "Fatigue", "Blurred Vision"],
                    status: "pending"
                },
                {
                    id: "P002",
                    name: "Michael Chen",
                    time: "10:00",
                    age: 45,
                    bloodType: "O+",
                    symptoms: "Recent chest pain during physical activity",
                    tags: ["Chest Pain", "Shortness of Breath"],
                    status: "pending"
                },
                {
                    id: "P003",
                    name: "Sarah Williams",
                    time: "11:00",
                    age: 28,
                    bloodType: "B+",
                    symptoms: "Wheezing and difficulty breathing, especially at night",
                    tags: ["Shortness of Breath", "Cough", "Chest Pain"],
                    status: "pending"
                }
            ]
        },
        {
            date: "Saturday, January 31, 2026",
            patients: [
                {
                    id: "P004",
                    name: "James Brown",
                    time: "09:00",
                    age: 55,
                    bloodType: "AB+",
                    symptoms: "Joint pain in knees and hands, stiffness in the morning",
                    tags: ["Joint Pain", "Swelling", "Muscle Pain"],
                    status: "pending"
                },
                {
                    id: "P005",
                    name: "Lisa Davis",
                    time: "10:30",
                    age: 38,
                    bloodType: "A-",
                    symptoms: "Recurring severe migraines accompanied by nausea",
                    tags: ["Migraine", "Nausea", "Light Sensitivity"],
                    status: "pending"
                }
            ]
        }
    ];

    return (
        <div className="doctor-portal-container">
            <header className="dp-header">
                <div className="logo-section">
                    <Stethoscope className="logo-icon" size={24} />
                    <span className="logo-text">Doctor Portal</span>
                </div>
                <a href="/" className="switch-portal-link">Switch Portal</a>
            </header>

            <main className="dp-main">
                <div className="dp-title-section">
                    <h1>Doctor Dashboard</h1>
                    <p>Manage your patients and appointments</p>
                </div>

                <div className="dp-controls">
                    <div className="tab-buttons">
                        <button className="tab-btn active">
                            <Calendar size={18} />
                            Appointments
                        </button>
                        <button className="tab-btn">
                            <User size={18} />
                            All Patients
                        </button>
                    </div>
                </div>

                <div className="search-date-row">
                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="dd-mm-yyyy" />
                    </div>
                </div>

                <div className="patients-list">
                    {appointments.map((group, index) => (
                        <div key={index} className="appointment-group">
                            <div className="current-date" style={{ marginBottom: '1rem', marginTop: index > 0 ? '2rem' : '0' }}>
                                <Calendar size={18} />
                                <span>{group.date}</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {group.patients.map(patient => (
                                    <div key={patient.id} className="patient-card">
                                        <div className="pc-header">
                                            <div>
                                                <h3>{patient.name}</h3>
                                                <p className="pc-meta">
                                                    Patient ID: {patient.id} | Time: {patient.time}
                                                    <br />
                                                    Age: {patient.age} | Blood Type: {patient.bloodType}
                                                </p>
                                            </div>
                                            <div className="pc-actions">
                                                <span className="status-badge">{patient.status}</span>
                                                <button className="view-details-btn">View Details</button>
                                            </div>
                                        </div>

                                        <div className="pc-content">
                                            <p className="symptoms-label">Symptoms:</p>
                                            <p className="symptoms-text">{patient.symptoms}</p>

                                            <div className="tags-container">
                                                <span className="tag-label">Tags:</span>
                                                <div className="tags-list">
                                                    {patient.tags.map(tag => (
                                                        <span key={tag} className="tag">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <button className="help-fab" aria-label="Help">
                <HelpCircle size={24} />
            </button>
        </div>
    );
};

export default DoctorPortal;
