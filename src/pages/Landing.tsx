import { Suspense, lazy, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    Sparkles,
    Target,
    Users,
    ChevronDown,
    Award,
    Zap,
    TrendingUp,
    CheckCircle2,
    Brain,
    MessageCircle,
    Rocket,
} from 'lucide-react';
import { Button } from '../components/Button';
import { getProfile } from '../services/profileService';

const HeroSpline = lazy(() =>
    import('../components/HeroSpline').then((module) => ({ default: module.HeroSpline }))
);

const pillars = [
    {
        icon: <Target className="h-5 w-5" />,
        title: 'Career Pathways',
        description: 'From self-assessment to internship-ready.',
        color: 'from-blue-500 to-indigo-500',
        bgColor: 'bg-blue-50',
    },
    {
        icon: <Brain className="h-5 w-5" />,
        title: 'AI + Human Skills',
        description: 'Technology as your advantage, not a threat.',
        color: 'from-violet-500 to-purple-500',
        bgColor: 'bg-violet-50',
    },
    {
        icon: <Users className="h-5 w-5" />,
        title: 'Mentorship',
        description: 'Peer support and advisor touchpoints.',
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-50',
    },
];

const steps = [
    {
        title: 'Assess',
        description: 'Identify goals & confidence gaps',
        icon: <Target className="h-6 w-6" />,
    },
    {
        title: 'Learn',
        description: 'Guided modules & exercises',
        icon: <BookOpen className="h-6 w-6" />,
    },
    {
        title: 'Achieve',
        description: 'Earn certificates & grow',
        icon: <Award className="h-6 w-6" />,
    },
];

