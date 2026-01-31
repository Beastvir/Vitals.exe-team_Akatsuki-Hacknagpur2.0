
import React from 'react';
import { User, Stethoscope, HelpCircle } from 'lucide-react';
import DoctorPortal from './pages/DoctorPortal';
import './App.css';

function App() {
  const path = window.location.pathname;

  if (path === '/doctor') {
    return <DoctorPortal />;
  }

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="main-title">Health Record System</h1>
        <p className="subtitle">Privacy-Safe Medical Records & Appointments</p>

        <div className="portal-buttons">
          <button className="portal-card patient-portal">
            <User size={48} className="icon" />
            <span>Patient Portal</span>
          </button>

          <button className="portal-card doctor-portal">
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
