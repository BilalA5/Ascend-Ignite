import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, Target, Brain, Info, ArrowRight } from 'lucide-react';
import { getProfile } from '../services/profileService';
import { moduleTemplates } from '../data/mockData';

import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { Button } from '../components/Button';

export const ModulePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const profile = getProfile();

    // Compute module data directly during render for mock data
    const moduleData = moduleTemplates.find(m => m.id === id) || null;
    const [activeScenario, setActiveScenario] = useState<number | null>(null);

    useEffect(() => {
        if (!moduleData) {
            void navigate('/dashboard');
        }
    }, [moduleData, navigate]);

    if (!profile || !moduleData) return null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl space-y-12">
            {/* Header */}
            <header className="text-center space-y-4 max-w-2xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900">{moduleData.title}</h1>
                    <p className="text-xl text-slate-600 mt-4">{moduleData.topic}</p>
                </motion.div>
            </header>

            {/* Video Section (Simulated) */}
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="overflow-hidden border-2 border-slate-200">
                    <div className="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                            alt="Video Thumbnail"
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                        />
                        <div className="relative z-20 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-primary/90 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl">
                                <PlayCircle className="w-10 h-10 ml-1" />
                            </div>
                            <p className="text-white font-medium text-lg">Watch 5-minute Intro</p>
                        </div>
                    </div>
                    <CardContent className="pt-6">
                        <p className="text-slate-700 leading-relaxed text-lg">{moduleData.description}</p>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Infographics Grid */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
            >
                <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
                    <Info className="text-primary w-6 h-6" /> Key Concepts
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {moduleData.infographics.map((info, i) => (
                        <Card key={i} className="bg-slate-50 border-slate-200 hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg">{info.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600">{info.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.section>

            {/* Interactive Scenario */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl text-primary">
                            <Target className="w-6 h-6" /> Scenario Exercise
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm text-lg text-slate-800">
                            {moduleData.scenario.context}
                        </div>

                        <div className="space-y-3">
                            {moduleData.scenario.options.map((opt, i) => (
                                <div key={i}>
                                    <button
                                        onClick={() => setActiveScenario(i)}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${activeScenario === i
                                            ? 'border-primary bg-primary text-white shadow-md'
                                            : 'border-slate-200 bg-white hover:border-primary/50 text-slate-700'
                                            }`}
                                    >
                                        {opt.text}
                                    </button>

                                    {activeScenario === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-2 p-4 bg-white border border-slate-200 rounded-xl text-slate-700"
                                        >
                                            <span className="font-bold mr-2 text-primary">Feedback:</span>
                                            {opt.feedback}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.section>

            {/* Key Takeaways & Quiz CTA */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 bg-slate-900 text-white p-8 md:p-12 rounded-3xl flex flex-col items-center text-center space-y-8"
            >
                <Brain className="w-16 h-16 text-primary" />
                <div>
                    <h2 className="text-3xl font-bold font-heading mb-6">Key Takeaways</h2>
                    <ul className="space-y-4 max-w-xl text-left mx-auto mb-8">
                        {moduleData.keyTakeaways.map((takeaway, i) => (
                            <li key={i} className="flex flex-start gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                                <span className="text-slate-200 text-lg">{takeaway}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full h-px bg-slate-800" />

                <div className="pt-4">
                    <h3 className="text-xl font-bold mb-4">Ready to test your knowledge?</h3>
                    <Link to={`/module/${moduleData.id}/quiz`}>
                        <Button size="lg" className="text-lg px-12 h-14 w-full sm:w-auto">
                            Start Module Quiz <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </motion.section>
        </div>
    );
};
