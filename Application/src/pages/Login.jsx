import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { User, LogIn, Mail, Lock } from 'lucide-react';

export function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
                    },
                });
                if (error) throw error;
                alert('Sign up successful! Please check your email for verification (if enabled) or sign in.');
                setIsSignUp(false);
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-8 border border-gray-800">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                        <User size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
                    <p className="text-gray-400">{isSignUp ? 'Sign up to get started' : 'Sign in to access your dashboard'}</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    required={isSignUp}
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black hover:bg-primary/90 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <span className="animate-spin h-5 w-5 border-2 border-black/30 border-t-black rounded-full" /> : (isSignUp ? 'Sign Up' : 'Sign In')}
                    </button>
                </form>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-card text-gray-500">Or continue with</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                >
                    <LogIn size={20} />
                    Sign in with Google
                </button>

                <div className="text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-primary hover:text-primary/80 text-sm font-medium hover:underline"
                    >
                        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
}
