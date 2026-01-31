import React from 'react';

const Hero = () => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 backdrop-blur-sm mb-8 pointer-events-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300 text-sm font-medium">Introducing Aegis Health — The Future of Healthcare AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight mb-8">
                AI-generated medical summaries with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">zero raw data storage</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">full explainability</span>.
            </h1>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16 pointer-events-auto">
                <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:opacity-90 transition-opacity">
                    Get Started →
                </button>
                <button className="px-8 py-3 rounded-xl border border-slate-700 bg-slate-900/50 text-slate-200 font-semibold hover:bg-slate-800 transition-colors backdrop-blur-sm">
                    View Demo
                </button>
            </div>

            {/* Features Footer */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm font-medium">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    No Data Storage
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    HIPAA Compliant
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    AI Explainable
                </div>
            </div>
        </div>
    );
};

export default Hero;
