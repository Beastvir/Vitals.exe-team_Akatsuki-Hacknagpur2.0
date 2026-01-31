
import React from 'react';
import { User, Stethoscope, HelpCircle } from 'lucide-react';
import DoctorPortal from './pages/DoctorPortal';
import PatientPortal from './pages/PatientPortal';
import './App.css';

function App() {
  const path = window.location.pathname;

  if (path === '/doctor') {
    return <DoctorPortal />;
  }

  if (path === '/patient') {
    return <PatientPortal />;
  }

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="main-title">Health Record System</h1>
        <p className="subtitle">Privacy-Safe Medical Records & Appointments</p>

        <div className="portal-buttons">
          <button
            className="portal-card patient-portal"
            onClick={() => window.location.href = '/patient'}
          >
            <User size={48} className="icon" />
            <span>Patient Portal</span>
          </button>

          <button
            className="portal-card doctor-portal"
            onClick={() => window.location.href = '/doctor'}
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

export default App;
