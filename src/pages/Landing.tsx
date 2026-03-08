import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Shield, Brain, Users, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { getProfile } from '../services/profileService';

export const Landing = () => {
    const profile = getProfile();

    if (profile) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <section className="relative overflow-hidden px-4 pb-24 pt-12 md:px-6 md:pb-32 md:pt-20">
                <div className="lux-grid absolute inset-0 opacity-50" />
                <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

                <div className="container relative z-10 mx-auto max-w-6xl">
                    <div className="lux-panel relative overflow-hidden rounded-[40px] px-6 py-16 md:px-12 md:py-20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.18),transparent_34%),radial-gradient(circle_at_20%_25%,rgba(245,158,11,0.16),transparent_22%)]" />

                        <div className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
                            <div className="text-center lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/75 px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary"
                                >
                                    <Flame className="h-4 w-4" />
                                    Premium career growth
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="mb-6 text-5xl font-bold tracking-tight text-slate-950 md:text-7xl"
                                >
                                    Build the kind of future
                                    <span className="block text-primary">AI cannot replace.</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-slate-600 lg:mx-0 lg:text-xl"
                                >
                                    Ascend Ignite blends strategy, confidence, and practical AI fluency into a guided experience that feels more like a private career studio than a student portal.
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="flex flex-col items-center gap-4 sm:flex-row lg:items-start"
                                >
                                    <Link to="/signup">
                                        <Button size="lg" className="gap-2 text-lg">
                                            Start Your Journey <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <div className="rounded-full border border-white/70 bg-white/65 px-5 py-4 text-sm text-slate-600 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                                        Personalized modules, community sessions, and role-specific guidance.
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                                className="relative"
                            >
                                <div className="lux-panel rounded-[32px] p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Member Snapshot</p>
                                            <h3 className="mt-2 text-2xl text-slate-900">Your next edge</h3>
                                        </div>
                                        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <Metric label="Confidence Index" value="91%" detail="Built through guided scenarios and reflection." />
                                        <Metric label="Career Signal" value="Top 8%" detail="Sharper positioning for internships and interviews." />
                                        <Metric label="Human Skills" value="3 core" detail="Communication, resilience, and applied judgment." />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-t border-white/40 py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
                        Stand Out in the Age of Automation
                    </h2>

                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        <FeatureCard
                            icon={<Shield className="h-8 w-8" />}
                            title="Build Resilience"
                            description="Learn to adapt to rapid technological shifts without fear."
                        />
                        <FeatureCard
                            icon={<Brain className="h-8 w-8" />}
                            title="Develop Human Skills"
                            description="Focus on empathy, creativity, and complex problem solving."
                        />
                        <FeatureCard
                            icon={<Users className="h-8 w-8" />}
                            title="Connect & Grow"
                            description="Join a community of forward-thinking students and mentors."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="lux-panel flex flex-col items-center rounded-[30px] p-8 text-center"
    >
        <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
            {icon}
        </div>
        <h3 className="mb-3 text-xl font-semibold">{title}</h3>
        <p className="leading-relaxed text-slate-600">{description}</p>
    </motion.div>
);

const Metric = ({ label, value, detail }: { label: string, value: string, detail: string }) => (
    <div className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-heading text-slate-900">{value}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
);
