import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Users, Calendar, Search, LogOut, Trash2 } from 'lucide-react';
// import { mockPatients, mockAppointments } from '../data/mockData'; // Removed mock data
import { AppointmentEditor } from './AppointmentEditor';
import { useData } from '../context/DataContext';

export function DoctorDashboard() {
    const { appointments, updateAppointment, deleteAppointment, patients, signOut } = useData();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [searchPatient, setSearchPatient] = useState('');
    const [searchDate, setSearchDate] = useState('');

    // Group appointments by date
    const appointmentsByDate = appointments.reduce((acc, appointment) => {
        const date = appointment.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(appointment);
        return acc;
    }, {});

    const sortedDates = Object.keys(appointmentsByDate).sort();

    // Filter patients
    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
        String(patient.id).toLowerCase().includes(searchPatient.toLowerCase()) // Ensure ID is string
    );

    // Filter appointments by date
    const filteredDates = searchDate
        ? sortedDates.filter(date => date === searchDate)
        : sortedDates;

    const handleUpdateAppointment = (updatedAppointment) => {
        updateAppointment(updatedAppointment);
        setSelectedAppointment(null); // Return to dashboard after save
    };

    if (selectedAppointment) {
        return (
            <AppointmentEditor
                appointment={selectedAppointment}
                onBack={() => setSelectedAppointment(null)}
                onSave={handleUpdateAppointment}
            />
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-foreground">Doctor Dashboard</h2>
                    <p className="text-muted-foreground mt-1">Manage your patients and appointments</p>
                </div>
                <Button
                    variant="destructive"
                    onClick={signOut}
                    className="flex items-center gap-2"
                >
                    <LogOut size={16} />
                    Sign Out
                </Button>
            </div>

            <Tabs defaultValue="appointments" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="appointments" className="gap-2">
                        <Calendar className="size-4" />
                        Appointments
                    </TabsTrigger>
                    <TabsTrigger value="patients" className="gap-2">
                        <Users className="size-4" />
                        All Patients
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="appointments" className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                            <Input
                                type="date"
                                placeholder="Filter by date"
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        {searchDate && (
                            <Button variant="outline" onClick={() => setSearchDate('')}>
                                Clear Filter
                            </Button>
                        )}
                    </div>

                    <div className="space-y-8">
                        {filteredDates.map((date) => (
                            <div key={date}>
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Calendar className="size-5 text-indigo-600" />
                                    {new Date(date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </h3>

                                <div className="grid gap-4">
                                    {appointmentsByDate[date].map((appointment) => {
                                        const pId = appointment.patient_id || appointment.patientId;
                                        const patient = patients.find(p => p.id === pId);
                                        return (
                                            <Card
                                                key={appointment.id}
                                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                                onClick={() => setSelectedAppointment(appointment)}
                                            >
                                                <CardContent className="pt-6">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-3 flex-1">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-1">
                                                                    <p className="font-semibold text-lg">{appointment.patient_name || appointment.patientName}</p>
                                                                    <p className="text-sm text-gray-600">
                                                                        Patient ID: {pId?.slice(0, 8)}... | Time: {appointment.time}
                                                                    </p>
                                                                    {patient && (
                                                                        <p className="text-sm text-gray-600">
                                                                            Age: {patient.age} | Blood Type: {patient.bloodType}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* ... rest of the card content which uses valid appointment fields ... */}
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-700">Symptoms:</p>
                                                                <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                                                            </div>

                                                            <div>
                                                                <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {(appointment.tags || []).map((tag, index) => (
                                                                        <span
                                                                            key={index}
                                                                            className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-medium"
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col items-end gap-2">
                                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${appointment.status === 'completed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                {appointment.status}
                                                            </span>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        if (window.confirm('Are you sure you want to delete this appointment?')) {
                                                                            deleteAppointment(appointment.id);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Trash2 size={16} />
                                                                </Button>
                                                                <Button size="sm">View Details</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {filteredDates.length === 0 && (
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-center text-gray-500">No appointments found for this date</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="patients" className="space-y-6">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search patients by name or ID..."
                            value={searchPatient}
                            onChange={(e) => setSearchPatient(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="grid gap-4">
                        {filteredPatients.map((patient) => {
                            const patientAppointments = appointments.filter(a => {
                                const pId = a.patient_id || a.patientId;
                                return pId === patient.id;
                            });
                            return (
                                <Card key={patient.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle>{patient.name}</CardTitle>
                                                <CardDescription>
                                                    ID: {patient.id} | Age: {patient.age} | Blood Type: {patient.bloodType}
                                                </CardDescription>
                                            </div>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                                {patientAppointments.length} Appointments
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Contact</p>
                                                <p className="text-sm text-gray-600">{patient.email}</p>
                                                <p className="text-sm text-gray-600">{patient.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Address</p>
                                                <p className="text-sm text-gray-600">{patient.address}</p>
                                            </div>
                                        </div>

                                        {patient.medicalHistory.length > 0 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-700 mb-2">Medical History</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {patient.medicalHistory.map((condition, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium"
                                                        >
                                                            {condition}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {patientAppointments.length > 0 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-700 mb-2">Recent Appointments</p>
                                                <div className="space-y-2">
                                                    {patientAppointments.slice(0, 3).map((appointment) => (
                                                        <div
                                                            key={appointment.id}
                                                            className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                                                            onClick={() => setSelectedAppointment(appointment)}
                                                        >
                                                            <div>
                                                                <p className="text-sm font-medium">
                                                                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                                                </p>
                                                                <p className="text-xs text-gray-600">{appointment.symptoms.slice(0, 60)}...</p>
                                                            </div>
                                                            <Button size="sm" variant="ghost">View</Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {filteredPatients.length === 0 && (
                            <Card>
                                <CardContent className="pt-6">
                                    <p className="text-center text-gray-500">No patients found</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
