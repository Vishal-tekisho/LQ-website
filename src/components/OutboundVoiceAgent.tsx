import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { MotionButton } from './ui/motion-button';
import {
    Phone,
    PhoneCall,
    PhoneOff,
    Mic,
    MicOff,
    User,
    Bot,
    Calendar,
    CheckCircle2,
    Clock,
    Play,
    RotateCcw,
    Sparkles,
    Volume2,
    Brain,
    Bell,
    XCircle,
    PhoneForwarded,
} from 'lucide-react';

type CallStage =
    | 'idle'
    | 'dialing'
    | 'connected'
    | 'ai-speaking'
    | 'user-interrupting'
    | 'user-speaking'
    | 'ai-thinking'
    | 'ai-responding'
    | 'scheduling'
    | 'confirmed'
    | 'ended';

interface ConversationMessage {
    id: number;
    speaker: 'ai' | 'user';
    text: string;
    isInterruption?: boolean;
}

// Waveform bar component
const WaveformBar = ({ index, isActive, color = 'bg-leadq-silver' }: { index: number; isActive: boolean; color?: string }) => (
    <motion.div
        className={`w-1 ${color} rounded-full`}
        animate={isActive ? {
            height: [8, 20 + Math.random() * 16, 10, 28 + Math.random() * 8, 8],
        } : { height: 6 }}
        transition={{
            duration: 0.5,
            repeat: isActive ? Infinity : 0,
            delay: index * 0.05,
            ease: "easeInOut"
        }}
    />
);

// Pulsing dot component
const PulsingDot = ({ color = 'bg-green-500' }: { color?: string }) => (
    <span className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
    </span>
);

// Typing indicator
const TypingIndicator = () => (
    <div className="flex items-center gap-1 px-2 py-1">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-leadq-silver rounded-full"
                animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
            />
        ))}
    </div>
);

