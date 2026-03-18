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
        <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 px-4 py-3">
            {/* Stacked business cards */}
            <div className="relative w-full max-w-[240px] h-[124px] flex-shrink-0">
                {/* Back card */}
                <div className="absolute top-4 left-4 w-[205px] h-[104px] bg-[#e8eaf0] rounded-xl border border-gray-300 z-10" />
                {/* Front card */}
                <div className="absolute top-0 left-0 w-[205px] h-[104px] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-gray-200 z-20 p-3 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-900 rounded-md flex items-center justify-center">
                            <div className="w-2.5 h-2.5 border-2 border-white rounded-[2px] rotate-45" />
                        </div>
                        <span className="font-bold text-gray-900 text-[11px] tracking-tight">TECHCORP</span>
                    </div>
                    <div>
                        <div className="text-[14px] font-bold text-gray-900 leading-tight">Sarah Chen</div>
                        <div className="text-[9px] font-semibold text-purple-600 uppercase tracking-wider mt-0.5">VP of Sales</div>
                    </div>
                    <div className="h-0.5 w-7 bg-gray-900 rounded-full" />
                </div>
            </div>

            <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0 rotate-90" />

            {/* Auto-filled contact panel */}
            <div className="w-full max-w-[240px] bg-white rounded-xl p-3 shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-gray-200 flex-shrink-0">
                <div className="text-[11px] text-gray-900 mb-2 font-bold tracking-wide">Contact Details</div>
                {[
                    { icon: <User className="w-3 h-3" />, label: 'Name', value: 'Sarah Chen' },
                    { icon: <Building2 className="w-3 h-3" />, label: 'Company', value: 'TechCorp Inc.' },
                    { icon: <Mail className="w-3 h-3" />, label: 'Email', value: 'sarah.chen@techcorp.com' },
                    { icon: <Phone className="w-3 h-3" />, label: 'Phone', value: '+1 555 123 4567' },
                ].map((f) => (
                    <div key={f.label} className="grid grid-cols-[12px_46px_1fr] items-center gap-1.5 mb-1.5 last:mb-0">
                        <span className="text-purple-500">{f.icon}</span>
                        <span className="text-gray-600 text-[10px] font-medium">{f.label}</span>
                        <span className="text-gray-900 text-[10px] font-semibold break-all">{f.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Static preview: Scanned data -> AI search -> Verified profile
function ProfileResearch() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 px-4 py-3">
            {/* Scanned data */}
            <div className="w-full max-w-[240px] bg-gray-100 rounded-xl p-3 shadow-md flex-shrink-0">
                <div className="text-[10px] text-gray-500 font-bold mb-2 uppercase tracking-wider">Scanned Data</div>
                <div className="flex items-center justify-around">
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                            <User size={12} />
                        </div>
                        <span className="text-gray-900 text-xs font-semibold">Sarah Chen</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                            <Building2 size={12} />
                        </div>
                        <span className="text-gray-900 text-xs font-semibold">TechCorp</span>
                    </div>
                </div>
            </div>

            {/* AI search node */}
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 p-px shadow-[0_0_20px_rgba(168,159,224,0.6)]">
                    <div className="w-full h-full bg-purple-500 rounded-full flex items-center justify-center">
                        <Search className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>

            {/* Enriched verified profile */}
            <div className="w-full max-w-[240px] bg-white rounded-xl p-3 shadow-md flex-shrink-0">
                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-gray-200">
                    <Shield className="w-3 h-3 text-green-500" />
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">Verified Profile</span>
                </div>
                <div className="space-y-2">
                    <div>
                        <div className="text-gray-400 text-[9px] uppercase tracking-wide font-semibold">Identity</div>
                        <div className="text-gray-900 text-xs font-bold">Sarah Chen</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-[9px] uppercase tracking-wide font-semibold">Role</div>
                        <div className="text-gray-700 text-xs leading-tight font-medium">VP of Sales @ TechCorp Inc.</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-[9px] uppercase tracking-wide font-semibold">Experience</div>
                        <div className="text-gray-700 text-xs font-medium">12+ years B2B SaaS</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Static preview: Raw notes -> Structured meeting summary
function MeetingNotes() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 px-4 py-3">
            {/* Raw voice / bullet notes */}
            <div className="w-full max-w-[240px] bg-gray-100 rounded-xl p-3 shadow-md flex-shrink-0">
                <div className="text-xs text-gray-900 font-bold mb-2">My Notes</div>
                {['- met at conf', '- interested in CRM', '- follow up next week', '- needs demo'].map((note) => (
                    <div key={note} className="text-gray-700 text-[10px] font-mono mb-1 leading-snug">{note}</div>
                ))}
            </div>

            <ChevronRight className="w-4 h-4 text-purple-300 flex-shrink-0 rotate-90" />

            {/* AI-structured summary */}
            <div className="w-full max-w-[240px] bg-white rounded-xl p-3 shadow-md flex-shrink-0">
                <div className="text-xs text-gray-900 mb-2 font-bold tracking-wide">Meeting Summary</div>
                <div className="space-y-2">
                    <div>
                        <div className="text-gray-400 text-[9px] uppercase tracking-wide font-semibold">Who</div>
                        <div className="text-gray-900 text-xs font-semibold">Sarah Chen, TechCorp</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-[9px] uppercase tracking-wide font-semibold">What</div>
                        <div className="text-gray-700 text-xs leading-snug font-medium">Interested in CRM solution</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-[9px] uppercase tracking-wide font-semibold">Next Steps</div>
                        <div className="text-gray-700 text-xs leading-snug font-medium">Schedule demo next week</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Static preview: Mini calendar + today's follow-up tasks
function FollowUps() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-4 py-3">
            {/* Mini calendar */}
            <div className="w-full max-w-[240px] bg-white rounded-xl p-3 shadow-md flex-shrink-0">
                <div className="text-xs text-gray-900 mb-2 font-bold">February 2026</div>
                <div className="grid grid-cols-7 gap-0.5 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i} className="text-gray-400 text-[9px] pb-0.5 font-semibold">{d}</div>
                    ))}
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div
                            key={n}
                            className={`py-0.5 rounded text-[10px] font-bold ${n === 6 ? 'bg-purple-500 text-white' : 'text-gray-700'}`}
                        >
                            {n}
                        </div>
                    ))}
                </div>
            </div>

            {/* Follow-up task list */}
            <div className="w-full max-w-[240px] bg-white rounded-xl p-3 shadow-md flex-shrink-0">
                <div className="text-xs text-gray-900 mb-2 font-bold tracking-wide">Today's Follow-ups</div>
                {[
                    { name: 'Sarah Chen', action: 'Send demo link', due: 'Today' },
                    { name: 'Mike Johnson', action: 'Follow-up call', due: 'Today' },
                    { name: 'Lisa Park', action: 'Check proposal', due: 'Tomorrow' },
                ].map((task) => (
                    <div key={task.name} className="flex items-start gap-2 mb-2 last:mb-0">
                        <div className="w-3 h-3 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                            <div className="text-gray-900 text-[10px] font-semibold truncate">{task.name}</div>
                            <div className="text-gray-500 text-[9px] truncate">{task.action}</div>
                        </div>
                        <div className="text-gray-400 text-[9px] font-medium flex-shrink-0">{task.due}</div>
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

                    {/* Right Column: Sticky Phone Container (Desktop only) */}
                    <div className="hidden lg:block relative w-full h-full">
                        <div className="sticky top-24 w-full h-[calc(100vh-12rem)] min-h-[600px] flex items-center justify-center">

                            {/* ═══════════════════════════════════════════════ */}
                            {/* Ultra-realistic phone — Space Black Titanium   */}
                            {/* ═══════════════════════════════════════════════ */}
                            <div className="relative w-[280px] h-[560px] flex-shrink-0">

                                {/* ── Ambient Glow (soft radial + hard drop shadow) ── */}
                                <div className="absolute pointer-events-none" style={{
                                    inset: '-32px', zIndex: -1, borderRadius: '72px',
                                    background: 'radial-gradient(ellipse at 50% 50%, rgba(115,55,210,0.28) 0%, transparent 68%)',
                                    filter: 'blur(18px)',
                                }} />
                                <div className="absolute pointer-events-none" style={{
                                    inset: '-10px', zIndex: -1, borderRadius: '52px',
                                    boxShadow: '0 0 70px rgba(105,45,205,0.5), 0 0 140px rgba(80,25,185,0.22), 0 36px 90px rgba(0,0,0,0.85)',
                                }} />

                                {/* ── Titanium body: base gradient ── */}
                                <div className="absolute inset-0 rounded-[42px]" style={{
                                    background: 'linear-gradient(158deg, #21173a 0%, #140d24 38%, #0f0a1c 65%, #190c2b 100%)',
                                }} />
                                {/* Chamfered-edge directional lighting (top-left light source) */}
                                <div className="absolute inset-0 rounded-[42px]" style={{
                                    background: 'linear-gradient(138deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.025) 28%, transparent 52%, rgba(0,0,0,0.22) 100%)',
                                }} />
                                {/* Top edge — overhead catchlight */}
                                <div className="absolute top-0 left-[42px] right-[42px] h-[1.5px] rounded-full" style={{
                                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.24), rgba(210,190,255,0.18), transparent)',
                                }} />
                                {/* Left edge — partial rim light */}
                                <div className="absolute left-0 top-[42px] bottom-[42px] w-[1.5px] rounded-full" style={{
                                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.06), transparent)',
                                }} />
                                {/* Right edge — dark / shadow side */}
                                <div className="absolute right-0 top-[42px] bottom-[42px] w-[1.5px] rounded-full" style={{
                                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.35))',
                                }} />
                                {/* Bottom edge — deepest shadow */}
                                <div className="absolute bottom-0 left-[42px] right-[42px] h-[1.5px] rounded-full" style={{
                                    background: 'rgba(0,0,0,0.4)',
                                }} />
                                {/* Outer border — faint purple rim */}
                                <div className="absolute inset-0 rounded-[42px] border border-[#40206e] pointer-events-none" />
                                {/* Inner rim — secondary specular line */}
                                <div className="absolute inset-[1px] rounded-[41px] border border-white/[0.045] pointer-events-none" />

                                {/* ── Antenna break lines (titanium band seams) ── */}
                                <div className="absolute left-0 top-[58px] w-[2.5px] h-[3px]" style={{ background: 'rgba(255,255,255,0.045)' }} />
                                <div className="absolute left-0 top-[220px] w-[2.5px] h-[3px]" style={{ background: 'rgba(255,255,255,0.03)' }} />
                                <div className="absolute right-0 top-[262px] w-[2.5px] h-[3px]" style={{ background: 'rgba(255,255,255,0.03)' }} />

                                {/* ── Left side buttons ── */}
                                {/* Mute / ring-silent toggle */}
                                <div className="absolute left-[-6px] top-[104px] w-[6px] h-[28px] rounded-l-[4px]" style={{
                                    background: 'linear-gradient(to left, #251842, #130d26, #1f1436)',
                                    boxShadow: '-3px 1px 7px rgba(0,0,0,0.95), -1px 0 0 rgba(255,255,255,0.045), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.65)',
                                }} />
                                {/* Volume up */}
                                <div className="absolute left-[-6px] top-[148px] w-[6px] h-[58px] rounded-l-[4px]" style={{
                                    background: 'linear-gradient(to left, #251842, #130d26, #1f1436)',
                                    boxShadow: '-3px 1px 7px rgba(0,0,0,0.95), -1px 0 0 rgba(255,255,255,0.045), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.65)',
                                }} />
                                {/* Volume down */}
                                <div className="absolute left-[-6px] top-[218px] w-[6px] h-[58px] rounded-l-[4px]" style={{
                                    background: 'linear-gradient(to left, #251842, #130d26, #1f1436)',
                                    boxShadow: '-3px 1px 7px rgba(0,0,0,0.95), -1px 0 0 rgba(255,255,255,0.045), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.65)',
                                }} />

                                {/* ── Right side button — power/sleep ── */}
                                <div className="absolute right-[-6px] top-[172px] w-[6px] h-[80px] rounded-r-[4px]" style={{
                                    background: 'linear-gradient(to right, #251842, #130d26, #1f1436)',
                                    boxShadow: '3px 1px 7px rgba(0,0,0,0.95), 1px 0 0 rgba(255,255,255,0.045), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.65)',
                                }} />

                                {/* ── Bottom frame hardware (USB-C + speaker dots) ── */}
                                <div className="absolute bottom-[3px] left-0 right-0 flex items-center justify-center gap-[6px] pointer-events-none">
                                    {/* Left speaker array */}
                                    <div className="flex items-center gap-[3.5px]">
                                        {[0, 1, 2, 3].map(i => (
                                            <div key={i} className="w-[3px] h-[4.5px] rounded-full" style={{
                                                background: '#060310',
                                                boxShadow: 'inset 0 1.5px 2px rgba(0,0,0,1), 0 0 0 0.5px rgba(255,255,255,0.055)',
                                            }} />
                                        ))}
                                    </div>
                                    {/* USB-C port cutout */}
                                    <div className="w-[32px] h-[6px] rounded-full" style={{
                                        background: 'linear-gradient(to bottom, #040210, #07051a)',
                                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,1), inset 0 0 0 0.5px rgba(255,255,255,0.04)',
                                    }} />
                                    {/* Right speaker array */}
                                    <div className="flex items-center gap-[3.5px]">
                                        {[0, 1, 2, 3].map(i => (
                                            <div key={i} className="w-[3px] h-[4.5px] rounded-full" style={{
                                                background: '#060310',
                                                boxShadow: 'inset 0 1.5px 2px rgba(0,0,0,1), 0 0 0 0.5px rgba(255,255,255,0.055)',
                                            }} />
                                        ))}
                                    </div>
                                </div>

                                {/* ── Screen glass ── */}
                                <div className="absolute inset-[2.5px] rounded-[39.5px] bg-[#060310] overflow-hidden flex flex-col">

                                    {/* Glass reflections — painted ABOVE content (z-40) */}
                                    {/* 1. Top-edge curved catchlight */}
                                    <div className="absolute top-0 left-0 right-0 h-[88px] pointer-events-none z-40 rounded-t-[39px]" style={{
                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.012) 60%, transparent 100%)',
                                    }} />
                                    {/* 2. Upper-left diagonal specular */}
                                    <div className="absolute pointer-events-none z-40" style={{
                                        top: 0, left: 0, width: '54%', height: '36%',
                                        background: 'linear-gradient(138deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.018) 45%, transparent 100%)',
                                        borderRadius: '39px 0 0 0',
                                    }} />
                                    {/* 3. Right-edge depth vignette */}
                                    <div className="absolute top-0 right-0 bottom-0 w-[14px] pointer-events-none z-40" style={{
                                        background: 'linear-gradient(to left, rgba(0,0,0,0.2), transparent)',
                                    }} />
                                    {/* 4. Bottom fade */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[65px] pointer-events-none z-40" style={{
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.32), transparent)',
                                    }} />
                                    {/* 5. Top-right micro lens flare */}
                                    <div className="absolute top-[28px] right-[22px] w-[28px] h-[28px] rounded-full pointer-events-none z-40" style={{
                                        background: 'radial-gradient(circle, rgba(190,170,255,0.07) 0%, transparent 70%)',
                                        filter: 'blur(5px)',
                                    }} />

                                    {/* Status bar */}
                                    <div className="flex items-center justify-between px-6 pt-[14px] pb-0 flex-shrink-0 relative z-20">
                                        <span className="text-white text-[12px] font-semibold tracking-[-0.3px]">9:41</span>
                                        <div className="flex items-center gap-[5px]">
                                            {/* Cellular */}
                                            <svg width="15" height="11" viewBox="0 0 17 12" fill="none">
                                                <rect x="0" y="8.5" width="3" height="3.5" rx="0.6" fill="white" fillOpacity="0.95" />
                                                <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.6" fill="white" fillOpacity="0.95" />
                                                <rect x="9" y="2.5" width="3" height="9.5" rx="0.6" fill="white" fillOpacity="0.95" />
                                                <rect x="13.5" y="0" width="3" height="12" rx="0.6" fill="white" fillOpacity="0.22" />
                                            </svg>
                                            {/* WiFi */}
                                            <svg width="14" height="11" viewBox="0 0 17 13" fill="none">
                                                <circle cx="8.5" cy="12" r="1.8" fill="white" fillOpacity="0.95" />
                                                <path d="M4.5 8.2 a5.7 5.7 0 0 1 8 0" stroke="white" strokeOpacity="0.95" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                                                <path d="M1.2 5 a10.5 10.5 0 0 1 14.6 0" stroke="white" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                                            </svg>
                                            {/* Battery */}
                                            <svg width="24" height="11" viewBox="0 0 26 12" fill="none">
                                                <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="white" strokeOpacity="0.38" />
                                                <rect x="2" y="2" width="14" height="8" rx="1.5" fill="white" fillOpacity="0.95" />
                                                <path d="M23 4v4a2 2 0 000-4z" fill="white" fillOpacity="0.28" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Screen content area */}
                                    <div className="relative flex-1 overflow-hidden">
                                        <div className="absolute inset-0 pointer-events-none" style={{
                                            background: 'radial-gradient(ellipse at 50% 40%, rgba(168,85,247,0.13) 0%, transparent 68%)',
                                        }} />
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeSection}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -15 }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                                className="relative z-10 w-full h-full"
                                            >
                                                {renderStepSnapshot(steps[activeSection].id)}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Home indicator */}
                                    <div className="flex justify-center pb-[8px] pt-[4px] flex-shrink-0 z-20">
                                        <div className="w-[108px] h-[4px] rounded-full" style={{
                                            background: 'rgba(255,255,255,0.38)',
                                            boxShadow: '0 0 8px rgba(255,255,255,0.09)',
                                        }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
