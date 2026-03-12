import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, Target, Brain, Info, ArrowRight } from 'lucide-react';
import { getProfile } from '../services/profileService';
import { moduleTemplates } from '../data/mockData';

import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { ChatBot } from '../components/ChatBot';

export const ModulePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const profile = getProfile();
    const moduleData = moduleTemplates.find(m => m.id === id) || null;
    const [activeScenario, setActiveScenario] = useState<number | null>(null);

    useEffect(() => {
        if (!moduleData) {
            void navigate('/dashboard');
        }
    }, [moduleData, navigate]);

    if (!profile || !moduleData) return null;

    return (
        <div className="container mx-auto max-w-6xl space-y-10 px-4 py-8">
            <header className="text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 font-semibold">Course Experience</p>
                    <h1 className="mt-4 text-4xl font-bold text-slate-900 md:text-6xl">{moduleData.title}</h1>
                    <p className="mt-4 text-lg leading-8 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent font-medium">{moduleData.topic}</p>
                </motion.div>
            </header>

            <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="overflow-hidden neon-border">
                    <div className="relative flex aspect-video items-center justify-center bg-slate-900 cursor-pointer group/video">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                        <img
                            src={moduleData.thumbnail || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000'}
                            alt={`${moduleData.title} thumbnail`}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/video:scale-105"
                        />
                        <div className="relative z-20 flex flex-col items-center">
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/80 text-white shadow-[0_0_30px_rgba(0,230,118,0.4)] backdrop-blur transition-transform duration-300 group-hover/video:scale-110">
                                <PlayCircle className="ml-1 h-10 w-10" />
                            </div>
                            <p className="text-lg font-medium text-white drop-shadow-lg">Watch 5-minute Intro</p>
                        </div>
                        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">Video</span>
                            <span className="text-sm text-white/80">5:00</span>
                        </div>
                    </div>
                    <CardContent className="pt-7">
                        <p className="text-lg leading-8 text-slate-700">{moduleData.description}</p>
                    </CardContent>
                </Card>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
            >
                <h2 className="flex items-center gap-2 text-2xl font-bold">
                    <Info className="h-6 w-6 text-emerald-500" /> Key Concepts
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {moduleData.infographics.map((info, i) => (
                        <Card key={i} className="neon-border bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(0,230,118,0.03))] hover:shadow-[0_12px_40px_rgba(0,230,118,0.1)] transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg">{info.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-7 text-slate-600">{info.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="neon-border bg-[linear-gradient(135deg,rgba(0,230,118,0.04),rgba(0,229,255,0.04),rgba(255,255,255,0.92))]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                            <Target className="h-6 w-6 text-emerald-500" /> Scenario Exercise
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-[24px] border border-emerald-100/50 bg-white/90 p-6 text-lg leading-8 text-slate-800 shadow-[0_18px_42px_rgba(15,23,42,0.05)]">
                            {moduleData.scenario.context}
                        </div>

                        <div className="space-y-3">
                            {moduleData.scenario.options.map((opt, i) => (
                                <div key={i}>
                                    <button
                                        onClick={() => setActiveScenario(i)}
                                        className={`w-full rounded-[24px] border p-5 text-left transition-all ${activeScenario === i
                                            ? 'border-emerald-400 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-[0_18px_42px_rgba(0,230,118,0.22)]'
                                            : 'border-white/70 bg-white/80 text-slate-700 hover:border-emerald-300 hover:bg-white'
                                            }`}
                                    >
                                        {opt.text}
                                    </button>

                                    {activeScenario === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-2 rounded-[22px] border border-emerald-100 bg-emerald-50/50 p-4 text-slate-700"
                                        >
                                            <span className="mr-2 font-bold text-emerald-600">Feedback:</span>
                                            {opt.feedback}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-[34px] bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-8 text-white md:p-12 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,230,118,0.1),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(0,229,255,0.08),transparent_40%)]" />
                <div className="relative flex flex-col items-center space-y-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(0,230,118,0.2)]">
                        <Brain className="h-8 w-8" />
                    </div>
                    <div>
                        <h2 className="mb-6 text-3xl font-bold">Key Takeaways</h2>
                        <ul className="mx-auto max-w-2xl space-y-4 text-left">
                            {moduleData.keyTakeaways.map((takeaway, i) => (
                                <li key={i} className="flex gap-3">
                                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(0,230,118,0.6)]" />
                                    <span className="text-lg leading-8 text-slate-200">{takeaway}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="h-px w-full bg-emerald-500/20" />

                    <div className="pt-2">
                        <h3 className="mb-4 text-xl font-bold">Ready to test your knowledge?</h3>
                        <Link to={`/module/${moduleData.id}/quiz`}>
                            <Button size="lg" className="w-full px-12 text-lg sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-[0_0_30px_rgba(0,230,118,0.3)]">
                                Start Course Quiz <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.section>

            <ChatBot
                mode="course"
                courseTitle={moduleData.title}
                courseContext={moduleData.description}
            />
        </div>
    );
};
