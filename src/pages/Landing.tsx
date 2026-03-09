import { Suspense, lazy, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    Sparkles,
    Target,
    Users,
} from 'lucide-react';
import { Button } from '../components/Button';
import { getProfile } from '../services/profileService';

const HeroSpline = lazy(() =>
    import('../components/HeroSpline').then((module) => ({ default: module.HeroSpline }))
);

const pillars = [
    {
        icon: <Target className="h-6 w-6" />,
        title: 'Career Readiness Pathways',
        description: 'Structured modules help students move from self-assessment to confident positioning for internships, co-ops, and first roles.',
    },
    {
        icon: <BookOpen className="h-6 w-6" />,
        title: 'Practical AI + Human Skills',
        description: 'Learners build communication, judgment, and AI fluency together so technology becomes an advantage rather than a threat.',
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: 'Mentorship and Community',
        description: 'Peer support, guided reflection, and advisor touchpoints turn the platform into an ongoing growth environment.',
    },
];

const steps = [
    {
        title: 'Assess your starting point',
        description: 'Students identify goals, strengths, and confidence gaps through onboarding and tailored recommendations.',
    },
    {
        title: 'Progress through guided modules',
        description: 'Each experience combines learning content, reflection, and actionable career exercises that build momentum.',
    },
    {
        title: 'Turn progress into outcomes',
        description: 'Portfolio signals, networking practice, and advising support help translate learning into real-world opportunity.',
    },
];

const outcomes = [
    { label: 'Learning model', value: 'Guided', detail: 'A clear journey instead of a generic content library.' },
    { label: 'Student focus', value: 'Career-first', detail: 'Designed around confidence, employability, and future readiness.' },
    { label: 'Experience', value: 'High-touch', detail: 'Community, advising, and practical exercises reinforce every step.' },
];

