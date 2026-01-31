import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="relative py-24 px-4 w-full max-w-6xl mx-auto pointer-events-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Column: Info */}
                <div>
                    <span className="text-emerald-400 font-medium tracking-wider text-sm uppercase mb-4 block">Get in Touch</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                        Let's Talk <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Healthcare</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                        Whether you're a hospital administrator, a private practitioner, or just curious about our tech, we'd love to hear from you.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <Mail size={24} className="text-emerald-400" />
                            </div>
                            <span className="text-lg">hello@aegishealth.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <Phone size={24} className="text-emerald-400" />
                            </div>
                            <span className="text-lg">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <MapPin size={24} className="text-emerald-400" />
                            </div>
                            <span className="text-lg">San Francisco, CA</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
                    {/* Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none text-white transition-all placeholder:text-slate-600" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none text-white transition-all placeholder:text-slate-600" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none text-white transition-all placeholder:text-slate-600" placeholder="john@company.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                            <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none text-white transition-all placeholder:text-slate-600 resize-none" placeholder="Tell us about your needs..." />
                        </div>

                        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 group">
                            Send Message
                            <Send size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
