import { Suspense, lazy, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Target,
    Users,
    ChevronDown,
    Brain,
    Flame,
} from 'lucide-react';
import { Button } from '../components/Button';
import { FeatureSteps } from '../components/FeatureSteps';
import { FeatureCarousel } from '../components/FeatureCarousel';
import { LandingNavbar } from '../components/LandingNavbar';
import { VerticalCutReveal } from '../components/VerticalCutReveal';
import { getProfile } from '../services/profileService';

const HeroSpline = lazy(() =>
    import('../components/HeroSpline').then((module) => ({ default: module.HeroSpline }))
);

const faqs = [
    { q: 'Who is Ascend Ignite for?', a: 'College students and early-career professionals who want to feel confident about their future in an AI-driven job market.' },
    { q: 'How long does it take?', a: 'Each course is about 15-20 minutes. You can finish the whole program in under an hour.' },
    { q: 'Do the certificates mean anything?', a: 'They prove you completed our AI-readiness curriculum. Add them to LinkedIn or share with employers.' },
    { q: 'What does it cost?', a: 'Nothing. It\'s free.' },
];

export const Landing = () => {
    const profile = getProfile();
    const revealRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: revealRef,
        offset: ['start start', 'end end'],
    });
    const introOverlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.08, 0.16]);
    const contentY = useTransform(scrollYProgress, [0, 1], ['30vh', '0vh']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.72, 0.92, 1]);

    if (profile) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <LandingNavbar />

            {/* ── Hero ── */}
            <section ref={revealRef} className="relative min-h-[185vh] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#bfe9ff_0%,#87cefa_34%,#9fd7fb_54%,#dfeffd_72%,#ffffff_100%)]" />

                <div className="relative z-10 flex min-h-[185vh] flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        className="sticky top-0 flex min-h-screen flex-col overflow-hidden"
                    >
                        <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-[linear-gradient(180deg,rgba(135,206,250,0),rgba(135,206,250,0.78)_72%,rgba(135,206,250,0.97)_100%)]" />
                        <motion.div
                            style={{ opacity: introOverlayOpacity }}
                            className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_22%,rgba(15,23,42,0.24)_100%)]"
                        />

                        <div className="relative flex min-h-screen flex-col justify-end">
                            <div className="pointer-events-none absolute inset-0">
                                <Suspense
                                    fallback={
                                        <div className="flex h-full items-center justify-center px-8 text-center text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                                            Loading ascend ignite experience
                                        </div>
                                    }
                                >
                                    <HeroSpline />
                                </Suspense>
                            </div>
                            <div className="relative z-10 flex justify-center pb-6 md:pb-8">
                                <div className="h-11 w-[1px] bg-gradient-to-b from-transparent via-blue-300/80 to-transparent" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero card */}
                    <motion.div
                        style={{ y: contentY, opacity: contentOpacity }}
                        className="relative z-20 mt-auto px-4 pb-8 md:px-6"
                    >
                        <div className="mx-auto max-w-4xl rounded-[32px] border border-white/40 bg-white/50 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-2xl backdrop-saturate-150 md:p-10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4">Ascend Ignite</p>
                            <h1 className="max-w-2xl text-3xl text-slate-950 md:text-5xl leading-[1.15]">
                                <VerticalCutReveal
                                    splitBy="words"
                                    staggerDuration={0.08}
                                    transition={{ type: 'spring', stiffness: 200, damping: 21 }}
                                >
                                    The career platform for students who don't want to be left behind.
                                </VerticalCutReveal>
                            </h1>
                            <p className="mt-4 max-w-lg text-base leading-7 text-slate-500">
                                Learn to work alongside AI, build real career skills, and earn certificates that actually say something — all in under an hour.
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                <Link to="/signup">
                                    <Button size="lg" className="gap-2">
                                        Start for free <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <span className="text-xs text-slate-400">No credit card. No catch.</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── What you get ── */}
            <section className="relative overflow-hidden py-20 md:py-28">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_50%,#eef5ff_100%)]" />
                <div className="relative z-10 container mx-auto max-w-5xl px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-14"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">What you get</p>
                        <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl max-w-md">
                            Not another course library.
                        </h2>
                    </motion.div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {[
                            { icon: <Target className="h-5 w-5" />, title: 'Career pathways', desc: 'Structured modules that move you from "I don\'t know what I\'m doing" to interview-ready.' },
                            { icon: <Brain className="h-5 w-5" />, title: 'AI fluency', desc: 'Learn what AI can and can\'t do, how to use it well, and why your human skills still matter.' },
                            { icon: <Users className="h-5 w-5" />, title: 'Real community', desc: 'Networking events, advisor sessions, and peers who are figuring it out alongside you.' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="rounded-[24px] border border-white/50 bg-white/50 p-6 backdrop-blur-xl shadow-[0_4px_24px_rgba(15,23,42,0.04)]"
                            >
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How it works — FeatureSteps ── */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#eef5ff_0%,#f8fbff_50%,#ffffff_100%)]" />
                <div className="relative z-10">
                    <FeatureSteps
                        title="How it works"
                        autoPlayInterval={4000}
                        features={[
                            {
                                step: 'Step 1',
                                title: 'Find your starting point',
                                content: 'Quick onboarding quiz figures out where you are and recommends what to focus on first.',
                                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
                            },
                            {
                                step: 'Step 2',
                                title: 'Learn through real scenarios',
                                content: 'Short courses with videos, interactive exercises, and scenario-based learning — not just reading.',
                                image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
                            },
                            {
                                step: 'Step 3',
                                title: 'Prove what you know',
                                content: 'Pass the quizzes, earn certificates, and share them with employers or on LinkedIn.',
                                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
                            },
                        ]}
                    />
                </div>
            </section>

            {/* ── Platform Preview Carousel ── */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_50%,#eef5ff_100%)]" />
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">See it in action</p>
                        <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">A closer look at the platform</h2>
                    </motion.div>

                    <FeatureCarousel
                        steps={[
                            { id: '1', name: 'Courses', title: 'Guided Learning Modules', description: 'Each course includes videos, interactive scenarios, and knowledge checks designed for real-world readiness.' },
                            { id: '2', name: 'Quizzes', title: 'Test Your Understanding', description: 'Score 70% or higher to prove mastery and unlock your certificate for each course.' },
                            { id: '3', name: 'Certificates', title: 'Earn Real Credentials', description: 'Download professional certificates and share them on LinkedIn or with employers.' },
                            { id: '4', name: 'Community', title: 'Connect & Grow Together', description: 'Join networking events, advising sessions, and connect with peers on the same journey.' },
                        ]}
                        image={{
                            step1img1: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
                            step1img2: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
                            step2img1: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600',
                            step2img2: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=600',
                            step3img: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&q=80&w=600',
                            step4img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600',
                            alt: 'Ascend Ignite platform preview',
                        }}
                    />
                </div>
            </section>

            {/* ── What's included strip ── */}
            <section className="relative overflow-hidden py-10">
                <div className="absolute inset-0 bg-slate-900" />
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
                        {['3 courses', 'Certificates', 'Quizzes', 'AI chatbot', 'Community', 'Advising'].map((item) => (
                            <span key={item} className="text-sm text-slate-400">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]" />
                <div className="relative z-10 container mx-auto max-w-2xl px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-bold text-slate-950 md:text-3xl">Frequently asked questions</h2>
                    </motion.div>

                    <div className="space-y-2">
                        {faqs.map((faq, i) => (
                            <FaqItem key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)]" />
                <div className="relative z-10 container mx-auto max-w-xl px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">Start building your future.</h2>
                    <p className="mt-3 text-base text-slate-500">Free. No fluff. Takes less than an hour.</p>
                    <Link to="/signup" className="mt-6 inline-block">
                        <Button size="lg" className="gap-2 px-8">
                            Create your account <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-slate-200/60 bg-white">
                <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6">
                    <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                                    <Flame className="h-4.5 w-4.5" />
                                </div>
                                <span className="font-heading text-lg font-bold text-slate-900">Ascend Ignite</span>
                            </div>
                            <p className="text-sm leading-6 text-slate-500 max-w-xs">
                                Helping students build the skills and confidence to thrive in an AI-driven career landscape.
                            </p>
                        </div>

                        {/* Platform */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Platform</h4>
                            <ul className="space-y-2.5">
                                <li><Link to="/signup" className="text-sm text-slate-600 hover:text-primary transition-colors">Courses</Link></li>
                                <li><Link to="/signup" className="text-sm text-slate-600 hover:text-primary transition-colors">Certificates</Link></li>
                                <li><Link to="/signup" className="text-sm text-slate-600 hover:text-primary transition-colors">Community</Link></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Resources</h4>
                            <ul className="space-y-2.5">
                                <li><Link to="/signup" className="text-sm text-slate-600 hover:text-primary transition-colors">Get started</Link></li>
                                <li><span className="text-sm text-slate-600">FAQ</span></li>
                                <li><span className="text-sm text-slate-600">Contact</span></li>
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-4">Connect</h4>
                            <ul className="space-y-2.5">
                                <li><span className="text-sm text-slate-600">support@ascendignite.com</span></li>
                                <li><span className="text-sm text-slate-600">advising@ascendignite.com</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 md:flex-row">
                        <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} Ascend Ignite. All rights reserved.</p>
                        <div className="flex gap-6">
                            <span className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">Privacy</span>
                            <span className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">Terms</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <button
            onClick={() => setOpen(!open)}
            className="w-full text-left rounded-2xl border border-slate-200/60 bg-white px-5 py-4 transition-shadow hover:shadow-[0_4px_16px_rgba(15,23,42,0.04)]"
        >
            <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-800">{question}</span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-slate-400"
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-2 text-sm leading-6 text-slate-500">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};
