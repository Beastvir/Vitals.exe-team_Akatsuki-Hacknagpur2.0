import React, { useState } from 'react';
import { User, Stethoscope, HelpCircle, LogOut } from 'lucide-react';
import { DoctorDashboard } from './pages/DoctorDashboard';
import PatientPortal from './pages/PatientPortal';
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { DataProvider, useData } from './context/DataContext';
import './App.css';

function AppContent() {
  const { session, signOut, loading, currentUser, refreshProfile } = useData();
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'doctor', 'patient'

  // Show loading spinner while checking session
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not logged in, show Login page
  if (!session) {
    return <Login />;
  }

  // Check Onboarding - Only for non-admin (doctors don't need patient profile fields usually)
  // If doctor needs profile, remove the role check. 
  // Assuming 'doctor' (admin) skips this for now as per requirement focusing on new user (patient)
  if (currentUser?.role !== 'doctor' && currentUser?.isProfileComplete === false) {
    return (
      <Onboarding onComplete={() => refreshProfile()} />
    );
  }

  // Auto-routing logic
  // If user is Admin (Doctor), show Doctor Dashboard
  if (currentUser?.role === 'doctor' && currentView !== 'doctor') {
    setCurrentView('doctor');
  }
  // If user is Patient and trying to access doctor, force patient view
  if (currentUser?.role !== 'doctor' && currentView !== 'patient') {
    setCurrentView('patient');
  }

  if (currentView === 'doctor') {
    return (
      <div className="relative">
        <DoctorDashboard />
      </div>
    );
  }

  if (currentView === 'patient') {
    return (
      <div className="relative">
        <PatientPortal onSwitchPortal={() => { }} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="app-header-actions absolute top-4 right-4 z-10">
        <button
          onClick={signOut}
          className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm hover:bg-red-500/20 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

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
