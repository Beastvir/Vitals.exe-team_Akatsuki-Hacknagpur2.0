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
            // 1. Fetch Appointments
            const { data: apptData, error: apptError } = await supabase
                .from('appointments')
                .select('*')
                .order('created_at', { ascending: false });

            if (apptError) throw apptError;

            if (apptData) {
                setAppointments(apptData);

                // 2. Extract Unique Patient IDs
                const patientIds = [...new Set(apptData.map(a => a.patient_id || a.patientId).filter(Boolean))];

                if (patientIds.length === 0) {
                    setPatients([]);
                    return;
                }

                // 3. Fetch Profiles for these IDs
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .in('id', patientIds);

                if (profileError) {
                    console.error("Error fetching patient profiles:", profileError);
                    // Continue with just appointment names if profile fetch fails
                }

                // 4. Merge Data to create 'patients' list
                const profileMap = new Map();
                if (profileData) {
                    profileData.forEach(p => profileMap.set(p.id, p));
                }

                const uniquePatientsMap = new Map();
                apptData.forEach(appt => {
                    const pId = appt.patient_id || appt.patientId;
                    if (pId && !uniquePatientsMap.has(pId)) {
                        const profile = profileMap.get(pId) || {};

                        uniquePatientsMap.set(pId, {
                            id: pId,
                            name: profile.full_name || appt.patient_name || appt.patientName || 'Unknown',
                            email: profile.email || 'N/A',
                            phone: profile.phone || 'N/A',
                            age: profile.age || '--',
                            gender: profile.gender || '--',
                            bloodType: profile.blood_type || '--',
                            address: profile.address || 'N/A',
                            medicalHistory: profile.medical_history || []
                        });
                    }
                });

                setPatients(Array.from(uniquePatientsMap.values()));
            }
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
                console.log('Realtime change received:', payload);
                // Refetch to ensure state sync, especially for deletions
                fetchAppointments();
            })
            .subscribe();

        return () => {
            authSub.unsubscribe();
            supabase.removeChannel(channel);
        };
    }, []);

    const handleSessionUpdate = async (session) => {
        setSession(session);
        if (session?.user) {
            const { user_metadata, email } = session.user;
            let name = user_metadata?.full_name || user_metadata?.name || email.split('@')[0];
            let role = email === ADMIN_EMAIL ? 'doctor' : 'patient';

            // Default Profile Structure
            let profileData = {
                id: session.user.id,
                name: name,
                email: email,
                role: role,
                age: null,
                gender: null,
                bloodType: null,
                phone: null,
                address: null,
                medicalHistory: [],
                isProfileComplete: false
            };

            // Fetch extra profile data from DB
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (data) {
                    // Check if profile is complete (basic fields present)
                    const isComplete = !!(data.age && data.gender && data.blood_type && data.phone && data.address);

                    profileData = {
                        ...profileData,
                        name: data.full_name || name,
                        role: data.role || role,
                        age: data.age,
                        gender: data.gender,
                        bloodType: data.blood_type,
                        phone: data.phone,
                        address: data.address,
                        medicalHistory: data.medical_history || [],
                        isProfileComplete: isComplete
                    };
                } else if (error && error.code !== 'PGRST116') {
                    console.warn("Profile fetch error:", error);
                } else {
                    // If no profile row exists, create one!
                    const { error: insertError } = await supabase.from('profiles').insert([{ id: session.user.id, email, full_name: name, role }]);
                    if (insertError) console.error("Error creating initial profile:", insertError);
                }

            } catch (err) {
                console.error("Profile load logic error:", err);
            }

            setCurrentUser(profileData);

            // Fetch appointments
            fetchAppointments();
        } else {
            setCurrentUser(null);
            setAppointments([]); // Clear data on logout
        }
        setLoading(false);
    };

    const refreshProfile = () => {
        if (session) handleSessionUpdate(session);
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
        signOut,
        refreshProfile
    };

    return (
        <DataContext.Provider value={value}>
            {!loading && children}
        </DataContext.Provider>
    );
};
