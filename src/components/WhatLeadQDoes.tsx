import React, { useState, useEffect, useRef } from 'react';
import { m, useReducedMotion } from 'framer-motion';
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
    User,
    UserPlus,
    Search,
    Shield
} from 'lucide-react';
import { SpotlightCard } from '@/components/ui/spotlight-card';

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
        description: 'Snap a business card, we fill the details for you. No more stacks of cards or messy screenshots.',
        icon: <CreditCard className="w-6 h-7" />,
    },
    {
        id: 2,
        title: 'Instant Profile Research',
        description: 'We instantly find their profiles, company data, and verify their identity so you know exactly who you are talking to.',
        icon: <UserPlus className="w-6 h-6" />,
    },
    {
        id: 3,
        title: 'Remember every meeting',
        description: 'Talk or type a few points. LeadQ.AI turns them into clear, searchable notes.',
        icon: <StickyNote className="w-6 h-6" />,
    },
    {
        id: 4,
        title: 'Never forget follow-ups',
        description: "LeadQ.AI suggests who to follow up with each day so deals don't quietly die.",
        icon: <CalendarCheck className="w-6 h-6" />,
    },
    {
        id: 5,
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
        description: 'Plain language, no CRM jargons.',
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
            setScanned(true);
        } else {
            setScanned(false);
        }
    }, [isActive, prefersReducedMotion]);

    return (
        <div className="relative w-full flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-4 py-4 xl:py-0 min-h-[300px]">
            {/* The stacked cards */}
            <div className="relative w-[280px] h-[180px] flex-shrink-0">
                {/* Front Card */}
                <m.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -15, x: -20 }}
                    animate={isActive ? { opacity: 1, scale: 1, rotateY: 0, x: 0 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 w-[240px] aspect-[1.586/1] bg-[#f8f9fa] rounded-xl p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-100 z-20"
                    style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")"
                    }}
                >
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-white rounded-[2px] transform rotate-45"></div>
                            </div>
                            <span className="font-bold text-gray-900 text-sm tracking-tight">TECHCORP</span>
                        </div>
                        <div className="mt-2">
                            <div className="text-xl font-bold text-gray-900 font-serif tracking-tight">Sarah Chen</div>
                            <div className="text-[10px] font-medium text-leadq-purple-light uppercase tracking-wider mt-0.5">VP of Sales</div>
                        </div>
                        <div className="mt-auto h-1 w-10 bg-gray-900 rounded-full"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-leadq-purple-light/10 to-transparent rounded-bl-full -mr-8 -mt-8"></div>
                    {isActive && !prefersReducedMotion && (
                        <m.div
                            initial={{ y: -30 }}
                            animate={{ y: 160 }}
                            transition={{ duration: 1.5, repeat: scanned ? 0 : Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-leadq-purple-light/20 to-transparent pointer-events-none z-20 border-t border-leadq-purple-light/50 will-change-transform"
                        />
                    )}
                </m.div>

                {/* Back Card */}
                <m.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5, x: 20 }}
                    animate={isActive ? { opacity: 1, scale: 1, rotate: 5, x: 0 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-6 left-10 w-[240px] aspect-[1.586/1] bg-[#f8f9fa] rounded-xl p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] overflow-hidden border border-gray-100 z-10"
                    style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")"
                    }}
                >
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                        <div className="opacity-10 absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 border-4 border-gray-900 rounded-full flex items-center justify-center">
                                <span className="font-bold text-gray-900 text-3xl">TC</span>
                            </div>
                        </div>
                        <div className="space-y-1.5 relative z-20">
                            <div className="flex flex-col items-center gap-0.5">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                    <Mail size={12} />
                                </div>
                                <span className="text-gray-900 font-medium font-mono text-[11px]">sarah.chen@techflow.io</span>
                            </div>
                            <div className="w-full h-px bg-gray-200 my-1"></div>
                            <div className="flex flex-col items-center gap-0.5">
                                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                    <Phone size={12} />
                                </div>
                                <span className="text-gray-900 font-medium font-mono text-[11px]">+1 555 123 4567</span>
                            </div>
                        </div>
                    </div>
                </m.div>
            </div>

            {/* Arrow indicator */}
            <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isActive ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.2 }}
                className="text-leadq-silver flex-shrink-0 z-30 hidden sm:block"
            >
                <ChevronRight className="w-6 h-6 xl:w-8 xl:h-8 rotate-90 xl:rotate-0" />
            </m.div>

            {/* Auto-fill UI */}
            <m.div
                initial={{ opacity: 0, x: 50 }}
                animate={isActive || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-[16rem] xl:w-[220px] z-40 flex-shrink-0"
            >
                <SpotlightCard className="p-4 border-white/20 rounded-xl">
                    <div className="text-xs text-leadq-silver mb-3">Contact Details</div>
                    {[
                        { icon: <User className="w-3 h-3" />, label: 'Name', value: 'Sarah Chen' },
                        { icon: <Building2 className="w-3 h-3" />, label: 'Company', value: 'TechCorp Inc.' },
                        { icon: <Mail className="w-3 h-3" />, label: 'Email', value: 'sarah.chen@techflow.io' },
                        { icon: <Phone className="w-3 h-3" />, label: 'Phone', value: '+1 555 123 4567' },
                    ].map((field) => (
                        <m.div
                            key={field.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={isActive || prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 mb-2"
                        >
                            <span className="text-leadq-silver">{field.icon}</span>
                            <span className="text-leadq-silver/70 text-[11px] w-12">{field.label}</span>
                            <span className="text-white text-[11px] truncate leading-tight">{field.value}</span>
                        </m.div>
                    ))}
                </SpotlightCard>
            </m.div>
        </div>
    );
}

// Step 2: Profile Research Animation
function ProfileResearchAnimation({ isActive }: { isActive: boolean }) {
    const prefersReducedMotion = useReducedMotion();
    const [scanned, setScanned] = useState(false);
    const [enriched, setEnriched] = useState(false);

    useEffect(() => {
        if (isActive && !prefersReducedMotion) {
            setScanned(true);
            setEnriched(true);
        } else {
            setScanned(false);
            setEnriched(false);
        }
    }, [isActive, prefersReducedMotion]);

    return (
        <div className="relative w-full flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-8 py-4 xl:py-0 min-h-[300px]">
            {/* Minimal Contact Box */}
            <m.div
                initial={{ opacity: 0, x: -30 }}
                animate={isActive ? { opacity: enriched ? 0.5 : 1, x: 0, scale: enriched ? 0.95 : 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-[14rem] xl:w-48 flex-shrink-0"
            >
                <SpotlightCard className="p-4 border-white/20 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-semibold mb-3 uppercase tracking-wider">Scanned Data</div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-slate-300">
                                <User size={12} />
                            </div>
                            <span className="text-white text-xs font-medium">Sarah Chen</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-slate-300">
                                <Building2 size={12} />
                            </div>
                            <span className="text-white text-xs font-medium">TechCorp</span>
                        </div>
                    </div>

                    {/* Scanning overlay */}
                    {isActive && !enriched && !prefersReducedMotion && (
                        <m.div
                            className="absolute inset-0 bg-leadq-purple-light/5 rounded-xl border border-leadq-purple-light/30"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}
                </SpotlightCard>
            </m.div>

            {/* AI Search Animation Node */}
            <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isActive ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.2 }}
                className="relative z-30"
            >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-leadq-purple to-leadq-purple-light p-px shadow-[0_0_20px_rgba(168,159,224,0.3)]">
                    <div className="w-full h-full bg-[#0f172a] rounded-full flex items-center justify-center relative overflow-hidden">
                        <Search className={`w-5 h-5 text-white z-10 ${!scanned && isActive && !prefersReducedMotion ? 'animate-pulse' : ''}`} />
                        {isActive && !enriched && !prefersReducedMotion && (
                            <m.div
                                className="absolute inset-0 bg-gradient-to-tr from-leadq-purple-light/30 to-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        )}
                    </div>
                </div>
            </m.div>

            {/* Enriched Profile Summary */}
            <m.div
                initial={{ opacity: 0, x: 30 }}
                animate={enriched || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 30 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-[16rem] xl:w-[240px] shadow-lg shadow-leadq-silver/10 flex-shrink-0"
            >
                <SpotlightCard className="p-4 border-leadq-silver/30 rounded-xl">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                        <div className="text-[10px] text-green-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <Shield className="w-3 h-3" />
                            Verified Profile
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        <div>
                            <div className="text-leadq-silver/70 text-[10px] uppercase">Identity</div>
                            <div className="text-white text-sm font-medium">Sarah Chen</div>
                        </div>
                        <div>
                            <div className="text-leadq-silver/70 text-[10px] uppercase">Role</div>
                            <div className="text-white text-sm leading-tight text-slate-300">VP of Sales @ TechCorp Inc.</div>
                        </div>
                        <div>
                            <div className="text-leadq-silver/70 text-[10px] uppercase">Experience</div>
                            <div className="text-white text-sm leading-tight text-slate-300">12+ years B2B SaaS</div>
                        </div>
                    </div>
                </SpotlightCard>
            </m.div>
        </div>
    );
}

// Step 3: Notes to Summary Animation
function NotesToSummaryAnimation({ isActive }: { isActive: boolean }) {
    const prefersReducedMotion = useReducedMotion();
    const [transformed, setTransformed] = useState(false);

    useEffect(() => {
        if (isActive && !prefersReducedMotion) {
            setTransformed(true);
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
        <div className="relative w-full flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-8 py-4 xl:py-0 min-h-[300px]">
            {/* Rough Notes */}
            <m.div
                initial={{ opacity: 0, x: -30 }}
                animate={isActive ? { opacity: transformed ? 0.7 : 1, x: 0, scale: transformed ? 0.95 : 1 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-[14rem] xl:w-48 flex-shrink-0"
            >
                <SpotlightCard className="p-4 border-white/20 rounded-xl">
                    <div className="text-xs text-slate-300 font-semibold mb-2">My Notes</div>
                    {roughNotes.map((note, idx) => (
                        <m.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={isActive ? { opacity: 1 } : {}}
                            transition={{ delay: idx * 0.08 }}
                            className="text-slate-200 text-xs font-mono mb-1"
                        >
                            {note}
                        </m.div>
                    ))}
                </SpotlightCard>
            </m.div>

            {/* Arrow */}
            <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isActive ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.25 }}
                className="text-leadq-silver flex-shrink-0 hidden sm:block"
            >
                <ChevronRight className="w-6 h-6 rotate-90 xl:rotate-0 xl:w-8 xl:h-8" />
            </m.div>

            {/* Structured Summary */}
            <m.div
                initial={{ opacity: 0, x: 30 }}
                animate={transformed || prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 30 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-[16rem] xl:w-[240px] shadow-lg shadow-leadq-silver/10 flex-shrink-0"
            >
                <SpotlightCard className="p-4 border-leadq-silver/30 rounded-xl">
                    <div className="text-xs text-leadq-silver mb-3">Meeting Summary</div>
                    <div className="space-y-2">
                        <div>
                            <div className="text-leadq-silver/70 text-[11px]">Who</div>
                            <div className="text-white text-sm">Sarah Chen, TechCorp</div>
                        </div>
                        <div>
                            <div className="text-leadq-silver/70 text-[11px]">What</div>
                            <div className="text-white text-sm leading-tight">Interested in CRM solution</div>
                        </div>
                        <div>
                            <div className="text-leadq-silver/70 text-[11px]">Next Steps</div>
                            <div className="text-white text-sm leading-tight">Schedule demo next week</div>
                        </div>
                    </div>
                </SpotlightCard>
            </m.div>
        </div>
    );
}

// Step 4: Follow-ups Animation
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
        <div className="relative w-full flex flex-col sm:flex-row items-center justify-center gap-4 py-4 sm:py-0 min-h-[300px]">
            {/* Calendar */}
            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[10rem] sm:w-40"
            >
                <SpotlightCard className="p-3 border-white/20 rounded-xl">
                    <div className="text-xs text-leadq-silver mb-2">February 2026</div>
                    <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <div key={i} className="text-leadq-silver/70">{d}</div>
                        ))}
                        {Array.from({ length: 6 }, (_, i) => (
                            <m.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={isActive ? { opacity: 1 } : {}}
                                transition={{ duration: 0.1 }}
                                className={`p-1 rounded ${i === 5 ? 'bg-leadq-silver text-white' : 'text-leadq-silver'}`}
                            >
                                {i + 1}
                            </m.div>
                        ))}
                    </div>
                </SpotlightCard>
            </m.div>

            {/* Task List */}
            <m.div
                initial={{ opacity: 0, x: 20 }}
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[16rem] sm:w-[220px]"
            >
                <SpotlightCard className="p-4 border-white/20 rounded-xl">
                    <div className="text-xs text-leadq-silver mb-3">Today's Follow-ups</div>
                    {tasks.map((task) => (
                        <m.div
                            key={task.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={isActive ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.15 }}
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
                                <div className="text-[11px] text-leadq-silver truncate">{task.action}</div>
                            </div>
                            <div className="ml-auto text-[10px] text-leadq-silver flex-shrink-0">{task.due}</div>
                        </m.div>
                    ))}
                </SpotlightCard>
            </m.div>
        </div>
    );
}

// Step 5: Timeline Animation
function TimelineAnimation({ isActive }: { isActive: boolean }) {

    const timelineItems = [
        { date: 'Feb 1', event: 'Card scanned', icon: <CreditCard className="w-3 h-3" /> },
        { date: 'Feb 3', event: 'First meeting', icon: <StickyNote className="w-3 h-3" /> },
        { date: 'Feb 5', event: 'Follow-up sent', icon: <Mail className="w-3 h-3" /> },
        { date: 'Feb 10', event: 'Next meeting', icon: <CalendarCheck className="w-3 h-3" /> },
    ];

    return (
        <div className="relative w-full flex items-center justify-center py-4 sm:py-0 min-h-[300px]">
            <m.div
                initial={{ opacity: 0 }}
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[18rem] sm:max-w-none sm:w-80"
            >
                <SpotlightCard className="p-4 xl:p-6 border-white/20 rounded-xl">
                    {/* Contact Header */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-leadq-silver to-leadq-silver flex items-center justify-center text-white font-bold">
                            SC
                        </div>
                        <div>
                            <div className="text-white font-medium text-sm">Sarah Chen</div>
                            <div className="text-leadq-silver text-[11px]">VP of Sales, TechCorp</div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/10" />
                        {timelineItems.map((item, idx) => (
                            <m.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isActive ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-3 mb-3 relative"
                            >
                                <div className="w-6 h-6 rounded-full bg-leadq-silver/20 border border-leadq-silver/50 flex items-center justify-center text-leadq-silver z-10">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="text-white text-[13px]">{item.event}</div>
                                </div>
                                <div className="text-leadq-silver/70 text-[10px] uppercase font-semibold">{item.date}</div>
                            </m.div>
                        ))}
                    </div>
                </SpotlightCard>
            </m.div>
        </div>
    );
}

export default function WhatLeadQDoes() {
    const [activeStep, setActiveStep] = useState(1);
    const [mobileVisible, setMobileVisible] = useState<Record<number, boolean>>({});
    const sectionRef = useRef<HTMLElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const prefersReducedMotion = useReducedMotion();

    // Scroll-based step detection for desktop
    useEffect(() => {
        if (prefersReducedMotion) return;

        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0.5,
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

    const renderStepAnimation = (stepId: number, forceActive: boolean = false) => {
        const isActive = forceActive || activeStep === stepId;
        switch (stepId) {
            case 1:
                return <CardScanAnimation isActive={isActive} />;
            case 2:
                return <ProfileResearchAnimation isActive={isActive} />;
            case 3:
                return <NotesToSummaryAnimation isActive={isActive} />;
            case 4:
                return <FollowUpsAnimation isActive={isActive} />;
            case 5:
                return <TimelineAnimation isActive={isActive} />;
            default:
                return null;
        }
    };

    return (
        <section
            ref={sectionRef}
            id="what-leadq-does"
            className="relative z-10 min-h-[100svh] flex flex-col justify-center py-8 lg:py-12 px-4 will-change-transform"
        >
            <div className="max-w-7xl mx-auto">
                {/* Hero Sub-section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    {/* Text Content */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                            What LeadQ.AI Does{' '}
                            <span className="text-[#A89FE0]">
                                for You
                            </span>
                        </h2>
                        <p className="text-lg sm:text-xl md:text-2xl text-leadq-silver mb-8 leading-relaxed">
                            LeadQ.AI captures people you meet, remembers every conversation, and nudges you to follow up at the right time.
                            <br className="hidden sm:block" />
                            Think of it as a personal sales assistant that does the boring work for you.
                        </p>

                    </m.div>
                </div>

                {/* Workflow Stepper */}
                <div className="relative">
                    {/* Desktop: Side-by-Side Row Stepper */}
                    <div className="hidden lg:block">
                        <div className="relative max-w-5xl mx-auto">
                            {/* Progress Line */}
                            <div className="absolute left-[39px] top-12 bottom-24 w-0.5 bg-white/10" />
                            <m.div
                                className="absolute left-[39px] top-12 w-0.5 bg-gradient-to-b from-leadq-purple-light to-leadq-purple origin-top will-change-transform"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: (activeStep - 1) / (steps.length - 1) }}
                                transition={{ duration: 0.5 }}
                                style={{ transformOrigin: "top" }}
                            />

                            {/* Steps */}
                            {steps.map((step, idx) => (
                                <div
                                    key={step.id}
                                    ref={(el) => { stepRefs.current[idx] = el; }}
                                    data-step={step.id}
                                    className="relative pl-16 sm:pl-20 pb-12 lg:pb-16 xl:pb-20 last:pb-0"
                                >
                                    {/* Step Indicator */}
                                    <m.div
                                        className={`absolute left-4 top-1/2 -translate-y-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 z-10 ${activeStep >= step.id
                                            ? 'bg-leadq-purple text-white shadow-[0_0_20px_rgba(123,111,212,0.5)]'
                                            : 'bg-[#0f172a] border-2 border-white/20 text-leadq-silver'
                                            }`}
                                        animate={{ scale: activeStep >= step.id ? 1.1 : 1 }}
                                    >
                                        <div className="scale-75">{step.icon}</div>
                                    </m.div>

                                    {/* Step Content Card */}
                                    <m.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: 0, duration: 0.15 }}
                                        className={`overflow-hidden relative will-change-[opacity,transform] transition-opacity duration-300 ${activeStep === step.id
                                            ? 'shadow-2xl shadow-leadq-purple/10 opacity-100'
                                            : 'opacity-60 hover:opacity-100'
                                            }`}
                                        animate={{ scale: activeStep === step.id ? 1.02 : 1 }}
                                    >
                                        <SpotlightCard className={`p-6 lg:p-8 xl:p-10 rounded-2xl ${activeStep === step.id ? 'border-leadq-purple/50 bg-white/5' : 'border-white/10 hover:border-white/20'}`}>
                                            {/* Card Content: Text Left, Animation Right */}
                                            <div className="flex flex-col xl:flex-row items-center gap-6 xl:gap-8">
                                                {/* Text */}
                                                <div className="flex-1 max-w-lg">
                                                    <h3 className={`text-2xl sm:text-3xl xl:text-4xl font-display font-semibold mb-3 transition-colors duration-300 ${activeStep === step.id ? 'text-white' : 'text-slate-300'}`}>
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-leadq-silver text-base sm:text-lg leading-relaxed">
                                                        {step.description}
                                                    </p>
                                                </div>

                                                {/* Animation */}
                                                <div className="flex-1 flex items-center justify-center min-h-[260px] xl:min-h-[300px] w-full">
                                                    <div className={`w-full transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform] ${activeStep === step.id ? 'opacity-100 scale-100 translate-y-0' : 'opacity-10 scale-95 translate-y-4 pointer-events-none'}`}>
                                                        {renderStepAnimation(step.id, activeStep === step.id)}
                                                    </div>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </m.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile & Tablet: Scroll-Reveal Cards */}
                    <div className="lg:hidden flex flex-col gap-6">
                        {steps.map((step) => (
                            <m.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                onViewportEnter={() => setMobileVisible(prev => ({ ...prev, [step.id]: true }))}
                                onViewportLeave={() => setMobileVisible(prev => ({ ...prev, [step.id]: false }))}
                                transition={{
                                    duration: 0.15,
                                    delay: 0,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                className="overflow-hidden"
                            >
                                <SpotlightCard className="p-6 border-leadq-silver/30 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-leadq-purple/20 flex items-center justify-center text-leadq-purple-light">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-leadq-silver mb-6">{step.description}</p>
                                    <div className={`transition-opacity duration-500 w-full ${mobileVisible[step.id] ? 'opacity-100' : 'opacity-0'}`}>
                                        {renderStepAnimation(step.id, mobileVisible[step.id] || false)}
                                    </div>
                                </SpotlightCard>
                            </m.div>
                        ))}
                    </div>
                </div>

                {/* Supporting Features */}
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="mt-16"
                >
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white text-center mb-12">
                        Built for real-world selling
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <m.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <SpotlightCard className="p-6 border-white/10 text-center hover:border-leadq-silver/30 transition-colors rounded-2xl">
                                    <div className="w-12 h-12 rounded-full bg-leadq-silver/20 flex items-center justify-center text-leadq-silver mx-auto mb-4">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-2xl sm:text-3xl font-semibold text-white mb-2">{feature.title}</h4>
                                    <p className="text-leadq-silver text-base sm:text-lg">{feature.description}</p>
                                </SpotlightCard>
                            </m.div>
                        ))}
                    </div>
                </m.div>
            </div >
        </section >
    );
}

