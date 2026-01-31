import React from 'react';
import MagicBento from './MagicBento';

const Features = () => {
    return (
        <div className="relative z-10 py-32 px-4 max-w-7xl mx-auto pointer-events-auto">
            <div className="text-center mb-24">
                <h2 className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-4">FEATURES</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Built for the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Healthcare</span>
                </h3>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    A complete AI operating system designed for privacy, intelligence, and clarity.
                </p>
            </div>

            <MagicBento
                textAutoHide={false}
                enableStars
                enableSpotlight
                enableBorderGlow={true}
                enableTilt={false}
                enableMagnetism={false}
                clickEffect
                spotlightRadius={400}
                particleCount={12}
                glowColor="59, 130, 246"
                disableAnimations={false}
            />
        </div>
    );
};

export default Features;
