import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { AlertCircle, ChevronDown } from 'lucide-react';

interface StatCardProps {
    numericValue: number;
    suffix: string;
    prefix?: string;
    displayOverride?: string;
    label: string;
    delay: number;
}

function StatCard({ numericValue, suffix, prefix = '', displayOverride, label, delay }: StatCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
    const [displayed, setDisplayed] = useState('0');

    useEffect(() => {
        if (!isInView) return;
        const timer = setTimeout(() => {
            const controls = animate(0, numericValue, {
                duration: 2,
                ease: 'easeOut',
                onUpdate(latest) {
                    if (numericValue >= 1000) {
                        setDisplayed((latest / 1000).toFixed(0) + 'K+');
                    } else {
                        setDisplayed(Math.round(latest).toString());
                    }
                },
            });
            return controls.stop;
        }, delay * 1000);
        return () => clearTimeout(timer);
    }, [isInView, numericValue, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#A89FE0]/40 hover:bg-white/[0.07] transition-all duration-500 cursor-default"
        >
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(168,159,224,0.08)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                <div className="text-5xl sm:text-6xl font-bold text-white mb-3 font-display tracking-tight">
                    <span className="text-[#A89FE0]">{prefix}</span>
                    {isInView ? (displayOverride ?? (displayed + suffix)) : '0'}
                </div>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-[200px]">{label}</p>
            </div>
        </motion.div>
    );
}

export default function FollowUpPainPoint() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });
    const scenarioRef = useRef<HTMLDivElement>(null);
    const scenarioInView = useInView(scenarioRef, { once: true, margin: '-5% 0px' });

    return (
        <section
            ref={sectionRef}
            id="pain-point"
            className="relative pt-32 pb-24 px-4 overflow-hidden"
        >


            <div className="relative z-10 max-w-4xl mx-auto">

                {/* Warning badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-8"
                >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                        <AlertCircle size={15} />
                        The #1 Revenue Killer
                    </div>
                </motion.div>

                {/* Main headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-[1.1] mb-6">
                        80% of sales require
                        <br />
                        <span className="text-[#A89FE0]">5 follow-ups.</span>
                        <br />
                        <span className="text-gray-400">Most reps stop after</span>{' '}
                        <span className="text-white">one.</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        The biggest killer of revenue isn't bad leads — it's the silence after the first conversation. Every missed follow-up is a deal handed to your competitor.
                    </p>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
                    <StatCard
                        numericValue={44}
                        suffix="%"
                        label="of salespeople give up after just 1 follow-up"
                        delay={0.2}
                    />
                    <StatCard
                        numericValue={80}
                        suffix="%"
                        label="of sales require 5+ touchpoints to close"
                        delay={0.35}
                    />
                    <StatCard
                        numericValue={1000}
                        suffix=""
                        prefix="$"
                        displayOverride="1T+"
                        label="lost in revenue annually due to poor follow-up"
                        delay={0.5}
                    />
                </div>

                {/* "Sound Familiar?" scenario */}
                <motion.div
                    ref={scenarioRef}
                    initial={{ opacity: 0, y: 16 }}
                    animate={scenarioInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative pl-6 border-l-2 border-[#A89FE0]/30 mb-12"
                >
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#A89FE0]/60 mb-3">Sound familiar?</p>
                    <p className="text-lg sm:text-xl text-gray-400 italic leading-relaxed">
                        "You met a great prospect last Tuesday. Said they'd think about it. You meant to follow up Thursday... then Friday got busy. Now it's been 9 days. They've gone cold.{' '}
                        <span className="text-white not-italic font-semibold">That deal is gone.</span>"
                    </p>
                </motion.div>

                {/* CTA bridge */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={scenarioInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col items-center gap-3 text-center"
                >
                    <p className="text-base sm:text-lg text-white/80 font-medium">
                        LeadQ.AI makes sure that <span className="text-[#A89FE0] font-semibold">never happens again.</span>
                    </p>
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-[#A89FE0]/50"
                    >
                        <ChevronDown size={24} />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
