import React from 'react';
import { Sparkles } from 'lucide-react';

const CTA = () => {
    return (
        <div className="relative py-32 px-4 w-full pointer-events-auto flex flex-col items-center justify-center text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 mb-8 backdrop-blur-sm shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
                <Sparkles size={16} />
                <span className="text-sm font-medium">Join 10,000+ Healthcare Professionals</span>
            </div>

            {/* Headline */}
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                Build the Future of
            </h2>
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-500 mb-8 tracking-tight pb-2">
                Healthcare, Safely
            </h2>

            {/* Subtitle */}
            <p className="text-slate-400 text-xl max-w-2xl leading-relaxed mb-12">
                Join healthcare professionals and institutions using Aegis Health to transform patient care.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-slate-200 transition-colors shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)]">
                    Get Started Now
                </button>
                <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                    Contact Sales
                </button>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen" />
        </div>
    );
};

export default CTA;
