import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { cn } from '../utils/helpers';

interface Feature {
    step: string;
    title?: string;
    content: string;
    image: string;
}

interface FeatureStepsProps {
    features: Feature[];
    className?: string;
    title?: string;
    autoPlayInterval?: number;
}

export function FeatureSteps({
    features,
    className,
    title = 'How to get Started',
}: FeatureStepsProps) {
    const [currentFeature, setCurrentFeature] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            // Map scroll progress to feature index
            const index = Math.min(
                Math.floor(v * features.length),
                features.length - 1,
            );
            setCurrentFeature(index);
        });
        return () => unsubscribe();
    }, [scrollYProgress, features.length]);

    return (
        <div
            ref={containerRef}
            className={cn(className)}
            // Height = 100vh per step so scrolling through pins and cycles
            style={{ height: `${features.length * 100}vh` }}
        >
            <div className="sticky top-0 h-screen flex items-center">
                <div className="w-full max-w-7xl mx-auto px-8 md:px-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center">
                        {title}
                    </h2>

                    <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
                        <div className="order-2 md:order-1 space-y-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-6 md:gap-8 cursor-pointer"
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                                    transition={{ duration: 0.4 }}
                                    onClick={() => setCurrentFeature(index)}
                                >
                                    <motion.div
                                        className={cn(
                                            'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors',
                                            index === currentFeature
                                                ? 'bg-primary border-primary text-white scale-110'
                                                : index < currentFeature
                                                    ? 'bg-primary/20 border-primary/40 text-primary'
                                                    : 'bg-slate-100 border-slate-300 text-slate-500',
                                        )}
                                    >
                                        {index < currentFeature ? (
                                            <span className="text-sm font-bold">&#10003;</span>
                                        ) : (
                                            <span className="text-sm font-semibold">{index + 1}</span>
                                        )}
                                    </motion.div>

                                    <div className="flex-1">
                                        <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                                            {feature.title || feature.step}
                                        </h3>
                                        <p className="text-sm md:text-base text-slate-500">
                                            {feature.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Scroll progress dots */}
                            <div className="flex items-center gap-2 pt-4">
                                {features.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            'h-1.5 rounded-full transition-all duration-300',
                                            i === currentFeature
                                                ? 'w-8 bg-primary'
                                                : 'w-1.5 bg-slate-200',
                                        )}
                                    />
                                ))}
                                <span className="ml-2 text-xs text-slate-400">
                                    Scroll to explore
                                </span>
                            </div>
                        </div>

                        <div className="order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-2xl">
                            <AnimatePresence mode="wait">
                                {features.map(
                                    (feature, index) =>
                                        index === currentFeature && (
                                            <motion.div
                                                key={index}
                                                className="absolute inset-0 rounded-2xl overflow-hidden"
                                                initial={{ y: 80, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -80, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            >
                                                <img
                                                    src={feature.image}
                                                    alt={feature.step}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white via-white/50 to-transparent" />
                                            </motion.div>
                                        ),
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