export const Landing = () => {
    const profile = getProfile();
    const revealRef = useRef<HTMLElement | null>(null);
    const detailsRevealRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: revealRef,
        offset: ['start start', 'end end'],
    });
    const { scrollYProgress: detailsScrollYProgress } = useScroll({
        target: detailsRevealRef,
        offset: ['start start', 'end end'],
    });
    const introOverlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.08, 0.16]);
    const contentY = useTransform(scrollYProgress, [0, 1], ['30vh', '0vh']);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.72, 0.92, 1]);
    const detailsPanelY = useTransform(detailsScrollYProgress, [0, 1], ['24vh', '0vh']);
    const detailsPanelOpacity = useTransform(detailsScrollYProgress, [0, 0.25, 1], [0.74, 0.93, 1]);

    if (profile) {
        return <Navigate to="/dashboard" replace />;
    }

        return (
        <div className="flex min-h-screen flex-col">
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
                                    className="border-white/85 bg-white/90 text-slate-900 shadow-[0_16px_36px_rgba(15,23,42,0.08)] backdrop-blur"
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

                    <motion.div
                        style={{ y: contentY, opacity: contentOpacity }}
                        className="relative z-20 mt-auto px-4 pb-8 md:px-6"
                    >
                        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white bg-white px-4 py-6 shadow-[0_28px_70px_rgba(15,23,42,0.1)] backdrop-blur-xl md:px-6">
                            <div className="mx-auto mb-6 h-2 w-28 rounded-full bg-gradient-to-r from-blue-300 via-sky-400 to-cyan-200 shadow-[0_10px_26px_rgba(37,99,235,0.3)]" />

                            <div className="rounded-[28px] border border-slate-200/70 bg-white px-6 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] backdrop-blur md:px-8">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                                        Career education • AI literacy • advising • networking
                                    </p>
                                    <p className="max-w-2xl text-sm leading-7 text-slate-600">
                                        A modern student success platform should explain the value proposition immediately: skill development, structured support, and employability outcomes.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
                                <div className="rounded-[34px] border border-slate-200/70 bg-white p-7 shadow-[0_24px_55px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Professional empowerment platform</p>
                                            <h1 className="mt-3 max-w-2xl text-3xl text-slate-950 md:text-5xl">
                                                Prepare students for meaningful careers in an AI-shaped economy.
                                            </h1>
                                        </div>
                                        <div className="hidden rounded-2xl bg-primary/10 p-3 text-primary md:block">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                                        Ascend Ignite combines career education, AI readiness, mentorship, and confidence-building into one polished student platform built for lasting professional growth.
                                    </p>

                                    <div className="mt-8 flex flex-col gap-4">
                                        <Link to="/signup" className="block w-full">
                                            <Button size="lg" className="w-full justify-center gap-3 text-lg">
                                                Explore the Platform <ArrowRight className="h-5 w-5" />
                                            </Button>
                                        </Link>
                                        <div className="flex items-center rounded-full border border-slate-200/70 bg-white px-5 py-4 text-sm text-slate-600 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                                            Built for onboarding, advising, networking, and measurable student progression.
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
                                    {outcomes.map((item) => (
                                        <Metric key={item.label} label={item.label} value={item.value} detail={item.detail} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section ref={detailsRevealRef} className="relative min-h-[126vh] overflow-hidden pt-8">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_40%,#eef5ff_100%)]" />
                <div className="relative z-10 flex min-h-[126vh] flex-col">
                    <motion.div
                        className="sticky top-0 flex min-h-screen flex-col justify-center"
                    >
                        <div className="container mx-auto -mt-[10vh] px-4 md:-mt-[8vh] md:px-6">
                            <div className="mx-auto max-w-3xl text-center">
                                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Program pillars</p>
                                <h2 className="mt-4 text-4xl font-bold text-slate-950 md:text-5xl">
                                    A more credible story for student transformation
                                </h2>
                                <p className="mt-5 text-lg leading-8 text-slate-600">
                                    The platform now reads like a serious education and workforce-readiness product, with clearer structure and stronger professional signals.
                                </p>
                            </div>

                            <div className="mx-auto mt-14 grid max-w-6xl gap-8 md:grid-cols-3">
                                {pillars.map((pillar, index) => (
                                    <FeatureCard
                                        key={pillar.title}
                                        icon={pillar.icon}
                                        title={pillar.title}
                                        description={pillar.description}
                                        delay={index * 0.08}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ y: detailsPanelY, opacity: detailsPanelOpacity }}
                        className="relative z-20 mt-auto px-4 pb-24 md:px-6"
                    >
                        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white bg-white px-6 py-6 shadow-[0_28px_70px_rgba(15,23,42,0.1)] backdrop-blur-xl md:px-10">
                            <div className="mx-auto mb-6 h-2 w-28 rounded-full bg-gradient-to-r from-blue-200 via-blue-300 to-sky-200 shadow-[0_8px_22px_rgba(37,99,235,0.26)]" />

                            <div className="lux-panel rounded-[36px] px-6 py-10 md:px-10 md:py-12">
                                <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">How it works</p>
                                        <h2 className="mt-4 text-4xl font-bold text-slate-950 md:text-5xl">
                                            Designed like a pathway, not a brochure
                                        </h2>
                                        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                                            Students should understand what happens next. This section makes the journey legible and reinforces the platform’s educational value.
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        {steps.map((step, index) => (
                                            <motion.div
                                                key={step.title}
                                                initial={{ opacity: 0, x: 16 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                                                className="rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_38px_rgba(15,23,42,0.05)]"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.24)]">
                                                        0{index + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl text-slate-900">{step.title}</h3>
                                                        <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({
    icon,
    title,
    description,
    delay,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay }}
        whileHover={{ y: -5 }}
        className="lux-panel rounded-[30px] p-8"
    >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {icon}
        </div>
        <h3 className="text-2xl text-slate-900">{title}</h3>
        <p className="mt-4 leading-7 text-slate-600">{description}</p>
    </motion.div>
);

const Metric = ({
    label,
    value,
    detail,
}: {
    label: string;
    value: string;
    detail: string;
}) => (
    <div className="flex h-full flex-col justify-center rounded-[24px] border border-slate-200/70 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-heading text-slate-900">{value}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
);
