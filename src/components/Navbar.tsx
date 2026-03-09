import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, User, LogOut } from 'lucide-react';
import { getProfile, clearProfile } from '../services/profileService';
import { Button } from './Button';

export const Navbar = () => {
    const location = useLocation();
    const profile = getProfile();
    const displayName = profile?.name?.trim() || 'Member';
    const displayMajor = profile?.major?.trim() || 'AI Readiness';

    // Don't show navbar on specific pages
    if (['/', '/signup', '/onboarding'].includes(location.pathname)) {
        return null;
    }

    const handleLogout = () => {
        clearProfile();
        window.location.href = '/';
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-blue-100/70 bg-[rgba(248,251,255,0.82)] backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-6">
                    <Link to="/dashboard" className="flex items-center gap-3 text-slate-900">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)]">
                            <Flame className="h-5 w-5" />
                        </div>
                        <div className="leading-tight">
                            <span className="block font-heading text-xl font-bold tracking-tight">Ascend Ignite</span>
                            <span className="block text-[11px] uppercase tracking-[0.28em] text-slate-500">Career Intelligence Studio</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-2 rounded-full border border-white/60 bg-white/60 p-1 text-sm font-medium shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
                        <NavLink to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</NavLink>
                        <NavLink to="/community" active={location.pathname.startsWith('/community')}>Community</NavLink>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {profile ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-semibold text-slate-900">{displayName}</span>
                                <span className="text-xs tracking-[0.18em] uppercase text-slate-500">{displayMajor}</span>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-[0_10px_25px_rgba(37,99,235,0.12)]">
                                <User className="h-4 w-4" />
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleLogout} title="Logout">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <Link to="/signup">
                            <Button size="sm">Sign Up</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, active, children }: { to: string, active: boolean, children: React.ReactNode }) => (
    <Link
        to={to}
        className={`rounded-full px-4 py-2 transition-all ${active ? 'bg-primary text-white shadow-[0_10px_25px_rgba(37,99,235,0.22)]' : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
    >
        {children}
    </Link>
);
