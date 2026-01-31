import React, { createContext, useContext, useState, useEffect } from 'react';
// import { mockAppointments, mockPatients } from '../data/mockData'; // Kept but unused as requested
import { supabase } from '../supabaseClient';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]); // This would potentially also fetch from profiles
    const [currentUser, setCurrentUser] = useState(null); // 'doctor' or 'patient'
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const ADMIN_EMAIL = 'admin@hospital.com';

    // Fetch initial data
    const fetchAppointments = async () => {
        try {
            // RLS policies will automatically filter this based on who is logged in!
            const { data, error } = await supabase
                .from('appointments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setAppointments(data);
        } catch (err) {
            console.error('Error fetching appointments:', err);
        }
    };

    // Auth & Subscription Listener
    useEffect(() => {
        let subscription;

        // 1. Get Session
        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            handleSessionUpdate(initialSession);
        });

        // 2. Listen for Auth Changes
        const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange((_event, session) => {
            handleSessionUpdate(session);
        });

        // 3. Realtime Subscription for Appointments
        const channel = supabase
            .channel('public:appointments')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, (payload) => {
                // Ideally optimize this to just insert/update local state instead of refetch
                // For simplicity/accuracy ensuring we get the latest ID/structure, we refetch
                fetchAppointments();
            })
            .subscribe();

        return () => {
            authSub.unsubscribe();
            supabase.removeChannel(channel);
        };
    }, []);

    const handleSessionUpdate = (session) => {
        setSession(session);
        if (session?.user) {
            const { user_metadata, email } = session.user;
            const name = user_metadata?.full_name || user_metadata?.name || email.split('@')[0];

            // Check if admin
            const role = email === ADMIN_EMAIL ? 'doctor' : 'patient';

            setCurrentUser({
                id: session.user.id,
                name: name,
                email: email,
                role: role
            });

            // Now that we have a user (and thus an ID for RLS), fetch data
            fetchAppointments();
        } else {
            setCurrentUser(null);
            setAppointments([]); // Clear data on logout
        }
        setLoading(false);
    };

    const addAppointment = async (newAppointment) => {
        try {
            // Strip the ID if it's a temp one, Supabase will generate UUID
            const { id, ...appointmentData } = newAppointment;

            // Ensure we use the real UUID of the user
            if (session?.user?.id) {
                appointmentData.patient_id = session.user.id;
            }

            const { data, error } = await supabase
                .from('appointments')
                .insert([appointmentData])
                .select();

            if (error) console.error("Error adding appointment:", error);
            // State update handled by subscription
        } catch (err) {
            console.error("Error in addAppointment:", err);
        }
    };

    const updateAppointment = async (updatedAppointment) => {
        try {
            const { id, ...updates } = updatedAppointment;
            const { error } = await supabase
                .from('appointments')
                .update(updates)
                .eq('id', id);

            if (error) console.error("Error updating appointment:", error);
            // State update handled by subscription
        } catch (err) {
            console.error("Error in updateAppointment:", err);
        }
    };

    const getPatientAppointments = (patientId) => {
        return appointments.filter(appt => appt.patient_id === patientId);
    };

    // Sign Out Helper
    const signOut = async () => {
        await supabase.auth.signOut();
        setCurrentUser(null);
    };

    const value = {
        appointments,
        patients,
        addAppointment,
        updateAppointment,
        getPatientAppointments,
        currentUser,
        setCurrentUser,
        session,
        loading,
        signOut
    };

    return (
        <DataContext.Provider value={value}>
            {!loading && children}
        </DataContext.Provider>
    );
};
