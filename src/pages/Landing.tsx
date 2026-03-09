import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    BookOpen,
    Briefcase,
    Flame,
    Sparkles,
    Target,
    Users,
} from 'lucide-react';
import { Button } from '../components/Button';
import { getProfile } from '../services/profileService';

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

    if (profile) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <section className="relative overflow-hidden px-4 pb-20 pt-12 md:px-6 md:pb-28 md:pt-20">
                <div className="lux-grid absolute inset-0 opacity-40" />
                <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_58%)]" />

                <div className="container relative z-10 mx-auto max-w-6xl">
                    <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            className="lux-panel relative overflow-hidden rounded-[40px] px-6 py-12 md:px-10 md:py-14"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(239,246,255,0.1))]" />
                            <div className="relative">
                                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.26em] text-primary">
                                    <Flame className="h-4 w-4" />
                                    Professional empowerment platform
                                </div>
                                <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
                                    Prepare students for meaningful careers in an AI-shaped economy.
                                </h1>
                                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                                    Ascend Ignite combines career education, AI readiness, mentorship, and confidence-building into one polished student platform built for lasting professional growth.
                                </p>

                                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                    <Link to="/signup">
                                        <Button size="lg" className="gap-2 text-lg">
                                            Explore the Platform <ArrowRight className="h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <div className="flex items-center rounded-full border border-white/80 bg-white/72 px-5 py-4 text-sm text-slate-600 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                                        Built for onboarding, advising, networking, and measurable student progression.
                                    </div>
                                </div>

                                <div className="mt-12 grid gap-4 md:grid-cols-3">
                                    {outcomes.map((item) => (
                                        <Metric key={item.label} label={item.label} value={item.value} detail={item.detail} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="space-y-6"
                        >
                            <div className="lux-panel rounded-[34px] p-6 md:p-7">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Platform Snapshot</p>
                                        <h2 className="mt-3 text-3xl text-slate-900">What students actually experience</h2>
                                    </div>
                                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="mt-8 space-y-4">
                                    <HighlightRow icon={<BookOpen className="h-5 w-5" />} title="Personalized learning journey" detail="A clear sequence of modules replaces scattered resources." />
                                    <HighlightRow icon={<Briefcase className="h-5 w-5" />} title="Career preparation built in" detail="Interview readiness, role exploration, and professional identity are part of the experience." />
                                    <HighlightRow icon={<Award className="h-5 w-5" />} title="Confidence as a core outcome" detail="Reflection and guided practice help students communicate value with more clarity." />
                                </div>
                            </div>

                            <div className="rounded-[30px] border border-blue-100/80 bg-slate-950 px-6 py-7 text-white shadow-[0_24px_60px_rgba(15,23,42,0.24)]">
                                <p className="text-xs uppercase tracking-[0.3em] text-blue-200">Institutional Fit</p>
                                <p className="mt-4 text-2xl font-heading leading-tight">
                                    A landing experience that feels credible for students, partners, and program stakeholders.
                                </p>
                                <p className="mt-4 text-sm leading-7 text-slate-300">
                                    The visual language now leans educational and professional instead of aspirational lifestyle branding.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-8 rounded-[28px] border border-white/70 bg-white/70 px-6 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)] backdrop-blur md:px-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                                Career education • AI literacy • advising • networking
                            </p>
                            <p className="max-w-2xl text-sm leading-7 text-slate-600">
                                A modern student success platform should explain the value proposition immediately: skill development, structured support, and employability outcomes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
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
            </section>

            <section className="pb-24">
                <div className="container mx-auto px-4 md:px-6">
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
                                        className="rounded-[28px] border border-white/80 bg-white/80 p-6 shadow-[0_18px_38px_rgba(15,23,42,0.05)]"
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

const HighlightRow = ({
    icon,
    title,
    detail,
}: {
    icon: React.ReactNode;
    title: string;
    detail: string;
}) => (
    <div className="flex items-start gap-4 rounded-[24px] border border-white/75 bg-white/78 p-5 shadow-[0_16px_34px_rgba(15,23,42,0.04)]">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {icon}
        </div>
        <div>
            <p className="text-base font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
        </div>
    </div>
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
    <div className="rounded-[24px] border border-white/75 bg-white/78 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-heading text-slate-900">{value}</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
);
