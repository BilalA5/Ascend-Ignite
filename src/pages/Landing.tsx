import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Shield, Brain, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { getProfile } from '../services/profileService';

export const Landing = () => {
    const profile = getProfile();

    if (profile) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-32">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0" />
                <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 p-4 rounded-full bg-primary/10 text-primary"
                    >
                        <Flame className="h-12 w-12" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-slate-950 mb-6 font-heading"
                    >
                        Ascend Ignite <br className="hidden md:block" />
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-600 max-w-2xl mb-10"
                    >
                        Build resilience, confidence, and clarity in an AI-driven world. Ascend Ignite helps
                        university students navigate the future of work by developing uniquely human skills
                        that machines cannot replicate.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link to="/signup">
                            <Button size="lg" className="gap-2 text-lg">
                                Start Your Journey <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">
                        Stand Out in the Age of Automation
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
        className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center"
    >
        <div className="mb-4 text-primary bg-primary/10 p-4 rounded-full">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 font-heading">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
);
