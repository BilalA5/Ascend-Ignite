import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Presentation, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { mockEvents } from '../data/mockData';

export const Community = () => {
    const upcomingNetworking = mockEvents.filter(e => e.type === 'networking').slice(0, 2);
    const upcomingAdvising = mockEvents.filter(e => e.type === 'advising').slice(0, 2);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <header className="mb-12 text-center max-w-2xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold font-heading mb-4 text-slate-900"
                >
                    Community Hub
                </motion.h1>
                <p className="text-xl text-slate-600">
                    Connect with peers, mentors, and industry professionals. Building a strong network is your best defense against industry shifts.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Networking Section */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="h-full flex flex-col hover:border-primary/30 transition-colors">
                        <CardHeader className="bg-primary/5 pb-8 border-b border-primary/10">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm mb-4">
                                <Users className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-2xl">Networking Events</CardTitle>
                            <CardDescription className="text-base mt-2">Mixers, panels, and guest speaker sessions.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pt-6 flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-slate-900 text-sm tracking-wider uppercase">Upcoming</h4>
                                {upcomingNetworking.map(event => (
                                    <div key={event.id} className="flex gap-3 items-start border border-slate-100 p-3 rounded-lg bg-slate-50/50">
                                        <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <h5 className="font-medium text-slate-900 line-clamp-1">{event.name}</h5>
                                            <p className="text-sm text-slate-500">{new Date(event.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/community/networking" className="w-full">
                                <Button variant="outline" className="w-full justify-between group">
                                    Explore Networking <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Group Advising Section */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <Card className="h-full flex flex-col hover:border-primary/30 transition-colors">
                        <CardHeader className="bg-slate-50 pb-8 border-b border-slate-100">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-slate-700 shadow-sm mb-4">
                                <Presentation className="w-8 h-8" />
                            </div>
                            <CardTitle className="text-2xl">Group Advising</CardTitle>
                            <CardDescription className="text-base mt-2">Small group sessions focused on career strategy.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pt-6 flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-slate-900 text-sm tracking-wider uppercase">Upcoming</h4>
                                {upcomingAdvising.map(event => (
                                    <div key={event.id} className="flex gap-3 items-start border border-slate-100 p-3 rounded-lg bg-slate-50/50">
                                        <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                                        <div>
                                            <h5 className="font-medium text-slate-900 line-clamp-1">{event.name}</h5>
                                            <p className="text-sm text-slate-500">{new Date(event.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/community/advising" className="w-full">
                                <Button variant="outline" className="w-full justify-between group">
                                    Explore Group Advising <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