// Phone visualization component
const PhoneVisualization = ({ stage, isMuted }: { stage: CallStage; isMuted: boolean }) => {
    const isActive = stage !== 'idle' && stage !== 'ended';
    const isAISpeaking = stage === 'ai-speaking' || stage === 'ai-responding';
    const isUserSpeaking = stage === 'user-speaking' || stage === 'user-interrupting';

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto"
        >
            {/* Outer ring pulse when active */}
            {isActive && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-leadq-silver/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}

            {/* Main circle */}
            <motion.div
                className={`absolute inset-4 rounded-full flex items-center justify-center ${stage === 'dialing' ? 'bg-yellow-500/20 border-yellow-500/50' :
                    stage === 'connected' || isAISpeaking || isUserSpeaking ? 'bg-green-500/20 border-green-500/50' :
                        stage === 'confirmed' ? 'bg-leadq-silver/20 border-leadq-silver/50' :
                            stage === 'ended' ? 'bg-red-500/20 border-red-500/50' :
                                'bg-white/5 border-white/20'
                    } border-2 transition-colors duration-300`}
                animate={stage === 'dialing' ? { rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5, repeat: stage === 'dialing' ? Infinity : 0 }}
            >
                {/* Waveform visualization */}
                {(isAISpeaking || isUserSpeaking) && (
                    <div className="absolute inset-0 flex items-center justify-center gap-0.5">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <WaveformBar
                                key={i}
                                index={i}
                                isActive={true}
                                color={isUserSpeaking ? 'bg-blue-400' : 'bg-leadq-silver'}
                            />
                        ))}
                    </div>
                )}

                {/* Center icon */}
                <motion.div
                    animate={stage === 'dialing' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: stage === 'dialing' ? Infinity : 0 }}
                    className="relative z-10"
                >
                    {stage === 'idle' && <Phone className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-slate-400" />}
                    {stage === 'dialing' && <PhoneCall className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-400" />}
                    {(stage === 'connected' || isAISpeaking) && <Bot className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-leadq-silver" />}
                    {isUserSpeaking && <User className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400" />}
                    {stage === 'ai-thinking' && (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                            <Brain className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-leadq-silver" />
                        </motion.div>
                    )}
                    {stage === 'scheduling' && <Calendar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-leadq-silver" />}
                    {stage === 'confirmed' && <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-400" />}
                    {stage === 'ended' && <PhoneOff className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-400" />}
                </motion.div>
            </motion.div>

            {/* Mute indicator */}
            {isMuted && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute bottom-2 right-2 p-2 bg-red-500/20 rounded-full"
                >
                    <MicOff className="w-4 h-4 text-red-400" />
                </motion.div>
            )}
        </motion.div>
    );
};

// Conversation bubble component
const ConversationBubble = ({ message }: { message: ConversationMessage; isLatest: boolean }) => {
    const isAI = message.speaker === 'ai';

    return (
        <motion.div
            initial={{ opacity: 0, x: isAI ? -20 : 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}
        >
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${isAI
                    ? 'bg-white/10 border border-white/10 rounded-bl-sm'
                    : message.isInterruption
                        ? 'bg-orange-500/20 border border-orange-500/30 rounded-br-sm'
                        : 'bg-blue-500/20 border border-blue-500/30 rounded-br-sm'
                    }`}
            >
                <div className="flex items-center gap-2 mb-1">
                    {isAI ? (
                        <Bot className="w-3.5 h-3.5 text-leadq-silver" />
                    ) : (
                        <User className="w-3.5 h-3.5 text-blue-400" />
                    )}
                    <span className={`text-[10px] font-medium ${isAI ? 'text-leadq-silver' : 'text-blue-400'}`}>
                        {isAI ? 'AI Agent' : 'Customer'}
                    </span>
                    {message.isInterruption && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-orange-500/30 text-orange-300 rounded-full">
                            Interrupted
                        </span>
                    )}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{message.text}</p>
            </div>
        </motion.div>
    );
};

export default function OutboundVoiceAgent() {
    const [stage, setStage] = useState<CallStage>('idle');
    const [isPlaying, setIsPlaying] = useState(false);
    const [conversations, setConversations] = useState<ConversationMessage[]>([]);
    const [callDuration, setCallDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const transcriptRef = useRef<HTMLDivElement>(null);
    const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);

    const clearAllTimeouts = useCallback(() => {
        timeoutIds.current.forEach(id => clearTimeout(id));
        timeoutIds.current = [];
    }, []);

    // Clean up timeouts on unmount
    useEffect(() => () => clearAllTimeouts(), [clearAllTimeouts]);

    const resetDemo = useCallback(() => {
        clearAllTimeouts();
        setStage('idle');
        setIsPlaying(false);
        setConversations([]);
        setCallDuration(0);
        setIsMuted(false);
    }, [clearAllTimeouts]);

    const startDemo = useCallback(() => {
        if (isPlaying) return;
        resetDemo();
        setIsPlaying(true);

        const schedule = (fn: () => void, delay: number) => {
            timeoutIds.current.push(setTimeout(fn, delay));
        };

        // Dialing phase
        schedule(() => setStage('dialing'), 500);

        // Connected
        schedule(() => setStage('connected'), 2500);

        // AI greeting
        schedule(() => {
            setStage('ai-speaking');
            setConversations([{
                id: 1,
                speaker: 'ai',
                text: "Hi, this is Sarah from LeadQ. I'm calling to schedule your product demo. Is now a good time?"
            }]);
        }, 3500);

        // User responds
        schedule(() => {
            setStage('user-speaking');
            setConversations(prev => [...prev, {
                id: 2,
                speaker: 'user',
                text: "Yes, I have a few minutes. What's this about?"
            }]);
        }, 7000);

        // AI explains - demonstrating context awareness
        schedule(() => {
            setStage('ai-thinking');
        }, 9500);

        schedule(() => {
            setStage('ai-speaking');
            setConversations(prev => [...prev, {
                id: 3,
                speaker: 'ai',
                text: "Great! Based on your recent inquiry about our AI-powered CRM, I'd love to show you how LeadQ can help automate your—"
            }]);
        }, 10500);

        // User interrupts - key feature demonstration
        schedule(() => {
            setStage('user-interrupting');
            setConversations(prev => [...prev, {
                id: 4,
                speaker: 'user',
                text: "Actually, can we do this next Tuesday instead?",
                isInterruption: true
            }]);
        }, 13000);

        // AI adapts instantly - showing interruption handling
        schedule(() => {
            setStage('ai-thinking');
        }, 15000);

        schedule(() => {
            setStage('scheduling');
        }, 16000);

        schedule(() => {
            setStage('ai-responding');
            setConversations(prev => [...prev, {
                id: 5,
                speaker: 'ai',
                text: "Absolutely! I see you have availability on Tuesday at 2 PM or 4 PM. Which works better for you?"
            }]);
        }, 17000);

        // User confirms
        schedule(() => {
            setStage('user-speaking');
            setConversations(prev => [...prev, {
                id: 6,
                speaker: 'user',
                text: "2 PM works perfectly."
            }]);
        }, 20000);

        // AI confirms and schedules
        schedule(() => {
            setStage('scheduling');
        }, 22000);

        schedule(() => {
            setStage('confirmed');
            setConversations(prev => [...prev, {
                id: 7,
                speaker: 'ai',
                text: "Excellent! I've scheduled your demo for Tuesday at 2 PM. You'll receive a calendar invite shortly. Thank you!"
            }]);
        }, 23500);

        // Call ends
        schedule(() => {
            setStage('ended');
            setIsPlaying(false);
        }, 27000);
    }, [isPlaying, resetDemo]);

    // Call duration timer
    useEffect(() => {
        if (stage !== 'idle' && stage !== 'ended' && stage !== 'dialing') {
            const timer = setInterval(() => setCallDuration(prev => prev + 1), 1000);
            return () => clearInterval(timer);
        }
    }, [stage]);

    // Auto-scroll transcript to bottom when new messages arrive
    useEffect(() => {
        if (transcriptRef.current) {
            transcriptRef.current.scrollTo({
                top: transcriptRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [conversations, stage]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getStatusText = () => {
        switch (stage) {
            case 'idle': return 'Ready to Call';
            case 'dialing': return 'Dialing...';
            case 'connected': return 'Connected';
            case 'ai-speaking': return 'AI Speaking';
            case 'user-interrupting': return 'User Interrupted';
            case 'user-speaking': return 'Customer Speaking';
            case 'ai-thinking': return 'Processing Context...';
            case 'ai-responding': return 'AI Responding';
            case 'scheduling': return 'Accessing Calendar...';
            case 'confirmed': return 'Meeting Scheduled!';
            case 'ended': return 'Call Ended';
            default: return 'Unknown';
        }
    };

    return (
        <section id="voice-agent" className="relative z-10 py-16 sm:py-20 md:py-24 px-4">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-leadq-silver/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-leadq-silver border border-leadq-silver/20 mb-6">
                        <Mic className="w-4 h-4 text-leadq-silver" />
                        <span className="text-sm text-leadq-silver font-medium">Intelligent Voice AI</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
                        Voice{' '}
                        <span className="bg-gradient-to-r from-leadq-cyan to-leadq-royal-blue bg-clip-text text-transparent">
                            Agent
                        </span>
                    </h2>

                    <p className="text-slate-400 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl mb-8" style={{ textShadow: 'none' }}>
                        Replace robocalls with intelligent conversations. Our AI handles interruptions naturally,
                        understands context in real-time, and schedules meetings seamlessly.
                    </p>

                    {/* Control buttons */}
                    <div className="flex items-center justify-center gap-4">
                        <MotionButton
                            onClick={startDemo}
                            disabled={isPlaying && stage !== 'ended'}
                            variant="gradient-blue"
                            size="compact-lg"
                            className="flex items-center gap-2"
                            whileHover={isPlaying ? {} : { scale: 1.02 }}
                            whileTap={isPlaying ? {} : { scale: 0.98 }}
                        >
                            <Play className="w-4 h-4" />
                            <span>{stage === 'ended' ? 'Replay Demo' : 'Start Demo Call'}</span>
                        </MotionButton>

                        {stage !== 'idle' && (
                            <MotionButton
                                variant="ghost"
                                size="compact-lg"
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={resetDemo}
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Reset</span>
                            </MotionButton>
                        )}
                    </div>
                </motion.div>

                {/* Main demo container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="grid lg:grid-cols-2 gap-6 lg:gap-8"
                >
                    {/* Left: Phone visualization */}
                    <div className="glass rounded-2xl p-6 md:p-8 border border-white/10">
                        {/* Status bar */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <PulsingDot color={
                                    stage === 'idle' ? 'bg-slate-500' :
                                        stage === 'dialing' ? 'bg-yellow-500' :
                                            stage === 'ended' ? 'bg-red-500' :
                                                'bg-green-500'
                                } />
                                <span className="text-sm font-medium text-white">{getStatusText()}</span>
                            </div>
                            {stage !== 'idle' && stage !== 'dialing' && (
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-mono">{formatDuration(callDuration)}</span>
                                </div>
                            )}
                        </div>

                        {/* Phone visualization */}
                        <PhoneVisualization stage={stage} isMuted={isMuted} />

                        {/* Call info */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-500">Calling</p>
                            <p className="text-lg font-medium text-white">John Smith</p>
                            <p className="text-sm text-slate-400">TechCorp Industries</p>
                        </div>

                        {/* Feature highlights */}
                        <div className="mt-6 grid grid-cols-3 gap-1.5 sm:gap-2">
                            {[
                                { icon: Volume2, label: 'Natural Voice', active: stage === 'ai-speaking' || stage === 'ai-responding' },
                                { icon: Brain, label: 'Context Aware', active: stage === 'ai-thinking' },
                                { icon: Sparkles, label: 'Smart Scheduling', active: stage === 'scheduling' || stage === 'confirmed' },
                            ].map((feature) => (
                                <motion.div
                                    key={feature.label}
                                    className={`p-3 rounded-lg text-center transition-colors ${feature.active ? 'bg-leadq-silver/20 border border-leadq-silver/30' : 'bg-white/5 border border-white/10'
                                        }`}
                                    animate={feature.active ? { scale: [1, 1.02, 1] } : {}}
                                    transition={{ duration: 1, repeat: feature.active ? Infinity : 0 }}
                                >
                                    <feature.icon className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 ${feature.active ? 'text-leadq-silver' : 'text-slate-500'}`} />
                                    <span className={`text-[9px] sm:text-[10px] ${feature.active ? 'text-leadq-silver' : 'text-slate-500'}`}>
                                        {feature.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Conversation transcript */}
                    <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl sm:text-2xl font-medium text-slate-400 uppercase tracking-wider">
                                Live Transcript
                            </h3>
                            {isPlaying && stage !== 'ended' && (
                                <div className="flex items-center gap-2">
                                    <PulsingDot color="bg-red-500" />
                                    <span className="text-xs text-red-400 font-medium">LIVE</span>
                                </div>
                            )}
                        </div>

                        <div ref={transcriptRef} className="flex-1 overflow-y-auto max-h-[280px] sm:max-h-[350px] md:max-h-[400px] pr-2 space-y-1">
                            <AnimatePresence>
                                {conversations.map((msg, index) => (
                                    <ConversationBubble
                                        key={msg.id}
                                        message={msg}
                                        isLatest={index === conversations.length - 1}
                                    />
                                ))}
                            </AnimatePresence>

                            {/* Typing indicator */}
                            {(stage === 'ai-thinking' || stage === 'scheduling') && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <Bot className="w-3.5 h-3.5 text-leadq-silver" />
                                            <TypingIndicator />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Empty state */}
                            {conversations.length === 0 && stage === 'idle' && (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <Phone className="w-12 h-12 text-slate-600 mb-4" />
                                    <p className="text-slate-500 text-sm">
                                        Click "Start Demo Call" to see the AI in action
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Key moments indicator */}
                        {stage === 'user-interrupting' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20"
                            >
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-orange-400" />
                                    <span className="text-xs text-orange-300 font-medium">
                                        AI instantly stops speaking when interrupted — just like a human
                                    </span>
                                </div>
                            </motion.div>
                        )}

                        {stage === 'confirmed' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                            >
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    <span className="text-xs text-green-300 font-medium">
                                        Meeting scheduled and synced to CRM automatically
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Feature highlights below */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        { icon: CheckCircle2, label: 'Call Confirmation', desc: 'Verify appointments' },
                        { icon: Bell, label: 'Reminder Calls', desc: 'Timely notifications' },
                        { icon: XCircle, label: 'Cancellation Calls', desc: 'Handle changes gracefully' },
                        { icon: PhoneForwarded, label: 'Follow-up Calls', desc: 'Nurture relationships' },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            whileHover={{ y: -4, borderColor: 'rgba(192, 192, 192, 0.3)' }}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                        >
                            <div className="w-10 h-10 rounded-lg bg-leadq-silver/10 flex items-center justify-center mx-auto mb-2">
                                <feature.icon className="w-5 h-5 text-leadq-silver" />
                            </div>
                            <div className="text-sm font-medium text-white">{feature.label}</div>
                            <div className="text-xs text-slate-500">{feature.desc}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
