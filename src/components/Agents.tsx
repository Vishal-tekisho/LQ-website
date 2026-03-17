import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Mail,
  Mic,
  Search,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Agent {
  id: number;
  title: string;
  role: string;
  description: string;
  icon: LucideIcon;
  stat: string;
  signal: string;
  capabilities: string[];
  link: string;
}

const agents: Agent[] = [
  {
    id: 1,
    title: 'Lead Capture Agent',
    role: 'Capture',
    description: 'Turn every scan, form fill, and inbound handoff into a qualified lead with instant validation and clean routing.',
    icon: Search,
    stat: 'First touch in under 2 min',
    signal: 'Best for intake velocity',
    capabilities: ['Validates contact data', 'Scores lead quality', 'Routes to the right rep'],
    link: '/agents/contact-capture',
  },
  {
    id: 2,
    title: 'Research Agent',
    role: 'Enrich',
    description: 'Pull company context, buyer signals, and verified profile details into one view so reps start warmer.',
    icon: Users,
    stat: 'Profiles enriched continuously',
    signal: 'Best for pre-call prep',
    capabilities: ['Finds company context', 'Builds richer buyer profiles', 'Surfaces useful web signals'],
    link: '/agents/research',
  },
  {
    id: 3,
    title: 'Meetings Agent',
    role: 'Book',
    description: 'Convert buying intent into booked meetings with smarter qualification, scheduling, and follow-through.',
    icon: Calendar,
    stat: 'Booking flow always on',
    signal: 'Best for inbound conversion',
    capabilities: ['Qualifies meeting requests', 'Schedules instantly', 'Keeps calendars aligned'],
    link: '/agents/meetings',
  },
  {
    id: 4,
    title: 'Email Agent',
    role: 'Draft',
    description: 'Draft context-aware outreach that sounds tailored to the buyer, not templated by a generic sequence engine.',
    icon: Mail,
    stat: 'Personalized drafts in seconds',
    signal: 'Best for follow-up coverage',
    capabilities: ['Writes personalized emails', 'Uses meeting context', 'Keeps messaging consistent'],
    link: '/agents/email',
  },
  {
    id: 5,
    title: 'Voice Agent',
    role: 'Call',
    description: 'Handle calling and support conversations with a more natural, conversational AI that moves deals forward.',
    icon: Mic,
    stat: 'Conversational coverage after hours',
    signal: 'Best for call-driven workflows',
    capabilities: ['Handles live calls', 'Captures intent from conversations', 'Escalates when humans are needed'],
    link: '/agents/voice',
  },
];

