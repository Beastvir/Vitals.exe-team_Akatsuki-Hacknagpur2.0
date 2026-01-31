import React from 'react';
import ChromaGrid from './ChromaGrid';
import virendraImg from '../assets/Virendra.jpeg';
import vishalImg from '../assets/Vishal.jpeg';
import aryanImg from '../assets/Aryan.jpg';
import prashantImg from '../assets/prashant.jpg';

const Team = () => {
    // Map previous team members to ChromaGrid format with stock photos
    const teamMembers = [
        {
            image: vishalImg,
            title: "Vishal Asati",
            subtitle: "UI/UX Designer",
            handle: "@vishalasati.10",
            borderColor: "#60a5fa", // Blue
            gradient: "linear-gradient(145deg, #60a5fa, #1e3a8a)",
            url: "#"
        },
        {
            image: virendraImg,
            title: "Virendra Uplenchwar",
            subtitle: "Frontend Developer",
            handle: "@vir_d_uplenchwar",
            borderColor: "#38bdf8", // Sky
            gradient: "linear-gradient(145deg, #38bdf8, #0c4a6e)",
            url: "#"
        },
        {
            image: aryanImg,
            title: "Aryan Bhople",
            subtitle: "Backend Developer",
            handle: "@aaryan_00520",
            borderColor: "#34d399", // Emerald
            gradient: "linear-gradient(145deg, #34d399, #064e3b)",
            url: "#"
        },
        {
            image: prashantImg,
            title: "Prashant Raghuwanshi",
            subtitle: "Backend Developer",
            handle: "@prashantraghuwanshi",
            borderColor: "#60a5fa", // Blue
            gradient: "linear-gradient(145deg, #60a5fa, #1e3a8a)",
            url: "#"
        }
    ];

    return (
        <div className="relative py-24 px-4 w-full max-w-7xl mx-auto pointer-events-auto">
            <div className="text-center mb-16">
                <span className="text-blue-400 font-medium tracking-wider text-sm uppercase mb-4 block">Our Team</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Visionaries</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    A multidisciplinary team of engineers, and designers working together to transform patient care.
                </p>
            </div>

            <div style={{ height: '500px', position: 'relative' }}>
                <ChromaGrid
                    items={teamMembers}
                    radius={300}
                    damping={0.45}
                    fadeOut={0.6}
                    ease="power3.out"
                    columns={4}
                />
            </div>
        </div>
    );
};

export default Team;
