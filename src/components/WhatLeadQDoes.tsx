import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
    CreditCard,
    StickyNote,
    CalendarCheck,
    UserCircle,
    Zap,
    Heart,
    TrendingUp,
    ChevronRight,
    Check,
    Phone,
    Mail,
    Building2,
    User
} from 'lucide-react';

interface Step {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const steps: Step[] = [
    {
        id: 1,
        title: 'Capture people you meet',
        description: 'Snap a card, we fill the details for you. No more stacks of cards or messy screenshots.',
        icon: <CreditCard className="w-6 h-6" />,
    },
    {
        id: 2,
        title: 'Remember every meeting',
        description: 'Talk or type a few points. LeadQ turns them into clear, searchable notes.',
        icon: <StickyNote className="w-6 h-6" />,
    },
    {
        id: 3,
        title: 'Never forget follow-ups',
        description: "LeadQ suggests who to follow up with each day so deals don't quietly die.",
        icon: <CalendarCheck className="w-6 h-6" />,
    },
    {
        id: 4,
        title: 'See the full story for each lead',
        description: "Every meeting, note and follow-up in one place, so you're never going in cold.",
        icon: <UserCircle className="w-6 h-6" />,
    },
];

const features = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: 'Fast to start',
        description: 'No complex setup. Capture your next lead in minutes.',
    },
    {
        icon: <Heart className="w-6 h-6" />,
        title: 'Human-friendly',
        description: 'Plain language, no CRM jargon.',
    },
    {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Grows with you',
        description: 'Plays nicely with email, calendar, WhatsApp and CRM tools.',
    },
];

