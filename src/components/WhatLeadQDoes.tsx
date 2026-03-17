import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard,
    StickyNote,
    CalendarCheck,
    ChevronRight,
    Phone,
    Mail,
    Building2,
    User,
    UserPlus,
    Search,
    Shield
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
        description: 'Snap a business card, we fill the details for you. No more stacks of cards or messy screenshots.',
        icon: <CreditCard className="w-6 h-6" />,
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
];

// Static preview: Card capture -> Contact details panel
function CardCapture() {
    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 py-2.5 transform scale-90 sm:scale-100">
            {/* Stacked business cards */}
            <div className="relative w-[210px] h-[145px] flex-shrink-0">
                {/* Back card */}
                <div className="absolute top-5 left-7 w-[190px] h-[122px] bg-[#e8eaf0] rounded-xl border border-gray-300 z-10" />
                {/* Front card */}
                <div className="absolute top-0 left-0 w-[190px] h-[122px] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-gray-200 z-20 p-4 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-900 rounded-md flex items-center justify-center">
                            <div className="w-3 h-3 border-2 border-white rounded-[2px] rotate-45" />
                        </div>
                        <span className="font-bold text-gray-900 text-xs tracking-tight">TECHCORP</span>
                    </div>
                    <div>
                        <div className="text-[16px] font-bold text-gray-900 leading-tight">Sarah Chen</div>
                        <div className="text-[10px] font-semibold text-purple-600 uppercase tracking-wider mt-0.5">VP of Sales</div>
                    </div>
                    <div className="h-0.5 w-8 bg-gray-900 rounded-full" />
                </div>
            </div>

            <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0 hidden sm:block" />

            {/* Auto-filled contact panel */}
            <div className="flex-shrink-0 w-[230px] bg-white rounded-xl p-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-gray-200">
                <div className="text-[13px] text-gray-900 mb-3 font-bold tracking-wide">Contact Details</div>
                {[
                    { icon: <User className="w-4 h-4" />, label: 'Name', value: 'Sarah Chen' },
                    { icon: <Building2 className="w-4 h-4" />, label: 'Company', value: 'TechCorp Inc.' },
                    { icon: <Mail className="w-4 h-4" />, label: 'Email', value: 'sarah.chen@techcorp.com' },
                    { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: '+1 555 123 4567' },
                ].map((f) => (
                    <div key={f.label} className="grid grid-cols-[16px_58px_1fr] items-center gap-2 mb-2 last:mb-0">
                        <span className="text-purple-500">{f.icon}</span>
                        <span className="text-gray-600 text-xs font-medium">{f.label}</span>
                        <span className="text-gray-900 text-xs font-semibold break-all">{f.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Static preview: Scanned data -> AI search -> Verified profile
function ProfileResearch() {
    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-5 py-3 transform scale-90 sm:scale-100">
            {/* Scanned data */}
            <div className="flex-shrink-0 w-[180px] bg-gray-100 rounded-xl p-4 shadow-md">
                <div className="text-xs text-gray-500 font-bold mb-3 uppercase tracking-wider">Scanned Data</div>
                <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                            <User size={14} />
                        </div>
                        <span className="text-gray-900 text-sm font-semibold">Sarah Chen</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                            <Building2 size={14} />
                        </div>
                        <span className="text-gray-900 text-sm font-semibold">TechCorp</span>
                    </div>
                </div>
            </div>

            {/* AI search node */}
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 p-px shadow-[0_0_24px_rgba(168,159,224,0.6)]">
                    <div className="w-full h-full bg-purple-500 rounded-full flex items-center justify-center">
                        <Search className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>

            {/* Enriched verified profile */}
            <div className="flex-shrink-0 w-[210px] bg-white rounded-xl p-4 shadow-md">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600 font-bold uppercase tracking-wider">Verified Profile</span>
                </div>
                <div className="space-y-2.5">
                    <div>
                        <div className="text-gray-400 text-[10px] uppercase tracking-wide font-semibold">Identity</div>
                        <div className="text-gray-900 text-sm font-bold">Sarah Chen</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-[10px] uppercase tracking-wide font-semibold">Role</div>
                        <div className="text-gray-700 text-sm leading-tight font-medium">VP of Sales @ TechCorp Inc.</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-[10px] uppercase tracking-wide font-semibold">Experience</div>
                        <div className="text-gray-700 text-sm font-medium">12+ years B2B SaaS</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Static preview: Raw notes -> Structured meeting summary
function MeetingNotes() {
    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-6 py-3 transform scale-90 sm:scale-100">
            {/* Raw voice / bullet notes */}
            <div className="flex-shrink-0 w-[180px] bg-gray-100 rounded-xl p-4 shadow-md">
                <div className="text-sm text-gray-900 font-bold mb-2.5">My Notes</div>
                {['- met at conf', '- interested in CRM', '- follow up next week', '- needs demo'].map((note) => (
                    <div key={note} className="text-gray-700 text-xs font-mono mb-1.5 leading-snug">{note}</div>
                ))}
            </div>

            <ChevronRight className="w-6 h-6 text-purple-300 flex-shrink-0 hidden sm:block" />

            {/* AI-structured summary */}
            <div className="flex-shrink-0 w-[210px] bg-white rounded-xl p-4 shadow-md">
                <div className="text-sm text-gray-900 mb-3 font-bold tracking-wide">Meeting Summary</div>
                <div className="space-y-3">
                    <div>
                        <div className="text-gray-400 text-[10px] uppercase tracking-wide font-semibold">Who</div>
                        <div className="text-gray-900 text-sm font-semibold">Sarah Chen, TechCorp</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-[10px] uppercase tracking-wide font-semibold">What</div>
                        <div className="text-gray-700 text-sm leading-snug font-medium">Interested in CRM solution</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-[10px] uppercase tracking-wide font-semibold">Next Steps</div>
                        <div className="text-gray-700 text-sm leading-snug font-medium">Schedule demo next week</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Static preview: Mini calendar + today's follow-up tasks
function FollowUps() {
    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-5 py-3 transform scale-90 sm:scale-100">
            {/* Mini calendar */}
            <div className="flex-shrink-0 w-[160px] bg-white rounded-xl p-4 shadow-md">
                <div className="text-sm text-gray-900 mb-2.5 font-bold">February 2026</div>
                <div className="grid grid-cols-7 gap-1 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} className="text-gray-400 text-[10px] pb-1 font-semibold">{d}</div>
                    ))}
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div
                            key={n}
                            className={`py-1 rounded text-xs font-bold ${n === 6 ? 'bg-purple-500 text-white' : 'text-gray-700'}`}
                        >
                            {n}
                        </div>
                    ))}
                </div>
            </div>

            {/* Follow-up task list */}
            <div className="flex-shrink-0 w-[230px] bg-white rounded-xl p-4 shadow-md">
                <div className="text-sm text-gray-900 mb-3 font-bold tracking-wide">Today's Follow-ups</div>
                {[
                    { name: 'Sarah Chen', action: 'Send demo link', due: 'Today' },
                    { name: 'Mike Johnson', action: 'Follow-up call', due: 'Today' },
                    { name: 'Lisa Park', action: 'Check proposal', due: 'Tomorrow' },
                ].map((task) => (
                    <div key={task.name} className="flex items-start gap-2.5 mb-3 last:mb-0">
                        <div className="w-4 h-4 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                            <div className="text-gray-900 text-sm font-semibold truncate">{task.name}</div>
                            <div className="text-gray-500 text-xs truncate">{task.action}</div>
                        </div>
                        <div className="text-gray-400 text-xs font-medium flex-shrink-0">{task.due}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function renderStepSnapshot(stepId: number) {
    switch (stepId) {
        case 1: return <CardCapture />;
        case 2: return <ProfileResearch />;
        case 3: return <MeetingNotes />;
        case 4: return <FollowUps />;
        default: return null;
    }
}

export default function WhatLeadQDoes() {
    const [activeSection, setActiveSection] = useState(0);

    return (
        <section
            id="what-leadq-does"
            className="relative z-10 flex flex-col justify-center bg-leadq-dark pt-16 pb-16 px-4"
        >
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                        What LeadQ.AI Does{' '}
                        <span className="text-[#A89FE0]">for You</span>
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-leadq-silver leading-relaxed">
                        LeadQ.AI captures people you meet, remembers every conversation, and nudges you to follow up at the right time.
                        <br className="hidden sm:block" />
                        Think of it as a personal sales assistant that does the boring work for you.
                    </p>
                </div>

                {/* Layout Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
                    
                    {/* Left Column: Scrolling Text Blocks */}
                    <div className="flex flex-col gap-12 lg:gap-24 pb-[10vh] lg:pb-[20vh] pt-[10vh]">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                whileInView="visible"
                                viewport={{ amount: 0.3, margin: "-10% 0px -10% 0px" }}
                                onViewportEnter={() => setActiveSection(index)}
                                className="min-h-[40vh] lg:min-h-[50vh] flex flex-col justify-center transition-opacity duration-500"
                                style={{ opacity: activeSection === index ? 1 : 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-500 flex-shrink-0 transition-all duration-500 ${activeSection === index ? 'shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-110' : ''}`}>
                                        {step.icon}
                                    </div>
                                    <span className="text-xl font-medium text-gray-500 font-mono leading-none">
                                        0{index + 1}
                                    </span>
                                </div>
                                
                                <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                                    {step.title}
                                </h3>
                                
                                <p className="text-lg text-gray-400 leading-relaxed max-w-lg mb-8">
                                    {step.description}
                                </p>

                                {/* Mobile preview (shows inline on small screens) */}
                                <div className="block lg:hidden w-full bg-[#1a1f35] rounded-xl overflow-hidden border border-white/10 p-4 shadow-lg mb-8">
                                    {renderStepSnapshot(step.id)}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column: Sticky Visual Container (Desktop only) */}
                    <div className="hidden lg:block relative w-full h-full">
                        <div className="sticky top-24 w-full h-[calc(100vh-12rem)] min-h-[500px] flex items-center justify-center rounded-[2rem] border border-gray-800 bg-gray-900/50 p-1 backdrop-blur-sm overflow-hidden shadow-2xl">
                            
                            {/* Inner container */}
                            <div className="relative w-full h-full rounded-[1.8rem] bg-[#0d071a] overflow-hidden flex flex-col items-center justify-center p-8">
                                
                                {/* Dynamic Background Blur */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.15)_0%,_transparent_70%)] pointer-events-none"></div>
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                                {/* Animated content transition */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeSection}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="relative z-10 w-full h-full flex items-center justify-center"
                                    >
                                        {renderStepSnapshot(steps[activeSection].id)}
                                    </motion.div>
                                </AnimatePresence>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
