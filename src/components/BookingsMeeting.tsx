import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useInViewPause, InViewContext } from '@/lib/useInViewPause';
import {
  Calendar,
  Mic,
  Send,
  UserPlus,
  Building2,
  User,
  Link2,
  Radio,
  Camera,
  FileText,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  Image,
  Upload,
  Play,
  Pause
} from 'lucide-react';
import { Button } from './ui/button';

type AnimationStage =
  | 'idle'
  | 'booking-webhook'
  | 'booking-offline'
  | 'context-linking'
  | 'live-transcription'
  | 'proof-upload'
  | 'ai-summary'
  | 'dashboard';

interface Meeting {
  id: string;
  title: string;
  contact: string;
  company: string;
  time: string;
  status: 'upcoming' | 'completed';
  avatar: string;
}

// Typing indicator component
const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <m.div
          key={i}
          className="w-1.5 h-1.5 bg-slate-400 rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Orbital loading animation with glowing rings
const OrbitalLoader = () => {
  return (
    <div className="relative flex items-center justify-center w-44 h-44 sm:w-52 sm:h-52">
      {/* Radial glow backdrop */}
      <m.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(148,163,184,0.15) 0%, rgba(148,163,184,0.05) 40%, transparent 70%)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Outer ring — clockwise, slower */}
      <m.div
        className="absolute rounded-full"
        style={{
          width: '100%',
          height: '100%',
          border: '2px solid transparent',
          borderTopColor: 'rgba(148,163,184,0.6)',
          borderRightColor: 'rgba(148,163,184,0.25)',
          filter: 'drop-shadow(0 0 6px rgba(148,163,184,0.5))',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Outer ring spark dot */}
      <m.div
        className="absolute w-1.5 h-1.5 rounded-full bg-slate-300"
        style={{
          top: 0,
          left: '50%',
          marginLeft: '-3px',
          boxShadow: '0 0 8px 2px rgba(148,163,184,0.7)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner ring — counter-clockwise, faster */}
      <m.div
        className="absolute rounded-full"
        style={{
          width: '75%',
          height: '75%',
          border: '2px solid transparent',
          borderTopColor: 'rgba(100,116,139,0.5)',
          borderLeftColor: 'rgba(100,116,139,0.2)',
          filter: 'drop-shadow(0 0 5px rgba(100,116,139,0.45))',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner ring spark dot */}
      <m.div
        className="absolute rounded-full"
        style={{
          width: '75%',
          height: '75%',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute w-1 h-1 rounded-full bg-slate-400"
          style={{
            top: 0,
            left: '50%',
            marginLeft: '-2px',
            boxShadow: '0 0 6px 2px rgba(100,116,139,0.6)',
          }}
        />
      </m.div>

      {/* Innermost faint ring — slow clockwise */}
      <m.div
        className="absolute rounded-full"
        style={{
          width: '52%',
          height: '52%',
          border: '1px solid transparent',
          borderBottomColor: 'rgba(148,163,184,0.2)',
          borderRightColor: 'rgba(148,163,184,0.1)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Calendar icon with glow */}
      <m.div
        animate={{
          scale: [1, 1.08, 1],
          filter: [
            'drop-shadow(0 0 4px rgba(148,163,184,0.3))',
            'drop-shadow(0 0 12px rgba(148,163,184,0.6))',
            'drop-shadow(0 0 4px rgba(148,163,184,0.3))',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Calendar className="w-14 h-14 sm:w-16 sm:h-16 text-slate-300/70" />
      </m.div>
    </div>
  );
};

// Glowing loading dots
const GlowDots = () => {
  return (
    <div className="flex items-center gap-2 mt-3">
      {[0, 1, 2].map((i) => (
        <m.div
          key={i}
          className="w-2 h-2 rounded-full bg-slate-300/80"
          style={{ boxShadow: '0 0 6px 1px rgba(148,163,184,0.5)' }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Waveform bar component for transcription
const WaveformBar = ({ index, isActive }: { index: number; isActive: boolean }) => (
  <m.div
    className="w-1 bg-gradient-to-t from-slate-400 to-slate-400 rounded-full"
    animate={isActive ? {
      height: [8, 24 + Math.random() * 16, 12, 32 + Math.random() * 8, 8],
    } : { height: 8 }}
    transition={{
      duration: 0.8,
      repeat: isActive ? Infinity : 0,
      delay: index * 0.1,
      ease: "easeInOut"
    }}
  />
);

// Pulsing connection dot
const PulsingDot = ({ color = 'cyan' }: { color?: 'cyan' | 'blue' | 'green' }) => {
  const colorClasses = {
    cyan: 'bg-slate-400',
    blue: 'bg-slate-400',
    green: 'bg-green-400'
  };

  return (
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colorClasses[color]} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colorClasses[color]}`} />
    </span>
  );
};



export default function BookingsMeeting() {
  const [stage, setStage] = useState<AnimationStage>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptLines, setTranscriptLines] = useState<string[]>([]);
  const [dashboardView, setDashboardView] = useState<'upcoming' | 'completed'>('upcoming');
  const [momSections, setMomSections] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);
  const { isInView } = useInViewPause();
  const shouldAnimate = true;

  const clearAllTimeouts = useCallback(() => {
    timeoutIds.current.forEach(id => clearTimeout(id));
    timeoutIds.current = [];
  }, []);

  // Clean up timeouts on unmount
  useEffect(() => () => clearAllTimeouts(), [clearAllTimeouts]);

  // Auto-start when the section scrolls into view
  useEffect(() => {
    if (isInView && !isPlaying) {
      runAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);


  const transcriptData = [
    { speaker: 'Sarah Chen', text: "Let's discuss the Q4 projections...", color: 'cyan' },
    { speaker: 'Mark Johnson', text: "I've prepared the revenue forecasts.", color: 'blue' },
    { speaker: 'Sarah Chen', text: "Great, can you share the key metrics?", color: 'cyan' },
    { speaker: 'Mark Johnson', text: "Year-over-year growth is at 34%.", color: 'blue' },
  ];

  const momData = [
    '📋 Meeting Summary',
    '👥 Attendees: Sarah Chen, Mark Johnson',
    '📈 Key Discussion: Q4 Revenue Projections',
    '✅ Action Items:',
    '   • Finalize Q4 forecast by Friday',
    '   • Schedule follow-up with finance team',
    '🎯 Next Steps: Review meeting scheduled for Monday'
  ];

  const meetings: Meeting[] = [
    { id: '1', title: 'Product Strategy Call', contact: 'Sarah Chen', company: 'TechCorp', time: 'Tomorrow, 2:00 PM', status: 'upcoming', avatar: 'SC' },
    { id: '2', title: 'Partnership Discussion', contact: 'Alex Rivera', company: 'InnovateLabs', time: 'Jan 30, 10:00 AM', status: 'upcoming', avatar: 'AR' },
    { id: '3', title: 'Q4 Review Meeting', contact: 'Mark Johnson', company: 'DataFlow', time: 'Jan 27, 3:00 PM', status: 'completed', avatar: 'MJ' },
    { id: '4', title: 'Sales Alignment', contact: 'Lisa Park', company: 'GrowthCo', time: 'Jan 26, 11:00 AM', status: 'completed', avatar: 'LP' },
  ];

  const runAnimation = useCallback(() => {
    // Cancel any in-flight timeouts from a previous run
    clearAllTimeouts();

    setIsPlaying(true);
    setStage('idle');
    setTranscriptLines([]);
    setMomSections([]);
    setUploadProgress(0);

    const schedule = (fn: () => void, delay: number) => {
      timeoutIds.current.push(setTimeout(fn, delay));
    };

    const timings = [
      { stage: 'booking-webhook' as AnimationStage, delay: 1200 },
      { stage: 'booking-offline' as AnimationStage, delay: 3500 },
      { stage: 'context-linking' as AnimationStage, delay: 6000 },
      { stage: 'live-transcription' as AnimationStage, delay: 9000 },
      { stage: 'proof-upload' as AnimationStage, delay: 15000 },
      { stage: 'ai-summary' as AnimationStage, delay: 19000 },
      { stage: 'dashboard' as AnimationStage, delay: 24000 },
    ];

    timings.forEach(({ stage: s, delay }) => {
      schedule(() => setStage(s), delay);
    });

    // Transcript lines animation
    transcriptData.forEach((_, index) => {
      schedule(() => {
        setTranscriptLines(prev => [...prev, transcriptData[index].text]);
      }, 10000 + index * 1200);
    });

    // Upload progress animation
    for (let i = 0; i <= 100; i += 10) {
      schedule(() => setUploadProgress(i), 19200 + i * 25);
    }

    // MoM sections animation
    momData.forEach((_, index) => {
      schedule(() => {
        setMomSections(prev => [...prev, momData[index]]);
      }, 20500 + index * 500);
    });

    // Reset after complete
    schedule(() => {
      setIsPlaying(false);
    }, 28000);
  }, [clearAllTimeouts]);

  // No auto-start - animations are triggered on demand via play button

  return (
    <InViewContext.Provider value={shouldAnimate ?? false}>
      <section id="bookings-meeting" className="relative z-10 py-12 sm:py-16 md:py-20 px-4">
        {/* Background ambient effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
              Bookings & Meeting{' '}
              <span className="text-[#A89FE0]">
                Intelligence
              </span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-6 sm:mb-8" style={{ textShadow: 'none' }}>
              Seamless scheduling, real-time transcription with speaker diarization, and AI-powered meeting summaries
            </p>



            {/* Demo Controls */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Button
                onClick={() => isPlaying ? null : runAnimation()}
                disabled={isPlaying}
                variant={isPlaying ? 'ghost' : 'gradient-blue'}
                className={`inline-flex items-center gap-2 ${isPlaying
                  ? 'text-slate-500'
                  : 'hover:scale-105 animate-btn-pulse'
                  }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start Demo
                  </>
                )}
              </Button>
            </m.div>

            {/* Main Animation Container */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-5xl mx-auto rounded-2xl glass border border-white/10 relative overflow-hidden"
            >
              {/* Window Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-xs text-slate-500 font-mono">LeadQ.AI Meeting Intelligence</span>
                </div>
                <div className="w-20" />
              </div>

              {/* Animation Content */}
              <div className="p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[480px]">
                <AnimatePresence mode="wait">
                  {/* IDLE STATE */}
                  {stage === 'idle' && (
                    <m.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-64 sm:h-80 md:h-96"
                    >
                      <OrbitalLoader />
                      <p
                        className="mt-4 text-sm sm:text-base font-medium tracking-wide"
                        style={{
                          background: 'linear-gradient(90deg, #94a3b8 0%, #e2e8f0 40%, #94a3b8 80%)',
                          backgroundSize: '200% 100%',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          animation: 'shimmer 3s ease-in-out infinite',
                        }}
                      >
                        Initializing Meeting Intelligence...
                      </p>
                      <GlowDots />
                    </m.div>
                  )}

                  {/* BOOKING WEBHOOK */}
                  {stage === 'booking-webhook' && (
                    <m.div
                      key="booking-webhook"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-slate-400/20">
                          <Send className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-semibold text-xl sm:text-2xl">Auto Follow-Up Ready</h3>
                          <p className="text-sm text-slate-400">Follow-up email queued for after the meeting</p>
                        </div>
                        <PulsingDot color="green" />
                      </div>

                      <m.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 rounded-xl p-4 border border-slate-400/20"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-400 flex items-center justify-center text-white font-bold text-sm">
                            SC
                          </div>
                          <div className="text-left flex-1">
                            <p className="text-white font-medium">New Booking Received</p>
                            <p className="text-sm text-slate-400">Sarah Chen - Product Demo</p>
                          </div>
                          <m.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                          </m.div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-white/5 rounded-lg p-2">
                            <span className="text-slate-500">Date:</span>
                            <span className="text-white ml-2">Jan 29, 2026</span>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2">
                            <span className="text-slate-500">Time:</span>
                            <span className="text-white ml-2">2:00 PM EST</span>
                          </div>
                        </div>
                      </m.div>

                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center justify-center gap-2 text-sm text-slate-400"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Automatically synced with your calendar</span>
                      </m.div>
                    </m.div>
                  )}

                  {/* BOOKING OFFLINE */}
                  {stage === 'booking-offline' && (
                    <m.div
                      key="booking-offline"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-slate-400/20">
                          <UserPlus className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-semibold text-xl sm:text-2xl">Offline Meeting Logged</h3>
                          <p className="text-sm text-slate-400">Manual entry for networking event</p>
                        </div>
                      </div>

                      <m.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 rounded-xl p-4 border border-slate-400/20"
                      >
                        <div className="space-y-3">
                          <m.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-3"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value="Alex Rivera"
                              readOnly
                              className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-white text-sm border border-white/10"
                            />
                          </m.div>
                          <m.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-3"
                          >
                            <Building2 className="w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value="InnovateLabs Inc."
                              readOnly
                              className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-white text-sm border border-white/10"
                            />
                          </m.div>
                          <m.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-center gap-3"
                          >
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value="Tech Conference 2026"
                              readOnly
                              className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-white text-sm border border-white/10"
                            />
                          </m.div>
                        </div>
                      </m.div>

                      <m.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-slate-400 to-indigo-500 text-white font-medium flex items-center gap-2 mx-auto"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Meeting Saved
                      </m.button>
                    </m.div>
                  )}

                  {/* CONTEXT LINKING */}
                  {stage === 'context-linking' && (
                    <m.div
                      key="context-linking"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-slate-400/20">
                          <Link2 className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-semibold text-xl sm:text-2xl">Smart Context Linking</h3>
                          <p className="text-sm text-slate-400">Connecting to Contact & Company profiles</p>
                        </div>
                      </div>

                      <div className="relative py-8">
                        {/* Connection visualization */}
                        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-16">
                          <m.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-slate-400 to-slate-400 flex items-center justify-center mb-2">
                              <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <span className="text-sm text-white">Sarah Chen</span>
                            <span className="text-xs text-slate-400">Contact</span>
                          </m.div>

                          {/* Animated connection lines */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                            <m.line
                              x1="30%"
                              y1="50%"
                              x2="50%"
                              y2="50%"
                              stroke="url(#gradient1)"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 0.5, duration: 0.5 }}
                            />
                            <m.line
                              x1="50%"
                              y1="50%"
                              x2="70%"
                              y2="50%"
                              stroke="url(#gradient1)"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 0.8, duration: 0.5 }}
                            />
                            <defs>
                              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#7B6FD4" />
                                <stop offset="100%" stopColor="#f59e0b" />
                              </linearGradient>
                            </defs>
                          </svg>

                          <m.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: "spring" }}
                            className="flex flex-col items-center relative z-10"
                          >
                            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-400 to-pink-500 flex items-center justify-center mb-2 shadow-lg shadow-slate-400/30">
                              <Calendar className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                            </div>
                            <span className="text-sm text-white font-medium">Meeting</span>
                          </m.div>

                          <m.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-slate-400 to-indigo-500 flex items-center justify-center mb-2">
                              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <span className="text-sm text-white">TechCorp</span>
                            <span className="text-xs text-slate-400">Company</span>
                          </m.div>
                        </div>
                      </div>

                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="bg-white/5 rounded-lg p-3 border border-slate-400/20"
                      >
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-slate-300">Historical context loaded: 5 previous meetings, 12 emails</span>
                        </div>
                      </m.div>
                    </m.div>
                  )}

                  {/* LIVE TRANSCRIPTION */}
                  {stage === 'live-transcription' && (
                    <m.div
                      key="live-transcription"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-red-500/20">
                            <Radio className="w-5 h-5 text-red-400" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-white font-semibold text-xl sm:text-2xl">Live Transcription</h3>
                            <p className="text-sm text-slate-400">Real-time speaker diarization</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30">
                          <PulsingDot color="green" />
                          <span className="text-xs text-red-400 font-medium">LIVE</span>
                        </div>
                      </div>

                      {/* Waveform visualizer */}
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-1 h-12 mb-4"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <WaveformBar key={i} index={i} isActive={true} />
                        ))}
                      </m.div>

                      {/* Transcript lines */}
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {transcriptData.map((line, index) => (
                          <m.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                              opacity: transcriptLines.length > index ? 1 : 0,
                              x: transcriptLines.length > index ? 0 : -20
                            }}
                            className="flex items-start gap-3"
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${line.color === 'cyan' ? 'bg-slate-400' : 'bg-slate-400'
                              }`}>
                              {line.speaker.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 text-left">
                              <p className={`text-sm font-medium ${line.color === 'cyan' ? 'text-slate-400' : 'text-slate-400'
                                }`}>
                                {line.speaker}
                              </p>
                              <p className="text-slate-300">{line.text}</p>
                            </div>
                          </m.div>
                        ))}
                        {transcriptLines.length < transcriptData.length && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                              <Mic className="w-4 h-4 text-slate-400" />
                            </div>
                            <TypingIndicator />
                          </div>
                        )}
                      </div>
                    </m.div>
                  )}

                  {/* PROOF UPLOAD */}
                  {stage === 'proof-upload' && (
                    <m.div
                      key="proof-upload"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-green-500/20">
                          <Camera className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-semibold text-xl sm:text-2xl">Proof of Interaction</h3>
                          <p className="text-sm text-slate-400">Capture meeting evidence & notes</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        {[
                          { icon: Camera, label: 'Selfie', delay: 0.2 },
                          { icon: Image, label: 'Whiteboard', delay: 0.4 },
                          { icon: FileText, label: 'Notes', delay: 0.6 },
                        ].map((item, index) => (
                          <m.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: item.delay, type: "spring" }}
                            className="relative aspect-video sm:aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden group cursor-pointer"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <m.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: item.delay + 0.3 }}
                              className="absolute inset-0 flex flex-col items-center justify-center"
                            >
                              <item.icon className="w-8 h-8 text-slate-400 mb-2" />
                              <span className="text-xs text-slate-500">{item.label}</span>
                            </m.div>
                            {index === 0 && (
                              <m.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="absolute top-2 right-2"
                              >
                                <CheckCircle2 className="w-5 h-5 text-green-400" />
                              </m.div>
                            )}
                          </m.div>
                        ))}
                      </div>

                      {/* Upload progress */}
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-300">Uploading evidence...</span>
                          </div>
                          <span className="text-sm text-slate-400 font-mono">{uploadProgress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <m.div
                            className="h-full bg-gradient-to-r from-slate-400 to-slate-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </m.div>
                    </m.div>
                  )}

                  {/* AI SUMMARY */}
                  {stage === 'ai-summary' && (
                    <m.div
                      key="ai-summary"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-slate-400/20">
                          <Sparkles className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-semibold text-xl sm:text-2xl">AI Post-Processing</h3>
                          <p className="text-sm text-slate-400">Generating Minutes of Meeting</p>
                        </div>
                        <m.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: isInView ? Infinity : 0, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4 text-slate-400" />
                        </m.div>
                      </div>

                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 rounded-xl p-4 border border-slate-400/20 text-left"
                      >
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <span className="text-white font-medium">Minutes of Meeting</span>
                        </div>
                        <div className="space-y-2 font-mono text-sm">
                          {momSections.map((section, index) => (
                            <m.p
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-slate-300"
                            >
                              {section}
                            </m.p>
                          ))}
                          {momSections.length < momData.length && (
                            <div className="flex items-center gap-2">
                              <TypingIndicator />
                              <span className="text-slate-500 text-xs">Generating...</span>
                            </div>
                          )}
                        </div>
                      </m.div>

                      {momSections.length === momData.length && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-center gap-4"
                        >
                          <Button variant="glass-secondary" size="compact-md" className="flex items-center gap-2 text-slate-400">
                            <FileText className="w-4 h-4" />
                            Export PDF
                          </Button>
                          <Button variant="glass-secondary" size="compact-md" className="flex items-center gap-2 text-slate-400">
                            <CheckCircle2 className="w-4 h-4" />
                            Approve & Save
                          </Button>
                        </m.div>
                      )}
                    </m.div>
                  )}

                  {/* DASHBOARD VIEW */}
                  {stage === 'dashboard' && (
                    <m.div
                      key="dashboard"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-400/20">
                            <Calendar className="w-5 h-5 text-slate-400" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-white font-semibold text-xl sm:text-2xl">Dynamic Dashboard</h3>
                            <p className="text-sm text-slate-400">Smart meeting organization</p>
                          </div>
                        </div>
                      </div>

                      {/* Tab toggle */}
                      <div className="flex items-center justify-center gap-2 bg-white/5 rounded-lg p-1 max-w-md mx-auto">
                        <Button
                          onClick={() => setDashboardView('upcoming')}
                          variant={dashboardView === 'upcoming' ? 'default' : 'ghost'}
                          className={`flex-1 ${dashboardView === 'upcoming' ? 'bg-slate-400 text-white' : 'text-slate-400'}`}
                        >
                          <Clock className="w-4 h-4 inline mr-2" />
                          Upcoming (3 Days)
                        </Button>
                        <Button
                          onClick={() => setDashboardView('completed')}
                          variant={dashboardView === 'completed' ? 'default' : 'ghost'}
                          className={`flex-1 ${dashboardView === 'completed' ? 'bg-green-500 text-white' : 'text-slate-400'}`}
                        >
                          <CheckCircle2 className="w-4 h-4 inline mr-2" />
                          Completed
                        </Button>
                      </div>

                      {/* Meeting cards */}
                      <AnimatePresence mode="wait">
                        <m.div
                          key={dashboardView}
                          initial={{ opacity: 0, x: dashboardView === 'upcoming' ? -20 : 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: dashboardView === 'upcoming' ? 20 : -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3"
                        >
                          {meetings
                            .filter(m => m.status === dashboardView)
                            .map((meeting, index) => (
                              <m.div
                                key={meeting.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                              >
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${meeting.status === 'upcoming'
                                    ? 'bg-gradient-to-br from-slate-400 to-slate-400'
                                    : 'bg-gradient-to-br from-green-400 to-emerald-500'
                                    }`}>
                                    {meeting.avatar}
                                  </div>
                                  <div className="flex-1 text-left min-w-0">
                                    <p className="text-white font-medium text-sm sm:text-base truncate">{meeting.title}</p>
                                    <p className="text-xs sm:text-sm text-slate-400 truncate">
                                      {meeting.contact} • {meeting.company}
                                    </p>
                                  </div>
                                  <div className="text-right hidden sm:block">
                                    <p className="text-sm text-slate-400">{meeting.time}</p>
                                    <div className="flex items-center gap-1 justify-end mt-1">
                                      {meeting.status === 'completed' && (
                                        <span className="text-xs text-green-400 flex items-center gap-1">
                                          <CheckCircle2 className="w-3 h-3" />
                                          MoM Ready
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-slate-500" />
                                </div>
                              </m.div>
                            ))}
                        </m.div>
                      </AnimatePresence>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </m.div>

            {/* Feature highlights */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
            >
              {[
                { icon: Send, label: 'Auto Follow-Up', color: 'cyan' },
                { icon: Radio, label: 'Live Transcription', color: 'red' },
                { icon: Camera, label: 'Proof Capture', color: 'green' },
                { icon: Sparkles, label: 'AI Summaries', color: 'blue' },
              ].map((feature, index) => (
                <m.div
                  key={index}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <feature.icon className="w-6 h-6 text-white mx-auto mb-2" />
                  <p className="text-sm text-slate-400">{feature.label}</p>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>
    </InViewContext.Provider>
  );
}
