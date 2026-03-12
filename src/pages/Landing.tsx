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
        description: 'Structured modules that move you from self-assessment to confident positioning for internships and first roles.',
    },
    {
        icon: <BookOpen className="h-5 w-5" />,
        title: 'AI + Human Skills',
        description: 'Build communication, judgment, and AI fluency together so technology becomes your advantage.',
    },
    {
        icon: <Users className="h-5 w-5" />,
        title: 'Mentorship & Community',
        description: 'Peer support, guided reflection, and advisor touchpoints for ongoing growth.',
    },
];

const steps = [
    {
        title: 'Assess',
        description: 'Identify your goals, strengths, and confidence gaps through tailored onboarding.',
    },
    {
        title: 'Learn',
        description: 'Progress through guided modules combining content, reflection, and career exercises.',
    },
    {
        title: 'Achieve',
        description: 'Earn certificates and build portfolio signals that translate into real opportunity.',
    },
];

const faqs = [
    {
        q: 'Who is Ascend Ignite for?',
        a: 'College students and early-career professionals looking to build AI-readiness skills and career confidence.',
    },
    {
        q: 'How long does it take to complete?',
        a: 'Each course takes about 15-20 minutes. Complete all three to earn your certificates.',
    },
    {
        q: 'Are the certificates recognized?',
        a: 'Certificates demonstrate completion of our AI-readiness curriculum and can be shared on LinkedIn or with employers.',
    },
    {
        q: 'Is there a cost?',
        a: 'Ascend Ignite is completely free for all students.',
    },
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
                                <Button
                                    size="sm"
                                    className="shadow-[0_16px_36px_rgba(37,99,235,0.22)]"
                                >
                                    Sign up
                                </Button>
                            </Link>
                            <Link to="/onboarding">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-white/40 bg-white/30 text-slate-900 shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                                >
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

                    {/* Hero Bottom Card — Glassmorphic */}
                    <motion.div
                        style={{ y: contentY, opacity: contentOpacity }}
                        className="relative z-20 mt-auto px-4 pb-8 md:px-6"
                    >
                        <div className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/40 bg-white/50 px-5 py-6 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl backdrop-saturate-150 md:px-8">
                            <div className="mx-auto mb-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-[0_8px_20px_rgba(37,99,235,0.3)]" />

                            <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                                {/* Left — Main CTA */}
                                <div className="rounded-[28px] border border-white/50 bg-white/60 p-7 shadow-[0_8px_32px_rgba(15,23,42,0.04)] backdrop-blur-xl md:p-8">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Professional empowerment</p>
                                            <h1 className="mt-3 max-w-lg text-3xl text-slate-950 md:text-4xl lg:text-5xl">
                                                Your career in an AI-shaped world starts here.
                                            </h1>
                                        </div>
                                        <div className="hidden rounded-2xl border border-white/50 bg-white/60 p-3 text-primary backdrop-blur md:block">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                                        Career education, AI readiness, and mentorship in one platform built for lasting professional growth.
                                    </p>

                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <Link to="/signup">
                                            <Button size="lg" className="w-full justify-center gap-2 sm:w-auto">
                                                Get Started <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Right — Stats */}
                                <div className="grid gap-3 md:grid-rows-3">
                                    {[
                                        { label: 'Model', value: 'Guided', sub: 'Clear journey, not a content dump' },
                                        { label: 'Focus', value: 'Career-first', sub: 'Confidence & employability' },
                                        { label: 'Experience', value: 'High-touch', sub: 'Community & advising built in' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex flex-col justify-center rounded-[20px] border border-white/50 bg-white/50 p-4 backdrop-blur-xl">
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                                            <p className="mt-1 text-xl font-heading text-slate-900">{item.value}</p>
                                            <p className="mt-1 text-xs text-slate-500">{item.sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pillars + How it Works — Combined condensed section */}
            <section className="relative overflow-hidden py-20 md:py-28">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_40%,#eef5ff_100%)]" />
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="mx-auto max-w-2xl text-center mb-14">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Why Ascend Ignite</p>
                        <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
                            Everything you need to launch your career
                        </h2>
                    </div>

                    {/* Pillar Cards — Glassmorphic */}
                    <div className="mx-auto max-w-5xl grid gap-4 md:grid-cols-3 mb-20">
                        {pillars.map((pillar, index) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                whileHover={{ y: -4 }}
                                className="rounded-[24px] border border-white/50 bg-white/50 p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_48px_rgba(37,99,235,0.08)] transition-shadow"
                            >
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/50 bg-primary/10 text-primary backdrop-blur">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">{pillar.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* How It Works — Horizontal steps */}
                    <div className="mx-auto max-w-4xl">
                        <div className="text-center mb-10">
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">How it works</p>
                            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">Three steps to career-ready</h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="relative rounded-[24px] border border-white/50 bg-white/60 p-6 backdrop-blur-xl shadow-[0_8px_28px_rgba(15,23,42,0.04)]"
                                >
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.25)]">
                                        0{index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section — Accordion */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#eef5ff_0%,#f8fbff_50%,#ffffff_100%)]" />
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="mx-auto max-w-2xl text-center mb-12">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">FAQ</p>
                        <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">Common questions</h2>
                    </div>

                    <div className="mx-auto max-w-2xl space-y-3">
                        {faqs.map((faq, i) => (
                            <FaqItem key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mx-auto mt-16 max-w-lg text-center">
                        <div className="rounded-[28px] border border-white/50 bg-white/50 p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
                            <h3 className="text-2xl font-bold text-slate-900">Ready to get started?</h3>
                            <p className="mt-2 text-sm text-slate-500">Join Ascend Ignite today — it's completely free.</p>
                            <Link to="/signup" className="mt-5 block">
                                <Button size="lg" className="w-full justify-center gap-2">
                                    Create Account <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
    const [open, setOpen] = useState(false);

    return (
        <button
            onClick={() => setOpen(!open)}
            className="w-full text-left rounded-[20px] border border-white/50 bg-white/50 backdrop-blur-xl shadow-[0_4px_16px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_28px_rgba(37,99,235,0.06)] transition-all"
        >
            <div className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="text-sm font-semibold text-slate-900">{question}</span>
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
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-4 text-sm leading-6 text-slate-500">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};
