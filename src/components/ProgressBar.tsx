import React from 'react';
import { cn } from '../utils/helpers';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    progress: number; // 0 to 100
    className?: string;
    showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className, showLabel = false }) => {
    const normalizedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className={cn("w-full", className)}>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${normalizedProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
            {showLabel && (
                <p className="mt-2 text-right text-xs text-slate-500 font-medium">
                    {Math.round(normalizedProgress)}% Completed
                </p>
            )}
        </div>
    );
};