export default function Agents() {
  const [activeStep, setActiveStep] = useState(0);

  // ─── Shared Visual Wrapper ───────────────────────────────────────────────────
  const VisualWrapper = ({ children, idKey }: { children: ReactNode; idKey: string }) => (
    <div key={idKey} className="absolute inset-0 rounded-[24px] p-[1px] bg-gradient-to-b from-[rgba(255,255,255,0.2)] via-transparent to-[rgba(255,255,255,0.05)] shadow-[0_0_50px_rgba(76,40,220,0.1)] overflow-hidden group">
      <div className="absolute inset-0 bg-[#09090C] rounded-[24px]"></div>
      <div
        className="absolute inset-0 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
        style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#7640DC] to-transparent opacity-60"></div>
      <div className="relative w-full h-full flex items-center justify-center p-8 z-10">
        {children}
      </div>
    </div>
  );

  // ─── Visual 0: Lead Capture ──────────────────────────────────────────────────
  const VisualCapture = () => (
    <VisualWrapper idKey="v-capture">
      <div className="relative h-64 w-full flex justify-center items-center">
        <div className="w-[140px] h-[250px] bg-[#0f0f17] border-[2px] border-[rgba(196,192,232,0.12)] rounded-[24px] relative overflow-hidden shadow-2xl">
          <div className="p-4 w-full h-full flex flex-col gap-3 mt-4">
            <div className="w-[80%] h-4 bg-white/20 rounded animate-[pulse_2s_ease-in-out_infinite]"></div>
            <div className="w-[60%] h-3 bg-[#A89FE0]/40 rounded animate-[pulse_2s_ease-in-out_infinite_0.2s]"></div>
            <div className="w-[90%] h-3 bg-[#8B87B3]/30 rounded animate-[pulse_2s_ease-in-out_infinite_0.4s]"></div>
            <div className="w-[70%] h-3 bg-[#8B87B3]/20 rounded animate-[pulse_2s_ease-in-out_infinite_0.6s]"></div>
            <div className="w-[55%] h-3 bg-white/15 rounded animate-[pulse_2s_ease-in-out_infinite_0.8s]"></div>
          </div>
          <div
            className="absolute left-0 right-0 h-[2px] bg-[#28C4D4] shadow-[0_0_12px_#28C4D4]"
            style={{ animation: 'scan 1.4s infinite linear' }}
          ></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-10 right-[-10px] border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.1)] text-[#22C55E] text-[13px] font-medium rounded-xl px-4 py-2 shadow-lg"
        >
          ✓ Lead captured & routed
        </motion.div>
      </div>
    </VisualWrapper>
  );

  // ─── Visual 1: Research ──────────────────────────────────────────────────────
  const VisualResearch = () => {
    const rows = [
      { label: 'Company', value: 'TechFlow Inc.', color: '#A89FE0' },
      { label: 'Funding Round', value: 'Series B · $24M', color: '#22C55E' },
      { label: 'Tech Stack', value: 'Salesforce, HubSpot', color: '#A89FE0' },
      { label: 'Buying Signal', value: 'Posted 3 SDR roles', color: '#F59E0B' },
      { label: 'LinkedIn Activity', value: 'Active 2 days ago', color: '#8B87B3' },
    ];
    return (
      <VisualWrapper idKey="v-research">
        <div className="w-full max-w-[400px]">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#A89FE0] animate-pulse"></div>
            <span className="text-[12px] uppercase tracking-[0.24em] text-[#8B87B3]">Enriching profile · Sarah Chen</span>
          </div>
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 + 0.2, duration: 0.4 }}
              className="flex items-center justify-between py-3 border-b border-[rgba(196,192,232,0.06)] last:border-0"
            >
              <span className="text-[13px] text-[#8B87B3]">{row.label}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.15 + 0.5, duration: 0.4 }}
                className="text-[14px] font-semibold"
                style={{ color: row.color }}
              >
                {row.value}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </VisualWrapper>
    );
  };

  // ─── Visual 2: Meetings ──────────────────────────────────────────────────────
  const VisualMeetings = () => (
    <VisualWrapper idKey="v-meetings">
      <div className="w-full max-w-[440px] flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="self-end bg-[rgba(123,111,212,0.15)] border border-[rgba(123,111,212,0.3)] rounded-[16px_16px_4px_16px] px-4 py-3 text-[14px] max-w-[85%] text-[#C4C0E8] shadow-lg"
        >
          Hi Sarah — happy to find a time. Are you free Thursday 2PM or Friday 10AM EST?
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="self-start bg-[rgba(255,255,255,0.04)] border border-[rgba(196,192,232,0.1)] rounded-[16px_16px_16px_4px] px-4 py-3 text-[14px] max-w-[85%] text-[#8B87B3] shadow-lg"
        >
          Thursday doesn't work, but Friday morning is good.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 2.0 }}
          className="self-end bg-[rgba(91,79,190,0.5)] border border-[rgba(123,111,212,0.4)] rounded-[16px_16px_4px_16px] px-4 py-3 text-[14px] max-w-[85%] text-white shadow-lg"
        >
          Perfect — calendar invite sent for Friday 10AM EST. See you then!{' '}
          <span className="text-[#22C55E] font-bold ml-1">✓</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 2.8 }}
          className="mt-2 flex items-center justify-center gap-2 bg-[rgba(34,197,94,0.05)] border border-[rgba(34,197,94,0.15)] rounded-lg py-2 px-4 shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-[#22C55E]"></div>
          <span className="text-[#22C55E] text-[12px] font-medium">Meeting auto-logged to Salesforce</span>
        </motion.div>
      </div>
    </VisualWrapper>
  );

  // ─── Visual 3: Email ─────────────────────────────────────────────────────────
  const VisualEmail = () => (
    <VisualWrapper idKey="v-email">
      <div className="w-full max-w-[440px] relative">
        <div className="bg-[#0f0f17] border border-[rgba(196,192,232,0.1)] rounded-[16px] p-6 shadow-2xl">
          <div className="text-[13px] text-[#8B87B3] border-b border-[rgba(196,192,232,0.1)] pb-3 mb-4">
            <div className="mb-1">To: <span className="text-white">sarah.chen@techflow.io</span></div>
            <div>Subject: <span className="text-white">Scaling SDR velocity at TechFlow</span></div>
          </div>
          <div className="text-[14px] text-[#8B87B3] leading-[1.7]">
            <span className="text-[#8B87B3]">Hi </span>
            <span className="text-[#A89FE0] font-semibold">Sarah</span>
            <span>, </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              I noticed TechFlow recently raised a Series B and is scaling your SDR team. We help RevOps leaders automate top-of-funnel outreach without adding headcount...
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[8px] h-[16px] bg-[#A89FE0] align-middle ml-1"
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-2 mt-4 justify-center"
        >
          <div className="bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] text-[#22C55E] text-[12px] font-medium rounded-full px-3 py-1.5">C-Level Tone: Active</div>
          <div className="bg-[rgba(168,159,224,0.1)] border border-[rgba(168,159,224,0.2)] text-[#A89FE0] text-[12px] font-medium rounded-full px-3 py-1.5">Personalization: 94%</div>
        </motion.div>
      </div>
    </VisualWrapper>
  );

  // ─── Visual 4: Voice ─────────────────────────────────────────────────────────
  const VisualVoice = () => {
    const transcript = [
      'How many reps are on your team currently?',
      'We have 8 SDRs and 4 AEs.',
      'And what CRM are you using today?',
    ];
    return (
      <VisualWrapper idKey="v-voice">
        <div className="w-full max-w-[400px] flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444] animate-pulse shadow-[0_0_8px_#EF4444]"></div>
              <span className="text-[13px] font-semibold text-[#EF4444] uppercase tracking-[0.2em]">Live Call</span>
            </div>
            <span className="text-[12px] text-[#8B87B3]">ACE Corp · 02:14</span>
          </div>
          <div className="flex items-end justify-center gap-[5px] h-[48px] py-2">
            {[0, 0.08, 0.16, 0.08, 0, 0.12, 0.2, 0.12, 0, 0.06].map((d, di) => (
              <motion.div
                key={di}
                animate={{ height: ['6px', `${20 + di * 3}px`, '6px'] }}
                transition={{ duration: 0.5 + di * 0.04, repeat: Infinity, delay: d, ease: 'easeInOut' }}
                className="w-[5px] bg-[#EF4444] rounded-full"
              />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {transcript.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.9 + 0.3, duration: 0.4 }}
                className={`text-[13px] leading-[1.5] px-3 py-2 rounded-lg max-w-[85%] ${
                  i % 2 === 0
                    ? 'self-start bg-[rgba(255,255,255,0.04)] border border-[rgba(196,192,232,0.08)] text-[#C4C0E8]'
                    : 'self-end bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.15)] text-[#C4C0E8]'
                }`}
              >
                {line}
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.4 }}
            className="flex items-center gap-2 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.15)] rounded-lg py-2 px-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
            <span className="text-[#EF4444] text-[12px] font-medium">Escalates when humans are needed</span>
          </motion.div>
        </div>
      </VisualWrapper>
    );
  };

  const visuals = [
    <VisualCapture />,
    <VisualResearch />,
    <VisualMeetings />,
    <VisualEmail />,
    <VisualVoice />,
  ];

  return (
    <section
      id="agents"
      className="pb-16 pt-16 relative transition-colors duration-1000"
      style={{
        backgroundImage: `radial-gradient(circle at 30% 50%, rgba(${
          activeStep === 0 ? '34, 197, 94' :
          activeStep === 1 ? '168, 159, 224' :
          activeStep === 2 ? '34, 197, 94' :
          activeStep === 3 ? '245, 158, 11' :
          '239, 68, 68'
        }, 0.03) 0%, transparent 60%)`,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center relative z-10 w-full mb-12"
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-white/45 border border-white/10 rounded-full px-3 py-1 mt-4">
            AI agent system
          </span>
          <h2 className="mt-4 text-white text-[clamp(2.5rem,5vw,4.5rem)] font-bold max-w-[800px] leading-[1.05] tracking-tight">
            Meet Your{' '}
            <span className="text-[#A89FE0]">New Workforce</span>
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-[#C4C0E8] max-w-2xl leading-relaxed">
            A coordinated team of AI specialists that captures leads, enriches context, books meetings, drafts outreach, and handles conversations.
          </p>
        </motion.div>

        {/* ── Desktop 2-Column Sticky Scroll ── */}
        <div className="hidden lg:grid grid-cols-12 gap-20 relative">

          {/* Vertical Progress Track Line */}
          <div className="absolute left-[20px] top-0 bottom-[40vh] w-[2px] bg-gradient-to-b from-transparent via-[rgba(196,192,232,0.1)] to-transparent z-0"></div>

          {/* Left Column: Scrolling Text */}
          <div className="col-span-12 lg:col-span-6 pb-[40vh] relative z-10 ml-8">
            {agents.map((agent, index) => {
              const AgentIcon = agent.icon;
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
                  onViewportEnter={() => setActiveStep(index)}
                  className="min-h-[70vh] flex flex-col justify-center pr-12 relative"
                >
                  {/* Step Number */}
                  <div className={`absolute left-[-52px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold text-[18px] transition-all duration-500 z-20 ${
                    activeStep === index
                      ? 'bg-[#7B6FD4] text-white shadow-[0_0_20px_rgba(123,111,212,0.6)] scale-110'
                      : 'bg-[#09090B] text-[#8B87B3] border border-[rgba(196,192,232,0.15)] scale-100'
                  }`}>
                    {index + 1}
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs uppercase tracking-[0.28em] text-white/45 border border-white/[0.05] bg-white/[0.02] rounded-full px-3 py-1">
                      {agent.signal}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <AgentIcon
                      size={20}
                      className={`transition-colors duration-500 ${activeStep === index ? 'text-[#A89FE0]' : 'text-[#8B87B3]'}`}
                    />
                    <span className={`text-[13px] uppercase tracking-[0.22em] transition-colors duration-500 ${activeStep === index ? 'text-[#A89FE0]' : 'text-[#8B87B3]'}`}>
                      {agent.role}
                    </span>
                  </div>

                  <h3 className={`text-[42px] font-bold mb-6 tracking-tight transition-colors duration-500 ${activeStep === index ? 'text-white' : 'text-[#8B87B3]'}`}>
                    {agent.title}
                  </h3>
                  <p className={`text-[18px] leading-[1.7] transition-colors duration-500 ${activeStep === index ? 'text-[#C4C0E8]' : 'text-[#8B87B3]/40'}`}>
                    {agent.description}
                  </p>

                  {activeStep === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="mt-8"
                    >
                      <Link
                        to={agent.link}
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#A89FE0] hover:text-white transition-colors duration-200 group"
                      >
                        Explore {agent.role} Agent
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Sticky Visual */}
          <div className="hidden lg:block col-span-12 lg:col-span-6 relative">
            <div className="sticky top-[15vh] h-[70vh] w-full">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-[#7B6FD4]/5 blur-[100px] rounded-full scale-150 transform-gpu pointer-events-none transition-opacity duration-1000"></div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.95, y: 15, rotateX: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -15, rotateX: -5 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                    style={{ perspective: '1000px' }}
                  >
                    {visuals[activeStep]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile Layout (Stacked Shingle Cards) ── */}
        <div className="flex flex-col lg:hidden relative pb-[10vh]">
          {agents.map((agent, index) => {
            const AgentIcon = agent.icon;
            return (
              <div
                key={agent.id}
                className="sticky pt-12 pb-12 bg-[#08082A] z-10 transition-all duration-500 rounded-t-[32px] border-t border-[rgba(255,255,255,0.05)] shadow-[0_-15px_40px_rgba(0,0,0,0.6)]"
                style={{ top: `${80 + index * 16}px` }}
              >
                <div className="flex flex-col px-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center font-bold text-[14px] bg-[#7B6FD4] text-white shadow-[0_0_15px_rgba(123,111,212,0.5)]">
                      {index + 1}
                    </div>
                    <AgentIcon size={16} className="text-[#A89FE0]" />
                    <span className="text-xs uppercase tracking-[0.28em] text-white/45 border border-white/[0.05] bg-white/[0.02] rounded-full px-3 py-1">
                      {agent.signal}
                    </span>
                  </div>
                  <h3 className="text-white text-[32px] font-bold mb-4 tracking-tight leading-[1.1]">{agent.title}</h3>
                  <p className="text-[#8B87B3] text-[16px] leading-[1.6] mb-4">{agent.description}</p>
                  <Link
                    to={agent.link}
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#A89FE0] hover:text-white transition-colors duration-200 mb-8 group"
                  >
                    Explore {agent.role} Agent
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
                <div className="h-[400px] relative w-full rounded-[24px] overflow-hidden px-4">
                  {visuals[index]}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%   { top: 0;    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      ` }} />
    </section>
  );
}