// Step 1: Card Scanning Animation
function CardScanAnimation({ isActive }: { isActive: boolean }) {
    const prefersReducedMotion = useReducedMotion();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (isActive && !prefersReducedMotion) {
            const timer = setTimeout(() => setScanned(true), 800);
            return () => clearTimeout(timer);
        } else {
            setScanned(false);
        }
    }, [isActive, prefersReducedMotion]);

    return (
        <div className="relative w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 py-4 sm:py-0 sm:h-80">
            {/* Business Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={isActive ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-[14rem] sm:absolute sm:left-8 sm:w-56 bg-white rounded-xl p-4 shadow-2xl"
            >
                <div className="text-gray-900 font-bold text-sm">Sarah Chen</div>
                <div className="text-slate-600 text-xs mt-1">VP of Sales</div>
                <div className="text-slate-500 text-xs mt-2">TechCorp Inc.</div>
                <div className="text-slate-600 text-xs mt-3">sarah@techcorp.com</div>
                <div className="text-slate-600 text-xs">+1 555 123 4567</div>

                {/* Scan line */}
                {isActive && !prefersReducedMotion && (
                    <motion.div
                        initial={{ top: 0 }}
                        animate={{ top: '100%' }}
                        transition={{ duration: 1.2, repeat: scanned ? 0 : Infinity }}
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-leadq-silver to-transparent"
                    />
                )}
            </motion.div>

            {/* Arrow indicator (visible on mobile between the cards) */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isActive ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 }}
                className="sm:hidden text-leadq-silver"
            >
                <ChevronRight className="w-6 h-6 rotate-90" />
            </motion.div>

            {/* Auto-fill UI */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={scanned || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-full max-w-[16rem] sm:absolute sm:right-8 sm:w-64 glass rounded-xl p-4 border border-white/20"
            >
                <div className="text-xs text-leadq-silver mb-3">Contact Details</div>
                {[
                    { icon: <User className="w-3 h-3" />, label: 'Name', value: 'Sarah Chen' },
                    { icon: <Building2 className="w-3 h-3" />, label: 'Company', value: 'TechCorp Inc.' },
                    { icon: <Mail className="w-3 h-3" />, label: 'Email', value: 'sarah@techcorp.com' },
                    { icon: <Phone className="w-3 h-3" />, label: 'Phone', value: '+1 555 123 4567' },
                ].map((field, idx) => (
                    <motion.div
                        key={field.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={scanned || prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: idx * 0.12 }}
                        className="flex items-center gap-2 mb-2"
                    >
                        <span className="text-leadq-silver">{field.icon}</span>
                        <span className="text-leadq-silver/70 text-xs w-14">{field.label}</span>
                        <span className="text-white text-xs truncate">{field.value}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

// Step 2: Notes to Summary Animation
function NotesToSummaryAnimation({ isActive }: { isActive: boolean }) {
    const prefersReducedMotion = useReducedMotion();
    const [transformed, setTransformed] = useState(false);

    useEffect(() => {
        if (isActive && !prefersReducedMotion) {
            const timer = setTimeout(() => setTransformed(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setTransformed(false);
        }
    }, [isActive, prefersReducedMotion]);

    const roughNotes = [
        '- met at conf',
        '- interested in CRM',
        '- follow up next week',
        '- needs demo',
    ];

    return (
        <div className="relative w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 py-4 sm:py-0 sm:h-80">
            {/* Rough Notes */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isActive ? { opacity: transformed ? 0.7 : 1, x: 0, scale: transformed ? 0.95 : 1 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-[14rem] sm:absolute sm:left-8 sm:w-52 glass rounded-xl p-4 border border-white/20"
            >
                <div className="text-xs text-slate-300 font-semibold mb-2">My Notes</div>
                {roughNotes.map((note, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={isActive ? { opacity: 1 } : {}}
                        transition={{ delay: idx * 0.08 }}
                        className="text-slate-200 text-xs font-mono mb-1"
                    >
                        {note}
                    </motion.div>
                ))}
            </motion.div>

            {/* Arrow */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isActive ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.25 }}
                className="text-leadq-silver sm:absolute sm:left-1/2 sm:-translate-x-1/2"
            >
                <ChevronRight className="w-6 h-6 rotate-90 sm:rotate-0 sm:w-8 sm:h-8" />
            </motion.div>

            {/* Structured Summary */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={transformed || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 30 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-[16rem] sm:absolute sm:right-8 sm:w-64 glass rounded-xl p-4 border border-leadq-silver/30 shadow-lg shadow-leadq-silver/10"
            >
                <div className="text-xs text-leadq-silver mb-3">Meeting Summary</div>
                <div className="space-y-2">
                    <div>
                        <div className="text-leadq-silver/70 text-xs">Who</div>
                        <div className="text-white text-sm">Sarah Chen, TechCorp</div>
                    </div>
                    <div>
                        <div className="text-leadq-silver/70 text-xs">What</div>
                        <div className="text-white text-sm">Interested in CRM solution</div>
                    </div>
                    <div>
                        <div className="text-leadq-silver/70 text-xs">Next Steps</div>
                        <div className="text-white text-sm">Schedule demo next week</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Step 3: Follow-ups Animation
function FollowUpsAnimation({ isActive }: { isActive: boolean }) {
    const prefersReducedMotion = useReducedMotion();
    const [checkedTask, setCheckedTask] = useState<number | null>(null);

    useEffect(() => {
        if (!isActive) setCheckedTask(null);
    }, [isActive]);

    const tasks = [
        { id: 1, name: 'Sarah Chen', action: 'Send demo link', due: 'Today' },
        { id: 2, name: 'Mike Johnson', action: 'Follow-up call', due: 'Today' },
        { id: 3, name: 'Lisa Park', action: 'Check proposal', due: 'Tomorrow' },
    ];

    return (
        <div className="relative w-full flex flex-col sm:flex-row items-center justify-center gap-4 py-4 sm:py-0 sm:h-80">
            {/* Calendar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[10rem] sm:w-40 glass rounded-xl p-3 border border-white/20"
            >
                <div className="text-xs text-leadq-silver mb-2">February 2026</div>
                <div className="grid grid-cols-7 gap-1 text-xs text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} className="text-leadq-silver/70">{d}</div>
                    ))}
                    {Array.from({ length: 6 }, (_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={isActive ? { opacity: 1 } : {}}
                            transition={{ delay: i * 0.02 }}
                            className={`p-1 rounded ${i === 5 ? 'bg-leadq-silver text-white' : 'text-leadq-silver'}`}
                        >
                            {i + 1}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Task List */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="w-full max-w-[16rem] sm:w-64 glass rounded-xl p-4 border border-white/20"
            >
                <div className="text-xs text-leadq-silver mb-3">Today's Follow-ups</div>
                {tasks.map((task, idx) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isActive ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        onClick={() => !prefersReducedMotion && setCheckedTask(task.id)}
                        className={`flex items-start gap-2 mb-3 cursor-pointer transition-opacity ${checkedTask === task.id ? 'opacity-50' : ''
                            }`}
                    >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${checkedTask === task.id ? 'bg-leadq-silver border-leadq-silver' : 'border-slate-500'
                            }`}>
                            {checkedTask === task.id && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="min-w-0">
                            <div className={`text-sm text-white truncate ${checkedTask === task.id ? 'line-through' : ''}`}>
                                {task.name}
                            </div>
                            <div className="text-xs text-leadq-silver truncate">{task.action}</div>
                        </div>
                        <div className="ml-auto text-xs text-leadq-silver flex-shrink-0">{task.due}</div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

// Step 4: Timeline Animation
function TimelineAnimation({ isActive }: { isActive: boolean }) {
    const prefersReducedMotion = useReducedMotion();

    const timelineItems = [
        { date: 'Feb 1', event: 'Card scanned', icon: <CreditCard className="w-3 h-3" /> },
        { date: 'Feb 3', event: 'First meeting', icon: <StickyNote className="w-3 h-3" /> },
        { date: 'Feb 5', event: 'Follow-up sent', icon: <Mail className="w-3 h-3" /> },
        { date: 'Feb 10', event: 'Next meeting', icon: <CalendarCheck className="w-3 h-3" /> },
    ];

    return (
        <div className="relative w-full flex items-center justify-center py-4 sm:py-0 sm:h-80">
            <motion.div
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[18rem] sm:max-w-none sm:w-96 glass rounded-xl p-4 border border-white/20"
            >
                {/* Contact Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-leadq-silver to-leadq-silver flex items-center justify-center text-white font-bold">
                        SC
                    </div>
                    <div>
                        <div className="text-white font-medium">Sarah Chen</div>
                        <div className="text-leadq-silver text-xs">VP of Sales, TechCorp</div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/10" />
                    {timelineItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isActive ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: prefersReducedMotion ? 0 : 0.1 + idx * 0.08 }}
                            className="flex items-center gap-3 mb-3 relative"
                        >
                            <div className="w-6 h-6 rounded-full bg-leadq-silver/20 border border-leadq-silver/50 flex items-center justify-center text-leadq-silver z-10">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <div className="text-white text-sm">{item.event}</div>
                            </div>
                            <div className="text-leadq-silver/70 text-xs">{item.date}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default function WhatLeadQDoes() {
    const [activeStep, setActiveStep] = useState(1);
    const sectionRef = useRef<HTMLElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const prefersReducedMotion = useReducedMotion();

    // Scroll-based step detection for desktop
    useEffect(() => {
        if (prefersReducedMotion) return;

        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const stepId = Number(entry.target.getAttribute('data-step'));
                    if (stepId) setActiveStep(stepId);
                }
            });
        }, observerOptions);

        stepRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [prefersReducedMotion]);

    // Reset animations when scrolling back to section start
    useEffect(() => {
        if (!sectionRef.current) return;

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // When section comes back into view from above (scrolling down into it)
                    // or when user scrolls back up and the top of the section becomes visible
                    if (entry.isIntersecting && entry.boundingClientRect.top >= 0) {
                        setActiveStep(1);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -80% 0px', // Trigger when top 20% of section is visible
                threshold: 0,
            }
        );

        sectionObserver.observe(sectionRef.current);

        return () => sectionObserver.disconnect();
    }, []);

    const renderStepAnimation = (stepId: number) => {
        switch (stepId) {
            case 1:
                return <CardScanAnimation isActive={activeStep === 1} />;
            case 2:
                return <NotesToSummaryAnimation isActive={activeStep === 2} />;
            case 3:
                return <FollowUpsAnimation isActive={activeStep === 3} />;
            case 4:
                return <TimelineAnimation isActive={activeStep === 4} />;
            default:
                return null;
        }
    };

    return (
        <section
            ref={sectionRef}
            id="what-leadq-does"
            className="relative z-10 py-20 sm:py-28 px-4"
        >
            <div className="max-w-7xl mx-auto">
                {/* Hero Sub-section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                            What LeadQ Does{' '}
                            <span className="bg-gradient-to-r from-leadq-cyan to-leadq-royal-blue bg-clip-text text-transparent">
                                for You
                            </span>
                        </h2>
                        <p className="text-lg sm:text-xl text-leadq-silver mb-8 leading-relaxed">
                            LeadQ captures people you meet, remembers every conversation, and nudges you to follow up at the right time.
                            <br className="hidden sm:block" />
                            Think of it as a personal sales assistant that does the boring work for you.
                        </p>

                    </motion.div>
                </div>

                {/* Workflow Stepper */}
                <div className="relative">
                    {/* Desktop: Vertical Stepper */}
                    <div className="hidden lg:block">
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10" />
                            <motion.div
                                className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-leadq-silver to-leadq-silver"
                                initial={{ height: 0 }}
                                animate={{ height: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />

                            {/* Steps */}
                            {steps.map((step, idx) => (
                                <div
                                    key={step.id}
                                    ref={(el) => { stepRefs.current[idx] = el; }}
                                    data-step={step.id}
                                    className="relative pl-20 pb-32 last:pb-0"
                                >
                                    {/* Step Indicator */}
                                    <motion.div
                                        className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${activeStep >= step.id
                                            ? 'bg-leadq-royal-blue text-white'
                                            : 'bg-white/10 text-leadq-silver'
                                            }`}
                                        whileHover={{ scale: 1.1 }}
                                        onClick={() => setActiveStep(step.id)}
                                    >
                                        {step.icon}
                                    </motion.div>

                                    {/* Step Content */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`glass rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${activeStep === step.id
                                            ? 'border-leadq-royal-blue/50 shadow-lg shadow-leadq-royal-blue/10'
                                            : 'border-white/10 hover:border-white/20'
                                            }`}
                                        onClick={() => setActiveStep(step.id)}
                                    >
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-leadq-silver">{step.description}</p>

                                        {/* Show animation inline for active step */}
                                        <AnimatePresence mode="wait">
                                            {activeStep === step.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.6 }}
                                                    className="mt-4 overflow-hidden"
                                                >
                                                    {renderStepAnimation(step.id)}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile: Horizontal Stepper */}
                    <div className="lg:hidden">
                        {/* Step Indicators */}
                        <div className="flex justify-center gap-2 mb-8">
                            {steps.map((step) => (
                                <motion.button
                                    key={step.id}
                                    onClick={() => setActiveStep(step.id)}
                                    animate={activeStep !== step.id ? {
                                        scale: [1, 1.1, 1],
                                        opacity: [0.7, 1, 0.7],
                                    } : {}}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        delay: step.id * 0.2
                                    }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeStep === step.id
                                        ? 'bg-leadq-royal-blue text-white scale-110 shadow-lg shadow-leadq-royal-blue/30'
                                        : 'bg-white/10 text-leadq-silver'
                                        }`}
                                >
                                    {step.id}
                                </motion.button>
                            ))}
                        </div>

                        {/* Active Step Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="glass rounded-2xl p-6 border border-leadq-silver/30"
                            >
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {steps[activeStep - 1].title}
                                </h3>
                                <p className="text-leadq-silver mb-6">{steps[activeStep - 1].description}</p>
                                {renderStepAnimation(activeStep)}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Supporting Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-24"
                >
                    <h3 className="text-2xl font-bold text-white text-center mb-12">
                        Built for real-world selling
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass rounded-2xl p-6 border border-white/10 text-center hover:border-leadq-silver/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-leadq-silver/20 flex items-center justify-center text-leadq-silver mx-auto mb-4">
                                    {feature.icon}
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                                <p className="text-leadq-silver text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

