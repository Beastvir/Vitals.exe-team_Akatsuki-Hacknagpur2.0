import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAppointments, mockPatients } from '../data/mockData';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [appointments, setAppointments] = useState(mockAppointments);
    const [patients, setPatients] = useState(mockPatients);
    const [currentUser, setCurrentUser] = useState(null); // 'doctor' or 'patient'

    // Initialize with mock data, but filter out P001's appointments for the demo
    // so the patient starts with a clean slate as requested
    useEffect(() => {
        const initialAppointments = mockAppointments.filter(appt => appt.patientId !== 'P001');
        setAppointments(initialAppointments);
    }, []);

    const addAppointment = (newAppointment) => {
        setAppointments(prev => [...prev, newAppointment]);
    };

    const updateAppointment = (updatedAppointment) => {
        setAppointments(prev =>
            prev.map(appt => appt.id === updatedAppointment.id ? updatedAppointment : appt)
        );
    };

    const getPatientAppointments = (patientId) => {
        return appointments.filter(appt => appt.patientId === patientId);
    };

    const value = {
        appointments,
        patients,
        addAppointment,
        updateAppointment,
        getPatientAppointments,
        currentUser,
        setCurrentUser
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
