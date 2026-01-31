import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { User, Activity, MapPin, Phone, Droplet, Clock, X, Check } from 'lucide-react';
import { medicalConditionsList } from '../data/mockData';
import { supabase } from '../supabaseClient';
import './Onboarding.css'; // We'll create this next or use inline styles for now

export function Onboarding({ onComplete }) {
    const { currentUser, setSession } = useData(); // We might need to refresh session/user
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        bloodType: '',
        phone: '',
        address: '',
    });

    const [medicalHistory, setMedicalHistory] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Tag Logic
    const handleTagInput = (e) => {
        const value = e.target.value;
        setTagInput(value);
        if (value.length > 1) {
            const filtered = medicalConditionsList.filter(c =>
                c.toLowerCase().includes(value.toLowerCase()) &&
                !medicalHistory.includes(c)
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const addTag = (tag) => {
        if (!medicalHistory.includes(tag)) {
            setMedicalHistory([...medicalHistory, tag]);
        }
        setTagInput('');
        setSuggestions([]);
    };

    const removeTag = (tag) => {
        setMedicalHistory(medicalHistory.filter(t => t !== tag));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    age: formData.age,
                    gender: formData.gender,
                    blood_type: formData.bloodType, // Note snake_case match with SQL
                    phone: formData.phone,
                    address: formData.address,
                    medical_history: medicalHistory
                })
                .eq('id', currentUser.id);

            if (error) throw error;

            // Trigger completion callback (which will likely force a re-fetch or state update in App)
            if (onComplete) onComplete();

        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
                    <p className="text-gray-400">Please provide your details to continue to the portal.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="number"
                                    name="age"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Years"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-500" size={18} />
                                <select
                                    name="gender"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Blood Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Blood Type</label>
                            <div className="relative">
                                <Droplet className="absolute left-3 top-3 text-gray-500" size={18} />
                                <select
                                    name="bloodType"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                                    value={formData.bloodType}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Type</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-500" size={18} />
                            <input
                                type="text"
                                name="address"
                                required
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="123 Main St, City, Country"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Medical History Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Medical History</label>
                        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {medicalHistory.map(tag => (
                                    <span key={tag} className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-white">
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-gray-500"
                                    placeholder="Type to search conditions..."
                                    value={tagInput}
                                    onChange={handleTagInput}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (tagInput.trim()) addTag(tagInput.trim());
                                        }
                                    }}
                                />
                                {suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                                        {suggestions.map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                type="button"
                                                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                                onClick={() => addTag(suggestion)}
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Select from common conditions or type your own.</p>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-black hover:bg-primary/90 font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Saving...' : 'Complete Profile'}
                            {!loading && <Check size={20} />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