const faqs = [
    { q: 'Who is this for?', a: 'College students and early-career professionals building AI-readiness and career confidence.' },
    { q: 'How long does it take?', a: 'Each course takes 15-20 minutes. Complete all three to earn your certificates.' },
    { q: 'Are certificates recognized?', a: 'Yes — share them on LinkedIn or with employers to demonstrate AI-readiness skills.' },
    { q: 'Is there a cost?', a: 'Completely free for all students.' },
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
            {/* Hero Section */}
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
                        <div className="absolute right-4 top-4 z-20 flex gap-3 md:right-6 md:top-6">
                            <Link to="/signup">
                                <Button size="sm" className="shadow-[0_16px_36px_rgba(37,99,235,0.22)]">
                                    Sign up
                                </Button>
                            </Link>
                            <Link to="/onboarding">
                                <Button variant="outline" size="sm" className="border-white/40 bg-white/30 text-slate-900 shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                                    Log in
                                </Button>
                            </Link>
                        </div>
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

                    {/* Hero Bottom Card */}
                    <motion.div
                        style={{ y: contentY, opacity: contentOpacity }}
                        className="relative z-20 mt-auto px-4 pb-8 md:px-6"
                    >
                        <div className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/40 bg-white/50 px-5 py-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl backdrop-saturate-150 md:px-8">
                            <div className="mx-auto mb-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_8px_20px_rgba(37,99,235,0.3)]" />

                            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                                <div className="rounded-[28px] border border-white/50 bg-white/60 p-7 shadow-[0_8px_32px_rgba(15,23,42,0.04)] backdrop-blur-xl md:p-8">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Professional empowerment</p>
                                            <h1 className="mt-3 max-w-lg text-3xl text-slate-950 md:text-4xl lg:text-5xl">
                                                Your career in an AI-shaped world starts here.
                                            </h1>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: [0, 8, -8, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                            className="hidden rounded-2xl border border-white/50 bg-white/60 p-3 text-primary backdrop-blur md:block"
                                        >
                                            <Sparkles className="h-5 w-5" />
                                        </motion.div>
                                    </div>

                                    <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                                        Career education, AI readiness, and mentorship — all in one platform.
                                    </p>

                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <Link to="/signup">
                                            <Button size="lg" className="w-full justify-center gap-2 sm:w-auto">
                                                Get Started <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Right — Animated Stats */}
                                <div className="grid gap-3 md:grid-rows-3">
                                    {[
                                        { icon: <Zap className="h-4 w-4" />, value: 'Guided', sub: 'Clear journey, not a content dump' },
                                        { icon: <TrendingUp className="h-4 w-4" />, value: 'Career-first', sub: 'Confidence & employability' },
                                        { icon: <MessageCircle className="h-4 w-4" />, value: 'High-touch', sub: 'Community & advising built in' },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.12 }}
                                            className="flex items-center gap-4 rounded-[20px] border border-white/50 bg-white/50 p-4 backdrop-blur-xl"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-lg font-heading font-bold text-slate-900">{item.value}</p>
                                                <p className="text-xs text-slate-500">{item.sub}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pillars Section — Visual cards with floating shapes */}
            <section className="relative overflow-hidden py-20 md:py-28">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_40%,#eef5ff_100%)]" />

                {/* Floating decorative shapes */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-20 left-[8%] h-16 w-16 rounded-2xl border border-blue-200/40 bg-blue-100/20 backdrop-blur-sm"
                />
                <motion.div
                    animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-32 right-[12%] h-12 w-12 rounded-full border border-violet-200/40 bg-violet-100/20 backdrop-blur-sm"
                />
                <motion.div
                    animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-24 left-[15%] h-10 w-10 rounded-xl border border-amber-200/40 bg-amber-100/20 backdrop-blur-sm"
                />
                <motion.div
                    animate={{ y: [0, 18, 0], rotate: [0, 12, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-40 right-[8%] h-14 w-14 rounded-2xl border border-blue-200/30 bg-blue-50/30 backdrop-blur-sm"
                />

                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-2xl text-center mb-14"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-primary/10 text-primary backdrop-blur">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">
                            Built for your success
                        </h2>
                        <p className="mt-3 text-sm text-slate-500">Three pillars that power your career transformation</p>
                    </motion.div>

                    {/* Pillar Cards — with visual icons instead of heavy text */}
                    <div className="mx-auto max-w-5xl grid gap-5 md:grid-cols-3 mb-24">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="group relative rounded-[28px] border border-white/50 bg-white/50 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-shadow"
                            >
                                {/* Decorative gradient blob */}
                                <div className={`absolute -top-3 -right-3 h-20 w-20 rounded-full bg-gradient-to-br ${pillar.color} opacity-[0.06] blur-2xl group-hover:opacity-[0.12] transition-opacity`} />

                                <div className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${pillar.bgColor} text-primary`}>
                                    <motion.div
                                        animate={{ scale: [1, 1.08, 1] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                    >
                                        {pillar.icon}
                                    </motion.div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{pillar.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">{pillar.description}</p>

                                {/* Bottom accent line */}
                                <div className={`mt-5 h-1 w-12 rounded-full bg-gradient-to-r ${pillar.color} opacity-40 group-hover:w-full group-hover:opacity-60 transition-all duration-500`} />
                            </motion.div>
                        ))}
                    </div>

                    {/* How It Works — Visual flow with connecting line */}
                    <div className="mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-primary/10 text-primary backdrop-blur">
                                <Rocket className="h-5 w-5" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">How it works</h2>
                            <p className="mt-3 text-sm text-slate-500">Three steps. Zero confusion.</p>
                        </motion.div>

                        <div className="relative grid gap-5 md:grid-cols-3">
                            {/* Connecting line (desktop only) */}
                            <div className="absolute top-[52px] left-[16.6%] right-[16.6%] hidden h-[2px] md:block">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="h-full w-full origin-left bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 rounded-full"
                                />
                            </div>

                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
                                    className="relative flex flex-col items-center text-center"
                                >
                                    {/* Step circle */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="relative z-10 mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-white/60 bg-white/70 text-primary shadow-[0_8px_32px_rgba(37,99,235,0.12)] backdrop-blur-xl"
                                    >
                                        <div className="absolute inset-0 rounded-full bg-primary/5" />
                                        <motion.div
                                            animate={{ scale: [1, 1.15, 1] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                                        >
                                            {step.icon}
                                        </motion.div>
                                        {/* Step number badge */}
                                        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
                                            {index + 1}
                                        </div>
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                                    <p className="mt-1.5 text-sm text-slate-500">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof / Features Strip */}
            <section className="relative overflow-hidden py-12">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(circle_at_80%_50%,rgba(96,165,250,0.1),transparent_50%)]" />
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                        {[
                            { icon: <BookOpen className="h-5 w-5" />, text: '3 Courses' },
                            { icon: <Award className="h-5 w-5" />, text: 'Certificates' },
                            { icon: <CheckCircle2 className="h-5 w-5" />, text: 'Quiz Assessments' },
                            { icon: <MessageCircle className="h-5 w-5" />, text: 'AI Assistant' },
                            { icon: <Users className="h-5 w-5" />, text: 'Community' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="flex items-center gap-2.5 text-white/70"
                            >
                                <div className="text-blue-400">{item.icon}</div>
                                <span className="text-sm font-medium">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_50%,#ffffff_100%)]" />

                {/* Decorative shapes */}
                <motion.div
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-16 right-[10%] h-10 w-10 rounded-xl border border-blue-100/50 bg-blue-50/30 backdrop-blur-sm"
                />
                <motion.div
                    animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-20 left-[8%] h-8 w-8 rounded-lg border border-slate-200/40 bg-slate-50/40 backdrop-blur-sm"
                />

                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-2xl text-center mb-10"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-primary/10 text-primary backdrop-blur">
                            <ChevronDown className="h-5 w-5" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">Questions?</h2>
                    </motion.div>

                    <div className="mx-auto max-w-2xl space-y-3">
                        {faqs.map((faq, i) => (
                            <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mx-auto mt-16 max-w-md text-center"
                    >
                        <div className="rounded-[28px] border border-white/50 bg-white/50 p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                            >
                                <Rocket className="h-6 w-6" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-slate-900">Ready to launch?</h3>
                            <p className="mt-2 text-sm text-slate-500">Free for all students.</p>
                            <Link to="/signup" className="mt-5 block">
                                <Button size="lg" className="w-full justify-center gap-2">
                                    Create Account <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const FaqItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
    const [open, setOpen] = useState(false);

    return (
        <motion.button
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            onClick={() => setOpen(!open)}
            className="w-full text-left rounded-[20px] border border-white/50 bg-white/50 backdrop-blur-xl shadow-[0_4px_16px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.06)] transition-all"
        >
            <div className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="text-sm font-semibold text-slate-900">{question}</span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 rounded-full bg-slate-100 p-1 text-slate-400"
                >
                    <ChevronDown className="h-3.5 w-3.5" />
                </motion.div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-start gap-3 px-6 pb-4">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <p className="text-sm leading-6 text-slate-500">{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
