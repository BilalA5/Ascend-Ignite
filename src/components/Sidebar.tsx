import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Users,
    Settings,
    Award,
    Mail,
    Flame,
} from 'lucide-react';
import { getProfile, clearProfile } from '../services/profileService';

export const Sidebar = () => {
    const location = useLocation();
    const profile = getProfile();
    const [collapsed, setCollapsed] = useState(false);

    if (!profile) return null;
    if (['/', '/signup', '/onboarding'].includes(location.pathname)) return null;

    const displayName = profile?.name?.trim() || 'Member';
    const displayMajor = profile?.major?.trim() || 'AI Readiness';
    const initials = displayName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const handleLogout = () => {
        clearProfile();
        window.location.href = '/';
    };

    const navItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/community', icon: Users, label: 'Community' },
        { to: '/certificates', icon: Award, label: 'Certificates' },
    ];

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 72 : 260 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200/60 bg-white/95 backdrop-blur-xl"
        >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-hover text-white shadow-[0_4px_15px_rgba(37,99,235,0.3)]">
                    <Flame className="h-5 w-5" />
                </div>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="overflow-hidden whitespace-nowrap"
                        >
                            <span className="block font-heading text-lg font-bold text-slate-900">Ascend Ignite</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Profile Section */}
            <div className={`border-b border-slate-100 px-4 py-5 ${collapsed ? 'flex justify-center' : ''}`}>
                <div className={`flex ${collapsed ? 'flex-col items-center' : 'items-center gap-3'}`}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-500 text-sm font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.25)]">
                        {initials}
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="overflow-hidden whitespace-nowrap"
                            >
                                <p className="text-sm font-semibold text-slate-900">{displayName}</p>
                                <p className="text-xs text-slate-500">{displayMajor}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                    const isActive = item.to === '/community'
                        ? location.pathname.startsWith('/community')
                        : location.pathname === item.to;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                                isActive
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-primary shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            } ${collapsed ? 'justify-center' : ''}`}
                            title={collapsed ? item.label : undefined}
                        >
                            <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-primary' : ''}`} />
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="overflow-hidden whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="border-t border-slate-100 px-3 py-4 space-y-1">
                <button
                    onClick={handleLogout}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-all hover:bg-red-50 ${collapsed ? 'justify-center' : ''}`}
                    title="Logout"
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="overflow-hidden whitespace-nowrap"
                            >
                                Log Out
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm hover:text-slate-600 transition-colors"
            >
                {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>
        </motion.aside>
    );
};
