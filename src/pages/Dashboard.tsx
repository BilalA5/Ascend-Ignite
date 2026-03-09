import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, ArrowRight, PlayCircle, Calendar, Sparkles } from 'lucide-react';
import { getProfile } from '../services/profileService';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { moduleTemplates, mockEvents } from '../data/mockData';

export const Dashboard = () => {
    const profile = getProfile();
    const recommendedModule = moduleTemplates[0];
    const upcomingEvents = mockEvents.slice(0, 2);
    const overallProgress = 15;
    const completedModules = 0;
    const totalModules = moduleTemplates.length;
    const firstName = profile?.name?.trim().split(/\s+/)[0] || 'Explorer';

    if (!profile) return null;

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <header className="mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lux-panel flex flex-col gap-6 rounded-[34px] px-7 py-8 md:flex-row md:items-end md:justify-between md:px-10"
                >
                    <div>
                        <p className="text-xs uppercase tracking-[0.34em] text-slate-500">Dashboard</p>
                        <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
                            Welcome back, {firstName}
                        </h1>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                            Your learning path now feels more like a premium coaching dashboard: clear priorities, cleaner hierarchy, and less visual clutter.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <StatPill label="Current track" value="AI Readiness" />
                        <StatPill label="Momentum" value={`${overallProgress}%`} />
                    </div>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.55fr)_360px]">
                <div className="space-y-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card className="border-primary/10 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),rgba(255,255,255,0.88))]">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <BookOpen className="h-5 w-5" />
                                    Your AI-Readiness Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-8 text-slate-700">
                                    {profile.profileSummary || 'Complete more modules to build out your personalized profile summary.'}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <Tag>{profile.learningStyle || 'Adaptive'} Learner</Tag>
                                    <Tag>{profile.mindsetType || 'Growth-Oriented'}</Tag>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                            <Sparkles className="h-5 w-5 text-primary" />
                            Up Next for You
                        </h2>
                        <Card className="overflow-hidden">
                            <div className="grid gap-0 md:grid-cols-[260px_minmax(0,1fr)]">
                                <div className="flex min-h-[220px] items-center justify-center bg-[linear-gradient(180deg,rgba(37,99,235,0.88),rgba(30,64,175,0.96))] p-8 text-white">
                                    <div className="text-center">
                                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/14 backdrop-blur">
                                            <PlayCircle className="h-10 w-10" />
                                        </div>
                                        <p className="text-xs uppercase tracking-[0.28em] text-white/70">Recommended module</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-7 md:p-9">
                                    <div>
                                        <div className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">Priority focus</div>
                                        <h3 className="text-2xl font-bold text-slate-900">{recommendedModule.title}</h3>
                                        <p className="mt-2 text-base leading-7 text-slate-600">{recommendedModule.description}</p>
                                    </div>
                                    <div className="mt-6">
                                        <Link to={`/module/${recommendedModule.id}`}>
                                            <Button className="w-full sm:w-auto">Start Module</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Learning Path</h2>
                                <p className="mt-1 text-slate-600">Three wide modules, arranged as premium editorial panels instead of boxed tiles.</p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            {moduleTemplates.map((module, index) => (
                                <Card key={module.id} className="group">
                                    <div className="grid gap-0 md:grid-cols-[96px_minmax(0,1fr)_190px]">
                                        <div className="flex items-center justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(37,99,235,0.08))] p-6">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white text-lg font-bold text-primary shadow-[0_14px_32px_rgba(37,99,235,0.12)]">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="p-7 md:p-8">
                                            <div className="mb-2 text-xs font-bold uppercase tracking-[0.26em] text-slate-500">Module {index + 1}</div>
                                            <h3 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-primary">
                                                {module.title}
                                            </h3>
                                            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
                                                {module.topic}
                                            </p>
                                            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                                                {module.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center p-7 pt-0 md:p-8">
                                            <Link to={`/module/${module.id}`} className="w-full">
                                                <Button variant={index === 0 ? 'primary' : 'outline'} className="w-full justify-between text-sm">
                                                    {index === 0 ? 'Continue Module' : 'View Module'}
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-8">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-slate-900">
                                    <Trophy className="h-5 w-5 text-primary" />
                                    Your Journey
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ProgressBar progress={overallProgress} showLabel />
                                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                                    <InfoBlock value={`${completedModules}/${totalModules}`} label="Modules" />
                                    <InfoBlock value="0" label="Quizzes Passed" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-slate-900">Community & Events</CardTitle>
                                <CardDescription>Upcoming opportunities to connect</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {upcomingEvents.map(event => (
                                    <div key={event.id} className="flex items-start gap-4 rounded-[22px] border border-white/70 bg-white/65 p-4 shadow-[0_16px_36px_rgba(15,23,42,0.04)]">
                                        <div className="mt-1 rounded-xl bg-primary/10 p-3 text-primary">
                                            <Calendar className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h4 className="line-clamp-1 text-sm font-semibold text-slate-900">{event.name}</h4>
                                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                                                {new Date(event.date).toLocaleDateString()} • {event.type === 'networking' ? 'Mixer' : 'Advising'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Link to="/community" className="w-full">
                                    <Button variant="ghost" className="group w-full justify-between text-sm">
                                        View all events
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
        {children}
    </span>
);

const StatPill = ({ label, value }: { label: string, value: string }) => (
    <div className="rounded-[22px] border border-white/70 bg-white/75 px-5 py-4 shadow-[0_18px_36px_rgba(15,23,42,0.05)]">
        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
        <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
    </div>
);

const InfoBlock = ({ value, label }: { value: string, label: string }) => (
    <div className="rounded-[22px] border border-white/70 bg-white/65 p-4">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
);
