import React, { useState } from 'react';
import { User, Stethoscope, HelpCircle } from 'lucide-react';
import { DoctorDashboard } from './pages/DoctorDashboard';
import PatientPortal from './pages/PatientPortal';
import { DataProvider } from './context/DataContext';
import './App.css';

function AppContent() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'doctor', 'patient'

  if (currentView === 'doctor') {
    return (
      <div className="relative">
        <button
          onClick={() => setCurrentView('landing')}
          className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm font-medium"
        >
          Switch Portal
        </button>
        <DoctorDashboard />
      </div>
    );
  }

  if (currentView === 'patient') {
    return (
      <div className="relative">
        <PatientPortal onSwitchPortal={() => setCurrentView('landing')} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="main-title">Health Record System</h1>
        <p className="subtitle">Privacy-Safe Medical Records & Appointments</p>

        <div className="portal-buttons">
          <button
            className="portal-card patient-portal"
            onClick={() => setCurrentView('patient')}
          >
            <User size={48} className="icon" />
            <span>Patient Portal</span>
          </button>

          <button
            className="portal-card doctor-portal"
            onClick={() => setCurrentView('doctor')}
          >
            <Stethoscope size={48} className="icon" />
            <span>Doctor Portal</span>
          </button>
        </div>
      </div>

      <button className="help-button" aria-label="Help">
        <HelpCircle size={24} />
      </button>
    </div>
  );
}

function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

export default App;
