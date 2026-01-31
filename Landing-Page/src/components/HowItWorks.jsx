import React from 'react';
import { Upload, Cpu, FileCheck } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const StepCard = ({ number, icon: Icon, title, description, color }) => {
    // Simplified theme extraction
    const getTheme = (colorTheme) => {
        switch (colorTheme) {
            case 'violet': return {
                text: 'text-violet-400',
                bg: 'bg-violet-950', // Darker background for card
                border: 'border-violet-500/30',
                glow: 'shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]',
                gradient: 'from-violet-500/20 to-transparent',
            };
            case 'pink': return {
                text: 'text-pink-400',
                bg: 'bg-pink-950',
                border: 'border-pink-500/30',
                glow: 'shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)]',
                gradient: 'from-pink-500/20 to-transparent',
            };
            case 'emerald': return {
                text: 'text-emerald-400',
                bg: 'bg-emerald-950',
                border: 'border-emerald-500/30',
                glow: 'shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]',
                gradient: 'from-emerald-500/20 to-transparent',
            };
            default: return {};
        }
    };

    const theme = getTheme(color);

    return (
        <div className={`w-full max-w-4xl mx-auto p-10 rounded-[3rem] ${theme.bg} border ${theme.border} relative overflow-hidden group transition-all duration-300 ${theme.glow}`}>
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-30`} />

            {/* Decorative Blob */}
            <div className={`absolute -right-20 -top-20 w-96 h-96 ${theme.bg.replace('950', '600')} rounded-full blur-[120px] opacity-10 pointer-events-none`} />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                {/* Icon Container */}
                <div className={`w-20 h-20 rounded-2xl ${theme.bg.replace('950', '900')} border ${theme.border} flex items-center justify-center relative shrink-0`}>
                    <Icon size={40} className={theme.text} />
                    <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full ${theme.bg.replace('950', '500')} text-white flex items-center justify-center font-bold shadow-lg text-lg`}>
                        {number}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">{title}</h2>
                    <p className="text-slate-300 text-xl leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
};

const HowItWorks = () => {
    const steps = [
        {
            number: '01',
            icon: Upload,
            title: 'Upload or Book Appointment',
            description: 'Submit medical records or schedule a consultation. Support for handwritten prescriptions and digital files.',
            color: 'violet'
        },
        {
            number: '02',
            icon: Cpu,
            title: 'AI Summarizes Safely',
            description: 'HT-3 processes records with zero raw data storage. End-to-end encryption ensures complete privacy.',
            color: 'pink'
        },
        {
            number: '03',
            icon: FileCheck,
            title: 'Doctor Reviews, Prescribes, and Explains',
            description: 'Healthcare providers access AI-generated insights. Patients receive clear explanations and treatment plans.',
            color: 'emerald'
        }
    ];

    return (
        <div className="relative z-10 w-full pointer-events-auto">
            {/* Header stays separate for context */}
            <div className="text-center py-20 px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">Works</span>
                </h2>
                <p className="text-slate-400 text-lg">
                    Three simple steps to transform healthcare delivery
                </p>
            </div>

            <ScrollStack
                itemDistance={100}
                stackPosition="150px"
                scaleEndPosition="10%"
                baseScale={1}
                itemScale={0}
                itemStackDistance={40}
                useWindowScroll={true}
            >
                {steps.map((step, index) => (
                    <ScrollStackItem key={index}>
                        <StepCard {...step} />
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </div>
    );
};

export default HowItWorks;
