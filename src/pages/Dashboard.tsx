import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, ArrowRight, PlayCircle, Calendar } from 'lucide-react';
import { getProfile } from '../services/profileService';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { moduleTemplates, mockEvents } from '../data/mockData';

export const Dashboard = () => {
    const profile = getProfile();

    // In a real app, this would come from a backend combining template data with user progress
    const recommendedModule = moduleTemplates[0];
    const upcomingEvents = mockEvents.slice(0, 2);

    // Mock progress data
    const overallProgress = 15;
    const completedModules = 0;
    const totalModules = moduleTemplates.length;

    if (!profile) return null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <header className="mb-10">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold font-heading mb-2 text-slate-900"
                >
                    Welcome back, {profile.name.split(' ')[0]}
                </motion.h1>
                <p className="text-slate-600">Here's your personalized Ascend Ignite progress.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Main Content Column */}
                <div className="md:col-span-2 space-y-8">

                    {/* Profile Summary Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <BookOpen className="h-5 w-5" />
                                    Your AI-Readiness Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-700 leading-relaxed">
                                    {profile.profileSummary || "Complete more modules to build out your personalized profile summary."}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-600 border border-slate-200 shadow-sm">
                                        {profile.learningStyle} Learner
                                    </span>
                                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-600 border border-slate-200 shadow-sm">
                                        {profile.mindsetType}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Recommended Action */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h2 className="text-xl font-bold font-heading mb-4 text-slate-900 flex items-center gap-2">
                            Up Next for You
                        </h2>
                        <Card className="hover:border-primary/50 transition-colors shadow-sm">
                            <div className="flex flex-col sm:flex-row">
                                <div className="sm:w-1/3 bg-slate-100 flex items-center justify-center p-6 sm:rounded-l-xl">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                                        <PlayCircle className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="text-xs font-bold tracking-wider text-primary uppercase mb-2">Recommended Module</div>
                                        <h3 className="text-xl font-bold font-heading mb-2">{recommendedModule.title}</h3>
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{recommendedModule.description}</p>
                                    </div>
                                    <Link to={`/module/${recommendedModule.id}`}>
                                        <Button className="w-full sm:w-auto">Start Module</Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* All Modules Grid */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <h2 className="text-xl font-bold font-heading mb-4 text-slate-900">Learning Path</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {moduleTemplates.map((module, index) => (
                                <Card key={module.id} className="flex flex-col h-full">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg">{module.title}</CardTitle>
                                        <CardDescription className="line-clamp-2 mt-1">{module.topic}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-1 pb-4">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                                {index + 1}
                                            </div>
                                            Module {index + 1}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link to={`/module/${module.id}`} className="w-full">
                                            <Button variant={index === 0 ? "primary" : "outline"} className="w-full text-sm">
                                                {index === 0 ? "Continue" : "View Details"}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">

                    {/* Progress Tracker */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-slate-900">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    Your Journey
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ProgressBar progress={overallProgress} showLabel />
                                <div className="mt-6 flex justify-between text-sm">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-lg text-slate-900">{completedModules}/{totalModules}</span>
                                        <span className="text-slate-500">Modules</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="font-bold text-lg text-slate-900">0</span>
                                        <span className="text-slate-500">Quizzes Passed</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Community Preview */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-slate-900">Community & Events</CardTitle>
                                <CardDescription>Upcoming opportunities to connect</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {upcomingEvents.map(event => (
                                    <div key={event.id} className="flex gap-3 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                                        <div className="mt-1 bg-slate-100 p-2 rounded-lg text-slate-500">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-slate-900 line-clamp-1">{event.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1">{new Date(event.date).toLocaleDateString()} • {event.type === 'networking' ? 'Mixer' : 'Advising'}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter>
                                <Link to="/community" className="w-full">
                                    <Button variant="ghost" className="w-full text-sm justify-between group">
                                        View all events
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
